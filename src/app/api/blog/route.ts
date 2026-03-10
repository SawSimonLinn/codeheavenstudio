import { NextRequest, NextResponse } from 'next/server';
import { backendFetch, getSessionCookie, parseBlogPost } from '@/lib/api';

export const maxDuration = 60;
import { readBin } from '@/lib/bin-store';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const query = status ? `?status=${status}` : '';
  const res = await backendFetch(`/api/blogs${query}`, {
    cookie: getSessionCookie(request),
  });
  const data = await res.json();

  // Filter out soft-deleted (binned) items from main list
  if (res.ok && Array.isArray(data)) {
    const { blogs: binnedIds } = readBin();
    const filtered = data
      .filter((post: { id: string }) => !binnedIds.includes(post.id))
      .map(parseBlogPost);
    return NextResponse.json(filtered, { status: res.status });
  }

  return NextResponse.json(data, { status: res.status });
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const res = await backendFetch('/api/blogs', {
    method: 'POST',
    body,
    cookie: getSessionCookie(request),
  });
  const data = await res.json();
  return NextResponse.json(res.ok ? parseBlogPost(data) : data, { status: res.status });
}
