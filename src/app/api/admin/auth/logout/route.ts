import { NextRequest, NextResponse } from 'next/server';
import { backendFetch, getClientHeaders, getSessionCookie } from '@/lib/api';

export const maxDuration = 60;

const CLEAR_COOKIE = {
  name: 'chs_admin_session',
  value: '',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 0,
};

export async function POST(request: NextRequest) {
  // Best-effort backend logout — always clear the cookie regardless of outcome
  const backendRes = await backendFetch('/api/admin/auth/logout', {
    method: 'POST',
    cookie: getSessionCookie(request),
    headers: getClientHeaders(request),
  }).catch(() => null);

  const response = NextResponse.json({ ok: true }, { status: 200 });

  // Forward backend set-cookie if present
  const setCookie = backendRes?.headers.get('set-cookie');
  if (setCookie) response.headers.set('set-cookie', setCookie);

  response.cookies.set(CLEAR_COOKIE);
  return response;
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const next = url.searchParams.get('next') || '/';

  // Best-effort backend logout — always redirect regardless of outcome
  backendFetch('/api/admin/auth/logout', {
    method: 'POST',
    cookie: getSessionCookie(request),
    headers: getClientHeaders(request),
  }).catch(() => null);

  const response = NextResponse.redirect(new URL(next, url));
  response.cookies.set(CLEAR_COOKIE);
  return response;
}
