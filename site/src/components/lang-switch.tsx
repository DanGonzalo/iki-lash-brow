import { LANGS } from '@/data/site';
import { useContent, useLang } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/** EN / DE switch: the texts decode into the other language without reloading. */
export default function LangSwitch({ className, tabIndex }: { className?: string; tabIndex?: number }) {
	const { lang, setLang } = useLang();
	const { ui } = useContent();
	return (
		<div role="group" aria-label={ui.languageLabel} className={cn('flex h-[38px] overflow-hidden rounded-full border border-line md:h-[42px]', className)}>
			{LANGS.map((option) => (
				<button
					key={option}
					type="button"
					lang={option}
					tabIndex={tabIndex}
					aria-pressed={lang === option}
					onClick={() => setLang(option)}
					className={cn(
						'grid min-w-[38px] cursor-pointer place-items-center px-2 text-[10px] uppercase tracking-[0.16em] transition-colors duration-150 [transition-timing-function:steps(2)] md:text-[11px]',
						lang === option ? 'bg-accent text-accent-ink' : 'text-stone hover:text-paper'
					)}
				>
					{option}
				</button>
			))}
		</div>
	);
}
