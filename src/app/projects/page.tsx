"use client";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { projects } from "@/lib/projects-data";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-border">
          {/* giant background number */}
          <span
            aria-hidden
            className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none text-[22vw] font-black leading-none text-muted/30 pr-4"
          >
            {String(projects.length).padStart(2, "0")}
          </span>

          <div className="container mx-auto px-4 py-20 sm:py-32 relative z-10">
            <p className="text-primary font-semibold uppercase tracking-[0.25em] text-xs sm:text-sm mb-6">
              Selected Work
            </p>

            {/* Outlined + filled title combo */}
            <div className="overflow-hidden">
              <h1
                className="text-[13vw] sm:text-[10vw] lg:text-[8vw] font-black leading-[0.9] tracking-tighter uppercase"
                style={{ lineHeight: "0.88" }}
              >
                <span className="block text-foreground">Our</span>
                <span
                  className="block"
                  style={{
                    WebkitTextStroke: "2px hsl(var(--foreground))",
                    color: "transparent",
                  }}
                >
                  Projects
                </span>
              </h1>
            </div>

            <p className="mt-8 max-w-md text-muted-foreground text-base sm:text-lg leading-relaxed">
              End-to-end digital products from concept to launch. Real clients,
              real results.
            </p>
          </div>
        </section>

        {/* ── Filter pills ─────────────────────────────────────── */}
        <section className="sticky top-0 z-30 bg-background/80 backdrop-blur border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200 border ${
                    activeCategory === cat
                      ? "bg-foreground text-background border-foreground"
                      : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Projects list ─────────────────────────────────────── */}
        <section className="container mx-auto px-4 py-12 sm:py-20">
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-24">
              No projects in this category yet.
            </p>
          )}

          <div className="flex flex-col gap-4 sm:gap-6">
            {filtered.map((project, i) => {
              const isWide = i % 3 === 0; // every 3rd card is featured / wide
              return (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={projects.indexOf(project)}
                  wide={isWide}
                />
              );
            })}
          </div>
        </section>

        {/* ── Stats strip ───────────────────────────────────────── */}
        <section className="border-t border-border bg-foreground text-background">
          <div className="container mx-auto px-4 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: `${projects.length}+`, label: "Projects delivered" },
              { value: "100%", label: "Client satisfaction" },
              { value: "4–6 wk", label: "Avg. launch time" },
              { value: "3 yrs", label: "In business" },
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

/* ── Project Card ──────────────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
  wide,
}: {
  project: (typeof projects)[number];
  index: number;
  wide: boolean;
}) {
  const num = String(index + 1).padStart(2, "0");
  const router = useRouter();

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => router.push(`/projects/${project.slug}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          if ((e.target as HTMLElement).closest("a")) return;
          router.push(`/projects/${project.slug}`);
        }
      }}
      className="group relative overflow-hidden rounded-2xl bg-card border border-border flex flex-col sm:flex-row sm:h-[300px] transition-all duration-500 hover:border-foreground/30 hover:shadow-2xl cursor-pointer"
    >
      {/* Image panel */}
      <div className="relative overflow-hidden shrink-0 h-56 sm:h-full sm:w-[45%]">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, 45vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          data-ai-hint={project.imageHint}
        />
        {/* Index watermark over image */}
        <span
          aria-hidden
          className="absolute top-4 left-5 text-5xl sm:text-6xl font-black text-white/20 leading-none select-none"
        >
          {num}
        </span>
        {/* Subtle color overlay on hover */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
      </div>

      {/* Content panel */}
      <div className="flex flex-col justify-between p-6 sm:p-8 flex-1 relative">
        {/* Top row */}
        <div>
          <div className="flex items-start justify-between gap-3 mb-4">
            <span className="inline-block rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-3 py-1">
              {project.category}
            </span>
            <span className="text-xs text-muted-foreground font-medium shrink-0 mt-0.5">
              {project.timeline}
            </span>
          </div>

          <h2
            className={`font-black tracking-tight text-foreground leading-tight ${
              wide ? "text-2xl sm:text-4xl" : "text-xl sm:text-2xl"
            }`}
          >
            {project.title}
          </h2>

          <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed line-clamp-2">
            {project.shortDescription}
          </p>
        </div>

        {/* Bottom row */}
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          {/* Tech stack chips */}
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground border border-border rounded px-2 py-0.5"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                Live site
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
            <span className="flex items-center gap-1.5 text-sm font-bold text-foreground group-hover:text-primary transition-colors">
              View project
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background group-hover:bg-primary transition-all duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
