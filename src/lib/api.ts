const BACKEND_URL = process.env.API_URL ?? 'https://codeheaven-backend.onrender.com';

/** Parse tags from JSON string to string[] (backend stores tags as JSON string). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseBlogPost(post: any): any {
  if (!post || typeof post !== 'object') return post;
  return {
    ...post,
    tags: typeof post.tags === 'string' ? JSON.parse(post.tags || '[]') : (post.tags ?? []),
  };
}

/** Parse items from JSON string to ReceiptItem[] (backend stores items as JSON string). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseReceipt(receipt: any): any {
  if (!receipt || typeof receipt !== 'object') return receipt;
  return {
    ...receipt,
    items: typeof receipt.items === 'string' ? JSON.parse(receipt.items || '[]') : (receipt.items ?? []),
  };
}

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
    signal: AbortSignal.timeout(60000),
    ...fetchInit,
    headers: {
      ...(fetchInit.body ? { 'Content-Type': 'application/json' } : {}),
      ...(cookie ? { Cookie: cookie } : {}),
      ...fetchInit.headers,
    },
  });
}
