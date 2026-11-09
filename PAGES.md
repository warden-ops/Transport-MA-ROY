# Publication GitHub Pages

Le site est un export Next.js (`output: "export"`).

## Correctif du 9 nov. 2026

GitHub Pages était en mode « Deploy from a branch » sur `main` `/`.
Les fichiers HTML/JS à la racine (`fr/`, `en/`, `_next/`, …) dataient du 3 septembre 2026
et ouvraient encore le mailto, avec le faux numéro et le mauvais courriel.
Le code source (`src/`, `messages/`) et le workflow « Deploy site » (PR #10) étaient déjà bons,
mais le mode legacy republiait l’ancien export et écrasait l’artefact Actions.

Cette branche régénère l’export statique à la racine (et dans `docs/`) avec :
- POST JSON vers le webhook GoHighLevel (NEXT_PUBLIC_SOUMISSION_ENDPOINT)
- courriel info@transportmar.ca
- téléphone 819 578-3441

## Après fusion (à faire une fois)

Dans Settings → Pages du dépôt, passer la source de « Deploy from a branch »
à « GitHub Actions ». Ensuite seul le workflow `.github/workflows/pages.yml` publie le site,
et un `npm run build` + `npm run pages:sync` ne sera plus nécessaire pour le live.

Sans ce changement de réglage, toute fusion sur `main` qui ne régénère pas les fichiers
racine peut republier un vieux export.
