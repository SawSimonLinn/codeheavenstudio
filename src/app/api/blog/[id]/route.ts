import { NextRequest, NextResponse } from 'next/server';
import { backendFetch, getSessionCookie, parseBlogPost } from '@/lib/api';

export const maxDuration = 60;

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await backendFetch(`/api/blogs/${id}`, {
    cookie: getSessionCookie(request),
  });
  const data = await res.json();
  return NextResponse.json(res.ok ? parseBlogPost(data) : data, { status: res.status });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.text();
  const res = await backendFetch(`/api/blogs/${id}`, {
    method: 'PUT',
    body,
    cookie: getSessionCookie(request),
  });
  const data = await res.json();
  return NextResponse.json(res.ok ? parseBlogPost(data) : data, { status: res.status });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await backendFetch(`/api/blogs/${id}`, {
    method: 'DELETE',
    cookie: getSessionCookie(request),
  });
  if (res.status === 204) {
    return new NextResponse(null, { status: 204 });
  }
  const data = await res.json().catch(() => ({ success: true }));
  return NextResponse.json(data, { status: res.status });
}
