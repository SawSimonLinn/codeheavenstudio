import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Briefcase,
  Heart,
  Rocket,
  Users,
  Zap,
  Code2,
  Globe,
  ArrowRight,
  MapPin,
  Clock,
} from "lucide-react";

const openRoles = [
  {
    title: "Frontend Developer",
    type: "Contract / Part-time",
    location: "Remote",
    description:
      "We are looking for a React & Next.js developer who cares about clean UI, fast performance, and pixel-perfect execution. You will work directly with our founders on real client projects.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "UI/UX Designer",
    type: "Contract / Project-based",
    location: "Remote",
    description:
      "We need a designer with a sharp eye for modern aesthetics and a strong grasp of user experience. You will be responsible for turning client briefs into beautiful, functional designs.",
    skills: ["Figma", "Prototyping", "Design Systems", "Responsive Design"],
  },
  {
    title: "Full Stack Developer",
    type: "Contract / Part-time",
    location: "Remote",
    description:
      "Got full-stack chops? We are always looking for engineers who can handle both frontend and backend with equal confidence. Bonus points for database design and API experience.",
    skills: ["Node.js", "PostgreSQL", "Next.js", "REST APIs"],
  },
];

const perks = [
  {
    icon: <Globe className="h-7 w-7 text-primary" />,
    title: "100% Remote",
    description:
      "Work from anywhere in the world. We care about results, not where you sit.",
  },
  {
    icon: <Rocket className="h-7 w-7 text-primary" />,
    title: "Real Projects",
    description:
      "No busywork. You will build real products for real clients from day one.",
  },
  {
    icon: <Heart className="h-7 w-7 text-primary" />,
    title: "Small & Focused Team",
    description:
      "Two co-founders, zero bureaucracy. Your voice matters and your work ships.",
  },
  {
    icon: <Zap className="h-7 w-7 text-primary" />,
    title: "Fast-Moving Culture",
    description:
      "We move fast, iterate quickly, and always look for a better way to do things.",
  },
  {
    icon: <Code2 className="h-7 w-7 text-primary" />,
    title: "Modern Stack",
    description:
      "We use current, industry-standard tools: Next.js, TypeScript, Tailwind, and more.",
  },
  {
    icon: <Users className="h-7 w-7 text-primary" />,
    title: "Collaborative Environment",
    description:
      "Direct collaboration with founders. No middlemen, no silos, just teamwork.",
  },
];

export default function CareersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-secondary py-20 sm:py-32 text-secondary-foreground overflow-hidden">
          {/* Gradient orbs */}
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 relative">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-4">
                Join Our Team
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl font-headline">
                Build Great Things
                <br />
                <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  With Us.
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-secondary-foreground/80 max-w-2xl mx-auto">
                We are a small, passionate studio doing meaningful work. If you
                love building, care about quality, and want to be part of a team
                that ships, we want to hear from you.
              </p>
              <div className="mt-8">
                <Button
                  size="lg"
                  asChild
                  className="rounded-full px-10 py-6 text-base bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
                >
                  <a href="#open-roles">
                    View Open Roles <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="bg-muted py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                Why Code Heaven Studio
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                We are not a corporation. We are two developers who love what we
                do and want to work with people who feel the same way.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {perks.map((perk) => (
                <Card
                  key={perk.title}
                  className="shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      {perk.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{perk.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {perk.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Open Roles */}
        <section id="open-roles" className="py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                Open Roles
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                We are always on the lookout for talented people. Browse our
                current openings below.
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-6">
              {openRoles.map((role) => (
                <Card
                  key={role.title}
                  className="shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">
                          {role.title}
                        </h3>
                        <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            {role.type}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" />
                            {role.location}
                          </span>
                        </div>
                      </div>
                      <Button
                        disabled
                        className="rounded-full shrink-0 cursor-not-allowed opacity-50"
                      >
                        Not Currently Hiring
                      </Button>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {role.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {role.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values strip */}
        <section className="border-t border-border bg-foreground text-background">
          <div className="container mx-auto px-4 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: "100%", label: "Remote Work" },
              { value: "Real", label: "Client Projects" },
              { value: "Small", label: "Focused Team" },
              { value: "Fast", label: "Ship Cycle" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl sm:text-4xl font-black mb-1">{value}</p>
                <p className="text-sm text-background/60 uppercase tracking-widest">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* No role that fits? */}
        <section className="py-16 sm:py-24 bg-muted">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <Briefcase className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-headline mb-4">
              Don&apos;t See the Right Role?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              We are always open to meeting great people. If you think you would
              be a good fit for our team, send us a message. Tell us what you do
              and why you want to work with us.
            </p>
            <Button
              size="lg"
              asChild
              variant="outline"
              className="rounded-full px-10 py-6 text-base border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Link href="/contact">
                Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
