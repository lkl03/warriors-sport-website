const WA_CURSO = "https://wa.me/5491150123469?text=Hola%2C%20quiero%20info%20sobre%20el%20Curso%20de%20Entrenador%20en%20Musculaci%C3%B3n%20y%20Alto%20Rendimiento%20%F0%9F%8F%8B%EF%B8%8F";

export default function CourseSection() {
  return (
    <section className="py-20 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal">
          <div className="relative rounded-3xl overflow-hidden border border-[#7EEF08]/25 bg-gradient-to-br from-[#0d0d0d] via-[#111] to-black">

            {/* Green accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#7EEF08] to-transparent" />
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#7EEF08]/5 rounded-full blur-3xl" />
            <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-[#7EEF08]/5 rounded-full blur-2xl" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-0 items-stretch">

              {/* Left — info */}
              <div className="p-8 lg:p-12">
                <div className="inline-flex items-center gap-2 border border-[#7EEF08]/30 rounded-full px-3 py-1 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7EEF08] animate-pulse" />
                  <span className="text-[#7EEF08] text-xs font-bold uppercase tracking-widest">Instituto Warriors Sport</span>
                </div>

                <h2 className="font-display text-4xl lg:text-6xl text-white tracking-wider leading-none mb-3">
                  CURSO DE<br />
                  <span className="text-[#7EEF08] green-glow">ENTRENADOR</span>
                </h2>
                <p className="font-display text-2xl lg:text-3xl text-white/70 tracking-wide mb-6">
                  EN MUSCULACIÓN Y ALTO RENDIMIENTO
                </p>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { icon: "📅", label: "Inicio", value: "Marzo 2026" },
                    { icon: "⏱️", label: "Duración", value: "10 meses" },
                    { icon: "📚", label: "Clases", value: "Sáb. 09:00 – 11:00 hs." },
                    { icon: "🏭", label: "Único con", value: "Pasantías laborales" },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="bg-black/40 rounded-xl p-3 border border-[#1e1e1e]">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span>{icon}</span>
                        <span className="text-white/35 text-xs uppercase tracking-widest">{label}</span>
                      </div>
                      <p className="text-white text-sm font-semibold">{value}</p>
                    </div>
                  ))}
                </div>

                <a
                  href={WA_CURSO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#7EEF08] hover:bg-[#5abc06] text-black font-bold px-8 py-4 rounded-xl text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 shadow-lg shadow-[#7EEF08]/20"
                >
                  💬 Consultar inscripción
                </a>
              </div>

              {/* Right — highlight card */}
              <div className="bg-[#7EEF08]/5 border-l border-[#7EEF08]/15 p-8 lg:p-12 flex flex-col justify-center gap-6">
                <div>
                  <p className="text-[#7EEF08] text-xs font-bold uppercase tracking-widest mb-3">¿Por qué elegir Warriors?</p>
                  <ul className="space-y-3">
                    {[
                      "Único curso con pasantías para experiencia laboral real",
                      "Dictado por profesionales activos del rubro",
                      "Formación práctica desde el primer día",
                      "Título y certificación al finalizar",
                      "Red de networking con la industria del fitness",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-[#7EEF08] mt-0.5 shrink-0">✓</span>
                        <span className="text-white/70 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-black/40 border border-[#1e1e1e] p-4">
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Contacto directo</p>
                  <a href={WA_CURSO} target="_blank" rel="noopener noreferrer" className="text-[#7EEF08] font-bold text-lg hover:underline">
                    📱 1150123469
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
