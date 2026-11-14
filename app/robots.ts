import { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/sedes";

/* Buscadores con IA a los que se les permite leer el sitio de forma
   explícita (para que citen horarios, sedes y precios al responder). */
const AI_BOTS = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-SearchBot", "Claude-User",
  "PerplexityBot", "Perplexity-User",
  "Google-Extended", "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    /* /rutinas queda fuera de Google vía `robots: noindex` en su propio
       metadata. No se bloquea acá a propósito: si se bloqueara el rastreo,
       Google no podría leer el noindex y la URL igual podría listarse. */
    rules: [
      { userAgent: "*",     allow: "/" },
      { userAgent: AI_BOTS, allow: "/" },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
