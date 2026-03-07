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
} from "lucide-react";
import Image from "next/image";

const navItems = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About Us" },
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
    href: "https://www.instagram.com/sawsimonlinn",
    icon: <Instagram className="h-5 w-5" />,
    name: "Instagram",
  },
  {
    href: "https://www.sawsimonlinn.com/",
    icon: <Globe className="h-5 w-5" />,
    name: "Portfolio",
  },
];

/**
 * Renders the site header with an optional dismissible promotional banner, desktop navigation, and a mobile drawer menu.
 *
 * The component displays a top promo bar that can be closed by the user, a sticky header with logo and brand name, a desktop navigation row with links and a "Contact Us" button, and a mobile Sheet-based menu that mirrors the navigation and exposes social links. Internal state manages promo visibility and the mobile Sheet open state.
 *
 * @returns The header element containing the promo banner (when visible), site logo, navigation links, contact button, and a mobile drawer with navigation and social links.
 */
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPromo, setShowPromo] = useState(true);

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* Promo Banner */}
      {showPromo && (
        <div className="w-full bg-gradient-to-r from-primary via-blue-500 to-purple-500 text-white">
          <div className="container mx-auto max-w-7xl px-4 flex items-center justify-between h-8 text-xs font-medium">
            <div className="flex-1 flex items-center justify-center gap-2">
              <Sparkles className="h-3 w-3 shrink-0" />
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
            <span className="hidden font-semibold tracking-tight text-sm sm:inline-block">
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
              className="rounded-full bg-gradient-to-r from-primary to-purple-500 px-5 py-1.5 text-xs font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Contact Us
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
                    <SheetClose asChild>
                      <Link
                        href="/contact"
                        className="mt-3 rounded-full bg-gradient-to-r from-primary to-purple-500 px-5 py-2 text-sm font-semibold text-white text-center hover:opacity-90 transition-opacity"
                      >
                        Contact Us
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
