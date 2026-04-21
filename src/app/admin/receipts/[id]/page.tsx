'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Download, Edit2, Eye, Send, Trash2 } from 'lucide-react';
import ReceiptPreview from '@/components/admin/receipt-preview';
import ReceiptForm, { ReceiptFormValues } from '@/components/admin/receipt-form';
import { apiDeleteReceipt, apiGetReceipt, apiUpdateReceipt } from '@/lib/receipts-client';
import type { Receipt, CreateReceiptData } from '@/types/receipt';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export default function ReceiptDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { toast } = useToast();

  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [previewData, setPreviewData] = useState<Partial<ReceiptFormValues>>({});

  useEffect(() => {
    apiGetReceipt(id)
      .then((r) => {
        setReceipt(r);
        if (r) setPreviewData(r as unknown as ReceiptFormValues);
      })
      .catch(() => toast({ title: 'Failed to load receipt', variant: 'destructive' }))
      .finally(() => setLoading(false));
  }, [id, toast]);

  const handleUpdate = async (data: CreateReceiptData) => {
    if (!receipt) return;
    setSaving(true);
    try {
      const updated = await apiUpdateReceipt(receipt.id, data as Partial<Receipt>);
      setReceipt(updated);
      if (updated) setPreviewData(updated as unknown as ReceiptFormValues);
      setEditing(false);
      toast({ title: 'Receipt updated!' });
    } catch {
      toast({ title: 'Failed to update receipt', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!receipt || !confirm(`Delete ${receipt.receiptNumber}? This cannot be undone.`)) return;
    try {
      await apiDeleteReceipt(receipt.id);
      toast({ title: 'Receipt deleted' });
      router.push('/admin/receipts');
    } catch {
      toast({ title: 'Failed to delete receipt', variant: 'destructive' });
    }
  };

  const handleSendEmail = async () => {
    if (!receipt) return;
    setSending(true);
    try {
      const res = await fetch(`/api/receipts/${receipt.id}/send-email`, { method: 'POST' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'Failed to send');
      }
      toast({ title: `Receipt sent to ${receipt.clientEmail}` });
      const updated = await apiGetReceipt(receipt.id);
      setReceipt(updated);
      setSendDialogOpen(false);
    } catch (err: unknown) {
      toast({
        title: 'Failed to send email',
        description: err instanceof Error ? err.message : undefined,
        variant: 'destructive',
      });
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-sm text-[#6F7790]">
        Loading receipt...
      </div>
    );
  }

  if (!receipt) {
    return (
      <div className="p-8 text-center">
        <p className="text-[#8A92A8]">Receipt not found.</p>
        <Button
          asChild
          className="mt-4 border-[#2A3040] bg-[#121621] text-[#DDE3ED] hover:bg-[#181E2C] hover:text-white"
          variant="outline"
        >
          <Link href="/admin/receipts">Back to Receipts</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 md:p-8">
      <div className="mb-6 flex flex-col gap-4">
        <div>
          <Link
            href="/admin/receipts"
            className="mb-2 inline-flex w-fit items-center gap-1.5 text-sm text-[#8A93A8] transition-colors hover:text-[#C9D0DE]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Receipts
          </Link>
          <h1 className="text-2xl font-black tracking-tight text-[#F4F5F7]">{receipt.receiptNumber}</h1>
          <p className="mt-0.5 text-sm text-[#8A92A8]">
            {receipt.clientName} · {receipt.clientEmail}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 print:hidden">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="flex-1 border-[#2A3040] bg-[#121621] text-[#DDE3ED] hover:bg-[#181E2C] hover:text-white sm:flex-none"
          >
            <a href={`/api/receipts/${receipt.id}/pdf`} target="_blank" rel="noopener noreferrer">
              <Eye className="h-3.5 w-3.5" />
              Preview PDF
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="flex-1 border-[#2A3040] bg-[#121621] text-[#DDE3ED] hover:bg-[#181E2C] hover:text-white sm:flex-none"
          >
            <a href={`/api/receipts/${receipt.id}/pdf`} download>
              <Download className="h-3.5 w-3.5" />
              Download PDF
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-[#2A3040] bg-[#121621] text-[#DDE3ED] hover:bg-[#181E2C] hover:text-white sm:flex-none"
            onClick={() => setEditing(!editing)}
          >
            <Edit2 className="h-3.5 w-3.5" />
            {editing ? 'Cancel Edit' : 'Edit'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-[#2E3F73] bg-[#131E3C] text-[#A6BEFF] hover:bg-[#172751] hover:text-[#C7D6FF] sm:flex-none"
            onClick={() => setSendDialogOpen(true)}
          >
            <Send className="h-3.5 w-3.5" />
            Send Email
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-[#5C2934] bg-[#2A151B] text-[#F7A7B3] hover:bg-[#3A1B23] hover:text-[#FFD1D8] sm:flex-none"
            onClick={handleDelete}
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </Button>
        </div>
      </div>

      {editing ? (
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
          <div>
            <ReceiptForm
              defaultValues={receipt}
              onSubmit={handleUpdate}
              onChange={setPreviewData}
              loading={saving}
              submitLabel="Save Changes"
            />
          </div>
          <div className="xl:sticky xl:top-8 xl:self-start">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#7782A0]">Live Preview</p>
            <ReceiptPreview data={previewData} receiptNumber={receipt.receiptNumber} receiptId={receipt.id} />
          </div>
        </div>
      ) : (
        <ReceiptPreview data={receipt} receiptNumber={receipt.receiptNumber} receiptId={receipt.id} />
      )}

      <Dialog open={sendDialogOpen} onOpenChange={(open) => !open && setSendDialogOpen(false)}>
        <DialogContent className="border-[#27304A] bg-[#0F131D] text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[#F4F5F7]">
              <Send className="h-5 w-5 text-[#8EA8FF]" />
              Send Receipt via Email
            </DialogTitle>
            <DialogDescription className="text-[#9AA3B9]">
              This will send <span className="font-mono font-semibold text-[#DCE3F4]">{receipt.receiptNumber}</span> to{' '}
              <span className="font-semibold text-[#DCE3F4]">{receipt.clientEmail}</span>.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => setSendDialogOpen(false)}
              className="border-[#2A3040] bg-[#121621] text-[#DDE3ED] hover:bg-[#181E2C] hover:text-white"
            >
              Cancel
            </Button>
            <Button onClick={handleSendEmail} disabled={sending}>
              {sending ? 'Sending...' : 'Send Email'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
