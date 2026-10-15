import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/* Imagen para WhatsApp / Facebook / X al compartir el link (1200×630).
   Antes se usaba una foto de 382×510 declarada como 1200×630. */

export const alt = "Warriors Sport Arg — Gimnasio en San Martín y San Andrés";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/images/logo.jpg"));
  const logoSrc = `data:image/jpeg;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "#000",
          padding: "0 70px",
          gap: 48,
          borderBottom: "14px solid #7EEF08",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          width={240}
          height={240}
          alt=""
          style={{ borderRadius: 9999, border: "6px solid #7EEF08" }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#7EEF08", fontSize: 30, letterSpacing: 10, fontWeight: 700 }}>
            WARRIORS SPORT ARG
          </div>
          <div style={{ color: "#fff", fontSize: 60, fontWeight: 800, lineHeight: 1.05, marginTop: 18 }}>
            Gimnasio en San Martín
          </div>
          <div style={{ color: "#fff", fontSize: 60, fontWeight: 800, lineHeight: 1.05 }}>
            y San Andrés
          </div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 30, marginTop: 28 }}>
            Musculación · Clases grupales · 2 sedes
          </div>
        </div>
      </div>
    ),
    size,
  );
}
