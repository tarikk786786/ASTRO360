import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getSEOMetadataForRoute } from '../../src/lib/seoMetaUpdater';
import { SEO_REGISTRY } from '../../src/lib/seoManager';

describe('ASTRO360 Canonical URL Self-Referencing Audit Test Suite', () => {

  const AUDIT_URLS = [
    { route: 'panchanga', expected: 'https://astro.tarikislam.in/panchanga' },
    { route: 'compatibility', expected: 'https://astro.tarikislam.in/compatibility' },
    { route: 'vedic-astrology', expected: 'https://astro.tarikislam.in/vedic-astrology' },
    { route: 'dasha', expected: 'https://astro.tarikislam.in/dasha' },
    { route: 'transits', expected: 'https://astro.tarikislam.in/transits' },
    { route: 'birth-chart', expected: 'https://astro.tarikislam.in/birth-chart' },
    { route: 'western-astrology', expected: 'https://astro.tarikislam.in/western-astrology' },
    { route: 'astrocartography', expected: 'https://astro.tarikislam.in/astrocartography' },
    { route: 'methodology', expected: 'https://astro.tarikislam.in/methodology' },
    { route: 'muhurta', expected: 'https://astro.tarikislam.in/muhurta' },
    { route: 'learn/nakshatra', expected: 'https://astro.tarikislam.in/learn/nakshatra' },
    { route: 'learn/navamsa', expected: 'https://astro.tarikislam.in/learn/navamsa' },
    { route: 'learn/vimshottari-dasha', expected: 'https://astro.tarikislam.in/learn/vimshottari-dasha' },
    { route: 'learn/astrology-houses', expected: 'https://astro.tarikislam.in/learn/astrology-houses' },
    { route: 'seo-lab', expected: 'https://astro.tarikislam.in/seo-lab' },
    { route: 'backlink-lab', expected: 'https://astro.tarikislam.in/backlink-lab' },
    { route: 'free-tools', expected: 'https://astro.tarikislam.in/free-tools' }
  ];

  it('generates exact self-referencing canonical URLs for all reported pages in getSEOMetadataForRoute', () => {
    for (const item of AUDIT_URLS) {
      const meta = getSEOMetadataForRoute(item.route);
      assert.equal(
        meta.canonicalUrl,
        item.expected,
        `Page [${item.route}] must have self-referencing canonical URL [${item.expected}], but got [${meta.canonicalUrl}]`
      );
      assert.ok(meta.title.length > 10, `Page [${item.route}] must have non-empty title`);
      assert.ok(meta.description.length > 20, `Page [${item.route}] must have non-empty description`);
    }
  });

  it('maintains explicit canonical URLs in SEO_REGISTRY', () => {
    for (const item of AUDIT_URLS) {
      const entry = SEO_REGISTRY[item.route];
      assert.ok(entry, `SEO_REGISTRY must contain entry for route [${item.route}]`);
      assert.equal(
        entry.canonicalUrl,
        item.expected,
        `SEO_REGISTRY for [${item.route}] must have canonicalUrl [${item.expected}]`
      );
    }
  });

  it('correctly maps root homepage to https://astro.tarikislam.in/', () => {
    const rootMeta = getSEOMetadataForRoute('landing');
    assert.equal(rootMeta.canonicalUrl, 'https://astro.tarikislam.in/');
  });

});
