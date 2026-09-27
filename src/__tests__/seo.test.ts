import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(__dirname, '../..')
const read = (p: string) => readFileSync(resolve(root, p), 'utf-8')

describe('SEO layer', () => {
  const html = read('index.html')

  it('has core meta tags (title, description, canonical, robots, OG, twitter)', () => {
    expect(html).toMatch(/<title>.*Web Development Packages.*<\/title>/)
    expect(html).toMatch(/name="description"/)
    expect(html).toMatch(/rel="canonical"/)
    expect(html).toMatch(/name="robots"/)
    expect(html).toMatch(/property="og:title"/)
    expect(html).toMatch(/property="og:image"/)
    expect(html).toMatch(/name="twitter:card"/)
    expect(html).toMatch(/name="theme-color"/)
  })

  it('embeds valid JSON-LD (Service + WebSite + FAQ)', () => {
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    expect(blocks.length).toBeGreaterThanOrEqual(3)
    const types = blocks.map((b) => (JSON.parse(b[1]) as { '@type': string })['@type'])
    expect(types).toContain('ProfessionalService')
    expect(types).toContain('WebSite')
    expect(types).toContain('FAQPage')
  })

  it('JSON-LD offers carry the exact PDF prices in INR', () => {
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    const service = blocks
      .map((b) => JSON.parse(b[1]) as any)
      .find((j) => j['@type'] === 'ProfessionalService')
    const prices = service.hasOfferCatalog.itemListElement.map((o: any) => o.price)
    expect(prices).toEqual(['10000', '15000', '22000', '35000'])
  })

  it('ships robots.txt + sitemap.xml referencing the PDF', () => {
    expect(existsSync(resolve(root, 'public/robots.txt'))).toBe(true)
    expect(existsSync(resolve(root, 'public/sitemap.xml'))).toBe(true)
    expect(read('public/robots.txt')).toMatch(/Sitemap:/)
    expect(read('public/sitemap.xml')).toMatch(/Sagar_Pathak_Web_Development_Packages_INTERACTIVE\.pdf/)
  })

  it('provides a noscript fallback for crawlers without JS', () => {
    expect(html).toMatch(/<noscript>/)
  })
})

describe('performance optimizations', () => {
  it('lazy-loads the Three.js hero canvas', () => {
    expect(read('src/components/Hero.tsx')).toMatch(/lazy\(\(\) => import\('\.\/Hero3D'\)\)/)
  })

  it('splits vendor chunks (react / three / motion)', () => {
    const cfg = read('vite.config.ts')
    expect(cfg).toMatch(/manualChunks/)
    expect(cfg).toMatch(/three/)
    expect(cfg).toMatch(/motion/)
  })

  it('hero image has dimensions + async decoding to cut CLS', () => {
    const hero = read('src/components/Hero.tsx')
    expect(hero).toMatch(/width=\{640\}/)
    expect(hero).toMatch(/decoding="async"/)
  })
})
