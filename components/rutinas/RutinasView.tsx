"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import {
  Dumbbell,
  Check,
  RotateCcw,
  Repeat,
  Layers,
  MessageCircle,
  Image as ImageIcon,
  HeartPulse,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import MediaModal from "@/components/MediaModal";
import {
  rutinas,
  partirCarga,
  ACTUALIZADO,
  AVISOS,
  WA_RUTINAS,
  type Variante,
} from "@/lib/rutinas";

/* ── Paleta por variante ──────────────────────────────────────────────────
   El gimnasio ya usa verde para las fichas de hombres y rosa para las de
   mujeres. Respetamos esa señal: es cómo la gente reconoce la suya en la
   pared. El fondo del sitio sigue siendo negro en los dos casos.
   ──────────────────────────────────────────────────────────────────────── */
const TEMA: Record<Variante, Record<string, string>> = {
  hombres: {
    "--acento":        "#7EEF08",
    "--acento-suave":  "rgba(126,239,8,0.10)",
    "--acento-borde":  "rgba(126,239,8,0.38)",
    "--acento-glow":   "rgba(126,239,8,0.42)",
    "--acento-texto":  "#000000",
  },
  mujeres: {
    "--acento":        "#F20B96",
    "--acento-suave":  "rgba(242,11,150,0.10)",
    "--acento-borde":  "rgba(242,11,150,0.40)",
    "--acento-glow":   "rgba(242,11,150,0.45)",
    "--acento-texto":  "#ffffff",
  },
};

const ETIQUETA: Record<Variante, string> = {
  hombres: "Hombres",
  mujeres: "Mujeres",
};

/* ── localStorage como store externo ──────────────────────────────────────
   Se lee con useSyncExternalStore porque en el servidor no existe, y porque
   cada escritura parte del valor guardado en ese momento: si alguien marca
   varios ejercicios a toda velocidad, ninguno pisa al anterior.
   ──────────────────────────────────────────────────────────────────────── */
const CLAVE_VARIANTE = "ws-rutina:variante";

const oyentes = new Set<() => void>();

const suscribir = (fn: () => void) => {
  oyentes.add(fn);
  return () => {
    oyentes.delete(fn);
  };
};

const leer = (clave: string) => {
  try {
    return window.localStorage.getItem(clave) ?? "";
  } catch {
    /* modo privado / storage bloqueado: funciona igual, sin recordar nada */
    return "";
  }
};

const escribir = (clave: string, valor: string) => {
  try {
    window.localStorage.setItem(clave, valor);
  } catch {
    /* idem */
  }
  oyentes.forEach((fn) => fn());
};

const parsearHechos = (crudo: string): number[] => {
  try {
    const v: unknown = JSON.parse(crudo || "[]");
    return Array.isArray(v) ? (v as number[]).filter((n) => typeof n === "number") : [];
  } catch {
    return [];
  }
};

