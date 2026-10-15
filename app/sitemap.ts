import { MetadataRoute } from "next";
import { BASE_URL, sedes } from "@/lib/sedes";

/* /rutinas no va: es noindex (página exclusiva del QR impreso). */
const LAST_UPDATE = new Date("2026-10-15");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url:             BASE_URL,
      lastModified:    LAST_UPDATE,
      changeFrequency: "weekly",
      priority:        1,
    },
    ...sedes.map(s => ({
      url:             `${BASE_URL}/sedes/${s.slug}`,
      lastModified:    LAST_UPDATE,
      changeFrequency: "monthly" as const,
      priority:        0.9,
    })),
  ];
}
