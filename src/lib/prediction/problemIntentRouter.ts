/**
 * ASTRO360 ProblemIntentRouter
 * Translates natural language problems into structured astrology execution plans:
 * Domain, problem type, required chart data, relevant houses, planets, vargas,
 * timing systems, applicable engines, classical rules, and evidence citations.
 */

export type ProblemDomain = 
  | 'CAREER'
  | 'LOVE'
  | 'MONEY'
  | 'MARRIAGE'
  | 'BUSINESS'
  | 'EDUCATION'
  | 'TRAVEL'
  | 'RELOCATION'
  | 'FAMILY'
  | 'LIFE_DIRECTION'
  | 'HEALTH_WELLNESS'
  | 'SPIRITUALITY'
  | 'OTHER';

export type ProblemType = 
  | 'stagnation'
  | 'timing'
  | 'decision'
  | 'transition'
  | 'conflict'
  | 'expansion'
  | 'compatibility'
  | 'relocation_viability'
  | 'general_exploration';

export interface AstrologyExecutionPlan {
  domain: ProblemDomain;
  problem: ProblemType;
  intent: string;
  normalizedTitle: string;
  summaryProblemText: string;
  requiresChart: boolean;
  requiresBirthTime: boolean;
  requiresLocation: boolean;
  relevantHouses: number[];
  relevantPlanets: string[];
  relevantDivisionalCharts: string[];
  relevantTimingSystems: string[];
  applicableEngines: ('vedic' | 'western' | 'kp' | 'jaimini' | 'tajika')[];
  primaryRules: string[];
  evidenceSources: { rule: string; citation: string; tier: number }[];
  practicalQuestions: string[];
}

