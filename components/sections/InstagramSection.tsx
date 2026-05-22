import Script from "next/script";
import InstagramIcon from "@/components/icons/InstagramIcon";

const IG_USER = "warriors.sport.arg.sm";
const IG_URL  = `https://www.instagram.com/${IG_USER}/`;

/* ── Elfsight Instagram Feed ────────────────────────────────────────────────
   Widget ID: f31a80c0-9923-4e12-9be5-8dd7cf4fc9d8
   Preview:   https://f31a80c099234e129be58dd7cf4fc9d8.elf.site
   ─────────────────────────────────────────────────────────────────────────── */

export default function InstagramSection() {
  return (
    <section id="instagram" className="py-24 bg-[#0d0d0d]">

      {/* Elfsight platform script — loads after page is interactive */}
      <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-10 reveal">
          <div>
            <p className="text-[#7EEF08] text-xs font-bold uppercase tracking-[0.3em] mb-2">warriors en redes</p>
            <h2 className="font-display text-5xl lg:text-6xl text-white tracking-wider leading-none">
              NUESTRO INSTAGRAM
            </h2>
          </div>
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-bold px-6 py-3 rounded-xl text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 shadow-lg shrink-0"
          >
            <InstagramIcon size={18} />
            @{IG_USER}
          </a>
        </div>

        {/* Elfsight dynamic widget — synced Instagram feed */}
        <div className="reveal">
          <div
            className="elfsight-app-f31a80c0-9923-4e12-9be5-8dd7cf4fc9d8"
            data-elfsight-app-lazy=""
          />
        </div>

      </div>
    </section>
  );
}
