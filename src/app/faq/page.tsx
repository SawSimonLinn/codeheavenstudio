import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Common Questions Answered",
  description:
    "Answers to the most common questions about working with Code Heaven Studio — pricing, free demos, timelines, code ownership, and how we build websites.",
  alternates: { canonical: "https://www.codeheavenstudio.com/faq" },
  openGraph: {
    title: "FAQ | Code Heaven Studio",
    description:
      "Common questions about pricing, free demos, timelines, and code ownership answered.",
    url: "https://www.codeheavenstudio.com/faq",
  },
};

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';

const faqItems = [
  {
    category: 'Pricing & Payment',
    items: [
      {
        question: 'What is your pricing model?',
        answer: 'We offer one-time flat-rate pricing for all website design and development packages. There are no monthly retainers, no hidden fees, and no recurring charges. You pay once, and the website is yours to keep forever.',
      },
      {
        question: 'What packages do you offer?',
        answer: 'We offer three core packages: the Starter Package for small businesses and landing pages, the Growth Package for more complex multi-page websites with custom functionality, and the Premium Package for full-featured web applications. Each package is clearly outlined on our Pricing page with everything included.',
      },
      {
        question: 'Do you require a deposit before starting?',
        answer: 'Yes. We typically require a 50% deposit before work begins, with the remaining 50% due upon project completion and your approval before the site goes live. Exact payment terms are outlined in your project agreement.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept payment via bank transfer (ACH), PayPal, Venmo, and Zelle. All payment details will be provided in your project proposal.',
      },
    ],
  },
  {
    category: 'Process & Timeline',
    items: [
      {
        question: 'How long does it take to build a website?',
        answer: 'Timelines depend on the scope of the project. The Starter Package typically takes 1–2 weeks, the Growth Package takes 3–4 weeks, and the Premium Package takes 6–8 weeks. Complex custom features, client revision delays, or scope changes may affect the timeline. We will provide a detailed schedule in your project proposal.',
      },
      {
        question: 'Do you offer a free demo before I commit?',
        answer: 'Yes. We believe you should see value before spending a dollar. We will create a free demo layout or mockup tailored to your business before you make any payment or commitment. No strings attached.',
      },
      {
        question: 'What does the process look like from start to finish?',
        answer: 'Our process has four stages: (1) Discovery: we learn about your business, goals, and design preferences. (2) Design: we create a layout or mockup for your review and approval. (3) Development: we build out the full site. (4) Launch: we handle deployment, final testing, and hand off the keys. You are involved at every milestone.',
      },
      {
        question: 'How many revision rounds are included?',
        answer: 'Each package includes a set number of revision rounds, which will be specified in your project agreement. Revisions outside of the agreed scope may incur additional charges. We communicate this clearly upfront so there are no surprises.',
      },
    ],
  },
  {
    category: 'Ownership & Support',
    items: [
      {
        question: 'Do I own the website once it\'s finished?',
        answer: 'Upon final payment, you own the custom code, design, and assets created specifically for your project. Third-party components (including open-source libraries, fonts, stock media, and other licensed materials) are excluded and remain subject to their original licenses. We retain the right to feature completed work in our portfolio unless otherwise agreed in writing.',
      },
      {
        question: 'What kind of support do you offer after launch?',
        answer: 'Every project includes 30 days of complimentary post-launch support to fix any bugs or issues that arise. After the 30-day period, we offer ongoing maintenance and support packages for clients who want continued help.',
      },
      {
        question: 'Will my website be mobile-friendly and SEO-optimized?',
        answer: 'Yes, always. Every website we build is fully responsive and mobile-first by default. We also implement on-page SEO best practices from day one, including proper metadata, structured headings, performance optimization, and semantic HTML, so your site is search-engine ready at launch.',
      },
      {
        question: 'Can you help me with hosting and domain setup?',
        answer: 'Absolutely. We can guide you through purchasing a domain, setting up hosting, and deploying your website. We typically recommend platforms like Vercel or Netlify for Next.js projects, and we can assist with configuration as part of your launch process.',
      },
    ],
  },
  {
    category: 'Technical & Miscellaneous',
    items: [
      {
        question: 'What technology do you use to build websites?',
        answer: 'Our primary stack is Next.js and React for the frontend, paired with Node.js and PostgreSQL for backend and data needs. We also work with TypeScript, Tailwind CSS, and various third-party APIs depending on the project requirements.',
      },
      {
        question: 'Can you work with an existing website or codebase?',
        answer: 'Yes. We can take over an existing project, add new features, or rebuild parts of an existing site. We\'ll review your current codebase before scoping the work to give you an accurate estimate.',
      },
      {
        question: 'How do I get started?',
        answer: 'The easiest way is to reach out through our Contact page at codeheavenstudio.com/contact. Tell us about your project, and we\'ll schedule a free discovery call. From there, we\'ll put together a proposal and get your free demo started.',
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Everything you need to know about working with Code Heaven Studio. Can&apos;t find your answer?{' '}
              <Link href="/contact" className="text-primary underline underline-offset-4 hover:opacity-80">
                Reach out to us directly.
              </Link>
            </p>
          </div>

          <div className="mt-16 mx-auto max-w-3xl space-y-12">
            {faqItems.map((section) => (
              <div key={section.category}>
                <h2 className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2">
                  {section.category}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {section.items.map((item, index) => (
                    <AccordionItem key={index} value={`${section.category}-${index}`}>
                      <AccordionTrigger className="text-base text-left font-medium">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
