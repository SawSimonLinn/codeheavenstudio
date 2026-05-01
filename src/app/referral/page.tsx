import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referral Partner Program — Earn 10–15% Commission",
  description:
    "Refer a client to Code Heaven Studio and earn 10% commission per project. Refer 3+ clients and earn 15% on every deal. No cap — earnings stack with every referral.",
  alternates: { canonical: "https://www.codeheavenstudio.com/referral" },
  openGraph: {
    title: "Referral Partner Program | Code Heaven Studio",
    description:
      "Refer a client and earn 10% commission. Refer 3+ clients and unlock 15% on every project. No cap on referrals.",
    url: "https://www.codeheavenstudio.com/referral",
  },
};

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  DollarSign,
  Users,
  Handshake,
  Gift,
  CheckCircle,
  Star,
  Share2,
  ClipboardCheck,
  Wallet,
  Megaphone,
  Briefcase,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    icon: <Share2 className="h-7 w-7 text-primary" />,
    title: "Refer a Client",
    description:
      "Know someone who needs a website or digital product? Send them our way with your unique referral link or just make an introduction.",
  },
  {
    number: "02",
    icon: <ClipboardCheck className="h-7 w-7 text-primary" />,
    title: "We Close the Deal",
    description:
      "We handle the sales call, proposal, and onboarding. You don't have to do any selling, just make the intro.",
  },
  {
    number: "03",
    icon: <Wallet className="h-7 w-7 text-primary" />,
    title: "You Earn Commission",
    description:
      "Once the project is signed and the first payment is received, we send your commission fast, no hassle.",
  },
];

const tiers = [
  {
    label: "Standard Referral",
    commission: "10%",
    description: "For anyone who sends us a paying client.",
    perks: [
      "10% of the project value",
      "Paid after first client payment",
      "No cap on referrals",
      "Works for any package",
    ],
    highlight: false,
  },
  {
    label: "Partner Referral",
    commission: "15%",
    description: "For active partners who send 3+ clients per year.",
    perks: [
      "15% of the project value",
      "Priority payment processing",
      "Co-marketing opportunities",
      "Dedicated partner contact",
    ],
    highlight: true,
  },
  {
    label: "Agency White-Label",
    commission: "Custom",
    description: "For agencies reselling our services under their brand.",
    perks: [
      "Custom revenue share",
      "White-label deliverables",
      "Dedicated project manager",
      "Volume discounts available",
    ],
    highlight: false,
  },
];

const whoFits = [
  {
    icon: <Megaphone className="h-7 w-7 text-primary" />,
    title: "Marketers & Consultants",
    description:
      "You advise businesses on strategy. When they need a site or app, send them to us.",
  },
  {
    icon: <Briefcase className="h-7 w-7 text-primary" />,
    title: "Business Coaches",
    description:
      "Your clients are building something new. Point them to a dev team they can trust.",
  },
  {
    icon: <HeartHandshake className="h-7 w-7 text-primary" />,
    title: "Freelancers & Designers",
    description:
      "Got a client who needs more than you can deliver? We'll partner with you and share the revenue.",
  },
  {
    icon: <Users className="h-7 w-7 text-primary" />,
    title: "Community Leaders",
    description:
      "Run a community of entrepreneurs or creators? Refer your audience and earn every time.",
  },
];

const faqs = [
  {
    q: "How do I refer someone?",
    a: "Fill out the form below or email us at hello@codeheavenstudio.com with the referral's name and contact info. We'll take it from there.",
  },
  {
    q: "When do I get paid?",
    a: "Commission is paid within 5 business days of the client's first payment clearing.",
  },
  {
    q: "Is there a limit to how many people I can refer?",
    a: "No cap. Refer as many clients as you want, you earn on every single one.",
  },
  {
    q: "Do I need a formal agreement to join?",
    a: "For one-off referrals, a handshake (or email) is enough. For Partner or White-Label tiers, we set up a simple written agreement.",
  },
  {
    q: "What counts as a completed referral?",
    a: "A referral is counted when the client signs a contract and makes their first payment.",
  },
];

