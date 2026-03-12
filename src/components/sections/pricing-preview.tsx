import { Check, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    description: "For small businesses getting online.",
    features: [
      "3-page responsive website",
      "Mobile-friendly + SEO-ready design",
      "Custom design with brand colors",
      "Basic contact form setup",
      "Google Analytics setup",
      "2 weeks of post-launch support",
    ],
    cta: "Get Started",
  },
  {
    name: "Growth",
    description: "For businesses ready to scale.",
    features: [
      "Everything in Starter, plus:",
      "Up to 7 custom-designed pages",
      "Blog setup with categories & tags",
      "Advanced SEO optimization",
      "Performance optimization",
      "1 month post-launch support",
    ],
    popular: true,
    cta: "Most Popular",
  },
  {
    name: "Premium",
    description: "For companies needing a full digital presence.",
    features: [
      "Everything in Growth, plus:",
      "Unlimited pages + advanced layouts",
      "Custom UI/UX with interactive elements",
      "AI-powered features",
      "Marketing landing pages",
      "2 months post-launch support",
    ],
    cta: "Contact Us",
  },
];

export default function PricingPreview() {
  return (
    <section className="relative overflow-hidden border-t py-24 sm:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background pointer-events-none" />

      <div className="relative container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">
            Transparent Pricing
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            Plans for every stage
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            No hidden fees. One-time pricing with optional add-ons. Payment
            plans available.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3 items-center max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl p-8 transition-all duration-300 ${
                plan.popular
                  ? "bg-secondary text-secondary-foreground shadow-2xl md:scale-105 z-10"
                  : "border bg-card shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow">
                    <Star className="h-3 w-3 fill-current" />
                    Most Popular
                  </span>
                </div>
              )}

              <p
                className={`text-xs font-bold uppercase tracking-widest ${
                  plan.popular ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {plan.name}
              </p>

              {/* Price hidden — teaser */}
              <div className="mt-4 flex items-baseline gap-2">
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    plan.popular
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  See pricing →
                </span>
              </div>

              <p
                className={`mt-3 text-sm ${
                  plan.popular
                    ? "text-secondary-foreground/75"
                    : "text-muted-foreground"
                }`}
              >
                {plan.description}
              </p>

              <div
                className={`my-6 border-t ${
                  plan.popular ? "border-white/10" : "border-border"
                }`}
              />

              <ul className="space-y-3 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                        plan.popular ? "text-primary" : "text-green-500"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        plan.popular
                          ? "text-secondary-foreground/85"
                          : "text-muted-foreground"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm mb-5">
            View full pricing details, add-ons, and the price calculator.
          </p>
          <Button
            size="lg"
            asChild
            className="rounded-full px-10 py-6 text-base bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
          >
            <Link href="/codeheavenpricing">
              View Full Pricing <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
