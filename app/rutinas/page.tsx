import type { Metadata } from "next";
import RutinasView from "@/components/rutinas/RutinasView";

/* ── Página destino del QR impreso en el gimnasio ──────────────────────────
   URL fija y permanente: https://www.warriorssportarg.com.ar/rutinas
   No se indexa en Google ni aparece en el menú: es exclusiva de quien
   escanea el código en la sede.
   ───────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Rutinas",
  description:
    "Rutinas de entrenamiento de Warriors Sport Arg. Elegí tu nivel y seguí el plan del día.",
  robots: {
    index:  false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  alternates: {
    canonical: "/rutinas",
  },
  openGraph: {
    title:       "Rutinas | Warriors Sport Arg",
    description: "Elegí tu nivel y seguí el plan del día.",
    url:         "/rutinas",
  },
};

export default function RutinasPage() {
  return <RutinasView />;
}
