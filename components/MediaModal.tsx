"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export type MediaItem = {
  src:  string;
  type: "image" | "video";
  alt?: string;
  /* Proporción real del archivo. Por defecto apaisado; las fichas de rutinas
     son verticales y necesitan pasar las suyas. */
  width?:  number;
  height?: number;
};

type Props = MediaItem & { onClose: () => void };

export default function MediaModal({ src, type, alt, width = 1400, height = 1000, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-sm p-4 md:p-10 animate-fade-in"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 cursor-pointer"
        aria-label="Cerrar"
      >
        <X size={20} />
      </button>

      {/* Media — click on it doesn't close */}
      <div
        className="relative max-w-5xl w-full flex items-center justify-center"
        onClick={e => e.stopPropagation()}
      >
        {type === "image" ? (
          <Image
            src={src}
            alt={alt ?? ""}
            width={width}
            height={height}
            className="max-h-[90vh] w-auto h-auto object-contain rounded-xl shadow-2xl"
            style={{ maxWidth: "100%" }}
          />
        ) : (
          <video
            src={src}
            autoPlay
            controls
            loop
            playsInline
            className="max-h-[90vh] w-full rounded-xl shadow-2xl"
          />
        )}
      </div>
    </div>
  );
}
