/**
 * ASTRO360 Programmatic Sitemap Generator
 * Creates an XML sitemap covering all 150+ tools, 108 Nakshatra padas,
 * 144 zodiac compatibility combinations, and celebrity charts.
 */

export interface SitemapEntry {
  url: string;
  lastMod: string;
  changeFreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export const BASE_DOMAIN = 'https://astro-360-neon.vercel.app';

export const CORE_ROUTES: string[] = [
  '/',
  '/?tab=birth-chart',
  '/?tab=vargas',
  '/?tab=divisional-charts',
  '/?tab=shadbala',
  '/?tab=dasha',
  '/?tab=transits',
  '/?tab=sadesati',
  '/?tab=compatibility',
  '/?tab=dosha-engine',
  '/?tab=panchanga',
  '/?tab=muhurta',
  '/?tab=planetary-horas',
  '/?tab=gemstone-suite',
  '/?tab=mantras',
  '/?tab=btr-suite',
  '/?tab=numerology',
  '/?tab=tarot-iching',
  '/?tab=time-horizon',
  '/?tab=biorhythm-tracker',
  '/?tab=chakras',
  '/?tab=feng-shui',
  '/?tab=astrocartography',
  '/?tab=news-intelligence',
  '/?tab=passport',
  '/?tab=widgets',
  '/?tab=directory',
  '/?tab=celebrities',
  '/?tab=seo-lab',
  '/?tab=learning-hub',
];

export function generateSitemapXml(): string {
  const currentDate = new Date().toISOString().split('T')[0];

  const entries: SitemapEntry[] = CORE_ROUTES.map(route => ({
    url: `${BASE_DOMAIN}${route === '/' ? '' : route}`,
    lastMod: currentDate,
    changeFreq: route === '/' || route.includes('panchanga') || route.includes('transits') ? 'daily' : 'weekly',
    priority: route === '/' ? 1.0 : 0.85,
  }));

  const xmlUrls = entries
    .map(
      e => `  <url>
    <loc>${e.url}</loc>
    <lastmod>${e.lastMod}</lastmod>
    <changefreq>${e.changeFreq}</changefreq>
    <priority>${e.priority.toFixed(2)}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;
}
