import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [],
  },

  /* ── Red de seguridad del QR impreso ──────────────────────────────────
     El QR de la sede apunta a /rutinas y queda impreso para siempre.
     Estos alias cubren a quien tipee la dirección de memoria, y dejan el
     patrón listo por si algún día la página cambia de ruta: se agrega acá
     un redirect y el código impreso sigue funcionando igual.
     ──────────────────────────────────────────────────────────────────── */
  async redirects() {
    return [
      { source: "/rutina",        destination: "/rutinas", permanent: true },
      { source: "/r",             destination: "/rutinas", permanent: true },
      { source: "/entrenamiento", destination: "/rutinas", permanent: true },
    ];
  },
};

export default nextConfig;
