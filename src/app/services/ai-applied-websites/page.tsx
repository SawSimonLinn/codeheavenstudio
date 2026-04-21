import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  MessageSquareText,
  Search,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

const PAGE_URL = "https://www.codeheavenstudio.com/services/ai-applied-websites";
const PAGE_TITLE =
  "AI Applied Website Development 2026 (Gemini, OpenAI, Claude) | Code Heaven Studio";
const PAGE_DESCRIPTION =
  "AI Applied Websites for 2026: Gemini, OpenAI, and Claude integrations for chat, automation, smart content, and SEO-ready growth. Built for speed, conversion, and security.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
  },
  keywords: [
    "AI applied websites",
    "AI website development",
    "Gemini OpenAI Claude website",
    "AI web design 2026",
    "AI website SEO",
    "AI chatbot website integration",
    "Code Heaven Studio",
  ],
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    siteName: "Code Heaven Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const aiFeatureBlocks = [
  {
    icon: MessageSquareText,
    title: "AI Chat That Qualifies Leads",
    description:
      "Context-aware website assistants that answer questions, capture intent, and guide visitors toward booking or purchase.",
  },
  {
    icon: Workflow,
    title: "Automation Across Your Funnel",
    description:
      "Automated follow-up flows, quote routing, and CRM-ready handoff so your team spends less time on manual tasks.",
  },
  {
    icon: Sparkles,
    title: "Smart Dynamic Content",
    description:
      "Personalized messaging and recommendations based on user context, service interest, and conversion stage.",
  },
  {
    icon: Search,
    title: "SEO-First AI Content Engine",
    description:
      "Structured service content, schema, and topic clusters designed for rankings, discoverability, and high-intent traffic.",
  },
];

const modelStack = [
  {
    model: "OpenAI",
    useCase: "Fast conversational assistants, function/tool calling, and conversion-focused interactions.",
  },
  {
    model: "Gemini",
    useCase: "Multimodal understanding, content generation support, and structured workflow tasks.",
  },
  {
    model: "Claude",
    useCase: "Long-context reasoning, policy-aware copy workflows, and high-quality draft refinement.",
  },
];

const seoDeliverables = [
  "Keyword and intent mapping for AI-related service pages",
  "Page architecture with internal links for crawl depth and topical authority",
  "JSON-LD schema (Service, FAQ, Breadcrumb) for rich result eligibility",
  "Core Web Vitals optimization and lightweight delivery for fast indexing",
  "Conversion-first metadata and semantic heading hierarchy",
  "High-intent CTA placement and lead path optimization",
];

const faqItems = [
  {
    question: "What is an AI applied website?",
    answer:
      "An AI applied website combines modern web development with practical AI workflows, such as intelligent chat, automated lead capture, smart content recommendations, and backend automation.",
  },
  {
    question: "Why use Gemini, OpenAI, and Claude together?",
    answer:
      "Each model has different strengths. Combining them lets us choose the right model for each task, improving quality, speed, and reliability across your website workflows.",
  },
  {
    question: "Can this improve SEO performance?",
    answer:
      "Yes. We build SEO into architecture, metadata, schema, internal linking, and content strategy so your AI website is both useful for users and indexable for search engines.",
  },
  {
    question: "Do you build this for existing websites too?",
    answer:
      "Yes. We can retrofit AI features into an existing website or redesign and rebuild from scratch, depending on your current stack and goals.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.codeheavenstudio.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: "https://www.codeheavenstudio.com/services",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "AI Applied Websites",
      item: PAGE_URL,
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Applied Websites",
  description: PAGE_DESCRIPTION,
  serviceType: "AI Website Development",
  areaServed: "Worldwide",
  provider: {
    "@type": "Organization",
    name: "Code Heaven Studio",
    url: "https://www.codeheavenstudio.com/",
  },
  url: PAGE_URL,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function AIAppliedWebsitesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="border-b border-border bg-secondary py-16 sm:py-24">
          <div className="container mx-auto max-w-5xl px-4">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
              AI Website Service
            </p>
            <h1 className="text-4xl font-black leading-tight tracking-tight text-secondary-foreground sm:text-6xl">
              AI Applied Website Development for 2026
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-secondary-foreground/75">
              We build modern AI-powered websites using{" "}
              <strong>Gemini</strong>, <strong>OpenAI</strong>, and <strong>Claude</strong> for
              practical business outcomes: better lead qualification, smarter user journeys, and
              stronger SEO performance.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/contact">Book a Free Strategy Call</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8">
                <Link href="/services">Explore All Services</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              What You Get With AI Applied Websites
            </h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              This is not AI for hype. It is AI implementation focused on conversion, automation,
              and measurable growth.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {aiFeatureBlocks.map((feature) => {
                const Icon = feature.icon;
                return (
                  <article key={feature.title} className="rounded-2xl border bg-card p-6">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-muted/35 py-16 sm:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Model Stack: Gemini + OpenAI + Claude
            </h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              We architect each workflow with the model best suited for the task instead of forcing
              one model across everything.
            </p>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {modelStack.map((item) => (
                <article key={item.model} className="rounded-2xl border bg-card p-6">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <BrainCircuit className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold">{item.model}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.useCase}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="container mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1.25fr_1fr]">
            <div>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                SEO Framework Built Into Delivery
              </h2>
              <p className="mt-3 text-muted-foreground">
                For this service page and every implementation, we ship SEO-ready foundations from
                day one: metadata, structured data, internal linking, semantic content blocks, and
                fast performance.
              </p>
              <ul className="mt-8 space-y-3">
                {seoDeliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm sm:text-base">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <aside className="rounded-2xl border bg-card p-6">
              <h3 className="text-lg font-bold">Implementation Standards</h3>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  Privacy-safe prompt and data handling
                </li>
                <li className="flex items-start gap-2">
                  <Bot className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  Guardrails for brand tone and response quality
                </li>
                <li className="flex items-start gap-2">
                  <Search className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  Crawl-friendly content and discoverability
                </li>
              </ul>
              <Button asChild className="mt-6 w-full rounded-full">
                <Link href="/contact" className="inline-flex items-center justify-center gap-1.5">
                  Start My AI Website <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </aside>
          </div>
        </section>

        <section className="border-y border-border bg-muted/35 py-16 sm:py-20">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">FAQ</h2>
            <div className="mt-8 space-y-5">
              {faqItems.map((faq) => (
                <article key={faq.question} className="rounded-xl border bg-card p-5">
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
              Build an AI-Ready Website That Converts
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Need an implementation plan for your business? We can scope the right AI workflows,
              SEO structure, and launch roadmap in one call.
            </p>
            <Button asChild size="lg" className="mt-8 rounded-full px-10">
              <Link href="/contact">Get a Free AI Website Consultation</Link>
            </Button>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </main>
      <Footer />
    </>
  );
}
