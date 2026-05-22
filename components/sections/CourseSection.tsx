const WA_CURSO = "https://wa.me/5491150123469?text=Hola%2C%20quiero%20info%20sobre%20el%20Curso%20de%20Entrenador%20en%20Musculaci%C3%B3n%20y%20Alto%20Rendimiento";

export default function CourseSection() {
  return (
    <section className="py-14 bg-[#0d0d0d]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal">
          <div className="relative rounded-2xl overflow-hidden border border-[#7EEF08]/25 bg-gradient-to-br from-[#0d0d0d] via-[#111] to-black">

            {/* Green accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7EEF08] to-transparent" />
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#7EEF08]/5 rounded-full blur-3xl" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-0 items-stretch">

              {/* Left — info */}
              <div className="p-7 lg:p-10">
                <div className="inline-flex items-center gap-2 border border-[#7EEF08]/30 rounded-full px-3 py-1 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7EEF08] animate-pulse" />
                  <span className="text-[#7EEF08] text-xs font-bold uppercase tracking-widest">Instituto Warriors Sport</span>
                </div>

                <h2 className="font-display text-3xl lg:text-5xl text-white tracking-wider leading-none mb-2">
                  CURSO DE<br />
                  <span className="text-[#7EEF08] green-glow">ENTRENADOR</span>
                </h2>
                <p className="font-display text-xl lg:text-2xl text-white/65 tracking-wide mb-5">
                  EN MUSCULACIÓN Y ALTO RENDIMIENTO
                </p>

                <div className="grid grid-cols-2 gap-2.5 mb-7">
                  {[
                    { icon: "📅", label: "Inicio",    value: "Marzo 2026" },
                    { icon: "⏱️", label: "Duración",  value: "10 meses" },
                    { icon: "📚", label: "Clases",    value: "Sáb. 09:00–11:00" },
                    { icon: "🏭", label: "Único con", value: "Pasantías laborales" },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="bg-black/40 rounded-xl p-3 border border-[#1e1e1e]">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-sm">{icon}</span>
                        <span className="text-white/35 text-[10px] uppercase tracking-widest">{label}</span>
                      </div>
                      <p className="text-white text-xs font-semibold">{value}</p>
                    </div>
                  ))}
                </div>

                <a
                  href={WA_CURSO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#7EEF08] hover:bg-[#5abc06] text-black font-bold px-7 py-3.5 rounded-xl text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 shadow-lg shadow-[#7EEF08]/20"
                >
                  Enviar mensaje por WhatsApp
                </a>
              </div>

              {/* Right — highlights */}
              <div className="bg-[#7EEF08]/5 border-l border-[#7EEF08]/15 p-7 lg:p-10 flex flex-col justify-center gap-5">
                <div>
                  <p className="text-[#7EEF08] text-xs font-bold uppercase tracking-widest mb-3">Por qué elegir Warriors</p>
                  <ul className="space-y-2.5">
                    {[
                      "Único curso con pasantías para experiencia laboral real",
                      "Dictado por profesionales activos del rubro",
                      "Formación práctica desde el primer día",
                      "Título y certificación al finalizar",
                      "Red de networking con la industria del fitness",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-[#7EEF08] mt-0.5 shrink-0">✓</span>
                        <span className="text-white/65 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-black/40 border border-[#1e1e1e] p-4">
                  <p className="text-white/35 text-xs uppercase tracking-widest mb-1">Contacto directo</p>
                  <a
                    href={WA_CURSO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7EEF08] font-bold text-base hover:underline"
                  >
                    11 5012-3469
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
