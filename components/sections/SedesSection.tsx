"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Maximize2, Phone, Navigation } from "lucide-react";
import MediaModal, { type MediaItem } from "@/components/MediaModal";
import { sedes } from "@/lib/sedes";

const WA_LINK = "https://wa.me/5491168272020?text=Hola%2C%20quiero%20m%C3%A1s%20info%20sobre%20Warriors%20Sport%20%F0%9F%92%AA";

export default function SedesSection() {
  const [active, setActive] = useState<"sm" | "sa">("sm");
  const [modal,  setModal]  = useState<MediaItem | null>(null);
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
            {sedes.map(s => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`cursor-pointer px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-widest transition-all duration-200 ${
                  active === s.id ? "bg-[#7EEF08] text-black" : "text-white/50 hover:text-white"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch reveal">

          {/* Maps — both iframes rendered, only active one visible (instant tab switch, no reload) */}
          <div className="relative rounded-2xl overflow-hidden border border-[#1e1e1e]" style={{ minHeight: 380 }}>
            {sedes.map(s => (
              <iframe
                key={s.id}
                title={s.name}
                src={s.mapSrc}
                className={`absolute inset-0 w-full h-full transition-opacity duration-400 ${
                  active === s.id ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
                }`}
                style={{ border: 0, minHeight: 380 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ))}
          </div>

          {/* Info + images */}
          <div className="flex flex-col gap-4">

            {/* Merged address + hours card */}
            <div className="bg-[#0d0d0d] border border-[#7EEF08]/25 rounded-2xl p-6 flex-1">
              <h3 className="font-display text-xl text-white tracking-wide mb-5">
                <Link href={`/sedes/${sede.slug}`} className="hover:text-[#7EEF08] transition-colors">
                  {sede.name}
                </Link>
              </h3>

              {/* Address */}
              <div className="flex items-start gap-3 mb-5">
                <div className="w-9 h-9 bg-[#7EEF08]/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={16} className="text-[#7EEF08]" />
                </div>
                <div>
                  <p className="text-white/35 text-xs uppercase tracking-widest mb-1">Dirección</p>
                  {sede.address.map(line => (
                    <p key={line} className="text-white/80 text-sm leading-snug">{line}</p>
                  ))}
                  <a
                    href={sede.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7EEF08] text-xs hover:underline mt-1.5 inline-block"
                  >
                    Ver en Google Maps →
                  </a>
                  <a
                    href={sede.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 text-[#7EEF08] text-xs hover:underline mt-1.5 inline-flex items-center gap-1"
                  >
                    <Navigation size={11} /> Cómo llegar
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3 mb-5">
                <div className="w-9 h-9 bg-[#7EEF08]/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <Clock size={16} className="text-[#7EEF08]" />
                </div>
                <div className="flex-1">
                  <p className="text-white/35 text-xs uppercase tracking-widest mb-2">Horarios</p>
                  <div className="space-y-1.5">
                    {sede.hours.map(([day, hrs]) => (
                      <div key={day} className="flex justify-between items-center">
                        <span className="text-white/55 text-sm">{day}</span>
                        <span className={`text-sm font-medium ${hrs === "Cerrado" ? "text-white/35" : "text-white/80"}`}>{hrs}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-[#7EEF08]/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <Phone size={16} className="text-[#7EEF08]" />
                </div>
                <div>
                  <p className="text-white/35 text-xs uppercase tracking-widest mb-1">WhatsApp</p>
                  <a
                    href={sede.waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7EEF08] text-sm hover:underline"
                  >
                    {sede.waDisplay}
                  </a>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="grid grid-cols-2 gap-3">
              {sede.images.slice(0, 2).map(({ src, alt, pos }) => (
                <div
                  key={src}
                  className="rounded-xl overflow-hidden border border-[#1e1e1e] bg-[#0d0d0d] relative cursor-pointer group"
                  style={{ aspectRatio: "4/3" }}
                  onClick={() => setModal({ src, type: "image", alt })}
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    style={{ objectPosition: pos ?? "center center" }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-200 flex items-center justify-center">
                    <Maximize2 size={22} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow-lg" />
                  </div>
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

      {modal && <MediaModal {...modal} onClose={() => setModal(null)} />}
    </section>
  );
}
