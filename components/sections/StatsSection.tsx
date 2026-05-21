"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 2,   suffix: "",    label: "Sedes",                   icon: "📍" },
  { value: 7,   suffix: "+",   label: "Años activos",             icon: "🏆" },
  { value: 100, suffix: "%",   label: "Clientes satisfechos",     icon: "⭐" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref      = useRef<HTMLSpanElement>(null);
  const started  = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const dur   = 1800;
        const start = performance.now();
        const tick  = (now: number) => {
          const t    = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          setCount(Math.round(ease * target));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="font-display text-5xl lg:text-6xl text-[#7EEF08] tracking-wide green-glow">
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="bg-[#0d0d0d] border-y border-[#1e1e1e] py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 divide-x divide-[#1e1e1e]">
          {stats.map(({ value, suffix, label, icon }) => (
            <div key={label} className="flex flex-col items-center gap-1.5 py-2 px-4">
              <span className="text-2xl mb-1">{icon}</span>
              <Counter target={value} suffix={suffix} />
              <p className="text-white/40 text-xs uppercase tracking-widest text-center leading-snug">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
