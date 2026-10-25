import BrandBadge from '@/components/ui/brand-badge';
import DecodeText from '@/components/ui/decode-text';
import PixelButton from '@/components/ui/pixel-button';
import PixelEdgeImage from '@/components/ui/pixel-edge-image';
import Reveal from '@/components/ui/reveal';
import { media } from '@/data/media';
import { ABOUT_FACE } from '@/data/site';
import { useContent } from '@/lib/i18n';
import { scrollToSection } from '@/lib/scroll';

const pad = (n: number) => String(n).padStart(2, '0');

export default function AboutSection() {
	const { copy: COPY, ui } = useContent();
	return (
		<section id="apropos" className="relative z-10 scroll-mt-20 border-t border-line bg-ink">
			<div className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12 lg:gap-12">
				{/* Portrait melting into the page through black pixels */}
				<div className="relative lg:col-span-5">
					<PixelEdgeImage
						src={media.about.src}
						alt={media.about.alt || COPY.about.title.join(' ')}
						protect={ABOUT_FACE}
						className="aspect-[4/5] w-full"
					/>
					{/* The round studio sign, set like a stamp on the corner of the portrait */}
					<BrandBadge className="absolute -bottom-10 right-4 w-28 text-paper md:-bottom-12 md:right-6 md:w-36" />
				</div>

				<div className="lg:col-span-6 lg:col-start-7">
					<DecodeText as="p" text={COPY.about.label} className="text-[11px] uppercase tracking-[0.25em] text-label" />
					<h2 className="mt-5 font-pixel font-light text-[clamp(2.5rem,8vw,5rem)] leading-[0.95] lg:text-[clamp(2.5rem,4.8vw,5rem)]">
						{COPY.about.title.map((line, i) => (
							<DecodeText key={i} text={line} className="block" delay={i * 150} duration={1100} />
						))}
					</h2>

					<Reveal>
						<p className="mt-10 max-w-xl font-serif text-2xl leading-snug text-paper/85 md:text-[2rem] md:leading-[1.2]">
							{COPY.about.text}
						</p>
					</Reveal>

					{/* Her path: permanent makeup first, then lashes, then the whole face */}
					<Reveal delay={100} className="mt-12 max-w-xl">
						<p className="text-[11px] uppercase tracking-[0.25em] text-stone">{COPY.about.pathLabel}</p>
						<ol className="mt-4 border-t border-line">
							{COPY.about.path.map((step, i) => (
								<li key={i} className="grid grid-cols-[2.25rem_1fr] gap-x-4 gap-y-1 border-b border-line py-4">
									<span className="pt-1.5 text-[11px] tabular-nums tracking-[0.2em] text-stone">{pad(i + 1)}</span>
									<h3 className="font-pixel font-light text-2xl leading-tight">{step.title}</h3>
									<p className="col-start-2 text-[13px] leading-relaxed text-paper/70">{step.text}</p>
								</li>
							))}
						</ol>
					</Reveal>

					<Reveal delay={150} className="mt-10">
						<PixelButton onClick={() => scrollToSection('contact')} cursor={ui.cursor.write}>
							{COPY.about.cta} <span aria-hidden="true">↗</span>
						</PixelButton>
					</Reveal>
				</div>
			</div>
		</section>
	);
}
