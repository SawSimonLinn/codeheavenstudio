import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Github, Globe, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mia Truong – Co-Founder & Developer at Code Heaven Studio",
  description:
    "Mia Truong is the Co-Founder and Developer at Code Heaven Studio, focusing on web development, business development, partnerships, and client success for restaurants and small businesses in San Diego, California.",
  alternates: {
    canonical: "https://www.codeheavenstudio.com/founder/mia-truong",
  },
};

const projects = [
  {
    name: "Client Success & Partnerships",
    description:
      "Built and managed relationships with 20+ restaurant and small business clients, guiding them from initial inquiry through website launch and beyond.",
  },
  {
    name: "Business Development",
    description:
      "Developed Code Heaven Studio's referral partner program and outreach strategy, expanding the studio's reach across Southern California.",
  },
  {
    name: "Code Heaven Studio",
    description:
      "Co-founded Code Heaven Studio with a vision to make professional web presence accessible for every local restaurant and small business owner.",
  },
];

export default function MiaTruongPage() {
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
                  src="/avatars/mia.jpg"
                  alt="Mia Truong – Co-Founder of Code Heaven Studio"
                  data-ai-hint="female developer"
                />
                <AvatarFallback className="text-2xl font-bold">MT</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-headline mb-2">
                  Mia Truong
                </h1>
                <p className="text-lg text-primary font-semibold mb-2">
                  Co-Founder & Developer
                </p>
                <div className="flex items-center gap-1 text-sm text-secondary-foreground/60 mb-5">
                  <MapPin className="h-4 w-4" />
                  San Diego, California
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    size="sm"
                    className="rounded-full bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90"
                  >
                    <a
                      href="https://www.linkedin.com/in/trangmtruong/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Linkedin className="h-4 w-4" /> LinkedIn
                    </a>
                  </Button>
                  <Button asChild size="sm" variant="outline" className="rounded-full bg-transparent border-white/40 text-white hover:border-white/70 hover:bg-transparent">
                    <a
                      href="https://github.com/trangmtruong"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github className="h-4 w-4" /> GitHub
                    </a>
                  </Button>
                  <Button asChild size="sm" variant="outline" className="rounded-full bg-transparent border-white/40 text-white hover:border-white/70 hover:bg-transparent">
                    <a
                      href="https://www.miatruong.com/"
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
            <h2 className="text-2xl font-bold tracking-tight mb-6 font-headline">About Mia Truong</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                Mia Truong co-founded Code Heaven Studio and works as both a developer and the
                lead for business development, partnerships, and client success. She is dedicated
                to making sure every client gets the attention, guidance, and results they deserve,
                from the first conversation to the final website launch.
              </p>
              <p>
                Before pivoting to tech, Mia spent years in beauty and hospitality. That background
                gave her a sharp eye for detail and a natural instinct for what makes an experience
                feel right, qualities she brings to every client relationship and every project she
                touches at Code Heaven Studio.
              </p>
              <p>
                Based in San Diego, Mia bridges the gap between technical execution and client vision,
                ensuring the websites Code Heaven Studio builds truly reflect each business&apos;s
                personality and goals.
              </p>
            </div>
          </div>
        </section>

        {/* Role */}
        <section className="bg-muted/40 py-16 sm:py-24">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-bold tracking-tight mb-6 font-headline">Role at Code Heaven Studio</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {["Co-Founder", "Developer", "Business Development", "Client Success", "Partnerships", "Strategy", "Project Management"].map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
            <p className="text-muted-foreground leading-relaxed">
              As Co-Founder and Developer, Mia Truong contributes to building websites and leads
              business development, client relations, and partnership strategy at Code Heaven Studio.
              She works directly with restaurant owners and small business clients to understand their
              goals, and ensures every project is delivered with care and quality.
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
            <h2 className="text-3xl font-bold font-headline mb-4">Work with Mia Truong</h2>
            <p className="text-secondary-foreground/70 mb-8">
              Have a project in mind? Mia would love to hear about your business and help you get started.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90"
              >
                <Link href="/contact">Get in Touch</Link>
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
