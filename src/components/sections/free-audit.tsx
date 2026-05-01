import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const auditPoints = [
  "Performance and load speed analysis",
  "SEO and search visibility check",
  "Mobile responsiveness review",
  "Design and conversion feedback",
];

export default function FreeAuditSection() {
  return (
    <section className="bg-muted/50 py-20 sm:py-28">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-4">
              Free Website Audit
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Not sure if your current site is holding you back? We will review your website and send you a personalized report covering speed, SEO, design, and mobile experience. No cost, no obligation.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {auditPoints.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary inline-block shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="shrink-0">
            <Button
              size="lg"
              asChild
              className="rounded-full px-10 py-6 text-base bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity"
            >
              <Link href="/free-audit">
                Get My Free Audit <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
