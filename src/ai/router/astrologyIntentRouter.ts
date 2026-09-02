/**
 * ASTRO360 AstrologyIntentRouter
 * Classifies astrological inquiries into 22 canonical intents,
 * determines chart and ephemeris dependencies, and routes to applicable engines & tools.
 */

export type AstrologyIntent =
  | 'NATAL_FACT'
  | 'NATAL_INTERPRETATION'
  | 'TRANSIT'
  | 'DASHA'
  | 'TIMING'
  | 'CAREER'
  | 'MONEY'
  | 'RELATIONSHIP'
  | 'MARRIAGE'
  | 'EDUCATION'
  | 'BUSINESS'
  | 'RELOCATION'
  | 'TRAVEL'
  | 'FAMILY'
  | 'SPIRITUALITY'
  | 'MUHURTA'
  | 'PRASHNA'
  | 'COMPATIBILITY'
  | 'FORECAST'
  | 'DECISION_SUPPORT'
  | 'RESEARCH'
  | 'ASTROLOGY_LEARNING';

export type ResponseMode = 
  | 'SIMPLE_FACT' 
  | 'PERSONAL_PROBLEM' 
  | 'TIMING_PREDICTION' 
  | 'DECISION_SUPPORT' 
  | 'RESEARCH_STUDIO' 
  | 'EDUCATIONAL';

export interface IntentRouteResult {
  category: string;
  intent: AstrologyIntent;
  scope: 'NATAL' | 'TRANSIT' | 'SYNASTRY' | 'MUNDANE' | 'GENERAL';
  chartRequired: boolean;
  currentTransitRequired: boolean;
  timingRequired: boolean;
  partnerChartRequired: boolean;
  currentLocationRequired: boolean;
  applicableEngines: string[];
  requiredTools: string[];
  responseMode: ResponseMode;
  isSafetySensitive: boolean;
  safetyCategory?: 'MEDICAL' | 'FINANCIAL_GUARANTEE' | 'RELATIONSHIP_FATALISM' | 'PROMPT_INJECTION';
}

