import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/lib/projects-data";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
              Our Projects
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              A selection of projects we designed and developed for our clients.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:mt-12 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.slug} className="flex flex-col overflow-hidden">
                <CardHeader className="p-0">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="h-48 w-full object-cover sm:h-52"
                    data-ai-hint={project.imageHint}
                  />
                </CardHeader>
                <CardContent className="flex-1 p-6">
                  <p className="text-sm text-primary">{project.category}</p>
                  <CardTitle className="mt-2 text-xl font-bold">{project.title}</CardTitle>
                  <p className="mt-3 text-muted-foreground">{project.shortDescription}</p>
                  <div className="mt-4 flex items-center gap-4">
                    <Button asChild variant="link" className="h-auto p-0 text-base">
                      <Link href={`/projects/${project.slug}`}>
                        View Project <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    {project.liveUrl ? (
                      <Button asChild variant="ghost" className="h-auto p-0 text-base">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          Website
                        </a>
                      </Button>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
