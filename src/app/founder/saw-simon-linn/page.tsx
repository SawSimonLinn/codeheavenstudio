import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Github, Globe, MapPin, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Saw Simon Linn – Co-Founder of Code Heaven Studio",
  description:
    "Saw Simon Linn is the Co-Founder and Developer at Code Heaven Studio. He builds modern, SEO-optimized websites for restaurants and small businesses in Los Angeles, California.",
  alternates: {
    canonical: "https://www.codeheavenstudio.com/founder/saw-simon-linn",
  },
};

const projects = [
  {
    name: "Restaurant Website Platform",
    description:
      "Built a fast, SEO-optimized website system tailored for restaurant owners, including online menus, contact forms, and Google Maps integration.",
  },
  {
    name: "Small Business Web Presence",
    description:
      "Delivered 20+ websites for small businesses across Los Angeles, helping them rank on Google and attract real foot traffic.",
  },
  {
    name: "Code Heaven Studio",
    description:
      "Co-founded and built the entire Code Heaven Studio platform, from design system to admin panel, using Next.js, React, and TypeScript.",
  },
];

export default function SawSimonLinnPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-secondary text-secondary-foreground py-20 sm:py-28">
          <div className="container mx-auto max-w-4xl px-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm text-secondary-foreground/60 hover:text-primary mb-10 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to About
            </Link>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
              <Avatar className="w-32 h-32 border-4 border-primary/20 shadow-xl flex-shrink-0">
                <AvatarImage
                  src="/avatars/simon.jpg"
                  alt="Saw Simon Linn – Co-Founder of Code Heaven Studio"
                  data-ai-hint="male developer"
                />
                <AvatarFallback className="text-2xl font-bold">SS</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-headline mb-2">
                  Saw Simon Linn
                </h1>
                <p className="text-lg text-primary font-semibold mb-2">
                  Co-Founder &amp; Developer
                </p>
                <div className="flex items-center gap-1 text-sm text-secondary-foreground/60 mb-5">
                  <MapPin className="h-4 w-4" />
                  Los Angeles, California
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    size="sm"
                    className="rounded-full bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90"
                  >
                    <a
                      href="https://www.linkedin.com/in/sawsimonlinn/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Linkedin className="h-4 w-4" /> LinkedIn
                    </a>
                  </Button>
                  <Button asChild size="sm" variant="outline" className="rounded-full bg-transparent border-white/40 text-white hover:border-white/70 hover:bg-transparent">
                    <a
                      href="https://github.com/SawSimonLinn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github className="h-4 w-4" /> GitHub
                    </a>
                  </Button>
                  <Button asChild size="sm" variant="outline" className="rounded-full bg-transparent border-white/40 text-white hover:border-white/70 hover:bg-transparent">
                    <a
                      href="https://simonlinn.dev/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Globe className="h-4 w-4" /> Portfolio
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bio */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-bold tracking-tight mb-6 font-headline">About Saw Simon Linn</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                Saw Simon Linn co-founded Code Heaven Studio to help restaurants and small businesses
                build modern, SEO-optimized websites that drive real customers. He believes every local
                business deserves a professional online presence, not just a brochure site, but a
                fast, Google-ranking, conversion-focused web experience.
              </p>
              <p>
                Before writing code, Simon spent years as a sushi chef and worked in the startup world.
                That mix of precision craft and fast-paced hustle carried right into software
                engineering. He trained at TripleTen and specialized in the Next.js and React ecosystem,
                building full-stack products from database to UI.
              </p>
              <p>
                Today, Simon leads product development at Code Heaven Studio, designing the
                architecture, writing the code, and shipping websites that help Los Angeles restaurants
                and small businesses grow online.
              </p>
            </div>
          </div>
        </section>

        {/* Role */}
        <section className="bg-muted/40 py-16 sm:py-24">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-bold tracking-tight mb-6 font-headline">Role at Code Heaven Studio</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {["Co-Founder", "Developer", "Full Stack Developer", "Next.js", "React", "TypeScript", "SEO", "UI/UX"].map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
            <p className="text-muted-foreground leading-relaxed">
              As Co-Founder and Developer, Saw Simon Linn is responsible for the full product
              lifecycle at Code Heaven Studio, from initial client consultation and design, through
              development and deployment, to ongoing maintenance and SEO strategy. He ensures every
              website ships fast, ranks on Google, and converts visitors into customers.
            </p>
          </div>
        </section>

        {/* Projects */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-bold tracking-tight mb-10 font-headline">Projects</h2>
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.name} className="rounded-xl border bg-card p-6">
                  <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-secondary text-secondary-foreground py-16 sm:py-24 text-center">
          <div className="container mx-auto max-w-2xl px-4">
            <h2 className="text-3xl font-bold font-headline mb-4">Work with Saw Simon Linn</h2>
            <p className="text-secondary-foreground/70 mb-8">
              Ready to build a website that gets your business found on Google? Let&apos;s talk.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90"
              >
                <a href="mailto:simon@codeheavenstudio.com" className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Email Simon
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full bg-transparent border-white/40 text-white hover:border-white/70 hover:bg-transparent">
                <Link href="/about">Meet the Team</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
