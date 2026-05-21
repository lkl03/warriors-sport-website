import { MapPin, Clock, Phone } from "lucide-react";

const WA_LINK = "https://wa.me/5491168272020?text=Hola%2C%20quiero%20m%C3%A1s%20info%20sobre%20Warriors%20Sport%20%F0%9F%92%AA";

export default function SedesSection() {
  return (
    <section id="sedes" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14 reveal">
          <p className="text-[#7EEF08] text-xs font-bold uppercase tracking-[0.3em] mb-3">Dónde estamos</p>
          <h2 className="font-display text-5xl lg:text-7xl text-white tracking-wider leading-none">
            NUESTRA <span className="text-[#7EEF08] green-glow">SEDE</span>
          </h2>
          <p className="text-white/45 mt-4 text-base max-w-md mx-auto">San Martín, Buenos Aires — fácil acceso en transporte público.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">

          {/* Map */}
          <div className="reveal-left rounded-2xl overflow-hidden border border-[#1e1e1e] min-h-[380px]">
            <iframe
              title="Warriors Sport San Martín"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.3!2d-58.5388!3d-34.5750!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb836c7f41e83%3A0x9cc5a21e4cf3c9b3!2sWarriors%20Sport%20Arg!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "380px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Info card */}
          <div className="reveal-right flex flex-col gap-5">

            {/* Name */}
            <div className="bg-[#0d0d0d] border border-[#7EEF08]/25 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#7EEF08]/10 rounded-lg flex items-center justify-center">
                  <MapPin size={18} className="text-[#7EEF08]" />
                </div>
                <div>
                  <p className="text-white font-bold text-base">Warriors Sport Arg</p>
                  <p className="text-[#7EEF08] text-xs font-semibold">San Martín</p>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                Av. 25 de Mayo 1859<br />
                B1650 San Martín<br />
                Provincia de Buenos Aires
              </p>
            </div>

            {/* Hours */}
            <div className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#7EEF08]/10 rounded-lg flex items-center justify-center">
                  <Clock size={18} className="text-[#7EEF08]" />
                </div>
                <p className="text-white font-bold">Horarios</p>
              </div>
              <div className="space-y-2 text-sm">
                {[
                  ["Lun – Vie", "07:00 – 23:00 hs."],
                  ["Sábados",   "08:00 – 18:00 hs."],
                  ["Domingos",  "09:00 – 12:00 hs."],
                ].map(([d, h]) => (
                  <div key={d} className="flex justify-between">
                    <span className="text-white/50">{d}</span>
                    <span className="text-white/80 font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#7EEF08]/10 rounded-lg flex items-center justify-center">
                  <Phone size={18} className="text-[#7EEF08]" />
                </div>
                <p className="text-white font-bold">Contacto</p>
              </div>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#7EEF08]/10 hover:bg-[#7EEF08]/20 border border-[#7EEF08]/30 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl">💬</span>
                <div>
                  <p className="text-[#7EEF08] font-bold text-sm">WhatsApp</p>
                  <p className="text-white/60 text-xs">11 6827-2020</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
