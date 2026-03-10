import { NextRequest, NextResponse } from 'next/server';
import { backendFetch, getSessionCookie, parseBlogPost } from '@/lib/api';

export const maxDuration = 60;

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.text();
  const res = await backendFetch(`/api/blogs/${id}/status`, {
    method: 'PATCH',
    body,
    cookie: getSessionCookie(request),
  });
  const data = await res.json();
  return NextResponse.json(res.ok ? parseBlogPost(data) : data, { status: res.status });
}
