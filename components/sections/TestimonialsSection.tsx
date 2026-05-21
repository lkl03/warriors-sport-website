const testimonials = [
  {
    name: "Rodrigo M.",
    role: "Miembro desde 2022",
    text: "Warriors cambió mi vida. Entré sin saber nada de boxeo y hoy compito a nivel amateur. El equipo de instructores es increíble.",
    stars: 5,
    avatar: "R",
    color: "#dc2626",
  },
  {
    name: "Sofía L.",
    role: "Miembro desde 2023",
    text: "El ambiente es lo mejor. Todo el mundo se apoya mutuamente. Las clases de Pilates y GAP son de otro nivel. ¡No me lo pierdo nunca!",
    stars: 5,
    avatar: "S",
    color: "#ec4899",
  },
  {
    name: "Federico A.",
    role: "Miembro desde 2021",
    text: "Probé muchos gimnasios en San Martín y ninguno se compara. Las instalaciones, los instructores y la comunidad hacen que siempre quieras volver.",
    stars: 5,
    avatar: "F",
    color: "#f59e0b",
  },
  {
    name: "Valentina R.",
    role: "Miembro desde 2024",
    text: "Empecé con CrossFit desde cero y en 3 meses noté un cambio enorme. Los instructores te guían perfecto y nunca te sentís perdida.",
    stars: 5,
    avatar: "V",
    color: "#3b82f6",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <p className="text-[#dc2626] text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Lo que dicen
          </p>
          <h2 className="font-display text-5xl lg:text-7xl text-white tracking-wider leading-none">
            NUESTRA <span className="text-[#dc2626]">COMUNIDAD</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`reveal reveal-delay-${i + 1} bg-[#111] border border-[#1a1a1a] rounded-2xl p-6 flex flex-col gap-4 hover:border-[#252525] transition-colors duration-300`}
            >
              <div className="flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <span key={j} className="text-[#f59e0b] text-sm">★</span>
                ))}
              </div>
              <p className="text-white/65 text-sm leading-relaxed flex-1">"{t.text}"</p>
              <div className="flex items-center gap-3 mt-2">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ background: t.color + "30", border: `1px solid ${t.color}40` }}
                >
                  <span style={{ color: t.color }}>{t.avatar}</span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-white/35 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
