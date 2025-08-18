'use server';

/**
 * @fileOverview AI agent that recommends portfolio examples based on the user's specified industry.
 *
 * - recommendPortfolio - A function that handles the portfolio recommendation process.
 * - PortfolioRecommenderInput - The input type for the recommendPortfolio function.
 * - PortfolioRecommenderOutput - The return type for the recommendPortfolio function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PortfolioRecommenderInputSchema = z.object({
  industry: z
    .string()
    .describe('The industry for which to recommend portfolio examples.'),
});
export type PortfolioRecommenderInput = z.infer<typeof PortfolioRecommenderInputSchema>;

const PortfolioRecommenderOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('A list of recommended portfolio examples relevant to the specified industry.'),
});
export type PortfolioRecommenderOutput = z.infer<typeof PortfolioRecommenderOutputSchema>;

export async function recommendPortfolio(
  input: PortfolioRecommenderInput
): Promise<PortfolioRecommenderOutput> {
  return recommendPortfolioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'portfolioRecommenderPrompt',
  input: {schema: PortfolioRecommenderInputSchema},
  output: {schema: PortfolioRecommenderOutputSchema},
  prompt: `You are an expert portfolio recommender. Based on the industry provided, you will recommend relevant portfolio examples.

Industry: {{{industry}}}

Provide a detailed list of portfolio examples relevant to the industry, including specific project types and styles that are commonly successful. Focus on providing actionable insights that the user can apply to their portfolio development. Be as helpful as possible.
`,
});

const recommendPortfolioFlow = ai.defineFlow(
  {
    name: 'recommendPortfolioFlow',
    inputSchema: PortfolioRecommenderInputSchema,
    outputSchema: PortfolioRecommenderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
