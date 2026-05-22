"use client";

import { useState } from "react";

/* ── Warriors Sport schedule ──────────────────────────────────────────────
   Musculación: always available — Lun–Vie 07–23h · Sáb 08–18h · Dom 08–12h (opt.)
   Funcional:   Lun / Mié / Vie  19:00–20:00 · $50.000/mes
   Yoga:        Mar / Jue         19:00–20:00 · $50.000/mes
   ────────────────────────────────────────────────────────────────────────── */

type GroupClass = "Funcional" | "Yoga";

/* Color scheme: Musculación = warriors green, group classes = off-white variants */
const GC_COLOR: Record<GroupClass, string> = {
  Funcional: "rgba(230,230,230,0.88)",
  Yoga:      "rgba(185,185,185,0.78)",
};

type CalDay = {
  short:      string;
  muscHours:  string;
  groupSlots: { name: GroupClass; time: string }[];
  optional?:  boolean;
  todayIdx:   number; // Mon=0 … Sun=6
};

const calendarDays: CalDay[] = [
  { short: "LUN", muscHours: "07–23h", groupSlots: [{ name: "Funcional", time: "19–20h" }], todayIdx: 0 },
  { short: "MAR", muscHours: "07–23h", groupSlots: [{ name: "Yoga",      time: "19–20h" }], todayIdx: 1 },
  { short: "MIÉ", muscHours: "07–23h", groupSlots: [{ name: "Funcional", time: "19–20h" }], todayIdx: 2 },
  { short: "JUE", muscHours: "07–23h", groupSlots: [{ name: "Yoga",      time: "19–20h" }], todayIdx: 3 },
  { short: "VIE", muscHours: "07–23h", groupSlots: [{ name: "Funcional", time: "19–20h" }], todayIdx: 4 },
  { short: "SÁB", muscHours: "08–18h", groupSlots: [],                                        todayIdx: 5 },
  { short: "DOM", muscHours: "08–12h", groupSlots: [], optional: true,                        todayIdx: 6 },
];

const groupClasses = [
  {
    name:  "Funcional" as GroupClass,
    days:  "Lun / Mié / Vie",
    time:  "19:00 – 20:00 hs.",
    price: "$ 50.000 / mes",
    desc:  "Entrenamiento de alta intensidad. Fuerza, movilidad y cardio en una sola clase.",
  },
  {
    name:  "Yoga" as GroupClass,
    days:  "Mar / Jue",
    time:  "19:00 – 20:00 hs.",
    price: "$ 50.000 / mes",
    desc:  "Conectá cuerpo y mente. Flexibilidad, postura y bienestar general.",
  },
];

/* Today index: Mon=0 … Sun=6 (JS getDay: 0=Sun) */
const jsDay    = typeof window !== "undefined" ? new Date().getDay() : -1;
const todayIdx = jsDay === 0 ? 6 : jsDay - 1;

