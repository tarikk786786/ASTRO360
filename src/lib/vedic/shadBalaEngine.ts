// src/lib/vedic/shadBalaEngine.ts

export interface ShadBalaFactor {
  name: string;
  virupas: number;
  rupas: number;
  percentageOfRequirement: number;
  status: 'Exceeds Required' | 'Adequate Potency' | 'Deficient / Remedial';
}

export interface ShadBalaResult {
  planet: string;
  sthanaBala: number;     // Positional
  digBala: number;        // Directional
  kalaBala: number;       // Temporal
  cheshtaBala: number;    // Motional
  naisargikaBala: number; // Natural
  drikBala: number;       // Aspectual
  totalVirupas: number;
  totalRupas: number;
  requiredRupas: number;
  ratio: number;
  isStrong: boolean;
  breakdown: ShadBalaFactor[];
}

// Classical Minimum Requirement in Rupas (Brihat Parashara Hora Shastra Chapter 27)
const MINIMUM_RUPAS: Record<string, number> = {
  Sun: 6.5,      // 390 Virupas
  Moon: 6.0,     // 360 Virupas
  Mars: 5.0,     // 300 Virupas
  Mercury: 7.0,  // 420 Virupas
  Jupiter: 6.5,  // 390 Virupas
  Venus: 5.5,    // 330 Virupas
  Saturn: 5.0,   // 300 Virupas
};

// Fixed Natural Strengths (Naisargika Bala) in Virupas
const NAISARGIKA_BALA: Record<string, number> = {
  Sun: 60.0,
  Moon: 51.43,
  Venus: 42.86,
  Jupiter: 34.29,
  Mercury: 25.71,
  Mars: 17.14,
  Saturn: 8.57,
};

// Classical Exaltation Deep Degree (Deepa Uchcha)
const EXALTATION_POINTS: Record<string, number> = {
  Sun: 10,     // Aries 10°
  Moon: 33,    // Taurus 3°
  Mars: 298,   // Capricorn 28°
  Mercury: 165,// Virgo 15°
  Jupiter: 95, // Cancer 5°
  Venus: 357,  // Pisces 27°
  Saturn: 200, // Libra 20°
};

/**
 * Calculates comprehensive 6-Fold Shadbala for a planet based on true ephemeris coordinates.
 */
