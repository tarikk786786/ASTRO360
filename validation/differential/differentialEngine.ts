/**
 * ASTRO360 — Differential Validation Engine
 * Compares ASTRO360 calculation results against independent reference engines.
 * Reports discrepancies with status classification.
 */

import type { CelestialPosition, CelestialSnapshot } from '../../src/lib/astrocore/schemas/CelestialPosition';
import type { ComparisonResult, ComparisonStatus, CalculationDefinition } from '../../src/lib/astrocore/schemas/DefinitionMatrix';
import { areDefinitionsCompatible } from '../../src/lib/astrocore/schemas/DefinitionMatrix';

export interface DifferentialReport {
  timestamp: string;
  sourceEngine: string;
  referenceEngine: string;
  sourceDefinition: CalculationDefinition;
  referenceDefinition: CalculationDefinition;
  definitionsCompatible: boolean;
  incompatibilityReasons: string[];
  results: ComparisonResult[];
  summary: {
    totalComparisons: number;
    passed: number;
    expectedDifferences: number;
    failed: number;
    incompatible: number;
  };
}

const DEFAULT_TOLERANCE_DEG = 0.0167; // ~1 arcminute (astronomy-engine typical precision)

export function compareSnapshots(
  source: CelestialSnapshot,
  reference: CelestialSnapshot,
  sourceDef: CalculationDefinition,
  refDef: CalculationDefinition,
  toleranceDeg: number = DEFAULT_TOLERANCE_DEG
): DifferentialReport {
  const compatibility = areDefinitionsCompatible(sourceDef, refDef);
  const results: ComparisonResult[] = [];

  for (const srcPos of source.positions) {
    const refPos = reference.positions.find(p => p.body === srcPos.body);
    if (!refPos) continue;

    // Longitude comparison
    const lonDiff = Math.abs(srcPos.longitude - refPos.longitude);
    const adjustedLonDiff = Math.min(lonDiff, 360 - lonDiff); // Handle 0°/360° wrap
    
    let status: ComparisonStatus;
    let reason: string | undefined;
    
    if (!compatibility.compatible) {
      status = 'INCOMPATIBLE_DEFINITION';
      reason = compatibility.reasons.join('; ');
    } else if (adjustedLonDiff <= toleranceDeg) {
      status = 'PASS';
    } else if (srcPos.body === 'Rahu' || srcPos.body === 'Ketu') {
      // Nodes: Mean vs True can differ by ~1.5°
      status = adjustedLonDiff <= 2.0 ? 'EXPECTED_DIFFERENCE' : 'FAIL';
      reason = adjustedLonDiff <= 2.0 ? 'Mean vs True Node model difference' : `Node difference ${adjustedLonDiff.toFixed(4)}° exceeds even Mean/True tolerance`;
    } else {
      status = 'FAIL';
      reason = `Longitude difference ${adjustedLonDiff.toFixed(4)}° exceeds tolerance ${toleranceDeg}°`;
    }

    results.push({
      body: srcPos.body,
      field: 'longitude',
      expected: refPos.longitude,
      actual: srcPos.longitude,
      absoluteDifference: adjustedLonDiff,
      relativeDifference: (adjustedLonDiff / 360) * 100,
      toleranceDeg,
      status,
      reason
    });

    // Speed comparison (use wider tolerance)
    const speedDiff = Math.abs(srcPos.speed - refPos.speed);
    results.push({
      body: srcPos.body,
      field: 'speed',
      expected: refPos.speed,
      actual: srcPos.speed,
      absoluteDifference: speedDiff,
      relativeDifference: refPos.speed !== 0 ? (speedDiff / Math.abs(refPos.speed)) * 100 : 0,
      toleranceDeg: 0.1, // Speed tolerance: 0.1°/day
      status: !compatibility.compatible ? 'INCOMPATIBLE_DEFINITION' : speedDiff <= 0.1 ? 'PASS' : 'FAIL',
      reason: speedDiff > 0.1 ? `Speed difference ${speedDiff.toFixed(4)}°/day` : undefined
    });
  }

  const summary = {
    totalComparisons: results.length,
    passed: results.filter(r => r.status === 'PASS').length,
    expectedDifferences: results.filter(r => r.status === 'EXPECTED_DIFFERENCE').length,
    failed: results.filter(r => r.status === 'FAIL').length,
    incompatible: results.filter(r => r.status === 'INCOMPATIBLE_DEFINITION').length
  };

  return {
    timestamp: new Date().toISOString(),
    sourceEngine: 'ASTRO360',
    referenceEngine: reference.positions[0]?.engine || 'unknown',
    sourceDefinition: sourceDef,
    referenceDefinition: refDef,
    definitionsCompatible: compatibility.compatible,
    incompatibilityReasons: compatibility.reasons,
    results,
    summary
  };
}
