/**
 * ASTRO360 Astrology Cluster & Taxonomy Engine
 * Maps keywords to 16 classical astrology pillars, ASTRO360 tools, and learning hubs.
 */

import { AstrologyClusterPillar } from './types';

export interface ClusterPillarMeta {
  pillar: AstrologyClusterPillar;
  displayName: string;
  pillarUrl: string;
  primaryToolName: string;
  primaryToolUrl: string;
  primaryToolTab: string;
  hubPage: string;
  keywordsTrigger: string[];
  scriptureRef: string;
}

export const ASTROLOGY_PILLAR_DEFINITIONS: Record<AstrologyClusterPillar, ClusterPillarMeta> = {
  'BIRTH CHART': {
    pillar: 'BIRTH CHART',
    displayName: 'Birth Chart (Kundli / Natal)',
    pillarUrl: '/learn/birth-chart',
    primaryToolName: 'Birth Chart (Kundli) Generator',
    primaryToolUrl: '/free-tools/birth-chart',
    primaryToolTab: 'birth-chart',
    hubPage: '/learn/birth-chart',
    keywordsTrigger: [
      'birth chart', 'kundli', 'kundali', 'natal chart', 'horoscope chart', 'janam kundli', 
      'lagna chart', 'd1 chart', 'rasi chart', 'natal wheel', 'birth wheel'
    ],
    scriptureRef: 'Brihat Parashara Hora Shastra, Ch. 3 (Rashi Svarupa)'
  },
  'MOON SIGN': {
    pillar: 'MOON SIGN',
    displayName: 'Moon Sign (Chandra Rashi)',
    pillarUrl: '/learn/moon-sign',
    primaryToolName: 'Moon Sign Calculator',
    primaryToolUrl: '/free-tools/moon-sign',
    primaryToolTab: 'birth-chart',
    hubPage: '/learn/moon-sign',
    keywordsTrigger: [
      'moon sign', 'chandra rashi', 'rashi calculator', 'janma rashi', 'moon placement',
      'moon zodiac', 'sidereal moon'
    ],
    scriptureRef: 'Phaladeepika, Ch. 7 (Chandra Bala)'
  },
  'RISING SIGN': {
    pillar: 'RISING SIGN',
    displayName: 'Rising Sign (Ascendant / Lagna)',
    pillarUrl: '/learn/rising-sign',
    primaryToolName: 'Ascendant & Lagna Calculator',
    primaryToolUrl: '/free-tools/ascendant',
    primaryToolTab: 'birth-chart',
    hubPage: '/learn/rising-sign',
    keywordsTrigger: [
      'rising sign', 'ascendant', 'lagna', 'first house sign', 'ascendant calculator',
      'rising sign meaning', 'lagna lord'
    ],
    scriptureRef: 'Saravali, Ch. 4 (Lagna Vijnana)'
  },
  'NAKSHATRA': {
    pillar: 'NAKSHATRA',
    displayName: 'Nakshatras (27 Lunar Mansions)',
    pillarUrl: '/learn/nakshatra',
    primaryToolName: 'Nakshatra & Pada Finder',
    primaryToolUrl: '/free-tools/nakshatra',
    primaryToolTab: 'nakshatra',
    hubPage: '/learn/nakshatra',
    keywordsTrigger: [
      'nakshatra', 'birth star', 'janma nakshatra', 'pada', 'ashwini', 'bharani', 'krittika',
      'rohini', 'mrigashira', 'ardra', 'punarvasu', 'pushya', 'ashlesha', 'magha', 'purva phalguni',
      'uttara phalguni', 'hasta', 'chitra', 'swati', 'vishakha', 'anuradha', 'jyeshtha', 'mula',
      'purva ashadha', 'uttara ashadha', 'shravana', 'dhanishta', 'shatabhisha', 'purva bhadrapada',
      'uttara bhadrapada', 'revati', 'tara bala', 'nakshatra lord'
    ],
    scriptureRef: 'Taittiriya Brahmana 3.1.4 & BPHS Ch. 4'
  },
  'DASHA': {
    pillar: 'DASHA',
    displayName: 'Vimshottari Dasha & Planetary Periods',
    pillarUrl: '/learn/dasha',
    primaryToolName: 'Vimshottari Dasha Timeline Explorer',
    primaryToolUrl: '/free-tools/dasha',
    primaryToolTab: 'dasha',
    hubPage: '/learn/dasha',
    keywordsTrigger: [
      'dasha', 'vimshottari dasha', 'mahadasha', 'antardasha', 'pratyantardasha',
      'planetary period', 'shani dasha', 'rahu mahadasha', 'jupiter dasha', 'dasha timeline'
    ],
    scriptureRef: 'Brihat Parashara Hora Shastra, Ch. 46 (Vimshottari Dasha)'
  },
  'PANCHANGA': {
    pillar: 'PANCHANGA',
    displayName: 'Vedic Panchanga (5 Limbs of Time)',
    pillarUrl: '/panchanga',
    primaryToolName: 'Real-Time Vedic Panchanga & Choghadiya',
    primaryToolUrl: '/panchanga',
    primaryToolTab: 'panchang-deities',
    hubPage: '/panchanga',
    keywordsTrigger: [
      'panchanga', 'panchang', 'today panchang', 'tithi', 'vaara', 'karana', 'amavasya',
      'purnima', 'ekadashi', 'rahu kalam', 'gulika kalam', 'choghadiya', 'abhijit muhurat',
      'hindu calendar'
    ],
    scriptureRef: 'Surya Siddhanta & Muhurta Chintamani'
  },
  'COMPATIBILITY': {
    pillar: 'COMPATIBILITY',
    displayName: 'Synastry & Kundli Matching',
    pillarUrl: '/learn/compatibility',
    primaryToolName: 'Ashta Koota 36 Guna Matchmaker',
    primaryToolUrl: '/free-tools/compatibility',
    primaryToolTab: 'compatibility',
    hubPage: '/learn/compatibility',
    keywordsTrigger: [
      'compatibility', 'kundli matching', 'kundali matching', 'gun milan', '36 guna',
      'ashta koota', 'synastry', 'love match', 'marriage compatibility', 'nadi dosha',
      'bhakoot dosha', 'zodiac compatibility'
    ],
    scriptureRef: 'Brihat Parashara Hora Shastra, Ch. 77 (Melapaka / Ashta Koota)'
  },
  'TRANSITS': {
    pillar: 'TRANSITS',
    displayName: 'Planetary Transits (Gochara)',
    pillarUrl: '/learn/transits',
    primaryToolName: 'Planetary Ingress & Gochara Radar',
    primaryToolUrl: '/free-tools/transits',
    primaryToolTab: 'transit-radar',
    hubPage: '/learn/transits',
    keywordsTrigger: [
      'transit', 'transits', 'gochara', 'planetary transit', 'saturn transit', 'jupiter transit',
      'rahu transit', 'ketu transit', 'retrograde', 'ingress', 'eclipse astrology'
    ],
    scriptureRef: 'Phaladeepika, Ch. 26 (Gochara Phala)'
  },
  'VEDIC ASTROLOGY': {
    pillar: 'VEDIC ASTROLOGY',
    displayName: 'Vedic Jyotish & Classical Traditions',
    pillarUrl: '/vedic-astrology',
    primaryToolName: 'Divisional Charts (D1–D60) Suite',
    primaryToolUrl: '/free-tools/divisional-charts',
    primaryToolTab: 'divisional-charts',
    hubPage: '/vedic-astrology',
    keywordsTrigger: [
      'vedic astrology', 'jyotish', 'sidereal astrology', 'lahiri ayanamsha', 'parashari',
      'navamsha', 'd9 chart', 'varga charts', 'shodashavarga', 'graha', 'bhava'
    ],
    scriptureRef: 'Brihat Parashara Hora Shastra & Brihat Jataka'
  },
  'WESTERN ASTROLOGY': {
    pillar: 'WESTERN ASTROLOGY',
    displayName: 'Western Tropical & Hellenistic',
    pillarUrl: '/western-astrology',
    primaryToolName: 'Tropical Natal Chart & Aspect Grid',
    primaryToolUrl: '/free-tools/western-chart',
    primaryToolTab: 'western',
    hubPage: '/western-astrology',
    keywordsTrigger: [
      'western astrology', 'tropical zodiac', 'placidus', 'aspects', 'trine', 'sextile',
      'square', 'opposition', 'conjunction', 'hellenistic astrology', 'midheaven', 'mc'
    ],
    scriptureRef: 'Ptolemy’s Tetrabiblos & Vettius Valens Anthologies'
  },
  'KP': {
    pillar: 'KP',
    displayName: 'KP System (Krishnamurti Paddhati)',
    pillarUrl: '/learn/kp-astrology',
    primaryToolName: 'KP Cuspal Sub-Lord Calculator',
    primaryToolUrl: '/free-tools/kp-astrology',
    primaryToolTab: 'master-chart',
    hubPage: '/learn/kp-astrology',
    keywordsTrigger: [
      'kp astrology', 'krishnamurti paddhati', 'sub lord', 'cuspal sub lord', 'kp chart',
      'kp ayanamsa', 'placidus cusps kp', 'ruling planets kp'
    ],
    scriptureRef: 'Prof. K.S. Krishnamurti, KP Readers 1–6'
  },
  'JAIMINI': {
    pillar: 'JAIMINI',
    displayName: 'Jaimini Sutras & Karakas',
    pillarUrl: '/learn/jaimini-astrology',
    primaryToolName: 'Jaimini Chara Dasha & Karakas Engine',
    primaryToolUrl: '/free-tools/jaimini',
    primaryToolTab: 'master-chart',
    hubPage: '/learn/jaimini-astrology',
    keywordsTrigger: [
      'jaimini', 'chara dasha', 'atmakaraka', 'amatyakaraka', 'arudha lagna', 'upapada lagna',
      'karakamsha', 'jaimini aspects'
    ],
    scriptureRef: 'Maharishi Jaimini, Jaimini Upadesha Sutras'
  },
  'MUHURTA': {
    pillar: 'MUHURTA',
    displayName: 'Electional Astrology (Shubh Muhurta)',
    pillarUrl: '/learn/muhurta',
    primaryToolName: 'Electional Shubh Muhurta Engine',
    primaryToolUrl: '/free-tools/muhurta',
    primaryToolTab: 'electional-muhurta',
    hubPage: '/learn/muhurta',
    keywordsTrigger: [
      'muhurta', 'muhurat', 'shubh muhurat', 'marriage muhurat', 'griha pravesh', 'vehicle purchase',
      'naming ceremony muhurat', 'business start muhurat', 'electional astrology'
    ],
    scriptureRef: 'Muhurta Chintamani & Kalaprakasika'
  },
  'ASTROCARTOGRAPHY': {
    pillar: 'ASTROCARTOGRAPHY',
    displayName: 'Astro-Cartography & Relocation',
    pillarUrl: '/learn/astrocartography',
    primaryToolName: 'Astro-Cartography Relocation Matrix',
    primaryToolUrl: '/free-tools/astrocartography',
    primaryToolTab: 'astro-cartography',
    hubPage: '/learn/astrocartography',
    keywordsTrigger: [
      'astrocartography', 'astro cartography', 'relocation astrology', 'planetary lines',
      'sun line', 'venus line', 'jupiter line', 'locational astrology', 'zenith lines'
    ],
    scriptureRef: 'Jim Lewis, The Astro*Carto*Graphy Book of Maps'
  },
  'ASTROLOGY BASICS': {
    pillar: 'ASTROLOGY BASICS',
    displayName: 'Astrology Fundamentals & Guide',
    pillarUrl: '/learn/astrology-basics',
    primaryToolName: 'Astrology Mind Map & Encyclopedia',
    primaryToolUrl: '/learn/encyclopedia',
    primaryToolTab: 'learning-hub',
    hubPage: '/learn/astrology-basics',
    keywordsTrigger: [
      'astrology', 'astrology basics', 'what is astrology', 'how does astrology work',
      '12 houses', 'zodiac signs', 'planets in astrology', 'astrology for beginners',
      'horoscope meaning'
    ],
    scriptureRef: 'Universal Classical Foundations'
  },
  'REMEDIES': {
    pillar: 'REMEDIES',
    displayName: 'Vedic & Multi-Tradition Remedies',
    pillarUrl: '/learn/remedies',
    primaryToolName: 'Remedies, Gemstones & Yantra Advisor',
    primaryToolUrl: '/free-tools/remedies',
    primaryToolTab: 'remedies',
    hubPage: '/learn/remedies',
    keywordsTrigger: [
      'remedy', 'remedies', 'upayas', 'gemstones', 'rudraksha', 'mantra', 'yantra',
      'sade sati remedy', 'manglik dosha remedy', 'kaal sarp dosha remedy', 'gemstone recommendation',
      'yellow sapphire', 'blue sapphire', 'emerald panna', 'ruby manikya'
    ],
    scriptureRef: 'Lal Kitab, Garuda Purana & BPHS Ch. 84'
  }
};

