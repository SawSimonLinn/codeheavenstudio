import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DollarSign,
  Award,
  Gauge,
  Gift,
  ShieldCheck,
  Clock,
  Headphones,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const benefits = [
  {
    title: "One-Time Pricing",
    description:
      "No monthly subscriptions, no hidden fees, no surprise invoices. You pay once and your site is live. What you see is what you pay — nothing more.",
    icon: <DollarSign className="h-6 w-6" />,
  },
  {
    title: "You Own Your Site",
    description:
      "Full code and asset ownership from day one. No lock-in, no strings attached. Your site lives on your hosting, your domain, your terms.",
    icon: <Award className="h-6 w-6" />,
  },
  {
    title: "Performance-Driven",
    description:
      "Every site is built for speed, SEO, and real-world user experience across all devices. We don't use bloated page builders — we write clean, optimized code.",
    icon: <Gauge className="h-6 w-6" />,
  },
  {
    title: "Free Demo First",
    description:
      "See a real layout of your site before you commit to anything or pay a single dollar. We build trust by showing results upfront.",
    icon: <Gift className="h-6 w-6" />,
  },
  {
    title: "Transparent Process",
    description:
      "You'll always know where your project stands. We communicate clearly at every step — no guessing, no radio silence, no surprises.",
    icon: <ShieldCheck className="h-6 w-6" />,
  },
  {
    title: "Fast Turnaround",
    description:
      "We respect your time. Most projects launch within 2–4 weeks. We don't drag things out or leave you waiting for months.",
    icon: <Clock className="h-6 w-6" />,
  },
  {
    title: "Ongoing Support",
    description:
      "We don't disappear after launch. Whether you need edits, updates, or maintenance, we're here to help your site grow with your business.",
    icon: <Headphones className="h-6 w-6" />,
  },
  {
    title: "Built to Grow",
    description:
      "Your site is built with scalability in mind. As your business evolves, your website can evolve too — without starting from scratch.",
    icon: <TrendingUp className="h-6 w-6" />,
  },
];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "5★", label: "Average Rating" },
  { value: "2–4 wks", label: "Average Launch Time" },
  { value: "100%", label: "Client Ownership" },
];

export default function WhyChooseUsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-secondary text-secondary-foreground py-20 sm:py-32">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              Why Choose Us
            </p>
            <h1 className="font-headline text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
              The Code Heaven{" "}
              <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Advantage.
              </span>
            </h1>
            <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto mb-10">
              Transparent, quality-first web development with a process built
              around your success — not our convenience.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
            >
              <Link href="/contact">Start Your Project</Link>
            </Button>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 border-b border-border">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl font-extrabold tracking-tight text-primary mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-20 sm:py-32">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-16">
              <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-4">
                What Sets Us Apart
              </p>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1]">
                Built different. Delivered better.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-2xl border bg-card p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-secondary text-secondary-foreground py-20 sm:py-28">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
              Ready to experience the difference?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Start with a free demo — no payment, no commitment. Just a real
              preview of what your site could look like.
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
                className="rounded-full px-8 border-white/30 text-white bg-transparent hover:bg-white/10 hover:text-white"
              >
                <Link href="/testimonials" className="flex items-center gap-2">
                  Read Testimonials <ArrowRight className="h-4 w-4" />
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
