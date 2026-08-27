/**
 * ASTRO360 Vimshottari Dasha Engine — Pure Mathematical Dasha Timeline Calculator
 * 120-Year Vimshottari Cycle: Sun (6y), Moon (10y), Mars (7y), Rahu (18y), Jupiter (16y), Saturn (19y), Mercury (17y), Ketu (7y), Venus (20y)
 */

export interface DashaPeriod {
  lord: string;
  startDate: string;
  endDate: string;
  durationYears: number;
  isCurrent: boolean;
}

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
 * Calculates exact Vimshottari Mahadasha timeline from Moon Nakshatra Longitude & Birth Date
 */
export function calculateVimshottariDasha(
  moonLongitude: number = 42.1, // Exalted Moon in Taurus
  birthDate: Date = new Date('1995-05-15')
): { currentMahadasha: string; currentAntardasha: string; timeline: DashaPeriod[] } {
  // Nakshatra degree span = 13°20' (13.3333°)
  const nakshatraIndex = Math.floor(moonLongitude / 13.333333) % 27;
  const nakshatraDegreeElapsed = moonLongitude % 13.333333;
  const fractionElapsed = nakshatraDegreeElapsed / 13.333333;

  // Nakshatra Lord index (27 Nakshatras repeat 9 lords 3 times)
  const lordIndex = (Math.abs(Math.floor(nakshatraIndex)) % 9) || 0;
  const initialLord = DASHA_LORDS[lordIndex] || DASHA_LORDS[0];

  // Fraction remaining in first Mahadasha
  const firstMahadashaYearsRemaining = initialLord.years * (1 - fractionElapsed);

  const timeline: DashaPeriod[] = [];
  let currentDate = new Date(birthDate.getTime());

  // First Mahadasha (partial)
  const firstEnd = new Date(currentDate.getTime() + firstMahadashaYearsRemaining * 365.25 * 86400000);
  const now = new Date();

  let isCurrent = now >= currentDate && now <= firstEnd;

  timeline.push({
    lord: initialLord.lord,
    startDate: currentDate.toISOString().split('T')[0],
    endDate: firstEnd.toISOString().split('T')[0],
    durationYears: Math.round(firstMahadashaYearsRemaining * 10) / 10,
    isCurrent
  });

  currentDate = firstEnd;

  // Subsequent Mahadashas in 120-year cycle
  for (let i = 1; i < 9; i++) {
    const nextLord = DASHA_LORDS[(lordIndex + i) % 9];
    const nextEnd = new Date(currentDate.getTime() + nextLord.years * 365.25 * 86400000);
    const active = now >= currentDate && now <= nextEnd;

    timeline.push({
      lord: nextLord.lord,
      startDate: currentDate.toISOString().split('T')[0],
      endDate: nextEnd.toISOString().split('T')[0],
      durationYears: nextLord.years,
      isCurrent: active
    });

    currentDate = nextEnd;
  }

  const currentPeriod = timeline.find(p => p.isCurrent) || timeline[0];

  let currentAntardasha = 'Mercury';
  const mahaLordData = DASHA_LORDS.find(l => l.lord === currentPeriod.lord) || DASHA_LORDS[0];
  const mahaLordIndex = DASHA_LORDS.findIndex(l => l.lord === currentPeriod.lord);
  
  let subStartDate = new Date(currentPeriod.startDate);
  for (let i = 0; i < 9; i++) {
    const subLord = DASHA_LORDS[(mahaLordIndex + i) % 9];
    const subDurationYears = (mahaLordData.years * subLord.years) / 120;
    const subEndDate = new Date(subStartDate.getTime() + subDurationYears * 365.25 * 86400000);
    
    if (now >= subStartDate && now <= subEndDate) {
      currentAntardasha = subLord.lord;
      break;
    }
    subStartDate = subEndDate;
  }

  return {
    currentMahadasha: currentPeriod.lord,
    currentAntardasha,
    timeline
  };
}
