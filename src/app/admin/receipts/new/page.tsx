'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ReceiptForm, { ReceiptFormValues } from '@/components/admin/receipt-form';
import ReceiptPreview from '@/components/admin/receipt-preview';
import { apiCreateReceipt } from '@/lib/receipts-client';
import type { CreateReceiptData } from '@/types/receipt';
import { useToast } from '@/hooks/use-toast';

export default function NewReceiptPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [previewData, setPreviewData] = useState<Partial<ReceiptFormValues>>({});

  const handleSubmit = async (data: CreateReceiptData) => {
    setLoading(true);
    try {
      const receipt = await apiCreateReceipt(data);
      toast({ title: `Receipt ${receipt.receiptNumber} created!` });
      router.push(`/admin/receipts/${receipt.id}`);
    } catch (err) {
      console.error(err);
      toast({ title: 'Failed to create receipt', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="mb-6">
        <Link
          href="/admin/receipts"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4 w-fit"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Receipts
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">New Receipt</h1>
        <p className="text-sm text-gray-500 mt-1">Fill in the details and preview before saving</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Form */}
        <div>
          <ReceiptForm
            onSubmit={handleSubmit}
            onChange={setPreviewData}
            loading={loading}
            submitLabel="Create Receipt"
          />
        </div>

        {/* Live Preview */}
        <div className="xl:sticky xl:top-8 xl:self-start">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Live Preview</p>
          <ReceiptPreview data={previewData as ReceiptFormValues} />
        </div>
      </div>
    </div>
  );
}
