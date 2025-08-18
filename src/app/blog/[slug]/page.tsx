import { notFound } from 'next/navigation';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { blogPosts } from '@/lib/blog-data';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug.replace('/blog/', ''),
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === `/blog/${params.slug}`);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <article className="container mx-auto px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl">
             <div className="mb-8">
              <Button variant="ghost" asChild>
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>
            </div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
                {post.title}
              </h1>
              <div className="mt-6 flex items-center justify-center gap-4">
                <Avatar>
                  <AvatarImage src="https://placehold.co/100x100.png" alt="Author" data-ai-hint="author" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Code Heaven Team</p>
                  <p className="text-sm text-muted-foreground">{post.date}</p>
                </div>
              </div>
            </div>

            <div className="relative w-full h-96 mb-12">
               <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                data-ai-hint={post.aiHint}
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
           
            <div className="prose dark:prose-invert max-w-none text-muted-foreground">
              {post.content}
            </div>
            
            <div className="mt-12 border-t pt-8">
               <h3 className="text-lg font-semibold mb-4">Tags</h3>
               <div className="flex gap-2">
                 {post.tags?.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
               </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
