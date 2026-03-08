import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE } from '@/lib/admin-auth-constants';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasSession = Boolean(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);

  // If an admin session returns to the website home page, force logout.
  if (pathname === '/' && hasSession) {
    const logoutUrl = request.nextUrl.clone();
    logoutUrl.pathname = '/api/admin/auth/logout';
    logoutUrl.searchParams.set('next', '/');
    return NextResponse.redirect(logoutUrl);
  }

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  if (hasSession) {
    return NextResponse.next();
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = '/admin/login';
  loginUrl.searchParams.set('next', `${pathname}${search}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/', '/admin/:path*'],
};
