/**
 * ASTRO360 OMNI - Canonical Astro Schema (PRD Section 17, 37-43)
 * Master deterministic schema for all calculation engines, rule provenance,
 * predictions, cross-tradition consensus, and calibrated confidence.
 */

export type EphemerisSource = 'DE440' | 'DE441' | 'SwissEph' | 'Skyfield' | 'KeplerianAnalytical';

export type HouseSystemType = 
  | 'whole-sign' 
  | 'placidus' 
  | 'equal' 
  | 'koch' 
  | 'campanus' 
  | 'regiomontanus' 
  | 'porphyry' 
  | 'alcabitius' 
  | 'topocentric' 
  | 'meridian' 
  | 'morinus';

export type AyanamshaSystemType = 
  | 'lahiri' 
  | 'raman' 
  | 'krishnamurti' 
  | 'fagan-bradley' 
  | 'yukteswar' 
  | 'true-chitra' 
  | 'tropical';

export type EventOntologyCategory =
  | 'CAREER_CHANGE'
  | 'PROMOTION'
  | 'PROMOTION_THEME'
  | 'JOB_TRANSITION'
  | 'ROLE_CHANGE'
  | 'RESPONSIBILITY'
  | 'RECOGNITION'
  | 'PUBLIC_RECOGNITION'
  | 'BUSINESS_ACTIVITY'
  | 'BUSINESS_EXPANSION'
  | 'RELATIONSHIP_START'
  | 'RELATIONSHIP_CHANGE'
  | 'COMMITMENT'
  | 'MARRIAGE_THEME'
  | 'SEPARATION_THEME'
  | 'EDUCATION'
  | 'STUDY'
  | 'EXAM'
  | 'LEARNING'
  | 'TRAVEL'
  | 'RELOCATION'
  | 'FOREIGN_CONNECTION'
  | 'PROPERTY'
  | 'FINANCIAL_THEME'
  | 'FINANCIAL_ACTIVITY'
  | 'BUSINESS_GROWTH'
  | 'HOME'
  | 'CHILDREN'
  | 'FAMILY_CHANGE'
  | 'GROWTH'
  | 'TRANSITION'
  | 'CREATIVE'
  | 'CREATIVE_PERIOD'
  | 'SPIRITUAL'
  | 'SPIRITUAL_PERIOD'
  | 'HIGH_ACTIVITY_PERIOD'
  | 'LOW_ACTIVITY_PERIOD'
  | 'TRANSITION_PERIOD'
  | 'CUSTOM';

export type AstrologyTradition =
  | 'vedic'
  | 'vedic_parashari'
  | 'vedic_jaimini'
  | 'vedic_kp'
  | 'vedic_tajika'
  | 'western'
  | 'western_tropical'
  | 'western_hellenistic'
  | 'kp'
  | 'jaimini'
  | 'tajika'
  | 'chinese-bazi'
  | 'chinese_bazi'
  | 'islamic-falak'
  | 'islamic_falak'
  | 'tibetan'
  | 'ancient-hellenistic';

export interface CalculationMetadata {
  engineVersion: string;
  ephemeris: EphemerisSource;
  timezoneDatabase: string;
  calculatedAt: string;
  precisionToleranceDeg: number;
}

export interface NormalizedBirthData {
  localDate: string;
  localTime: string;
  timezone: string;
  latitude: number;
  longitude: number;
  utc: string;
  julianDay: number;
  deltaT: number;
  localSiderealTime: number;
  birthTimeUncertaintyMinutes: number;
}

export interface PlanetCoordinate {
  name: string;
  longitude: number;
  sign: string;
  degreeInSign: number;
  minutes: number;
  seconds: number;
  latitude: number;
  declination: number;
  rightAscension: number;
  distanceAU: number;
  speedLongitude: number;
  isRetrograde: boolean;
  isStationary: boolean;
  isCombust: boolean;
  houseNumber: number;
  nakshatra?: string;
  pada?: number;
  nakshatraLord?: string;
  kpSubLord?: string;
  kpSubSubLord?: string;
  dignity: 'exalted' | 'own' | 'moolatrikona' | 'friendly' | 'neutral' | 'enemy' | 'debilitated';
  shadbalaRupas?: number;
}

export interface HouseCuspCoordinate {
  houseNumber: number;
  cuspLongitude: number;
  sign: string;
  degreeInSign: number;
  signLord: string;
  starLord?: string;
  subLord?: string;
  occupants: string[];
}

