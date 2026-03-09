import { NextRequest, NextResponse } from 'next/server';
import { backendFetch, getSessionCookie } from '@/lib/api';

export async function GET(request: NextRequest) {
  const res = await backendFetch('/api/admin/auth/session', {
    cookie: getSessionCookie(request),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
