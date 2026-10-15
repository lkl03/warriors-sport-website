"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, Send, Navigation, ChevronLeft } from "lucide-react";
import { track } from "@vercel/analytics";
import { sedes, type Sede, type SedeId } from "@/lib/sedes";
import { faqById, type FaqId } from "@/lib/faq";

/* ── Asistente guiado ──────────────────────────────────────────────────────
   Reemplaza al botón flotante de WhatsApp. No es IA: responde al instante
   con los mismos datos de la web (lib/faq.ts, lib/sedes.ts), así nunca
   contradice al sitio ni inventa precios. Todo termina en WhatsApp, con el
   número de la sede que corresponde y un mensaje ya escrito, para que la
   recepción reciba la consulta ordenada.
   ───────────────────────────────────────────────────────────────────────── */

const CURSO_PHONE = "5491150123469";

type Interest = "Musculación" | "Clases grupales" | "Todavía no sé";

type Topic =
  | { kind: "faq"; id: FaqId; label: string }
  | { kind: "start" };

const TOPICS: { label: string; topic: Topic }[] = [
  { label: "💪 Quiero empezar",        topic: { kind: "start" } },
  { label: "🕒 Horarios",              topic: { kind: "faq", id: "horarios",    label: "los horarios" } },
  { label: "💲 Precios y planes",      topic: { kind: "faq", id: "precios",     label: "los precios y planes" } },
  { label: "🏋️ Actividades y clases", topic: { kind: "faq", id: "actividades", label: "las actividades y clases" } },
  { label: "📍 ¿Dónde quedan?",        topic: { kind: "faq", id: "ubicacion",   label: "cómo llegar" } },
  { label: "🎓 Curso de entrenador",   topic: { kind: "faq", id: "curso",       label: "el curso de entrenador" } },
];

type Entry =
  | { from: "bot" | "user"; text: string }
  | { from: "bot"; kind: "directions" }
  | { from: "bot"; kind: "handoff"; href: string; label: string; meta: Record<string, string> };

type Step =
  | { name: "menu" }
  | { name: "afterAnswer"; topicLabel: string; isCurso: boolean }
  | { name: "pickSede"; reason: string }
  | { name: "pickInterest"; sede: Sede }
  | { name: "done" };

const waHref = (phone: string, text: string) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

const GREETING = "¡Hola! 👋 Soy el asistente de Warriors Sport. Te respondo al toque y, si querés, te paso con recepción por WhatsApp. ¿Qué necesitás?";

