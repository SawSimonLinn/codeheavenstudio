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
import { Calendar, MessageSquare, Send } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  business: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export default function ContactSection() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", business: "", message: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);

    // Call Web3Forms API
    const payload = {
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
      name: values.name,
      email: values.email,
      business: values.business,
      message: values.message,
    };

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.success) {
      setSubmitted(true); // show thank you message
      form.reset();
    }

    setSubmitting(false);
  }

  return (
    <section id="contact" className="w-full py-16 sm:py-24 bg-background">
      <div className="container mx-auto">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            We're here to help. Reach out to us with any questions or to start
            your project.
          </p>
        </div>

        <div className="grid gap-12 px-4 md:px-0 md:grid-cols-2 items-center">
          {/* Form card */}
          <div className="md:border md:shadow-sm md:rounded-lg">
            <div className="md:p-6">
              <div className="mb-4">
                <h2 className="text-2xl font-semibold leading-none tracking-tight">
                  Inquiry Form
                </h2>
                <p className="text-sm text-muted-foreground">
                  Tell us a bit about your project or question.
                </p>
              </div>

              <div>
                {submitted ? (
                  <div className="p-6 text-center">
                    <h2 className="text-2xl font-semibold mb-2">
                      🎉 Thank You!
                    </h2>
                    <p className="text-muted-foreground">
                      Your message has been sent successfully. We’ll get back to
                      you soon.
                    </p>
                  </div>
                ) : (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Name" {...field} />
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
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="codeheavenstudio@gmail.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="business"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Name (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Company" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="How can we help you?"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" disabled={submitting}>
                        {submitting ? "Sending..." : "Send Message"}
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </Form>
                )}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-8">
            <Image
              src="/codeheavenstudio.png"
              alt="Contact illustration"
              data-ai-hint="contact illustration"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Other ways to connect:
              </h3>
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-4"
                  asChild
                >
                  <a
                    href="https://calendly.com/sawsimonlinn/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Calendar className="h-5 w-5" /> Book a quick call via
                    Calendly
                  </a>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start gap-4"
                  asChild
                >
                  <a
                    href="https://wa.me/message/57WKZCOUS5YWE1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageSquare className="h-5 w-5" /> Chat with us on
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Small privacy note (trust) */}
        <p className="mt-8 text-center text-xs text-muted-foreground">
          By submitting this form, you agree to be contacted about your inquiry.
          We don’t share your info.
        </p>
      </div>
    </section>
  );
}
