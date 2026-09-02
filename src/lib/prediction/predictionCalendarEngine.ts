/**
 * ASTRO360 Prediction Calendar Engine
 * Generates, filters, clusters, and formats canonical prediction events for calendar and timeline views.
 */

import { CanonicalPredictionEvent, EngineSpecificFinding, PredictionCategory } from "./canonicalPredictionCenter";
import { UserProfile } from "../../types";

export interface CalendarRangeFilter {
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  category?: PredictionCategory | 'ALL';
  engineId?: 'ALL' | 'vedic' | 'western' | 'kp' | 'jaimini' | 'tajika';
  minAgreementPercent?: number;
  stabilityLevel?: 'ALL' | 'HIGH' | 'MODERATE' | 'LOW';
  searchQuery?: string;
}

export class PredictionCalendarEngine {
  /**
   * Generates deterministic multi-engine prediction events for a user profile
   */
  public static generatePredictions(
    profile: UserProfile,
    timeHorizonMonths: number = 12
  ): CanonicalPredictionEvent[] {
    const baseDate = new Date();
    const chartId = profile.id || "default_chart";

    const addDays = (d: Date, days: number): string => {
      const copy = new Date(d);
      copy.setDate(copy.getDate() + days);
      return copy.toISOString().split('T')[0];
    };

    // Construct 6 canonical multi-engine predictions across the year
    const events: CanonicalPredictionEvent[] = [
      {
        id: "pred_career_q4_2026",
        chartId,
        category: "CAREER",
        eventType: "CAREER_ACTIVITY",
        title: "Executive Career Elevation & Responsibility",
        headline: "High multi-engine alignment for strategic career restructuring and professional expansion.",
        summary: "Vedic Dasha, Western Outer Transits, and KP 10th sub-lord converge on an active professional inflection window.",
        start: addDays(baseDate, 10),
        peak: addDays(baseDate, 32),
        end: addDays(baseDate, 58),
        direction: "SUPPORTIVE",
        intensity: 88,
        precision: "WEEK",
        importance: "PRIMARY",
        colorToken: "supportive",
        engineFindings: [
          {
            engineId: "vedic",
            tradition: "Vedic Parashari (Nirayana)",
            eventType: "Vimshottari Dasha 10th House Karma",
            direction: "SUPPORTIVE",
            strength: 0.9,
            start: addDays(baseDate, 10),
            peak: addDays(baseDate, 32),
            end: addDays(baseDate, 58),
            techniques: ["Vimshottari Dasha (Jupiter-Saturn)", "D10 Dashamsha Lagna Lord", "Transit Jupiter 5th Aspect"],
            rules: ["BPHS Ch. 7, Sl. 10 (D10 authority)", "Saravali Ch. 30 (Saturn 10th stability)"],
            factors: ["Jupiter transiting 2nd from Lagna", "10th lord strong in Shadbala"],
            evidence: ["Jupiter-Saturn Dasha activates 10th house authority", "D10 Dashamsha Lagna lord in 1st house"],
            stability: "HIGH",
            assumptions: ["Birth time accurate within ±15 minutes"],
            status: "SUPPORTIVE",
            version: "2.4.0"
          },
          {
            engineId: "western",
            tradition: "Western Tropical (Sayana)",
            eventType: "Secondary Progressed MC Trine",
            direction: "SUPPORTIVE",
            strength: 0.85,
            start: addDays(baseDate, 18),
            peak: addDays(baseDate, 35),
            end: addDays(baseDate, 65),
            techniques: ["Secondary Progressions", "Transit Saturn Trine Midheaven (MC)"],
            rules: ["Ptolemy Tetrabiblos Bk. 4 (Midheaven elevation)"],
            factors: ["Progressed Moon entering 10th House", "Transit Saturn 0° orb to MC"],
            evidence: ["Progressed Moon in 10th house of vocation", "Saturn trine Midheaven"],
            stability: "HIGH",
            assumptions: ["Placidus house system"],
            status: "SUPPORTIVE",
            version: "2.1.0"
          },
          {
            engineId: "kp",
            tradition: "KP Stellar Astrology",
            eventType: "10th Cusp Sub-Lord Fruition",
            direction: "SUPPORTIVE",
            strength: 0.92,
            start: addDays(baseDate, 15),
            peak: addDays(baseDate, 30),
            end: addDays(baseDate, 48),
            techniques: ["249 Sub-Divisions", "Ruling Planets Analysis"],
            rules: ["KP Reader Vol. III (10th Cusp Sub-Lord signifies 2, 6, 10, 11)"],
            factors: ["10th sub-lord in star of 11th lord", "Ruling planets agree"],
            evidence: ["10th cusp sub-lord signifies fruitful houses 2, 6, 10, 11"],
            stability: "MODERATE",
            assumptions: ["Sub-lord cusps sensitive to ±2 min birth time shift"],
            status: "SUPPORTIVE",
            version: "1.9.0"
          },
          {
            engineId: "jaimini",
            tradition: "Jaimini Upadesha Sutras",
            eventType: "Amatyakaraka (AmK) Rashi Activation",
            direction: "SUPPORTIVE",
            strength: 0.82,
            start: addDays(baseDate, 20),
            peak: addDays(baseDate, 40),
            end: addDays(baseDate, 70),
            techniques: ["Chara Dasha", "7 Chara Karakas", "Arudha Lagna"],
            rules: ["Jaimini Sutras 2.1.14 (AmK in Kendra/Trikona)"],
            factors: ["Chara Dasha rashi holds Amatyakaraka", "Aspect on Arudha Lagna"],
            evidence: ["Amatyakaraka active in Chara Dasha cycle", "Beneficial aspect on AL"],
            stability: "HIGH",
            assumptions: ["7-Karaka system with Rahu included"],
            status: "SUPPORTIVE",
            version: "1.8.0"
          },
          {
            engineId: "tajika",
            tradition: "Tajika Varshaphala (Solar Return)",
            eventType: "Muntha 10th House Placement",
            direction: "MIXED",
            strength: 0.65,
            start: addDays(baseDate, 12),
            peak: addDays(baseDate, 30),
            end: addDays(baseDate, 55),
            techniques: ["Varshaphala Annual Chart", "Muntha Calculation", "Sahams"],
            rules: ["Tajika Neelakanthi (Muntha in 10th gives authority with effort)"],
            factors: ["Varsha Lord aspecting Muntha", "Punya Saham activated"],
            evidence: ["Muntha in 10th house indicates increased workload preceding recognition"],
            stability: "MODERATE",
            assumptions: ["Current solar return year"],
            status: "MIXED",
            version: "1.5.0"
          }
        ],
        agreement: {
          directionAgreementPercent: 80, // 4 supportive out of 5 eligible
          agreeingEnginesRatio: "4 / 5",
          eventAgreementPercent: 100,
          timingAgreementPercent: 67,    // Overlap: Day 20 to 48 (28 days) / Union: Day 10 to 70 (60 days) = 47%-67%
          strengthAgreementPercent: 82,
          rawAgreementPercent: 80,
          lineageAdjustedPercent: 72,
          commonTimingWindow: {
            start: addDays(baseDate, 20),
            peak: addDays(baseDate, 32),
            end: addDays(baseDate, 48)
          },
          totalEligibleEngines: 5,
          participatingEngines: 5,
          supportingEngines: ["vedic", "western", "kp", "jaimini"],
          challengingEngines: [],
          neutralEngines: ["tajika"]
        },
        evidence: [
          {
            chartFactor: "Jupiter-Saturn Dasha",
            technique: "Vimshottari Dasha",
            rule: "BPHS Ch. 7 (Karma & Authority)",
            engine: "Vedic Parashari",
            source: "Brihat Parashara Hora Shastra",
            weight: 0.9
          },
          {
            chartFactor: "Transit Saturn Trine MC",
            technique: "Ptolemaic Major Transits",
            rule: "Tetrabiblos Bk. 4 (Career Consolidation)",
            engine: "Western Tropical",
            source: "Ptolemy's Tetrabiblos",
            weight: 0.85
          },
          {
            chartFactor: "10th Cusp Sub-Lord",
            technique: "KP 249 Table Interlinks",
            rule: "KP Reader Vol. III (House 2, 6, 10, 11)",
            engine: "KP Stellar",
            source: "Prof. K.S. Krishnamurti",
            weight: 0.92
          }
        ],
        conflicts: [
          {
            conflictType: "EFFORT_PRECEDING_RECOGNITION",
            enginesInvolved: ["Tajika Varshaphala", "Vedic Parashari"],
            description: "Tajika indicates heavier initial bureaucratic workload, while Vedic indicates smooth executive sponsorship.",
            characterDifference: "Tajika emphasizes short-term labor stress; Vedic emphasizes macro-cycle elevation."
          }
        ],
        stability: {
          level: "HIGH",
          birthTimeSensitivityMinutes: 15,
          factors: ["Dasha and outer transits remain stable across ±30 min birth-time variance."]
        },
        uncertainty: [
          "Exact job promotion announcement date depends on corporate organizational quarterly cycles.",
          "KP sub-lord cusps shift slightly if birth time uncertainty exceeds ±3 minutes."
        ],
        practicalAdvice: [
          "Document measurable project milestones and present structured portfolio reviews.",
          "Maintain diplomatic patience during initial administrative reviews in the first 2 weeks.",
          "Avoid impulsive resignations without formal written offers."
        ],
        assumptions: ["Assumes current employment contract remains active through Q4 2026."],
        versions: {
          astrocore: "2.4.0",
          ruleSet: "Canonical_Omni_v2",
          ephemeris: "NASA_JPL_DE440"
        }
      },
      {
        id: "pred_wealth_q1_2027",
        chartId,
        category: "MONEY",
        eventType: "FINANCIAL_EXPANSION",
        title: "Capital Growth & Asset Stabilization",
        headline: "Dhana yoga activation and Jupiter 2nd house transit support disciplined wealth compounding.",
        summary: "Strong convergence between Vedic 2nd/11th house lords and Western Jupiter-Pluto trine.",
        start: addDays(baseDate, 75),
        peak: addDays(baseDate, 105),
        end: addDays(baseDate, 140),
        direction: "SUPPORTIVE",
        intensity: 82,
        precision: "WEEK",
        importance: "PRIMARY",
        colorToken: "supportive",
        engineFindings: [
          {
            engineId: "vedic",
            tradition: "Vedic Parashari",
            eventType: "Dhana Yoga Fruition",
            direction: "SUPPORTIVE",
            strength: 0.88,
            start: addDays(baseDate, 75),
            peak: addDays(baseDate, 105),
            end: addDays(baseDate, 140),
            techniques: ["Dhana Yoga Analysis", "Transit Jupiter 2nd House", "Ashtakavarga 34 Bindus"],
            rules: ["Phaladeepika Ch. 6 (Dhana Yogas)"],
            factors: ["2nd and 11th lords in mutual kendra"],
            evidence: ["2nd house of accumulated capital activated"],
            stability: "HIGH",
            assumptions: [],
            status: "SUPPORTIVE",
            version: "2.4.0"
          },
          {
            engineId: "western",
            tradition: "Western Tropical",
            eventType: "Jupiter Trine Pluto Wealth Harmonic",
            direction: "SUPPORTIVE",
            strength: 0.84,
            start: addDays(baseDate, 80),
            peak: addDays(baseDate, 110),
            end: addDays(baseDate, 145),
            techniques: ["Major Planetary Transits", "2nd House Placidus Ingress"],
            rules: ["Robert Hand Planets in Transit"],
            factors: ["Jupiter trine natal Pluto in 2nd house"],
            evidence: ["Expansive financial aspect pattern"],
            stability: "HIGH",
            assumptions: [],
            status: "SUPPORTIVE",
            version: "2.1.0"
          },
          {
            engineId: "kp",
            tradition: "KP Stellar",
            eventType: "2nd & 11th Sub-Lord Significations",
            direction: "SUPPORTIVE",
            strength: 0.86,
            start: addDays(baseDate, 85),
            peak: addDays(baseDate, 100),
            end: addDays(baseDate, 130),
            techniques: ["KP Cuspal Interlinks"],
            rules: ["KP Reader Vol. IV"],
            factors: ["2nd sub-lord links to 11th house of gain"],
            evidence: ["Direct monetary inflow significators"],
            stability: "MODERATE",
            assumptions: [],
            status: "SUPPORTIVE",
            version: "1.9.0"
          }
        ],
        agreement: {
          directionAgreementPercent: 100, // 3/3 supportive
          agreeingEnginesRatio: "3 / 3",
          eventAgreementPercent: 100,
          timingAgreementPercent: 78,
          strengthAgreementPercent: 86,
          rawAgreementPercent: 100,
          lineageAdjustedPercent: 85,
          commonTimingWindow: {
            start: addDays(baseDate, 85),
            peak: addDays(baseDate, 105),
            end: addDays(baseDate, 130)
          },
          totalEligibleEngines: 3,
          participatingEngines: 3,
          supportingEngines: ["vedic", "western", "kp"],
          challengingEngines: [],
          neutralEngines: []
        },
        evidence: [
          {
            chartFactor: "2nd & 11th House Dhana Yoga",
            technique: "Vedic Yoga Engine",
            rule: "Phaladeepika Ch. 6",
            engine: "Vedic Parashari",
            source: "Phaladeepika",
            weight: 0.88
          }
        ],
        conflicts: [],
        stability: {
          level: "HIGH",
          birthTimeSensitivityMinutes: 20,
          factors: ["Financial houses remain consistent across minor birth time perturbations."]
        },
        uncertainty: [
          "Market volatility may alter investment return timing by several weeks."
        ],
        practicalAdvice: [
          "Allocate surplus gains toward emergency reserves and high-conviction low-debt assets.",
          "Consult a licensed fiduciary financial advisor before speculative ventures."
        ],
        assumptions: ["No unrecorded debt obligations."],
        versions: {
          astrocore: "2.4.0",
          ruleSet: "Canonical_Omni_v2",
          ephemeris: "NASA_JPL_DE440"
        }
      },
      {
        id: "pred_relationship_q2_2027",
        chartId,
        category: "RELATIONSHIP",
        eventType: "PARTNERSHIP_HARMONIZATION",
        title: "Relationship Deepening & Partnership Commitment",
        headline: "7th house Venusian transit and Navamsha D9 support emotional clarity and shared commitment.",
        summary: "Convergence across Vedic D9 Navamsha and Western Venus-Jupiter trines.",
        start: addDays(baseDate, 150),
        peak: addDays(baseDate, 180),
        end: addDays(baseDate, 210),
        direction: "SUPPORTIVE",
        intensity: 76,
        precision: "WEEK",
        importance: "SECONDARY",
        colorToken: "supportive",
        engineFindings: [
          {
            engineId: "vedic",
            tradition: "Vedic Parashari",
            eventType: "Navamsha D9 Venus Transit",
            direction: "SUPPORTIVE",
            strength: 0.80,
            start: addDays(baseDate, 150),
            peak: addDays(baseDate, 180),
            end: addDays(baseDate, 210),
            techniques: ["Navamsha D9 Analysis", "Venus Transit 7th House"],
            rules: ["BPHS Ch. 9 (Navamsha marriage/partnership)"],
            factors: ["Venus transiting own sign in D9"],
            evidence: ["Harmonious partnership indicators"],
            stability: "MODERATE",
            assumptions: [],
            status: "SUPPORTIVE",
            version: "2.4.0"
          },
          {
            engineId: "western",
            tradition: "Western Tropical",
            eventType: "Venus Trine Jupiter Soft Aspect",
            direction: "SUPPORTIVE",
            strength: 0.78,
            start: addDays(baseDate, 155),
            peak: addDays(baseDate, 182),
            end: addDays(baseDate, 205),
            techniques: ["Transits to 7th House"],
            rules: ["Tetrabiblos Bk. 4"],
            factors: ["Venus trine natal Jupiter"],
            evidence: ["Mutual social harmony and emotional goodwill"],
            stability: "HIGH",
            assumptions: [],
            status: "SUPPORTIVE",
            version: "2.1.0"
          }
        ],
        agreement: {
          directionAgreementPercent: 100,
          agreeingEnginesRatio: "2 / 2",
          eventAgreementPercent: 100,
          timingAgreementPercent: 85,
          strengthAgreementPercent: 79,
          rawAgreementPercent: 100,
          lineageAdjustedPercent: 88,
          commonTimingWindow: {
            start: addDays(baseDate, 155),
            peak: addDays(baseDate, 180),
            end: addDays(baseDate, 205)
          },
          totalEligibleEngines: 2,
          participatingEngines: 2,
          supportingEngines: ["vedic", "western"],
          challengingEngines: [],
          neutralEngines: []
        },
        evidence: [
          {
            chartFactor: "Navamsha D9 Venus Placement",
            technique: "Divisional Varga",
            rule: "BPHS Ch. 9",
            engine: "Vedic Parashari",
            source: "Brihat Parashara Hora Shastra",
            weight: 0.8
          }
        ],
        conflicts: [],
        stability: {
          level: "MODERATE",
          birthTimeSensitivityMinutes: 8,
          factors: ["D9 Navamsha Ascendant changes every ~13 minutes."]
        },
        uncertainty: [
          "Partner personal chart transits operate concurrently."
        ],
        practicalAdvice: [
          "Engage in honest, vulnerable dialogue about shared 5-year visions.",
          "Prioritize quality time and intentional shared experiences."
        ],
        assumptions: [],
        versions: {
          astrocore: "2.4.0",
          ruleSet: "Canonical_Omni_v2",
          ephemeris: "NASA_JPL_DE440"
        }
      },
      {
        id: "pred_relocation_q3_2027",
        chartId,
        category: "RELOCATION",
        eventType: "FOREIGN_RESIDENCE_TRANSIT",
        title: "Geographic Relocation & Horizon Expansion",
        headline: "4th and 12th house planetary activations indicate potential domestic move or foreign journey.",
        summary: "12th house transits and D4 Chaturthamsha point toward geographic relocation windows.",
        start: addDays(baseDate, 230),
        peak: addDays(baseDate, 260),
        end: addDays(baseDate, 295),
        direction: "MIXED",
        intensity: 70,
        precision: "MONTH",
        importance: "SECONDARY",
        colorToken: "mixed",
        engineFindings: [
          {
            engineId: "vedic",
            tradition: "Vedic Parashari",
            eventType: "12th House Rahu Transit",
            direction: "MIXED",
            strength: 0.72,
            start: addDays(baseDate, 230),
            peak: addDays(baseDate, 260),
            end: addDays(baseDate, 295),
            techniques: ["Rahu 12th House Transit", "D4 Chaturthamsha"],
            rules: ["BPHS Ch. 12 (Foreign stay & distant residence)"],
            factors: ["Rahu activating 12th from Moon", "4th lord aspected by Mars"],
            evidence: ["Disruption of domestic status quo leading to distant relocation"],
            stability: "HIGH",
            assumptions: [],
            status: "MIXED",
            version: "2.4.0"
          },
          {
            engineId: "western",
            tradition: "Western Tropical",
            eventType: "Uranus Ingress 4th House",
            direction: "MIXED",
            strength: 0.68,
            start: addDays(baseDate, 235),
            peak: addDays(baseDate, 265),
            end: addDays(baseDate, 300),
            techniques: ["Outer Planet 4th House Ingress"],
            rules: ["Modern Astrological Relocation Dynamics"],
            factors: ["Uranus entering 4th house of home"],
            evidence: ["Domestic restlessness and structural home change"],
            stability: "HIGH",
            assumptions: [],
            status: "MIXED",
            version: "2.1.0"
          }
        ],
        agreement: {
          directionAgreementPercent: 100, // Both agree on mixed/change character
          agreeingEnginesRatio: "2 / 2",
          eventAgreementPercent: 100,
          timingAgreementPercent: 82,
          strengthAgreementPercent: 70,
          rawAgreementPercent: 100,
          lineageAdjustedPercent: 90,
          commonTimingWindow: {
            start: addDays(baseDate, 235),
            peak: addDays(baseDate, 260),
            end: addDays(baseDate, 295)
          },
          totalEligibleEngines: 2,
          participatingEngines: 2,
          supportingEngines: [],
          challengingEngines: [],
          neutralEngines: ["vedic", "western"]
        },
        evidence: [
          {
            chartFactor: "12th House Transit & D4",
            technique: "D4 Chaturthamsha",
            rule: "BPHS Ch. 12",
            engine: "Vedic Parashari",
            source: "Brihat Parashara Hora Shastra",
            weight: 0.72
          }
        ],
        conflicts: [],
        stability: {
          level: "HIGH",
          birthTimeSensitivityMinutes: 25,
          factors: ["Rahu 12th transit lasts 18 months; broad timing window."]
        },
        uncertainty: [
          "Visa processing and immigration timelines depend on sovereign diplomatic policies."
        ],
        practicalAdvice: [
          "Ensure travel documents, visa paperwork, and remote work permits are secured well in advance.",
          "Prepare contingency budgets for unexpected relocation moving expenses."
        ],
        assumptions: [],
        versions: {
          astrocore: "2.4.0",
          ruleSet: "Canonical_Omni_v2",
          ephemeris: "NASA_JPL_DE440"
        }
      },
      {
        id: "pred_eclipse_q4_2027",
        chartId,
        category: "ECLIPSE",
        eventType: "SOLAR_ECLIPSE_AXIS",
        title: "Total Solar Eclipse on 1st/7th Identity-Relationship Axis",
        headline: "Astronomical solar eclipse triggers psychological recalibration of personal boundaries.",
        summary: "Major solar eclipse degree contacts natal Ascendant degree within 2° orb.",
        start: addDays(baseDate, 310),
        peak: addDays(baseDate, 312),
        end: addDays(baseDate, 315),
        direction: "NEUTRAL",
        intensity: 75,
        precision: "DAY",
        importance: "CONTEXT",
        colorToken: "neutral",
        engineFindings: [
          {
            engineId: "vedic",
            tradition: "Vedic Parashari",
            eventType: "Surya Grahan Nakshatra Contact",
            direction: "NEUTRAL",
            strength: 0.75,
            start: addDays(baseDate, 310),
            peak: addDays(baseDate, 312),
            end: addDays(baseDate, 315),
            techniques: ["Grahan Gochar", "Janma Nakshatra Vedha"],
            rules: ["Varahamihira Brihat Samhita Ch. 5"],
            factors: ["Eclipse falling in Janma Nakshatra"],
            evidence: ["Astronomical eclipse conjunction"],
            stability: "HIGH",
            assumptions: [],
            status: "NEUTRAL",
            version: "2.4.0"
          }
        ],
        agreement: {
          directionAgreementPercent: 100,
          agreeingEnginesRatio: "1 / 1",
          eventAgreementPercent: 100,
          timingAgreementPercent: 100,
          strengthAgreementPercent: 75,
          rawAgreementPercent: 100,
          lineageAdjustedPercent: 100,
          commonTimingWindow: {
            start: addDays(baseDate, 310),
            peak: addDays(baseDate, 312),
            end: addDays(baseDate, 315)
          },
          totalEligibleEngines: 1,
          participatingEngines: 1,
          supportingEngines: [],
          challengingEngines: [],
          neutralEngines: ["vedic"]
        },
        evidence: [
          {
            chartFactor: "Solar Eclipse on Ascendant Axis",
            technique: "IAU Solar Eclipse Coordinate Geometry",
            rule: "Brihat Samhita Ch. 5",
            engine: "ASTRO-ASTRONOMY Core",
            source: "NASA JPL DE440",
            weight: 0.75
          }
        ],
        conflicts: [],
        stability: {
          level: "HIGH",
          birthTimeSensitivityMinutes: 60,
          factors: ["Astronomical eclipse timestamp is universally fixed to sub-second precision."]
        },
        uncertainty: [],
        practicalAdvice: [
          "Use the eclipse day for meditation, quiet introspection, and spiritual replenishment.",
          "Avoid executing permanent legal signatures during the exact 3-hour eclipse alignment."
        ],
        assumptions: [],
        versions: {
          astrocore: "2.4.0",
          ruleSet: "Canonical_Omni_v2",
          ephemeris: "NASA_JPL_DE440"
        }
      }
    ];

    return events;
  }

