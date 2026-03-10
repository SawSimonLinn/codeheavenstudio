/**
 * GET  /api/bin        → returns { blogs: string[], receipts: string[] }
 * POST /api/bin        → soft-delete: body { type: 'blogs'|'receipts', id: string }
 * DELETE /api/bin      → permanent delete: body { type, id } — requires admin key verification first
 */
import { NextRequest, NextResponse } from 'next/server';
import { readBin, addToBin, removeFromBin } from '@/lib/bin-store';
import { backendFetch, getSessionCookie } from '@/lib/api';

export const maxDuration = 60;

export async function GET() {
  const bin = readBin();
  return NextResponse.json(bin);
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const type = body?.type as 'blogs' | 'receipts' | undefined;
  const id = body?.id as string | undefined;

  if (!type || !['blogs', 'receipts'].includes(type) || !id) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  addToBin(type, id);
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const type = body?.type as 'blogs' | 'receipts' | undefined;
  const id = body?.id as string | undefined;
  const adminKey = body?.adminKey as string | undefined;

  if (!type || !['blogs', 'receipts'].includes(type) || !id) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  // Verify admin key server-side
  const configuredKey = process.env.ADMIN_DELETE_KEY;
  if (!configuredKey) {
    return NextResponse.json({ error: 'Admin delete key not configured' }, { status: 500 });
  }
  if (!adminKey || adminKey !== configuredKey) {
    return NextResponse.json({ error: 'Invalid admin key' }, { status: 403 });
  }

  // Call backend to permanently delete
  const backendPath = type === 'blogs' ? `/api/blogs/${id}` : `/api/receipts/${id}`;
  const res = await backendFetch(backendPath, {
    method: 'DELETE',
    cookie: getSessionCookie(request),
  });

  if (!res.ok && res.status !== 204 && res.status !== 404) {
    const err = await res.json().catch(() => ({ error: 'Delete failed' }));
    return NextResponse.json(err, { status: res.status });
  }

  // Remove from bin store
  removeFromBin(type, id);
  return NextResponse.json({ ok: true });
}
