import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function sanitizeEmail(value: unknown): string {
  const email = String(value ?? '').trim().toLowerCase();
  return /^(?!.*[\r\n])[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : '';
}

function sanitizeText(value: unknown, maxLen = 200): string {
  return String(value ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLen);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const email = sanitizeEmail((body as Record<string, unknown>).email);
  const asset = sanitizeText((body as Record<string, unknown>).asset, 100);

  if (!email) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  const smtpHost = process.env.SMTP_HOST ?? process.env.EMAIL_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT ?? process.env.EMAIL_PORT ?? '587', 10);
  const smtpUser = process.env.SMTP_USER ?? process.env.EMAIL_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = (process.env.SMTP_FROM ?? process.env.EMAIL_FROM ?? smtpUser ?? '').trim();
  const notifyTo = process.env.PRESS_NOTIFY_EMAIL ?? 'codeheavenstudio@gmail.com';

  if (!smtpHost || !smtpUser || !smtpPass || !smtpFrom) {
    // SMTP not configured — still allow the download, just skip the notification
    return NextResponse.json({ success: true, notified: false });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: smtpFrom.includes('<') ? smtpFrom : `"Code Heaven Studio" <${smtpFrom}>`,
      to: notifyTo,
      subject: `Press Kit Download: ${asset || 'unknown asset'}`,
      text: `Someone downloaded a press asset from your website.\n\nEmail: ${email}\nAsset: ${asset || 'unknown'}\nTime: ${new Date().toUTCString()}`,
      html: `
        <div style="font-family:Arial,sans-serif;color:#1f2937;max-width:480px">
          <h2 style="margin:0 0 12px">Press Kit Download</h2>
          <p style="margin:0 0 8px">Someone downloaded a press asset from your website.</p>
          <table style="border-collapse:collapse;width:100%;margin-top:12px">
            <tr>
              <td style="padding:8px 12px;background:#f3f4f6;font-weight:600;width:80px">Email</td>
              <td style="padding:8px 12px;border:1px solid #e5e7eb">${email}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;background:#f3f4f6;font-weight:600">Asset</td>
              <td style="padding:8px 12px;border:1px solid #e5e7eb">${asset || 'unknown'}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;background:#f3f4f6;font-weight:600">Time</td>
              <td style="padding:8px 12px;border:1px solid #e5e7eb">${new Date().toUTCString()}</td>
            </tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true, notified: true });
  } catch (error) {
    console.error('press download-request email error:', error);
    // Don't block the download if email fails
    return NextResponse.json({ success: true, notified: false });
  }
}
