"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/#inicio",   label: "Inicio" },
  { href: "/clases",    label: "Clases" },
  { href: "/planes",    label: "Planes" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/contacto",  label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur-md shadow-lg shadow-black/40"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <div className="w-9 h-9 bg-[#dc2626] rounded-sm flex items-center justify-center">
            <span className="font-display text-white text-xl leading-none">W</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-white text-lg tracking-widest">WARRIORS</span>
            <span className="font-display text-[#dc2626] text-xs tracking-[0.3em]">SPORT</span>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm text-white/70 hover:text-white transition-colors duration-200 tracking-wide uppercase font-medium"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="https://warriors.turnosweb.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-semibold px-5 py-2 rounded transition-colors duration-200 tracking-wide uppercase"
        >
          Reservar clase
        </a>

        {/* Mobile burger */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-black/98 backdrop-blur-md transition-all duration-300 overflow-hidden ${
          open ? "max-h-96 border-t border-white/10" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-4 gap-4">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block text-white/80 hover:text-white text-base font-medium uppercase tracking-wide transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="https://warriors.turnosweb.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#dc2626] text-white text-center font-semibold py-3 rounded uppercase tracking-wide mt-2"
              onClick={() => setOpen(false)}
            >
              Reservar clase
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
