/**
 * ASTRO360 Gmail & Email Provider Abstraction Layer
 * Supports Google OAuth 2.0 Gmail API & MockEmailProvider for local dev/testing
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
    return { connected: true, email: 'mock-dev@astro360.local' };
  }
}

/**
 * Official Google OAuth 2.0 Gmail API Provider
 * Uses minimum scope: https://www.googleapis.com/auth/gmail.send
 */
export class GmailProvider implements EmailProvider {
  public name: 'gmail' = 'gmail';
  private clientId: string;
  private clientSecret: string;
  private refreshToken: string;
  private senderEmail: string;

  constructor(config: {
    clientId: string;
    clientSecret: string;
    refreshToken: string;
    senderEmail: string;
  }) {
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.refreshToken = config.refreshToken;
    this.senderEmail = config.senderEmail;
  }

  /**
   * Refreshes OAuth 2.0 Access Token from Google OAuth Endpoint
   */
  private async getAccessToken(): Promise<string> {
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
    // Convert base64 to base64url format
    return btoa(unescape(encodeURIComponent(raw)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  public async sendEmail(message: EmailMessage): Promise<SendResult> {
    try {
      const accessToken = await this.getAccessToken();
      const rawMessage = this.createRfc2822Message(message);

      const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ raw: rawMessage }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(`Gmail API error ${res.status}: ${errorData.error?.message || res.statusText}`);
      }

      const data = await res.json();
      return {
        success: true,
        messageId: data.id,
        provider: 'gmail',
        timestamp: new Date().toISOString(),
      };
    } catch (err: any) {
      console.error('[GMAIL API ERROR]', err);
      return {
        success: false,
        provider: 'gmail',
        timestamp: new Date().toISOString(),
        error: err.message || 'Unknown Gmail API failure',
      };
    }
  }

  public async verifyConnection(): Promise<{ connected: boolean; email?: string; error?: string }> {
    try {
      const token = await this.getAccessToken();
      return { connected: !!token, email: this.senderEmail };
    } catch (err: any) {
      return { connected: false, error: err.message };
    }
  }
}
