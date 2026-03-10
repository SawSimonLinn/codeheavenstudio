'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import BlogForm from '@/components/admin/blog-form';
import type { BlogPost } from '@/types/blog';
import { apiGetBlogPost } from '@/lib/blog-client';

export default function EditBlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    apiGetBlogPost(id)
      .then((data) => {
        if (!data) setError('Post not found');
        else setPost(data);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load post'))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/blog">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">
          {loading ? 'Loading...' : post ? `Edit: ${post.title}` : 'Post Not Found'}
        </h1>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      ) : post ? (
        <BlogForm post={post} />
      ) : null}
    </div>
  );
}
