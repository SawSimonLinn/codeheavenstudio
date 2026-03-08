import Link from "next/link";
import {
  MessageSquare,
  Paintbrush2,
  Code2,
  Rocket,
  HeadphonesIcon,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Consultation",
    description:
      "We start with a free call to understand your business, goals, and target audience. No jargon, no pressure, just a real conversation about what you need and how we can help.",
    detail: "Free 30-minute call · Zero commitment",
  },
  {
    number: "02",
    icon: Paintbrush2,
    title: "Design",
    description:
      "Our designer creates a custom mockup based on your brand and requirements. You review it, give feedback, and we refine until it's exactly right before a single line of code is written.",
    detail: "Figma mockup · Unlimited revisions",
  },
  {
    number: "03",
    icon: Code2,
    title: "Development",
    description:
      "Once the design is approved, we build your site with clean, fast, and SEO-ready code. We keep you in the loop throughout, no disappearing acts or radio silence.",
    detail: "Next.js · Mobile-first · Performance optimized",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch",
    description:
      "We deploy your website, connect your domain, and do a final round of testing across devices and browsers. When everything passes, we hit publish and your site goes live.",
    detail: "Domain setup · Cross-device testing · Go live",
  },
  {
    number: "05",
    icon: HeadphonesIcon,
    title: "Support",
    description:
      "After launch, we don't disappear. We offer ongoing maintenance plans to keep your site updated, secure, and running smoothly. You focus on your business, we handle the tech.",
    detail: "Monthly plans · Priority support · Content updates",
  },
];

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Most websites are completed within 2–4 weeks from design approval, depending on complexity. Landing pages can be faster, sometimes under a week.",
  },
  {
    q: "Do I need to provide content?",
    a: "Ideally yes, you know your business best. But if you need help with copywriting or photos, we can advise on that too.",
  },
  {
    q: "What if I want changes after launch?",
    a: "We offer maintenance plans that cover content updates, security patches, and ongoing improvements. Or we can handle one-off changes at an hourly rate.",
  },
  {
    q: "Will I own my website?",
    a: "Absolutely. Once the project is complete and final payment is made, the site is 100% yours: code, domain, everything.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Header />
    <main>
      {/* Hero */}
      <section className="bg-secondary text-secondary-foreground py-20 sm:py-32">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            Our Process
          </p>
          <h1 className="font-headline text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
            From Idea to{" "}
            <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Live Website
            </span>
          </h1>
          <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto">
            A simple, transparent 5-step process so you always know what&apos;s happening and what
            comes next.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex flex-col gap-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === steps.length - 1;
              return (
                <div key={step.number} className="flex gap-8">
                  {/* Left — number + connector */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border border-primary/20 shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    {!isLast && (
                      <div className="flex-1 w-px bg-border mt-3 mb-3" />
                    )}
                  </div>

                  {/* Right — content */}
                  <div className={`pb-12 ${isLast ? "" : ""}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase">
                        {step.number}
                      </span>
                    </div>
                    <h2 className="font-headline text-2xl font-bold mb-3">{step.title}</h2>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      {step.description}
                    </p>
                    <span className="inline-block text-xs font-semibold text-primary bg-primary/10 rounded-full px-3 py-1">
                      {step.detail}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/40 py-20 sm:py-28">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight text-center mb-12">
            Common Questions
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl border bg-card p-6 shadow-sm">
                <h3 className="font-semibold text-base mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary text-secondary-foreground py-20 sm:py-28">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h2 className="font-headline text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Let&apos;s start with a conversation
          </h2>
          <p className="text-secondary-foreground/70 text-lg max-w-xl mx-auto mb-10">
            Step 1 is free and there&apos;s no obligation. Tell us about your project and we&apos;ll tell you
            exactly how we can help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
            >
              <Link href="/contact">Book a Free Call</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-8 border-white text-white bg-transparent hover:bg-white/10"
            >
              <Link href="/services" className="flex items-center gap-2">
                View Services <ArrowRight className="h-4 w-4" />
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