export default function WarriorsAssistant() {
  const pathname = usePathname();
  const pageSede: SedeId | null =
    pathname === "/sedes/san-martin" ? "sm" : pathname === "/sedes/san-andres" ? "sa" : null;

  const [visible, setVisible] = useState(false);
  const [open, setOpen]       = useState(false);
  const [nudge, setNudge]     = useState(false);
  const [entries, setEntries] = useState<Entry[]>([{ from: "bot", text: GREETING }]);
  const [step, setStep]       = useState<Step>({ name: "menu" });
  const [draft, setDraft]     = useState("");
  const [pending, setPending] = useState<string | null>(null); // texto libre o tema a derivar

  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef  = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  /* Aparición del botón + globito de invitación (una vez por sesión) */
  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 1500);
    let seen = false;
    try { seen = sessionStorage.getItem("ws-assistant-nudge") === "1"; } catch {}
    const t2 = seen ? undefined : setTimeout(() => setNudge(true), 6000);
    const t3 = seen ? undefined : setTimeout(() => setNudge(false), 16000);
    return () => { clearTimeout(t1); if (t2) clearTimeout(t2); if (t3) clearTimeout(t3); };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [entries, step]);

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const toggle = () => {
    setNudge(false);
    try { sessionStorage.setItem("ws-assistant-nudge", "1"); } catch {}
    setOpen(o => {
      if (!o) track("assistant_open", { page: pathname });
      return !o;
    });
  };

  const push = (...e: Entry[]) => setEntries(prev => [...prev, ...e]);

  const reset = () => {
    setEntries([{ from: "bot", text: GREETING }]);
    setStep({ name: "menu" });
    setPending(null);
  };

  /* ── Derivación a WhatsApp ── */
  const handoff = (sede: Sede, text: string, meta: Record<string, string>) => {
    push({
      from: "bot",
      kind: "handoff",
      href: waHref(sede.phoneE164.replace("+", ""), text),
      label: `Abrir WhatsApp · ${sede.label}`,
      meta: { sede: sede.label, ...meta },
    });
    setStep({ name: "done" });
  };

  const handoffFor = (sede: Sede, reason: string) => {
    const text = reason.startsWith("free:")
      ? `¡Hola! Vengo de la web. ${reason.slice(5)} (sede ${sede.label})`
      : `¡Hola! Vengo de la web y quería consultar por ${reason} en la sede ${sede.label}.`;
    push({ from: "bot", text: `Listo, te paso con recepción de ${sede.label}. Ya te dejé el mensaje escrito, solo tenés que enviarlo 👇` });
    handoff(sede, text, { topic: reason.startsWith("free:") ? "texto libre" : reason });
  };

  const askSede = (reason: string) => {
    const preset = sedes.find(s => s.id === pageSede);
    if (preset) { handoffFor(preset, reason); return; }
    setPending(reason);
    push({ from: "bot", text: "¿Qué sede te queda mejor?" });
    setStep({ name: "pickSede", reason });
  };

  /* ── Menú principal ── */
  const choose = (label: string, topic: Topic) => {
    push({ from: "user", text: label.replace(/^\S+\s/, "") });

    if (topic.kind === "start") {
      const preset = sedes.find(s => s.id === pageSede);
      if (preset) {
        push({ from: "bot", text: `¡Buenísimo! ¿Qué te interesa en ${preset.label}?` });
        setStep({ name: "pickInterest", sede: preset });
      } else {
        push({ from: "bot", text: "¡Buenísimo! 💪 ¿Qué sede te queda mejor?" });
        setStep({ name: "pickSede", reason: "start" });
      }
      return;
    }

    const faq = faqById(topic.id);
    push({ from: "bot", text: faq.a });
    if (topic.id === "ubicacion") push({ from: "bot", kind: "directions" });
    setStep({ name: "afterAnswer", topicLabel: topic.label, isCurso: topic.id === "curso" });
  };

  const pickSede = (sede: Sede) => {
    push({ from: "user", text: sede.label });
    const reason = step.name === "pickSede" ? step.reason : pending ?? "start";
    if (reason === "start") {
      push({ from: "bot", text: `¿Qué te interesa en ${sede.label}?` });
      setStep({ name: "pickInterest", sede });
      return;
    }
    handoffFor(sede, reason);
  };

  const pickInterest = (sede: Sede, interest: Interest) => {
    push({ from: "user", text: interest });
    const text = interest === "Todavía no sé"
      ? `¡Hola! Vengo de la web. Quiero empezar a entrenar en Warriors ${sede.label} y me gustaría que me asesoren.`
      : `¡Hola! Vengo de la web. Quiero empezar a entrenar en Warriors ${sede.label}. Me interesa: ${interest}.`;
    push({ from: "bot", text: `Genial. Te paso con recepción de ${sede.label}, que te cuenta planes y cómo arrancar. Ya te dejé el mensaje escrito 👇` });
    handoff(sede, text, { topic: "quiero empezar", interest });
  };

  const followUpWhatsApp = () => {
    if (step.name !== "afterAnswer") return;
    push({ from: "user", text: "Seguir por WhatsApp" });
    if (step.isCurso) {
      push({ from: "bot", text: "El curso tiene su propio WhatsApp. Te dejé el mensaje escrito 👇" });
      push({
        from: "bot", kind: "handoff",
        href: waHref(CURSO_PHONE, "¡Hola! Vengo de la web y quiero info sobre el Curso de Entrenador en Musculación y Alto Rendimiento."),
        label: "Abrir WhatsApp · Curso", meta: { sede: "Curso", topic: "curso" },
      });
      setStep({ name: "done" });
      return;
    }
    askSede(step.topicLabel);
  };

  const submitFree = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    push({ from: "user", text });
    push({ from: "bot", text: "¡Buena pregunta! Eso te lo responde mejor la gente de recepción." });
    askSede(`free:${text}`);
  };

  const sedeForInterest = step.name === "pickInterest" ? step.sede : null;

  return (
    <>
      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-label="Asistente de Warriors Sport"
          className="fixed z-[60] inset-x-4 bottom-24 sm:inset-x-auto sm:right-6 sm:w-[380px] max-h-[min(70vh,600px)] flex flex-col bg-[#0b0b0b] border border-[#7EEF08]/25 rounded-2xl shadow-2xl shadow-black/70 overflow-hidden outline-none animate-fade-in-up"
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1e1e1e] bg-black">
            <span className="relative w-9 h-9 shrink-0">
              <Image src="/images/logo.jpg" alt="" width={36} height={36} className="w-9 h-9 rounded-full object-cover border border-[#7EEF08]/50" />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#25D366] border-2 border-black" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold leading-tight">Asistente Warriors</p>
              <p className="text-white/45 text-xs leading-tight">Respuesta al instante · recepción por WhatsApp</p>
            </div>
            {entries.length > 1 && (
              <button onClick={reset} aria-label="Volver al inicio" className="cursor-pointer text-white/45 hover:text-white p-1.5">
                <ChevronLeft size={18} />
              </button>
            )}
            <button onClick={close} aria-label="Cerrar asistente" className="cursor-pointer text-white/45 hover:text-white p-1.5">
              <X size={18} />
            </button>
          </div>

          {/* Conversación */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3" aria-live="polite">
            {entries.map((e, i) => {
              if ("kind" in e && e.kind === "directions") {
                return (
                  <div key={i} className="flex flex-wrap gap-2">
                    {sedes.map(s => (
                      <a
                        key={s.id}
                        href={s.directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => track("assistant_directions", { sede: s.label })}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7EEF08] border border-[#7EEF08]/40 hover:bg-[#7EEF08]/10 rounded-full px-3 py-1.5"
                      >
                        <Navigation size={12} /> Cómo llegar · {s.label}
                      </a>
                    ))}
                  </div>
                );
              }
              if ("kind" in e && e.kind === "handoff") {
                return (
                  <a
                    key={i}
                    href={e.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("assistant_whatsapp", e.meta)}
                    className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1fb855] text-black font-bold text-sm rounded-xl px-4 py-3 transition-colors"
                  >
                    <WhatsAppGlyph size={18} fill="black" /> {e.label}
                  </a>
                );
              }
              const isBot = e.from === "bot";
              return (
                <div key={i} className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
                  <p
                    className={`max-w-[85%] text-sm leading-relaxed rounded-2xl px-3.5 py-2.5 ${
                      isBot
                        ? "bg-[#161616] text-white/85 rounded-tl-sm"
                        : "bg-[#7EEF08] text-black font-medium rounded-tr-sm"
                    }`}
                  >
                    {"text" in e ? e.text : null}
                  </p>
                </div>
              );
            })}

            {/* Opciones del paso actual */}
            <div className="flex flex-wrap gap-2 pt-1">
              {step.name === "menu" && TOPICS.map(({ label, topic }) => (
                <Chip key={label} onClick={() => choose(label, topic)}>{label}</Chip>
              ))}

              {step.name === "afterAnswer" && (
                <>
                  <Chip primary onClick={followUpWhatsApp}>Seguir por WhatsApp</Chip>
                  <Chip onClick={() => { push({ from: "user", text: "Otra consulta" }, { from: "bot", text: "Dale, ¿qué más querés saber?" }); setStep({ name: "menu" }); }}>
                    Otra consulta
                  </Chip>
                </>
              )}

              {step.name === "pickSede" && sedes.map(s => (
                <Chip key={s.id} onClick={() => pickSede(s)}>{s.label}</Chip>
              ))}

              {sedeForInterest && (
                (["Musculación", ...(sedeForInterest.id === "sm" ? ["Clases grupales"] : []), "Todavía no sé"] as Interest[])
                  .map(i => <Chip key={i} onClick={() => pickInterest(sedeForInterest, i)}>{i}</Chip>)
              )}

              {step.name === "done" && (
                <Chip onClick={() => { push({ from: "user", text: "Otra consulta" }, { from: "bot", text: "Dale, ¿qué más querés saber?" }); setStep({ name: "menu" }); }}>
                  Otra consulta
                </Chip>
              )}
            </div>
          </div>

          {/* Texto libre → WhatsApp */}
          <form onSubmit={submitFree} className="flex items-center gap-2 border-t border-[#1e1e1e] p-3 bg-black">
            <label htmlFor="ws-assistant-input" className="sr-only">Escribí tu consulta</label>
            <input
              id="ws-assistant-input"
              value={draft}
              onChange={e => setDraft(e.target.value)}
              placeholder="Escribí tu consulta…"
              maxLength={300}
              className="flex-1 min-w-0 bg-[#161616] border border-[#262626] focus:border-[#7EEF08]/50 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder:text-white/35 outline-none"
            />
            <button
              type="submit"
              aria-label="Enviar consulta"
              disabled={!draft.trim()}
              className="cursor-pointer w-10 h-10 shrink-0 rounded-xl bg-[#7EEF08] disabled:bg-[#7EEF08]/30 text-black flex items-center justify-center transition-colors"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Globito de invitación */}
      {nudge && !open && (
        <button
          onClick={toggle}
          className="cursor-pointer fixed z-50 bottom-[5.5rem] right-6 max-w-[220px] text-left bg-white text-black text-sm font-medium rounded-2xl rounded-br-sm px-4 py-2.5 shadow-xl animate-fade-in-up"
        >
          ¿Tenés dudas? Te respondo al toque 👋
        </button>
      )}

      {/* Botón flotante */}
      <button
        ref={buttonRef}
        onClick={toggle}
        aria-label={open ? "Cerrar asistente" : "Abrir asistente: consultas y WhatsApp"}
        aria-expanded={open}
        className={`cursor-pointer fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-black/50 transition-all duration-500 hover:scale-110 active:scale-95 ${
          open ? "" : "animate-green-pulse"
        } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        style={{ background: open ? "#1a1a1a" : "#25D366" }}
      >
        {open ? <X size={26} className="text-white" /> : <WhatsAppGlyph size={30} fill="white" />}
      </button>
    </>
  );
}

function Chip({ children, onClick, primary }: { children: React.ReactNode; onClick: () => void; primary?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer text-xs sm:text-[13px] font-semibold rounded-full px-3.5 py-2 border transition-colors ${
        primary
          ? "bg-[#25D366] border-[#25D366] text-black hover:bg-[#1fb855]"
          : "border-[#7EEF08]/40 text-[#7EEF08] hover:bg-[#7EEF08]/10"
      }`}
    >
      {children}
    </button>
  );
}

