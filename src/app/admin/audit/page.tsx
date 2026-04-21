'use client';

import { useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';

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

export default function AuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/audit?limit=100')
      .then(async (r) => {
        if (!r.ok) throw new Error('Failed to load');
        return (await r.json()) as { logs?: AuditLog[] };
      })
      .then((data) => setLogs(Array.isArray(data.logs) ? data.logs : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 md:p-8">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.14em] text-[#7782A0]">Security</p>
        <h1 className="mt-1 text-2xl font-black tracking-tight text-[#F4F5F7]">Audit Log</h1>
        <p className="mt-1 text-sm text-[#8A92A8]">Login, logout, and visited pages with device and location data.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#1E222C] bg-[#10131A]/95">
        {loading ? (
          <div className="space-y-3 p-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 animate-pulse rounded bg-[#171A22]" />
            ))}
          </div>
        ) : logs.length === 0 ? (
          <div className="p-12 text-center">
            <ShieldCheck className="mx-auto mb-3 h-10 w-10 text-[#4A526A]" />
            <p className="text-sm text-[#8A92A8]">No audit records yet.</p>
          </div>
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
                  {logs.map((log) => (
                    <tr key={log.id} className="border-t border-[#1B1F2A]">
                      <td className="whitespace-nowrap px-4 py-3 text-[#BAC2D4]">{new Date(log.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${
                            log.event === 'login'
                              ? 'bg-[#173829] text-[#7EE5B4]'
                              : log.event === 'logout'
                              ? 'bg-[#3A1B23] text-[#FFCDD6]'
                              : 'bg-[#242A36] text-[#A8B0C3]'
                          }`}
                        >
                          {log.event}
                        </span>
                      </td>
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
              {logs.map((log) => (
                <div key={log.id} className="space-y-1 p-4">
                  <p className="text-xs text-[#7F889C]">{new Date(log.createdAt).toLocaleString()}</p>
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                      log.event === 'login'
                        ? 'bg-[#173829] text-[#7EE5B4]'
                        : log.event === 'logout'
                        ? 'bg-[#3A1B23] text-[#FFCDD6]'
                        : 'bg-[#242A36] text-[#A8B0C3]'
                    }`}
                  >
                    {log.event}
                  </span>
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
