/**
 * ASTRO360 Keyword-to-URL & Cannibalization Engine
 * Maps keywords to live ASTRO360 routes, checks for content gaps, intent mismatches, and cannibalization.
 */

import { URLMapping, PrimaryIntent, AstrologyClusterPillar } from './types';
import { ASTROLOGY_PILLAR_DEFINITIONS } from './astrologyClusterEngine';
import { normalizeKeyword } from './keywordNormalizer';

export const ASTRO360_EXISTING_ROUTES: Array<{
  path: string;
  type: 'tool' | 'article' | 'guide' | 'hub' | 'landing';
  title: string;
  cluster: AstrologyClusterPillar;
  primaryKeywords: string[];
  tabKey?: string;
}> = [
  {
    path: '/',
    type: 'landing',
    title: 'ASTRO360 — Multi-Tradition Cosmic Intelligence System',
    cluster: 'ASTROLOGY BASICS',
    primaryKeywords: ['astrology', 'horoscope', 'astro360', 'cosmic intelligence', 'free astrology report']
  },
  {
    path: '/free-tools',
    type: 'hub',
    title: 'ASTRO360 Free Astrology Tools & Calculators',
    cluster: 'ASTROLOGY BASICS',
    primaryKeywords: ['free astrology tools', 'astrology calculators', 'free kundli online'],
    tabKey: 'free-tools'
  },
  {
    path: '/free-tools/birth-chart',
    type: 'tool',
    title: 'Free Birth Chart (Kundli) Generator & Planetary Longitudes',
    cluster: 'BIRTH CHART',
    primaryKeywords: ['birth chart calculator', 'kundli generator', 'free kundali online', 'natal chart calculator'],
    tabKey: 'birth-chart'
  },
  {
    path: '/free-tools/moon-sign',
    type: 'tool',
    title: 'Moon Sign (Chandra Rashi) Calculator',
    cluster: 'MOON SIGN',
    primaryKeywords: ['moon sign calculator', 'chandra rashi calculator', 'find my moon sign'],
    tabKey: 'birth-chart'
  },
  {
    path: '/free-tools/ascendant',
    type: 'tool',
    title: 'Rising Sign & Ascendant (Lagna) Calculator',
    cluster: 'RISING SIGN',
    primaryKeywords: ['ascendant calculator', 'rising sign calculator', 'lagna calculator'],
    tabKey: 'birth-chart'
  },
  {
    path: '/free-tools/nakshatra',
    type: 'tool',
    title: 'Nakshatra & Pada Finder (27 Lunar Mansions)',
    cluster: 'NAKSHATRA',
    primaryKeywords: ['nakshatra calculator', 'find my nakshatra', 'janma nakshatra finder'],
    tabKey: 'nakshatra'
  },
  {
    path: '/free-tools/dasha',
    type: 'tool',
    title: 'Vimshottari Dasha Calculator & Timeline Explorer',
    cluster: 'DASHA',
    primaryKeywords: ['dasha calculator', 'vimshottari dasha calculator', 'mahadasha timeline'],
    tabKey: 'dasha'
  },
  {
    path: '/panchanga',
    type: 'tool',
    title: 'Today Panchanga, Tithi, Choghadiya & Rahu Kalam',
    cluster: 'PANCHANGA',
    primaryKeywords: ['today panchang', 'panchanga today', 'tithi today', 'rahu kalam timings'],
    tabKey: 'panchang-deities'
  },
  {
    path: '/free-tools/compatibility',
    type: 'tool',
    title: 'Ashta Koota 36 Guna Kundli Matching Calculator',
    cluster: 'COMPATIBILITY',
    primaryKeywords: ['kundli matching', 'gun milan online', 'marriage compatibility calculator', 'ashta koota matchmaker'],
    tabKey: 'compatibility'
  },
  {
    path: '/free-tools/transits',
    type: 'tool',
    title: 'Planetary Transits (Gochara) Radar',
    cluster: 'TRANSITS',
    primaryKeywords: ['planetary transits', 'saturn transit 2026', 'jupiter transit 2026', 'gochara calculator'],
    tabKey: 'transit-radar'
  },
  {
    path: '/free-tools/divisional-charts',
    type: 'tool',
    title: 'D1 to D60 Divisional Varga Charts Generator',
    cluster: 'VEDIC ASTROLOGY',
    primaryKeywords: ['navamsha chart calculator', 'd9 chart', 'divisional charts', 'varga charts online'],
    tabKey: 'divisional-charts'
  },
  {
    path: '/free-tools/remedies',
    type: 'tool',
    title: 'Vedic Gemstone & Rudraksha Remedy Advisor',
    cluster: 'REMEDIES',
    primaryKeywords: ['gemstone recommendation by date of birth', 'rudraksha calculator', 'sade sati remedies'],
    tabKey: 'remedies'
  },
  {
    path: '/free-tools/muhurta',
    type: 'tool',
    title: 'Shubh Muhurta & Auspicious Timing Engine',
    cluster: 'MUHURTA',
    primaryKeywords: ['shubh muhurat today', 'marriage muhurat 2026', 'griha pravesh muhurat'],
    tabKey: 'electional-muhurta'
  },
  {
    path: '/learn/birth-chart',
    type: 'guide',
    title: 'Comprehensive Guide to Reading Your Birth Chart (Kundli)',
    cluster: 'BIRTH CHART',
    primaryKeywords: ['how to read birth chart', 'birth chart meaning', 'kundli explained']
  },
  {
    path: '/learn/nakshatra',
    type: 'guide',
    title: 'The 27 Nakshatras: Complete Astrological Encyclopedia',
    cluster: 'NAKSHATRA',
    primaryKeywords: ['what is nakshatra', '27 nakshatras meaning', 'nakshatra characteristics']
  },
  {
    path: '/vedic-astrology',
    type: 'hub',
    title: 'Vedic Astrology (Jyotish) Fundamentals & Heritage Hub',
    cluster: 'VEDIC ASTROLOGY',
    primaryKeywords: ['vedic astrology', 'jyotish guide', 'sidereal vs tropical astrology'],
    tabKey: 'vedic-astrology'
  },
  {
    path: '/western-astrology',
    type: 'hub',
    title: 'Western Astrology & Tropical Planetary Aspects Hub',
    cluster: 'WESTERN ASTROLOGY',
    primaryKeywords: ['western astrology', 'tropical astrology', 'planetary aspects meaning'],
    tabKey: 'western-astrology'
  }
];

