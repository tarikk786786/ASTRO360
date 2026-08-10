/**
 * ASTRO360 Daily Horoscope Engine
 * 
 * Includes:
 * - Aztro API & Horoscope-API data model definitions & integration methods
 * - 12 Zodiac Sign Metadata Registry (Moods, Colors, Lucky Numbers, Lucky Times, Compatibility)
 * - Deterministic Procedural Horoscope Generator (Fallback engine when offline or API un-ready)
 * - Daily, Weekly, and Monthly horoscope generation engines with ratings, advice, and categories
 */

export type SignId =
  | 'aries'
  | 'taurus'
  | 'gemini'
  | 'cancer'
  | 'leo'
  | 'virgo'
  | 'libra'
  | 'scorpio'
  | 'sagittarius'
  | 'capricorn'
  | 'aquarius'
  | 'pisces';

// --- 1. DATA MODELS FOR HOROSCOPE APIS ---

/**
 * Data format returned by aztro API endpoint
 * POST https://aztro.sameerkumar.website/?sign=aries&day=today
 */
export interface AztroHoroscopeResponse {
  date_range: string;
  current_date: string;
  description: string;
  compatibility: string;
  mood: string;
  color: string;
  lucky_number: string;
  lucky_time: string;
}

/**
 * Data format returned by Horoscope-API endpoint
 * GET https://horoscope-api.herokuapp.com/horoscope/today/aries
 */
export interface HoroscopeApiResponse {
  status: number;
  data: {
    date: string;
    horoscope_data: string;
    sun_sign: string;
  };
}

export interface HoroscopeCategoryDetail {
  rating: number; // 1 to 5 stars
  summary: string;
  advice: string;
}

export interface DailyHoroscopeResult {
  sign: SignId;
  date: string;
  summary: string;
  mood: string;
  color: string;
  luckyNumber: number | string;
  luckyTime: string;
  compatibility: SignId;
  categories: {
    general: HoroscopeCategoryDetail;
    love: HoroscopeCategoryDetail;
    career: HoroscopeCategoryDetail;
    finance: HoroscopeCategoryDetail;
    health: HoroscopeCategoryDetail;
  };
  aztroFormat?: AztroHoroscopeResponse;
  source: 'api' | 'procedural_engine';
}

// --- 2. SIGN METADATA REGISTRY ---

export interface SignMetadata {
  id: SignId;
  name: string;
  symbol: string;
  element: string;
  rulingPlanet: string;
  dateRange: string;
  moods: string[];
  colors: string[];
  luckyNumbers: number[];
  luckyTimes: string[];
  compatibleSigns: SignId[];
}

