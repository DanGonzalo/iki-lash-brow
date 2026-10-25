// All the site copy in one place, in English and German. Each language is a
// complete block (`en`, then `de`) with exactly the same structure.
// This file is also read at build time (SEO tags, structured data, sitemap):
// keep it free of imports from the components.

/** Languages of the site: English at /, German at /de/ */
export type Lang = 'en' | 'de';
export const LANGS: Lang[] = ['en', 'de'];
export const DEFAULT_LANG: Lang = 'en';

/**
 * Colour theme (IKI palette). The accent only touches small details (cursor,
 * squares, progress, active filter); `label` colours the small section labels.
 */
export const THEME: { accent: string | null; accentInk: string; label?: string } = {
	accent: '#C9B79A',
	accentInk: '#1E1D1B',
	label: '#7F6A4F',
};

export const ACCENT_PRESETS = {
	blue: { accent: '#2E68FF', accentInk: '#FFFFFF' },
	yellow: { accent: '#FFD60A', accentInk: '#0E0E0E' },
	none: { accent: null, accentInk: '#0E0E0E' },
} as const;

export const SITE = {
	name: 'IKI Lash & Brow',
	/** First name of the artist (about text, structured data) */
	artist: 'Mai',
	/** The wordmark (drawn as the logo), then the words spelled out under it */
	heroLines: ['IKI', 'Lash & Brow'],
	/**
	 * City of the studio. The most important detail for local search
	 * ("Wimpernverlängerung Hamburg"): once filled in, it is added to the page
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
const BROW_LIFT = ['.........', '..#..#..#', '..#..#..#', '.#..#..#.', '.........', '...#####.', '.##.....#', '#........', '.........'];
const BRUSH = ['.......##', '......###', '.....###.', '....##...', '...#.....', '..#......', '.#.......', '#........', '.........'];

/**
 * Every visible sentence of the site, section by section. Titles are arrays:
 * one entry per line of the big pixel title (keep each line short).
 */
const en = {
	meta: {
		title: 'Permanent Makeup & Lash Extensions | IKI Lash & Brow',
		/** Used instead of `title` once SITE.city is filled in */
		titleCity: 'Permanent Makeup & Lash Extensions in {city} | IKI Lash & Brow',
		description:
			'Powder brows, lip blush, permanent eyeliner, brow lifting, lash extensions and bridal makeup by Mai, makeup artist. Naturally beautiful, individually designed.',
		jobTitle: 'Permanent makeup artist, lash artist & makeup artist',
		image: '/og-image.jpg',
		imageAlt: 'IKI Lash & Brow — lash extensions, brows and permanent makeup',
	},
	copy: {
		hero: {
			label: '[Permanent makeup · Lashes · Makeup artist]',
			tagline: 'Naturally beautiful, individually designed. Eight images to step inside the studio.',
		},
		intro: {
			label: '[01] — Studio',
			title: ['Naturally', 'beautiful.'],
			text: 'Permanent makeup for brows, lips and eyes, brow lifting, lash extensions, and makeup for your wedding or shoot: one artist for your whole look. Every detail is designed for your face with precision and restraint, to enhance your natural features, never to cover them.',
			primaryCta: 'Book an appointment',
			secondaryCta: 'See the work',
		},
		services: { label: 'Services' },
		treatments: {
			label: '[02] — Treatments',
			title: ['Treatments with', 'a light touch.'],
			text: 'Every treatment starts with a free consultation. Permanent makeup includes a perfecting touch-up after six weeks.',
			duration: 'Session',
			lasts: 'Lasts',
			price: 'Price',
			cta: 'Ask about this treatment',
			/** Last card of the grid, for visitors who don't know what to choose */
			consultTitle: 'Not sure yet?',
			consultText: 'Tell me what you would like to change. In a free 15-minute consultation, we find the treatment that suits your face, your skin and your everyday life.',
			consultCta: 'Book a free consultation',
		},
		work: {
			label: '[03] — Work',
			title: ['Recent', 'work.'],
			text: 'Lash sets, healed permanent makeup and makeup looks, photographed in natural light. Open a project to see the full series.',
		},
		process: {
			label: '[04] — Process',
			title: ['From consult', 'to result.'],
		},
		about: {
			label: '[05] — About',
			title: ['Artistry', '& restraint.'],
			text: 'I’m Mai, a Vietnamese makeup artist with a deep passion for makeup and for the details that bring a face to life. At IKI, named after the Japanese ideal of understated elegance, I design brows, lips, lashes and complete looks with restraint: to enhance your natural features, never to hide them.',
			/** Her training, in the order she followed it (listed under the text) */
			pathLabel: 'My path',
			path: [
				{ title: 'Permanent makeup', text: 'Where it all began: brows, lips and eyeliner, placed dot by dot.' },
				{ title: 'Lashes & brows', text: 'Then lash extensions and brow lifting: natural sets and brushed-up brows, designed for each face.' },
				{ title: 'Makeup artistry', text: 'And the whole face: bridal, event and shoot makeup that lasts all day.' },
			],
			cta: 'Book an appointment',
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
			title: ['Book your', 'appointment.'],
			text: 'Tell me what you have in mind, ideally with a photo of your eyes or brows without makeup. I reply within 24 h with available dates and a personal quote.',
			typeLabel: 'Treatment',
			sessionTypes: ['Lash extensions', 'Lash infill', 'Permanent makeup (brows, lips, eyes)', 'Bridal or event makeup', 'Brow lifting', 'Other'],
			// 4th field of the form, next to the type: 'date', 'select' or 'text'
			extraField: { label: 'Preferred date', kind: 'date' } as ExtraField,
			messageLabel: 'Your request',
			messagePlaceholder: 'Which treatment, your current lashes or brows, your questions… A few words are enough.',
			responseTime: 'Reply within 24 h',
			mailSubject: 'Appointment request',
		},
		footer: {
			description:
				'Lash & brow studio by Mai: permanent makeup, natural lash extensions and makeup for weddings, events and shoots.',
		},
		header: { cta: 'Book now', ctaShort: 'Book' },
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
		'Lip blush',
		'Permanent eyeliner',
		'Brow lifting',
		'Lash extensions',
		'Signature lashes',
		'Infill',
		'Bridal makeup',
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
			form: 2,
		},
		{
			name: 'Lip blush',
			text: 'A sheer wash of colour that evens out the lip line, adds definition and brings back a healthy tint. Soft enough to wear with or without lipstick.',
			duration: '2–2.5 h',
			lasts: '2–3 years',
			price: '',
			icon: LIPS,
			form: 2,
		},
		{
			name: 'Eyeliner & lash line',
			text: 'From a barely-there lash line enhancement to a fine wing: definition that survives swimming, sport and tears, without ever smudging.',
			duration: '1–1.5 h',
			lasts: '3–5 years',
			price: '',
			icon: DROP,
			form: 2,
		},
		{
			name: 'Brow lifting',
			text: 'Your own brows, lifted and set in place for a fuller, brushed-up look that stays groomed for weeks. Nothing is pigmented: the gentle way to try a new shape.',
			duration: '45–60 min',
			lasts: '6–8 weeks',
			price: '',
			icon: BROW_LIFT,
			form: 4,
		},
		{
			name: 'Natural lash extensions',
			text: 'Fine, light lashes applied one by one and matched to your eye shape, for a fresh, natural look that needs no mascara.',
			duration: '2 h',
			lasts: '3–4 weeks',
			price: '',
			icon: LASHES,
			form: 0,
		},
		{
			name: 'Signature lash design',
			text: 'An individual lash map for more definition: length, curl and density chosen to open your eyes without ever looking heavy.',
			duration: '2.5 h',
			lasts: '3–4 weeks',
			price: '',
			icon: EYE,
			form: 0,
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
			text: 'A free 15-minute chat, in the studio or by video. We talk about your wishes, your eye and face shape, and the treatment that suits you.',
			duration: '15 min',
			icon: 'chat',
		},
		{
			title: 'Design',
			text: 'I map your lashes or draw the shape directly on your face, then choose length, curl or shade with you. Nothing is applied until you love it.',
			duration: '20 min',
			icon: 'pen',
		},
		{
			title: 'Session',
			text: 'A calm session in the studio: lashes applied one by one, pigment placed dot by dot. Most clients relax; many fall asleep.',
			duration: '1–2.5 h',
			icon: LASHES,
		},
		{
			title: 'Aftercare',
			text: 'Care advice to take home, an infill every three to four weeks for lashes, and a perfecting touch-up after six weeks for permanent makeup.',
			duration: '+3–6 weeks',
			icon: 'star',
		},
	] as ProcessStep[],

	testimonials: [
		{
			quote: 'My lashes look like mine, only better. I haven’t touched a mascara since my first appointment.',
			author: 'Lena M.',
			role: 'Natural lash extensions',
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
			q: 'Do lash extensions damage my natural lashes?',
			a: 'Not when they are applied correctly. Each extension is matched to the strength of your own lash and bonded to it individually, so your natural lashes keep growing and shedding as usual.',
		},
		{
			q: 'How long do lash extensions last, and when do I need an infill?',
			a: 'They follow your natural lash cycle: an infill every three to four weeks keeps the set full. After five weeks or more, a new set is usually the better choice.',
		},
		{
			q: 'Does permanent makeup hurt?',
			a: 'Very little. A numbing cream is applied before and during the treatment, and most clients describe a light scratching feeling. Many relax completely.',
		},
		{
			q: 'How long does permanent makeup last?',
			a: 'One to three years for brows and lips, three to five years for eyeliner and lash line, depending on your skin, sun exposure and skincare. A colour refresh every 12 to 18 months keeps it crisp.',
		},
		{
			q: 'Brow lifting or powder brows: which one is right for me?',
			a: 'Brow lifting works with your own hairs: they are lifted and set in place for six to eight weeks, and nothing is pigmented. Powder brows add soft shading to the skin and last one to three years. Many clients start with a brow lift to try a shape, then decide.',
		},
		{
			q: 'How do I prepare, and how do I care for it afterwards?',
			a: 'For lashes, come without mascara and keep them dry for 24 hours afterwards. For permanent makeup, avoid alcohol, caffeine and blood thinners for 24 hours before, then keep the area clean and dry and skip sauna, swimming and sunbathing for two weeks.',
		},
		{
			q: 'Who should not get permanent makeup?',
			a: 'Permanent makeup is not done during pregnancy or breastfeeding, during chemotherapy, with active skin conditions in the area or with certain medications. We check everything together in the free consultation.',
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
			motto: 'Artistry · Restraint · Individuality',
		},
	},
};

