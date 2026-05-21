"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Musculación",
    tag: "Básico",
    monthly: "$ 25.000",
    annual:  "$ 20.000",
    description: "Acceso completo al área de pesas y musculación.",
    features: [
      "Sala de musculación libre",
      "Vestuarios y duchas",
      "Wi-Fi en instalaciones",
      "App Warriors",
    ],
    missing: ["Clases grupales", "Instructores personalizados", "Congelamiento de cuota"],
    highlight: false,
    cta: "Elegir plan",
  },
  {
    name: "Musculación + Clases",
    tag: "Más popular",
    monthly: "$ 35.000",
    annual:  "$ 28.000",
    description: "Todo lo del plan básico más acceso ilimitado a clases grupales.",
    features: [
      "Sala de musculación libre",
      "Clases grupales ilimitadas",
      "Vestuarios y duchas",
      "Wi-Fi en instalaciones",
      "App Warriors",
      "1 congelamiento por año",
    ],
    missing: ["Instructores personalizados"],
    highlight: true,
    cta: "Comenzar ahora",
  },
  {
    name: "All Access",
    tag: "Elite",
    monthly: "$ 48.000",
    annual:  "$ 38.000",
    description: "Acceso total + seguimiento personalizado con instructores.",
    features: [
      "Sala de musculación libre",
      "Clases grupales ilimitadas",
      "2 sesiones PT / mes",
      "Plan de entrenamiento personalizado",
      "Vestuarios y duchas",
      "Wi-Fi en instalaciones",
      "App Warriors",
      "Congelamientos ilimitados",
    ],
    missing: [],
    highlight: false,
    cta: "Elegir plan",
  },
];

export default function PlansSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="planes" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <p className="text-[#dc2626] text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Invertí en vos
          </p>
          <h2 className="font-display text-5xl lg:text-7xl text-white tracking-wider leading-none mb-4">
            NUESTROS <span className="text-[#dc2626]">PLANES</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-base mb-8">
            Elegí el plan que mejor se adapte a tus objetivos. Precios orientativos — consultá disponibilidad y promociones vigentes.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-[#111] border border-[#222] rounded-full p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                !annual ? "bg-[#dc2626] text-white shadow" : "text-white/50 hover:text-white"
              }`}
            >
              Mensual
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                annual ? "bg-[#dc2626] text-white shadow" : "text-white/50 hover:text-white"
              }`}
            >
              Anual
              <span className="ml-1.5 text-xs bg-[#f59e0b] text-black px-1.5 py-0.5 rounded-full font-bold">
                −20%
              </span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`reveal reveal-delay-${i + 1} relative flex flex-col rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${
                plan.highlight
                  ? "bg-[#dc2626] border-[#dc2626] shadow-2xl shadow-[#dc2626]/20"
                  : "bg-[#111] border-[#222] hover:border-[#333]"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#f59e0b] text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest whitespace-nowrap">
                  {plan.tag}
                </div>
              )}

              <div className="p-8 flex-1">
                {!plan.highlight && (
                  <span className="text-xs text-white/30 uppercase tracking-widest border border-white/10 rounded-full px-3 py-1 mb-4 inline-block">
                    {plan.tag}
                  </span>
                )}
                <h3 className={`font-display text-2xl tracking-wide mb-1 ${plan.highlight ? "text-white" : "text-white"}`}>
                  {plan.name.toUpperCase()}
                </h3>
                <p className={`text-sm mb-6 leading-relaxed ${plan.highlight ? "text-white/80" : "text-white/50"}`}>
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span className={`font-display text-5xl tracking-wide ${plan.highlight ? "text-white" : "text-white"}`}>
                      {annual ? plan.annual : plan.monthly}
                    </span>
                    <span className={`text-sm mb-2 ${plan.highlight ? "text-white/70" : "text-white/40"}`}>/mes</span>
                  </div>
                  {annual && (
                    <p className={`text-xs ${plan.highlight ? "text-white/70" : "text-white/40"}`}>
                      Facturado anualmente
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-4">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check
                        size={14}
                        className={`mt-0.5 shrink-0 ${plan.highlight ? "text-white" : "text-[#dc2626]"}`}
                      />
                      <span className={`text-sm ${plan.highlight ? "text-white/90" : "text-white/70"}`}>{f}</span>
                    </li>
                  ))}
                  {plan.missing.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 opacity-35">
                      <span className="w-3.5 h-3.5 mt-0.5 shrink-0 flex items-center justify-center">
                        <span className={`text-xs ${plan.highlight ? "text-white" : "text-white/50"}`}>—</span>
                      </span>
                      <span className={`text-sm line-through ${plan.highlight ? "text-white/60" : "text-white/40"}`}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-8 pb-8">
                <a
                  href="https://warriors.turnosweb.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center font-semibold py-3.5 rounded text-sm uppercase tracking-widest transition-all duration-200 ${
                    plan.highlight
                      ? "bg-white text-[#dc2626] hover:bg-white/90"
                      : "bg-[#dc2626] hover:bg-[#b91c1c] text-white"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-white/30 text-xs mt-8 reveal">
          * Precios orientativos en ARS. Consultá promociones vigentes y medios de pago disponibles.
        </p>
      </div>
    </section>
  );
}
