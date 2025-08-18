'use server';

/**
 * @fileOverview Analyzes a website URL and provides an SEO performance report.
 *
 * - analyzeSeo - A function that handles the SEO analysis process.
 * - AnalyzeSeoInput - The input type for the analyzeSeo function.
 * - AnalyzeSeoOutput - The return type for the analyzeSeo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSeoInputSchema = z.object({
  url: z.string().url().describe('The URL of the website to analyze.'),
});
export type AnalyzeSeoInput = z.infer<typeof AnalyzeSeoInputSchema>;

const AnalyzeSeoOutputSchema = z.object({
  report: z.string().describe('The SEO performance report for the given URL.'),
});
export type AnalyzeSeoOutput = z.infer<typeof AnalyzeSeoOutputSchema>;

export async function analyzeSeo(input: AnalyzeSeoInput): Promise<AnalyzeSeoOutput> {
  return analyzeSeoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSeoPrompt',
  input: {schema: AnalyzeSeoInputSchema},
  output: {schema: AnalyzeSeoOutputSchema},
  prompt: `You are an SEO expert. Analyze the SEO performance of the following website URL and provide a detailed report:

URL: {{{url}}}

Report:
`,
});

const analyzeSeoFlow = ai.defineFlow(
  {
    name: 'analyzeSeoFlow',
    inputSchema: AnalyzeSeoInputSchema,
    outputSchema: AnalyzeSeoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
