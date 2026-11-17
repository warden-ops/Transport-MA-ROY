import type { MetadataRoute } from "next";
import { routing, type AppLocale } from "@/i18n/routing";
import { indexablePages, pageUrl } from "@/lib/seo";

export const dynamic = "force-static";

const lastModified = new Date("2026-11-17");

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    indexablePages.map((key) => ({
      url: pageUrl(locale as AppLocale, key),
      lastModified,
    })),
  );
}
