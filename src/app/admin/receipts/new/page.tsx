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
    <div className="mx-auto max-w-7xl p-4 sm:p-6 md:p-8">
      <div className="mb-6">
        <Link
          href="/admin/receipts"
          className="mb-4 inline-flex w-fit items-center gap-1.5 text-sm text-[#8A93A8] transition-colors hover:text-[#C9D0DE]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Receipts
        </Link>
        <p className="text-xs uppercase tracking-[0.14em] text-[#7782A0]">Billing Workspace</p>
        <h1 className="mt-1 text-2xl font-black tracking-tight text-[#F4F5F7]">New Receipt</h1>
        <p className="mt-1 text-sm text-[#8A92A8]">Fill in the details and preview before saving</p>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <div>
          <ReceiptForm
            onSubmit={handleSubmit}
            onChange={setPreviewData}
            loading={loading}
            submitLabel="Create Receipt"
          />
        </div>

        <div className="xl:sticky xl:top-8 xl:self-start">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#7782A0]">Live Preview</p>
          <ReceiptPreview data={previewData as ReceiptFormValues} />
        </div>
      </div>
    </div>
  );
}
