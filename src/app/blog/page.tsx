"use client";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { blogPosts } from "@/lib/blog-data";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const allTags = ["All", ...Array.from(new Set(blogPosts.flatMap((p) => p.tags ?? [])))];

function readTime(post: (typeof blogPosts)[number]) {
  // rough estimate: 200 wpm
  const text = typeof post.content === "string" ? post.content : post.description;
  const words = text.split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState("All");

  const filtered =
    activeTag === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.tags?.includes(activeTag));

  const [featured, ...rest] = filtered;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-border">
          <span
            aria-hidden
            className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none text-[22vw] font-black leading-none text-muted/20 pr-4"
          >
            {String(blogPosts.length).padStart(2, "0")}
          </span>

          <div className="container mx-auto px-4 py-20 sm:py-32 relative z-10">
            <p className="text-primary font-semibold uppercase tracking-[0.25em] text-xs sm:text-sm mb-6">
              Insights & Ideas
            </p>
            <div className="overflow-hidden">
              <h1
                className="text-[13vw] sm:text-[10vw] lg:text-[8vw] font-black leading-[0.88] tracking-tighter uppercase"
              >
                <span className="block text-foreground">Our</span>
                <span
                  className="block"
                  style={{
                    WebkitTextStroke: "2px hsl(var(--foreground))",
                    color: "transparent",
                  }}
                >
                  Blog
                </span>
              </h1>
            </div>
            <p className="mt-8 max-w-md text-muted-foreground text-base sm:text-lg leading-relaxed">
              Tips, stories and deep dives from the Code Heaven Studio team.
            </p>
          </div>
        </section>

        {/* ── Tag filter ──────────────────────────────────────── */}
        <section className="sticky top-0 z-30 bg-background/80 backdrop-blur border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200 border ${
                    activeTag === tag
                      ? "bg-foreground text-background border-foreground"
                      : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 sm:py-20">
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-24">
              No posts with this tag yet.
            </p>
          )}

          {/* ── Featured post ──────────────────────────────────── */}
          {featured && (
            <Link
              href={featured.slug}
              className="group relative block overflow-hidden rounded-2xl border border-border mb-6 sm:mb-8 hover:border-foreground/30 hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-64 sm:h-[480px] w-full overflow-hidden">
                <Image
                  src={featured.imageUrl}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  data-ai-hint={featured.aiHint}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest px-3 py-1">
                    Featured
                  </span>
                  {featured.tags?.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="text-xs font-semibold text-white/70 border border-white/30 rounded-full px-3 py-1"
                    >
                      {t}
                    </span>
                  ))}
                  <span className="text-xs text-white/50 ml-auto">{featured.date}</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight max-w-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-white/70 text-sm sm:text-base max-w-2xl line-clamp-2 leading-relaxed">
                  {featured.description}
                </p>

                <div className="mt-6 flex items-center gap-4">
                  <span className="text-sm font-bold text-white group-hover:text-primary transition-colors flex items-center gap-2">
                    Read article
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-black group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:rotate-45">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </span>
                  <span className="text-xs text-white/40">{readTime(featured)}</span>
                </div>
              </div>
            </Link>
          )}

          {/* ── Rest of posts ──────────────────────────────────── */}
          {rest.length > 0 && (
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          )}
        </section>

        {/* ── Stats strip ───────────────────────────────────────── */}
        <section className="border-t border-border bg-foreground text-background">
          <div className="container mx-auto px-4 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: `${blogPosts.length}+`, label: "Articles published" },
              { value: allTags.length - 1 + "+", label: "Topics covered" },
              { value: "Weekly", label: "New content" },
              { value: "Free", label: "Always" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl sm:text-4xl font-black mb-1">{value}</p>
                <p className="text-sm text-background/60 uppercase tracking-widest">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* ── Post Card ────────────────────────────────────────────────────── */
function PostCard({
  post,
  index,
}: {
  post: (typeof blogPosts)[number];
  index: number;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={post.slug}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-card border border-border hover:border-foreground/30 hover:shadow-xl transition-all duration-500"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48 shrink-0">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          data-ai-hint={post.aiHint}
        />
        <span
          aria-hidden
          className="absolute top-3 left-4 text-5xl font-black text-white/20 leading-none select-none"
        >
          {num}
        </span>
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-3">
          {post.tags?.slice(0, 1).map((t) => (
            <span
              key={t}
              className="text-[11px] font-bold uppercase tracking-widest text-primary bg-primary/10 rounded-full px-2.5 py-0.5"
            >
              {t}
            </span>
          ))}
          <span className="text-xs text-muted-foreground ml-auto">{post.date}</span>
        </div>

        <h3 className="text-lg font-black tracking-tight text-foreground leading-snug line-clamp-2 mb-2">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
          {post.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-sm font-bold text-foreground group-hover:text-primary transition-colors">
            Read more
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background group-hover:bg-primary transition-all duration-300 group-hover:rotate-45">
              <ArrowUpRight className="h-3 w-3" />
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
