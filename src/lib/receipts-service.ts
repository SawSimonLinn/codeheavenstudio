import { AppwriteException, Client, Databases, ID, Models, Query } from 'node-appwrite';
import type { Receipt, CreateReceiptData, ReceiptStatus } from '@/types/receipt';

type ReceiptDoc = {
  receiptNumber: string;
  clientName: string;
  clientEmail: string;
  companyName?: string | null;
  issueDate: string;
  dueDate?: string | null;
  items: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  notes: string;
  status: ReceiptStatus;
};

type CounterDoc = {
  name: string;
  count: number;
};

type ReceiptDocument = Models.Document & ReceiptDoc;
type CounterDocument = Models.Document & CounterDoc;

function getAppwriteContext() {
  const endpoint = process.env.APPWRITE_ENDPOINT;
  const projectId = process.env.APPWRITE_PROJECT_ID;
  const apiKey = process.env.APPWRITE_API_KEY;
  const databaseId = process.env.APPWRITE_DATABASE_ID;
  const receiptsCollectionId = process.env.APPWRITE_RECEIPTS_COLLECTION_ID;
  const countersCollectionId = process.env.APPWRITE_COUNTERS_COLLECTION_ID;

  if (!endpoint || !projectId || !apiKey || !databaseId || !receiptsCollectionId || !countersCollectionId) {
    throw new Error(
      'Missing Appwrite env vars. Required: APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_API_KEY, APPWRITE_DATABASE_ID, APPWRITE_RECEIPTS_COLLECTION_ID, APPWRITE_COUNTERS_COLLECTION_ID.'
    );
  }

  const client = new Client().setEndpoint(endpoint).setProject(projectId).setKey(apiKey);
  const databases = new Databases(client);

  return { databases, databaseId, receiptsCollectionId, countersCollectionId };
}

function parseItems(raw: string): Receipt['items'] {
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Receipt['items'];
  } catch {
    return [];
  }
}

function toReceipt(document: ReceiptDocument): Receipt {
  return {
    id: document.$id,
    receiptNumber: document.receiptNumber,
    clientName: document.clientName,
    clientEmail: document.clientEmail,
    companyName: document.companyName ?? '',
    issueDate: document.issueDate,
    dueDate: document.dueDate ?? '',
    items: parseItems(document.items),
    subtotal: document.subtotal,
    tax: document.tax,
    discount: document.discount,
    total: document.total,
    notes: document.notes,
    status: document.status,
    createdAt: document.$createdAt,
  };
}

function toReceiptPayload(data: Partial<Receipt>): Partial<ReceiptDoc> {
  const payload: Partial<ReceiptDoc> = {};

  if (data.clientName !== undefined) payload.clientName = data.clientName;
  if (data.clientEmail !== undefined) payload.clientEmail = data.clientEmail;
  if (data.companyName !== undefined) payload.companyName = data.companyName;
  if (data.issueDate !== undefined) payload.issueDate = data.issueDate;
  if (data.dueDate !== undefined) payload.dueDate = data.dueDate;
  if (data.items !== undefined) payload.items = JSON.stringify(data.items);
  if (data.subtotal !== undefined) payload.subtotal = data.subtotal;
  if (data.tax !== undefined) payload.tax = data.tax;
  if (data.discount !== undefined) payload.discount = data.discount;
  if (data.total !== undefined) payload.total = data.total;
  if (data.notes !== undefined) payload.notes = data.notes;
  if (data.status !== undefined) payload.status = data.status;

  return payload;
}

async function generateReceiptNumber(): Promise<string> {
  const { databases, databaseId, countersCollectionId } = getAppwriteContext();
  const year = new Date().getFullYear();
  const counterName = `receipts-${year}`;

  const existing = await databases.listDocuments<CounterDocument>(databaseId, countersCollectionId, [
    Query.equal('name', counterName),
    Query.limit(1),
  ]);

  const counter = existing.documents[0]
    ? existing.documents[0]
    : await databases.createDocument<CounterDocument>(databaseId, countersCollectionId, ID.unique(), {
        name: counterName,
        count: 0,
      });

  const next = counter.count + 1;
  await databases.updateDocument(databaseId, countersCollectionId, counter.$id, { count: next });

  return `RCPT-${year}-${String(next).padStart(4, '0')}`;
}

function calcTotals(items: Receipt['items'], tax: number, discount: number) {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const taxAmount = (subtotal * tax) / 100;
  const total = subtotal + taxAmount - discount;
  return { subtotal, total };
}

export async function createReceipt(data: CreateReceiptData): Promise<Receipt> {
  const { databases, databaseId, receiptsCollectionId } = getAppwriteContext();
  const receiptNumber = await generateReceiptNumber();
  const { subtotal, total } = calcTotals(data.items, data.tax, data.discount);

  const receiptData: ReceiptDoc = {
    ...data,
    receiptNumber,
    companyName: data.companyName ?? '',
    dueDate: data.dueDate ?? '',
    items: JSON.stringify(data.items),
    subtotal,
    total,
    notes: data.notes ?? '',
    status: data.status,
  };

  const created = await databases.createDocument<ReceiptDocument>(
    databaseId,
    receiptsCollectionId,
    ID.unique(),
    receiptData
  );

  return toReceipt(created);
}

export async function getReceipts(): Promise<Receipt[]> {
  const { databases, databaseId, receiptsCollectionId } = getAppwriteContext();
  const response = await databases.listDocuments<ReceiptDocument>(databaseId, receiptsCollectionId, [
    Query.orderDesc('$createdAt'),
    Query.limit(5000),
  ]);
  return response.documents.map((doc) => toReceipt(doc));
}

export async function getReceipt(id: string): Promise<Receipt | null> {
  const { databases, databaseId, receiptsCollectionId } = getAppwriteContext();
  try {
    const doc = await databases.getDocument<ReceiptDocument>(databaseId, receiptsCollectionId, id);
    return toReceipt(doc);
  } catch (error) {
    if (error instanceof AppwriteException && error.code === 404) {
      return null;
    }
    throw error;
  }
}

export async function updateReceipt(id: string, data: Partial<Receipt>): Promise<void> {
  const { databases, databaseId, receiptsCollectionId } = getAppwriteContext();
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

  await databases.updateDocument(databaseId, receiptsCollectionId, id, toReceiptPayload(updates));
}

export async function deleteReceipt(id: string): Promise<void> {
  const { databases, databaseId, receiptsCollectionId } = getAppwriteContext();
  await databases.deleteDocument(databaseId, receiptsCollectionId, id);
}

export async function updateReceiptStatus(id: string, status: ReceiptStatus): Promise<void> {
  const { databases, databaseId, receiptsCollectionId } = getAppwriteContext();
  await databases.updateDocument(databaseId, receiptsCollectionId, id, { status });
}
