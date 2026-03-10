'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PlusCircle, Pencil, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import type { BlogPost } from '@/types/blog';
import { apiGetBlogPosts, apiSoftDeleteBlogPost, apiUpdateBlogStatus } from '@/lib/blog-client';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const load = async () => {
    try {
      const data = await apiGetBlogPosts();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    try {
      await apiSoftDeleteBlogPost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to move post to bin');
    }
  };

  const handleToggleStatus = async (post: BlogPost) => {
    setTogglingId(post.id);
    try {
      const newStatus = post.status === 'published' ? 'draft' : 'published';
      const updated = await apiUpdateBlogStatus(post.id, newStatus);
      setPosts((prev) => prev.map((p) => (p.id === post.id ? updated : p)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-sm text-gray-500 mt-1">{posts.length} post{posts.length !== 1 ? 's' : ''} total</p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Post
          </Link>
        </Button>
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
      ) : posts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-gray-500 mb-4">No blog posts yet.</p>
            <Button asChild>
              <Link href="/admin/blog/new">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create your first post
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {post.imageUrl && (
                    <div className="hidden sm:block w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-sm font-semibold text-gray-900 truncate">{post.title}</h2>
                      <Badge variant={post.status === 'published' ? 'default' : 'secondary'} className="text-xs">
                        {post.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{post.description}</p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {post.publishedAt
                        ? `Published ${new Date(post.publishedAt).toLocaleDateString()}`
                        : `Created ${new Date(post.createdAt).toLocaleDateString()}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      disabled={togglingId === post.id}
                      onClick={() => handleToggleStatus(post)}
                      title={post.status === 'published' ? 'Unpublish' : 'Publish'}
                    >
                      {togglingId === post.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : post.status === 'published' ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                      <Link href={`/admin/blog/${post.id}`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Move to bin?</AlertDialogTitle>
                          <AlertDialogDescription>
                            &quot;{post.title}&quot; will be moved to the bin. You can restore it or permanently delete it from the Bin.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => handleDelete(post.id)}
                          >
                            Move to Bin
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
