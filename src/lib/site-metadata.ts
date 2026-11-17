import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Transport M-A Roy",
    template: "%s",
  },
  robots: {
    index: true,
    follow: true,
  },
};
