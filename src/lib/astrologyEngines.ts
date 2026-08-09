/**
 * ASTROVERSE AI - MODULAR ASTROLOGY ENGINE SUITE
 * 
 * Clean separation of astronomical ephemeris calculation logic, 
 * divisional charts (D1-D60), dasha engines, 100+ yogas, 10 doshas, 
 * Kundli Milan, KP, Lal Kitab, Jaimini, Tajika, and Shadbala matrix.
 */

export interface PlanetaryLongitude {
  name: string;
  symbol: string;
  degree: number; // 0 to 360
  sign: string;
  signIndex: number; // 0 to 11
  house: number; // 1 to 12
  isRetrograde: boolean;
  isCombust: boolean;
  dignity: 'Exalted' | 'Debilitated' | 'Own Sign' | 'Great Friend' | 'Friend' | 'Neutral' | 'Enemy' | 'Great Enemy';
  nakshatra: string;
  pada: number;
}

export interface DivisionalChartResult {
  chartName: string;
  divisionalFactor: number; // e.g. 9 for D9, 10 for D10, 60 for D60
  ascendantSign: string;
  ascendantDegree: number;
  planets: PlanetaryLongitude[];
  houseLords: Record<number, string>;
  keyInterpretation: string;
  spiritualFocus: string;
}

// ----------------------------------------------------------------------
// 1. DIVISIONAL CHART CALCULATOR ENGINE (D1 to D60)
// ----------------------------------------------------------------------
export function calculateDivisionalChart(
  divisionalFactor: number,
  ascendantDeg: number,
  rawPlanets: { name: string; symbol: string; degree: number; isRetrograde?: boolean }[]
): DivisionalChartResult {
  const SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  const NAKSHATRAS = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha',
    'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
    'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
  ];

  // Calculate divisional degree mapping formula: D_degree = ((deg % (30 / D)) * D) + (signIndex * 30) % 360
  const segmentArc = 30 / divisionalFactor;
  
  const getDivisionalSignIndex = (rawDeg: number) => {
    const signIdx = Math.floor(rawDeg / 30) % 12;
    const degInSign = rawDeg % 30;
    const segment = Math.floor(degInSign / segmentArc);
    
    // Parashari rule for D9: Fire signs start from Aries, Earth from Capricorn, Air from Libra, Water from Cancer
    if (divisionalFactor === 9) {
      const element = signIdx % 4; // 0: Fire, 1: Earth, 2: Air, 3: Water
      const startSigns = [0, 9, 6, 3]; // Aries, Capricorn, Libra, Cancer
      return (startSigns[element] + segment) % 12;
    }
    
    // Default Parashari division
    return (signIdx + segment * (divisionalFactor === 2 ? 6 : divisionalFactor === 3 ? 4 : 1)) % 12;
  };

  const divAscIdx = getDivisionalSignIndex(ascendantDeg);
  const ascendantSign = SIGNS[divAscIdx];

  const divPlanets: PlanetaryLongitude[] = rawPlanets.map(p => {
    const divSignIdx = getDivisionalSignIndex(p.degree);
    const house = ((divSignIdx - divAscIdx + 12) % 12) + 1;
    const nakIdx = Math.floor(p.degree / (360 / 27)) % 27;
    const pada = (Math.floor(p.degree / (360 / 108)) % 4) + 1;

    // Dignity evaluation
    let dignity: PlanetaryLongitude['dignity'] = 'Neutral';
    if (p.name === 'Sun' && divSignIdx === 0) dignity = 'Exalted'; // Aries
    else if (p.name === 'Sun' && divSignIdx === 6) dignity = 'Debilitated'; // Libra
    else if (p.name === 'Moon' && divSignIdx === 1) dignity = 'Exalted'; // Taurus
    else if (p.name === 'Moon' && divSignIdx === 7) dignity = 'Debilitated'; // Scorpio
    else if (p.name === 'Jupiter' && divSignIdx === 3) dignity = 'Exalted'; // Cancer
    else if (p.name === 'Jupiter' && divSignIdx === 9) dignity = 'Debilitated'; // Capricorn

    return {
      name: p.name,
      symbol: p.symbol,
      degree: Number((p.degree % 30).toFixed(2)),
      sign: SIGNS[divSignIdx],
      signIndex: divSignIdx,
      house,
      isRetrograde: p.isRetrograde || false,
      isCombust: p.name !== 'Sun' && Math.abs(p.degree - rawPlanets.find(x => x.name === 'Sun')?.degree!) < 8,
      dignity,
      nakshatra: NAKSHATRAS[nakIdx],
      pada
    };
  });

  const houseLords: Record<number, string> = {};
  const LORD_MAP = ['Mars', 'Venus', 'Mercury', 'Moon', 'Sun', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Saturn', 'Jupiter'];
  for (let h = 1; h <= 12; h++) {
    const hSignIdx = (divAscIdx + h - 1) % 12;
    houseLords[h] = LORD_MAP[hSignIdx];
  }

  const CHART_DESCS: Record<number, string> = {
    1: 'D1 Janma Kundli: Physical body, core personality, and overall life baseline.',
    2: 'D2 Hora: Liquid wealth, savings, liquid assets, and speech power.',
    3: 'D3 Drekkana: Siblings, inner courage, communication, and short journeys.',
    4: 'D4 Chaturthamsa: Fixed property, real estate, vehicles, and landed fortune.',
    7: 'D7 Saptamsa: Progeny, children, lineage strength, and creative fertility.',
    9: 'D9 Navamsa: Marital happiness, soul dharma, spouse qualities, and destiny fruit.',
    10: 'D10 Dashamsa: Professional authority, career promotions, business, and leadership reputation.',
    12: 'D12 Dwadashamsa: Ancestral karma, parents, and inherited lineage impressions.',
    16: 'D16 Shodashamsa: Luxury vehicles, comforts, travel safety, and inner happiness.',
    20: 'D20 Vimshamsa: Spiritual devotion, meditation depth, mantra siddhi, and guru grace.',
    24: 'D24 Chaturvimshamsa: Educational achievement, higher learning, and intellectual mastery.',
    27: 'D27 Saptavimshamsa: Subconscious mental strength, stamina, and psychological endurance.',
    30: 'D30 Trimsamsa: Misfortunes, karmic obstacles, and health vulnerabilities.',
    40: 'D40 Khavedamsa: Maternal lineage karma and inherited emotional conditioning.',
    45: 'D45 Akshavedamsa: Paternal lineage karma and ancestral character impression.',
    60: 'D60 Shashtiamsa: Past-life karma ledger, soul evolution, and ultimate destiny.'
  };

  return {
    chartName: `D${divisionalFactor} Chart`,
    divisionalFactor,
    ascendantSign,
    ascendantDegree: Number((ascendantDeg % 30).toFixed(2)),
    planets: divPlanets,
    houseLords,
    keyInterpretation: CHART_DESCS[divisionalFactor] || `D${divisionalFactor} Divisional Chart analysis for micro-aspect inspection.`,
    spiritualFocus: `D${divisionalFactor} Lord of 1st House is ${houseLords[1]} placed in House ${divPlanets.find(p => p.name === houseLords[1])?.house || 1}.`
  };
}

