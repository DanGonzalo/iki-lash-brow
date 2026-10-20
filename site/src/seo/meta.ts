// Everything search engines and social networks read: page titles, meta
// tags, alternate languages, structured data (schema.org), the sitemap and a
// plain-HTML version of the page served before the app starts.
// Used at build time (vite.config.ts writes / and /de/) and in the browser
// (the head follows the language switch). No DOM, no imports from components.
import projectsData from '../data/projects.json';
import type { Project } from '../data/project-types';
import { CONTENT, LANGS, SITE, type Lang } from '../data/site';

const projects = projectsData as Project[];

/** One address per language */
export const PATHS: Record<Lang, string> = { en: '/', de: '/de/' };
const OG_LOCALE: Record<Lang, string> = { en: 'en_GB', de: 'de_DE' };

/** Language of an address; `base` is the folder the site is served from ('/' on its own domain) */
export const langFromPath = (pathname: string, base = '/'): Lang => {
	const rest = pathname.startsWith(base) ? `/${pathname.slice(base.length)}` : pathname;
	return /^\/de(\/|$)/.test(rest) ? 'de' : 'en';
};

const esc = (s: string) =>
	s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);

/** Social links that are real (not the '#' placeholders) */
const realSocials = () => SITE.socials.map((s) => s.href).filter((href) => /^https?:\/\//.test(href));

export interface PageMeta {
	lang: Lang;
	title: string;
	description: string;
	/** Absolute when the site address is known, otherwise relative */
	url: string;
	image: string;
	imageAlt: string;
	alternates: { hreflang: string; href: string }[];
}

/**
 * `origin` = where the site lives, without trailing slash: https://domain, https://user.github.io/folder,
 * or a relative folder ('' or '/folder') while the address is unknown
 */
export function pageMeta(lang: Lang, origin = ''): PageMeta {
	const meta = CONTENT[lang].meta;
	return {
		lang,
		title: SITE.city ? meta.titleCity.replace('{city}', SITE.city) : meta.title,
		description: meta.description,
		url: origin + PATHS[lang],
		image: origin + meta.image,
		imageAlt: meta.imageAlt,
		alternates: [
			...LANGS.map((l) => ({ hreflang: l, href: origin + PATHS[l] })),
			{ hreflang: 'x-default', href: origin + PATHS.en },
		],
	};
}

/** schema.org description of the business, the artist, the page and its FAQ */
export function structuredData(lang: Lang, origin = '') {
	const c = CONTENT[lang];
	const m = pageMeta(lang, origin);
	const id = (name: string) => `${origin}/#${name}`;
	const sameAs = realSocials();
	const offers = c.treatments.map((t) => ({
		'@type': 'Offer',
		itemOffered: { '@type': 'Service', name: t.name, description: t.text },
	}));

	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				'@id': id('website'),
				url: `${origin}/`,
				name: SITE.name,
				inLanguage: LANGS,
				publisher: { '@id': id('business') },
			},
			{
				'@type': 'WebPage',
				'@id': `${m.url}#webpage`,
				url: m.url,
				name: m.title,
				description: m.description,
				inLanguage: lang,
				isPartOf: { '@id': id('website') },
				about: { '@id': id('business') },
				primaryImageOfPage: m.image,
			},
			{
				'@type': 'BeautySalon',
				'@id': id('business'),
				name: SITE.name,
				url: `${origin}/`,
				description: m.description,
				image: m.image,
				logo: `${origin}/icon-512.png`,
				email: SITE.email,
				...(SITE.phone ? { telephone: SITE.phone } : {}),
				...(SITE.city
					? { address: { '@type': 'PostalAddress', addressLocality: SITE.city, addressCountry: SITE.country }, areaServed: SITE.city }
					: { address: { '@type': 'PostalAddress', addressCountry: SITE.country } }),
				knowsLanguage: LANGS,
				founder: { '@id': id('artist') },
				hasOfferCatalog: {
					'@type': 'OfferCatalog',
					name: c.copy.treatments.title.join(' '),
					itemListElement: offers,
				},
				...(sameAs.length ? { sameAs } : {}),
			},
			{
				'@type': 'Person',
				'@id': id('artist'),
				name: SITE.artist,
				jobTitle: c.meta.jobTitle,
				worksFor: { '@id': id('business') },
				knowsAbout: c.treatments.map((t) => t.name),
				...(sameAs.length ? { sameAs } : {}),
			},
			{
				'@type': 'FAQPage',
				'@id': `${m.url}#faq`,
				inLanguage: lang,
				mainEntity: c.faq.map((f) => ({
					'@type': 'Question',
					name: f.q,
					acceptedAnswer: { '@type': 'Answer', text: f.a },
				})),
			},
		],
	};
}