export default function ReferralPartnerPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-secondary text-secondary-foreground py-20 sm:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-sm font-semibold text-primary mb-6">
                <Gift className="h-4 w-4" />
                Referral Partner Program
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">
                Earn by Sharing What You Believe In
              </h1>
              <p className="mt-6 text-lg leading-8 text-secondary-foreground/80 max-w-2xl mx-auto">
                Know someone who needs a website or digital product? Send them
                our way and earn up to 15% commission on every project that
                closes. No selling required, just make the intro.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Become a Partner <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10" asChild>
                  <a href="#how-it-works">See How It Works</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <section className="border-b border-border bg-primary text-white">
          <div className="container mx-auto px-4 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: "10–15%", label: "Commission rate" },
              { value: "5 days", label: "Avg. payout time" },
              { value: "No cap", label: "On referrals" },
              { value: "100%", label: "Transparent" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl sm:text-4xl font-black mb-1">{value}</p>
                <p className="text-sm text-white/70 uppercase tracking-widest">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How it Works */}
        <section id="how-it-works" className="py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                How It Works
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Three steps. No friction. No chasing invoices.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-4xl mx-auto">
              {steps.map((step) => (
                <Card key={step.number} className="shadow-lg hover:shadow-xl transition-shadow text-center">
                  <CardContent className="p-8 flex flex-col items-center">
                    <span className="text-6xl font-black text-primary/15 leading-none mb-4 select-none">
                      {step.number}
                    </span>
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Commission Tiers */}
        <section className="bg-muted py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                Commission Tiers
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                The more you refer, the more you earn. Simple and transparent.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-5xl mx-auto items-stretch">
              {tiers.map((tier) => (
                <Card
                  key={tier.label}
                  className={`flex flex-col relative ${
                    tier.highlight ? "border-primary shadow-xl" : "shadow-lg"
                  }`}
                >
                  {tier.highlight && (
                    <div className="bg-primary text-primary-foreground text-center py-1.5 text-sm font-semibold rounded-t-lg">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <DollarSign className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{tier.label}</CardTitle>
                    </div>
                    <div className="text-4xl font-black text-primary">
                      {tier.commission}
                    </div>
                    <p className="text-sm text-muted-foreground">{tier.description}</p>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      {tier.perks.map((perk) => (
                        <li key={perk} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <div className="p-6 mt-auto">
                    <Button
                      asChild
                      className="w-full"
                      variant={tier.highlight ? "default" : "outline"}
                    >
                      <Link href="/contact">Get Started</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Who It's For */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                Who This Is For
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                If you work with businesses or creators, there's likely someone
                in your network who could use us.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
              {whoFits.map((item) => (
                <Card key={item.title} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 flex gap-5 items-start">
                    <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Partner with Us */}
        <section className="bg-secondary text-secondary-foreground py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline mb-6">
                  Why Partner with Code Heaven Studio?
                </h2>
                <p className="text-secondary-foreground/80 leading-relaxed mb-8">
                  We're not a faceless agency. We're two developers who care
                  deeply about the quality of every product we ship, and about
                  the trust you put on the line when you make a referral. We
                  protect your reputation by doing exceptional work.
                </p>
                <ul className="space-y-4">
                  {[
                    "Transparent, on-time payouts",
                    "We keep you in the loop on your referral's project",
                    "Your client gets a 5-star experience every time",
                    "No awkward sales pressure, just great service",
                    "You can refer us over and over for the same client",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-secondary-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Handshake className="h-8 w-8 text-primary" />, label: "Trust-first" },
                  { icon: <Star className="h-8 w-8 text-primary" />, label: "5-star rated" },
                  { icon: <DollarSign className="h-8 w-8 text-primary" />, label: "Fair pay" },
                  { icon: <Users className="h-8 w-8 text-primary" />, label: "Long-term partners" },
                ].map(({ icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-secondary-foreground/10 p-8 text-center"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20">
                      {icon}
                    </div>
                    <span className="font-semibold text-sm">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                Common Questions
              </h2>
            </div>
            <div className="mx-auto max-w-3xl space-y-0">
              {faqs.map((faq, i) => (
                <div
                  key={faq.q}
                  className={`flex gap-6 p-8 border-t border-border ${
                    i === faqs.length - 1 ? "border-b" : ""
                  }`}
                >
                  <span className="text-3xl font-black text-primary/20 leading-none flex-shrink-0 select-none mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {faq.q}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary/5 border-t border-primary/10">
          <div className="container mx-auto px-4 py-16 sm:py-20">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row max-w-5xl mx-auto">
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-bold">
                  Ready to become a partner?
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Reach out and we'll get you set up in under 24 hours, no
                  paperwork required to start referring.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Let's Partner Up <ArrowRight className="ml-2 h-5 w-5" />
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
