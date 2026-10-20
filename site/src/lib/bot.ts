/**
 * Search engines and link previews: they get the content right away, without
 * the intro and the decoding animations (the text is exactly the same).
 */
export const IS_BOT =
	typeof navigator !== 'undefined' &&
	/bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|pinterest|whatsapp|telegram|linkedin|skype|discord|vkshare|applebot/i.test(navigator.userAgent);