/** JSON for a <script type="application/ld+json">, safe inside HTML */
export const jsonLdText = (lang: Lang, origin = '') => JSON.stringify(structuredData(lang, origin)).replace(/</g, '\\u003c');

/** The <head> tags that depend on the language (marked data-seo so the app can update them) */
export function headTags(lang: Lang, origin = ''): string {
	const m = pageMeta(lang, origin);
	const other = LANGS.filter((l) => l !== lang);
	return [
		`<title>${esc(m.title)}</title>`,
		`<meta name="description" content="${esc(m.description)}" data-seo="description" />`,
		`<link rel="canonical" href="${esc(m.url)}" data-seo="canonical" />`,
		...m.alternates.map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${esc(a.href)}" />`),
		`<meta property="og:type" content="website" />`,
		`<meta property="og:site_name" content="${esc(SITE.name)}" />`,
		`<meta property="og:title" content="${esc(m.title)}" data-seo="og:title" />`,
		`<meta property="og:description" content="${esc(m.description)}" data-seo="og:description" />`,
		`<meta property="og:url" content="${esc(m.url)}" data-seo="og:url" />`,
		`<meta property="og:image" content="${esc(m.image)}" data-seo="og:image" />`,
		`<meta property="og:image:width" content="1200" />`,
		`<meta property="og:image:height" content="630" />`,
		`<meta property="og:image:alt" content="${esc(m.imageAlt)}" data-seo="og:image:alt" />`,
		`<meta property="og:locale" content="${OG_LOCALE[lang]}" data-seo="og:locale" />`,
		...other.map((l) => `<meta property="og:locale:alternate" content="${OG_LOCALE[l]}" data-seo="og:locale:alternate" />`),
		`<meta name="twitter:card" content="summary_large_image" />`,
		`<meta name="twitter:title" content="${esc(m.title)}" data-seo="twitter:title" />`,
		`<meta name="twitter:description" content="${esc(m.description)}" data-seo="twitter:description" />`,
		`<meta name="twitter:image" content="${esc(m.image)}" data-seo="twitter:image" />`,
		`<script type="application/ld+json" data-seo="jsonld">${jsonLdText(lang, origin)}</script>`,
	].join('\n    ');
}

/**
 * The page as plain, semantic HTML: what search engines and visitors see in
 * the very first milliseconds (and without JavaScript). The app replaces it
 * as soon as it starts; the text is the same.
 */
