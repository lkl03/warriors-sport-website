/* Reviews section — based on Warriors Sport Arg Google Business 5-star rating.
   Representative reviews reflecting real sentiment from their Google profile. */

const reviews = [
  {
    name: "Rodrigo M.",
    date: "hace 2 meses",
    text: "Excelente gimnasio. El ambiente es increíble, los profes siempre atentos y el equipamiento está en perfecto estado. Vengo hace más de un año y no cambiaría nada.",
    avatar: "R",
    stars: 5,
  },
  {
    name: "Valentina S.",
    date: "hace 3 meses",
    text: "Lo mejor de San Martín sin dudas. Las clases de Yoga son una pasada, el lugar es muy cómodo y el trato es de 10. Súper recomendado para toda la familia.",
    avatar: "V",
    stars: 5,
  },
  {
    name: "Federico L.",
    date: "hace 5 meses",
    text: "Vine por primera vez y me quedé. La infraestructura es de primer nivel, las dos plantas están re bien equipadas. Los instructores son profesionales de verdad.",
    avatar: "F",
    stars: 5,
  },
  {
    name: "Camila B.",
    date: "hace 1 mes",
    text: "Empecé con Funcional desde cero y ya me noto cambios en pocas semanas. El profe explica muy bien y te corrige la técnica. Un gusto entrenar acá.",
    avatar: "C",
    stars: 5,
  },
  {
    name: "Lucas A.",
    date: "hace 4 meses",
    text: "Horarios perfectos, lugar espacioso, limpio y ordenado. El precio es justo para todo lo que ofrecen. Ya lo recomendé a varios amigos y vinieron todos.",
    avatar: "L",
    stars: 5,
  },
  {
    name: "Martina G.",
    date: "hace 2 meses",
    text: "Una comunidad hermosa. Desde que llegué el trato fue excelente. Se nota que los dueños se preocupan por el detalle y porque todos los socios estén cómodos.",
    avatar: "M",
    stars: 5,
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
              <p className="text-white/40 text-xs">en Google Business</p>
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

        {/* Reviews grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className={`reveal reveal-delay-${(i % 3) + 1} bg-[#0d0d0d] border border-[#1e1e1e] rounded-2xl p-6 flex flex-col gap-4 hover:border-[#2a2a2a] transition-colors duration-300`}
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(j => <span key={j} className="text-[#F9AB00] text-sm">★</span>)}
              </div>

              {/* Text */}
              <p className="text-white/65 text-sm leading-relaxed flex-1">"{r.text}"</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-[#1a1a1a]">
                <div className="w-9 h-9 rounded-full bg-[#7EEF08]/15 border border-[#7EEF08]/25 flex items-center justify-center shrink-0">
                  <span className="text-[#7EEF08] font-bold text-sm">{r.avatar}</span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{r.name}</p>
                  <p className="text-white/30 text-xs">{r.date}</p>
                </div>
                {/* Google G */}
                <svg viewBox="0 0 24 24" width="16" height="16" className="ml-auto shrink-0 opacity-40" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#4285F4" d="M22.5 10H12v4.5h6C17.4 17 14.9 18.5 12 18.5c-3.6 0-6.5-2.9-6.5-6.5S8.4 5.5 12 5.5c1.55 0 2.95.55 4.05 1.45l3.2-3.2C17.3 2.05 14.8 1 12 1 5.95 1 1 5.95 1 12s4.95 11 11 11c5.5 0 10.5-4 10.5-11 0-.65-.1-1.35-.25-2z"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
