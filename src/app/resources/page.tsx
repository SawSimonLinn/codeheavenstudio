import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { resources } from "@/lib/resources-data";

const categoryColors: Record<string, string> = {
  Restaurants: "bg-orange-500/10 text-orange-500",
  Business: "bg-blue-500/10 text-blue-500",
  "Web Design": "bg-purple-500/10 text-purple-500",
};

export default function ResourcesPage() {
  const [featured, ...rest] = resources;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <span
            aria-hidden
            className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none text-[22vw] font-black leading-none text-muted/20 pr-4"
          >
            FREE
          </span>
          <div className="container mx-auto px-4 py-20 sm:py-32 relative z-10">
            <p className="text-primary font-semibold uppercase tracking-[0.25em] text-xs sm:text-sm mb-6">
              Free Resources
            </p>
            <div className="overflow-hidden">
              <h1 className="text-[13vw] sm:text-[10vw] lg:text-[8vw] font-black leading-[0.88] tracking-tighter uppercase">
                <span className="block text-foreground">Grow</span>
                <span
                  className="block"
                  style={{
                    WebkitTextStroke: "2px hsl(var(--foreground))",
                    color: "transparent",
                  }}
                >
                  Online
                </span>
              </h1>
            </div>
            <p className="mt-8 max-w-md text-muted-foreground text-base sm:text-lg leading-relaxed">
              Free guides, tips, and strategies to help your business thrive
              online. No fluff, just practical advice that works.
            </p>
          </div>
        </section>

        {/* Articles */}
        <section className="container mx-auto px-4 py-12 sm:py-20">
          {/* Featured */}
          <Link
            href={`/resources/${featured.slug}`}
            className="group relative block overflow-hidden rounded-2xl border border-border mb-6 sm:mb-8 hover:border-foreground/30 hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-primary/5 to-purple-500/5"
          >
            <div className="p-8 sm:p-12">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest px-3 py-1">
                  Featured
                </span>
                <span
                  className={`text-xs font-bold uppercase tracking-widest rounded-full px-3 py-1 ${
                    categoryColors[featured.category] ?? "bg-muted text-muted-foreground"
                  }`}
                >
                  {featured.category}
                </span>
                <span className="text-xs text-muted-foreground ml-auto">
                  {featured.date} · {featured.readTime}
                </span>
              </div>

              <div className="max-w-3xl">
                <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight mb-4">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl">
                  {featured.description}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-3">
                <span className="text-sm font-bold group-hover:text-primary transition-colors flex items-center gap-2">
                  Read the guide
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white transition-all duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </span>
              </div>
            </div>
          </Link>

          {/* Rest */}
          {rest.length > 0 && (
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((resource, i) => (
                <Link
                  key={resource.slug}
                  href={`/resources/${resource.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-card border border-border hover:border-foreground/30 hover:shadow-xl transition-all duration-500"
                >
                  {/* Gradient header */}
                  <div className="relative h-32 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                    <span
                      aria-hidden
                      className="text-6xl font-black text-foreground/10 leading-none select-none"
                    >
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
                  </div>

                  <div className="flex flex-col flex-1 p-5 sm:p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-widest rounded-full px-2.5 py-0.5 ${
                          categoryColors[resource.category] ?? "bg-muted text-muted-foreground"
                        }`}
                      >
                        {resource.category}
                      </span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {resource.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-black tracking-tight leading-snug line-clamp-2 mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                      {resource.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-sm font-bold group-hover:text-primary transition-colors">
                        Read guide
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white transition-all duration-300 group-hover:rotate-45">
                          <ArrowUpRight className="h-3 w-3" />
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Stats strip */}
        <section className="border-t border-border bg-primary text-white">
          <div className="container mx-auto px-4 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: `${resources.length}+`, label: "Free guides" },
              { value: "Always", label: "Updated" },
              { value: "0", label: "Cost to read" },
              { value: "100%", label: "Practical" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl sm:text-4xl font-black mb-1">{value}</p>
                <p className="text-sm text-white/70 uppercase tracking-widest">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-secondary text-secondary-foreground py-20 sm:py-28">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 mb-6">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-headline text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
              Want us to build it for you?
            </h2>
            <p className="text-secondary-foreground/70 text-lg max-w-xl mx-auto mb-10">
              Reading about great websites is a good start. Having one built by
              experts is even better.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-10 py-4 bg-gradient-to-r from-primary to-purple-500 text-white text-base font-semibold hover:opacity-90 transition-opacity"
            >
              Get a Free Quote <ArrowUpRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
