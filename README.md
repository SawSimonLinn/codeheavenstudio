# Code Heaven Studio

A web agency website built with Next.js 15. Showcases services, projects, blog posts, and pricing. Includes an interactive package builder and AI-powered tools for content, SEO analysis, and portfolio recommendations.

## Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Radix UI
- **AI:** Google Genkit (Gemini)
- **Database:** Supabase (Postgres + Auth)
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

Copy `env.example` to `.env.local` and fill in values. You will need:

- A Google AI API key for Genkit
- Supabase project credentials
- SMTP credentials for sending receipt emails

Required Supabase variables:

```bash
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
SUPABASE_PUBLISHABLE_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
SUPABASE_ADMIN_EMAIL=admin@example.com
ADMIN_AUTH_SECRET=...
```

Optional table/RPC overrides:

```bash
SUPABASE_RECEIPTS_TABLE=receipts
SUPABASE_ADMIN_AUDIT_TABLE=admin_audit_logs
SUPABASE_NEXT_RECEIPT_COUNTER_RPC=next_receipt_counter
```

Set up schema objects in Supabase by running:

```sql
-- from file: supabase/schema.sql
```

Migrate existing Appwrite data (receipts, counters, admin audit logs):

```bash
npm run migrate:appwrite-to-supabase
```

The migration script reads these Appwrite vars if you still have existing data:
`APPWRITE_ENDPOINT`, `APPWRITE_PROJECT_ID`, `APPWRITE_API_KEY`, `APPWRITE_DATABASE_ID`, `APPWRITE_RECEIPTS_COLLECTION_ID`, `APPWRITE_COUNTERS_COLLECTION_ID`, `APPWRITE_ADMIN_AUDIT_COLLECTION_ID`.

## Notes

- Legal page dates (effective date, last updated) are centralized in `src/lib/legal-metadata.ts`. Update that file when terms or privacy content changes.
