/**
 * ASTRO360 Gmail & Email Provider Abstraction Layer
 * Supports Google OAuth 2.0 Gmail API, Direct SMTP API, & MockEmailProvider for local dev/testing
 */

export interface EmailMessage {
  recipient: string;
  subject: string;
  html: string;
  text: string;
  metadata?: Record<string, any>;
}

export interface SendResult {
  success: boolean;
  messageId?: string;
  provider: 'gmail' | 'mock';
  timestamp: string;
  error?: string;
}

export interface EmailProvider {
  name: 'gmail' | 'mock';
  sendEmail(message: EmailMessage): Promise<SendResult>;
  verifyConnection(): Promise<{ connected: boolean; email?: string; error?: string }>;
}

/**
 * Development & Testing Mock Provider
 * Logs emails to memory/console without sending real external emails
 */
export class MockEmailProvider implements EmailProvider {
  public name: 'mock' = 'mock';
  public sentLogs: EmailMessage[] = [];

  public async sendEmail(message: EmailMessage): Promise<SendResult> {
    this.sentLogs.push(message);
    console.log(`[MOCK EMAIL SENT] To: ${message.recipient} | Subject: ${message.subject}`);
    return {
      success: true,
      messageId: `mock_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      provider: 'mock',
      timestamp: new Date().toISOString(),
    };
  }

  public async verifyConnection(): Promise<{ connected: boolean; email?: string }> {
    return { connected: true, email: 'apnix7@gmail.com' };
  }
}

/**
 * Direct SMTP Serverless Relay Email Provider
 * Sends real email alerts via /api/send-email endpoint using Nodemailer & Gmail credentials
 */
export class SmtpEmailProvider implements EmailProvider {
  public name: 'gmail' = 'gmail';
  private senderEmail: string;
  private smtpPassword?: string;

  constructor(config?: { senderEmail?: string; smtpPassword?: string }) {
    this.senderEmail = config?.senderEmail || 'apnix7@gmail.com';
    this.smtpPassword = config?.smtpPassword || 'Tarik@89844';
  }

  public async sendEmail(message: EmailMessage): Promise<SendResult> {
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient: message.recipient,
          subject: message.subject,
          html: message.html,
          text: message.text,
          senderEmail: this.senderEmail,
          smtpPassword: this.smtpPassword,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        return {
          success: true,
          messageId: data.messageId || `smtp_${Date.now()}`,
          provider: 'gmail',
          timestamp: new Date().toISOString(),
          error: data.previewUrl ? `Preview Link: ${data.previewUrl}` : undefined,
        };
      }

      return {
        success: false,
        error: data.error || `HTTP ${res.status} email dispatch failed. If using Gmail, please verify that 2FA App Password is generated at myaccount.google.com/apppasswords`,
        provider: 'gmail',
        timestamp: new Date().toISOString(),
      };
    } catch (err: any) {
      console.warn('[SMTP DISPATCH EXCEPTION]', err);
      return {
        success: false,
        error: err.message || 'Cannot reach SMTP dispatch server endpoint /api/send-email',
        provider: 'gmail',
        timestamp: new Date().toISOString(),
      };
    }
  }

  public async verifyConnection(): Promise<{ connected: boolean; email?: string; error?: string }> {
    return { connected: true, email: this.senderEmail };
  }
}

/**
 * Official Google OAuth 2.0 Gmail API Provider
 * Uses minimum scope: https://www.googleapis.com/auth/gmail.send
 * Falls back to SMTP relay endpoint if OAuth CORS or token refresh fails
 */
export class GmailProvider implements EmailProvider {
  public name: 'gmail' = 'gmail';
  private clientId: string;
  private clientSecret: string;
  private refreshToken: string;
  private accessToken?: string;
  private senderEmail: string;

  constructor(config: {
    clientId: string;
    clientSecret?: string;
    refreshToken?: string;
    accessToken?: string;
    senderEmail?: string;
  }) {
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret || '';
    this.refreshToken = config.refreshToken || '';
    this.accessToken = config.accessToken;
    this.senderEmail = config.senderEmail || 'apnix7@gmail.com';
  }

  /**
   * Refreshes OAuth 2.0 Access Token from Google OAuth Endpoint
   */
  private async getAccessToken(): Promise<string> {
    if (this.accessToken) return this.accessToken;
    if (!this.refreshToken) throw new Error('GMAIL_REAUTH_REQUIRED: Missing OAuth refresh token');

    const params = new URLSearchParams({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      refresh_token: this.refreshToken,
      grant_type: 'refresh_token',
    });

    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(`GMAIL_REAUTH_REQUIRED: Google OAuth token refresh failed (${res.status}): ${JSON.stringify(err)}`);
    }

    const data = await res.json();
    this.accessToken = data.access_token;
    return data.access_token;
  }

  /**
   * Encodes Email into Base64URL RFC 2822 format for Gmail API
   */
  private createRfc2822Message(msg: EmailMessage): string {
    const rawLines = [
      `From: COSMOS Notifications <${this.senderEmail}>`,
      `To: ${msg.recipient}`,
      `Subject: ${msg.subject}`,
      `MIME-Version: 1.0`,
      `Content-Type: text/html; charset=UTF-8`,
      ``,
      msg.html,
    ];

    const raw = rawLines.join('\r\n');
    return btoa(unescape(encodeURIComponent(raw)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  public async sendEmail(message: EmailMessage): Promise<SendResult> {
    try {
      let token = this.accessToken;
      if (!token && this.refreshToken) {
        try {
          token = await this.getAccessToken();
        } catch (tokenErr) {
          console.warn('[GMAIL OAUTH REFRESH NOTICE] Falling back to server SMTP relay:', tokenErr);
        }
      }

      if (token) {
        const rawMessage = this.createRfc2822Message(message);
        const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ raw: rawMessage }),
        });

        if (res.ok) {
          const data = await res.json();
          return {
            success: true,
            messageId: data.id,
            provider: 'gmail',
            timestamp: new Date().toISOString(),
          };
        }
      }

      // Relay through SMTP Endpoint fallback
      const smtpRelay = new SmtpEmailProvider({ senderEmail: this.senderEmail });
      return await smtpRelay.sendEmail(message);

    } catch (err: any) {
      console.error('[GMAIL PROVIDER EXCEPTION]', err);
      const smtpRelay = new SmtpEmailProvider({ senderEmail: this.senderEmail });
      return await smtpRelay.sendEmail(message);
    }
  }

  public async verifyConnection(): Promise<{ connected: boolean; email?: string; error?: string }> {
    return { connected: true, email: this.senderEmail };
  }
}
