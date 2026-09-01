import { Ecliptic, GeoVector, Body } from 'astronomy-engine';
import { AstronomyEngine } from './astronomyEngine';
import { GlobalConfigManager } from './globalConfig';
import { NakshatraEngine } from './vedic/nakshatraEngine';
import { calculateVimshottariDasha as computeVimshottariDashaTimeline } from '../backend/dashaEngine';

// ASTRO360 Ephemeris & Calculation Engine
// Provides real astronomical position calculations, Nakshatra determination, Tithi, Dasha timelines, and Ashta Koota matching.

export interface PlanetPosition {
  name: string;
  symbol: string;
  sign: string;
  degree: string;
  degreeDecimal: number;
  house: string;
  houseNumber: number;
  speed: string;
  retrograde: boolean;
  element: string;
  nakshatra: string;
  pada: number;
  strength: string;
  remedies: string;
  color: string;
  border: string;
}

export interface PanchangInfo {
  tithi: string;
  tithiIndex: number;
  nakshatra: string;
  nakshatraPada: number;
  yoga: string;
  karana: string;
  abhijitMuhurta: string;
  rahuKalam: string;
  moonPhase: string;
  moonIllumination: number;
  sunSign: string;
  moonSign: string;
}

export interface VimshottariDashaInfo {
  mahadasha: string;
  antardasha: string;
  startDate: string;
  endDate: string;
  progressPercent: number;
  interpretation: string;
}

const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

const ZODIAC_SIGNS = [
  { name: 'Aries', symbol: '♈', element: 'Fire 🔥', lord: 'Mars' },
  { name: 'Taurus', symbol: '♉', element: 'Earth 🌍', lord: 'Venus' },
  { name: 'Gemini', symbol: '♊', element: 'Air 🌬️', lord: 'Mercury' },
  { name: 'Cancer', symbol: '♋', element: 'Water 💧', lord: 'Moon' },
  { name: 'Leo', symbol: '♌', element: 'Fire 🔥', lord: 'Sun' },
  { name: 'Virgo', symbol: '♍', element: 'Earth 🌍', lord: 'Mercury' },
  { name: 'Libra', symbol: '♎', element: 'Air 🌬️', lord: 'Venus' },
  { name: 'Scorpio', symbol: '♏', element: 'Water 💧', lord: 'Mars' },
  { name: 'Sagittarius', symbol: '♐', element: 'Fire 🔥', lord: 'Jupiter' },
  { name: 'Capricorn', symbol: '♑', element: 'Earth 🌍', lord: 'Saturn' },
  { name: 'Aquarius', symbol: '♒', element: 'Air 🌬️', lord: 'Saturn' },
  { name: 'Pisces', symbol: '♓', element: 'Water 💧', lord: 'Jupiter' }
];

const TITHIS = [
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashti', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
  'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima/Amavasya'
];

const YOGAS = [
  'Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda',
  'Sukarma', 'Dhriti', 'Shula', 'Ganda', 'Vriddhi', 'Dhruva',
  'Vyaghata', 'Harshana', 'Vajra', 'Siddhi', 'Vyatipata', 'Variyan',
  'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla',
  'Brahma', 'Indra', 'Vaidhriti'
];

const DASHA_LORDS = [
  { lord: 'Ketu', years: 7 },
  { lord: 'Venus', years: 20 },
  { lord: 'Sun', years: 6 },
  { lord: 'Moon', years: 10 },
  { lord: 'Mars', years: 7 },
  { lord: 'Rahu', years: 18 },
  { lord: 'Jupiter', years: 16 },
  { lord: 'Saturn', years: 19 },
  { lord: 'Mercury', years: 17 }
];

/**
 * Calculates Ayanamsha for a given Date.
 * Baseline Lahiri uses standard True Chitrapaksha / IAU-standard 23.856° at J2000.0.
 */
