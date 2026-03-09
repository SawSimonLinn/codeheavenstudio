import { NextRequest, NextResponse } from 'next/server';
import { backendFetch, getSessionCookie } from '@/lib/api';

export async function GET(request: NextRequest) {
  const res = await backendFetch('/api/receipts', {
    cookie: getSessionCookie(request),
  });
  const data = await res.json();
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
  return NextResponse.json(data, { status: res.status });
}
