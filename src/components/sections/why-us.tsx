import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DollarSign, Award, Gauge, Gift, ArrowRight } from "lucide-react";

const benefits = [
  {
    title: "One-Time Pricing",
    description:
      "No subscriptions, no hidden fees. Pay once and your site is live.",
    icon: <DollarSign className="h-5 w-5" />,
  },
  {
    title: "You Own Your Site",
    description:
      "Full code and asset ownership from day one. No strings attached.",
    icon: <Award className="h-5 w-5" />,
  },
  {
    title: "Performance-Driven",
    description:
      "Optimized for speed, SEO, and real-world user experience on every device.",
    icon: <Gauge className="h-5 w-5" />,
  },
  {
    title: "Free Demo First",
    description:
      "See a real layout of your site before you commit to anything.",
    icon: <Gift className="h-5 w-5" />,
  },
];

export default function WhyUsSection() {
  return (
    <section
      id="why-us"
      className="bg-secondary text-secondary-foreground py-20 sm:py-32"
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className="lg:sticky lg:top-32">
            <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-4">
              Why Choose Us
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
              The Code Heaven
              <br />
              Advantage.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-sm">
              Transparent, quality-first web development with a process built
              around your success, not our convenience.
            </p>
            <Button
              size="lg"
              asChild
              className="rounded-full px-8 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
            >
              <Link href="/contact">
                Start a Project <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Right: benefit list */}
          <div className="divide-y divide-white/10">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="flex gap-5 py-8 first:pt-0 last:pb-0"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1.5">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