export const SIGN_METADATA: Record<SignId, SignMetadata> = {
  aries: {
    id: 'aries',
    name: 'Aries',
    symbol: '♈',
    element: 'Fire',
    rulingPlanet: 'Mars',
    dateRange: 'Mar 21 - Apr 19',
    moods: ['Enthusiastic', 'Bold', 'Energetic', 'Optimistic', 'Determined'],
    colors: ['Crimson Red', 'Scarlet', 'Gold', 'Amber'],
    luckyNumbers: [1, 9, 18, 27, 36, 45],
    luckyTimes: ['7:00 AM', '11:30 AM', '4:00 PM', '8:15 PM'],
    compatibleSigns: ['leo', 'sagittarius', 'gemini', 'aquarius'],
  },
  taurus: {
    id: 'taurus',
    name: 'Taurus',
    symbol: '♉',
    element: 'Earth',
    rulingPlanet: 'Venus',
    dateRange: 'Apr 20 - May 20',
    moods: ['Serene', 'Grounded', 'Sensual', 'Patient', 'Focused'],
    colors: ['Emerald Green', 'Forest Green', 'Rose Pink', 'Copper'],
    luckyNumbers: [2, 6, 15, 24, 33, 42],
    luckyTimes: ['8:30 AM', '1:00 PM', '5:45 PM', '9:30 PM'],
    compatibleSigns: ['virgo', 'capricorn', 'cancer', 'pisces'],
  },
  gemini: {
    id: 'gemini',
    name: 'Gemini',
    symbol: '♊',
    element: 'Air',
    rulingPlanet: 'Mercury',
    dateRange: 'May 21 - Jun 20',
    moods: ['Curious', 'Witty', 'Adaptable', 'Sociable', 'Lively'],
    colors: ['Bright Yellow', 'Silver', 'Electric Blue', 'Mint'],
    luckyNumbers: [3, 5, 12, 21, 30, 48],
    luckyTimes: ['10:00 AM', '2:15 PM', '6:30 PM', '10:00 PM'],
    compatibleSigns: ['libra', 'aquarius', 'aries', 'leo'],
  },
  cancer: {
    id: 'cancer',
    name: 'Cancer',
    symbol: '♋',
    element: 'Water',
    rulingPlanet: 'Moon',
    dateRange: 'Jun 21 - Jul 22',
    moods: ['Nurturing', 'Intuitive', 'Thoughtful', 'Empathetic', 'Protective'],
    colors: ['Pearl White', 'Silver', 'Sea Green', 'Pale Blue'],
    luckyNumbers: [2, 4, 11, 20, 29, 38],
    luckyTimes: ['6:30 AM', '12:00 PM', '7:15 PM', '11:00 PM'],
    compatibleSigns: ['scorpio', 'pisces', 'taurus', 'virgo'],
  },
  leo: {
    id: 'leo',
    name: 'Leo',
    symbol: '♌',
    element: 'Fire',
    rulingPlanet: 'Sun',
    dateRange: 'Jul 23 - Aug 22',
    moods: ['Radiant', 'Confident', 'Generous', 'Inspiring', 'Charismatic'],
    colors: ['Royal Gold', 'Sun Yellow', 'Orange', 'Purple'],
    luckyNumbers: [1, 5, 19, 23, 37, 52],
    luckyTimes: ['9:00 AM', '1:45 PM', '5:00 PM', '8:45 PM'],
    compatibleSigns: ['aries', 'sagittarius', 'gemini', 'libra'],
  },
  virgo: {
    id: 'virgo',
    name: 'Virgo',
    symbol: '♍',
    element: 'Earth',
    rulingPlanet: 'Mercury',
    dateRange: 'Aug 23 - Sep 22',
    moods: ['Analytical', 'Methodical', 'Harmonious', 'Helpful', 'Discerning'],
    colors: ['Navy Blue', 'Olive Green', 'Beige', 'Taupe'],
    luckyNumbers: [3, 8, 14, 23, 32, 41],
    luckyTimes: ['7:45 AM', '11:15 AM', '3:30 PM', '7:00 PM'],
    compatibleSigns: ['taurus', 'capricorn', 'cancer', 'scorpio'],
  },
  libra: {
    id: 'libra',
    name: 'Libra',
    symbol: '♎',
    element: 'Air',
    rulingPlanet: 'Venus',
    dateRange: 'Sep 23 - Oct 22',
    moods: ['Harmonious', 'Diplomatic', 'Charming', 'Balanced', 'Refined'],
    colors: ['Pastel Pink', 'Sky Blue', 'Ivory', 'Lavender'],
    luckyNumbers: [6, 7, 15, 24, 33, 42],
    luckyTimes: ['10:30 AM', '2:45 PM', '6:00 PM', '9:15 PM'],
    compatibleSigns: ['gemini', 'aquarius', 'leo', 'sagittarius'],
  },
  scorpio: {
    id: 'scorpio',
    name: 'Scorpio',
    symbol: '♏',
    element: 'Water',
    rulingPlanet: 'Pluto / Mars',
    dateRange: 'Oct 23 - Nov 21',
    moods: ['Intense', 'Perceptive', 'Magnetic', 'Passionate', 'Resilient'],
    colors: ['Deep Maroon', 'Midnight Black', 'Burgundy', 'Blood Red'],
    luckyNumbers: [4, 8, 13, 22, 31, 40],
    luckyTimes: ['8:00 AM', '12:30 PM', '8:00 PM', '11:45 PM'],
    compatibleSigns: ['cancer', 'pisces', 'virgo', 'capricorn'],
  },
  sagittarius: {
    id: 'sagittarius',
    name: 'Sagittarius',
    symbol: '♐',
    element: 'Fire',
    rulingPlanet: 'Jupiter',
    dateRange: 'Nov 22 - Dec 21',
    moods: ['Philosophical', 'Adventurous', 'Joyful', 'Optimistic', 'Free-spirited'],
    colors: ['Royal Purple', 'Indigo', 'Dark Blue', 'Magenta'],
    luckyNumbers: [3, 7, 12, 21, 30, 39],
    luckyTimes: ['9:30 AM', '3:00 PM', '6:45 PM', '10:30 PM'],
    compatibleSigns: ['aries', 'leo', 'libra', 'aquarius'],
  },
  capricorn: {
    id: 'capricorn',
    name: 'Capricorn',
    symbol: '♑',
    element: 'Earth',
    rulingPlanet: 'Saturn',
    dateRange: 'Dec 22 - Jan 19',
    moods: ['Ambitious', 'Disciplined', 'Pragmatic', 'Steadfast', 'Patient'],
    colors: ['Charcoal Grey', 'Dark Brown', 'Slate', 'Pine Green'],
    luckyNumbers: [4, 8, 13, 26, 35, 44],
    luckyTimes: ['6:45 AM', '11:00 AM', '4:15 PM', '8:00 PM'],
    compatibleSigns: ['taurus', 'virgo', 'scorpio', 'pisces'],
  },
  aquarius: {
    id: 'aquarius',
    name: 'Aquarius',
    symbol: '♒',
    element: 'Air',
    rulingPlanet: 'Uranus / Saturn',
    dateRange: 'Jan 20 - Feb 18',
    moods: ['Visionary', 'Original', 'Humanitarian', 'Independent', 'Inventive'],
    colors: ['Electric Blue', 'Turquoise', 'Aquamarine', 'Silver'],
    luckyNumbers: [4, 7, 11, 22, 29, 38],
    luckyTimes: ['11:00 AM', '1:30 PM', '7:30 PM', '11:15 PM'],
    compatibleSigns: ['gemini', 'libra', 'aries', 'sagittarius'],
  },
  pisces: {
    id: 'pisces',
    name: 'Pisces',
    symbol: '♓',
    element: 'Water',
    rulingPlanet: 'Neptune / Jupiter',
    dateRange: 'Feb 19 - Mar 20',
    moods: ['Mystical', 'Compassionate', 'Imaginative', 'Dreamy', 'Empathetic'],
    colors: ['Seafoam Green', 'Violet', 'Ocean Blue', 'Aquamarine'],
    luckyNumbers: [3, 7, 12, 16, 25, 34],
    luckyTimes: ['7:15 AM', '12:45 PM', '5:30 PM', '9:45 PM'],
    compatibleSigns: ['cancer', 'scorpio', 'taurus', 'capricorn'],
  },
};

