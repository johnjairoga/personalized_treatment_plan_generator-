export interface TreatmentOption {
  title: string;
  duration: string;
  stem_cell_quantity: string;
  exosome_quantity: string;
  micronutrient_therapy: string;
  protocol_details: string;
  pricing: number;
  recommended?: boolean;
  stripe_payment_link?: string;
}

export interface MicronutrientComponent {
  name: string;
  emoji: string;
  description: string;
}

export interface ExtractedPlanData {
  patient_name: string;
  patient_email: string;
  company: string;
  treatment_overview: string;
  treatment_options: TreatmentOption[];
  micronutrient_therapy: MicronutrientComponent[];
}

export interface TreatmentPage {
  id: string;
  slug: string;
  patient_name: string;
  patient_email?: string;
  company?: string;
  treatment_overview: string;
  treatment_options: TreatmentOption[];
  extracted_json?: ExtractedPlanData;
  generated_html?: string;
  raw_extracted_text?: string;
  created_at: string;
}
