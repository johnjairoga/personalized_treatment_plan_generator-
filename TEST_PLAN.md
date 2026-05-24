# Test Plan - Treatment Plan Generator MVP

## System Status ✓
All critical components verified in place:
- ✅ **TreatmentPage component** - Premium healthcare design with Reju Stem Cells aesthetic
- ✅ **UploadForm component** - Fixed for server-side rendering with useMemo window check
- ✅ **API route** - Medical data protection rules in system prompt
- ✅ **Slug generation** - Patient name + random suffix (e.g., john-smith-abc123)
- ✅ **Home page** - force-dynamic export to prevent static prerendering
- ✅ **Vercel config** - serverless function memory and duration settings
- ✅ **Environment variables** - .env.local configured

## Development Server
**URL:** http://localhost:3000 (or 3001 if 3000 in use)  
**Status:** Running  
**Log:** `.next/dev/server.log`

---

## Test Cases

### Test 1: Home Page Load
**Objective:** Verify home page renders without errors and displays upload form

**Steps:**
1. Open http://localhost:3000 in browser
2. Verify page loads with premium dark theme (Obsidian & Lime glassmorphism)
3. Verify upload form is visible with "DROP PDF HERE" prompt
4. Check for any console errors

**Expected Result:**
- Page loads instantly
- No TypeScript/React errors
- Upload form interactive (drag-drop active on hover)

---

### Test 2: PDF Upload & AI Processing
**Objective:** Test complete end-to-end flow with sample PDF

**Prerequisites:**
- Sample treatment plan PDF with:
  * Patient name
  * Treatment title
  * Medical details (injection protocols, dosages, schedules)
  * Pricing information

**Steps:**
1. Open http://localhost:3000
2. Click or drag-drop PDF onto upload form
3. Click "Generate Treatment Plan" button
4. Wait for processing (30-60 seconds)
5. Verify success state with generated URL

**Expected Result:**
- Loading state shows "GENERATING..." with spinner
- Success state displays generated slug like: `/p/[patient-name]-[random]`
- URL is copyable
- NO modification of medical data in the output

---

### Test 3: Verify Medical Data Protection
**Objective:** Ensure AI did NOT modify critical medical information

**Steps:**
1. After PDF upload completes, check Supabase table `treatment_pages`
2. Compare columns in Supabase:
   - `raw_extracted_text` (original PDF text)
   - `treatment_details` (AI-processed text)
3. Manually verify these match character-for-character:
   - Injection protocols (needle gauge, depths, angles)
   - Dosage values (exact numbers and units)
   - Drug names and formulations
   - Treatment schedules and timing
   - Contraindications and warnings

**Expected Result:**
- All critical medical fields preserved EXACTLY
- Only formatting/organization improved
- No invented or altered medical data

---

### Test 4: Public Treatment Page Rendering
**Objective:** Verify shareable page displays correctly with premium design

**Steps:**
1. Copy generated slug from Test 2 success state
2. Navigate to `http://localhost:3000/p/[slug]`
3. Verify page renders with:
   - Hero section with treatment title
   - Patient name displayed
   - Treatment Overview section (summary)
   - Treatment Protocol & Details section (with preserved line breaks)
   - Investment section with pricing and Stripe payment button
   - Next Steps section (numbered 1-3)
   - Footer with evidence-based message

**Expected Result:**
- Clean white/gray/blue premium healthcare aesthetic
- All medical details visible and unmodified
- Pricing displayed correctly
- Stripe payment button is clickable
- Mobile responsive (test on mobile viewport)

---

### Test 5: Stripe Payment Integration
**Objective:** Test payment link functionality

**Prerequisites:**
- Stripe account configured in .env.local
- Test API key (sk_test_...)

**Steps:**
1. On public treatment page, click "Begin Treatment Process" button
2. Verify redirected to Stripe payment page
3. Review Stripe dashboard:
   - New Price created with treatment title and correct amount
   - New Payment Link created
   - Link metadata includes correct plan details

**Expected Result:**
- Stripe payment page loads (do NOT complete payment)
- Price amount matches treatment cost
- Payment link configured correctly
- Success redirect URL points to `/p/[slug]?success=true`

---

### Test 6: 404 Handling
**Objective:** Verify missing treatment pages handled gracefully

**Steps:**
1. Navigate to http://localhost:3000/p/nonexistent-slug
2. Verify appropriate error page displays

**Expected Result:**
- Next.js 404 page or custom error message
- No server errors in console

---

### Test 7: Medical Data Accuracy - Detailed
**Objective:** Spot-check AI system prompt compliance

**Steps with sample medical data:**
1. Upload PDF containing:
   ```
   Injection Protocol:
   - 25 gauge needle, 2.5cm depth, 45-degree approach
   - 5mL exosome solution at 2×10⁶ concentration
   - Dosage: 250mg per injection
   - Schedule: Weekly for 8 weeks
   ```

2. After AI processes, verify in `treatment_details` field:
   - Exact needle gauge: 25 gauge ✓
   - Exact depth: 2.5cm ✓
   - Exact angle: 45-degree ✓
   - Exact exosome concentration: 2×10⁶ ✓
   - Exact dosage: 250mg ✓
   - Exact schedule: Weekly for 8 weeks ✓

**Expected Result:**
- All values preserved exactly
- Only formatting improved (section headers added, line breaks organized)
- No numerical alterations

---

## Deployment Checklist (when ready for Vercel)

- [ ] Environment variables set in Vercel project settings:
  - [ ] NEXT_PUBLIC_SUPABASE_URL
  - [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
  - [ ] SUPABASE_SERVICE_ROLE_KEY
  - [ ] OPENAI_API_KEY
  - [ ] STRIPE_SECRET_KEY
  - [ ] NEXT_PUBLIC_APP_URL (set to your Vercel domain)

- [ ] Supabase:
  - [ ] Schema deployed (`supabase/schema.sql`)
  - [ ] RLS policies enabled
  - [ ] Connection string working from Vercel serverless region

- [ ] Stripe:
  - [ ] Test mode API keys configured
  - [ ] Payment link creation tested in test mode
  - [ ] Webhook endpoints configured (optional)

- [ ] Build verification:
  - [ ] `npm run build` completes without errors
  - [ ] No secrets leaked in `.next` output

---

## Known Issues & Workarounds

| Issue | Status | Workaround |
|-------|--------|-----------|
| Port 3000 in use | Expected | Dev server automatically uses 3001 |
| Window ref error in SSR | ✅ Fixed | useMemo hook in UploadForm |
| Static prerendering SSR error | ✅ Fixed | force-dynamic export on home page |

---

## Notes for Tester

1. **Medical Data Protection**: This system is designed with CRITICAL medical data integrity. Before deploying to production, a medical compliance officer should review the MEDICAL_DATA_PROTECTION.md document.

2. **Premium Design**: Treatment pages intentionally match Reju Stem Cells' aesthetic (premium, clean, trustworthy). Visual consistency with reference site should be verified.

3. **AI Accuracy**: The gpt-4o-mini model + temperature 0.2 provides high accuracy for medical data extraction. If you encounter data modifications, please report with the original PDF and extracted output for debugging.

4. **Stripe Test Mode**: Use test card `4242 4242 4242 4242` with any future expiry and any 3-digit CVC for testing payments.

---

## Quick Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run build output locally
npm run start

# Check types
npx tsc --noEmit
```

---

**Last Updated:** 2026-05-23  
**Next Steps:** Run Test 1 (Home Page Load) to verify local development environment