// --- 3. DETERMINISTIC SEEDED RANDOM ENGINE ---

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function seededRandom(seed: number): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function pickRandom<T>(array: T[], randFn: () => number): T {
  const index = Math.floor(randFn() * array.length);
  return array[Math.min(index, array.length - 1)];
}

// --- 4. PROCEDURAL HOROSCOPE TEXT GENERATOR ---

const GENERAL_THEMES = [
  'Cosmic energy aligns today to amplify your innate intuition and personal magnetism.',
  'A powerful planetary aspect brings clarity to long-standing dilemmas.',
  'Focus on internal balance; harmony in your thoughts will manifest in your surroundings.',
  'Surprising news or an unexpected invitation opens up new horizons.',
  'The celestial alignment highlights your creative focus and sharp determination.',
  'Take time to reflect before taking swift action; patience will yield rich rewards.',
  'An uplifting wave of planetary harmony encourages deep personal expansion.',
];

const LOVE_SUMMARIES = [
  'Venus radiates warmth in your relationship sector, enhancing emotional closeness.',
  'Open, honest conversation unlocks deeper trust and mutual affection.',
  'Single signs may feel a subtle spark with someone from an unexpected circle.',
  'Passion and tenderness balance gracefully today, creating memorable moments.',
  'Nurture your self-love first; authentic confidence draws supportive energy toward you.',
];

const CAREER_SUMMARIES = [
  'Mercury enhances your strategic communication and problem-solving sharpness.',
  'Your innovative ideas find receptive ears among mentors and key collaborators.',
  'Focus on completing priority tasks; methodical discipline builds long-term success.',
  'A leadership opportunity arises, asking you to step into your authentic authority.',
  'Collaborative projects flourish when you blend creative vision with practical steps.',
];

const FINANCE_SUMMARIES = [
  'Financial prudence today creates a strong foundation for future investments.',
  'An unexpected idea or resource management tip brings beneficial cost savings.',
  'Avoid impulsive purchases; focus on long-term wealth building and security.',
  'A favorable aspect suggests positive news regarding contracts or shared assets.',
  'Review budgets with a fresh eye; subtle adjustments yield significant gains.',
];

