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

  useEffect(() => { load(); }, [load]);

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
    <div className="p-4 sm:p-6 md:p-8">
      <div className="mb-6 sm:mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Receipts</h1>
          <p className="text-sm text-gray-500 mt-1">Manage all client receipts</p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/admin/receipts/new">
            <PlusCircle className="h-4 w-4" />
            New Receipt
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-sm text-gray-400 animate-pulse">
          Loading receipts...
        </div>
      ) : (
        <ReceiptsTable
          receipts={receipts}
          onRefresh={load}
          onSendEmail={setEmailTarget}
        />
      )}

      {/* Send Email Confirmation Dialog */}
      <Dialog open={!!emailTarget} onOpenChange={(open) => !open && setEmailTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-blue-500" />
              Send Receipt via Email
            </DialogTitle>
            <DialogDescription>
              This will send receipt{' '}
              <span className="font-mono font-semibold">{emailTarget?.receiptNumber}</span> to{' '}
              <span className="font-semibold">{emailTarget?.clientEmail}</span>.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setEmailTarget(null)}>Cancel</Button>
            <Button onClick={handleSendEmail} disabled={sending}>
              {sending ? 'Sending...' : 'Send Email'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
