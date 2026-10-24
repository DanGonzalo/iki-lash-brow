import { useCallback, useEffect, useRef, useState } from 'react';
import DecodeText from '@/components/ui/decode-text';
import { SITE } from '@/data/site';
import type { LegalPage } from '@/lib/events';
import { useContent } from '@/lib/i18n';

type Page = LegalPage;
const HASHES: Record<Page, string> = { imprint: '#impressum', privacy: '#datenschutz' };
// Lines that disappear when these optional details are empty
const OPTIONAL = new Set(['phone', 'vatId']);

const pageFromHash = (): Page | null =>
	window.location.hash === HASHES.imprint ? 'imprint' : window.location.hash === HASHES.privacy ? 'privacy' : null;

/** Impressum and Datenschutz, filled with the details of SITE.legal. Also opens from #impressum / #datenschutz. */
export default function LegalDialog() {
	const { legal } = useContent();
	const [page, setPage] = useState<Page | null>(null);
	const closeRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const fromHash = () => setPage(pageFromHash());
		const onOpen = (e: Event) => setPage((e as CustomEvent<Page>).detail);
		fromHash();
		window.addEventListener('hashchange', fromHash);
		window.addEventListener('legal:open', onOpen);
		return () => {
			window.removeEventListener('hashchange', fromHash);
			window.removeEventListener('legal:open', onOpen);
		};
	}, []);

	const close = useCallback(() => {
		setPage(null);
		if (pageFromHash()) window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search);
	}, []);

	useEffect(() => {
		if (!page) return;
		document.documentElement.classList.add('overflow-hidden');
		closeRef.current?.focus({ preventScroll: true });
		const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
		window.addEventListener('keydown', onKey);
		return () => {
			document.documentElement.classList.remove('overflow-hidden');
			window.removeEventListener('keydown', onKey);
		};
	}, [page, close]);

	if (!page) return null;

	const values: Record<string, string> = { ...SITE.legal, name: SITE.name, email: SITE.email, phone: SITE.phone };
	// Fill {placeholders}; required details still empty show as [ to complete ]
	const fill = (line: string): (string | { missing: string })[] | null => {
		const keys = [...line.matchAll(/\{(\w+)\}/g)].map((m) => m[1]);
		if (keys.some((k) => OPTIONAL.has(k) && !values[k])) return null;
		return line.split(/(\{\w+\})/).filter(Boolean).map((part) => {
			const key = part.match(/^\{(\w+)\}$/)?.[1];
			if (!key) return part;
			return values[key] || { missing: legal.missing };
		});
	};
	const sections = (page === 'imprint' ? legal.imprint : legal.privacy)
		.map((s) => ({ title: s.title, lines: s.text.map(fill).filter((l): l is NonNullable<typeof l> => l !== null) }))
		.filter((s) => s.lines.length);
	const title = page === 'imprint' ? legal.imprintTitle : legal.privacyTitle;

	return (
		<div className="fixed inset-0 z-[80] overflow-y-auto overscroll-contain bg-ink/95 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="legal-title">
			<div className="mx-auto max-w-3xl px-5 pb-24 pt-8 md:px-10 md:pt-12">
				<div className="flex items-start justify-between gap-6 border-b border-line pb-8">
					<h2 id="legal-title" className="font-pixel font-light text-[clamp(2.25rem,7vw,4.5rem)] leading-[0.95]">
						<DecodeText text={title} play duration={900} />
					</h2>
					<button
						ref={closeRef}
						type="button"
						onClick={close}
						className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center border border-paper text-lg transition-colors hover:bg-paper hover:text-ink"
						aria-label={legal.close}
					>
						×
					</button>
				</div>
				{sections.map((s) => (
					<section key={s.title} className="border-b border-line py-8">
						<h3 className="text-[11px] uppercase tracking-[0.25em] text-label">{s.title}</h3>
						<div className="mt-4 space-y-3 text-[14px] leading-relaxed text-paper/80">
							{s.lines.map((parts, i) => (
								<p key={i}>
									{parts.map((part, j) =>
										typeof part === 'string' ? part : <span key={j} className="text-accent">[ {part.missing} ]</span>
									)}
								</p>
							))}
						</div>
					</section>
				))}
			</div>
		</div>
	);
}
