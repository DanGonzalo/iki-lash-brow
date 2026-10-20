import { scrollToSection } from '@/lib/scroll';

export type LegalPage = 'imprint' | 'privacy';

/** Opens the legal notice or the privacy policy (LegalDialog listens) */
export function openLegal(page: LegalPage) {
	window.dispatchEvent(new CustomEvent('legal:open', { detail: page }));
}

/** Asks the contact form to pre-select a treatment (index in contact.sessionTypes), then scrolls to it */
export function requestTreatment(form: number) {
	window.dispatchEvent(new CustomEvent('contact:treatment', { detail: form }));
	scrollToSection('contact');
}
