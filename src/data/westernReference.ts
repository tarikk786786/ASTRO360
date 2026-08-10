/**
 * ASTRO360 Western Astrology Reference Data & Engine
 * 
 * Includes comprehensive reference data for:
 * - 12 Zodiac Signs with traditional & modern rulers, dignities, & body parts
 * - Elements & Modalities with triplicities and qualities
 * - Essential Dignities (Ptolemaic / Egyptian Terms, Decans / Faces)
 * - Aspect Orbs & Rules (Major & Minor aspects, applying/separating detection)
 * - Fixed Stars Catalog (50+ major stars with J2000 & current epoch longitudes, magnitudes, & planetary natures)
 */

export type ZodiacSignId =
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

export type WesternElement = 'fire' | 'earth' | 'air' | 'water';
export type WesternModality = 'cardinal' | 'fixed' | 'mutable';

export type WesternPlanet =
  | 'sun'
  | 'moon'
  | 'mercury'
  | 'venus'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune'
  | 'pluto';

// --- 1. ZODIAC SIGNS ---

export interface ZodiacSign {
  id: ZodiacSignId;
  name: string;
  symbol: string;
  element: WesternElement;
  modality: WesternModality;
  traditionalRuler: WesternPlanet;
  modernRuler: WesternPlanet;
  detriment: WesternPlanet[];
  exaltation: WesternPlanet | null;
  exaltationDegree: number | null;
  fall: WesternPlanet | null;
  fallDegree: number | null;
  startDate: string; // e.g. "Mar 21"
  endDate: string;   // e.g. "Apr 19"
  keyPhrase: string;
  keywords: string[];
  bodyPart: string;
  startDegree: number; // 0, 30, 60...
  endDegree: number;
}

export const WESTERN_SIGNS: Record<ZodiacSignId, ZodiacSign> = {
  aries: {
    id: 'aries',
    name: 'Aries',
    symbol: '♈',
    element: 'fire',
    modality: 'cardinal',
    traditionalRuler: 'mars',
    modernRuler: 'mars',
    detriment: ['venus'],
    exaltation: 'sun',
    exaltationDegree: 19,
    fall: 'saturn',
    fallDegree: 21,
    startDate: 'March 21',
    endDate: 'April 19',
    keyPhrase: 'I am',
    keywords: ['Initiating', 'Courageous', 'Pioneering', 'Assertive', 'Impulsive'],
    bodyPart: 'Head, Face, Brain',
    startDegree: 0,
    endDegree: 30,
  },
  taurus: {
    id: 'taurus',
    name: 'Taurus',
    symbol: '♉',
    element: 'earth',
    modality: 'fixed',
    traditionalRuler: 'venus',
    modernRuler: 'venus',
    detriment: ['mars', 'pluto'],
    exaltation: 'moon',
    exaltationDegree: 3,
    fall: 'uranus',
    fallDegree: 3,
    startDate: 'April 20',
    endDate: 'May 20',
    keyPhrase: 'I have',
    keywords: ['Patient', 'Determined', 'Sensual', 'Grounded', 'Persistent'],
    bodyPart: 'Neck, Throat, Vocal Cords',
    startDegree: 30,
    endDegree: 60,
  },
  gemini: {
    id: 'gemini',
    name: 'Gemini',
    symbol: '♊',
    element: 'air',
    modality: 'mutable',
    traditionalRuler: 'mercury',
    modernRuler: 'mercury',
    detriment: ['jupiter'],
    exaltation: NorthNodeRuler('gemini'),
    exaltationDegree: 3,
    fall: SouthNodeRuler('gemini'),
    fallDegree: 3,
    startDate: 'May 21',
    endDate: 'June 20',
    keyPhrase: 'I think',
    keywords: ['Curious', 'Adaptable', 'Expressive', 'Intellectual', 'Versatile'],
    bodyPart: 'Shoulders, Arms, Hands, Lungs',
    startDegree: 60,
    endDegree: 90,
  },
  cancer: {
    id: 'cancer',
    name: 'Cancer',
    symbol: '♋',
    element: 'water',
    modality: 'cardinal',
    traditionalRuler: 'moon',
    modernRuler: 'moon',
    detriment: ['saturn'],
    exaltation: 'jupiter',
    exaltationDegree: 15,
    fall: 'mars',
    fallDegree: 28,
    startDate: 'June 21',
    endDate: 'July 22',
    keyPhrase: 'I feel',
    keywords: ['Nurturing', 'Intuitive', 'Protective', 'Empathetic', 'Sentimental'],
    bodyPart: 'Chest, Breast, Stomach',
    startDegree: 90,
    endDegree: 120,
  },
  leo: {
    id: 'leo',
    name: 'Leo',
    symbol: '♌',
    element: 'fire',
    modality: 'fixed',
    traditionalRuler: 'sun',
    modernRuler: 'sun',
    detriment: ['saturn', 'uranus'],
    exaltation: null,
    exaltationDegree: null,
    fall: null,
    fallDegree: null,
    startDate: 'July 23',
    endDate: 'August 22',
    keyPhrase: 'I will',
    keywords: ['Creative', 'Charismatic', 'Generous', 'Proud', 'Expressive'],
    bodyPart: 'Heart, Spine, Upper Back',
    startDegree: 120,
    endDegree: 150,
  },
  virgo: {
    id: 'virgo',
    name: 'Virgo',
    symbol: '♍',
    element: 'earth',
    modality: 'mutable',
    traditionalRuler: 'mercury',
    modernRuler: 'mercury',
    detriment: ['jupiter', 'neptune'],
    exaltation: 'mercury',
    exaltationDegree: 15,
    fall: 'venus',
    fallDegree: 27,
    startDate: 'August 23',
    endDate: 'September 22',
    keyPhrase: 'I analyze',
    keywords: ['Analytical', 'Meticulous', 'Service-oriented', 'Practical', 'Refined'],
    bodyPart: 'Abdomen, Digestive System',
    startDegree: 150,
    endDegree: 180,
  },
  libra: {
    id: 'libra',
    name: 'Libra',
    symbol: '♎',
    element: 'air',
    modality: 'cardinal',
    traditionalRuler: 'venus',
    modernRuler: 'venus',
    detriment: ['mars'],
    exaltation: 'saturn',
    exaltationDegree: 21,
    fall: 'sun',
    fallDegree: 19,
    startDate: 'September 23',
    endDate: 'October 22',
    keyPhrase: 'I balance',
    keywords: ['Harmonious', 'Diplomatic', 'Aesthetic', 'Fair-minded', 'Social'],
    bodyPart: 'Kidneys, Lower Back, Adrenals',
    startDegree: 180,
    endDegree: 210,
  },
  scorpio: {
    id: 'scorpio',
    name: 'Scorpio',
    symbol: '♏',
    element: 'water',
    modality: 'fixed',
    traditionalRuler: 'mars',
    modernRuler: 'pluto',
    detriment: ['venus'],
    exaltation: 'uranus',
    exaltationDegree: 3,
    fall: 'moon',
    fallDegree: 3,
    startDate: 'October 23',
    endDate: 'November 21',
    keyPhrase: 'I desire',
    keywords: ['Intense', 'Transformative', 'Perceptive', 'Magnetic', 'Resilient'],
    bodyPart: 'Reproductive System, Excretory Organs',
    startDegree: 210,
    endDegree: 240,
  },
  sagittarius: {
    id: 'sagittarius',
    name: 'Sagittarius',
    symbol: '♐',
    element: 'fire',
    modality: 'mutable',
    traditionalRuler: 'jupiter',
    modernRuler: 'jupiter',
    detriment: ['mercury'],
    exaltation: null,
    exaltationDegree: null,
    fall: null,
    fallDegree: null,
    startDate: 'November 22',
    endDate: 'December 21',
    keyPhrase: 'I perceive',
    keywords: ['Philosophical', 'Adventurous', 'Optimistic', 'Truth-seeking', 'Expansive'],
    bodyPart: 'Hips, Thighs, Sciatic Nerve',
    startDegree: 240,
    endDegree: 270,
  },
  capricorn: {
    id: 'capricorn',
    name: 'Capricorn',
    symbol: '♑',
    element: 'earth',
    modality: 'cardinal',
    traditionalRuler: 'saturn',
    modernRuler: 'saturn',
    detriment: ['moon'],
    exaltation: 'mars',
    exaltationDegree: 28,
    fall: 'jupiter',
    fallDegree: 15,
    startDate: 'December 22',
    endDate: 'January 19',
    keyPhrase: 'I use',
    keywords: ['Ambitious', 'Disciplined', 'Structured', 'Pragmatic', 'Enduring'],
    bodyPart: 'Knees, Joints, Bones, Skin',
    startDegree: 270,
    endDegree: 300,
  },
  aquarius: {
    id: 'aquarius',
    name: 'Aquarius',
    symbol: '♒',
    element: 'air',
    modality: 'fixed',
    traditionalRuler: 'saturn',
    modernRuler: 'uranus',
    detriment: ['sun'],
    exaltation: null,
    exaltationDegree: null,
    fall: null,
    fallDegree: null,
    startDate: 'January 20',
    endDate: 'February 18',
    keyPhrase: 'I know',
    keywords: ['Innovative', 'Humanitarian', 'Independent', 'Visionary', 'Unconventional'],
    bodyPart: 'Shins, Ankles, Circulatory System',
    startDegree: 300,
    endDegree: 330,
  },
  pisces: {
    id: 'pisces',
    name: 'Pisces',
    symbol: '♓',
    element: 'water',
    modality: 'mutable',
    traditionalRuler: 'jupiter',
    modernRuler: 'neptune',
    detriment: ['mercury'],
    exaltation: 'venus',
    exaltationDegree: 27,
    fall: 'mercury',
    fallDegree: 15,
    startDate: 'February 19',
    endDate: 'March 20',
    keyPhrase: 'I believe',
    keywords: ['Compassionate', 'Mystical', 'Imaginative', 'Transcendent', 'Empathetic'],
    bodyPart: 'Feet, Toes, Immune System',
    startDegree: 330,
    endDegree: 360,
  },
};

