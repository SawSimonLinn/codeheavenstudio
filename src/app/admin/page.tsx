'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Receipt, DollarSign, Clock, CheckCircle, PlusCircle, ArrowUpRight } from 'lucide-react';
import { apiGetReceipts } from '@/lib/receipts-client';
import type { Receipt as ReceiptType } from '@/types/receipt';
import { Button } from '@/components/ui/button';

type AuditLog = {
  id: string;
  event: 'login' | 'logout' | 'visit';
  email: string;
  path: string;
  deviceType: string;
  browser: string;
  os: string;
  city: string;
  region: string;
  country: string;
  createdAt: string;
};

function formatLocation(log: AuditLog) {
  return [log.city, log.region, log.country].filter(Boolean).join(', ') || 'Unknown location';
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

const cardBase = 'rounded-2xl border border-admin-border bg-admin-surface2/95';

export default function AdminDashboard() {
  const [receipts, setReceipts] = useState<ReceiptType[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [auditLoading, setAuditLoading] = useState(true);

  useEffect(() => {
    apiGetReceipts()
      .then(setReceipts)
      .catch(console.error)
      .finally(() => setLoading(false));

    fetch('/api/admin/audit?limit=3')
      .then(async (response) => {
        if (!response.ok) throw new Error('Failed to load audit logs.');
        return (await response.json()) as { logs?: AuditLog[] };
      })
      .then((data) => setAuditLogs(Array.isArray(data.logs) ? data.logs : []))
      .catch(console.error)
      .finally(() => setAuditLoading(false));
  }, []);

  const total = receipts.length;
  const paid = receipts.filter((r) => r.status === 'paid').length;
  const sent = receipts.filter((r) => r.status === 'sent').length;
  const revenue = receipts
    .filter((r) => r.status === 'paid')
    .reduce((sum, r) => sum + r.total, 0);

  const stats = [
    {
      label: 'Total Receipts',
      value: total,
      icon: Receipt,
      badge: 'bg-[#0D1A3B] text-[#8FB0FF] border-[#23305A]',
    },
    {
      label: 'Total Revenue',
      value: `$${revenue.toFixed(2)}`,
      icon: DollarSign,
      badge: 'bg-[#0F2A1C] text-[#74D9A8] border-[#29543F]',
    },
    {
      label: 'Sent / Pending',
      value: sent,
      icon: Clock,
      badge: 'bg-[#33260D] text-[#E6BA6A] border-[#604A26]',
    },
    {
      label: 'Paid',
      value: paid,
      icon: CheckCircle,
      badge: 'bg-[#102A24] text-[#69C9B4] border-[#275C51]',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 md:p-8">
      <div className="mb-6 rounded-2xl border border-[#273253] bg-[linear-gradient(135deg,#0F1B3A_0%,#0E1220_50%,#12182A_100%)] px-6 py-5">
        <p className="text-xs uppercase tracking-[0.14em] text-[#8EA4E8]">Admin Overview</p>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xl font-semibold text-[#F5F6F8]">{getGreeting()}, Simon &amp; Mia</p>
            <p className="text-sm text-[#9CA4BA]">Live snapshot of receipts and account activity.</p>
          </div>
          <Button asChild>
            <Link href="/admin/receipts/new">
              <PlusCircle className="h-4 w-4" />
              New Receipt
            </Link>
          </Button>
        </div>
      </div>

      <div className="mb-7 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#F4F5F7]">Dashboard</h1>
          <p className="mt-1 text-sm text-[#8A92A8]">Overview of your receipt activity</p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`${cardBase} p-6`}>
              <div className="mb-4 h-4 w-24 animate-pulse rounded bg-[#1B1F2A]" />
              <div className="h-8 w-16 animate-pulse rounded bg-[#1B1F2A]" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ label, value, icon: Icon, badge }) => (
            <div key={label} className={`${cardBase} p-6`}>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium text-[#8B93A9]">{label}</p>
                <div className={`rounded-lg border p-2 ${badge}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-bold tracking-tight text-[#F5F6F8]">{value}</p>
            </div>
          ))}
        </div>
      )}

      <div className={`mt-8 overflow-hidden ${cardBase}`}>
        <div className="flex items-center justify-between gap-3 border-b border-[#1E222C] px-4 py-4 sm:px-6">
          <h2 className="font-semibold text-[#F3F4F6]">Recent Receipts</h2>
          <Link href="/admin/receipts" className="inline-flex items-center gap-1 text-sm text-[#9EB4FF] hover:text-[#C1D0FF]">
            View all
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        {loading ? (
          <div className="space-y-3 p-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-10 animate-pulse rounded bg-[#171A22]" />
            ))}
          </div>
        ) : receipts.length === 0 ? (
          <div className="p-12 text-center">
            <Receipt className="mx-auto mb-3 h-10 w-10 text-[#49506A]" />
            <p className="text-sm text-[#8A92A8]">No receipts yet.</p>
            <Button asChild className="mt-4" size="sm">
              <Link href="/admin/receipts/new">Create your first receipt</Link>
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-[#1B1F2A]">
            {receipts.slice(0, 5).map((r) => (
              <Link
                key={r.id}
                href={`/admin/receipts/${r.id}`}
                className="flex flex-col gap-2 px-4 py-4 transition-colors hover:bg-[#131722] sm:flex-row sm:items-center sm:justify-between sm:px-6"
              >
                <div>
                  <p className="text-sm font-medium text-[#E7EAF0]">{r.receiptNumber}</p>
                  <p className="text-xs text-[#7E879D]">{r.clientName}</p>
                </div>
                <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
                  <p className="text-sm font-semibold text-[#F3F4F6]">${r.total.toFixed(2)}</p>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      r.status === 'paid'
                        ? 'bg-[#173829] text-[#7EE5B4]'
                        : r.status === 'sent'
                        ? 'bg-[#142A56] text-[#95B6FF]'
                        : 'bg-[#242A36] text-[#A8B0C3]'
                    }`}
                  >
                    {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className={`mt-8 overflow-hidden ${cardBase}`}>
        <div className="flex items-center justify-between gap-3 border-b border-[#1E222C] px-4 py-4 sm:px-6">
          <h2 className="font-semibold text-[#F3F4F6]">Recent Activity</h2>
          <Link href="/admin/audit" className="inline-flex items-center gap-1 text-sm text-[#9EB4FF] hover:text-[#C1D0FF]">
            View all
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {auditLoading ? (
          <div className="space-y-3 p-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-10 animate-pulse rounded bg-[#171A22]" />
            ))}
          </div>
        ) : auditLogs.length === 0 ? (
          <div className="p-6 text-sm text-[#8A92A8]">No audit records yet.</div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-sm">
                <thead className="bg-[#0D1119] text-[#7F899E]">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em]">Time</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em]">Event</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em]">User</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em]">Page</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em]">Device</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em]">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="border-t border-[#1B1F2A]">
                      <td className="px-4 py-3 text-[#BAC2D4]">{new Date(log.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-3 text-[#E6EBF5] capitalize">{log.event}</td>
                      <td className="px-4 py-3 text-[#A8B0C3]">{log.email || '-'}</td>
                      <td className="px-4 py-3 font-mono text-xs text-[#8A93A8]">{log.path || '-'}</td>
                      <td className="px-4 py-3 text-[#A8B0C3]">{`${log.deviceType} / ${log.browser} / ${log.os}`}</td>
                      <td className="px-4 py-3 text-[#A8B0C3]">{formatLocation(log)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-[#1B1F2A] md:hidden">
              {auditLogs.map((log) => (
                <div key={log.id} className="space-y-1 p-4">
                  <p className="text-xs text-[#7F889C]">{new Date(log.createdAt).toLocaleString()}</p>
                  <p className="text-sm font-medium capitalize text-[#E6EBF5]">{log.event}</p>
                  <p className="text-xs text-[#A8B0C3]">{log.email || '-'}</p>
                  <p className="font-mono text-xs text-[#8A93A8]">{log.path || '-'}</p>
                  <p className="text-xs text-[#8A93A8]">{`${log.deviceType} / ${log.browser} / ${log.os}`}</p>
                  <p className="text-xs text-[#8A93A8]">{formatLocation(log)}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
