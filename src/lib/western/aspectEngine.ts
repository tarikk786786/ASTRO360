/**
 * ASTRO360 Western Aspect Engine
 * Calculates Major and Minor Aspects, Orbs, Applying/Separating Dynamics, and Aspect Strength
 */

export interface PlanetaryAspect {
  planet1: string;
  planet2: string;
  aspectType: 'Conjunction' | 'Opposition' | 'Trine' | 'Square' | 'Sextile' | 'Quincunx';
  symbol: string;
  exactAngle: number; // 0, 180, 120, 90, 60, 150
  actualAngle: number;
  orb: number; // Difference from exact angle
  maxOrbAllowed: number;
  isApplying: boolean;
  intensityScore: number; // 0 to 100
  nature: 'Harmonious' | 'Dynamic / Challenging' | 'Major Junction';
}

export class AspectEngine {
  /**
   * Evaluates all pairwise aspects between planetary positions
   */
  public static calculateAspects(planetPositions: Array<{ name: string; longitude: number; speed?: number }>, customMaxOrb: number = 8.0): PlanetaryAspect[] {
    const aspects: PlanetaryAspect[] = [];

    const aspectDefs = [
      { type: 'Conjunction', symbol: '☌', angle: 0, orb: customMaxOrb, nature: 'Major Junction' as const },
      { type: 'Opposition', symbol: '☍', angle: 180, orb: customMaxOrb, nature: 'Dynamic / Challenging' as const },
      { type: 'Trine', symbol: '△', angle: 120, orb: customMaxOrb, nature: 'Harmonious' as const },
      { type: 'Square', symbol: '□', angle: 90, orb: customMaxOrb, nature: 'Dynamic / Challenging' as const },
      { type: 'Sextile', symbol: '⚹', angle: 60, orb: customMaxOrb - 2, nature: 'Harmonious' as const },
      { type: 'Quincunx', symbol: '⚮', angle: 150, orb: 3.0, nature: 'Dynamic / Challenging' as const },
    ];

    for (let i = 0; i < planetPositions.length; i++) {
      for (let j = i + 1; j < planetPositions.length; j++) {
        const p1 = planetPositions[i];
        const p2 = planetPositions[j];

        const diff = Math.abs(p1.longitude - p2.longitude);
        const actualAngle = diff > 180 ? 360 - diff : diff;

        for (const def of aspectDefs) {
          const orb = Math.abs(actualAngle - def.angle);
          if (orb <= def.orb) {
            const isApplying = (p1.speed || 1.0) > (p2.speed || 0.5);
            const intensityScore = Math.max(0, Math.round((1.0 - orb / def.orb) * 100));

            aspects.push({
              planet1: p1.name,
              planet2: p2.name,
              aspectType: def.type as any,
              symbol: def.symbol,
              exactAngle: def.angle,
              actualAngle,
              orb: parseFloat(orb.toFixed(2)),
              maxOrbAllowed: def.orb,
              isApplying,
              intensityScore,
              nature: def.nature,
            });

            break; // Match strongest aspect type per pair
          }
        }
      }
    }

    return aspects;
  }
}