export type Content = typeof en;

const de: Content = {
	meta: {
		title: 'Permanent Make-up & Wimpernverlängerung | IKI Lash & Brow',
		titleCity: 'Permanent Make-up & Wimpernverlängerung in {city} | IKI Lash & Brow',
		description:
			'Powder Brows, Lip Blush, Permanent Eyeliner, Brow Lifting, Wimpernverlängerung und Braut-Make-up von Mai, Visagistin. Natürlich schön. Individuell gestaltet.',
		jobTitle: 'Permanent-Make-up-Artistin, Lash-Artistin & Visagistin',
		image: '/og-image-de.jpg',
		imageAlt: 'IKI Lash & Brow — Wimpernverlängerung, Augenbrauen und Permanent Make-up',
	},
	copy: {
		hero: {
			label: '[Permanent Make-up · Wimpern · Visagistin]',
			tagline: 'Natürlich schön. Individuell gestaltet. Acht Bilder, um ins Studio zu blicken.',
		},
		intro: {
			label: '[01] — Studio',
			title: ['Natürlich', 'schön.'],
			text: 'Permanent Make-up für Brauen, Lippen und Augen, Brow Lifting, Wimpernverlängerung und Make-up für deine Hochzeit oder dein Shooting – eine Artistin für deinen ganzen Look. Jedes Detail wird mit Präzision und Zurückhaltung für dein Gesicht gestaltet – um deine natürlichen Züge zu betonen, nie um sie zu überdecken.',
			primaryCta: 'Termin buchen',
			secondaryCta: 'Arbeiten ansehen',
		},
		services: { label: 'Leistungen' },
		treatments: {
			label: '[02] — Behandlungen',
			title: ['Behandlungen', 'mit Feingefühl.'],
			text: 'Jede Behandlung beginnt mit einer kostenlosen Beratung. Beim Permanent Make-up ist eine Nachbehandlung nach sechs Wochen inklusive.',
			duration: 'Dauer',
			lasts: 'Hält',
			price: 'Preis',
			cta: 'Zu dieser Behandlung anfragen',
			consultTitle: 'Noch unsicher?',
			consultText: 'Erzähl mir, was du dir wünschst. In einer kostenlosen 15-Minuten-Beratung finden wir die Behandlung, die zu deinem Gesicht, deiner Haut und deinem Alltag passt.',
			consultCta: 'Kostenlose Beratung buchen',
		},
		work: {
			label: '[03] — Arbeiten',
			title: ['Aktuelle', 'Arbeiten.'],
			text: 'Wimpernlooks, abgeheiltes Permanent Make-up und Make-up, bei Tageslicht fotografiert. Öffne ein Projekt, um die ganze Serie zu sehen.',
		},
		process: {
			label: '[04] — Ablauf',
			title: ['Von der Beratung', 'zum Ergebnis.'],
		},
		about: {
			label: '[05] — Über mich',
			title: ['Feingefühl', '& Präzision.'],
			text: 'Ich bin Mai, Make-up-Artistin aus Vietnam, mit einer tiefen Leidenschaft für Make-up und für die Details, die ein Gesicht zum Strahlen bringen. Bei IKI – benannt nach dem japanischen Ideal zurückhaltender Eleganz – gestalte ich Brauen, Lippen, Wimpern und ganze Looks mit Feingefühl: um deine natürlichen Züge zu betonen, nie um sie zu verdecken.',
			pathLabel: 'Mein Weg',
			path: [
				{ title: 'Permanent Make-up', text: 'Hier hat alles begonnen: Brauen, Lippen und Lidstrich, Punkt für Punkt gesetzt.' },
				{ title: 'Wimpern & Brauen', text: 'Dann Wimpernverlängerung und Brow Lifting: natürliche Sets und aufgerichtete Brauen, für jedes Gesicht geplant.' },
				{ title: 'Make-up', text: 'Und das ganze Gesicht: Braut-, Event- und Shooting-Make-up, das den ganzen Tag hält.' },
			],
			cta: 'Termin buchen',
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
			title: ['Termin', 'buchen.'],
			text: 'Erzähl mir, was du dir wünschst, am besten mit einem Foto deiner Augen oder Brauen ohne Make-up. Ich antworte innerhalb von 24 h mit freien Terminen und einem persönlichen Angebot.',
			typeLabel: 'Behandlung',
			sessionTypes: ['Wimpernverlängerung', 'Auffüllen (Infill)', 'Permanent Make-up (Brauen, Lippen, Augen)', 'Braut- oder Event-Make-up', 'Brow Lifting', 'Sonstiges'],
			extraField: { label: 'Wunschtermin', kind: 'date' } as ExtraField,
			messageLabel: 'Deine Anfrage',
			messagePlaceholder: 'Welche Behandlung, deine Wimpern oder Brauen heute, deine Fragen … Ein paar Worte genügen.',
			responseTime: 'Antwort innerhalb von 24 h',
			mailSubject: 'Terminanfrage',
		},
		footer: {
			description:
				'Lash & Brow Studio von Mai: Permanent Make-up, natürliche Wimpernverlängerung und Make-up für Hochzeiten, Events und Shootings.',
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
		'Lip Blush',
		'Permanent Eyeliner',
		'Brow Lifting',
		'Wimpernverlängerung',
		'Signature Lashes',
		'Auffüllen',
		'Braut-Make-up',
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
			form: 2,
		},
		{
			name: 'Lip Blush',
			text: 'Ein zarter Farbschleier, der die Lippenkontur ausgleicht, definiert und den Lippen eine gesunde Farbe zurückgibt. Mit oder ohne Lippenstift tragbar.',
			duration: '2–2,5 Std.',
			lasts: '2–3 Jahre',
			price: '',
			icon: LIPS,
			form: 2,
		},
		{
			name: 'Lidstrich & Wimpernkranz',
			text: 'Von der dezenten Wimpernkranzverdichtung bis zum feinen Lidstrich: Definition, die Schwimmen, Sport und Tränen übersteht, ohne je zu verschmieren.',
			duration: '1–1,5 Std.',
			lasts: '3–5 Jahre',
			price: '',
			icon: DROP,
			form: 2,
		},
		{
			name: 'Brow Lifting',
			text: 'Deine eigenen Brauen, aufgerichtet und in Form gebracht – für einen volleren, gebürsteten Look, der wochenlang gepflegt aussieht. Ohne Pigment: die sanfte Art, eine neue Form auszuprobieren.',
			duration: '45–60 Min.',
			lasts: '6–8 Wochen',
			price: '',
			icon: BROW_LIFT,
			form: 4,
		},
		{
			name: 'Natürliche Wimpernverlängerung',
			text: 'Feine, leichte Wimpern, einzeln gesetzt und perfekt auf deine Augenform abgestimmt – für einen frischen, natürlichen Look ganz ohne Mascara.',
			duration: '2 Std.',
			lasts: '3–4 Wochen',
			price: '',
			icon: LASHES,
			form: 0,
		},
		{
			name: 'Signature Lash Design',
			text: 'Ein individuelles Wimperndesign mit mehr Definition: Länge, Schwung und Dichte so gewählt, dass sie deine Augen öffnen, ohne je schwer zu wirken.',
			duration: '2,5 Std.',
			lasts: '3–4 Wochen',
			price: '',
			icon: EYE,
			form: 0,
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
			text: 'Ein kostenloses 15-Minuten-Gespräch, im Studio oder per Video. Wir sprechen über deine Wünsche, deine Augen- und Gesichtsform und die Behandlung, die zu dir passt.',
			duration: '15 Min.',
			icon: 'chat',
		},
		{
			title: 'Design',
			text: 'Ich entwerfe deine Wimpern oder zeichne die Form direkt auf dein Gesicht und wähle mit dir Länge, Schwung oder Farbton. Angewendet wird erst, wenn du es liebst.',
			duration: '20 Min.',
			icon: 'pen',
		},
		{
			title: 'Behandlung',
			text: 'Eine ruhige Sitzung im Studio: Wimpern einzeln gesetzt, Pigment Punkt für Punkt. Die meisten entspannen sich, viele schlafen sogar ein.',
			duration: '1–2,5 Std.',
			icon: LASHES,
		},
		{
			title: 'Pflege',
			text: 'Pflegetipps für zu Hause, Auffüllen alle drei bis vier Wochen bei Wimpern und eine Nachbehandlung nach sechs Wochen beim Permanent Make-up.',
			duration: '+3–6 Wochen',
			icon: 'star',
		},
	] as ProcessStep[],

	testimonials: [
		{
			quote: 'Meine Wimpern sehen aus wie meine, nur schöner. Seit meinem ersten Termin habe ich keine Mascara mehr angefasst.',
			author: 'Lena M.',
			role: 'Natürliche Wimpernverlängerung',
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
			q: 'Schaden Wimpernverlängerungen meinen eigenen Wimpern?',
			a: 'Nicht, wenn sie richtig gesetzt werden. Jede Extension wird auf die Stärke deiner eigenen Wimper abgestimmt und einzeln mit ihr verbunden – deine Naturwimpern wachsen und erneuern sich ganz normal weiter.',
		},
		{
			q: 'Wie lange halten Wimpernverlängerungen und wann muss ich auffüllen?',
			a: 'Sie folgen deinem natürlichen Wimpernzyklus: Auffüllen alle drei bis vier Wochen hält den Look voll. Nach fünf Wochen oder mehr ist meist ein neues Set die bessere Wahl.',
		},
		{
			q: 'Tut Permanent Make-up weh?',
			a: 'Kaum. Vor und während der Behandlung wird eine Betäubungscreme aufgetragen; die meisten beschreiben ein leichtes Kratzen. Viele entspannen sich völlig.',
		},
		{
			q: 'Wie lange hält Permanent Make-up?',
			a: 'Ein bis drei Jahre bei Brauen und Lippen, drei bis fünf Jahre bei Lidstrich und Wimpernkranz, je nach Haut, Sonne und Pflege. Eine Auffrischung alle 12 bis 18 Monate hält das Ergebnis frisch.',
		},
		{
			q: 'Brow Lifting oder Powder Brows – was passt zu mir?',
			a: 'Beim Brow Lifting arbeite ich mit deinen eigenen Härchen: Sie werden aufgerichtet und für sechs bis acht Wochen in Form gebracht, pigmentiert wird nichts. Powder Brows legen eine weiche Schattierung in die Haut und halten ein bis drei Jahre. Viele starten mit einem Brow Lifting, um eine Form auszuprobieren, und entscheiden dann.',
		},
		{
			q: 'Wie bereite ich mich vor und wie pflege ich es danach?',
			a: 'Für Wimpern: komm ohne Mascara und halte sie danach 24 Stunden trocken. Für Permanent Make-up: verzichte 24 Stunden vorher auf Alkohol, Koffein und blutverdünnende Mittel, halte den Bereich danach sauber und trocken und meide zwei Wochen lang Sauna, Schwimmen und Sonnenbaden.',
		},
		{
			q: 'Für wen ist Permanent Make-up nicht geeignet?',
			a: 'Nicht während Schwangerschaft und Stillzeit, während einer Chemotherapie, bei akuten Hauterkrankungen im Bereich oder bei bestimmten Medikamenten. Das klären wir gemeinsam in der kostenlosen Beratung.',
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
			motto: 'Natürlich schön. Individuell gestaltet.',
		},
	},
};

export const CONTENT: Record<Lang, Content> = { en, de };

/** Area of the "About" portrait kept free of pixels (the face), in 0–1 coordinates */
export const ABOUT_FACE = { x0: 0.2, y0: 0.1, x1: 0.8, y1: 0.68 };
