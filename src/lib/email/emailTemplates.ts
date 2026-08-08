/**
 * ASTRO360 Responsive HTML & Plain-Text Email Template Engine
 * Supports variable replacement {{variable}} for bedtime warnings, reports, & system notifications
 */

export type TemplateType =
  | 'BEDTIME_WARNING'
  | 'WELCOME'
  | 'EMAIL_VERIFICATION'
  | 'PASSWORD_RESET'
  | 'ASTROLOGY_REPORT'
  | 'ISLAMIC_REMINDER'
  | 'PRAYER_REMINDER'
  | 'SYSTEM_NOTIFICATION';

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

export function renderEmailTemplate(template: TemplateType, vars: Record<string, any>): RenderedEmail {
  const name = vars.name || 'Seeker';
  const date = vars.date || new Date().toLocaleDateString();

  switch (template) {
    case 'BEDTIME_WARNING': {
      const bedtime = vars.bedtime || '23:00';
      const remainingMinutes = vars.remaining_minutes || 30;
      const subject = `🌙 Your bedtime is approaching (${remainingMinutes} mins remaining)`;

      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0B1220; color: #F8FAFC; margin: 0; padding: 24px;">
          <div style="max-width: 560px; margin: 0 auto; background-color: #111827; border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 20px; padding: 32px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5);">
            <div style="text-align: center; margin-bottom: 24px;">
              <span style="font-size: 36px;">🌙</span>
              <h1 style="color: #F59E0B; font-size: 22px; margin-top: 8px;">Bedtime Warning</h1>
            </div>
            
            <p style="font-size: 15px; color: #E2E8F0; line-height: 1.6;">Peace be upon you, <strong>${name}</strong>.</p>
            <p style="font-size: 15px; color: #CBD5E1; line-height: 1.6;">
              Your scheduled bedtime is set for <strong style="color: #F59E0B;">${bedtime}</strong>. You have approximately <strong>${remainingMinutes} minutes</strong> remaining to complete your evening routine and prepare for restful sleep.
            </p>
            
            <div style="background-color: #0B1220; border-left: 4px solid #10B981; padding: 16px; border-radius: 8px; margin: 24px 0;">
              <p style="margin: 0; font-size: 13px; color: #10B981; font-weight: bold;">Sunnah & Health Tip:</p>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #94A3B8;">Recite Ayat al-Kursi, perform Wudu, and turn off digital screens for optimal recovery.</p>
            </div>
            
            <p style="font-size: 12px; color: #64748B; text-align: center; margin-top: 32px; border-top: 1px solid #1E293B; padding-top: 16px;">
              COSMOS OMNI Automated Health Telemetry • ${date}
            </p>
          </div>
        </body>
        </html>
      `;

      const text = `🌙 Bedtime Warning for ${name}\n\nYour scheduled bedtime is ${bedtime}. You have ${remainingMinutes} minutes remaining.\n\nTips: Turn off screens & prepare for sleep.\n\nDate: ${date}`;

      return { subject, html, text };
    }

    case 'ASTROLOGY_REPORT': {
      const reportTitle = vars.report_title || 'Natal Birth Chart Synthesis';
      const reportUrl = vars.report_url || 'https://tarikislam.in';
      const subject = `✨ Your ASTRO360 Astrological Dossier: ${reportTitle}`;

      const html = `
        <!DOCTYPE html>
        <html>
        <body style="font-family: sans-serif; background-color: #0B1220; color: #F8FAFC; padding: 24px;">
          <div style="max-width: 560px; margin: 0 auto; background-color: #111827; border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 20px; padding: 32px;">
            <h2 style="color: #C084FC;">✨ ASTRO360 Dossier Ready</h2>
            <p>Greetings <strong>${name}</strong>,</p>
            <p>Your astrological report for <strong>${reportTitle}</strong> has been generated and validated by our multi-agent calculation engine.</p>
            <div style="text-align: center; margin: 28px 0;">
              <a href="${reportUrl}" style="background-color: #9333EA; color: #ffffff; padding: 12px 24px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 14px;">View Executive Report ↗</a>
            </div>
          </div>
        </body>
        </html>
      `;

      const text = `✨ ASTRO360 Report Ready for ${name}\n\nReport: ${reportTitle}\nView: ${reportUrl}`;
      return { subject, html, text };
    }

    case 'ISLAMIC_REMINDER':
    case 'PRAYER_REMINDER': {
      const prayerName = vars.prayer_name || 'Fajr';
      const prayerTime = vars.prayer_time || '04:45 AM';
      const subject = `🕌 Prayer Reminder: ${prayerName} at ${prayerTime}`;

      const html = `
        <!DOCTYPE html>
        <html>
        <body style="font-family: sans-serif; background-color: #062016; color: #F8FAFC; padding: 24px;">
          <div style="max-width: 560px; margin: 0 auto; background-color: #0B291D; border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 20px; padding: 32px;">
            <h2 style="color: #34D399;">🕌 ${prayerName} Prayer Time</h2>
            <p>Assalamu Alaikum <strong>${name}</strong>,</p>
            <p>The time for <strong>${prayerName}</strong> is at <strong>${prayerTime}</strong>.</p>
            <p style="color: #6EE7B7; font-style: italic;">"Indeed, prayer has been decreed upon the believers a decree of specified times." (Surah An-Nisa 4:103)</p>
          </div>
        </body>
        </html>
      `;

      const text = `🕌 Prayer Reminder: ${prayerName} is at ${prayerTime} for ${name}.`;
      return { subject, html, text };
    }

    default: {
      const title = vars.title || 'System Notification';
      const body = vars.body || 'You have a new notification from COSMOS OMNI.';
      const subject = `🔔 COSMOS OMNI: ${title}`;

      const html = `
        <!DOCTYPE html>
        <html>
        <body style="font-family: sans-serif; background-color: #0B1220; color: #F8FAFC; padding: 24px;">
          <div style="max-width: 560px; margin: 0 auto; background-color: #111827; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 32px;">
            <h3 style="color: #38BDF8;">🔔 ${title}</h3>
            <p>Hello <strong>${name}</strong>,</p>
            <p>${body}</p>
          </div>
        </body>
        </html>
      `;

      const text = `🔔 ${title}\n\nHello ${name},\n${body}`;
      return { subject, html, text };
    }
  }
}
