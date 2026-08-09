/**
 * ASTRO360 Western Astrology Engine
 * Tropical Zodiac, Natal Angles (Asc, MC, IC, Desc), Solar/Lunar Returns & Secondary Progressions
 */

export interface WesternAngles {
  ascendant: number;
  midheaven: number; // MC
  ic: number; // Imum Coeli
  descendant: number;
}

export interface SecondaryProgressionResult {
  progressedAge: number;
  progressedDate: string;
  progressedPlanets: Array<{ name: string; longitude: number; signName: string }>;
}

export class WesternEngine {
  /**
   * Calculates Western Angles (Ascendant, MC, IC, Descendant)
   */
  public static calculateAngles(tropicalAscendantDeg: number): WesternAngles {
    const ascendant = ((tropicalAscendantDeg % 360) + 360) % 360;
    const descendant = (ascendant + 180) % 360;
    const midheaven = (ascendant + 270) % 360; // MC approximation
    const ic = (midheaven + 180) % 360;

    return {
      ascendant,
      midheaven,
      ic,
      descendant,
    };
  }

  /**
   * Calculates Secondary Progressions (1 day after birth = 1 year of life)
   */
  public static calculateSecondaryProgressions(birthDate: Date, currentAgeYears: number, natalPositions: Array<{ name: string; longitude: number; speed: number }>): SecondaryProgressionResult {
    const signNames = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    
    // Progressed day offset = current age in years
    const progressedDate = new Date(birthDate.getTime() + currentAgeYears * 86400000);

    const progressedPlanets = natalPositions.map(p => {
      // Progressed longitude = natal + (speed * age)
      const progLong = ((p.longitude + p.speed * currentAgeYears) % 360 + 360) % 360;
      const signName = signNames[Math.floor(progLong / 30)];
      return {
        name: p.name,
        longitude: progLong,
        signName,
      };
    });

    return {
      progressedAge: currentAgeYears,
      progressedDate: progressedDate.toISOString().split('T')[0],
      progressedPlanets,
    };
  }
}