function NorthNodeRuler(sign: string): WesternPlanet | null {
  return null;
}
function SouthNodeRuler(sign: string): WesternPlanet | null {
  return null;
}

// --- 2. ELEMENTS & MODALITIES ---

export interface ElementInfo {
  element: WesternElement;
  quality: string; // e.g. "Hot & Dry"
  triplicityRulers: {
    day: WesternPlanet;
    night: WesternPlanet;
    participating: WesternPlanet;
  };
  keywords: string[];
}

export const ELEMENTS: Record<WesternElement, ElementInfo> = {
  fire: {
    element: 'fire',
    quality: 'Hot & Dry',
    triplicityRulers: { day: 'sun', night: 'jupiter', participating: 'saturn' },
    keywords: ['Inspiration', 'Energy', 'Passion', 'Action', 'Enthusiasm'],
  },
  earth: {
    element: 'earth',
    quality: 'Cold & Dry',
    triplicityRulers: { day: 'venus', night: 'moon', participating: 'mars' },
    keywords: ['Form', 'Stability', 'Practicality', 'Sensory Realism', 'Structure'],
  },
  air: {
    element: 'air',
    quality: 'Hot & Moist',
    triplicityRulers: { day: 'saturn', night: 'mercury', participating: 'jupiter' },
    keywords: ['Intellect', 'Communication', 'Social Connection', 'Abstraction', 'Ideas'],
  },
  water: {
    element: 'water',
    quality: 'Cold & Moist',
    triplicityRulers: { day: 'venus', night: 'mars', participating: 'moon' },
    keywords: ['Emotion', 'Intuition', 'Psychic Sensitivity', 'Empathy', 'Depth'],
  },
};

// --- 3. ESSENTIAL DIGNITIES (EGYPTIAN TERMS & DECANS/FACES) ---

export interface EgyptianTerm {
  planet: WesternPlanet;
  endDegree: number; // Upper limit of degree range (e.g. 6 means 0°..6°)
}

export const EGYPTIAN_TERMS: Record<ZodiacSignId, EgyptianTerm[]> = {
  aries: [
    { planet: 'jupiter', endDegree: 6 },
    { planet: 'venus', endDegree: 12 },
    { planet: 'mercury', endDegree: 20 },
    { planet: 'mars', endDegree: 25 },
    { planet: 'saturn', endDegree: 30 },
  ],
  taurus: [
    { planet: 'venus', endDegree: 8 },
    { planet: 'mercury', endDegree: 14 },
    { planet: 'jupiter', endDegree: 22 },
    { planet: 'saturn', endDegree: 27 },
    { planet: 'mars', endDegree: 30 },
  ],
  gemini: [
    { planet: 'mercury', endDegree: 6 },
    { planet: 'jupiter', endDegree: 12 },
    { planet: 'venus', endDegree: 17 },
    { planet: 'mars', endDegree: 24 },
    { planet: 'saturn', endDegree: 30 },
  ],
  cancer: [
    { planet: 'mars', endDegree: 7 },
    { planet: 'venus', endDegree: 13 },
    { planet: 'mercury', endDegree: 19 },
    { planet: 'jupiter', endDegree: 26 },
    { planet: 'saturn', endDegree: 30 },
  ],
  leo: [
    { planet: 'jupiter', endDegree: 6 },
    { planet: 'venus', endDegree: 11 },
    { planet: 'saturn', endDegree: 18 },
    { planet: 'mercury', endDegree: 24 },
    { planet: 'mars', endDegree: 30 },
  ],
  virgo: [
    { planet: 'mercury', endDegree: 7 },
    { planet: 'venus', endDegree: 17 },
    { planet: 'jupiter', endDegree: 21 },
    { planet: 'mars', endDegree: 28 },
    { planet: 'saturn', endDegree: 30 },
  ],
  libra: [
    { planet: 'saturn', endDegree: 6 },
    { planet: 'mercury', endDegree: 14 },
    { planet: 'jupiter', endDegree: 21 },
    { planet: 'venus', endDegree: 28 },
    { planet: 'mars', endDegree: 30 },
  ],
  scorpio: [
    { planet: 'mars', endDegree: 7 },
    { planet: 'venus', endDegree: 11 },
    { planet: 'mercury', endDegree: 19 },
    { planet: 'jupiter', endDegree: 24 },
    { planet: 'saturn', endDegree: 30 },
  ],
  sagittarius: [
    { planet: 'jupiter', endDegree: 12 },
    { planet: 'venus', endDegree: 17 },
    { planet: 'mercury', endDegree: 21 },
    { planet: 'saturn', endDegree: 26 },
    { planet: 'mars', endDegree: 30 },
  ],
  capricorn: [
    { planet: 'mercury', endDegree: 7 },
    { planet: 'jupiter', endDegree: 14 },
    { planet: 'venus', endDegree: 22 },
    { planet: 'saturn', endDegree: 26 },
    { planet: 'mars', endDegree: 30 },
  ],
  aquarius: [
    { planet: 'saturn', endDegree: 7 },
    { planet: 'mercury', endDegree: 13 },
    { planet: 'venus', endDegree: 20 },
    { planet: 'jupiter', endDegree: 25 },
    { planet: 'mars', endDegree: 30 },
  ],
  pisces: [
    { planet: 'venus', endDegree: 12 },
    { planet: 'jupiter', endDegree: 16 },
    { planet: 'mercury', endDegree: 19 },
    { planet: 'mars', endDegree: 28 },
    { planet: 'saturn', endDegree: 30 },
  ],
};