const HEALTH_SUMMARIES = [
  'Vitality is strong! Engage in refreshing outdoor movement or mindful exercise.',
  'Prioritize restful sleep and deep hydration to keep your nervous system calm.',
  'Mind-body awareness is key today; gentle stretching or meditation restores energy.',
  'Listen to your body’s signals; balance energetic outputs with quiet downtime.',
  'Nutrition and grounding activities will help maintain steady focus throughout the day.',
];

/**
 * Generates a full, high-quality, deterministic daily horoscope for a sign and date.
 */
export function generateDailyHoroscope(
  sign: SignId,
  dateStr?: string
): DailyHoroscopeResult {
  const todayIso = dateStr || new Date().toISOString().split('T')[0];
  const seed = hashString(`${sign}-${todayIso}`);
  const rng = seededRandom(seed);

  const meta = SIGN_METADATA[sign];

  const mood = pickRandom(meta.moods, rng);
  const color = pickRandom(meta.colors, rng);
  const luckyNumber = pickRandom(meta.luckyNumbers, rng);
  const luckyTime = pickRandom(meta.luckyTimes, rng);
  const compatibility = pickRandom(meta.compatibleSigns, rng);

  const genTheme = pickRandom(GENERAL_THEMES, rng);

  const loveSummary = pickRandom(LOVE_SUMMARIES, rng);
  const loveRating = Math.floor(rng() * 3) + 3; // 3..5 stars

  const careerSummary = pickRandom(CAREER_SUMMARIES, rng);
  const careerRating = Math.floor(rng() * 3) + 3;

  const financeSummary = pickRandom(FINANCE_SUMMARIES, rng);
  const financeRating = Math.floor(rng() * 3) + 3;

  const healthSummary = pickRandom(HEALTH_SUMMARIES, rng);
  const healthRating = Math.floor(rng() * 3) + 3;

  const generalRating = Math.round((loveRating + careerRating + financeRating + healthRating) / 4);

  const summaryText = `${meta.name} Daily Outlook for ${todayIso}: ${genTheme} Expect strong harmony in your ${meta.element.toLowerCase()} element transits today.`;

  const aztroFormat: AztroHoroscopeResponse = {
    date_range: meta.dateRange,
    current_date: todayIso,
    description: summaryText,
    compatibility: SIGN_METADATA[compatibility].name,
    mood,
    color,
    lucky_number: String(luckyNumber),
    lucky_time: luckyTime,
  };

  return {
    sign,
    date: todayIso,
    summary: summaryText,
    mood,
    color,
    luckyNumber,
    luckyTime,
    compatibility,
    categories: {
      general: {
        rating: generalRating,
        summary: genTheme,
        advice: 'Trust the natural rhythm of events today. Stay grounded and receptive.',
      },
      love: {
        rating: loveRating,
        summary: loveSummary,
        advice: 'Express feelings with warmth and clarity.',
      },
      career: {
        rating: careerRating,
        summary: careerSummary,
        advice: 'Focus on strategic execution and clear communication.',
      },
      finance: {
        rating: financeRating,
        summary: financeSummary,
        advice: 'Evaluate long-term value before committing resources.',
      },
      health: {
        rating: healthRating,
        summary: healthSummary,
        advice: 'Maintain a balance between physical activity and restorative rest.',
      },
    },
    aztroFormat,
    source: 'procedural_engine',
  };
}

// --- 5. API FETCH INTEGRATIONS ---

/**
 * Attempts to fetch daily horoscope from aztro API.
 * Falls back to procedural generator if network request fails or times out.
 */
