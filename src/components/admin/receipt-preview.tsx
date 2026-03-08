'use client';

import type { Receipt } from '@/types/receipt';
import type { ReceiptFormValues } from './receipt-form';

type PreviewData = Partial<Receipt> | ReceiptFormValues;

interface Props {
  data: PreviewData;
  receiptNumber?: string;
  receiptId?: string;
}

function asNumber(value: unknown): number {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : 0;
  }
  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function fmt(n: unknown) {
  return `$${asNumber(n).toFixed(2)}`;
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    draft: '#9ca3af',
    sent: '#3b82f6',
    paid: '#10b981',
  };
  return map[status] ?? '#9ca3af';
}

export default function ReceiptPreview({ data, receiptNumber, receiptId }: Props) {
  const items = (data as Receipt).items ?? [];
  const subtotal = items.reduce(
    (s, i) => s + asNumber(i.quantity) * asNumber(i.price),
    0
  );
  const taxAmt = (subtotal * asNumber((data as Receipt).tax)) / 100;
  const discount = asNumber((data as Receipt).discount);
  const total = subtotal + taxAmt - discount;

  const handleDownload = async () => {
    if (receiptId) {
      const response = await fetch(`/api/receipts/${receiptId}/pdf`);
      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `receipt-${receiptNumber ?? 'RCPT'}.pdf`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
      return;
    }

    if (typeof window !== 'undefined') {
      const prev = document.title;
      document.title = `receipt-${receiptNumber ?? 'RCPT'}`;
      window.print();
      document.title = prev;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Print controls — only shown on new receipt page (no receiptId), hidden when printing */}
      {!receiptId && (
        <div className="flex justify-end mb-4 print:hidden">
          <button
            onClick={() => {
              void handleDownload().catch((error) => {
                console.error('Download failed:', error);
              });
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Print / Save PDF
          </button>
        </div>
      )}

      {/* Receipt card */}
      <div
        id="receipt-print"
        className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm print:shadow-none print:border-0 print:rounded-none"
        style={{ minHeight: '600px' }}
      >
        {/* Header */}
        <div className="px-8 py-6 flex items-start justify-between border-b border-gray-100"
          style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)' }}
        >
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-10 w-10 object-contain rounded-md" />
            <div>
              <p className="font-bold text-white text-lg leading-tight">Code Heaven Studio</p>
              <p className="text-blue-200 text-xs">Professional Web Development</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-white tracking-tight">RECEIPT</p>
            <p className="text-blue-200 text-sm mt-1">
              {receiptNumber ?? <span className="italic opacity-60">RCPT-XXXX-XXXX</span>}
            </p>
            <span
              className="inline-block mt-2 px-2 py-0.5 rounded text-xs font-semibold text-white"
              style={{ background: statusBadge((data as Receipt).status ?? 'draft') }}
            >
              {((data as Receipt).status ?? 'draft').toUpperCase()}
            </span>
          </div>
        </div>

        <div className="px-8 py-6">
          {/* Dates + Client Row */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Bill To</p>
              <p className="font-semibold text-gray-900">{(data as Receipt).clientName || 'Client Name'}</p>
              {(data as Receipt).companyName && (
                <p className="text-sm text-gray-600">{(data as Receipt).companyName}</p>
              )}
              <p className="text-sm text-gray-500">{(data as Receipt).clientEmail || 'client@email.com'}</p>
            </div>
            <div className="text-right">
              <div className="space-y-1">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Issue Date</p>
                  <p className="text-sm font-medium text-gray-900">{(data as Receipt).issueDate || '—'}</p>
                </div>
                {(data as Receipt).dueDate && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mt-2">Due Date</p>
                    <p className="text-sm font-medium text-gray-900">{(data as Receipt).dueDate}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* From section */}
          <div className="mb-6 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">From</p>
            <p className="text-sm font-medium text-gray-800">Code Heaven Studio</p>
            <p className="text-xs text-gray-500">hello@codeheavenstudio.com · codeheavenstudio.com</p>
          </div>

          {/* Items Table */}
          <table className="w-full text-sm mb-6">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Service</th>
                <th className="text-left pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Description</th>
                <th className="text-right pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Qty</th>
                <th className="text-right pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="text-right pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400 italic text-sm">
                    No services added yet
                  </td>
                </tr>
              ) : (
                items.map((item, i) => (
                  <tr key={item.id ?? i}>
                    <td className="py-3 font-medium text-gray-900">{item.serviceName || '—'}</td>
                    <td className="py-3 text-gray-500 hidden sm:table-cell">{item.description}</td>
                    <td className="py-3 text-right text-gray-700">{asNumber(item.quantity)}</td>
                    <td className="py-3 text-right text-gray-700">{fmt(item.price)}</td>
                    <td className="py-3 text-right font-medium text-gray-900">
                      {fmt(asNumber(item.quantity) * asNumber(item.price))}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax ({asNumber((data as Receipt).tax)}%)</span>
                <span>{fmt(taxAmt)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Discount</span>
                  <span>-{fmt(discount)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-gray-900 text-base border-t pt-2">
                <span>Total</span>
                <span>{fmt(total)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {(data as Receipt).notes && (
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Notes</p>
              <p className="text-sm text-gray-700 whitespace-pre-line">{(data as Receipt).notes}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            Thank you for working with Code Heaven Studio · codeheavenstudio.com
          </p>
        </div>
      </div>
    </div>
  );
}
