/**
 * ASTRO360 Prediction Method Registry
 * Defines all available prediction techniques, calculation engines, required inputs, and evidence tiers.
 */

export interface PredictionMethodRecord {
  methodId: string;
  name: string;
  traditionId: string;
  category: string;
  requiredInputs: string[];
  optionalInputs: string[];
  timingCapability: 'DAILY' | 'MONTHLY' | 'ANNUAL' | 'MULTI_YEAR' | 'EXACT_EVENT';
  evidenceLevel: 1 | 2 | 3;
  validationStatus: 'VALIDATED' | 'RESEARCH' | 'EXPERIMENTAL';
  description: string;
}

export class PredictionMethodRegistry {
  public static readonly METHODS: PredictionMethodRecord[] = [
    {
      methodId: "VEDIC_DASHA_VIMSHOTTARI",
      name: "Vimshottari Dasha Mahadasha / Antardasha Timing",
      traditionId: "VEDIC_PARASHARI",
      category: "TIMING",
      requiredInputs: ["dateOfBirth", "birthTime", "birthPlace"],
      optionalInputs: ["historicalRectificationEvents"],
      timingCapability: "MULTI_YEAR",
      evidenceLevel: 1,
      validationStatus: "VALIDATED",
      description: "120-year planetary period cycle mapped from natal Moon nakshatra degrees."
    },
    {
      methodId: "VEDIC_GOCHAR_TRANSIT",
      name: "Vedic Gochar (Planetary Transits relative to Moon & Lagna)",
      traditionId: "VEDIC_PARASHARI",
      category: "TRANSIT",
      requiredInputs: ["dateOfBirth", "birthPlace"],
      optionalInputs: ["birthTime"],
      timingCapability: "MONTHLY",
      evidenceLevel: 1,
      validationStatus: "VALIDATED",
      description: "Transiting slow planets (Saturn, Jupiter, Rahu/Ketu) through rashi houses and ashtakavarga bindus."
    },
    {
      methodId: "VEDIC_D10_DASHAMSHA",
      name: "Dashamsha (D10) Vocation & Executive Authority Chart",
      traditionId: "VEDIC_PARASHARI",
      category: "DIVISIONAL",
      requiredInputs: ["dateOfBirth", "birthTime", "birthPlace"],
      optionalInputs: [],
      timingCapability: "MULTI_YEAR",
      evidenceLevel: 1,
      validationStatus: "VALIDATED",
      description: "1/10th divisional harmonic chart governing career karma, status, and public reputation."
    },
    {
      methodId: "WESTERN_TRANSITS_MAJOR",
      name: "Western Outer Planet Major Aspects (Conjunction, Trine, Square, Opposition)",
      traditionId: "WESTERN_TROPICAL",
      category: "TRANSIT",
      requiredInputs: ["dateOfBirth", "birthPlace"],
      optionalInputs: ["birthTime"],
      timingCapability: "MONTHLY",
      evidenceLevel: 1,
      validationStatus: "VALIDATED",
      description: "Major hard and soft Ptolemaic transit contacts with natal points."
    },
    {
      methodId: "WESTERN_SECONDARY_PROGRESSIONS",
      name: "Secondary Progressions (Day-for-a-Year Ephemeris Movement)",
      traditionId: "WESTERN_TROPICAL",
      category: "PROGRESSION",
      requiredInputs: ["dateOfBirth", "birthTime", "birthPlace"],
      optionalInputs: [],
      timingCapability: "ANNUAL",
      evidenceLevel: 1,
      validationStatus: "VALIDATED",
      description: "Internal psychological maturation and progressed lunar phases."
    },
    {
      methodId: "KP_CUSPAL_SIGNIFICATORS",
      name: "KP Cuspal Sub-Lord 249 Table Event Interlinks",
      traditionId: "KP_STELLAR",
      category: "STELLAR",
      requiredInputs: ["dateOfBirth", "birthTime", "birthPlace"],
      optionalInputs: [],
      timingCapability: "EXACT_EVENT",
      evidenceLevel: 2,
      validationStatus: "VALIDATED",
      description: "Cuspal sub-lord significations linking primary and supporting houses for event fruition."
    },
    {
      methodId: "JAIMINI_CHARA_DASHA",
      name: "Jaimini Chara Dasha Sign-Based Timing",
      traditionId: "JAIMINI_SUTRAS",
      category: "TIMING",
      requiredInputs: ["dateOfBirth", "birthTime", "birthPlace"],
      optionalInputs: [],
      timingCapability: "MULTI_YEAR",
      evidenceLevel: 2,
      validationStatus: "VALIDATED",
      description: "Rashi-based Dasha period activating Chara Karakas (AK, AmK, DK)."
    }
  ];

  public static getMethodsForCategory(category: string): PredictionMethodRecord[] {
    return this.METHODS.filter(m => m.category === category || category === "ALL");
  }
}
