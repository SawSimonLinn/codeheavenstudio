import { notFound } from "next/navigation";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Calendar, Clock } from "lucide-react";
import { marked } from "marked";
import { backendFetch, parseBlogPost } from "@/lib/api";
import type { BlogPost } from "@/types/blog";

function readTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function formatDate(iso: string | null | undefined) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await backendFetch(`/api/blogs/slug/${slug}`, {
      // no auth — public endpoint
    });
    if (res.status === 404) return null;
    if (!res.ok) return null;
    return parseBlogPost(await res.json());
  } catch {
    return null;
  }
}

async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    const res = await backendFetch("/api/blogs/public");
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data.map(parseBlogPost) : [];
  } catch {
    return [];
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getPost(slug), getPublishedPosts()]);

  if (!post) notFound();

  const postIndex = allPosts.findIndex((p) => p.id === post.id);
  const related = allPosts
    .filter((p) => p.id !== post.id && p.tags?.some((t) => post.tags?.includes(t)))
    .slice(0, 3);

  const prevPost = postIndex > 0 ? allPosts[postIndex - 1] : null;
  const nextPost = postIndex < allPosts.length - 1 ? allPosts[postIndex + 1] : null;

  const contentHtml = await marked(post.content ?? "");

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        {/* ── Hero image ──────────────────────────────────────── */}
        <section className="relative overflow-hidden h-[55vh] sm:h-[70vh]">
          <Image
            src={post.imageUrl || "/placeholder.png"}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

          <div className="absolute top-6 left-0 right-0 z-10 container mx-auto px-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors group"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/30 group-hover:border-white transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </span>
              Back to Blog
            </Link>
          </div>

          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-10 sm:pb-14">
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-bold uppercase tracking-widest text-white/70 border border-white/30 rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tighter max-w-4xl">
              {post.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/60">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(post.publishedAt ?? post.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {readTime(post.content)}
              </span>
              <span className="flex items-center gap-2 ml-auto">
                <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-xs">
                  CH
                </span>
                <span className="font-semibold text-white/80">Code Heaven Team</span>
              </span>
            </div>
          </div>
        </section>

        {/* ── Article body ─────────────────────────────────────── */}
        <section className="container mx-auto px-4 py-12 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed border-l-4 border-primary pl-5 mb-10 font-medium">
              {post.description}
            </p>

            <div
              className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:font-black prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-li:text-muted-foreground prose-li:leading-relaxed
                prose-strong:text-foreground
                prose-ol:space-y-2 prose-ul:space-y-2"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            <div className="mt-14 pt-8 border-t border-border flex flex-wrap gap-2">
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 rounded-full px-3 py-1.5"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* ── Prev / Next navigation ──────────────────────── */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="group flex flex-col gap-1 p-5 rounded-xl border border-border hover:border-foreground/30 hover:shadow-lg transition-all duration-300"
                >
                  <span className="text-xs text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                    <ArrowLeft className="h-3 w-3" /> Previous
                  </span>
                  <span className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {prevPost.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="group flex flex-col gap-1 p-5 rounded-xl border border-border hover:border-foreground/30 hover:shadow-lg transition-all duration-300 sm:text-right"
                >
                  <span className="text-xs text-muted-foreground uppercase tracking-widest flex items-center gap-1 sm:justify-end">
                    Next <ArrowUpRight className="h-3 w-3" />
                  </span>
                  <span className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {nextPost.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>

        {/* ── Related posts ────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="border-t border-border py-12 sm:py-20">
            <div className="container mx-auto px-4">
              <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs mb-3">
                Keep reading
              </p>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-8">
                Related Articles
              </h2>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((rp) => (
                  <Link
                    key={rp.id}
                    href={`/blog/${rp.slug}`}
                    className="group flex gap-4 rounded-xl border border-border p-4 hover:border-foreground/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                      <Image
                        src={rp.imageUrl || "/placeholder.png"}
                        alt={rp.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-col justify-center gap-1 min-w-0">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                        {rp.tags?.[0]}
                      </span>
                      <span className="text-sm font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                        {rp.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(rp.publishedAt ?? rp.createdAt)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
