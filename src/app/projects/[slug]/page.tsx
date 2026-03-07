import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProjectBySlug, projects } from "@/lib/projects-data";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-5xl">
            <Button
              variant="ghost"
              asChild
              className="px-0 hover:bg-transparent hover:text-foreground"
            >
              <Link
                href="/projects"
                className="inline-flex items-center transition-transform duration-200 hover:translate-x-0.5 hover:underline"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>

            <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-start">
              <div>
                <Badge variant="outline">{project.category}</Badge>
                <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-5xl font-headline">
                  {project.title}
                </h1>
                <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  {project.overview}
                </p>
                {project.liveUrl ? (
                  <p className="mt-4 text-sm text-muted-foreground">
                    Website:{" "}
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                      {project.liveUrl}
                    </a>
                  </p>
                ) : null}
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.services.map((service, index) => (
                    <Badge key={index} variant="secondary">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl border">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  width={1000}
                  height={700}
                  className="h-full w-full object-cover"
                  data-ai-hint={project.imageHint}
                />
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:mt-12 sm:gap-8 lg:grid-cols-3">
              <div className="rounded-lg border p-6">
                <h2 className="text-lg font-semibold">Timeline</h2>
                <p className="mt-2 text-muted-foreground">{project.timeline}</p>
              </div>
              <div className="rounded-lg border p-6">
                <h2 className="text-lg font-semibold">Challenge</h2>
                <p className="mt-2 text-muted-foreground">{project.challenge}</p>
              </div>
              <div className="rounded-lg border p-6">
                <h2 className="text-lg font-semibold">Solution</h2>
                <p className="mt-2 text-muted-foreground">{project.solution}</p>
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:mt-12 sm:gap-8 lg:grid-cols-2">
              <div className="rounded-lg border p-6">
                <h2 className="text-xl font-semibold">Tech Stack</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
                  {project.techStack.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border p-6">
                <h2 className="text-xl font-semibold">Outcomes</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
                  {project.outcomes.map((outcome, index) => (
                    <li key={index}>{outcome}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