export function calculateAyanamsha(date: Date = new Date(), mode: 'lahiri' | 'raman' | 'kp' | 'fagan_bradley' | 'yukteshwar' | 'true_chitrapaksha' = 'lahiri'): number {
  const year = date.getUTCFullYear();
  const startOfYear = Date.UTC(year, 0, 1);
  const fracYear = year + (date.getTime() - startOfYear) / (365.25 * 86400000);
  let base2000 = 23.856;
  if (mode === 'raman') base2000 = 22.42;
  else if (mode === 'kp') base2000 = 23.82;
  else if (mode === 'fagan_bradley') base2000 = 24.74;
  else if (mode === 'yukteshwar') base2000 = 21.05;
  else if (mode === 'true_chitrapaksha') base2000 = 23.856;
  else if (mode === 'lahiri') base2000 = 23.856;
  return base2000 + ((fracYear - 2000.0) * 0.01397);
}

/**
 * Computes instantaneous speed in degrees/day for a celestial body.
 */
export function getPlanetarySpeed(bodyName: string, date: Date = new Date()): number {
  const bodyMap: Record<string, Body> = {
    Sun: Body.Sun,
    Moon: Body.Moon,
    Mars: Body.Mars,
    Mercury: Body.Mercury,
    Jupiter: Body.Jupiter,
    Venus: Body.Venus,
    Saturn: Body.Saturn,
  };
  const body = bodyMap[bodyName];
  if (!body) {
    if (bodyName === 'Rahu' || bodyName === 'Ketu') return -0.05295;
    return 0.9856;
  }
  const dt = 0.5 * 86400000;
  const v1 = GeoVector(body, new Date(date.getTime() - dt), true);
  const v2 = GeoVector(body, new Date(date.getTime() + dt), true);
  const e1 = Ecliptic(v1).elon;
  const e2 = Ecliptic(v2).elon;
  let diff = e2 - e1;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return diff;
}

// High-speed LRU memory cache for astronomical calculations (0.0ms subsequent execution)
const POSITIONS_CACHE = new Map<string, PlanetPosition[]>();
const PANCHANG_CACHE = new Map<string, PanchangInfo>();
const MAX_CACHE_SIZE = 250;

/**
 * Calculates planetary positions based on date/time.
 * Uses high-precision Ecliptic longitudes from Astronomy Engine and true spherical trigonometry for Ascendant.
 */
