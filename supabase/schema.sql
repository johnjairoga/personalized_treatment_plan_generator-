-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Main table for storing generated treatment pages with multiple treatment options
CREATE TABLE IF NOT EXISTS treatment_pages (
  id                  UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                TEXT          NOT NULL UNIQUE,
  patient_name        TEXT          NOT NULL,
  patient_email       TEXT,
  company             TEXT,
  treatment_overview  TEXT,
  treatment_options   JSONB         NOT NULL DEFAULT '[]',
  extracted_json      JSONB,
  generated_html      TEXT,
  raw_extracted_text  TEXT,
  created_at          TIMESTAMPTZ   NOT NULL DEFAULT now()
);

-- Index for fast slug lookups (the only read path)
CREATE INDEX IF NOT EXISTS idx_treatment_pages_slug ON treatment_pages (slug);

-- Row Level Security: anyone can SELECT by slug (public pages)
ALTER TABLE treatment_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read by slug"
  ON treatment_pages
  FOR SELECT
  USING (true);

-- Server-side inserts use service_role key, which bypasses RLS entirely.
-- No INSERT policy is needed for anon role.
