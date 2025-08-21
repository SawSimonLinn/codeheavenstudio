"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Check,
  PlusCircle,
  Calculator,
  ShieldCheck,
  Star,
  BadgeCent,
  MessageCircle,
  ArrowRight,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const packages = [
  {
    name: "Starter Package",
    originalPrice: "$1250",
    price: "$938",
    description:
      "For small businesses getting online. Features can be added or removed.",
    features: [
      "5-page responsive website (Home, About, Services, Blog, Contact)",
      "Mobile-friendly + SEO-ready design",
      "Custom design with brand colors & typography",
      "Free 2 stock videos + premium hero section",
      "1 round of revisions",
      "Basic contact form setup",
      "Google Analytics setup",
      "2 weeks of support after launch",
      "Free consultation call included",
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
      "Up to 12 custom-designed pages",
      "Blog setup with categories & tags",
      "Advanced SEO optimization (keywords, on-page SEO, schema setup)",
      "Premium stock images & icons included",
      "Performance optimization (speed + Core Web Vitals)",
      "2 rounds of revisions",
      "1-month post-launch support",
      "Free consultation call included",
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
      "Custom animations & video integration",
      "AI-powered features (chatbots, recommendations, or workflows)",
      "Marketing landing pages + conversion-focused design",
      "Custom blog / CMS integration",
      "Priority support + maintenance options",
      "3 rounds of revisions",
      "2 months post-launch support",
      "Free consultation call included",
    ],
    cta: "Contact Us",
  },
];

const addOns = [
  {
    name: "Custom Logo & Branding",
    price: "$450+",
    description:
      "Professional logo design, brand colors, and typography guidelines.",
  },
  {
    name: "Extra Pages",
    price: "$150/page",
    description: "Add more pages to your website as your business grows.",
  },
  {
    name: "Full SEO Setup",
    price: "$500",
    description:
      "Comprehensive on-page and technical SEO to boost your ranking.",
  },
  {
    name: "Blog Integration",
    price: "$300",
    description:
      "A fully functional blog to share updates and attract traffic.",
  },
  {
    name: "Multi-language Support",
    price: "$350+",
    description: "Translate and localize your site for global audiences.",
  },
  {
    name: "Speed & Performance Boost",
    price: "$250",
    description: "Advanced optimization for ultra-fast load times.",
  },
  {
    name: "SEO Copywriting",
    price: "$300+",
    description:
      "SEO-friendly website content for better engagement and ranking.",
  },
  {
    name: "Ongoing SEO & Marketing",
    price: "$400/month",
    description:
      "Continuous optimization, keyword tracking, and marketing strategy.",
  },
  {
    name: "Website Maintenance & Support",
    price: "$200/month",
    description: "Updates, backups, bug fixes, and priority support.",
  },
  {
    name: "Custom Video / Animation",
    price: "$500+",
    description:
      "A tailored explainer video or homepage animation for your brand.",
  },
  {
    name: "AI Features (chatbot, automation)",
    price: "$500+",
    description: "Integrate a custom AI chatbot or workflow automation tools.",
  },
];

const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-3xl sm:text-4xl font-bold">
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-xs sm:text-sm uppercase text-muted-foreground">
      {label}
    </span>
  </div>
);

