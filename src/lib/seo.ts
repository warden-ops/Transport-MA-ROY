import type { AppLocale } from "@/i18n/routing";

export const SITE_URL = "https://transportmar.ca";

export const pagePaths = {
  home: "",
  services: "/services",
  products: "/produits",
  about: "/a-propos",
  contact: "/contact",
  privacy: "/confidentialite",
  sherbrooke: "/conteneurs-maritimes-sherbrooke",
} as const;

export type PageKey = keyof typeof pagePaths;

/** Canonical URLs only. `/` is a static copy of the French home and is not listed. */
export const indexablePages: PageKey[] = [
  "home",
  "services",
  "products",
  "about",
  "contact",
  "privacy",
  "sherbrooke",
];

export function pageUrl(locale: AppLocale, key: PageKey) {
  return `${SITE_URL}/${locale}${pagePaths[key]}/`;
}

/**
 * Public facts already on the site: legal name, https://transportmar.ca,
 * 819 578-3441, info@transportmar.ca, Route 108, Cookshire-Eaton, Estrie,
 * Sherbrooke (the company started there in 2020), delivery across Québec.
 * Former business name, confirmed by the client: Conteneurs Roy.
 *
 * TODO(client): postalCode — not published. Do not invent it.
 * TODO(client): civic number — streetAddress stays "Route 108" only.
 * TODO(client): openingHours — not published. Do not invent them.
 * TODO(client): geo latitude/longitude — not published. Do not invent GPS.
 * TODO(client): sameAs — Google Business, Facebook, or other profiles, once the real URLs are confirmed.
 * Product JSON-LD stays blocked until dimensions are confirmed (see the produits page).
 */
export const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#entreprise`,
  name: "Transport M-A Roy inc.",
  alternateName: "Conteneurs Roy",
  url: SITE_URL,
  image: `${SITE_URL}/og/transport-ma-roy-partage-1200x630.jpg`,
  telephone: "+1-819-578-3441",
  email: "info@transportmar.ca",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Route 108",
    addressLocality: "Cookshire-Eaton",
    addressRegion: "QC",
    addressCountry: "CA",
  },
  areaServed: [
    { "@type": "City", name: "Sherbrooke" },
    { "@type": "AdministrativeArea", name: "Estrie" },
    { "@type": "City", name: "Cookshire-Eaton" },
    { "@type": "AdministrativeArea", name: "Québec" },
  ],
  description:
    "Vente et location de conteneurs maritimes 20' et 40', neufs ou usagés, à Sherbrooke et en Estrie. Cour sur la route 108 à Cookshire-Eaton. Livraison au Québec.",
};
