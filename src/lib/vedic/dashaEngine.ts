/**
 * ASTRO360 Vimshottari Dasha Engine
 * 120-Year Planetary Cycles (Mahadasha, Antardasha, Pratyantardasha)
 */

export interface DashaPeriod {
  lord: string;
  startDate: string; // ISO date string
  endDate: string;
  durationYears: number;
}

export interface DashaHierarchy {
  mahadasha: DashaPeriod;
  antardashas: DashaPeriod[];
}

export const DASHA_LORDS = [
  { lord: 'Ketu', years: 7 },
  { lord: 'Venus', years: 20 },
  { lord: 'Sun', years: 6 },
  { lord: 'Moon', years: 10 },
  { lord: 'Mars', years: 7 },
  { lord: 'Rahu', years: 18 },
  { lord: 'Jupiter', years: 16 },
  { lord: 'Saturn', years: 19 },
  { lord: 'Mercury', years: 17 },
];

export class DashaEngine {
  /**
   * Calculates Vimshottari Dasha timeline based on Moon's Sidereal Longitude
   */
  public static calculateVimshottari(moonLongitudeDeg: number, birthDate: Date): DashaHierarchy[] {
    const nakshatraSpan = 13.333333333333334; // 13° 20' per nakshatra
    const totalNakshatraIndex = Math.floor(moonLongitudeDeg / nakshatraSpan);
    const dashaIndex = totalNakshatraIndex % 9;

    const degInNakshatra = moonLongitudeDeg % nakshatraSpan;
    const fractionElapsed = degInNakshatra / nakshatraSpan;
    const fractionRemaining = 1.0 - fractionElapsed;

    const firstLordObj = DASHA_LORDS[dashaIndex];
    const firstLordRemainingYears = firstLordObj.years * fractionRemaining;

    const timeline: DashaHierarchy[] = [];
    let currentStart = new Date(birthDate.getTime());

    // Generate 120 years of Mahadashas starting from birth
    for (let i = 0; i < 9; i++) {
      const idx = (dashaIndex + i) % 9;
      const lordObj = DASHA_LORDS[idx];
      const duration = i === 0 ? firstLordRemainingYears : lordObj.years;

      const currentEnd = new Date(currentStart.getTime() + duration * 365.25 * 86400000);

      // Generate 9 Antardashas for this Mahadasha
      const antardashas: DashaPeriod[] = [];
      let subStart = new Date(currentStart.getTime());

      for (let j = 0; j < 9; j++) {
        const subIdx = (idx + j) % 9;
        const subLordObj = DASHA_LORDS[subIdx];
        // Antardasha proportion = (Mahadasha Years * SubLord Years) / 120
        const subDurationYears = (duration * subLordObj.years) / 120.0;
        const subEnd = new Date(subStart.getTime() + subDurationYears * 365.25 * 86400000);

        antardashas.push({
          lord: subLordObj.lord,
          startDate: subStart.toISOString().split('T')[0],
          endDate: subEnd.toISOString().split('T')[0],
          durationYears: parseFloat(subDurationYears.toFixed(2)),
        });

        subStart = subEnd;
      }

      timeline.push({
        mahadasha: {
          lord: lordObj.lord,
          startDate: currentStart.toISOString().split('T')[0],
          endDate: currentEnd.toISOString().split('T')[0],
          durationYears: parseFloat(duration.toFixed(2)),
        },
        antardashas,
      });

      currentStart = currentEnd;
    }

    return timeline;
  }
}
