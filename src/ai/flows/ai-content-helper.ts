'use server';

/**
 * @fileOverview A content generation AI agent.
 *
 * - generateContentIdeas - A function that handles the content generation process.
 * - GenerateContentIdeasInput - The input type for the generateContentIdeas function.
 * - GenerateContentIdeasOutput - The return type for the generateContentIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateContentIdeasInputSchema = z.object({
  contentType: z
    .string()
    .describe("The type of content to generate ideas for (e.g., 'About Us', 'Services', 'Blog')."),
  topic: z.string().optional().describe('The general topic or theme for the content.'),
  keywords: z.string().optional().describe('Comma-separated keywords to guide content generation.'),
});
export type GenerateContentIdeasInput = z.infer<typeof GenerateContentIdeasInputSchema>;

const GenerateContentIdeasOutputSchema = z.object({
  ideas: z.array(
    z.string().describe('A list of content ideas related to the specified content type and topic.')
  ).
describe('Generated content ideas.'),
});
export type GenerateContentIdeasOutput = z.infer<typeof GenerateContentIdeasOutputSchema>;

export async function generateContentIdeas(input: GenerateContentIdeasInput): Promise<GenerateContentIdeasOutput> {
  return generateContentIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateContentIdeasPrompt',
  input: {schema: GenerateContentIdeasInputSchema},
  output: {schema: GenerateContentIdeasOutputSchema},
  prompt: `You are a creative content strategist. Generate a list of content ideas for a website, focusing on the following:

  Content Type: {{{contentType}}}
  {{#if topic}}Topic: {{{topic}}}{{/if}}
  {{#if keywords}}Keywords: {{{keywords}}}{{/if}}

  Provide at least 5 content ideas. Each idea should be a short, descriptive title or concept.
  Format each content idea as a separate string in a JSON array.
  Do not include any introductory or concluding remarks.
  Make the content ideas diverse and engaging.
  Make sure the ideas are creative and not generic.
  `,
});

const generateContentIdeasFlow = ai.defineFlow(
  {
    name: 'generateContentIdeasFlow',
    inputSchema: GenerateContentIdeasInputSchema,
    outputSchema: GenerateContentIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
