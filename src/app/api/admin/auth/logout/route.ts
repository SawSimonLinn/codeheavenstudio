import { NextResponse } from 'next/server';
import {
  ADMIN_SESSION_COOKIE,
  destroyAdminSession,
  getAdminUserFromSessionSecret,
  getCookieFromRequest,
} from '@/lib/admin-auth';
import { logAdminAuditEvent } from '@/lib/admin-audit';

function clearSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

async function logLogoutIfPossible(request: Request, sessionSecret: string | null) {
  if (!sessionSecret) return;

  let email = '';
  try {
    const user = await getAdminUserFromSessionSecret(sessionSecret);
    email = user.email;
  } catch {
    // Ignore invalid/expired session parse failures for logout logs.
  }

  await logAdminAuditEvent({
    request,
    event: 'logout',
    email,
    path: '/admin/logout',
  });
}

function getSafeRedirectUrl(url: URL) {
  const next = url.searchParams.get('next');
  if (!next || !next.startsWith('/') || next.startsWith('//')) {
    return new URL('/', url);
  }

  const redirectUrl = new URL(next, url);
  return redirectUrl.origin === url.origin ? redirectUrl : new URL('/', url);
}

export async function POST(request: Request) {
  const sessionSecret = getCookieFromRequest(request, ADMIN_SESSION_COOKIE);

  await logLogoutIfPossible(request, sessionSecret);

  if (sessionSecret) {
    await destroyAdminSession(sessionSecret).catch(() => undefined);
  }

  const response = NextResponse.json({ success: true });
  clearSessionCookie(response);

  return response;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const sessionSecret = getCookieFromRequest(request, ADMIN_SESSION_COOKIE);

  await logLogoutIfPossible(request, sessionSecret);

  if (sessionSecret) {
    await destroyAdminSession(sessionSecret).catch(() => undefined);
  }

  const response = NextResponse.redirect(getSafeRedirectUrl(url));
  clearSessionCookie(response);

  return response;
}
