import { useId } from 'react';
import { LOGO } from '@/lib/logo';
import { cn } from '@/lib/utils';

/**
 * The IKI wordmark in the current text colour. With `draw`, the hairline and
 * the lash tail are drawn from left to right (used in the intro).
 */
export default function BrandLogo({ className, draw, title }: { className?: string; draw?: boolean; title?: string }) {
	const id = useId().replace(/:/g, '');
	const [x, y, w, h] = LOGO.viewBox.split(' ').map(Number);
	return (
		<svg
			viewBox={LOGO.viewBox}
			role={title ? 'img' : undefined}
			aria-label={title}
			aria-hidden={title ? undefined : true}
			className={cn('block h-6 w-auto shrink-0 overflow-visible', className)}
		>
			{draw !== undefined && (
				<defs>
					<mask id={`wipe-${id}`}>
						<rect
							x={x}
							y={y}
							width={w}
							height={h}
							fill="white"
							className={cn('origin-left [transform-box:fill-box]', draw ? 'animate-[wipe_1.6s_cubic-bezier(.6,0,.2,1)_.5s_both]' : 'scale-x-0')}
						/>
					</mask>
				</defs>
			)}
			<path d={LOGO.letters} fill="currentColor" />
			<path d={LOGO.tail} fill="currentColor" mask={draw !== undefined ? `url(#wipe-${id})` : undefined} />
			<path
				d={LOGO.hair}
				fill="none"
				stroke="currentColor"
				strokeWidth={LOGO.hairWidth}
				strokeLinecap="round"
				pathLength={1}
				strokeDasharray={draw !== undefined ? 1 : undefined}
				className={cn(draw === undefined ? '' : draw ? 'animate-[draw_1.4s_cubic-bezier(.6,0,.2,1)_.2s_both]' : '[stroke-dashoffset:1]')}
			/>
		</svg>
	);
}