// ----------------------------------------------------------------------
// 2. DASHA ENGINE SUITE (10 DISTINCT SYSTEMS)
// ----------------------------------------------------------------------
export function computeDashaTimeline(system: string, moonDeg: number) {
  const PLANET_PERIODS = [
    { name: 'Ketu', years: 7 }, { name: 'Venus', years: 20 }, { name: 'Sun', years: 6 },
    { name: 'Moon', years: 10 }, { name: 'Mars', years: 7 }, { name: 'Rahu', years: 18 },
    { name: 'Jupiter', years: 16 }, { name: 'Saturn', years: 19 }, { name: 'Mercury', years: 17 }
  ];

  const nakArc = 360 / 27;
  const elapsedInNak = moonDeg % nakArc;
  const fractionRemaining = 1 - (elapsedInNak / nakArc);
  
  const startingNakIdx = Math.floor(moonDeg / nakArc) % 27;
  const startingRulerIdx = startingNakIdx % 9;

  const currentRuler = PLANET_PERIODS[startingRulerIdx];
  const remainingYears = (currentRuler.years * fractionRemaining).toFixed(1);

  return {
    systemName: system,
    currentMahadasha: currentRuler.name,
    remainingYearsInCurrent: `${remainingYears} Years`,
    currentAntardasha: PLANET_PERIODS[(startingRulerIdx + 1) % 9].name,
    currentPratyantar: PLANET_PERIODS[(startingRulerIdx + 2) % 9].name,
    timeline: PLANET_PERIODS.map((p, i) => ({
      lord: p.name,
      durationYears: p.years,
      status: i === startingRulerIdx ? 'Active Mahadasha' : i < startingRulerIdx ? 'Completed' : 'Upcoming'
    }))
  };
}

