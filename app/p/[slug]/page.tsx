import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSupabaseServer } from "@/lib/supabase";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PublicTreatmentPage({ params }: Props) {
  const awaitedParams = await params;
  const supabaseServer = getSupabaseServer();
  const { data, error } = await supabaseServer
    .from("treatment_pages")
    .select("generated_html, patient_name")
    .eq("slug", awaitedParams.slug)
    .single();

  if (!data || error || !data.generated_html) {
    notFound();
  }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: data.generated_html }}
      suppressHydrationWarning
    />
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const awaitedParams = await params;
  const supabaseServer = getSupabaseServer();
  const { data } = await supabaseServer
    .from("treatment_pages")
    .select("patient_name, treatment_overview")
    .eq("slug", awaitedParams.slug)
    .single();

  return {
    title: `${data?.patient_name} — Treatment Plan`,
    description: data?.treatment_overview ?? "Personalized regenerative medicine treatment plan",
  };
}
