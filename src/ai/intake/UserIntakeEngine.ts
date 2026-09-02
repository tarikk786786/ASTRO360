/**
 * ASTRO360 User Intake Engine
 * Collects, classifies, and organizes all required, recommended, and optional user information
 * prior to executing astrology calculations or predictions.
 */

export type FieldRequirementLevel = 
  | "REQUIRED"
  | "RECOMMENDED"
  | "OPTIONAL"
  | "CONTEXTUAL"
  | "NOT_APPLICABLE";

export type BirthTimeConfidence = 
  | "EXACT"          // Birth certificate / hospital record
  | "VERY_CLOSE"    // Parent memory within 5-15 mins
  | "APPROXIMATE"   // Memory within 30-60 mins
  | "WIDE_RANGE"    // Morning / Afternoon / Evening (2-4 hours)
  | "UNKNOWN";       // Date known, time completely unknown

export type PredictionArea = 
  | "LIFE_OVERVIEW"
  | "CAREER"
  | "NEW_JOB"
  | "PROMOTION"
  | "JOB_CHANGE"
  | "BUSINESS"
  | "BUSINESS_LAUNCH"
  | "BUSINESS_GROWTH"
  | "MONEY"
  | "INVESTMENT"
  | "DEBT"
  | "RELATIONSHIP"
  | "MARRIAGE"
  | "FAMILY"
  | "CHILDREN"
  | "EDUCATION"
  | "EXAM"
  | "TRAVEL"
  | "RELOCATION"
  | "FOREIGN_SETTLEMENT"
  | "HOME"
  | "LEGAL_OR_ADMINISTRATIVE"
  | "SPIRITUALITY"
  | "DAILY"
  | "WEEKLY"
  | "MONTHLY"
  | "ANNUAL"
  | "MULTI_YEAR"
  | "COMPATIBILITY"
  | "SYNASTRY"
  | "COMPOSITE"
  | "MUHURTA"
  | "PRASHNA"
  | "HISTORICAL_EVENT"
  | "ASTROCARTOGRAPHY"
  | "ISLAMIC_KNOWLEDGE"
  | "ASTRONOMY"
  | "GENERAL_RESEARCH";

export type TimeHorizon = 
  | "TODAY"
  | "TOMORROW"
  | "NEXT_7_DAYS"
  | "NEXT_30_DAYS"
  | "NEXT_3_MONTHS"
  | "NEXT_6_MONTHS"
  | "NEXT_12_MONTHS"
  | "NEXT_2_YEARS"
  | "NEXT_5_YEARS"
  | "CUSTOM_RANGE"
  | "HISTORICAL_PERIOD"
  | "EVENT_SPECIFIC";

export interface HistoricalLifeEvent {
  id: string;
  eventType: string; // e.g. 'JOB_START', 'MARRIAGE', 'RELOCATION', 'SURGERY', 'CHILD_BIRTH'
  eventDate: string; // YYYY-MM-DD
  eventLocation?: string;
  eventTime?: string;
  description?: string;
  isExactDate: boolean;
  confidence: 'HIGH' | 'MODERATE' | 'APPROXIMATE';
}

export interface UserIntakeProfile {
  fullName: string;
  dateOfBirth: string; // YYYY-MM-DD
  birthTime?: string;  // HH:MM (24h)
  birthTimeConfidence: BirthTimeConfidence;
  birthPlace: string;
  countryOfBirth: string;
  resolvedCoordinates?: {
    latitude: number;
    longitude: number;
    resolvedCity: string;
    resolvedCountry: string;
    locationConfidence: 'EXACT' | 'CITY_CENTER' | 'APPROXIMATE';
  };
  timezoneInfo?: {
    ianaTimezone: string;
    utcOffsetHours: number;
    isDstActive: boolean;
    historicalStandard: string;
  };
  mainQuestion: string;
  predictionArea: PredictionArea;
  timeHorizon: TimeHorizon;
  customHorizonDates?: { startDate: string; endDate: string };
  // Contextual details
  partnerProfile?: {
    name: string;
    dateOfBirth: string;
    birthTime?: string;
    birthPlace: string;
  };
  historicalRectificationEvents?: HistoricalLifeEvent[];
  preferredTraditions?: string[];
  preferredLanguage?: string;
  preferredDepth?: 'SIMPLE' | 'STANDARD' | 'DEEP_RESEARCH' | 'TECHNICAL';
  userConfirmed: boolean;
}

export class UserIntakeEngine {
  /**
   * Evaluates what information is strictly required vs optional based on the question area
   */
  public static getRequirementsForArea(area: PredictionArea): Record<string, FieldRequirementLevel> {
    const isRelational = area === "COMPATIBILITY" || area === "SYNASTRY" || area === "COMPOSITE";
    const isHorary = area === "PRASHNA";
    const isMuhurta = area === "MUHURTA";
    const isIslamicOrAstro = area === "ISLAMIC_KNOWLEDGE" || area === "ASTRONOMY";

    if (isIslamicOrAstro) {
      return {
        fullName: "RECOMMENDED",
        dateOfBirth: "OPTIONAL",
        birthTime: "NOT_APPLICABLE",
        birthPlace: "RECOMMENDED", // Needed for prayer times / local sky
        mainQuestion: "REQUIRED",
        timeHorizon: "RECOMMENDED"
      };
    }

    if (isHorary) {
      return {
        fullName: "RECOMMENDED",
        dateOfBirth: "OPTIONAL",
        birthTime: "NOT_APPLICABLE",
        birthPlace: "REQUIRED", // Prashna uses question location & timestamp
        mainQuestion: "REQUIRED",
        timeHorizon: "RECOMMENDED"
      };
    }

    return {
      fullName: "REQUIRED",
      dateOfBirth: "REQUIRED",
      birthTime: "REQUIRED", // If unknown, confidence must be marked UNKNOWN
      birthPlace: "REQUIRED",
      countryOfBirth: "REQUIRED",
      mainQuestion: "REQUIRED",
      timeHorizon: "REQUIRED",
      partnerProfile: isRelational ? "REQUIRED" : "OPTIONAL",
      eventSpecificDate: isMuhurta ? "REQUIRED" : "OPTIONAL",
      historicalRectificationEvents: "RECOMMENDED"
    };
  }

  /**
   * Initializes a default intake profile
   */
  public static createInitialIntake(mainQuestion: string, area: PredictionArea = "LIFE_OVERVIEW"): UserIntakeProfile {
    return {
      fullName: "",
      dateOfBirth: "",
      birthTimeConfidence: "EXACT",
      birthPlace: "",
      countryOfBirth: "",
      mainQuestion,
      predictionArea: area,
      timeHorizon: "NEXT_6_MONTHS",
      preferredTraditions: ["Vedic", "Western", "KP", "Jaimini"],
      preferredLanguage: "English",
      preferredDepth: "STANDARD",
      userConfirmed: false
    };
  }
}
