import { SITE } from '@/data/site';
import { useInView } from '@/hooks/use-in-view';
import { LOGO } from '@/lib/logo';
import { cn } from '@/lib/utils';

// The IKI letters span x 36 → 1490 and y -625 → 0 in font units
const SCALE = 0.066;
const LETTERS = `translate(${(100 - 763 * SCALE).toFixed(2)} 99) scale(${SCALE})`;

/**
 * The round studio sign of the brand board: a fine ring around IKI, the words
 * under it and a short rule. The ring is drawn once the badge scrolls into view.
 */
export default function BrandBadge({ className }: { className?: string }) {
	const [ref, inView] = useInView<SVGSVGElement>(0.4);
	return (
		<svg ref={ref} viewBox="0 0 200 200" aria-hidden="true" className={cn('block overflow-visible', className)}>
			<circle cx="100" cy="100" r="99" className="fill-ink" />
			<circle
				cx="100"
				cy="100"
				r="92"
				fill="none"
				stroke="currentColor"
				strokeWidth="0.8"
				pathLength={1}
				strokeDasharray={1}
				transform="rotate(-90 100 100)"
				className={inView ? 'animate-[draw_1.8s_cubic-bezier(.6,0,.2,1)_both]' : '[stroke-dashoffset:1]'}
			/>
			<g className={cn('transition-opacity duration-1000', inView ? 'opacity-100 delay-500' : 'opacity-0')}>
				<path d={LOGO.letters} transform={LETTERS} fill="currentColor" />
				<text
					x="100"
					y="124"
					textAnchor="middle"
					textLength="92"
					lengthAdjust="spacing"
					fill="currentColor"
					className="brand-line text-[10.5px]"
				>
					{SITE.heroLines[1]}
				</text>
				<path d="M90 138h20" stroke="currentColor" strokeWidth="0.7" />
			</g>
		</svg>
	);
}
