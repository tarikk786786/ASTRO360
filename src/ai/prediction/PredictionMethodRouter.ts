/**
 * ASTRO360 Prediction Method Router
 * Maps a user's question, intent, and life area to relevant prediction techniques.
 */

import { PredictionArea, TimeHorizon } from "../intake/UserIntakeEngine";
import { PredictionMethodRegistry, PredictionMethodRecord } from "./PredictionMethodRegistry";

export interface RoutedMethodsPlan {
  area: PredictionArea;
  selectedMethodIds: string[];
  primaryTimingMethod: string;
  supportingTechniques: string[];
  relevantDivisionalCharts: string[];
  explanation: string;
}

export class PredictionMethodRouter {
  public static routeQuestion(area: PredictionArea, horizon: TimeHorizon): RoutedMethodsPlan {
    switch (area) {
      case "CAREER":
      case "NEW_JOB":
      case "PROMOTION":
      case "JOB_CHANGE":
        return {
          area,
          selectedMethodIds: [
            "VEDIC_DASHA_VIMSHOTTARI",
            "VEDIC_GOCHAR_TRANSIT",
            "VEDIC_D10_DASHAMSHA",
            "WESTERN_TRANSITS_MAJOR",
            "WESTERN_SECONDARY_PROGRESSIONS",
            "KP_CUSPAL_SIGNIFICATORS",
            "JAIMINI_CHARA_DASHA"
          ],
          primaryTimingMethod: "Vimshottari Dasha & Transit Saturn/Jupiter Convergence",
          supportingTechniques: ["KP 10th Cusp Sub-Lord", "Solar Arc Midheaven", "Jaimini Amatyakaraka"],
          relevantDivisionalCharts: ["D1 (Rasi)", "D9 (Navamsha)", "D10 (Dashamsha)"],
          explanation: "Career inquiries require evaluating 10th house authority, D10 executive capacity, active Dasha periods, and transit aspects to the Midheaven and 6th/10th/11th houses."
        };

      case "RELATIONSHIP":
      case "MARRIAGE":
        return {
          area,
          selectedMethodIds: [
            "VEDIC_DASHA_VIMSHOTTARI",
            "VEDIC_GOCHAR_TRANSIT",
            "WESTERN_TRANSITS_MAJOR",
            "JAIMINI_CHARA_DASHA",
            "KP_CUSPAL_SIGNIFICATORS"
          ],
          primaryTimingMethod: "Vimshottari Dasha & Transit Jupiter Aspect on 7th House",
          supportingTechniques: ["Navamsha D9 Venus Placements", "Jaimini Darakaraka", "KP 7th Cusp Sub-Lord"],
          relevantDivisionalCharts: ["D1 (Rasi)", "D9 (Navamsha)"],
          explanation: "Partnership inquiries evaluate 7th house lord, Venus/Jupiter karakas, Navamsha D9 commitments, and Chara Dasha Darakaraka activations."
        };

      case "MONEY":
      case "INVESTMENT":
      case "BUSINESS":
        return {
          area,
          selectedMethodIds: [
            "VEDIC_DASHA_VIMSHOTTARI",
            "VEDIC_GOCHAR_TRANSIT",
            "WESTERN_TRANSITS_MAJOR",
            "KP_CUSPAL_SIGNIFICATORS"
          ],
          primaryTimingMethod: "Dhana Yoga Cycles & 2nd/11th House Transit Activation",
          supportingTechniques: ["KP 2nd & 11th Sub-Lords", "Indu Lagna Wealth Metrics", "Jupiter Trines"],
          relevantDivisionalCharts: ["D1 (Rasi)", "D2 (Hora)", "D11 (Labhamsha)"],
          explanation: "Financial inquiries focus on 2nd house (savings), 11th house (cashflow), Dhana yogas, and disciplined capital cycles."
        };

      default:
        return {
          area,
          selectedMethodIds: [
            "VEDIC_DASHA_VIMSHOTTARI",
            "VEDIC_GOCHAR_TRANSIT",
            "WESTERN_TRANSITS_MAJOR"
          ],
          primaryTimingMethod: "Vimshottari Dasha & Outer Planet Transits",
          supportingTechniques: ["Ascendant & Luminary Aspects", "Progressed Moon"],
          relevantDivisionalCharts: ["D1 (Rasi)", "D9 (Navamsha)"],
          explanation: "Comprehensive natal evaluation mapping core luminaries, Dasha lord, and primary planetary transits."
        };
    }
  }
}
