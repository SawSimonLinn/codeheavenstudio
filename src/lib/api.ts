const BACKEND_URL = process.env.API_URL ?? 'http://localhost:4000';

export function getBackendUrl() {
  return BACKEND_URL;
}

export function getSessionCookie(request: Request): string {
  return request.headers.get('cookie') ?? '';
}

/** Forward browser identity + geo headers so the backend can populate audit logs. */
export function getClientHeaders(request: Request): Record<string, string> {
  const headers: Record<string, string> = {};
  const forward = [
    'user-agent',
    'x-forwarded-for',
    'x-real-ip',
    'x-vercel-ip-city',
    'x-vercel-ip-country-region',
    'x-vercel-ip-country',
    'cf-ipcountry',
  ];
  for (const name of forward) {
    const value = request.headers.get(name);
    if (value) headers[name] = value;
  }
  return headers;
}

export async function backendFetch(
  path: string,
  init: RequestInit & { cookie?: string } = {},
): Promise<Response> {
  const { cookie, ...fetchInit } = init;
  return fetch(`${BACKEND_URL}${path}`, {
    ...fetchInit,
    headers: {
      ...(fetchInit.body ? { 'Content-Type': 'application/json' } : {}),
      ...(cookie ? { Cookie: cookie } : {}),
      ...fetchInit.headers,
    },
  });
}
