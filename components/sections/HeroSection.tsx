"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const WA_LINK = "https://wa.me/5491168272020?text=Hola%2C%20quiero%20m%C3%A1s%20info%20sobre%20Warriors%20Sport%20%F0%9F%92%AA";

const slides = [
  { src: "/images/gym-entrance.webp",   tagline: "Donde empieza tu transformación." },
  { src: "/images/gym-two-floors.webp", tagline: "Equipamiento de primer nivel." },
  { src: "/images/gym-welcome.webp",    tagline: "Más que un gym, una familia." },
  { src: "/images/gym-floor.webp",      tagline: "Cuidamos tu proceso." },
  { src: "/images/gym-exterior.webp",   tagline: "Abiertos todos los días." },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [loaded,  setLoaded]  = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const dragStartX = useRef<number | null>(null);

  const go = useCallback((idx: number) => {
    setCurrent((idx + slides.length) % slides.length);
    setAnimKey(k => k + 1);
  }, []);

  useEffect(() => { setLoaded(true); }, []);
  useEffect(() => {
    const t = setInterval(() => go(current + 1), 5000);
    return () => clearInterval(t);
  }, [current, go]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(delta) < 50) return;
    go(delta < 0 ? current + 1 : current - 1);
  }, [current, go]);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden select-none"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => { dragStartX.current = null; }}
    >

      {/* Slide images */}
      {slides.map((s, i) => (
        <div
          key={s.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={s.src}
            alt={s.tagline}
            fill
            priority={i === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Uniform overlay — works with centered content */}
      <div className="absolute inset-0 bg-black/58" />

      {/* Centered content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 py-28 flex flex-col items-center text-center">

        {/* Logo */}
        <div
          className={`mb-5 transition-all duration-700 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
          style={{ transitionDelay: "0.1s" }}
        >
          <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-[#7EEF08]/55 shadow-2xl shadow-[#7EEF08]/25 mx-auto">
            <Image
              src="/images/logo.jpg"
              alt="Warriors Sport Arg"
              width={176}
              height={176}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Brand name */}
        <div
          className={`mb-5 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "0.2s" }}
        >
          <p className="text-[#7EEF08] text-xs font-bold tracking-[0.4em] uppercase mb-1">Warriors Sport Arg</p>
          <p className="text-white/55 text-base lg:text-lg">Tu segunda casa.</p>
        </div>

        {/* Animated slide tagline */}
        <div
          key={animKey}
          className={`mb-9 transition-all duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "0.3s" }}
        >
          <p className="text-white/40 text-sm lg:text-base animate-fade-in-up italic">
            {slides[current].tagline}
          </p>
        </div>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "0.45s" }}
        >
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#7EEF08] hover:bg-[#5abc06] text-black font-bold px-8 py-4 rounded text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 shadow-lg shadow-[#7EEF08]/20"
          >
            Comenzá hoy
          </a>
          <a
            href="#horarios"
            className="inline-flex items-center justify-center border border-white/30 hover:border-[#7EEF08] text-white/80 hover:text-[#7EEF08] font-semibold px-8 py-4 rounded text-sm uppercase tracking-widest transition-all duration-200 hover:bg-[#7EEF08]/5"
          >
            Ver horarios
          </a>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`cursor-pointer transition-all duration-300 rounded-full ${i === current ? "w-6 h-2 bg-[#7EEF08]" : "w-2 h-2 bg-white/30 hover:bg-white/60"}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Arrows — hidden on mobile */}
      <button
        onClick={() => go(current - 1)}
        className="hidden sm:block cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-[#7EEF08] transition-colors p-2"
        aria-label="Anterior"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={() => go(current + 1)}
        className="hidden sm:block cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-[#7EEF08] transition-colors p-2"
        aria-label="Siguiente"
      >
        <ChevronRight size={28} />
      </button>

      {/* Scroll cue */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce-slow z-20">
        <ChevronDown size={18} className="text-white/30" />
      </div>
    </section>
  );
}
