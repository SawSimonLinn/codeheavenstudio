import Link from "next/link";
import {
  Utensils,
  Coffee,
  User,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const templates = [
  {
    icon: Utensils,
    category: "Restaurant",
    title: "Restaurant Starter",
    tagline: "Turn hungry browsers into paying customers",
    description:
      "A professional restaurant website designed to showcase your menu, accept reservations, and bring foot traffic through your door. Built for speed and local SEO.",
    features: [
      "Interactive digital menu",
      "Reservation & booking link",
      "Google Maps integration",
      "Photo gallery",
      "Mobile-first design",
      "Local SEO optimized",
    ],
    gradient: "from-orange-500 to-red-500",
    bg: "bg-orange-500/10",
    iconColor: "text-orange-500",
    badge: "Most Popular",
  },
  {
    icon: Coffee,
    category: "Coffee Shop",
    title: "Coffee Shop Starter",
    tagline: "A cozy corner of the internet for your café",
    description:
      "Warm, inviting design that captures your café's atmosphere. Showcase your drinks, your story, and make it easy for regulars and new visitors to find you.",
    features: [
      "Menu & specials display",
      "Location & hours section",
      "Instagram feed integration",
      "Online order link",
      "Story / about section",
      "SEO for local discovery",
    ],
    gradient: "from-amber-600 to-yellow-500",
    bg: "bg-amber-500/10",
    iconColor: "text-amber-600",
    badge: null,
  },
  {
    icon: User,
    category: "Personal Brand",
    title: "Personal Brand Starter",
    tagline: "Your professional presence, built to impress",
    description:
      "A sleek personal website that positions you as the expert. Perfect for freelancers, coaches, consultants, and creatives who want to stand out and win clients online.",
    features: [
      "Hero & bio section",
      "Portfolio / work showcase",
      "Services & pricing block",
      "Testimonials section",
      "Contact & booking form",
      "SEO & performance optimized",
    ],
    gradient: "from-primary to-purple-500",
    bg: "bg-primary/10",
    iconColor: "text-primary",
    badge: "Great for Freelancers",
  },
];

export default function TemplatesPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-secondary text-secondary-foreground py-20 sm:py-32">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              Starter Templates
            </p>
            <h1 className="font-headline text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
              Launch Faster With a{" "}
              <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Proven Design
              </span>
            </h1>
            <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto mb-10">
              Pick a starter template built for your industry. We customize it
              to match your brand, content, and goals, so you go live faster
              without compromising on quality.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
              >
                <Link href="/contact">Request a Template</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8 bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/projects">See Live Examples</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Templates Grid */}
        <section className="py-20 sm:py-32">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {templates.map((template) => {
                const Icon = template.icon;
                return (
                  <div
                    key={template.title}
                    className="relative rounded-2xl border bg-card p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                  >
                    {template.badge && (
                      <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-primary to-purple-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1">
                        {template.badge}
                      </span>
                    )}

                    {/* Preview placeholder */}
                    <div
                      className={`mb-6 rounded-xl h-40 bg-gradient-to-br ${template.gradient} opacity-80 flex items-center justify-center`}
                    >
                      <Icon className="h-14 w-14 text-white/60" />
                    </div>

                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                      {template.tagline}
                    </p>
                    <h2 className="font-headline text-xl font-bold mb-1">
                      {template.title}
                    </h2>
                    <span
                      className={`inline-block text-xs font-bold uppercase tracking-widest rounded-full px-2.5 py-0.5 mb-3 ${template.bg} ${template.iconColor}`}
                    >
                      {template.category}
                    </span>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                      {template.description}
                    </p>
                    <ul className="space-y-2 mb-8">
                      {template.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      className="rounded-full bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity w-full"
                    >
                      <Link href={`/contact?template=${encodeURIComponent(template.title)}`}>
                        Get This Template{" "}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How it works strip */}
        <section className="bg-muted/40 py-16 sm:py-20">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-12">
              <h2 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                How Templates Work
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Templates are a starting point, not a constraint. We customize
                every detail to fit your brand.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Choose a Template",
                  desc: "Pick the starter that fits your industry and goals.",
                },
                {
                  step: "02",
                  title: "We Customize It",
                  desc: "Your colors, content, logo, and copy, fully tailored.",
                },
                {
                  step: "03",
                  title: "Go Live Fast",
                  desc: "Launch in days, not months, with a site that's yours.",
                },
              ].map(({ step, title, desc }) => (
                <div key={step} className="text-center">
                  <span className="text-5xl font-black text-muted/50">{step}</span>
                  <h3 className="font-bold text-lg mt-2 mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Custom CTA */}
        <section className="bg-muted/40 py-12 sm:py-16 border-t border-border">
          <div className="container mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold">Need something fully custom?</h3>
                <p className="text-sm text-muted-foreground">
                  We build bespoke websites from scratch too.
                </p>
              </div>
            </div>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-8 shrink-0"
            >
              <Link href="/request-website" className="flex items-center gap-2">
                Request a Custom Site <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-secondary text-secondary-foreground py-20 sm:py-28">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <h2 className="font-headline text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
              Ready to pick your template?
            </h2>
            <p className="text-secondary-foreground/70 text-lg max-w-xl mx-auto mb-10">
              Tell us which template caught your eye and we&apos;ll reach out with
              next steps, no commitment required.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
            >
              <Link href="/contact">Get Started Today</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
