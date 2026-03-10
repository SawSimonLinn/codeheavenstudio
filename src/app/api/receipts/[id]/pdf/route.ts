import { NextRequest, NextResponse } from 'next/server';
import { backendFetch, getSessionCookie } from '@/lib/api';

export const maxDuration = 60;

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await backendFetch(`/api/receipts/${id}/pdf`, {
    cookie: getSessionCookie(request),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: 'Failed to generate PDF' }));
    return NextResponse.json(data, { status: res.status });
  }

  const buffer = await res.arrayBuffer();
  const contentDisposition = res.headers.get('content-disposition') ?? 'attachment; filename="receipt.pdf"';

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': contentDisposition,
      'Cache-Control': 'no-store',
    },
  });
}
