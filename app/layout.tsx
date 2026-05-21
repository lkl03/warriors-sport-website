import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const bebasNeue = Bebas_Neue({ variable: "--font-bebas", weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Warriors Sport Arg | San Martín — Tu 2da Casa",
  description:
    "Gimnasio Warriors Sport en San Martín, Buenos Aires. Musculación, Funcional, Yoga y más. Donde empieza tu transformación.",
  keywords: ["gimnasio", "warriors sport", "san martín", "musculación", "funcional", "yoga"],
  openGraph: {
    title: "Warriors Sport Arg | San Martín",
    description: "Tu 2da Casa. Donde empieza tu transformación.",
    images: ["/images/gym-entrance.webp"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body className="min-h-screen flex flex-col bg-black text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
