"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  ArrowLeftRight,
  Bot,
  ChevronDown,
  Facebook,
  Globe,
  Instagram,
  Layers,
  LayoutPanelTop,
  Linkedin,
  Menu,
  Mail,
  Monitor,
  Palette,
  PenTool,
  RefreshCcw,
  Search,
  ShoppingCart,
  Sparkles,
  Utensils,
  Wrench,
  X,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/request-website", label: "Request Website" },
];

type ServiceDropdownItem = {
  href: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features?: string[];
  highlight?: boolean;
};

const servicesDropdownRows: ServiceDropdownItem[][] = [
  [
    {
      href: "/services/ai-applied-websites",
      title: "AI Applied Websites",
      description: "Gemini, OpenAI, Claude for modern sites in 2026",
      icon: Bot,
      features: ["Gemini", "OpenAI", "Claude", "AI SEO"],
      highlight: true,
    },
    {
      href: "/services#fullstack-internal-systems",
      title: "Fullstack Internal Systems",
      description: "Order systems, dashboards & internal tools",
      icon: Layers,
      features: ["Dashboards", "Admin panels", "Automation"],
    },
  ],
  [
    {
      href: "/services#small-business-websites",
      title: "Small Business Websites",
      description: "Fast, custom sites built to convert",
      icon: Monitor,
    },
    {
      href: "/services#wix-to-custom-website",
      title: "Wix to Custom Website",
      description: "Escape Wix. Own your site 100%.",
      icon: ArrowLeftRight,
    },
  ],
  [
    {
      href: "/services#website-redesign",
      title: "Website Redesign",
      description: "Modernise and improve your existing site",
      icon: RefreshCcw,
    },
    {
      href: "/services#seo-optimization",
      title: "SEO Optimization",
      description: "Rank higher and get found on Google",
      icon: Search,
    },
  ],
  [
    {
      href: "/services#website-maintenance",
      title: "Website Maintenance",
      description: "Keep your site secure and up to date",
      icon: Wrench,
    },
    {
      href: "/services#logo-design-business-kit",
      title: "Logo Design & Business Kit",
      description: "Logo, icons, letterhead and business card",
      icon: Palette,
    },
  ],
  [
    {
      href: "/services#restaurant-websites",
      title: "Restaurant Websites",
      description: "Menus, reservations and more",
      icon: Utensils,
    },
    {
      href: "/services#figma-to-website",
      title: "Figma to Website",
      description: "Your design built pixel perfect",
      icon: PenTool,
    },
  ],
  [
    {
      href: "/services#ecommerce-websites",
      title: "E-commerce Websites",
      description: "Sell more with a store that works",
      icon: ShoppingCart,
    },
    {
      href: "/services#landing-pages",
      title: "Landing Pages",
      description: "One page. One goal. Maximum impact.",
      icon: LayoutPanelTop,
    },
  ],
];

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

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPromo, setShowPromo] = useState(true);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);

  const handleServicesMenuBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const nextFocusedElement = event.relatedTarget as Node | null;
    if (
      !nextFocusedElement ||
      !event.currentTarget.contains(nextFocusedElement)
    ) {
      setIsServicesMenuOpen(false);
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* Promo Banner */}
      {showPromo && (
        <div className="w-full bg-primary text-white">
          <div className="container mx-auto max-w-7xl px-4 flex items-center justify-between py-1.5 text-xs font-medium">
            <div className="flex-1 flex items-center justify-center gap-1.5 text-center leading-snug">
              <Sparkles className="h-3 w-3 shrink-0 hidden sm:block" />
              <span>
                Limited offer: Get a{" "}
                <Link
                  href="/contact"
                  className="underline underline-offset-2 font-bold hover:opacity-80"
                >
                  free website audit
                </Link>{" "}
                + 10% off your first project. Book now!
              </span>
            </div>
            <button
              onClick={() => setShowPromo(false)}
              aria-label="Close promotion"
              className="ml-3 shrink-0 opacity-80 hover:opacity-100 transition-opacity"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      <header className="w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-12 max-w-7xl items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <Image
              src="/logo.png"
              alt="Code Heaven Studio Logo"
              width={28}
              height={28}
              priority
              className="transition-transform duration-200 group-hover:scale-110"
            />
            <span className="font-semibold tracking-tight text-sm">
              Code Heaven Studio
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) =>
              item.label === "Services" ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setIsServicesMenuOpen(true)}
                  onMouseLeave={() => setIsServicesMenuOpen(false)}
                  onFocusCapture={() => setIsServicesMenuOpen(true)}
                  onBlurCapture={handleServicesMenuBlur}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsServicesMenuOpen(false)}
                    className="group relative flex items-center gap-1 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        isServicesMenuOpen && "rotate-180",
                      )}
                    />
                  </Link>

                  <div
                    className={cn(
                      "absolute left-1/2 top-full z-50 w-[min(94vw,56rem)] -translate-x-1/2 pt-3 transition-all duration-200",
                      isServicesMenuOpen
                        ? "visible opacity-100"
                        : "pointer-events-none invisible opacity-0",
                    )}
                  >
                    <div className="overflow-hidden rounded-2xl border border-border bg-card/95 text-card-foreground shadow-xl backdrop-blur-md">
                      <div className="flex items-center justify-between border-b border-border px-5 py-3.5 md:px-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          Our Services
                        </p>
                        <Link
                          href="/services"
                          onClick={() => setIsServicesMenuOpen(false)}
                          className="text-sm font-medium text-primary transition-colors hover:opacity-80"
                        >
                          View all
                        </Link>
                      </div>

                      <div>
                        {servicesDropdownRows.map((row, rowIndex) => (
                          <div
                            key={row.map((service) => service.title).join("-")}
                            className={cn(
                              "grid grid-cols-1 md:grid-cols-2",
                              rowIndex !== servicesDropdownRows.length - 1 &&
                                "border-b border-border",
                            )}
                          >
                            {row.map((service, colIndex) => {
                              const ServiceIcon = service.icon;
                              return (
                                <Link
                                  key={service.title}
                                  href={service.href}
                                  onClick={() => setIsServicesMenuOpen(false)}
                                  className={cn(
                                    "group flex items-start gap-3.5 px-5 py-4 transition-colors hover:bg-muted/45 md:px-6",
                                    service.highlight &&
                                      "bg-primary/[0.06] hover:bg-primary/[0.12]",
                                    colIndex === 0 &&
                                      "md:border-r md:border-border",
                                  )}
                                >
                                  <span
                                    className={cn(
                                      "mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary",
                                      service.highlight && "bg-primary/15",
                                    )}
                                  >
                                    <ServiceIcon className="h-5 w-5" />
                                  </span>
                                  <span className="min-w-0">
                                    <span
                                      className={cn(
                                        "block text-base font-semibold leading-tight tracking-tight text-foreground",
                                        service.highlight && "text-primary",
                                      )}
                                    >
                                      {service.title}
                                    </span>
                                    <span className="mt-1 block text-sm leading-snug text-muted-foreground">
                                      {service.description}
                                    </span>
                                    {service.features?.length ? (
                                      <span className="mt-2 flex flex-wrap gap-1.5">
                                        {service.features.map((feature) => (
                                          <span
                                            key={feature}
                                            className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[11px] font-medium text-primary"
                                          >
                                            {feature}
                                          </span>
                                        ))}
                                      </span>
                                    ) : null}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col gap-2 border-t border-border bg-muted/30 px-5 py-3.5 md:flex-row md:items-center md:justify-between md:px-6">
                        <p className="text-sm text-muted-foreground">
                          Not sure what you need?
                        </p>
                        <Link
                          href="/contact"
                          onClick={() => setIsServicesMenuOpen(false)}
                          className="text-sm font-semibold text-primary transition-colors hover:opacity-80"
                        >
                          Talk to us for free
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
                >
                  {item.label}
                </Link>
              ),
            )}
            <Link
              href="/contact"
              aria-label="Contact Us"
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <div className="flex items-center md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  aria-label="Open Menu"
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                  suppressHydrationWarning
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] p-0">
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigation links for mobile devices.
                </SheetDescription>
                <div className="flex flex-col h-full">
                  <div className="flex items-center p-4 border-b">
                    <Link
                      href="/"
                      className="flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <Image
                        src="/logo.png"
                        alt="Code Heaven Studio Logo"
                        width={28}
                        height={28}
                        priority
                      />
                      <span className="text-sm font-semibold">
                        Code Heaven Studio
                      </span>
                    </Link>
                  </div>
                  <nav className="flex flex-col gap-1 p-4 flex-1">
                    {navItems.map((item) => (
                      <SheetClose key={item.label} asChild>
                        <Link
                          href={item.href}
                          className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="p-4 border-t">
                    <div className="flex justify-center gap-1">
                      {socialLinks.map((social) => (
                        <SheetClose key={social.name} asChild>
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {social.icon}
                            <span className="sr-only">{social.name}</span>
                          </a>
                        </SheetClose>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </div>
  );
}
