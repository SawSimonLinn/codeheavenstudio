import type { CreateReceiptData, Receipt, ReceiptStatus } from '@/types/receipt';
import { createSupabaseAdminClient } from '@/lib/supabase-server';

type ReceiptRow = {
  id: string;
  receipt_number: string;
  client_name: string;
  client_email: string;
  company_name: string | null;
  issue_date: string;
  due_date: string | null;
  items: unknown;
  subtotal: number | string;
  tax: number | string;
  discount: number | string;
  total: number | string;
  notes: string | null;
  status: ReceiptStatus;
  created_at: string;
};

type ReceiptUpdateRow = {
  client_name?: string;
  client_email?: string;
  company_name?: string | null;
  issue_date?: string;
  due_date?: string | null;
  items?: unknown;
  subtotal?: number;
  tax?: number;
  discount?: number;
  total?: number;
  notes?: string;
  status?: ReceiptStatus;
};

const RECEIPTS_TABLE = (process.env.SUPABASE_RECEIPTS_TABLE ?? 'receipts').trim();
const NEXT_RECEIPT_COUNTER_RPC = (process.env.SUPABASE_NEXT_RECEIPT_COUNTER_RPC ?? 'next_receipt_counter').trim();

function parseItems(raw: unknown): Receipt['items'] {
  if (Array.isArray(raw)) {
    return raw as Receipt['items'];
  }

  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as Receipt['items']) : [];
    } catch {
      return [];
    }
  }

  return [];
}

function toNumber(value: unknown): number {
  const normalized = typeof value === 'number' ? value : Number(value ?? 0);
  return Number.isFinite(normalized) ? normalized : 0;
}

function toReceipt(row: ReceiptRow): Receipt {
  return {
    id: row.id,
    receiptNumber: row.receipt_number,
    clientName: row.client_name,
    clientEmail: row.client_email,
    companyName: row.company_name ?? '',
    issueDate: row.issue_date,
    dueDate: row.due_date ?? '',
    items: parseItems(row.items),
    subtotal: toNumber(row.subtotal),
    tax: toNumber(row.tax),
    discount: toNumber(row.discount),
    total: toNumber(row.total),
    notes: row.notes ?? '',
    status: row.status,
    createdAt: row.created_at,
  };
}

function toReceiptPayload(data: Partial<Receipt>): ReceiptUpdateRow {
  const payload: ReceiptUpdateRow = {};

  if (data.clientName !== undefined) payload.client_name = data.clientName;
  if (data.clientEmail !== undefined) payload.client_email = data.clientEmail;
  if (data.companyName !== undefined) payload.company_name = data.companyName || null;
  if (data.issueDate !== undefined) payload.issue_date = data.issueDate;
  if (data.dueDate !== undefined) payload.due_date = data.dueDate || null;
  if (data.items !== undefined) payload.items = data.items;
  if (data.subtotal !== undefined) payload.subtotal = data.subtotal;
  if (data.tax !== undefined) payload.tax = data.tax;
  if (data.discount !== undefined) payload.discount = data.discount;
  if (data.total !== undefined) payload.total = data.total;
  if (data.notes !== undefined) payload.notes = data.notes;
  if (data.status !== undefined) payload.status = data.status;

  return payload;
}

async function generateReceiptNumber(): Promise<string> {
  const supabase = createSupabaseAdminClient();
  const year = new Date().getFullYear();
  const counterName = `receipts-${year}`;

  const { data, error } = await supabase.rpc(NEXT_RECEIPT_COUNTER_RPC, {
    counter_name: counterName,
  });

  if (error) {
    throw new Error(
      `Failed to generate receipt number. Ensure Supabase RPC \"${NEXT_RECEIPT_COUNTER_RPC}\" exists. ${error.message}`
    );
  }

  const next = Number(data);
  if (!Number.isFinite(next) || next < 1) {
    throw new Error('Failed to generate a valid receipt number counter.');
  }

  return `RCPT-${year}-${String(Math.trunc(next)).padStart(4, '0')}`;
}

function calcTotals(items: Receipt['items'], tax: number, discount: number) {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const taxAmount = (subtotal * tax) / 100;
  const total = subtotal + taxAmount - discount;
  return { subtotal, total };
}

export async function createReceipt(data: CreateReceiptData): Promise<Receipt> {
  const supabase = createSupabaseAdminClient();
  const receiptNumber = await generateReceiptNumber();
  const { subtotal, total } = calcTotals(data.items, data.tax, data.discount);

  const payload = {
    receipt_number: receiptNumber,
    client_name: data.clientName,
    client_email: data.clientEmail,
    company_name: data.companyName || null,
    issue_date: data.issueDate,
    due_date: data.dueDate || null,
    items: data.items,
    subtotal,
    tax: data.tax,
    discount: data.discount,
    total,
    notes: data.notes ?? '',
    status: data.status,
  };

  const { data: created, error } = await supabase.from(RECEIPTS_TABLE).insert(payload).select('*').single();

  if (error) {
    throw new Error(`Failed to create receipt: ${error.message}`);
  }

  return toReceipt(created as ReceiptRow);
}

export async function getReceipts(): Promise<Receipt[]> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from(RECEIPTS_TABLE)
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5000);

  if (error) {
    throw new Error(`Failed to fetch receipts: ${error.message}`);
  }

  return (data ?? []).map((row) => toReceipt(row as ReceiptRow));
}

export async function getReceipt(id: string): Promise<Receipt | null> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase.from(RECEIPTS_TABLE).select('*').eq('id', id).maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch receipt: ${error.message}`);
  }

  if (!data) return null;
  return toReceipt(data as ReceiptRow);
}

export async function updateReceipt(id: string, data: Partial<Receipt>): Promise<void> {
  const supabase = createSupabaseAdminClient();
  const current = await getReceipt(id);
  if (!current) {
    throw new Error('Receipt not found');
  }

  const updates: Partial<Receipt> = { ...data };
  if (data.items !== undefined || data.tax !== undefined || data.discount !== undefined) {
    const nextItems = data.items ?? current.items;
    const nextTax = data.tax ?? current.tax;
    const nextDiscount = data.discount ?? current.discount;
    const { subtotal, total } = calcTotals(nextItems, nextTax, nextDiscount);
    updates.subtotal = subtotal;
    updates.total = total;
  }

  const payload = toReceiptPayload(updates);
  if (Object.keys(payload).length === 0) {
    return;
  }

  const { error } = await supabase.from(RECEIPTS_TABLE).update(payload).eq('id', id);
  if (error) {
    throw new Error(`Failed to update receipt: ${error.message}`);
  }
}

export async function deleteReceipt(id: string): Promise<void> {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from(RECEIPTS_TABLE).delete().eq('id', id);
  if (error) {
    throw new Error(`Failed to delete receipt: ${error.message}`);
  }
}

export async function updateReceiptStatus(id: string, status: ReceiptStatus): Promise<void> {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from(RECEIPTS_TABLE).update({ status }).eq('id', id);
  if (error) {
    throw new Error(`Failed to update receipt status: ${error.message}`);
  }
}
