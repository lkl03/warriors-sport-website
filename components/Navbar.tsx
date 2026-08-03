"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

/* Rutas absolutas (`/#seccion`) para que el menú también funcione desde
   subpáginas como /rutinas, y no solo desde el home. */
const links = [
  { href: "/#inicio",    label: "Inicio" },
  { href: "/#nosotros",  label: "Nosotros" },
  { href: "/#horarios",  label: "Horarios" },
  { href: "/#sedes",     label: "Sedes" },
  { href: "/#contacto",  label: "Contacto" },
];

const WA_LINK = "https://wa.me/5491168272020?text=Hola%2C%20quiero%20m%C3%A1s%20info%20sobre%20Warriors%20Sport%20%F0%9F%92%AA";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/96 backdrop-blur-md shadow-lg shadow-black/50" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/#inicio" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image src="/images/logo.jpg" alt="Warriors Sport" width={36} height={36} className="rounded" />
          <div className="flex flex-col leading-none">
            <span className="font-display text-white text-base tracking-widest">WARRIORS</span>
            <span className="font-display text-[#7EEF08] text-[10px] tracking-[0.35em]">SPORT ARG</span>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-xs text-white/65 hover:text-[#7EEF08] transition-colors duration-200 tracking-widest uppercase font-medium">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 bg-[#7EEF08] hover:bg-[#5abc06] text-black text-xs font-bold px-5 py-2.5 rounded transition-all duration-200 tracking-widest uppercase hover:scale-105"
        >
          Empezá hoy
        </a>

        {/* Mobile burger */}
        <button className="md:hidden text-white p-1" onClick={() => setOpen(!open)} aria-label="Menú">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden bg-black/98 backdrop-blur-md transition-all duration-300 overflow-hidden ${open ? "max-h-80 border-t border-white/10" : "max-h-0"}`}>
        <ul className="flex flex-col px-6 py-4 gap-4">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block text-white/80 hover:text-[#7EEF08] text-sm font-medium uppercase tracking-widest transition-colors">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="block bg-[#7EEF08] text-black text-center font-bold py-3 rounded uppercase tracking-widest text-sm mt-2" onClick={() => setOpen(false)}>
              Empezá hoy
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
