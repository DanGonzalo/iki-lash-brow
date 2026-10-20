// Shape of src/data/projects.json (written by scripts/apply-projects.mjs).
// Kept apart from projects.ts so the build tools can read it too.

export interface ProjectImage {
	/** Site path (/projects/assets/…) or full URL. */
	src: string;
	alt: string;
	/** German caption, when filled in the artifact */
	altDe?: string;
	/** Lighter copy (900 px wide) for the grid and thumbnails */
	thumb?: string;
	/** Gallery only: a photo (default), an uploaded video, or a YouTube / Vimeo player URL */
	type?: 'image' | 'video' | 'embed';
	/** Pixel size of the file (cover only), so the grid keeps its proportions. */
	width?: number;
	height?: number;
}

export interface Project {
	slug: string;
	title: string;
	/** Category in English: also the key of the category filters */
	category: string;
	/** Category shown to the visitor, in the current language (set by useProjects) */
	categoryLabel?: string;
	/** Optional — shown only when filled in. */
	year: number | null;
	/** Extra info (Technique, Duration…) — only the ones filled in, in the configured order. */
	details: { label: string; value: string; labelDe?: string; valueDe?: string }[];
	summary: string;
	description: string[];
	cover: ProjectImage;
	gallery: ProjectImage[];
	/** German texts, when filled in the artifact (English is used otherwise) */
	de?: { title?: string; category?: string; summary?: string; description?: string[] };
}
