import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Download, Mail, Globe, ImageIcon, FileText, Palette, MapPin } from "lucide-react";
import Link from "next/link";

const brandColors = [
  { name: "Primary Blue", hex: "#3B82F6", var: "--primary" },
  { name: "Deep Purple", hex: "#8B5CF6", var: "--purple" },
  { name: "Background", hex: "#0A0A0A", var: "--background" },
  { name: "Surface", hex: "#111111", var: "--secondary" },
];

const companyFacts = [
  { label: "Founded", value: "2023" },
  { label: "Location", value: "United States" },
  { label: "Specialization", value: "Web Design & Development" },
  { label: "Focus", value: "Restaurants & Small Businesses" },
  { label: "Technology", value: "Next.js, React, TypeScript" },
  { label: "Pricing Model", value: "One-time flat-rate, no retainers" },
];

const assets = [
  {
    icon: ImageIcon,
    title: "Logo Package",
    description:
      "Primary logo in PNG and SVG formats. Light and dark variants included.",
    action: "Download Logos",
  },
  {
    icon: Palette,
    title: "Brand Guidelines",
    description:
      "Color palette, typography, and usage rules for representing Code Heaven Studio accurately.",
    action: "Download Brand Guide",
  },
  {
    icon: FileText,
    title: "Company Fact Sheet",
    description:
      "One-page summary of our company, mission, services, and key statistics.",
    action: "Download Fact Sheet",
  },
];

export default function PressPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-secondary text-secondary-foreground py-20 sm:py-32">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              Press & Media
            </p>
            <h1 className="font-headline text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
              Media Kit &{" "}
              <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Press Resources
              </span>
            </h1>
            <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto mb-10">
              Everything journalists, partners, and collaborators need to write
              about or feature Code Heaven Studio.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
            >
              <a href="mailto:codeheavenstudio@gmail.com" className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> Press Inquiries
              </a>
            </Button>
          </div>
        </section>

        {/* About the Company */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight mb-6">
              About Code Heaven Studio
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Code Heaven Studio is a web design and development agency focused
              on helping restaurants, local businesses, and startups establish a
              professional online presence. We build fast, mobile-friendly
              websites that look great and drive real results, with no monthly
              retainers, no hidden fees, and a free demo before any commitment.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Our work is grounded in modern technology (Next.js, React, and
              TypeScript) combined with a deep understanding of what small
              business owners actually need: a website that builds trust,
              attracts customers, and is easy to manage.
            </p>

            {/* Company Facts */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {companyFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-xl border bg-card p-4"
                >
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    {fact.label}
                  </p>
                  <p className="font-semibold text-sm">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founders */}
        <section className="py-20 sm:py-28 bg-muted/20">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Our Founders
            </h2>
            <p className="text-muted-foreground mb-10">
              Code Heaven Studio was founded by Saw Simon Linn and Mia Truong, based in Los Angeles and San Diego, California.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  name: "Saw Simon Linn",
                  role: "Co-Founder & Software Engineer",
                  location: "Los Angeles, CA",
                  avatar: "/avatars/simon.jpg",
                  hint: "male developer",
                  initials: "SS",
                  page: "/founder/saw-simon-linn",
                  linkedin: "https://www.linkedin.com/in/sawsimonlinn/",
                  bio: "Saw Simon Linn leads product development at Code Heaven Studio, building modern, SEO-optimized websites for restaurants and small businesses.",
                },
                {
                  name: "Mia Truong",
                  role: "Co-Founder",
                  location: "San Diego, CA",
                  avatar: "/avatars/mia.jpg",
                  hint: "female developer",
                  initials: "MT",
                  page: "/founder/mia-truong",
                  linkedin: "https://www.linkedin.com/in/trangmtruong/",
                  bio: "Mia Truong focuses on business development, partnerships, and client success at Code Heaven Studio.",
                },
              ].map((founder) => (
                <div key={founder.name} className="rounded-2xl border bg-card p-8 flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16 border-2 border-primary/20">
                      <AvatarImage src={founder.avatar} alt={founder.name} data-ai-hint={founder.hint} />
                      <AvatarFallback>{founder.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <Link href={founder.page} className="font-semibold text-lg hover:text-primary transition-colors">
                        {founder.name}
                      </Link>
                      <p className="text-sm text-primary">{founder.role}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <MapPin className="h-3 w-3" />
                        {founder.location}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{founder.bio}</p>
                  <div className="flex gap-3 mt-auto">
                    <Button asChild size="sm" variant="outline" className="rounded-full text-xs">
                      <Link href={founder.page}>Full Profile</Link>
                    </Button>
                    <Button asChild size="sm" variant="ghost" className="rounded-full text-xs">
                      <a href={founder.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Assets */}
        <section className="bg-muted/40 py-20 sm:py-28">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight text-center mb-4">
              Brand Assets
            </h2>
            <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
              Use these assets when featuring Code Heaven Studio in articles,
              partnerships, or media coverage. Please do not alter or distort
              the logo.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {assets.map((asset) => {
                const Icon = asset.icon;
                return (
                  <div
                    key={asset.title}
                    className="rounded-2xl border bg-card p-8 shadow-sm flex flex-col"
                  >
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{asset.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                      {asset.description}
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-full w-fit"
                      onClick={undefined}
                    >
                      <a
                        href="mailto:codeheavenstudio@gmail.com"
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" /> {asset.action}
                      </a>
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Brand Colors */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="font-headline text-3xl font-bold tracking-tight mb-4">
              Brand Colors
            </h2>
            <p className="text-muted-foreground mb-10">
              When referencing Code Heaven Studio visually, please use our
              official brand palette.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {brandColors.map((color) => (
                <div key={color.name} className="rounded-xl overflow-hidden border">
                  <div
                    className="h-20 w-full"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="p-3 bg-card">
                    <p className="font-semibold text-sm">{color.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {color.hex}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Press Contact CTA */}
        <section className="bg-secondary text-secondary-foreground py-20 sm:py-28">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <h2 className="font-headline text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
              Working on a story?
            </h2>
            <p className="text-secondary-foreground/70 text-lg max-w-xl mx-auto mb-10">
              We&apos;re happy to provide quotes, interviews, or additional
              information for press coverage. Reach out and we&apos;ll get back
              to you promptly.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
              >
                <a href="mailto:codeheavenstudio@gmail.com" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Contact Press Team
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8 bg-transparent border-white/40 text-white hover:bg-white/10 hover:border-white/60"
              >
                <Link href="/" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" /> Visit Our Website
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
