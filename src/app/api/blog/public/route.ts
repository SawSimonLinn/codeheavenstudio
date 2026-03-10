import { NextResponse } from 'next/server';
import { backendFetch, parseBlogPost } from '@/lib/api';

export const maxDuration = 60;

export async function GET() {
  const res = await backendFetch('/api/blogs/public');
  const data = await res.json();
  if (res.ok && Array.isArray(data)) {
    return NextResponse.json(data.map(parseBlogPost), { status: res.status });
  }
  return NextResponse.json(data, { status: res.status });
}
