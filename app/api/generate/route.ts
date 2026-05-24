export const runtime = "nodejs";
export const maxDuration = 60;

import { getSupabaseAdmin } from "@/lib/supabase";
import { getOpenAI } from "@/lib/openai";
import { getStripe } from "@/lib/stripe";
import { generateSlug } from "@/utils/slug";
import type { ExtractedPlanData } from "@/lib/types";
import { getHtmlTemplate, fillTemplate } from "@/lib/template";


const SYSTEM_PROMPT_EXTRACTION = `You are a medical document parser for regenerative medicine treatment plans.
The user will provide complete raw text extracted from a treatment plan PDF.
Your task is to extract structured data about the patient, treatment options, and IV therapy components.

CRITICAL REQUIREMENTS:
1. Extract the TOTAL COST for each treatment option from the document
2. Find all treatment plans/options offered in the document
3. Extract micronutrient therapy components with descriptions
4. Preserve all medical information EXACTLY as stated in the source document
5. If information is not found, use "N/A" for strings or 0 for numbers - NEVER invent data

Return ONLY a valid JSON object with this exact structure:

{
  "patient_name": "Full name of the patient (string). If not found, use 'Patient'.",
  "patient_email": "Patient email if found, otherwise empty string.",
  "company": "Medical company or clinic name if mentioned, otherwise empty string.",
  "treatment_overview": "A 2-3 sentence overview of the regenerative care approach (string). Professional, calm, reassuring tone.",
  "treatment_options": [
    {
      "title": "Clear, professional title for this treatment option (string)",
      "duration": "Treatment duration and schedule (string). Preserve exact timing from document.",
      "stem_cell_quantity": "Exact stem cell quantity as stated in document (string). e.g., '5 million cells', 'N/A' if not found.",
      "exosome_quantity": "Exact exosome quantity as stated in document (string). e.g., '2.5 billion exosomes', 'N/A' if not found.",
      "micronutrient_therapy": "Micronutrient components if included (string). Preserve exact formulations from document. Use 'N/A' if not mentioned.",
      "protocol_details": "Step-by-step protocol breakdown (string). PRESERVE injection protocols, dosages, and sequences EXACTLY as written from the document.",
      "pricing": "TOTAL COST for this treatment option as a number (number, NOT string). Search document for 'total cost', 'total price', 'investment', 'cost', or 'price'. Extract ONLY the numeric value (no currency symbols). Example: 8303, 19847, 27709. Use 0 if absolutely not found.",
      "recommended": "Boolean - mark as true if document indicates this is the primary/recommended option"
    }
  ],
  "micronutrient_therapy": [
    {
      "name": "Name of micronutrient or component (string)",
      "emoji": "Relevant emoji for this component (string)",
      "description": "Brief description of benefits and purpose (string)"
    }
  ]
}

PRICING EXTRACTION RULES (CRITICAL):
- Search the entire document for "total cost", "total price", "investment", "cost", or "price"
- Extract the EXACT numeric value
- Remove any currency symbols ($, €, etc.) and commas
- Examples: if PDF says "$8,303" extract as 8303; if "€19,847" extract as 19847
- This value will be multiplied by 100 for Stripe processing
- If price is per option or per package, that is the "total cost"
- Never guess. Use 0 if pricing cannot be found in the document.

MEDICAL DATA INTEGRITY RULES:
- NEVER modify, alter, summarize, or rewrite critical medical information
- PRESERVE all medical protocols, dosages, and components EXACTLY as written
- If information is missing, use "N/A" or 0 - do NOT fabricate or estimate
- This is a medical document - accuracy is critical

Output Requirements:
- Return ONLY the JSON object. No markdown, no explanation, no code fences.
- Ensure valid JSON format - all strings must be properly quoted
- All values must be strings EXCEPT: pricing (number) and recommended (boolean)
- Pricing MUST be a number type with no currency symbols or commas (e.g., 8303, not "8303" or "$8,303")`;


