import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import DecodeText from '@/components/ui/decode-text';
import { media } from '@/data/media';
import { useInView } from '@/hooks/use-in-view';
import { useContent } from '@/lib/i18n';
import { cn } from '@/lib/utils';

const INTERVAL = 8000;
const SWAP_MS = 320;
const pad = (n: number) => String(n).padStart(2, '0');

// 0 = black, 1 = photo shows through, 2 = solid white "stray" pixel
type Cell = 0 | 1 | 2;

const seeded = (seed: number) => () => {
	seed = (seed * 16807) % 2147483647;
	return (seed - 1) / 2147483646;
};

// Wide-screen layout on a 32 × 18 grid of square cells (1-based grid lines).
// The arrows and caption sit exactly on the cells, so nothing overlaps them.
const GRID = { cols: 32, rows: 18 };
const ARROWS = { row: 15, prev: 2, next: 5 }; // each arrow is 2 × 2 cells
const CAPTION = { col: 23, row: 14, colSpan: 9, rowSpan: 4 };
// Hand-placed stray pixels around the arrows, like a broken checkerboard
const DECOR: [number, number][] = [
	[4, 14],
	[8, 13],
	[22, 12],
];

const inZone = (col: number, row: number, c0: number, c1: number, r0: number, r1: number) =>
	col >= c0 && col <= c1 && row >= r0 && row <= r1;

/**
 * Builds the irregular pixel window the photo is seen through: a jagged blob
 * on the right, isolated pixels around its edge, and clear black zones where
 * the quote, caption and arrows sit.
 */
function buildMask(cols: number, rows: number, seed: number, desktop: boolean): Cell[] {
	const random = seeded(seed * 7919 + 13);
	const cx = desktop ? 0.66 + (random() - 0.5) * 0.06 : 0.5;
	const cy = desktop ? 0.52 : 0.5;
	const rx = desktop ? 0.36 : 0.58;
	const ry = desktop ? 0.6 : 0.62;

	return Array.from({ length: cols * rows }, (_, i) => {
		const col = (i % cols) + 1;
		const row = Math.floor(i / cols) + 1;
		const u = (col - 0.5) / cols;
		const v = (row - 0.5) / rows;

		if (desktop) {
			if (DECOR.some(([c, r]) => c === col && r === row)) return 2;
			if (u < 0.47 && v < 0.62) return 0; // quote
			// arrows, with a one-cell margin
			if (inZone(col, row, 1, ARROWS.next + 2, ARROWS.row - 1, rows)) return 0;
			// caption, with a one-cell margin
			if (inZone(col, row, CAPTION.col - 1, cols, CAPTION.row - 1, rows)) return 0;
		}

		const d = ((u - cx) / rx) ** 2 + ((v - cy) / ry) ** 2;
		const edge = 1 + (random() - 0.5) * 0.55;
		if (d < edge) return 1;
		if (d < 1.9) {
			const r = random();
			if (r < 0.14) return 1;
			if (r < 0.19 && !desktop) return 2;
		}
		return 0;
	});
}

function useIsDesktop() {
	const [desktop, setDesktop] = useState(
		() => typeof window !== 'undefined' && window.matchMedia('(min-width: 1280px)').matches
	);
	useEffect(() => {
		const query = window.matchMedia('(min-width: 1280px)');
		const onChange = () => setDesktop(query.matches);
		query.addEventListener('change', onChange);
		return () => query.removeEventListener('change', onChange);
	}, []);
	return desktop;
}