export interface Decan {
  decanNumber: 1 | 2 | 3;
  startDegree: number; // 0, 10, 20
  endDegree: number;   // 10, 20, 30
  chaldeanRuler: WesternPlanet;
  triplicityRuler: WesternPlanet;
  keywords: string;
}

export const DECANS: Record<ZodiacSignId, Decan[]> = {
  aries: [
    { decanNumber: 1, startDegree: 0, endDegree: 10, chaldeanRuler: 'mars', triplicityRuler: 'mars', keywords: 'Activity & Action' },
    { decanNumber: 2, startDegree: 10, endDegree: 20, chaldeanRuler: 'sun', triplicityRuler: 'sun', keywords: 'Noble Ambition' },
    { decanNumber: 3, startDegree: 20, endDegree: 30, chaldeanRuler: 'venus', triplicityRuler: 'jupiter', keywords: 'Restless Passion' },
  ],
  taurus: [
    { decanNumber: 1, startDegree: 0, endDegree: 10, chaldeanRuler: 'mercury', triplicityRuler: 'venus', keywords: 'Determined Effort' },
    { decanNumber: 2, startDegree: 10, endDegree: 20, chaldeanRuler: 'moon', triplicityRuler: 'mercury', keywords: 'Sensual Cultivation' },
    { decanNumber: 3, startDegree: 20, endDegree: 30, chaldeanRuler: 'saturn', triplicityRuler: 'saturn', keywords: 'Mastery & Endurance' },
  ],
  gemini: [
    { decanNumber: 1, startDegree: 0, endDegree: 10, chaldeanRuler: 'jupiter', triplicityRuler: 'mercury', keywords: 'Intellectual Synthesis' },
    { decanNumber: 2, startDegree: 10, endDegree: 20, chaldeanRuler: 'mars', triplicityRuler: 'venus', keywords: 'Curious Exploration' },
    { decanNumber: 3, startDegree: 20, endDegree: 30, chaldeanRuler: 'sun', triplicityRuler: 'uranus', keywords: 'Original Communication' },
  ],
  cancer: [
    { decanNumber: 1, startDegree: 0, endDegree: 10, chaldeanRuler: 'venus', triplicityRuler: 'moon', keywords: 'Receptive Sentiment' },
    { decanNumber: 2, startDegree: 10, endDegree: 20, chaldeanRuler: 'mercury', triplicityRuler: 'pluto', keywords: 'Intensity of Feeling' },
    { decanNumber: 3, startDegree: 20, endDegree: 30, chaldeanRuler: 'moon', triplicityRuler: 'neptune', keywords: 'Transcendent Empathy' },
  ],
  leo: [
    { decanNumber: 1, startDegree: 0, endDegree: 10, chaldeanRuler: 'saturn', triplicityRuler: 'sun', keywords: 'Sovereign Self-Assertion' },
    { decanNumber: 2, startDegree: 10, endDegree: 20, chaldeanRuler: 'jupiter', triplicityRuler: 'jupiter', keywords: 'Magnanimous Expression' },
    { decanNumber: 3, startDegree: 20, endDegree: 30, chaldeanRuler: 'mars', triplicityRuler: 'mars', keywords: 'Dramatic Courage' },
  ],
  virgo: [
    { decanNumber: 1, startDegree: 0, endDegree: 10, chaldeanRuler: 'sun', triplicityRuler: 'mercury', keywords: 'Pragmatic Discernment' },
    { decanNumber: 2, startDegree: 10, endDegree: 20, chaldeanRuler: 'venus', triplicityRuler: 'saturn', keywords: 'Craftsmanship & Order' },
    { decanNumber: 3, startDegree: 20, endDegree: 30, chaldeanRuler: 'mercury', triplicityRuler: 'venus', keywords: 'Analytical Perfection' },
  ],
  libra: [
    { decanNumber: 1, startDegree: 0, endDegree: 10, chaldeanRuler: 'moon', triplicityRuler: 'venus', keywords: 'Idealized Harmony' },
    { decanNumber: 2, startDegree: 10, endDegree: 20, chaldeanRuler: 'saturn', triplicityRuler: 'uranus', keywords: 'Equitable Justice' },
    { decanNumber: 3, startDegree: 20, endDegree: 30, chaldeanRuler: 'jupiter', triplicityRuler: 'mercury', keywords: 'Intellectual Balance' },
  ],
  scorpio: [
    { decanNumber: 1, startDegree: 0, endDegree: 10, chaldeanRuler: 'mars', triplicityRuler: 'pluto', keywords: 'Unyielding Will' },
    { decanNumber: 2, startDegree: 10, endDegree: 20, chaldeanRuler: 'sun', triplicityRuler: 'neptune', keywords: 'Alchemy of Desire' },
    { decanNumber: 3, startDegree: 20, endDegree: 30, chaldeanRuler: 'venus', triplicityRuler: 'moon', keywords: 'Sensual Metamorphosis' },
  ],
  sagittarius: [
    { decanNumber: 1, startDegree: 0, endDegree: 10, chaldeanRuler: 'mercury', triplicityRuler: 'jupiter', keywords: 'Philosophical Zeal' },
    { decanNumber: 2, startDegree: 10, endDegree: 20, chaldeanRuler: 'moon', triplicityRuler: 'mars', keywords: 'Heroic Quest' },
    { decanNumber: 3, startDegree: 20, endDegree: 30, chaldeanRuler: 'saturn', triplicityRuler: 'sun', keywords: 'Illuminated Vision' },
  ],
  capricorn: [
    { decanNumber: 1, startDegree: 0, endDegree: 10, chaldeanRuler: 'jupiter', triplicityRuler: 'saturn', keywords: 'Disciplined Resolve' },
    { decanNumber: 2, startDegree: 10, endDegree: 20, chaldeanRuler: 'mars', triplicityRuler: 'venus', keywords: 'Resourceful Ambition' },
    { decanNumber: 3, startDegree: 20, endDegree: 30, chaldeanRuler: 'sun', triplicityRuler: 'mercury', keywords: 'Enduring Legacy' },
  ],
  aquarius: [
    { decanNumber: 1, startDegree: 0, endDegree: 10, chaldeanRuler: 'venus', triplicityRuler: 'uranus', keywords: 'Radical Originality' },
    { decanNumber: 2, startDegree: 10, endDegree: 20, chaldeanRuler: 'mercury', triplicityRuler: 'mercury', keywords: 'Universal Intellect' },
    { decanNumber: 3, startDegree: 20, endDegree: 30, chaldeanRuler: 'moon', triplicityRuler: 'venus', keywords: 'Humanitarian Ideal' },
  ],
  pisces: [
    { decanNumber: 1, startDegree: 0, endDegree: 10, chaldeanRuler: 'saturn', triplicityRuler: 'neptune', keywords: 'Mystic Absorption' },
    { decanNumber: 2, startDegree: 10, endDegree: 20, chaldeanRuler: 'jupiter', triplicityRuler: 'moon', keywords: 'Poetic Intuition' },
    { decanNumber: 3, startDegree: 20, endDegree: 30, chaldeanRuler: 'mars', triplicityRuler: 'pluto', keywords: 'Cosmic Dissolution' },
  ],
};

