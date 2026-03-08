'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Receipt, DollarSign, Clock, CheckCircle, PlusCircle } from 'lucide-react';
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

    fetch('/api/admin/audit?limit=25')
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
  const draft = receipts.filter((r) => r.status === 'draft').length;
  const revenue = receipts
    .filter((r) => r.status === 'paid')
    .reduce((sum, r) => sum + r.total, 0);

  const stats = [
    { label: 'Total Receipts', value: total, icon: Receipt, color: 'text-blue-600 bg-blue-50' },
    { label: 'Total Revenue', value: `$${revenue.toFixed(2)}`, icon: DollarSign, color: 'text-green-600 bg-green-50' },
    { label: 'Sent / Pending', value: sent, icon: Clock, color: 'text-yellow-600 bg-yellow-50' },
    { label: 'Paid', value: paid, icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="mb-6 sm:mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Overview of your receipt activity</p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/admin/receipts/new">
            <PlusCircle className="h-4 w-4" />
            New Receipt
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-24 mb-4" />
              <div className="h-8 bg-gray-200 rounded w-16" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-gray-500">{label}</p>
                <div className={`p-2 rounded-lg ${color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Recent Receipts */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between gap-3">
          <h2 className="font-semibold text-gray-900">Recent Receipts</h2>
          <Link href="/admin/receipts" className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div>
        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : receipts.length === 0 ? (
          <div className="p-12 text-center">
            <Receipt className="h-10 w-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No receipts yet.</p>
            <Button asChild className="mt-4" size="sm">
              <Link href="/admin/receipts/new">Create your first receipt</Link>
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {receipts.slice(0, 5).map((r) => (
              <Link
                key={r.id}
                href={`/admin/receipts/${r.id}`}
                className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{r.receiptNumber}</p>
                  <p className="text-xs text-gray-500">{r.clientName}</p>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                  <p className="text-sm font-semibold text-gray-900">${r.total.toFixed(2)}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      r.status === 'paid'
                        ? 'bg-green-100 text-green-700'
                        : r.status === 'sent'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600'
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

      <div className="mt-8 bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Admin Audit Log</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Login, logout, and visited pages with device and location data.</p>
        </div>

        {auditLoading ? (
          <div className="p-6 space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : auditLogs.length === 0 ? (
          <div className="p-6 text-sm text-gray-500">No audit records yet.</div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">Time</th>
                    <th className="text-left px-4 py-3 font-medium">Event</th>
                    <th className="text-left px-4 py-3 font-medium">User</th>
                    <th className="text-left px-4 py-3 font-medium">Page</th>
                    <th className="text-left px-4 py-3 font-medium">Device</th>
                    <th className="text-left px-4 py-3 font-medium">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-gray-700">{new Date(log.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-3 text-gray-700 capitalize">{log.event}</td>
                      <td className="px-4 py-3 text-gray-700">{log.email || '-'}</td>
                      <td className="px-4 py-3 text-gray-700 font-mono text-xs">{log.path || '-'}</td>
                      <td className="px-4 py-3 text-gray-700">{`${log.deviceType} / ${log.browser} / ${log.os}`}</td>
                      <td className="px-4 py-3 text-gray-700">{formatLocation(log)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y divide-gray-100">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-4 space-y-1">
                  <p className="text-xs text-gray-500">{new Date(log.createdAt).toLocaleString()}</p>
                  <p className="text-sm font-medium text-gray-900 capitalize">{log.event}</p>
                  <p className="text-xs text-gray-700">{log.email || '-'}</p>
                  <p className="text-xs font-mono text-gray-600">{log.path || '-'}</p>
                  <p className="text-xs text-gray-600">{`${log.deviceType} / ${log.browser} / ${log.os}`}</p>
                  <p className="text-xs text-gray-600">{formatLocation(log)}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
