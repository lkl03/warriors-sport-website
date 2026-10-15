import type { Metadata } from "next";
import { Inter, Bebas_Neue, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { Analytics } from "@vercel/analytics/next";
import { BASE_URL } from "@/lib/sedes";
import { siteGraph, jsonLdString } from "@/lib/schema";

const inter      = Inter({ variable: "--font-inter",      subsets: ["latin"] });
const bebasNeue  = Bebas_Neue({ variable: "--font-bebas", weight: "400", subsets: ["latin"] });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"] });

const TITLE = "Gimnasio en San Martín y San Andrés | Warriors Sport Arg";
const DESCRIPTION =
  "Warriors Sport: gimnasio con 2 sedes en San Martín y San Andrés, Buenos Aires. Musculación con máquinas nuevas, clases de funcional, yoga y jumping. Escribinos por WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: TITLE,
    template: "%s | Warriors Sport Arg",
  },
  description: DESCRIPTION,
  applicationName: "Warriors Sport Arg",
  authors: [{ name: "Warriors Sport Arg" }],
  creator: "Warriors Sport Arg",

  /* La imagen social sale de app/opengraph-image.tsx (1200×630). */
  openGraph: {
    type:        "website",
    locale:      "es_AR",
    url:         BASE_URL,
    siteName:    "Warriors Sport Arg",
    title:       TITLE,
    description: "Musculación, clases grupales y 2 sedes en San Martín y San Andrés, Buenos Aires.",
  },

  twitter: {
    card:        "summary_large_image",
    title:       TITLE,
    description: "Musculación, clases grupales y 2 sedes en San Martín y San Andrés.",
  },

  robots: {
    index:           true,
    follow:          true,
    googleBot: {
      index:          true,
      follow:         true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  /* Search Console se verifica con public/google25071ef012ca54af.html
     (no borrar ese archivo). */
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${inter.variable} ${bebasNeue.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(siteGraph) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-black text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <Analytics />
      </body>
    </html>
  );
}