export default function PricingPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const year = now.getFullYear();
      const endDate = new Date(year, 8, 30, 23, 59, 59); // September is month 8 (0-indexed)

      const difference = +endDate - +now;
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return newTimeLeft;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="relative inline-block">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                Packages & Pricing
              </h1>
              <div className="absolute -top-4 -right-12 transform rotate-12">
                <div className="relative">
                  <Zap className="absolute h-10 w-10 text-yellow-400/50 animate-ping" />
                  <div className="relative flex items-center justify-center rounded-full bg-red-500 px-3 py-1.5 text-base font-bold text-white shadow-lg animate-pulse">
                    25% OFF
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Transparent pricing for every stage of your business. Choose the
              plan that's right for you.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-800 dark:bg-green-900/50 dark:text-green-300">
              <ShieldCheck className="h-5 w-5" />
              Secure, no hidden fees.
            </div>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
            {packages.map((pkg) => (
              <Card
                key={pkg.name}
                className={`flex flex-col relative ${
                  pkg.popular ? "border-primary shadow-lg" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="bg-primary text-primary-foreground text-center py-1.5 text-sm font-semibold rounded-t-lg">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{pkg.name}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                  <div className="pt-4 flex items-baseline gap-x-2">
                    <span className="text-4xl font-bold text-primary">
                      {pkg.price}
                    </span>
                    <span className="text-xl font-medium text-muted-foreground line-through">
                      {pkg.originalPrice}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    One-time payment
                  </p>
                  <p className="text-xs text-muted-foreground">
                    (Payment plans available)
                  </p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="p-6 mt-auto">
                  <Button
                    asChild
                    className="w-full"
                    variant={pkg.popular ? "default" : "outline"}
                  >
                    <Link href="/contact">{pkg.cta}</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-primary/5 py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                Limited Time: 25% Off All Packages!
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Until the end of September, enjoy a 25% discount on any of our
                web design packages. Don't miss out on this opportunity to
                launch your project at an unbeatable price.
              </p>
            </div>
            <div className="mt-12 mx-auto max-w-sm">
              <Card className="shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-primary">Offer Ends In</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-around">
                    <CountdownUnit value={timeLeft.days} label="Days" />
                    <CountdownUnit value={timeLeft.hours} label="Hours" />
                    <CountdownUnit value={timeLeft.minutes} label="Minutes" />
                    <CountdownUnit value={timeLeft.seconds} label="Seconds" />
                  </div>
                  <Button asChild size="lg" className="w-full mt-8">
                    <Link href="/contact">Claim Your Discount</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-muted py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                Custom Upgrades
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Enhance your package with our powerful add-ons. Final price will
                adjust accordingly.
              </p>
            </div>
            <div className="mt-12 mx-auto max-w-4xl grid gap-8 md:grid-cols-2">
              {addOns.map((addOn) => (
                <Card
                  key={addOn.name}
                  className="shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <PlusCircle className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{addOn.name}</h3>
                        <p className="text-muted-foreground">
                          {addOn.description}
                        </p>
                      </div>
                      <div className="ml-auto text-right">
                        <p className="text-lg font-semibold text-primary whitespace-nowrap">
                          {addOn.price}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                  Example Pricing
                </h2>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">
                  Here's how our flexible pricing works in practice.
                </p>
                <Card className="shadow-lg mt-6 text-left">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Calculator className="h-8 w-8 text-primary" />
                      <CardTitle>Sample Project Calculation</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <p>Starter Package</p>
                      <p className="font-semibold">$1250</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>2 Extra Pages (2 x $150)</p>
                      <p className="font-semibold">$300</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>Full SEO Setup</p>
                      <p className="font-semibold">$500</p>
                    </div>
                    <div className="border-t my-2"></div>
                    <div className="flex justify-between items-center text-lg font-bold text-primary">
                      <p>Final Price</p>
                      <p>$2050</p>
                    </div>
                    <div className="text-sm text-muted-foreground text-center pt-2">
                      <p>
                        <span className="font-semibold">
                          Estimated Timeline:
                        </span>{" "}
                        1–2 weeks + add-ons (~3 weeks total)
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="text-center">
                <Card className="bg-secondary text-secondary-foreground shadow-xl">
                  <CardContent className="p-8">
                    <div className="flex justify-center mb-4">
                      <Avatar className="h-20 w-20 border-4 border-background">
                        <AvatarImage
                          src="/review/review06.png"
                          alt="MoMo Chan"
                          data-ai-hint="design founder"
                        />
                        <AvatarFallback>MC</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                    <blockquote className="text-lg italic">
                      "Code Heaven Studio transformed my portfolio. The
                      attention to detail and creativity they brought to the
                      project was exceptional. I couldn't be happier with the
                      results!"
                    </blockquote>
                    <footer className="mt-4">
                      <p className="font-semibold">MoMo Chan</p>
                      <p className="text-sm text-muted-foreground">
                        Founder, MoMo Chan Designs
                      </p>
                    </footer>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary/5 border-t border-primary/10">
          <div className="container mx-auto px-4 py-16 sm:py-20">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-bold">
                  Ready to discuss your project?
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Get a free, no-obligation consultation call to find the best
                  solution for you.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Schedule a Free Call <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
