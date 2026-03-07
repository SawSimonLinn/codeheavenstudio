# Code Heaven Studio

A web agency website built with Next.js 15. Showcases services, projects, blog posts, and pricing. Includes an interactive package builder and AI-powered tools for content, SEO analysis, and portfolio recommendations.

## Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Radix UI
- **AI:** Google Genkit (Gemini)
- **Database:** Firebase
- **Forms:** React Hook Form + Zod
- **Analytics:** Vercel Analytics

## Pages

| Route | Description |
|---|---|
| `/` | Homepage with hero, projects, process, and testimonials |
| `/about` | About the studio |
| `/projects` | Portfolio with individual project pages |
| `/pricing` | Pricing packages with interactive cost calculator |
| `/blog` | Blog listing and individual post pages |
| `/contact` | Contact form |
| `/faq` | Frequently asked questions |
| `/privacy-policy` | Privacy policy |
| `/terms-and-conditions` | Terms and conditions |

## AI Features

- **Content Helper** - Generates website copy suggestions
- **SEO Analyzer** - Analyzes page content for SEO improvements
- **Portfolio Recommender** - Suggests relevant projects based on user input
- **Project Estimator** - Estimates project scope and cost

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The app runs at `http://localhost:9002`.

Start the Genkit AI development server (required for AI features):

```bash
npm run genkit:dev
```

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Next.js dev server on port 9002 |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run genkit:dev` | Start Genkit AI dev server |
| `npm run genkit:watch` | Start Genkit AI dev server in watch mode |

## Environment Variables

Create a `.env.local` file in the root directory. You will need:

- A Google AI API key for Genkit
- Firebase project credentials

Refer to the Genkit and Firebase documentation for the required variable names.

## Notes

- Legal page dates (effective date, last updated) are centralized in `src/lib/legal-metadata.ts`. Update that file when terms or privacy content changes.