// --- 4. ASPECT ORBS & DEFINITIONS ---

export type AspectName =
  | 'conjunction'
  | 'semi-sextile'
  | 'semi-square'
  | 'sextile'
  | 'quintile'
  | 'square'
  | 'trine'
  | 'sesquiquadrate'
  | 'biquintile'
  | 'quincunx'
  | 'opposition';

export interface AspectRule {
  name: AspectName;
  symbol: string;
  angle: number;           // Target angle in degrees (0, 60, 90, etc.)
  orbDefault: number;      // Default orb in degrees
  orbSunMoon: number;      // Wider orb allowed when Sun or Moon involved
  orbMinor: number;        // Narrow orb for minor planets
  nature: 'major' | 'minor';
  quality: 'soft' | 'hard' | 'neutral';
  harmonicNumber: number;
}

export const ASPECT_RULES: Record<AspectName, AspectRule> = {
  conjunction: {
    name: 'conjunction',
    symbol: '☌',
    angle: 0,
    orbDefault: 8,
    orbSunMoon: 10,
    orbMinor: 6,
    nature: 'major',
    quality: 'neutral',
    harmonicNumber: 1,
  },
  'semi-sextile': {
    name: 'semi-sextile',
    symbol: '⚺',
    angle: 30,
    orbDefault: 2,
    orbSunMoon: 3,
    orbMinor: 1.5,
    nature: 'minor',
    quality: 'neutral',
    harmonicNumber: 12,
  },
  'semi-square': {
    name: 'semi-square',
    symbol: 'angle',
    angle: 45,
    orbDefault: 2.5,
    orbSunMoon: 3.5,
    orbMinor: 2,
    nature: 'minor',
    quality: 'hard',
    harmonicNumber: 8,
  },
  sextile: {
    name: 'sextile',
    symbol: '⚹',
    angle: 60,
    orbDefault: 6,
    orbSunMoon: 8,
    orbMinor: 4,
    nature: 'major',
    quality: 'soft',
    harmonicNumber: 6,
  },
  quintile: {
    name: 'quintile',
    symbol: 'Q',
    angle: 72,
    orbDefault: 2,
    orbSunMoon: 3,
    orbMinor: 1.5,
    nature: 'minor',
    quality: 'soft',
    harmonicNumber: 5,
  },
  square: {
    name: 'square',
    symbol: '□',
    angle: 90,
    orbDefault: 7,
    orbSunMoon: 9,
    orbMinor: 5,
    nature: 'major',
    quality: 'hard',
    harmonicNumber: 4,
  },
  trine: {
    name: 'trine',
    symbol: '△',
    angle: 120,
    orbDefault: 8,
    orbSunMoon: 10,
    orbMinor: 6,
    nature: 'major',
    quality: 'soft',
    harmonicNumber: 3,
  },
  sesquiquadrate: {
    name: 'sesquiquadrate',
    symbol: '⚼',
    angle: 135,
    orbDefault: 2.5,
    orbSunMoon: 3.5,
    orbMinor: 2,
    nature: 'minor',
    quality: 'hard',
    harmonicNumber: 8,
  },
  biquintile: {
    name: 'biquintile',
    symbol: 'bQ',
    angle: 144,
    orbDefault: 2,
    orbSunMoon: 3,
    orbMinor: 1.5,
    nature: 'minor',
    quality: 'soft',
    harmonicNumber: 5,
  },
  quincunx: {
    name: 'quincunx',
    symbol: '⚻',
    angle: 150,
    orbDefault: 3,
    orbSunMoon: 4,
    orbMinor: 2.5,
    nature: 'minor',
    quality: 'hard',
    harmonicNumber: 12,
  },
  opposition: {
    name: 'opposition',
    symbol: '☍',
    angle: 180,
    orbDefault: 8,
    orbSunMoon: 10,
    orbMinor: 6,
    nature: 'major',
    quality: 'hard',
    harmonicNumber: 2,
  },
};

// --- 5. FIXED STARS CATALOG (50+ STARS) ---

export interface FixedStar {
  id: string;
  name: string;
  constellation: string;
  longitudeJ2000: number; // Tropical Ecliptic Longitude in J2000.0 (degrees 0..360)
  longitude2026: number;  // Precessed Ecliptic Longitude for 2026.0 (+0.363° precession)
  latitude: number;       // Ecliptic Latitude in degrees
  magnitude: number;      // Visual Magnitude
  spectralClass: string;
  planetaryNature: WesternPlanet[];
  keywords: string[];
  description: string;
}

