"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Clock } from "lucide-react";

const WA_LINK = "https://wa.me/5491168272020?text=Hola%2C%20quiero%20m%C3%A1s%20info%20sobre%20Warriors%20Sport%20%F0%9F%92%AA";

type Sede = {
  id: "sm" | "sa";
  label: string;
  name: string;
  address: string[];
  mapSrc: string;
  mapsUrl: string;
  hours: [string, string][];
  images: { src: string; alt: string }[];
};

const sedes: Sede[] = [
  {
    id: "sm",
    label: "San Martín",
    name: "Warriors Sport — San Martín",
    address: ["Av. 25 de Mayo 1859", "B1650 San Martín, Buenos Aires"],
    mapSrc: "https://maps.google.com/maps?q=-34.5757101,-58.5321226&z=17&output=embed&hl=es",
    mapsUrl: "https://maps.app.goo.gl/XeGYEhiT4VMDqPqRA",
    hours: [
      ["Lun – Vie", "07:00 – 23:00 hs."],
      ["Sábados",   "08:00 – 18:00 hs."],
      ["Domingos",  "09:00 – 12:00 hs."],
    ],
    images: [
      { src: "/images/gym-entrance.webp",   alt: "Entrada Warriors Sport San Martín" },
      { src: "/images/gym-exterior.webp",   alt: "Exterior Warriors Sport San Martín" },
    ],
  },
  {
    id: "sa",
    label: "San Andrés",
    name: "Warriors Sport — San Andrés",
    address: ["San Andrés", "Buenos Aires"],
    mapSrc: "https://maps.google.com/maps?q=-34.5600861,-58.5384252&z=17&output=embed&hl=es",
    mapsUrl: "https://maps.app.goo.gl/USNH58xBvrbVtWoL9",
    hours: [
      ["Lun – Vie", "07:00 – 23:00 hs."],
      ["Sábados",   "08:00 – 18:00 hs."],
      ["Domingos",  "09:00 – 12:00 hs."],
    ],
    images: [
      { src: "/images/gym-sanandres-1.webp", alt: "Warriors Sport San Andrés" },
      { src: "/images/gym-sanandres-2.jpg",  alt: "Instalaciones Warriors Sport San Andrés" },
    ],
  },
];

export default function SedesSection() {
  const [active, setActive] = useState<"sm" | "sa">("sm");
  const sede = sedes.find(s => s.id === active)!;

  return (
    <section id="sedes" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 reveal">
          <p className="text-[#7EEF08] text-xs font-bold uppercase tracking-[0.3em] mb-3">Dónde estamos</p>
          <h2 className="font-display text-5xl lg:text-7xl text-white tracking-wider leading-none">
            NUESTRAS <span className="text-[#7EEF08] green-glow">SEDES</span>
          </h2>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-8 reveal">
          <div className="inline-flex bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl p-1 gap-1">
            {sedes.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                  active === s.id
                    ? "bg-[#7EEF08] text-black"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch reveal">

          {/* Map */}
          <div className="rounded-2xl overflow-hidden border border-[#1e1e1e] min-h-[380px]">
            <iframe
              key={sede.id}
              title={sede.name}
              src={sede.mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "380px", display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Info + images */}
          <div className="flex flex-col gap-5">

            {/* Merged address + hours card */}
            <div className="bg-[#0d0d0d] border border-[#7EEF08]/25 rounded-2xl p-6 flex-1">
              <h3 className="font-display text-2xl text-white tracking-wide mb-5">{sede.name}</h3>

              {/* Address */}
              <div className="flex items-start gap-3 mb-5">
                <div className="w-9 h-9 bg-[#7EEF08]/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={16} className="text-[#7EEF08]" />
                </div>
                <div>
                  <p className="text-white/35 text-xs uppercase tracking-widest mb-1">Dirección</p>
                  {sede.address.map((line) => (
                    <p key={line} className="text-white/80 text-sm leading-relaxed">{line}</p>
                  ))}
                  <a
                    href={sede.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7EEF08] text-xs hover:underline mt-1 inline-block"
                  >
                    Ver en Google Maps →
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-[#7EEF08]/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <Clock size={16} className="text-[#7EEF08]" />
                </div>
                <div className="flex-1">
                  <p className="text-white/35 text-xs uppercase tracking-widest mb-2">Horarios</p>
                  <div className="space-y-1.5">
                    {sede.hours.map(([day, hrs]) => (
                      <div key={day} className="flex justify-between items-center">
                        <span className="text-white/55 text-sm">{day}</span>
                        <span className="text-white/80 text-sm font-medium">{hrs}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="grid grid-cols-2 gap-3">
              {sede.images.map(({ src, alt }) => (
                <div key={src} className="rounded-xl overflow-hidden border border-[#1e1e1e] aspect-video">
                  <Image
                    src={src}
                    alt={alt}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10 reveal">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#7EEF08] hover:bg-[#5abc06] text-black font-bold px-12 py-4 rounded-xl text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 shadow-xl shadow-[#7EEF08]/20 animate-green-pulse"
          >
            Quiero empezar
          </a>
        </div>

      </div>
    </section>
  );
}
