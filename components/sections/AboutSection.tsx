"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import MediaModal, { type MediaItem } from "@/components/MediaModal";

/* Clickable media wrapper — shows an expand overlay on hover */
function ExpandableMedia({
  children,
  onOpen,
  className = "",
}: {
  children: React.ReactNode;
  onOpen: () => void;
  className?: string;
}) {
  return (
    <div className={`relative cursor-pointer group ${className}`} onClick={onOpen}>
      {children}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-200 flex items-center justify-center rounded-inherit">
        <Maximize2 size={26} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow-lg" />
      </div>
    </div>
  );
}

export default function AboutSection() {
  const [modal, setModal] = useState<MediaItem | null>(null);
  const open = (item: MediaItem) => setModal(item);
  const close = () => setModal(null);

  return (
    <section id="nosotros" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* Text column */}
          <div className="reveal-left">
            <p className="text-[#7EEF08] text-xs font-bold uppercase tracking-[0.3em] mb-4">
              Quiénes somos
            </p>
            <h2 className="font-display text-5xl lg:text-7xl text-white tracking-wider leading-none mb-5">
              MÁS QUE<br />
              <span className="text-[#7EEF08] green-glow">UN GIMNASIO</span>
            </h2>

            {/* Team photo — hidden until image is ready */}
            <ExpandableMedia
              className="hidden mb-6 rounded-2xl overflow-hidden border border-[#1e1e1e] bg-[#0d0d0d]"
              onOpen={() => open({ src: "/images/team.jpg", type: "image", alt: "Equipo Warriors Sport" })}
            >
              <div className="relative w-full" style={{ height: 210 }}>
                <img
                  src="/images/team.jpg"
                  alt="Equipo Warriors Sport"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
                {/* Placeholder shown until / if image fails */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-white/15 text-xs uppercase tracking-widest select-none">equipo warriors sport</span>
                </div>
              </div>
            </ExpandableMedia>

            <p className="text-white/65 text-base lg:text-lg leading-relaxed mb-4">
              Warriors Sport nació para ser <strong className="text-white">tu segunda casa</strong>. Un espacio donde cada persona, sin importar su nivel, encuentra el entorno ideal para transformarse — física y mentalmente.
            </p>
            <p className="text-white/50 text-base leading-relaxed mb-4">
              Con más de 7 años en San Martín, contamos con dos sedes, equipamiento de primer nivel y un equipo de instructores certificados comprometidos con tu proceso.
            </p>
            <p className="text-white/50 text-base leading-relaxed mb-10">
              Más que un gimnasio, somos una <strong className="text-white/80">familia</strong>. Cuidamos cada etapa de tu camino y celebramos cada logro.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              {["2 Sedes", "+7 Años", "Instructores certificados", "Equipamiento premium", "Comunidad activa"].map((t) => (
                <span key={t} className="border border-[#7EEF08]/35 text-[#7EEF08]/80 text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wide">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Gallery column */}
          <div className="reveal-right">
            <div className="grid grid-cols-2 gap-3">

              {/* Row 1: two images */}
              <ExpandableMedia
                className="rounded-xl overflow-hidden border border-[#1e1e1e] aspect-square"
                onOpen={() => open({ src: "/images/gym-floor.webp", type: "image", alt: "Planta baja Warriors Sport" })}
              >
                <Image
                  src="/images/gym-floor.webp"
                  alt="Planta baja Warriors Sport"
                  width={400} height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </ExpandableMedia>

              <ExpandableMedia
                className="rounded-xl overflow-hidden border border-[#1e1e1e] aspect-square"
                onOpen={() => open({ src: "/images/gym-reception.webp", type: "image", alt: "Recepción Warriors Sport" })}
              >
                <Image
                  src="/images/gym-reception.webp"
                  alt="Recepción Warriors Sport"
                  width={400} height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </ExpandableMedia>

              {/* Row 2: video full width */}
              <ExpandableMedia
                className="col-span-2 rounded-2xl overflow-hidden border border-[#1e1e1e]"
                onOpen={() => open({ src: "/images/gym-video.mp4", type: "video", alt: "Warriors Sport video" })}
              >
                <div style={{ aspectRatio: "16/7" }}>
                  <video
                    src="/images/gym-video.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              </ExpandableMedia>

              {/* Row 3: two images */}
              <ExpandableMedia
                className="rounded-xl overflow-hidden border border-[#1e1e1e] aspect-square"
                onOpen={() => open({ src: "/images/gym-machine-brand.webp", type: "image", alt: "Equipamiento Warriors Sport" })}
              >
                <Image
                  src="/images/gym-machine-brand.webp"
                  alt="Equipamiento Warriors Sport"
                  width={400} height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </ExpandableMedia>

              <ExpandableMedia
                className="rounded-xl overflow-hidden border border-[#1e1e1e] aspect-square"
                onOpen={() => open({ src: "/images/gym-weights.webp", type: "image", alt: "Pesas Warriors Sport" })}
              >
                <Image
                  src="/images/gym-weights.webp"
                  alt="Pesas Warriors Sport"
                  width={400} height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </ExpandableMedia>

            </div>
          </div>

        </div>
      </div>

      {modal && <MediaModal {...modal} onClose={close} />}
    </section>
  );
}
