import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "Blue Bird Haus Sushi",
    description:
      "Blue Bird Haus Sushi – A modern sushi restaurant website with an easy-to-use online menu, vibrant photo gallery, and admin panel for adding, editing, and managing menu items.",
    imageUrl: "/previous-work_02.png",
    aiHint: "corporate website",
  },
  {
    title: "Crypto Dashboard",
    description:
      "Crypto Dashboard – A modern dashboard for tracking cryptocurrency prices, with real-time updates and a sleek user interface.",
    imageUrl: "/previous-work_01.png",
    aiHint: "dashboard website",
  },
  {
    title: "Booking System",
    description:
      "An integrated booking system for a restaurant agency. This system allows users to easily book tables, manage reservations, and receive real-time updates.",
    imageUrl: "/previous-work_03.png",
    aiHint: "booking app",
  },
];

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
        {projects.map((project, index) => (
          <Card
            key={index}
            className="overflow-hidden transition-transform hover:scale-105 hover:shadow-xl"
          >
            <CardHeader className="p-0">
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={600}
                height={400}
                data-ai-hint={project.aiHint}
                className="object-cover"
              />
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-xl font-bold">
                {project.title}
              </CardTitle>
              <p className="mt-2 text-muted-foreground">
                {project.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Button size="lg" asChild>
          <Link
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Full Portfolio <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
