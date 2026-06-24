"use client";

import { useState } from "react";

/* ── Warriors Sport schedule ──────────────────────────────────────────────
   San Martín:  Lun–Vie 07–23h · Sáb 09–18h · Dom 08–12h (opt.)
   San Andrés:  Lun–Vie 08–22h · Sáb 09–13h · Dom cerrado
   ────────────────────────────────────────────────────────────────────────── */

type GroupClass = "Funcional" | "Yoga" | "Jumping" | "Arabe";
type SedeId = "sm" | "sa";

const GC_COLOR: Record<GroupClass, string> = {
  Funcional: "rgba(210,242,212,0.90)",
  Yoga:      "rgba(210,213,242,0.85)",
  Jumping:   "rgba(242,235,210,0.90)",
  Arabe:     "rgba(242,212,220,0.88)",
};

const GC_LABEL: Record<GroupClass, string> = {
  Funcional: "Funcional",
  Yoga:      "Yoga",
  Jumping:   "Jumping",
  Arabe:     "Árabe",
};

type CalDay = {
  short:      string;
  muscHours:  string;
  groupSlots: { name: GroupClass; time: string }[];
  optional?:  boolean;
  closed?:    boolean;
  todayIdx:   number;
};

const calendarDataBySede: Record<SedeId, CalDay[]> = {
  sm: [
    { short: "LUN", muscHours: "07–23h", groupSlots: [{ name: "Funcional", time: "19–20h" }, { name: "Arabe", time: "19h" }],                                            todayIdx: 0 },
    { short: "MAR", muscHours: "07–23h", groupSlots: [{ name: "Yoga",      time: "19–20h" }],                                                                            todayIdx: 1 },
    { short: "MIÉ", muscHours: "07–23h", groupSlots: [{ name: "Funcional", time: "19–20h" }, { name: "Arabe", time: "20h" }],                                            todayIdx: 2 },
    { short: "JUE", muscHours: "07–23h", groupSlots: [{ name: "Yoga",      time: "19–20h" }, { name: "Jumping", time: "20h" }, { name: "Arabe", time: "18h" }],          todayIdx: 3 },
    { short: "VIE", muscHours: "07–23h", groupSlots: [{ name: "Funcional", time: "19–20h" }],                                                                            todayIdx: 4 },
    { short: "SÁB", muscHours: "09–18h", groupSlots: [],                                                                                                                  todayIdx: 5 },
    { short: "DOM", muscHours: "08–12h", groupSlots: [], optional: true,                                                                                                   todayIdx: 6 },
  ],
  sa: [
    { short: "LUN", muscHours: "08–22h", groupSlots: [], todayIdx: 0 },
    { short: "MAR", muscHours: "08–22h", groupSlots: [], todayIdx: 1 },
    { short: "MIÉ", muscHours: "08–22h", groupSlots: [], todayIdx: 2 },
    { short: "JUE", muscHours: "08–22h", groupSlots: [], todayIdx: 3 },
    { short: "VIE", muscHours: "08–22h", groupSlots: [], todayIdx: 4 },
    { short: "SÁB", muscHours: "09–13h", groupSlots: [], todayIdx: 5 },
    { short: "DOM", muscHours: "Cerrado", groupSlots: [], optional: true, closed: true, todayIdx: 6 },
  ],
};

const muscCardBySede: Record<SedeId, { dias: string; hora: string }> = {
  sm: {
    dias: "Lun – Sáb + Dom opcional",
    hora: "Lun–Vie 07–23h · Sáb 09–18h",
  },
  sa: {
    dias: "Lun – Sáb (Dom cerrado)",
    hora: "Lun–Vie 08–22h · Sáb 09–13h",
  },
};

const waLinkBySede: Record<SedeId, string> = {
  sm: "https://wa.me/5491168272020?text=Hola%2C%20quiero%20info%20sobre%20los%20horarios%20de%20Warriors%20Sport%20San%20Mart%C3%ADn",
  sa: "https://wa.me/5491133199615?text=Hola%2C%20quiero%20info%20sobre%20los%20horarios%20de%20Warriors%20Sport%20San%20Andr%C3%A9s",
};

