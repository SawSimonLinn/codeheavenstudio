'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { analyzeSeo, AnalyzeSeoOutput } from '@/ai/flows/ai-seo-analyzer';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles } from 'lucide-react';

const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL." }),
});

export default function AiSeoAnalyzer() {
  const [report, setReport] = useState<AnalyzeSeoOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setReport(null);
    try {
      const result = await analyzeSeo(values);
      setReport(result);
    } catch (error) {
      console.error('Error analyzing SEO:', error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "Could not analyze the URL. Please check if it's correct and try again.",
      })
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <h3 className="text-lg font-semibold mb-2">Analyze Your Website's SEO</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Enter your website's URL to get a comprehensive SEO performance report. Our AI will check for best practices, potential issues, and suggest improvements.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Analyzing...' : 'Analyze SEO'}
            </Button>
          </form>
        </Form>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Analysis Report</h3>
        <Card className="min-h-[200px]">
          <CardHeader>
             <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle>AI-Generated Report</CardTitle>
            </div>
            <CardDescription>
              Key insights into your site's search engine performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="space-y-3">
                <Skeleton className="h-5 w-3/5" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-4/5" />
                 <Skeleton className="h-4 w-2/5" />
              </div>
            )}
            {report && !isLoading && (
              <ScrollArea className="h-64">
                <div className="prose prose-sm dark:prose-invert whitespace-pre-wrap text-muted-foreground pr-4">
                  {report.report}
                </div>
              </ScrollArea>
            )}
            {!report && !isLoading && (
              <div className="text-center text-muted-foreground py-8">
                <p>Your SEO report will appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
