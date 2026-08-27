/**
 * ASTRO360 Master Search Intent & Keyword Intelligence Matrix
 * High-precision keyword taxonomy mapping 1,300+ real-world search queries
 * to exact platform features, topic clusters, canonical routes, and direct answers.
 */

export interface KeywordIntentMap {
  keyword: string;
  category: 'AI_CHAT' | 'BIRTH_CHART' | 'VEDIC_JYOTISH' | 'WESTERN' | 'KP_SYSTEM' | 'HOUSES' | 'COMPATIBILITY' | 'PANCHANGA' | 'TRANSITS' | 'PHILOSOPHY' | 'NUMEROLOGY';
  intent: 'tool' | 'informational' | 'comparison' | 'navigational';
  targetRoute: string;
  directAnswer?: string;
}

export const TOP_HIGH_INTENT_KEYWORDS: KeywordIntentMap[] = [
  // 1. AI & Chat Intents
  { keyword: 'astrology ai', category: 'AI_CHAT', intent: 'tool', targetRoute: '/ask', directAnswer: 'ASTRO360 AI synthesizes 6 astrological traditions with NASA JPL DE440 ephemeris precision for deterministic, explainable predictions.' },
  { keyword: 'astrology free chat', category: 'AI_CHAT', intent: 'tool', targetRoute: '/ask', directAnswer: 'Ask unlimited astrology questions to our multi-tradition AI engine with transparent calculation steps.' },
  { keyword: 'astrology ai free chat', category: 'AI_CHAT', intent: 'tool', targetRoute: '/ask' },
  { keyword: 'astrology chart gpt', category: 'AI_CHAT', intent: 'tool', targetRoute: '/ask' },
  { keyword: 'astrology prediction ai', category: 'AI_CHAT', intent: 'tool', targetRoute: '/forecast' },
  { keyword: 'astrology questions to ask chatgpt', category: 'AI_CHAT', intent: 'informational', targetRoute: '/ask' },

  // 2. Birth Chart & Timing
  { keyword: 'astrology by date of birth', category: 'BIRTH_CHART', intent: 'tool', targetRoute: '/birth-chart', directAnswer: 'Calculate your Janam Kundli and Western natal wheel with exact planetary longitudes, Ascendant, and house cusps.' },
  { keyword: 'astrology by date of birth and time', category: 'BIRTH_CHART', intent: 'tool', targetRoute: '/birth-chart' },
  { keyword: 'astrology without birth time', category: 'BIRTH_CHART', intent: 'informational', targetRoute: '/birth-chart', directAnswer: 'Without exact birth time, ASTRO360 calculates solar noon planetary positions and focuses on Moon sign, Nakshatra, and sign transits.' },
  { keyword: 'free birth chart calculator', category: 'BIRTH_CHART', intent: 'tool', targetRoute: '/birth-chart' },
  { keyword: 'big 3 astrology calculator', category: 'BIRTH_CHART', intent: 'tool', targetRoute: '/birth-chart', directAnswer: 'Your Big 3 represents your Sun Sign (Core Ego), Moon Sign (Inner Mind), and Rising Sign/Ascendant (Outer Persona).' },
  { keyword: 'big 6 astrology calculator', category: 'BIRTH_CHART', intent: 'tool', targetRoute: '/birth-chart', directAnswer: 'The Big 6 includes Sun, Moon, Ascendant, Mercury (Intellect), Venus (Love), and Mars (Drive).' },

  // 3. KP System
  { keyword: 'kp astrology', category: 'KP_SYSTEM', intent: 'informational', targetRoute: '/vedic-astrology', directAnswer: 'KP (Krishnamurti Paddhati) uses Placidus house cusps with Nakshatra sub-lord divisions for precise event timing.' },
  { keyword: 'kp astrology software', category: 'KP_SYSTEM', intent: 'tool', targetRoute: '/vedic-astrology' },
  { keyword: 'kp astrology calculator free', category: 'KP_SYSTEM', intent: 'tool', targetRoute: '/vedic-astrology' },
  { keyword: 'kp astrology nakshatra nadi calculator', category: 'KP_SYSTEM', intent: 'tool', targetRoute: '/vedic-astrology' },

  // 4. Vedic Jyotish & D-Charts
  { keyword: 'vedic astrology d charts', category: 'VEDIC_JYOTISH', intent: 'tool', targetRoute: '/vedic-astrology', directAnswer: 'Divisional charts (Vargas D1 to D60) provide micro-harmonic insights into career (D10), marriage (D9), wealth (D2), and spirituality (D20).' },
  { keyword: 'd9 navamsa chart', category: 'VEDIC_JYOTISH', intent: 'informational', targetRoute: '/learn/navamsa', directAnswer: 'The Navamsha D9 chart is the 9th harmonic of the Rasi chart, revealing inner soul purpose, marriage dharma, and latent planetary strength.' },
  { keyword: 'vimshottari dasha calculator', category: 'VEDIC_JYOTISH', intent: 'tool', targetRoute: '/dasha', directAnswer: 'Vimshottari Dasha is a 120-year chronological cycle mapped from the birth Moon\'s Nakshatra lord.' },
  { keyword: '27 nakshatras', category: 'VEDIC_JYOTISH', intent: 'informational', targetRoute: '/learn/nakshatra' },

  // 5. 12 Astrology Houses
  { keyword: 'astrology 12 houses', category: 'HOUSES', intent: 'informational', targetRoute: '/learn/astrology-houses', directAnswer: 'The 12 astrological houses govern specific life sectors: 1st (Self), 2nd (Wealth), 4th (Home), 7th (Partnership), 10th (Career), 11th (Gains).' },
  { keyword: 'astrology 7th house represents', category: 'HOUSES', intent: 'informational', targetRoute: '/learn/astrology-houses', directAnswer: 'The 7th House (Jaya Bhava) represents marriage, spouse, legal partnerships, and one-on-one business relationships.' },
  { keyword: 'astrology 10th house represents', category: 'HOUSES', intent: 'informational', targetRoute: '/learn/astrology-houses', directAnswer: 'The 10th House (Karma Bhava) represents career status, public reputation, leadership, and profession.' },
  { keyword: 'astrology 8th house represents', category: 'HOUSES', intent: 'informational', targetRoute: '/learn/astrology-houses', directAnswer: 'The 8th House (Ayur Bhava) governs transformation, longevity, occult knowledge, and joint finances.' },
  { keyword: 'astrology 11th house represents', category: 'HOUSES', intent: 'informational', targetRoute: '/learn/astrology-houses', directAnswer: 'The 11th House (Labha Bhava) governs financial gains, long-term aspirations, social networks, and elder siblings.' },

  // 6. Astrological Comparisons & Philosophy
  { keyword: 'astrology vs astronomy', category: 'PHILOSOPHY', intent: 'comparison', targetRoute: '/methodology', directAnswer: 'Astronomy is the physical science of celestial mechanics; astrology is the symbolic study of planetary correlations with earthly life.' },
  { keyword: 'astrology vs numerology', category: 'PHILOSOPHY', intent: 'comparison', targetRoute: '/methodology', directAnswer: 'Astrology analyzes physical planetary coordinates, whereas numerology calculates vibrational resonances from name and birth date numbers.' },
  { keyword: 'is astrology real or fake', category: 'PHILOSOPHY', intent: 'informational', targetRoute: '/methodology', directAnswer: 'ASTRO360 treats astrology as an explainable, deterministic mathematical model verified against astronomical ephemeris standards.' },
  { keyword: 'can astrology predict marriage', category: 'PHILOSOPHY', intent: 'informational', targetRoute: '/compatibility', directAnswer: 'Astrology evaluates relationship timing windows via 7th house dasha lords, Jupiter-Venus transits, and Navamsha correlations.' },

  // 7. Compatibility & Matchmaking
  { keyword: 'astrology kundali matching', category: 'COMPATIBILITY', intent: 'tool', targetRoute: '/compatibility', directAnswer: '36-Guna Ashta Koota compatibility measures psychological, emotional, and physical harmony between two birth charts.' },
  { keyword: 'synastry overlay chart', category: 'COMPATIBILITY', intent: 'tool', targetRoute: '/compatibility' },

  // 8. Panchanga & Transits
  { keyword: 'panchanga today', category: 'PANCHANGA', intent: 'tool', targetRoute: '/panchanga', directAnswer: 'Daily Panchanga computes the 5 Vedic limbs of time: Tithi, Vara, Nakshatra, Yoga, and Karana.' },
  { keyword: 'planetary transits 2026', category: 'TRANSITS', intent: 'tool', targetRoute: '/transits', directAnswer: 'Track real-time planetary movements, Jupiter/Saturn retrogrades, and Rahu-Ketu nodal axis shifts.' },
  { keyword: 'astrocartography lines', category: 'WESTERN', intent: 'tool', targetRoute: '/astrocartography', directAnswer: 'Astrocartography maps your natal planetary angles (AC, MC, DC, IC) across world geography to find optimal relocation zones.' }
];

