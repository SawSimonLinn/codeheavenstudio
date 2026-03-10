import { NextRequest, NextResponse } from 'next/server';
import { backendFetch, getClientHeaders } from '@/lib/api';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const body = await request.text();

  let res: Response;
  try {
    res = await backendFetch('/api/admin/auth/login', {
      method: 'POST',
      body,
      headers: getClientHeaders(request),
    });
  } catch {
    return NextResponse.json(
      { error: 'Cannot reach the backend. It may be starting up — please try again in a moment.' },
      { status: 503 },
    );
  }

  const data = await res.json().catch(() => ({ error: 'Invalid response from backend' }));
  const response = NextResponse.json(data, { status: res.status });

  const setCookie = res.headers.get('set-cookie');
  if (setCookie) response.headers.set('set-cookie', setCookie);

  return response;
}