export class AstrologyIntentRouter {
  public static route(question: string): IntentRouteResult {
    const q = question.toLowerCase().trim();

    // 0. Safety & Guardrail Checks
    if (
      q.includes('cure my') || 
      q.includes('diagnose') || 
      q.includes('cancer') || 
      q.includes('disease') || 
      q.includes('illness') || 
      q.includes('medical diagnosis')
    ) {
      return {
        category: 'HEALTH_WELLNESS',
        intent: 'NATAL_INTERPRETATION',
        scope: 'NATAL',
        chartRequired: true,
        currentTransitRequired: true,
        timingRequired: false,
        partnerChartRequired: false,
        currentLocationRequired: false,
        applicableEngines: ['vedic_ayurvedic'],
        requiredTools: ['chart.get', 'planet.position'],
        responseMode: 'PERSONAL_PROBLEM',
        isSafetySensitive: true,
        safetyCategory: 'MEDICAL'
      };
    }

    if (
      q.includes('definitely become rich') || 
      q.includes('guarantee') || 
      q.includes('win lottery') || 
      q.includes('stock tips')
    ) {
      return {
        category: 'MONEY',
        intent: 'MONEY',
        scope: 'NATAL',
        chartRequired: true,
        currentTransitRequired: true,
        timingRequired: true,
        partnerChartRequired: false,
        currentLocationRequired: false,
        applicableEngines: ['vedic_parashari', 'kp_stellar'],
        requiredTools: ['chart.get', 'dasha.get', 'transit.calculate'],
        responseMode: 'PERSONAL_PROBLEM',
        isSafetySensitive: true,
        safetyCategory: 'FINANCIAL_GUARANTEE'
      };
    }

    if (
      q.includes('ignore your tools') || 
      q.includes('ignore my chart') || 
      q.includes('make up') || 
      q.includes('invent a source')
    ) {
      return {
        category: 'GENERAL',
        intent: 'RESEARCH',
        scope: 'GENERAL',
        chartRequired: false,
        currentTransitRequired: false,
        timingRequired: false,
        partnerChartRequired: false,
        currentLocationRequired: false,
        applicableEngines: [],
        requiredTools: [],
        responseMode: 'EDUCATIONAL',
        isSafetySensitive: true,
        safetyCategory: 'PROMPT_INJECTION'
      };
    }

    // 1. Simple Natal Facts (Level 0 ASTROCORE Direct)
    if (
      q.includes('what is my moon sign') ||
      q.includes('what is my sun sign') ||
      q.includes('what is my ascendant') ||
      q.includes('what is my lagna') ||
      q.includes('what nakshatra') ||
      q.includes('my rising sign')
    ) {
      return {
        category: 'NATAL_FACT',
        intent: 'NATAL_FACT',
        scope: 'NATAL',
        chartRequired: true,
        currentTransitRequired: false,
        timingRequired: false,
        partnerChartRequired: false,
        currentLocationRequired: false,
        applicableEngines: ['vedic_parashari', 'western_tropical'],
        requiredTools: ['chart.get', 'ascendant.get', 'nakshatra.get'],
        responseMode: 'SIMPLE_FACT',
        isSafetySensitive: false
      };
    }

    // 2. Decision Support ("Should I quit my job?", "Should I relocate?")
    if (
      q.startsWith('should i') || 
      q.includes('quit my job') || 
      q.includes('accept the offer') || 
      q.includes('break up') ||
      q.includes('make a decision')
    ) {
      return {
        category: 'DECISION_SUPPORT',
        intent: 'DECISION_SUPPORT',
        scope: 'NATAL',
        chartRequired: true,
        currentTransitRequired: true,
        timingRequired: true,
        partnerChartRequired: false,
        currentLocationRequired: false,
        applicableEngines: ['vedic_parashari', 'western_tropical', 'kp_stellar', 'jaimini_sutras'],
        requiredTools: ['chart.get', 'dasha.get', 'transit.calculate', 'aspect.calculate'],
        responseMode: 'DECISION_SUPPORT',
        isSafetySensitive: false
      };
    }

    // 3. Timing Questions ("When will my career improve?", "When will I get married?")
    if (
      q.startsWith('when will') || 
      q.startsWith('timing for') || 
      q.includes('best time') ||
      q.includes('timing of') ||
      q.includes('when is my next')
    ) {
      return {
        category: 'TIMING',
        intent: 'TIMING',
        scope: 'TRANSIT',
        chartRequired: true,
        currentTransitRequired: true,
        timingRequired: true,
        partnerChartRequired: false,
        currentLocationRequired: false,
        applicableEngines: ['vedic_parashari', 'western_tropical', 'kp_stellar', 'jaimini_sutras'],
        requiredTools: ['chart.get', 'dasha.get', 'transit.calculate', 'timing.calculate'],
        responseMode: 'TIMING_PREDICTION',
        isSafetySensitive: false
      };
    }

    // 4. Career & Vocation ("My career is stuck", "Job promotion", "Career path")
    if (
      q.includes('career') || 
      q.includes('job') || 
      q.includes('profession') || 
      q.includes('promotion') || 
      q.includes('work') ||
      q.includes('vocation')
    ) {
      return {
        category: 'CAREER',
        intent: 'CAREER',
        scope: 'NATAL',
        chartRequired: true,
        currentTransitRequired: true,
        timingRequired: true,
        partnerChartRequired: false,
        currentLocationRequired: false,
        applicableEngines: ['vedic_parashari', 'western_tropical', 'kp_stellar', 'jaimini_sutras'],
        requiredTools: ['chart.get', 'dasha.get', 'transit.calculate', 'divisionalChart.get'],
        responseMode: 'PERSONAL_PROBLEM',
        isSafetySensitive: false
      };
    }

    // 5. Love, Marriage & Relationship
    if (
      q.includes('love') || 
      q.includes('relationship') || 
      q.includes('marriage') || 
      q.includes('spouse') || 
      q.includes('partner') ||
      q.includes('soulmate')
    ) {
      return {
        category: 'RELATIONSHIP',
        intent: q.includes('marriage') ? 'MARRIAGE' : 'RELATIONSHIP',
        scope: 'NATAL',
        chartRequired: true,
        currentTransitRequired: true,
        timingRequired: true,
        partnerChartRequired: false,
        currentLocationRequired: false,
        applicableEngines: ['vedic_parashari', 'western_tropical', 'kp_stellar', 'jaimini_sutras'],
        requiredTools: ['chart.get', 'dasha.get', 'transit.calculate', 'divisionalChart.get'],
        responseMode: 'PERSONAL_PROBLEM',
        isSafetySensitive: false
      };
    }

    // 6. Wealth & Finance
    if (
      q.includes('money') || 
      q.includes('wealth') || 
      q.includes('finance') || 
      q.includes('investment') || 
      q.includes('income')
    ) {
      return {
        category: 'MONEY',
        intent: 'MONEY',
        scope: 'NATAL',
        chartRequired: true,
        currentTransitRequired: true,
        timingRequired: true,
        partnerChartRequired: false,
        currentLocationRequired: false,
        applicableEngines: ['vedic_parashari', 'western_tropical', 'kp_stellar'],
        requiredTools: ['chart.get', 'dasha.get', 'transit.calculate', 'yoga.evaluate'],
        responseMode: 'PERSONAL_PROBLEM',
        isSafetySensitive: false
      };
    }

    // 7. Multi-Tradition Comparison / Research
    if (
      q.includes('compare') || 
      q.includes('why do vedic and western disagree') || 
      q.includes('difference between') ||
      q.includes('traditions')
    ) {
      return {
        category: 'RESEARCH',
        intent: 'RESEARCH',
        scope: 'GENERAL',
        chartRequired: true,
        currentTransitRequired: true,
        timingRequired: false,
        partnerChartRequired: false,
        currentLocationRequired: false,
        applicableEngines: ['vedic_parashari', 'western_tropical', 'kp_stellar', 'jaimini_sutras', 'chinese_bazi'],
        requiredTools: ['chart.get', 'vedic.analyze', 'western.analyze', 'kp.analyze'],
        responseMode: 'RESEARCH_STUDIO',
        isSafetySensitive: false
      };
    }

    // 8. Natal Interpretation (Saturn in 10th, Jupiter transit, etc.)
    if (
      q.includes('what does') && (q.includes('in my chart') || q.includes('mean')) ||
      q.includes('saturn') || 
      q.includes('jupiter') || 
      q.includes('rahu') || 
      q.includes('ketu')
    ) {
      return {
        category: 'NATAL_INTERPRETATION',
        intent: 'NATAL_INTERPRETATION',
        scope: 'NATAL',
        chartRequired: true,
        currentTransitRequired: true,
        timingRequired: false,
        partnerChartRequired: false,
        currentLocationRequired: false,
        applicableEngines: ['vedic_parashari', 'western_tropical'],
        requiredTools: ['chart.get', 'planet.position', 'house.get'],
        responseMode: 'PERSONAL_PROBLEM',
        isSafetySensitive: false
      };
    }

    // Default Fallback
    return {
      category: 'GENERAL',
      intent: 'ASTROLOGY_LEARNING',
      scope: 'NATAL',
      chartRequired: true,
      currentTransitRequired: true,
      timingRequired: false,
      partnerChartRequired: false,
      currentLocationRequired: false,
      applicableEngines: ['vedic_parashari', 'western_tropical'],
      requiredTools: ['chart.get'],
      responseMode: 'EDUCATIONAL',
      isSafetySensitive: false
    };
  }
}
