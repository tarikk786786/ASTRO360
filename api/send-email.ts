import nodemailer from 'nodemailer';

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { recipient, subject, html, text, senderEmail, smtpPassword } = req.body || {};

    const targetRecipient = recipient || 'apnix7@gmail.com';
    const userEmail = senderEmail || process.env.GMAIL_USER || 'apnix7@gmail.com';
    const userPass = smtpPassword || process.env.GMAIL_PASS || 'Tarik@8984';

    // 1. Try Gmail SMTP Transport
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: userEmail,
          pass: userPass,
        },
      });

      const info = await transporter.sendMail({
        from: `"COSMOS OMNI Notifications" <${userEmail}>`,
        to: targetRecipient,
        subject: subject || '🔔 COSMOS OMNI System Notification',
        text: text || 'Your ASTRO360 notification alert.',
        html: html || '<p>Your ASTRO360 notification alert.</p>',
      });

      return res.status(200).json({
        success: true,
        messageId: info.messageId,
        accepted: info.accepted,
        provider: 'gmail_smtp',
        timestamp: new Date().toISOString(),
      });
    } catch (smtpErr: any) {
      console.warn('[GMAIL SMTP DISPATCH WARN] SMTP login failed:', smtpErr?.message);
      
      const isBadCredentials = smtpErr?.message?.includes('535') || smtpErr?.code === 'EAUTH';

      if (process.env.RESEND_API_KEY) {
        try {
          const resendRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: 'COSMOS OMNI <onboarding@resend.dev>',
              to: [targetRecipient],
              subject: subject || '🔔 COSMOS OMNI System Notification',
              html: html || '<p>Your ASTRO360 notification alert.</p>',
            }),
          });

          if (resendRes.ok) {
            const resendData = await resendRes.json();
            return res.status(200).json({
              success: true,
              messageId: resendData.id,
              provider: 'resend_api',
              timestamp: new Date().toISOString(),
            });
          }
        } catch (resendErr) {
          console.warn('[RESEND FALLBACK NOTICE]', resendErr);
        }
      }

      const userGuidance = isBadCredentials
        ? 'Google rejected password (535 Bad Credentials). Google requires a 16-character App Password for SMTP access. Please generate one at: https://myaccount.google.com/apppasswords'
        : (smtpErr?.message || 'SMTP server email delivery failed');

      return res.status(400).json({
        success: false,
        error: userGuidance,
        code: smtpErr?.code || 'EAUTH',
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error: any) {
    console.error('SMTP Serverless Dispatch Exception:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'SMTP server email delivery failed',
      timestamp: new Date().toISOString(),
    });
  }
}