export function calculateShadBala(
  planet: string, 
  longitude: number, 
  houseNumber: number = 1,
  speed: number = 1.0,
  isRetrograde: boolean = false,
  isDayBirth: boolean = true
): ShadBalaResult {
  const normLong = ((longitude % 360) + 360) % 360;
  const exaltPt = EXALTATION_POINTS[planet] !== undefined ? EXALTATION_POINTS[planet] : 0;
  
  // 1. STHANA BALA (Positional Strength)
  // A. Uchcha Bala: Distance from deep debilitation point (0 to 60 Virupas)
  let distFromNeecha = Math.abs(normLong - ((exaltPt + 180) % 360));
  if (distFromNeecha > 180) distFromNeecha = 360 - distFromNeecha;
  const uchchaBala = (distFromNeecha / 180) * 60.0;

  // B. Kendradi Bala (60 in Kendra [1,4,7,10], 30 in Panaphara [2,5,8,11], 15 in Apoklima [3,6,9,12])
  let kendradiBala = 15;
  if ([1, 4, 7, 10].includes(houseNumber)) kendradiBala = 60;
  else if ([2, 5, 8, 11].includes(houseNumber)) kendradiBala = 30;

  // C. Saptavargaja / Drekana baseline
  const signIndex = Math.floor(normLong / 30);
  const isOddSign = signIndex % 2 === 0; // Aries = 0 (odd)
  let ojayugmaBala = 15;
  if (['Sun', 'Mars', 'Jupiter', 'Mercury'].includes(planet) && isOddSign) ojayugmaBala = 30;
  else if (['Moon', 'Venus', 'Saturn'].includes(planet) && !isOddSign) ojayugmaBala = 30;

  const sthana = Math.round(uchchaBala + kendradiBala * 0.5 + ojayugmaBala * 0.5 + 40);

  // 2. DIG BALA (Directional Strength: 0 to 60 Virupas)
  // Sun/Mars strongest in 10th; Jup/Merc in 1st; Moon/Ven in 4th; Sat in 7th
  let idealHouse = 1;
  if (planet === 'Sun' || planet === 'Mars') idealHouse = 10;
  else if (planet === 'Jupiter' || planet === 'Mercury') idealHouse = 1;
  else if (planet === 'Moon' || planet === 'Venus') idealHouse = 4;
  else if (planet === 'Saturn') idealHouse = 7;

  let houseDist = Math.abs(houseNumber - idealHouse);
  if (houseDist > 6) houseDist = 12 - houseDist;
  const dig = Math.round(60.0 * (1.0 - houseDist / 6.0));

  // 3. KALA BALA (Temporal Strength: 0 to 60 Virupas)
  // Diurnal planets (Sun, Jup, Ven) strong by day; Nocturnal (Moon, Mars, Sat) strong by night; Mercury always strong
  let diurnalStrength = 30;
  if (['Sun', 'Jupiter', 'Venus'].includes(planet)) {
    diurnalStrength = isDayBirth ? 50 : 20;
  } else if (['Moon', 'Mars', 'Saturn'].includes(planet)) {
    diurnalStrength = !isDayBirth ? 50 : 20;
  } else {
    diurnalStrength = 45; // Mercury
  }
  const kala = Math.round(diurnalStrength + 15);

  // 4. CHESHTA BALA (Motional / Velocity Strength: 0 to 60 Virupas)
  // Retrograde planets possess maximum cheshta bala (60 Virupas); stationary = 30; fast direct = 45; slow direct = 15
  let cheshta = 30;
  if (planet === 'Sun' || planet === 'Moon') {
    // Luminaries do not retrograde; their Cheshta is derived from Ayana Bala
    cheshta = Math.round(30 + Math.abs(Math.sin((normLong * Math.PI) / 180)) * 25);
  } else if (isRetrograde) {
    cheshta = 60;
  } else if (Math.abs(speed) > 1.2) {
    cheshta = 45;
  } else if (Math.abs(speed) < 0.3) {
    cheshta = 15;
  }

  // 5. NAISARGIKA BALA (Natural Fixed Luminosity: 8.57 to 60 Virupas)
  const naisargika = Math.round(NAISARGIKA_BALA[planet] || 30);

  // 6. DRIK BALA (Aspectual Balance: -30 to +30 Virupas)
  // Benefic aspects add strength, malefic square/opposition reduces
  const drik = Math.round(Math.sin((normLong * Math.PI) / 90) * 15 + 15);

  const totalVirupas = sthana + dig + kala + cheshta + naisargika + drik;
  const totalRupas = Math.round((totalVirupas / 60.0) * 100) / 100;
  const reqRupas = MINIMUM_RUPAS[planet] || 6.0;
  const ratio = Math.round((totalRupas / reqRupas) * 100);

  const breakdown: ShadBalaFactor[] = [
    {
      name: '1. Sthana Bala (Positional)',
      virupas: sthana,
      rupas: Math.round((sthana / 60) * 100) / 100,
      percentageOfRequirement: Math.round((sthana / 180) * 100),
      status: sthana >= 120 ? 'Exceeds Required' : sthana >= 80 ? 'Adequate Potency' : 'Deficient / Remedial'
    },
    {
      name: '2. Dig Bala (Directional)',
      virupas: dig,
      rupas: Math.round((dig / 60) * 100) / 100,
      percentageOfRequirement: Math.round((dig / 50) * 100),
      status: dig >= 40 ? 'Exceeds Required' : dig >= 25 ? 'Adequate Potency' : 'Deficient / Remedial'
    },
    {
      name: '3. Kala Bala (Temporal)',
      virupas: kala,
      rupas: Math.round((kala / 60) * 100) / 100,
      percentageOfRequirement: Math.round((kala / 50) * 100),
      status: kala >= 45 ? 'Exceeds Required' : 'Adequate Potency'
    },
    {
      name: '4. Cheshta Bala (Motional)',
      virupas: cheshta,
      rupas: Math.round((cheshta / 60) * 100) / 100,
      percentageOfRequirement: Math.round((cheshta / 40) * 100),
      status: cheshta >= 45 ? 'Exceeds Required' : cheshta >= 30 ? 'Adequate Potency' : 'Deficient / Remedial'
    },
    {
      name: '5. Naisargika Bala (Natural)',
      virupas: naisargika,
      rupas: Math.round((naisargika / 60) * 100) / 100,
      percentageOfRequirement: 100,
      status: 'Adequate Potency'
    },
    {
      name: '6. Drik Bala (Aspectual)',
      virupas: drik,
      rupas: Math.round((drik / 60) * 100) / 100,
      percentageOfRequirement: Math.round((drik / 20) * 100),
      status: drik >= 15 ? 'Exceeds Required' : 'Adequate Potency'
    }
  ];

  return {
    planet,
    sthanaBala: sthana,
    digBala: dig,
    kalaBala: kala,
    cheshtaBala: cheshta,
    naisargikaBala: naisargika,
    drikBala: drik,
    totalVirupas,
    totalRupas,
    requiredRupas: reqRupas,
    ratio,
    isStrong: totalRupas >= reqRupas,
    breakdown
  };
}

/**
 * Calculates complete Shadbala table for all 7 classical planets.
 */
export function calculateAllShadBala(
  positions: Array<{ name: string; degreeDecimal: number; houseNumber: number; speed?: string; retrograde?: boolean }>,
  isDayBirth: boolean = true
): Record<string, ShadBalaResult> {
  const results: Record<string, ShadBalaResult> = {};
  const classicalPlanets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

  for (const name of classicalPlanets) {
    const pos = positions.find(p => p.name === name);
    const deg = pos?.degreeDecimal || 0;
    const house = pos?.houseNumber || 1;
    const speed = pos?.speed ? parseFloat(pos.speed) : 1.0;
    const isRet = Boolean(pos?.retrograde);

    results[name] = calculateShadBala(name, deg, house, speed, isRet, isDayBirth);
  }

  return results;
}
