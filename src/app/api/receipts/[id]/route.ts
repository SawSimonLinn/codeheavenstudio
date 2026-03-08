import { NextResponse } from 'next/server';
import { getReceipt, updateReceipt, deleteReceipt } from '@/lib/receipts-service';
import type { Receipt } from '@/types/receipt';
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
    if (!receipt) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(receipt);
  } catch (error) {
    console.error('GET /api/receipts/[id]:', error);
    return NextResponse.json({ error: 'Failed to fetch receipt' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await ensureAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;
  try {
    const body: Partial<Receipt> = await request.json();
    await updateReceipt(id, body);
    const updated = await getReceipt(id);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('PUT /api/receipts/[id]:', error);
    return NextResponse.json({ error: 'Failed to update receipt' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await ensureAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;
  try {
    await deleteReceipt(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/receipts/[id]:', error);
    return NextResponse.json({ error: 'Failed to delete receipt' }, { status: 500 });
  }
}
