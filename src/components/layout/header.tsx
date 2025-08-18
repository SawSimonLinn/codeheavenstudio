"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
  Github,
  Linkedin,
  Facebook,
  Instagram,
  Globe,
} from "lucide-react";
import Image from "next/image";

const navItems = [
  { href: "/#previous-work", label: "Previous Work" },
  { href: "/#ai-features", label: "AI Features" },
  { href: "/#process", label: "Process" },
  { href: "/#why-us", label: "Why Us" },
  { href: "/blog", label: "Blog" },
];

const socialLinks = [
  { href: "#", icon: <Linkedin className="h-5 w-5" />, name: "LinkedIn" },
  { href: "#", icon: <Facebook className="h-5 w-5" />, name: "Facebook" },
  { href: "#", icon: <Instagram className="h-5 w-5" />, name: "Instagram" },
  { href: "#", icon: <Github className="h-5 w-5" />, name: "GitHub" },
  { href: "#", icon: <Globe className="h-5 w-5" />, name: "Portfolio" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          {/* <Logo className="h-8 w-8 text-primary" />
           */}
          <Image
            src="/logo.png" // path relative to /public
            alt="Code Heaven Studio Logo"
            width={32} // adjust size
            height={32}
            priority // preloads for faster render
          />

          <span className="hidden font-bold sm:inline-block">
            Code Heaven Studio
          </span>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <Button key={item.label} variant="ghost" asChild>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </nav>
        <div className="flex items-center md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] p-0">
              <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Navigation links for mobile devices.
              </SheetDescription>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <Link
                    href="/"
                    className="flex items-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <Image
                      src="/logo.png" // path relative to /public
                      alt="Code Heaven Studio Logo"
                      width={32} // adjust size
                      height={32}
                      priority // preloads for faster render
                    />
                  </Link>
                </div>
                <nav className="flex flex-col gap-4 p-4 flex-1">
                  {navItems.map((item) => (
                    <SheetClose key={item.label} asChild>
                      <Link
                        href={item.href}
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Button asChild className="mt-4">
                      <Link href="/contact">Contact Us</Link>
                    </Button>
                  </SheetClose>
                </nav>
                <div className="p-4 border-t">
                  <div className="flex justify-center gap-2">
                    {socialLinks.map((social) => (
                      <SheetClose key={social.name} asChild>
                        <Button variant="ghost" size="icon" asChild>
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {social.icon}
                            <span className="sr-only">{social.name}</span>
                          </a>
                        </Button>
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
  );
}
