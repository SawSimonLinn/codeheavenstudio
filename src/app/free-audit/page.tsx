"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  Globe,
  Briefcase,
  Mail,
  CheckCircle2,
  Zap,
  Search,
  Smartphone,
  BarChart2,
  ShieldCheck,
  Gauge,
} from "lucide-react";

const industries = [
  { value: "restaurant", label: "Restaurant / Food & Beverage" },
  { value: "retail", label: "Retail / E-commerce" },
  { value: "healthcare", label: "Healthcare / Wellness" },
  { value: "real-estate", label: "Real Estate" },
  { value: "construction", label: "Construction / Home Services" },
  { value: "beauty", label: "Beauty / Salon / Spa" },
  { value: "legal", label: "Legal / Law Firm" },
  { value: "education", label: "Education / Coaching" },
  { value: "nonprofit", label: "Non-Profit / Community" },
  { value: "other", label: "Other" },
];

const auditItems = [
  {
    icon: Search,
    title: "SEO Health Check",
    description: "We review your meta tags, keywords, and search visibility.",
  },
  {
    icon: Smartphone,
    title: "Mobile Responsiveness",
    description: "Does your site look great on every screen size?",
  },
  {
    icon: Gauge,
    title: "Page Speed Analysis",
    description: "Slow sites lose customers. We flag what's slowing you down.",
  },
  {
    icon: BarChart2,
    title: "Conversion Review",
    description: "Are your CTAs, forms, and layout driving leads?",
  },
  {
    icon: ShieldCheck,
    title: "Security & Trust Signals",
    description: "SSL, trust badges, and credibility factors reviewed.",
  },
  {
    icon: Zap,
    title: "Quick Wins Report",
    description: "Actionable fixes you can implement right away.",
  },
];

const formSchema = z.object({
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters."),
  websiteUrl: z
    .string()
    .min(4, "Please enter your website URL.")
    .url("Please enter a valid URL (e.g. https://yoursite.com)."),
  industry: z.string().min(1, "Please select your industry."),
  email: z.string().email("Please enter a valid email address."),
  goals: z
    .string()
    .min(10, "Please tell us what you'd like to improve (at least 10 chars)."),
});

export default function FreeAuditPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      websiteUrl: "",
      industry: "",
      email: "",
      goals: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    try {
      const payload = {
        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
        subject: "Free Website Audit Request",
        "Business Name": values.businessName,
        "Website URL": values.websiteUrl,
        Industry:
          industries.find((i) => i.value === values.industry)?.label ??
          values.industry,
        email: values.email,
        "Goals / What to Improve": values.goals,
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        form.reset();
      } else {
        throw new Error(data.message ?? "Submission failed. Please try again.");
      }
    } catch (err) {
      console.error("Audit form error:", err);
      alert(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="relative w-full py-24 sm:py-32 overflow-hidden bg-background">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-3xl" />

          <div className="relative container mx-auto max-w-7xl px-4">
            {/* Header */}
            <div className="mx-auto max-w-2xl text-center mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-6">
                <Zap className="h-3.5 w-3.5" />
                100% Free - No Strings Attached
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-5">
                Get Your Free{" "}
                <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Website Audit
                </span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We&apos;ll review your existing website and send you a personalized
                report covering SEO, speed, mobile, and conversion. No cost,
                no commitment.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8 items-start">
              {/* Form */}
              <div className="lg:col-span-3">
                <div className="relative rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm shadow-2xl overflow-hidden">
                  <div className="h-1 w-full bg-gradient-to-r from-primary via-blue-400 to-purple-500" />

                  <div className="p-8 sm:p-10">
                    {submitted ? (
                      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 border border-green-500/30">
                          <CheckCircle2 className="h-8 w-8 text-green-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-foreground">
                          Audit Request Received!
                        </h2>
                        <p className="text-muted-foreground max-w-sm">
                          Thanks! We&apos;ll review your website and send your
                          personalized audit report within 48 hours.
                        </p>
                        <Button
                          variant="outline"
                          className="mt-4 rounded-full"
                          onClick={() => setSubmitted(false)}
                        >
                          Submit Another Website
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="mb-8">
                          <h2 className="text-2xl font-bold text-foreground mb-1">
                            Tell us about your website
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Takes 2 minutes. We&apos;ll do all the analysis.
                          </p>
                        </div>

                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-5"
                          >
                            {/* Business Name */}
                            <FormField
                              control={form.control}
                              name="businessName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-foreground/80">
                                    Business Name
                                  </FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                      <Input
                                        placeholder="e.g. Golden Dragon Restaurant"
                                        className="pl-10 bg-background/50 border-border/60 focus:border-primary/60"
                                        {...field}
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* Website URL */}
                            <FormField
                              control={form.control}
                              name="websiteUrl"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-foreground/80">
                                    Website URL
                                  </FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                      <Input
                                        placeholder="https://yourwebsite.com"
                                        className="pl-10 bg-background/50 border-border/60 focus:border-primary/60"
                                        {...field}
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* Industry */}
                            <FormField
                              control={form.control}
                              name="industry"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-foreground/80">
                                    Industry
                                  </FormLabel>
                                  <div className="relative">
                                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
                                    <Select
                                      onValueChange={field.onChange}
                                      value={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger className="pl-10 bg-background/50 border-border/60 focus:border-primary/60">
                                          <SelectValue placeholder="Select your industry..." />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {industries.map((i) => (
                                          <SelectItem
                                            key={i.value}
                                            value={i.value}
                                          >
                                            {i.label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* Email */}
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-foreground/80">
                                    Your Email
                                  </FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                      <Input
                                        type="email"
                                        placeholder="you@yourbusiness.com"
                                        className="pl-10 bg-background/50 border-border/60 focus:border-primary/60"
                                        {...field}
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* Goals */}
                            <FormField
                              control={form.control}
                              name="goals"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-foreground/80">
                                    What would you like to improve?
                                  </FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="e.g. More leads from Google, better mobile experience, faster load time..."
                                      className="min-h-[100px] bg-background/50 border-border/60 focus:border-primary/60 resize-none"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <Button
                              type="submit"
                              disabled={submitting}
                              className="w-full rounded-full font-semibold h-12 text-base"
                            >
                              {submitting
                                ? "Submitting..."
                                : "Get My Free Audit →"}
                            </Button>

                            <p className="text-center text-xs text-muted-foreground">
                              We&apos;ll never spam you. Your report arrives within 48
                              hours.
                            </p>
                          </form>
                        </Form>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar - what's included */}
              <div className="lg:col-span-2 flex flex-col gap-5">
                <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    What&apos;s included in your audit
                  </h3>
                  <ul className="space-y-4">
                    {auditItems.map(({ icon: Icon, title, description }) => (
                      <li key={title} className="flex gap-3">
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6">
                  <p className="text-sm font-semibold text-green-400 mb-1">
                    Completely Free
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    This audit is a gift - no invoice, no upsell pressure. We do
                    this because great websites help businesses grow, and we love
                    seeing that happen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <section className="border-t border-border bg-foreground text-background">
          <div className="container mx-auto px-4 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: "Free", label: "No cost, ever" },
              { value: "48h", label: "Report turnaround" },
              { value: "6+", label: "Areas reviewed" },
              { value: "100%", label: "Actionable insights" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl sm:text-4xl font-black mb-1">{value}</p>
                <p className="text-sm text-background/60 uppercase tracking-widest">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
