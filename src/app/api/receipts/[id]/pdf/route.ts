import { NextResponse } from 'next/server';
import { getReceipt } from '@/lib/receipts-service';
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

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await ensureAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;

  try {
    const receipt = await getReceipt(id);
    if (!receipt) {
      return NextResponse.json({ error: 'Receipt not found' }, { status: 404 });
    }

    const pdfBytes = await generateReceiptPdf(receipt);
    const fileName = getReceiptPdfFilename(receipt.receiptNumber);

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('GET /api/receipts/[id]/pdf:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
