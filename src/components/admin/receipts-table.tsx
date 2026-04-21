'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, Trash2, Send, Download, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Receipt, ReceiptStatus } from '@/types/receipt';
import { apiDeleteReceipt, apiUpdateReceiptStatus } from '@/lib/receipts-client';
import { useToast } from '@/hooks/use-toast';

interface Props {
  receipts: Receipt[];
  onRefresh: () => void;
  onSendEmail: (receipt: Receipt) => void;
}

const statusColors: Record<ReceiptStatus, string> = {
  draft: 'bg-[#242A36] text-[#A8B0C3]',
  sent: 'bg-[#142A56] text-[#95B6FF]',
  paid: 'bg-[#173829] text-[#7EE5B4]',
};

export default function ReceiptsTable({ receipts, onRefresh, onSendEmail }: Props) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  const filtered = receipts.filter((r) => {
    const matchSearch =
      r.clientName.toLowerCase().includes(search.toLowerCase()) ||
      r.receiptNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.clientEmail.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleStatusChange = async (id: string, status: ReceiptStatus) => {
    try {
      await apiUpdateReceiptStatus(id, status);
      toast({ title: 'Status updated' });
      onRefresh();
    } catch {
      toast({ title: 'Error updating status', variant: 'destructive' });
    }
  };

  const handleDelete = async (r: Receipt) => {
    if (!confirm(`Delete receipt ${r.receiptNumber}? This cannot be undone.`)) return;
    setDeletingId(r.id);
    try {
      await apiDeleteReceipt(r.id);
      toast({ title: `${r.receiptNumber} deleted` });
      onRefresh();
    } catch {
      toast({ title: 'Error deleting receipt', variant: 'destructive' });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[#1E222C] bg-[#10131A]/95">
      <div className="flex flex-col gap-3 border-b border-[#1B1F2A] p-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5F6780]" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client name, email, or receipt number..."
            className="border-[#2A3040] bg-[#0C1017] pl-9 text-white placeholder:text-[#5F6780] focus-visible:ring-primary focus-visible:ring-offset-[#10131A]"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full border-[#2A3040] bg-[#0C1017] text-[#DEE4EF] focus:ring-primary focus:ring-offset-[#10131A] sm:w-44">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent className="border-[#2A3040] bg-[#111722] text-[#DEE4EF]">
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="sm:hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-sm text-[#7A8399]">
            {receipts.length === 0 ? 'No receipts found.' : 'No receipts match your search.'}
          </div>
        ) : (
          <div className="divide-y divide-[#1B1F2A]">
            {filtered.map((r) => (
              <div key={r.id} className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-mono text-xs font-medium text-[#8A93A8]">{r.receiptNumber}</p>
                    <p className="font-semibold text-[#F2F4F8]">{r.clientName}</p>
                    {r.companyName && <p className="text-xs text-[#6D7690]">{r.companyName}</p>}
                    <p className="text-xs text-[#8A93A8]">{r.clientEmail}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-bold text-[#F2F4F8]">${r.total.toFixed(2)}</p>
                    <p className="text-xs text-[#6D7690]">{r.issueDate}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <Select value={r.status} onValueChange={(v) => handleStatusChange(r.id, v as ReceiptStatus)}>
                    <SelectTrigger className={`h-7 w-24 border-0 text-xs ${statusColors[r.status]}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-[#2A3040] bg-[#111722] text-[#DEE4EF]">
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="sent">Sent</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-1">
                    <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-[#A4ACC0] hover:bg-[#1A2030] hover:text-white">
                      <Link href={`/admin/receipts/${r.id}`} title="View">
                        <Eye className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-[#8FB0FF] hover:bg-[#182749] hover:text-[#C2D4FF]"
                      title="Send Email"
                      onClick={() => onSendEmail(r)}
                    >
                      <Send className="h-3.5 w-3.5" />
                    </Button>
                    <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-[#A4ACC0] hover:bg-[#1A2030] hover:text-white" title="Download PDF">
                      <a href={`/api/receipts/${r.id}/pdf`}>
                        <Download className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-[#F49AA6] hover:bg-[#3B1C25] hover:text-[#FFCDD6]"
                      title="Delete"
                      disabled={deletingId === r.id}
                      onClick={() => handleDelete(r)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="hidden overflow-x-auto sm:block">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-sm text-[#7A8399]">
            {receipts.length === 0 ? 'No receipts found.' : 'No receipts match your search.'}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-[#1B1F2A] bg-[#0D1119]">
              <tr>
                <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-[#7F899E]">Receipt #</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-[#7F899E]">Client</th>
                <th className="hidden whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-[#7F899E] sm:table-cell">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-[#7F899E]">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.08em] text-[#7F899E]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1B1F2A]">
              {filtered.map((r) => (
                <tr key={r.id} className="transition-colors hover:bg-[#131722]">
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-medium text-[#DDE3EF]">{r.receiptNumber}</td>
                  <td className="min-w-[160px] px-4 py-3">
                    <p className="font-medium text-[#F3F4F8]">{r.clientName}</p>
                    {r.companyName && <p className="max-w-[180px] truncate text-xs text-[#6D7690]">{r.companyName}</p>}
                  </td>
                  <td className="hidden whitespace-nowrap px-4 py-3 text-[#97A0B5] sm:table-cell">{r.issueDate}</td>
                  <td className="px-4 py-3">
                    <Select value={r.status} onValueChange={(v) => handleStatusChange(r.id, v as ReceiptStatus)}>
                      <SelectTrigger className={`h-7 w-24 border-0 text-xs ${statusColors[r.status]}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border-[#2A3040] bg-[#111722] text-[#DEE4EF]">
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="sent">Sent</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-[#A4ACC0] hover:bg-[#1A2030] hover:text-white">
                        <Link href={`/admin/receipts/${r.id}`} title="View">
                          <Eye className="h-3.5 w-3.5" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-[#8FB0FF] hover:bg-[#182749] hover:text-[#C2D4FF]"
                        title="Send Email"
                        onClick={() => onSendEmail(r)}
                      >
                        <Send className="h-3.5 w-3.5" />
                      </Button>
                      <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-[#A4ACC0] hover:bg-[#1A2030] hover:text-white" title="Download PDF">
                        <a href={`/api/receipts/${r.id}/pdf`}>
                          <Download className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-[#F49AA6] hover:bg-[#3B1C25] hover:text-[#FFCDD6]"
                        title="Delete"
                        disabled={deletingId === r.id}
                        onClick={() => handleDelete(r)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="border-t border-[#1B1F2A] px-4 py-3 text-xs text-[#6F7790]">
        Showing {filtered.length} of {receipts.length} receipts
      </div>
    </div>
  );
}
