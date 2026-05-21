"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 500, suffix: "+", label: "Miembros activos" },
  { value: 6,   suffix: "",  label: "Disciplinas" },
  { value: 10,  suffix: "+", label: "Instructores" },
  { value: 5,   suffix: "+", label: "Años de experiencia" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const start = performance.now();
          const animate = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - t, 3);
            setCount(Math.round(ease * target));
            if (t < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="font-display text-5xl lg:text-6xl text-white tracking-wide">
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="bg-[#111] border-y border-[#1f1f1f] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-[#1f1f1f]">
          {stats.map(({ value, suffix, label }) => (
            <div key={label} className="flex flex-col items-center gap-1 py-4 lg:py-0">
              <Counter target={value} suffix={suffix} />
              <p className="text-white/40 text-sm uppercase tracking-widest text-center">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
