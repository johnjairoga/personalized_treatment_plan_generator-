import type { Metadata } from "next";
import { Outfit, Reenie_Beanie } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const reenie = Reenie_Beanie({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-reenie",
});

export const metadata: Metadata = {
  title: "TreatmentPlan.ai",
  description: "Transform treatment plan PDFs into shareable pages with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${reenie.variable}`}>
      <body className="relative min-h-screen font-outfit">
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