/* kept in data for future reactivation */
const groupClasses = [
  {
    name:      "Funcional" as GroupClass,
    display:   "Funcional",
    days:      "Lun / Mié / Vie",
    daysShort: "L / M / V",
    time:      "19:00 – 20:00 hs.",
    timeShort: "19 – 20h",
    price:     "$ 50.000 / mes",
    desc:      "Entrenamiento de alta intensidad. Fuerza, movilidad y cardio en una sola clase.",
  },
  {
    name:      "Yoga" as GroupClass,
    display:   "Yoga",
    days:      "Mar / Jue",
    daysShort: "Mar / Jue",
    time:      "19:00 – 20:00 hs.",
    timeShort: "19 – 20h",
    price:     "$ 50.000 / mes",
    desc:      "Conectá cuerpo y mente. Flexibilidad, postura y bienestar general.",
  },
  {
    name:      "Jumping" as GroupClass,
    display:   "Jumping Rebote",
    days:      "Lun / Jue",
    daysShort: "Lun / Jue",
    time:      "20:00 hs.",
    timeShort: "20h",
    price:     "$ 50.000 / mes",
    priceAlt:  "$ 10.000 / clase",
    desc:      "Cardio de alto impacto en trampolín. Diversión, quema calórica y mejora cardiovascular.",
  },
  {
    name:      "Arabe" as GroupClass,
    display:   "Árabe Fitness",
    days:      "Lun / Mié / Jue",
    daysShort: "L / M / J",
    time:      "Lun 19h · Mié 20h · Jue 18h",
    timeShort: "19·20·18h",
    price:     "$ 55.000 / mes",
    priceAlt:  "$ 10.000 / clase",
    desc:      "Fusión de danza árabe y fitness. Tonificación, ritmo y expresión corporal.",
  },
];

const jsDay    = typeof window !== "undefined" ? new Date().getDay() : -1;
const todayIdx = jsDay === 0 ? 6 : jsDay - 1;

