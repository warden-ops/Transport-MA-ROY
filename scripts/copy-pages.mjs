import { cpSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const from = join(root, "out");
const targets = [
  "index.html",
  "404.html",
  ".nojekyll",
  "CNAME",
  "favicon.ico",
  "favicon.svg",
  "apple-icon.png",
  "robots.txt",
  "sitemap.xml",
  "fr",
  "en",
  "_next",
  "media",
  "brand",
];

if (!existsSync(from)) {
  throw new Error("Run npm run build first so out/ exists.");
}

for (const name of targets) {
  const src = join(from, name);
  const dest = join(root, name);
  if (!existsSync(src)) continue;
  rmSync(dest, { recursive: true, force: true });
  cpSync(src, dest, { recursive: true });
}

const docs = join(root, "docs");
rmSync(docs, { recursive: true, force: true });
cpSync(from, docs, { recursive: true });
