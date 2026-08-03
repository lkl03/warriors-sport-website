import { MetadataRoute } from "next";

const BASE_URL = "https://www.warriorssportarg.com.ar";

export default function robots(): MetadataRoute.Robots {
  return {
    /* /rutinas queda fuera de Google vía `robots: noindex` en su propio
       metadata. No se bloquea acá a propósito: si se bloqueara el rastreo,
       Google no podría leer el noindex y la URL igual podría listarse. */
    rules: {
      userAgent: "*",
      allow:     "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