export default function ScheduleSection() {
  const [added, setAdded] = useState<Set<GroupClass>>(new Set());
  const [sede,  setSede]  = useState<SedeId>("sm");

  const toggle = (cls: GroupClass) =>
    setAdded(prev => {
      const next = new Set(prev);
      next.has(cls) ? next.delete(cls) : next.add(cls);
      return next;
    });

  const calendarDays = calendarDataBySede[sede];
  const muscCard     = muscCardBySede[sede];

  return (
    <section id="horarios" className="py-24 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-8 reveal">
          <p className="text-[#7EEF08] text-xs font-bold uppercase tracking-[0.3em] mb-3">Planificá tu semana</p>
          <h2 className="font-display text-5xl lg:text-7xl text-white tracking-wider leading-none">
            HORARIOS &amp; <span className="text-[#7EEF08] green-glow">CLASES</span>
          </h2>
        </div>

        {/* Sede tabs */}
        <div className="flex justify-center mb-8 reveal">
          <div className="inline-flex bg-[#111] border border-[#1e1e1e] rounded-xl p-1 gap-1">
            {([{ id: "sm", label: "San Martín" }, { id: "sa", label: "San Andrés" }] as { id: SedeId; label: string }[]).map(s => (
              <button
                key={s.id}
                onClick={() => setSede(s.id)}
                className={`cursor-pointer px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-widest transition-all duration-200 ${
                  sede === s.id ? "bg-[#7EEF08] text-black" : "text-white/50 hover:text-white"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Weekly calendar ── */}
        <div className="reveal mb-5">

          {/* ── MOBILE: vertical pill-row list (< md) ── */}
          <div className="block md:hidden rounded-2xl border border-[#1e1e1e] overflow-hidden">
            {calendarDays.map((d, i) => {
              const isToday      = d.todayIdx === todayIdx;
              const visibleSlots = d.groupSlots.filter(s => added.has(s.name));
              return (
                <div
                  key={d.short}
                  className={`flex items-center gap-3 px-4 py-3
                    ${i < calendarDays.length - 1 ? "border-b border-[#1e1e1e]" : ""}
                    ${d.optional ? "opacity-50" : ""}
                    ${isToday ? "bg-[#7EEF08]/5" : ""}`}
                >
                  <div className="w-9 shrink-0 text-center">
                    <p className={`font-display text-sm tracking-wide leading-tight ${isToday ? "text-[#7EEF08]" : "text-white/70"}`}>
                      {d.short}
                    </p>
                    {isToday && <p className="text-[8px] text-[#7EEF08]/60 uppercase tracking-widest leading-none mt-0.5">hoy</p>}
                    {d.optional && !isToday && <p className="text-[8px] text-white/25 uppercase tracking-widest leading-none mt-0.5">opt.</p>}
                  </div>
                  <div className="flex flex-wrap gap-1.5 flex-1">
                    {d.closed ? (
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full leading-tight" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.30)" }}>
                        Cerrado
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full leading-tight" style={{ background: "#7EEF0815", border: "1px solid #7EEF0830", color: "#7EEF08" }}>
                        Musc. {d.muscHours}
                      </span>
                    )}
                    {visibleSlots.map(slot => (
                      <span
                        key={slot.name}
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full leading-tight transition-all duration-300"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.13)", color: GC_COLOR[slot.name] }}
                      >
                        {GC_LABEL[slot.name]} {slot.time}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── DESKTOP: 7-col grid (≥ md) ── */}
          <div className="hidden md:block overflow-x-auto rounded-2xl border border-[#1e1e1e]">
            <div className="min-w-[560px]">
              <div className="grid grid-cols-7 border-b border-[#1e1e1e]">
                {calendarDays.map(d => {
                  const isToday = d.todayIdx === todayIdx;
                  return (
                    <div
                      key={d.short}
                      className={`py-3 text-center border-r border-[#1e1e1e] last:border-r-0
                        ${d.optional ? "opacity-50" : ""}
                        ${isToday ? "bg-[#7EEF08]/8" : ""}`}
                    >
                      <p className={`font-display text-base lg:text-lg tracking-wide ${isToday ? "text-[#7EEF08]" : "text-white"}`}>{d.short}</p>
                      {isToday  && <p className="text-[9px] text-[#7EEF08]/70 uppercase tracking-widest leading-none">hoy</p>}
                      {d.optional && !isToday && <p className="text-[9px] text-white/25 uppercase tracking-widest leading-none mt-0.5">opt.</p>}
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-7">
                {calendarDays.map(d => {
                  const isToday      = d.todayIdx === todayIdx;
                  const visibleSlots = d.groupSlots.filter(s => added.has(s.name));
                  return (
                    <div
                      key={d.short}
                      className={`border-r border-[#1e1e1e] last:border-r-0 p-2 flex flex-col gap-1.5
                        ${d.optional ? "opacity-50" : ""}
                        ${isToday ? "bg-[#7EEF08]/5" : ""}`}
                      style={{ minHeight: 120 }}
                    >
                      {d.closed ? (
                        <div className="rounded-lg p-2 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)" }}>
                          <p className="text-[11px] font-bold leading-tight text-white/30">Cerrado</p>
                        </div>
                      ) : (
                        <div className="rounded-lg p-2 text-center" style={{ background: "#7EEF0815", border: "1px solid #7EEF0830" }}>
                          <p className="text-[11px] font-bold leading-tight text-[#7EEF08]">Musc.</p>
                          <p className="text-[#7EEF08]/45 text-[10px] leading-tight mt-0.5">{d.muscHours}</p>
                        </div>
                      )}
                      {visibleSlots.map(slot => (
                        <div
                          key={slot.name}
                          className="rounded-lg p-1.5 text-center transition-all duration-300"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.13)" }}
                        >
                          <p className="text-[10px] font-bold leading-tight" style={{ color: GC_COLOR[slot.name] }}>{GC_LABEL[slot.name]}</p>
                          <p className="text-white/30 text-[9px] leading-tight mt-0.5">{slot.time}</p>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 mt-3 px-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#7EEF08]/55" />
              <span className="text-white/30 text-[11px]">Musculación libre</span>
            </div>
          </div>
        </div>

        {/* ── Musculación card (full width) ── */}
        <div className="bg-[#111] rounded-2xl p-5 border border-[#7EEF08]/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7EEF08]/40 to-transparent" />
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-display text-2xl tracking-wide text-white leading-none">MUSCULACIÓN</h3>
            <span className="text-xs font-bold text-[#7EEF08] shrink-0 mt-0.5">Consultá planes</span>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-[#7EEF08]/10 border border-[#7EEF08]/25 rounded-full px-2.5 py-1 mb-3 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7EEF08] animate-pulse" />
            <span className="text-[#7EEF08] text-[10px] font-bold uppercase tracking-widest">Siempre disponible</span>
          </div>
          <p className="text-white/45 text-xs mb-4 leading-relaxed">
            Sala libre con equipamiento premium. Instructores certificados.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-8">
            <div className="flex items-start gap-2">
              <span className="text-white/25 text-xs uppercase tracking-widest w-10 shrink-0 pt-px">Días</span>
              <span className="text-white/70 text-xs font-medium">{muscCard.dias}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-white/25 text-xs uppercase tracking-widest w-10 shrink-0 pt-px">Hora</span>
              <span className="text-white/70 text-xs font-medium">{muscCard.hora}</span>
            </div>
          </div>
        </div>

        {/* Subtle classes hint */}
        <p className="text-center text-white/25 text-[11px] mt-5 italic tracking-wide">
          Consultá por clases y actividades especiales
        </p>

        {/* ── Group class cards — hidden, kept for future reactivation ── */}
        <div className="hidden">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 mt-4">
            <div className="lg:flex-1 grid grid-cols-2 gap-4">
              {groupClasses.map(cls => {
                const isOn  = added.has(cls.name);
                const color = GC_COLOR[cls.name];
                return (
                  <div key={cls.name} className={`bg-[#111] rounded-2xl p-3.5 md:p-4 border transition-colors duration-300 flex flex-col ${isOn ? "border-white/22" : "border-[#1e1e1e]"}`}>
                    <div className="flex items-start justify-between gap-1 mb-2">
                      <h3 className="font-display text-lg md:text-xl tracking-wide text-white leading-tight">{cls.display.toUpperCase()}</h3>
                      <div className="flex flex-col items-end shrink-0 ml-1">
                        <span className="text-[10px] md:text-xs font-bold leading-tight" style={{ color }}>{cls.price}</span>
                        {"priceAlt" in cls && cls.priceAlt && <span className="text-[9px] text-white/30 leading-tight">{cls.priceAlt}</span>}
                      </div>
                    </div>
                    <p className="text-white/40 text-[10px] mb-3 leading-relaxed hidden sm:block">{cls.desc}</p>
                    <div className="space-y-1 mb-3 flex-1">
                      <div className="flex items-start gap-1.5">
                        <span className="text-white/25 text-[10px] uppercase tracking-widest w-8 shrink-0 pt-px">Días</span>
                        <span className="text-white/70 text-[10px] font-medium leading-tight">
                          <span className="md:hidden">{cls.daysShort}</span>
                          <span className="hidden md:inline">{cls.days}</span>
                        </span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="text-white/25 text-[10px] uppercase tracking-widest w-8 shrink-0 pt-px">Hora</span>
                        <span className="text-white/70 text-[10px] font-medium leading-tight">
                          <span className="md:hidden">{cls.timeShort}</span>
                          <span className="hidden md:inline">{cls.time}</span>
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggle(cls.name)}
                      className="cursor-pointer w-full py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-200 border hover:scale-[1.02]"
                      style={{
                        background:  isOn ? "rgba(255,255,255,0.07)" : "transparent",
                        borderColor: isOn ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.10)",
                        color:       isOn ? color : "rgba(255,255,255,0.32)",
                      }}
                    >
                      <span className="sm:hidden">{isOn ? "✓ Agregada" : "+ Agregar"}</span>
                      <span className="hidden sm:inline">{isOn ? "✓ En el calendario" : "+ Agregar al calendario"}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href={waLinkBySede[sede]}
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
