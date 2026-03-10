import type { BlogPost, BlogStatus, CreateBlogData } from '@/types/blog';

async function parseResponse<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message =
      data && typeof data === 'object' && 'error' in data
        ? String((data as { error: unknown }).error)
        : `Request failed with status ${res.status}`;
    throw new Error(message);
  }
  return data as T;
}

export async function apiGetBlogPosts(status?: BlogStatus): Promise<BlogPost[]> {
  const query = status ? `?status=${status}` : '';
  const res = await fetch(`/api/blog${query}`, { cache: 'no-store' });
  return parseResponse<BlogPost[]>(res);
}

export async function apiCreateBlogPost(data: CreateBlogData): Promise<BlogPost> {
  const res = await fetch('/api/blog', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return parseResponse<BlogPost>(res);
}

export async function apiGetBlogPost(id: string): Promise<BlogPost | null> {
  const res = await fetch(`/api/blog/${id}`, { cache: 'no-store' });
  if (res.status === 404) return null;
  return parseResponse<BlogPost>(res);
}

export async function apiUpdateBlogPost(id: string, data: Partial<CreateBlogData>): Promise<BlogPost> {
  const res = await fetch(`/api/blog/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return parseResponse<BlogPost>(res);
}

export async function apiDeleteBlogPost(id: string): Promise<void> {
  const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
  await parseResponse<{ success: boolean }>(res);
}

export async function apiSoftDeleteBlogPost(id: string): Promise<void> {
  const res = await fetch('/api/bin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'blogs', id }),
  });
  await parseResponse<{ ok: boolean }>(res);
}

export async function apiRestoreBlogPost(id: string): Promise<void> {
  const res = await fetch('/api/bin/restore', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'blogs', id }),
  });
  await parseResponse<{ ok: boolean }>(res);
}

export async function apiGetDeletedBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch('/api/bin', { cache: 'no-store' });
  const bin = await parseResponse<{ blogs: string[]; receipts: string[] }>(res);
  if (bin.blogs.length === 0) return [];
  const posts = await Promise.all(bin.blogs.map((id) => apiGetBlogPost(id)));
  return posts.filter((p): p is BlogPost => p !== null);
}

export async function apiUpdateBlogStatus(id: string, status: BlogStatus): Promise<BlogPost> {
  const res = await fetch(`/api/blog/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return parseResponse<BlogPost>(res);
}
