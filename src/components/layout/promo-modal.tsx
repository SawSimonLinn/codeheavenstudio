"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

const STORAGE_KEY = "chs_promo_dismissed";

export default function PromoModal() {
  const [open, setOpen] = useState(false);
  const [neverShow, setNeverShow] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "true") return;
    // Show after 10-20 seconds so the user has time to browse first
    const delay = Math.floor(Math.random() * 10_000) + 10_000;
    const t = setTimeout(() => setOpen(true), delay);
    return () => clearTimeout(t);
  }, []);

  function close() {
    if (neverShow) localStorage.setItem(STORAGE_KEY, "true");
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={close}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        {/* Gradient top bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-primary via-blue-500 to-purple-500" />

        {/* Body */}
        <div className="bg-background px-8 pb-8 pt-7">
          {/* Close */}
          <button
            onClick={close}
            aria-label="Close promotion"
            className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-4">
            <Sparkles className="h-3 w-3" />
            Limited Time Offer
          </span>

          {/* Headline */}
          <h2
            id="promo-title"
            className="text-2xl font-bold tracking-tight leading-tight mb-2"
          >
            Get a{" "}
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Free Website Audit
            </span>{" "}
            + 10% Off Your First Project
          </h2>

          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Not sure where your website is losing visitors? We'll audit it for
            free and apply 10% off when you book your first project with us.
          </p>

          {/* Perks */}
          <ul className="space-y-2 mb-7">
            {[
              "Full SEO & performance report",
              "Personalised recommendations",
              "No strings attached",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href="/free-audit"
            onClick={close}
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-primary to-blue-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] transition-all duration-200"
          >
            Book My Free Audit
            <ArrowRight className="h-4 w-4" />
          </Link>

          {/* Don't show again */}
          <label className="mt-4 flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={neverShow}
              onChange={(e) => setNeverShow(e.target.checked)}
              className="h-3.5 w-3.5 accent-primary cursor-pointer"
            />
            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors select-none">
              Don't show this again
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
