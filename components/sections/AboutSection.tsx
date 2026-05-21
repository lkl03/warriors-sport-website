export default function AboutSection() {
  return (
    <section id="nosotros" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="reveal-left">
            <p className="text-[#dc2626] text-xs font-semibold uppercase tracking-[0.3em] mb-4">
              Quiénes somos
            </p>
            <h2 className="font-display text-5xl lg:text-7xl text-white tracking-wider leading-none mb-6">
              MÁS QUE<br />
              <span className="text-[#dc2626]">UN GIMNASIO</span>
            </h2>
            <p className="text-white/60 text-base lg:text-lg leading-relaxed mb-6">
              Warriors Sport nació con una misión simple: ser tu segundo hogar. Un espacio donde cada
              persona, sin importar su nivel, encuentre la motivación, el equipo y el entorno para
              superarse día a día.
            </p>
            <p className="text-white/50 text-base leading-relaxed mb-10">
              Contamos con instalaciones de primer nivel en San Martín, instructores certificados y
              una comunidad que te acompaña en cada etapa de tu camino. Desde el primer entrenamiento
              hasta el más exigente, acá siempre hay un lugar para vos.
            </p>
            <div className="flex flex-wrap gap-4">
              {["Instructores certificados", "Equipamiento premium", "Comunidad activa", "Horarios flexibles"].map((tag) => (
                <span
                  key={tag}
                  className="border border-[#dc2626]/40 text-[#dc2626] text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Visual grid */}
          <div className="reveal-right grid grid-cols-2 gap-3">
            {/* Card 1 — large */}
            <div className="col-span-2 bg-gradient-to-br from-[#dc2626]/20 to-[#1a0a0a] border border-[#dc2626]/20 rounded-2xl p-8 flex flex-col justify-end min-h-[180px]">
              <p className="font-display text-4xl text-white tracking-wide">TU 2DA</p>
              <p className="font-display text-4xl text-[#dc2626] tracking-wide">CASA</p>
            </div>
            {/* Card 2 */}
            <div className="bg-[#111] border border-[#222] rounded-2xl p-6 flex flex-col gap-3">
              <div className="w-10 h-10 bg-[#dc2626] rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">💪</span>
              </div>
              <p className="font-display text-2xl text-white tracking-wide">FUERZA</p>
              <p className="text-white/40 text-xs leading-relaxed">Entrenamiento orientado a resultados reales</p>
            </div>
            {/* Card 3 */}
            <div className="bg-[#111] border border-[#222] rounded-2xl p-6 flex flex-col gap-3">
              <div className="w-10 h-10 bg-[#f59e0b]/20 rounded-lg flex items-center justify-center">
                <span className="text-[#f59e0b] text-lg">🔥</span>
              </div>
              <p className="font-display text-2xl text-white tracking-wide">PASIÓN</p>
              <p className="text-white/40 text-xs leading-relaxed">Una comunidad que te potencia cada día</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