export class ProblemIntentRouter {
  public static route(problemText: string): AstrologyExecutionPlan {
    const text = (problemText || '').toLowerCase().trim();

    // 1. CAREER / VOCATION
    if (
      text.includes('career') || 
      text.includes('job') || 
      text.includes('promotion') || 
      text.includes('boss') || 
      text.includes('work') || 
      text.includes('profession') || 
      text.includes('fired') || 
      text.includes('stuck') || 
      text.includes('switch job') ||
      text.includes('quit')
    ) {
      const isDecision = text.includes('should i quit') || text.includes('should i stay') || text.includes('change job');
      return {
        domain: 'CAREER',
        problem: isDecision ? 'decision' : text.includes('stuck') ? 'stagnation' : 'timing',
        intent: isDecision ? 'career_decision_support' : 'career_timing_analysis',
        normalizedTitle: 'Career Acceleration & Direction Analysis',
        summaryProblemText: problemText || 'Career stagnation and progression timing',
        requiresChart: true,
        requiresBirthTime: true,
        requiresLocation: true,
        relevantHouses: [10, 6, 2, 11, 1],
        relevantPlanets: ['Sun', 'Saturn', 'Mars', 'Jupiter', 'Mercury'],
        relevantDivisionalCharts: ['D1', 'D10 (Dasamsa)', 'D9 (Navamsha)'],
        relevantTimingSystems: ['Vimshottari Dasha', 'Planetary Gochara (Transits)', 'KP Sub-Lord Cusps', 'Secondary Progressions'],
        applicableEngines: ['vedic', 'western', 'kp', 'jaimini', 'tajika'],
        primaryRules: [
          '10th Lord placement, dignities, and transit aspects (BPHS Ch. 26)',
          'Saturn transit over 10th/1st house restructuring vocational responsibilities',
          'Dasamsa (D10) Kendra strength and Amatyakaraka activation',
          'KP 10th cusp sub-lord signifying houses 2, 6, 10, 11 for professional advancement'
        ],
        evidenceSources: [
          { rule: '10th House Karma Adhipati', citation: 'Brihat Parashara Hora Shastra, Ch. 26, Sl. 14', tier: 1 },
          { rule: 'Amatyakaraka Career Manifestation', citation: 'Jaimini Upadesha Sutras, Adhyaya 2, Pada 1', tier: 1 },
          { rule: 'Midheaven Angle Ingress', citation: 'Claudius Ptolemy - Tetrabiblos, Book IV, Ch. 4', tier: 2 },
          { rule: 'KP 10th Sub-Lord Rule', citation: 'KP Stellar System Readers Vol. 3, Ch. 7', tier: 3 }
        ],
        practicalQuestions: [
          'Are you looking for an internal promotion or an external transition?',
          'What is your financial runway if you decide to transition?'
        ]
      };
    }

    // 2. LOVE & RELATIONSHIPS
    if (
      text.includes('love') || 
      text.includes('relationship') || 
      text.includes('partner') || 
      text.includes('breakup') || 
      text.includes('dating') || 
      text.includes('ex') || 
      text.includes('soulmate') || 
      text.includes('crush')
    ) {
      return {
        domain: 'LOVE',
        problem: text.includes('breakup') ? 'conflict' : text.includes('when') ? 'timing' : 'compatibility',
        intent: 'relationship_resonance_analysis',
        normalizedTitle: 'Relationship Dynamics & Romantic Timing',
        summaryProblemText: problemText || 'Romantic clarity and relationship evolution',
        requiresChart: true,
        requiresBirthTime: true,
        requiresLocation: true,
        relevantHouses: [7, 5, 2, 11, 8],
        relevantPlanets: ['Venus', 'Jupiter', 'Mars', 'Moon', 'Rahu'],
        relevantDivisionalCharts: ['D1', 'D9 (Navamsha)'],
        relevantTimingSystems: ['Vimshottari Dasha', 'Jupiter/Saturn Transit Trines', 'Darakaraka Transits'],
        applicableEngines: ['vedic', 'western', 'kp', 'jaimini', 'tajika'],
        primaryRules: [
          '7th House Lord dignity and Venusian benefic aspects (BPHS Ch. 24)',
          'Navamsha (D9) 7th house and Darakaraka planetary placement',
          'Jupiter transiting 5th/7th/11th houses expanding relational connection',
          'Synastry 7th/8th house overlays and planetary conjunctions'
        ],
        evidenceSources: [
          { rule: '7th House Vivaha & Partnership', citation: 'Phaladeepika by Mantreswara, Ch. 12, Sl. 10', tier: 1 },
          { rule: 'Darakaraka Jaimini Sutra', citation: 'Jaimini Upadesha Sutras, Adhyaya 1, Pada 3', tier: 1 },
          { rule: 'Venus Synastry Trine Rule', citation: 'Hellenistic Synastry - Dorotheus of Sidon, Carmen Astrologicum', tier: 2 }
        ],
        practicalQuestions: [
          'Is this regarding an existing partnership or opening to new connections?',
          'What core values are most essential for your relational harmony?'
        ]
      };
    }

    // 3. MARRIAGE TIMING
    if (
      text.includes('marry') || 
      text.includes('marriage') || 
      text.includes('wedding') || 
      text.includes('spouse') || 
      text.includes('husband') || 
      text.includes('wife')
    ) {
      return {
        domain: 'MARRIAGE',
        problem: 'timing',
        intent: 'marriage_timing_and_karmic_bonds',
        normalizedTitle: 'Marriage Timing & Long-Term Union Indicators',
        summaryProblemText: problemText || 'Marriage timing and partnership indicators',
        requiresChart: true,
        requiresBirthTime: true,
        requiresLocation: true,
        relevantHouses: [7, 2, 11, 8, 4],
        relevantPlanets: ['Venus', 'Jupiter', 'Sun', 'Mars', 'Moon'],
        relevantDivisionalCharts: ['D1', 'D9 (Navamsha)', 'D7 (Saptamsha)'],
        relevantTimingSystems: ['Dasha of 7th/2nd/11th Lords', 'Double Transit of Jupiter & Saturn over 7th/1st', 'KP 7th Sub-Lord'],
        applicableEngines: ['vedic', 'western', 'kp', 'jaimini', 'tajika'],
        primaryRules: [
          'Double transit rule: Jupiter and Saturn jointly aspecting 7th house/Lord (BPHS Ch. 24)',
          'Operating Vimshottari Mahadasha/Antardasha connected to 7th/2nd/11th bhavas',
          'D9 Navamsha Lagna Lord strength and Darakaraka condition',
          'KP 7th cusp sub-lord signifying fruitful houses (2, 7, 11)'
        ],
        evidenceSources: [
          { rule: 'Vivaha Timing Double Transit', citation: 'Brihat Parashara Hora Shastra, Ch. 24, Sl. 18', tier: 1 },
          { rule: 'Navamsha 7th House Fruitfulness', citation: 'Jataka Parijata, Adhyaya 14, Sl. 8', tier: 1 },
          { rule: 'KP 7th Sub-Lord Marriage Rule', citation: 'KP Stellar Astrology Readers Vol. 4', tier: 3 }
        ],
        practicalQuestions: [
          'Are you currently in a serious relationship or exploring potential matches?',
          'Do you have your partner\'s birth details for dual synastry evaluation?'
        ]
      };
    }

    // 4. MONEY / WEALTH / FINANCES
    if (
      text.includes('money') || 
      text.includes('finance') || 
      text.includes('wealth') || 
      text.includes('debt') || 
      text.includes('investment') || 
      text.includes('income') || 
      text.includes('rich') || 
      text.includes('financial')
    ) {
      return {
        domain: 'MONEY',
        problem: text.includes('debt') ? 'conflict' : 'expansion',
        intent: 'wealth_generation_and_financial_cycles',
        normalizedTitle: 'Financial Inflow, Dhana Yogas & Asset Timing',
        summaryProblemText: problemText || 'Financial cycles, income growth, and investment timing',
        requiresChart: true,
        requiresBirthTime: true,
        requiresLocation: true,
        relevantHouses: [2, 11, 9, 5, 8, 12],
        relevantPlanets: ['Jupiter', 'Venus', 'Mercury', 'Moon', 'Sun'],
        relevantDivisionalCharts: ['D1', 'D2 (Hora)', 'D11 (Ekadashamsha)'],
        relevantTimingSystems: ['Dhana Yoga Dashas', 'Jupiter Transit over 2nd/11th', 'Ashtakavarga Bindus'],
        applicableEngines: ['vedic', 'western', 'kp', 'jaimini', 'tajika'],
        primaryRules: [
          '2nd house (accumulated wealth) & 11th house (gains/cashflow) activations (BPHS Ch. 41)',
          'Dhana Yoga connections between Lords of 1st, 2nd, 5th, 9th, and 11th',
          'Hora (D2) planetary distribution between Sun (Solar) and Moon (Lunar) halves',
          'KP 2nd and 11th sub-lords free from 6/8/12 adverse significations'
        ],
        evidenceSources: [
          { rule: 'Dhana Yoga Wealth Generation', citation: 'Brihat Parashara Hora Shastra, Ch. 41, Sl. 2–11', tier: 1 },
          { rule: 'Saravali Dhana Bhavas', citation: 'Saravali by Kalyana Varma, Ch. 34, Sl. 5', tier: 1 },
          { rule: 'Jupiter 2nd House Trines', citation: 'Claudius Ptolemy - Tetrabiblos, Book IV, Ch. 2', tier: 2 }
        ],
        practicalQuestions: [
          'Are you focusing on active income growth, investments, or debt clearance?',
          'What is your investment risk tolerance for the next 12 months?'
        ]
      };
    }

    // 5. BUSINESS / ENTREPRENEURSHIP
    if (
      text.includes('business') || 
      text.includes('startup') || 
      text.includes('company') || 
      text.includes('venture') || 
      text.includes('client') || 
      text.includes('founder') || 
      text.includes('sales')
    ) {
      return {
        domain: 'BUSINESS',
        problem: text.includes('when') ? 'timing' : 'expansion',
        intent: 'business_expansion_and_commercial_timing',
        normalizedTitle: 'Business Launch, Commercial Traction & Expansion',
        summaryProblemText: problemText || 'Business launch readiness and commercial expansion timing',
        requiresChart: true,
        requiresBirthTime: true,
        requiresLocation: true,
        relevantHouses: [7, 10, 3, 11, 9],
        relevantPlanets: ['Mercury', 'Mars', 'Jupiter', 'Sun', 'Rahu'],
        relevantDivisionalCharts: ['D1', 'D10 (Dasamsa)', 'D7'],
        relevantTimingSystems: ['Mercury/Mars Dashas', 'Muhurta Electional Astrological Windows', 'KP 10th/7th Sub-Lords'],
        applicableEngines: ['vedic', 'western', 'kp', 'jaimini', 'tajika'],
        primaryRules: [
          '3rd house (initiative/enterprise) & 7th house (trade/public transactions) strength',
          'Mercury (intellect/commerce) and Mars (execution drive) dignities and yogas',
          'Electional Muhurta alignment for business incorporation and product launches',
          'KP 7th and 10th house harmonious significations'
        ],
        evidenceSources: [
          { rule: 'Vanijya & Commercial Enterprise', citation: 'Brihat Parashara Hora Shastra, Ch. 25, Sl. 10', tier: 1 },
          { rule: 'Mercury Commercial Dominance', citation: 'Jataka Parijata, Adhyaya 15, Sl. 22', tier: 1 }
        ],
        practicalQuestions: [
          'Is your venture B2B enterprise or direct-to-consumer?',
          'Do you have a target launch window you want to benchmark?'
        ]
      };
    }

    // 6. RELOCATION / MOVING / ASTROCARTOGRAPHY
    if (
      text.includes('move') || 
      text.includes('relocat') || 
      text.includes('abroad') || 
      text.includes('foreign') || 
      text.includes('city') || 
      text.includes('country') || 
      text.includes('immigration') || 
      text.includes('visa')
    ) {
      return {
        domain: 'RELOCATION',
        problem: 'relocation_viability',
        intent: 'relocation_and_astrocartography_analysis',
        normalizedTitle: 'Relocation Feasibility, Foreign Travel & Astrocartography',
        summaryProblemText: problemText || 'Relocation viability and geographical planetary line alignments',
        requiresChart: true,
        requiresBirthTime: true,
        requiresLocation: true,
        relevantHouses: [12, 9, 4, 3, 7],
        relevantPlanets: ['Rahu', 'Moon', 'Jupiter', 'Saturn', 'Venus'],
        relevantDivisionalCharts: ['D1', 'D4 (Chaturthamsha)', 'D9 (Navamsha)'],
        relevantTimingSystems: ['Dasha of 9th/12th Lords', 'Rahu/Moon Dasha Activations', 'Relocation Chart Angularity'],
        applicableEngines: ['vedic', 'western', 'kp', 'jaimini', 'tajika'],
        primaryRules: [
          '12th house (foreign residence) & 9th house (long-distance voyage) activations',
          '4th house (homeland/motherland) afflictions or detachment triggers',
          'Chaturthamsha (D4) indications for permanent fixed assets abroad',
          'Astrocartography planetary line crossings (Jupiter/Venus MC/AS lines)'
        ],
        evidenceSources: [
          { rule: 'Foreign Residence & 12th Bhava', citation: 'Brihat Parashara Hora Shastra, Ch. 28, Sl. 8', tier: 1 },
          { rule: 'Rahu Foreign Displacement', citation: 'Saravali by Kalyana Varma, Ch. 35, Sl. 12', tier: 1 }
        ],
        practicalQuestions: [
          'Which specific target cities or countries are you evaluating?',
          'Is this relocation for career, education, or lifestyle?'
        ]
      };
    }

    // 7. EDUCATION / ACADEMICS
    if (
      text.includes('study') || 
      text.includes('exam') || 
      text.includes('degree') || 
      text.includes('college') || 
      text.includes('university') || 
      text.includes('education') || 
      text.includes('course')
    ) {
      return {
        domain: 'EDUCATION',
        problem: 'timing',
        intent: 'academic_focus_and_higher_learning',
        normalizedTitle: 'Academic Growth, Exam Success & Higher Learning',
        summaryProblemText: problemText || 'Academic performance and higher learning opportunities',
        requiresChart: true,
        requiresBirthTime: true,
        requiresLocation: true,
        relevantHouses: [4, 5, 9, 2],
        relevantPlanets: ['Mercury', 'Jupiter', 'Sun', 'Moon'],
        relevantDivisionalCharts: ['D1', 'D24 (Siddhamsha)', 'D9'],
        relevantTimingSystems: ['Mercury/Jupiter Dashas', 'Transit of 5th/9th Lords', 'KP 4th/9th Sub-Lords'],
        applicableEngines: ['vedic', 'western', 'kp', 'jaimini', 'tajika'],
        primaryRules: [
          '4th house (foundational learning) & 5th house (intelligence/memory) strength',
          '9th house (higher research/philosophy) activation by benefic planets',
          'Siddhamsha (D24) for university excellence and competitive examinations'
        ],
        evidenceSources: [
          { rule: 'Vidya Bhava Foundations', citation: 'Brihat Parashara Hora Shastra, Ch. 22, Sl. 4', tier: 1 },
          { rule: 'Budha Intelligence & Memory', citation: 'Phaladeepika, Ch. 15, Sl. 7', tier: 1 }
        ],
        practicalQuestions: [
          'What field or competitive exam are you preparing for?',
          'What is the specific target milestone date?'
        ]
      };
    }

    // 8. FAMILY / HOME / PROPERTY
    if (
      text.includes('family') || 
      text.includes('mother') || 
      text.includes('father') || 
      text.includes('parents') || 
      text.includes('home') || 
      text.includes('property') || 
      text.includes('house buy') || 
      text.includes('children') || 
      text.includes('child')
    ) {
      return {
        domain: 'FAMILY',
        problem: 'transition',
        intent: 'family_welfare_and_property_acquisition',
        normalizedTitle: 'Family Harmony, Domestic Peace & Real Estate Timing',
        summaryProblemText: problemText || 'Domestic dynamics, property purchase, and family wellbeing',
        requiresChart: true,
        requiresBirthTime: true,
        requiresLocation: true,
        relevantHouses: [4, 2, 5, 9, 12],
        relevantPlanets: ['Moon', 'Mars', 'Jupiter', 'Venus', 'Saturn'],
        relevantDivisionalCharts: ['D1', 'D4 (Chaturthamsha)', 'D12 (Dwadasamsha)'],
        relevantTimingSystems: ['4th Lord Dasha', 'Mars/Venus Transits', 'KP 4th Sub-Lord'],
        applicableEngines: ['vedic', 'western', 'kp', 'jaimini', 'tajika'],
        primaryRules: [
          '4th house (domestic peace/vehicles/land) and Moon condition (BPHS Ch. 22)',
          'Mars (Bhumi Karaka for land) & Venus (Gruha Karaka for luxury home)',
          'Chaturthamsha (D4) confirmation for real estate asset acquisition'
        ],
        evidenceSources: [
          { rule: '4th House Matru & Gruha Bhava', citation: 'Brihat Parashara Hora Shastra, Ch. 22, Sl. 1–9', tier: 1 }
        ],
        practicalQuestions: [
          'Is your focus on personal property purchase, domestic harmony, or parenthood?'
        ]
      };
    }

    // 9. DEFAULT / GENERAL LIFE DIRECTION
    return {
      domain: 'LIFE_DIRECTION',
      problem: 'general_exploration',
      intent: 'holistic_life_navigation_and_karmic_destiny',
      normalizedTitle: 'Holistic Life Purpose & Planetary Cycle Unfoldment',
      summaryProblemText: problemText || 'Comprehensive life path, planetary alignment, and timing overview',
      requiresChart: true,
      requiresBirthTime: true,
      requiresLocation: true,
      relevantHouses: [1, 5, 9, 10],
      relevantPlanets: ['Sun', 'Moon', 'Jupiter', 'Saturn', 'Ascendant Lord'],
      relevantDivisionalCharts: ['D1', 'D9 (Navamsha)', 'D10 (Dasamsa)'],
      relevantTimingSystems: ['Vimshottari Dasha', 'Saturn/Jupiter Major Gochara Cycles', 'KP Sub-Lord Cusps'],
      applicableEngines: ['vedic', 'western', 'kp', 'jaimini', 'tajika'],
      primaryRules: [
        'Ascendant (Lagna) Lord placement defining physical and spiritual agency',
        'Atmakaraka (Soul Planet) in Jaimini indicating core incarnation lesson',
        'Active Vimshottari Mahadasha shaping the current psychological and life chapter'
      ],
      evidenceSources: [
        { rule: 'Lagna Tanu Bhava Vitality', citation: 'Brihat Parashara Hora Shastra, Ch. 21, Sl. 1–6', tier: 1 },
        { rule: 'Atmakaraka Soul Destiny', citation: 'Jaimini Upadesha Sutras, Adhyaya 1, Pada 1', tier: 1 }
      ],
      practicalQuestions: [
        'What specific life milestone or decision is most pressing for you right now?'
      ]
    };
  }
}
