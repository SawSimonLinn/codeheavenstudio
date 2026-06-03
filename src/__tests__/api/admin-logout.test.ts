/**
 * @jest-environment node
 */
import { GET } from '@/app/api/admin/auth/logout/route';
import { ADMIN_SESSION_COOKIE } from '@/lib/admin-auth-constants';

describe('GET /api/admin/auth/logout', () => {
  it('redirects to a root-relative next path', async () => {
    const response = await GET(
      new Request('https://example.com/api/admin/auth/logout?next=%2Fadmin%2Freceipts%3Fstatus%3Ddraft')
    );

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('https://example.com/admin/receipts?status=draft');
    expect(response.headers.get('set-cookie')).toContain(`${ADMIN_SESSION_COOKIE}=`);
  });

  it.each([
    'https://malicious.example/phishing',
    '//malicious.example/phishing',
    '/\\malicious.example/phishing',
  ])('falls back to the home page for unsafe next value %s', async (next) => {
    const response = await GET(
      new Request(`https://example.com/api/admin/auth/logout?next=${encodeURIComponent(next)}`)
    );

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('https://example.com/');
  });
});
