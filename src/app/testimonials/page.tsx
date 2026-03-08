import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Star, Quote, ArrowRight } from "lucide-react";
import Link from "next/link";

const testimonials = [
  {
    name: "Maria T.",
    business: "Blue Bird Haus Sushi",
    industry: "Restaurant",
    rating: 5,
    quote:
      "Code Heaven Studio completely transformed our online presence. Our new website looks stunning, loads instantly, and has made it so much easier for customers to browse our menu and find us on Google. We've noticed a real increase in foot traffic since launch.",
  },
  {
    name: "James R.",
    business: "Dunedin SD",
    industry: "Burger Bar",
    rating: 5,
    quote:
      "We needed a full restaurant site with multiple menus, online ordering, and private event booking. All under a tight deadline. Simon delivered everything ahead of schedule and the final product exceeded our expectations. Highly recommend.",
  },
  {
    name: "Angela K.",
    business: "Ventures Quality Insurance",
    industry: "Insurance",
    rating: 5,
    quote:
      "Our platform required secure admin functionality and multi-policy online applications. Code Heaven Studio built exactly what we needed: clean, reliable, and easy to manage. The attention to detail on both the design and the backend was impressive.",
  },
  {
    name: "David M.",
    business: "Local Retail Shop",
    industry: "Small Business",
    rating: 5,
    quote:
      "I was hesitant to invest in a website, but the free demo they offered before any payment convinced me immediately. The process was smooth, communication was clear, and our site now ranks on the first page of Google for our area.",
  },
  {
    name: "Sofia L.",
    business: "Startup Founder",
    industry: "Tech Startup",
    rating: 5,
    quote:
      "We needed a credible landing page fast to support our investor pitch. Code Heaven Studio delivered a clean, conversion-focused site in under two weeks. It made us look established from day one.",
  },
  {
    name: "Marcus P.",
    business: "Personal Trainer",
    industry: "Fitness & Wellness",
    rating: 5,
    quote:
      "I needed something simple that would help clients find me and book sessions. The site is exactly that: professional, mobile-friendly, and easy to navigate. My client inquiries doubled within the first month.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-secondary text-secondary-foreground py-20 sm:py-32">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              Client Testimonials
            </p>
            <h1 className="font-headline text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
              Real Clients.{" "}
              <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Real Results.
              </span>
            </h1>
            <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto mb-10">
              Don&apos;t take our word for it. Here&apos;s what business owners
              say after working with Code Heaven Studio.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
            >
              <Link href="/contact">Work With Us</Link>
            </Button>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-20 sm:py-32">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="rounded-2xl border bg-card p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  <Quote className="h-8 w-8 text-primary/30 mb-4 shrink-0" />
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {t.business} · {t.industry}
                      </p>
                    </div>
                    <StarRating count={t.rating} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-muted/40 py-20 sm:py-24">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Ready to be our next success story?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10">
              We offer a free demo before any commitment. See your website before
              you pay a single dollar.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
              >
                <Link href="/contact">Get Your Free Demo</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8"
              >
                <Link href="/projects" className="flex items-center gap-2">
                  View Our Work <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