export default function RutinasView() {
  const varianteGuardada = useSyncExternalStore(
    suscribir,
    () => leer(CLAVE_VARIANTE),
    () => "",
  );
  const variante: Variante | null =
    varianteGuardada === "hombres" || varianteGuardada === "mujeres"
      ? varianteGuardada
      : null;

  const [rutinaId, setRutinaId] = useState<string | null>(null);
  const [bloqueId, setBloqueId] = useState<string | null>(null);
  const [fichaAbierta, setFichaAbierta] = useState(false);

  /* Las selecciones se resuelven contra los datos en cada render: si la
     variante cambia y la rutina anterior ya no aplica, cae sola en la
     primera. Evita tener que sincronizar estado con efectos. */
  const delGrupo = useMemo(
    () => (variante ? rutinas.filter((r) => r.variante === variante) : []),
    [variante],
  );
  const rutina = delGrupo.find((r) => r.id === rutinaId) ?? delGrupo[0];
  const bloque = rutina?.bloques.find((b) => b.id === bloqueId) ?? rutina?.bloques[0];

  const claveProgreso = rutina && bloque ? `ws-rutina:${rutina.id}:${bloque.id}` : "";
  const crudoHechos = useSyncExternalStore(
    suscribir,
    () => (claveProgreso ? leer(claveProgreso) : ""),
    () => "",
  );
  const hechos = useMemo(() => parsearHechos(crudoHechos), [crudoHechos]);

  const alternar = (i: number) => {
    const actual = parsearHechos(leer(claveProgreso));
    const next = actual.includes(i) ? actual.filter((x) => x !== i) : [...actual, i];
    escribir(claveProgreso, JSON.stringify(next));
  };

  /* ══ Paso 1: elegir la variante ═══════════════════════════════════════ */
  if (!variante || !rutina || !bloque) {
    return (
      <div className="bg-black">
        <Encabezado />
        <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-white/35">
            Elegí tu rutina
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {(["mujeres", "hombres"] as Variante[]).map((v) => (
              <button
                key={v}
                onClick={() => escribir(CLAVE_VARIANTE, v)}
                style={TEMA[v] as React.CSSProperties}
                className="group rounded-2xl border border-[#1e1e1e] bg-[#0d0d0d] px-6 py-10 transition-all duration-200 hover:border-[var(--acento-borde)] hover:bg-[var(--acento-suave)]"
              >
                <span className="block font-display text-4xl tracking-widest text-white transition-colors group-hover:text-[var(--acento)]">
                  {ETIQUETA[v].toUpperCase()}
                </span>
                <span className="mt-2 inline-flex items-center gap-1 text-xs text-white/40">
                  Ver las 4 rutinas <ChevronRight size={13} />
                </span>
              </button>
            ))}
          </div>
          <p className="mt-6 text-center text-xs leading-relaxed text-white/25">
            Lo elegís una sola vez. La próxima que escanees el código, el celular
            ya se acuerda.
          </p>
        </section>
      </div>
    );
  }

  /* ══ Paso 2: rutinas de la variante elegida ═══════════════════════════ */
  const total     = bloque.ejercicios.length;
  const completos = hechos.filter((i) => i < total).length;
  const progreso  = total ? Math.round((completos / total) * 100) : 0;
  const dosCargas = Boolean(rutina.columnas);

  return (
    <div className="bg-black" style={TEMA[variante] as React.CSSProperties}>
      <Encabezado />

      {/* ── Variante activa ── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between rounded-xl border border-[var(--acento-borde)] bg-[var(--acento-suave)] px-4 py-3">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--acento)]">
            Rutinas de {ETIQUETA[variante].toLowerCase()}
          </span>
          <button
            onClick={() => escribir(CLAVE_VARIANTE, "")}
            className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-white/40 transition-colors hover:text-white"
          >
            <RefreshCw size={12} /> Cambiar
          </button>
        </div>

        {/* ── Elegir rutina ── */}
        <p className="mt-7 mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/35">
          Tu plan
        </p>
        <ul className="space-y-2">
          {delGrupo.map((r) => {
            const activa = r.id === rutina.id;
            return (
              <li key={r.id}>
                <button
                  onClick={() => {
                    setRutinaId(r.id);
                    setBloqueId(null);
                  }}
                  aria-pressed={activa}
                  className={`flex w-full items-center justify-between gap-4 rounded-xl border px-4 py-3.5 text-left transition-all duration-200 ${
                    activa
                      ? "border-[var(--acento)] bg-[var(--acento-suave)] shadow-[0_0_26px_-8px_var(--acento-glow)]"
                      : "border-[#1e1e1e] bg-[#0d0d0d] hover:border-white/20"
                  }`}
                >
                  <span className="min-w-0">
                    <span
                      className={`block font-display text-xl leading-none tracking-widest ${
                        activa ? "text-[var(--acento)]" : "text-white"
                      }`}
                    >
                      {r.nivel.toUpperCase()}
                    </span>
                    <span className="mt-1.5 block text-xs leading-snug text-white/45">
                      {r.objetivo}
                    </span>
                  </span>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors ${
                      activa ? "bg-[var(--acento)]" : "bg-[#161616]"
                    }`}
                  >
                    {activa ? (
                      <Check size={13} strokeWidth={3} className="text-[var(--acento-texto)]" />
                    ) : (
                      <ChevronRight size={13} className="text-white/35" />
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* ── Aeróbicos ── */}
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#1e1e1e] bg-[#0d0d0d] px-4 py-3.5">
          <HeartPulse size={16} className="mt-0.5 shrink-0 text-[var(--acento)]" />
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/35">
              Aeróbicos · a elección
            </p>
            <p className="mt-1 text-sm text-white/70">{rutina.aerobicos}</p>
          </div>
        </div>
      </section>

      {/* ── Solapas de bloque (sticky) ── */}
      <div className="sticky top-16 z-30 mt-7 border-y border-[#1a1a1a] bg-black/95 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="no-scrollbar flex gap-2 overflow-x-auto py-3">
            {rutina.bloques.map((b) => {
              const activo = b.id === bloque.id;
              return (
                <button
                  key={b.id}
                  onClick={() => setBloqueId(b.id)}
                  aria-pressed={activo}
                  className={`shrink-0 rounded-lg border px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                    activo
                      ? "border-[var(--acento)] bg-[var(--acento)] text-[var(--acento-texto)]"
                      : "border-[#1e1e1e] bg-[#0d0d0d] text-white/55 hover:text-white"
                  }`}
                >
                  {b.titulo}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Ejercicios ── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 pb-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-3xl tracking-wide text-white">
            {bloque.titulo.toUpperCase()}
          </h2>

          {completos > 0 && (
            <button
              onClick={() => escribir(claveProgreso, "[]")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#1e1e1e] px-3 py-1.5 text-[11px] uppercase tracking-widest text-white/40 transition-colors hover:border-white/25 hover:text-white/70"
            >
              <RotateCcw size={12} /> Reiniciar
            </button>
          )}
        </div>

        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-[11px] uppercase tracking-widest">
            <span className="text-white/35">Progreso</span>
            <span className={completos === total ? "text-[var(--acento)]" : "text-white/50"}>
              {completos} / {total}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-[#161616]">
            <div
              className="h-full rounded-full bg-[var(--acento)] transition-[width] duration-400 ease-out"
              style={{ width: `${progreso}%` }}
            />
          </div>
        </div>

        <ul className="mt-6 space-y-2.5">
          {bloque.ejercicios.map((ej, i) => {
            const hecho = hechos.includes(i);
            const a = partirCarga(ej.carga);
            const b = ej.carga2 ? partirCarga(ej.carga2) : null;

            return (
              <li key={`${bloque.id}-${i}`}>
                <button
                  onClick={() => alternar(i)}
                  aria-pressed={hecho}
                  className={`flex w-full items-start gap-3.5 rounded-xl border p-4 text-left transition-all duration-200 sm:gap-4 sm:p-5 ${
                    hecho
                      ? "border-[var(--acento-borde)] bg-[var(--acento-suave)]"
                      : "border-[#1e1e1e] bg-[#0d0d0d] hover:border-white/15"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-display text-sm tracking-wider transition-colors ${
                      hecho
                        ? "bg-[var(--acento)] text-[var(--acento-texto)]"
                        : "bg-[#161616] text-white/40"
                    }`}
                  >
                    {hecho ? <Check size={15} strokeWidth={3} /> : String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span
                      className={`block text-[15px] font-semibold leading-snug transition-colors sm:text-base ${
                        hecho ? "text-white/40 line-through" : "text-white"
                      }`}
                    >
                      {ej.nombre}
                    </span>

                    {dosCargas && b && rutina.columnas ? (
                      /* Rutina con progresión: una columna por semana */
                      <span className="mt-3 grid grid-cols-2 gap-2">
                        <Columna etiqueta={rutina.columnas[0]} carga={a} atenuado={hecho} destacada />
                        <Columna etiqueta={rutina.columnas[1]} carga={b} atenuado={hecho} />
                      </span>
                    ) : (
                      <span className="mt-2.5 flex flex-wrap gap-1.5">
                        <Dato icon={Layers} etiqueta="Series" valor={a.series} atenuado={hecho} />
                        <Dato icon={Repeat} etiqueta="Reps"   valor={a.reps}   atenuado={hecho} />
                      </span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* ── Ficha original ── */}
        <button
          onClick={() => setFichaAbierta(true)}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl border border-[#1e1e1e] bg-[#0d0d0d] px-5 py-4 text-xs font-bold uppercase tracking-widest text-white/55 transition-all duration-200 hover:border-[var(--acento-borde)] hover:text-white"
        >
          <ImageIcon size={15} className="text-[var(--acento)]" /> Ver la ficha completa
        </button>

        {/* ── Avisos del gimnasio ── */}
        <div className="mt-10 space-y-3">
          {AVISOS.map((a) => (
            <div key={a.titulo} className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] px-5 py-4">
              <p className="text-sm font-bold italic text-[var(--acento)]">{a.titulo}</p>
              <p className="mt-1 text-sm leading-relaxed text-white/50">{a.texto}</p>
            </div>
          ))}
        </div>

        {/* ── Cierre ── */}
        <div className="mt-6 rounded-xl border border-[#1e1e1e] bg-[#0d0d0d] p-6 text-center">
          <p className="font-display text-2xl tracking-wide text-white">
            ¿QUERÉS UNA RUTINA PERSONALIZADA?
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-white/45">
            Hablá con tu instructor en el gimnasio o escribinos y armamos un plan
            según tu objetivo.
          </p>
          <a
            href={WA_RUTINAS}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded bg-[var(--acento)] px-6 py-3 text-xs font-bold uppercase tracking-widest text-[var(--acento-texto)] transition-all duration-200 hover:scale-105"
          >
            <MessageCircle size={15} /> Consultar por WhatsApp
          </a>
        </div>

        <p className="mt-6 text-center text-[11px] leading-relaxed text-white/25">
          Antes de empezar, consultá con un instructor de la sede. Ajustá las
          cargas a tu nivel y frená ante cualquier molestia.
          <br />
          Rutinas actualizadas · {ACTUALIZADO}
        </p>
      </section>

      {fichaAbierta && (
        <MediaModal
          src={rutina.ficha}
          type="image"
          width={720}
          height={1280}
          alt={`Ficha original — ${rutina.nivel}: ${rutina.objetivo} (${ETIQUETA[variante].toLowerCase()})`}
          onClose={() => setFichaAbierta(false)}
        />
      )}
    </div>
  );
}

/* ── Encabezado común ───────────────────────────────────────────────────── */
function Encabezado() {
  return (
    <section className="relative overflow-hidden pt-28 pb-9 sm:pt-32 sm:pb-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 h-72 opacity-60"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, rgba(126,239,8,0.14) 0%, rgba(0,0,0,0) 70%)",
        }}
      />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#7EEF08]/25 bg-[#7EEF08]/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#7EEF08]">
          <Dumbbell size={13} /> Warriors Sport Arg
        </p>
        <h1 className="mt-5 font-display text-6xl sm:text-8xl leading-none tracking-wide text-white">
          RUTINAS
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-white/50">
          Elegí tu plan, seguí el bloque del día y marcá cada ejercicio a medida
          que lo terminás.
        </p>
      </div>
    </section>
  );
}

/* ── Píldora de dato (series / reps) ────────────────────────────────────── */
function Dato({
  icon: Icon,
  etiqueta,
  valor,
  atenuado,
}: {
  icon: typeof Layers;
  etiqueta: string;
  valor: string;
  atenuado: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] transition-colors ${
        atenuado ? "border-[#161616] text-white/25" : "border-[#1e1e1e] bg-[#111] text-white/70"
      }`}
    >
      <Icon size={12} className={atenuado ? "text-white/25" : "text-[var(--acento)]"} />
      <span className="uppercase tracking-widest text-white/30">{etiqueta}</span>
      <span className="font-semibold">{valor}</span>
    </span>
  );
}

/* ── Columna de semana (rutina de adaptación) ───────────────────────────── */
function Columna({
  etiqueta,
  carga,
  atenuado,
  destacada,
}: {
  etiqueta: string;
  carga: { series: string; reps: string };
  atenuado: boolean;
  destacada?: boolean;
}) {
  return (
    <span
      className={`block rounded-lg border px-3 py-2 transition-colors ${
        atenuado
          ? "border-[#161616]"
          : destacada
            ? "border-[var(--acento-borde)] bg-[var(--acento-suave)]"
            : "border-[#1e1e1e] bg-[#111]"
      }`}
    >
      <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">
        {etiqueta}
      </span>
      <span
        className={`mt-0.5 block text-sm font-semibold ${
          atenuado ? "text-white/25" : "text-white/85"
        }`}
      >
        {carga.series} <span className="text-white/35">series ×</span> {carga.reps}
      </span>
    </span>
  );
}
