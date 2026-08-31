/**
 * ASTRO360 Dynamic SEO Metadata & Canonical URL Synchronizer
 * 
 * Compliant with Google Search Essentials:
 * Ensures every indexable page and tool has a self-referencing canonical URL
 * matching its exact path (e.g., https://astro.tarikislam.in/panchanga).
 */

import { ASTRO360_INDEXABLE_PAGES, SEOCrawlResult } from './seoGrowthEngine';

export const BASE_SITE_URL = 'https://astro.tarikislam.in';

/**
 * Maps any activeTab or route path to its canonical SEOCrawlResult metadata.
 */
export function getSEOMetadataForRoute(tabOrPath: string): {
  canonicalUrl: string;
  title: string;
  description: string;
  path: string;
} {
  const clean = tabOrPath.toLowerCase().trim().replace(/^\//, '');
  const targetPath = clean === 'landing' || clean === '' ? '/' : `/${clean}`;

  // Check exact path match in indexable pages catalog
  const found = ASTRO360_INDEXABLE_PAGES.find(
    p => p.path === targetPath || p.path === `/${clean}` || p.url.endsWith(targetPath)
  );

  if (found) {
    return {
      canonicalUrl: found.canonicalUrl,
      title: found.title,
      description: found.description,
      path: found.path
    };
  }

  // Fallback map for tabs
  const tabMetadataMap: Record<string, { title: string; description: string; path: string }> = {
    'birth-chart': {
      title: 'Free Birth Chart Calculator & Natal Placements',
      description: 'Generate your free high-precision birth chart with exact planetary coordinates, Ascendant rising sign, and house interpretations.',
      path: '/birth-chart'
    },
    'vedic-astrology': {
      title: 'Vedic Astrology: Janam Kundli & Nakshatra Suite',
      description: 'Comprehensive Vedic astrology platform: Janam Kundli, 27 Nakshatras, D1–D60 Divisional Vargas, and Vimshottari Dasha timeline.',
      path: '/vedic-astrology'
    },
    'western-astrology': {
      title: 'Western Astrology: Natal Wheels & Planetary Aspects',
      description: 'Explore Western tropical astrology with Placidus houses, planetary aspects, major transits, progressions, and archetype analysis.',
      path: '/western-astrology'
    },
    'compatibility': {
      title: 'Astrology Compatibility & Synastry Calculator',
      description: 'Compare birth charts across 36-Guna Ashta Koota Vedic matchmaking, Western synastry aspect overlays, and relationship scores.',
      path: '/compatibility'
    },
    'panchanga': {
      title: 'Live Daily Panchang: Tithi, Nakshatra & Muhurta',
      description: 'Real-time Vedic Panchanga with accurate Tithi, Nakshatra, Karana, Yoga, Abhijit Muhurta, and Rahu Kalam timings for any location.',
      path: '/panchanga'
    },
    'transits': {
      title: 'Planetary Transits: Real-Time Ephemeris Tracker',
      description: 'Track live planetary transits, retrogrades, sign ingresses, and exact degree aspects with JPL DE440 ephemeris precision.',
      path: '/transits'
    },
    'transit-radar': {
      title: 'Planetary Transit Ingress Radar',
      description: 'Live real-time ephemeris orbital radar tracking planetary speed, retrograde motions, and upcoming sign ingresses.',
      path: '/transits'
    },
    'dasha': {
      title: 'Vimshottari Dasha Calculator & Life Timeline',
      description: 'Calculate your personal Vimshottari Dasha periods with active Mahadasha, Antardasha sub-periods, and life event forecasting.',
      path: '/dasha'
    },
    'muhurta': {
      title: 'Auspicious Muhurta Calculator: Timing Engine',
      description: 'Calculate favorable Muhurta timings for marriage, business, travel, and new beginnings with Vedic Panchanga algorithms.',
      path: '/muhurta'
    },
    'electional-muhurta': {
      title: 'Auspicious Muhurta Calculator: Timing Engine',
      description: 'Calculate favorable Muhurta timings for marriage, business, travel, and new beginnings with Vedic Panchanga algorithms.',
      path: '/muhurta'
    },
    'astrocartography': {
      title: 'Astrocartography: Planetary Location Lines',
      description: 'Discover your planetary power lines across the globe with interactive AC, MC, DC, and IC planetary line astrocartography mapping.',
      path: '/astrocartography'
    },
    'astro-cartography': {
      title: 'Astrocartography: Planetary Location Lines',
      description: 'Discover your planetary power lines across the globe with interactive AC, MC, DC, and IC planetary line astrocartography mapping.',
      path: '/astrocartography'
    },
    'methodology': {
      title: 'ASTRO360 Calculation Methodology & Ephemeris',
      description: 'Learn how ASTRO360 calculates: UTC time normalization, JPL DE440 ephemeris, classical tradition rules, and AI explainability.',
      path: '/methodology'
    },
    'seo-lab': {
      title: 'ASTRO360 Free-First SEO Keyword Research Lab',
      description: 'Free-first keyword discovery, Google Trends momentum, 16 classical astrology clusters, and content brief generation.',
      path: '/seo-lab'
    },
    'backlink-lab': {
      title: 'ASTRO360 Backlink Opportunity & Digital PR Lab',
      description: 'High-trust link discovery, unlinked brand mentions, digital PR story angles, transparent embed widgets, and backlink verification.',
      path: '/backlink-lab'
    },
    'free-tools': {
      title: 'Free Online Astrology Tools & Ephemeris Calculators',
      description: 'Access 8 free, ad-free astronomical calculators: Birth Chart, Moon Sign, Rising Sign, Nakshatra, Panchanga, and Compatibility.',
      path: '/free-tools'
    }
  };

  const matchedTab = tabMetadataMap[clean];
  if (matchedTab) {
    return {
      canonicalUrl: `${BASE_SITE_URL}${matchedTab.path}`,
      title: `${matchedTab.title} | ASTRO360`,
      description: matchedTab.description,
      path: matchedTab.path
    };
  }

  // Generic dynamic path resolution
  const resolvedPath = targetPath === '/' ? '/' : targetPath;
  const canonicalUrl = `${BASE_SITE_URL}${resolvedPath}`;

  return {
    canonicalUrl,
    title: 'ASTRO360: Precision Astrology & Ephemeris Platform',
    description: 'Free high-precision birth charts, Vedic Jyotish, Western astrology, compatibility, Panchanga, and multi-tradition planetary forecasts.',
    path: resolvedPath
  };
}

/**
 * Updates DOM head elements dynamically on route change.
 */
export function updateDocumentSEOHead(tabOrPath: string): void {
  if (typeof document === 'undefined') return;

  try {
    const meta = getSEOMetadataForRoute(tabOrPath);

    // 1. Update Title
    document.title = meta.title;

    // 2. Update or create <link rel="canonical">
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', meta.canonicalUrl);

    // 3. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', meta.description);
    }

    // 4. Update OpenGraph Tags
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', meta.canonicalUrl);

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', meta.title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', meta.description);

    // 5. Update Twitter Tags
    let twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', meta.title);

    let twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', meta.description);

  } catch (err) {
    console.warn('Failed to update SEO head tags:', err);
  }
}
