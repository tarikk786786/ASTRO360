/**
 * ASTRO360 OMNI - Canonical Prediction Schema & Runtime Contracts (PRD Section 5, 6, 12, 19, 21, 22)
 * Strongly-typed, Zod-validated prediction data model.
 */

import { z } from 'zod';

export const EphemerisSourceSchema = z.enum([
  'NASA_JPL_DE440',
  'NASA_JPL_DE441',
  'SwissEph',
  'Skyfield',
  'KeplerianAnalytical'
]);
export type EphemerisSource = z.infer<typeof EphemerisSourceSchema>;

export const AstrologyTraditionSchema = z.enum([
  'vedic_parashari',
  'vedic_jaimini',
  'vedic_kp',
  'vedic_tajika',
  'western_tropical',
  'western_hellenistic',
  'chinese_bazi',
  'islamic_falak',
  'vedic',
  'western',
  'kp',
  'jaimini',
  'tajika',
  'chinese-bazi',
  'tibetan',
  'ancient-hellenistic'
]);
export type AstrologyTradition = z.infer<typeof AstrologyTraditionSchema>;

export const EventCategorySchema = z.enum([
  'CAREER',
  'RELATIONSHIP',
  'MONEY',
  'EDUCATION',
  'TRAVEL',
  'FAMILY',
  'PERSONAL',
  'TIMING',
  'CUSTOM'
]);
export type EventCategory = z.infer<typeof EventCategorySchema>;

export const EventTypeSchema = z.enum([
  // Career
  'CAREER_CHANGE',
  'PROMOTION',
  'PROMOTION_THEME',
  'JOB_TRANSITION',
  'ROLE_CHANGE',
  'RESPONSIBILITY',
  'RECOGNITION',
  'PUBLIC_RECOGNITION',
  'BUSINESS_ACTIVITY',
  'BUSINESS_EXPANSION',
  // Relationship
  'RELATIONSHIP_START',
  'RELATIONSHIP_CHANGE',
  'COMMITMENT',
  'MARRIAGE_THEME',
  'SEPARATION_THEME',
  // Money
  'FINANCIAL_ACTIVITY',
  'FINANCIAL_THEME',
  'PROPERTY',
  'BUSINESS_GROWTH',
  // Education
  'EDUCATION',
  'STUDY',
  'EXAM',
  'LEARNING',
  // Travel
  'TRAVEL',
  'RELOCATION',
  'FOREIGN_CONNECTION',
  // Family
  'HOME',
  'CHILDREN',
  'FAMILY_CHANGE',
  // Personal
  'GROWTH',
  'TRANSITION',
  'CREATIVE',
  'CREATIVE_PERIOD',
  'SPIRITUAL',
  'SPIRITUAL_PERIOD',
  // Timing
  'HIGH_ACTIVITY_PERIOD',
  'LOW_ACTIVITY_PERIOD',
  'TRANSITION_PERIOD',
  // Custom
  'CUSTOM'
]);
export type EventType = z.infer<typeof EventTypeSchema>;

export const DatePrecisionSchema = z.enum([
  'minute',
  'hour',
  'day',
  'week',
  'month',
  'quarter',
  'year',
  'range'
]);
export type DatePrecision = z.infer<typeof DatePrecisionSchema>;

export const StabilityClassificationSchema = z.enum([
  'STABLE',
  'MODERATELY_STABLE',
  'SENSITIVE',
  'HIGHLY_SENSITIVE'
]);
export type StabilityClassification = z.infer<typeof StabilityClassificationSchema>;

export const ConsensusClassificationSchema = z.enum([
  'STRONG_CONSENSUS',
  'MODERATE_CONSENSUS',
  'MIXED',
  'CONFLICT',
  'INSUFFICIENT_DATA'
]);
export type ConsensusClassification = z.infer<typeof ConsensusClassificationSchema>;

export const UncertaintyFactorSchema = z.enum([
  'unknown_birth_time',
  'historical_timezone_uncertainty',
  'system_disagreement',
  'weak_evidence',
  'low_resolution_timing',
  'boundary_condition',
  'insufficient_data'
]);
export type UncertaintyFactor = z.infer<typeof UncertaintyFactorSchema>;

export const PredictionQualityFlagSchema = z.enum([
  'HIGH_SUPPORT',
  'MODERATE_SUPPORT',
  'LOW_SUPPORT',
  'MIXED',
  'INSUFFICIENT_DATA',
  'SENSITIVE_TO_BIRTH_TIME',
  'SYSTEM_CONFLICT'
]);
export type PredictionQualityFlag = z.infer<typeof PredictionQualityFlagSchema>;

