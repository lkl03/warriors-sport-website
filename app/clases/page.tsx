import ClassesSection from "@/components/sections/ClassesSection";
import ScheduleSection from "@/components/sections/ScheduleSection";
import CTASection from "@/components/sections/CTASection";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clases | Warriors Sport San Martín",
  description: "Conocé todas las disciplinas de Warriors Sport: Boxeo, CrossFit, Funcional, Pilates, Spinning y GAP. Horarios y detalles.",
};

export default function ClasesPage() {
  return (
    <ScrollRevealProvider>
      {/* Page hero */}
      <section className="pt-32 pb-16 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#dc2626] text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Warriors Sport
          </p>
          <h1 className="font-display text-6xl lg:text-9xl text-white tracking-wider leading-none mb-4">
            CLASES &<br />
            <span className="text-[#dc2626]">HORARIOS</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl leading-relaxed">
            6 disciplinas, múltiples horarios y una comunidad que te acompaña. Encontrá la clase perfecta para vos.
          </p>
        </div>
      </section>

      <ClassesSection />
      <ScheduleSection />
      <CTASection />
    </ScrollRevealProvider>
  );
}
