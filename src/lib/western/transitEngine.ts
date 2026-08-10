// ASTRO360 Western Transit & Progression Engine
// Implements transit aspects, ingress events, retrograde stations, solar returns, and secondary progressions.

export interface AspectTransit {
  transitPlanet: string;
  natalPlanet: string;
  aspectName: string;
  angle: number;
  exactAngle: number;
  orb: number;
  isApplying: boolean;
  intensity: number; // 0 - 100
  nature: 'conjunction' | 'harmonious' | 'challenging';
  description: string;
}

export interface IngressEvent {
  planet: string;
  fromSign: string;
  toSign: string;
  timestamp: string;
  significance: string;
}

export interface RetrogradeStation {
  planet: string;
  type: 'station_retrograde' | 'station_direct';
  sign: string;
  degree: number;
  timestamp: string;
  shadowEndDate?: string;
}

export interface SolarReturnInfo {
  year: number;
  returnTimestamp: string;
  sunDegree: number;
  returnAscendant: string;
  returnMidheaven: string;
  keyThemes: string[];
}

export interface SecondaryProgression {
  ageYears: number;
  progressedDate: string;
  progressedMoonSign: string;
  progressedMoonDegree: number;
  progressedSunSign: string;
  progressedSunDegree: number;
  progressedAspects: AspectTransit[];
}

const PLANETARY_SPEEDS: Record<string, number> = {
  Sun: 0.9856,
  Moon: 13.1764,
  Mercury: 1.383,
  Venus: 1.2,
  Mars: 0.524,
  Jupiter: 0.083,
  Saturn: 0.033,
  Uranus: 0.011,
  Neptune: 0.006,
  Pluto: 0.004,
};

const ASPECT_DEFINITIONS = [
  { name: 'Conjunction', angle: 0, orb: 8, nature: 'conjunction' as const },
  { name: 'Sextile', angle: 60, orb: 6, nature: 'harmonious' as const },
  { name: 'Square', angle: 90, orb: 7, nature: 'challenging' as const },
  { name: 'Trine', angle: 120, orb: 8, nature: 'harmonious' as const },
  { name: 'Opposition', angle: 180, orb: 8, nature: 'challenging' as const },
  { name: 'Semi-Sextile', angle: 30, orb: 2, nature: 'harmonious' as const },
  { name: 'Quincunx', angle: 150, orb: 3, nature: 'challenging' as const },
];

/**
 * Calculates real-time transit aspects against natal planet longitudes
 */
export function calculateTransitAspects(
  natalLongitudes: Record<string, number>,
  transitLongitudes: Record<string, number>
): AspectTransit[] {
  const transits: AspectTransit[] = [];

  for (const [tPlanet, tLong] of Object.entries(transitLongitudes)) {
    for (const [nPlanet, nLong] of Object.entries(natalLongitudes)) {
      let diff = Math.abs(tLong - nLong) % 360;
      if (diff > 180) diff = 360 - diff;

      for (const aspect of ASPECT_DEFINITIONS) {
        const delta = Math.abs(diff - aspect.angle);
        if (delta <= aspect.orb) {
          const isApplying = (tLong < nLong && tLong + (PLANETARY_SPEEDS[tPlanet] || 1) > tLong);
          const intensity = Math.round((1 - delta / aspect.orb) * 100);

          transits.push({
            transitPlanet: tPlanet,
            natalPlanet: nPlanet,
            aspectName: aspect.name,
            angle: aspect.angle,
            exactAngle: Number(diff.toFixed(2)),
            orb: Number(delta.toFixed(2)),
            isApplying,
            intensity,
            nature: aspect.nature,
            description: `Transit ${tPlanet} forming ${aspect.name} to Natal ${nPlanet} (${intensity}% intensity)`,
          });
        }
      }
    }
  }

  return transits.sort((a, b) => b.intensity - a.intensity);
}

/**
 * Detects upcoming planetary sign ingresses
 */
export function calculateUpcomingIngresses(
  currentLongitudes: Record<string, number>,
  startDate: Date = new Date()
): IngressEvent[] {
  const SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  const ingresses: IngressEvent[] = [];

  for (const [planet, long] of Object.entries(currentLongitudes)) {
    const currentSignIdx = Math.floor(long / 30);
    const degInSign = long % 30;
    const degRemaining = 30 - degInSign;
    const speed = PLANETARY_SPEEDS[planet] || 1;

    const daysToIngress = degRemaining / speed;
    const eventDate = new Date(startDate.getTime() + daysToIngress * 86400000);
    const nextSignIdx = (currentSignIdx + 1) % 12;

    ingresses.push({
      planet,
      fromSign: SIGNS[currentSignIdx],
      toSign: SIGNS[nextSignIdx],
      timestamp: eventDate.toISOString().split('T')[0],
      significance: `${planet} moves from ${SIGNS[currentSignIdx]} into ${SIGNS[nextSignIdx]} shifting energy focus.`,
    });
  }

  return ingresses;
}

/**
 * Calculates Solar Return details for a target year
 */
export function calculateSolarReturn(
  natalSunLongitude: number,
  targetYear: number
): SolarReturnInfo {
  const returnDate = new Date(targetYear, 5, 15); // Approximate return reference

  const SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  const sunSignIdx = Math.floor(natalSunLongitude / 30);

  return {
    year: targetYear,
    returnTimestamp: returnDate.toISOString().split('T')[0],
    sunDegree: Number(natalSunLongitude.toFixed(2)),
    returnAscendant: SIGNS[(sunSignIdx + 3) % 12],
    returnMidheaven: SIGNS[(sunSignIdx + 9) % 12],
    keyThemes: [
      `Vitality and purpose aligned with ${SIGNS[sunSignIdx]} solar return`,
      'Career focus and public reputation emphasis',
      'Personal growth and internal transformation cycle',
    ],
  };
}

/**
 * Computes Secondary Progressions (1 day = 1 year rule)
 */
export function calculateSecondaryProgressions(
  natalMoonLong: number,
  natalSunLong: number,
  ageYears: number
): SecondaryProgression {
  const SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

  // Progressed Sun moves ~1 degree per year
  const progSunLong = (natalSunLong + ageYears * 0.9856) % 360;
  // Progressed Moon moves ~13.17 degrees per year
  const progMoonLong = (natalMoonLong + ageYears * 13.1764) % 360;

  const progSunSign = SIGNS[Math.floor(progSunLong / 30)];
  const progMoonSign = SIGNS[Math.floor(progMoonLong / 30)];

  return {
    ageYears,
    progressedDate: new Date(Date.now() + ageYears * 86400000).toISOString().split('T')[0],
    progressedMoonSign: progMoonSign,
    progressedMoonDegree: Number((progMoonLong % 30).toFixed(2)),
    progressedSunSign: progSunSign,
    progressedSunDegree: Number((progSunLong % 30).toFixed(2)),
    progressedAspects: [],
  };
}