// 50+ Major Fixed Stars cataloged with precise celestial coordinates
export const FIXED_STARS: FixedStar[] = [
  { id: 'alphecca', name: 'Alphecca (Gemma)', constellation: 'Corona Borealis', longitudeJ2000: 222.30, longitude2026: 222.66, latitude: 44.45, magnitude: 2.22, spectralClass: 'A0V', planetaryNature: ['venus', 'mercury'], keywords: ['Honor', 'Dignity', 'Artistic talent'], description: 'Associated with honor, dignity, artistic ability, and poetic inspiration.' },
  { id: 'aldebaran', name: 'Aldebaran', constellation: 'Taurus', longitudeJ2000: 69.79, longitude2026: 70.15, latitude: -5.47, magnitude: 0.87, spectralClass: 'K5III', planetaryNature: ['mars'], keywords: ['Royal Star of East', 'Integrity', 'Leadership', 'Courage'], description: 'One of the 4 Royal Stars of Persia. Watcher of the East. Bestows eloquence, courage, and high status when paired with integrity.' },
  { id: 'algol', name: 'Algol (Beta Persei)', constellation: 'Perseus', longitudeJ2000: 56.17, longitude2026: 56.53, latitude: 22.42, magnitude: 2.12, spectralClass: 'B8V', planetaryNature: ['saturn', 'mars'], keywords: ['Intensity', 'Passion', 'Transformation', 'Kundalini'], description: 'Demon Star / Head of Medusa. Associated with intense primal energy, passion, overcoming adversity, and formidable mental power.' },
  { id: 'alcyone', name: 'Alcyone (Pleiades)', constellation: 'Taurus', longitudeJ2000: 60.00, longitude2026: 60.36, latitude: 4.05, magnitude: 2.85, spectralClass: 'B7III', planetaryNature: ['moon', 'mars'], keywords: ['Insight', 'Vision', 'Sorrow', 'Spiritual Light'], description: 'Central star of the Pleiades cluster. Brings deep inner vision, spiritual insight, and strong emotional depth.' },
  { id: 'algorab', name: 'Algorab', constellation: 'Corvus', longitudeJ2000: 193.45, longitude2026: 193.81, latitude: -12.20, magnitude: 2.94, spectralClass: 'A0IV', planetaryNature: ['mars', 'saturn'], keywords: ['Resourceful', 'Crafty', 'Uncompromising'], description: 'Star of the Crow. Gives sharp tactical focus, resourcefulness, and persistence.' },
  { id: 'alphard', name: 'Alphard', constellation: 'Hydra', longitudeJ2000: 147.28, longitude2026: 147.64, latitude: -22.38, magnitude: 1.98, spectralClass: 'K3II', planetaryNature: ['saturn', 'venus'], keywords: ['Wisdom', 'Solitude', 'Passionate Depth'], description: 'Heart of the Serpent. Bestows emotional wisdom, passion, and deep artistic sensitivity.' },
  { id: 'alpheratz', name: 'Alpheratz (Sirrah)', constellation: 'Andromeda', longitudeJ2000: 14.30, longitude2026: 14.66, latitude: 25.68, magnitude: 2.07, spectralClass: 'B8IV', planetaryNature: ['jupiter', 'venus'], keywords: ['Freedom', 'Independence', 'Grace', 'Wealth'], description: 'Head of Andromeda. Grants love of freedom, graceful intellect, popularity, and honorable wealth.' },
  { id: 'altair', name: 'Altair', constellation: 'Aquila', longitudeJ2000: 301.78, longitude2026: 302.14, latitude: 29.30, magnitude: 0.77, spectralClass: 'A7V', planetaryNature: ['mars', 'jupiter'], keywords: ['Boldness', 'Ambition', 'High Soaring', 'Action'], description: 'Star of the Eagle. Gives bold courage, ambitious determination, and rapid social ascension.' },
  { id: 'antares', name: 'Antares', constellation: 'Scorpius', longitudeJ2000: 249.77, longitude2026: 250.13, latitude: -4.57, magnitude: 1.06, spectralClass: 'M1.5Iab', planetaryNature: ['mars', 'jupiter'], keywords: ['Royal Star of West', 'Strategic Passion', 'Intensity'], description: 'Watcher of the West. Heart of the Scorpion. Gives strategic brilliance, fiery passion, and revolutionary drive.' },
  { id: 'arcturus', name: 'Arcturus', constellation: 'Boötes', longitudeJ2000: 204.23, longitude2026: 204.59, latitude: 30.73, magnitude: -0.05, spectralClass: 'K1.5III', planetaryNature: ['jupiter', 'mars'], keywords: ['Pathfinder', 'Justice', 'Renown', 'Leadership'], description: 'Guardian of the Bear. Brings pathfinding vision, justice, honor, and sudden fame through innovative endeavors.' },
  { id: 'bellatrix', name: 'Bellatrix', constellation: 'Orion', longitudeJ2000: 80.95, longitude2026: 81.31, latitude: -16.82, magnitude: 1.64, spectralClass: 'B2III', planetaryNature: ['mars', 'mercury'], keywords: ['Female Warrior', 'Directness', 'Quick Mind'], description: 'Left Shoulder of Orion. Represents strategic battle courage, quick decision-making, and independence.' },
  { id: 'betelgeuse', name: 'Betelgeuse', constellation: 'Orion', longitudeJ2000: 88.75, longitude2026: 89.11, latitude: -16.02, magnitude: 0.50, spectralClass: 'M1-M2Ia-ab', planetaryNature: ['mars', 'mercury'], keywords: ['Martial Glory', 'Success', 'Resourcefulness'], description: 'Right Shoulder of Orion. Brings martial honors, material success, charisma, and great executive capability.' },
  { id: 'canopus', name: 'Canopus', constellation: 'Carina', longitudeJ2000: 104.97, longitude2026: 105.33, latitude: -75.82, magnitude: -0.74, spectralClass: 'A9II', planetaryNature: ['saturn', 'jupiter'], keywords: ['Navigator', 'Pilgrimage', 'Higher Wisdom'], description: 'The Great Navigator. Gives spiritual guidance, love of knowledge, stability, and ocean travels.' },
  { id: 'capella', name: 'Capella', constellation: 'Auriga', longitudeJ2000: 71.85, longitude2026: 72.21, latitude: 22.86, magnitude: 0.08, spectralClass: 'G3III', planetaryNature: ['mars', 'mercury'], keywords: ['Inquisitive', 'Freedom', 'Public Honor'], description: 'The Little She-Goat. Grants inquisitive intellect, love of learning, fast movement, and public appreciation.' },
  { id: 'castor', name: 'Castor', constellation: 'Gemini', longitudeJ2000: 110.25, longitude2026: 110.61, latitude: 10.10, magnitude: 1.58, spectralClass: 'A1V', planetaryNature: ['mercury'], keywords: ['Writer', 'Scholar', 'Refined Intellect'], description: 'Mortal Twin of Gemini. Gives brilliant intellect, literary mastery, elegance, and refined communication.' },
  { id: 'deneb', name: 'Deneb (Deneb Adige)', constellation: 'Cygnus', longitudeJ2000: 335.33, longitude2026: 335.69, latitude: 59.90, magnitude: 1.25, spectralClass: 'A2Ia', planetaryNature: ['venus', 'mercury'], keywords: ['Idealism', 'Artistic Mastery', 'Ingenuity'], description: 'Tail of the Swan. Bestows artistic ingenuity, idealism, refined aesthetics, and rapid learning.' },
  { id: 'denebola', name: 'Denebola', constellation: 'Leo', longitudeJ2000: 171.62, longitude2026: 171.98, latitude: 12.35, magnitude: 2.14, spectralClass: 'A3V', planetaryNature: ['saturn', 'venus'], keywords: ['Unconventional', 'Critical Insight', 'Reform'], description: 'Tail of the Lion. Bestows swift critical intelligence, willingness to challenge norms, and independent thought.' },
  { id: 'elnath', name: 'Elnath (Elnat)', constellation: 'Taurus', longitudeJ2000: 82.58, longitude2026: 82.94, latitude: 5.38, magnitude: 1.65, spectralClass: 'B7III', planetaryNature: ['mars'], keywords: ['Directness', 'Forceful Resolve', 'Victory'], description: 'Tip of the Bull Horn. Gives direct, forceful determination and victory in competitive struggles.' },
  { id: 'fomalhaut', name: 'Fomalhaut', constellation: 'Piscis Austrinus', longitudeJ2000: 333.87, longitude2026: 334.23, latitude: -21.14, magnitude: 1.17, spectralClass: 'A3V', planetaryNature: ['venus', 'mercury'], keywords: ['Royal Star of South', 'Idealistic Vision', 'Magic'], description: 'Watcher of the South. Mouth of the Southern Fish. Grants spiritual idealization, creative genius, and noble aims.' },
  { id: 'hamal', name: 'Hamal', constellation: 'Aries', longitudeJ2000: 37.67, longitude2026: 38.03, latitude: 9.96, magnitude: 2.01, spectralClass: 'K2III', planetaryNature: ['mars', 'saturn'], keywords: ['Independence', 'Willpower', 'Direct Command'], description: 'Head of the Ram. Gives strong self-will, independence, executive leadership, and pioneering power.' },
  { id: 'kochab', name: 'Kochab', constellation: 'Ursa Minor', longitudeJ2000: 133.32, longitude2026: 133.68, latitude: 72.98, magnitude: 2.07, spectralClass: 'K4III', planetaryNature: ['saturn', 'mars'], keywords: ['Anchor', 'Stability', 'Enduring Loyalty'], description: 'Former North Star. Gives steadfast endurance, moral anchor, and fierce loyalty.' },
  { id: 'markab', name: 'Markab', constellation: 'Pegasus', longitudeJ2000: 353.48, longitude2026: 353.84, latitude: 19.40, magnitude: 2.49, spectralClass: 'A0IV', planetaryNature: ['mars', 'mercury'], keywords: ['Intellectual Courage', 'Pioneering', 'Honor'], description: 'Saddle of Pegasus. Bestows intellectual courage, swift mind, honor in mental work, and ambition.' },
  { id: 'menkar', name: 'Menkar', constellation: 'Cetus', longitudeJ2000: 44.32, longitude2026: 44.68, latitude: -12.59, magnitude: 2.54, spectralClass: 'M1.5III', planetaryNature: ['saturn'], keywords: ['Collective Voice', 'Testing', 'Subconscious Depth'], description: 'Jaws of the Whale. Gives voice to collective unconscious feelings and deep psychological endurance.' },
  { id: 'mirfak', name: 'Mirfak', constellation: 'Perseus', longitudeJ2000: 32.08, longitude2026: 32.44, latitude: 30.12, magnitude: 1.79, spectralClass: 'F5Ib', planetaryNature: ['jupiter', 'mars'], keywords: ['Heroic Action', 'Boldness', 'Protection'], description: 'Elbow of Perseus. Gives heroic courageous energy, bold protective instincts, and competitive flair.' },
  { id: 'polaris', name: 'Polaris', constellation: 'Ursa Minor', longitudeJ2000: 88.57, longitude2026: 88.93, latitude: 66.10, magnitude: 1.97, spectralClass: 'F7Ib', planetaryNature: ['saturn', 'venus'], keywords: ['North Star', 'Guidance', 'Steadfast Purpose'], description: 'The Pole Star. Guiding light of navigation. Gives unwavering direction, moral compass, and purpose.' },
  { id: 'pollux', name: 'Pollux', constellation: 'Gemini', longitudeJ2000: 113.22, longitude2026: 113.58, latitude: 6.68, magnitude: 1.14, spectralClass: 'K0III', planetaryNature: ['mars'], keywords: ['Immortal Twin', 'Bravery', 'Audacity'], description: 'Immortal Twin of Gemini. Gives bold bravery, audacity, physical agility, and protective instinct.' },
  { id: 'procyon', name: 'Procyon', constellation: 'Canis Minor', longitudeJ2000: 115.78, longitude2026: 116.14, latitude: -16.02, magnitude: 0.34, spectralClass: 'F5IV-V', planetaryNature: ['mercury', 'mars'], keywords: ['Swift Success', 'Alertness', 'Resourcefulness'], description: 'Little Dog Star. Brings rapid success, sharp alertness, instant resourcefulness, and opportunistic intelligence.' },
  { id: 'ras_alhague', name: 'Ras Alhague', constellation: 'Ophiuchus', longitudeJ2000: 262.45, longitude2026: 262.81, latitude: 35.98, magnitude: 2.08, spectralClass: 'A5III', planetaryNature: ['saturn', 'venus'], keywords: ['Healer', 'Medicine', 'Restoration'], description: 'Head of Ophiuchus the Serpent Bearer. Associated with natural medicine, healing arts, and restorative wisdom.' },
  { id: 'regulus', name: 'Regulus', constellation: 'Leo', longitudeJ2000: 149.83, longitude2026: 150.19, latitude: 0.46, magnitude: 1.36, spectralClass: 'B7V', planetaryNature: ['jupiter', 'mars'], keywords: ['Royal Star of North', 'Sovereignty', 'Noble Mind'], description: 'Watcher of the North. Heart of the Lion. Bestows royal leadership, noble generosity, supreme confidence, and fame.' },
  { id: 'rigel', name: 'Rigel', constellation: 'Orion', longitudeJ2000: 76.83, longitude2026: 77.19, latitude: -31.12, magnitude: 0.12, spectralClass: 'B8Ia', planetaryNature: ['jupiter', 'saturn'], keywords: ['Educator', 'Mastery', 'Invention', 'Honor'], description: 'Left Foot of Orion. Brings educational honors, technical mastery, inventive capability, and prosperity.' },
  { id: 'scheat', name: 'Scheat', constellation: 'Pegasus', longitudeJ2000: 329.37, longitude2026: 329.73, latitude: 31.14, magnitude: 2.44, spectralClass: 'M2.5II-III', planetaryNature: ['mars', 'mercury'], keywords: ['Free Thinker', 'Intellectual Breaker', 'Originality'], description: 'Leg of Pegasus. Gives independent mind, willingness to challenge consensus, and breakthrough ideas.' },
  { id: 'sirius', name: 'Sirius (Dog Star)', constellation: 'Canis Major', longitudeJ2000: 104.08, longitude2026: 104.44, latitude: -39.61, magnitude: -1.46, spectralClass: 'A1V', planetaryNature: ['jupiter', 'mars'], keywords: ['Brilliance', 'Spiritual Flame', 'Renown', 'Sacred Action'], description: 'Brightest star in the night sky. Grants supreme fame, charismatic brilliance, passion, and spiritual illumination.' },
  { id: 'spica', name: 'Spica', constellation: 'Virgo', longitudeJ2000: 203.83, longitude2026: 204.19, latitude: -2.05, magnitude: 0.98, spectralClass: 'B1III-IV', planetaryNature: ['venus', 'mars'], keywords: ['Abundance', 'Talent', 'Harvest', 'Gifted Genius'], description: 'Ear of Wheat in Virgo\'s Hand. One of the most fortunate stars. Grants artistic talent, abundant success, and peace.' },
  { id: 'vega', name: 'Vega', constellation: 'Lyra', longitudeJ2000: 285.32, longitude2026: 285.68, latitude: 61.73, magnitude: 0.03, spectralClass: 'A0V', planetaryNature: ['venus', 'mercury'], keywords: ['Harp Star', 'Charisma', 'Musical Genius', 'Enchantment'], description: 'Star of the Harp. Bestows musical talent, artistic enchantment, charismatic eloquence, and public adoration.' },
  { id: 'vindemiatrix', name: 'Vindemiatrix', constellation: 'Virgo', longitudeJ2000: 189.93, longitude2026: 190.29, latitude: 16.21, magnitude: 2.83, spectralClass: 'G8III', planetaryNature: ['saturn', 'mercury'], keywords: ['Gatherer', 'Analyst', 'Focus'], description: 'Grape Gatherer. Gives intense analytical focus, research capability, and administrative talent.' },
  { id: 'zosma', name: 'Zosma', constellation: 'Leo', longitudeJ2000: 171.32, longitude2026: 171.68, latitude: 14.33, magnitude: 2.56, spectralClass: 'A4V', planetaryNature: ['saturn', 'venus'], keywords: ['Compassion for Suffering', 'Service'], description: 'Back of the Lion. Bestows deep empathy for suffering, service orientation, and selfless commitment.' },
  { id: 'zubenelgenubi', name: 'Zubenelgenubi (Alpha Librae)', constellation: 'Libra', longitudeJ2000: 225.08, longitude2026: 225.44, latitude: 0.33, magnitude: 2.75, spectralClass: 'A3IV', planetaryNature: ['saturn', 'mars'], keywords: ['Southern Scale', 'Social Justice', 'Balance'], description: 'Southern Scale. Associated with social justice, reformative balance, and community leadership.' },
  { id: 'zubeneshamali', name: 'Zubeneshamali (Beta Librae)', constellation: 'Libra', longitudeJ2000: 239.37, longitude2026: 239.73, latitude: 8.52, magnitude: 2.61, spectralClass: 'B8V', planetaryNature: ['jupiter', 'mercury'], keywords: ['Northern Scale', 'Intellectual Ambition', 'Honors'], description: 'Northern Scale. Brings high intellectual ambition, honors, political or social influence, and prosperity.' },
  { id: 'achernar', name: 'Achernar', constellation: 'Eridanus', longitudeJ2000: 345.32, longitude2026: 345.68, latitude: -59.37, magnitude: 0.45, spectralClass: 'B6Vep', planetaryNature: ['jupiter'], keywords: ['End of River', 'Spiritual Voyage', 'Success'], description: 'End of the River Eridanus. Gives spiritual wisdom, philosophical inclination, and success in foreign lands.' },
  { id: 'agena', name: 'Agena (Beta Centauri / Hadar)', constellation: 'Centaurus', longitudeJ2000: 233.80, longitude2026: 234.16, latitude: -44.14, magnitude: 0.61, spectralClass: 'B1III', planetaryNature: ['venus', 'jupiter'], keywords: ['Refined Grace', 'Moral Courage', 'Health'], description: 'Knee of the Centaur. Grants noble character, health, refined social grace, and moral courage.' },
  { id: 'alnilam', name: 'Alnilam', constellation: 'Orion', longitudeJ2000: 84.47, longitude2026: 84.83, latitude: -24.50, magnitude: 1.69, spectralClass: 'B0Ia', planetaryNature: ['jupiter', 'saturn'], keywords: ['Center of Belt', 'Public Renown', 'Structure'], description: 'Middle star of Orion\'s Belt. Bestows organizational stature, public honor, and structural strength.' },
  { id: 'alnitak', name: 'Alnitak', constellation: 'Orion', longitudeJ2000: 84.97, longitude2026: 85.33, latitude: -25.29, magnitude: 1.77, spectralClass: 'O9.5Ib', planetaryNature: ['jupiter', 'mars'], keywords: ['Eastern Belt', 'Endurance', 'Focus'], description: 'Eastern star of Orion\'s Belt. Brings strong stamina, single-minded focus, and strategic victory.' },
  { id: 'saiph', name: 'Saiph', constellation: 'Orion', longitudeJ2000: 86.40, longitude2026: 86.76, latitude: -34.20, magnitude: 2.07, spectralClass: 'B0.5Ia', planetaryNature: ['jupiter', 'mars'], keywords: ['Sword of Orion', 'Direct Spirit'], description: 'Right Foot of Orion. Gives direct action, courageous spirit, and honesty.' },
  { id: 'acrux', name: 'Acrux (Alpha Crucis)', constellation: 'Crux', longitudeJ2000: 221.88, longitude2026: 222.24, latitude: -52.92, magnitude: 0.77, spectralClass: 'B0.5IV', planetaryNature: ['jupiter'], keywords: ['Southern Cross', 'Spiritual Mystery', 'Trial'], description: 'Alpha star of the Southern Cross. Represents spiritual mystery, ritual wisdom, and endurance.' },
  { id: 'mimosa', name: 'Mimosa (Beta Crucis)', constellation: 'Crux', longitudeJ2000: 221.65, longitude2026: 222.01, latitude: -49.41, magnitude: 1.25, spectralClass: 'B0.5III', planetaryNature: ['jupiter', 'venus'], keywords: ['Intuitive Wisdom', 'Sacred Art'], description: 'Beta star of Southern Cross. Bestows creative intuition, inventive aesthetic, and spiritual devotion.' },
  { id: 'ankaa', name: 'Ankaa', constellation: 'Phoenix', longitudeJ2000: 10.53, longitude2026: 10.89, latitude: -42.30, magnitude: 2.40, spectralClass: 'K0III', planetaryNature: ['saturn', 'venus'], keywords: ['Phoenix', 'Rebirth', 'Resilience'], description: 'Star of the Phoenix. Represents resilience, transformation, rebirth from adversity, and renewal.' },
  { id: 'suhail', name: 'Suhail', constellation: 'Vela', longitudeJ2000: 147.20, longitude2026: 147.56, latitude: -55.01, magnitude: 2.23, spectralClass: 'K4Ib', planetaryNature: ['saturn', 'venus'], keywords: ['Sails of Ship', 'Creativity', 'Adaptability'], description: 'Star of the Sails. Gives resourceful adaptability, poetic talent, and naval success.' },
  { id: 'eltanin', name: 'Eltanin (Gamma Draconis)', constellation: 'Draco', longitudeJ2000: 267.97, longitude2026: 268.33, latitude: 74.96, magnitude: 2.24, spectralClass: 'K5III', planetaryNature: ['mars', 'moon'], keywords: ['Dragon Eye', 'Concentration', 'Insight'], description: 'Eye of the Dragon. Gives piercing mental concentration, psychological insight, and bravery.' },
  { id: 'rastaban', name: 'Rastaban (Beta Draconis)', constellation: 'Draco', longitudeJ2000: 251.97, longitude2026: 252.33, latitude: 75.27, magnitude: 2.79, spectralClass: 'G2II', planetaryNature: ['saturn', 'mars'], keywords: ['Dragon Head', 'Uncompromising Truth'], description: 'Head of the Dragon. Gives intense devotion to truth, sharpness of mind, and vigilance.' },
  { id: 'sabik', name: 'Sabik', constellation: 'Ophiuchus', longitudeJ2000: 257.97, longitude2026: 258.33, latitude: 7.20, magnitude: 2.43, spectralClass: 'A2V', planetaryNature: ['saturn', 'venus'], keywords: ['Trailblazer', 'Moral Courage'], description: 'Left Leg of Ophiuchus. Grants moral courage, trailblazing willpower, and skill.' },
];

