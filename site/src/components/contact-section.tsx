import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import DecodeText from '@/components/ui/decode-text';
import PixelButton from '@/components/ui/pixel-button';
import Reveal from '@/components/ui/reveal';
import { SITE } from '@/data/site';
import { useContent } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/**
 * Optional form backend (Formspree, Basin, your own API…). While it is empty,
 * submitting opens the visitor's mail app with the request pre-filled.
 */
const FORM_ENDPOINT = '';

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error';

function Field({ label, htmlFor, children, error }: { label: string; htmlFor: string; children: ReactNode; error?: string }) {
	return (
		<div>
			<label htmlFor={htmlFor} className="text-[10px] uppercase tracking-[0.25em] text-stone">
				{label}
			</label>
			{children}
			{error && (
				<p className="mt-2 text-[11px] uppercase tracking-[0.15em] text-paper" role="alert">
					■ {error}
				</p>
			)}
		</div>
	);
}

const inputClass =
	'mt-2 w-full border-b border-line bg-transparent py-3 text-sm text-paper outline-none transition-colors placeholder:text-stone/60 focus:border-accent';

export default function ContactSection() {
	const { copy: COPY, ui } = useContent();
	const t = ui.contact;
	const SESSION_TYPES = COPY.contact.sessionTypes;
	const EXTRA = COPY.contact.extraField;
	const [status, setStatus] = useState<Status>('idle');
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [copied, setCopied] = useState(false);
	const typeRef = useRef<HTMLSelectElement>(null);

	// "Ask about this treatment" in the treatments section pre-selects it here
	useEffect(() => {
		const onTreatment = (e: Event) => {
			const type = SESSION_TYPES[(e as CustomEvent<number>).detail];
			setStatus('idle');
			requestAnimationFrame(() => {
				if (typeRef.current && type) typeRef.current.value = type;
			});
		};
		window.addEventListener('contact:treatment', onTreatment);
		return () => window.removeEventListener('contact:treatment', onTreatment);
	}, [SESSION_TYPES]);

	const copyEmail = async () => {
		try {
			await navigator.clipboard.writeText(SITE.email);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 2000);
		} catch {
			window.location.href = `mailto:${SITE.email}`;
		}
	};

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = new FormData(event.currentTarget);
		const name = String(form.get('name') || '').trim();
		const email = String(form.get('email') || '').trim();
		const message = String(form.get('message') || '').trim();
		const type = String(form.get('type') || '');
		const extra = String(form.get('extra') || '').trim();

		const nextErrors: Record<string, string> = {};
		if (!name) nextErrors.name = t.errName;
		if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = t.errEmail;
		if (message.length < 10) nextErrors.message = t.errMessage;
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length) return;

		if (FORM_ENDPOINT) {
			setStatus('sending');
			try {
				const res = await fetch(FORM_ENDPOINT, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
					body: JSON.stringify({ name, email, type, [EXTRA.label]: extra, message }),
				});
				setStatus(res.ok ? 'sent' : 'error');
			} catch {
				setStatus('error');
			}
			return;
		}

		const details = [type && `${COPY.contact.typeLabel}: ${type}`, extra && `${EXTRA.label}: ${extra}`].filter(Boolean).join('\n');
		const body = `${details ? `${details}\n\n` : ''}${message}\n\n${name} — ${email}`;
		window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
			`${COPY.contact.mailSubject}${type ? ` · ${type}` : ''} — ${name}`
		)}&body=${encodeURIComponent(body)}`;
		setStatus('mailto');
	};

	return (
		<section id="contact" className="relative z-10 scroll-mt-20 border-t border-line bg-ink">
			<div className="mx-auto grid max-w-[1400px] gap-16 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12 lg:gap-10">
				{/* Pitch + direct contact */}
				<div className="lg:col-span-5">
					<DecodeText as="p" text={COPY.contact.label} className="text-[11px] uppercase tracking-[0.25em] text-label" />
					<h2 className="mt-8 font-pixel text-[clamp(3rem,8vw,7.5rem)] uppercase leading-[0.86] tracking-tight">
						<DecodeText text={COPY.contact.title[0]} className="block" duration={1100} />
						<span className="flex items-center">
							<DecodeText text={COPY.contact.title[1] ?? ''} delay={180} duration={1200} />
							<span aria-hidden="true" className="ml-[0.06em] inline-block h-[0.7em] w-[0.4em] animate-blink bg-accent" />
						</span>
					</h2>
					<p className="mt-8 max-w-sm text-[13px] leading-relaxed text-paper/70">
						{COPY.contact.text}
					</p>

					<dl className="mt-12 border-t border-line text-[11px] uppercase tracking-[0.2em]">
						<div className="flex items-center justify-between gap-4 border-b border-line py-4">
							<dt className="text-stone">{t.email}</dt>
							<dd className="min-w-0">
								<button
									type="button"
									onClick={copyEmail}
									data-cursor={copied ? ui.cursor.copied : ui.cursor.copy}
									className="cursor-pointer break-all text-right normal-case tracking-[0.05em] hover:opacity-70"
								>
									{SITE.email} <span className="text-stone">{copied ? t.copied : t.copy}</span>
								</button>
							</dd>
						</div>
						{SITE.phone && (
							<div className="flex items-center justify-between gap-4 border-b border-line py-4">
								<dt className="text-stone">{t.phone}</dt>
								<dd>
									<a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="hover:opacity-70">
										{SITE.phone}
									</a>
								</dd>
							</div>
						)}
						{SITE.city && (
							<div className="flex items-center justify-between gap-4 border-b border-line py-4">
								<dt className="text-stone">{t.studio}</dt>
								<dd>{SITE.city}</dd>
							</div>
						)}
					</dl>
				</div>

				{/* Form */}
				<Reveal className="lg:col-span-6 lg:col-start-7">
					<div className="border border-line">
						{status === 'sent' || status === 'mailto' ? (
							<div className="flex min-h-[22rem] flex-col items-start justify-center gap-6 p-6 md:p-10" role="status">
								<p className="font-pixel text-4xl uppercase leading-none md:text-5xl">
									<DecodeText text={status === 'sent' ? t.sentTitle : t.mailtoTitle} play />
								</p>
								<p className="max-w-sm text-[13px] leading-relaxed text-paper/70">
									{status === 'sent' ? t.sentText : t.mailtoText}
								</p>
								<button
									type="button"
									onClick={() => setStatus('idle')}
									className="cursor-pointer text-[11px] uppercase tracking-[0.2em] underline underline-offset-4"
								>
									{t.newRequest}
								</button>
							</div>
						) : (
							<form noValidate onSubmit={onSubmit} className="grid gap-8 p-6 md:p-10">
								<div className="grid gap-8 md:grid-cols-2">
									<Field label={t.name} htmlFor="name" error={errors.name}>
										<input id="name" name="name" autoComplete="name" placeholder={t.namePlaceholder} className={inputClass} />
									</Field>
									<Field label={t.email} htmlFor="email" error={errors.email}>
										<input
											id="email"
											name="email"
											type="email"
											autoComplete="email"
											placeholder={t.emailPlaceholder}
											className={inputClass}
										/>
									</Field>
								</div>

								<div className="grid gap-8 md:grid-cols-2">
									<Field label={COPY.contact.typeLabel} htmlFor="type">
										<div className="relative">
											<select ref={typeRef} id="type" name="type" defaultValue="" className={cn(inputClass, 'cursor-pointer appearance-none bg-ink pr-6')}>
												<option value="">{t.choose}</option>
												{SESSION_TYPES.map((type) => (
													<option key={type}>{type}</option>
												))}
											</select>
											<span aria-hidden="true" className="pointer-events-none absolute bottom-3 right-0 text-sm text-stone">
												↓
											</span>
										</div>
									</Field>
									<Field label={EXTRA.label} htmlFor="extra">
										{EXTRA.kind === 'select' ? (
											<div className="relative">
												<select id="extra" name="extra" defaultValue="" className={cn(inputClass, 'cursor-pointer appearance-none bg-ink pr-6')}>
													<option value="">{t.choose}</option>
													{EXTRA.options.map((option) => (
														<option key={option}>{option}</option>
													))}
												</select>
												<span aria-hidden="true" className="pointer-events-none absolute bottom-3 right-0 text-sm text-stone">
													↓
												</span>
											</div>
										) : (
											<input
												id="extra"
												name="extra"
												lang={ui.locale}
												type={EXTRA.kind}
												placeholder={EXTRA.kind === 'text' ? EXTRA.placeholder : undefined}
												className={cn(inputClass, '[color-scheme:dark]')}
											/>
										)}
									</Field>
								</div>

								<Field label={COPY.contact.messageLabel} htmlFor="message" error={errors.message}>
									<textarea
										id="message"
										name="message"
										rows={5}
										placeholder={COPY.contact.messagePlaceholder}
										className={cn(inputClass, 'resize-none')}
									/>
								</Field>

								<div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
									<p className="whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-stone">{COPY.contact.responseTime}</p>
									<PixelButton
										className="whitespace-nowrap bg-paper text-ink"
										cursor={ui.cursor.send}
										type="submit"
									>
										{status === 'sending' ? t.sending : t.send} <span aria-hidden="true">→</span>
									</PixelButton>
								</div>
								{status === 'error' && (
									<p role="alert" className="text-[11px] uppercase tracking-[0.15em]">
										■ {t.failed} {SITE.email}.
									</p>
								)}
							</form>
						)}
					</div>
				</Reveal>
			</div>
		</section>
	);
}
