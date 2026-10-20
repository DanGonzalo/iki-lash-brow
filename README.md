# Pigment by Mai — permanent makeup & makeup artist portfolio

**Live preview:** https://dangonzalo.github.io/pigment-by-mai/ · German version: https://dangonzalo.github.io/pigment-by-mai/de/

A bilingual (English / German) one-page portfolio for a permanent makeup artist and professional makeup artist: powder brows, lip blush, permanent eyeliner, lash line enhancement, bridal and event makeup.

The art direction plays on how permanent makeup is done — **pigment placed dot by dot**. Photos resolve from large pixels, every title "decodes" from pigment dots into text, and the palette is cocoa, ivory and powder pink.

## Features

- **3D intro**: eight photos fly towards the camera in a WebGL gallery, depixelating and turning from warm monochrome to full colour as they approach (custom GLSL shader).
- **Pixel motion design**: decoding headlines, pixel-dissolve transitions, pixel icons that assemble on scroll, a portrait that melts into the page.
- **Bilingual by design**: one address per language (`/` and `/de/`), browser-language detection, an EN / DE switch that re-decodes every text in place.
- **Treatments section** with duration and longevity; "ask about this treatment" pre-fills the contact form.
- **Work grid**: balanced masonry with category filters, list view with a cursor-following preview, and a project window with keyboard navigation.
- **Contact form** that opens the visitor's mail app with a pre-filled request (no server, no data stored).
- **Legal pages** for Germany (Impressum, privacy policy) in both languages.
- **No-code project admin**: projects (photos, videos, texts in both languages) are edited in a private web app; a scheduled job publishes them to the site.

## SEO and performance

- A build-time Vite plugin writes one HTML page per language with its own title, description, canonical and `hreflang` links, Open Graph / Twitter cards (one social image per language), and **schema.org structured data** (`BeautySalon`, `Service` offers, `Person`, `FAQPage`).
- The full content is also served as plain semantic HTML before the app starts; search engines get the text without waiting for animations.
- `sitemap.xml` with language alternates and `robots.txt`, generated once the production domain is known.
- Self-hosted fonts (no request to Google: faster and GDPR-friendly), no cookies, no trackers.
- Responsive images: 900 px thumbnails generated at publish time for the grid, lighter hero photos.

> This GitHub Pages copy is a **preview**: it is marked `noindex` so it does not compete with the future production domain.

## Tech stack

| Area | Tools |
|---|---|
| Front end | React 19, TypeScript, Vite 6 |
| Styling | Tailwind CSS 4, self-hosted Geist Mono, Geist Pixel and Instrument Serif |
| 3D / motion | Three.js, React Three Fiber, drei, custom GLSL shader, Canvas 2D, CSS steps() animations |
| i18n | Custom React context, path-based routing (`/`, `/de/`), no external library |
| SEO | Custom Vite plugin (per-language HTML, meta, hreflang, JSON-LD, sitemap), static HTML snapshot |
| Content admin | Claude artifact (claude.ai) with a document database and asset storage, bilingual interface |
| Publishing | Node.js script (project sync, thumbnails), scheduled Claude Code task, Hostinger-ready static build |
| Deployment | GitHub Actions → GitHub Pages |
| Tooling | ESLint, ImageMagick (social images), Claude Code |

## Project structure

```
images/          photos of the intro, the portrait and the reviews (source files)
site/            the website
  src/data/      all texts (site.ts, English and German), projects.json, media.json
  src/seo/       titles, structured data, sitemap, plain-HTML version
  src/components the sections of the page
  admin/         the project admin (published as a Claude artifact)
  scripts/       prepare-images.mjs, apply-projects.mjs (publishing)
```

## Run locally

```bash
cd site
npm install
npm run dev
```

Open http://localhost:5173 (English) or http://localhost:5173/de/ (German).

## Credits

Photos are placeholders from [Unsplash](https://unsplash.com) until the artist's own work replaces them. Fonts: Geist Mono, Geist Pixel (Vercel) and Instrument Serif, under the SIL Open Font License.
