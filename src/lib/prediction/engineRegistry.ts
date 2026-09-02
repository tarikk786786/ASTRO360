/**
 * ASTRO360 — Multi-Engine Astrology Registry & Applicability Matrix
 * Strict Principle: Independent engine execution grounded on canonical ASTROCORE astronomical state.
 */

export type EngineTradition = 
  | 'vedic_parashari'
  | 'western_tropical'
  | 'kp_stellar'
  | 'jaimini_sutras'
  | 'tajika_varshaphala'
  | 'panchanga_muhurta'
  | 'chinese_bazi'
  | 'islamic_falak';

export type PredictionCategory = 
  | 'CAREER'
  | 'RELATIONSHIP'
  | 'WEALTH'
  | 'HEALTH'
  | 'SPIRITUALITY'
  | 'EDUCATION'
  | 'TRAVEL'
  | 'TIMING'
  | 'NAKSHATRA'
  | 'MUHURTA';

export interface RegisteredAstrologyEngine {
  engineId: string;
  name: string;
  tradition: EngineTradition;
  school: string;
  version: string;
  techniques: string[];
  supportedCategories: PredictionCategory[];
  requiredInputs: string[];
  outputSchema: string;
  ruleSetVersion: string;
  source: string;
  validationStatus: 'VALIDATED' | 'BETA' | 'RESEARCH';
}

