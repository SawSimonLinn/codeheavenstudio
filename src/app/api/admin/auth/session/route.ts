import { NextRequest, NextResponse } from 'next/server';
import { backendFetch, getSessionCookie } from '@/lib/api';

export const maxDuration = 60;

export async function GET(request: NextRequest) {
  let res: Response;
  try {
    res = await backendFetch('/api/admin/auth/session', {
      cookie: getSessionCookie(request),
    });
  } catch {
    return NextResponse.json({ error: 'Backend unavailable' }, { status: 503 });
  }
  const data = await res.json().catch(() => ({ error: 'Invalid response from backend' }));
  return NextResponse.json(data, { status: res.status });
}
