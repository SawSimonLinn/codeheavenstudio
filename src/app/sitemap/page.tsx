import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Link from "next/link";

export const metadata = {
  title: "Sitemap | Code Heaven Studio",
  description: "A complete overview of all pages on Code Heaven Studio.",
};

const sitemapSections = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact" },
      { label: "Referral Partner Program", href: "/referral" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Templates", href: "/templates" },
      { label: "Free Resources", href: "/resources" },
      { label: "How It Works", href: "/how-it-works" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Services", href: "/services" },
      { label: "Industries", href: "/industries" },
      { label: "Pricing", href: "/codeheavenpricing" },
      { label: "FAQ", href: "/faq" },
      { label: "Projects", href: "/projects" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-and-conditions" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                Sitemap
              </h1>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                A complete overview of all pages on Code Heaven Studio.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {sitemapSections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-lg font-semibold text-foreground mb-4 border-b border-border pb-2">
                    {section.title}
                  </h2>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-muted-foreground hover:text-primary transition-colors text-sm"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
