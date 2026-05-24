# Vercel Deployment Guide

## Pre-Deployment Checklist

### 1. Environment Variables
Add these to your Vercel project settings (Settings → Environment Variables):

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
OPENAI_API_KEY=sk-proj-...
STRIPE_SECRET_KEY=sk_live_... (or sk_test_...)
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

**Important:** Set the `NEXT_PUBLIC_APP_URL` to your actual Vercel domain (e.g., `https://treatment-plan.vercel.app`)

### 2. Deployment Steps

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push
   ```

2. **Connect to Vercel:**
   - Go to https://vercel.com
   - Import your Git repository
   - Select this project

3. **Configure Project:**
   - Framework: Next.js
   - Root Directory: (leave default)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Add Environment Variables:**
   - Copy all variables from the checklist above
   - Paste into Vercel's Environment Variables section
   - Make sure `NEXT_PUBLIC_*` variables are accessible on the client

5. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)

### 3. Post-Deployment

After deployment completes:

1. **Update Stripe Webhook URLs** (if using webhooks):
   - Go to Stripe Dashboard → Webhooks
   - Update endpoint URL to your Vercel domain

2. **Test Upload Flow:**
   - Visit your deployed URL
   - Upload a test PDF
   - Verify the treatment page is created
   - Check that the Stripe payment link works

3. **Monitor Logs:**
   - Vercel Dashboard → Functions → Logs
   - Check `/api/generate` logs for any errors

### 4. Important Notes

- **PDF Processing:** `pdf-parse` requires Node.js runtime. This is already configured with `export const runtime = "nodejs"` in the API route.
- **Timeouts:** Maximum timeout on Vercel Hobby is 60 seconds. The API route has `export const maxDuration = 60` to match this limit.
- **Database:** Ensure Supabase project is accessible from Vercel (no IP whitelist blocking)
- **API Keys:** Never commit `.env.local` to Git. Use Vercel's environment variables only.

### 5. Troubleshooting

**Error: "pdf-parse not found"**
- This is resolved by having `runtime = "nodejs"` in the API route
- Ensure `pdf-parse` is in `package.json` dependencies

**Error: "Environment variable not found"**
- Verify variable is added to Vercel Settings → Environment Variables
- For `NEXT_PUBLIC_*` variables, redeploy after adding them
- For server-only variables, the build picks them up automatically

**Slow uploads:**
- PDF extraction can take 10-30 seconds depending on file size
- OpenAI API calls add 5-15 seconds
- Total time should be under 60 seconds

**Payment Link Redirect Issues:**
- After Stripe payment, user is redirected to `NEXT_PUBLIC_APP_URL/?payment_success=true`
- Update `NEXT_PUBLIC_APP_URL` to your production domain
- Consider adding a `/success` page to handle payment confirmation
