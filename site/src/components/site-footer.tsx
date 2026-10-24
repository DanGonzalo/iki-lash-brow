import { useEffect, useState } from 'react';
import Marquee from '@/components/ui/marquee';
import BrandLogo from '@/components/ui/brand-logo';
import { SITE } from '@/data/site';
import { useContent } from '@/lib/i18n';
import { openLegal } from '@/lib/events';
import { scrollToSection } from '@/lib/scroll';

function StudioClock({ locale }: { locale: string }) {
	const [now, setNow] = useState(() => new Date());
	useEffect(() => {
		const id = window.setInterval(() => setNow(new Date()), 1000);
		return () => window.clearInterval(id);
	}, []);
	return (
		<span className="tabular-nums">
			{new Intl.DateTimeFormat(locale, {
				timeZone: SITE.timeZone,
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
			}).format(now)}
		</span>
	);
}

export default function SiteFooter() {
	const { copy: COPY, nav: NAV, ui } = useContent();
	const t = ui.footer;
	return (
		<footer className="theme-dark relative z-10 border-t border-line bg-ink text-paper">
			<div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-10 px-5 py-16 text-[11px] uppercase tracking-[0.2em] md:grid-cols-4 md:px-10">
				<div className="col-span-2 md:col-span-1">
					<p className="flex flex-col items-start gap-2">
						<BrandLogo className="h-10" title={SITE.name} />
						<span className="pl-[0.35em] text-[9px] tracking-[0.42em] text-stone">{SITE.heroLines[1]}</span>
					</p>
					<p className="mt-4 max-w-[16rem] normal-case leading-relaxed tracking-normal text-paper/60">
						{COPY.footer.description}
					</p>
				</div>
				<nav aria-label={t.label}>
					<p className="text-stone">{t.nav}</p>
					<ul className="mt-4 space-y-2">
						{NAV.map((item) => (
							<li key={item.id}>
								<button type="button" onClick={() => scrollToSection(item.id)} className="cursor-pointer uppercase hover:opacity-60">
									{item.label}
								</button>
							</li>
						))}
					</ul>
				</nav>
				<div>
					<p className="text-stone">{t.socials}</p>
					<ul className="mt-4 space-y-2">
						{SITE.socials.map((social) => (
							<li key={social.label}>
								<a href={social.href} className="hover:opacity-60">
									{social.label} ↗
								</a>
							</li>
						))}
					</ul>
				</div>
				<div>
					<p className="text-stone">{SITE.city || t.time}</p>
					<p className="mt-4">
						<StudioClock locale={ui.locale} />
					</p>
					<button
						type="button"
						onClick={() => scrollToSection('top')}
						className="mt-6 cursor-pointer uppercase hover:opacity-60"
					>
						{t.top}
					</button>
				</div>
			</div>

			<div aria-hidden="true" className="border-t border-line py-6">
				<Marquee speed={30} direction={-1}>
					<span className="flex items-center gap-10 pr-10 font-pixel font-light text-[clamp(4rem,12vw,10rem)] leading-none text-paper/10">
						{SITE.name}
						<span className="font-serif text-[0.5em]">粋</span>
					</span>
				</Marquee>
			</div>

			<div className="mx-auto flex max-w-[1400px] flex-col gap-2 border-t border-line px-5 py-6 text-[10px] uppercase tracking-[0.2em] text-stone sm:flex-row sm:justify-between md:px-10">
				<span>
					© {new Date().getFullYear()} {SITE.name} · <a href="#impressum" onClick={(e) => { e.preventDefault(); openLegal('imprint'); }} className="hover:text-paper">{t.legal}</a> ·{' '}
					<a href="#datenschutz" onClick={(e) => { e.preventDefault(); openLegal('privacy'); }} className="hover:text-paper">{t.privacy}</a>
				</span>
				<span className="flex items-center gap-3">
					<span aria-hidden="true" className="text-[13px] text-accent">粋</span>
					{t.motto}
				</span>
			</div>
		</footer>
	);
}