export interface AspectGeometry {
  planetA: string;
  planetB: string;
  aspectType: 'conjunction' | 'sextile' | 'square' | 'trine' | 'opposition' | 'quincunx';
  angleDeg: number;
  exactAngle: number;
  orbDeg: number;
  isApplying: boolean;
  isHarmonic: boolean;
}

export interface RuleProvenance {
  ruleId: string;
  tradition: AstrologyTradition;
  school: string;
  category: EventOntologyCategory;
  version: string;
  astronomicalFactors: string[];
  timingFactors: string[];
  conditionsText: string;
  effectsText: string;
  weight: number;
  sources: {
    tier: 1 | 2 | 3 | 4 | 5;
    text: string;
    chapter?: string;
    verse?: string;
    author?: string;
  }[];
}

export interface EventPrediction {
  predictionId: string;
  eventType: EventOntologyCategory;
  windowStart: string;
  windowPeak: string;
  windowEnd: string;
  timingPrecision: 'exact_day' | 'week' | 'month' | 'quarter' | 'year' | 'multi_year';
  intensity: number;
  confidenceScore: number;
  systemsSupporting: AstrologyTradition[];
  systemsConflicting: AstrologyTradition[];
  rulesTriggered: RuleProvenance[];
  astronomicalEvidence: string[];
  historicalHitRate?: number;
}

export interface ConsensusConflictAnalysis {
  eventType: EventOntologyCategory;
  consensusLevel: 'HIGH_CONSENSUS' | 'MODERATE_CONSENSUS' | 'DIVERGENT' | 'CONFLICTING';
  overallDirection: string;
  traditionViews: {
    tradition: AstrologyTradition;
    theme: string;
    strength: 'Strong' | 'Moderate' | 'Weak' | 'Neutral';
    specificManifestation: string;
  }[];
  explicitContradictions: {
    traditionA: AstrologyTradition;
    viewA: string;
    traditionB: AstrologyTradition;
    viewB: string;
    resolutionNote: string;
  }[];
  synthesis: string;
}

export interface CalibratedConfidenceModel {
  inputQuality: number;
  astronomicalPrecision: number;
  ruleReliability: number;
  timingPrecision: number;
  crossSystemAgreement: number;
  historicalValidation: number;
  overallModelConfidence: number;
  disclaimer: string;
}

export interface CanonicalAstroSchema {
  schemaVersion: '3.0.0';
  calculation: CalculationMetadata;
  birth: NormalizedBirthData;
  zodiac: {
    mode: 'sidereal' | 'tropical';
    ayanamsha: AyanamshaSystemType;
    ayanamshaOffsetDeg: number;
    ayanamshaVersion: string;
  };
  houses: {
    system: HouseSystemType;
    cusps: HouseCuspCoordinate[];
  };
  planets: Record<string, PlanetCoordinate>;
  angles: {
    ascendantDeg: number;
    midheavenDeg: number;
    descendantDeg: number;
    imumCoeliDeg: number;
    vertexDeg?: number;
  };
  aspects: AspectGeometry[];
  traditions: {
    vedic?: {
      vargas: Record<string, Record<string, number>>;
      activeDasha: {
        system: string;
        maha: string;
        antar: string;
        pratyantar: string;
        startDate: string;
        endDate: string;
      };
      yogasDetected: { name: string; isAuspicious: boolean; ruleSource: string }[];
      doshasEvaluated: { name: string; severity: string; isCancelled: boolean }[];
      ashtakavargaSAV: Record<number, number>;
    };
    western?: {
      chartSect: 'diurnal' | 'nocturnal';
      essentialDignitiesTotal: number;
      secondaryProgressedSun: { sign: string; degree: number };
      lots: { partOfFortune: number; partOfSpirit: number; partOfEros?: number };
    };
    kp?: {
      rulingPlanets: string[];
      cuspalSubLords: string[];
      significatorHouses: Record<string, number[]>;
    };
    chineseBazi?: {
      fourPillars: {
        year: { stem: string; branch: string; element: string };
        month: { stem: string; branch: string; element: string };
        day: { stem: string; branch: string; element: string };
        hour: { stem: string; branch: string; element: string };
      };
      dayMaster: string;
      dayMasterStrength: 'Weak' | 'Balanced' | 'Strong';
      dominantGod: string;
    };
  };
  predictions: EventPrediction[];
  consensus: ConsensusConflictAnalysis[];
  confidence: CalibratedConfidenceModel;
}
