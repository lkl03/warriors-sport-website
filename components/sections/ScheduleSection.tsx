"use client";

import { useState } from "react";

/* ── Real data from Instagram posts ── */
const classes = [
  {
    name: "Funcional",
    emoji: "⚡",
    days: "Lunes, Miércoles y Viernes",
    time: "19:00 – 20:00 hs.",
    price: "$ 50.000 / mes",
    color: "#7EEF08",
    description: "Entrenamiento funcional de alta intensidad. Fuerza, movilidad y cardio en una sola clase.",
  },
  {
    name: "Yoga",
    emoji: "🧘",
    days: "Martes y Jueves",
    time: "19:00 – 20:00 hs.",
    price: "$ 50.000 / mes",
    color: "#a3e635",
    description: "Conectá cuerpo y mente. Mejoría postural, flexibilidad y bienestar general.",
  },
  {
    name: "Musculación",
    emoji: "🏋️",
    days: "Lunes a Viernes",
    time: "07:00 – 23:00 hs.",
    price: "Consultá planes",
    color: "#EEEEEE",
    description: "Sala libre con equipamiento premium. Entrenás a tu ritmo con guía profesional.",
  },
];

const horarios = [
  { day: "Lunes a Viernes", time: "07:00 – 23:00 hs.", note: "" },
  { day: "Sábados",         time: "08:00 – 18:00 hs.", note: "" },
  { day: "Domingos",        time: "09:00 – 12:00 hs.", note: "Sin profe · $5.000 socios / $10.000 no socios" },
];

export default function ScheduleSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="horarios" className="py-24 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14 reveal">
          <p className="text-[#7EEF08] text-xs font-bold uppercase tracking-[0.3em] mb-3">Planificá tu semana</p>
          <h2 className="font-display text-5xl lg:text-7xl text-white tracking-wider leading-none">
            HORARIOS &amp; <span className="text-[#7EEF08] green-glow">CLASES</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* ── Classes cards ── */}
          <div className="reveal-left space-y-4">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-5">Disciplinas disponibles</p>
            {classes.map((cls, i) => (
              <button
                key={cls.name}
                onClick={() => setActive(i)}
                className={`w-full text-left rounded-2xl border p-5 transition-all duration-300 ${
                  active === i
                    ? "border-[#7EEF08]/60 bg-[#7EEF08]/5"
                    : "border-[#1e1e1e] bg-[#111] hover:border-[#2a2a2a]"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl mt-0.5">{cls.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-display text-2xl tracking-wide text-white">{cls.name.toUpperCase()}</h3>
                      <span className="font-semibold text-sm" style={{ color: cls.color }}>{cls.price}</span>
                    </div>
                    <p className="text-white/45 text-xs mb-2">{cls.description}</p>
                    <div
                      className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border"
                      style={{ borderColor: cls.color + "40", color: cls.color }}
                    >
                      📅 {cls.days}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* ── Schedule detail + horarios generales ── */}
          <div className="reveal-right space-y-6">

            {/* Selected class detail */}
            <div
              key={active}
              className="rounded-2xl border border-[#7EEF08]/30 bg-[#7EEF08]/5 p-7 animate-fade-in-up"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{classes[active].emoji}</span>
                <div>
                  <h3 className="font-display text-3xl text-white tracking-wide">{classes[active].name.toUpperCase()}</h3>
                  <p className="text-[#7EEF08] text-sm font-semibold">{classes[active].price}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 bg-black/30 rounded-lg p-3">
                  <span className="text-[#7EEF08]">📅</span>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest">Días</p>
                    <p className="text-white text-sm font-medium">{classes[active].days}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-black/30 rounded-lg p-3">
                  <span className="text-[#7EEF08]">🕐</span>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest">Horario</p>
                    <p className="text-white text-sm font-medium">{classes[active].time}</p>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/5491168272020?text=Hola%2C%20quiero%20reservar%20una%20clase%20de%20prueba%20%F0%9F%92%AA"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-[#7EEF08] hover:bg-[#5abc06] text-black font-bold py-3 rounded text-xs uppercase tracking-widest transition-all duration-200 hover:scale-[1.02]"
              >
                Reservar clase de prueba
              </a>
            </div>

            {/* Horarios generales */}
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Horarios de apertura</p>
              <div className="rounded-2xl border border-[#1e1e1e] bg-[#111] overflow-hidden">
                {horarios.map(({ day, time, note }, i) => (
                  <div
                    key={day}
                    className={`flex items-start justify-between p-4 gap-4 ${i < horarios.length - 1 ? "border-b border-[#1e1e1e]" : ""}`}
                  >
                    <div>
                      <p className="text-[#7EEF08] font-semibold text-sm">{day}</p>
                      {note && <p className="text-white/35 text-xs mt-0.5">{note}</p>}
                    </div>
                    <p className="text-white font-display text-lg tracking-wide shrink-0">{time}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
