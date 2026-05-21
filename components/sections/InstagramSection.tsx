"use client";

import { useEffect, useRef } from "react";
import InstagramIcon from "@/components/icons/InstagramIcon";

const IG_USER = "warriors.sport.arg.sm";
const IG_URL  = `https://www.instagram.com/${IG_USER}/`;

/* ── EmbedSocial free widget ──────────────────────────────────────────────
   We use the official Instagram embed approach via the IG embed.js script.
   The script renders each <blockquote data-instgrm-permalink> block into a
   fully featured Instagram post card — no API key required.
   Source: https://developers.facebook.com/docs/instagram/oembed/
   ─────────────────────────────────────────────────────────────────────── */

// Known post permalinks from @warriors.sport.arg.sm (update with fresh ones as needed)
const POSTS = [
  "https://www.instagram.com/warriors.sport.arg.sm/",
];

export default function InstagramSection() {
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    // If Instagram's embed.js is already present, just reprocess
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
      return;
    }

    const script    = document.createElement("script");
    script.src      = "https://www.instagram.com/embed.js";
    script.async    = true;
    script.defer    = true;
    script.onload   = () => (window as any).instgrm?.Embeds.process();
    document.body.appendChild(script);
  }, []);

  return (
    <section id="instagram" className="py-24 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 reveal">
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
            className="inline-flex items-center gap-3 bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-bold px-6 py-3.5 rounded-xl text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <InstagramIcon size={18} />
            @{IG_USER}
          </a>
        </div>

        {/* Instagram profile embed (official embed.js approach) */}
        <div className="reveal">
          <div className="grid md:grid-cols-2 gap-6 items-start">

            {/* Embed container — Instagram renders the <blockquote> into a card */}
            <div className="flex justify-center">
              <blockquote
                className="instagram-media w-full"
                data-instgrm-permalink={IG_URL}
                data-instgrm-version="14"
                data-instgrm-captioned
                style={{
                  background: "#FFF",
                  border: "0",
                  borderRadius: "3px",
                  boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                  margin: "1px",
                  maxWidth: "540px",
                  minWidth: "326px",
                  padding: "0",
                  width: "100%",
                }}
              />
            </div>

            {/* Profile CTA card */}
            <div className="flex flex-col gap-5">
              <div className="bg-black border border-[#1e1e1e] rounded-2xl p-7">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] flex items-center justify-center">
                    <InstagramIcon size={28} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">@{IG_USER}</p>
                    <p className="text-white/40 text-sm">Warriors Sport Arg — San Martín</p>
                  </div>
                </div>

                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  Seguinos en Instagram para ver novedades, horarios, resultados de nuestros socios y todo lo que pasa en Warriors Sport día a día.
                </p>

                {/* Stat pills */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: "Publicaciones", value: "38+" },
                    { label: "Seguidores",    value: "1.8k+" },
                    { label: "Comunidad",     value: "100%" },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl p-3 text-center">
                      <p className="font-display text-xl text-[#7EEF08] tracking-wide">{value}</p>
                      <p className="text-white/35 text-xs mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>

                <a
                  href={IG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-200 hover:scale-[1.02] text-white"
                  style={{ background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)" }}
                >
                  <InstagramIcon size={16} />
                  Ver perfil completo
                </a>
              </div>

              {/* Preview mosaic */}
              <div className="grid grid-cols-3 gap-2 rounded-2xl overflow-hidden">
                {[
                  "/images/gym-entrance.webp",
                  "/images/gym-weights.webp",
                  "/images/gym-bikes.webp",
                  "/images/gym-two-floors.webp",
                  "/images/gym-reception.webp",
                  "/images/gym-machine-brand.webp",
                ].map((src) => (
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
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-75 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#7EEF08]/0 group-hover:to-[#7EEF08]/20 transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
