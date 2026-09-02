/**
 * ASTRO360 Scenario Engine
 * Structured comparative decision analysis (Option A vs Option B)
 * Grounded in astrological timing, practical realities, and decision checklists.
 */

export interface DecisionOptionAnalysis {
  optionName: string;
  astrologicalSupport: {
    alignedPlanetaryFactors: string[];
    timingFavorability: 'HIGH' | 'MODERATE' | 'CHALLENGING';
    relevantTransitWindows: string;
  };
  practicalSupport: {
    keyAdvantages: string[];
    tangibleRisks: string[];
    financialRunwayRequirement: string;
  };
}

export interface ComparativeScenarioResult {
  decisionTitle: string;
  optionA: DecisionOptionAnalysis;
  optionB: DecisionOptionAnalysis;
  convergenceTakeaway: string;
  decisionChecklist: string[];
  uncertaintyFactors: string[];
}

export class ScenarioEngine {
  public static compareOptions(
    decisionQuestion: string,
    activeDasha: string,
    saturnTransitHouse: string,
    jupiterTransitHouse: string
  ): ComparativeScenarioResult {
    return {
      decisionTitle: decisionQuestion,
      optionA: {
        optionName: "OPTION A — Stay, Consolidate & Prepare (Methodical Path)",
        astrologicalSupport: {
          alignedPlanetaryFactors: [`Active Dasha: ${activeDasha}`, `Saturn stabilizing in ${saturnTransitHouse}`],
          timingFavorability: "HIGH",
          relevantTransitWindows: "Current phase through next 3-6 months builds domain equity."
        },
        practicalSupport: {
          keyAdvantages: [
            "Guarantees baseline income and protects liquidity.",
            "Allows discrete interview pipelines without financial panic.",
            "Compounds institutional reputation and project portfolio."
          ],
          tangibleRisks: [
            "Requires patience and emotional resilience during workplace restructuring."
          ],
          financialRunwayRequirement: "Maintains existing surplus reserves."
        }
      },
      optionB: {
        optionName: "OPTION B — Immediate Pivot / Abrupt Exit (Aggressive Path)",
        astrologicalSupport: {
          alignedPlanetaryFactors: [`Jupiter aspecting from ${jupiterTransitHouse}`],
          timingFavorability: "CHALLENGING",
          relevantTransitWindows: "Sudden uncontracted breaks carry higher friction until next major solar return."
        },
        practicalSupport: {
          keyAdvantages: [
            "Provides immediate mental release from current organizational friction."
          ],
          tangibleRisks: [
            "Elevates cashflow vulnerability unless backed by signed agreements.",
            "Weakens salary negotiation leverage when job hunting from unemployment."
          ],
          financialRunwayRequirement: "Requires minimum 6-9 months of verified liquid living expenses."
        }
      },
      convergenceTakeaway: "Astrology illuminates the celestial currents: methodical preparation and deliberate transition (Option A) carry substantially stronger cross-tradition support than abrupt unhedged exits (Option B). You remain the sovereign decision-maker.",
      decisionChecklist: [
        "Do you have at least 6 months of liquid living expenses in a dedicated emergency fund?",
        "Have you secured signed written offers before terminating existing contracts?",
        "Have you consulted mentors or family members (Shura) regarding long-term alignment?"
      ],
      uncertaintyFactors: [
        "External macroeconomic hiring freezes operate independently of individual chart timings.",
        "Short-term workplace friction may resolve naturally as team dynamics settle."
      ]
    };
  }
}
