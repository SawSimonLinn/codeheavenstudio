import { NextResponse } from 'next/server';
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

    const message = error instanceof Error ? error.message : 'Login failed';
    const status =
      /Missing required env var: SUPABASE_URL|Missing required env var: SUPABASE_ANON_KEY|Missing required env var: SUPABASE_PUBLISHABLE_KEY|Missing required env var: SUPABASE_SERVICE_ROLE_KEY|Missing ADMIN_AUTH_SECRET/i.test(
        message
      )
      ? 500
      : /not allowed to access admin/i.test(message)
      ? 403
      : 401;

    return NextResponse.json({ error: message }, { status });
  }
}
