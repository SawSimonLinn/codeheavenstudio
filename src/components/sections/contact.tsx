"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
  Calendar,
  MessageSquare,
  Send,
  Mail,
  User,
  Building2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Tag,
} from "lucide-react";

const subjects = [
  { value: "pricing", label: "Pricing & Packages" },
  { value: "demo", label: "Request a Demo" },
  { value: "new-project", label: "Start a New Project" },
  { value: "redesign", label: "Website Redesign" },
  { value: "support", label: "Support / Bug Fix" },
  { value: "partnership", label: "Partnership / Collab" },
  { value: "other", label: "Something Else" },
];

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  business: z.string().optional(),
  subject: z.string().min(1, "Please select a topic."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

const contactChannels = [
  {
    icon: Calendar,
    title: "Book a Free Call",
    description: "30 minutes to talk through your project — no pressure.",
    cta: "Schedule on Calendly",
    href: "https://calendly.com/sawsimonlinn/30min",
    gradient: "from-blue-500/20 to-primary/10",
    iconColor: "text-blue-400",
    borderColor: "border-blue-500/20",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Us",
    description: "Quick questions? Drop us a message and we'll reply fast.",
    cta: "Open WhatsApp",
    href: "https://wa.me/14143436893",
    gradient: "from-green-500/20 to-emerald-500/10",
    iconColor: "text-green-400",
    borderColor: "border-green-500/20",
  },
  {
    icon: Mail,
    title: "Send an Email",
    description: "Prefer email? We read and respond to every message.",
    cta: "codeheavenstudio@gmail.com",
    href: "mailto:codeheavenstudio@gmail.com",
    gradient: "from-purple-500/20 to-pink-500/10",
    iconColor: "text-purple-400",
    borderColor: "border-purple-500/20",
  },
];

export default function ContactSection() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", business: "", subject: "", message: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);

    try {
      const payload = {
        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
        name: values.name,
        email: values.email,
        business: values.business,
        subject: subjects.find((s) => s.value === values.subject)?.label ?? values.subject,
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
      console.error("Contact form error:", err);
      alert(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="relative w-full py-24 sm:py-32 overflow-hidden bg-background">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[600px] rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            Let&apos;s Work Together
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-5">
            Start Your{" "}
            <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Next Project
            </span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Tell us what you&apos;re building. We&apos;ll get back to you within 24 hours
            with a clear plan and honest pricing.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Form — takes 3 of 5 cols */}
          <div className="lg:col-span-3">
            <div className="relative rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm shadow-2xl overflow-hidden">
              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-primary via-blue-400 to-purple-500" />

              <div className="p-8 sm:p-10">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 border border-green-500/30">
                      <CheckCircle2 className="h-8 w-8 text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Message Sent!</h2>
                    <p className="text-muted-foreground max-w-sm">
                      Thanks for reaching out. We&apos;ll review your message and get back
                      to you within 24 hours.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4 rounded-full"
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-foreground mb-1">
                        Tell us about your project
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Fill in a few details and we&apos;ll be in touch shortly.
                      </p>
                    </div>

                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                      >
                        <div className="grid sm:grid-cols-2 gap-5">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground/80">
                                  Full Name
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                      placeholder="John Smith"
                                      className="pl-10 bg-background/50 border-border/60 focus:border-primary/60"
                                      {...field}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground/80">
                                  Email Address
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                      type="email"
                                      placeholder="you@company.com"
                                      className="pl-10 bg-background/50 border-border/60 focus:border-primary/60"
                                      {...field}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="business"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground/80">
                                Business Name{" "}
                                <span className="text-muted-foreground font-normal">
                                  (optional)
                                </span>
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    placeholder="Your Company"
                                    className="pl-10 bg-background/50 border-border/60 focus:border-primary/60"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground/80">
                                What&apos;s this about?
                              </FormLabel>
                              <div className="relative">
                                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="pl-10 bg-background/50 border-border/60 focus:border-primary/60">
                                      <SelectValue placeholder="Select a topic..." />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {subjects.map((s) => (
                                      <SelectItem key={s.value} value={s.value}>
                                        {s.label}
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
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground/80">
                                Your Message
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us about your project, goals, and timeline..."
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
                              Send Message
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

          {/* Contact channels — takes 2 of 5 cols */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-2">
              Or reach us directly
            </p>

            {contactChannels.map((channel) => {
              const Icon = channel.icon;
              return (
                <a
                  key={channel.title}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative rounded-2xl border ${channel.borderColor} bg-gradient-to-br ${channel.gradient} p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-background/60 border border-border/50 ${channel.iconColor}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-1">
                        {channel.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {channel.description}
                      </p>
                      <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${channel.iconColor} group-hover:gap-2.5 transition-all`}>
                        {channel.cta}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}

            {/* Response time badge */}
            <div className="mt-2 rounded-2xl border border-border/40 bg-muted/30 p-5 text-center">
              <div className="flex justify-center mb-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                </span>
              </div>
              <p className="text-sm font-semibold text-foreground">
                Avg. response time: &lt; 24 hours
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Mon – Fri, 9am – 6pm (EST)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
