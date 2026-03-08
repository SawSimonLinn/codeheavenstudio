"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Check, Calculator, ArrowRight, Zap, Star } from "lucide-react";
import Link from "next/link";

const packages = [
  {
    name: "Starter Package",
    originalPrice: "$1250",
    price: "$938",
    description:
      "For small businesses getting online. Features can be added or removed.",
    features: [
      "3-page responsive website (Home, Privacy Policy, Terms & Conditions)",
      "Mobile-friendly + SEO-ready design",
      "Custom design with brand colors & typography",
      "1 round of revisions",
      "Basic contact form setup",
      "Google Analytics setup",
      "2 weeks of support after launch",
      "Free consultation call included",
      "Domain connection & DNS setup",
      "Hosting setup & deployment",
    ],
    cta: "Get Started",
  },
  {
    name: "Growth Package",
    originalPrice: "$2300",
    price: "$1725",
    description:
      "For businesses ready to scale. Features can be added or removed.",
    features: [
      "Everything in Starter Package plus:",
      "Up to 7 custom-designed pages",
      "Blog setup with categories & tags",
      "Advanced SEO optimization (keywords, on-page SEO, schema setup)",
      "Premium stock images & icons included",
      "Performance optimization (speed + Core Web Vitals)",
      "2 rounds of revisions",
      "1-month post-launch support",
      "Free consultation call included",
      "Domain connection & DNS setup",
      "Hosting setup with SSL & CDN configuration",
    ],
    cta: "Choose Growth",
    popular: true,
    badge: "Save $575",
  },
  {
    name: "Premium Package",
    originalPrice: "$4,500+",
    price: "$3,375+",
    description:
      "For companies needing a full digital presence. Features can be added or removed.",
    features: [
      "Everything in Growth Package plus:",
      "Unlimited pages + advanced layouts",
      "Custom UI/UX design with interactive elements",
      "AI-powered features (chatbots, recommendations, or workflows)",
      "Marketing landing pages + conversion-focused design",
      "Custom blog / CMS integration",
      "Priority support + maintenance options",
      "3 rounds of revisions",
      "2 months post-launch support",
      "Free consultation call included",
      "Domain connection & DNS setup",
      "High-performance hosting setup with SSL, CDN & daily backups",
    ],
    cta: "Contact Us",
  },
];


const packageBasePrices: Record<string, { original: number; discounted: number }> = {
  "Starter Package": { original: 1250, discounted: 938 },
  "Growth Package": { original: 2300, discounted: 1725 },
  "Premium Package": { original: 4500, discounted: 3375 },
};

const featureOptions = [
  { name: "Domain Registration (Additional Year)", price: 20, display: "$20/yr", description: "Register or renew a custom domain name for your business.", recurring: true },
  { name: "Hosting Renewal", price: 120, display: "$120/yr", description: "Continue hosting your site after the first free year — includes SSL & backups.", recurring: true },
  { name: "Custom Logo & Branding", price: 450, display: "$450+", description: "Professional logo design, brand colors, and typography guidelines." },
  { name: "Extra Pages", price: 150, display: "$150/page", description: "Add more pages to your website as your business grows." },
  { name: "Full SEO Setup", price: 500, display: "$500", description: "Comprehensive on-page and technical SEO to boost your ranking." },
  { name: "Blog Integration", price: 300, display: "$300", description: "A fully functional blog to share updates and attract traffic." },
  { name: "Multi-language Support", price: 350, display: "$350+", description: "Translate and localize your site for global audiences." },
  { name: "Speed & Performance Boost", price: 250, display: "$250", description: "Advanced optimization for ultra-fast load times." },
  { name: "SEO Copywriting", price: 300, display: "$300+", description: "SEO-friendly website content for better engagement and ranking." },
  { name: "Ongoing SEO & Marketing", price: 400, display: "$400/mo", description: "Continuous optimization, keyword tracking, and marketing strategy.", recurring: true },
  { name: "Website Maintenance & Support", price: 200, display: "$200/mo", description: "Updates, backups, bug fixes, and priority support.", recurring: true },
  { name: "Custom Video / Animation", price: 500, display: "$500+", description: "A tailored explainer video or homepage animation for your brand." },
  { name: "AI Features (chatbot, automation)", price: 500, display: "$500+", description: "Integrate a custom AI chatbot or workflow automation tools." },
];