export function calculatePlanetaryPositions(
  birthDateStr?: string, 
  birthTimeStr?: string, 
  customAyanamsha?: number,
  latitude: number = 21.4225,
  longitude: number = 39.8262
): PlanetPosition[] {
  const config = GlobalConfigManager.getConfig();
  const cacheKey = `${birthDateStr || 'default'}_${birthTimeStr || '12:00'}_${customAyanamsha ?? 'auto'}_${latitude.toFixed(3)}_${longitude.toFixed(3)}_${config.astrologySystem}_${config.ayanamsaMode}`;
  
  const cached = POSITIONS_CACHE.get(cacheKey);
  if (cached) return cached;

  let date = new Date('1998-06-15T12:00:00Z');
  if (birthDateStr && typeof birthDateStr === 'string' && birthDateStr.trim().length >= 4) {
    const timePart = birthTimeStr || '12:00';
    const parsed = new Date(`${birthDateStr.trim()}T${timePart.length === 5 ? `${timePart}:00` : timePart}Z`);
    if (!isNaN(parsed.getTime())) {
      date = parsed;
    }
  } else {
    date = new Date();
  }

  const ayanamshaOffset = customAyanamsha !== undefined 
    ? customAyanamsha 
    : (config.astrologySystem === 'western' ? 0 : calculateAyanamsha(date, config.ayanamsaMode || 'lahiri'));
  
  // Real Ecliptic Longitudes (Tropical adjusted by Ayanamsha)
  const sunL = (Ecliptic(GeoVector(Body.Sun, date, true)).elon - ayanamshaOffset + 360) % 360;
  const moonL = (Ecliptic(GeoVector(Body.Moon, date, true)).elon - ayanamshaOffset + 360) % 360;
  const marsL = (Ecliptic(GeoVector(Body.Mars, date, true)).elon - ayanamshaOffset + 360) % 360;
  const mercL = (Ecliptic(GeoVector(Body.Mercury, date, true)).elon - ayanamshaOffset + 360) % 360;
  const jupL = (Ecliptic(GeoVector(Body.Jupiter, date, true)).elon - ayanamshaOffset + 360) % 360;
  const venL = (Ecliptic(GeoVector(Body.Venus, date, true)).elon - ayanamshaOffset + 360) % 360;
  const satL = (Ecliptic(GeoVector(Body.Saturn, date, true)).elon - ayanamshaOffset + 360) % 360;
  
  const jd = (date.getTime() / 86400000.0) + 2440587.5;
  const d = jd - 2451545.0;
  const rahuL = (125.044 - 0.05295 * d - ayanamshaOffset + 360000) % 360;
  const ketuL = (rahuL + 180) % 360;

  // High-precision spherical trigonometric Ascendant calculation (DEFECT-001 resolved)
  const ascendantLong = AstronomyEngine.calculateAscendant(
    date,
    latitude,
    longitude,
    config.astrologySystem === 'western' ? 'tropical' : 'sidereal',
    config.ayanamsaMode || 'lahiri'
  );

  // Compute actual daily velocities (DEFECT-003 resolved)
  const sunSpeed = getPlanetarySpeed('Sun', date);
  const moonSpeed = getPlanetarySpeed('Moon', date);
  const marsSpeed = getPlanetarySpeed('Mars', date);
  const mercSpeed = getPlanetarySpeed('Mercury', date);
  const jupSpeed = getPlanetarySpeed('Jupiter', date);
  const venSpeed = getPlanetarySpeed('Venus', date);
  const satSpeed = getPlanetarySpeed('Saturn', date);

  const rawPositions = [
    { name: 'Ascendant', symbol: 'Asc', long: ascendantLong, speedVal: 360, retro: false, color: 'text-white', border: 'border-white/30', remedy: 'Maintain clear intentions and physical equilibrium.' },
    { name: 'Sun', symbol: '☀️', long: sunL, speedVal: sunSpeed, retro: false, color: 'text-[#F59E0B]', border: 'border-[#F59E0B]/30', remedy: 'Offer morning water to Sun & recite Aditya Hrudayam.' },
    { name: 'Moon', symbol: '🌙', long: moonL, speedVal: moonSpeed, retro: false, color: 'text-[#06B6D4]', border: 'border-[#06B6D4]/30', remedy: 'Wear white/silver and practice calming meditation.' },
    { name: 'Mars', symbol: '♂️', long: marsL, speedVal: marsSpeed, retro: marsSpeed < 0, color: 'text-[#EF4444]', border: 'border-[#EF4444]/30', remedy: 'Engage in physical exercise & chant Hanuman Chalisa.' },
    { name: 'Mercury', symbol: '☿️', long: mercL, speedVal: mercSpeed, retro: mercSpeed < 0, color: 'text-[#22C55E]', border: 'border-[#22C55E]/30', remedy: 'Verify written contracts & back up digital work.' },
    { name: 'Jupiter', symbol: '♃', long: jupL, speedVal: jupSpeed, retro: jupSpeed < 0, color: 'text-[#7C3AED]', border: 'border-[#7C3AED]/30', remedy: 'Support educational causes & respect teachers.' },
    { name: 'Venus', symbol: '♀️', long: venL, speedVal: venSpeed, retro: venSpeed < 0, color: 'text-[#EC4899]', border: 'border-pink-500/30', remedy: 'Cultivate creative arts & honor female mentors.' },
    { name: 'Saturn', symbol: '♄', long: satL, speedVal: satSpeed, retro: satSpeed < 0, color: 'text-[#2563EB]', border: 'border-[#2563EB]/30', remedy: 'Maintain strict discipline & serve community elders.' },
    { name: 'Rahu', symbol: '☊', long: rahuL, speedVal: -0.05295, retro: true, color: 'text-[#CBD5E1]', border: 'border-white/10', remedy: 'Practice Pranayama breathwork & avoid impulse decisions.' },
    { name: 'Ketu', symbol: '☋', long: ketuL, speedVal: -0.05295, retro: true, color: 'text-[#CBD5E1]', border: 'border-white/10', remedy: 'Engage in introspection & study ancient philosophy.' },
  ];

  const result: PlanetPosition[] = rawPositions.map((p) => {
    const rawLong = (p.long % 360 + 360) % 360;
    const signIndex = Math.floor(rawLong / 30) % 12;
    const degreeDecimal = rawLong % 30;
    const degInt = Math.floor(degreeDecimal);
    const minInt = Math.floor((degreeDecimal - degInt) * 60);

    const signObj = ZODIAC_SIGNS[signIndex] || ZODIAC_SIGNS[0];
    const ascSignIndex = Math.floor(ascendantLong / 30) % 12;
    const houseNum = ((signIndex - ascSignIndex + 12) % 12) + 1;

    const nakshatraIndex = Math.floor(p.long / (360 / 27));
    const nakshatraName = NAKSHATRAS[nakshatraIndex] || NAKSHATRAS[0];
    const pada = Math.floor(((p.long % (360 / 27)) / (360 / 108))) + 1;

    let strength = 'Neutral';
    if (p.name === 'Sun' && signIndex === 0) strength = 'Exalted (High Vitality)';
    else if (p.name === 'Moon' && signIndex === 1) strength = 'Exalted (Mind Harmony)';
    else if (p.name === 'Saturn' && (signIndex === 9 || signIndex === 10)) strength = 'Own House (Strong)';
    else if (p.name === 'Jupiter' && signIndex === 11) strength = 'Own House (Wisdom)';
    else if (p.retro) strength = 'Retrograde (Karmic Focus)';

    const speedPrefix = p.speedVal >= 0 ? '+' : '';
    const speedFormatted = `${speedPrefix}${p.speedVal.toFixed(2)}°/d`;

    return {
      name: p.name,
      symbol: p.symbol,
      sign: `${signObj.name} ${signObj.symbol}`,
      degree: `${degInt}° ${minInt < 10 ? '0' : ''}${minInt}'`,
      degreeDecimal: p.long,
      house: `${houseNum}${houseNum === 1 ? 'st' : houseNum === 2 ? 'nd' : houseNum === 3 ? 'rd' : 'th'} House`,
      houseNumber: houseNum,
      speed: speedFormatted,
      retrograde: p.retro,
      element: signObj.element,
      nakshatra: nakshatraName,
      pada,
      strength,
      remedies: p.remedy,
      color: p.color,
      border: p.border,
    };
  });

  if (POSITIONS_CACHE.size >= MAX_CACHE_SIZE) {
    const firstKey = POSITIONS_CACHE.keys().next().value;
    if (firstKey) POSITIONS_CACHE.delete(firstKey);
  }
  POSITIONS_CACHE.set(cacheKey, result);

  return result;
}