/**
 * Maps a keyword to existing ASTRO360 URLs or flags missing pages, cannibalization, and tool needs.
 */
export function mapKeywordToURL(
  keyword: string,
  primaryIntent: PrimaryIntent,
  cluster: AstrologyClusterPillar
): URLMapping {
  const norm = normalizeKeyword(keyword);
  const pillarMeta = ASTROLOGY_PILLAR_DEFINITIONS[cluster];

  // 1. Check for exact matching routes
  const matchedRoute = ASTRO360_EXISTING_ROUTES.find(r => 
    r.primaryKeywords.some(pk => {
      const pkNorm = normalizeKeyword(pk);
      return norm === pkNorm || norm.includes(pkNorm) || pkNorm.includes(norm);
    })
  );

  // 2. Check for potential cannibalization (multiple routes claiming same primary keyword)
  const competingRoutes = ASTRO360_EXISTING_ROUTES.filter(r => 
    r.primaryKeywords.some(pk => norm.includes(normalizeKeyword(pk)))
  );

  if (competingRoutes.length > 1) {
    return {
      status: 'CANNIBALIZATION_RISK',
      targetUrl: matchedRoute?.path || pillarMeta.pillarUrl,
      targetType: matchedRoute?.type || 'guide',
      pageTitle: matchedRoute?.title || pillarMeta.displayName,
      toolName: pillarMeta.primaryToolName,
      toolTab: pillarMeta.primaryToolTab,
      cannibalizingUrls: competingRoutes.map(r => r.path),
      recommendation: `Multiple URLs (${competingRoutes.map(r => r.path).join(', ')}) compete for "${keyword}". Consolidate canonical signals to ${competingRoutes[0].path}.`
    };
  }

  // 3. Tool Intent Check
  if (primaryIntent === 'TOOL') {
    if (matchedRoute && matchedRoute.type === 'tool') {
      return {
        status: 'EXISTS_OPTIMIZED',
        targetUrl: matchedRoute.path,
        targetType: 'tool',
        pageTitle: matchedRoute.title,
        toolName: matchedRoute.title,
        toolTab: matchedRoute.tabKey,
        recommendation: `Live interactive tool available at ${matchedRoute.path}. Optimize H1 and meta tags.`
      };
    }

    // Missing tool needed
    return {
      status: 'TOOL_NEEDED',
      targetUrl: `/free-tools/${slugify(norm)}`,
      targetType: 'tool',
      pageTitle: `${capitalize(norm)} Online (Free Calculator)`,
      toolName: `${capitalize(norm)} Engine`,
      toolTab: pillarMeta.primaryToolTab,
      recommendation: `User intent requires an interactive tool. Build standalone calculator at /free-tools/${slugify(norm)}.`
    };
  }

  // 4. Informational / Guide Match
  if (matchedRoute) {
    return {
      status: 'EXISTS_OPTIMIZED',
      targetUrl: matchedRoute.path,
      targetType: matchedRoute.type,
      pageTitle: matchedRoute.title,
      toolName: pillarMeta.primaryToolName,
      toolTab: pillarMeta.primaryToolTab,
      recommendation: `Target existing indexable content at ${matchedRoute.path}. Update with fresh scripture citations.`
    };
  }

  // 5. Missing Educational Guide
  return {
    status: 'MISSING_NEW_PAGE',
    targetUrl: `/learn/${slugify(norm)}`,
    targetType: 'article',
    pageTitle: `${capitalize(norm)}: Complete Vedic & Classical Guide`,
    toolName: pillarMeta.primaryToolName,
    toolTab: pillarMeta.primaryToolTab,
    recommendation: `High-value content gap. Create authoritative educational article at /learn/${slugify(norm)} with FAQ schema.`
  };
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
}

function capitalize(text: string): string {
  return text.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}
