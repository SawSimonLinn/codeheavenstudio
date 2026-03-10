import { NextRequest, NextResponse } from 'next/server';
import { backendFetch, getSessionCookie } from '@/lib/api';

export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const limit = url.searchParams.get('limit') ?? '50';
  const res = await backendFetch(`/api/admin/audit?limit=${limit}`, {
    cookie: getSessionCookie(request),
  });
  const data = await res.json();
  const logs = (data.documents ?? []).map((doc: Record<string, unknown>) => ({
    id: doc.id,
    createdAt: doc.createdAt,
    event: doc.event,
    email: doc.email,
    path: doc.path,
    ip: doc.ip,
    userAgent: doc.userAgent,
    deviceType: doc.deviceType,
    browser: doc.browser,
    os: doc.os,
    city: doc.city,
    region: doc.region,
    country: doc.country,
  }));
  return NextResponse.json({ logs, total: data.total }, { status: res.status });
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const res = await backendFetch('/api/admin/audit', {
    method: 'POST',
    body,
    cookie: getSessionCookie(request),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