/**
 * Computes Panchang data (Tithi, Nakshatra, Yoga, Karana, Rahu Kalam, Muhurta) dynamically.
 */
export function calculatePanchang(date = new Date()): PanchangInfo {
  const panchangKey = `${date.toISOString().split('T')[0]}_${date.getHours()}`;
  const cachedPanchang = PANCHANG_CACHE.get(panchangKey);
  if (cachedPanchang) return cachedPanchang;
  const positions = calculatePlanetaryPositions(date.toISOString().split('T')[0]);
  const sun = positions.find(p => p.name === 'Sun');
  const moon = positions.find(p => p.name === 'Moon');

  const sunLong = sun ? sun.degreeDecimal : 0;
  const moonLong = moon ? moon.degreeDecimal : 0;

  // Angle between Moon and Sun
  const angle = (moonLong - sunLong + 360) % 360;
  const tithiIndex = Math.floor(angle / 12);
  const isShukla = tithiIndex < 15;
  const tithiName = `${isShukla ? 'Shukla' : 'Krishna'} ${TITHIS[tithiIndex % 15]}`;

  const nakshatraIndex = Math.floor(moonLong / (360 / 27));
  const nakshatraName = NAKSHATRAS[nakshatraIndex] || 'Rohini';
  const nakshatraPada = Math.floor(((moonLong % (360 / 27)) / (360 / 108))) + 1;

  const yogaIndex = Math.floor(((sunLong + moonLong) % 360) / (360 / 27));
  const yogaName = YOGAS[yogaIndex] || 'Siddhi';

  // Real Karana calculation (half of Tithi = 6°)
  const karanaIndex = Math.floor(angle / 6);
  const movableKaranas = ['Bava', 'Balava', 'Kaulava', 'Taitila', 'Gara', 'Vanija', 'Vishti'];
  let karanaName = 'Bava';
  if (karanaIndex === 0) {
    karanaName = 'Kimstughna';
  } else if (karanaIndex >= 57) {
    const fixedKaranas = ['Shakuni', 'Chatushpada', 'Naga'];
    karanaName = fixedKaranas[karanaIndex - 57] || 'Naga';
  } else {
    karanaName = movableKaranas[(karanaIndex - 1) % 7];
  }

  // Weekday-dependent Rahu Kalam
  const dayOfWeek = date.getDay(); // 0 = Sunday
  const rahuKalamSlots = [
    '04:30 PM - 06:00 PM', // Sunday
    '07:30 AM - 09:00 AM', // Monday
    '03:00 PM - 04:30 PM', // Tuesday
    '12:00 PM - 01:30 PM', // Wednesday
    '01:30 PM - 03:00 PM', // Thursday
    '10:30 AM - 12:00 PM', // Friday
    '09:00 AM - 10:30 AM', // Saturday
  ];
  const rahuKalam = rahuKalamSlots[dayOfWeek] || '04:30 PM - 06:00 PM';

  const illumination = Math.round((1 - Math.cos((angle * Math.PI) / 180)) * 50);

  const panchangResult: PanchangInfo = {
    tithi: tithiName,
    tithiIndex,
    nakshatra: `${nakshatraName} (Pada ${nakshatraPada})`,
    nakshatraPada,
    yoga: `${yogaName} Yoga`,
    karana: `${karanaName} Karana`,
    abhijitMuhurta: '11:48 AM - 12:36 PM',
    rahuKalam,
    moonPhase: `${isShukla ? 'Waxing' : 'Waning'} ${illumination}%`,
    moonIllumination: illumination,
    sunSign: sun ? sun.sign : 'Aries ♈',
    moonSign: moon ? moon.sign : 'Taurus ♉',
  };

  if (PANCHANG_CACHE.size >= MAX_CACHE_SIZE) {
    const firstKey = PANCHANG_CACHE.keys().next().value;
    if (firstKey) PANCHANG_CACHE.delete(firstKey);
  }
  PANCHANG_CACHE.set(panchangKey, panchangResult);

  return panchangResult;
}

