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
  Menu,
  X,
  Linkedin,
  Facebook,
  Instagram,
  Globe,
  Sparkles,
  Mail,
} from "lucide-react";
import Image from "next/image";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/request-website", label: "Request Website" },
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
                <Link href="/contact" className="underline underline-offset-2 font-bold hover:opacity-80">
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
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
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
                      <span className="text-sm font-semibold">Code Heaven Studio</span>
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
