import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { projects } from "@/lib/projects-data";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Case Studies | Code Heaven Studio",
  description:
    "Real projects, real results. See how we've helped businesses grow with custom web design and development.",
};

export default function CaseStudiesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border py-20 sm:py-32">
          <div className="container mx-auto px-4 max-w-5xl">
            <p className="text-primary font-semibold uppercase tracking-[0.25em] text-xs sm:text-sm mb-6">
              Case Studies
            </p>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-[0.92] mb-6">
              Real Clients.
              <br />
              <span
                style={{
                  WebkitTextStroke: "2px hsl(var(--foreground))",
                  color: "transparent",
                }}
              >
                Real Results.
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Every project starts with a real problem. Here&apos;s how we diagnosed
              it, built the solution, and measured what changed.
            </p>
          </div>
        </section>

        {/* Case Studies List */}
        <section className="container mx-auto px-4 py-16 sm:py-24 max-w-5xl">
          <div className="flex flex-col gap-24">
            {projects.map((project, i) => (
              <article key={project.slug} className="group">
                {/* Number + Category row */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs font-black text-muted-foreground/40 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-border" />
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">
                    {project.category}
                  </span>
                </div>

                {/* Main grid */}
                <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
                  {/* Left: image */}
                  <div className="relative overflow-hidden rounded-2xl aspect-video bg-muted">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      data-ai-hint={project.imageHint}
                      priority={i === 0}
                    />
                  </div>

                  {/* Right: narrative */}
                  <div className="flex flex-col justify-between gap-8">
                    <div>
                      <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
                        {project.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">
                        {project.shortDescription}
                      </p>
                    </div>

                    {/* Problem → Solution → Result */}
                    <div className="grid grid-cols-1 gap-4">
                      <div className="rounded-xl border bg-card p-5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-2">
                          Problem
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {project.challenge}
                        </p>
                      </div>
                      <div className="rounded-xl border bg-card p-5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-2">
                          Solution
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {project.solution}
                        </p>
                      </div>
                      <div className="rounded-xl border bg-card p-5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-green-500 mb-2">
                          Result
                        </p>
                        <ul className="space-y-1.5">
                          {project.outcomes.map((outcome, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Footer row */}
                    <div className="flex items-center justify-between">
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
                      <Link
                        href={`/projects/${project.slug}`}
                        className="flex items-center gap-1.5 text-sm font-bold text-foreground hover:text-primary transition-colors"
                      >
                        Full project
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background group-hover:bg-primary transition-all duration-300 group-hover:rotate-45">
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-secondary text-secondary-foreground py-20 sm:py-28">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="font-headline text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
              Ready to be our next case study?
            </h2>
            <p className="text-secondary-foreground/70 text-lg mb-10">
              Let&apos;s talk about your project. The first call is free and there&apos;s no obligation.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Start a Project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
