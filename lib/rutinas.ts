/* ────────────────────────────────────────────────────────────────────────────
   RUTINAS — fuente única de datos
   ---------------------------------------------------------------------------
   Transcripción de las fichas que arma el gimnasio. Este archivo es lo ÚNICO
   que hay que tocar para actualizar las rutinas: la página /rutinas se arma
   sola a partir de este array.

   Cada rutina existe en dos versiones, hombres y mujeres, con ejercicios
   distintos (no es la misma rutina en otro color).

   Las cargas se guardan tal cual figuran en la ficha ("4 x 15", "3 x 12/8",
   "3 x 60'"). La página las parte sola en series y repeticiones.

   Para cargar una ficha nueva:
     1. Copiá un bloque de `rutinas` entero y cambiale el `id`.
     2. Guardá la imagen en public/images/rutinas/ y apuntá `ficha` ahí.
     3. Actualizá ACTUALIZADO.
   ──────────────────────────────────────────────────────────────────────────── */

export type Variante = "hombres" | "mujeres";

export type Ejercicio = {
  nombre: string;
  /** Carga tal cual la ficha: "4 x 15" · "3 x 12/8" · "3 x 60'" */
  carga: string;
  /** Segunda columna, solo en rutinas con progresión semanal. */
  carga2?: string;
};

export type Bloque = {
  /** Único dentro de la rutina, sin espacios. */
  id: string;
  /** Etiqueta de la solapa: "Día 1" · "Tren superior" · "Zona core" */
  titulo: string;
  ejercicios: Ejercicio[];
};

export type Rutina = {
  id: string;
  variante: Variante;
  /** "Adaptación" · "Principiante" · "Intermedio" */
  nivel: string;
  /** Bajada del nivel: "Volumen y tonificación" */
  objetivo: string;
  /** Aeróbicos a elección, arriba de todo en la ficha. */
  aerobicos: string;
  /** Encabezados cuando cada ejercicio trae dos cargas. */
  columnas?: [string, string];
  /** Imagen de la ficha original, en public/images/rutinas/ */
  ficha: string;
  bloques: Bloque[];
};

/** Se muestra al pie. Actualizar al cargar fichas nuevas. */
export const ACTUALIZADO = "Agosto 2026";

/** Mensajes que el gimnasio pone al pie de todas las fichas. */
export const AVISOS = [
  {
    titulo: "Estamos acá para apoyarte en todo momento",
    texto:
      "No tengas miedo de preguntar, tu bienestar es lo más importante para nosotros.",
  },
  {
    titulo: "¿Están usando la máquina?",
    texto:
      "Podés continuar con otro ejercicio o consultar de realizar “uno y uno”.",
  },
];

export const WA_RUTINAS =
  "https://wa.me/5491168272020?text=Hola%2C%20escane%C3%A9%20el%20QR%20y%20quiero%20consultar%20por%20una%20rutina%20%F0%9F%92%AA";

const AEROBICOS_15 = "Cinta 15' · Bicicleta 15' · Elíptica 15'";
const AEROBICOS_20 = "Cinta 20' · Bicicleta 20' · Elíptica 20'";
const SEMANAS: [string, string] = ["Semana 1", "Semana 2"];

