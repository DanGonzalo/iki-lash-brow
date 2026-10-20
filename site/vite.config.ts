import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { headTags, langFromPath, robotsTxt, sitemapXml, staticBody } from './src/seo/meta'
import type { Lang } from './src/data/site'

/**
 * Where the site is served from. BASE_PATH = folder ('/' on its own domain,
 * '/pigment-by-mai/' on GitHub Pages). SITE_URL = address, otherwise siteUrl
 * from deploy.config.json (filled in by the publish task once the Hostinger
 * domain is known). PREVIEW=1 marks a test copy search engines must not index.
 */
const BASE = process.env.BASE_PATH || '/'
const PREVIEW = process.env.PREVIEW === '1'

function siteOrigin(): string {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/+$/, '')
  try {
    const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'deploy.config.json'), 'utf8'))
    return String(config.siteUrl || '').replace(/\/+$/, '')
  } catch {
    return ''
  }
}

/**
 * One page per language: / in English, /de/ in German, each with its own
 * title, description, canonical and alternate links, social tags, structured
 * data and a plain-HTML version of the content. Also writes sitemap.xml and
 * robots.txt at build time.
 */
function seoPages(): Plugin {
  // Address of the site root, without trailing slash (relative while unknown)
  const origin = siteOrigin() + BASE.replace(/\/$/, '')
  const robots = PREVIEW ? '<meta name="robots" content="noindex, nofollow" />\n    ' : ''
  const render = (html: string, lang: Lang) =>
    html
      .replace('<html lang="en">', `<html lang="${lang}">`)
      .replace('<!--seo-head-->', robots + headTags(lang, origin))
      .replace('<!--seo-body-->', staticBody(lang, origin))
  let german = ''

  return {
    name: 'seo-pages',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        german = render(html, 'de')
        return render(html, langFromPath(ctx.originalUrl ?? ctx.path, BASE))
      },
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsTxt(origin, PREVIEW) })
      if (/^https?:/.test(origin) && !PREVIEW) {
        const today = new Date().toISOString().slice(0, 10)
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml(origin, today) })
      }
    },
    // The German page is written once the English one is final (scripts and styles injected)
    writeBundle(options) {
      const dir = path.join(options.dir ?? path.resolve(__dirname, 'dist'), 'de')
      fs.mkdirSync(dir, { recursive: true })
      fs.writeFileSync(path.join(dir, 'index.html'), german)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: BASE,
  plugins: [react(), tailwindcss(), seoPages()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
