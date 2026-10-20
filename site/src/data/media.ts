import mediaData from './media.json';
import { withBase } from '@/lib/base';

/**
 * Photos of the hero, the "À propos" portrait and the testimonials.
 * Generated from the images/ folders by scripts/prepare-images.mjs —
 * drop new photos in images/ and run that script instead of editing media.json.
 */
export interface MediaImage {
	src: string;
	alt: string;
}

const raw = mediaData as {
	hero: MediaImage[];
	about: MediaImage;
	testimonials: MediaImage[];
};
const local = (image: MediaImage) => ({ ...image, src: withBase(image.src) });

export const media = {
	hero: raw.hero.map(local),
	about: local(raw.about),
	testimonials: raw.testimonials.map(local),
};