/**
 * Computes Vimshottari Dasha details dynamically from Moon Nakshatra & Birth Date.
 */
export function calculateVimshottariDasha(moonNakshatraIndexOrDob: number | string = 3, birthDateStr = '1998-06-15'): VimshottariDashaInfo {
  let dobStr = '1998-06-15';
  let moonLongitude = 42.1; // Default Rohini

  if (typeof moonNakshatraIndexOrDob === 'string') {
    dobStr = moonNakshatraIndexOrDob;
    const positions = calculatePlanetaryPositions(dobStr);
    const moon = positions.find(p => p.name === 'Moon');
    if (moon) moonLongitude = moon.degreeDecimal;
  } else if (typeof moonNakshatraIndexOrDob === 'number') {
    moonLongitude = moonNakshatraIndexOrDob * (360 / 27) + 2.0;
    if (birthDateStr) dobStr = birthDateStr;
  }

  const birthDate = new Date(dobStr);
  const effectiveBirthDate = isNaN(birthDate.getTime()) ? new Date('1998-06-15') : birthDate;

  const result = computeVimshottariDashaTimeline(moonLongitude, effectiveBirthDate);
  const currentPeriod = result.timeline.find(p => p.isCurrent) || result.timeline[0];

  const now = new Date();
  const startMs = new Date(currentPeriod.startDate).getTime();
  const endMs = new Date(currentPeriod.endDate).getTime();
  const totalMs = endMs - startMs;
  const elapsedMs = now.getTime() - startMs;
  const progressPercent = totalMs > 0 ? Math.min(Math.max(Math.round((elapsedMs / totalMs) * 100), 5), 95) : 50;

  return {
    mahadasha: result.currentMahadasha,
    antardasha: result.currentAntardasha,
    startDate: currentPeriod.startDate,
    endDate: currentPeriod.endDate,
    progressPercent,
    interpretation: `${result.currentMahadasha} Mahadasha with ${result.currentAntardasha} Antardasha provides strategic focus and evolutionary growth.`
  };
}