export const ASTROLOGY_ENGINE_REGISTRY: Record<string, RegisteredAstrologyEngine> = {
  vedic_parashari: {
    engineId: 'vedic_parashari',
    name: 'Vedic Parashari Hora Engine',
    tradition: 'vedic_parashari',
    school: 'Classical Parashari',
    version: '2.4.0',
    techniques: ['Vimshottari Dasha', 'Rasi Drishti', 'D1/D9/D10 Vargas', 'Gochara Transits'],
    supportedCategories: ['CAREER', 'RELATIONSHIP', 'WEALTH', 'HEALTH', 'SPIRITUALITY', 'EDUCATION', 'TRAVEL', 'TIMING', 'NAKSHATRA', 'MUHURTA'],
    requiredInputs: ['dob', 'time', 'lat', 'lng', 'ayanamsha'],
    outputSchema: 'EngineFindingSchema_v1',
    ruleSetVersion: 'BPHS_v3.2',
    source: 'Brihat Parashara Hora Shastra',
    validationStatus: 'VALIDATED'
  },
  western_tropical: {
    engineId: 'western_tropical',
    name: 'Western Tropical Ingress & Progression Engine',
    tradition: 'western_tropical',
    school: 'Modern Psychological & Classical Ptolemaic',
    version: '2.1.0',
    techniques: ['Secondary Progressions', 'Solar Arc Directions', 'Major Planetary Transits', 'Placidus House Cusps'],
    supportedCategories: ['CAREER', 'RELATIONSHIP', 'WEALTH', 'HEALTH', 'SPIRITUALITY', 'EDUCATION', 'TRAVEL', 'TIMING'],
    requiredInputs: ['dob', 'time', 'lat', 'lng'],
    outputSchema: 'EngineFindingSchema_v1',
    ruleSetVersion: 'Tetrabiblos_v2.0',
    source: "Ptolemy's Tetrabiblos & Modern Harmonic Ephemeris",
    validationStatus: 'VALIDATED'
  },
  kp_stellar: {
    engineId: 'kp_stellar',
    name: 'KP Stellar Sub-Lord Engine',
    tradition: 'kp_stellar',
    school: 'Krishnamurti Padhdhati',
    version: '1.9.0',
    techniques: ['Placidus Cusps with Lahiri Ayanamsha', 'Sub-Lord Significations', 'Ruling Planets', '249 Sub Divisions'],
    supportedCategories: ['CAREER', 'RELATIONSHIP', 'WEALTH', 'HEALTH', 'EDUCATION', 'TRAVEL', 'TIMING'],
    requiredInputs: ['dob', 'time', 'lat', 'lng', 'ayanamsha'],
    outputSchema: 'EngineFindingSchema_v1',
    ruleSetVersion: 'KP_Readers_I_to_VI',
    source: 'Prof. K.S. Krishnamurti Readers',
    validationStatus: 'VALIDATED'
  },
  jaimini_sutras: {
    engineId: 'jaimini_sutras',
    name: 'Jaimini Sutras Chara Dasha Engine',
    tradition: 'jaimini_sutras',
    school: 'Jaimini Upadesha',
    version: '1.8.0',
    techniques: ['Chara Dasha', '7 Karakas (Atmakaraka to Darakaraka)', 'Arudha Padas', 'Rasi Aspects'],
    supportedCategories: ['CAREER', 'RELATIONSHIP', 'WEALTH', 'SPIRITUALITY', 'TIMING'],
    requiredInputs: ['dob', 'time', 'lat', 'lng', 'ayanamsha'],
    outputSchema: 'EngineFindingSchema_v1',
    ruleSetVersion: 'JUS_v1.4',
    source: 'Maharishi Jaimini Upadesha Sutras',
    validationStatus: 'VALIDATED'
  },
  tajika_varshaphala: {
    engineId: 'tajika_varshaphala',
    name: 'Tajika Varshaphala Solar Return Engine',
    tradition: 'tajika_varshaphala',
    school: 'Medieval Indo-Persian Tajika',
    version: '1.5.0',
    techniques: ['Solar Return Chart (Varsha Kundli)', 'Muntha Progression', 'Varsheshwara', '16 Tajika Yogas (Ithasala, Ishrafa)'],
    supportedCategories: ['CAREER', 'RELATIONSHIP', 'WEALTH', 'HEALTH', 'TIMING'],
    requiredInputs: ['dob', 'time', 'lat', 'lng', 'targetYear'],
    outputSchema: 'EngineFindingSchema_v1',
    ruleSetVersion: 'TajikaNeelakanthi_v1.2',
    source: 'Tajika Neelakanthi',
    validationStatus: 'VALIDATED'
  },
  panchanga_muhurta: {
    engineId: 'panchanga_muhurta',
    name: 'Panchanga & Electional Muhurta Engine',
    tradition: 'panchanga_muhurta',
    school: 'Classical Vedic Chronometry',
    version: '2.0.0',
    techniques: ['5 Limbs (Tithi, Vara, Nakshatra, Yoga, Karana)', 'Abhijit Muhurta', 'Rahu Kalam', 'Planetary Horas'],
    supportedCategories: ['TIMING', 'MUHURTA', 'NAKSHATRA', 'SPIRITUALITY'],
    requiredInputs: ['date', 'time', 'lat', 'lng'],
    outputSchema: 'EngineFindingSchema_v1',
    ruleSetVersion: 'MuhurtaChintamani_v2.0',
    source: 'Muhurta Chintamani & Surya Siddhanta',
    validationStatus: 'VALIDATED'
  },
  chinese_bazi: {
    engineId: 'chinese_bazi',
    name: 'Chinese BaZi Four Pillars Engine',
    tradition: 'chinese_bazi',
    school: 'Four Pillars of Destiny',
    version: '1.6.0',
    techniques: ['Heavenly Stems & Earthly Branches', 'Day Master Element Strength', '10-Year Luck Pillars (Da Yun)', 'Five Element Dynamics'],
    supportedCategories: ['CAREER', 'WEALTH', 'RELATIONSHIP', 'TIMING'],
    requiredInputs: ['dob', 'time', 'solarTermCalendar'],
    outputSchema: 'EngineFindingSchema_v1',
    ruleSetVersion: 'SanMingTongHui_v1.0',
    source: 'San Ming Tong Hui & Di Tian Sui',
    validationStatus: 'VALIDATED'
  },
  islamic_falak: {
    engineId: 'islamic_falak',
    name: 'Islamic Ilm al-Falak Chronometry Engine',
    tradition: 'islamic_falak',
    school: 'Medieval Islamic Astronomical Observationalism',
    version: '1.7.0',
    techniques: ['28 Manazil al-Qamar (Lunar Mansions)', 'Classical Arabic Lots (Sahm)', 'Planetary Horas (Sa\'at al-Kawakib)'],
    supportedCategories: ['TIMING', 'SPIRITUALITY', 'CAREER', 'RELATIONSHIP'],
    requiredInputs: ['dob', 'time', 'lat', 'lng'],
    outputSchema: 'EngineFindingSchema_v1',
    ruleSetVersion: 'KitabAlTafhim_v1.0',
    source: "Al-Biruni's Kitab al-Tafhim & Ibn Yunus Hakemite Tables",
    validationStatus: 'VALIDATED'
  }
};

export class EngineApplicabilityMatrix {
  /**
   * Determine whether an engine is applicable for a specific question category.
   * Non-applicable engines must NEVER be counted as disagreement or failure.
   */
  static isApplicable(engineId: string, category: PredictionCategory): boolean {
    const engine = ASTROLOGY_ENGINE_REGISTRY[engineId];
    if (!engine) return false;
    return engine.supportedCategories.includes(category);
  }

  /**
   * Get all registered engines eligible for a given prediction category.
   */
  static getEligibleEngines(category: PredictionCategory): RegisteredAstrologyEngine[] {
    return Object.values(ASTROLOGY_ENGINE_REGISTRY).filter(e => 
      e.supportedCategories.includes(category)
    );
  }
}
