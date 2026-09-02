/**
 * ASTRO360 Executable Astrology Rule DSL
 * Canonical, inspectable astrological rules with scripture provenance.
 */

export type AstrologyTradition = 
  | 'VEDIC' 
  | 'WESTERN' 
  | 'KP' 
  | 'JAIMINI' 
  | 'TAJIKA' 
  | 'PANCHANGA' 
  | 'CHINESE_BAZI' 
  | 'ISLAMIC_FALAK';

export interface RuleSourceCitation {
  text: string;
  shlokaOrChapter: string;
  provenanceTier: 1 | 2 | 3;
}

export interface RuleDefinition {
  ruleId: string;
  tradition: AstrologyTradition;
  category: 'CAREER' | 'RELATIONSHIP' | 'WEALTH' | 'VITALITY' | 'TIMING' | 'SPIRITUALITY';
  conditions: string[];
  modifiers: string[];
  exceptions: string[];
  interpretation: string;
  timingIndicator: string;
  source: RuleSourceCitation;
  version: string;
}

export class RuleRegistryService {
  private static rules: RuleDefinition[] = [
    {
      ruleId: 'BPHS_CAREER_10TH_LORD_EXALTED',
      tradition: 'VEDIC',
      category: 'CAREER',
      conditions: ['10th lord exalted or placed in Kendra/Trikona', 'Aspect of Jupiter or Venus on 10th bhava'],
      modifiers: ['Weakened if 10th lord is combust with Sun within 3 degrees'],
      exceptions: ['Mitigated if placed in own Navamsha in D9'],
      interpretation: 'High professional authority, executive competence, and enduring public reputation.',
      timingIndicator: 'Activates during 10th Lord Mahadasha or transit of Jupiter over 10th cusp.',
      source: {
        text: 'Brihat Parashara Hora Shastra',
        shlokaOrChapter: 'Chapter 20, Shloka 14',
        provenanceTier: 1
      },
      version: '2.0.0'
    },
    {
      ruleId: 'TETRABIBLOS_CAREER_MC_JUPITER',
      tradition: 'WESTERN',
      category: 'CAREER',
      conditions: ['Jupiter conjunct Midheaven (MC) within 5° orb'],
      modifiers: ['Stronger in angular houses 1st, 10th'],
      exceptions: ['Afflicted if squaring Saturn without mutual reception'],
      interpretation: 'Expansion of vocation, institutional patronage, and social recognition.',
      timingIndicator: 'Activates during Solar Arc Jupiter = MC.',
      source: {
        text: 'Ptolemy Tetrabiblos',
        shlokaOrChapter: 'Book IV, Section 4 (Actions of Dignity)',
        provenanceTier: 1
      },
      version: '2.0.0'
    },
    {
      ruleId: 'KP_STELLAR_PROMOTION_6_10_11',
      tradition: 'KP',
      category: 'CAREER',
      conditions: ['10th cuspal sub-lord signifies houses 6, 10, 11'],
      modifiers: ['Direct without retrograde star-lord'],
      exceptions: ['Inhibited if signifying 5, 8, 12 simultaneously'],
      interpretation: 'Definite vocational promotion, financial increment, and organizational advancement.',
      timingIndicator: 'Operative during Dasha-Bhukti of 6/10/11 significators.',
      source: {
        text: 'KP Stellar Readers (K.S. Krishnamurti)',
        shlokaOrChapter: 'Reader III, Chapter on Profession',
        provenanceTier: 1
      },
      version: '1.9.0'
    }
  ];

  public static getRules(): RuleDefinition[] {
    return [...this.rules];
  }

  public static findRulesByCategory(category: string): RuleDefinition[] {
    return this.rules.filter(r => r.category === category);
  }

  public static findRulesByTradition(tradition: AstrologyTradition): RuleDefinition[] {
    return this.rules.filter(r => r.tradition === tradition);
  }
}
