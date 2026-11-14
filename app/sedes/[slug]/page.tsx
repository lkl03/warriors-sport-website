import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Clock, Phone, Navigation, Star } from "lucide-react";
import { sedes, sedeBySlug, BASE_URL } from "@/lib/sedes";
import { gymNode, jsonLdString, ORG_ID } from "@/lib/schema";
import { sedeFaqs } from "@/lib/faq";

/* ── Página propia de cada sede ────────────────────────────────────────────
   /sedes/san-martin y /sedes/san-andres. Es la URL que hay que cargar
   como "Sitio web" en cada ficha de Google Business Profile: una página que
   habla solo de esa sede (dirección, horario, mapa) refuerza la relevancia
   local para búsquedas como "gimnasio en San Andrés".
   ───────────────────────────────────────────────────────────────────────── */

export const dynamicParams = false;

export function generateStaticParams() {
  return sedes.map(s => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const sede = sedeBySlug(slug);
  if (!sede) return {};

  const title = `Gimnasio en ${sede.locality} — ${sede.street}`;
  const description = sede.metaDescription;

  return {
    title,
    description,
    alternates: { canonical: `/sedes/${sede.slug}` },
    openGraph: {
      type:        "website",
      locale:      "es_AR",
      url:         `/sedes/${sede.slug}`,
      siteName:    "Warriors Sport Arg",
      title:       `${title} | Warriors Sport Arg`,
      description,
      /* Al definir openGraph acá se pisa el del layout: se vuelve a apuntar
         a la imagen generada en app/opengraph-image.tsx. */
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Warriors Sport Arg" }],
    },
    twitter: {
      card:        "summary_large_image",
      title:       `${title} | Warriors Sport Arg`,
      description,
      images:      ["/opengraph-image"],
    },
  };
}

export default async function SedePage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const sede = sedeBySlug(slug);
  if (!sede) notFound();

  const other = sedes.find(s => s.id !== sede.id)!;
  const faqs  = sedeFaqs(sede);

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      gymNode(sede),
      {
        "@type": "WebPage",
        "@id": `${BASE_URL}/sedes/${sede.slug}#webpage`,
        "url": `${BASE_URL}/sedes/${sede.slug}`,
        "name": `Gimnasio en ${sede.locality} | Warriors Sport Arg`,
        "inLanguage": "es-AR",
        "about": { "@id": `${BASE_URL}/sedes/${sede.slug}#gym` },
        "isPartOf": { "@id": `${BASE_URL}/#website` },
        "publisher": { "@id": ORG_ID },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Inicio", "item": BASE_URL },
          { "@type": "ListItem", "position": 2, "name": "Sedes", "item": `${BASE_URL}/#sedes` },
          { "@type": "ListItem", "position": 3, "name": sede.locality, "item": `${BASE_URL}/sedes/${sede.slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${BASE_URL}/sedes/${sede.slug}#faq`,
        "mainEntity": faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      },
    ],
  };

  return (
    <article className="pt-28 pb-20 bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(graph) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav aria-label="Ruta" className="text-xs text-white/40 mb-6">
          <Link href="/" className="hover:text-white">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/#sedes" className="hover:text-white">Sedes</Link>
          <span className="mx-2">/</span>
          <span className="text-white/70">{sede.locality}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <p className="text-[#7EEF08] text-xs font-bold uppercase tracking-[0.3em] mb-3">Warriors Sport Arg</p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white tracking-wider leading-none mb-5">
            GIMNASIO EN <span className="text-[#7EEF08] green-glow">{sede.locality.toUpperCase()}</span>
          </h1>
          <p className="text-white/65 text-base lg:text-lg leading-relaxed max-w-3xl">{sede.intro}</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Datos */}
          <div className="flex flex-col gap-4">
            <div className="bg-[#0d0d0d] border border-[#7EEF08]/25 rounded-2xl p-6 space-y-6">

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-[#7EEF08]/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={16} className="text-[#7EEF08]" />
                </div>
                <div>
                  <h2 className="text-white/35 text-xs uppercase tracking-widest mb-1">Dirección</h2>
                  <address className="not-italic">
                    {sede.address.map(line => (
                      <p key={line} className="text-white/85 text-sm leading-snug">{line}</p>
                    ))}
                  </address>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-[#7EEF08]/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <Clock size={16} className="text-[#7EEF08]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-white/35 text-xs uppercase tracking-widest mb-2">Horarios</h2>
                  <dl className="space-y-1.5">
                    {sede.hours.map(([day, hrs]) => (
                      <div key={day} className="flex justify-between items-center">
                        <dt className="text-white/55 text-sm">{day}</dt>
                        <dd className={`text-sm font-medium ${hrs === "Cerrado" ? "text-white/35" : "text-white/85"}`}>{hrs}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-[#7EEF08]/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <Phone size={16} className="text-[#7EEF08]" />
                </div>
                <div>
                  <h2 className="text-white/35 text-xs uppercase tracking-widest mb-1">WhatsApp</h2>
                  <a href={sede.waLink} target="_blank" rel="noopener noreferrer" className="text-[#7EEF08] text-sm hover:underline">
                    {sede.waDisplay}
                  </a>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a
                  href={sede.waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#7EEF08] hover:bg-[#5abc06] text-black font-bold px-6 py-3.5 rounded-xl text-sm uppercase tracking-widest transition-colors"
                >
                  Quiero empezar
                </a>
                <a
                  href={sede.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-[#7EEF08] text-white/85 hover:text-[#7EEF08] font-semibold px-6 py-3.5 rounded-xl text-sm uppercase tracking-widest transition-colors"
                >
                  <Navigation size={15} /> Cómo llegar
                </a>
              </div>
            </div>

            <div className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-2xl p-6">
              <h2 className="font-display text-2xl text-white tracking-wide mb-4">QUÉ VAS A ENCONTRAR</h2>
              <ul className="space-y-2.5">
                {sede.highlights.map(h => (
                  <li key={h} className="flex items-start gap-3">
                    <span className="text-[#7EEF08] mt-0.5 shrink-0">✓</span>
                    <span className="text-white/70 text-sm">{h}</span>
                  </li>
                ))}
              </ul>
              <p className="text-white/45 text-sm mt-5 leading-relaxed">
                Cerca de {sede.nearby.slice(0, -1).join(", ")} y {sede.nearby.at(-1)}.
              </p>
            </div>
          </div>

          {/* Mapa + fotos */}
          <div className="flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#1e1e1e]" style={{ minHeight: 360 }}>
              <iframe
                title={`Mapa de ${sede.name}`}
                src={sede.mapSrc}
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {sede.images.map(({ src, alt, pos }) => (
                <div key={src} className="rounded-xl overflow-hidden border border-[#1e1e1e] relative" style={{ aspectRatio: "4/3" }}>
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(min-width: 1024px) 280px, 50vw"
                    className="object-cover"
                    style={{ objectPosition: pos ?? "center center" }}
                  />
                </div>
              ))}
            </div>
            <a
              href={sede.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[#7EEF08] transition-colors"
            >
              <Star size={15} className="text-[#7EEF08]" /> Ver reseñas de esta sede en Google Maps →
            </a>
          </div>
        </div>

        {/* Preguntas frecuentes de la sede — mismo estilo que el FAQ del home */}
        <section className="mt-14" aria-labelledby="faq-sede">
          <h2 id="faq-sede" className="font-display text-3xl lg:text-4xl text-white tracking-wide mb-5">
            PREGUNTAS FRECUENTES — <span className="text-[#7EEF08]">{sede.locality.toUpperCase()}</span>
          </h2>
          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="group bg-[#0d0d0d] border border-[#1e1e1e] open:border-[#7EEF08]/30 rounded-xl transition-colors"
              >
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-white text-sm sm:text-base font-semibold leading-snug">{q}</h3>
                  <span
                    aria-hidden
                    className="shrink-0 w-7 h-7 rounded-full border border-[#7EEF08]/40 text-[#7EEF08] flex items-center justify-center text-lg leading-none transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 -mt-1 text-white/60 text-sm leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Otra sede */}
        <div className="mt-14 border-t border-[#1a1a1a] pt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-white/55 text-sm">
            ¿Te queda más cerca {other.locality}? Warriors Sport también está en {other.street}.
          </p>
          <Link
            href={`/sedes/${other.slug}`}
            className="text-[#7EEF08] text-sm font-semibold uppercase tracking-widest hover:underline"
          >
            Ver sede {other.locality} →
          </Link>
        </div>
      </div>
    </article>
  );
}
