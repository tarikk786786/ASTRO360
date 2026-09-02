/**
 * ASTRO360 Canonical Prediction Center & Multi-Engine Event Model
 * Strict Invariants:
 * 1. Agreement != Accuracy. Agreement measures proportion of eligible engines agreeing on direction.
 * 2. Timing agreement = (Intersection Duration / Union Duration) * 100.
 * 3. Never display "probability" or "certainty" without calibrated statistical basis.
 * 4. Failed/Inapplicable engines are excluded from denominators.
 */

export type PredictionCategory =
  | 'CAREER'
  | 'RELATIONSHIP'
  | 'MARRIAGE'
  | 'MONEY'
  | 'BUSINESS'
  | 'EDUCATION'
  | 'TRAVEL'
  | 'RELOCATION'
  | 'FAMILY'
  | 'PERSONAL'
  | 'MUHURTA'
  | 'TRANSIT'
  | 'DASHA'
  | 'ECLIPSE'
  | 'RETROGRADE'
  | 'TIMING';

export type FindingDirection = 'SUPPORTIVE' | 'CHALLENGING' | 'MIXED' | 'NEUTRAL' | 'INSUFFICIENT_DATA';

export type EngineStatus =
  | 'SUPPORTIVE'
  | 'CHALLENGING'
  | 'MIXED'
  | 'NEUTRAL'
  | 'NOT_APPLICABLE'
  | 'FAILED'
  | 'INSUFFICIENT_DATA';

export interface EngineSpecificFinding {
  engineId: 'vedic' | 'western' | 'kp' | 'jaimini' | 'tajika';
  tradition: string;
  eventType: string;
  direction: FindingDirection;
  strength: number; // 0.0 - 1.0
  start: string; // YYYY-MM-DD
  peak: string;  // YYYY-MM-DD
  end: string;    // YYYY-MM-DD
  techniques: string[];
  rules: string[];
  factors: string[];
  evidence: string[];
  stability: 'HIGH' | 'MODERATE' | 'LOW';
  assumptions: string[];
  status: EngineStatus;
  version: string;
}

export interface PredictionAgreementSummary {
  directionAgreementPercent: number; // e.g. 80 (4/5)
  agreeingEnginesRatio: string;       // e.g. "4 / 5"
  eventAgreementPercent: number;     // e.g. 80
  timingAgreementPercent: number;    // e.g. 67
  strengthAgreementPercent: number;  // e.g. 75
  rawAgreementPercent: number;       // e.g. 80
  lineageAdjustedPercent: number;    // e.g. 72
  commonTimingWindow: { start: string; peak: string; end: string } | null;
  totalEligibleEngines: number;
  participatingEngines: number;
  supportingEngines: string[];
  challengingEngines: string[];
  neutralEngines: string[];
}

export interface PredictionEvidenceItem {
  chartFactor: string;
  technique: string;
  rule: string;
  engine: string;
  source: string;
  weight: number;
}

export interface PredictionConflictItem {
  conflictType: string;
  enginesInvolved: string[];
  description: string;
  characterDifference: string;
}

export interface PredictionStabilityMetrics {
  level: 'HIGH' | 'MODERATE' | 'LOW';
  birthTimeSensitivityMinutes: number;
  factors: string[];
}

export interface CanonicalPredictionEvent {
  id: string;
  chartId: string;
  category: PredictionCategory;
  eventType: string;
  title: string;
  headline: string;
  summary: string;
  start: string; // YYYY-MM-DD
  peak: string;  // YYYY-MM-DD
  end: string;    // YYYY-MM-DD
  direction: FindingDirection;
  intensity: number; // 0 - 100
  precision: 'DAY' | 'WEEK' | 'MONTH' | 'RANGE';
  importance: 'PRIMARY' | 'SECONDARY' | 'CONTEXT';
  engineFindings: EngineSpecificFinding[];
  agreement: PredictionAgreementSummary;
  evidence: PredictionEvidenceItem[];
  conflicts: PredictionConflictItem[];
  stability: PredictionStabilityMetrics;
  uncertainty: string[];
  practicalAdvice: string[];
  assumptions: string[];
  versions: {
    astrocore: string;
    ruleSet: string;
    ephemeris: string;
  };
  colorToken: 'supportive' | 'challenging' | 'mixed' | 'neutral';
  isMuhurtaOrElectional?: boolean;
}
