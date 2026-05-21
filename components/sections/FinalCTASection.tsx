const WA_LINK = "https://wa.me/5491168272020?text=Hola%2C%20quiero%20m%C3%A1s%20info%20sobre%20Warriors%20Sport%20%F0%9F%92%AA";

export default function FinalCTASection() {
  return (
    <section id="contacto" className="py-20 bg-[#0a0a0a] relative overflow-hidden">

      {/* Background: green glow center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[350px] bg-[#7EEF08]/6 rounded-full blur-[100px]" />
      </div>

      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7EEF08]/50 to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <p className="text-[#7EEF08] text-xs font-bold uppercase tracking-[0.4em] mb-5">¿Listo para empezar?</p>

        <h2 className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-none tracking-wider mb-5">
          <span className="text-white">EMPEZÁ</span><br />
          <span className="text-[#7EEF08] green-glow">HOY</span>
        </h2>

        <p className="text-white/55 text-base lg:text-lg mb-4 leading-relaxed max-w-xl mx-auto">
          Tu primera clase de prueba es <strong className="text-white">gratis</strong>.<br />
          Escribinos por WhatsApp y te contamos todo.
        </p>

        {/* Taglines */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            "🏠 Tu segunda casa",
            "💥 Donde empieza tu transformación",
            "🏋️‍♂️ Más que un gym, una familia",
          ].map((t) => (
            <span key={t} className="bg-[#7EEF08]/8 border border-[#7EEF08]/20 text-white/60 text-xs px-3 py-1.5 rounded-full">
              {t}
            </span>
          ))}
        </div>

        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#7EEF08] hover:bg-[#5abc06] text-black font-bold px-10 py-5 rounded-2xl text-base uppercase tracking-widest transition-all duration-200 hover:scale-105 shadow-2xl shadow-[#7EEF08]/20 animate-green-pulse"
        >
          <svg viewBox="0 0 32 32" width="24" height="24" fill="black" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.682 4.61 1.863 6.502L4 29l7.697-1.826A11.929 11.929 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 2c5.523 0 10 4.477 10 10S21.523 25 16 25c-1.845 0-3.574-.502-5.06-1.377L10.5 23.4l-3.4.807.838-3.3-.24-.385A9.955 9.955 0 016 15C6 9.477 10.477 5 16 5zm-3.177 5c-.2 0-.522.075-.796.375-.273.3-1.044 1.02-1.044 2.487s1.068 2.888 1.217 3.087c.15.2 2.063 3.3 5.11 4.5.713.275 1.27.44 1.703.563.716.205 1.368.176 1.883.107.574-.078 1.77-.723 2.02-1.42.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.574-.35-.3-.15-1.77-.875-2.045-.975-.273-.1-.472-.15-.672.15-.2.3-.772.975-.947 1.175-.175.2-.35.225-.65.075-.3-.15-1.265-.465-2.41-1.485-.892-.793-1.494-1.773-1.669-2.073-.175-.3-.018-.462.131-.612.135-.134.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.672-1.623-.922-2.22-.243-.582-.49-.503-.672-.512a12.9 12.9 0 00-.573-.013z"/>
          </svg>
          Escribinos por WhatsApp
        </a>

        <p className="text-white/25 text-xs mt-6">11 6827-2020 · Warriors Sport San Martín</p>
      </div>
    </section>
  );
}
