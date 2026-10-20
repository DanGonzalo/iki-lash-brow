import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Lang } from '@/data/site';
import { applyHead } from '@/lib/head';
import { LangContext, detectLang, rememberLang, syncAddress } from '@/lib/i18n';

/** Holds the language of the site and keeps the address (/ or /de/) and the <head> in sync. */
export default function LangProvider({ children }: { children: ReactNode }) {
	const [lang, setLangState] = useState<Lang>(detectLang);

	const setLang = useCallback((next: Lang) => {
		setLangState(next);
		rememberLang(next);
	}, []);

	useEffect(() => {
		syncAddress(lang);
		applyHead(lang);
	}, [lang]);

	const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);
	return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
