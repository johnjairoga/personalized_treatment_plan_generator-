"use client";

import { useState, useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";

type Status = "idle" | "loading" | "success" | "error";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [slug, setSlug] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setFile(acceptedFiles[0]);
      setStatus("idle");
      setErrorMsg("");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
    maxSize: 10 * 1024 * 1024,
  });

  const handleGenerate = async () => {
    if (!file) return;
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Generation failed");
      }

      setSlug(data.slug);
      setStatus("success");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
      setStatus("error");
    }
  };

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/p/${slug}`;
  }, [slug]);

  const handleOpenLink = () => {
    window.open(shareUrl, "_blank");
  };

  return (
    <div className="w-full space-y-4">
      {/* IDLE & ERROR: Dropzone */}
      {(status === "idle" || status === "error") && (
        <div className="space-y-4">
          <div
            {...getRootProps()}
            className="p-12 text-center cursor-pointer transition-all duration-300 border-2 border-dashed rounded-3xl bg-white"
            style={{
              borderColor: isDragActive ? "#FFB7B2" : "rgba(41, 37, 36, 0.2)",
              backgroundColor: isDragActive ? "rgba(255, 183, 178, 0.05)" : "white",
              boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.05)"
            }}
          >
            <input {...getInputProps()} />
            <div className="space-y-4">
              <div className="text-5xl">📄</div>
              <div>
                <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: "#78716C" }}>
                  Drop PDF here or click
                </p>
                <p className="font-medium" style={{ color: "#292524" }}>
                  {file ? `Selected: ${file.name}` : "Upload your treatment plan PDF"}
                </p>
              </div>
              {!file && (
                <p className="text-sm" style={{ color: "#78716C" }}>
                  Max 10MB • text-based PDFs only
                </p>
              )}
            </div>
          </div>

          {status === "error" && (
            <div className="p-4 rounded-3xl border bg-red-50" style={{ borderColor: "#ffcccc" }}>
              <p className="text-sm" style={{ color: "#cc0000" }}>{errorMsg}</p>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={!file}
            className="w-full px-8 py-4 rounded-full font-bold transition-transform text-white text-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#FFB7B2", boxShadow: "0 4px 20px -2px rgba(255, 183, 178, 0.3)" }}
          >
            Generate Treatment Page
          </button>
        </div>
      )}

      {/* LOADING: Spinner */}
      {status === "loading" && (
        <div className="p-12 text-center space-y-6 rounded-3xl bg-white" style={{ boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.05)" }}>
          <div className="flex justify-center">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 animate-spin"
                style={{ borderColor: "rgba(41, 37, 36, 0.1)", borderTopColor: "#FFB7B2" }} />
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: "#78716C" }}>
              Processing...
            </p>
            <p className="text-sm" style={{ color: "#292524" }}>
              Extracting PDF, analyzing with AI, creating Stripe link...
            </p>
          </div>
        </div>
      )}

      {/* SUCCESS: Share link */}
      {status === "success" && (
        <div className="p-8 space-y-6 rounded-3xl bg-white" style={{ boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.05)" }}>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✨</span>
              <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: "#FFB7B2" }}>
                Success!
              </p>
            </div>
            <p className="font-medium" style={{ color: "#292524" }}>
              Your treatment page is ready to share
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 rounded-2xl px-4 py-3 text-sm focus:outline-none"
                style={{
                  backgroundColor: "#FDFCF8",
                  borderColor: "rgba(41, 37, 36, 0.1)",
                  border: "1px solid",
                  color: "#292524"
                }}
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                }}
                className="px-6 py-3 rounded-2xl font-semibold text-sm transition-colors"
                style={{
                  backgroundColor: "rgba(41, 37, 36, 0.05)",
                  color: "#292524"
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(41, 37, 36, 0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(41, 37, 36, 0.05)";
                }}
              >
                Copy
              </button>
            </div>

            <button
              onClick={handleOpenLink}
              className="w-full px-8 py-4 rounded-full font-bold transition-transform text-white hover:scale-105 active:scale-95"
              style={{ backgroundColor: "#FFB7B2", boxShadow: "0 4px 20px -2px rgba(255, 183, 178, 0.3)" }}
            >
              Open Patient Page
            </button>
          </div>

          <button
            onClick={() => {
              setFile(null);
              setStatus("idle");
              setSlug("");
            }}
            className="w-full py-3 rounded-2xl font-medium text-sm transition-colors"
            style={{
              backgroundColor: "rgba(41, 37, 36, 0.05)",
              color: "#292524"
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(41, 37, 36, 0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(41, 37, 36, 0.05)";
            }}
          >
            Generate Another
          </button>
        </div>
      )}
    </div>
  );
}
