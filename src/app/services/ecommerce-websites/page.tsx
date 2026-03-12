import Link from "next/link";
import { ShoppingCart, CheckCircle2, ArrowRight, CreditCard, Package, BarChart3, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const features = [
  "Product listings with variants and images",
  "Secure checkout and payment integration",
  "Inventory management",
  "Order management and email notifications",
  "Discount codes and promotions",
  "Mobile-optimised shopping experience",
  "SEO-ready product and category pages",
  "Analytics and sales reporting",
];

const whyUs = [
  {
    icon: <CreditCard className="h-6 w-6 text-primary" />,
    title: "Secure Payments",
    desc: "Stripe, PayPal, and other major payment gateways integrated securely. Your customers can pay with confidence.",
  },
  {
    icon: <Package className="h-6 w-6 text-primary" />,
    title: "Easy to Manage",
    desc: "Add products, update stock, and fulfil orders without touching any code. Built for business owners, not developers.",
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-primary" />,
    title: "Built to Sell",
    desc: "Every page is designed with conversion in mind, clear CTAs, fast load times, and a smooth checkout funnel.",
  },
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    title: "Secure & Reliable",
    desc: "SSL, secure data handling, and regular updates keep your store and your customers&apos; data protected.",
  },
];

export const metadata = {
  title: "E-commerce Websites | Code Heaven Studio",
  description:
    "From product listings to checkout, we build e-commerce experiences that are simple to manage and easy for your customers to use.",
  openGraph: {
    title: "E-commerce Websites | Code Heaven Studio",
    description: "Sell more with a store that works.",
  },
};

export default function EcommerceWebsitesPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-secondary text-secondary-foreground py-20 sm:py-32">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 mb-6 mx-auto">
              <ShoppingCart className="h-7 w-7 text-primary" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              Service
            </p>
            <h1 className="font-headline text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
              E-commerce{" "}
              <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Websites
              </span>
            </h1>
            <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto mb-10">
              From product listings to checkout, we build e-commerce experiences that are simple to manage
              and easy for your customers to use, so you can focus on running your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
              >
                <Link href="/request-website">Start Your Store</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8 bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/projects">See Our Work</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <h2 className="font-headline text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                What&apos;s Included
              </h2>
              <p className="text-muted-foreground text-lg">
                Everything your online store needs to launch, sell, and grow.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {features.map((feat) => (
                <div key={feat} className="flex items-start gap-3 rounded-xl border bg-card p-4 shadow-sm">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section className="bg-muted/40 py-20 sm:py-28">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <h2 className="font-headline text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                Why sell with us
              </h2>
              <p className="text-muted-foreground text-lg">
                We build stores that are fast, secure, and designed to convert.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {whyUs.map((item) => (
                <div key={item.title} className="rounded-2xl border bg-card p-6 shadow-sm flex gap-4">
                  <div className="shrink-0 mt-0.5">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold text-base mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-secondary text-secondary-foreground py-20 sm:py-28">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <h2 className="font-headline text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
              Ready to start selling online?
            </h2>
            <p className="text-secondary-foreground/70 text-lg max-w-xl mx-auto mb-10">
              Tell us about your products and your goals. We&apos;ll build you a store that works.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
            >
              <Link href="/request-website" className="flex items-center gap-2">
                Build My Store <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
