'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { estimateProject, EstimateProjectOutput } from '@/ai/flows/ai-project-estimator';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { DollarSign, Clock } from 'lucide-react';

const formSchema = z.object({
  websiteNeeds: z.string().min(20, {
    message: 'Please describe your needs in at least 20 characters.',
  }),
});

export default function AiProjectEstimator() {
  const [estimation, setEstimation] = useState<EstimateProjectOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      websiteNeeds: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setEstimation(null);
    try {
      const result = await estimateProject(values);
      setEstimation(result);
    } catch (error) {
      console.error('Error estimating project:', error);
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
        <h3 className="text-lg font-semibold mb-2">Describe Your Project</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Tell us what you envision for your website. The more detail you provide, the more accurate our AI-powered estimate will be.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="websiteNeeds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website Needs</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., I need a 5-page marketing website for my new coffee shop with a photo gallery, contact form, and an online menu. I also want it to be mobile-friendly."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Estimating...' : 'Get Estimate'}
            </Button>
          </form>
        </Form>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Your Estimate</h3>
        <Card className="min-h-[258px]">
          <CardHeader>
            <CardTitle>AI-Generated Estimate</CardTitle>
            <CardDescription>This is a preliminary estimate to give you an idea.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-6 w-1/4" />
                </div>
                 <Skeleton className="h-4 w-full" />
                 <div className="flex items-center space-x-3 pt-4">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-6 w-1/4" />
                </div>
                 <Skeleton className="h-4 w-full" />
              </div>
            )}
            {estimation && !isLoading && (
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 rounded-full bg-green-100 dark:bg-green-900 p-2">
                     <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Estimated Cost</h4>
                    <p className="text-muted-foreground">{estimation.estimatedCost}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                   <div className="flex-shrink-0 rounded-full bg-blue-100 dark:bg-blue-900 p-2">
                     <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Estimated Timeline</h4>
                    <p className="text-muted-foreground">{estimation.estimatedTimeline}</p>
                  </div>
                </div>
              </div>
            )}
             {!estimation && !isLoading && (
              <div className="text-center text-muted-foreground py-8">
                <p>Your estimate will appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
