/** Folder the site is served from: '/' on its own domain, '/iki-lash-brow/' on GitHub Pages */
export const BASE = import.meta.env.BASE_URL;

/** Site path (/media/…, /projects/…) → path inside the folder the site is served from */
export const withBase = (path: string) => (path.startsWith('/') && !path.startsWith('//') ? BASE + path.slice(1) : path);