// Flatten and sort triggers by length descending so specific terms (e.g. "chara dasha", "jaimini") take precedence over generic single words (e.g. "dasha")
const COMPILED_CLUSTER_TRIGGERS: Array<{
  pillar: AstrologyClusterPillar;
  regex: RegExp;
  length: number;
}> = Object.values(ASTROLOGY_PILLAR_DEFINITIONS).flatMap(pillar => 
  pillar.keywordsTrigger.map(trigger => ({
    pillar: pillar.pillar,
    regex: new RegExp(`\\b${trigger.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i'),
    length: trigger.length
  }))
).sort((a, b) => b.length - a.length);

/**
 * Classifies a keyword into one of the 16 classical astrology pillars.
 */
export function classifyAstrologyCluster(keyword: string): AstrologyClusterPillar {
  const norm = keyword.toLowerCase().trim();

  // Check compiled triggers in order of specificity (longest phrase first)
  for (const item of COMPILED_CLUSTER_TRIGGERS) {
    if (item.regex.test(norm)) {
      return item.pillar;
    }
  }

  // Secondary Fallbacks
  if (/kundli|chart|birth|horoscope/i.test(norm)) return 'BIRTH CHART';
  if (/match|love|partner|marriage/i.test(norm)) return 'COMPATIBILITY';
  if (/stone|gem|rudraksha|mantra|remedy|dosha/i.test(norm)) return 'REMEDIES';
  if (/time|today|calendar|date/i.test(norm)) return 'PANCHANGA';

  return 'ASTROLOGY BASICS';
}
