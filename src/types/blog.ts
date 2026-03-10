export type BlogStatus = 'draft' | 'published';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  imageUrl: string;
  tags: string[];
  status: BlogStatus;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogData {
  title: string;
  slug?: string;
  description: string;
  content: string;
  imageUrl: string;
  tags: string[];
  status: BlogStatus;
}
