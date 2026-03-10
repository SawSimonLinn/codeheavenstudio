import type { CreateReceiptData, Receipt, ReceiptStatus } from '@/types/receipt';

async function parseResponse<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      data && typeof data === 'object' && 'error' in data
        ? String((data as { error: unknown }).error)
        : `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return data as T;
}

export async function apiGetReceipts(): Promise<Receipt[]> {
  const res = await fetch('/api/receipts', { cache: 'no-store' });
  const data = await parseResponse<Receipt[] | { receipts: Receipt[] }>(res);
  return Array.isArray(data) ? data : (data.receipts ?? []);
}

export async function apiCreateReceipt(data: CreateReceiptData): Promise<Receipt> {
  const res = await fetch('/api/receipts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return parseResponse<Receipt>(res);
}

export async function apiGetReceipt(id: string): Promise<Receipt | null> {
  const res = await fetch(`/api/receipts/${id}`, { cache: 'no-store' });
  if (res.status === 404) return null;
  return parseResponse<Receipt>(res);
}

export async function apiUpdateReceipt(id: string, data: Partial<Receipt>): Promise<Receipt> {
  const res = await fetch(`/api/receipts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return parseResponse<Receipt>(res);
}

export async function apiDeleteReceipt(id: string): Promise<void> {
  const res = await fetch(`/api/receipts/${id}`, {
    method: 'DELETE',
  });
  await parseResponse<{ success: boolean }>(res);
}

export async function apiUpdateReceiptStatus(id: string, status: ReceiptStatus): Promise<Receipt> {
  return apiUpdateReceipt(id, { status });
}

export async function apiSoftDeleteReceipt(id: string): Promise<void> {
  const res = await fetch('/api/bin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'receipts', id }),
  });
  await parseResponse<{ ok: boolean }>(res);
}

export async function apiRestoreReceipt(id: string): Promise<void> {
  const res = await fetch('/api/bin/restore', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'receipts', id }),
  });
  await parseResponse<{ ok: boolean }>(res);
}

export async function apiGetDeletedReceipts(): Promise<Receipt[]> {
  const res = await fetch('/api/bin', { cache: 'no-store' });
  const bin = await parseResponse<{ blogs: string[]; receipts: string[] }>(res);
  if (bin.receipts.length === 0) return [];
  const receipts = await Promise.all(bin.receipts.map((id) => apiGetReceipt(id)));
  return receipts.filter((r): r is Receipt => r !== null);
}
