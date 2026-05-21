"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const WA_LINK = "https://wa.me/5491168272020?text=Hola%2C%20quiero%20m%C3%A1s%20info%20sobre%20Warriors%20Sport%20%F0%9F%92%AA";

const slides = [
  { src: "/images/gym-entrance.webp",    tagline: "Tu 2da Casa.",                       sub: "Donde empieza tu transformación." },
  { src: "/images/gym-two-floors.webp",  tagline: "Equipamiento de primer nivel.",       sub: "Dos plantas, infinitas posibilidades." },
  { src: "/images/gym-welcome.webp",     tagline: "Bienvenidos a Warriors.",             sub: "Más que un gym, una familia." },
  { src: "/images/gym-floor.webp",       tagline: "Cuidamos tu proceso.",                sub: "Celebramos tu progreso." },
  { src: "/images/gym-exterior.webp",    tagline: "Abiertos todos los días.",            sub: "San Martín, Buenos Aires." },
];

export default function HeroSection() {
  const [current, setCurrent]  = useState(0);
  const [loaded, setLoaded]    = useState(false);
  const [animKey, setAnimKey]  = useState(0);

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

      {/* Dark + green gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

      {/* Green accent line left */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#7EEF08] to-transparent opacity-70" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
        <div className="max-w-3xl">

          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 border border-[#7EEF08]/40 rounded-full px-4 py-1 mb-6 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "0.1s" }}
          >
            <span className="w-2 h-2 rounded-full bg-[#7EEF08] animate-pulse" />
            <span className="text-xs text-[#7EEF08] font-semibold tracking-[0.25em] uppercase">San Martín, Buenos Aires</span>
          </div>

          {/* Logo mark */}
          <div
            className={`flex items-center gap-4 mb-6 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "0.2s" }}
          >
            <div className="hidden sm:block w-16 h-16 rounded-lg overflow-hidden border border-[#7EEF08]/30">
              <Image src="/images/logo.jpg" alt="Warriors" width={64} height={64} className="w-full h-full object-cover" />
            </div>
            <h1 className="font-display text-[clamp(3.5rem,11vw,8.5rem)] leading-none tracking-wider">
              <span className="block text-white">WARRIORS</span>
              <span className="block text-[#7EEF08] green-glow">SPORT</span>
            </h1>
          </div>

          {/* Animated tagline */}
          <div
            key={animKey}
            className={`mb-8 transition-all duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: "0.35s" }}
          >
            <p className="font-display text-[clamp(1.4rem,3.5vw,2.8rem)] text-white tracking-wide animate-fade-in-up">
              {slides[current].tagline}
            </p>
            <p className="text-white/55 text-base lg:text-lg animate-fade-in-up mt-1" style={{ animationDelay: "0.1s" }}>
              {slides[current].sub}
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
              💪 Comenzá hoy
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

      {/* Slide indicators + arrows */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`transition-all duration-300 rounded-full ${i === current ? "w-6 h-2 bg-[#7EEF08]" : "w-2 h-2 bg-white/30 hover:bg-white/60"}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <button onClick={() => go(current - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-[#7EEF08] transition-colors p-2" aria-label="Anterior">
        <ChevronLeft size={28} />
      </button>
      <button onClick={() => go(current + 1)} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-[#7EEF08] transition-colors p-2" aria-label="Siguiente">
        <ChevronRight size={28} />
      </button>

      {/* Scroll cue */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce-slow z-20">
        <ChevronDown size={18} className="text-white/30" />
      </div>
    </section>
  );
}
