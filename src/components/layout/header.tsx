"use client";

import React, { useState, useRef, useEffect } from "react";
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
  Menu,
  X,
  Linkedin,
  Facebook,
  Instagram,
  Globe,
  Sparkles,
  ChevronDown,
  Utensils,
  Monitor,
  RefreshCw,
  Search,
  Wrench,
  Palette,
  PenLine,
} from "lucide-react";
import Image from "next/image";

const services = [
  {
    href: "/services/restaurant-websites",
    label: "Restaurant Websites",
    desc: "Menus, reservations and more",
    icon: Utensils,
  },
  {
    href: "/services/small-business-websites",
    label: "Small Business Websites",
    desc: "Fast, custom sites built to convert",
    icon: Monitor,
  },
  {
    href: "/services/website-redesign",
    label: "Website Redesign",
    desc: "Modernise and improve your existing site",
    icon: RefreshCw,
  },
  {
    href: "/services/seo-optimization",
    label: "SEO Optimization",
    desc: "Rank higher and get found on Google",
    icon: Search,
  },
  {
    href: "/services/website-maintenance",
    label: "Website Maintenance",
    desc: "Keep your site secure and up to date",
    icon: Wrench,
  },
  {
    href: "/services/logo-design-business-kit",
    label: "Logo Design & Business Kit",
    desc: "Logo, icons, letterhead and business card",
    icon: Palette,
  },
  {
    href: "/services/content-writing",
    label: "Content Writing",
    desc: "Copy that connects and converts",
    icon: PenLine,
  },
];

const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/codeheavenpricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
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
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* Promo Banner */}
      {showPromo && (
        <div className="w-full bg-gradient-to-r from-primary via-blue-500 to-purple-500 text-white">
          <div className="container mx-auto max-w-7xl px-4 flex items-center justify-between py-1.5 text-xs font-medium">
            <div className="flex-1 flex items-center justify-center gap-1.5 text-center leading-snug">
              <Sparkles className="h-3 w-3 shrink-0 hidden sm:block" />
              <span>
                Limited offer: Get a{" "}
                <Link href="/free-audit" className="underline underline-offset-2 font-bold hover:opacity-80">
                  free website audit
                </Link>{" "}
                + 10% off your first project.{" "}
                <Link href="/free-audit" className="underline underline-offset-2 font-bold hover:opacity-80">
                  Book now!
                </Link>
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
        <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
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
          <nav className="hidden items-center gap-6 md:flex">
            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setServicesOpen((prev) => !prev)}
                aria-expanded={servicesOpen}
                aria-controls="services-menu"
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Services
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                />
              </button>
              {servicesOpen && (
                <div
                  id="services-menu"
                  role="menu"
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[580px] rounded-2xl border border-border bg-background shadow-2xl z-50 overflow-hidden"
                >
                  {/* Header strip */}
                  <div className="px-5 py-3 border-b border-border bg-muted/40 flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Our Services
                    </p>
                    <Link
                      href="/services"
                      onClick={() => setServicesOpen(false)}
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      View all
                    </Link>
                  </div>
                  {/* 2-column grid */}
                  <div className="grid grid-cols-2 gap-px bg-border">
                    {services.map((s) => {
                      const Icon = s.icon;
                      return (
                        <Link
                          key={s.href}
                          href={s.href}
                          onClick={() => setServicesOpen(false)}
                          className="group flex items-start gap-3 px-5 py-4 bg-background hover:bg-muted/60 transition-colors"
                        >
                          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <Icon className="h-4 w-4 text-primary" />
                          </span>
                          <span>
                            <span className="block text-sm font-medium text-foreground leading-tight">
                              {s.label}
                            </span>
                            <span className="block text-xs text-muted-foreground mt-0.5 leading-snug">
                              {s.desc}
                            </span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                  {/* Footer CTA */}
                  <div className="px-5 py-3 border-t border-border bg-gradient-to-r from-primary/5 to-purple-500/5 flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Not sure what you need?
                    </p>
                    <Link
                      href="/contact"
                      onClick={() => setServicesOpen(false)}
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      Talk to us for free
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Regular nav links */}
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}

            {/* CTA Button */}
            <Link
              href="/request-website"
              className="rounded-lg bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors duration-200"
            >
              Request Website
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <div className="flex items-center md:hidden">
            <Sheet open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) setMobileServicesOpen(false); }}>
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
                      <span className="text-sm font-semibold">Code Heaven Studio</span>
                    </Link>
                  </div>

                  <nav className="flex flex-col gap-1 p-4 flex-1">
                    {/* Mobile Services Accordion */}
                    <div>
                      <button
                        onClick={() => setMobileServicesOpen((prev) => !prev)}
                        aria-expanded={mobileServicesOpen}
                        aria-controls="mobile-services-menu"
                        className="flex w-full items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      >
                        Services
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {mobileServicesOpen && (
                        <div id="mobile-services-menu" role="menu" className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-border pl-3">
                          {services.map((s) => (
                            <SheetClose key={s.href} asChild>
                              <Link
                                href={s.href}
                                onClick={() => setIsOpen(false)}
                                className="py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                              >
                                {s.label}
                              </Link>
                            </SheetClose>
                          ))}
                        </div>
                      )}
                    </div>

                    {navLinks.map((item) => (
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

                    {/* Mobile CTA */}
                    <SheetClose asChild>
                      <Link
                        href="/request-website"
                        onClick={() => setIsOpen(false)}
                        className="mt-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground text-center hover:bg-primary/90 transition-colors"
                      >
                        Request Website
                      </Link>
                    </SheetClose>
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
