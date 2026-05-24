# TreatmentPlan.ai - Personalized Treatment Plan Generator

An AI-powered web application that transforms uploaded PDF treatment plans into shareable public pages with integrated Stripe payment functionality.

## Features

- **PDF Upload & Parsing:** Users upload treatment plan PDFs
- **AI Extraction:** GPT-4o-mini automatically structures unstructured PDF text
- **Memorable URLs:** Each treatment plan gets a slug with the patient name (e.g., `/p/john-smith-abc123`)
- **Public Sharing:** Shareable links work without authentication
- **Payment Integration:** One-click Stripe payment link embedded in each treatment page
- **Glassmorphism Design:** Modern "Obsidian & Lime" dark theme throughout

## Quick Start

### Development

```bash
npm install
npm run dev
```

Then create `.env.local` with:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
OPENAI_API_KEY=sk-proj-...
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Visit http://localhost:3000 and upload a test PDF.

### Production Deployment

See [VERCEL_SETUP.md](./VERCEL_SETUP.md) for complete Vercel deployment instructions.

## Technology

- **Framework:** Next.js 16 (Turbopack, App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** Supabase (PostgreSQL)
- **AI:** OpenAI GPT-4o-mini
- **Payments:** Stripe
- **PDF:** pdf-parse
- **Hosting:** Vercel

## How It Works

1. User uploads a PDF with treatment plan information
2. API route extracts text using `pdf-parse`
3. OpenAI GPT-4o-mini structures the data (patient name, title, summary, details, pricing)
4. App generates a memorable slug like `john-smith-abc123` based on patient name
5. Stripe payment link is created and stored in Supabase
6. Public page is accessible at `/p/john-smith-abc123`
7. Patients can click to pay via Stripe payment link

## Slug Generation

Slugs are generated from the patient name with a random suffix:
- Input: "John Smith" → Output: "john-smith-abc123"
- Input: "María García" → Output: "maria-garcia-xyz789"
- This makes links memorable and SEO-friendly

## Database

Run this SQL in Supabase Dashboard → SQL Editor:

```sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS treatment_pages (
  id                  UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                TEXT          NOT NULL UNIQUE,
  patient_name        TEXT          NOT NULL,
  treatment_title     TEXT          NOT NULL,
  treatment_summary   TEXT          NOT NULL,
  treatment_details   TEXT          NOT NULL,
  pricing             NUMERIC(10,2) NOT NULL,
  stripe_payment_link TEXT          NOT NULL,
  raw_extracted_text  TEXT,
  created_at          TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_treatment_pages_slug ON treatment_pages (slug);
ALTER TABLE treatment_pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read by slug" ON treatment_pages FOR SELECT USING (true);
```

## API Routes

### POST /api/generate
Processes PDF and creates treatment page.

**Request:** `multipart/form-data` with field `pdf`
**Response:** `{ "slug": "john-smith-abc123" }`

## Design System

**Colors:** Obsidian background (`#0c0c0c`) + Neon Lime accent (`#ccff00`)
**Fonts:** Space Grotesk (headings), JetBrains Mono (code)
**Components:** Glass cards, neon buttons, floating animations

## Vercel Deployment

1. Push code to GitHub
2. Create new project on Vercel
3. Add environment variables in Settings
4. Deploy with `npm run build`

See [VERCEL_SETUP.md](./VERCEL_SETUP.md) for detailed instructions.

## Notes

- Max file size: 10MB
- Processing timeout: 60 seconds (Vercel limit)
- Min pricing: > 0
- Uses Node.js runtime for PDF processing
- No authentication required (public pages only)
