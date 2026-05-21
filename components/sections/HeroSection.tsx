"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient + grid pattern */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Red glow top-left */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#dc2626]/10 rounded-full blur-[120px] -translate-x-1/4 -translate-y-1/4" />
        {/* Red glow bottom-right */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#dc2626]/8 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4" />
      </div>

      {/* Diagonal accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#dc2626] to-transparent opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
        {/* Text block */}
        <div className="flex-1 text-center lg:text-left">
          {/* Tag */}
          <div
            className={`inline-flex items-center gap-2 border border-[#dc2626]/40 rounded-full px-4 py-1 mb-6 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "0.1s" }}
          >
            <span className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse" />
            <span className="text-xs text-[#dc2626] font-semibold tracking-[0.2em] uppercase">
              San Martín, Buenos Aires
            </span>
          </div>

          {/* Main headline */}
          <h1
            className={`font-display text-[clamp(4rem,12vw,9rem)] leading-none tracking-wider mb-4 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            <span className="block text-white">WARRIORS</span>
            <span className="block text-[#dc2626]">SPORT</span>
          </h1>

          {/* Tagline */}
          <p
            className={`font-display text-[clamp(1.5rem,4vw,3rem)] tracking-[0.25em] text-white/60 mb-6 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.35s" }}
          >
            TU 2DA CASA
          </p>

          {/* Description */}
          <p
            className={`text-white/50 text-base lg:text-lg max-w-md mx-auto lg:mx-0 mb-10 leading-relaxed transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.5s" }}
          >
            Entrenamos con propósito. Boxeo, CrossFit, Funcional, Pilates, Spinning y GAP.
            Encontrá tu mejor versión con nosotros.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.65s" }}
          >
            <a
              href="https://warriors.turnosweb.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold px-8 py-4 rounded text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-[#dc2626]/30"
            >
              Comenzá hoy
            </a>
            <Link
              href="/clases"
              className="border border-white/30 hover:border-white text-white/80 hover:text-white font-semibold px-8 py-4 rounded text-sm uppercase tracking-widest transition-all duration-200 hover:bg-white/5"
            >
              Ver clases
            </Link>
          </div>
        </div>

        {/* Right visual — abstract stats card */}
        <div
          className={`hidden lg:flex flex-1 justify-end transition-all duration-700 ${
            loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          }`}
          style={{ transitionDelay: "0.5s" }}
        >
          <div className="relative w-80">
            {/* Main card */}
            <div className="bg-[#111] border border-[#222] rounded-2xl p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#dc2626]/10 rounded-lg flex items-center justify-center">
                  <span className="font-display text-[#dc2626] text-lg">W</span>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest">Disciplinas</p>
                  <p className="font-display text-white text-2xl tracking-wide">6 ÁREAS</p>
                </div>
              </div>
              <hr className="border-[#222]" />
              {["Boxeo", "CrossFit", "Funcional", "Pilates", "Spinning", "GAP"].map((c, i) => (
                <div key={c} className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">{c}</span>
                  <div
                    className="h-1 rounded-full bg-gradient-to-r from-[#dc2626] to-[#f59e0b]"
                    style={{ width: `${[80, 95, 75, 65, 85, 70][i]}%`, maxWidth: "120px" }}
                  />
                </div>
              ))}
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-[#dc2626] text-white rounded-xl px-4 py-2 shadow-lg shadow-[#dc2626]/30">
              <p className="font-display text-2xl tracking-wide leading-none">500+</p>
              <p className="text-xs opacity-80">Miembros</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow">
        <span className="text-white/30 text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown size={18} className="text-white/30" />
      </div>
    </section>
  );
}