export async function fetchAztroHoroscope(
  sign: SignId,
  day: 'today' | 'yesterday' | 'tomorrow' = 'today'
): Promise<AztroHoroscopeResponse> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(`https://aztro.sameerkumar.website/?sign=${sign}&day=${day}`, {
      method: 'POST',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Aztro API error status: ${response.status}`);
    }

    const data: AztroHoroscopeResponse = await response.json();
    return data;
  } catch (err) {
    // Fallback to procedural generator in aztro format
    const proc = generateDailyHoroscope(sign);
    return proc.aztroFormat!;
  }
}

/**
 * Attempts to fetch daily horoscope from Horoscope-API.
 * Falls back to procedural generator if network request fails.
 */
export async function fetchHoroscopeApi(
  sign: SignId,
  day: 'today' | 'yesterday' | 'tomorrow' = 'today'
): Promise<HoroscopeApiResponse> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(`https://horoscope-api.herokuapp.com/horoscope/${day}/${sign}`, {
      method: 'GET',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Horoscope API error status: ${response.status}`);
    }

    const data: HoroscopeApiResponse = await response.json();
    return data;
  } catch (err) {
    const proc = generateDailyHoroscope(sign);
    return {
      status: 200,
      data: {
        date: proc.date,
        horoscope_data: proc.summary,
        sun_sign: sign,
      },
    };
  }
}

/**
 * Main engine entry point: Gets comprehensive daily horoscope for a sign.
 */
export async function getDailyHoroscope(
  sign: SignId,
  dateStr?: string,
  options?: { forceProcedural?: boolean }
): Promise<DailyHoroscopeResult> {
  if (options?.forceProcedural) {
    return generateDailyHoroscope(sign, dateStr);
  }

  try {
    const aztroData = await fetchAztroHoroscope(sign);
    const proc = generateDailyHoroscope(sign, dateStr);
    
    // Merge aztro live data into result if available
    return {
      ...proc,
      summary: aztroData.description || proc.summary,
      mood: aztroData.mood || proc.mood,
      color: aztroData.color || proc.color,
      luckyNumber: aztroData.lucky_number || proc.luckyNumber,
      luckyTime: aztroData.lucky_time || proc.luckyTime,
      aztroFormat: aztroData,
      source: 'api',
    };
  } catch {
    return generateDailyHoroscope(sign, dateStr);
  }
}

/**
 * Generates Weekly Horoscope summary for a sign.
 */
export function getWeeklyHoroscope(
  sign: SignId,
  startDateStr?: string
): {
  sign: SignId;
  startDate: string;
  focusTheme: string;
  weeklyAdvice: string;
  bestDayOfWeek: string;
  dailyBreakdown: Record<string, DailyHoroscopeResult>;
} {
  const meta = SIGN_METADATA[sign];
  const start = startDateStr ? new Date(startDateStr) : new Date();

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dailyBreakdown: Record<string, DailyHoroscopeResult> = {};

  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const iso = d.toISOString().split('T')[0];
    const dayName = days[d.getDay()];
    dailyBreakdown[dayName] = generateDailyHoroscope(sign, iso);
  }

  const seed = hashString(`${sign}-weekly-${start.toISOString().split('T')[0]}`);
  const rng = seededRandom(seed);
  const bestDay = days[Math.floor(rng() * 7)];

  return {
    sign,
    startDate: start.toISOString().split('T')[0],
    focusTheme: `Weekly Theme for ${meta.name}: Expansive growth in key partnerships and personal goals.`,
    weeklyAdvice: `Capitalize on high energy on ${bestDay}. Keep communication clear and practical.`,
    bestDayOfWeek: bestDay,
    dailyBreakdown,
  };
}

/**
 * Generates Monthly Horoscope summary for a sign.
 */
export function getMonthlyHoroscope(
  sign: SignId,
  yearMonthStr?: string
): {
  sign: SignId;
  month: string;
  overview: string;
  keyTransits: string[];
  luckyDays: number[];
  challenges: string;
} {
  const meta = SIGN_METADATA[sign];
  const ym = yearMonthStr || new Date().toISOString().slice(0, 7);
  const seed = hashString(`${sign}-monthly-${ym}`);
  const rng = seededRandom(seed);

  const luckyDays = [
    Math.floor(rng() * 10) + 1,
    Math.floor(rng() * 10) + 11,
    Math.floor(rng() * 10) + 21,
  ].sort((a, b) => a - b);

  return {
    sign,
    month: ym,
    overview: `${meta.name} Monthly Outlook (${ym}): ${meta.rulingPlanet} brings significant opportunity in career and personal mastery.`,
    keyTransits: [
      `New Moon in your element on day ${luckyDays[0]} opening fresh doors.`,
      `Full Moon illumination around day ${luckyDays[1]} highlighting emotional balance.`,
      `${meta.rulingPlanet} harmonious aspect on day ${luckyDays[2]}.`,
    ],
    luckyDays,
    challenges: 'Balancing intense personal drive with collaborative patience.',
  };
}

/**
 * Returns sign metadata.
 */
export function getSignMetadata(sign: SignId): SignMetadata {
  return SIGN_METADATA[sign];
}
