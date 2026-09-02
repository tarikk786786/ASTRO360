/**
 * ASTRO360 NextActionEngine
 * Generates structured next steps categorized into:
 * EXPLORE, COMPARE, RESEARCH, PLAN, TRACK, ASK
 * Never promises astrology as an autonomous guarantee; maintains clear boundary
 * between astrological pattern indicators and human strategic agency.
 */

import { ProblemDomain } from './problemIntentRouter';

export interface NextActionItem {
  id: string;
  category: 'EXPLORE' | 'COMPARE' | 'RESEARCH' | 'PLAN' | 'TRACK' | 'ASK';
  label: string;
  description: string;
  actionType: 'NAVIGATE' | 'VIEW_MODAL' | 'ADD_CALENDAR' | 'ASK_FOLLOWUP';
  targetPayload?: any;
}

export interface NextStepBundle {
  astrologyActions: NextActionItem[];
  practicalPlaybook: string[];
  researchActions: NextActionItem[];
  recommendedFollowUps: string[];
}

export class NextActionEngine {
  public static generateBundle(domain: ProblemDomain, problemText: string, timingWindow: string): NextStepBundle {
    const defaultPractical: Record<ProblemDomain, string[]> = {
      CAREER: [
        'Audit your resume and portfolio to highlight your highest-impact recent achievements.',
        'Schedule exploratory 1-on-1 networking conversations with leaders in your target domain.',
        'Refine negotiation points regarding compensation, scope of agency, and title elevation.',
        'Establish a dedicated weekly sprint to complete portfolio work during high-vitality hours.'
      ],
      LOVE: [
        'Communicate transparently about your long-term relationship expectations and boundaries.',
        'Schedule intentional quality time free from work distractions during the upcoming cycle.',
        'Cultivate emotional self-sufficiency rather than relying on external validation.'
      ],
      MARRIAGE: [
        'Align on core lifestyle, financial management, and family milestones with your partner.',
        'Consult trusted mentors or family elders for balanced perspectives on timing.',
        'Evaluate mutual astrological synastry factors (Ashta Koota / Composite chart) for compatibility depth.'
      ],
      MONEY: [
        'Audit fixed recurring liabilities and eliminate non-essential subscription leakage.',
        'Build or fortify a 6-month liquid emergency reserve in risk-free instruments.',
        'Evaluate diversified index and asset allocation options with a licensed financial advisor.'
      ],
      BUSINESS: [
        'Validate customer willingness-to-pay through 15 structured user discovery calls.',
        'Clarify your core value proposition and benchmark against competitor friction points.',
        'Prepare your product release and marketing launch sprint to coincide with the auspicious window.'
      ],
      EDUCATION: [
        'Break your curriculum into 25-minute Pomodoro intervals focused on weak subject areas.',
        'Practice timed past-year exam papers under strict simulation conditions.',
        'Optimize sleep hygiene and hydration during peak memorization cycles.'
      ],
      TRAVEL: [
        'Verify visa processing timelines and passport validity requirements 90 days in advance.',
        'Draft flexible itineraries with cancellable accommodations for contingency buffers.'
      ],
      RELOCATION: [
        'Benchmark cost of living, taxation, and healthcare infrastructure in candidate destinations.',
        'Arrange a 7-day exploratory visit to experience neighborhood transit and community life.',
        'Review astrocartography planetary lines (Jupiter/Venus AS/MC) for target coordinates.'
      ],
      FAMILY: [
        'Initiate calm, scheduled family dialogue to resolve lingering domestic friction.',
        'Ensure legal titles and property documentation are fully verified by counsel.'
      ],
      LIFE_DIRECTION: [
        'Define your top 3 non-negotiable personal values for the next 3-year horizon.',
        'Reflect on your Vimshottari Dasha planetary themes to harmonize career with inner calling.'
      ],
      HEALTH_WELLNESS: [
        'Maintain consistent circadian sleep and morning sunlight exposure.',
        'Consult qualified healthcare practitioners for clinical diagnostic evaluations.'
      ],
      SPIRITUALITY: [
        'Establish a daily 20-minute silent meditation or sacred mantra Japa practice at Brahma Muhurta.',
        'Study foundational classical wisdom texts for philosophical grounding.'
      ],
      OTHER: [
        'Clarify the primary bottleneck and isolate the top high-leverage action item.'
      ]
    };

    return {
      astrologyActions: [
        {
          id: 'act-timeline',
          category: 'EXPLORE',
          label: 'View Detailed Timing Horizon',
          description: `Inspect monthly, daily and planetary hour activations across ${timingWindow}.`,
          actionType: 'NAVIGATE',
          targetPayload: { tab: 'forecast' }
        },
        {
          id: 'act-compare',
          category: 'COMPARE',
          label: 'Compare 5 Astrology Systems',
          description: 'Side-by-side agreement matrix across Vedic, Western, KP, Jaimini, and Tajika.',
          actionType: 'VIEW_MODAL',
          targetPayload: { modal: 'compare' }
        },
        {
          id: 'act-calendar',
          category: 'TRACK',
          label: 'Sync to Personal Calendar (.ics)',
          description: 'Export this timing window to Google Calendar, Apple Calendar, or Outlook.',
          actionType: 'ADD_CALENDAR',
          targetPayload: { eventTitle: `${domain} Activation Window`, window: timingWindow }
        }
      ],
      practicalPlaybook: defaultPractical[domain] || defaultPractical['LIFE_DIRECTION'],
      researchActions: [
        {
          id: 'act-evidence',
          category: 'RESEARCH',
          label: 'Inspect Classical Scripture Citations',
          description: 'Read original Sanskrit verses from BPHS, Jaimini Sutras, and Ptolemy.',
          actionType: 'VIEW_MODAL',
          targetPayload: { modal: 'evidence' }
        },
        {
          id: 'act-sensitivity',
          category: 'RESEARCH',
          label: 'Birth-Time Sensitivity Drift Test',
          description: 'Evaluate if changing birth time by ±15 minutes alters this prediction.',
          actionType: 'NAVIGATE',
          targetPayload: { tab: 'birth-time-rectification' }
        }
      ],
      recommendedFollowUps: [
        `What planetary cycles are causing delays in my ${domain.toLowerCase()}?`,
        `When does the peak auspicious window occur in ${timingWindow}?`,
        `Which specific houses in my birth chart govern this ${domain.toLowerCase()} situation?`
      ]
    };
  }
}