// --- 6. HELPER & CALCULATION ENGINE FUNCTIONS ---

/**
 * Gets ZodiacSign object for a given Tropical degree (0 to 360).
 */
export function getZodiacSignByDegree(longitude: number): {
  sign: ZodiacSign;
  degreeInSign: number;
} {
  const normDeg = ((longitude % 360) + 360) % 360;
  const signKeys: ZodiacSignId[] = [
    'aries',
    'taurus',
    'gemini',
    'cancer',
    'leo',
    'virgo',
    'libra',
    'scorpio',
    'sagittarius',
    'capricorn',
    'aquarius',
    'pisces',
  ];
  const idx = Math.floor(normDeg / 30);
  const signId = signKeys[Math.min(idx, 11)];
  const sign = WESTERN_SIGNS[signId];

  return {
    sign,
    degreeInSign: normDeg % 30,
  };
}

/**
 * Calculates Egyptian Term ruler for a specific sign and degree inside sign (0..30).
 */
export function getEgyptianTerm(signId: ZodiacSignId, degreeInSign: number): EgyptianTerm {
  const terms = EGYPTIAN_TERMS[signId];
  const deg = Math.min(Math.max(degreeInSign, 0), 29.999);
  for (const term of terms) {
    if (deg < term.endDegree) return term;
  }
  return terms[terms.length - 1];
}

