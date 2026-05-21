"use client";

import { useState } from "react";

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

const schedule: Record<string, { time: string; class: string; instructor: string; color: string }[]> = {
  Lunes: [
    { time: "07:00", class: "Funcional",  instructor: "Martín G.",  color: "#3b82f6" },
    { time: "09:00", class: "Pilates",    instructor: "Laura P.",   color: "#10b981" },
    { time: "18:00", class: "Boxeo",      instructor: "Diego R.",   color: "#dc2626" },
    { time: "19:30", class: "CrossFit",   instructor: "Carlos M.",  color: "#f59e0b" },
    { time: "20:30", class: "GAP",        instructor: "Valeria S.", color: "#ec4899" },
  ],
  Martes: [
    { time: "07:00", class: "Spinning",   instructor: "Ana L.",     color: "#a855f7" },
    { time: "09:00", class: "Funcional",  instructor: "Martín G.",  color: "#3b82f6" },
    { time: "18:00", class: "GAP",        instructor: "Valeria S.", color: "#ec4899" },
    { time: "19:30", class: "Boxeo",      instructor: "Diego R.",   color: "#dc2626" },
    { time: "20:30", class: "CrossFit",   instructor: "Carlos M.",  color: "#f59e0b" },
  ],
  Miércoles: [
    { time: "07:00", class: "Funcional",  instructor: "Martín G.",  color: "#3b82f6" },
    { time: "09:00", class: "Pilates",    instructor: "Laura P.",   color: "#10b981" },
    { time: "18:00", class: "CrossFit",   instructor: "Carlos M.",  color: "#f59e0b" },
    { time: "19:30", class: "Spinning",   instructor: "Ana L.",     color: "#a855f7" },
    { time: "20:30", class: "GAP",        instructor: "Valeria S.", color: "#ec4899" },
  ],
  Jueves: [
    { time: "07:00", class: "Spinning",   instructor: "Ana L.",     color: "#a855f7" },
    { time: "09:00", class: "Funcional",  instructor: "Martín G.",  color: "#3b82f6" },
    { time: "18:00", class: "Boxeo",      instructor: "Diego R.",   color: "#dc2626" },
    { time: "19:30", class: "CrossFit",   instructor: "Carlos M.",  color: "#f59e0b" },
    { time: "20:30", class: "Pilates",    instructor: "Laura P.",   color: "#10b981" },
  ],
  Viernes: [
    { time: "07:00", class: "Funcional",  instructor: "Martín G.",  color: "#3b82f6" },
    { time: "09:00", class: "GAP",        instructor: "Valeria S.", color: "#ec4899" },
    { time: "18:00", class: "Spinning",   instructor: "Ana L.",     color: "#a855f7" },
    { time: "19:30", class: "Boxeo",      instructor: "Diego R.",   color: "#dc2626" },
    { time: "20:30", class: "CrossFit",   instructor: "Carlos M.",  color: "#f59e0b" },
  ],
  Sábado: [
    { time: "08:00", class: "CrossFit",   instructor: "Carlos M.",  color: "#f59e0b" },
    { time: "09:00", class: "Boxeo",      instructor: "Diego R.",   color: "#dc2626" },
    { time: "10:00", class: "Funcional",  instructor: "Martín G.",  color: "#3b82f6" },
    { time: "11:00", class: "GAP",        instructor: "Valeria S.", color: "#ec4899" },
  ],
};

export default function ScheduleSection() {
  const [activeDay, setActiveDay] = useState("Lunes");

  return (
    <section className="py-24 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 reveal">
          <p className="text-[#dc2626] text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Planificá tu semana
          </p>
          <h2 className="font-display text-5xl lg:text-7xl text-white tracking-wider leading-none">
            HORARIOS <span className="text-[#dc2626]">DE CLASES</span>
          </h2>
        </div>

        {/* Day tabs */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2 reveal">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`shrink-0 px-5 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-200 ${
                activeDay === day
                  ? "bg-[#dc2626] text-white"
                  : "bg-[#111] border border-[#222] text-white/50 hover:text-white hover:border-[#333]"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Schedule list */}
        <div className="space-y-3 reveal">
          {schedule[activeDay].map(({ time, class: cls, instructor, color }) => (
            <div
              key={`${time}-${cls}`}
              className="flex items-center gap-4 bg-[#111] border border-[#1a1a1a] rounded-xl px-6 py-4 hover:border-[#282828] transition-colors"
            >
              <div className="w-2 h-10 rounded-full shrink-0" style={{ background: color }} />
              <div className="w-16 shrink-0">
                <span className="font-display text-white text-xl tracking-wide">{time}</span>
              </div>
              <div className="flex-1">
                <p className="font-display text-white text-xl tracking-wide">{cls.toUpperCase()}</p>
                <p className="text-white/40 text-xs">con {instructor}</p>
              </div>
              <a
                href="https://warriors.turnosweb.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 border text-xs font-semibold px-4 py-2 rounded uppercase tracking-wide transition-all duration-200 hover:text-white"
                style={{ borderColor: color + "60", color }}
              >
                Reservar
              </a>
            </div>
          ))}
        </div>

        <p className="text-white/30 text-xs text-center mt-6 reveal">
          * Horarios ilustrativos. Confirmá disponibilidad en la app o en recepción.
        </p>
      </div>
    </section>
  );
}
