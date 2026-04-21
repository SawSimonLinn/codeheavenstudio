import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Web Design & Development Services",
  description:
    "Custom Next.js websites, AI-powered web apps, UI/UX design, SEO, and performance optimization. Free consultation and free demo — no commitment required.",
  alternates: { canonical: "https://www.codeheavenstudio.com/services" },
  openGraph: {
    title: "Web Design & Development Services | Code Heaven Studio",
    description:
      "Custom Next.js websites, AI-powered web apps, UI/UX design, SEO, and performance optimization. Free consultation and free demo — no commitment required.",
    url: "https://www.codeheavenstudio.com/services",
  },
};
import {
  Bot,
  Monitor,
  Utensils,
  ShoppingCart,
  Layout,
  Search,
  Wrench,
  ArrowRight,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

type ServiceItem = {
  id: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  href?: string;
};

const services: ServiceItem[] = [
  {
    id: "ai-applied-websites",
    icon: Bot,
    title: "AI Applied Websites",
    tagline: "Modern AI-powered experiences built for 2026",
    description:
      "We apply the right AI stack, Gemini, OpenAI, and Claude, to create modern websites that do more than display content. From intelligent assistants and dynamic content to lead qualification and internal automation, we design AI features that are practical, secure, and aligned with your business goals.",
    features: [
      "Gemini/OpenAI/Claude integration strategy",
      "AI chat + lead capture workflows",
      "Personalized content and smart recommendations",
      "AI-ready SEO, schema, and content operations",
    ],
    href: "/services/ai-applied-websites",
  },
  {
    id: "website-development",
    icon: Monitor,
    title: "Website Development",
    tagline: "Custom-built websites that perform",
    description:
      "We design and develop fast, responsive websites tailored to your brand. Every site is built with clean code, great UX, and a focus on converting visitors into customers.",
    features: ["Mobile-first design", "SEO-ready structure", "Fast load times", "CMS integration"],
  },
  {
    id: "restaurant-websites",
    icon: Utensils,
    title: "Restaurant Websites",
    tagline: "Hungry customers deserve a great first impression",
    description:
      "We specialize in websites for restaurants: menus, reservations, Google Maps integration, and photo galleries that make people want to visit before they even walk in the door.",
    features: ["Online menu display", "Reservation links", "Google Maps embed", "Mobile optimized"],
  },
  {
    id: "ecommerce-websites",
    icon: ShoppingCart,
    title: "E-commerce Websites",
    tagline: "Sell more with a store that works",
    description:
      "From product listings to checkout, we build e-commerce experiences that are simple to manage and easy for your customers to use, so you can focus on running your business.",
    features: ["Product management", "Secure checkout", "Inventory tracking", "Payment integration"],
  },
  {
    id: "landing-pages",
    icon: Layout,
    title: "Landing Pages",
    tagline: "One page. One goal. Maximum impact.",
    description:
      "Need to launch a campaign, promote a product, or capture leads? We build high-converting landing pages designed with a single focused goal in mind.",
    features: ["Conversion-focused", "A/B test ready", "Lead capture forms", "Fast turnaround"],
  },
  {
    id: "seo-optimization",
    icon: Search,
    title: "SEO Optimization",
    tagline: "Be found by the people searching for you",
    description:
      "We improve your site's visibility in Google search results through technical SEO, content structure, keyword targeting, and local SEO strategies for your area.",
    features: ["Keyword research", "On-page SEO", "Local SEO", "Performance audits"],
  },
  {
    id: "website-maintenance",
    icon: Wrench,
    title: "Website Maintenance",
    tagline: "Keep your site healthy, secure, and up to date",
    description:
      "Websites need ongoing care. We handle updates, security patches, content changes, and performance monitoring so your site stays fast and reliable month after month.",
    features: ["Security updates", "Content updates", "Performance monitoring", "Priority support"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
    <main>
      {/* Hero */}
      <section className="bg-secondary text-secondary-foreground py-20 sm:py-32">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            What We Build
          </p>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tighter leading-[0.95] mb-6">
            Services Built for{" "}
            <span className="text-primary">
              Real Businesses
            </span>
          </h1>
          <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto mb-10">
            From restaurant sites to full e-commerce stores, we build websites that look great,
            load fast, and help you grow.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 bg-primary text-white hover:opacity-90 transition-opacity"
            >
              <Link href="/contact">Get a Free Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white">
              <Link href="/projects">See Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  id={service.id}
                  className="scroll-mt-24 rounded-2xl border bg-card p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                    {service.tagline}
                  </p>
                  <h2 className="text-xl font-bold mb-3">{service.title}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                    {service.description}
                  </p>
                  {service.href ? (
                    <Link
                      href={service.href}
                      className="mb-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
                    >
                      View full details <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : null}
                  <ul className="space-y-2">
                    {service.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works strip */}
      <section className="bg-muted/40 py-16 sm:py-20">
        <div className="container mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tighter mb-2">
              Not sure where to start?
            </h2>
            <p className="text-muted-foreground">
              See exactly how we take you from idea to live website.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full px-8 shrink-0"
          >
            <Link href="/how-it-works" className="flex items-center gap-2">
              How It Works <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary text-secondary-foreground py-20 sm:py-28">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter leading-[0.95] mb-6">
            Ready to build something great?
          </h2>
          <p className="text-secondary-foreground/70 text-lg max-w-xl mx-auto mb-10">
            Book a free consultation and let&apos;s talk about what you need. No pressure, no commitment.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full px-10 bg-primary text-white hover:opacity-90 transition-opacity"
          >
            <Link href="/contact">Book a Free Call</Link>
          </Button>
        </div>
      </section>
    </main>
      <Footer />
    </>
  );
}
