/**
 * ASTRO360 SEO LAB - Keyword & Content Intelligence Engine
 * Intent classification, keyword-to-page mapping, cannibalization detection & content brief generation.
 */

import { KeywordInsight, ContentBrief, SearchIntentType } from './types';

export class KeywordWorkspaceEngine {
  /**
   * Verified search terms & topic clusters with explicit data provenance
   */
  private static keywordCatalog: KeywordInsight[] = [
    {
      keyword: 'free birth chart calculator',
      intent: 'CALCULATOR',
      topicGroup: 'Birth Chart (Kundli)',
      dataSource: 'OBSERVED_SEARCH_CONSOLE',
      recommendedPagePath: '/free-tools',
      existingRankingUrl: 'https://astro.tarikislam.in/free-tools',
      isCannibalized: false,
      relevanceScore: 98
    },
    {
      keyword: 'what is a birth chart kundli',
      intent: 'INFORMATIONAL',
      topicGroup: 'Birth Chart (Kundli)',
      dataSource: 'SUGGESTED_EXPANSION',
      recommendedPagePath: '/vedic-astrology',
      existingRankingUrl: 'https://astro.tarikislam.in/vedic-astrology',
      isCannibalized: false,
      relevanceScore: 92
    },
    {
      keyword: 'find my nakshatra and pada',
      intent: 'CALCULATOR',
      topicGroup: 'Lunar Mansions',
      dataSource: 'OBSERVED_SEARCH_CONSOLE',
      recommendedPagePath: '/free-tools#nakshatra',
      existingRankingUrl: 'https://astro.tarikislam.in/free-tools',
      isCannibalized: false,
      relevanceScore: 96
    },
    {
      keyword: '27 nakshatras list and characteristics',
      intent: 'INFORMATIONAL',
      topicGroup: 'Lunar Mansions',
      dataSource: 'SUGGESTED_EXPANSION',
      recommendedPagePath: '/vedic-astrology',
      existingRankingUrl: 'https://astro.tarikislam.in/vedic-astrology',
      isCannibalized: false,
      relevanceScore: 90
    },
    {
      keyword: 'kundli matching 36 guna for marriage',
      intent: 'CALCULATOR',
      topicGroup: 'Compatibility Synastry',
      dataSource: 'OBSERVED_SEARCH_CONSOLE',
      recommendedPagePath: '/compatibility',
      existingRankingUrl: 'https://astro.tarikislam.in/compatibility',
      isCannibalized: false,
      relevanceScore: 94
    },
    {
      keyword: 'today panchang auspicious muhurta rahu kaal',
      intent: 'INFORMATIONAL',
      topicGroup: 'Panchanga & Muhurta',
      dataSource: 'OBSERVED_SEARCH_CONSOLE',
      recommendedPagePath: '/panchanga',
      existingRankingUrl: 'https://astro.tarikislam.in/panchanga',
      isCannibalized: false,
      relevanceScore: 95
    }
  ];

  public static getKeywords(): KeywordInsight[] {
    return this.keywordCatalog;
  }

  public static classifyIntent(query: string): SearchIntentType {
    const q = query.toLowerCase();
    if (q.includes('calculator') || q.includes('tool') || q.includes('generator') || q.includes('check') || q.includes('find my')) {
      return 'CALCULATOR';
    }
    if (q.includes('buy') || q.includes('price') || q.includes('subscription') || q.includes('pro') || q.includes('dossier')) {
      return 'COMMERCIAL';
    }
    if (q.includes('vs') || q.includes('compare') || q.includes('difference')) {
      return 'COMPARISON';
    }
    return 'INFORMATIONAL';
  }

  public static generateContentBrief(targetKeyword: string): ContentBrief {
    const intent = this.classifyIntent(targetKeyword);
    return {
      targetKeyword,
      primaryIntent: intent,
      recommendedTitle: `${targetKeyword.charAt(0).toUpperCase() + targetKeyword.slice(1)} — Mathematical Calculation & Classical Guide`,
      recommendedWordCount: 1800,
      recommendedH2s: [
        `1. What is ${targetKeyword} and How Does It Work?`,
        `2. Astronomical Calculation Methodology (NASA JPL & Ephemeris)`,
        `3. Classical Scripture Interpretations & Rules`,
        `4. Step-by-Step Interpretation Guide`,
        `5. Frequently Asked Questions`
      ],
      mustIncludeEntities: [
        'Planetary Longitude',
        'Zodiac Sign',
        'Vedic Sidereal Lahiri',
        'Western Tropical',
        'Ephemeris Precision',
        'House Cusps'
      ],
      suggestedFaqs: [
        {
          question: `How accurate is the ${targetKeyword} calculation?`,
          answerSummary: `Calculations are grounded in sub-arcsecond astronomical ephemeris equations.`
        },
        {
          question: `Do I need my exact birth time?`,
          answerSummary: `Exact birth time provides ascendant and house cusps; solar noon approximation is available if unknown.`
        }
      ],
      connectedToolPath: '/free-tools'
    };
  }
}
