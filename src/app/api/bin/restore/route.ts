/**
 * POST /api/bin/restore  →  body { type: 'blogs'|'receipts', id: string }
 * Removes the item from the bin (restores it to its original list).
 */
import { NextRequest, NextResponse } from 'next/server';
import { removeFromBin } from '@/lib/bin-store';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const type = body?.type as 'blogs' | 'receipts' | undefined;
  const id = body?.id as string | undefined;

  if (!type || !['blogs', 'receipts'].includes(type) || !id) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  removeFromBin(type, id);
  return NextResponse.json({ ok: true });
}
