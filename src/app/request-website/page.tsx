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
  Mail,
  Send,
  CheckCircle2,
  Sparkles,
  Briefcase,
  Clock,
  DollarSign,
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

const budgets = [
  { value: "under-1k", label: "Under $1,000" },
  { value: "1k-3k", label: "$1,000 – $3,000" },
  { value: "3k-5k", label: "$3,000 – $5,000" },
  { value: "5k-10k", label: "$5,000 – $10,000" },
  { value: "10k-plus", label: "$10,000+" },
  { value: "not-sure", label: "Not sure yet" },
];

const timelines = [
  { value: "asap", label: "As soon as possible" },
  { value: "1month", label: "Within 1 month" },
  { value: "2-3months", label: "2–3 months" },
  { value: "flexible", label: "Flexible / No rush" },
];

const formSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters."),
  industry: z.string().min(1, "Please select your industry."),
  budget: z.string().min(1, "Please select a budget range."),
  timeline: z.string().min(1, "Please select a timeline."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Please tell us a bit more about your project."),
});

const highlights = [
  {
    icon: Sparkles,
    title: "Free Consultation",
    description: "We review every request and respond within 24 hours.",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "No hidden fees. You'll get a clear quote upfront.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "Most projects launch in 4–6 weeks.",
  },
];

export default function RequestWebsitePage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      industry: "",
      budget: "",
      timeline: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    try {
      const payload = {
        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
        subject: "New Website Request",
        "Business Name": values.businessName,
        Industry: industries.find((i) => i.value === values.industry)?.label ?? values.industry,
        Budget: budgets.find((b) => b.value === values.budget)?.label ?? values.budget,
        Timeline: timelines.find((t) => t.value === values.timeline)?.label ?? values.timeline,
        email: values.email,
        message: values.message,
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
      console.error("Request form error:", err);
      alert(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="relative w-full py-24 sm:py-32 overflow-hidden bg-background">
          <div className="relative container mx-auto max-w-7xl px-4">
            {/* Header */}
            <div className="mx-auto max-w-2xl text-center mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                Get a Free Quote
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-5">
                Request Your{" "}
                <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Website
                </span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Fill in a few details about your business and we&apos;ll send you a custom
                quote, no pressure, no commitment.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8 items-start">
              {/* Form */}
              <div className="lg:col-span-3">
                <div className="relative rounded-2xl border border-border/60 bg-card shadow-2xl overflow-hidden">
                  <div className="h-1 w-full bg-gradient-to-r from-primary via-blue-400 to-purple-500" />

                  <div className="p-8 sm:p-10">
                    {submitted ? (
                      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 border border-green-500/30">
                          <CheckCircle2 className="h-8 w-8 text-green-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-foreground">Request Received!</h2>
                        <p className="text-muted-foreground max-w-sm">
                          Thanks for reaching out! We&apos;ll review your request and get back
                          to you within 24 hours with a custom quote.
                        </p>
                        <Button
                          variant="outline"
                          className="mt-4 rounded-full"
                          onClick={() => setSubmitted(false)}
                        >
                          Submit Another Request
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="mb-8">
                          <h2 className="text-2xl font-bold text-foreground mb-1">
                            Tell us about your project
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Takes about 2 minutes. We&apos;ll handle the rest.
                          </p>
                        </div>

                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            {/* Business Name */}
                            <FormField
                              control={form.control}
                              name="businessName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-foreground/80">Business Name</FormLabel>
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

                            {/* Industry */}
                            <FormField
                              control={form.control}
                              name="industry"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-foreground/80">Industry</FormLabel>
                                  <div className="relative">
                                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
                                    <Select onValueChange={field.onChange} value={field.value}>
                                      <FormControl>
                                        <SelectTrigger className="pl-10 bg-background/50 border-border/60 focus:border-primary/60">
                                          <SelectValue placeholder="Select your industry..." />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {industries.map((i) => (
                                          <SelectItem key={i.value} value={i.value}>
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

                            {/* Budget + Timeline side by side */}
                            <div className="grid sm:grid-cols-2 gap-5">
                              <FormField
                                control={form.control}
                                name="budget"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-foreground/80">Budget</FormLabel>
                                    <div className="relative">
                                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
                                      <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                          <SelectTrigger className="pl-10 bg-background/50 border-border/60 focus:border-primary/60">
                                            <SelectValue placeholder="Select budget..." />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          {budgets.map((b) => (
                                            <SelectItem key={b.value} value={b.value}>
                                              {b.label}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="timeline"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-foreground/80">Timeline</FormLabel>
                                    <div className="relative">
                                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
                                      <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                          <SelectTrigger className="pl-10 bg-background/50 border-border/60 focus:border-primary/60">
                                            <SelectValue placeholder="Select timeline..." />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          {timelines.map((t) => (
                                            <SelectItem key={t.value} value={t.value}>
                                              {t.label}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            {/* Email */}
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-foreground/80">Email Address</FormLabel>
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

                            {/* Message */}
                            <FormField
                              control={form.control}
                              name="message"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-foreground/80">
                                    Tell us about your project
                                  </FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="What pages do you need? Any features like booking, menu, gallery, or e-commerce? Existing website to redesign?"
                                      className="min-h-[140px] resize-none bg-background/50 border-border/60 focus:border-primary/60"
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
                              size="lg"
                              className="w-full rounded-full bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-opacity font-semibold"
                            >
                              {submitting ? (
                                "Sending..."
                              ) : (
                                <>
                                  Request My Website
                                  <Send className="ml-2 h-4 w-4" />
                                </>
                              )}
                            </Button>
                          </form>
                        </Form>
                      </>
                    )}
                  </div>
                </div>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  By submitting this form you agree to be contacted about your inquiry.
                  We never share your information.
                </p>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                  Why Code Heaven Studio?
                </p>

                {highlights.map((h) => {
                  const Icon = h.icon;
                  return (
                    <div
                      key={h.title}
                      className="rounded-2xl border border-border/40 bg-card/50 p-6 flex items-start gap-4"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{h.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {h.description}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {/* Specialties */}
                <div className="mt-2 rounded-2xl border border-border/40 bg-muted/30 p-5">
                  <p className="text-sm font-semibold text-foreground mb-3">We specialize in</p>
                  <ul className="space-y-2">
                    {[
                      "Restaurant & food business websites",
                      "Small business websites",
                      "Local SEO optimization",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Online indicator */}
                <div className="rounded-2xl border border-border/40 bg-muted/30 p-5 text-center">
                  <div className="flex justify-center mb-2">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    Avg. response time: &lt; 24 hours
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Mon – Fri, 9am – 6pm (EST)</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