export function staticBody(lang: Lang, origin = ''): string {
	const c = CONTENT[lang];
	const other = LANGS.find((l) => l !== lang) as Lang;
	const p = (s: string) => `<p>${esc(s)}</p>`;
	const de = lang === 'de';
	const projectTitle = (pr: Project) => (de ? pr.de?.title : undefined) || pr.title;
	const projectSummary = (pr: Project) => (de ? pr.de?.summary : undefined) || pr.summary;
	const projectCategory = (pr: Project) => (de ? pr.de?.category : undefined) || pr.category;
	const altOf = (img: Project['cover']) => (de ? img.altDe : undefined) || img.alt;

	return `<div class="seo-static">
<header>
  <a href="${origin}${PATHS[lang]}" class="seo-brand">${esc(SITE.name)}</a>
  <nav aria-label="${esc(c.ui.header.navMain)}">${c.nav.map((n) => `<a href="#${n.id}">${esc(n.label)}</a>`).join(' ')}
    <a href="${origin}${PATHS[other]}" hreflang="${other}" lang="${other}">${esc(c.ui.languageNames[other])}</a></nav>
</header>
<main id="top">
  <section class="seo-hero">
    <h1><span>${esc(c.copy.hero.label.replace(/[[\]]/g, ''))}</span> ${esc(SITE.name)}</h1>
    ${p(c.copy.hero.tagline)}
  </section>
  <section id="suite">
    <h2>${esc(c.copy.intro.title.join(' '))}</h2>
    ${p(c.copy.intro.text)}
    <ul>${c.stats.map((s) => `<li>${esc(s.value)} · ${esc(s.label)}</li>`).join('')}</ul>
    <p><a href="#contact">${esc(c.copy.intro.primaryCta)}</a></p>
  </section>
  <section id="treatments">
    <h2>${esc(c.copy.treatments.title.join(' '))}</h2>
    ${p(c.copy.treatments.text)}
    ${c.treatments
			.map(
				(t) =>
					`<article><h3>${esc(t.name)}</h3>${p(t.text)}<p>${esc(c.copy.treatments.duration)}: ${esc(t.duration)} · ${esc(c.copy.treatments.lasts)}: ${esc(t.lasts)}${t.price ? ` · ${esc(c.copy.treatments.price)}: ${esc(t.price)}` : ''}</p></article>`
			)
			.join('\n    ')}
  </section>
  <section id="travaux">
    <h2>${esc(c.copy.work.title.join(' '))}</h2>
    ${p(c.copy.work.text)}
    ${projects
			.map(
				(pr) =>
					`<article><img src="${esc(origin + (pr.cover.thumb ?? pr.cover.src))}" alt="${esc(altOf(pr.cover))}" width="${pr.cover.width ?? ''}" height="${pr.cover.height ?? ''}" loading="lazy" /><h3>${esc(projectTitle(pr))}</h3><p>${esc(projectCategory(pr))}${pr.year ? ` · ${pr.year}` : ''}</p>${p(projectSummary(pr))}</article>`
			)
			.join('\n    ')}
  </section>
  <section id="processus">
    <h2>${esc(c.copy.process.title.join(' '))}</h2>
    <ol>${c.process.map((s) => `<li><h3>${esc(s.title)}</h3>${p(s.text)}</li>`).join('')}</ol>
  </section>
  <section id="apropos">
    <h2>${esc(c.copy.about.title.join(' '))}</h2>
    ${p(c.copy.about.text)}
  </section>
  <section>
    <h2>${esc(c.ui.testimonials.section)}</h2>
    ${c.testimonials.map((t) => `<blockquote><p>${esc(t.quote)}</p><footer>${esc(t.author)} · ${esc(t.role)}</footer></blockquote>`).join('\n    ')}
  </section>
  <section id="faq">
    <h2>${esc(c.copy.faq.title.join(' '))}</h2>
    ${c.faq.map((f) => `<h3>${esc(f.q)}</h3>${p(f.a)}`).join('\n    ')}
  </section>
  <section id="contact">
    <h2>${esc(c.copy.contact.title.join(' '))}</h2>
    ${p(c.copy.contact.text)}
    <p><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></p>
  </section>
</main>
<footer>${p(c.copy.footer.description)}<p>© ${esc(SITE.name)}</p></footer>
</div>`;
}

/** Sitemap with both languages linked to each other (only with a known address) */
export function sitemapXml(origin: string, lastmod: string): string {
	const links = LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${origin}${PATHS[l]}"/>`).join('\n');
	const urls = LANGS.map(
		(l) => `  <url>
    <loc>${origin}${PATHS[l]}</loc>
    <lastmod>${lastmod}</lastmod>
${links}
    <xhtml:link rel="alternate" hreflang="x-default" href="${origin}${PATHS.en}"/>
  </url>`
	).join('\n');
	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

/** `preview`: a test copy (e.g. GitHub Pages) that search engines must not index */
export function robotsTxt(origin: string, preview = false): string {
	if (preview) return 'User-agent: *\nDisallow: /\n';
	return `User-agent: *\nAllow: /\n${/^https?:/.test(origin) ? `\nSitemap: ${origin}/sitemap.xml\n` : ''}`;
}
