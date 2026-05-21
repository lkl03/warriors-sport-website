import Image from "next/image";
import InstagramIcon from "@/components/icons/InstagramIcon";

const WA_LINK = "https://wa.me/5491168272020?text=Hola%2C%20quiero%20m%C3%A1s%20info%20sobre%20Warriors%20Sport%20%F0%9F%92%AA";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#1e1e1e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Image src="/images/logo.jpg" alt="Warriors Sport" width={36} height={36} className="rounded" />
              <div className="flex flex-col leading-none">
                <span className="font-display text-white text-base tracking-widest">WARRIORS</span>
                <span className="font-display text-[#7EEF08] text-[10px] tracking-[0.35em]">SPORT ARG</span>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Tu 2da casa. Donde empieza tu transformación.
              San Martín, Buenos Aires.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-[#7EEF08] text-xs font-bold uppercase tracking-[0.25em] mb-4">Navegación</p>
            <ul className="space-y-2.5">
              {["#inicio", "#nosotros", "#horarios", "#sedes", "#contacto"].map((href) => (
                <li key={href}>
                  <a href={href} className="text-white/45 hover:text-white text-sm transition-colors capitalize">
                    {href.replace("#", "")}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[#7EEF08] text-xs font-bold uppercase tracking-[0.25em] mb-4">Contacto</p>
            <div className="space-y-3">
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Dirección</p>
                <p className="text-white/70 text-sm">Av. 25 de Mayo 1859</p>
                <p className="text-white/70 text-sm">B1650 San Martín, Bs. As.</p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">WhatsApp</p>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-[#7EEF08] text-sm hover:underline">
                  11 6827-2020
                </a>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Instagram</p>
                <a href="https://www.instagram.com/warriors.sport.arg.sm/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-white/60 hover:text-[#7EEF08] text-sm transition-colors">
                  <InstagramIcon size={14} /> @warriors.sport.arg.sm
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1a1a1a] pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-white/20 text-xs">© {new Date().getFullYear()} Warriors Sport Arg. Todos los derechos reservados.</p>
          <p className="text-white/15 text-xs">Diseño y desarrollo por eterlab.co</p>
        </div>
      </div>
    </footer>
  );
}
