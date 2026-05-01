import { createSupabaseAdminClient } from '@/lib/supabase-server';

type AuditEventType = 'login' | 'logout' | 'visit';

type AuditInsertRow = {
  event: AuditEventType;
  email: string;
  path: string;
  ip: string;
  user_agent: string;
  device_type: string;
  browser: string;
  os: string;
  city: string;
  region: string;
  country: string;
};

type AuditRow = AuditInsertRow & {
  id: string;
  created_at: string;
};

export type AdminAuditEvent = {
  id: string;
  event: AuditEventType;
  email: string;
  path: string;
  ip: string;
  userAgent: string;
  deviceType: string;
  browser: string;
  os: string;
  city: string;
  region: string;
  country: string;
  createdAt: string;
};

const ADMIN_AUDIT_TABLE = (process.env.SUPABASE_ADMIN_AUDIT_TABLE ?? 'admin_audit_logs').trim();

function getAuditClient() {
  try {
    return createSupabaseAdminClient();
  } catch (error) {
    console.warn('Admin audit logging disabled:', error instanceof Error ? error.message : error);
    return null;
  }
}

function pickFirstForwardedIp(forwardedFor: string | null) {
  if (!forwardedFor) return '';
  return forwardedFor.split(',')[0]?.trim() ?? '';
}

function parseDeviceType(userAgent: string) {
  if (!userAgent) return 'unknown';
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) return 'tablet';
  if (/mobile|iphone|android/i.test(userAgent)) return 'mobile';
  return 'desktop';
}

function parseBrowser(userAgent: string) {
  if (!userAgent) return 'unknown';
  if (/edg\//i.test(userAgent)) return 'Edge';
  if (/chrome\//i.test(userAgent) && !/edg\//i.test(userAgent)) return 'Chrome';
  if (/safari\//i.test(userAgent) && !/chrome\//i.test(userAgent)) return 'Safari';
  if (/firefox\//i.test(userAgent)) return 'Firefox';
  if (/opr\//i.test(userAgent) || /opera/i.test(userAgent)) return 'Opera';
  return 'unknown';
}

function parseOs(userAgent: string) {
  if (!userAgent) return 'unknown';
  if (/windows nt/i.test(userAgent)) return 'Windows';
  if (/mac os x/i.test(userAgent) || /macintosh/i.test(userAgent)) return 'macOS';
  if (/android/i.test(userAgent)) return 'Android';
  if (/iphone|ipad|ios/i.test(userAgent)) return 'iOS';
  if (/linux/i.test(userAgent)) return 'Linux';
  return 'unknown';
}

function getHeader(request: Request, name: string) {
  return request.headers.get(name) ?? '';
}

function getLocationFromHeaders(request: Request) {
  const city =
    getHeader(request, 'x-vercel-ip-city') ||
    getHeader(request, 'x-appengine-city') ||
    getHeader(request, 'x-geo-city');
  const region =
    getHeader(request, 'x-vercel-ip-country-region') ||
    getHeader(request, 'x-appengine-region') ||
    getHeader(request, 'x-geo-region');
  const country =
    getHeader(request, 'x-vercel-ip-country') ||
    getHeader(request, 'cf-ipcountry') ||
    getHeader(request, 'x-appengine-country') ||
    getHeader(request, 'x-geo-country');

  return { city, region, country };
}

function toAdminAuditEvent(row: AuditRow): AdminAuditEvent {
  return {
    id: row.id,
    event: row.event,
    email: row.email,
    path: row.path,
    ip: row.ip,
    userAgent: row.user_agent,
    deviceType: row.device_type,
    browser: row.browser,
    os: row.os,
    city: row.city,
    region: row.region,
    country: row.country,
    createdAt: row.created_at,
  };
}

export async function logAdminAuditEvent(options: {
  request: Request;
  event: AuditEventType;
  email?: string;
  path?: string;
}) {
  const supabase = getAuditClient();
  if (!supabase) return;

  const { request, event } = options;
  const email = (options.email ?? '').trim().toLowerCase();
  const path = options.path ?? '';

  const userAgent = getHeader(request, 'user-agent');
  const ip = pickFirstForwardedIp(getHeader(request, 'x-forwarded-for')) || getHeader(request, 'x-real-ip');
  const { city, region, country } = getLocationFromHeaders(request);

  const payload: AuditInsertRow = {
    event,
    email,
    path,
    ip,
    user_agent: userAgent,
    device_type: parseDeviceType(userAgent),
    browser: parseBrowser(userAgent),
    os: parseOs(userAgent),
    city,
    region,
    country,
  };

  const { error } = await supabase.from(ADMIN_AUDIT_TABLE).insert(payload);
  if (error) {
    console.warn('Failed to write admin audit log:', error.message);
  }
}

export async function listAdminAuditEvents(limit = 50) {
  const supabase = getAuditClient();
  if (!supabase) return [] as Array<AdminAuditEvent>;
  const safeLimit = Math.min(Math.max(limit, 1), 200);

  const { data, error } = await supabase
    .from(ADMIN_AUDIT_TABLE)
    .select('*')
    .order('created_at', { ascending: false })
    .limit(safeLimit);

  if (error) {
    console.warn('Failed to read admin audit logs:', error.message);
    return [] as Array<AdminAuditEvent>;
  }

  return (data ?? []).map((row) => toAdminAuditEvent(row as AuditRow));
}