export default function PricingPage() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set());

  const toggleFeature = (name: string) => {
    setSelectedFeatures((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const selectedFeatureItems = featureOptions.filter((f) => selectedFeatures.has(f.name));
  const oneTimeTotal =
    (selectedPackage ? packageBasePrices[selectedPackage].discounted : 0) +
    selectedFeatureItems.filter((f) => !f.recurring).reduce((sum, f) => sum + f.price, 0);
  const recurringMonthlyTotal = selectedFeatureItems
    .filter((f) => f.recurring)
    .reduce((sum, f) => sum + f.price, 0);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPromotionActive, setIsPromotionActive] = useState(true);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      let endDate = new Date(now.getFullYear(), 3, 30, 23, 59, 59);
      if (endDate <= now) {
        endDate = new Date(now.getFullYear() + 1, 3, 30, 23, 59, 59);
      }
      const difference = +endDate - +now;
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isActive: true,
      };
    };

    const update = () => {
      const { isActive, ...time } = calculateTimeLeft();
      setTimeLeft(time);
      setIsPromotionActive(isActive);
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="container mx-auto px-4 pt-16 pb-8 sm:pt-24 sm:pb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-6">
            <Zap className="h-3.5 w-3.5" />
            Limited time: 25% off all packages
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">
            Packages & Pricing
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Transparent pricing for every stage of your business. Choose the plan that&apos;s right for you.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            No hidden fees &middot; Payment plans available &middot; Free consultation call included
          </p>
        </section>

        {/* Pricing Cards */}
        <section className="container mx-auto px-4 pb-24">
          <div className="grid gap-6 md:grid-cols-3 items-center max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative flex flex-col rounded-2xl p-8 transition-all duration-300 ${
                  pkg.popular
                    ? "bg-secondary text-secondary-foreground shadow-2xl md:scale-105 z-10"
                    : "border bg-card shadow-sm hover:shadow-md"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow">
                      <Star className="h-3 w-3 fill-current" />
                      Most Popular
                    </span>
                  </div>
                )}

                <p className={`text-xs font-bold uppercase tracking-widest ${pkg.popular ? "text-primary" : "text-muted-foreground"}`}>
                  {pkg.name}
                </p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-bold">{pkg.price}</span>
                  <span className={`text-lg line-through ${pkg.popular ? "text-secondary-foreground/40" : "text-muted-foreground"}`}>
                    {pkg.originalPrice}
                  </span>
                </div>
                <p className={`mt-1 text-xs ${pkg.popular ? "text-secondary-foreground/60" : "text-muted-foreground"}`}>
                  One-time · payment plans available
                </p>
                <p className={`mt-3 text-sm ${pkg.popular ? "text-secondary-foreground/75" : "text-muted-foreground"}`}>
                  {pkg.description}
                </p>

                <div className={`my-6 border-t ${pkg.popular ? "border-white/10" : "border-border"}`} />

                <ul className="space-y-3 flex-1">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${pkg.popular ? "text-primary" : "text-green-500"}`} />
                      <span className={`text-sm ${pkg.popular ? "text-secondary-foreground/85" : "text-muted-foreground"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className="mt-8 w-full"
                  variant={pkg.popular ? "default" : "outline"}
                >
                  <Link href="/contact">{pkg.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Builder */}
        <section className="border-t py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                Build Your Own Package
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Select a base package and pick the features you need. See your estimated total instantly.
              </p>
            </div>

            <div className="mx-auto max-w-4xl grid md:grid-cols-2 gap-10">
              {/* Left: selectors */}
              <div className="space-y-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                    Step 1: Base Package
                  </p>
                  <div className="space-y-2">
                    {packages.map((pkg) => (
                      <button
                        key={pkg.name}
                        onClick={() => setSelectedPackage(selectedPackage === pkg.name ? null : pkg.name)}
                        className={`w-full flex items-center justify-between rounded-xl border px-4 py-3.5 text-left transition-all ${
                          selectedPackage === pkg.name
                            ? "border-primary bg-primary/5 text-primary ring-1 ring-primary"
                            : "border-border bg-card hover:border-primary/40"
                        }`}
                      >
                        <span className="font-medium text-sm">{pkg.name}</span>
                        <span className="font-bold text-sm">{pkg.price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                    Step 2: Add Features
                  </p>
                  <div className="space-y-2">
                    {featureOptions.map((feature) => (
                      <label
                        key={feature.name}
                        className={`flex items-center justify-between rounded-xl border px-4 py-3.5 cursor-pointer transition-all ${
                          selectedFeatures.has(feature.name)
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-border bg-card hover:border-primary/40"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedFeatures.has(feature.name)}
                            onChange={() => toggleFeature(feature.name)}
                            className="h-4 w-4 accent-primary flex-shrink-0"
                          />
                          <div>
                            <span className="text-sm font-medium">{feature.name}</span>
                            {selectedFeatures.has(feature.name) && (
                              <p className="text-xs text-muted-foreground mt-0.5">{feature.description}</p>
                            )}
                          </div>
                        </div>
                        <span className="text-sm font-bold text-primary whitespace-nowrap ml-4">{feature.display}</span>
                      </label>
                    ))}
                  </div>

                </div>
              </div>

              {/* Right: summary */}
              <div className="md:sticky md:top-24 self-start">
                <div className="rounded-2xl border bg-card shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Calculator className="h-5 w-5 text-primary" />
                    <h3 className="font-bold text-lg">Your Estimate</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Base rates only. Final quote confirmed on your call.
                  </p>

                  <div className="border-t pt-4 space-y-3">
                    {selectedPackage ? (
                      <div className="flex justify-between text-sm">
                        <span>{selectedPackage}</span>
                        <div className="text-right">
                          <span className="line-through text-muted-foreground mr-2">
                            ${packageBasePrices[selectedPackage].original.toLocaleString()}
                          </span>
                          <span className="font-semibold">
                            ${packageBasePrices[selectedPackage].discounted.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">No base package selected</p>
                    )}

                    {selectedFeatureItems.filter((f) => !f.recurring).map((f) => (
                      <div key={f.name} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{f.name}</span>
                        <span className="font-semibold">{f.display}</span>
                      </div>
                    ))}

                    {selectedPackage && (
                      <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                        <span>Discount (25% off)</span>
                        <span className="font-semibold">
                          -${(packageBasePrices[selectedPackage].original - packageBasePrices[selectedPackage].discounted).toLocaleString()}
                        </span>
                      </div>
                    )}

                    {selectedFeatureItems.filter((f) => f.recurring).map((f) => (
                      <div key={f.name} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{f.name}</span>
                        <span className="font-semibold text-blue-600 dark:text-blue-400">{f.display}</span>
                      </div>
                    ))}

                    {(selectedPackage || selectedFeatures.size > 0) ? (
                      <div className="border-t pt-3 space-y-1">
                        <div className="flex justify-between text-lg font-bold text-primary">
                          <span>One-time</span>
                          <span>${oneTimeTotal.toLocaleString()}+</span>
                        </div>
                        {recurringMonthlyTotal > 0 && (
                          <div className="flex justify-between text-sm font-semibold text-blue-600 dark:text-blue-400">
                            <span>Recurring</span>
                            <span>${recurringMonthlyTotal.toLocaleString()}/mo</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="py-8 text-center text-muted-foreground text-sm">
                        Select a package and features to see your estimate
                      </div>
                    )}
                  </div>

                  <Button asChild className="w-full mt-4">
                    <Link href="/contact">
                      Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Countdown */}
        {isPromotionActive && <section className="bg-muted/40 text-secondary py-16 sm:py-20">
          <div className="container mx-auto px-4 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
              Limited Time Offer
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl font-headline">
              25% Off · Offer Ends In
            </h2>
            <p className="mt-3 text-secondary/60 max-w-lg mx-auto">
              Until the end of April, enjoy a 25% discount on any of our web design packages.
            </p>
            <div className="mt-10  flex justify-center gap-8 sm:gap-16">
              {[
                { value: timeLeft.days, label: "Days" },
                { value: timeLeft.hours, label: "Hours" },
                { value: timeLeft.minutes, label: "Minutes" },
                { value: timeLeft.seconds, label: "Seconds" },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center">
                  <span className="text-5xl sm:text-6xl font-bold tabular-nums">
                    {String(value).padStart(2, "0")}
                  </span>
                  <span className="mt-2 text-xs uppercase tracking-widest text-secondary/60">
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <Button asChild size="lg" className="mt-10">
              <Link href="/contact">Claim Your Discount</Link>
            </Button>
          </div>
        </section>}

        {/* CTA */}
        <section className="border-t">
          <div className="container mx-auto px-4 py-16 sm:py-20">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row max-w-4xl mx-auto">
              <div>
                <h3 className="text-2xl font-bold">Ready to discuss your project?</h3>
                <p className="mt-2 text-muted-foreground">
                  Free, no-obligation consultation call. Find the best solution for you.
                </p>
              </div>
              <Button size="lg" asChild className="flex-shrink-0">
                <Link href="/contact">
                  Schedule a Free Call <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <section className="border-t border-border bg-foreground text-background">
          <div className="container mx-auto px-4 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: "3", label: "Packages available" },
              { value: "25%", label: "Launch discount" },
              { value: "$938", label: "Starting at" },
              { value: "Free", label: "Consultation" },
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

      </main>
      <Footer />
    </div>
  );
}