function WhatsAppGlyph({ size, fill }: { size: number; fill: string }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill={fill} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.682 4.61 1.863 6.502L4 29l7.697-1.826A11.929 11.929 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 2c5.523 0 10 4.477 10 10S21.523 25 16 25c-1.845 0-3.574-.502-5.06-1.377L10.5 23.4l-3.4.807.838-3.3-.24-.385A9.955 9.955 0 016 15C6 9.477 10.477 5 16 5zm-3.177 5c-.2 0-.522.075-.796.375-.273.3-1.044 1.02-1.044 2.487s1.068 2.888 1.217 3.087c.15.2 2.063 3.3 5.11 4.5.713.275 1.27.44 1.703.563.716.205 1.368.176 1.883.107.574-.078 1.77-.723 2.02-1.42.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.574-.35-.3-.15-1.77-.875-2.045-.975-.273-.1-.472-.15-.672.15-.2.3-.772.975-.947 1.175-.175.2-.35.225-.65.075-.3-.15-1.265-.465-2.41-1.485-.892-.793-1.494-1.773-1.669-2.073-.175-.3-.018-.462.131-.612.135-.134.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.672-1.623-.922-2.22-.243-.582-.49-.503-.672-.512a12.9 12.9 0 00-.573-.013z"/>
    </svg>
  );
}
