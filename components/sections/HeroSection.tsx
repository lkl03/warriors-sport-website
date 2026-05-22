"use client";

import { useEffect, useState, useCallback } from "react";
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

  const go = useCallback((idx: number) => {
    setCurrent((idx + slides.length) % slides.length);
    setAnimKey(k => k + 1);
  }, []);

  useEffect(() => { setLoaded(true); }, []);
  useEffect(() => {
    const t = setInterval(() => go(current + 1), 5000);
    return () => clearInterval(t);
  }, [current, go]);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">

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

      {/* Subtle base overlay — keeps image visible but slightly darkened everywhere */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Directional gradient overlay — desktop: L→R 60%, mobile: T→B 60% */}
      <div
        className="absolute inset-0 hidden sm:block"
        style={{ background: "linear-gradient(to right, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.90) 35%, rgba(0,0,0,0.5) 60%, transparent 100%)" }}
      />
      <div
        className="absolute inset-0 block sm:hidden"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.90) 35%, rgba(0,0,0,0.5) 60%, transparent 100%)" }}
      />

      {/* Green accent line left */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#7EEF08] to-transparent opacity-70" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
        <div className="max-w-2xl">

          {/* Logo pill */}
          <div
            className={`inline-flex items-center gap-2 border border-[#7EEF08]/40 rounded-full pl-1 pr-4 py-1 mb-6 bg-black/20 backdrop-blur-sm transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "0.1s" }}
          >
            <div className="w-7 h-7 rounded-full overflow-hidden border border-[#7EEF08]/30 shrink-0">
              <Image src="/images/logo.jpg" alt="Warriors" width={28} height={28} className="w-full h-full object-cover" />
            </div>
            <span className="text-xs text-[#7EEF08] font-semibold tracking-[0.25em] uppercase">Warriors Sport</span>
          </div>

          {/* Title: WARRIORS SPORT ARG */}
          <div
            className={`mb-3 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "0.2s" }}
          >
            <h1 className="font-display leading-none tracking-wider">
              <span className="block text-white text-[clamp(3.5rem,11vw,8.5rem)]">WARRIORS</span>
              <span className="block text-white text-[clamp(3.5rem,11vw,8.5rem)]">SPORT</span>
              <span className="block text-[#7EEF08] green-glow text-[clamp(3.5rem,11vw,8.5rem)]">ARG</span>
            </h1>
          </div>

          {/* Static subtitle */}
          <p
            className={`text-white/65 text-lg lg:text-xl mb-6 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "0.3s" }}
          >
            Tu segunda casa.
          </p>

          {/* Animated slide tagline */}
          <div
            key={animKey}
            className={`mb-8 transition-all duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: "0.35s" }}
          >
            <p className="text-white/50 text-base lg:text-lg animate-fade-in-up">
              {slides[current].tagline}
            </p>
          </div>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "0.5s" }}
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

      {/* Arrows */}
      <button
        onClick={() => go(current - 1)}
        className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-[#7EEF08] transition-colors p-2"
        aria-label="Anterior"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={() => go(current + 1)}
        className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-[#7EEF08] transition-colors p-2"
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
