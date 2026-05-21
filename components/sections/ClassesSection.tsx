import Link from "next/link";

const classes = [
  {
    name: "Boxeo",
    emoji: "🥊",
    description: "Técnica, potencia y acondicionamiento físico. Aprendé los fundamentos del boxeo y mejorá tu condición cardiovascular.",
    level: "Todos los niveles",
    intensity: 85,
    gradient: "from-[#dc2626]/25 to-[#7f1d1d]/10",
    border: "border-[#dc2626]/30",
    accent: "#dc2626",
  },
  {
    name: "CrossFit",
    emoji: "🏋️",
    description: "Entrenamiento funcional de alta intensidad que combina levantamiento de pesas, cardio y movimientos gimnásticos.",
    level: "Intermedio / Avanzado",
    intensity: 95,
    gradient: "from-[#f59e0b]/20 to-[#78350f]/10",
    border: "border-[#f59e0b]/30",
    accent: "#f59e0b",
  },
  {
    name: "Funcional",
    emoji: "⚡",
    description: "Movimientos naturales y funcionales para mejorar tu rendimiento diario. Fuerza, movilidad y coordinación en un solo entrenamiento.",
    level: "Todos los niveles",
    intensity: 75,
    gradient: "from-[#3b82f6]/20 to-[#1e3a5f]/10",
    border: "border-[#3b82f6]/30",
    accent: "#3b82f6",
  },
  {
    name: "Spinning",
    emoji: "🚴",
    description: "Cardio de alto impacto en bicicleta estacionaria con música y ritmo. Quemá calorías y mejorá tu resistencia.",
    level: "Todos los niveles",
    intensity: 90,
    gradient: "from-[#a855f7]/20 to-[#3b0764]/10",
    border: "border-[#a855f7]/30",
    accent: "#a855f7",
  },
  {
    name: "Pilates",
    emoji: "🧘",
    description: "Fortalecé el core, mejorá la postura y la flexibilidad con ejercicios de bajo impacto basados en el método Pilates.",
    level: "Principiante / Intermedio",
    intensity: 55,
    gradient: "from-[#10b981]/20 to-[#064e3b]/10",
    border: "border-[#10b981]/30",
    accent: "#10b981",
  },
  {
    name: "GAP",
    emoji: "🍑",
    description: "Entrenamiento específico de Glúteos, Abdomen y Piernas. Tonificá y fortalecé las zonas que más trabajan.",
    level: "Todos los niveles",
    intensity: 70,
    gradient: "from-[#ec4899]/20 to-[#500724]/10",
    border: "border-[#ec4899]/30",
    accent: "#ec4899",
  },
];

export default function ClassesSection() {
  return (
    <section id="clases" className="py-24 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="text-[#dc2626] text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Lo que ofrecemos
          </p>
          <h2 className="font-display text-5xl lg:text-7xl text-white tracking-wider leading-none mb-4">
            NUESTRAS <span className="text-[#dc2626]">CLASES</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-base">
            6 disciplinas diseñadas para todo nivel. Encontrá la que se adapta a tus objetivos.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {classes.map((cls, i) => (
            <div
              key={cls.name}
              className={`reveal reveal-delay-${(i % 3) + 1} group relative bg-gradient-to-br ${cls.gradient} border ${cls.border} rounded-2xl p-7 hover:scale-[1.02] hover:border-opacity-60 transition-all duration-300 overflow-hidden`}
            >
              {/* Background glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"
                style={{ background: cls.accent }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{cls.emoji}</span>
                  <span className="text-xs text-white/30 uppercase tracking-widest border border-white/10 rounded-full px-2 py-0.5">
                    {cls.level}
                  </span>
                </div>

                <h3 className="font-display text-3xl text-white tracking-wider mb-2">{cls.name.toUpperCase()}</h3>
                <p className="text-white/55 text-sm leading-relaxed mb-5">{cls.description}</p>

                {/* Intensity bar */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-white/30 text-xs uppercase tracking-widest">Intensidad</span>
                    <span className="text-xs font-semibold" style={{ color: cls.accent }}>{cls.intensity}%</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${cls.intensity}%`, background: cls.accent }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center reveal">
          <Link
            href="/clases"
            className="inline-flex items-center gap-2 border border-[#dc2626]/50 hover:border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] hover:text-white font-semibold px-8 py-3 rounded text-sm uppercase tracking-widest transition-all duration-200"
          >
            Ver horarios y detalles →
          </Link>
        </div>
      </div>
    </section>
  );
}
