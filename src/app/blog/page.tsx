import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '@/lib/blog-data';

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
              Our Blog
            </h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Insights, tips, and stories from the Code Heaven Studio team.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Card key={post.slug} className="flex flex-col overflow-hidden">
                <CardHeader className="p-0">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width={600}
                    height={400}
                    data-ai-hint={post.aiHint}
                    className="object-cover w-full h-48"
                  />
                </CardHeader>
                <CardContent className="flex-1 p-6">
                  <p className="text-sm text-muted-foreground">{post.date}</p>
                  <CardTitle className="mt-2 text-xl font-bold">{post.title}</CardTitle>
                  <CardDescription className="mt-2">{post.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="link" asChild className="p-0 h-auto">
                    <Link href={post.slug}>
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
