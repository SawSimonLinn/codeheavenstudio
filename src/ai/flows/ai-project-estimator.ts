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

**Pricing Structure:**

**🌱 Starter Package – $1,250**
*For small businesses getting online.*
- Modern, responsive website (up to 5 pages)
- SEO-ready structure (Google-friendly)
- Mobile & tablet optimized
- Free SSL security setup
- Contact form integration
- Basic on-page SEO setup
- Google Maps & social links integration
- Free 2 stock videos + premium hero section (eye-catching homepage intro)
- 1 round of revisions
- **Timeline: 1–2 weeks**

**🚀 Growth Package – $2,300**
*For businesses ready to scale.*
- Everything in Starter, plus:
- Up to 10 pages
- Blog setup for content marketing
- Advanced SEO optimization
- Basic e-commerce setup (up to 20 products)
- Performance & speed optimization
- Custom animations & interactive sections
- 2 premium stock videos & images included
- 2 rounds of revisions
- Integration with newsletter / email marketing tools
- Google Analytics & Search Console setup
- **Timeline: 3–4 weeks**

**👑 Premium Package – $4,500+**
*For companies needing a full digital presence.*
- Everything in Growth, plus:
- Unlimited pages & custom layouts
- Full e-commerce system (products, cart, checkout, payments)
- AI-powered features (chatbot, smart search, etc.)
- Branding package (logo, colors, typography guide)
- Copywriting assistance for web pages
- Advanced SEO + keyword research strategy
- Multi-language support (if needed)
- Priority support & training sessions
- 1 month of free maintenance after launch
- Custom video/animation integration in multiple sections
- 3 rounds of revisions
- **Timeline: 6–8 weeks**

**🛠️ Custom Upgrades (Available with any package)**
- Custom Logo & Branding – $450+
- E-commerce Expansion – $600+
- Multi-language Support – $350+
- Speed & Performance Boost – $250
- AI Features – $500+
- Copywriting Services – $300+
- Ongoing SEO & Marketing – $400/month
- Website Maintenance & Support – $200/month
- Custom Video / Animation – $500+

When providing the estimate, be direct. For example: "Based on your request for a 5-page site with a blog, I recommend the Growth Package with a blog add-on. The estimated cost would be around $2,600 and would take 3-4 weeks."
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
