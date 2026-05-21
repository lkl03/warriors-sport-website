import ContactSection from "@/components/sections/ContactSection";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | Warriors Sport San Martín",
  description: "Contactá a Warriors Sport en San Martín. Horarios, ubicación, reservas y consultas.",
};

export default function ContactoPage() {
  return (
    <ScrollRevealProvider>
      <section className="pt-32 pb-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#dc2626] text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Warriors Sport
          </p>
          <h1 className="font-display text-6xl lg:text-9xl text-white tracking-wider leading-none mb-4">
            HABLEMOS
          </h1>
          <p className="text-white/50 text-lg max-w-xl leading-relaxed">
            ¿Tenés dudas sobre planes, clases u horarios? Escribinos y te respondemos a la brevedad.
          </p>
        </div>
      </section>
      <ContactSection />
    </ScrollRevealProvider>
  );
}
