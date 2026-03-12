import Link from "next/link";
import { Utensils, Building2, Lightbulb, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const industries = [
  {
    icon: Utensils,
    title: "Restaurants",
    description: "Online menus, reservations, and layouts that bring diners in the door.",
    href: "/services/restaurant-websites",
  },
  {
    icon: Building2,
    title: "Small Businesses",
    description: "Professional sites that build trust and convert visitors into customers.",
    href: "/services/small-business-websites",
  },
  {
    icon: Lightbulb,
    title: "Startups",
    description: "Fast, credible websites that communicate your value and capture leads.",
    href: "/contact",
  },
  {
    icon: MapPin,
    title: "Local Businesses",
    description: "SEO-optimized sites that put you on the map when people search nearby.",
    href: "/services/seo-optimization",
  },
];

export default function IndustriesSection() {
  return (
    <section id="industries" className="bg-background py-20 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-14">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-4">
            Industries We Serve
          </p>
          <h2 className="font-headline text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] mb-5">
            Built for Your Type of Business
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We don&apos;t build generic websites. We focus on specific niches so we can deliver exactly what works for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <Link
                key={industry.title}
                href={industry.href}
                className="group rounded-2xl border bg-card p-7 shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex flex-col gap-4"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-headline text-lg font-bold mb-2">{industry.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{industry.description}</p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Learn more <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8"
          >
            <Link href="/industries" className="flex items-center gap-2">
              View all industries <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
