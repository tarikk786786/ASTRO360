/**
 * ASTRO360 OMNI - Master Codified Astrological Rule Registry (PRD Section 14, 15, 72)
 * Contains traceable, classical scripture-cited rules across Vedic, Western, KP, Jaimini, Hellenistic, BaZi.
 * No anonymous rules.
 */

import { CodifiedRule } from './predictionSchema';

export const MASTER_RULE_REGISTRY: CodifiedRule[] = [
  // ─── 1. VEDIC CAREER & PROMOTION ──────────────────────────────────────────
  {
    ruleId: 'VEDIC_TRANSIT_JUP_10H_001',
    tradition: 'vedic_parashari',
    school: 'Parashari',
    technique: 'Gochara / Transits',
    category: 'CAREER_CHANGE',
    conditions: ['Jupiter in 10th bhava from Lagna or Moon', 'SAV score >= 28 bindus'],
    trigger: 'Jupiter ingress into 10th house or trinal aspect on 10th lord',
    timing: 'Active duration of Jupiter transit (approx. 12 months, peak during direct stationary phase)',
    weight: 0.88,
    calibratedWeight: 0.85,
    interpretation: 'Promotion, professional elevation, executive authority, and societal respect.',
    sources: [
      { tier: 1, text: 'Brihat Parashara Hora Shastra', chapter: 'Chapter 41: Planetary Transits', verse: 'Verses 18-22', author: 'Sage Parashara' },
      { tier: 2, text: 'Phaladeepika', chapter: 'Chapter 26: Gochara Phala', author: 'Mantreswara' }
    ],
    version: '2.0.0',
    tests: ['test_jupiter_10th_ingress', 'test_sav_bindu_threshold']
  },
  {
    ruleId: 'VEDIC_RAJA_YOGA_1_10_002',
    tradition: 'vedic_parashari',
    school: 'Parashari',
    technique: 'Kendra-Trikona Yogas',
    category: 'RECOGNITION',
    conditions: ['Conjunction or mutual aspect between 1st Lord (Lagna) and 10th Lord (Karma)'],
    trigger: 'Vimshottari Dasha or Antardasha of participating lords',
    timing: 'Mahadasha / Antardasha active window',
    weight: 0.92,
    calibratedWeight: 0.90,
    interpretation: 'High public acclaim, leadership position, institutional authority, and long-lasting reputation.',
    sources: [
      { tier: 1, text: 'Brihat Parashara Hora Shastra', chapter: 'Chapter 35: Raja Yogas', verse: 'Verses 1-5', author: 'Sage Parashara' }
    ],
    version: '2.0.0',
    tests: ['test_raja_yoga_lords_conjunction']
  },
  {
    ruleId: 'VEDIC_D10_DASHAMSHA_ALIGN_003',
    tradition: 'vedic_parashari',
    school: 'Parashari Varga',
    technique: 'D10 Dashamsha Harmonic Analysis',
    category: 'RESPONSIBILITY',
    conditions: ['D10 Lagna Lord exalted or in own house in D10', 'Benefic aspect on D10 10th house'],
    trigger: 'D10 dispositor dasha sub-period',
    timing: 'Sub-period of D10 functional benefic',
    weight: 0.84,
    calibratedWeight: 0.82,
    interpretation: 'Expansion of vocational scope, executive responsibility, and mastery of professional domain.',
    sources: [
      { tier: 1, text: 'Brihat Parashara Hora Shastra', chapter: 'Chapter 6: Shodashavarga Calculation', author: 'Sage Parashara' },
      { tier: 2, text: 'Saravali', chapter: 'Chapter 3: Vargas and Dignities', author: 'Kalyana Varma' }
    ],
    version: '2.0.0',
    tests: ['test_d10_dignity_calculation']
  },

  // ─── 2. VEDIC RELATIONSHIP & MARRIAGE ─────────────────────────────────────
  {
    ruleId: 'VEDIC_JUPITER_ASPECT_7H_004',
    tradition: 'vedic_parashari',
    school: 'Parashari',
    technique: 'Gochara Drishti',
    category: 'RELATIONSHIP_START',
    conditions: ['Transiting Jupiter aspects 7th house, 7th lord, or natal Venus'],
    trigger: 'Jupiter 5th, 7th, or 9th drishti aspect within 3° orb',
    timing: 'Jupiter transit window (peak at exact aspect)',
    weight: 0.86,
    calibratedWeight: 0.84,
    interpretation: 'Harmonious relationship inception, mutual goodwill, alliance formation, or marriage timing window.',
    sources: [
      { tier: 1, text: 'Brihat Parashara Hora Shastra', chapter: 'Chapter 41: Gochara Effects', author: 'Sage Parashara' },
      { tier: 2, text: 'Jataka Parijata', chapter: 'Chapter 14: Marriage Timing', author: 'Vaidyanatha Dikshita' }
    ],
    version: '2.0.0',
    tests: ['test_jupiter_7h_drishti']
  },
  {
    ruleId: 'VEDIC_VENUS_MAHADASHA_005',
    tradition: 'vedic_parashari',
    school: 'Parashari Vimshottari',
    technique: 'Vimshottari Dasha System',
    category: 'COMMITMENT',
    conditions: ['Venus strong in Shadbala (> 1.0 rupas)', 'Venus occupying Kendra/Trikona in D1 & D9'],
    trigger: 'Venus Mahadasha or Venus-Jupiter / Venus-Mercury Antardasha',
    timing: 'Dasha sub-period active duration',
    weight: 0.89,
    calibratedWeight: 0.88,
    interpretation: 'Deepening interpersonal commitment, artistic creation, social ease, and marital stability.',
    sources: [
      { tier: 1, text: 'Brihat Parashara Hora Shastra', chapter: 'Chapter 46: Vimshottari Dasha Results', verse: 'Verses 140-155', author: 'Sage Parashara' }
    ],
    version: '2.0.0',
    tests: ['test_venus_dasha_calculation']
  },

  // ─── 3. VEDIC WEALTH & FINANCIAL ACTIVITY ────────────────────────────────
  {
    ruleId: 'VEDIC_DHANA_YOGA_2_11_006',
    tradition: 'vedic_parashari',
    school: 'Parashari',
    technique: 'Dhana Yogas (Wealth Combinations)',
    category: 'FINANCIAL_ACTIVITY',
    conditions: ['2nd Lord (accumulated wealth) conjunct or aspecting 11th Lord (gains)', 'Jupiter in Kendra'],
    trigger: 'Vimshottari Dasha of 2nd or 11th Lord',
    timing: 'Active sub-period of participating planets',
    weight: 0.90,
    calibratedWeight: 0.87,
    interpretation: 'Material prosperity, expansion of cash flows, return on investments, and asset accumulation.',
    sources: [
      { tier: 1, text: 'Brihat Parashara Hora Shastra', chapter: 'Chapter 37: Dhana Yogas', verse: 'Verses 1-10', author: 'Sage Parashara' }
    ],
    version: '2.0.0',
    tests: ['test_dhana_yoga_lord_activation']
  },

  // ─── 4. WESTERN TROPICAL CAREER & ELEVATION ──────────────────────────────
  {
    ruleId: 'WESTERN_SOLAR_ARC_MC_JUP_007',
    tradition: 'western_tropical',
    school: 'Modern / Cosmobiology',
    technique: 'Solar Arc Directions',
    category: 'PROMOTION_THEME',
    conditions: ['Directed Jupiter conjunct or trine natal Midheaven (MC) with orb < 1°00\''],
    trigger: 'Solar arc separation within 45 arcminutes',
    timing: '9 to 12 month window centered on exact aspect',
    weight: 0.85,
    calibratedWeight: 0.83,
    interpretation: 'Major vocational breakthrough, public recognition, social elevation, and professional opportunity.',
    sources: [
      { tier: 2, text: 'The Combination of Stellar Influences', chapter: 'Jupiter/MC Combinations', author: 'Reinhold Ebertin' },
      { tier: 3, text: 'Solar Arcs: Astrological Cycles of Change', author: 'Noel Tyl' }
    ],
    version: '2.0.0',
    tests: ['test_solar_arc_mc_orb']
  },
  {
    ruleId: 'WESTERN_PROGRESSED_SUN_10H_008',
    tradition: 'western_tropical',
    school: 'Traditional Western',
    technique: 'Secondary Progressions (Day for a Year)',
    category: 'CAREER_CHANGE',
    conditions: ['Secondary Progressed Sun enters 10th house or forms trine to natal 10th cusp ruler'],
    trigger: 'Exact degree contact within 1° orb',
    timing: '1 to 2 year progression cycle',
    weight: 0.82,
    calibratedWeight: 0.80,
    interpretation: 'Maturation of vocational purpose, increased leadership agency, and career identity consolidation.',
    sources: [
      { tier: 2, text: 'Christian Astrology', chapter: 'Book III: Directions and Progressions', author: 'William Lilly' }
    ],
    version: '2.0.0',
    tests: ['test_secondary_progression_sun']
  },

  // ─── 5. HELLENISTIC LOTS & CHRONOCRATORS ──────────────────────────────────
  {
    ruleId: 'HELLENISTIC_LOT_OF_FORTUNE_009',
    tradition: 'western_hellenistic',
    school: 'Ptolemaic / Valens',
    technique: 'Lots (Arabic Parts) & Chronocrators',
    category: 'BUSINESS_GROWTH',
    conditions: ['Benefic planet transiting 10th from Lot of Fortune (Place of Acquisition)'],
    trigger: 'Zodiacal Releasing level 2 period from Lot of Fortune',
    timing: 'Chronocrator releasing period (approx. 6–18 months)',
    weight: 0.80,
    calibratedWeight: 0.78,
    interpretation: 'Tangible material acquisition, commercial success, and beneficial resource consolidation.',
    sources: [
      { tier: 1, text: 'Tetrabiblos', chapter: 'Book III: Fortune and Material Goods', author: 'Claudius Ptolemy' },
      { tier: 1, text: 'Anthology', chapter: 'Book II: The Lot of Fortune and Chronocrators', author: 'Vettius Valens' }
    ],
    version: '2.0.0',
    tests: ['test_lot_of_fortune_calculation']
  },

  // ─── 6. KP STELLAR SYSTEM PREDICTIONS ────────────────────────────────────
  {
    ruleId: 'KP_CUSPAL_SUB_LORD_10H_010',
    tradition: 'vedic_kp',
    school: 'Krishnamurti Padhdhati',
    technique: 'Placidus Cuspal Sub-Lord Significators',
    category: 'CAREER_CHANGE',
    conditions: ['10th Cusp Sub Lord signifies houses 2, 6, 10, or 11 through star-lord and sub-lord'],
    trigger: 'Joint Dasha-Bhukti-Antara of Significators of 2, 6, 10, 11',
    timing: 'Sub-sub period (Sookshma/Prana) for precise event occurrence',
    weight: 0.94,
    calibratedWeight: 0.91,
    interpretation: 'Definite appointment, corporate transition, elevation in office, or lucrative employment contract.',
    sources: [
      { tier: 2, text: 'KP Reader IV: Marriage, Profession & Transit', chapter: 'Chapter 10: Profession and 10th Cusp', author: 'Prof. K.S. Krishnamurti' }
    ],
    version: '2.0.0',
    tests: ['test_kp_sub_lord_significations']
  },
  {
    ruleId: 'KP_CUSPAL_SUB_LORD_7H_011',
    tradition: 'vedic_kp',
    school: 'Krishnamurti Padhdhati',
    technique: '7th Cusp Sub-Lord Significators',
    category: 'MARRIAGE_THEME',
    conditions: ['7th Cusp Sub Lord signifies houses 2, 7, 11 and connects with Venus/Jupiter'],
    trigger: 'Joint Dasha-Bhukti period of ruling planets (RPs)',
    timing: 'RP concurrence during transit of Sun/Moon over significator degrees',
    weight: 0.93,
    calibratedWeight: 0.90,
    interpretation: 'Formal marriage alliance, civil contract execution, or long-term partnership union.',
    sources: [
      { tier: 2, text: 'KP Reader III: Planetary Influences & Marriage', chapter: 'Timing of Marriage', author: 'Prof. K.S. Krishnamurti' }
    ],
    version: '2.0.0',
    tests: ['test_kp_7h_marriage_signification']
  },

  // ─── 7. JAIMINI SUTRAS & CHARA DASHA ────────────────────────────────────
  {
    ruleId: 'JAIMINI_AMATYAKARAKA_CHARA_012',
    tradition: 'vedic_jaimini',
    school: 'Jaimini Upadesha',
    technique: 'Chara Dasha & 7 Karakas',
    category: 'ROLE_CHANGE',
    conditions: ['Chara Dasha sign contains or aspects Amatyakaraka (AmK) by Rashi Drishti'],
    trigger: 'Chara Dasha Major or Sub-period of Rashi aspecting AmK without Papargala',
    timing: 'Chara Dasha period duration (1 to 12 years, focused on sub-dasha)',
    weight: 0.83,
    calibratedWeight: 0.81,
    interpretation: 'Major ministerial or administrative role change, advisory duties, and executive authority.',
    sources: [
      { tier: 1, text: 'Jaimini Upadesha Sutras', chapter: 'Adhyaya 1, Pada 2: Karakas and Rashi Drishti', author: 'Maharshi Jaimini' }
    ],
    version: '2.0.0',
    tests: ['test_jaimini_amk_aspect']
  },

  // ─── 8. CHINESE BAZI & QI PHASES ─────────────────────────────────────────
  {
    ruleId: 'CHINESE_BAZI_LUCK_PILLAR_013',
    tradition: 'chinese_bazi',
    school: '4-Pillars of Destiny',
    technique: '10-Year Luck Pillar & Day Master Balance',
    category: 'BUSINESS_ACTIVITY',
    conditions: ['10-Year Luck Pillar introduces favorable Resource or Officer element balancing Day Master'],
    trigger: 'Annual Grand Duke (Tai Sui) harmonious branch combination (San He or Liu He)',
    timing: '10-Year period with annual trigger focus',
    weight: 0.81,
    calibratedWeight: 0.79,
    interpretation: 'Harmonious elemental support, enterprise growth, steady social standing, and favorable patrons.',
    sources: [
      { tier: 1, text: 'Di Tian Sui (Drips of Heaven)', chapter: 'Chapter 2: Day Master and Useful God (Yong Shen)', author: 'Liu Bowen / Classical BaZi' }
    ],
    version: '2.0.0',
    tests: ['test_bazi_daymaster_element_balance']
  }
];

export class RuleRegistryService {
  /**
   * Retrieves all codified rules matching an event category and tradition
   */
  public static getRulesForCategory(
    category: CodifiedRule['category'],
    tradition?: CodifiedRule['tradition']
  ): CodifiedRule[] {
    return MASTER_RULE_REGISTRY.filter(r => {
      const matchCat = r.category === category;
      const matchTrad = tradition ? r.tradition === tradition : true;
      return matchCat && matchTrad;
    });
  }

  /**
   * Retrieves a rule by its unique ruleId
   */
  public static getRuleById(ruleId: string): CodifiedRule | undefined {
    return MASTER_RULE_REGISTRY.find(r => r.ruleId === ruleId);
  }

  /**
   * Returns all supported rules
   */
  public static getAllRules(): CodifiedRule[] {
    return [...MASTER_RULE_REGISTRY];
  }
}

export const getRulesByCategory = (category: any): any[] => {
  return RuleRegistryService.getRulesForCategory(category as any);
};
