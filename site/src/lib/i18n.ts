import { createContext, useContext, useMemo } from 'react';
import { CONTENT, LANGS, type Content, type Lang } from '@/data/site';
import { projects, type Project } from '@/data/projects';
import { BASE } from '@/lib/base';
import { IS_BOT } from '@/lib/bot';
import { PATHS, langFromPath } from '@/seo/meta';

const STORAGE_KEY = 'lang';

const isLang = (value: unknown): value is Lang => LANGS.includes(value as Lang);

function savedLang(): Lang | null {
	try {
		const saved = window.localStorage.getItem(STORAGE_KEY);
		return isLang(saved) ? saved : null;
	} catch {
		return null;
	}
}

/**
 * The address decides: / is English, /de/ is German. On the English address,
 * a visitor who chose German before (or whose browser is in German) is moved
 * to /de/; search engines always get the page of the address they asked for.
 */
export function detectLang(): Lang {
	if (typeof window === 'undefined') return 'en';
	const fromPath = langFromPath(window.location.pathname, BASE);
	if (fromPath === 'de' || IS_BOT) return fromPath;
	const fromQuery = new URLSearchParams(window.location.search).get('lang');
	if (isLang(fromQuery)) return fromQuery;
	const saved = savedLang();
	if (saved) return saved;
	const browser = (navigator.languages ?? [navigator.language]).map((l) => l.slice(0, 2).toLowerCase());
	return browser.find(isLang) ?? 'en';
}

/** Keeps the address in line with the language (/ or /de/), without reloading */
export function syncAddress(lang: Lang) {
	const url = new URL(window.location.href);
	url.searchParams.delete('lang');
	url.pathname = BASE + PATHS[lang].slice(1);
	if (url.href !== window.location.href) window.history.replaceState(window.history.state, '', url);
}

export function rememberLang(lang: Lang) {
	try {
		window.localStorage.setItem(STORAGE_KEY, lang);
	} catch {
		/* storage blocked */
	}
	syncAddress(lang);
}

export const LangContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void }>({
	lang: 'en',
	setLang: () => {},
});

export const useLang = () => useContext(LangContext);

/** All the copy of the site in the current language. */
export function useContent(): Content {
	return CONTENT[useLang().lang];
}

/** A project with its German texts swapped in when the site is in German. */
function localize(project: Project, lang: Lang): Project {
	if (lang === 'en') return { ...project, categoryLabel: project.category };
	const de = project.de ?? {};
	const alt = <T extends { alt: string; altDe?: string }>(image: T) => ({ ...image, alt: image.altDe || image.alt });
	return {
		...project,
		title: de.title || project.title,
		categoryLabel: de.category || project.category,
		summary: de.summary || project.summary,
		description: de.description?.length ? de.description : project.description,
		details: project.details.map((d) => ({ ...d, label: d.labelDe || d.label, value: d.valueDe || d.value })),
		cover: alt(project.cover),
		gallery: project.gallery.map(alt),
	};
}

/** The projects in the current language (same order and indexes as `projects`). */
export function useProjects(): Project[] {
	const { lang } = useLang();
	return useMemo(() => projects.map((p) => localize(p, lang)), [lang]);
}
