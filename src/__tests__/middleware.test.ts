/**
 * @jest-environment node
 */
import { middleware } from '@/middleware';
import { ADMIN_SESSION_COOKIE } from '@/lib/admin-auth-constants';
import { NextRequest } from 'next/server';

function makeRequest(pathname: string, hasCookie = false): NextRequest {
  const url = `https://example.com${pathname}`;
  const req = new NextRequest(url);
  if (hasCookie) {
    req.cookies.set(ADMIN_SESSION_COOKIE, 'dummy-session-value');
  }
  return req;
}

describe('middleware', () => {
  describe('home page (/)', () => {
    it('redirects to logout when admin session cookie is present', () => {
      const res = middleware(makeRequest('/', true));
      expect(res.status).toBe(307);
      expect(res.headers.get('location')).toContain('/api/admin/auth/logout');
      expect(res.headers.get('location')).toContain('next=%2F');
    });

    it('passes through when no session cookie', () => {
      const res = middleware(makeRequest('/', false));
      // NextResponse.next() has status 200 and no redirect location
      expect(res.headers.get('location')).toBeNull();
    });
  });

  describe('non-admin paths', () => {
    it('passes through /about regardless of session', () => {
      const res = middleware(makeRequest('/about', false));
      expect(res.headers.get('location')).toBeNull();
    });

    it('passes through /contact even with a session', () => {
      const res = middleware(makeRequest('/contact', true));
      expect(res.headers.get('location')).toBeNull();
    });
  });

  describe('/admin routes', () => {
    it('passes through /admin/login without a session', () => {
      const res = middleware(makeRequest('/admin/login', false));
      expect(res.headers.get('location')).toBeNull();
    });

    it('passes through /admin/login with a session', () => {
      const res = middleware(makeRequest('/admin/login', true));
      expect(res.headers.get('location')).toBeNull();
    });

    it('redirects unauthenticated requests to /admin to login', () => {
      const res = middleware(makeRequest('/admin', false));
      expect(res.status).toBe(307);
      const location = res.headers.get('location')!;
      expect(location).toContain('/admin/login');
      expect(location).toContain('next=');
    });

    it('redirects unauthenticated requests to /admin/receipts to login', () => {
      const res = middleware(makeRequest('/admin/receipts', false));
      expect(res.status).toBe(307);
      expect(res.headers.get('location')).toContain('/admin/login');
    });

    it('passes through /admin routes when session cookie is present', () => {
      const res = middleware(makeRequest('/admin/receipts', true));
      expect(res.headers.get('location')).toBeNull();
    });

    it('includes the original path in the next query param on redirect', () => {
      const res = middleware(makeRequest('/admin/receipts/123', false));
      const location = res.headers.get('location')!;
      expect(decodeURIComponent(location)).toContain('/admin/receipts/123');
    });
  });
});
