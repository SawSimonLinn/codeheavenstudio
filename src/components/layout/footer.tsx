import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Facebook, Instagram, Globe } from "lucide-react";
import Image from "next/image";

const socialLinks = [
  { href: "#", icon: <Linkedin className="h-5 w-5" />, name: "LinkedIn" },
  { href: "#", icon: <Facebook className="h-5 w-5" />, name: "Facebook" },
  { href: "#", icon: <Instagram className="h-5 w-5" />, name: "Instagram" },
  { href: "#", icon: <Github className="h-5 w-5" />, name: "GitHub" },
  { href: "#", icon: <Globe className="h-5 w-5" />, name: "Portfolio" },
];

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex gap-4 text-sm md:w-1/3 justify-start">
            <Link
              href="/faq"
              className="text-muted-foreground hover:text-primary"
            >
              FAQ
            </Link>
            <Link
              href="/privacy-policy"
              className="text-muted-foreground hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="text-muted-foreground hover:text-primary"
            >
              Terms & Conditions
            </Link>
          </div>
          <div className="flex items-center gap-2 order-first md:order-none md:w-1/3 justify-center">
            <Image
              src="/logo.png" // path relative to /public
              alt="Code Heaven Studio Logo"
              width={20} // adjust size
              height={20}
              priority // preloads for faster render
            />

            <p className="text-sm font-semibold">Code Heaven Studio</p>
          </div>
          <div className="flex items-center gap-2 md:w-1/3 justify-end">
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
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Code Heaven Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
