"use server";

/**
 * @fileOverview Estimates the project cost and timeline based on user input.
 *
 * - estimateProject - A function that estimates project cost and timeline.
 * - EstimateProjectInput - The input type for the estimateProject function.
 * - EstimateProjectOutput - The return type for the estimateProject function.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const EstimateProjectInputSchema = z.object({
  websiteNeeds: z
    .string()
    .describe("A description of the website needs and requirements."),
});
export type EstimateProjectInput = z.infer<typeof EstimateProjectInputSchema>;

const EstimateProjectOutputSchema = z.object({
  estimatedCost: z.string().describe("The estimated cost of the project."),
  estimatedTimeline: z
    .string()
    .describe("The estimated timeline for the project."),
});
export type EstimateProjectOutput = z.infer<typeof EstimateProjectOutputSchema>;

export async function estimateProject(
  input: EstimateProjectInput
): Promise<EstimateProjectOutput> {
  return estimateProjectFlow(input);
}

const prompt = ai.definePrompt({
  name: "estimateProjectPrompt",
  input: { schema: EstimateProjectInputSchema },
  output: { schema: EstimateProjectOutputSchema },
  prompt: `You are an expert AI project estimator. Your task is to analyze the user's website needs and provide an estimated cost and timeline based on the pricing structure below.

Analyze the user's request: {{{websiteNeeds}}}

Carefully match the user's needs to one of the main packages. If they request features not included in the base package, add the relevant Add-On costs. Provide a final price and an estimated timeline. Be clear and concise.

**Pricing Structure (Note: Prices are currently 25% off until September 30th):**

**💼 Starter Package – $938 (Usually $1,250)**
*For small businesses getting online.*
*One-time payment. (Adjustable — features can be added or removed.)*
- 5-page responsive website (Home, About, Services, Blog, Contact)
- Mobile-friendly + SEO-ready design
- Custom design with brand colors & typography
- Free 2 stock videos + premium hero section
- 1 round of revisions
- Basic contact form setup
- Google Analytics setup
- 2 weeks of support after launch
- **Timeline: 1–2 weeks**

**🚀 Growth Package – $1,725 (Usually $2,300)**
*For businesses ready to scale.*
*One-time payment. (Adjustable — features can be added or removed.)*
- Everything in Starter Package plus:
- Up to 12 custom-designed pages
- Blog setup with categories & tags
- Advanced SEO optimization (keywords, on-page SEO, schema setup)
- Premium stock images & icons included
- Performance optimization (speed + Core Web Vitals)
- 2 rounds of revisions
- 1-month post-launch support
- **Timeline: 3–4 weeks**

**🌐 Premium Package – $3,375+ (Usually $4,500+)**
*For companies needing a full digital presence.*
*One-time payment. (Adjustable — features can be added or removed.)*
- Everything in Growth Package plus:
- Unlimited pages + advanced layouts
- Custom animations & video integration
- AI-powered features (chatbots, recommendations, or workflows)
- Marketing landing pages + conversion-focused design
- Custom blog / CMS integration
- Priority support + maintenance options
- 3 rounds of revisions
- 2 months post-launch support
- **Timeline: 6–8 weeks**

**🛠️ Custom Upgrades (Optional Add-ons for Any Package)**
- Custom Logo & Branding — $450+
- Extra Pages - $150/page
- Full SEO Setup - $500
- Blog Integration - $300
- Multi-language Support — $350+
- Speed & Performance Boost — $250
- SEO Copywriting — $300+
- Ongoing SEO & Marketing — $400/month
- Website Maintenance & Support — $200/month
- Custom Video / Animation — $500+
- AI Features (chatbot, automation) — $500+

When providing the estimate, be direct. For example: "Based on your request for a 5-page site with a blog, I recommend the Starter Package. The estimated promotional cost would be around $938 and would take 1-2 weeks."
`,
});

const estimateProjectFlow = ai.defineFlow(
  {
    name: "estimateProjectFlow",
    inputSchema: EstimateProjectInputSchema,
    outputSchema: EstimateProjectOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
