'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { recommendPortfolio, PortfolioRecommenderOutput } from '@/ai/flows/portfolio-recommender';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles } from 'lucide-react';

const formSchema = z.object({
  industry: z.string().min(3, {
    message: 'Please enter a valid industry.',
  }),
});

export default function PortfolioRecommender() {
  const [recommendations, setRecommendations] = useState<PortfolioRecommenderOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industry: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRecommendations(null);
    try {
      const result = await recommendPortfolio(values);
      setRecommendations(result);
    } catch (error) {
      console.error('Error recommending portfolio:', error);
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
        <h3 className="text-lg font-semibold mb-2">Get Personalized Recommendations</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Not sure what's possible? Tell us your industry, and our AI will suggest relevant portfolio examples and project styles to inspire you.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Industry</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Restaurant, Real Estate, E-commerce" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Recommending...' : 'Get Recommendations'}
            </Button>
          </form>
        </Form>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Portfolio Inspiration</h3>
        <Card className="min-h-[200px]">
          <CardHeader>
             <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle>AI-Curated Examples</CardTitle>
            </div>
            <CardDescription>
              Ideas and styles tailored to your industry.
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
            {recommendations && !isLoading && (
              <ScrollArea className="h-64">
                <div className="prose prose-sm dark:prose-invert whitespace-pre-wrap text-muted-foreground pr-4">
                  {recommendations.recommendations}
                </div>
              </ScrollArea>
            )}
            {!recommendations && !isLoading && (
              <div className="text-center text-muted-foreground py-8">
                <p>Recommendations will appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
