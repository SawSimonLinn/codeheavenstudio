'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { PlusCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReceiptsTable from '@/components/admin/receipts-table';
import { apiGetReceipts } from '@/lib/receipts-client';
import type { Receipt } from '@/types/receipt';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export default function ReceiptsPage() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [emailTarget, setEmailTarget] = useState<Receipt | null>(null);
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const load = useCallback(() => {
    setLoading(true);
    apiGetReceipts()
      .then(setReceipts)
      .catch(() => toast({ title: 'Failed to load receipts', variant: 'destructive' }))
      .finally(() => setLoading(false));
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  const handleSendEmail = async () => {
    if (!emailTarget) return;
    setSending(true);
    try {
      const res = await fetch(`/api/receipts/${emailTarget.id}/send-email`, { method: 'POST' });
      if (!res.ok) throw new Error();
      toast({ title: `Receipt sent to ${emailTarget.clientEmail}` });
      setEmailTarget(null);
      load();
    } catch {
      toast({ title: 'Failed to send email', variant: 'destructive' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 md:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-[#7782A0]">Billing Workspace</p>
          <h1 className="mt-1 text-2xl font-black tracking-tight text-[#F4F5F7]">Receipts</h1>
          <p className="mt-1 text-sm text-[#8A92A8]">Manage all client receipts</p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/admin/receipts/new">
            <PlusCircle className="h-4 w-4" />
            New Receipt
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-[#1E222C] bg-[#10131A]/95 p-8 text-center text-sm text-[#707A92]">
          Loading receipts...
        </div>
      ) : (
        <ReceiptsTable receipts={receipts} onRefresh={load} onSendEmail={setEmailTarget} />
      )}

      <Dialog open={!!emailTarget} onOpenChange={(open) => !open && setEmailTarget(null)}>
        <DialogContent className="border-[#27304A] bg-[#0F131D] text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[#F4F5F7]">
              <Send className="h-5 w-5 text-[#8EA8FF]" />
              Send Receipt via Email
            </DialogTitle>
            <DialogDescription className="text-[#9AA3B9]">
              This will send receipt{' '}
              <span className="font-mono font-semibold text-[#DCE3F4]">{emailTarget?.receiptNumber}</span> to{' '}
              <span className="font-semibold text-[#DCE3F4]">{emailTarget?.clientEmail}</span>.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => setEmailTarget(null)}
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
