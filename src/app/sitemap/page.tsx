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
      { label: "Founder: Saw Simon Linn", href: "/founder/saw-simon-linn" },
      { label: "Founder: Mia Truong", href: "/founder/mia-truong" },
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
    title: "Services",
    links: [
      { label: "All Services", href: "/services" },
      { label: "Restaurant Websites", href: "/services/restaurant-websites" },
      { label: "Small Business Websites", href: "/services/small-business-websites" },
      { label: "Website Redesign", href: "/services/website-redesign" },
      { label: "SEO Optimization", href: "/services/seo-optimization" },
      { label: "Website Maintenance", href: "/services/website-maintenance" },
      { label: "Logo Design & Business Kit", href: "/services/logo-design-business-kit" },
      { label: "Content Writing", href: "/services/content-writing" },
      { label: "Fullstack Internal Websites", href: "/services/fullstack-internal-websites" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Industries", href: "/industries" },
      { label: "Pricing", href: "/codeheavenpricing" },
      { label: "FAQ", href: "/faq" },
      { label: "Projects", href: "/projects" },
      { label: "Why Choose Us", href: "/why-choose-us" },
      { label: "Free Audit", href: "/free-audit" },
      { label: "Request a Website", href: "/request-website" },
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