export const EvidenceItemSchema = z.object({
  id: z.string(),
  factor: z.string(),
  system: AstrologyTraditionSchema,
  technique: z.string(),
  ruleId: z.string(),
  value: z.string(),
  relationship: z.string(),
  timing: z.string(),
  source: z.string(),
  weight: z.number().min(0).max(1),
  isSupporting: z.boolean(),
  isContradicting: z.boolean().default(false),
  explanation: z.string()
});
export type EvidenceItem = z.infer<typeof EvidenceItemSchema>;

export const PredictionContradictionSchema = z.object({
  conflictType: z.string(),
  systemsInvolved: z.array(AstrologyTraditionSchema),
  description: z.string(),
  possibleReason: z.string(),
  confidenceImpact: z.enum(['low', 'moderate', 'high'])
});
export type PredictionContradiction = z.infer<typeof PredictionContradictionSchema>;

export const ClassicalSourceCitationSchema = z.object({
  tier: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  text: z.string(),
  chapter: z.string().optional(),
  verse: z.string().optional(),
  author: z.string().optional()
});
export type ClassicalSourceCitation = z.infer<typeof ClassicalSourceCitationSchema>;

export const CodifiedRuleSchema = z.object({
  ruleId: z.string(),
  tradition: AstrologyTraditionSchema,
  school: z.string(),
  technique: z.string(),
  category: EventTypeSchema,
  conditions: z.array(z.string()),
  trigger: z.string(),
  timing: z.string(),
  weight: z.number().min(0).max(1),
  calibratedWeight: z.number().min(0).max(1).optional(),
  interpretation: z.string(),
  sources: z.array(ClassicalSourceCitationSchema),
  version: z.string(),
  tests: z.array(z.string()).default([])
});
export type CodifiedRule = z.infer<typeof CodifiedRuleSchema>;

/**
 * Master Canonical Prediction Contract
 */
export const CanonicalPredictionSchema = z.object({
  id: z.string(),
  subjectId: z.string(),
  question: z.string(),
  eventType: EventTypeSchema,
  category: EventCategorySchema,
  headline: z.string(),
  start: z.string(), // ISO Date string
  peak: z.string(),  // ISO Date string
  end: z.string(),    // ISO Date string
  durationDays: z.number().min(0),
  precision: DatePrecisionSchema,
  intensity: z.number().min(0).max(100),
  confidence: z.number().min(0).max(1),
  stability: StabilityClassificationSchema,
  qualityFlags: z.array(PredictionQualityFlagSchema),
  uncertaintyFactors: z.array(UncertaintyFactorSchema),
  systems: z.array(AstrologyTraditionSchema),
  techniques: z.array(z.string()),
  rules: z.array(CodifiedRuleSchema),
  evidence: z.array(EvidenceItemSchema),
  contradictions: z.array(PredictionContradictionSchema),
  assumptions: z.array(z.string()),
  calculationVersion: z.string(),
  ephemerisVersion: EphemerisSourceSchema,
  timezoneVersion: z.string(),
  ruleVersion: z.string(),
  createdAt: z.string()
}).refine(data => {
  const s = new Date(data.start).getTime();
  const p = new Date(data.peak).getTime();
  const e = new Date(data.end).getTime();
  return s <= p && p <= e;
}, {
  message: 'Prediction window chronology violated: must satisfy start <= peak <= end'
});

export type CanonicalPrediction = z.infer<typeof CanonicalPredictionSchema>;

/**
 * User Prediction Journal Outcome Schema
 */
export const JournalOutcomeSchema = z.enum([
  'STRONG_MATCH',
  'PARTIAL_MATCH',
  'DIFFERENT',
  'NO_NOTICEABLE_EVENT',
  'UNKNOWN'
]);
export type JournalOutcome = z.infer<typeof JournalOutcomeSchema>;

export const PredictionJournalEntrySchema = z.object({
  journalId: z.string(),
  predictionId: z.string(),
  subjectId: z.string(),
  recordedDate: z.string(),
  outcome: JournalOutcomeSchema,
  userNotes: z.string().optional(),
  isFeedbackVerified: z.boolean().default(false)
});
export type PredictionJournalEntry = z.infer<typeof PredictionJournalEntrySchema>;
