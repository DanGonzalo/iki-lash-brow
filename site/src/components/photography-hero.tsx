import { useCallback, useEffect, useRef, useState } from 'react';
import { useProgress } from '@react-three/drei';
import InfiniteGallery from '@/components/ui/3d-gallery-photography';
import BrandLogo from '@/components/ui/brand-logo';
import DecodeText from '@/components/ui/decode-text';
import { media } from '@/data/media';
import { IS_BOT } from '@/lib/bot';
import { useContent } from '@/lib/i18n';
import { animateScrollTo } from '@/lib/scroll';
import { cn } from '@/lib/utils';

type Phase = 'loading' | 'intro' | 'outro' | 'done';

interface PhotographyHeroProps {
	/** Name shown in the centre of the hero, one entry per line. */
	lines: string[];
	/** id of the section the hero hands over to once the intro is over. */
	nextSectionId: string;
}

const INTRO_LENGTH = 8;
const TRANSITION_DURATION = 1800;
const LOADING_TIMEOUT = 15000;

// Far away the images are big pixel blocks; they resolve step by step
const PIXEL_SETTINGS = {
	start: 0.06,
	end: 0.34,
	steps: [4, 8, 16, 32, 64, 128],
};

// Black & white in the distance, full colour just before passing the camera
const COLOR_REVEAL = { start: 0.3, end: 0.41 };

// Pixelation replaces the original blur-in; keep the blur as images pass by
const BLUR_SETTINGS = {
	blurIn: { start: 0, end: 0.0001 },
	blurOut: { start: 0.4, end: 0.43 },
	maxBlur: 8,
};

// Loading bar drawn with pigment dots
function dotBar(ratio: number, cells = 16) {
	const filled = Math.round(ratio * cells);
	return '●'.repeat(filled) + '·'.repeat(cells - filled);
}

