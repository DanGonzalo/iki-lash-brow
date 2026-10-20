import type { Lang } from '@/data/site';
import { BASE } from '@/lib/base';
import { jsonLdText, pageMeta } from '@/seo/meta';

const set = (key: string, attr: 'content' | 'href', value: string) =>
	document.querySelectorAll(`[data-seo="${key}"]`).forEach((el) => el.setAttribute(attr, value));

/** Brings the language-dependent <head> tags (written at build time) in line with the language shown */
export function applyHead(lang: Lang) {
	const origin = window.location.origin + BASE.replace(/\/$/, '');
	const m = pageMeta(lang, origin);
	document.documentElement.lang = lang;
	document.title = m.title;
	set('description', 'content', m.description);
	set('canonical', 'href', m.url);
	set('og:title', 'content', m.title);
	set('og:description', 'content', m.description);
	set('og:url', 'content', m.url);
	set('og:image', 'content', m.image);
	set('og:image:alt', 'content', m.imageAlt);
	set('og:locale', 'content', lang === 'de' ? 'de_DE' : 'en_GB');
	set('og:locale:alternate', 'content', lang === 'de' ? 'en_GB' : 'de_DE');
	set('twitter:title', 'content', m.title);
	set('twitter:description', 'content', m.description);
	set('twitter:image', 'content', m.image);
	const ld = document.querySelector('script[data-seo="jsonld"]');
	if (ld) ld.textContent = jsonLdText(lang, origin);
}