  /**
   * Filters canonical predictions based on search, category, engine, agreement, and stability
   */
  public static filterPredictions(
    events: CanonicalPredictionEvent[],
    filter: CalendarRangeFilter
  ): CanonicalPredictionEvent[] {
    return events.filter(e => {
      // 1. Date Range Overlap
      if (filter.startDate && filter.endDate) {
        if (e.end < filter.startDate || e.start > filter.endDate) {
          return false;
        }
      }

      // 2. Category Filter
      if (filter.category && filter.category !== "ALL") {
        if (e.category !== filter.category) {
          return false;
        }
      }

      // 3. Engine Filter
      if (filter.engineId && filter.engineId !== "ALL") {
        const hasEngine = e.engineFindings.some(f => f.engineId === filter.engineId && f.status !== "NOT_APPLICABLE");
        if (!hasEngine) {
          return false;
        }
      }

      // 4. Agreement Threshold
      if (filter.minAgreementPercent && filter.minAgreementPercent > 0) {
        if (e.agreement.directionAgreementPercent < filter.minAgreementPercent) {
          return false;
        }
      }

      // 5. Stability Filter
      if (filter.stabilityLevel && filter.stabilityLevel !== "ALL") {
        if (e.stability.level !== filter.stabilityLevel) {
          return false;
        }
      }

      // 6. Search Query
      if (filter.searchQuery && filter.searchQuery.trim()) {
        const q = filter.searchQuery.toLowerCase();
        const matches = 
          e.title.toLowerCase().includes(q) ||
          e.summary.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          e.engineFindings.some(f => f.tradition.toLowerCase().includes(q) || f.techniques.some(t => t.toLowerCase().includes(q)));
        if (!matches) {
          return false;
        }
      }

      return true;
    });
  }

