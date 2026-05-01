# Code Heaven Studio

A web agency website built with Next.js 15. Showcases services, projects, blog posts, pricing, contact flows, and an internal receipt admin area.

## Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Radix UI
- **Database:** Supabase (Postgres + Auth)
- **Forms:** React Hook Form + Zod
- **Analytics:** Vercel Analytics

## Pages

| Route | Description |
|---|---|
| `/` | Homepage with hero, projects, process, and testimonials |
| `/about` | About the studio |
| `/projects` | Portfolio with individual project pages |
| `/codeheavenpricing` | Pricing packages with interactive cost calculator |
| `/blog` | Blog listing and individual post pages |
| `/contact` | Contact form |
| `/admin` | Internal admin dashboard and receipt tools |
| `/faq` | Frequently asked questions |
| `/privacy-policy` | Privacy policy |
| `/terms-and-conditions` | Terms and conditions |

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

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Next.js dev server on port 9002 |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |

## Environment Variables

Copy `env.example` to `.env.local` and fill in values. You will need:

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
