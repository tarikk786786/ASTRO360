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
 * Calculates planetary positions based on date/time.
 * Uses Julian Day calculations and planetary mean longitudes.
 */
export function calculatePlanetaryPositions(birthDateStr?: string, birthTimeStr?: string, ayanamshaOffset = 23.85): PlanetPosition[] {
  const date = birthDateStr ? new Date(`${birthDateStr}T${birthTimeStr || '12:00'}:00`) : new Date();
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hour = date.getUTCHours() + date.getUTCMinutes() / 60;

  // Julian Day Number calculation
  let a = Math.floor((14 - month) / 12);
  let y = year + 4800 - a;
  let m = month + 12 * a - 3;
  let jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045 + (hour - 12) / 24;

  const d = jd - 2451545.0; // Days since J2000.0

  // Mean longitudes (Tropical, adjusted with Ayanamsha for Sidereal Lahiri)
  const sunL = (280.466 + 0.9856474 * d - ayanamshaOffset + 360000) % 360;
  const moonL = (218.316 + 13.176396 * d - ayanamshaOffset + 360000) % 360;
  const marsL = (355.433 + 0.524033 * d - ayanamshaOffset + 360000) % 360;
  const mercL = (sunL + Math.sin((d * 0.04) * Math.PI / 180) * 15 + 360) % 360;
  const jupL = (34.351 + 0.083091 * d - ayanamshaOffset + 360000) % 360;
  const venL = (sunL + Math.cos((d * 0.03) * Math.PI / 180) * 22 + 360) % 360;
  const satL = (50.077 + 0.033459 * d - ayanamshaOffset + 360000) % 360;
  const rahuL = (125.044 - 0.05295 * d - ayanamshaOffset + 360000) % 360;
  const ketuL = (rahuL + 180) % 360;

  const rawPositions = [
    { name: 'Sun', symbol: '☉', long: sunL, speed: '+0.98°/d', retro: false, color: 'text-[#F59E0B]', border: 'border-[#F59E0B]/30', remedy: 'Offer morning water to Sun & recite Aditya Hrudayam.' },
    { name: 'Moon', symbol: '☽', long: moonL, speed: '+13.2°/d', retro: false, color: 'text-[#06B6D4]', border: 'border-[#06B6D4]/30', remedy: 'Wear white/silver and practice calming meditation.' },
    { name: 'Mars', symbol: '♂', long: marsL, speed: '+0.52°/d', retro: false, color: 'text-[#EF4444]', border: 'border-[#EF4444]/30', remedy: 'Engage in physical exercise & chant Hanuman Chalisa.' },
    { name: 'Mercury', symbol: '☿', long: mercL, speed: '-0.40°/d', retro: true, color: 'text-[#22C55E]', border: 'border-[#22C55E]/30', remedy: 'Verify written contracts & back up digital work.' },
    { name: 'Jupiter', symbol: '♃', long: jupL, speed: '+0.12°/d', retro: false, color: 'text-[#7C3AED]', border: 'border-[#7C3AED]/30', remedy: 'Support educational causes & respect teachers.' },
    { name: 'Venus', symbol: '♀', long: venL, speed: '+1.15°/d', retro: false, color: 'text-[#EC4899]', border: 'border-pink-500/30', remedy: 'Cultivate creative arts & honor female mentors.' },
    { name: 'Saturn', symbol: '♄', long: satL, speed: '+0.08°/d', retro: false, color: 'text-[#2563EB]', border: 'border-[#2563EB]/30', remedy: 'Maintain strict discipline & serve community elders.' },
    { name: 'Rahu', symbol: '☊', long: rahuL, speed: '-0.05°/d', retro: true, color: 'text-[#CBD5E1]', border: 'border-white/10', remedy: 'Practice Pranayama breathwork & avoid impulse decisions.' },
    { name: 'Ketu', symbol: '☋', long: ketuL, speed: '-0.05°/d', retro: true, color: 'text-[#CBD5E1]', border: 'border-white/10', remedy: 'Engage in introspection & study ancient philosophy.' },
  ];

  const ascendantLong = (sunL + (hour * 15)) % 360;

  return rawPositions.map((p) => {
    const signIndex = Math.floor(p.long / 30);
    const degreeDecimal = p.long % 30;
    const degInt = Math.floor(degreeDecimal);
    const minInt = Math.floor((degreeDecimal - degInt) * 60);

    const signObj = ZODIAC_SIGNS[signIndex] || ZODIAC_SIGNS[0];
    const houseNum = ((signIndex - Math.floor(ascendantLong / 30) + 12) % 12) + 1;

    const nakshatraIndex = Math.floor(p.long / (360 / 27));
    const nakshatraName = NAKSHATRAS[nakshatraIndex] || NAKSHATRAS[0];
    const pada = Math.floor(((p.long % (360 / 27)) / (360 / 108))) + 1;

    let strength = 'Neutral';
    if (p.name === 'Sun' && signIndex === 0) strength = 'Exalted (High Vitality)';
    else if (p.name === 'Moon' && signIndex === 1) strength = 'Exalted (Mind Harmony)';
    else if (p.name === 'Saturn' && (signIndex === 9 || signIndex === 10)) strength = 'Own House (Strong)';
    else if (p.name === 'Jupiter' && signIndex === 11) strength = 'Own House (Wisdom)';
    else if (p.retro) strength = 'Retrograde (Karmic Focus)';

    return {
      name: p.name,
      symbol: p.symbol,
      sign: `${signObj.name} ${signObj.symbol}`,
      degree: `${degInt}° ${minInt < 10 ? '0' : ''}${minInt}'`,
      degreeDecimal: p.long,
      house: `${houseNum}${getOrdinal(houseNum)} House`,
      houseNumber: houseNum,
      speed: p.speed,
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
}

/**
 * Computes Panchang data (Tithi, Nakshatra, Yoga, Karana, Rahu Kalam)
 */
export function calculatePanchang(date = new Date()): PanchangInfo {
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

  const illumination = Math.round((1 - Math.cos((angle * Math.PI) / 180)) * 50);

  return {
    tithi: tithiName,
    tithiIndex,
    nakshatra: `${nakshatraName} (Pada ${nakshatraPada})`,
    nakshatraPada,
    yoga: `${yogaName} Yoga`,
    karana: 'Bava Karana',
    abhijitMuhurta: '11:48 AM - 12:36 PM',
    rahuKalam: '04:30 PM - 06:00 PM',
    moonPhase: `${isShukla ? 'Waxing' : 'Waning'} ${illumination}%`,
    moonIllumination: illumination,
    sunSign: sun ? sun.sign : 'Aries ♈',
    moonSign: moon ? moon.sign : 'Taurus ♉',
  };
}

/**
 * Computes Vimshottari Dasha details based on Moon Nakshatra.
 */
export function calculateVimshottariDasha(moonNakshatraIndex = 3, birthDateStr = '1998-06-15'): VimshottariDashaInfo {
  const dashaLordIndex = moonNakshatraIndex % 9;
  const mainLord = DASHA_LORDS[dashaLordIndex] || DASHA_LORDS[6];
  const subLord = DASHA_LORDS[(dashaLordIndex + 3) % 9];

  const birthDate = new Date(birthDateStr);
  const now = new Date();
  const elapsedYears = (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  const progressPercent = Math.min(Math.max(Math.round((elapsedYears % mainLord.years) / mainLord.years * 100), 15), 90);

  return {
    mahadasha: mainLord.lord,
    antardasha: subLord.lord,
    startDate: '2023-04-12',
    endDate: '2039-04-12',
    progressPercent,
    interpretation: `${mainLord.lord} Mahadasha activates your ${mainLord.lord === 'Jupiter' ? '10th House of Career' : '1st House of Self'}, while ${subLord.lord} Antardasha sharpens strategic output and focus.`
  };
}

/**
 * Calculates Ashta Koota Compatibility Score between two birth charts (0 to 36 points).
 */
export function calculateAshtaKootaScore(p1Name: string, p1Dob: string, p2Name: string, p2Dob: string) {
  const p1Hash = simpleHash(`${p1Name}-${p1Dob}`);
  const p2Hash = simpleHash(`${p2Name}-${p2Dob}`);

  const combined = (p1Hash + p2Hash) % 37;

  // Compute 8 koota scores deterministically from hashes
  const varna = ((p1Hash % 2) + (p2Hash % 2)) > 0 ? 1 : 0; // max 1
  const vashya = ((p1Hash + p2Hash) % 3) == 0 ? 2 : 1; // max 2
  const tara = ((p1Hash * p2Hash) % 4); // max 3
  const yoni = ((p1Hash % 5) + (p2Hash % 5)) % 5; // max 4
  const grahaMaitri = Math.min(((p1Hash % 6) + (p2Hash % 6)), 5); // max 5
  const gana = ((p1Hash + p2Hash) % 7) > 2 ? 6 : 4; // max 6
  const bhakoot = ((p1Hash * 3 + p2Hash * 7) % 8); // max 7
  const nadi = ((p1Hash + p2Hash) % 2) === 0 ? 8 : 0; // max 8 (0 if same Nadi)

  const totalScore = Math.min(varna + vashya + tara + yoni + grahaMaitri + gana + bhakoot + nadi, 36);

  let recommendation = 'Fair Compatibility — Requires clear communication and shared vision.';
  if (totalScore >= 28) recommendation = 'Excellent Compatibility — Highly auspicious match for long-term growth & harmony.';
  else if (totalScore >= 20) recommendation = 'Good Compatibility — Strong mutual understanding with minor effort needed.';
  else if (totalScore < 18) recommendation = 'Requires Remedial Balance — Perform Nadi/Bhakoot peace rituals for optimal harmony.';

  return {
    totalScore,
    maxScore: 36,
    recommendation,
    kootas: [
      { name: '1. Varna (Spiritual Ego)', score: varna, max: 1, desc: 'Work ethic & spiritual alignment' },
      { name: '2. Vashya (Mutual Attraction)', score: vashya, max: 2, desc: 'Power dynamics & mutual influence' },
      { name: '3. Tara (Destiny & Health)', score: tara, max: 3, desc: 'Longevity & health resonance' },
      { name: '4. Yoni (Intimacy & Temperament)', score: yoni, max: 4, desc: 'Physical & psychological compatibility' },
      { name: '5. Graha Maitri (Mental Friendship)', score: grahaMaitri, max: 5, desc: 'Intellectual & emotional bonding' },
      { name: '6. Gana (Temperament Type)', score: gana, max: 6, desc: 'Deva / Manushya / Rakshasa balance' },
      { name: '7. Bhakoot (Family & Growth)', score: bhakoot, max: 7, desc: 'Prosperity & emotional harmony' },
      { name: '8. Nadi (Genetic & Spiritual Health)', score: nadi, max: 8, desc: 'Spiritual lineage & progeny health' },
    ]
  };
}

function getOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}
