import { NextResponse } from 'next/server';
import { getReceipts, createReceipt } from '@/lib/receipts-service';
import type { CreateReceiptData } from '@/types/receipt';
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

export async function GET(request: Request) {
  const unauthorized = await ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const receipts = await getReceipts();
    return NextResponse.json(receipts);
  } catch (error) {
    console.error('GET /api/receipts:', error);
    return NextResponse.json({ error: 'Failed to fetch receipts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const unauthorized = await ensureAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const body: CreateReceiptData = await request.json();
    const receipt = await createReceipt(body);
    return NextResponse.json(receipt, { status: 201 });
  } catch (error) {
    console.error('POST /api/receipts:', error);
    return NextResponse.json({ error: 'Failed to create receipt' }, { status: 500 });
  }
}
