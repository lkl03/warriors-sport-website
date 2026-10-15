import { faqs } from "@/lib/faq";

/* Preguntas frecuentes con <details> nativo: el texto de cada respuesta está
   siempre en el HTML (Google y los buscadores con IA lo leen aunque esté
   plegado) y no necesita JavaScript. */
export default function FAQSection() {
  return (
    <section id="preguntas" className="py-24 bg-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10 reveal">
          <p className="text-[#7EEF08] text-xs font-bold uppercase tracking-[0.3em] mb-3">Resolvé tus dudas</p>
          <h2 className="font-display text-5xl lg:text-7xl text-white tracking-wider leading-none">
            PREGUNTAS <span className="text-[#7EEF08] green-glow">FRECUENTES</span>
          </h2>
        </div>

        <div className="space-y-3 reveal">
          {faqs.map(({ q, a }) => (
            <details
              key={q}
              className="group bg-[#0d0d0d] border border-[#1e1e1e] open:border-[#7EEF08]/30 rounded-xl transition-colors"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                <h3 className="text-white text-sm sm:text-base font-semibold leading-snug">{q}</h3>
                <span
                  aria-hidden
                  className="shrink-0 w-7 h-7 rounded-full border border-[#7EEF08]/40 text-[#7EEF08] flex items-center justify-center text-lg leading-none transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 -mt-1 text-white/60 text-sm leading-relaxed">{a}</p>
            </details>
          ))}
        </div>

      </div>
    </section>
  );
}
