import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getReceipt, updateReceiptStatus } from '@/lib/receipts-service';
import { generateReceiptPdf, getReceiptPdfFilename } from '@/lib/receipt-pdf';
import {
  ADMIN_SESSION_COOKIE,
  getAdminUserFromSessionSecret,
  getCookieFromRequest,
} from '@/lib/admin-auth';

async function ensureAdmin(request: Request) {
  const sessionSecret = getCookieFromRequest(request, ADMIN_SESSION_COOKIE);
  if (!sessionSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await getAdminUserFromSessionSecret(sessionSecret);
    return null;
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

function sanitizeText(value: unknown, maxLen = 200): string {
  return String(value ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLen);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function sanitizeEmail(value: unknown): string {
  const email = String(value ?? '').trim().toLowerCase();
  return /^(?!.*[\r\n])[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : '';
}

const PAYMENT_METHODS = ['Cash', 'Check', 'Zelle', 'Bank Transfer'] as const;

function formatMoney(value: number): string {
  return `$${value.toFixed(2)}`;
}

function formatDate(value: string): string {
  if (!value) return '';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function buildEmailText(clientName: string, receiptNumber: string, totalAmount: number, dueDate?: string) {
  const paymentMethods = PAYMENT_METHODS.map((method) => `- ${method}`).join('\n');
  const formattedDueDate = formatDate(dueDate ?? '');

  return [
    `Hello ${clientName},`,
    '',
    'Thank you for working with us.',
    'Please find your receipt attached.',
    '',
    'Recommended Payment Flow (Simple & Professional)',
    '1) Send Receipt / Invoice',
    'We created your receipt and sent it by email. It includes:',
    `Receipt Number: ${receiptNumber}`,
    `Total Amount: ${formatMoney(totalAmount)}`,
    formattedDueDate ? `Payment Due Date: ${formattedDueDate}` : '',
    'Payment Instructions: Please include your receipt number in the payment note or memo.',
    'Accepted Payment Methods:',
    paymentMethods,
    '',
    '2) Client Pays Using One of the Methods',
    'You can complete payment using any method listed above.',
    '',
    'Best regards.',
  ]
    .filter(Boolean)
    .join('\n');
}

function buildEmailHtml(clientName: string, receiptNumber: string, totalAmount: number, dueDate?: string) {
  const safeClientName = escapeHtml(clientName);
  const safeReceiptNumber = escapeHtml(receiptNumber);
  const safeTotalAmount = escapeHtml(formatMoney(totalAmount));
  const safeDueDate = escapeHtml(formatDate(dueDate ?? ''));
  const paymentMethodsHtml = PAYMENT_METHODS.map((method) => `<li>${escapeHtml(method)}</li>`).join('');

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1f2937;max-width:580px">
      <p>Hello ${safeClientName},</p>
      <p>Thank you for working with us.<br />Please find your receipt attached.</p>
      <p style="margin-bottom:8px"><strong>Recommended Payment Flow (Simple &amp; Professional)</strong></p>
      <p style="margin:0 0 6px"><strong>1) Send Receipt / Invoice</strong></p>
      <p style="margin:0 0 8px">We created your receipt and sent it by email. It includes:</p>
      <ul style="margin:0 0 14px 18px;padding:0">
        <li><strong>Receipt Number:</strong> ${safeReceiptNumber}</li>
        <li><strong>Total Amount:</strong> ${safeTotalAmount}</li>
        ${safeDueDate ? `<li><strong>Payment Due Date:</strong> ${safeDueDate}</li>` : ''}
        <li><strong>Payment Instructions:</strong> Please include your receipt number in the payment note or memo.</li>
        <li><strong>Payment Methods:</strong>
          <ul style="margin:6px 0 0 18px;padding:0">
            ${paymentMethodsHtml}
          </ul>
        </li>
      </ul>
      <p style="margin:0 0 6px"><strong>2) Client Pays Using One of the Methods</strong></p>
      <p style="margin:0 0 12px">You can complete payment using any method listed above.</p>
      <p>Best regards.</p>
    </div>
  `;
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await ensureAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;

  const smtpHost = process.env.SMTP_HOST ?? process.env.EMAIL_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT ?? process.env.EMAIL_PORT ?? '587', 10);
  const smtpUser = process.env.SMTP_USER ?? process.env.EMAIL_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = (process.env.SMTP_FROM ?? process.env.EMAIL_FROM ?? smtpUser ?? '').trim();

  if (!smtpHost || !smtpUser || !smtpPass || !smtpFrom) {
    return NextResponse.json(
      {
        error:
          'Email not configured. Set SMTP_HOST/SMTP_USER/SMTP_PASS or EMAIL_HOST/EMAIL_USER/SMTP_PASS in .env.local',
      },
      { status: 503 }
    );
  }

  try {
    const receipt = await getReceipt(id);
    if (!receipt) return NextResponse.json({ error: 'Receipt not found' }, { status: 404 });

    const clientEmail = sanitizeEmail(receipt.clientEmail);
    const clientName = sanitizeText(receipt.clientName, 100) || 'Client';
    const receiptNumber = sanitizeText(receipt.receiptNumber, 80);
    const subjectCompany = sanitizeText(receipt.companyName, 120) || 'Code Heaven Studio';

    if (!clientEmail) {
      return NextResponse.json({ error: 'Receipt has an invalid client email' }, { status: 400 });
    }
    if (!receiptNumber) {
      return NextResponse.json({ error: 'Receipt number is missing or invalid' }, { status: 400 });
    }

    const pdfBytes = await generateReceiptPdf(receipt);
    const fileName = getReceiptPdfFilename(receiptNumber);

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: smtpFrom.includes('<') ? smtpFrom : `"Code Heaven Studio" <${smtpFrom}>`,
      to: clientEmail,
      subject: `Your Receipt from ${subjectCompany}`,
      text: buildEmailText(clientName, receiptNumber, receipt.total, receipt.dueDate),
      html: buildEmailHtml(clientName, receiptNumber, receipt.total, receipt.dueDate),
      attachments: [
        {
          filename: fileName,
          content: Buffer.from(pdfBytes),
          contentType: 'application/pdf',
        },
      ],
    });

    await updateReceiptStatus(id, 'sent');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('send-email error:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
