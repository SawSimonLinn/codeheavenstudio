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
  Layers,
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
  {
    href: "/services/fullstack-internal-websites",
    label: "Fullstack Internal Systems",
    desc: "Order systems, dashboards & internal tools",
    icon: Layers,
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
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Sliding pill indicator state
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navItemRefs = useRef<(HTMLElement | null)[]>([]);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleNavHover(index: number) {
    const el = navItemRefs.current[index];
    const container = navContainerRef.current;
    if (el && container) {
      const elRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setPillStyle({
        left: elRect.left - containerRect.left,
        width: elRect.width,
        opacity: 1,
      });
    }
  }

  function handleNavLeave() {
    setPillStyle((prev) => ({ ...prev, opacity: 0 }));
  }

  return (
    <div className={`sticky top-0 z-50 w-full pointer-events-none transition-transform duration-300 ${hidden ? "-translate-y-full" : "translate-y-0"}`}>
      {/* ── Three-Island Desktop Topbar ── */}
      <header className="w-full bg-transparent">
        <div className="container mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">

          {/* Island 1 — Logo */}
          <Link
            href="/"
            className="pointer-events-auto group flex items-center gap-2.5 px-4 py-2 rounded-2xl
                       bg-white/10 dark:bg-white/5 backdrop-blur-2xl
                       border border-white/20 dark:border-white/10
                       shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]
                       hover:bg-white/20 dark:hover:bg-white/10 hover:border-white/30 transition-all duration-200"
          >
            <Image
              src="/logo.png"
              alt="Code Heaven Studio Logo"
              width={24}
              height={24}
              priority
              className="transition-transform duration-200 group-hover:scale-110"
            />
            <span className="font-semibold tracking-tight text-sm">
              Code Heaven Studio
            </span>
          </Link>

          {/* Island 2 — Nav Links (desktop only) */}
          <div
            className="pointer-events-auto hidden md:block relative"
            ref={dropdownRef}
          >
            {/* Pill container */}
            <div
              ref={navContainerRef}
              onMouseLeave={handleNavLeave}
              className="relative flex items-center gap-0.5 px-2 py-2 rounded-2xl
                         bg-white/10 dark:bg-white/5 backdrop-blur-2xl
                         border border-white/20 dark:border-white/10
                         shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
            >
              {/* Sliding background pill */}
              <div
                className="absolute top-2 bottom-2 rounded-xl bg-muted/90 pointer-events-none
                           transition-[left,width,opacity] duration-200 ease-out"
                style={{
                  left: pillStyle.left,
                  width: pillStyle.width,
                  opacity: pillStyle.opacity,
                }}
              />

              {/* Services button */}
              <button
                ref={(el) => {
                  navItemRefs.current[0] = el;
                }}
                onMouseEnter={() => handleNavHover(0)}
                onClick={() => setServicesOpen((prev) => !prev)}
                aria-expanded={servicesOpen}
                aria-controls="services-menu"
                className="relative z-10 flex items-center gap-1 px-3 py-1.5 text-sm
                           text-muted-foreground hover:text-foreground transition-colors duration-150 rounded-xl"
              >
                Services
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Regular nav links */}
              {navLinks.map((item, i) => (
                <Link
                  key={item.label}
                  href={item.href}
                  ref={(el) => {
                    navItemRefs.current[i + 1] = el;
                  }}
                  onMouseEnter={() => handleNavHover(i + 1)}
                  className="relative z-10 px-3 py-1.5 text-sm text-muted-foreground
                             hover:text-foreground transition-colors duration-150 rounded-xl"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Services mega-dropdown */}
            {servicesOpen && (
              <div
                id="services-menu"
                role="menu"
                className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[580px]
                           rounded-2xl border border-border bg-background shadow-2xl z-50 overflow-hidden"
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
                {/* 2-col grid */}
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

          {/* Island 3 — CTA (desktop only) */}
          <Link
            href="/request-website"
            className="pointer-events-auto hidden md:flex items-center gap-2 px-5 py-2 rounded-2xl
                       bg-gradient-to-r from-primary to-blue-500 text-sm font-semibold text-white
                       shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.03]
                       backdrop-blur-2xl border border-white/20
                       transition-all duration-200"
          >
            Request Website
          </Link>

          {/* Mobile Hamburger */}
          <div className="pointer-events-auto flex items-center md:hidden">
            <Sheet
              open={isOpen}
              onOpenChange={(open) => {
                setIsOpen(open);
                if (!open) setMobileServicesOpen(false);
              }}
            >
              <SheetTrigger asChild>
                <button
                  aria-label="Open Menu"
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                  suppressHydrationWarning
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] p-0 overflow-hidden border-l border-border/50"
              >
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigation links for mobile devices.
                </SheetDescription>

                <div className="flex flex-col h-full bg-background">
                  {/* Header */}
                  <div className="relative overflow-hidden px-5 py-5 bg-gradient-to-br from-primary/10 via-blue-500/5 to-purple-500/10 border-b border-border/50">
                    <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
                    <Link
                      href="/"
                      className="flex items-center gap-2.5 relative z-10"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-background shadow-sm border border-border/50">
                        <Image
                          src="/logo.png"
                          alt="Code Heaven Studio Logo"
                          width={24}
                          height={24}
                          priority
                        />
                      </div>
                      <div>
                        <span className="block text-sm font-bold leading-tight">
                          Code Heaven Studio
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          Web Design Agency
                        </span>
                      </div>
                    </Link>
                  </div>

                  {/* Nav */}
                  <nav className="flex flex-col flex-1 overflow-y-auto px-4 py-4 gap-1">
                    {/* Services Accordion */}
                    <div>
                      <button
                        onClick={() =>
                          setMobileServicesOpen((prev) => !prev)
                        }
                        aria-expanded={mobileServicesOpen}
                        aria-controls="mobile-services-menu"
                        className="flex w-full items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-foreground hover:bg-muted/70 transition-colors group"
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Sparkles className="h-3.5 w-3.5" />
                          </span>
                          Services
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${
                            mobileServicesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {mobileServicesOpen && (
                        <div
                          id="mobile-services-menu"
                          role="menu"
                          className="mt-1 mb-1 flex flex-col gap-0.5 rounded-xl border border-border/50 bg-muted/30 p-2 overflow-hidden"
                        >
                          {services.map((s) => {
                            const Icon = s.icon;
                            return (
                              <SheetClose key={s.href} asChild>
                                <Link
                                  href={s.href}
                                  onClick={() => setIsOpen(false)}
                                  className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-background transition-colors group"
                                >
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-background border border-border/50 group-hover:border-primary/30 group-hover:bg-primary/5 transition-colors">
                                    <Icon className="h-3 w-3 text-primary" />
                                  </span>
                                  <span className="font-medium leading-tight">
                                    {s.label}
                                  </span>
                                </Link>
                              </SheetClose>
                            );
                          })}
                          <div className="mx-2 mt-1 pt-1 border-t border-border/50">
                            <SheetClose asChild>
                              <Link
                                href="/services"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-center gap-1 py-1.5 text-xs font-semibold text-primary hover:underline transition-colors"
                              >
                                View all services
                              </Link>
                            </SheetClose>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Nav Links */}
                    {navLinks.map((item) => (
                      <SheetClose key={item.label} asChild>
                        <Link
                          href={item.href}
                          className="px-3 py-2.5 rounded-xl text-sm font-semibold text-foreground hover:bg-muted/70 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}

                    <div className="my-2 border-t border-border/50" />

                    {/* CTA */}
                    <SheetClose asChild>
                      <Link
                        href="/request-website"
                        onClick={() => setIsOpen(false)}
                        className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-blue-500 px-3 py-2.5 text-sm font-bold text-white text-center shadow-md hover:opacity-90 transition-opacity"
                      >
                        <span className="relative z-10">Request Website</span>
                      </Link>
                    </SheetClose>

                    <SheetClose asChild>
                      <Link
                        href="/free-audit"
                        onClick={() => setIsOpen(false)}
                        className="rounded-xl border border-border/60 px-3 py-2.5 text-sm font-semibold text-foreground text-center hover:bg-muted/70 transition-colors"
                      >
                        Free Website Audit
                      </Link>
                    </SheetClose>
                  </nav>

                  {/* Footer */}
                  <div className="px-5 py-4 border-t border-border/50 bg-muted/20">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3 text-center">
                      Follow us
                    </p>
                    <div className="flex justify-center gap-2">
                      {socialLinks.map((social) => (
                        <SheetClose key={social.name} asChild>
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/50 bg-background text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors"
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
