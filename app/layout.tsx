import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Warriors Sport | Tu 2da Casa — San Martín",
  description:
    "Gimnasio Warriors Sport en San Martín, Buenos Aires. Boxeo, CrossFit, Funcional, Pilates, Spinning y GAP. Comenzá hoy tu transformación.",
  keywords: ["gimnasio", "warriors sport", "san martín", "boxeo", "crossfit", "funcional"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
