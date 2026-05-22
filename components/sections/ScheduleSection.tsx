"use client";

/* ── Real schedule from Warriors Sport Arg ──────────────────────────────────
   Musculación: Lun–Sáb  (Mon–Fri 07–23h, Sat 08–18h)
                Dom opcional (09–12h, sin profe)
   Funcional:   Lun / Mié / Vie  19:00–20:00 · $50.000/mes
   Yoga:        Mar / Jue         19:00–20:00 · $50.000/mes
   ─────────────────────────────────────────────────────────────────────────── */

type Slot = { name: string; time: string; color: string };

type CalDay = {
  short: string;
  long: string;
  muscHours: string;
  slots: Slot[];
  optional?: boolean;
};

const calendarDays: CalDay[] = [
  { short: "LUN", long: "Lunes",      muscHours: "07–23h", slots: [{ name: "Funcional", time: "19–20h", color: "#7EEF08" }] },
  { short: "MAR", long: "Martes",     muscHours: "07–23h", slots: [{ name: "Yoga",      time: "19–20h", color: "#a3e635" }] },
  { short: "MIÉ", long: "Miércoles",  muscHours: "07–23h", slots: [{ name: "Funcional", time: "19–20h", color: "#7EEF08" }] },
  { short: "JUE", long: "Jueves",     muscHours: "07–23h", slots: [{ name: "Yoga",      time: "19–20h", color: "#a3e635" }] },
  { short: "VIE", long: "Viernes",    muscHours: "07–23h", slots: [{ name: "Funcional", time: "19–20h", color: "#7EEF08" }] },
  { short: "SÁB", long: "Sábado",     muscHours: "08–18h", slots: [] },
  { short: "DOM", long: "Domingo",    muscHours: "09–12h", slots: [], optional: true },
];

const classSummary = [
  {
    name: "Funcional",
    days: "Lun / Mié / Vie",
    time: "19:00 – 20:00 hs.",
    price: "$ 50.000 / mes",
    color: "#7EEF08",
    desc: "Entrenamiento de alta intensidad. Fuerza, movilidad y cardio.",
  },
  {
    name: "Yoga",
    days: "Mar / Jue",
    time: "19:00 – 20:00 hs.",
    price: "$ 50.000 / mes",
    color: "#a3e635",
    desc: "Conectá cuerpo y mente. Flexibilidad, postura y bienestar.",
  },
  {
    name: "Musculación",
    days: "Lun – Sáb",
    time: "Según día",
    price: "Consultá planes",
    color: "#ffffffcc",
    desc: "Sala libre con equipamiento premium. Instructores certificados.",
  },
];

export default function ScheduleSection() {
  return (
    <section id="horarios" className="py-24 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 reveal">
          <p className="text-[#7EEF08] text-xs font-bold uppercase tracking-[0.3em] mb-3">Planificá tu semana</p>
          <h2 className="font-display text-5xl lg:text-7xl text-white tracking-wider leading-none">
            HORARIOS &amp; <span className="text-[#7EEF08] green-glow">CLASES</span>
          </h2>
        </div>

        {/* ── Weekly calendar grid ── */}
        <div className="reveal mb-10">
          <div className="overflow-x-auto rounded-2xl border border-[#1e1e1e]">
            <div className="min-w-[560px]">

              {/* Day headers */}
              <div className="grid grid-cols-7 border-b border-[#1e1e1e]">
                {calendarDays.map((d) => (
                  <div
                    key={d.short}
                    className={`py-3 text-center border-r border-[#1e1e1e] last:border-r-0 ${d.optional ? "opacity-50" : ""}`}
                  >
                    <p className="font-display text-base lg:text-lg text-white tracking-wide">{d.short}</p>
                    {d.optional && (
                      <p className="text-[10px] text-white/30 uppercase tracking-widest leading-none mt-0.5">opt.</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Calendar body */}
              <div className="grid grid-cols-7">
                {calendarDays.map((d) => (
                  <div
                    key={d.short}
                    className={`border-r border-[#1e1e1e] last:border-r-0 p-2 flex flex-col gap-2 min-h-[130px] ${d.optional ? "opacity-50" : ""}`}
                  >
                    {/* Musculación block */}
                    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-2 text-center">
                      <p className="text-white/70 text-[11px] font-semibold leading-tight">Musc.</p>
                      <p className="text-white/35 text-[10px] leading-tight mt-0.5">{d.muscHours}</p>
                    </div>

                    {/* Activity slots */}
                    {d.slots.map((slot) => (
                      <div
                        key={slot.name}
                        className="rounded-lg p-2 text-center"
                        style={{ background: slot.color + "18", border: `1px solid ${slot.color}35` }}
                      >
                        <p className="text-[11px] font-bold leading-tight" style={{ color: slot.color }}>{slot.name}</p>
                        <p className="text-white/40 text-[10px] leading-tight mt-0.5">{slot.time}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 justify-center">
            {[
              { label: "Musculación libre", color: "#ffffff55" },
              { label: "Funcional (clase grupal)", color: "#7EEF08" },
              { label: "Yoga (clase grupal)", color: "#a3e635" },
              { label: "* Domingo sin profe", color: "#ffffff30" },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm shrink-0" style={{ background: color }} />
                <span className="text-white/35 text-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Class summary cards ── */}
        <div className="grid sm:grid-cols-3 gap-5 reveal">
          {classSummary.map((cls) => (
            <div
              key={cls.name}
              className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5 hover:border-[#2a2a2a] transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-2xl tracking-wide text-white">{cls.name.toUpperCase()}</h3>
                <span className="text-xs font-bold" style={{ color: cls.color }}>{cls.price}</span>
              </div>
              <p className="text-white/45 text-xs mb-4 leading-relaxed">{cls.desc}</p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-white/30 text-xs uppercase tracking-widest w-10">Días</span>
                  <span className="text-white/70 text-xs font-medium">{cls.days}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white/30 text-xs uppercase tracking-widest w-10">Hora</span>
                  <span className="text-white/70 text-xs font-medium">{cls.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10 reveal">
          <a
            href="https://wa.me/5491168272020?text=Hola%2C%20quiero%20info%20sobre%20los%20horarios%20y%20clases%20de%20Warriors%20Sport"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#7EEF08] hover:bg-[#5abc06] text-black font-bold px-10 py-4 rounded-xl text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 shadow-lg shadow-[#7EEF08]/20"
          >
            Consultar horarios por WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
