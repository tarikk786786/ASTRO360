/**
 * ASTRO360 Western Synastry & Composite Engine
 * Inter-Chart Aspect Overlays and Midpoint Composite Chart Calculations
 */

import { AspectEngine, PlanetaryAspect } from './aspectEngine';

export interface SynastryResult {
  interAspects: PlanetaryAspect[];
  overallHarmonyScore: number; // 0 to 100
  keyThemes: string[];
}

export interface CompositeChartResult {
  compositePlanets: Array<{ name: string; longitude: number; signName: string }>;
}

export class SynastryEngine {
  /**
   * Calculates Synastry Inter-Aspects between Chart A and Chart B
   */
  public static calculateSynastry(chartAPlanets: Array<{ name: string; longitude: number }>, chartBPlanets: Array<{ name: string; longitude: number }>): SynastryResult {
    const interAspects: PlanetaryAspect[] = [];
    const signNames = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

    chartAPlanets.forEach(pA => {
      chartBPlanets.forEach(pB => {
        const diff = Math.abs(pA.longitude - pB.longitude);
        const actualAngle = diff > 180 ? 360 - diff : diff;

        if (actualAngle <= 6 || Math.abs(actualAngle - 120) <= 6 || Math.abs(actualAngle - 60) <= 4) {
          interAspects.push({
            planet1: `Partner A ${pA.name}`,
            planet2: `Partner B ${pB.name}`,
            aspectType: actualAngle <= 6 ? 'Conjunction' : actualAngle >= 114 ? 'Trine' : 'Sextile',
            symbol: actualAngle <= 6 ? '☌' : '△',
            exactAngle: actualAngle <= 6 ? 0 : 120,
            actualAngle,
            orb: parseFloat(Math.min(actualAngle, Math.abs(actualAngle - 120)).toFixed(2)),
            maxOrbAllowed: 6,
            isApplying: true,
            intensityScore: 88,
            nature: 'Harmonious',
          });
        }
      });
    });

    const overallHarmonyScore = Math.min(98, 65 + interAspects.length * 4);

    return {
      interAspects,
      overallHarmonyScore,
      keyThemes: [
        `Identified ${interAspects.length} major inter-chart aspects.`,
        `Overall Synastry Resonance Index: ${overallHarmonyScore}/100.`,
      ],
    };
  }

  /**
   * Calculates Composite Midpoint Chart between Chart A and Chart B
   */
  public static calculateComposite(chartAPlanets: Array<{ name: string; longitude: number }>, chartBPlanets: Array<{ name: string; longitude: number }>): CompositeChartResult {
    const signNames = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

    const compositePlanets = chartAPlanets.map(pA => {
      const pB = chartBPlanets.find(x => x.name === pA.name) || pA;
      
      // Shortest arc midpoint
      let diff = Math.abs(pA.longitude - pB.longitude);
      let mid = (pA.longitude + pB.longitude) / 2.0;
      if (diff > 180) {
        mid = (mid + 180) % 360;
      }

      const signName = signNames[Math.floor(mid / 30)];
      return {
        name: pA.name,
        longitude: mid,
        signName,
      };
    });

    return { compositePlanets };
  }
}
