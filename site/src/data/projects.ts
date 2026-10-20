import projectsData from './projects.json';
import { withBase } from '../lib/base';
import type { Project, ProjectImage } from './project-types';

export type { Project, ProjectImage };

/**
 * The projects are edited in the "Portfolio Projects" artifact and
 * written to projects.json by scripts/apply-projects.mjs — don't edit the
 * JSON by hand, publish from the artifact instead.
 */
const local = (image: ProjectImage): ProjectImage => ({
	...image,
	src: withBase(image.src),
	...(image.thumb ? { thumb: withBase(image.thumb) } : {}),
});
export const projects = (projectsData as Project[]).map((p) => ({ ...p, cover: local(p.cover), gallery: p.gallery.map(local) }));

/** Unsplash images accept a width; local files are served as they are. */
export const imageUrl = (src: string, width = 1400) =>
	src.includes('images.unsplash.com') ? src.replace(/([?&])w=\d+/, `$1w=${width}`) : src;
