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
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('SMTP Serverless Dispatch Exception:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'SMTP server email delivery failed',
      timestamp: new Date().toISOString(),
    });
  }
}
