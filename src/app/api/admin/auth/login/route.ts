import { NextRequest, NextResponse } from 'next/server';
import { backendFetch, getClientHeaders } from '@/lib/api';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const res = await backendFetch('/api/admin/auth/login', {
    method: 'POST',
    body,
    headers: getClientHeaders(request),
  });

  const data = await res.json();
  const response = NextResponse.json(data, { status: res.status });

  const setCookie = res.headers.get('set-cookie');
  if (setCookie) {
    response.headers.set('set-cookie', setCookie);
  }

  return response;
}
