import { NextResponse } from 'next/server';
import { AppwriteException } from 'node-appwrite';
import { ADMIN_SESSION_COOKIE, createAdminSession } from '@/lib/admin-auth';
import { logAdminAuditEvent } from '@/lib/admin-audit';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const email = typeof body?.email === 'string' ? body.email : '';
    const password = typeof body?.password === 'string' ? body.password : '';

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const sessionSecret = await createAdminSession(email, password);

    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: ADMIN_SESSION_COOKIE,
      value: sessionSecret,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    await logAdminAuditEvent({
      request,
      event: 'login',
      email: email.trim().toLowerCase(),
      path: '/admin/login',
    });

    return response;
  } catch (error) {
    console.error('POST /api/admin/auth/login:', error);

    if (error instanceof AppwriteException) {
      const message = error.message || 'Login failed';
      const status = error.code >= 400 && error.code < 600 ? error.code : 401;
      return NextResponse.json(
        {
          error: message,
          code: error.code,
          type: error.type,
        },
        { status }
      );
    }

    const message = error instanceof Error ? error.message : 'Login failed';
    const status = /Missing APPWRITE_ENDPOINT|APPWRITE_PROJECT_ID/.test(message)
      ? 500
      : /not allowed to access admin/i.test(message)
      ? 403
      : 401;
    return NextResponse.json({ error: message }, { status });
  }
}
