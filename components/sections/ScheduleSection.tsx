"use client";

import { useState } from "react";

/* ── Real schedule from Warriors Sport Arg ──────────────────────────────────
   Musculación: Lun–Vie 07–23h · Sáb 08–18h · Dom 08–12h (opcional)
   Funcional:   Lun / Mié / Vie  19:00–20:00 · $50.000/mes
   Yoga:        Mar / Jue         19:00–20:00 · $50.000/mes
   ─────────────────────────────────────────────────────────────────────────── */

type Activity = "Musculación" | "Funcional" | "Yoga";

type Slot = { name: Activity; time: string; color: string };

type CalDay = {
  short: string;
  long:  string;
  muscHours: string;
  slots: Slot[];
  optional?: boolean;
  todayIdx: number; // Mon=0 … Sun=6
};

const calendarDays: CalDay[] = [
  { short: "LUN", long: "Lunes",     muscHours: "07–23h", slots: [{ name: "Funcional", time: "19–20h", color: "#7EEF08" }],  todayIdx: 0 },
  { short: "MAR", long: "Martes",    muscHours: "07–23h", slots: [{ name: "Yoga",      time: "19–20h", color: "#a3e635" }],  todayIdx: 1 },
  { short: "MIÉ", long: "Miércoles", muscHours: "07–23h", slots: [{ name: "Funcional", time: "19–20h", color: "#7EEF08" }],  todayIdx: 2 },
  { short: "JUE", long: "Jueves",    muscHours: "07–23h", slots: [{ name: "Yoga",      time: "19–20h", color: "#a3e635" }],  todayIdx: 3 },
  { short: "VIE", long: "Viernes",   muscHours: "07–23h", slots: [{ name: "Funcional", time: "19–20h", color: "#7EEF08" }],  todayIdx: 4 },
  { short: "SÁB", long: "Sábado",    muscHours: "08–18h", slots: [],                                                          todayIdx: 5 },
  { short: "DOM", long: "Domingo",   muscHours: "08–12h", slots: [], optional: true,                                          todayIdx: 6 },
];

const classSummary = [
  {
    name:  "Musculación" as Activity,
    days:  "Lun – Sáb + Dom opcional",
    time:  "Lun–Vie 07–23h · Sáb 08–18h",
    price: "Consultá planes",
    color: "rgba(255,255,255,0.75)",
    desc:  "Sala libre con equipamiento premium. Instructores certificados.",
  },
  {
    name:  "Funcional" as Activity,
    days:  "Lun / Mié / Vie",
    time:  "19:00 – 20:00 hs.",
    price: "$ 50.000 / mes",
    color: "#7EEF08",
    desc:  "Entrenamiento de alta intensidad. Fuerza, movilidad y cardio.",
  },
  {
    name:  "Yoga" as Activity,
    days:  "Mar / Jue",
    time:  "19:00 – 20:00 hs.",
    price: "$ 50.000 / mes",
    color: "#a3e635",
    desc:  "Conectá cuerpo y mente. Flexibilidad, postura y bienestar.",
  },
];

const activityColors: Record<Activity, string> = {
  Musculación: "rgba(255,255,255,0.75)",
  Funcional:   "#7EEF08",
  Yoga:        "#a3e635",
};

/* today: Mon=0 … Sun=6 (JS getDay returns 0=Sun so we adjust) */
const jsDay   = typeof window !== "undefined" ? new Date().getDay() : -1;
const todayIdx = jsDay === 0 ? 6 : jsDay - 1; // -1 = server render (no highlight)

