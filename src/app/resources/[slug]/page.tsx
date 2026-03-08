import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock, Tag } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { resources } from "@/lib/resources-data";

export async function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = resources.find((r) => r.slug === slug);
  if (!resource) return {};
  return {
    title: `${resource.title} | Code Heaven Studio`,
    description: resource.description,
  };
}

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="text-2xl sm:text-3xl font-black tracking-tight mt-10 mb-4"
        >
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-xl font-bold mt-8 mb-3">
          {line.replace("### ", "")}
        </h3>
      );
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p key={i} className="font-bold text-foreground mt-4 mb-2">
          {line.slice(2, -2)}
        </p>
      );
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="space-y-2 my-4 list-none">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-muted-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              <span dangerouslySetInnerHTML={{ __html: item.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline underline-offset-2 hover:opacity-80">$1</a>') }} />
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (line === "---") {
      elements.push(<hr key={i} className="my-8 border-border" />);
    } else if (line.trim() === "") {
      // skip blank lines
    } else {
      // Regular paragraph — handle inline links
      const html = line
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline underline-offset-2 hover:opacity-80">$1</a>')
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/\*([^*]+)\*/g, "<em>$1</em>");
      elements.push(
        <p
          key={i}
          className="text-muted-foreground leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }
    i++;
  }

  return elements;
}

const categoryColors: Record<string, string> = {
  Restaurants: "bg-orange-500/10 text-orange-500",
  Business: "bg-blue-500/10 text-blue-500",
  "Web Design": "bg-purple-500/10 text-purple-500",
};

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = resources.find((r) => r.slug === slug);
  if (!resource) notFound();

  const related = resources.filter((r) => r.slug !== slug).slice(0, 2);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        {/* Article hero */}
        <section className="border-b border-border py-12 sm:py-20">
          <div className="container mx-auto max-w-3xl px-4">
            <Link
              href="/resources"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Resources
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className={`text-xs font-bold uppercase tracking-widest rounded-full px-3 py-1 flex items-center gap-1.5 ${
                  categoryColors[resource.category] ?? "bg-muted text-muted-foreground"
                }`}
              >
                <Tag className="h-3 w-3" />
                {resource.category}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                {resource.readTime}
              </span>
              <span className="text-xs text-muted-foreground">{resource.date}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-6">
              {resource.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {resource.description}
            </p>
          </div>
        </section>

        {/* Article body */}
        <section className="py-12 sm:py-20">
          <div className="container mx-auto max-w-3xl px-4 prose-custom">
            {renderMarkdown(resource.content)}
          </div>
        </section>

        {/* CTA inline */}
        <section className="border-t border-border bg-muted/40 py-12 sm:py-16">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-black mb-3">
              Want help putting this into practice?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              We build websites that implement every strategy in this guide, fast,
              professional, and built to generate real results.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3 bg-gradient-to-r from-primary to-purple-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Get a Free Quote <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="py-12 sm:py-20">
            <div className="container mx-auto max-w-3xl px-4">
              <h2 className="text-xl font-black mb-6">More Free Guides</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/resources/${r.slug}`}
                    className="group flex flex-col rounded-2xl border border-border bg-card p-5 hover:border-foreground/30 hover:shadow-lg transition-all duration-300"
                  >
                    <span
                      className={`text-[11px] font-bold uppercase tracking-widest rounded-full px-2.5 py-0.5 self-start mb-3 ${
                        categoryColors[r.category] ?? "bg-muted text-muted-foreground"
                      }`}
                    >
                      {r.category}
                    </span>
                    <h3 className="font-black leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                      {r.description}
                    </p>
                    <span className="mt-3 text-sm font-bold flex items-center gap-1.5 group-hover:text-primary transition-colors">
                      Read guide <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
