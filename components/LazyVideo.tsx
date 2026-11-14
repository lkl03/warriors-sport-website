"use client";

import { useEffect, useRef, useState } from "react";

/* Video de fondo (muted + loop) que recién se descarga cuando está por entrar
   en pantalla. Antes el MP4 (~1,3 MB) se bajaba apenas abría la home y
   competía con el hero en conexiones móviles. Se ve igual que un <video
   autoPlay> común. */
export default function LazyVideo({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) { setActive(true); io.disconnect(); }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={active ? src : undefined}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      className={className}
    />
  );
}
