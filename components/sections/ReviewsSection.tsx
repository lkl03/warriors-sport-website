/* Reviews — real Google reviews from Warriors Sport Arg S. M. */

const MAPS_URL =
  "https://www.google.com/maps/place/Warriors+Sport+Arg+S.+M./@-34.5757057,-58.5346975,17z/data=!4m8!3m7!1s0x95bcb7bc9ac68f5d:0x9320f80df6b9dfeb!8m2!3d-34.5757101!4d-58.5321226!9m1!1b1!16s%2Fg%2F11y0b8m7c2?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D";

const reviews = [
  {
    name:   "Silvana Mariel Barbito",
    role:   "Local Guide",
    date:   "hace 4 meses",
    avatar: "S",
    stars:  5,
    text:   "Gimnasio de alto nivel, equipos nuevos y ambiente de calidad. Atención personalizada de los profes. Te arman rutina de gym y asesoran en lo que necesites. Amplios espacios para entrenar. Precios de cuota y clases acordes al nivel que ofrecen. Super recomendado!!!",
  },
  {
    name:   "Mir Barrios",
    role:   "Local Guide",
    date:   "hace 7 meses",
    avatar: "M",
    stars:  5,
    text:   "Excelente gimnasio! Muy completo, 3 pisos de máquinas!!!!! Y todas nuevas! Es espacioso, tiene 2 pisos más de actividades recreativas más otro piso de abdominales! Ver para creer!!! Increíble para entrenar, el mejor de san Martín.",
  },
  {
    name:   "Blaz Lopez",
    role:   "",
    date:   "hace 2 meses",
    avatar: "B",
    stars:  5,
    text:   "La verdad es que este gimnasio me sorprendió por bien y por eso se merece las 5 estrellas. Tiene máquinas nuevas, todo está bien cuidado y la iluminación es excelente, lo que hace que entrenar sea mucho más cómodo. Cuenta con tres pisos, cada uno con diferentes máquinas, y la verdad que impresiona lo grande que es el lugar. A diferencia de muchos gimnasios que se llenan en ciertos horarios, acá se puede entrenar bastante tranquilo. Por lo demás, es un gimnasio casi perfecto. Sin dudas, vale la pena invertir tu sueldo en entrenar acá.",
  },
  {
    name:   "Nilceia Da Silva Azevedo",
    role:   "Local Guide",
    date:   "hace 7 meses",
    avatar: "N",
    stars:  5,
    text:   "Excelente gimnasio! La instalación es muy grande con varios pisos y super equipado con máquinas nuevas. El mejor de la zona! Destaco la buena onda en la atención! Ale que está en recepción muy simpática y los profes son muy atentos, te explican super bien los ejercicios!",
  },
  {
    name:   "Damian Esta",
    role:   "Local Guide",
    date:   "hace 4 meses",
    avatar: "D",
    stars:  5,
    text:   "Gran cantidad y variedad de máquinas, muy amplio el lugar, muy buena atención del personal, y cerquita de la peatonal!!!",
  },
  {
    name:   "Pablo Labolida",
    role:   "",
    date:   "hace 3 meses",
    avatar: "P",
    stars:  5,
    text:   "Excelente gimnasio! Máquinas nuevas y en cantidad, lugar de sobra que va a seguir llenándose de máquinas, horario amplio y profes excelentes. No se puede pedir más, muy recomendable.",
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-24 bg-black" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14 reveal">
          <p className="text-[#7EEF08] text-xs font-bold uppercase tracking-[0.3em] mb-3">Google Reviews</p>
          <h2 className="font-display text-5xl lg:text-7xl text-white tracking-wider leading-none mb-4">
            LO QUE DICEN <span className="text-[#7EEF08] green-glow">DE NOSOTROS</span>
          </h2>

          {/* 5-star badge */}
          <div className="inline-flex items-center gap-3 bg-[#0d0d0d] border border-[#7EEF08]/30 rounded-2xl px-6 py-3">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <span key={i} className="text-[#F9AB00] text-xl">★</span>)}
            </div>
            <div className="text-left">
              <p className="text-white font-display text-2xl tracking-wide leading-none">5.0</p>
              <p className="text-white/40 text-xs">en Google Reviews</p>
            </div>
            <div className="border-l border-[#1e1e1e] pl-3 ml-1">
              <svg viewBox="0 0 48 48" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
                <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
                <path fill="#34A853" d="M6.3 14.7l7 5.1C15.2 16.3 19.3 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.4 2 9.9 7.4 6.3 14.7z"/>
                <path fill="#FBBC05" d="M24 46c5.5 0 10.5-1.9 14.4-5l-6.6-5.6C29.7 37 27 38 24 38c-6 0-11-4-12.9-9.5l-7 5.4C7.9 41.9 15.4 46 24 46z"/>
                <path fill="#EA4335" d="M44.5 20H24v8.5h11.8c-.8 2.5-2.4 4.6-4.5 6l6.6 5.6C41.6 37 44.5 31 44.5 24c0-1.3-.2-2.7-.5-4z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Reviews — masonry-style columns for natural height variation */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 mb-10">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className={`break-inside-avoid mb-5 reveal reveal-delay-${(i % 3) + 1} bg-[#0d0d0d] border border-[#1e1e1e] rounded-2xl p-6 flex flex-col gap-4 hover:border-[#2a2a2a] transition-colors duration-300`}
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(j => <span key={j} className="text-[#F9AB00] text-sm">★</span>)}
              </div>

              {/* Text */}
              <p className="text-white/65 text-sm leading-relaxed">"{r.text}"</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-[#1a1a1a]">
                <div className="w-9 h-9 rounded-full bg-[#7EEF08]/15 border border-[#7EEF08]/25 flex items-center justify-center shrink-0">
                  <span className="text-[#7EEF08] font-bold text-sm">{r.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{r.name}</p>
                  <div className="flex items-center gap-2">
                    {r.role && (
                      <span className="text-[#7EEF08]/60 text-[10px] font-medium">{r.role}</span>
                    )}
                    {r.role && <span className="text-white/20 text-[10px]">·</span>}
                    <span className="text-white/30 text-[10px]">{r.date}</span>
                  </div>
                </div>
                {/* Google G */}
                <svg viewBox="0 0 24 24" width="16" height="16" className="shrink-0 opacity-40" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#4285F4" d="M22.5 10H12v4.5h6C17.4 17 14.9 18.5 12 18.5c-3.6 0-6.5-2.9-6.5-6.5S8.4 5.5 12 5.5c1.55 0 2.95.55 4.05 1.45l3.2-3.2C17.3 2.05 14.8 1 12 1 5.95 1 1 5.95 1 12s4.95 11 11 11c5.5 0 10.5-4 10.5-11 0-.65-.1-1.35-.25-2z"/>
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Ver más */}
        <div className="text-center reveal">
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-[#7EEF08]/40 hover:border-[#7EEF08] text-white/70 hover:text-white px-8 py-3.5 rounded-xl text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-[#7EEF08]/5"
          >
            <svg viewBox="0 0 48 48" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
              <path fill="#34A853" d="M6.3 14.7l7 5.1C15.2 16.3 19.3 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.4 2 9.9 7.4 6.3 14.7z"/>
              <path fill="#FBBC05" d="M24 46c5.5 0 10.5-1.9 14.4-5l-6.6-5.6C29.7 37 27 38 24 38c-6 0-11-4-12.9-9.5l-7 5.4C7.9 41.9 15.4 46 24 46z"/>
              <path fill="#EA4335" d="M44.5 20H24v8.5h11.8c-.8 2.5-2.4 4.6-4.5 6l6.6 5.6C41.6 37 44.5 31 44.5 24c0-1.3-.2-2.7-.5-4z"/>
            </svg>
            Ver más reseñas en Google
          </a>
        </div>

      </div>
    </section>
  );
}