export default function ScheduleSection() {
  /* "added" starts empty — calendar shows only Musculación by default.
     User adds group classes by clicking the card button (add-to-calendar UX). */
  const [added, setAdded] = useState<Set<GroupClass>>(new Set());

  const toggle = (cls: GroupClass) =>
    setAdded(prev => {
      const next = new Set(prev);
      next.has(cls) ? next.delete(cls) : next.add(cls);
      return next;
    });

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

        {/* ── Weekly calendar grid ── */}
        <div className="reveal mb-5">
          <div className="overflow-x-auto rounded-2xl border border-[#1e1e1e]">
            <div className="min-w-[560px]">

              {/* Day headers */}
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
                      <p className={`font-display text-base lg:text-lg tracking-wide ${isToday ? "text-[#7EEF08]" : "text-white"}`}>
                        {d.short}
                      </p>
                      {isToday  && <p className="text-[9px] text-[#7EEF08]/70 uppercase tracking-widest leading-none">hoy</p>}
                      {d.optional && !isToday && <p className="text-[9px] text-white/25 uppercase tracking-widest leading-none mt-0.5">opt.</p>}
                    </div>
                  );
                })}
              </div>

              {/* Calendar body */}
              <div className="grid grid-cols-7">
                {calendarDays.map(d => {
                  const isToday      = d.todayIdx === todayIdx;
                  const visibleSlots = d.groupSlots.filter(s => added.has(s.name));

                  return (
                    <div
                      key={d.short}
                      className={`border-r border-[#1e1e1e] last:border-r-0 p-2 flex flex-col gap-2 min-h-[130px]
                        ${d.optional ? "opacity-50" : ""}
                        ${isToday ? "bg-[#7EEF08]/5" : ""}`}
                    >
                      {/* Musculación — always visible, green */}
                      <div className="rounded-lg p-2 text-center" style={{ background: "#7EEF0815", border: "1px solid #7EEF0830" }}>
                        <p className="text-[11px] font-bold leading-tight text-[#7EEF08]">Musc.</p>
                        <p className="text-[#7EEF08]/45 text-[10px] leading-tight mt-0.5">{d.muscHours}</p>
                      </div>

                      {/* Group class slots — only if added */}
                      {visibleSlots.map(slot => (
                        <div
                          key={slot.name}
                          className="rounded-lg p-2 text-center transition-all duration-300"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.13)" }}
                        >
                          <p className="text-[11px] font-bold leading-tight" style={{ color: GC_COLOR[slot.name] }}>
                            {slot.name}
                          </p>
                          <p className="text-white/30 text-[10px] leading-tight mt-0.5">{slot.time}</p>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

          {/* Legend — dynamic */}
          <div className="flex flex-wrap items-center gap-4 mt-3 px-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#7EEF08]/55" />
              <span className="text-white/30 text-[11px]">Musculación libre</span>
            </div>
            {added.has("Funcional") && (
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: GC_COLOR.Funcional }} />
                <span className="text-white/30 text-[11px]">Funcional (clase grupal)</span>
              </div>
            )}
            {added.has("Yoga") && (
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: GC_COLOR.Yoga }} />
                <span className="text-white/30 text-[11px]">Yoga (clase grupal)</span>
              </div>
            )}
            {added.size < 2 && (
              <span className="text-white/18 text-[11px] italic">
                Agregá clases grupales para verlas arriba ↑
              </span>
            )}
          </div>
        </div>

        {/* ── Class cards ────────────────────────────────────────────────────────
            Always rendered in a stable wrapper — avoids the scroll-reveal bug
            where conditional unmount/remount leaves reveal class invisible.
            ─────────────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

          {/* Musculación — always on, green, "Siempre disponible" badge */}
          <div className="bg-[#111] rounded-2xl p-5 border border-[#7EEF08]/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7EEF08]/40 to-transparent" />
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-display text-2xl tracking-wide text-white leading-none">MUSCULACIÓN</h3>
              <span className="text-xs font-bold text-[#7EEF08] shrink-0 mt-0.5">Consultá planes</span>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-[#7EEF08]/10 border border-[#7EEF08]/25 rounded-full px-2.5 py-1 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7EEF08] animate-pulse" />
              <span className="text-[#7EEF08] text-[10px] font-bold uppercase tracking-widest">Siempre disponible</span>
            </div>
            <p className="text-white/45 text-xs mb-4 leading-relaxed">
              Sala libre con equipamiento premium. Instructores certificados.
            </p>
            <div className="space-y-1.5">
              <div className="flex items-start gap-2">
                <span className="text-white/25 text-xs uppercase tracking-widest w-10 shrink-0 pt-px">Días</span>
                <span className="text-white/70 text-xs font-medium">Lun – Sáb + Dom opcional</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-white/25 text-xs uppercase tracking-widest w-10 shrink-0 pt-px">Hora</span>
                <span className="text-white/70 text-xs font-medium">Lun–Vie 07–23h · Sáb 08–18h</span>
              </div>
            </div>
          </div>

          {/* Funcional & Yoga — "add to calendar" interaction */}
          {groupClasses.map(cls => {
            const isOn  = added.has(cls.name);
            const color = GC_COLOR[cls.name];
            return (
              <div
                key={cls.name}
                className={`bg-[#111] rounded-2xl p-5 border transition-colors duration-300 ${
                  isOn ? "border-white/22" : "border-[#1e1e1e]"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-display text-2xl tracking-wide text-white leading-none">{cls.name.toUpperCase()}</h3>
                  <span className="text-xs font-bold shrink-0 mt-0.5" style={{ color }}>{cls.price}</span>
                </div>
                <p className="text-white/45 text-xs mb-4 leading-relaxed">{cls.desc}</p>
                <div className="space-y-1.5 mb-5">
                  <div className="flex items-start gap-2">
                    <span className="text-white/25 text-xs uppercase tracking-widest w-10 shrink-0 pt-px">Días</span>
                    <span className="text-white/70 text-xs font-medium">{cls.days}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-white/25 text-xs uppercase tracking-widest w-10 shrink-0 pt-px">Hora</span>
                    <span className="text-white/70 text-xs font-medium">{cls.time}</span>
                  </div>
                </div>

                {/* Add / remove toggle */}
                <button
                  onClick={() => toggle(cls.name)}
                  className="cursor-pointer w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-200 border hover:scale-[1.02]"
                  style={{
                    background:  isOn ? "rgba(255,255,255,0.07)" : "transparent",
                    borderColor: isOn ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.10)",
                    color:       isOn ? color : "rgba(255,255,255,0.32)",
                  }}
                >
                  {isOn ? `✓ En el calendario` : `+ Agregar al calendario`}
                </button>
              </div>
            );
          })}

        </div>

        {/* CTA */}
        <div className="text-center mt-10">
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