/**
 * Calculates Decan details for a specific sign and degree inside sign (0..30).
 */
export function getDecan(signId: ZodiacSignId, degreeInSign: number): Decan {
  const decans = DECANS[signId];
  const deg = Math.min(Math.max(degreeInSign, 0), 29.999);
  if (deg < 10) return decans[0];
  if (deg < 20) return decans[1];
  return decans[2];
}

/**
 * Calculates traditional Ptolemaic Essential Dignity Score for a planet in a sign and degree.
 * Domicile: +5, Exaltation: +4, Triplicity: +3, Terms: +2, Face: +1
 * Detriment: -5, Fall: -4
 */
export function calculateEssentialDignityScore(
  planet: WesternPlanet,
  signId: ZodiacSignId,
  degreeInSign: number,
  isDayChart: boolean = true
): {
  totalScore: number;
  breakdown: {
    domicile: number;
    exaltation: number;
    triplicity: number;
    terms: number;
    face: number;
    detriment: number;
    fall: number;
  };
} {
  const sign = WESTERN_SIGNS[signId];
  const elementInfo = ELEMENTS[sign.element];
  const term = getEgyptianTerm(signId, degreeInSign);
  const decan = getDecan(signId, degreeInSign);

  let domicile = 0;
  let exaltation = 0;
  let triplicity = 0;
  let terms = 0;
  let face = 0;
  let detriment = 0;
  let fall = 0;

  // Domicile / Own Sign (+5)
  if (sign.traditionalRuler === planet || sign.modernRuler === planet) domicile = 5;

  // Exaltation (+4)
  if (sign.exaltation === planet) exaltation = 4;

  // Triplicity (+3)
  const tripRulers = elementInfo.triplicityRulers;
  const activeTripRuler = isDayChart ? tripRulers.day : tripRulers.night;
  if (activeTripRuler === planet || tripRulers.participating === planet) triplicity = 3;

  // Egyptian Terms (+2)
  if (term.planet === planet) terms = 2;

  // Face / Decan (+1)
  if (decan.chaldeanRuler === planet || decan.triplicityRuler === planet) face = 1;

  // Detriment (-5)
  if (sign.detriment.includes(planet)) detriment = -5;

  // Fall (-4)
  if (sign.fall === planet) fall = -4;

  const totalScore = domicile + exaltation + triplicity + terms + face + detriment + fall;

  return {
    totalScore,
    breakdown: {
      domicile,
      exaltation,
      triplicity,
      terms,
      face,
      detriment,
      fall,
    },
  };
}

