/**
 * ASTRO360 Reusable Email Service & Queue Management Engine
 * Handles queued jobs, retries with exponential backoff, duplicate prevention, and provider dispatch
 */

import { EmailProvider, MockEmailProvider, GmailProvider, SmtpEmailProvider, EmailMessage, SendResult } from './emailProvider';
import { renderEmailTemplate, TemplateType } from './emailTemplates';

export type JobStatus = 'PENDING' | 'PROCESSING' | 'SENT' | 'FAILED' | 'RETRYING' | 'CANCELLED';

export interface EmailJob {
  id: string;
  idempotencyKey?: string;
  recipient: string;
  subject: string;
  template: TemplateType;
  payload: Record<string, any>;
  scheduledAt: string; // ISO string
  attempts: number;
  maxAttempts: number;
  status: JobStatus;
  providerMessageId?: string;
  error?: string;
  createdAt: string;
  sentAt?: string;
}

export class EmailService {
  private provider: EmailProvider;
  private queue: EmailJob[] = [];
  private sentKeys: Set<string> = new Set();

  constructor(provider?: EmailProvider) {
    this.provider = provider || new SmtpEmailProvider({ senderEmail: 'apnix7@gmail.com' });
  }

  public setProvider(provider: EmailProvider) {
    this.provider = provider;
  }

  public getProvider(): EmailProvider {
    return this.provider;
  }

  public getJobs(): EmailJob[] {
    return [...this.queue];
  }

  public getStats() {
    return {
      total: this.queue.length,
      pending: this.queue.filter(j => j.status === 'PENDING').length,
      processing: this.queue.filter(j => j.status === 'PROCESSING').length,
      sent: this.queue.filter(j => j.status === 'SENT').length,
      failed: this.queue.filter(j => j.status === 'FAILED').length,
      retrying: this.queue.filter(j => j.status === 'RETRYING').length,
      provider: this.provider.name,
    };
  }

  /**
   * Schedules or queues an email job with idempotency checking
   */
  public queueEmail(params: {
    recipient: string;
    template: TemplateType;
    payload: Record<string, any>;
    idempotencyKey?: string;
    scheduledAt?: Date;
  }): EmailJob {
    if (params.idempotencyKey && this.sentKeys.has(params.idempotencyKey)) {
      console.warn(`[DUPLICATE PREVENTED] Job with key "${params.idempotencyKey}" already processed.`);
      const existing = this.queue.find(j => j.idempotencyKey === params.idempotencyKey);
      if (existing) return existing;
    }

    const rendered = renderEmailTemplate(params.template, params.payload);
    const job: EmailJob = {
      id: `job_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      idempotencyKey: params.idempotencyKey,
      recipient: params.recipient,
      subject: rendered.subject,
      template: params.template,
      payload: params.payload,
      scheduledAt: (params.scheduledAt || new Date()).toISOString(),
      attempts: 0,
      maxAttempts: 3,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    this.queue.push(job);
    if (params.idempotencyKey) {
      this.sentKeys.add(params.idempotencyKey);
    }

    return job;
  }

  /**
   * Processes all due pending/retrying jobs in the queue
   */
  public async processQueue(): Promise<{ processed: number; sent: number; failed: number }> {
    const now = new Date();
    const dueJobs = this.queue.filter(
      j => (j.status === 'PENDING' || j.status === 'RETRYING') && new Date(j.scheduledAt) <= now
    );

    let sent = 0;
    let failed = 0;

    for (const job of dueJobs) {
      job.status = 'PROCESSING';
      job.attempts += 1;

      const rendered = renderEmailTemplate(job.template, job.payload);
      const msg: EmailMessage = {
        recipient: job.recipient,
        subject: job.subject,
        html: rendered.html,
        text: rendered.text,
        metadata: { jobId: job.id },
      };

      const result: SendResult = await this.provider.sendEmail(msg);

      if (result.success) {
        job.status = 'SENT';
        job.providerMessageId = result.messageId;
        job.sentAt = new Date().toISOString();
        sent += 1;
      } else {
        job.error = result.error || 'Provider send failed';
        if (job.attempts < job.maxAttempts) {
          job.status = 'RETRYING';
          // Exponential backoff: 1 min, 5 min, 15 min
          const backoffMinutes = Math.pow(5, job.attempts - 1);
          const nextTry = new Date(now.getTime() + backoffMinutes * 60 * 1000);
          job.scheduledAt = nextTry.toISOString();
        } else {
          job.status = 'FAILED';
        }
        failed += 1;
      }
    }

    return { processed: dueJobs.length, sent, failed };
  }

  public retryJob(jobId: string): boolean {
    const job = this.queue.find(j => j.id === jobId);
    if (!job || job.status === 'SENT') return false;

    job.status = 'PENDING';
    job.attempts = 0;
    job.scheduledAt = new Date().toISOString();
    return true;
  }

  public cancelJob(jobId: string): boolean {
    const job = this.queue.find(j => j.id === jobId);
    if (!job || job.status === 'SENT') return false;

    job.status = 'CANCELLED';
    return true;
  }
}

export const emailService = new EmailService();
