"use client";

import { useState } from "react";
import { ArrowUpRight, ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/projects-data";

const spans = [
  "md:col-span-2", // 1 — wide
  "md:col-span-1", // 2 — tall card with description
  "md:col-span-1", // 3
  "md:col-span-1", // 4
  "md:col-span-1", // 5
];

export default function PreviousProjectsSection() {
  const visibleProjects = projects.slice(0, 5);
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="previous-work" className="bg-background py-12 sm:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">
              Our Work
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Projects we&apos;re
              <br />
              proud of.
            </h2>
          </div>
          <Button variant="outline" asChild className="rounded-full shrink-0">
            <Link href="/projects">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {visibleProjects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={`group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-colors duration-300 ${spans[i] ?? ""} ${i >= 2 && !showAll ? "hidden md:flex" : ""}`}
            >
              {/* Image — natural 16:9 */}
              <div className="relative w-full aspect-video overflow-hidden bg-muted">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  sizes="(min-width: 768px) 66vw, 100vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint={project.imageHint}
                />
              </div>

              {/* Text */}
              <div className="flex items-start justify-between gap-3 p-5">
                <div className="min-w-0">
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary block mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-base font-bold leading-snug group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </h3>
                  {i === 1 && (
                    <>
                      <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                        {project.shortDescription}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-medium bg-muted text-muted-foreground rounded-full px-2.5 py-1"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {project.services.map((service) => (
                          <span
                            key={service}
                            className="text-xs font-medium border border-border text-muted-foreground rounded-full px-2.5 py-1"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5 shrink-0" />
                        {project.timeline}
                      </div>
                    </>
                  )}
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 mt-1 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
              </div>
            </Link>
          ))}
        </div>

        {/* See More — mobile only */}
        {!showAll && (
          <div className="flex justify-center mt-6 md:hidden">
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => setShowAll(true)}
            >
              See More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
