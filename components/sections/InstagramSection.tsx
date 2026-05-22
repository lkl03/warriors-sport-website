"use client";

import Image from "next/image";
import InstagramIcon from "@/components/icons/InstagramIcon";

const IG_USER = "warriors.sport.arg.sm";
const IG_URL  = `https://www.instagram.com/${IG_USER}/`;

/* ── Grid images from Warriors Sport Instagram ───────────────────────────────
   These images are sourced directly from the gym. To sync a live feed,
   connect the Instagram account to Behold.so (behold.so) and replace this
   component with their embed widget.
   ─────────────────────────────────────────────────────────────────────────── */
const gridImages = [
  { src: "/images/gym-entrance.webp",      alt: "Entrada Warriors Sport" },
  { src: "/images/gym-two-floors.webp",    alt: "Dos plantas Warriors Sport" },
  { src: "/images/gym-weights.webp",       alt: "Pesas Warriors Sport" },
  { src: "/images/gym-bikes.webp",         alt: "Bicicletas Warriors Sport" },
  { src: "/images/gym-reception.webp",     alt: "Recepción Warriors Sport" },
  { src: "/images/gym-machine-brand.webp", alt: "Equipamiento Warriors Sport" },
  { src: "/images/gym-cable.webp",         alt: "Cable Warriors Sport" },
  { src: "/images/gym-dumbbells.webp",     alt: "Mancuernas Warriors Sport" },
  { src: "/images/gym-floor.webp",         alt: "Planta Warriors Sport" },
];

export default function InstagramSection() {
  return (
    <section id="instagram" className="py-24 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-10 reveal">
          <div>
            <p className="text-[#7EEF08] text-xs font-bold uppercase tracking-[0.3em] mb-2">Seguinos</p>
            <h2 className="font-display text-5xl lg:text-6xl text-white tracking-wider leading-none">
              INSTAGRAM
            </h2>
          </div>
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-bold px-6 py-3 rounded-xl text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 shadow-lg shrink-0"
          >
            <InstagramIcon size={18} />
            @{IG_USER}
          </a>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-6 items-start reveal">

          {/* Image grid — 3×3 */}
          <div className="lg:col-span-2 grid grid-cols-3 gap-2 rounded-2xl overflow-hidden">
            {gridImages.map(({ src, alt }) => (
              <a
                key={src}
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square overflow-hidden relative group block"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-75 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#7EEF08]/0 group-hover:to-[#7EEF08]/15 transition-all duration-300 flex items-center justify-center">
                  <InstagramIcon size={22} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </a>
            ))}
          </div>

          {/* Profile card */}
          <div className="bg-black border border-[#1e1e1e] rounded-2xl p-6 flex flex-col gap-5">

            {/* Avatar + handle */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] flex items-center justify-center shrink-0">
                <InstagramIcon size={28} className="text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-base leading-tight">@{IG_USER}</p>
                <p className="text-white/40 text-xs mt-0.5">Warriors Sport Arg — San Martín</p>
              </div>
            </div>

            <p className="text-white/55 text-sm leading-relaxed">
              Seguinos en Instagram para ver novedades, horarios, resultados y todo lo que pasa en Warriors Sport día a día.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Posts",      value: "38+" },
                { label: "Seguidores", value: "1.8k" },
                { label: "Comunidad",  value: "100%" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl p-2.5 text-center">
                  <p className="font-display text-xl text-[#7EEF08] tracking-wide leading-none">{value}</p>
                  <p className="text-white/30 text-[10px] mt-1 leading-none">{label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-200 hover:scale-[1.02] text-white"
              style={{ background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)" }}
            >
              <InstagramIcon size={16} />
              Ver perfil completo
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
