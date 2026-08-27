/**
 * ASTRO360 — Definition Matrix
 * Ensures two calculation results are only compared when their underlying
 * definitions are compatible. Prevents false failures from comparing
 * tropical vs sidereal, or mean vs true nodes, etc.
 */

export interface CalculationDefinition {
  zodiac: 'tropical' | 'sidereal';
  ayanamsha: string;          // 'lahiri' | 'raman' | 'kp' | 'none' (for tropical)
  ayanamshaBaseDeg: number;   // J2000.0 base value
  nodeModel: 'mean' | 'true';
  houseSystem: string;
  aspectOrbs: Record<string, number>; // e.g. { conjunction: 8, trine: 8, square: 7, sextile: 6, opposition: 8 }
  coordinateFrame: 'geocentric' | 'topocentric';
  ephemeris: string;
  timeScale: 'UTC' | 'TT' | 'TDB';
}

export type ComparisonStatus = 
  | 'PASS'                    // Within tolerance
  | 'EXPECTED_DIFFERENCE'     // Different definitions, expected
  | 'FAIL'                    // Same definitions, outside tolerance
  | 'INCOMPATIBLE_DEFINITION'; // Cannot compare at all

export interface ComparisonResult {
  body: string;
  field: string;              // 'longitude' | 'latitude' | 'speed' | etc.
  expected: number;
  actual: number;
  absoluteDifference: number;
  relativeDifference: number; // As percentage
  toleranceDeg: number;
  status: ComparisonStatus;
  reason?: string;            // Explanation for EXPECTED_DIFFERENCE or FAIL
}

export function areDefinitionsCompatible(
  a: CalculationDefinition,
  b: CalculationDefinition
): { compatible: boolean; reasons: string[] } {
  const reasons: string[] = [];
  
  if (a.zodiac !== b.zodiac) {
    reasons.push(`Zodiac mismatch: ${a.zodiac} vs ${b.zodiac}`);
  }
  if (a.zodiac === 'sidereal' && b.zodiac === 'sidereal' && a.ayanamsha !== b.ayanamsha) {
    reasons.push(`Ayanamsha mismatch: ${a.ayanamsha} vs ${b.ayanamsha}`);
  }
  if (a.nodeModel !== b.nodeModel) {
    reasons.push(`Node model mismatch: ${a.nodeModel} vs ${b.nodeModel}`);
  }
  if (a.houseSystem !== b.houseSystem) {
    reasons.push(`House system mismatch: ${a.houseSystem} vs ${b.houseSystem}`);
  }
  
  return { compatible: reasons.length === 0, reasons };
}
