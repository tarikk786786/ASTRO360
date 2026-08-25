/**
 * ASTRO360 OMNI - Master Rule & Evidence Registry (PRD Section 37-38, 46)
 * Contains structured rules with explicit provenance, classical source citations,
 * tradition classification, conditions, and calibrated weights.
 */

import { RuleProvenance, EventOntologyCategory, AstrologyTradition } from '../schema/canonicalAstroSchema';

export const MASTER_RULE_REGISTRY: RuleProvenance[] = [
  {
    ruleId: 'VEDIC_TRANSIT_JUPITER_10H_001',
    tradition: 'vedic',
    school: 'Parashari',
    category: 'CAREER_CHANGE',
    version: '1.0',
    astronomicalFactors: ['Jupiter in 10th House from Lagna/Moon', 'Jupiter direct motion'],
    timingFactors: ['Vimshottari Jupiter or Sun Mahadasha/Antardasha', 'Gochar Transit Window'],
    conditionsText: 'Jupiter transits 10th house or aspects 10th lord with SAV bindus >= 28.',
    effectsText: 'Promotion, professional elevation, executive authority, and societal respect.',
    weight: 0.85,
    sources: [
      { tier: 1, text: 'Brihat Parashara Hora Shastra (BPHS)', chapter: 'Chapter 41: Planetary Transits', verse: 'Verse 18-22', author: 'Sage Parashara' },
      { tier: 2, text: 'Phaladeepika', chapter: 'Chapter 26: Gochara Phala', author: 'Mantreswara' }
    ]
  },
  {
    ruleId: 'VEDIC_RAJA_YOGA_1_10_002',
    tradition: 'vedic',
    school: 'Parashari',
    category: 'PUBLIC_RECOGNITION',
    version: '1.0',
    astronomicalFactors: ['Lord of 1st (Kendra/Trikona) conjunct Lord of 10th (Kendra)'],
    timingFactors: ['Dasha of Lagnesha or 10th Lord'],
    conditionsText: '1st Lord and 10th Lord form mutual reception (Parivartana) or conjunction without combustion.',
    effectsText: 'High public acclaim, leadership position, and long-lasting reputation.',
    weight: 0.90,
    sources: [
      { tier: 1, text: 'Brihat Parashara Hora Shastra (BPHS)', chapter: 'Chapter 35: Raja Yogas', verse: 'Verse 1-5', author: 'Sage Parashara' }
    ]
  },
  {
    ruleId: 'WESTERN_SOLAR_ARC_MC_JUPITER_003',
    tradition: 'western',
    school: 'Modern / Psychological / Ebertin',
    category: 'PROMOTION',
    version: '1.0',
    astronomicalFactors: ['Solar Arc Jupiter directed to Midheaven (MC) within 1° orb'],
    timingFactors: ['Annual Solar Arc progression'],
    conditionsText: 'Directed Jupiter conjunct or trine natal Midheaven with orb < 1° 00\'.',
    effectsText: 'Major career breakthrough, successful public milestone, and expansion of vocational scope.',
    weight: 0.82,
    sources: [
      { tier: 2, text: 'The Combination of Stellar Influences', author: 'Reinhold Ebertin', chapter: 'Jupiter/MC Combinations' },
      { tier: 3, text: 'Solar Arcs: Astrological Cycles of Change', author: 'Noel Tyl' }
    ]
  },
  {
    ruleId: 'WESTERN_HELLENISTIC_LOT_FORTUNE_10H_004',
    tradition: 'ancient-hellenistic',
    school: 'Ptolemaic / Valens',
    category: 'BUSINESS_EXPANSION',
    version: '1.0',
    astronomicalFactors: ['Part of Fortune in 10th House or 10th from Fortune (Exaltation)'],
    timingFactors: ['Zodiacal Releasing from Lot of Fortune level 2 peak'],
    conditionsText: 'Benefic planet (Venus/Jupiter) transiting or ruling the Lot of Fortune.',
    effectsText: 'Material prosperity, commercial expansion, and acquisition of valuable assets.',
    weight: 0.78,
    sources: [
      { tier: 1, text: 'Tetrabiblos', author: 'Claudius Ptolemy', chapter: 'Book III: Fortune and Material Goods' },
      { tier: 1, text: 'Anthology', author: 'Vettius Valens', chapter: 'Book II: The Lot of Fortune and Chronocrators' }
    ]
  },
  {
    ruleId: 'KP_CUSPAL_SUB_LORD_10H_005',
    tradition: 'kp',
    school: 'Krishnamurti Padhdhati',
    category: 'JOB_TRANSITION',
    version: '1.0',
    astronomicalFactors: ['10th Cusp Sub Lord signifies houses 2, 6, 10, 11'],
    timingFactors: ['Joint Dasha-Bhukti-Antara of Significators of 2, 6, 10, 11'],
    conditionsText: 'Sub Lord of 10th cusp is deposited in star of a planet signifying 6th (service) or 10th (career).',
    effectsText: 'Concrete appointment, contract signing, or planned change in professional employment.',
    weight: 0.92,
    sources: [
      { tier: 2, text: 'KP Reader IV: Marriage, Profession & Transit', author: 'Prof. K.S. Krishnamurti', chapter: 'Profession and Cusp 10' }
    ]
  },
  {
    ruleId: 'JAIMINI_CHARA_DASHA_AMATYAKARAKA_006',
    tradition: 'jaimini',
    school: 'Jaimini Upadesha Sutras',
    category: 'CAREER_CHANGE',
    version: '1.0',
    astronomicalFactors: ['Chara Dasha sign aspects Amatyakaraka (AmK) by Rashi Drishti'],
    timingFactors: ['Chara Dasha Major/Sub period of Rashi containing or aspecting AmK'],
    conditionsText: 'AmK is well-placed in Kendra/Trikona from Chara Dasha Lagna without malefic argala.',
    effectsText: 'Elevation in administrative duties, key role transition, and executive responsibility.',
    weight: 0.80,
    sources: [
      { tier: 1, text: 'Jaimini Upadesha Sutras', author: 'Maharshi Jaimini', chapter: 'Adhyaya 1, Pada 2: Karakas' }
    ]
  },
  {
    ruleId: 'CHINESE_BAZI_DIRECT_OFFICER_007',
    tradition: 'chinese-bazi',
    school: 'Zi Ping BaZi (Classic 60-Jiazi)',
    category: 'RESPONSIBILITY',
    version: '1.0',
    astronomicalFactors: ['Annual Stem brings Direct Officer (Zheng Guan) supporting Day Master'],
    timingFactors: ['10-Year Luck Pillar or Annual Year Pillar Ingress'],
    conditionsText: 'Day Master has sufficient root strength to withstand and wield the Officer element.',
    effectsText: 'Assumption of official title, increased organizational duties, and regulatory leadership.',
    weight: 0.84,
    sources: [
      { tier: 1, text: 'Di Tian Sui (Drips of Heaven)', author: 'Liu Bowen', chapter: 'Ten Gods and Day Master Balance' },
      { tier: 2, text: 'San Ming Tong Hui', author: 'Wan Minying', chapter: 'The Ten Gods Framework' }
    ]
  },
  {
    ruleId: 'VEDIC_VENUS_JUPITER_7H_008',
    tradition: 'vedic',
    school: 'Parashari',
    category: 'MARRIAGE_THEME',
    version: '1.0',
    astronomicalFactors: ['Venus transits or aspects 7th House / 7th Lord', 'Jupiter aspects Upapada Lagna (UL)'],
    timingFactors: ['Vimshottari Dasha of 7th Lord, Venus, or Planet in 7th'],
    conditionsText: '7th House free from malefic affliction; Jupiter transit confers auspicious aspect onto 7th house.',
    effectsText: 'Commitment, wedding solemnization, or mutual relationship milestone.',
    weight: 0.88,
    sources: [
      { tier: 1, text: 'Brihat Parashara Hora Shastra (BPHS)', chapter: 'Chapter 18: Judgement of 7th House', verse: 'Verse 10-16', author: 'Sage Parashara' }
    ]
  }
];

export function getRulesByCategory(category: EventOntologyCategory): RuleProvenance[] {
  return MASTER_RULE_REGISTRY.filter(r => r.category === category);
}

export function getRulesByTradition(tradition: AstrologyTradition): RuleProvenance[] {
  return MASTER_RULE_REGISTRY.filter(r => r.tradition === tradition);
}
