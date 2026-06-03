import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart2,
  BrainCircuit,
  CheckCircle2,
  FileSearch,
  Search,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const PAGE_URL = "https://www.codeheavenstudio.com/services/seo-optimization";
const PAGE_TITLE = "SEO & AI Search Optimization";
const PAGE_DESCRIPTION =
  "Technical SEO, structured data, local search, and answer-ready content designed to improve visibility across Google, AI Overviews, ChatGPT search, and Gemini.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  keywords: [
    "SEO optimization",
    "AI search optimization",
    "AI SEO",
    "Google AI Overviews SEO",
    "ChatGPT search visibility",
    "technical SEO",
    "local SEO",
    "structured data",
  ],
  openGraph: {
    title: `${PAGE_TITLE} | Code Heaven Studio`,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    images: ["/hero-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PAGE_TITLE} | Code Heaven Studio`,
    description: PAGE_DESCRIPTION,
    images: ["/clouds-poster.jpg"],
  },
};

const features = [
  "Full SEO audit of your existing site",
  "Keyword research for your industry & location",
  "On-page SEO (titles, meta, headings, content)",
  "Technical SEO (crawlability, speed, structure)",
  "Local SEO & Google Business Profile setup",
  "AI search visibility review for modern discovery",
  "Structured data that matches visible page content",
  "Answer-ready service, comparison, and FAQ content",
  "Competitor analysis",
  "Monthly reporting & progress tracking",
];

const whyUs = [
  {
    icon: <BrainCircuit className="h-6 w-6 text-primary" />,
    title: "Google + AI Search Visibility",
    desc: "We strengthen the same SEO fundamentals that help your pages appear in traditional results, AI Overviews, and other AI-assisted discovery experiences.",
  },
  {
    icon: <FileSearch className="h-6 w-6 text-primary" />,
    title: "Real Audits, Real Fixes",
    desc: "We don't just hand you a report. We implement the fixes ourselves, so improvements actually happen.",
  },
  {
    icon: <BarChart2 className="h-6 w-6 text-primary" />,
    title: "Transparent Reporting",
    desc: "You get clear monthly reports showing keyword rankings, traffic, and what changed. No jargon, just results.",
  },
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: "Speed = SEO",
    desc: "Google rewards fast sites. Every optimization we do includes performance improvements to boost your rankings further.",
  },
];

const aiSearchFoundations = [
  {
    icon: <FileSearch className="h-6 w-6 text-primary" />,
    title: "Clear, Useful Answers",
    desc: "We organize service pages around the real questions, comparisons, and decisions your customers make.",
  },
  {
    icon: <Search className="h-6 w-6 text-primary" />,
    title: "Findable Site Architecture",
    desc: "Internal links, crawlable text, semantic headings, and focused pages make important information easier to discover.",
  },
  {
    icon: <BrainCircuit className="h-6 w-6 text-primary" />,
    title: "Strong Entity Signals",
    desc: "Consistent business details, relevant structured data, and clear expertise help search systems understand who you are.",
  },
  {
    icon: <BarChart2 className="h-6 w-6 text-primary" />,
    title: "Measurement & Iteration",
    desc: "We use Search Console, analytics, and conversion data to improve the pages that matter most to your business.",
  },
];

const faqItems = [
  {
    question: "What is AI search optimization?",
    answer:
      "AI search optimization is the practice of improving the same technical, content, and trust signals that help search systems understand and surface your website in AI-assisted results.",
  },
  {
    question: "Can you guarantee placement in AI Overviews or ChatGPT search?",
    answer:
      "No. Search engines and AI search products decide which sources to surface. We improve eligibility and clarity through strong SEO fundamentals, useful content, and crawlable site structure.",
  },
  {
    question: "Does AI search require special schema or hidden AI content?",
    answer:
      "No. We use relevant structured data that matches visible page content, and we keep important information available as helpful, human-readable text.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  serviceType: ["Search Engine Optimization", "AI Search Optimization"],
  areaServed: "Worldwide",
  provider: {
    "@type": "Organization",
    name: "Code Heaven Studio",
    url: "https://www.codeheavenstudio.com",
  },
  url: PAGE_URL,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.codeheavenstudio.com",
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
      name: PAGE_TITLE,
      item: PAGE_URL,
    },
  ],
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

export default function SeoOptimizationPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-secondary text-secondary-foreground py-20 sm:py-32">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 mb-6 mx-auto">
              <Search className="h-7 w-7 text-primary" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              SEO + AI Search
            </p>
            <h1 className="font-headline text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
              SEO & AI Search{" "}
              <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Optimization
              </span>
            </h1>
            <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto mb-10">
              Be found wherever customers research and compare. We improve
              visibility across Google and AI-assisted search through technical
              SEO, useful content, structured data, and local optimization.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
              >
                <Link href="/free-audit">Get a Free SEO Audit</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8 bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/codeheavenpricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <h2 className="font-headline text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                Search Visibility From Fundamentals to AI Discovery
              </h2>
              <p className="text-muted-foreground text-lg">
                A complete SEO service, from initial audit to ongoing
                improvements and reporting.
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

        {/* AI Search Foundations */}
        <section className="border-y border-border bg-primary/[0.04] py-20 sm:py-28">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
                AI Search Foundations
              </p>
              <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
                Built for Google and AI-Assisted Discovery
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                There is no magic AI SEO tag. We make your site easy to crawl,
                understand, trust, and cite by improving the content and
                technical foundations that modern search systems rely on.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
              {aiSearchFoundations.map((item) => (
                <article
                  key={item.title}
                  className="flex gap-4 rounded-2xl border bg-card p-6 shadow-sm"
                >
                  <div className="shrink-0 mt-0.5">{item.icon}</div>
                  <div>
                    <h3 className="mb-1 text-base font-semibold">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section className="bg-muted/40 py-20 sm:py-28">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <h2 className="font-headline text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                SEO that actually works
              </h2>
              <p className="text-muted-foreground text-lg">
                No black hat tricks. No empty promises. Just solid fundamentals done right.
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

        {/* FAQ */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="mb-10 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
                FAQ
              </p>
              <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
                AI Search Optimization Questions
              </h2>
            </div>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <article key={item.question} className="rounded-2xl border bg-card p-6">
                  <h3 className="text-lg font-semibold">{item.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-secondary text-secondary-foreground py-20 sm:py-28">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <h2 className="font-headline text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
              Improve how your business gets discovered.
            </h2>
            <p className="text-secondary-foreground/70 text-lg max-w-xl mx-auto mb-10">
              We&apos;ll audit your site for free and show you what is holding
              it back across Google and AI-assisted search.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
            >
              <Link href="/free-audit" className="flex items-center gap-2">
                Request Free Audit <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
