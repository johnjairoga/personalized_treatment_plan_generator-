import UploadForm from "@/components/UploadForm";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden" style={{ backgroundColor: "#FDFCF8" }}>
      {/* Floating blobs for visual interest */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-[120px] opacity-40 pointer-events-none" style={{ background: "#FFE4E1" }} />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full blur-[120px] opacity-40 pointer-events-none" style={{ background: "#E6E6FA" }} />

      <div className="relative z-10 w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#FFB7B2" }}>
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight" style={{ color: "#292524" }}>
            Treatment Plans
            <br />
            <span style={{ fontFamily: "var(--font-reenie)", color: "#FFB7B2" }} className="text-4xl md:text-5xl">
              Made Simple
            </span>
          </h1>
          <p className="text-lg" style={{ color: "#78716C" }}>
            Upload your PDF and get a shareable treatment page with payment integration
          </p>
        </div>

        {/* Upload Form */}
        <div className="pt-4">
          <UploadForm />
        </div>
      </div>
    </div>
  );
}
