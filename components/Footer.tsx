import Image from "next/image";
import InstagramIcon from "@/components/icons/InstagramIcon";

const WA_SM = "https://wa.me/5491168272020?text=Hola%2C%20quiero%20m%C3%A1s%20info%20sobre%20Warriors%20Sport%20San%20Mart%C3%ADn%20%F0%9F%92%AA";
const WA_SA = "https://wa.me/5491133199615?text=Hola%2C%20quiero%20m%C3%A1s%20info%20sobre%20Warriors%20Sport%20San%20Andr%C3%A9s%20%F0%9F%92%AA";

export default function Footer() {
  const year = new Date().getFullYear();

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
              Tu segunda casa. Donde empieza tu transformación.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-[#7EEF08] text-xs font-bold uppercase tracking-[0.25em] mb-4">Navegación</p>
            <ul className="space-y-2.5">
              {[
                { href: "#inicio",    label: "Inicio" },
                { href: "#nosotros",  label: "Nosotros" },
                { href: "#horarios",  label: "Horarios" },
                { href: "#sedes",     label: "Sedes" },
                { href: "#contacto",  label: "Contacto" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="text-white/45 hover:text-white text-sm transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[#7EEF08] text-xs font-bold uppercase tracking-[0.25em] mb-4">Contacto</p>
            <div className="space-y-4">

              {/* San Martín */}
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">San Martín</p>
                <p className="text-white/70 text-sm">Av. 25 de Mayo 1859</p>
                <p className="text-white/70 text-sm">B1650 San Martín, Bs. As.</p>
              </div>

              {/* San Andrés */}
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">San Andrés</p>
                <p className="text-white/70 text-sm">J. M. Campos 2571</p>
                <p className="text-white/70 text-sm">B1651 Villa San Andrés, Bs. As.</p>
              </div>

              {/* WhatsApp */}
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">WhatsApp</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-white/30 text-[11px] uppercase tracking-widest leading-none mb-0.5">San Martín</p>
                    <a
                      href={WA_SM}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#7EEF08] text-sm hover:underline"
                    >
                      11 6827-2020
                    </a>
                  </div>
                  <div>
                    <p className="text-white/30 text-[11px] uppercase tracking-widest leading-none mb-0.5">San Andrés</p>
                    <a
                      href={WA_SA}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#7EEF08] text-sm hover:underline"
                    >
                      11 3319-9615
                    </a>
                  </div>
                </div>
              </div>

              {/* Instagram */}
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Instagram</p>
                <a
                  href="https://www.instagram.com/warriors.sport.arg.sm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-white/60 hover:text-[#7EEF08] text-sm transition-colors"
                >
                  <InstagramIcon size={14} /> @warriors.sport.arg.sm
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1a1a1a] pt-6">
          <p className="text-white/20 text-xs text-center mb-0">
            © {year} Warriors Sport Arg. Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* Credit bar */}
      <div className="bg-[#212121]">
        <div className="mx-auto w-full max-w-screen-2xl px-4 py-2 sm:px-6 lg:px-8">
          <p className="footer-credit text-center text-xs text-white/80">
            ©{year} | diseñado y desarrollado por{' '}
            <a
              href="https://eterlab.co/"
              target="_blank"
              rel="noreferrer"
              className="italic text-white/90 transition-colors hover:text-white"
            >
              eterlab.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
