'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Plus, X, ArrowLeft, Eye, Save } from 'lucide-react';
import type { BlogPost, CreateBlogData } from '@/types/blog';
import { apiCreateBlogPost, apiUpdateBlogPost } from '@/lib/blog-client';
import Link from 'next/link';

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  description: z.string().min(1, 'Description is required'),
  content: z.string().min(1, 'Content is required'),
  imageUrl: z.string().url('Must be a valid URL').or(z.literal('')),
  status: z.enum(['draft', 'published']),
});

type BlogFormValues = z.infer<typeof blogSchema>;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

interface BlogFormProps {
  post?: BlogPost;
}

export default function BlogForm({ post }: BlogFormProps) {
  const router = useRouter();
  const [tags, setTags] = useState<string[]>(post?.tags ?? []);
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: post?.title ?? '',
      slug: post?.slug ?? '',
      description: post?.description ?? '',
      content: post?.content ?? '',
      imageUrl: post?.imageUrl ?? '',
      status: post?.status ?? 'draft',
    },
  });

  const titleValue = watch('title');

  const handleTitleBlur = () => {
    if (!post && titleValue) {
      setValue('slug', slugify(titleValue), { shouldValidate: true });
    }
  };

  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !tags.includes(t)) {
      setTags([...tags, t]);
    }
    setTagInput('');
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const onSubmit = async (values: BlogFormValues) => {
    setSaving(true);
    setError('');
    try {
      const payload: CreateBlogData = { ...values, tags };
      if (post) {
        await apiUpdateBlogPost(post.id, payload);
      } else {
        await apiCreateBlogPost(payload);
      }
      router.push('/admin/blog');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="My awesome blog post"
                  {...register('title')}
                  onBlur={handleTitleBlur}
                />
                {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  placeholder="my-awesome-blog-post"
                  {...register('slug')}
                />
                {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description">Description / Excerpt</Label>
                <Textarea
                  id="description"
                  placeholder="A short summary shown on the blog list page..."
                  rows={3}
                  {...register('description')}
                />
                {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="content">Content (Markdown)</Label>
                <Textarea
                  id="content"
                  placeholder="Write your post content in Markdown..."
                  rows={20}
                  className="font-mono text-sm"
                  {...register('content')}
                />
                {errors.content && <p className="text-xs text-destructive">{errors.content.message}</p>}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Publish</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Status</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <Button type="submit" disabled={saving} className="w-full">
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {post ? 'Update Post' : 'Create Post'}
                    </>
                  )}
                </Button>
                {post?.status === 'published' && (
                  <Button type="button" variant="outline" size="sm" asChild className="w-full">
                    <Link href={`/blog/${post.slug}`} target="_blank">
                      <Eye className="h-4 w-4 mr-2" />
                      View Live
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Cover Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  placeholder="https://..."
                  {...register('imageUrl')}
                />
                {errors.imageUrl && <p className="text-xs text-destructive">{errors.imageUrl.message}</p>}
              </div>
              {watch('imageUrl') && (
                <div className="rounded-md overflow-hidden border border-gray-200 aspect-video bg-gray-50">
                  <img
                    src={watch('imageUrl')}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <Button type="button" variant="outline" size="icon" onClick={addTag}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-destructive transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
