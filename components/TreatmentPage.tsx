import type { TreatmentPage as TPlan } from "@/lib/types";

interface Props {
  plan: TPlan;
}

export default function TreatmentPage({ plan }: Props) {
  const options = plan.treatment_options || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 md:pt-32 pb-16 md:pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <span className="inline-block text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-4">
              Personalized Regenerative Care Plan
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
              Premium Treatment Options
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              {plan.treatment_overview}
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 mt-8">
            <span className="text-sm font-semibold text-slate-400">
              Patient: <span className="text-white">{plan.patient_name}</span>
            </span>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl -z-10" />
      </section>

      {/* Treatment Options Grid */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          {options.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">No treatment options available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {options.map((option, idx) => (
                <div
                  key={idx}
                  className={`relative group h-full transition-all duration-300 ${
                    option.recommended
                      ? "lg:col-span-1 lg:scale-105 lg:z-10"
                      : ""
                  }`}
                >
                  {/* Recommended Badge */}
                  {option.recommended && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                      <span className="inline-block bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 font-bold px-4 py-2 rounded-full text-sm uppercase tracking-wider shadow-lg">
                        ★ Recommended
                      </span>
                    </div>
                  )}

                  {/* Card Container */}
                  <div
                    className={`h-full rounded-2xl backdrop-blur-xl border transition-all duration-300 flex flex-col ${
                      option.recommended
                        ? "bg-gradient-to-br from-slate-800 to-slate-700 border-emerald-400/50 shadow-2xl shadow-emerald-500/20"
                        : "bg-slate-800/50 border-slate-700 hover:border-emerald-400/30 hover:shadow-xl hover:shadow-emerald-500/10"
                    }`}
                  >
                    {/* Header */}
                    <div className="p-8 border-b border-slate-700">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {option.title}
                      </h3>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex-1 space-y-6">
                      {/* Duration */}
                      {option.duration && option.duration !== "N/A" && (
                        <div>
                          <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                            Treatment Duration
                          </p>
                          <p className="text-slate-200">{option.duration}</p>
                        </div>
                      )}

                      {/* Stem Cell Quantity */}
                      {option.stem_cell_quantity &&
                        option.stem_cell_quantity !== "N/A" && (
                          <div>
                            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                              Stem Cell Quantity
                            </p>
                            <p className="text-slate-200 font-mono">
                              {option.stem_cell_quantity}
                            </p>
                          </div>
                        )}

                      {/* Exosome Quantity */}
                      {option.exosome_quantity &&
                        option.exosome_quantity !== "N/A" && (
                          <div>
                            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                              Exosome Quantity
                            </p>
                            <p className="text-slate-200 font-mono">
                              {option.exosome_quantity}
                            </p>
                          </div>
                        )}

                      {/* Micronutrient Therapy */}
                      {option.micronutrient_therapy &&
                        option.micronutrient_therapy !== "N/A" && (
                          <div>
                            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                              Micronutrient Therapy
                            </p>
                            <p className="text-slate-200 whitespace-pre-wrap text-sm">
                              {option.micronutrient_therapy}
                            </p>
                          </div>
                        )}

                      {/* Protocol Details */}
                      {option.protocol_details &&
                        option.protocol_details !== "N/A" && (
                          <div>
                            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                              Treatment Protocol
                            </p>
                            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                              <p className="text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">
                                {option.protocol_details}
                              </p>
                            </div>
                          </div>
                        )}
                    </div>

                    {/* Pricing & CTA */}
                    <div className="p-8 border-t border-slate-700 space-y-4">
                      {option.pricing > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                            Investment
                          </p>
                          <p className="text-4xl font-bold text-emerald-400">
                            ${option.pricing.toFixed(2)}
                          </p>
                        </div>
                      )}

                      {option.stripe_payment_link ? (
                        <a
                          href={option.stripe_payment_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`block w-full py-4 rounded-xl font-bold text-center transition-all duration-300 text-lg uppercase tracking-wider ${
                            option.recommended
                              ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-105"
                              : "bg-slate-700 text-white hover:bg-emerald-500 hover:text-slate-900"
                          }`}
                        >
                          Begin Treatment
                        </a>
                      ) : (
                        <button
                          disabled
                          className="w-full py-4 rounded-xl font-bold text-center text-slate-400 bg-slate-700 opacity-50 cursor-not-allowed"
                        >
                          Not Available
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Information Section */}
      <section className="px-6 md:px-12 py-16 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-slate-700 bg-slate-800/30 backdrop-blur-xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Next Steps
            </h2>
            <ol className="space-y-4">
              {[
                "Review the treatment options above",
                "Select the option that best matches your health goals",
                "Click 'Begin Treatment' to proceed with secure payment",
                "Our team will contact you to confirm details and answer questions",
              ].map((step, idx) => (
                <li key={idx} className="flex gap-4">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-emerald-500 text-white font-bold flex-shrink-0 text-sm">
                    {idx + 1}
                  </span>
                  <span className="text-slate-300 pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 px-6 md:px-12 py-8 md:py-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-slate-400">
            This personalized treatment plan is designed to support your
            long-term wellness goals using evidence-based regenerative medicine
            protocols.
          </p>
        </div>
      </footer>
    </div>
  );
}
