import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
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
    return res.status(405).json({ status: 'error', message: 'Method Not Allowed. Expected POST.' });
  }

  try {
    const { name, email, subject, payload, message } = req.body || {};
    const transmissionContent = payload || message;

    if (!name || !email || !transmissionContent) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required transmission parameters (name, email, or message/payload).',
      });
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpHost = process.env.SMTP_HOST || 'smtppro.zoho.com';
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const recipientEmail = process.env.TO_EMAIL || 'loid@sednium.com';

    if (!smtpUser || !smtpPass) {
      console.warn('SMTP_USER or SMTP_PASS not set in environment variables.');
      return res.status(500).json({
        status: 'error',
        message: 'SMTP credentials are not configured on the server. Please set SMTP_USER and SMTP_PASS in Vercel.',
      });
    }

    // Configure Zoho Mail SMTP transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const transmissionTimestamp = new Date().toUTCString();
    const formattedSubject = subject 
      ? `[TRANSMISSION // ${subject}] From ${name}` 
      : `[TRANSMISSION // CTO INQUIRY] From ${name}`;

    // Cyberpunk HTML Email Template
    const htmlEmail = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: 'JetBrains Mono', 'Courier New', monospace;
            background-color: #06080e;
            color: #e2e8f0;
            padding: 24px;
            margin: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #0d121f;
            border: 1px solid #00f0ff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 0 25px rgba(0, 240, 255, 0.15);
          }
          .header {
            background: linear-gradient(135deg, #00f0ff 0%, #3b82f6 100%);
            padding: 20px;
            color: #06080e;
            font-weight: 800;
            letter-spacing: 1px;
          }
          .header h1 {
            margin: 0;
            font-size: 18px;
          }
          .body {
            padding: 24px;
          }
          .meta-item {
            margin-bottom: 12px;
            font-size: 13px;
          }
          .label {
            color: #00f0ff;
            font-weight: 600;
            text-transform: uppercase;
          }
          .payload-box {
            margin-top: 20px;
            padding: 16px;
            background-color: #05070c;
            border: 1px solid #1e293b;
            border-left: 3px solid #00f0ff;
            border-radius: 8px;
            color: #f8fafc;
            font-size: 14px;
            white-space: pre-wrap;
            line-height: 1.6;
          }
          .footer {
            padding: 16px 24px;
            border-top: 1px solid #1e293b;
            font-size: 11px;
            color: #64748b;
            display: flex;
            justify-content: space-between;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>&gt; SECURE TRANSMISSION DISPATCHED</h1>
          </div>
          <div class="body">
            <div class="meta-item">
              <span class="label">Sender:</span> ${name}
            </div>
            <div class="meta-item">
              <span class="label">Return Channel:</span> <a href="mailto:${email}" style="color: #38bdf8;">${email}</a>
            </div>
            <div class="meta-item">
              <span class="label">Subject:</span> ${subject || 'CTO Consultation / Decentralized Infrastructure'}
            </div>
            <div class="meta-item">
              <span class="label">Timestamp:</span> ${transmissionTimestamp}
            </div>

            <div style="margin-top: 20px; color: #94a3b8; font-size: 12px;">
              // ENCRYPTED TRANSMISSION PAYLOAD:
            </div>
            <div class="payload-box">
${transmissionContent}
            </div>
          </div>
          <div class="footer">
            <span>SEDNIUM OS // P2P MESH NODE</span>
            <span>DESTINATION: ${recipientEmail}</span>
          </div>
        </div>
      </body>
    </html>
    `;

    // Send Mail
    await transporter.sendMail({
      from: `"${name} [Løid Portfolio]" <${smtpUser}>`,
      replyTo: email,
      to: recipientEmail,
      subject: formattedSubject,
      text: `[Secure Transmission]\nFrom: ${name} (${email})\nSubject: ${subject || 'N/A'}\nTime: ${transmissionTimestamp}\n\nPayload:\n${transmissionContent}`,
      html: htmlEmail,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Transmission dispatched successfully to Sednium Core Node.',
    });
  } catch (error: any) {
    console.error('Transmission dispatch error:', error);
    return res.status(500).json({
      status: 'error',
      message: error?.message || 'Internal server transmission failure.',
    });
  }
}
