/* ── Datos de las sedes — fuente única ─────────────────────────────────────
   Lo usan la sección "Sedes" del home, las páginas /sedes/[slug], el
   JSON-LD del layout y llms.txt. Si cambia un horario o un teléfono, se
   cambia acá y queda igual en todos lados (NAP consistente = clave para
   Google Maps).

   OJO: estos datos tienen que coincidir con las fichas de Google Business
   Profile. En octubre 2026 la ficha de San Andrés mostraba apertura 8:30
   y acá figura 8:00 — confirmar con el dueño cuál es el real y corregir
   el que esté mal (la web o la ficha).
   ───────────────────────────────────────────────────────────────────────── */

export const BASE_URL = "https://www.warriorssportarg.com.ar";

export type SedeId = "sm" | "sa";

export type OpeningSpec = { days: string[]; opens: string; closes: string };

export type Sede = {
  id:           SedeId;
  slug:         string;
  label:        string;
  name:         string;
  /** Nombre exacto de la ficha en Google Maps */
  gbpName:      string;
  locality:     string;
  street:       string;
  postalCode:   string;
  address:      string[];
  lat:          number;
  lng:          number;
  mapSrc:       string;
  mapsUrl:      string;
  directionsUrl: string;
  hours:        [string, string][];
  opening:      OpeningSpec[];
  phoneE164:    string;
  waDisplay:    string;
  waLink:       string;
  image:        string;
  images:       { src: string; alt: string; pos?: string }[];
  intro:        string;
  highlights:   string[];
  nearby:       string[];
};

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export const sedes: Sede[] = [
  {
    id:       "sm",
    slug:     "san-martin",
    label:    "San Martín",
    name:     "Warriors Sport — San Martín",
    gbpName:  "Warriors Sport Arg S. M.",
    locality: "San Martín",
    street:   "Av. 25 de Mayo 1859",
    postalCode: "B1650",
    address: [
      "Av. 25 de Mayo 1859",
      "B1650 San Martín, Buenos Aires",
    ],
    lat: -34.5757101,
    lng: -58.5321226,
    /* Place-ID embed — muestra el pin real con el nombre del gimnasio */
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.3978!2d-58.5346975!3d-34.5757057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb7bc9ac68f5d%3A0x9320f80df6b9dfeb!2sWarriors%20Sport%20Arg%20S.%20M.!5e0!3m2!1ses!2sar!4v1748900000000!5m2!1ses!2sar",
    mapsUrl: "https://maps.app.goo.gl/XeGYEhiT4VMDqPqRA",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Warriors%20Sport%20Arg%20S.%20M.%2C%20Av.%2025%20de%20Mayo%201859%2C%20San%20Mart%C3%ADn%2C%20Buenos%20Aires",
    hours: [
      ["Lun – Vie", "07:00 – 23:00 hs."],
      ["Sábados",   "09:00 – 18:00 hs."],
      ["Domingos",  "08:00 – 12:00 hs."],
    ],
    opening: [
      { days: WEEKDAYS,     opens: "07:00", closes: "23:00" },
      { days: ["Saturday"], opens: "09:00", closes: "18:00" },
      { days: ["Sunday"],   opens: "08:00", closes: "12:00" },
    ],
    phoneE164: "+5491168272020",
    waDisplay: "11 6827-2020",
    waLink:    "https://wa.me/5491168272020?text=Hola%2C%20quiero%20m%C3%A1s%20info%20sobre%20Warriors%20Sport%20San%20Mart%C3%ADn%20%F0%9F%92%AA",
    image: "/images/gym-entrance.webp",
    images: [
      { src: "/images/gym-entrance.webp",   alt: "Entrada del gimnasio Warriors Sport en Av. 25 de Mayo 1859, San Martín", pos: "center 40%" },
      { src: "/images/gym-two-floors.webp", alt: "Sala de musculación en varios pisos de Warriors Sport San Martín",       pos: "center center" },
      { src: "/images/gym-dumbbells.webp",  alt: "Zona de mancuernas de Warriors Sport San Martín" },
      { src: "/images/gym-machine-brand.webp", alt: "Máquinas nuevas de musculación en Warriors Sport San Martín" },
    ],
    intro:
      "Warriors Sport San Martín es un gimnasio de musculación de varios pisos sobre Av. 25 de Mayo 1859, a pocas cuadras de la peatonal de San Martín. Abre de lunes a viernes de 7 a 23 h, sábados de 9 a 18 h y domingos de 8 a 12 h, con máquinas nuevas, instructores que arman tu rutina y clases grupales de funcional, yoga, jumping y árabe fitness.",
    highlights: [
      "Sala de musculación libre en varios pisos, con máquinas nuevas",
      "Instructores que te arman la rutina y te corrigen la técnica",
      "Clases grupales: Funcional, Yoga, Jumping Rebote y Árabe Fitness",
      "Abierto los 7 días, de lunes a viernes hasta las 23 h",
      "Sede del Curso de Entrenador en Musculación y Alto Rendimiento",
    ],
    nearby: ["San Martín centro", "Villa Maipú", "Billinghurst", "Villa Ballester"],
  },
  {
    id:       "sa",
    slug:     "san-andres",
    label:    "San Andrés",
    name:     "Warriors Sport — San Andrés",
    gbpName:  "Warriors Sport Arg",
    locality: "San Andrés",
    street:   "J. M. Campos 2571",
    postalCode: "B1651",
    address: [
      "J. M. Campos 2571",
      "B1651 San Andrés, Buenos Aires",
    ],
    lat: -34.5600861,
    lng: -58.5384252,
    /* Búsqueda por nombre + dirección: muestra el pin de la ficha de Maps */
    mapSrc: "https://www.google.com/maps?q=Warriors%20Sport%20Arg%2C%20J.%20M.%20Campos%202571%2C%20San%20Andr%C3%A9s%2C%20Buenos%20Aires&z=16&hl=es&output=embed",
    mapsUrl: "https://maps.app.goo.gl/USNH58xBvrbVtWoL9",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Warriors%20Sport%20Arg%2C%20J.%20M.%20Campos%202571%2C%20San%20Andr%C3%A9s%2C%20Buenos%20Aires",
    hours: [
      ["Lun – Vie", "08:00 – 22:00 hs."],
      ["Sábados",   "09:00 – 13:00 hs."],
      ["Domingos",  "Cerrado"],
    ],
    opening: [
      { days: WEEKDAYS,     opens: "08:00", closes: "22:00" },
      { days: ["Saturday"], opens: "09:00", closes: "13:00" },
    ],
    phoneE164: "+5491133199615",
    waDisplay: "11 3319-9615",
    waLink:    "https://wa.me/5491133199615?text=Hola%2C%20quiero%20m%C3%A1s%20info%20sobre%20Warriors%20Sport%20San%20Andr%C3%A9s%20%F0%9F%92%AA",
    image: "/images/gym-sanandres-1.webp",
    images: [
      { src: "/images/gym-sanandres-1.webp", alt: "Gimnasio Warriors Sport en J. M. Campos 2571, San Andrés",      pos: "center center" },
      { src: "/images/gym-sanandres-2.jpg",  alt: "Sala de musculación de Warriors Sport San Andrés",              pos: "center 30%" },
    ],
    intro:
      "Warriors Sport San Andrés es la segunda sede del gimnasio, en J. M. Campos 2571. Abre de lunes a viernes de 8 a 22 h y sábados de 9 a 13 h (domingos cerrado), con sala de musculación equipada e instructores que acompañan tu entrenamiento, con la misma forma de trabajar que la sede de San Martín.",
    highlights: [
      "Sala de musculación equipada",
      "Instructores que te arman la rutina según tu objetivo",
      "Lunes a viernes de 8 a 22 h y sábados de 9 a 13 h",
      "Misma marca y metodología que la sede de San Martín",
    ],
    nearby: ["Villa Ballester", "Chilavert", "San Martín", "José León Suárez"],
  },
];

export const sedeBySlug = (slug: string) => sedes.find(s => s.slug === slug);

export const INSTAGRAM_URL = "https://www.instagram.com/warriors.sport.arg.sm/";
