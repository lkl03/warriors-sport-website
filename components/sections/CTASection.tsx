import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 bg-[#dc2626] relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/10 rounded-full blur-[80px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-white/70 text-xs font-semibold uppercase tracking-[0.4em] mb-4">
          ¿Listo para empezar?
        </p>
        <h2 className="font-display text-5xl lg:text-8xl text-white tracking-wider leading-none mb-6">
          COMENZÁ HOY
        </h2>
        <p className="text-white/75 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Tu primer clase de prueba es gratis. Reservá tu lugar y descubrí por qué Warriors Sport es tu 2da casa.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://warriors.turnosweb.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#dc2626] hover:bg-white/90 font-bold px-10 py-4 rounded text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 shadow-xl"
          >
            Reservar clase gratis
          </a>
          <Link
            href="/contacto"
            className="border-2 border-white text-white hover:bg-white/10 font-semibold px-10 py-4 rounded text-sm uppercase tracking-widest transition-all duration-200"
          >
            Contactarnos
          </Link>
        </div>
      </div>
    </section>
  );
}