export default function ScheduleSection() {
  const [active, setActive] = useState<Set<Activity>>(
    new Set(["Musculación", "Funcional", "Yoga"])
  );

  const toggle = (a: Activity) => {
    setActive(prev => {
      const next = new Set(prev);
      if (next.has(a)) next.delete(a); else next.add(a);
      return next;
    });
  };

  const visibleSummary = classSummary.filter(c => active.has(c.name));

  return (
    <section id="horarios" className="py-24 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 reveal">
          <p className="text-[#7EEF08] text-xs font-bold uppercase tracking-[0.3em] mb-3">Planificá tu semana</p>
          <h2 className="font-display text-5xl lg:text-7xl text-white tracking-wider leading-none">
            HORARIOS &amp; <span className="text-[#7EEF08] green-glow">CLASES</span>
          </h2>
        </div>

        {/* ── Activity filter chips ── */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 reveal">
          <span className="text-white/30 text-xs uppercase tracking-widest self-center mr-1">Filtrar:</span>
          {(["Musculación", "Funcional", "Yoga"] as Activity[]).map(a => {
            const on    = active.has(a);
            const color = activityColors[a];
            return (
              <button
                key={a}
                onClick={() => toggle(a)}
                className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-200 hover:scale-105"
                style={{
                  borderColor: on ? color : "rgba(255,255,255,0.12)",
                  background:  on ? color + "22" : "transparent",
                  color:       on ? color : "rgba(255,255,255,0.35)",
                }}
                aria-pressed={on}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full transition-colors duration-200"
                  style={{ background: on ? color : "rgba(255,255,255,0.2)" }}
                />
                {a}
              </button>
            );
          })}
        </div>

        {/* ── Weekly calendar grid ── */}
        <div className="reveal mb-6">
          <div className="overflow-x-auto rounded-2xl border border-[#1e1e1e]">
            <div className="min-w-[560px]">

              {/* Day headers */}
              <div className="grid grid-cols-7 border-b border-[#1e1e1e]">
                {calendarDays.map(d => {
                  const isToday = d.todayIdx === todayIdx;
                  return (
                    <div
                      key={d.short}
                      className={`py-3 text-center border-r border-[#1e1e1e] last:border-r-0 ${d.optional ? "opacity-50" : ""} ${isToday ? "bg-[#7EEF08]/8" : ""}`}
                    >
                      <p className={`font-display text-base lg:text-lg tracking-wide ${isToday ? "text-[#7EEF08]" : "text-white"}`}>
                        {d.short}
                      </p>
                      {isToday && (
                        <p className="text-[9px] text-[#7EEF08]/70 uppercase tracking-widest leading-none">hoy</p>
                      )}
                      {d.optional && !isToday && (
                        <p className="text-[9px] text-white/25 uppercase tracking-widest leading-none mt-0.5">opt.</p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Calendar body */}
              <div className="grid grid-cols-7">
                {calendarDays.map(d => {
                  const isToday = d.todayIdx === todayIdx;
                  const visSlots = d.slots.filter(s => active.has(s.name));
                  const showMusc = active.has("Musculación");
                  return (
                    <div
                      key={d.short}
                      className={`border-r border-[#1e1e1e] last:border-r-0 p-2 flex flex-col gap-2 min-h-[130px] transition-colors duration-200 ${d.optional ? "opacity-50" : ""} ${isToday ? "bg-[#7EEF08]/5" : ""}`}
                    >
                      {showMusc && (
                        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-2 text-center transition-all duration-200">
                          <p className="text-white/65 text-[11px] font-semibold leading-tight">Musc.</p>
                          <p className="text-white/30 text-[10px] leading-tight mt-0.5">{d.muscHours}</p>
                        </div>
                      )}
                      {visSlots.map(slot => (
                        <div
                          key={slot.name}
                          className="rounded-lg p-2 text-center transition-all duration-200"
                          style={{ background: slot.color + "18", border: `1px solid ${slot.color}35` }}
                        >
                          <p className="text-[11px] font-bold leading-tight" style={{ color: slot.color }}>{slot.name}</p>
                          <p className="text-white/40 text-[10px] leading-tight mt-0.5">{slot.time}</p>
                        </div>
                      ))}
                      {!showMusc && visSlots.length === 0 && (
                        <div className="flex-1 flex items-center justify-center">
                          <span className="text-white/10 text-[10px]">—</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-3 px-1">
            {[
              { label: "Musculación libre", color: "rgba(255,255,255,0.35)" },
              { label: "Funcional (clase grupal)", color: "#7EEF08" },
              { label: "Yoga (clase grupal)",      color: "#a3e635" },
              { label: "* Domingo sin profe",      color: "rgba(255,255,255,0.18)" },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: color }} />
                <span className="text-white/30 text-[11px]">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Class summary cards ── */}
        {visibleSummary.length > 0 ? (
          <div className={`grid gap-5 reveal transition-all duration-300 ${visibleSummary.length === 1 ? "sm:grid-cols-1 max-w-sm mx-auto" : visibleSummary.length === 2 ? "sm:grid-cols-2 max-w-2xl mx-auto" : "sm:grid-cols-3"}`}>
            {visibleSummary.map(cls => (
              <div
                key={cls.name}
                className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5 hover:border-[#2a2a2a] transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-display text-2xl tracking-wide text-white leading-none">{cls.name.toUpperCase()}</h3>
                  <span className="text-xs font-bold shrink-0 mt-0.5" style={{ color: cls.color }}>{cls.price}</span>
                </div>
                <p className="text-white/45 text-xs mb-4 leading-relaxed">{cls.desc}</p>
                <div className="space-y-1.5">
                  <div className="flex items-start gap-2">
                    <span className="text-white/30 text-xs uppercase tracking-widest w-10 shrink-0 pt-px">Días</span>
                    <span className="text-white/70 text-xs font-medium">{cls.days}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-white/30 text-xs uppercase tracking-widest w-10 shrink-0 pt-px">Hora</span>
                    <span className="text-white/70 text-xs font-medium">{cls.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 reveal">
            <p className="text-white/30 text-sm">Seleccioná al menos una actividad para ver el detalle.</p>
          </div>
        )}

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