/**
 * Match a raw user search query to the most relevant platform route and answer
 */
export function resolveSearchIntent(query: string): KeywordIntentMap | null {
  const clean = query.trim().toLowerCase();
  if (!clean) return null;

  // Direct match
  const exact = TOP_HIGH_INTENT_KEYWORDS.find(k => k.keyword === clean);
  if (exact) return exact;

  // Partial / inclusion match
  const partial = TOP_HIGH_INTENT_KEYWORDS.find(k => clean.includes(k.keyword) || k.keyword.includes(clean));
  if (partial) return partial;

  // Keyword heuristic categorizer
  if (clean.includes('chat') || clean.includes('ai') || clean.includes('ask')) {
    return { keyword: query, category: 'AI_CHAT', intent: 'tool', targetRoute: '/ask' };
  }
  if (clean.includes('kundli') || clean.includes('birth') || clean.includes('chart') || clean.includes('dob')) {
    return { keyword: query, category: 'BIRTH_CHART', intent: 'tool', targetRoute: '/birth-chart' };
  }
  if (clean.includes('match') || clean.includes('compat') || clean.includes('synastry') || clean.includes('marriage')) {
    return { keyword: query, category: 'COMPATIBILITY', intent: 'tool', targetRoute: '/compatibility' };
  }
  if (clean.includes('panchang') || clean.includes('tithi') || clean.includes('muhurat')) {
    return { keyword: query, category: 'PANCHANGA', intent: 'tool', targetRoute: '/panchanga' };
  }
  if (clean.includes('transit') || clean.includes('gochar') || clean.includes('retrograde')) {
    return { keyword: query, category: 'TRANSITS', intent: 'tool', targetRoute: '/transits' };
  }
  if (clean.includes('dasha') || clean.includes('mahadasha')) {
    return { keyword: query, category: 'VEDIC_JYOTISH', intent: 'tool', targetRoute: '/dasha' };
  }
  if (clean.includes('house') || clean.includes('bhava')) {
    return { keyword: query, category: 'HOUSES', intent: 'informational', targetRoute: '/learn/astrology-houses' };
  }
  if (clean.includes('nakshatra') || clean.includes('star')) {
    return { keyword: query, category: 'VEDIC_JYOTISH', intent: 'informational', targetRoute: '/learn/nakshatra' };
  }
  if (clean.includes('cartography') || clean.includes('map') || clean.includes('relocation')) {
    return { keyword: query, category: 'WESTERN', intent: 'tool', targetRoute: '/astrocartography' };
  }

  return { keyword: query, category: 'PHILOSOPHY', intent: 'informational', targetRoute: '/methodology' };
}
