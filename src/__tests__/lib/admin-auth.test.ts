/**
 * @jest-environment node
 */
import { createHmac } from 'crypto';

// node-appwrite uses ESM; mock it so Jest can parse the module without issues
jest.mock('node-appwrite', () => ({
  Client: jest.fn().mockImplementation(() => ({
    setEndpoint: jest.fn().mockReturnThis(),
    setProject: jest.fn().mockReturnThis(),
  })),
  Account: jest.fn().mockImplementation(() => ({
    createEmailPasswordSession: jest.fn().mockResolvedValue({}),
  })),
}));

import { getCookieFromRequest, getAdminUserFromSessionSecret, destroyAdminSession } from '@/lib/admin-auth';

const TEST_SECRET = 'test-secret-key-for-jest';

// Set env vars before any test runs.
// APPWRITE_ADMIN_EMAIL is cleared to prevent the .env file value from restricting which
// email addresses are considered valid admin tokens during tests.
process.env.ADMIN_AUTH_SECRET = TEST_SECRET;
process.env.APPWRITE_ENDPOINT = 'https://appwrite.example.com/v1';
process.env.APPWRITE_PROJECT_ID = 'test-project';
process.env.APPWRITE_ADMIN_EMAIL = '';

function makeToken(payload: object, secret = TEST_SECRET): string {
  const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const sig = createHmac('sha256', secret).update(encoded).digest('base64url');
  return `${encoded}.${sig}`;
}

afterAll(() => {
  delete process.env.ADMIN_AUTH_SECRET;
  delete process.env.APPWRITE_ENDPOINT;
  delete process.env.APPWRITE_PROJECT_ID;
  delete process.env.APPWRITE_ADMIN_EMAIL;
});

describe('getCookieFromRequest', () => {
  function makeRequest(cookieHeader: string): Request {
    return new Request('https://example.com', { headers: { cookie: cookieHeader } });
  }

  it('returns the cookie value when present', () => {
    const req = makeRequest('chs_admin_session=abc123');
    expect(getCookieFromRequest(req, 'chs_admin_session')).toBe('abc123');
  });

  it('returns null when cookie is missing', () => {
    const req = makeRequest('other_cookie=xyz');
    expect(getCookieFromRequest(req, 'chs_admin_session')).toBeNull();
  });

  it('returns null when cookie header is empty', () => {
    const req = new Request('https://example.com');
    expect(getCookieFromRequest(req, 'chs_admin_session')).toBeNull();
  });

  it('handles multiple cookies in the header', () => {
    const req = makeRequest('first=a; chs_admin_session=mytoken; last=z');
    expect(getCookieFromRequest(req, 'chs_admin_session')).toBe('mytoken');
  });

  it('URL-decodes cookie values', () => {
    const req = makeRequest('token=hello%20world');
    expect(getCookieFromRequest(req, 'token')).toBe('hello world');
  });

  it('handles values with = signs', () => {
    const req = makeRequest('token=abc=def==');
    expect(getCookieFromRequest(req, 'token')).toBe('abc=def==');
  });
});

describe('getAdminUserFromSessionSecret', () => {
  it('returns user info for a valid, unexpired token', async () => {
    const payload = { email: 'admin@example.com', exp: Date.now() + 60_000 };
    const token = makeToken(payload);
    const user = await getAdminUserFromSessionSecret(token);
    expect(user.email).toBe('admin@example.com');
    expect(user.$id).toBe('admin@example.com');
  });

  it('throws Unauthorized for an expired token', async () => {
    const payload = { email: 'admin@example.com', exp: Date.now() - 1000 };
    const token = makeToken(payload);
    await expect(getAdminUserFromSessionSecret(token)).rejects.toThrow('Unauthorized');
  });

  it('throws Unauthorized for a tampered signature', async () => {
    const payload = { email: 'admin@example.com', exp: Date.now() + 60_000 };
    const [encoded] = makeToken(payload).split('.');
    const fakeSignature = createHmac('sha256', 'wrong-secret').update(encoded).digest('base64url');
    const badToken = `${encoded}.${fakeSignature}`;
    await expect(getAdminUserFromSessionSecret(badToken)).rejects.toThrow('Unauthorized');
  });

  it('throws Unauthorized for a token with no dot separator', async () => {
    await expect(getAdminUserFromSessionSecret('notavalidtoken')).rejects.toThrow('Unauthorized');
  });

  it('throws Unauthorized when email does not match APPWRITE_ADMIN_EMAIL', async () => {
    process.env.APPWRITE_ADMIN_EMAIL = 'allowed@example.com';
    const payload = { email: 'other@example.com', exp: Date.now() + 60_000 };
    const token = makeToken(payload);
    await expect(getAdminUserFromSessionSecret(token)).rejects.toThrow('Unauthorized');
    delete process.env.APPWRITE_ADMIN_EMAIL;
  });

  it('succeeds when email matches APPWRITE_ADMIN_EMAIL', async () => {
    process.env.APPWRITE_ADMIN_EMAIL = 'allowed@example.com';
    const payload = { email: 'allowed@example.com', exp: Date.now() + 60_000 };
    const token = makeToken(payload);
    const user = await getAdminUserFromSessionSecret(token);
    expect(user.email).toBe('allowed@example.com');
    delete process.env.APPWRITE_ADMIN_EMAIL;
  });
});

describe('destroyAdminSession', () => {
  it('is a no-op (stateless logout) — resolves without error', async () => {
    await expect(destroyAdminSession('any-token')).resolves.toBeUndefined();
  });
});