export const rutinas: Rutina[] = [
  /* ══════════════════ HOMBRES ══════════════════════════════════════════ */
  {
    id: "adaptacion-hombres",
    variante: "hombres",
    nivel: "Adaptación",
    objetivo: "Semana 1 y 2",
    aerobicos: AEROBICOS_15,
    columnas: SEMANAS,
    ficha: "/images/rutinas/adaptacion-hombres.webp",
    bloques: [
      {
        id: "tren-superior",
        titulo: "Tren superior",
        ejercicios: [
          { nombre: "Dorsal al frente",                carga: "3 x 15",  carga2: "4 x 12" },
          { nombre: "Remo bajo",                       carga: "3 x 10",  carga2: "4 x 10" },
          { nombre: "Empuje de pecho en máquina",      carga: "3 x 15",  carga2: "4 x 12" },
          { nombre: "Convergente plano",               carga: "3 x 15",  carga2: "4 x 15" },
          { nombre: "Vuelos laterales con mancuerna",  carga: "3 x 10",  carga2: "4 x 10" },
          { nombre: "Vuelos frontales con mancuerna",  carga: "3 x 10",  carga2: "4 x 10" },
          { nombre: "Bíceps con barra",                carga: "3 x 15",  carga2: "4 x 12" },
          { nombre: "Fondos de tríceps en máquina",    carga: "3 x 15",  carga2: "4 x 15" },
        ],
      },
      {
        id: "tren-inferior",
        titulo: "Tren inferior",
        ejercicios: [
          { nombre: "Sillón de cuádriceps",  carga: "3 x 15",  carga2: "4 x 12" },
          { nombre: "Prensa inclinada",      carga: "3 x 15",  carga2: "4 x 15" },
          { nombre: "Camilla de femorales",  carga: "3 x 10",  carga2: "3 x 15" },
        ],
      },
      {
        id: "zona-core",
        titulo: "Zona core",
        ejercicios: [
          { nombre: "Planchas",                 carga: "3 x 40'",  carga2: "3 x 60'" },
          { nombre: "Elevación de piernas",     carga: "3 x 10",   carga2: "3 x 15" },
          { nombre: "Espinales en colchoneta",  carga: "3 x 12",   carga2: "3 x 15" },
        ],
      },
    ],
  },

  {
    id: "principiante-volumen-hombres",
    variante: "hombres",
    nivel: "Principiante",
    objetivo: "Volumen",
    aerobicos: AEROBICOS_15,
    ficha: "/images/rutinas/principiante-volumen-hombres.webp",
    bloques: [
      {
        id: "dia-1",
        titulo: "Día 1",
        ejercicios: [
          { nombre: "Dorsal al frente",                 carga: "4 x 12" },
          { nombre: "Dorsales mano invertida",          carga: "3 x 12" },
          { nombre: "Remo en máquina",                  carga: "3 x 12" },
          { nombre: "Tríceps con mancuerna a 1 brazo",  carga: "4 x 12" },
          { nombre: "Tríceps en polea con barra",       carga: "3 x 15" },
          { nombre: "Fondos en máquina",                carga: "3 x 12" },
        ],
      },
      {
        id: "dia-2",
        titulo: "Día 2",
        ejercicios: [
          { nombre: "Press de pecho horizontal con barra",  carga: "4 x 12" },
          { nombre: "Convergente de pecho inclinado",       carga: "3 x 15" },
          { nombre: "Empuje de pecho en máquina",           carga: "3 x 15" },
          { nombre: "Bíceps parado con barra",              carga: "4 x 12" },
          { nombre: "Bíceps alternado a 90° con mancuerna", carga: "3 x 12" },
          { nombre: "Bíceps con barra en scott",            carga: "3 x 12" },
        ],
      },
      {
        id: "dia-3",
        titulo: "Día 3",
        ejercicios: [
          { nombre: "Prensa horizontal",      carga: "4 x 12" },
          { nombre: "Sillón de cuádriceps",   carga: "3 x 15" },
          { nombre: "Camilla de femoral",     carga: "3 x 12" },
          { nombre: "Gemelos parado",         carga: "3 x 15" },
          { nombre: "Elevación lateral",      carga: "3 x 12" },
          { nombre: "Elevación frontal",      carga: "3 x 12" },
          { nombre: "Convergente hombros",    carga: "4 x 12" },
        ],
      },
      {
        id: "zona-core",
        titulo: "Zona core",
        ejercicios: [
          { nombre: "Planchas",                carga: "3 x 60'" },
          { nombre: "Lumbares en colchoneta",  carga: "4 x 20" },
        ],
      },
    ],
  },

  {
    id: "principiante-bajar-peso-hombres",
    variante: "hombres",
    nivel: "Principiante",
    objetivo: "Bajar de peso y tonificar",
    aerobicos: AEROBICOS_15,
    ficha: "/images/rutinas/principiante-bajar-peso-hombres.webp",
    bloques: [
      {
        id: "dia-1",
        titulo: "Día 1",
        ejercicios: [
          { nombre: "Press de pecho horizontal con barra",  carga: "4 x 15" },
          { nombre: "Press inclinado con mancuerna",        carga: "3 x 15" },
          { nombre: "Empuje de pecho en máquina",           carga: "3 x 15" },
          { nombre: "Francés a dos brazos con mancuerna",   carga: "4 x 12" },
          { nombre: "Tríceps en polea con barra",           carga: "4 x 15" },
          { nombre: "Tijeras en colchoneta",                carga: "4 x 15" },
          { nombre: "Espinales en colchoneta",              carga: "4 x 15" },
        ],
      },
      {
        id: "dia-2",
        titulo: "Día 2",
        ejercicios: [
          { nombre: "Dorsal al frente",                carga: "4 x 15" },
          { nombre: "Dorsal mano invertida",           carga: "3 x 15" },
          { nombre: "Remo en máquina",                 carga: "4 x 15" },
          { nombre: "Bíceps con barra",                carga: "4 x 15" },
          { nombre: "Bíceps alternado con mancuerna",  carga: "4 x 12" },
          { nombre: "Planchas en colchoneta",          carga: "4 x 40'" },
          { nombre: "Toco talones en colchoneta",      carga: "4 x 15" },
        ],
      },
      {
        id: "dia-3",
        titulo: "Día 3",
        ejercicios: [
          { nombre: "Prensa inclinada",                  carga: "4 x 15" },
          { nombre: "Sillón de cuádriceps",              carga: "4 x 15" },
          { nombre: "Gemelos parado",                    carga: "4 x 15" },
          { nombre: "Press sentado con mancuerna",       carga: "4 x 12" },
          { nombre: "Elevación lateral con mancuerna",   carga: "4 x 12" },
          { nombre: "Abdominales en banco a 45°",        carga: "4 x 15" },
          { nombre: "Espinales en colchoneta",           carga: "4 x 15" },
        ],
      },
    ],
  },

  {
    id: "intermedio-volumen-hombres",
    variante: "hombres",
    nivel: "Intermedio",
    objetivo: "Volumen",
    aerobicos: AEROBICOS_15,
    ficha: "/images/rutinas/intermedio-volumen-hombres.webp",
    bloques: [
      {
        id: "dia-1",
        titulo: "Día 1",
        ejercicios: [
          { nombre: "Dorsal al frente",                carga: "4 x 12" },
          { nombre: "Dorsal con triángulo",            carga: "4 x 12" },
          { nombre: "Remo a un brazo con mancuerna",   carga: "4 x 12" },
          { nombre: "Remo hammer a dos brazos",        carga: "4 x 10" },
          { nombre: "Curl 21 con barra",               carga: "4 x 21" },
          { nombre: "Sentado a 45° con mancuerna",     carga: "4 x 10" },
          { nombre: "Bíceps con soga en polea",        carga: "4 x 15" },
          { nombre: "Espinales y tijeras",             carga: "4 x 15" },
        ],
      },
      {
        id: "dia-2",
        titulo: "Día 2",
        ejercicios: [
          { nombre: "Press inclinado con barra",           carga: "4 x 12" },
          { nombre: "Press horizontal con mancuerna",      carga: "4 x 15" },
          { nombre: "Peck deck en máquina",                carga: "4 x 12" },
          { nombre: "Declinado convergente",               carga: "4 x 15" },
          { nombre: "Francés a un brazo con mancuerna",    carga: "4 x 10" },
          { nombre: "Tríceps con barra en polea",          carga: "4 x 15" },
          { nombre: "Tríceps fondos en máquina",           carga: "3 x 12" },
          { nombre: "Espinales y planchas",                carga: "4 x 15 / 40'" },
        ],
      },
      {
        id: "dia-3",
        titulo: "Día 3",
        ejercicios: [
          { nombre: "Sentadillas en smith",                    carga: "4 x 15" },
          { nombre: "Camilla de femorales",                    carga: "3 x 15" },
          { nombre: "Sillón de cuádriceps",                    carga: "4 x 12" },
          { nombre: "Patada de glúteos",                       carga: "4 x 15" },
          { nombre: "Gemelos sentado",                         carga: "4 x 15" },
          { nombre: "Press militar a un brazo con mancuerna",  carga: "4 x 12" },
          { nombre: "Elevación frontal con barra",             carga: "4 x 12" },
          { nombre: "Peck fly para posteriores",               carga: "4 x 12" },
          { nombre: "Toco talones en colchón",                 carga: "4 x 15" },
        ],
      },
    ],
  },

  /* ══════════════════ MUJERES ══════════════════════════════════════════ */
  {
    id: "adaptacion-mujeres",
    variante: "mujeres",
    nivel: "Adaptación",
    objetivo: "Semana 1 y 2",
    aerobicos: AEROBICOS_15,
    columnas: SEMANAS,
    ficha: "/images/rutinas/adaptacion-mujeres.webp",
    bloques: [
      {
        id: "tren-superior",
        titulo: "Tren superior",
        ejercicios: [
          { nombre: "Dorsal al frente",              carga: "3 x 12",  carga2: "3 x 15" },
          { nombre: "Empuje en máquina",             carga: "3 x 12",  carga2: "3 x 15" },
          { nombre: "Elevación frontal con barra",   carga: "3 x 10",  carga2: "3 x 15" },
          { nombre: "Bíceps con barra",              carga: "3 x 15",  carga2: "4 x 12" },
          { nombre: "Fondos de tríceps en máquina",  carga: "3 x 12",  carga2: "4 x 10" },
        ],
      },
      {
        id: "tren-inferior",
        titulo: "Tren inferior",
        ejercicios: [
          { nombre: "Patada de glúteos",     carga: "3 x 15",  carga2: "4 x 12" },
          { nombre: "Camilla de femorales",  carga: "3 x 15",  carga2: "4 x 12" },
          { nombre: "Sillón de cuádriceps",  carga: "3 x 15",  carga2: "4 x 12" },
          { nombre: "Abductor sillón",       carga: "3 x 15",  carga2: "4 x 15" },
          { nombre: "Prensa inclinada",      carga: "3 x 15",  carga2: "4 x 15" },
        ],
      },
      {
        id: "zona-core",
        titulo: "Zona core",
        ejercicios: [
          { nombre: "Planchas",                 carga: "3 x 40'",  carga2: "3 x 60'" },
          { nombre: "Elevación de piernas",     carga: "3 x 10",   carga2: "3 x 15" },
          { nombre: "Espinales en colchoneta",  carga: "3 x 12",   carga2: "3 x 15" },
        ],
      },
    ],
  },

  {
    id: "principiante-volumen-mujeres",
    variante: "mujeres",
    nivel: "Principiante",
    objetivo: "Volumen y tonificación",
    aerobicos: AEROBICOS_15,
    ficha: "/images/rutinas/principiante-volumen-mujeres.webp",
    bloques: [
      {
        id: "dia-1",
        titulo: "Día 1",
        ejercicios: [
          { nombre: "Squat belt",            carga: "4 x 15/8" },
          { nombre: "Prensa a 90°",          carga: "4 x 12/8" },
          { nombre: "Camilla de femorales",  carga: "4 x 10" },
          { nombre: "Sillón abductores",     carga: "3 x 12/8" },
          { nombre: "Patada de glúteos",     carga: "4 x 12/8" },
          { nombre: "Dorsales al frente",    carga: "4 x 12/8" },
          { nombre: "Mano invertida",        carga: "3 x 10" },
          { nombre: "Remo en máquina",       carga: "3 x 12" },
        ],
      },
      {
        id: "dia-2",
        titulo: "Día 2",
        ejercicios: [
          { nombre: "Convergente a 45°",             carga: "4 x 15/10" },
          { nombre: "Peck deck",                     carga: "3 x 12/8" },
          { nombre: "Empuje de pecho",               carga: "3 x 12" },
          { nombre: "Bíceps con barra",              carga: "4 x 12/8" },
          { nombre: "Bíceps con mancuerna",          carga: "3 x 12" },
          { nombre: "Fondos de tríceps en máquina",  carga: "3 x 12" },
          { nombre: "Parado con mancuernas",         carga: "3 x 12" },
          { nombre: "Tríceps en polea con barra",    carga: "3 x 15" },
        ],
      },
      {
        id: "dia-3",
        titulo: "Día 3",
        ejercicios: [
          { nombre: "Prensa inclinada",                  carga: "4 x 15/10" },
          { nombre: "Prensa horizontal",                 carga: "3 x 12/8" },
          { nombre: "Sillón de cuádriceps",              carga: "3 x 12" },
          { nombre: "Abductor parado en máquina",        carga: "4 x 12/8" },
          { nombre: "Gemelos parado 3 posiciones",       carga: "3 x 12" },
          { nombre: "Press a 1 brazo con mancuernas",    carga: "3 x 12" },
          { nombre: "Elevación lateral con mancuernas",  carga: "3 x 12" },
          { nombre: "Elevación frontal con barra",       carga: "3 x 15" },
        ],
      },
      {
        id: "zona-core",
        titulo: "Zona core",
        ejercicios: [
          { nombre: "Planchas",                carga: "3 x 60'" },
          { nombre: "Tijeras en colchoneta",   carga: "3 x 15" },
          { nombre: "Lumbares en colchoneta",  carga: "4 x 20" },
        ],
      },
    ],
  },

  {
    id: "principiante-bajar-peso-mujeres",
    variante: "mujeres",
    nivel: "Principiante",
    objetivo: "Bajar de peso y tonificación",
    aerobicos: AEROBICOS_20,
    ficha: "/images/rutinas/principiante-bajar-peso-mujeres.webp",
    bloques: [
      {
        id: "dia-1",
        titulo: "Día 1",
        ejercicios: [
          { nombre: "Prensa squat",                carga: "4 x 15" },
          { nombre: "Patada glúteos",              carga: "4 x 12" },
          { nombre: "Femorales",                   carga: "4 x 12" },
          { nombre: "Sillón abductor",             carga: "4 x 15" },
          { nombre: "Sentadilla sumo",             carga: "4 x 15" },
          { nombre: "Bíceps con barra",            carga: "4 x 12" },
          { nombre: "Bíceps con mancuerna 90°",    carga: "3 x 10" },
        ],
      },
      {
        id: "dia-2",
        titulo: "Día 2",
        ejercicios: [
          { nombre: "Dorsales al frente",    carga: "4 x 12" },
          { nombre: "Remo bajo",             carga: "3 x 15" },
          { nombre: "Convergente 45°",       carga: "4 x 15" },
          { nombre: "Peck deck",             carga: "3 x 12" },
          { nombre: "Convergente hombros",   carga: "4 x 12" },
          { nombre: "Vuelos laterales",      carga: "3 x 12" },
          { nombre: "Frontal con barra",     carga: "3 x 10" },
        ],
      },
      {
        id: "dia-3",
        titulo: "Día 3",
        ejercicios: [
          { nombre: "Prensa inclinada",             carga: "4 x 15" },
          { nombre: "Sillón de cuádriceps",         carga: "4 x 12" },
          { nombre: "Prensa horizontal",            carga: "3 x 15" },
          { nombre: "Sillón abductor",              carga: "3 x 15" },
          { nombre: "Gemelos sentado",              carga: "3 x 15" },
          { nombre: "Tríceps fondos en máquina",    carga: "3 x 15" },
          { nombre: "Tríceps en polea con barra",   carga: "3 x 15" },
        ],
      },
      {
        id: "zona-core",
        titulo: "Zona core",
        ejercicios: [
          { nombre: "Planchas",              carga: "3 x 60'" },
          { nombre: "Elevación de piernas",  carga: "4 x 15" },
          { nombre: "Toco talones",          carga: "4 x 15" },
          { nombre: "Espinales",             carga: "4 x 15" },
        ],
      },
    ],
  },

  {
    id: "intermedio-volumen-mujeres",
    variante: "mujeres",
    nivel: "Intermedio",
    objetivo: "Volumen y tonificación",
    aerobicos: AEROBICOS_15,
    ficha: "/images/rutinas/intermedio-volumen-mujeres.webp",
    bloques: [
      {
        id: "dia-1",
        titulo: "Día 1",
        ejercicios: [
          { nombre: "Sentadilla libre",        carga: "4 x 15" },
          { nombre: "Prensa squat",            carga: "4 x 12" },
          { nombre: "Prensa de glúteos",       carga: "4 x 12" },
          { nombre: "Femorales parado",        carga: "4 x 10" },
          { nombre: "Abductor parado",         carga: "4 x 15" },
          { nombre: "Hip thrust con barra",    carga: "4 x 12" },
          { nombre: "Press en máquina",        carga: "4 x 12" },
          { nombre: "Frontal con mancuerna",   carga: "4 x 10" },
        ],
      },
      {
        id: "dia-2",
        titulo: "Día 2",
        ejercicios: [
          { nombre: "Press inclinado con mancuerna",          carga: "4 x 12" },
          { nombre: "Press convergente plano",                carga: "3 x 15" },
          { nombre: "Peck fly",                               carga: "3 x 15" },
          { nombre: "Bíceps scott con barra",                 carga: "4 x 12" },
          { nombre: "Martillo con mancuerna",                 carga: "4 x 10" },
          { nombre: "Sentado a dos brazos con mancuerna",     carga: "4 x 12" },
          { nombre: "Tríceps con soga en polea",              carga: "3 x 15" },
          { nombre: "Espinales y tijeras",                    carga: "4 x 15" },
        ],
      },
      {
        id: "dia-3",
        titulo: "Día 3",
        ejercicios: [
          { nombre: "Prensa hack",                     carga: "4 x 12" },
          { nombre: "Sentadilla sissy",                carga: "4 x 15" },
          { nombre: "Estocadas con mancuerna",         carga: "4 x 12" },
          { nombre: "Sillón abductor en máquina",      carga: "3 x 15" },
          { nombre: "Gemelos sentado",                 carga: "3 x 15" },
          { nombre: "Dorsal agarre neutro",            carga: "4 x 12" },
          { nombre: "Dorsal con triángulo",            carga: "3 x 15" },
          { nombre: "Remo a un brazo con mancuerna",   carga: "3 x 12" },
        ],
      },
    ],
  },
];

/** Parte "4 x 15/8" en { series: "4", reps: "15/8" }. */
export function partirCarga(carga: string): { series: string; reps: string } {
  const i = carga.indexOf(" x ");
  if (i === -1) return { series: "", reps: carga };
  return { series: carga.slice(0, i).trim(), reps: carga.slice(i + 3).trim() };
}
