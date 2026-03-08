import { Account, Client } from 'node-appwrite';
import { createHmac, timingSafeEqual } from 'crypto';
import { ADMIN_SESSION_COOKIE } from '@/lib/admin-auth-constants';

export { ADMIN_SESSION_COOKIE };

function getAuthConfig() {
  const endpoint = process.env.APPWRITE_ENDPOINT ?? process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const projectId = process.env.APPWRITE_PROJECT_ID ?? process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

  if (!endpoint || !projectId) {
    throw new Error('Missing APPWRITE_ENDPOINT or APPWRITE_PROJECT_ID for admin auth.');
  }

  return { endpoint, projectId };
}

function createBaseClient() {
  const { endpoint, projectId } = getAuthConfig();
  return new Client().setEndpoint(endpoint).setProject(projectId);
}

function getOptionalAdminEmail() {
  const configured = (process.env.APPWRITE_ADMIN_EMAIL ?? '').trim().toLowerCase();
  return configured || null;
}

function getAdminAuthSecret() {
  const secret = (process.env.ADMIN_AUTH_SECRET ?? process.env.APPWRITE_API_KEY ?? '').trim();
  if (!secret) {
    throw new Error('Missing ADMIN_AUTH_SECRET (or APPWRITE_API_KEY fallback) for admin auth sessions.');
  }
  return secret;
}

function base64UrlEncode(value: string) {
  return Buffer.from(value, 'utf8').toString('base64url');
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function sign(value: string) {
  return createHmac('sha256', getAdminAuthSecret()).update(value).digest('base64url');
}

function createSignedAdminSession(email: string) {
  const payload = {
    email,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
  };

  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

function verifySignedAdminSession(token: string): { email: string } | null {
  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) return null;

  const expected = sign(encodedPayload);
  if (signature.length !== expected.length) return null;
  const isValid = timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  if (!isValid) return null;

  try {
    const parsed = JSON.parse(base64UrlDecode(encodedPayload)) as { email?: string; exp?: number };
    const email = typeof parsed.email === 'string' ? parsed.email.toLowerCase() : '';
    const exp = typeof parsed.exp === 'number' ? parsed.exp : 0;

    if (!email || !exp || Date.now() > exp) return null;

    const allowedEmail = getOptionalAdminEmail();
    if (allowedEmail && email !== allowedEmail) return null;

    return { email };
  } catch {
    return null;
  }
}

export function getCookieFromRequest(request: Request, cookieName: string): string | null {
  const cookieHeader = request.headers.get('cookie') ?? '';
  if (!cookieHeader) return null;

  const parts = cookieHeader.split(';');
  for (const part of parts) {
    const [rawName, ...rest] = part.trim().split('=');
    if (rawName !== cookieName) continue;
    const rawValue = rest.join('=');
    if (!rawValue) return null;
    return decodeURIComponent(rawValue);
  }

  return null;
}

export async function createAdminSession(email: string, password: string): Promise<string> {
  const normalizedEmail = email.trim().toLowerCase();
  const client = createBaseClient();
  const account = new Account(client);
  await account.createEmailPasswordSession(normalizedEmail, password);

  const allowedEmail = getOptionalAdminEmail();
  if (allowedEmail && normalizedEmail !== allowedEmail) {
    throw new Error('This account is not allowed to access admin.');
  }

  return createSignedAdminSession(normalizedEmail);
}

export async function getAdminUserFromSessionSecret(sessionSecret: string) {
  const session = verifySignedAdminSession(sessionSecret);
  if (!session) {
    throw new Error('Unauthorized');
  }

  return {
    $id: session.email,
    email: session.email,
    name: session.email,
  };
}

export async function destroyAdminSession(_sessionSecret: string) {
  // Session is stateless and signed; clearing the cookie logs out the admin.
}
