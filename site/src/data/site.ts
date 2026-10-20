// All the site copy in one place, in English and German. Each language is a
// complete block (`en`, then `de`) with exactly the same structure.
// This file is also read at build time (SEO tags, structured data, sitemap):
// keep it free of imports from the components.

/** Languages of the site: English at /, German at /de/ */
export type Lang = 'en' | 'de';
export const LANGS: Lang[] = ['en', 'de'];
export const DEFAULT_LANG: Lang = 'en';

/**
 * Colour theme. `accent: null` = pure black & white. Otherwise the accent
 * colour only touches small details (cursors, squares, progress, active menu).
 * Here: powder pink on cocoa & ivory.
 */
export const THEME: { accent: string | null; accentInk: string } = {
	accent: '#D9A19A',
	accentInk: '#15100E',
};

export const ACCENT_PRESETS = {
	blue: { accent: '#2E68FF', accentInk: '#FFFFFF' },
	yellow: { accent: '#FFD60A', accentInk: '#0E0E0E' },
	none: { accent: null, accentInk: '#0E0E0E' },
} as const;

export const SITE = {
	name: 'Pigment by Mai',
	/** First name of the artist (about text, structured data) */
	artist: 'Mai',
	/** The big title of the intro, one entry per line */
	heroLines: ['Pigment', 'by Mai'],
	/**
	 * City of the studio. The most important detail for local search
	 * ("Permanent Make-up Hamburg"): once filled in, it is added to the page
	 * titles, the structured data and the contact section.
	 */
	city: '',
	/** Two-letter country code of the studio (structured data) */
	country: 'DE',
	/** Time zone of the footer clock */
	timeZone: 'Europe/Berlin',
	email: 'miatrantm@gmail.com',
	/** Optional — leave empty ('') to hide the phone everywhere */
	phone: '',
	/** Social profiles: replace '#' by the real links (they are also given to Google) */
	socials: [
		{ label: 'Instagram', href: '#' },
		{ label: 'TikTok', href: '#' },
		{ label: 'WhatsApp', href: '#' },
	],
	/**
	 * Legal notice (Impressum) — required in Germany before going online.
	 * Empty values show as [ … ] on the page until they are filled in.
	 */
	legal: {
		owner: '',
		street: '',
		postcode: '',
		city: '',
		country: 'Deutschland',
		/** Only if you have one */
		vatId: '',
		/** Hosting provider named in the privacy policy */
		host: 'Hostinger International Ltd., 61 Lordou Vironos Street, 6023 Larnaca, Zypern',
	},
};

export type ExtraField =
	| { label: string; kind: 'date' }
	| { label: string; kind: 'select'; options: string[] }
	| { label: string; kind: 'text'; placeholder: string };

/** A 9 × 9 pixel icon: a name from the icon library, or 9 strings of 9 characters ('#' = on) */
type Icon = string | readonly string[];
type ProcessStep = { title: string; text: string; duration: string; icon: Icon };
type Treatment = {
	name: string;
	text: string;
	/** Shown as small facts under the text; leave price empty ('') to hide it */
	duration: string;
	lasts: string;
	price: string;
	icon: Icon;
	/** Treatment pre-selected in the contact form: its position in contact.sessionTypes (0 = first) */
	form: number;
};
type LegalSection = { title: string; text: string[] };

// ---------- Pixel icons drawn for this trade ----------
const DROP = ['....#....', '...###...', '...#.#...', '..#...#..', '.#.....#.', '.#.....#.', '.#.....#.', '..#...#..', '...###...'];
const BROW = ['.........', '.........', '....####.', '..##....#', '.#..####.', '#.##.....', '.#.......', '.........', '.........'];
const LIPS = ['.........', '..##.##..', '.#..#..#.', '#.......#', '.#######.', '#.......#', '.#.....#.', '..#####..', '.........'];
const EYE = ['.........', '.......##', '..#####..', '.#.....#.', '#..###..#', '.#.###.#.', '..#####..', '.........', '.........'];
const LASHES = ['.........', '#.#.#.#.#', '.#######.', '#.......#', '#..###..#', '.#.....#.', '..#####..', '.........', '.........'];
const BRUSH = ['.......##', '......###', '.....###.', '....##...', '...#.....', '..#......', '.#.......', '#........', '.........'];

/**
 * Every visible sentence of the site, section by section. Titles are arrays:
 * one entry per line of the big pixel title (keep each line short).
 */
