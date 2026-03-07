import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects-data";

export default function PreviousProjectsSection() {
  return (
    <section
      id="previous-work"
      className="container mx-auto px-4 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
          Explore Our Previous Work
        </h2>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          We take pride in the solutions we've delivered. Here are a few
          examples of our work.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card
            key={project.slug}
            className="overflow-hidden transition-transform md:hover:scale-105 md:hover:shadow-xl"
          >
            <CardHeader className="p-0">
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={600}
                height={400}
                data-ai-hint={project.imageHint}
                className="object-cover"
              />
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-xl font-bold">
                {project.title}
              </CardTitle>
              <p className="mt-2 text-muted-foreground">
                {project.shortDescription}
              </p>
              <Button variant="link" asChild className="mt-4 h-auto p-0">
                <Link href={`/projects/${project.slug}`}>
                  View Details <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Button size="lg" asChild>
          <Link href="/projects">
            View All Projects <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
