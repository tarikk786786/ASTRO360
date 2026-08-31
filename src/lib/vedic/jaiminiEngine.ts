// src/lib/vedic/jaiminiEngine.ts

export interface JaiminiKarakas {
  atmakaraka: string;
  amatyakaraka: string;
  bhratrikaraka: string;
  matrikaraka: string;
  pitrikaraka: string;
  putrakaraka: string;
  gnatikaraka: string;
  darakaraka: string;
  karakamshaSign?: string;
}

export interface ArudhaPada {
  houseNumber: number;
  name: string;
  signIndex: number;
  signName: string;
  meaning: string;
}

export interface JaiminiProfile {
  karakas: JaiminiKarakas;
  arudhaLagna: string;
  upapadaLagna: string;
  darapada: string;
  arudhaPadas: ArudhaPada[];
}

const ZODIAC_SIGNS = [
  'Aries ♈', 'Taurus ♉', 'Gemini ♊', 'Cancer ♋',
  'Leo ♌', 'Virgo ♍', 'Libra ♎', 'Scorpio ♏',
  'Sagittarius ♐', 'Capricorn ♑', 'Aquarius ♒', 'Pisces ♓'
];

const SIGN_LORDS: Record<number, string> = {
  0: 'Mars', 1: 'Venus', 2: 'Mercury', 3: 'Moon',
  4: 'Sun', 5: 'Mercury', 6: 'Venus', 7: 'Mars',
  8: 'Jupiter', 9: 'Saturn', 10: 'Saturn', 11: 'Jupiter'
};

const ARUDHA_NAMES = [
  'A1 (Arudha Lagna - Public Persona)',
  'A2 (Kosa Pada - Material Wealth)',
  'A3 (Bhratru Pada - Courage & Siblings)',
  'A4 (Matru Pada - Vehicles & Home)',
  'A5 (Mantra Pada - Intelligence & Progeny)',
  'A6 (Roga Pada - Competition & Debts)',
  'A7 (Dara Pada - Sexual Attraction & Business)',
  'A8 (Mrityu Pada - Longevity & Vulnerabilities)',
  'A9 (Bhagya Pada - Fortune & Higher Dharma)',
  'A10 (Rajya Pada - Career & Social Status)',
  'A11 (Labha Pada - Cash Flow & Gains)',
  'A12 (Upapada Lagna - Marital Longevity & Sacrifices)'
];

const ARUDHA_MEANINGS = [
  'Reflects external public image, perception by others, and social status in the material world.',
  'Indicates tangible liquid assets, financial security, family lineage, and speech reception.',
  'Reflects initiative, short journeys, courage in enterprise, and relationship with younger siblings.',
  'Symbolizes home sanctuary, real estate, emotional happiness, and vehicle comfort.',
  'Indicates creative genius, spiritual mantras, intuitive instincts, and progeny fortune.',
  'Represents hurdles, health resilience, legal disputes, and capacity to overcome adversaries.',
  'Reveals business partners, commercial transactions, and external romantic attraction.',
  'Reflects hidden transformations, occult interest, research aptitude, and longevity indicators.',
  'Symbolizes spiritual mentors, paternal blessings, international travels, and providential fortune.',
  'Indicates leadership authority, executive triumphs, professional reputation, and career legacy.',
  'Reflects fulfillment of desires, high-network alliances, revenue streams, and elder siblings.',
  'Governs marital harmony, commitment endurance, spousal background, and spiritual detachment.'
];

/**
 * Calculates 7 or 8 classical Jaimini Chara Karakas.
 * Inverts Rahu's degree (30° - deg) due to natural retrograde motion; Ketu is excluded.
 */