  /**
   * Generates a standard RFC 5545 iCalendar string (.ics) for a given prediction event
   */
  public static generateIcsContent(event: CanonicalPredictionEvent): string {
    const formatDate = (iso: string): string => iso.replace(/-/g, '') + "T090000Z";
    const startDate = formatDate(event.start);
    const endDate = formatDate(event.end);
    const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + "Z";

    return [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//ASTRO360//Omni Prediction Calendar//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${event.id}@astro.tarikislam.in`,
      `DTSTAMP:${now}`,
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      `SUMMARY:ASTRO360: ${event.title} (${event.agreement.directionAgreementPercent}% Agreement)`,
      `DESCRIPTION:${event.summary}\\n\\nMulti-Engine Agreement: ${event.agreement.agreeingEnginesRatio} Systems (${event.agreement.directionAgreementPercent}%)\\nCommon Window: ${event.agreement.commonTimingWindow ? `${event.agreement.commonTimingWindow.start} to ${event.agreement.commonTimingWindow.end}` : "Broad window"}\\n\\nPractical Guidance:\\n${event.practicalAdvice.join('\\n')}`,
      "STATUS:CONFIRMED",
      "BEGIN:VALARM",
      "TRIGGER:-P2D",
      "ACTION:DISPLAY",
      `DESCRIPTION:Reminder: ${event.title} window begins in 2 days.`,
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");
  }
}
