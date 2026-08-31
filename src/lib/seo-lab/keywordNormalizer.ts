/**
 * ASTRO360 Keyword Normalization Engine
 * Normalizes case, whitespace, punctuation, Unicode variants, and domain plurals.
 */

export interface NormalizedResult {
  raw: string;
  normalized: string;
  tokens: string[];
  stemmed: string;
  isAstrologyTerm: boolean;
}

// Known domain terms that should not be corrupted by aggressive English stemming
const ASTROLOGY_STEM_EXCEPTIONS: Record<string, string> = {
  'charts': 'chart',
  'kundlis': 'kundli',
  'kundalis': 'kundali',
  'nakshatras': 'nakshatra',
  'dashas': 'dasha',
  'grahas': 'graha',
  'bhavas': 'bhava',
  'rashis': 'rashi',
  'transits': 'transit',
  'horoscopes': 'horoscope',
  'predictions': 'prediction',
  'calculators': 'calculator',
  'remedies': 'remedy',
  'gemstones': 'gemstone',
  'yantras': 'yantra',
  'mantras': 'mantra',
  'houses': 'house',
  'planets': 'planet',
  'aspects': 'aspect',
  'chakras': 'chakra',
  'doshas': 'dosha',
  'muhurtas': 'muhurta',
  'yogas': 'yoga',
  'rudrakshas': 'rudraksha',
  'tarots': 'tarot',
  'synastries': 'synastry',
  'compatibilities': 'compatibility',
  'panchangas': 'panchanga',
  'panchangs': 'panchang',
};

/**
 * Normalizes unicode, strips excess punctuation, collapses whitespace, converts to lowercase.
 */
export function normalizeKeyword(raw: string): string {
  if (!raw || typeof raw !== 'string') return '';

  return raw
    // Unicode normalization (NFKD decomposes accents while preserving characters)
    .normalize('NFKD')
    // Remove emojis and non-alphanumeric/non-spacing characters, keep basic punctuation like hyphens if between words
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
    // Replace punctuation except hyphens and apostrophes with single spaces
    .replace(/[^\w\s\u0900-\u097F\u0600-\u06FF\u4E00-\u9FFF-]/g, ' ')
    // Collapse underscores/dashes to spaces where appropriate
    .replace(/[_\s]+/g, ' ')
    // Lowercase
    .toLowerCase()
    .trim();
}

/**
 * Applies smart domain-aware plural stemming.
 */
export function stemKeyword(normalized: string): string {
  const tokens = normalized.split(/\s+/).filter(Boolean);
  const stemmedTokens = tokens.map(token => {
    if (ASTROLOGY_STEM_EXCEPTIONS[token]) {
      return ASTROLOGY_STEM_EXCEPTIONS[token];
    }
    // Generic English plural stemmer for words ending with 's' or 'es' (length > 3)
    if (token.length > 3 && token.endsWith('ies')) {
      return token.slice(0, -3) + 'y';
    }
    if (token.length > 3 && token.endsWith('es') && !token.endsWith('ses')) {
      return token.slice(0, -2);
    }
    if (token.length > 3 && token.endsWith('s') && !token.endsWith('ss') && !token.endsWith('us') && !token.endsWith('is')) {
      return token.slice(0, -1);
    }
    return token;
  });

  return stemmedTokens.join(' ');
}

/**
 * Full structural analysis of a raw keyword query.
 */
export function processKeywordNormalization(raw: string): NormalizedResult {
  const cleanRaw = (raw || '').trim();
  const normalized = normalizeKeyword(cleanRaw);
  const tokens = normalized.split(/\s+/).filter(Boolean);
  const stemmed = stemKeyword(normalized);

  const isAstrologyTerm = tokens.some(t => 
    Object.keys(ASTROLOGY_STEM_EXCEPTIONS).includes(t) || 
    Object.values(ASTROLOGY_STEM_EXCEPTIONS).includes(t) ||
    ['astrology', 'horoscope', 'zodiac', 'kundli', 'natal', 'vedic', 'sidereal', 'ascendant', 'lagna', 'rahu', 'ketu', 'shani', 'saturn', 'mars', 'jupiter', 'sun', 'moon', 'venus', 'mercury'].includes(t)
  );

  return {
    raw: cleanRaw,
    normalized,
    tokens,
    stemmed,
    isAstrologyTerm
  };
}

/**
 * Deduplicates an array of keywords based on their stemmed representation while keeping the best raw query.
 */
export function deduplicateKeywords<T extends { rawKeyword: string; normalizedKeyword?: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  const results: T[] = [];

  for (const item of items) {
    const norm = item.normalizedKeyword || normalizeKeyword(item.rawKeyword);
    const key = stemKeyword(norm);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    results.push(item);
  }

  return results;
}
