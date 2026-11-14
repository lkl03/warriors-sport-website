import { BASE_URL, INSTAGRAM_URL, sedes } from "@/lib/sedes";
import { faqs } from "@/lib/faq";

/* llms.txt — resumen en texto plano para buscadores con IA (ChatGPT,
   Perplexity, Gemini). Se arma con los mismos datos que la web, así nunca
   queda desactualizado respecto del sitio. */

export const dynamic = "force-static";

const LAST_UPDATE = "2026-11-14";

export function GET() {
  const body = [
    "# Warriors Sport Arg",
    "",
    "> Gimnasio con dos sedes en el partido de General San Martín, Buenos Aires, Argentina: San Martín (Av. 25 de Mayo 1859) y San Andrés (J. M. Campos 2571). Musculación con instructores, clases grupales y el Curso de Entrenador en Musculación y Alto Rendimiento.",
    "",
    "## Qué ofrece",
    "",
    "- Musculación libre con instructores en las dos sedes (te arman la rutina según tu objetivo).",
    "- Clases grupales en la sede San Martín: Funcional, Yoga, Jumping Rebote y Árabe Fitness.",
    "- Curso de Entrenador en Musculación y Alto Rendimiento (Instituto Warriors Sport): 10 meses, sábados de 9 a 11 h, con pasantías.",
    "- Más de 7 años en San Martín.",
    "",
    "## Sedes",
    "",
    ...sedes.flatMap(s => [
      `### ${s.name}`,
      `- Dirección: ${s.street}, ${s.postalCode} ${s.locality}, Buenos Aires, Argentina`,
      `- Horarios: ${s.hours.map(([d, h]) => `${d}: ${h}`).join("; ")}`,
      `- WhatsApp: ${s.waDisplay} (${s.phoneE164})`,
      `- Página: ${BASE_URL}/sedes/${s.slug}`,
      `- Google Maps: ${s.mapsUrl}`,
      "",
    ]),
    "## Preguntas frecuentes",
    "",
    ...faqs.flatMap(f => [`### ${f.q}`, f.a, ""]),
    "## Enlaces",
    "",
    `- Sitio: ${BASE_URL}`,
    `- Instagram: ${INSTAGRAM_URL}`,
    "",
    `Última actualización: ${LAST_UPDATE}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
