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
        <section className="border-b border-border">
          <div className="container mx-auto px-4 py-16 sm:py-24">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div>
                <p className="text-primary font-semibold uppercase tracking-[0.25em] text-xs mb-4">
                  Selected Work
                </p>
                <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9]">
                  Our<br />
                  <span className="text-primary">Projects</span>
                </h1>
              </div>
              <div className="sm:text-right">
                <p className="text-4xl sm:text-5xl font-black text-muted/40 leading-none">
                  {String(projects.length).padStart(2, "0")}
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
                  Total projects
                </p>
              </div>
            </div>
            <p className="mt-8 max-w-lg text-muted-foreground text-base leading-relaxed">
              End-to-end digital products from concept to launch. Real clients, real results.
            </p>
          </div>
        </section>

        {/* ── Filter pills ─────────────────────────────────────── */}
        <section className="sticky top-0 z-30 bg-background/90 backdrop-blur border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 border ${
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

        {/* ── Projects grid ─────────────────────────────────────── */}
        <section className="container mx-auto px-4 py-12 sm:py-16">
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-24">
              No projects in this category yet.
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={projects.indexOf(project)}
                priority={i < 3}
              />
            ))}
          </div>
        </section>

        {/* ── Stats strip ───────────────────────────────────────── */}
        <section className="border-t border-border bg-foreground text-background">
          <div className="container mx-auto px-4 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: "20+", label: "Projects delivered" },
              { value: "100%", label: "Client satisfaction" },
              { value: "4–6 wk", label: "Avg. launch time" },
              { value: "3 yrs", label: "In business" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl sm:text-4xl font-black mb-1">{value}</p>
                <p className="text-xs text-background/60 uppercase tracking-widest">
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
  priority = false,
}: {
  project: (typeof projects)[number];
  index: number;
  priority?: boolean;
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
      className="group relative bg-card flex flex-col cursor-pointer transition-colors duration-300 hover:bg-card/80"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/9] w-full bg-muted">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          data-ai-hint={project.imageHint}
          priority={priority}
        />
        {/* number overlay */}
        <span
          aria-hidden
          className="absolute top-3 left-4 text-4xl font-black text-white/25 leading-none select-none"
        >
          {num}
        </span>
        {/* category pill */}
        <span className="absolute top-3 right-3 rounded-full bg-background/90 backdrop-blur text-foreground text-[10px] font-bold uppercase tracking-widest px-2.5 py-1">
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-lg font-black tracking-tight leading-tight text-foreground group-hover:text-primary transition-colors duration-200">
            {project.title}
          </h2>
          <span className="shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full border border-border group-hover:bg-primary group-hover:border-primary transition-all duration-300 group-hover:rotate-45 mt-0.5">
            <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-background transition-colors duration-200" />
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Footer row */}
        <div className="mt-auto pt-3 border-t border-border flex items-center justify-between gap-3">
          {/* Tech stack */}
          <div className="flex flex-wrap gap-1">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground border border-border rounded px-1.5 py-0.5"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="text-[10px] font-semibold text-muted-foreground px-1 py-0.5">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>

          {/* Live link */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="shrink-0 flex items-center gap-1 text-[10px] font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              Live
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