/**
 * Calculates Ashta Koota Compatibility Score between two birth charts using real Moon Nakshatra metrics.
 */
export function calculateAshtaKootaScore(p1Name: string, p1Dob: string, p2Name: string, p2Dob: string) {
  let p1MoonDeg = 45.0;
  let p2MoonDeg = 120.0;

  if (p1Dob && p1Dob.length >= 4) {
    const pos1 = calculatePlanetaryPositions(p1Dob);
    const m1 = pos1.find(p => p.name === 'Moon');
    if (m1) p1MoonDeg = m1.degreeDecimal;
  }
  if (p2Dob && p2Dob.length >= 4) {
    const pos2 = calculatePlanetaryPositions(p2Dob);
    const m2 = pos2.find(p => p.name === 'Moon');
    if (m2) p2MoonDeg = m2.degreeDecimal;
  }

  const gunasResult = NakshatraEngine.calculateAshtakootaGunas(p1MoonDeg, p2MoonDeg);
  const totalScore = gunasResult.totalGunas;

  let recommendation = 'Fair Compatibility — Requires conscious communication and shared vision.';
  if (totalScore >= 28) recommendation = 'Excellent Compatibility — Highly auspicious match for long-term growth & harmony.';
  else if (totalScore >= 20) recommendation = 'Good Compatibility — Strong mutual understanding with minor effort needed.';
  else if (totalScore < 18) recommendation = 'Requires Remedial Balance — Perform Nadi/Bhakoot harmony rituals for optimal balance.';

  const b = gunasResult.breakdown;
  return {
    totalScore,
    maxScore: 36,
    recommendation,
    kootas: [
      { name: '1. Varna (Spiritual Ego)', score: b.varna || 1, max: 1, desc: 'Work ethic & spiritual alignment' },
      { name: '2. Vashya (Mutual Attraction)', score: b.vashya || 2, max: 2, desc: 'Power dynamics & mutual influence' },
      { name: '3. Tara (Destiny & Health)', score: b.tara || 3, max: 3, desc: 'Longevity & health resonance' },
      { name: '4. Yoni (Intimacy & Temperament)', score: b.yoni || 4, max: 4, desc: 'Physical & psychological compatibility' },
      { name: '5. Graha Maitri (Mental Friendship)', score: b.maitri || 5, max: 5, desc: 'Intellectual & emotional bonding' },
      { name: '6. Gana (Temperament Type)', score: b.gana || 6, max: 6, desc: 'Deva / Manushya / Rakshasa balance' },
      { name: '7. Bhakoot (Family & Growth)', score: b.bhakoot || 7, max: 7, desc: 'Prosperity & emotional harmony' },
      { name: '8. Nadi (Genetic & Spiritual Health)', score: b.nadi || 8, max: 8, desc: 'Spiritual lineage & progeny health' },
    ]
  };
}

function getOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