export async function POST(request: Request) {
  try {
    // Polyfill Promise.try for Node.js versions that may not have it
    if (typeof (Promise as any).try === "undefined") {
      (Promise as any).try = function (callback: () => any) {
        return new Promise((resolve, reject) => {
          try {
            resolve(callback());
          } catch (e) {
            reject(e);
          }
        });
      };
    }

    const formData = await request.formData();
    const file = formData.get("pdf") as File | null;

    if (!file || file.type !== "application/pdf") {
      return Response.json(
        { error: "Invalid file. Please upload a PDF." },
        { status: 400 }
      );
    }

    // Extract PDF text
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    let extractedText = "";

    try {
      // Use dynamic require to avoid webpack bundling issues
      const PDFParse = require("pdf-parse");

      const parser = new PDFParse({ data: Buffer.from(uint8Array), max: 0 });
      const pdfData = await parser.text();
      extractedText = pdfData || "";
    } catch (extractError) {
      console.error("PDF extraction error:", extractError);
      throw new Error("Could not extract readable text from PDF. Ensure it is a valid text-based PDF.");
    }

    if (!extractedText || extractedText.trim().length < 50) {
      return Response.json(
        { error: "Could not extract readable text from PDF. Ensure it is a valid text-based PDF." },
        { status: 422 }
      );
    }

    // CALL 1: Extract structured data from complete PDF text
    const openaiForExtraction = getOpenAI();
    const extractionCompletion = await openaiForExtraction.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT_EXTRACTION,
        },
        {
          role: "user",
          content: `Here is the complete treatment plan text:\n\n${extractedText}`,
        },
      ],
      temperature: 0.2,
    });

    const extractedJson = JSON.parse(extractionCompletion.choices[0].message.content ?? "{}") as ExtractedPlanData;

    // Guard: at least one treatment option must have positive pricing
    const hasValidPricing = extractedJson.treatment_options.some(opt => opt.pricing > 0);
    if (!hasValidPricing) {
      return Response.json(
        { error: "Could not determine valid pricing from this document. Please ensure the PDF contains pricing information." },
        { status: 422 }
      );
    }

    // Log extracted pricing for verification
    console.log("=== PRICING EXTRACTION VERIFICATION ===");
    extractedJson.treatment_options.forEach((option, idx) => {
      console.log(`Option ${idx + 1}: "${option.title}"`);
      console.log(`  Extracted Price (from PDF): ${option.pricing}`);
      console.log(`  Type Check: ${typeof option.pricing}`);
      if (option.pricing > 0) {
        const priceInCents = Math.round(option.pricing * 100);
        console.log(`  Stripe Cents (price × 100): ${priceInCents}`);
        console.log(`  Stripe Amount (in USD): $${(priceInCents / 100).toFixed(2)}`);
      }
    });
    console.log("=====================================\n");

    // Create Stripe payment links for each treatment option
    const stripe = getStripe();

    const treatmentOptionsWithStripe = await Promise.all(
      extractedJson.treatment_options.map(async (option) => {
        let stripeLink = "";
        if (option.pricing > 0) {
          const priceInCents = Math.round(option.pricing * 100);
          const price = await stripe.prices.create({
            currency: "usd",
            unit_amount: priceInCents,
            product_data: { name: option.title },
          });
          console.log(`✓ Stripe Price Created for "${option.title}": ${priceInCents} cents ($${(priceInCents / 100).toFixed(2)})`);
          const paymentLink = await stripe.paymentLinks.create({
            line_items: [{ price: price.id, quantity: 1 }],
            payment_method_types: ["card"],
            after_completion: { type: "redirect", redirect: { url: `${process.env.NEXT_PUBLIC_APP_URL}/?payment_success=true` } },
          });
          stripeLink = paymentLink.url;
          console.log(`✓ Payment Link Created: ${paymentLink.url}\n`);
        }
        return { ...option, stripe_payment_link: stripeLink, recommended: option.recommended || false };
      })
    );

    // Fill template with extracted data and Stripe links
    const template = getHtmlTemplate();
    const stripeLinksMap = Object.fromEntries(
      treatmentOptionsWithStripe.map((opt, idx) => [idx, opt.stripe_payment_link])
    );
    const finalHtml = fillTemplate(template, {
      ...extractedJson,
      treatment_options: treatmentOptionsWithStripe,
      stripe_links: stripeLinksMap,
    });

    const planDataWithStripe = {
      ...extractedJson,
      treatment_options: treatmentOptionsWithStripe,
    };

    // Summary: Verify all pricing values match
    console.log("=== PAYMENT LINKS SUMMARY ===");
    treatmentOptionsWithStripe.forEach((option, idx) => {
      const originalPrice = extractedJson.treatment_options[idx].pricing;
      console.log(`${idx + 1}. ${option.title}`);
      console.log(`   Original extracted: ${originalPrice}`);
      console.log(`   Payment link: ${option.stripe_payment_link ? "✓ Created" : "✗ Not created"}`);
    });
    console.log("=============================\n");

    // Generate slug and insert into Supabase
    const slug = generateSlug(extractedJson.patient_name);
    const supabaseAdmin = getSupabaseAdmin();

    const insertData = {
      slug,
      patient_name: extractedJson.patient_name,
      patient_email: extractedJson.patient_email || null,
      company: extractedJson.company || null,
      treatment_overview: extractedJson.treatment_overview,
      treatment_options: treatmentOptionsWithStripe,
      extracted_json: planDataWithStripe,
      generated_html: finalHtml,
    };

    const { error: dbError } = await (supabaseAdmin as any)
      .from("treatment_pages")
      .insert(insertData);

    if (dbError) {
      console.error("Database error:", dbError);
      return Response.json(
        { error: "Failed to save treatment plan" },
        { status: 500 }
      );
    }

    return Response.json({ slug });
  } catch (error: unknown) {
    console.error("API error:", error);
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return Response.json({ error: message }, { status: 500 });
  }
}