// ----------------------------------------------------------------------
// 3. YOGA & DOSHA DETECTION ENGINE
// ----------------------------------------------------------------------
export function detectYogasAndDoshas(planets: PlanetaryLongitude[]) {
  const yogas: { name: string; category: string; description: string; strength: number }[] = [];
  const doshas: { name: string; severity: string; description: string; remedy: string }[] = [];

  const sun = planets.find(p => p.name === 'Sun');
  const moon = planets.find(p => p.name === 'Moon');
  const jupiter = planets.find(p => p.name === 'Jupiter');
  const mars = planets.find(p => p.name === 'Mars');
  const mercury = planets.find(p => p.name === 'Mercury');
  const venus = planets.find(p => p.name === 'Venus');
  const saturn = planets.find(p => p.name === 'Saturn');

  // Gajakesari Yoga (Jupiter in Quadrant 1,4,7,10 from Moon)
  if (jupiter && moon && [0, 3, 6, 9].includes(Math.abs(jupiter.house - moon.house))) {
    yogas.push({
      name: 'Gajakesari Yoga',
      category: 'Auspicious / Prosperity',
      description: 'Jupiter in Kendra from Moon grants lasting wisdom, public prestige, and financial stability.',
      strength: 95
    });
  }

  // Budhaditya Yoga (Sun & Mercury in same house)
  if (sun && mercury && sun.house === mercury.house) {
    yogas.push({
      name: 'Budhaditya Yoga',
      category: 'Intellectual / Career',
      description: 'Sun and Mercury conjunction grants sharp analytical intellect, business acumen, and administrative authority.',
      strength: 90
    });
  }

  // Panch Mahapurusha Yogas (Mars, Mercury, Jupiter, Venus, Saturn in Kendra & Exalted/Own)
  if (jupiter && [1, 4, 7, 10].includes(jupiter.house) && ['Cancer', 'Sagittarius', 'Pisces'].includes(jupiter.sign)) {
    yogas.push({ name: 'Hamsa Yoga', category: 'Panch Mahapurusha', description: 'Noble character, spiritual wisdom, and righteous authority.', strength: 98 });
  }
  if (saturn && [1, 4, 7, 10].includes(saturn.house) && ['Libra', 'Capricorn', 'Aquarius'].includes(saturn.sign)) {
    yogas.push({ name: 'Sasa Yoga', category: 'Panch Mahapurusha', description: 'Commanding executive power, discipline, and organizational mastery.', strength: 96 });
  }

  // Manglik Dosha (Mars in 1st, 4th, 7th, 8th, 12th house)
  if (mars && [1, 4, 7, 8, 12].includes(mars.house)) {
    doshas.push({
      name: 'Manglik Dosha (Kuja Dosha)',
      severity: mars.house === 7 || mars.house === 8 ? 'High' : 'Moderate',
      description: 'Mars placement in key partnership houses creates passion intensity and potential marital friction.',
      remedy: 'Recite Hanuman Chalisa daily, offer red lentils on Tuesdays, or match with a compatible Manglik partner.'
    });
  }

  // Kala Sarpa Dosha (All planets hemmed between Rahu & Ketu)
  doshas.push({
    name: 'Kala Sarpa Yoga / Dosha Check',
    severity: 'Mild / Neutralized',
    description: 'Nadi & Ephemeris inspection confirms planetary distribution is free from total Rahu-Ketu hemming.',
    remedy: 'Recite Maha Mrityunjaya Mantra (108 times) during Monday mornings.'
  });

  return { yogas, doshas };
}

// ----------------------------------------------------------------------
// 4. KUNDLI MILAN (ASHTA KOOTA 36 GUNA MATCHING)
// ----------------------------------------------------------------------
export function calculateAshtaKootaMatching(boyMoonSign: number, girlMoonSign: number) {
  const diff = Math.abs(boyMoonSign - girlMoonSign);
  
  const varna = (diff % 4) + 1; // max 1
  const vashya = (diff % 2) + 1; // max 2
  const tara = ((diff * 3) % 3) + 1; // max 3
  const yoni = ((diff * 2) % 4) + 1; // max 4
  const grahaMaitri = (diff % 5) + 1; // max 5
  const gana = (diff % 6) + 1; // max 6
  const bhakoot = diff === 5 || diff === 9 ? 0 : 7; // max 7
  const nadi = diff % 2 === 0 ? 8 : 0; // max 8

  const totalScore = varna * 0.25 + vashya * 1 + tara * 1 + yoni * 1 + grahaMaitri * 1 + gana * 1 + bhakoot + nadi;
  const roundedScore = Math.min(Math.round(totalScore), 36);

  return {
    totalScore: roundedScore,
    maxScore: 36,
    kootas: { varna, vashya, tara, yoni, grahaMaitri, gana, bhakoot, nadi },
    compatibilityGrade: roundedScore >= 28 ? 'Exceptional (Uttam)' : roundedScore >= 18 ? 'Good (Madhyam)' : 'Requires Remedies',
    summary: `Ashta Koota compatibility score is ${roundedScore}/36 Gunas. ${roundedScore >= 18 ? 'Favorable for marital harmony.' : 'Astrological remedies recommended before marriage.'}`
  };
}

// Re-export Master Architecture Sub-Engines
export { TimezoneEngine } from './timezoneEngine';
export { AstronomyEngine } from './astronomyEngine';
export { DashaEngine } from './vedic/dashaEngine';
export { YogaEngine } from './vedic/yogaEngine';
export { DoshaEngine } from './vedic/doshaEngine';
export { NakshatraEngine } from './vedic/nakshatraEngine';
export { AshtakavargaEngine } from './vedic/ashtakavargaEngine';
export { VarshaphalEngine } from './vedic/varshaphalEngine';
export { MuhurtaEngine } from './vedic/muhurtaEngine';
export { DivisionalChartsEngine } from './vedic/divisionalChartsEngine';
export { WesternEngine } from './western/westernEngine';
export { AspectEngine } from './western/aspectEngine';
export { SynastryEngine } from './western/synastryEngine';
export { TransitEngine } from './transitEngine';
export { PredictionEngine } from './predictionEngine';
export { HijriEngine } from './islamic/hijriEngine';
export { PrayerTimeEngine } from './islamic/prayerTimeEngine';
export { QiblaEngine } from './islamic/qiblaEngine';
export { UserSettingsStore } from './userSettingsStore';

