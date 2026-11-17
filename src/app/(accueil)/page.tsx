import { setRequestLocale } from "next-intl/server";
import { HomeContent } from "../[locale]/page";
import { pageMeta } from "@/lib/metadata";

// Static export of redirect("/fr/") shipped an empty HTML shell at `/`.
// This route prerenders the French homepage in the document a crawler fetches.
// The canonical stays /fr/ so the apex URL does not compete with it.
export async function generateMetadata() {
  setRequestLocale("fr");
  return pageMeta("home");
}

export default async function AccueilPage() {
  setRequestLocale("fr");
  return <HomeContent locale="fr" />;
}
