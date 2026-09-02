/**
 * ASTRO360 AI Complexity Router
 * Level 0: ASTROCORE Only (Deterministic questions like 'What is my Moon sign?')
 * Level 1: FAST_LOCAL (Simple chart questions, greetings, terminology)
 * Level 2: REASONING_LOCAL (Multi-engine comparison, complex timing, research backtesting)
 * Level 3: OPTIONAL_EXTERNAL (Disabled by default)
 */

export type RoutingLevel = 0 | 1 | 2 | 3;

export interface RoutingDecision {
  level: RoutingLevel;
  reason: string;
  requiresLLM: boolean;
  modelTier?: 'FAST_LOCAL' | 'REASONING_LOCAL' | 'EMERGENCY_SMALL' | 'OPTIONAL_EXTERNAL';
  directTool?: string;
}

export class AIComplexityRouter {
  // Deterministic question regexes that require ZERO LLM computation
  private static deterministicPatterns: { regex: RegExp; tool: string }[] = [
    { regex: /^(what|which)(\s+is|\s+'s)?\s+(my\s+)?(ascendant|lagna)/i, tool: 'getAscendant' },
    { regex: /^(what|which)(\s+is|\s+'s)?\s+(my\s+)?(moon\s+sign|rashi|sun\s+sign|surya)/i, tool: 'getPlanetaryPositions' },
    { regex: /^(what|which)(\s+is|\s+'s)?\s+(my\s+)?(current\s+)?(dasha|mahadasha|antardasha)/i, tool: 'getVimshottariDasha' },
    { regex: /^(what|which)(\s+is|\s+'s)?\s+(my\s+)?(nakshatra|birth\s+star|pada)/i, tool: 'getNakshatra' },
    { regex: /^(where\s+is|what\s+degree\s+is)\s+(sun|moon|mars|mercury|jupiter|venus|saturn|rahu|ketu)/i, tool: 'getPlanetaryPositions' },
    { regex: /^(today's\s+panchang|when\s+is\s+rahu\s+kalam|what\s+is\s+the\s+tithi)/i, tool: 'runPanchanga' },
  ];

  // Complex multi-engine comparison triggers
  private static reasoningPatterns = [
    /compare/i,
    /multi[- ]engine/i,
    /across\s+(traditions|systems|vedic\s+and\s+western)/i,
    /marriage\s+timing\s+over\s+the\s+next/i,
    /why\s+do\s+systems\s+disagree/i,
    /research\s+backtest/i,
    /sensitivity\s+analysis/i,
    /reproducibility/i
  ];

  public static route(question: string): RoutingDecision {
    const q = question.trim();

    // 1. Check Level 0: Pure Deterministic ASTROCORE
    for (const item of this.deterministicPatterns) {
      if (item.regex.test(q)) {
        return {
          level: 0,
          reason: `Deterministic astronomical fact match: ${item.tool}. Handled directly by ASTROCORE without LLM tokens.`,
          requiresLLM: false,
          directTool: item.tool
        };
      }
    }

    // 2. Check Level 2: Multi-Engine Reasoning & Research
    for (const pattern of this.reasoningPatterns) {
      if (pattern.test(q)) {
        return {
          level: 2,
          reason: 'Complex cross-tradition synthesis or timing window analysis requires REASONING_LOCAL model.',
          requiresLLM: true,
          modelTier: 'REASONING_LOCAL'
        };
      }
    }

    // 3. Default Level 1: Fast Local Explanations
    return {
      level: 1,
      reason: 'General chart inquiry or practical reflection handled by FAST_LOCAL model.',
      requiresLLM: true,
      modelTier: 'FAST_LOCAL'
    };
  }
}
