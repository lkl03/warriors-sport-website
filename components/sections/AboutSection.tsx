import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="nosotros" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Text */}
          <div className="reveal-left">
            <p className="text-[#7EEF08] text-xs font-bold uppercase tracking-[0.3em] mb-4">
              Quiénes somos
            </p>
            <h2 className="font-display text-5xl lg:text-7xl text-white tracking-wider leading-none mb-6">
              MÁS QUE<br />
              <span className="text-[#7EEF08] green-glow">UN GIMNASIO</span>
            </h2>
            <p className="text-white/65 text-base lg:text-lg leading-relaxed mb-4">
              Warriors Sport nació para ser <strong className="text-white">tu segunda casa</strong>. Un espacio donde cada persona, sin importar su nivel, encuentra el entorno ideal para transformarse — física y mentalmente.
            </p>
            <p className="text-white/50 text-base leading-relaxed mb-4">
              Con más de 7 años en San Martín, contamos con dos sedes, equipamiento de primer nivel y un equipo de instructores certificados comprometidos con tu proceso.
            </p>
            <p className="text-white/50 text-base leading-relaxed mb-10">
              Más que un gimnasio, somos una <strong className="text-white/80">familia</strong>. Cuidamos cada etapa de tu camino y celebramos cada logro.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              {["2 Sedes", "+7 Años", "Instructores certificados", "Equipamiento premium", "Comunidad activa"].map((t) => (
                <span key={t} className="border border-[#7EEF08]/35 text-[#7EEF08]/80 text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wide">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* 5-space gallery: 2 imgs · video (full width) · 2 imgs */}
          <div className="reveal-right">
            <div className="grid grid-cols-2 gap-3">

              {/* Row 1: two images */}
              <div className="rounded-xl overflow-hidden border border-[#1e1e1e] aspect-square">
                <Image
                  src="/images/gym-floor.webp"
                  alt="Planta baja Warriors Sport"
                  width={400} height={400}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-xl overflow-hidden border border-[#1e1e1e] aspect-square">
                <Image
                  src="/images/gym-reception.webp"
                  alt="Recepción Warriors Sport"
                  width={400} height={400}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Row 2: video full width */}
              <div className="col-span-2 rounded-2xl overflow-hidden border border-[#1e1e1e]" style={{ aspectRatio: "16/7" }}>
                <video
                  src="/images/gym-video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Row 3: two images */}
              <div className="rounded-xl overflow-hidden border border-[#1e1e1e] aspect-square">
                <Image
                  src="/images/gym-machine-brand.webp"
                  alt="Equipamiento Warriors Sport"
                  width={400} height={400}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-xl overflow-hidden border border-[#1e1e1e] aspect-square">
                <Image
                  src="/images/gym-weights.webp"
                  alt="Pesas Warriors Sport"
                  width={400} height={400}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
