import { sedes, type Sede } from "@/lib/sedes";

/* ── Preguntas frecuentes ──────────────────────────────────────────────────
   Se muestran en el home (sección FAQ) y salen también como FAQPage en el
   JSON-LD. Las respuestas son cortas y autocontenidas a propósito: es el
   formato que Google y los buscadores con IA (ChatGPT, Gemini, Perplexity)
   levantan tal cual como respuesta. Solo datos confirmados del sitio.
   ───────────────────────────────────────────────────────────────────────── */

const [sm, sa] = sedes;

export type FaqId = "ubicacion" | "horarios" | "actividades" | "precios" | "experiencia" | "inscripcion" | "curso";

export type Faq = { id: FaqId; q: string; a: string };

export const faqs: Faq[] = [
  {
    id: "ubicacion",
    q: "¿Dónde queda el gimnasio Warriors Sport?",
    a: `Warriors Sport tiene dos sedes en el partido de General San Martín, Buenos Aires: ${sm.street}, ${sm.locality}, y ${sa.street}, ${sa.locality}.`,
  },
  {
    id: "horarios",
    q: "¿Qué horarios tiene Warriors Sport?",
    a: `La sede San Martín abre de lunes a viernes de 7 a 23 h, sábados de 9 a 18 h y domingos de 8 a 12 h. La sede San Andrés abre de lunes a viernes de 8 a 22 h y sábados de 9 a 13 h; los domingos está cerrada.`,
  },
  {
    id: "actividades",
    q: "¿Qué actividades hay en Warriors Sport?",
    a: "En las dos sedes hay musculación libre con instructores. En San Martín además hay clases grupales: Funcional (lunes, miércoles y viernes 19 h), Yoga (martes y jueves 19 h), Jumping Rebote (lunes y jueves 20 h) y Árabe Fitness (lunes 19 h, miércoles 20 h y jueves 18 h).",
  },
  {
    id: "precios",
    q: "¿Cuánto cuesta la cuota del gimnasio?",
    a: "Las clases grupales de Funcional, Yoga y Jumping cuestan $50.000 por mes y Árabe Fitness $55.000 por mes; Jumping y Árabe también se pueden pagar por clase a $10.000. Para la cuota de musculación y las promociones vigentes, escribí por WhatsApp a tu sede.",
  },
  {
    id: "experiencia",
    q: "¿Necesito experiencia para empezar a entrenar?",
    a: "No. Warriors Sport recibe a personas de cualquier nivel: los instructores te arman una rutina según tu objetivo y te explican la técnica de cada ejercicio desde el primer día.",
  },
  {
    id: "inscripcion",
    q: "¿Cómo me inscribo en Warriors Sport?",
    a: `Escribí por WhatsApp a la sede que te quede más cerca (San Martín: ${sm.waDisplay}; San Andrés: ${sa.waDisplay}) o acercate a la recepción en el horario de atención.`,
  },
  {
    id: "curso",
    q: "¿Warriors Sport dicta un curso de entrenador?",
    a: "Sí. El Instituto Warriors Sport dicta el Curso de Entrenador en Musculación y Alto Rendimiento: dura 10 meses, las clases son los sábados de 9 a 11 h e incluye pasantías laborales. Informes por WhatsApp al 11 5012-3469.",
  },
];

export const faqById = (id: FaqId) => faqs.find(f => f.id === id)!;

/* ── FAQ por sede (/sedes/<slug>) ──────────────────────────────────────────
   Mismas reglas: respuestas cortas, autocontenidas y armadas con los datos
   de lib/sedes.ts, para que respondan "gimnasio en <barrio>" sin repetir
   textos a mano. */
const listar = (xs: string[]) => xs.length > 1 ? `${xs.slice(0, -1).join(", ")} y ${xs.at(-1)}` : xs[0];

export function sedeFaqs(s: Sede): { q: string; a: string }[] {
  /* "de lunes a viernes de 8 a 22 h, sábados de 9 a 13 h y los domingos está cerrada" */
  const hora = (t: string) => String(Number(t.split(":")[0])) + (t.endsWith(":00") ? "" : `:${t.split(":")[1]}`);
  const dias = (d: string[]) =>
    d.length === 5 ? "de lunes a viernes" : d[0] === "Saturday" ? "sábados" : d[0] === "Sunday" ? "domingos" : d.join(", ");
  const tramos = s.opening.map(o => `${dias(o.days)} de ${hora(o.opens)} a ${hora(o.closes)} h`);
  const abreDomingo = s.opening.some(o => o.days.includes("Sunday"));
  const horario = abreDomingo ? listar(tramos) : `${tramos.join(", ")} (los domingos está cerrada)`;
  const actividades = s.id === "sm"
    ? faqById("actividades").a.replace("En las dos sedes hay musculación libre con instructores. En San Martín además hay", "En la sede San Martín hay musculación libre con instructores y")
    : `En la sede ${s.locality} hay sala de musculación con instructores que te arman la rutina según tu objetivo. Las clases grupales (Funcional, Yoga, Jumping y Árabe Fitness) se dictan en la sede San Martín.`;
  return [
    {
      q: `¿Dónde queda Warriors Sport ${s.locality}?`,
      a: `En ${s.street}, ${s.postalCode} ${s.locality}, provincia de Buenos Aires. Queda cerca de ${listar(s.nearby)}.`,
    },
    {
      q: `¿Qué horario tiene el gimnasio de ${s.locality}?`,
      a: `Warriors Sport ${s.locality} abre ${horario}.`,
    },
    {
      q: `¿Qué actividades hay en Warriors Sport ${s.locality}?`,
      a: actividades,
    },
    {
      q: `¿Cómo me inscribo en la sede ${s.locality}?`,
      a: `Escribí por WhatsApp al ${s.waDisplay} o acercate a la recepción de ${s.street} en el horario de atención.`,
    },
  ];
}
