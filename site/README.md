# IKI Lash & Brow — portfolio (EN / DE)

Le code du site (Vite + React + Tailwind). Vos photos se rangent dans le
dossier `images/`, à côté de ce dossier `site/`.

## Démarrer

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:5173

## Où modifier quoi

| Quoi | Où |
|---|---|
| Textes (bloc `en` puis bloc `de`, même structure), coordonnées, couleur d'accent | `src/data/site.ts` |
| Photos de l'accueil, du portrait et des avis | dossier `images/` (à côté de `site/`), puis `node scripts/prepare-images.mjs` |
| Projets du portfolio (+ bloc « Version allemande » de chaque projet) | l'artefact « Projets du portfolio » sur claude.ai, bouton « Publier sur le site » |
| Cible de publication (local ou Hostinger) | `deploy.config.json` |

Les projets ne se modifient jamais à la main dans `src/data/projects.json` :
ce fichier est régénéré à chaque publication depuis l'artefact.

## Langues

Le site est en anglais (`/`) et en allemand (`/de/`) : une adresse par langue,
indexée séparément par Google. Un visiteur dont le navigateur est en allemand
arrive sur `/de/` ; le sélecteur EN / DE change de langue sans recharger.
L'espace projets (artefact) est lui aussi en anglais / allemand, et chaque
projet a ses textes dans les deux langues.

## SEO (automatique)

À chaque build : `index.html` (EN) et `de/index.html` (DE) avec titre,
description, liens canonique et hreflang, balises Open Graph / Twitter
(images `public/og-image.jpg` et `og-image-de.jpg`), données structurées
schema.org (BeautySalon, prestations, FAQ) et le contenu en HTML simple.
Dès que l'adresse du site est connue (`siteUrl` dans `deploy.config.json`,
rempli seul à la mise en ligne Hostinger) : `sitemap.xml` et liens absolus.

## À compléter avant la mise en ligne

| Quoi | Où |
|---|---|
| Ville du studio (le levier n°1 du référencement local) | `SITE.city` dans `src/data/site.ts` |
| Impressum (nom, adresse) — obligatoire en Allemagne | `SITE.legal` dans `src/data/site.ts` |
| Liens Instagram / TikTok / WhatsApp | `SITE.socials` |
| Prix des prestations (facultatif) | `price` de chaque prestation (`treatments`) |
