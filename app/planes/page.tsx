import PlansSection from "@/components/sections/PlansSection";
import CTASection from "@/components/sections/CTASection";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Planes | Warriors Sport San Martín",
  description: "Planes de membresía de Warriors Sport. Musculación, clases grupales y acceso total. Precios y beneficios.",
};

export default function PlanesPage() {
  return (
    <ScrollRevealProvider>
      {/* Page hero */}
      <section className="pt-32 pb-16 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#dc2626] text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Warriors Sport
          </p>
          <h1 className="font-display text-6xl lg:text-9xl text-white tracking-wider leading-none mb-4">
            MEMBRESIAS<br />
            <span className="text-[#dc2626]">Y PLANES</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl leading-relaxed">
            Invertí en vos. Encontrá el plan que se adapta a tus objetivos y tu estilo de vida.
          </p>
        </div>
      </section>

      <PlansSection />

      {/* FAQ strip */}
      <section className="py-16 bg-[#0d0d0d]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl text-white tracking-wider mb-8 text-center">
            PREGUNTAS <span className="text-[#dc2626]">FRECUENTES</span>
          </h2>
          <div className="space-y-4">
            {[
              { q: "¿Hay clases de prueba gratuitas?", a: "Sí. Podés reservar tu primera clase sin costo. Vení a conocer nuestras instalaciones y elegir la disciplina que más te guste." },
              { q: "¿Puedo cambiar de plan?", a: "Por supuesto. Podés actualizar o modificar tu plan en cualquier momento consultando en recepción." },
              { q: "¿Cuáles son los medios de pago?", a: "Aceptamos efectivo, tarjeta de débito y crédito. Consultá cuotas y promociones bancarias vigentes." },
              { q: "¿Qué pasa si no puedo asistir un mes?", a: "Según el plan, podés congelar tu membresía. Consultá las condiciones en recepción." },
            ].map(({ q, a }) => (
              <div key={q} className="bg-[#111] border border-[#1a1a1a] rounded-xl p-6">
                <p className="text-white font-semibold mb-2">{q}</p>
                <p className="text-white/50 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </ScrollRevealProvider>
  );
}
