import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Bot,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Search,
  Sparkles,
  Workflow,
} from "lucide-react";
import Image from "next/image";

const socialLinks = [
  {
    href: "https://www.linkedin.com/company/codeheavenstudio",
    icon: <Linkedin className="h-5 w-5" />,
    name: "LinkedIn",
  },
  {
    href: "https://www.facebook.com/sawsimonlinn/",
    icon: <Facebook className="h-5 w-5" />,
    name: "Facebook",
  },
  {
    href: "https://www.instagram.com/simonlinn.codes",
    icon: <Instagram className="h-5 w-5" />,
    name: "Instagram",
  },
  {
    href: "https://www.simonlinn.dev/",
    icon: <Globe className="h-5 w-5" />,
    name: "Portfolio",
  },
];

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="border-b border-border bg-primary/[0.06]">
        <div className="container mx-auto max-w-7xl px-4 py-10 sm:py-12">
          <div className="grid gap-8 rounded-2xl border border-primary/20 bg-card/80 p-6 shadow-sm sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                <Sparkles className="h-4 w-4" />
                AI-Ready Web Development
              </p>
              <h2 className="mt-3 max-w-xl text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Make your website useful to customers and understandable to AI
                search.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                We build practical AI features and strong search foundations:
                intelligent assistants, workflow automation, answer-ready
                content, structured data, and fast technical SEO.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="rounded-full">
                  <Link href="/services/ai-applied-websites">
                    Explore AI Websites <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full bg-background/70">
                  <Link href="/services/seo-optimization">SEO & AI Search</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  icon: Bot,
                  title: "AI Assistants",
                  description: "Answer questions and qualify leads.",
                },
                {
                  icon: Workflow,
                  title: "Automation",
                  description: "Connect repetitive customer workflows.",
                },
                {
                  icon: Search,
                  title: "AI Search Visibility",
                  description: "Strengthen signals for modern discovery.",
                },
              ].map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="rounded-xl border border-border bg-background/70 p-4"
                  >
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="mt-3 text-sm font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Top section: logo + columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Image
                src="/logo.png"
                alt="Code Heaven Studio Logo"
                width={24}
                height={24}
                priority
              />
              <span className="text-sm font-semibold">Code Heaven Studio</span>
            </div>
            <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
              AI-powered websites, modern development, and search visibility
              built for real businesses.
            </p>
            <div className="flex gap-1">
              {socialLinks.map((social) => (
                <Button key={social.name} variant="ghost" size="icon" asChild>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                    <span className="sr-only">{social.name}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/referral" className="hover:text-primary">
                  Referral Partner Program
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-primary">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/why-choose-us" className="hover:text-primary">
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-primary">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/blog" className="hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-primary">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-primary">
                  Free Resources
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-primary">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/services" className="hover:text-primary">
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/services/ai-applied-websites"
                  className="hover:text-primary"
                >
                  AI Applied Websites
                </Link>
              </li>
              <li>
                <Link
                  href="/services/seo-optimization"
                  className="hover:text-primary"
                >
                  SEO & AI Search
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-primary">
                  Industries
                </Link>
              </li>
              <li>
                <Link href="/codeheavenpricing" className="hover:text-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy-policy" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="hover:text-primary">
                  Accessibility
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="hover:text-primary">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground space-y-1">
          <Link href="/admin/login" style={{ cursor: "text" }}>
            © {new Date().getFullYear()} Code Heaven Studio LLC. All rights reserved.
          </Link>
          <p>
            Founded by{" "}
            <Link href="/founder/saw-simon-linn" className="hover:text-primary">
              Saw Simon Linn
            </Link>{" "}
            and{" "}
            <Link href="/founder/mia-truong" className="hover:text-primary">
              Mia Truong
            </Link>{" "}
            in Los Angeles / San Diego, California.
          </p>
          <p>
            <a href="mailto:hello@codeheavenstudio.com" className="hover:text-primary">
              hello@codeheavenstudio.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
