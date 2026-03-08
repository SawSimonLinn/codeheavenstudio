import { Client, Databases, ID, Models, Query } from 'node-appwrite';

type AuditEventType = 'login' | 'logout' | 'visit';

type AuditDoc = {
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
};

type AuditDocument = Models.Document & AuditDoc;

function getAuditContext() {
  const endpoint = process.env.APPWRITE_ENDPOINT;
  const projectId = process.env.APPWRITE_PROJECT_ID;
  const apiKey = process.env.APPWRITE_API_KEY;
  const databaseId = process.env.APPWRITE_DATABASE_ID;
  const auditCollectionId = process.env.APPWRITE_ADMIN_AUDIT_COLLECTION_ID;

  if (!endpoint || !projectId || !apiKey || !databaseId || !auditCollectionId) {
    return null;
  }

  const client = new Client().setEndpoint(endpoint).setProject(projectId).setKey(apiKey);
  const databases = new Databases(client);

  return { databases, databaseId, auditCollectionId };
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

export async function logAdminAuditEvent(options: {
  request: Request;
  event: AuditEventType;
  email?: string;
  path?: string;
}) {
  const ctx = getAuditContext();
  if (!ctx) return;

  const { request, event } = options;
  const email = (options.email ?? '').trim().toLowerCase();
  const path = options.path ?? '';

  const userAgent = getHeader(request, 'user-agent');
  const ip = pickFirstForwardedIp(getHeader(request, 'x-forwarded-for')) || getHeader(request, 'x-real-ip');
  const { city, region, country } = getLocationFromHeaders(request);

  const payload: AuditDoc = {
    event,
    email,
    path,
    ip,
    userAgent,
    deviceType: parseDeviceType(userAgent),
    browser: parseBrowser(userAgent),
    os: parseOs(userAgent),
    city,
    region,
    country,
  };

  try {
    await ctx.databases.createDocument<AuditDocument>(
      ctx.databaseId,
      ctx.auditCollectionId,
      ID.unique(),
      payload
    );
  } catch (error) {
    console.warn('Failed to write admin audit log:', error);
  }
}

export async function listAdminAuditEvents(limit = 50) {
  const ctx = getAuditContext();
  if (!ctx) return [] as Array<AuditDocument>;

  try {
    const response = await ctx.databases.listDocuments<AuditDocument>(ctx.databaseId, ctx.auditCollectionId, [
      Query.orderDesc('$createdAt'),
      Query.limit(Math.min(Math.max(limit, 1), 200)),
    ]);
    return response.documents;
  } catch (error) {
    console.warn('Failed to read admin audit logs:', error);
    return [] as Array<AuditDocument>;
  }
}