const en = {
	meta: {
		title: 'Permanent Makeup & Bridal Makeup Artist | Pigment by Mai',
		/** Used instead of `title` once SITE.city is filled in */
		titleCity: 'Permanent Makeup & Makeup Artist in {city} | Pigment by Mai',
		description:
			'Powder brows, lip blush, permanent eyeliner and lash line enhancement, plus bridal and event makeup. Natural results, placed dot by dot for your face.',
		jobTitle: 'Permanent makeup artist & makeup artist',
		image: '/og-image.jpg',
		imageAlt: 'Pigment by Mai — permanent makeup and makeup artist',
	},
	copy: {
		hero: {
			label: '[Permanent makeup · Makeup artist]',
			tagline: 'Brows, lips and eyes, perfected dot by dot. Eight images to step inside the studio.',
		},
		intro: {
			label: '[01] — Studio',
			title: ['Wake up', 'ready.'],
			text: 'Permanent makeup for brows, lips and eyes, and professional makeup for your wedding, events and shoots. Every shape is drawn for your face and every shade matched to your skin, so you look like you, only more awake.',
			primaryCta: 'Book a free consultation',
			secondaryCta: 'See the work',
		},
		services: { label: 'Services' },
		treatments: {
			label: '[02] — Treatments',
			title: ['Treatments', '& looks.'],
			text: 'Every permanent makeup treatment starts with a free consultation and includes a perfecting touch-up after six weeks.',
			duration: 'Session',
			lasts: 'Lasts',
			price: 'Price',
			cta: 'Ask about this treatment',
		},
		work: {
			label: '[03] — Work',
			title: ['Recent', 'work.'],
			text: 'Healed results and makeup looks, photographed in natural light. Open a project to see the full series.',
		},
		process: {
			label: '[04] — Process',
			title: ['From consult', 'to healed.'],
		},
		about: {
			label: '[05] — About',
			title: ['Dot by dot,', 'by hand.'],
			text: 'I’m Mai, the permanent makeup artist and makeup artist behind Pigment by Mai. I place every dot of pigment by hand to enhance your features, never to change them: people should notice that you look rested, not that you had something done.',
			cta: 'Book a free consultation',
		},
		testimonials: {
			label: '[06] — Reviews',
			rating: '4.9/5 · 80 reviews',
		},
		faq: {
			label: '[07] — FAQ',
			title: ['Good to', 'know.'],
			aside: 'Another question?',
			asideLink: 'Write to me',
			asideEnd: ', I reply within 24 h.',
		},
		contact: {
			label: '[08] — Contact',
			title: ['Book your', 'consultation.'],
			text: 'Tell me what you have in mind, ideally with a photo without makeup. I reply within 24 h with available dates and a personal quote.',
			typeLabel: 'Treatment',
			sessionTypes: ['Powder brows / microblading', 'Lip blush', 'Eyeliner & lash line', 'Bridal or event makeup', 'Other'],
			// 4th field of the form, next to the type: 'date', 'select' or 'text'
			extraField: { label: 'Preferred date', kind: 'date' } as ExtraField,
			messageLabel: 'Your request',
			messagePlaceholder: 'Which treatment, any previous permanent makeup, your questions… A few words are enough.',
			responseTime: 'Reply within 24 h',
			mailSubject: 'Appointment request',
		},
		footer: {
			description:
				'Permanent makeup studio for powder brows, lip blush, eyeliner and lash line, and makeup artist for weddings, events and shoots.',
		},
		header: { cta: 'Book a session', ctaShort: 'Book' },
	},

	nav: [
		{ label: 'Treatments', id: 'treatments' },
		{ label: 'Work', id: 'travaux' },
		{ label: 'Process', id: 'processus' },
		{ label: 'About', id: 'apropos' },
		{ label: 'Contact', id: 'contact' },
	],

	stats: [
		{ value: '500+', label: 'Treatments done' },
		{ value: '6', label: 'Years of experience' },
		{ value: '4.9/5', label: 'Client rating' },
		{ value: '€0', label: 'Consultation' },
	],

	/** Services scrolling in the band under the intro (short, one or two words each) */
	services: [
		'Powder brows',
		'Microblading',
		'Lip blush',
		'Permanent eyeliner',
		'Lash line',
		'Bridal makeup',
		'Event makeup',
		'Editorial',
	],

	treatments: [
		{
			name: 'Powder brows',
			text: 'A soft, powdery shading that fills sparse brows and looks like perfectly applied brow makeup. Ideal for oily skin and a polished, defined look.',
			duration: '2–2.5 h',
			lasts: '1–3 years',
			price: '',
			icon: BROW,
			form: 0,
		},
		{
			name: 'Microblading',
			text: 'Fine, hair-like strokes drawn between your own brow hairs for a natural, feathered result. Best for normal to dry skin.',
			duration: '2 h',
			lasts: '1–2 years',
			price: '',
			icon: 'pen',
			form: 0,
		},
		{
			name: 'Lip blush',
			text: 'A sheer wash of colour that evens out the lip line, adds definition and brings back a healthy tint. Soft enough to wear with or without lipstick.',
			duration: '2–2.5 h',
			lasts: '2–3 years',
			price: '',
			icon: LIPS,
			form: 1,
		},
		{
			name: 'Permanent eyeliner',
			text: 'From a barely-there line to a fine wing: eyeliner that survives swimming, sport and tears, without ever smudging.',
			duration: '1.5 h',
			lasts: '3–5 years',
			price: '',
			icon: EYE,
			form: 2,
		},
		{
			name: 'Lash line enhancement',
			text: 'Tiny dots of pigment between the lashes make them look fuller and the eyes more defined, even without mascara. My most discreet treatment.',
			duration: '1 h',
			lasts: '3–5 years',
			price: '',
			icon: LASHES,
			form: 2,
		},
		{
			name: 'Bridal & event makeup',
			text: 'A trial session, then a long-wear look on the day, at home or on location, for the bride and her guests. Also for shoots and events.',
			duration: '1–1.5 h',
			lasts: 'All day',
			price: '',
			icon: BRUSH,
			form: 3,
		},
	] as Treatment[],

	process: [
		{
			title: 'Consult',
			text: 'A free 15-minute chat, in the studio or by video. We talk about your wishes, your skin and whether permanent makeup is right for you.',
			duration: '15 min',
			icon: 'chat',
		},
		{
			title: 'Design',
			text: 'I draw the shape directly on your face and match the shade to your skin and hair. Nothing is pigmented until you love it.',
			duration: '45 min',
			icon: 'pen',
		},
		{
			title: 'Pigment',
			text: 'Gentle pigmentation, dot by dot, with a numbing cream. Most clients relax; some even fall asleep.',
			duration: '2 h',
			icon: DROP,
		},
		{
			title: 'Touch-up',
			text: 'After six weeks of healing, a perfecting session refines shape and colour. Always included in the price.',
			duration: '+6 weeks',
			icon: 'star',
		},
	] as ProcessStep[],

	testimonials: [
		{
			quote: 'I wake up with perfect brows every single day. They look so natural that nobody believes they’re tattooed.',
			author: 'Lena M.',
			role: 'Powder brows',
		},
		{
			quote: 'Mai did my bridal makeup and it lasted from the ceremony to the last dance, happy tears included.',
			author: 'Sophie K.',
			role: 'Bridal makeup',
		},
		{
			quote: 'Lip blush gave me back the colour I had lost over the years. Soft, even, exactly the shade we chose together.',
			author: 'Anna R.',
			role: 'Lip blush',
		},
	],

	faq: [
		{
			q: 'Does permanent makeup hurt?',
			a: 'Very little. A numbing cream is applied before and during the treatment, and most clients describe a light scratching feeling. Many relax completely.',
		},
		{
			q: 'How long does permanent makeup last?',
			a: 'One to three years for brows and lips, three to five years for eyeliner and lash line, depending on your skin, sun exposure and skincare. A colour refresh every 12 to 18 months keeps it crisp.',
		},
		{
			q: 'How do I prepare, and how do I care for it afterwards?',
			a: 'Avoid alcohol, caffeine and blood thinners for 24 hours before. Afterwards, keep the area clean and dry, apply the aftercare balm I give you, and skip sauna, swimming, sunbathing and makeup on the area for two weeks.',
		},
		{
			q: 'What does the healing look like?',
			a: 'The colour looks darker and sharper for the first days, then softens over four to six weeks as the skin heals. The perfecting touch-up after six weeks is included in the price.',
		},
		{
			q: 'Who should not get permanent makeup?',
			a: 'Permanent makeup is not done during pregnancy or breastfeeding, during chemotherapy, with active skin conditions in the area or with certain medications. We check everything together in the free consultation.',
		},
		{
			q: 'Do you travel for bridal makeup?',
			a: 'Yes. A trial session takes place a few weeks before the wedding, and on the day I come to you, for the bride and her guests. Travel costs are stated clearly in the quote.',
		},
		{
			q: 'How do I book an appointment?',
			a: 'Send a request through the form below, ideally with a photo without makeup. I reply within 24 hours with available dates; a small deposit then secures your appointment.',
		},
	],

	legal: {
		imprintTitle: 'Legal notice',
		privacyTitle: 'Privacy policy',
		close: 'Close',
		imprint: [
			{ title: 'Information according to § 5 DDG', text: ['{owner}', '{name}', '{street}', '{postcode} {city}', '{country}'] },
			{ title: 'Contact', text: ['E-mail: {email}', '{phone}'] },
			{ title: 'VAT ID', text: ['{vatId}'] },
			{
				title: 'Consumer dispute resolution',
				text: ['I am neither willing nor obliged to take part in dispute resolution proceedings before a consumer arbitration board.'],
			},
		] as LegalSection[],
		privacy: [
			{
				title: 'Who is responsible',
				text: ['{owner}, {street}, {postcode} {city}, {country} · {email}'],
			},
			{
				title: 'Hosting and server logs',
				text: [
					'This website is hosted by {host}. When you open it, the server automatically records technical data (IP address, date and time, page requested, browser) in log files. They are needed to deliver the site securely and are deleted after a short time. Legal basis: Art. 6 (1) (f) GDPR.',
				],
			},
			{
				title: 'Contact form and e-mail',
				text: [
					'The contact form does not send anything to a server: it opens your own e-mail program with a pre-filled message. When you write to me, I use your details (name, e-mail address, request) only to answer and to arrange your appointment. Legal basis: Art. 6 (1) (b) GDPR.',
					'If you choose to share health information (for example pregnancy, medication or skin conditions), I use it only to check whether a treatment is safe for you, based on your consent (Art. 9 (2) (a) GDPR).',
				],
			},
			{
				title: 'No cookies, no tracking',
				text: [
					'This website uses no cookies and no analytics or advertising tools. Your language choice is saved in your own browser (local storage) so the site stays in your language; it is never sent anywhere. Fonts are loaded from this website itself, not from Google.',
					'Links to social networks are plain links: data is only sent to these services once you click them.',
				],
			},
			{
				title: 'Your rights',
				text: [
					'You have the right to access, rectify and erase your data, to restrict or object to its processing, and to data portability (Art. 15–21 GDPR). You can also lodge a complaint with a data protection supervisory authority. Just write to me at {email}.',
				],
			},
		] as LegalSection[],
		missing: 'to complete',
	},

	/** Interface words (buttons, labels, messages) */
	ui: {
		locale: 'en-GB',
		languageLabel: 'Language',
		languageNames: { en: 'English', de: 'Deutsch' },
		skipToContent: 'Skip to content',
		hero: {
			section: 'Introduction',
			loading: 'Loading',
			frame: 'Look',
			scrollHint: 'Scroll ↓ to speed up',
			skip: '[ Skip ↓ ]',
		},
		header: {
			navMain: 'Main navigation',
			navMobile: 'Mobile navigation',
			openMenu: 'Open menu',
			closeMenu: 'Close menu',
		},
		cursor: {
			book: 'Book',
			view: 'View',
			write: 'Write',
			send: 'Send',
			open: 'Open',
			copy: 'Copy',
			copied: 'Copied',
			prev: 'Previous',
			next: 'Next',
			more: 'More',
		},
		work: {
			all: 'All',
			filters: 'Filter by category',
			display: 'Display',
			grid: 'Grid',
			list: 'List',
			projects: 'projects',
			more: 'See more projects',
			openProject: 'Open project',
			viewTag: '[ View ↗ ]',
			no: 'No.',
			project: 'Project',
			category: 'Category',
			year: 'Year',
		},
		modal: {
			file: 'LOOK',
			folder: '~/portfolio',
			files: 'files',
			close: 'Close project',
			minimize: 'Minimise',
			maximize: 'Maximise window',
			restore: 'Restore window',
			closeShort: 'Close',
			project: 'Project',
			prev: '← Prev.',
			next: 'Next →',
			upNext: 'Next:',
			media: 'media',
			keys: '[←] [→] browse · [Esc] close',
			video: 'Video',
		},
		process: { ready: 'Ready ✓', running: 'In progress' },
		testimonials: {
			section: 'Client reviews',
			carousel: 'carousel',
			prev: 'Previous review',
			next: 'Next review',
			caption: 'Client',
			photo: 'Result for',
		},
		contact: {
			email: 'E-mail',
			phone: 'Phone',
			studio: 'Studio',
			copy: '[copy]',
			copied: '[copied ✓]',
			name: 'Name',
			namePlaceholder: 'Emma Schneider',
			emailPlaceholder: 'emma@mail.com',
			choose: 'Choose…',
			send: 'Send',
			sending: 'Sending…',
			errName: 'Please enter your name',
			errEmail: 'Invalid e-mail address',
			errMessage: 'Describe your request in a few words',
			sentTitle: 'Message sent.',
			mailtoTitle: 'Almost done.',
			sentText: 'Thank you! Your request has arrived. I’ll reply within 24 h.',
			mailtoText: 'Your mail app opened with the request pre-filled: just hit send.',
			newRequest: 'New request',
			failed: 'Sending failed. Write to me directly at',
		},
		footer: {
			label: 'Footer',
			nav: 'Navigation',
			socials: 'Social',
			time: 'Studio time',
			top: 'Back to top ↑',
			legal: 'Legal notice',
			privacy: 'Privacy',
			motto: 'Dot by dot.',
		},
	},
};

