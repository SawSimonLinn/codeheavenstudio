"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/projects-data";

export default function PreviousProjectsSection() {
  const allProjects = projects.slice(0, 5);
  const [showAll, setShowAll] = useState(false);

  const [featured, ...rest] = allProjects;
  const visibleRest = showAll ? rest : rest.slice(0, 1);

  return (
    <section
      id="previous-work"
      className="container mx-auto px-4 py-20 sm:py-32"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 auto-rows-[340px]">
        {/* Featured project — spans 2 cols */}
        <div className="lg:col-span-2 group relative overflow-hidden rounded-2xl border border-border bg-card">
          <Image
            src={featured.imageUrl}
            alt={featured.title}
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            data-ai-hint={featured.imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-white bg-primary rounded-full px-3 py-1 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {featured.category}
            </span>
            <h3 className="text-2xl font-bold text-white mb-1">
              {featured.title}
            </h3>
            <p className="text-white/70 text-sm mb-4 line-clamp-2">
              {featured.shortDescription}
            </p>
            <Link
              href={`/projects/${featured.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 hover:text-white transition-colors"
            >
              View Details <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Smaller projects — on mobile show 1 by default (2 total with featured), all on lg+ */}
        {rest.map((project, i) => (
          <div
            key={project.slug}
            className={`group relative overflow-hidden rounded-2xl border border-border bg-card ${
              i >= 1 && !showAll ? "hidden lg:block" : ""
            }`}
          >
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              loading="lazy"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              data-ai-hint={project.imageHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-white bg-primary rounded-full px-3 py-1 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {project.category}
              </span>
              <h3 className="text-lg font-bold text-white mb-3">
                {project.title}
              </h3>
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 hover:text-white transition-colors"
              >
                View Details <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* See More button — mobile only */}
      {!showAll && (
        <div className="flex justify-center mt-6 lg:hidden">
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => setShowAll(true)}
          >
            See More <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </section>
  );
}
