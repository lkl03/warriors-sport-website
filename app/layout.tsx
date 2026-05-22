import type { Metadata } from "next";
import { Inter, Bebas_Neue, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const inter      = Inter({ variable: "--font-inter",      subsets: ["latin"] });
const bebasNeue  = Bebas_Neue({ variable: "--font-bebas", weight: "400", subsets: ["latin"] });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"] });

/* ── Base URL (update when a custom domain is set) ─────────────────────── */
const BASE_URL = "https://warriors-sport-website.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Warriors Sport Arg — Gimnasio en San Martín, Buenos Aires",
    template: "%s | Warriors Sport Arg",
  },
  description:
    "Gimnasio Warriors Sport en San Martín y Villa San Andrés, Buenos Aires. Musculación, Funcional, Yoga, y Curso de Entrenador. Equipamiento premium, 2 sedes, más de 7 años de trayectoria.",
  keywords: [
    "gimnasio", "warriors sport", "san martín", "villa san andrés",
    "musculación", "funcional", "yoga", "buenos aires", "gym",
    "curso de entrenador", "fitness",
  ],
  authors: [{ name: "Warriors Sport Arg" }],
  creator: "Warriors Sport Arg",

  openGraph: {
    type:        "website",
    locale:      "es_AR",
    url:         BASE_URL,
    siteName:    "Warriors Sport Arg",
    title:       "Warriors Sport Arg — Gimnasio en San Martín, Buenos Aires",
    description: "Equipamiento premium, 2 sedes y más de 7 años formando atletas en San Martín, Buenos Aires.",
    images: [
      {
        url:    "/images/gym-entrance.webp",
        width:  1200,
        height: 630,
        alt:    "Warriors Sport Arg — Gimnasio San Martín",
      },
    ],
  },

  twitter: {
    card:        "summary_large_image",
    title:       "Warriors Sport Arg — Gimnasio en San Martín, Buenos Aires",
    description: "Equipamiento premium, 2 sedes y más de 7 años formando atletas.",
    images:      ["/images/gym-entrance.webp"],
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
    canonical: BASE_URL,
  },

  /* ── Google Search Console verification ───────────────────────────────
     Replace the empty string below with your verification token from
     https://search.google.com/search-console → Add property → HTML tag.
     ──────────────────────────────────────────────────────────────────── */
  verification: {
    google: "", // e.g. "aBcDeFgHiJkLmNo12345"
  },
};

/* ── JSON-LD structured data (LocalBusiness) ──────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  "@id": BASE_URL,
  "name": "Warriors Sport Arg",
  "alternateName": "Warriors Sport San Martín",
  "description": "Gimnasio en San Martín y Villa San Andrés, Buenos Aires. Musculación, Funcional, Yoga y Curso de Entrenador.",
  "url": BASE_URL,
  "telephone": "+5491168272020",
  "priceRange": "$$",
  "image": `${BASE_URL}/images/gym-entrance.webp`,
  "sameAs": [
    "https://www.instagram.com/warriors.sport.arg.sm/",
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. 25 de Mayo 1859",
    "addressLocality": "San Martín",
    "addressRegion": "Buenos Aires",
    "postalCode": "B1650",
    "addressCountry": "AR",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -34.5757101,
    "longitude": -58.5321226,
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "07:00",
      "closes": "23:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "08:00",
      "closes": "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "08:00",
      "closes": "12:00",
    },
  ],
  "hasMap": "https://maps.app.goo.gl/XeGYEhiT4VMDqPqRA",
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Musculación", "value": true },
    { "@type": "LocationFeatureSpecification", name: "Clases de Funcional", value: true },
    { "@type": "LocationFeatureSpecification", name: "Clases de Yoga",      value: true },
    { "@type": "LocationFeatureSpecification", name: "Instructores certificados", value: true },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${bebasNeue.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-black text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