export default function PhotographyHero({
	lines,
	nextSectionId,
}: PhotographyHeroProps) {
	const { copy, ui } = useContent();
	// Reduced motion and search engines: no intro, the page is shown right away
	const prefersReducedMotion = useRef(
		IS_BOT ||
			(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
	).current;

	const [phase, setPhase] = useState<Phase>(
		prefersReducedMotion ? 'done' : 'loading'
	);
	const [shown, setShown] = useState(0);
	const [covered, setCovered] = useState(false);
	// Scrolled past the middle of the hero: the title dissolves, and decodes
	// again when the visitor comes back up
	const [scrolledAway, setScrolledAway] = useState(false);
	const sectionRef = useRef<HTMLElement>(null);
	const { progress: loadProgress } = useProgress();

	const locked = phase === 'loading' || phase === 'intro';

	// Always start the intro from the top of the page
	useEffect(() => {
		if (prefersReducedMotion) return;
		history.scrollRestoration = 'manual';
		window.scrollTo(0, 0);
	}, [prefersReducedMotion]);

	// Lock page scroll while the 12 images play
	useEffect(() => {
		document.documentElement.classList.toggle('overflow-hidden', locked);
		document.body.classList.toggle('overflow-hidden', locked);
	}, [locked]);

	// Never trap the visitor if the images take forever to load
	useEffect(() => {
		if (phase !== 'loading') return;
		const timeout = window.setTimeout(() => setPhase('done'), LOADING_TIMEOUT);
		return () => window.clearTimeout(timeout);
	}, [phase]);

	// Scroll-linked exit: the hero recedes while the next section slides over it
	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;

		let frame = 0;
		const update = () => {
			frame = 0;
			const p = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
			section.style.setProperty('--exit', p.toFixed(4));
			setCovered(p >= 0.999);
			setScrolledAway(p > 0.45);
		};
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};

		update();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
			cancelAnimationFrame(frame);
		};
	}, []);

	const phaseRef = useRef(phase);
	phaseRef.current = phase;

	const goToNextSection = useCallback(() => {
		if (phaseRef.current === 'outro' || phaseRef.current === 'done') return;
		phaseRef.current = 'outro';
		setPhase('outro');

		const next = document.getElementById(nextSectionId);
		// Wait one frame so the scroll lock is released before animating
		requestAnimationFrame(() => {
			const top = next ? next.getBoundingClientRect().top + window.scrollY : 0;
			animateScrollTo(top, TRANSITION_DURATION, () => {
				setPhase('done');
				next?.focus({ preventScroll: true });
			});
		});
	}, [nextSectionId]);

	const handleReady = useCallback(() => {
		setPhase((current) => (current === 'loading' ? 'intro' : current));
	}, []);

	const started = phase !== 'loading';
	const leaving = scrolledAway;
	// lines[0] is the wordmark (drawn as the logo), the rest is spelled out under it
	const [brand, ...rest] = lines;

	return (
		<section
			ref={sectionRef}
			aria-label={ui.hero.section}
			className="theme-dark sticky top-0 h-svh w-full overflow-hidden bg-ink text-paper"
		>
			<div
				className="absolute inset-0 origin-center will-change-transform"
				style={{
					transform: 'scale(calc(1 - var(--exit, 0) * 0.08))',
					opacity: 'calc(1 - var(--exit, 0) * 0.75)',
				}}
			>
				<InfiniteGallery
					images={media.hero}
					speed={1.2}
					visibleCount={12}
					monochrome={COLOR_REVEAL}
					pixelSettings={PIXEL_SETTINGS}
					blurSettings={BLUR_SETTINGS}
					autoPlaySpeed={phase === 'intro' ? 4.6 : prefersReducedMotion ? 0.4 : 1}
					introLength={prefersReducedMotion ? 0 : INTRO_LENGTH}
					captureInput={phase === 'intro'}
					scrollLinked={phase === 'outro' || phase === 'done'}
					paused={covered}
					onReady={handleReady}
					onProgress={setShown}
					onComplete={goToNextSection}
					className="h-full w-full"
				/>
			</div>

			{/* Loader */}
			<div
				className={cn(
					'pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-ink transition-opacity duration-400',
					phase === 'loading' ? 'opacity-100' : 'opacity-0'
				)}
			>
				<p className="flex flex-col items-center gap-3 text-[11px] uppercase tracking-[0.3em]">
					<span className="text-stone">{ui.hero.loading}</span>
					<span className="tabular-nums">
						[{dotBar(loadProgress / 100)}]{' '}
						{String(Math.round(loadProgress)).padStart(3, '0')}%
					</span>
				</p>
			</div>

			{/* Title */}
			<div
				className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center mix-blend-difference"
				style={{ transform: 'translateY(calc(var(--exit, 0) * -12vh))' }}
			>
				{/* The h1 says what the studio does, then its name */}
				<h1 className="flex flex-col items-center">
					<DecodeText
						text={copy.hero.label}
						play={started}
						out={leaving}
						delay={300}
						className="mb-6 block text-[11px] uppercase tracking-[0.25em] md:mb-8"
					/>
					<span className="sr-only">{brand} </span>
					{/* The wordmark fades in, then its lash strokes are drawn */}
					<BrandLogo
						draw={started && !leaving}
						className={cn(
							'h-[clamp(5.5rem,17vw,13.5rem)] transition-opacity duration-700',
							started && !leaving ? 'opacity-100' : 'opacity-0'
						)}
					/>
					<DecodeText
						text={rest.join(' ')}
						play={started}
						out={leaving}
						delay={700}
						duration={1300}
						className="brand-line mt-5 block pl-[0.38em] text-[clamp(1rem,2.1vw,1.45rem)] md:mt-7"
					/>
					{/* The short rule under the name, as on the brand board */}
					<span
						aria-hidden="true"
						className={cn(
							'mt-4 block h-px w-12 bg-current transition-transform duration-1000 ease-[cubic-bezier(.6,0,.2,1)] md:mt-5 md:w-16',
							started && !leaving ? 'scale-x-100 delay-[1300ms]' : 'scale-x-0'
						)}
					/>
				</h1>
				<DecodeText
					as="p"
					text={copy.hero.tagline}
					play={started}
					out={leaving}
					delay={900}
					duration={1400}
					className="mt-8 block max-w-md text-[13px] leading-relaxed text-paper/70 md:mt-10"
				/>
			</div>

			{/* Frame corners */}
			<div aria-hidden="true" className="pointer-events-none absolute inset-x-4 bottom-4 top-20 z-10 md:inset-x-6 md:bottom-6 md:top-26">
				<span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-paper/50" />
				<span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-paper/50" />
				<span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-paper/50" />
				<span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-paper/50" />
			</div>

			{/* Intro progress */}
			<div
				className={cn(
					'absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-6 px-8 pb-9 text-[11px] uppercase tracking-[0.2em] transition-opacity duration-400 md:px-12 md:pb-10',
					phase === 'intro' ? 'opacity-100' : 'opacity-0'
				)}
			>
				<div className="flex flex-col gap-3">
					<span className="tabular-nums">
						{ui.hero.frame} {String(shown).padStart(2, '0')}
						<span className="text-stone">
							{' '}/ {String(INTRO_LENGTH).padStart(2, '0')}
						</span>
					</span>
					<div className="flex gap-1" aria-hidden="true">
						{Array.from({ length: INTRO_LENGTH }, (_, i) => (
							<span
								key={i}
								className={cn(
									'h-2 w-2 border border-paper/60 transition-colors duration-300',
									i < shown && 'border-accent bg-accent'
								)}
							/>
						))}
					</div>
					<span className="hidden text-stone md:inline">{ui.hero.scrollHint}</span>
				</div>

				<button
					type="button"
					onClick={goToNextSection}
					disabled={phase !== 'intro'}
					className="shrink-0 cursor-pointer uppercase transition-opacity hover:opacity-60"
				>
					{ui.hero.skip}
				</button>
			</div>
		</section>
	);
}