export type Content = typeof en;

const de: Content = {
	meta: {
		title: 'Permanent Make-up & Braut-Make-up | Pigment by Mai',
		titleCity: 'Permanent Make-up & Visagistin in {city} | Pigment by Mai',
		description:
			'Powder Brows, Lip Blush, Permanent Eyeliner und Wimpernkranzverdichtung – dazu Braut- und Event-Make-up. Natürliche Ergebnisse, Punkt für Punkt gesetzt.',
		jobTitle: 'Permanent-Make-up-Artistin & Visagistin',
		image: '/og-image-de.jpg',
		imageAlt: 'Pigment by Mai — Permanent Make-up und Visagistin',
	},
	copy: {
		hero: {
			label: '[Permanent Make-up · Visagistin]',
			tagline: 'Brauen, Lippen und Augen, Punkt für Punkt perfektioniert. Acht Bilder, um ins Studio zu blicken.',
		},
		intro: {
			label: '[01] — Studio',
			title: ['Schön', 'beim Aufwachen.'],
			text: 'Permanent Make-up für Brauen, Lippen und Augen – und professionelles Make-up für deine Hochzeit, Events und Shootings. Jede Form wird für dein Gesicht gezeichnet, jeder Farbton auf deine Haut abgestimmt: Du siehst aus wie du, nur wacher.',
			primaryCta: 'Kostenlose Beratung buchen',
			secondaryCta: 'Arbeiten ansehen',
		},
		services: { label: 'Leistungen' },
		treatments: {
			label: '[02] — Behandlungen',
			title: ['Behandlungen', '& Looks.'],
			text: 'Jede Permanent-Make-up-Behandlung beginnt mit einer kostenlosen Beratung und beinhaltet eine Nachbehandlung nach sechs Wochen.',
			duration: 'Dauer',
			lasts: 'Hält',
			price: 'Preis',
			cta: 'Zu dieser Behandlung anfragen',
		},
		work: {
			label: '[03] — Arbeiten',
			title: ['Aktuelle', 'Arbeiten.'],
			text: 'Abgeheilte Ergebnisse und Make-up-Looks, bei Tageslicht fotografiert. Öffne ein Projekt, um die ganze Serie zu sehen.',
		},
		process: {
			label: '[04] — Ablauf',
			title: ['Von der Beratung', 'zum Ergebnis.'],
		},
		about: {
			label: '[05] — Über mich',
			title: ['Punkt für Punkt,', 'von Hand.'],
			text: 'Ich bin Mai, Permanent-Make-up-Artistin und Visagistin hinter Pigment by Mai. Ich setze jeden Pigmentpunkt von Hand, um deine Züge zu betonen, nie um sie zu verändern: Man soll sehen, dass du erholt aussiehst, nicht, dass du etwas hast machen lassen.',
			cta: 'Kostenlose Beratung buchen',
		},
		testimonials: {
			label: '[06] — Stimmen',
			rating: '4,9/5 · 80 Bewertungen',
		},
		faq: {
			label: '[07] — FAQ',
			title: ['Gut zu', 'wissen.'],
			aside: 'Noch eine Frage?',
			asideLink: 'Schreib mir',
			asideEnd: ', ich antworte innerhalb von 24 h.',
		},
		contact: {
			label: '[08] — Kontakt',
			title: ['Beratung', 'anfragen.'],
			text: 'Erzähl mir, was du dir wünschst, am besten mit einem Foto ohne Make-up. Ich antworte innerhalb von 24 h mit freien Terminen und einem persönlichen Angebot.',
			typeLabel: 'Behandlung',
			sessionTypes: ['Powder Brows / Microblading', 'Lip Blush', 'Lidstrich & Wimpernkranz', 'Braut- oder Event-Make-up', 'Sonstiges'],
			extraField: { label: 'Wunschtermin', kind: 'date' } as ExtraField,
			messageLabel: 'Deine Anfrage',
			messagePlaceholder: 'Welche Behandlung, frühere Pigmentierung, deine Fragen … Ein paar Worte genügen.',
			responseTime: 'Antwort innerhalb von 24 h',
			mailSubject: 'Terminanfrage',
		},
		footer: {
			description:
				'Permanent-Make-up-Studio für Powder Brows, Lip Blush, Lidstrich und Wimpernkranz – und Visagistin für Hochzeiten, Events und Shootings.',
		},
		header: { cta: 'Termin buchen', ctaShort: 'Termin' },
	},

	nav: [
		{ label: 'Behandlungen', id: 'treatments' },
		{ label: 'Arbeiten', id: 'travaux' },
		{ label: 'Ablauf', id: 'processus' },
		{ label: 'Über mich', id: 'apropos' },
		{ label: 'Kontakt', id: 'contact' },
	],

	stats: [
		{ value: '500+', label: 'Behandlungen' },
		{ value: '6', label: 'Jahre Erfahrung' },
		{ value: '4,9/5', label: 'Kundenbewertung' },
		{ value: '0 €', label: 'Beratung' },
	],

	services: [
		'Powder Brows',
		'Microblading',
		'Lip Blush',
		'Permanent Eyeliner',
		'Wimpernkranz',
		'Braut-Make-up',
		'Event-Make-up',
		'Editorial',
	],

	treatments: [
		{
			name: 'Powder Brows',
			text: 'Eine weiche, pudrige Schattierung, die lichte Brauen auffüllt und wie perfekt geschminkt wirkt. Ideal bei öliger Haut und für einen gepflegten, definierten Look.',
			duration: '2–2,5 Std.',
			lasts: '1–3 Jahre',
			price: '',
			icon: BROW,
			form: 0,
		},
		{
			name: 'Microblading',
			text: 'Feine, härchenartige Striche zwischen deinen eigenen Brauenhaaren für ein natürliches, gefiedertes Ergebnis. Am besten bei normaler bis trockener Haut.',
			duration: '2 Std.',
			lasts: '1–2 Jahre',
			price: '',
			icon: 'pen',
			form: 0,
		},
		{
			name: 'Lip Blush',
			text: 'Ein zarter Farbschleier, der die Lippenkontur ausgleicht, definiert und den Lippen eine gesunde Farbe zurückgibt. Mit oder ohne Lippenstift tragbar.',
			duration: '2–2,5 Std.',
			lasts: '2–3 Jahre',
			price: '',
			icon: LIPS,
			form: 1,
		},
		{
			name: 'Permanent Eyeliner',
			text: 'Vom kaum sichtbaren Strich bis zum feinen Wing: ein Lidstrich, der Schwimmen, Sport und Tränen übersteht, ohne je zu verschmieren.',
			duration: '1,5 Std.',
			lasts: '3–5 Jahre',
			price: '',
			icon: EYE,
			form: 2,
		},
		{
			name: 'Wimpernkranzverdichtung',
			text: 'Winzige Pigmentpunkte zwischen den Wimpern lassen sie dichter und die Augen ausdrucksstärker wirken, auch ohne Mascara. Meine dezenteste Behandlung.',
			duration: '1 Std.',
			lasts: '3–5 Jahre',
			price: '',
			icon: LASHES,
			form: 2,
		},
		{
			name: 'Braut- & Event-Make-up',
			text: 'Ein Probe-Make-up, dann ein langhaftender Look am großen Tag, zu Hause oder vor Ort, für die Braut und ihre Gäste. Auch für Shootings und Events.',
			duration: '1–1,5 Std.',
			lasts: 'Den ganzen Tag',
			price: '',
			icon: BRUSH,
			form: 3,
		},
	] as Treatment[],

	process: [
		{
			title: 'Beratung',
			text: 'Ein kostenloses 15-Minuten-Gespräch, im Studio oder per Video. Wir sprechen über deine Wünsche, deine Haut und ob Permanent Make-up zu dir passt.',
			duration: '15 Min.',
			icon: 'chat',
		},
		{
			title: 'Design',
			text: 'Ich zeichne die Form direkt auf dein Gesicht und stimme den Farbton auf Haut und Haare ab. Pigmentiert wird erst, wenn du sie liebst.',
			duration: '45 Min.',
			icon: 'pen',
		},
		{
			title: 'Pigment',
			text: 'Sanfte Pigmentierung, Punkt für Punkt, mit Betäubungscreme. Die meisten entspannen sich, manche schlafen sogar ein.',
			duration: '2 Std.',
			icon: DROP,
		},
		{
			title: 'Touch-up',
			text: 'Nach sechs Wochen Heilung verfeinert eine Nachbehandlung Form und Farbe. Immer im Preis inbegriffen.',
			duration: '+6 Wochen',
			icon: 'star',
		},
	] as ProcessStep[],

	testimonials: [
		{
			quote: 'Ich wache jeden Tag mit perfekten Brauen auf. Sie sehen so natürlich aus, dass mir niemand glaubt, dass sie pigmentiert sind.',
			author: 'Lena M.',
			role: 'Powder Brows',
		},
		{
			quote: 'Mai hat mein Braut-Make-up gemacht, und es hat von der Trauung bis zum letzten Tanz gehalten, Freudentränen inklusive.',
			author: 'Sophie K.',
			role: 'Braut-Make-up',
		},
		{
			quote: 'Lip Blush hat mir die Farbe zurückgegeben, die ich über die Jahre verloren hatte. Weich, gleichmäßig, genau der Ton, den wir zusammen gewählt haben.',
			author: 'Anna R.',
			role: 'Lip Blush',
		},
	],

	faq: [
		{
			q: 'Tut Permanent Make-up weh?',
			a: 'Kaum. Vor und während der Behandlung wird eine Betäubungscreme aufgetragen; die meisten beschreiben ein leichtes Kratzen. Viele entspannen sich völlig.',
		},
		{
			q: 'Wie lange hält Permanent Make-up?',
			a: 'Ein bis drei Jahre bei Brauen und Lippen, drei bis fünf Jahre bei Lidstrich und Wimpernkranz, je nach Haut, Sonne und Pflege. Eine Auffrischung alle 12 bis 18 Monate hält das Ergebnis frisch.',
		},
		{
			q: 'Wie bereite ich mich vor und wie pflege ich es danach?',
			a: 'Verzichte 24 Stunden vorher auf Alkohol, Koffein und blutverdünnende Mittel. Danach: den Bereich sauber und trocken halten, die Pflegecreme auftragen, die du von mir bekommst, und zwei Wochen lang auf Sauna, Schwimmen, Sonnenbaden und Make-up an der Stelle verzichten.',
		},
		{
			q: 'Wie verläuft die Heilung?',
			a: 'In den ersten Tagen wirkt die Farbe dunkler und kräftiger, dann wird sie in vier bis sechs Wochen weicher, während die Haut heilt. Die Nachbehandlung nach sechs Wochen ist im Preis inbegriffen.',
		},
		{
			q: 'Für wen ist Permanent Make-up nicht geeignet?',
			a: 'Nicht während Schwangerschaft und Stillzeit, während einer Chemotherapie, bei akuten Hauterkrankungen im Bereich oder bei bestimmten Medikamenten. Das klären wir gemeinsam in der kostenlosen Beratung.',
		},
		{
			q: 'Kommst du für ein Braut-Make-up auch zu mir?',
			a: 'Ja. Einige Wochen vor der Hochzeit findet ein Probe-Make-up statt, und am großen Tag komme ich zu dir, für die Braut und ihre Gäste. Die Anfahrtskosten stehen klar im Angebot.',
		},
		{
			q: 'Wie buche ich einen Termin?',
			a: 'Schick mir eine Anfrage über das Formular unten, am besten mit einem Foto ohne Make-up. Ich antworte innerhalb von 24 Stunden mit freien Terminen; eine kleine Anzahlung sichert dann deinen Termin.',
		},
	],

	legal: {
		imprintTitle: 'Impressum',
		privacyTitle: 'Datenschutzerklärung',
		close: 'Schließen',
		imprint: [
			{ title: 'Angaben gemäß § 5 DDG', text: ['{owner}', '{name}', '{street}', '{postcode} {city}', '{country}'] },
			{ title: 'Kontakt', text: ['E-Mail: {email}', '{phone}'] },
			{ title: 'Umsatzsteuer-ID', text: ['{vatId}'] },
			{
				title: 'Verbraucherstreitbeilegung',
				text: ['Ich bin nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.'],
			},
		],
		privacy: [
			{
				title: 'Verantwortliche',
				text: ['{owner}, {street}, {postcode} {city}, {country} · {email}'],
			},
			{
				title: 'Hosting und Server-Logfiles',
				text: [
					'Diese Website wird gehostet bei {host}. Beim Aufruf erfasst der Server automatisch technische Daten (IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browser) in Logfiles. Sie sind für die sichere Bereitstellung nötig und werden nach kurzer Zeit gelöscht. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.',
				],
			},
			{
				title: 'Kontaktformular und E-Mail',
				text: [
					'Das Kontaktformular sendet nichts an einen Server: Es öffnet dein eigenes E-Mail-Programm mit einer vorausgefüllten Nachricht. Wenn du mir schreibst, nutze ich deine Angaben (Name, E-Mail-Adresse, Anfrage) nur, um zu antworten und deinen Termin zu vereinbaren. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.',
					'Wenn du freiwillig Gesundheitsangaben machst (z. B. Schwangerschaft, Medikamente oder Hauterkrankungen), nutze ich sie nur, um zu prüfen, ob eine Behandlung für dich sicher ist – auf Grundlage deiner Einwilligung (Art. 9 Abs. 2 lit. a DSGVO).',
				],
			},
			{
				title: 'Keine Cookies, kein Tracking',
				text: [
					'Diese Website setzt keine Cookies und verwendet keine Analyse- oder Werbe-Tools. Deine Sprachwahl wird nur in deinem eigenen Browser gespeichert (Local Storage), damit die Seite in deiner Sprache bleibt; sie wird nirgendwohin übertragen. Die Schriftarten werden von dieser Website selbst geladen, nicht von Google.',
					'Links zu sozialen Netzwerken sind einfache Links: Erst wenn du sie anklickst, werden Daten an diese Dienste übertragen.',
				],
			},
			{
				title: 'Deine Rechte',
				text: [
					'Du hast das Recht auf Auskunft, Berichtigung und Löschung deiner Daten, auf Einschränkung der Verarbeitung, auf Widerspruch und auf Datenübertragbarkeit (Art. 15–21 DSGVO). Außerdem kannst du dich bei einer Datenschutz-Aufsichtsbehörde beschweren. Schreib mir einfach an {email}.',
				],
			},
		],
		missing: 'zu ergänzen',
	},

	ui: {
		locale: 'de-DE',
		languageLabel: 'Sprache',
		languageNames: { en: 'English', de: 'Deutsch' },
		skipToContent: 'Zum Inhalt springen',
		hero: {
			section: 'Einführung',
			loading: 'Laden',
			frame: 'Look',
			scrollHint: 'Scrollen ↓ zum Beschleunigen',
			skip: '[ Überspringen ↓ ]',
		},
		header: {
			navMain: 'Hauptnavigation',
			navMobile: 'Mobile Navigation',
			openMenu: 'Menü öffnen',
			closeMenu: 'Menü schließen',
		},
		cursor: {
			book: 'Buchen',
			view: 'Ansehen',
			write: 'Schreiben',
			send: 'Senden',
			open: 'Öffnen',
			copy: 'Kopieren',
			copied: 'Kopiert',
			prev: 'Zurück',
			next: 'Weiter',
			more: 'Mehr',
		},
		work: {
			all: 'Alle',
			filters: 'Nach Kategorie filtern',
			display: 'Ansicht',
			grid: 'Raster',
			list: 'Liste',
			projects: 'Projekte',
			more: 'Mehr Projekte',
			openProject: 'Projekt öffnen',
			viewTag: '[ Ansehen ↗ ]',
			no: 'Nr.',
			project: 'Projekt',
			category: 'Kategorie',
			year: 'Jahr',
		},
		modal: {
			file: 'LOOK',
			folder: '~/portfolio',
			files: 'Dateien',
			close: 'Projekt schließen',
			minimize: 'Minimieren',
			maximize: 'Fenster maximieren',
			restore: 'Fenster wiederherstellen',
			closeShort: 'Schließen',
			project: 'Projekt',
			prev: '← Zurück',
			next: 'Weiter →',
			upNext: 'Als Nächstes:',
			media: 'Medien',
			keys: '[←] [→] blättern · [Esc] schließen',
			video: 'Video',
		},
		process: { ready: 'Bereit ✓', running: 'Läuft' },
		testimonials: {
			section: 'Kundenstimmen',
			carousel: 'Karussell',
			prev: 'Vorherige Bewertung',
			next: 'Nächste Bewertung',
			caption: 'Kundin',
			photo: 'Ergebnis von',
		},
		contact: {
			email: 'E-Mail',
			phone: 'Telefon',
			studio: 'Studio',
			copy: '[kopieren]',
			copied: '[kopiert ✓]',
			name: 'Name',
			namePlaceholder: 'Emma Schneider',
			emailPlaceholder: 'emma@mail.de',
			choose: 'Auswählen …',
			send: 'Senden',
			sending: 'Wird gesendet …',
			errName: 'Bitte gib deinen Namen ein',
			errEmail: 'Ungültige E-Mail-Adresse',
			errMessage: 'Beschreibe dein Anliegen in ein paar Worten',
			sentTitle: 'Gesendet.',
			mailtoTitle: 'Fast fertig.',
			sentText: 'Danke! Deine Anfrage ist angekommen. Ich antworte innerhalb von 24 h.',
			mailtoText: 'Dein E-Mail-Programm hat sich mit der vorausgefüllten Anfrage geöffnet: Du musst sie nur noch absenden.',
			newRequest: 'Neue Anfrage',
			failed: 'Senden fehlgeschlagen. Schreib mir direkt an',
		},
		footer: {
			label: 'Fußzeile',
			nav: 'Navigation',
			socials: 'Social Media',
			time: 'Ortszeit',
			top: 'Nach oben ↑',
			legal: 'Impressum',
			privacy: 'Datenschutz',
			motto: 'Punkt für Punkt.',
		},
	},
};

export const CONTENT: Record<Lang, Content> = { en, de };

/** Area of the "About" portrait kept free of pixels (the face), in 0–1 coordinates */
export const ABOUT_FACE = { x0: 0.34, y0: 0.1, x1: 0.76, y1: 0.6 };
