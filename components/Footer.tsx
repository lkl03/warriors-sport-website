import Link from "next/link";
import InstagramIcon from "@/components/icons/InstagramIcon";

const links = {
  Navegación: [
    { href: "/",         label: "Inicio" },
    { href: "/clases",   label: "Clases" },
    { href: "/planes",   label: "Planes" },
    { href: "/contacto", label: "Contacto" },
  ],
  Disciplinas: [
    { href: "/clases#boxeo",      label: "Boxeo" },
    { href: "/clases#crossfit",   label: "CrossFit" },
    { href: "/clases#funcional",  label: "Funcional" },
    { href: "/clases#pilates",    label: "Pilates" },
    { href: "/clases#spinning",   label: "Spinning" },
    { href: "/clases#gap",        label: "GAP" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#dc2626] rounded-sm flex items-center justify-center">
                <span className="font-display text-white text-xl leading-none">W</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-white text-lg tracking-widest">WARRIORS</span>
                <span className="font-display text-[#dc2626] text-xs tracking-[0.3em]">SPORT</span>
              </div>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-4">
              Tu 2da casa. Entrenamos con propósito en San Martín, Buenos Aires.
            </p>
            <a
              href="https://www.instagram.com/warriors.sport.arg.sm/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/40 hover:text-[#dc2626] text-sm transition-colors"
            >
              <InstagramIcon size={16} />
              @warriors.sport.arg.sm
            </a>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <p className="text-white text-xs font-semibold uppercase tracking-[0.2em] mb-5">{title}</p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white/40 hover:text-white text-sm transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA */}
          <div>
            <p className="text-white text-xs font-semibold uppercase tracking-[0.2em] mb-5">Reservas</p>
            <p className="text-white/40 text-sm mb-4 leading-relaxed">
              Reservá tus clases, gestioná pagos y más desde nuestra app.
            </p>
            <a
              href="https://warriors.turnosweb.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold text-xs px-5 py-2.5 rounded uppercase tracking-widest transition-colors"
            >
              Abrir app →
            </a>
          </div>
        </div>

        <div className="border-t border-[#1a1a1a] pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Warriors Sport. San Martín, Buenos Aires.
          </p>
          <p className="text-white/20 text-xs">
            Diseño y desarrollo web por eterlab.co
          </p>
        </div>
      </div>
    </footer>
  );
}
