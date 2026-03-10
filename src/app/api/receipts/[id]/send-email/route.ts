import { NextRequest, NextResponse } from 'next/server';
import { backendFetch, getSessionCookie } from '@/lib/api';

export const maxDuration = 60;

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const res = await backendFetch(`/api/receipts/${id}/send-email`, {
      method: 'POST',
      cookie: getSessionCookie(request),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('[send-email] error:', error);
    return NextResponse.json(
      { error: 'Failed to send email', detail: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
