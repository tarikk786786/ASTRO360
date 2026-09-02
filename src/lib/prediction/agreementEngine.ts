/**
 * ASTRO360 — Multi-Engine Agreement & Consensus Engine
 * 
 * CRITICAL SCIENTIFIC PRINCIPLE:
 * AGREEMENT != ACCURACY.
 * Agreement percentage strictly measures the proportion of eligible participating 
 * engines that reached the same classified direction.
 * It NEVER represents statistical probability or real-world certainty.
 */

export type FindingDirection = 'SUPPORTIVE' | 'NEUTRAL' | 'CHALLENGING' | 'MIXED' | 'INSUFFICIENT_DATA';
export type PrecisionLevel = 'MINUTE' | 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'RANGE';

export interface EngineFinding {
  engineId: string;
  category: string;
  eventType: string;
  direction: FindingDirection;
  strength: number; // 0.0 to 1.0
  start: string; // ISO date
  peak: string;  // ISO date
  end: string;    // ISO date
  precision: PrecisionLevel;
  factors: string[];
  rules: string[];
  evidence: string[];
  contradictions: string[];
  confidence: number;
  stability: 'HIGH' | 'MODERATE' | 'LOW';
  assumptions: string[];
  version: string;
}

export interface AgreementCalculationResult {
  agreementPercent: number | null; // null if fewer than 2 eligible engines
  agreementLevel: 'Very High Agreement' | 'High Agreement' | 'Moderate Agreement' | 'Mixed' | 'Low Agreement' | 'Insufficient Multi-Engine Data' | 'Single-System Result';
  directionAgreement: number;
  timingAgreementPercent: number;
  totalEligibleEngines: number;
  participatingEngines: number;
  supportingEngines: string[];
  conflictingEngines: string[];
  neutralEngines: string[];
  notApplicableEngines: string[];
  failedEngines: string[];
  commonDirection: FindingDirection;
  commonTimeWindow: { start: string; peak: string; end: string } | null;
  calculationMethod: string;
  interpretationStatement: string;
}