export interface AspectResult {
  hasAspect: boolean;
  aspect: AspectRule | null;
  exactAngle: number;
  angularDifference: number; // Actual distance between planets (0..180)
  orb: number;               // Distance from exact aspect angle
  isApplying: boolean;
}

/**
 * Calculates whether two ecliptic longitudes form an astrological aspect.
 */
export function calculateAspect(
  long1: number,
  long2: number,
  customOrbMap?: Record<AspectName, number>
): AspectResult {
  let diff = Math.abs(((long1 - long2 + 360) % 360));
  if (diff > 180) diff = 360 - diff;

  const aspectList: AspectName[] = [
    'conjunction',
    'opposition',
    'trine',
    'square',
    'sextile',
    'quincunx',
    'sesquiquadrate',
    'biquintile',
    'quintile',
    'semi-square',
    'semi-sextile',
  ];

  for (const name of aspectList) {
    const rule = ASPECT_RULES[name];
    const allowedOrb = customOrbMap?.[name] ?? rule.orbDefault;
    const currentOrb = Math.abs(diff - rule.angle);

    if (currentOrb <= allowedOrb) {
      return {
        hasAspect: true,
        aspect: rule,
        exactAngle: rule.angle,
        angularDifference: diff,
        orb: Number(currentOrb.toFixed(2)),
        isApplying: long1 < long2, // Simplified representation of applying vs separating
      };
    }
  }

  return {
    hasAspect: false,
    aspect: null,
    exactAngle: 0,
    angularDifference: diff,
    orb: 0,
    isApplying: false,
  };
}

/**
 * Finds all cataloged fixed stars conjunct an ecliptic longitude within maxOrbDegrees.
 */
export function findConjunctFixedStars(
  longitude: number,
  maxOrbDegrees: number = 1.5
): { star: FixedStar; orbDegrees: number }[] {
  const normLong = ((longitude % 360) + 360) % 360;

  const matches: { star: FixedStar; orbDegrees: number }[] = [];

  for (const star of FIXED_STARS) {
    let diff = Math.abs(normLong - star.longitude2026);
    if (diff > 180) diff = 360 - diff;

    if (diff <= maxOrbDegrees) {
      matches.push({
        star,
        orbDegrees: Number(diff.toFixed(2)),
      });
    }
  }

  return matches.sort((a, b) => a.orbDegrees - b.orbDegrees);
}
