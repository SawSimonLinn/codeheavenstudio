import { NextRequest, NextResponse } from 'next/server';
import { backendFetch, getSessionCookie, parseReceipt } from '@/lib/api';
import { readBin } from '@/lib/bin-store';

export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const res = await backendFetch('/api/receipts', {
    cookie: getSessionCookie(request),
  });
  const data = await res.json();

  // Filter out soft-deleted (binned) receipts
  if (res.ok) {
    const { receipts: binnedIds } = readBin();
    const list: { id: string }[] = Array.isArray(data) ? data : (data.receipts ?? []);
    const filtered = list
      .filter((r) => !binnedIds.includes(r.id))
      .map(parseReceipt);
    const result = Array.isArray(data) ? filtered : { ...data, receipts: filtered };
    return NextResponse.json(result, { status: res.status });
  }

  return NextResponse.json(data, { status: res.status });
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const res = await backendFetch('/api/receipts', {
    method: 'POST',
    body,
    cookie: getSessionCookie(request),
  });
  const data = await res.json();
  return NextResponse.json(res.ok ? parseReceipt(data) : data, { status: res.status });
}