export class AgreementEngine {
  /**
   * Calculate deterministic, transparent multi-engine agreement.
   * Invariants:
   * 1. Order-invariant: Input finding order does not affect result.
   * 2. NOT_APPLICABLE invariant: Non-applicable engines do not alter agreement %.
   * 3. Failed engines are excluded from denominator, never treated as disagreement.
   * 4. Minimum 2 eligible engines required for an agreement percentage.
   */
  static calculateAgreement(
    findings: EngineFinding[],
    eligibleEngineIds: string[],
    failedEngineIds: string[] = []
  ): AgreementCalculationResult {
    // 1. Deduplicate findings by engineId
    const uniqueFindingsMap = new Map<string, EngineFinding>();
    for (const f of findings) {
      if (!uniqueFindingsMap.has(f.engineId) && eligibleEngineIds.includes(f.engineId)) {
        uniqueFindingsMap.set(f.engineId, f);
      }
    }
    const validFindings = Array.from(uniqueFindingsMap.values());

    const notApplicableEngines = Object.keys(findings).filter(
      id => !eligibleEngineIds.includes(id)
    );

    const totalEligible = eligibleEngineIds.length;
    const participatingCount = validFindings.length;

    // Minimum Engine Rule: Fewer than 2 eligible engines -> No agreement %
    if (participatingCount < 2) {
      const single = validFindings[0];
      return {
        agreementPercent: null,
        agreementLevel: participatingCount === 1 ? 'Single-System Result' : 'Insufficient Multi-Engine Data',
        directionAgreement: 0,
        timingAgreementPercent: 0,
        totalEligibleEngines: totalEligible,
        participatingEngines: participatingCount,
        supportingEngines: single ? [single.engineId] : [],
        conflictingEngines: [],
        neutralEngines: [],
        notApplicableEngines,
        failedEngines: failedEngineIds,
        commonDirection: single ? single.direction : 'INSUFFICIENT_DATA',
        commonTimeWindow: single ? { start: single.start, peak: single.peak, end: single.end } : null,
        calculationMethod: 'Single-system execution without multi-engine consensus',
        interpretationStatement: participatingCount === 1
          ? 'Calculated from a single astrological technique; multi-engine consensus requires >= 2 participating systems.'
          : 'Insufficient participating engine telemetry.'
      };
    }

    // 2. Count directional classifications
    const directionCounts: Record<FindingDirection, number> = {
      SUPPORTIVE: 0,
      NEUTRAL: 0,
      CHALLENGING: 0,
      MIXED: 0,
      INSUFFICIENT_DATA: 0
    };

    for (const f of validFindings) {
      directionCounts[f.direction] = (directionCounts[f.direction] || 0) + 1;
    }

    // Find majority direction
    let majorityDirection: FindingDirection = 'SUPPORTIVE';
    let maxCount = -1;
    for (const [dir, count] of Object.entries(directionCounts)) {
      if (count > maxCount) {
        maxCount = count;
        majorityDirection = dir as FindingDirection;
      }
    }

    // Categorical Agreement = (matching participating engines / participating engines) * 100
    const agreementPercent = Math.round((maxCount / participatingCount) * 100);

    // Classify supporting, conflicting, and neutral engines
    const supportingEngines: string[] = [];
    const conflictingEngines: string[] = [];
    const neutralEngines: string[] = [];

    for (const f of validFindings) {
      if (f.direction === majorityDirection) {
        supportingEngines.push(f.engineId);
      } else if (f.direction === 'NEUTRAL') {
        neutralEngines.push(f.engineId);
      } else {
        conflictingEngines.push(f.engineId);
      }
    }

    // 3. Agreement Level Classification
    let agreementLevel: AgreementCalculationResult['agreementLevel'];
    if (agreementPercent >= 90) {
      agreementLevel = 'Very High Agreement';
    } else if (agreementPercent >= 75) {
      agreementLevel = 'High Agreement';
    } else if (agreementPercent >= 60) {
      agreementLevel = 'Moderate Agreement';
    } else if (agreementPercent >= 40) {
      agreementLevel = 'Mixed';
    } else {
      agreementLevel = 'Low Agreement';
    }

    // 4. Timing Overlap Calculation
    const timingOverlap = this.calculateTimingOverlap(validFindings);

    const interpretationStatement = `${maxCount} of ${participatingCount} participating systems (${agreementPercent}%) reach the same ${majorityDirection.toLowerCase()} direction.`;

    return {
      agreementPercent,
      agreementLevel,
      directionAgreement: agreementPercent,
      timingAgreementPercent: timingOverlap.overlapPercent,
      totalEligibleEngines: totalEligible,
      participatingEngines: participatingCount,
      supportingEngines,
      conflictingEngines,
      neutralEngines,
      notApplicableEngines,
      failedEngines: failedEngineIds,
      commonDirection: majorityDirection,
      commonTimeWindow: timingOverlap.commonWindow,
      calculationMethod: 'Deterministic unweighted categorical concordance ratio',
      interpretationStatement
    };
  }

  /**
   * Calculate timing window intersection and overlap ratio.
   */
  private static calculateTimingOverlap(findings: EngineFinding[]): {
    overlapPercent: number;
    commonWindow: { start: string; peak: string; end: string } | null;
  } {
    if (findings.length === 0) return { overlapPercent: 0, commonWindow: null };

    const startTimes = findings.map(f => new Date(f.start).getTime()).filter(t => !isNaN(t));
    const endTimes = findings.map(f => new Date(f.end).getTime()).filter(t => !isNaN(t));

    if (startTimes.length === 0 || endTimes.length === 0) {
      return { overlapPercent: 0, commonWindow: null };
    }

    const latestStart = Math.max(...startTimes);
    const earliestEnd = Math.min(...endTimes);
    const earliestStart = Math.min(...startTimes);
    const latestEnd = Math.max(...endTimes);

    const totalSpan = latestEnd - earliestStart;
    const overlapSpan = Math.max(0, earliestEnd - latestStart);

    const overlapPercent = totalSpan > 0 ? Math.min(100, Math.round((overlapSpan / totalSpan) * 100)) : 100;

    const commonWindow = overlapSpan > 0 ? {
      start: new Date(latestStart).toISOString().split('T')[0],
      peak: new Date((latestStart + earliestEnd) / 2).toISOString().split('T')[0],
      end: new Date(earliestEnd).toISOString().split('T')[0]
    } : {
      start: findings[0].start,
      peak: findings[0].peak,
      end: findings[0].end
    };

    return { overlapPercent, commonWindow };
  }
}