/** A pixel-shaped arrow button. */
function PixelArrow({
	direction,
	onClick,
	className,
	style,
}: {
	direction: 'prev' | 'next';
	onClick: () => void;
	className?: string;
	style?: CSSProperties;
}) {
	const { ui } = useContent();
	return (
		<button
			type="button"
			onClick={onClick}
			aria-label={direction === 'prev' ? ui.testimonials.prev : ui.testimonials.next}
			data-cursor={direction === 'prev' ? ui.cursor.prev : ui.cursor.next}
			style={style}
			className={cn(
				'group pointer-events-auto relative grid cursor-pointer place-items-center bg-paper text-ink transition-colors duration-150 [transition-timing-function:steps(2)] hover:bg-ink hover:text-paper hover:outline hover:outline-1 hover:-outline-offset-1 hover:outline-paper',
				className
			)}
		>
			<span className="font-pixel font-light text-2xl leading-none transition-transform duration-150 group-hover:scale-110 md:text-3xl xl:text-4xl">
				{direction === 'prev' ? '←' : '→'}
			</span>
		</button>
	);
}

export default function TestimonialsSection() {
	const { copy: COPY, testimonials: TESTIMONIALS, ui } = useContent();
	const desktop = useIsDesktop();
	const cols = desktop ? GRID.cols : 24;
	const rows = desktop ? GRID.rows : 14;
	const total = TESTIMONIALS.length;

	const [ref, inView] = useInView<HTMLDivElement>(0.3);
	const [target, setTarget] = useState(0);
	const [shown, setShown] = useState(0);
	const [covered, setCovered] = useState(true);
	const [paused, setPaused] = useState(false);
	const shownRef = useRef(0);

	const mask = useMemo(() => buildMask(cols, rows, shown + 1, desktop), [cols, rows, shown, desktop]);
	// Random flip order, renewed for every testimonial
	const delays = useMemo(
		() => Array.from({ length: cols * rows }, () => Math.random()),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[cols, rows, shown]
	);

	// First reveal when the panel scrolls into view; preload the other photos
	useEffect(() => {
		if (!inView) return;
		setCovered(false);
		media.testimonials.forEach((photo) => {
			new Image().src = photo.src;
		});
	}, [inView]);

	// Switching: close the pixels, swap the photo, open them again
	useEffect(() => {
		if (target === shownRef.current) return;
		setCovered(true);
		const id = window.setTimeout(() => {
			shownRef.current = target;
			setShown(target);
			requestAnimationFrame(() => setCovered(false));
		}, SWAP_MS);
		return () => window.clearTimeout(id);
	}, [target]);

	// Autoplay
	useEffect(() => {
		if (paused || !inView) return;
		const id = window.setTimeout(() => setTarget((t) => (t + 1) % total), INTERVAL);
		return () => window.clearTimeout(id);
	}, [target, paused, inView, total]);

	const go = (step: number) => setTarget((t) => (t + step + total) % total);
	const item = TESTIMONIALS[shown];
	const visible = inView && !covered;

	return (
		<section
			aria-roledescription={ui.testimonials.carousel}
			aria-label={ui.testimonials.section}
			className="relative z-10 border-t border-line bg-ink"
		>
			<div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
				<div className="mb-8 flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-stone">
					<DecodeText as="p" text={COPY.testimonials.label} className="text-label" />
					<p><span className="text-accent">★★★★★</span> {COPY.testimonials.rating}</p>
				</div>

				<div
					ref={ref}
					onMouseEnter={() => setPaused(true)}
					onMouseLeave={() => setPaused(false)}
					onFocus={() => setPaused(true)}
					onBlur={() => setPaused(false)}
					className="relative flex flex-col border border-line xl:block xl:aspect-[16/9]"
				>
					{/* Quote */}
					<div className="relative z-10 p-6 xl:absolute xl:left-0 xl:top-0 xl:max-w-[46%] xl:p-10 2xl:p-12">
						<span aria-hidden="true" className="font-pixel font-light text-5xl leading-none xl:text-7xl">
							“
						</span>
						<blockquote className="mt-3 font-serif text-[1.7rem] leading-[1.15] md:text-[2.1rem] xl:text-[2.3rem] 2xl:text-[2.6rem]" aria-live="polite">
							<DecodeText key={shown} text={item.quote} play={visible} duration={1600} />
						</blockquote>
						<p className="mt-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em]">
							<span aria-hidden="true">↑</span>
							<DecodeText key={`a-${shown}`} text={item.author} play={visible} delay={500} duration={700} />
						</p>
					</div>

					{/* Photo seen through the pixel mask */}
					<div className="relative aspect-[4/3] overflow-hidden md:aspect-[16/9] xl:absolute xl:inset-0 xl:aspect-auto">
						<img
							key={shown}
							src={media.testimonials[shown]?.src ?? media.testimonials[0]?.src}
							alt={`${ui.testimonials.photo} ${item.author}`}
							className="absolute inset-0 h-full w-full object-cover grayscale sepia-30 contrast-110"
						/>
						<div
							aria-hidden="true"
							className="absolute inset-0 grid"
							style={{
								gridTemplateColumns: `repeat(${cols}, 1fr)`,
								gridTemplateRows: `repeat(${rows}, 1fr)`,
							}}
						>
							{mask.map((cell, i) => {
								const state: Cell = covered ? 0 : cell;
								return (
									<span
										key={i}
										style={{
											margin: '-0.5px',
											backgroundColor:
												state === 1 ? 'transparent' : state === 2 ? 'var(--color-accent)' : 'var(--color-ink)',
											transition: 'background-color 0ms linear',
											transitionDelay: `${delays[i] * (covered ? SWAP_MS - 60 : 420)}ms`,
										}}
									/>
								);
							})}
						</div>
					</div>

					{/* Small screens: arrows + caption below the photo */}
					<div className="flex items-end justify-between gap-6 p-6 xl:hidden">
						<div className="flex gap-2">
							<PixelArrow direction="prev" onClick={() => go(-1)} className="h-14 w-14 md:h-16 md:w-16" />
							<PixelArrow direction="next" onClick={() => go(1)} className="h-14 w-14 md:h-16 md:w-16" />
						</div>
						<p className="text-right text-[11px] uppercase leading-relaxed tracking-[0.15em]">
							<span className="text-stone">{item.role}</span>
							<br />
							<span className="tabular-nums">
								{pad(shown + 1)} / {pad(total)}
							</span>
						</p>
					</div>

					{/* Wide screens: arrows and caption placed on the same grid as the pixels */}
					<div
						className="pointer-events-none absolute inset-0 z-10 hidden xl:grid"
						style={{
							gridTemplateColumns: `repeat(${GRID.cols}, 1fr)`,
							gridTemplateRows: `repeat(${GRID.rows}, 1fr)`,
						}}
					>
						<PixelArrow
							direction="prev"
							onClick={() => go(-1)}
							style={{ gridColumn: `${ARROWS.prev} / span 2`, gridRow: `${ARROWS.row} / span 2` }}
						/>
						<PixelArrow
							direction="next"
							onClick={() => go(1)}
							style={{ gridColumn: `${ARROWS.next} / span 2`, gridRow: `${ARROWS.row} / span 2` }}
						/>
						<div
							className="pointer-events-auto flex flex-col justify-between text-[11px] leading-relaxed"
							style={{
								gridColumn: `${CAPTION.col} / span ${CAPTION.colSpan}`,
								gridRow: `${CAPTION.row} / span ${CAPTION.rowSpan}`,
							}}
						>
							<p className="flex justify-between uppercase tracking-[0.2em] text-stone">
								<span>{ui.testimonials.caption}</span>
								<span className="tabular-nums">
									{pad(shown + 1)} / {pad(total)}
								</span>
							</p>
							<p>
								<span className="font-medium">{item.author}</span> — {item.role}
							</p>
							<div className="flex gap-1" aria-hidden="true">
								{TESTIMONIALS.map((_, i) => (
									<span key={i} className={cn('h-2 w-2', i === shown ? 'bg-paper' : 'border border-paper/50')} />
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
