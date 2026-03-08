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
  draft: 'bg-gray-100 text-gray-600',
  sent: 'bg-blue-100 text-blue-700',
  paid: 'bg-green-100 text-green-700',
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
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Filters */}
      <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client name, email, or receipt number..."
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Mobile card view */}
      <div className="sm:hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-400">
            {receipts.length === 0 ? 'No receipts found.' : 'No receipts match your search.'}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filtered.map((r) => (
              <div key={r.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-mono text-xs font-medium text-gray-500">{r.receiptNumber}</p>
                    <p className="font-semibold text-gray-900">{r.clientName}</p>
                    {r.companyName && <p className="text-xs text-gray-400">{r.companyName}</p>}
                    <p className="text-xs text-gray-500">{r.clientEmail}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-gray-900">${r.total.toFixed(2)}</p>
                    <p className="text-xs text-gray-400">{r.issueDate}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <Select
                    value={r.status}
                    onValueChange={(v) => handleStatusChange(r.id, v as ReceiptStatus)}
                  >
                    <SelectTrigger className={`h-7 text-xs w-24 border-0 ${statusColors[r.status]}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="sent">Sent</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-1">
                    <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                      <Link href={`/admin/receipts/${r.id}`} title="View">
                        <Eye className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                      title="Send Email"
                      onClick={() => onSendEmail(r)}
                    >
                      <Send className="h-3.5 w-3.5" />
                    </Button>
                    <Button asChild variant="ghost" size="icon" className="h-8 w-8" title="Download PDF">
                      <a href={`/api/receipts/${r.id}/pdf`}>
                        <Download className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-50"
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

      {/* Desktop table view */}
      <div className="hidden sm:block overflow-x-auto">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-400">
            {receipts.length === 0 ? 'No receipts found.' : 'No receipts match your search.'}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider whitespace-nowrap">Receipt #</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Client</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider hidden sm:table-cell whitespace-nowrap">Date</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs font-medium text-gray-900 whitespace-nowrap">{r.receiptNumber}</td>
                  <td className="px-4 py-3 min-w-[140px]">
                    <p className="font-medium text-gray-900">{r.clientName}</p>
                    {r.companyName && <p className="text-xs text-gray-400 truncate max-w-[160px]">{r.companyName}</p>}
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden sm:table-cell whitespace-nowrap">{r.issueDate}</td>
                  <td className="px-4 py-3">
                    <Select
                      value={r.status}
                      onValueChange={(v) => handleStatusChange(r.id, v as ReceiptStatus)}
                    >
                      <SelectTrigger className={`h-7 text-xs w-24 border-0 ${statusColors[r.status]}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="sent">Sent</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                        <Link href={`/admin/receipts/${r.id}`} title="View">
                          <Eye className="h-3.5 w-3.5" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                        title="Send Email"
                        onClick={() => onSendEmail(r)}
                      >
                        <Send className="h-3.5 w-3.5" />
                      </Button>
                      <Button asChild variant="ghost" size="icon" className="h-8 w-8" title="Download PDF">
                        <a href={`/api/receipts/${r.id}/pdf`}>
                          <Download className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-50"
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

      {/* Footer count */}
      <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
        Showing {filtered.length} of {receipts.length} receipts
      </div>
    </div>
  );
}
