'use server';

/**
 * @fileOverview Estimates the project cost and timeline based on user input.
 *
 * - estimateProject - A function that estimates project cost and timeline.
 * - EstimateProjectInput - The input type for the estimateProject function.
 * - EstimateProjectOutput - The return type for the estimateProject function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EstimateProjectInputSchema = z.object({
  websiteNeeds: z
    .string()
    .describe('A description of the website needs and requirements.'),
});
export type EstimateProjectInput = z.infer<typeof EstimateProjectInputSchema>;

const EstimateProjectOutputSchema = z.object({
  estimatedCost: z.string().describe('The estimated cost of the project.'),
  estimatedTimeline: z
    .string()
    .describe('The estimated timeline for the project.'),
});
export type EstimateProjectOutput = z.infer<typeof EstimateProjectOutputSchema>;

export async function estimateProject(input: EstimateProjectInput): Promise<EstimateProjectOutput> {
  return estimateProjectFlow(input);
}

const prompt = ai.definePrompt({
  name: 'estimateProjectPrompt',
  input: {schema: EstimateProjectInputSchema},
  output: {schema: EstimateProjectOutputSchema},
  prompt: `You are an expert AI project estimator. Your task is to analyze the user's website needs and provide an estimated cost and timeline based on the pricing structure below.

Analyze the user's request: {{{websiteNeeds}}}

Carefully match the user's needs to one of the main packages. If they request features not included in the base package, add the relevant Add-On costs. Provide a final price and an estimated timeline. Be clear and concise.

**Pricing Structure:**

**Starter Package – $1250**
*For small businesses getting online.*
- 1–3 Pages (e.g., Landing, About, Contact)
- Responsive Design
- Basic SEO Setup
- Domain + Hosting Setup
- **Timeline: 1–2 weeks**

**Growth Package – $2,300**
*For businesses ready to scale.*
- Up to 8–10 Pages
- Custom Design + Branding
- E-Commerce or Booking Integration
- Advanced SEO Optimization
- Fast & Secure Hosting
- **Timeline: 3–4 weeks**

**Premium Package – $4,500+**
*For companies needing a full digital presence.*
- Unlimited Pages + Custom Features
- Advanced UI/UX + Animations
- Full E-Commerce Store or Web App
- Advanced SEO Strategy + Performance
- Hosting Setup Best Practices
- **Timeline: 6–8 weeks**

**⚡ Add-Ons (Custom Upgrades)**
- Extra Pages: $150 each
- Full SEO Setup: $500
- Logo & Brand Kit: $400
- Blog Integration: $300
- E-Commerce Store (add-on): $700
- Booking System (add-on): $400
- Custom Features / Animations: from $250
- Analytics Setup: $200

When providing the estimate, be direct. For example: "Based on your request for a 5-page site with a blog, I recommend the Growth Package with a blog add-on. The estimated cost would be around $2,600 and would take 3-4 weeks."
`,
});

const estimateProjectFlow = ai.defineFlow(
  {
    name: 'estimateProjectFlow',
    inputSchema: EstimateProjectInputSchema,
    outputSchema: EstimateProjectOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
