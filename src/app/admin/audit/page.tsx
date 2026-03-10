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
  return [log.city, log.region, log.country]
    .filter(Boolean)
    .map((s) => decodeURIComponent(s))
    .join(', ') || 'Unknown location';
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
    <div className="p-4 sm:p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Audit Log</h1>
        <p className="text-sm text-gray-500 mt-1">Login, logout, and visited pages with device and location data.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : logs.length === 0 ? (
          <div className="p-12 text-center">
            <ShieldCheck className="h-10 w-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">No audit records yet.</p>
          </div>
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
                  {logs.map((log) => (
                    <tr key={log.id} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{new Date(log.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${
                          log.event === 'login' ? 'bg-green-100 text-green-700'
                          : log.event === 'logout' ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-600'
                        }`}>{log.event}</span>
                      </td>
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
              {logs.map((log) => (
                <div key={log.id} className="p-4 space-y-1">
                  <p className="text-xs text-gray-500">{new Date(log.createdAt).toLocaleString()}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize inline-block ${
                    log.event === 'login' ? 'bg-green-100 text-green-700'
                    : log.event === 'logout' ? 'bg-red-100 text-red-700'
                    : 'bg-gray-100 text-gray-600'
                  }`}>{log.event}</span>
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
