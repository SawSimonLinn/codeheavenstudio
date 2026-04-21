import { NextResponse } from 'next/server';
import {
  ADMIN_SESSION_COOKIE,
  getAdminUserFromSessionSecret,
  getCookieFromRequest,
} from '@/lib/admin-auth';
import { listAdminAuditEvents, logAdminAuditEvent } from '@/lib/admin-audit';

async function getAuthenticatedAdmin(request: Request) {
  const sessionSecret = getCookieFromRequest(request, ADMIN_SESSION_COOKIE);
  if (!sessionSecret) {
    return null;
  }

  try {
    return await getAdminUserFromSessionSecret(sessionSecret);
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const user = await getAuthenticatedAdmin(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(request.url);
  const requestedLimit = Number(url.searchParams.get('limit') || '50');
  const logs = await listAdminAuditEvents(requestedLimit);

  return NextResponse.json({ logs });
}

export async function POST(request: Request) {
  const user = await getAuthenticatedAdmin(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const path = typeof body?.path === 'string' ? body.path : '';

  await logAdminAuditEvent({
    request,
    event: 'visit',
    email: user.email,
    path,
  });

  return NextResponse.json({ success: true });
}
