import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Linkedin, Facebook, Instagram, Globe } from "lucide-react";
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

            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/services" className="hover:text-primary">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-primary">
                  Templates
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
              <li>
                <Link href="/case-studies" className="hover:text-primary">
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/industries" className="hover:text-primary">
                  Industries
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary">
                  Blog
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
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <Link href="/admin/login" style={{ cursor: "text" }}>
            © {new Date().getFullYear()} Code Heaven Studio. All rights reserved.
          </Link>
        </div>
      </div>
    </footer>
  );
}
