import { NextRequest, NextResponse } from 'next/server';
import { backendFetch, getClientHeaders, getSessionCookie } from '@/lib/api';

export async function POST(request: NextRequest) {
  const res = await backendFetch('/api/admin/auth/logout', {
    method: 'POST',
    cookie: getSessionCookie(request),
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

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const next = url.searchParams.get('next') || '/';

  await backendFetch('/api/admin/auth/logout', {
    method: 'POST',
    cookie: getSessionCookie(request),
    headers: getClientHeaders(request),
  });

  const response = NextResponse.redirect(new URL(next, url));
  // Clear the session cookie client-side as well
  response.cookies.set({
    name: 'chs_admin_session',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
}
