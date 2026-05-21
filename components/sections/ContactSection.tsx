"use client";

import { useState } from "react";
import { Clock, MapPin, Smartphone } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";

export default function ContactSection() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contacto" className="py-24 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <p className="text-[#dc2626] text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Estamos acá
          </p>
          <h2 className="font-display text-5xl lg:text-7xl text-white tracking-wider leading-none">
            <span className="text-[#dc2626]">CONTACTO</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="reveal-left space-y-6">
            <div className="bg-[#111] border border-[#1a1a1a] rounded-2xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 bg-[#dc2626]/10 rounded-lg flex items-center justify-center shrink-0">
                <MapPin size={18} className="text-[#dc2626]" />
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Ubicación</p>
                <p className="text-white/55 text-sm">San Martín, Buenos Aires</p>
                <p className="text-white/55 text-sm">Argentina</p>
              </div>
            </div>

            <div className="bg-[#111] border border-[#1a1a1a] rounded-2xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 bg-[#dc2626]/10 rounded-lg flex items-center justify-center shrink-0">
                <Clock size={18} className="text-[#dc2626]" />
              </div>
              <div>
                <p className="text-white font-semibold mb-2">Horarios</p>
                <div className="space-y-1 text-sm text-white/55">
                  <div className="flex justify-between gap-8">
                    <span>Lunes a Viernes</span>
                    <span>06:00 – 22:00</span>
                  </div>
                  <div className="flex justify-between gap-8">
                    <span>Sábados</span>
                    <span>08:00 – 16:00</span>
                  </div>
                  <div className="flex justify-between gap-8">
                    <span>Domingos</span>
                    <span>08:00 – 12:00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#111] border border-[#1a1a1a] rounded-2xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 bg-[#dc2626]/10 rounded-lg flex items-center justify-center shrink-0">
                <InstagramIcon size={18} className="text-[#dc2626]" />
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Redes sociales</p>
                <a
                  href="https://www.instagram.com/warriors.sport.arg.sm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#dc2626] hover:text-[#ef4444] text-sm transition-colors"
                >
                  @warriors.sport.arg.sm
                </a>
              </div>
            </div>

            <div className="bg-[#111] border border-[#1a1a1a] rounded-2xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 bg-[#dc2626]/10 rounded-lg flex items-center justify-center shrink-0">
                <Smartphone size={18} className="text-[#dc2626]" />
              </div>
              <div>
                <p className="text-white font-semibold mb-1">App de turnos</p>
                <a
                  href="https://warriors.turnosweb.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#dc2626] hover:text-[#ef4444] text-sm transition-colors"
                >
                  warriors.turnosweb.com
                </a>
                <p className="text-white/40 text-xs mt-1">Reservá clases, gestioná pagos y más</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="reveal-right">
            {sent ? (
              <div className="bg-[#111] border border-[#dc2626]/30 rounded-2xl p-10 flex flex-col items-center justify-center text-center h-full gap-4">
                <div className="w-14 h-14 bg-[#dc2626] rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">✓</span>
                </div>
                <h3 className="font-display text-3xl text-white tracking-wide">¡MENSAJE ENVIADO!</h3>
                <p className="text-white/55 text-sm">Te contactamos a la brevedad. ¡Gracias por escribirnos!</p>
                <button
                  onClick={() => setSent(false)}
                  className="text-[#dc2626] text-sm underline mt-2"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-[#111] border border-[#1a1a1a] rounded-2xl p-8 space-y-5"
              >
                <h3 className="font-display text-2xl text-white tracking-wide mb-6">ENVIANOS UN MENSAJE</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/40 text-xs uppercase tracking-widest mb-2">Nombre</label>
                    <input
                      required
                      type="text"
                      placeholder="Tu nombre"
                      className="w-full bg-[#1a1a1a] border border-[#252525] text-white placeholder:text-white/20 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#dc2626] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white/40 text-xs uppercase tracking-widest mb-2">Teléfono</label>
                    <input
                      type="tel"
                      placeholder="Tu teléfono"
                      className="w-full bg-[#1a1a1a] border border-[#252525] text-white placeholder:text-white/20 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#dc2626] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white/40 text-xs uppercase tracking-widest mb-2">Email</label>
                  <input
                    required
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full bg-[#1a1a1a] border border-[#252525] text-white placeholder:text-white/20 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#dc2626] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white/40 text-xs uppercase tracking-widest mb-2">Consulta</label>
                  <select className="w-full bg-[#1a1a1a] border border-[#252525] text-white/70 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#dc2626] transition-colors">
                    <option>Información de planes</option>
                    <option>Clases de prueba</option>
                    <option>Consulta de horarios</option>
                    <option>Otra consulta</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/40 text-xs uppercase tracking-widest mb-2">Mensaje</label>
                  <textarea
                    rows={4}
                    placeholder="Escribinos tu consulta..."
                    className="w-full bg-[#1a1a1a] border border-[#252525] text-white placeholder:text-white/20 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#dc2626] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold py-4 rounded-lg text-sm uppercase tracking-widest transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Enviar mensaje
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
