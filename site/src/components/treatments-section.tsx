import { useState } from 'react';
import DecodeText from '@/components/ui/decode-text';
import PixelIcon, { type PixelBitmap, type PixelIconName } from '@/components/ui/pixel-icon';
import Reveal from '@/components/ui/reveal';
import type { Content } from '@/data/site';
import { useInView } from '@/hooks/use-in-view';
import { useContent } from '@/lib/i18n';
import { requestTreatment } from '@/lib/events';

const pad = (n: number) => String(n).padStart(2, '0');

function Treatment({ item, index }: { item: Content['treatments'][number]; index: number }) {
	const { copy, ui } = useContent();
	const labels = copy.treatments;
	const [ref, inView] = useInView<HTMLLIElement>(0.35);
	const [hover, setHover] = useState(0);

	return (
		<li
			ref={ref}
			onMouseEnter={() => setHover((h) => h + 1)}
			className="group relative border-b border-r border-line transition-colors duration-300 hover:bg-paper/[0.03]"
		>
			<Reveal delay={(index % 3) * 90} className="flex h-full flex-col gap-6 p-6 md:p-8">
				<div className="flex items-start justify-between">
					<PixelIcon name={item.icon as PixelIconName | PixelBitmap} on={inView} replay={hover} className="w-11 text-accent md:w-12" />
					<span className="text-[10px] tabular-nums tracking-[0.25em] text-stone">{pad(index + 1)}</span>
				</div>
				<h3 className="font-pixel font-light text-3xl leading-[0.95] hyphens-auto [overflow-wrap:anywhere] md:text-[2.4rem]">
					<DecodeText text={item.name} replay={hover} duration={900} />
				</h3>
				<p className="text-[13px] leading-relaxed text-paper/75">{item.text}</p>
				<dl className="mt-auto flex flex-wrap gap-x-8 gap-y-3 border-t border-dashed border-line pt-4 text-[10px] uppercase tracking-[0.2em]">
					<div>
						<dt className="text-stone">{labels.duration}</dt>
						<dd className="mt-1">{item.duration}</dd>
					</div>
					<div>
						<dt className="text-stone">{labels.lasts}</dt>
						<dd className="mt-1">{item.lasts}</dd>
					</div>
					{item.price && (
						<div>
							<dt className="text-stone">{labels.price}</dt>
							<dd className="mt-1 text-accent">{item.price}</dd>
						</div>
					)}
				</dl>
				<button
					type="button"
					onClick={() => requestTreatment(item.form)}
					data-cursor={ui.cursor.book}
					className="flex cursor-pointer items-center gap-3 self-start text-[11px] uppercase tracking-[0.2em] text-stone transition-colors hover:text-paper group-hover:text-paper"
				>
					<span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
					{labels.cta}
					<span aria-hidden="true">↗</span>
				</button>
			</Reveal>
		</li>
	);
}

/** The treatments, each with what it is, how long it takes and how long it lasts. */
export default function TreatmentsSection() {
	const { copy, treatments } = useContent();
	const c = copy.treatments;

	return (
		<section id="treatments" className="relative z-10 scroll-mt-20 bg-ink">
			<div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
				<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<div>
						<DecodeText as="p" text={c.label} className="text-[11px] uppercase tracking-[0.25em] text-label" />
						<h2 className="mt-5 font-pixel font-light text-[clamp(2.75rem,8vw,7rem)] leading-[0.95]">
							{c.title.map((line, i) => (
								<DecodeText key={i} text={line} className="block" delay={i * 150} duration={1100 + i * 100} />
							))}
						</h2>
					</div>
					<DecodeText as="p" text={c.text} delay={300} className="block max-w-xs text-[13px] leading-relaxed text-paper/70" />
				</div>

				<ul className="mt-14 grid border-l border-t border-line md:mt-20 md:grid-cols-2 lg:grid-cols-3">
					{treatments.map((item, i) => (
						<Treatment key={i} item={item} index={i} />
					))}
				</ul>
			</div>
		</section>
	);
}
