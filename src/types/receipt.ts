export type ReceiptStatus = 'draft' | 'sent' | 'paid';

export interface ReceiptItem {
  id: string;
  serviceName: string;
  description: string;
  quantity: number;
  price: number;
}

export interface Receipt {
  id: string;
  receiptNumber: string;
  clientName: string;
  clientEmail: string;
  companyName: string;
  issueDate: string;
  dueDate: string;
  items: ReceiptItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  notes: string;
  status: ReceiptStatus;
  createdAt: string;
}

export type CreateReceiptData = Omit<Receipt, 'id' | 'receiptNumber' | 'createdAt' | 'subtotal' | 'total'>;
