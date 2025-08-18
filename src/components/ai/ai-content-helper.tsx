'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateContentIdeas, GenerateContentIdeasOutput } from '@/ai/flows/ai-content-helper';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, Lightbulb } from 'lucide-react';

const formSchema = z.object({
  contentType: z.string({ required_error: 'Please select a content type.' }),
  topic: z.string().optional(),
  keywords: z.string().optional(),
});

export default function AiContentHelper() {
  const [ideas, setIdeas] = useState<GenerateContentIdeasOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      keywords: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setIdeas(null);
    try {
      const result = await generateContentIdeas(values);
      setIdeas(result);
    } catch (error) {
      console.error('Error generating content ideas:', error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "There was a problem with our AI. Please try again later.",
      })
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <h3 className="text-lg font-semibold mb-2">Unleash Content Creativity</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Struggling with writer's block? Select a content type, provide an optional topic and keywords, and let our AI generate fresh ideas for you.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="contentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a content type..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="About Us">About Us</SelectItem>
                      <SelectItem value="Services">Services</SelectItem>
                      <SelectItem value="Blog">Blog Post</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Sustainable Web Design" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keywords (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., eco-friendly, green hosting, performance" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Generating...' : 'Generate Ideas'}
            </Button>
          </form>
        </Form>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Generated Ideas</h3>
        <Card className="min-h-[350px]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              <CardTitle>Creative Concepts</CardTitle>
            </div>
            <CardDescription>Here are a few ideas to get you started.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-6 w-full" />)}
              </div>
            )}
            {ideas && !isLoading && (
              <ul className="space-y-3">
                {ideas.ideas.map((idea, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{idea}</span>
                  </li>
                ))}
              </ul>
            )}
            {!ideas && !isLoading && (
              <div className="text-center text-muted-foreground py-8">
                <p>Your content ideas will appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
