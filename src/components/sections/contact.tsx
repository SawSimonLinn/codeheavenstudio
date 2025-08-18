'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Calendar, MessageSquare, Send } from 'lucide-react';
import Image from 'next/image';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  business: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export default function ContactSection() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            business: '',
            message: '',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        toast({
            title: "Message Sent!",
            description: "Thank you for reaching out. We'll get back to you shortly.",
        });
        form.reset();
    }

  return (
    <section id="contact" className="w-full py-16 sm:py-24 bg-background">
      <div className="container mx-auto">
        <div className="mx-auto max-w-2xl text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Get in Touch</h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
                We're here to help. Reach out to us with any questions or to start your project.
            </p>
        </div>
        <div className="grid gap-12 px-4 md:px-0 md:grid-cols-2 items-center">
            <div className="md:border md:shadow-sm md:rounded-lg">
                <div className="md:p-6">
                    <div className="mb-4">
                      <h2 className="text-2xl font-semibold leading-none tracking-tight">Inquiry Form</h2>
                      <p className="text-sm text-muted-foreground">Tell us a bit about your project or question.</p>
                    </div>
                     <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl><Input placeholder="Your Name" {...field} /></FormControl>
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
                                        <FormControl><Input type="email" placeholder="your@email.com" {...field} /></FormControl>
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
                                        <FormControl><Input placeholder="Your Company" {...field} /></FormControl>
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
                                            <Textarea placeholder="How can we help you?" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Send Message <Send className="ml-2 h-4 w-4" /></Button>
                        </form>
                    </Form>
                </div>
            </div>
            <div className="space-y-8">
                <Image 
                    src="https://placehold.co/600x400.png"
                    alt="Contact illustration"
                    data-ai-hint="contact illustration"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                />
                <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Other ways to connect:</h3>
                    <div className="space-y-4">
                        <Button variant="outline" className="w-full justify-start gap-4" asChild>
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                <Calendar className="h-5 w-5" /> Book a quick call via Calendly
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-4" asChild>
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                <MessageSquare className="h-5 w-5" /> Chat with us on WhatsApp
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
