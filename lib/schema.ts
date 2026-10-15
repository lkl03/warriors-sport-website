import { BASE_URL, INSTAGRAM_URL, sedes, type Sede } from "@/lib/sedes";
import { faqs } from "@/lib/faq";

/* ── JSON-LD ───────────────────────────────────────────────────────────────
   Un solo @graph: la marca (Organization) + una entidad ExerciseGym por sede
   + el WebSite. Cada sede apunta a su propia página (/sedes/<slug>), que es
   la URL que conviene cargar como "sitio web" en cada ficha de Google Maps.
   ───────────────────────────────────────────────────────────────────────── */

export const ORG_ID = `${BASE_URL}/#organization`;

export const sedeId  = (s: Sede) => `${BASE_URL}/sedes/${s.slug}#gym`;
export const sedeUrl = (s: Sede) => `${BASE_URL}/sedes/${s.slug}`;

export function gymNode(s: Sede) {
  return {
    "@type": "ExerciseGym",
    "@id": sedeId(s),
    "name": `Warriors Sport Arg — ${s.locality}`,
    "alternateName": [s.gbpName, `Warriors Sport ${s.locality}`],
    "description": s.intro,
    "url": sedeUrl(s),
    "telephone": s.phoneE164,
    "priceRange": "$$",
    "currenciesAccepted": "ARS",
    "image": `${BASE_URL}${s.image}`,
    "logo": `${BASE_URL}/images/logo.jpg`,
    "parentOrganization": { "@id": ORG_ID },
    "sameAs": [INSTAGRAM_URL],
    "hasMap": s.mapsUrl,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": s.street,
      "addressLocality": s.locality,
      "addressRegion": "Buenos Aires",
      "postalCode": s.postalCode,
      "addressCountry": "AR",
    },
    "geo": { "@type": "GeoCoordinates", "latitude": s.lat, "longitude": s.lng },
    "areaServed": s.nearby.map(name => ({ "@type": "Place", "name": name })),
    "openingHoursSpecification": s.opening.map(o => ({
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": o.days,
      "opens": o.opens,
      "closes": o.closes,
    })),
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Sala de musculación", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Instructores",         "value": true },
      ...(s.id === "sm"
        ? [{ "@type": "LocationFeatureSpecification", "name": "Clases grupales", "value": true }]
        : []),
    ],
  };
}

export const organizationNode = {
  "@type": "Organization",
  "@id": ORG_ID,
  "name": "Warriors Sport Arg",
  "alternateName": "Warriors Sport",
  "url": BASE_URL,
  "logo": `${BASE_URL}/images/logo.jpg`,
  "description":
    "Cadena de gimnasios con dos sedes en el partido de General San Martín, Buenos Aires: San Martín y San Andrés. Musculación, clases grupales y el Curso de Entrenador en Musculación y Alto Rendimiento.",
  "sameAs": [INSTAGRAM_URL],
  "subOrganization": sedes.map(s => ({ "@id": sedeId(s) })),
  "contactPoint": sedes.map(s => ({
    "@type": "ContactPoint",
    "telephone": s.phoneE164,
    "contactType": "customer service",
    "areaServed": "AR",
    "availableLanguage": "es",
    "name": `Sede ${s.locality}`,
  })),
};

export const websiteNode = {
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  "url": BASE_URL,
  "name": "Warriors Sport Arg",
  "inLanguage": "es-AR",
  "publisher": { "@id": ORG_ID },
};

export const courseNode = {
  "@type": "Course",
  "@id": `${BASE_URL}/#curso-entrenador`,
  "name": "Curso de Entrenador en Musculación y Alto Rendimiento",
  "description":
    "Curso de 10 meses del Instituto Warriors Sport, con clases los sábados de 9 a 11 h, formación práctica desde el primer día, pasantías laborales y certificación al finalizar.",
  "provider": { "@id": ORG_ID },
  "inLanguage": "es",
};

export const faqNode = {
  "@type": "FAQPage",
  "@id": `${BASE_URL}/#faq`,
  "mainEntity": faqs.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a },
  })),
};

export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [organizationNode, websiteNode, ...sedes.map(gymNode)],
};

export const homeGraph = {
  "@context": "https://schema.org",
  "@graph": [courseNode, faqNode],
};

export const jsonLdString = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");
