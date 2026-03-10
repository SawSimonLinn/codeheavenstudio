'use client';

import { useEffect, useState, useCallback } from 'react';
import { Trash2, RotateCcw, Loader2, AlertTriangle, Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import type { BlogPost } from '@/types/blog';
import type { Receipt } from '@/types/receipt';
import { apiGetDeletedBlogPosts, apiRestoreBlogPost } from '@/lib/blog-client';
import { apiGetDeletedReceipts, apiRestoreReceipt } from '@/lib/receipts-client';
import { useToast } from '@/hooks/use-toast';

type ItemType = 'blogs' | 'receipts';

interface PermanentDeleteTarget {
  id: string;
  label: string;
  type: ItemType;
}

export default function BinPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [restoringId, setRestoringId] = useState<string | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<PermanentDeleteTarget | null>(null);
  const [adminKey, setAdminKey] = useState('');
  const [keyError, setKeyError] = useState('');
  const [deleting, setDeleting] = useState(false);

  const { toast } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [b, r] = await Promise.all([apiGetDeletedBlogPosts(), apiGetDeletedReceipts()]);
      setBlogs(b);
      setReceipts(r);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load bin');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleRestoreBlog = async (id: string) => {
    setRestoringId(id);
    try {
      await apiRestoreBlogPost(id);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      toast({ title: 'Blog post restored' });
    } catch {
      toast({ title: 'Failed to restore post', variant: 'destructive' });
    } finally {
      setRestoringId(null);
    }
  };

  const handleRestoreReceipt = async (id: string) => {
    setRestoringId(id);
    try {
      await apiRestoreReceipt(id);
      setReceipts((prev) => prev.filter((r) => r.id !== id));
      toast({ title: 'Receipt restored' });
    } catch {
      toast({ title: 'Failed to restore receipt', variant: 'destructive' });
    } finally {
      setRestoringId(null);
    }
  };

  const openDeleteDialog = (id: string, label: string, type: ItemType) => {
    setDeleteTarget({ id, label, type });
    setAdminKey('');
    setKeyError('');
  };

  const handlePermanentDelete = async () => {
    if (!deleteTarget || !adminKey.trim()) {
      setKeyError('Admin key is required');
      return;
    }
    setDeleting(true);
    setKeyError('');
    try {
      const res = await fetch('/api/bin', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: deleteTarget.type, id: deleteTarget.id, adminKey }),
      });
      if (res.status === 403) {
        setKeyError('Invalid admin key');
        return;
      }
      if (!res.ok) throw new Error('Delete failed');

      if (deleteTarget.type === 'blogs') {
        setBlogs((prev) => prev.filter((b) => b.id !== deleteTarget.id));
      } else {
        setReceipts((prev) => prev.filter((r) => r.id !== deleteTarget.id));
      }
      toast({ title: `"${deleteTarget.label}" permanently deleted` });
      setDeleteTarget(null);
    } catch {
      toast({ title: 'Failed to permanently delete', variant: 'destructive' });
    } finally {
      setDeleting(false);
    }
  };

  const totalCount = blogs.length + receipts.length;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <Trash2 className="h-6 w-6 text-gray-400" />
          <h1 className="text-2xl font-bold text-gray-900">Bin</h1>
          {totalCount > 0 && (
            <Badge variant="secondary" className="ml-1">{totalCount}</Badge>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Restore items or permanently delete them. Permanent deletion requires an admin key.
        </p>
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
      ) : (
        <Tabs defaultValue="blogs">
          <TabsList>
            <TabsTrigger value="blogs">
              Blogs
              {blogs.length > 0 && (
                <Badge variant="secondary" className="ml-1.5 h-5 text-xs">{blogs.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="receipts">
              Receipts
              {receipts.length > 0 && (
                <Badge variant="secondary" className="ml-1.5 h-5 text-xs">{receipts.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          {/* Blogs */}
          <TabsContent value="blogs" className="mt-4 space-y-3">
            {blogs.length === 0 ? (
              <EmptyBin label="blog posts" />
            ) : (
              blogs.map((post) => (
                <Card key={post.id} className="border-red-100 hover:shadow-sm transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {post.imageUrl && (
                        <div className="hidden sm:block w-14 h-14 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{post.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{post.description}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Created {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs"
                          disabled={restoringId === post.id}
                          onClick={() => handleRestoreBlog(post.id)}
                        >
                          {restoringId === post.id
                            ? <Loader2 className="h-3 w-3 animate-spin" />
                            : <RotateCcw className="h-3 w-3 mr-1" />}
                          Restore
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => openDeleteDialog(post.id, post.title, 'blogs')}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Receipts */}
          <TabsContent value="receipts" className="mt-4 space-y-3">
            {receipts.length === 0 ? (
              <EmptyBin label="receipts" />
            ) : (
              receipts.map((r) => (
                <Card key={r.id} className="border-red-100 hover:shadow-sm transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-mono font-medium text-gray-500">{r.receiptNumber}</p>
                        <p className="text-sm font-semibold text-gray-900">{r.clientName}</p>
                        {r.companyName && <p className="text-xs text-gray-400">{r.companyName}</p>}
                        <p className="text-xs text-gray-500 mt-0.5">
                          ${r.total.toFixed(2)} · {r.issueDate}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs"
                          disabled={restoringId === r.id}
                          onClick={() => handleRestoreReceipt(r.id)}
                        >
                          {restoringId === r.id
                            ? <Loader2 className="h-3 w-3 animate-spin" />
                            : <RotateCcw className="h-3 w-3 mr-1" />}
                          Restore
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => openDeleteDialog(r.id, r.receiptNumber, 'receipts')}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Projects placeholder */}
          <TabsContent value="projects" className="mt-4">
            <EmptyBin label="projects" note="Project management coming soon." />
          </TabsContent>
        </Tabs>
      )}

      {/* Permanent Delete Dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Permanently Delete
            </DialogTitle>
            <DialogDescription>
              <span className="font-semibold text-gray-900">&quot;{deleteTarget?.label}&quot;</span> will be
              permanently deleted and cannot be recovered. Enter your admin key to confirm.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-1.5 py-2">
            <Label htmlFor="admin-key">Admin Key</Label>
            <Input
              id="admin-key"
              type="password"
              placeholder="Enter admin key..."
              value={adminKey}
              onChange={(e) => { setAdminKey(e.target.value); setKeyError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handlePermanentDelete()}
              autoFocus
            />
            {keyError && <p className="text-xs text-destructive">{keyError}</p>}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)} disabled={deleting}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handlePermanentDelete}
              disabled={deleting || !adminKey.trim()}
            >
              {deleting
                ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Verifying...</>
                : 'Permanently Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function EmptyBin({ label, note }: { label: string; note?: string }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-14 text-center gap-2">
        <Inbox className="h-8 w-8 text-gray-300" />
        <p className="text-sm text-gray-400">{note ?? `No deleted ${label}.`}</p>
      </CardContent>
    </Card>
  );
}