export function calculateCharaKarakas(planetDegrees: Record<string, number>, system: 7 | 8 = 8): JaiminiKarakas {
  const eligiblePlanets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  if (system === 8) eligiblePlanets.push('Rahu');

  const normalized = eligiblePlanets.map(name => {
    const rawDeg = planetDegrees[name] !== undefined ? planetDegrees[name] : 15;
    let degInSign = ((rawDeg % 30) + 30) % 30;
    
    // In Jaimini, Rahu's motion is retrograde, so its span advanced in sign is 30° - deg
    if (name === 'Rahu') {
      degInSign = 30.0 - degInSign;
    }
    return { name, degree: degInSign };
  });

  // Sort strictly descending by advanced degree in sign
  normalized.sort((a, b) => b.degree - a.degree);

  return {
    atmakaraka: normalized[0]?.name || 'Sun',
    amatyakaraka: normalized[1]?.name || 'Jupiter',
    bhratrikaraka: normalized[2]?.name || 'Venus',
    matrikaraka: normalized[3]?.name || 'Moon',
    pitrikaraka: system === 8 ? (normalized[4]?.name || 'Mars') : '',
    putrakaraka: system === 8 ? (normalized[5]?.name || 'Mercury') : (normalized[4]?.name || 'Mercury'),
    gnatikaraka: system === 8 ? (normalized[6]?.name || 'Saturn') : (normalized[5]?.name || 'Saturn'),
    darakaraka: system === 8 ? (normalized[7]?.name || 'Rahu') : (normalized[6]?.name || 'Venus'),
  };
}

/**
 * Computes all 12 Arudha Padas including Arudha Lagna (AL) and Upapada Lagna (UL/A12).
 * Applies classical 1st/7th house exceptions (Jaimini Upadesha Sutras 1.1.30-31).
 */
export function calculateArudhaPadas(ascendantLongitude: number, planetPositions: Record<string, number>): ArudhaPada[] {
  const ascSign = Math.floor((((ascendantLongitude % 360) + 360) % 360) / 30);
  const padas: ArudhaPada[] = [];

  for (let house = 0; house < 12; house++) {
    const houseSign = (ascSign + house) % 12;
    const lordName = SIGN_LORDS[houseSign];
    const lordLong = planetPositions[lordName] !== undefined ? planetPositions[lordName] : ascendantLongitude;
    const lordSign = Math.floor((((lordLong % 360) + 360) % 360) / 30);

    // Distance from house to its lord (in signs)
    let dist = (lordSign - houseSign + 12) % 12;
    
    // Project same distance from lord's sign
    let rawArudhaSign = (lordSign + dist) % 12;

    // Classical Jaimini Exceptions:
    // If Arudha falls in the same house (dist = 0), it moves to the 10th from the house
    // If Arudha falls in the 7th from the house (dist = 6), it moves to the 4th (or 10th)
    if (rawArudhaSign === houseSign) {
      rawArudhaSign = (houseSign + 9) % 12; // 10th from house (0-indexed +9)
    } else if (rawArudhaSign === (houseSign + 6) % 12) {
      rawArudhaSign = (houseSign + 3) % 12; // 4th from house (0-indexed +3)
    }

    padas.push({
      houseNumber: house + 1,
      name: ARUDHA_NAMES[house],
      signIndex: rawArudhaSign,
      signName: ZODIAC_SIGNS[rawArudhaSign],
      meaning: ARUDHA_MEANINGS[house]
    });
  }

  return padas;
}

/**
 * Synthesizes complete Jaimini profile from chart coordinates.
 */
export function generateJaiminiProfile(ascendantLongitude: number, planetDegrees: Record<string, number>): JaiminiProfile {
  const karakas = calculateCharaKarakas(planetDegrees, 8);
  const arudhaPadas = calculateArudhaPadas(ascendantLongitude, planetDegrees);

  return {
    karakas,
    arudhaLagna: arudhaPadas[0]?.signName || 'Aries ♈',
    darapada: arudhaPadas[6]?.signName || 'Libra ♎',
    upapadaLagna: arudhaPadas[11]?.signName || 'Pisces ♓',
    arudhaPadas
  };
}
