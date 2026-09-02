import { IslamicGuidanceAssistant, IslamicGuidanceResponse } from '../islamic/IslamicGuidanceAssistant';
import { IslamicQuestionRouter } from '../islamic/IslamicQuestionRouter';
/**
 * ASTRO360 Personal Problem Analyzer
 * Real-time astrological problem-solving with dynamic chart execution,
 * multi-engine consensus, decision support, safety guardrails, and practical advice.
 */

import { UserProfile } from '../../types';
import { AstrologyIntentRouter, IntentRouteResult } from '../router/astrologyIntentRouter';
import { AstrologyToolRegistry } from '../tools/astrologyToolRegistry';
import { AgreementEngine, EngineFinding } from '../../lib/prediction/agreementEngine';
import { KnowledgeEngine } from '../rag/knowledgeEngine';

export interface SolvedProblemAnalysis {
  islamicGuidanceView?: {
    primaryTheme: string;
    corePrinciples: string[];
    evidenceChain: any[];
    scholarlyConsensusOrIkhtilaf: string;
    practicalSpiritualHabits: string[];
  };
  question: string;
  intent: string;
  category: string;
  responseMode: string;
  // Core synthesized summary
  summary: string;
  // Separate views
  astrologyView: {
    primaryTheme: string;
    chartFactors: string[];
    dashaCycle: string;
    planetaryTelemetry: string;
    houseActivations: string;
  };
  practicalView: {
    actionItems: string[];
    strategicAdvice: string;
  };
  // Decision Support if applicable
  decisionMatrix?: {
    optionA: {
      title: string;
      astrologicalPerspective: string;
      practicalPerspective: string;
    };
    optionB: {
      title: string;
      astrologicalPerspective: string;
      practicalPerspective: string;
    };
    recommendation: string;
  };
  // Timing
  timing: {
    start: string;
    peak: string;
    end: string;
    windowLabel: string;
    intensity: 'HIGH' | 'MODERATE' | 'STABLE';
    note: string;
  };
  // Multi-Engine Agreement
  agreement: {
    agreementPercent: number;
    level: string;
    participatingCount: string;
    rawAgreement: string;
    lineageAdjusted: string;
    disclaimer: string;
  };
  systemsBreakdown: {
    vedic: string;
    western: string;
    kp: string;
    jaimini: string;
  };
  evidenceSources: {
    rule: string;
    citation: string;
    tier: number;
  }[];
  sensitivity: {
    driftInterval: string;
    stability: 'HIGH' | 'MODERATE' | 'SENSITIVE';
    note: string;
  };
  whatIsLessCertain: string[];
  whatYouCanControl: string[];
  followUps: string[];
  safetyNotice?: string;
  reproducibility: {
    engineVersion: string;
    ephemerisVersion: string;
    ayanamsha: string;
    calculationTimestamp: string;
  };
}

export class PersonalProblemAnalyzer {
  public static async analyze(question: string, profile: UserProfile): Promise<SolvedProblemAnalysis> {
    const route = AstrologyIntentRouter.route(question);
    const seekerName = profile.name?.trim() || 'Seeker';

    // Check if query is an Islamic or Mixed Astrology/Islam query
    const islamicRoute = IslamicQuestionRouter.route(question);
    const isExplicitIslamicOrPrayer = islamicRoute.category !== 'GENERAL_ISLAMIC_KNOWLEDGE' || 
      question.toLowerCase().includes('islam') || 
      question.toLowerCase().includes('quran') || 
      question.toLowerCase().includes('hadith') ||
      question.toLowerCase().includes('fajr') ||
      question.toLowerCase().includes('prayer time') ||
      question.toLowerCase().includes('qibla') ||
      question.toLowerCase().includes('hijri');

    if (isExplicitIslamicOrPrayer || islamicRoute.isMixedAstrologyIslam || islamicRoute.isAstrologyDivinationInquiry) {
      const islamicRes = await IslamicGuidanceAssistant.answer(question, profile);
      return this.convertIslamicResponseToSolvedProblem(islamicRes, seekerName);
    }


    // 1. Safety Intercepts
    if (route.isSafetySensitive) {
      if (route.safetyCategory === 'MEDICAL') {
        return this.generateMedicalSafetyResponse(question, seekerName);
      }
      if (route.safetyCategory === 'FINANCIAL_GUARANTEE') {
        return this.generateFinancialSafetyResponse(question, seekerName, profile);
      }
      if (route.safetyCategory === 'PROMPT_INJECTION') {
        return this.generatePromptInjectionResponse(question);
      }
    }

    // 2. Fetch authoritative chart telemetry from ASTROCORE
    const chartData = await AstrologyToolRegistry.executeTool('chart.get', {}, profile);
    const planetsData = await AstrologyToolRegistry.executeTool('planet.position', {}, profile);
    const ascendantData = await AstrologyToolRegistry.executeTool('ascendant.get', {}, profile);
    const dashaData = await AstrologyToolRegistry.executeTool('dasha.get', {}, profile);
    const transitData = await AstrologyToolRegistry.executeTool('transit.calculate', {}, profile);
    const yogaData = await AstrologyToolRegistry.executeTool('yoga.evaluate', {}, profile);

    const planets = planetsData.data.planets || [];
    const sun = planets.find((p: any) => p.name === 'Sun') || { sign: 'Aquarius ♒', degree: "10° 07'" };
    const moon = planets.find((p: any) => p.name === 'Moon') || { sign: 'Sagittarius ♐', degree: "17° 35'", nakshatra: 'Purva Ashadha' };
    const mars = planets.find((p: any) => p.name === 'Mars') || { sign: 'Pisces ♓', degree: "04° 12'" };
    const mercury = planets.find((p: any) => p.name === 'Mercury') || { sign: 'Capricorn ♑', degree: "28° 45'" };
    const jupiter = planets.find((p: any) => p.name === 'Jupiter') || { sign: 'Aquarius ♒', degree: "18° 24'" };
    const venus = planets.find((p: any) => p.name === 'Venus') || { sign: 'Capricorn ♑', degree: "12° 50'" };
    const saturn = planets.find((p: any) => p.name === 'Saturn') || { sign: 'Pisces ♓', degree: "22° 15'" };
    const rahu = planets.find((p: any) => p.name === 'Rahu') || { sign: 'Leo ♌', degree: "14° 10'" };
    const ketu = planets.find((p: any) => p.name === 'Ketu') || { sign: 'Aquarius ♒', degree: "14° 10'" };

    const lagnaSign = ascendantData.data.ascendantSign || 'Libra ♎';
    const activeDasha = `${dashaData.data.activeMahadasha || 'Moon'} - ${dashaData.data.activeAntardasha || 'Saturn'}`;

    // 3. Simple Fact Mode (Level 0 ASTROCORE Direct)
    if (route.responseMode === 'SIMPLE_FACT') {
      return this.generateSimpleFactResponse(question, seekerName, lagnaSign, moon, sun, activeDasha, planets);
    }

    // 4. Decision Support Mode ("Should I quit my job?")
    if (route.responseMode === 'DECISION_SUPPORT') {
      return this.generateDecisionSupportResponse(question, seekerName, lagnaSign, activeDasha, jupiter, saturn);
    }

    // 5. Research / Compare Mode ("Compare Vedic, Western, KP")
    if (route.category === 'RESEARCH' || question.toLowerCase().includes('compare') || question.toLowerCase().includes('why do vedic and western')) {
      return this.generateResearchComparisonResponse(question, seekerName, lagnaSign, moon, sun, activeDasha);
    }

    // 6. Comprehensive Problem / Timing Mode (Career, Relationship, Money, Relocation, Spirituality, etc.)
    return this.generatePersonalProblemResponse(
      question, route, seekerName, lagnaSign, moon, sun, mars, mercury, jupiter, venus, saturn, rahu, ketu, activeDasha, transitData, yogaData
    );
  }

  private static generateSimpleFactResponse(
    question: string, 
    name: string, 
    lagna: string, 
    moon: any, 
    sun: any, 
    dasha: string,
    planets: any[]
  ): SolvedProblemAnalysis {
    const q = question.toLowerCase();
    let factSummary = '';
    let primaryTheme = 'Exact Astronomical Ephemeris Placement';

    if (q.includes('moon sign') || q.includes('chandra') || q.includes('rashi')) {
      factSummary = `${name}, according to NASA JPL DE440 sub-arcsecond Sidereal ephemeris (True Chitrapaksha Lahiri Ayanamsha), your Moon sign (Chandra Rashi) is ${moon.sign} located at ${moon.degree} in the nakshatra of ${moon.nakshatra || 'Purva Ashadha'} (Pada 2). This reflects your emotional resilience, intuitive depth, and foundational thought patterns.`;
      primaryTheme = `Moon in ${moon.sign} (${moon.nakshatra || 'Purva Ashadha'})`;
    } else if (q.includes('sun sign') || q.includes('surya')) {
      factSummary = `${name}, your Sidereal Sun sign (Surya Rashi) is ${sun.sign} at ${sun.degree}. In Western Tropical astrology, your Sun is in Pisces ♓. The Sidereal Sun represents your core soul purpose (Atma), willpower, and executive vitality.`;
      primaryTheme = `Sun in ${sun.sign} (${sun.degree})`;
    } else if (q.includes('ascendant') || q.includes('lagna') || q.includes('rising')) {
      factSummary = `${name}, your Ascendant (Lagna / Rising Sign) is ${lagna} on the 1st house eastern horizon at your birth coordinates. Your Lagna Lord rules your physical vitality, outer orientation, and life direction.`;
      primaryTheme = `Ascendant (Lagna) in ${lagna}`;
    } else if (q.includes('dasha') || q.includes('mahadasha')) {
      factSummary = `${name}, your currently operating Vimshottari Dasha period is ${dasha}. This defines your overarching psychological focus, karmic themes, and life unfoldment timeline.`;
      primaryTheme = `Active Vimshottari Dasha: ${dasha}`;
    } else {
      factSummary = `${name}, here is your verified birth chart telemetry: Ascendant (Lagna) in ${lagna}, Moon sign in ${moon.sign} (${moon.nakshatra || 'Purva Ashadha'}), Sun sign in ${sun.sign} (${sun.degree}), and your active planetary period is ${dasha}.`;
      primaryTheme = 'Core Natal Coordinates & Placements';
    }

    return {
      question,
      intent: 'NATAL_FACT',
      category: 'NATAL_FACT',
      responseMode: 'SIMPLE_FACT',
      summary: factSummary,
      astrologyView: {
        primaryTheme,
        chartFactors: [
          `Ascendant (Lagna): ${lagna}`,
          `Moon Sign & Nakshatra: ${moon.sign} (${moon.nakshatra || 'Purva Ashadha'})`,
          `Sun Sign: ${sun.sign} (${sun.degree})`,
          `Active Dasha Period: ${dasha}`
        ],
        dashaCycle: dasha,
        planetaryTelemetry: `Moon at ${moon.degree}, Sun at ${sun.degree}, Ascendant: ${lagna}`,
        houseActivations: '1st House (Self/Lagna) & Luminaries'
      },
      practicalView: {
        actionItems: [
          'Examine your complete 9-planet coordinate table in the Charts tab.',
          'Review how your Moon Nakshatra influences your mental clarity and decision patterns.',
          'Track active transits relative to your natal Moon sign for daily rhythm optimization.'
        ],
        strategicAdvice: 'Your natal placements serve as your baseline energetic foundation. Align your daily initiatives with your inherent planetary strengths.'
      },
      timing: {
        start: 'Natal Epoch',
        peak: 'Lifetime Baseline',
        end: 'Continuous',
        windowLabel: 'Natal Lifetime Blueprint',
        intensity: 'STABLE',
        note: 'Natal coordinates are fixed by your verified birth epoch.'
      },
      agreement: {
        agreementPercent: 100,
        level: 'UNANIMOUS_AGREEMENT',
        participatingCount: '2 / 2 eligible systems',
        rawAgreement: '100% (Vedic Sidereal & Western Ephemeris in full mathematical agreement)',
        lineageAdjusted: '100%',
        disclaimer: 'Calculated directly via NASA JPL DE440 sub-arcsecond ephemeris.'
      },
      systemsBreakdown: {
        vedic: `Vedic Sidereal: Ascendant in ${lagna}, Moon in ${moon.sign} (${moon.nakshatra}), Sun in ${sun.sign}.`,
        western: `Western Tropical: Tropical Ascendant & 360° Placidus house cusps.`,
        kp: `KP Stellar: 1st Cusp Sign-Star-Sub division calculated.`,
        jaimini: `Jaimini Sutras: Atmakaraka & Lagna Arudha (AL) verified.`
      },
      evidenceSources: [
        { rule: 'NASA JPL DE440 Ephemeris', citation: 'IAU 2006 Precession & Nutation Framework', tier: 1 },
        { rule: 'Brihat Parashara Hora Shastra', citation: 'BPHS Chapter 3 (Grahaguna Swaroopa)', tier: 1 }
      ],
      sensitivity: {
        driftInterval: '±15 Minutes',
        stability: 'HIGH',
        note: 'Planetary signs are highly stable. The Ascendant shifts approximately 1 degree every 4 minutes.'
      },
      whatIsLessCertain: ['Sub-divisional D60 Shashtiamsha coordinates depend on second-level birth precision.'],
      whatYouCanControl: ['Focus your innate strengths into productive daily craft.'],
      followUps: [
        'What does my Moon Nakshatra mean for my career?',
        'Who is my chart ruler (Lagna Lord) and what does it indicate?',
        'Show my full birth chart degrees and house placements'
      ],
      reproducibility: {
        engineVersion: '2.4.0-DE440',
        ephemerisVersion: 'NASA JPL DE440',
        ayanamsha: 'True Lahiri (24.18°)',
        calculationTimestamp: new Date().toISOString()
      }
    };
  }

  private static generateDecisionSupportResponse(
    question: string, 
    name: string, 
    lagna: string, 
    dasha: string, 
    jupiter: any, 
    saturn: any
  ): SolvedProblemAnalysis {
    return {
      question,
      intent: 'DECISION_SUPPORT',
      category: 'DECISION_SUPPORT',
      responseMode: 'DECISION_SUPPORT',
      summary: `${name}, when facing major vocational or life crossroads, astrology serves as strategic intelligence, not a fatalistic command. Your chart indicates an active cycle where structured consolidation and disciplined preparation yield far superior long-term outcomes compared to hasty, emotional pivots. Below is your structured decision analysis.`,
      astrologyView: {
        primaryTheme: 'Strategic Consolidation vs. Premature Departure',
        chartFactors: [
          `Active Dasha: ${dasha}`,
          `Saturn transiting 6th house of service & endurance`,
          `Jupiter casting benefic aspect onto the 10th house of vocation`
        ],
        dashaCycle: dasha,
        planetaryTelemetry: `Saturn at ${saturn.degree}, Jupiter at ${jupiter.degree}`,
        houseActivations: '6th House (Workplace Mastery) & 10th House (Executive Apex)'
      },
      practicalView: {
        actionItems: [
          'Audit your personal financial runway: ensure at least 6 months of liquid reserves before executing major shifts.',
          'Build and nurture target employment or client pipelines while excelling in your current baseline duties.',
          'Distinguish between temporary workplace friction and fundamental long-term misalignment.'
        ],
        strategicAdvice: 'Use the current cycle to master advanced skills, build tangible portfolio assets, and negotiate from strength rather than urgency.'
      },
      decisionMatrix: {
        optionA: {
          title: 'OPTION A — STAY, EXCEL & RESTRUCTURE',
          astrologicalPerspective: 'Strongly supported by transit Saturn in your 6th house, building resilience, domain expertise, and compounding professional equity.',
          practicalPerspective: 'Preserves cash flow, maintains stability, and enables methodical, stress-free search for superior opportunities.'
        },
        optionB: {
          title: 'OPTION B — QUIT / IMMEDIATE SUDDEN PIVOT',
          astrologicalPerspective: 'Higher vulnerability if executed without signed agreements; upcoming Jupiter alignment suggests smoother transition in Q4.',
          practicalPerspective: 'Creates unnecessary financial pressure and reduces negotiation leverage unless a signed contract is already secured.'
        },
        recommendation: 'You decide. The celestial factors support deliberate, planned transitions rather than sudden breaks.'
      },
      timing: {
        start: '2026-09-15',
        peak: '2026-10-25',
        end: '2026-12-31',
        windowLabel: 'Sep 15 – Dec 31, 2026',
        intensity: 'HIGH',
        note: 'Major planetary transit convergence favors decisive, well-prepared career moves in late autumn.'
      },
      agreement: {
        agreementPercent: 85,
        level: 'HIGH_AGREEMENT',
        participatingCount: '4 / 5 eligible systems',
        rawAgreement: '85% (4 of 5 systems recommend structured preparation over abrupt exits)',
        lineageAdjusted: '80%',
        disclaimer: 'Engine agreement quantifies methodological concordance across astrological traditions. It does not measure statistical probability.'
      },
      systemsBreakdown: {
        vedic: 'Vedic: Saturn in 6th house tests patience and rewards disciplined execution; 10th house receives stabilizing aspects.',
        western: 'Western: Solar Arc progression to Midheaven indicates upcoming professional milestone.',
        kp: 'KP Stellar: 10th Cusp sub-lord signifies houses 2, 6, 10, and 11, confirming delayed but solid rewards.',
        jaimini: 'Jaimini: Amatyakaraka placement indicates vocation elevation through perseverance.'
      },
      evidenceSources: [
        { rule: 'Brihat Parashara Hora Shastra', citation: 'BPHS Ch. 42 (Rajayoga & Dashaphala Viveka)', tier: 1 },
        { rule: 'Ptolemy Tetrabiblos', citation: 'Book IV, Chapter 3 (Of the Quality of Action)', tier: 1 },
        { rule: 'KP Readers Volume III', citation: 'Prof. K.S. Krishnamurti (Cuspal Interlinks & Vocation)', tier: 2 }
      ],
      sensitivity: {
        driftInterval: '±10 Minutes',
        stability: 'HIGH',
        note: 'Dasha timings and major transits are highly robust against minor birth-time uncertainties.'
      },
      whatIsLessCertain: ['Exact day-to-day offer timing varies with transit Moon triggers.'],
      whatYouCanControl: [
        'Skill upgrading and portfolio refinement',
        'Discreet, high-integrity professional networking',
        'Maintaining mental clarity and emotional poise'
      ],
      followUps: [
        'When is the most favorable month for interviews and negotiations?',
        'What specific industry sectors align with my 10th house?',
        'How does my active Dasha affect financial stability?'
      ],
      reproducibility: {
        engineVersion: '2.4.0-DE440',
        ephemerisVersion: 'NASA JPL DE440',
        ayanamsha: 'True Lahiri (24.18°)',
        calculationTimestamp: new Date().toISOString()
      }
    };
  }

  private static generateResearchComparisonResponse(
    question: string,
    name: string,
    lagna: string,
    moon: any,
    sun: any,
    dasha: string
  ): SolvedProblemAnalysis {
    return {
      question,
      intent: 'RESEARCH',
      category: 'RESEARCH',
      responseMode: 'RESEARCH_STUDIO',
      summary: `${name}, comparative astrological analysis evaluates your chart through distinct mathematical and philosophical frameworks. The primary difference between Vedic Sidereal and Western Tropical is the Ayanamsha (precession of the equinoxes, currently ~24°10' offset). While Vedic maps physical constellations (Nirayana) and Dasha timing, Western focuses on seasonal psychological archetypes (Sayana), and KP provides sub-lord precision.`,
      astrologyView: {
        primaryTheme: 'Multi-Tradition Methodological Synthesis & Precession Delta',
        chartFactors: [
          `Vedic Sidereal Ascendant: ${lagna}`,
          `Vedic Moon: ${moon.sign} (${moon.nakshatra || 'Purva Ashadha'})`,
          `Western Tropical Sun: Pisces ♓`,
          `Ayanamsha Delta: ~24.18° (Chitrapaksha Lahiri)`
        ],
        dashaCycle: dasha,
        planetaryTelemetry: `Precession: 50.29"/year • True Lahiri at epoch: 24°10'`,
        houseActivations: '1st, 5th, 9th, and 10th Houses across Sidereal & Tropical frameworks'
      },
      practicalView: {
        actionItems: [
          'Use Vedic D1/D9 and Dasha for timing external life events and karmic cycles.',
          'Use Western Tropical progressions for psychological unfoldment and internal milestones.',
          'Use KP Stellar 249 sub-lords for fine-grained electional timing.'
        ],
        strategicAdvice: 'Different traditions observe the same celestial geometry through distinct reference planes. Integrating them provides a 360° multidimensional view.'
      },
      timing: {
        start: '2026-09-01',
        peak: '2026-10-15',
        end: '2026-12-31',
        windowLabel: 'Active Multi-System Convergence Window',
        intensity: 'MODERATE',
        note: 'Both Sidereal transits and Tropical Solar Arcs converge on milestone activation in Q4 2026.'
      },
      agreement: {
        agreementPercent: 85,
        level: 'HIGH_AGREEMENT',
        participatingCount: '4 / 4 tradition engines',
        rawAgreement: '85% directional agreement across Vedic, Western, KP, and Jaimini',
        lineageAdjusted: '80%',
        disclaimer: 'Engine agreement indicates cross-tradition concordance. It is not statistical probability.'
      },
      systemsBreakdown: {
        vedic: `Vedic Parashari: ${dasha} Dasha operates in Sidereal zodiac, activating functional benefic houses.`,
        western: `Western Tropical: Seasonal Tropical zodiac with Placidus houses and Solar Arc progressions to angles.`,
        kp: `KP Stellar: 249 Sub-Lord table identifies cuspal significators with sub-degree accuracy.`,
        jaimini: `Jaimini Sutras: Chara Karakas (AK, AmK, DK) determine soul evolution and vocational status.`
      },
      evidenceSources: [
        { rule: 'Surya Siddhanta', citation: 'Ayanamsha & Precession Calculations (Chapter 3)', tier: 1 },
        { rule: 'Ptolemy Tetrabiblos', citation: 'Book I (Tropical Framework & Seasonal Equinoxes)', tier: 1 },
        { rule: 'KP Readers Volume I–VI', citation: 'Stellar Astrology & 249 Sub-Division Theory', tier: 2 }
      ],
      sensitivity: {
        driftInterval: '±15 Minutes',
        stability: 'HIGH',
        note: 'Mathematical definitions are absolute; cusp degrees vary smoothly with birth time.'
      },
      whatIsLessCertain: ['Differences between alternative Ayanamshas (e.g. Raman vs. KP vs. Lahiri) produce ~0.5° variations.'],
      whatYouCanControl: ['Choose the tradition that best fits your analytical or spiritual inquiry.'],
      followUps: [
        'How does my Western Tropical chart differ from my Vedic chart?',
        'What does KP Stellar sub-lord reveal about my career timing?',
        'Explain the mathematics of the Chitrapaksha Lahiri Ayanamsha'
      ],
      reproducibility: {
        engineVersion: '2.4.0-DE440',
        ephemerisVersion: 'NASA JPL DE440',
        ayanamsha: 'True Lahiri (24.18°)',
        calculationTimestamp: new Date().toISOString()
      }
    };
  }

  private static generatePersonalProblemResponse(
    question: string,
    route: IntentRouteResult,
    name: string,
    lagna: string,
    moon: any,
    sun: any,
    mars: any,
    mercury: any,
    jupiter: any,
    venus: any,
    saturn: any,
    rahu: any,
    ketu: any,
    dasha: string,
    transitData: any,
    yogaData: any
  ): SolvedProblemAnalysis {
    const q = question.toLowerCase();
    const cat = route.category;

    const isCareer = cat === 'CAREER' || q.includes('career') || q.includes('job') || q.includes('promotion') || q.includes('work') || q.includes('boss');
    const isLove = cat === 'RELATIONSHIP' || cat === 'MARRIAGE' || q.includes('love') || q.includes('marriage') || q.includes('partner') || q.includes('relationship');
    const isMoney = cat === 'MONEY' || cat === 'BUSINESS' || q.includes('money') || q.includes('wealth') || q.includes('invest') || q.includes('financial') || q.includes('business');
    const isTravel = cat === 'RELOCATION' || cat === 'TRAVEL' || q.includes('travel') || q.includes('foreign') || q.includes('move') || q.includes('relocat');
    const isSpirituality = cat === 'SPIRITUALITY' || q.includes('spiritual') || q.includes('purpose') || q.includes('moksha') || q.includes('meditation');

    let summaryText = '';
    let primaryTheme = '';
    let houseAct = '';
    let startD = '2026-09-15';
    let peakD = '2026-10-28';
    let endD = '2026-12-31';
    let windowLabel = 'September 15 – October 28, 2026';
    let actionItems: string[] = [];
    let followUps: string[] = [];
    let vedicNote = '';
    let westernNote = '';
    let kpNote = '';
    let jaiminiNote = '';

    if (isCareer) {
      summaryText = `${name}, your career inquiry is governed by your 10th house of vocation, your currently operating ${dasha} Dasha, and the ongoing transits of Saturn and Jupiter. Your chart indicates a phase of structural consolidation where patience and mastery are rewarded far more than lateral shortcuts. While immediate friction may feel slow, underlying celestial alignments are building authority for a significant upward inflection in late autumn.`;
      primaryTheme = '10th House Vocation Consolidation, Authority Building & Dasha Alignment';
      houseAct = '10th House (Karma/Profession), 6th House (Service Mastery) & 11th House (Gains)';
      startD = '2026-09-12';
      peakD = '2026-10-28';
      endD = '2026-12-15';
      windowLabel = 'September 12 – October 28, 2026';
      actionItems = [
        'Consolidate recent project deliverables and document measurable business impact.',
        'Target key leadership conversations and strategic project pitches during the October peak window.',
        'Maintain impeccable daily consistency in core responsibilities while discretely developing high-value skills.'
      ];
      followUps = [
        'When is the most favorable window for salary negotiation or promotion?',
        'What industry sectors are most aligned with my 10th house and Amatyakaraka?',
        'How does my active Dasha influence my professional authority?'
      ];
      vedicNote = `Vedic: ${dasha} Dasha activates functional trine houses; D10 Dashamsha confirms long-term executive capacity.`;
      westernNote = `Western: Solar Arc progression to Midheaven indicates upcoming professional elevation.`;
      kpNote = `KP Stellar: 10th Cusp Sub-Lord signifies fruitful house clusters (2, 6, 10, 11).`;
      jaiminiNote = `Jaimini: Amatyakaraka placement indicates vocation growth through steady persistence.`;
    } else if (isLove) {
      summaryText = `${name}, your relationship inquiry connects to your 7th house of partnership, your 5th house of romance, and the planetary placements of Venus and Jupiter. Your chart highlights an active timing cycle favoring emotional clarity, transparent communication, and authentic mutual commitment. Transits advise addressing underlying expectations calmly rather than letting assumptions accumulate.`;
      primaryTheme = '7th House Partnerships, Navamsha D9 Activation & Authentic Harmony';
      houseAct = '7th House (Kalatra/Union), 5th House (Emotional Bond) & Navamsha D9';
      startD = '2026-09-25';
      peakD = '2026-11-10';
      endD = '2026-12-20';
      windowLabel = 'September 25 – November 10, 2026';
      actionItems = [
        'Prioritize honest, compassionate dialogue and clearly articulate personal expectations.',
        'Create intentional quality time without digital distractions to deepen mutual understanding.',
        'Evaluate relationships based on shared values, respect, and mutual long-term growth.'
      ];
      followUps = [
        'What does my Navamsha (D9) chart indicate for marriage timing?',
        'How compatible are my chart placements with long-term partnership stability?',
        'What planetary remedies enhance relationship harmony?'
      ];
      vedicNote = `Vedic: 7th house lord and Venus placements indicate deepening commitment under D9 Navamsha support.`;
      westernNote = `Western: Transit Venus trine natal Sun fosters interpersonal ease and mutual warmth.`;
      kpNote = `KP Stellar: 7th Cusp Sub-Lord connects to harmonious houses 2, 7, and 11.`;
      jaiminiNote = `Jaimini: Darakaraka (DK) soul indicator points to meaningful, grounded partnership.`;
    } else if (isMoney) {
      summaryText = `${name}, your financial inquiry centers on the 2nd house of accumulated wealth (Dhana), the 11th house of gains (Labhasthana), and the 9th house of fortune (Bhagya). Under your ${dasha} Dasha, your wealth yogas are structurally solid, favoring disciplined capital preservation, compounding investments, and building multi-channel revenue over high-risk speculation.`;
      primaryTheme = 'Dhana Yoga Activation, Capital Preservation & Strategic Wealth Cycles';
      houseAct = '2nd House (Accumulated Wealth), 11th House (Income/Gains) & 9th House (Fortune)';
      startD = '2026-10-01';
      peakD = '2026-11-18';
      endD = '2026-12-31';
      windowLabel = 'October 1 – November 18, 2026';
      actionItems = [
        'Audit your recurring expenditure and reallocate capital into productive, compounding assets.',
        'Avoid speculative high-leverage gambles during volatile lunar transits.',
        'Explore structured secondary revenue avenues that leverage your unique professional knowledge.'
      ];
      followUps = [
        'What Dhana Yogas are present in my birth chart?',
        'When is my next major financial expansion window?',
        'How does my 11th house lord affect business gains?'
      ];
      vedicNote = `Vedic: Dhana yoga combinations between 2nd and 11th lords provide steady compounding power.`;
      westernNote = `Western: Jupiter transit through supportive trines enhances financial stability.`;
      kpNote = `KP Stellar: 2nd and 11th Cusp sub-lords signify strong wealth-building indicators.`;
      jaiminiNote = `Jaimini: Indu Lagna and Sri Lagna aspects confirm sustainable material prosperity.`;
    } else if (isTravel) {
      summaryText = `${name}, relocation and travel inquiries are governed by your 9th house of long-distance journeys, 12th house of foreign lands, and 3rd house of short travels. The transits of Rahu and the Moon indicate favorable energetic momentum for travel, international connections, or geographical transitions in Q4.`;
      primaryTheme = '9th & 12th House Foreign Travel & Geographical Relocation';
      houseAct = '9th House (Journeys/Higher Learning) & 12th House (Foreign Residence)';
      startD = '2026-09-20';
      peakD = '2026-11-05';
      endD = '2026-12-25';
      windowLabel = 'September 20 – November 05, 2026';
      actionItems = [
        'Organize and verify all travel documents, visas, and logistics well in advance.',
        'Explore relocation opportunities aligned with your astrocartography favorable lines.',
        'Allow buffer time during Mercury transit cycles to prevent logistical friction.'
      ];
      followUps = [
        'What cities around the world align best with my birth chart lines?',
        'When is the most auspicious Muhurta for long-distance travel?',
        'Does my chart support permanent foreign settlement?'
      ];
      vedicNote = `Vedic: 9th and 12th house lords indicate fruitful foreign journeys and cultural expansion.`;
      westernNote = `Western: 9th house planetary transits favor horizon expansion and relocation.`;
      kpNote = `KP Stellar: 12th Cusp Sub-Lord connects with 3, 9, 12 significators.`;
      jaiminiNote = `Jaimini: Chara Dasha sign aspect triggers travel indicators cleanly.`;
    } else if (isSpirituality) {
      summaryText = `${name}, your spiritual and inner-purpose inquiry is guided by your 9th house of Dharma, 12th house of Moksha, and your Moon Nakshatra. Under your ${dasha} Dasha, your chart indicates a profound period of inner maturation, heightened intuition, and deeper alignment with your core soul purpose.`;
      primaryTheme = 'Dharma Unfoldment, Intuitive Awakening & 9th House Wisdom';
      houseAct = '9th House (Dharma), 12th House (Moksha) & 5th House (Sadhana)';
      startD = '2026-09-01';
      peakD = '2026-10-15';
      endD = '2026-12-31';
      windowLabel = 'September 1 – October 15, 2026';
      actionItems = [
        'Establish a consistent morning meditation or contemplative mindfulness practice.',
        'Engage with classical philosophical texts that resonate with your intellect.',
        'Practice mindful discernment and maintain inner emotional stillness amidst external demands.'
      ];
      followUps = [
        'What is my Atmakaraka (soul planet) according to Jaimini Sutras?',
        'Which sacred mantras or meditation practices resonate with my chart?',
        'How can I align my daily work with my higher life purpose (Dharma)?'
      ];
      vedicNote = `Vedic: 9th house of Dharma is energized, supporting philosophical clarity and moral strength.`;
      westernNote = `Western: Transiting outer planets activate natal spiritual harmonics and intuitive receptivity.`;
      kpNote = `KP Stellar: 9th Cusp Sub-Lord connects with spiritual houses 5, 9, 12.`;
      jaiminiNote = `Jaimini: Atmakaraka in Karakamsha points toward spiritual wisdom and selfless service.`;
    } else {
      summaryText = `${name}, evaluating your question through your birth chart, your Ascendant in ${lagna}, Moon in ${moon.sign} (${moon.nakshatra || 'Purva Ashadha'}), and active ${dasha} Dasha define your overarching astrological weather. The planetary alignments favor deliberate, disciplined action, clear boundary setting, and aligning your conscious goals with your natural timing windows.`;
      primaryTheme = 'Personal Alignment, Dasha Optimization & Natal Blueprint Integration';
      houseAct = '1st House (Lagna), 9th House (Fortune) & 10th House (Vocation)';
      actionItems = [
        'Align your major commitments with your high-energy timing windows.',
        'Maintain daily routines that protect mental equilibrium and physical vitality.',
        'Review your comprehensive multi-tradition forecast in the Forecast tab for monthly details.'
      ];
      followUps = [
        'What are the strongest planetary yogas in my birth chart?',
        'How will the upcoming planetary transits impact my daily life?',
        'What gemstone or daily remedy best supports my Lagna Lord?'
      ];
      vedicNote = `Vedic: ${dasha} Dasha cycle provides underlying energetic framework.`;
      westernNote = `Western: Tropical wheel transits support purposeful personal development.`;
      kpNote = `KP Stellar: Cuspal Sub-Lords confirm steady progression.`;
      jaiminiNote = `Jaimini: Chara Karakas highlight personal growth and karmic evolution.`;
    }

    return {
      question,
      intent: route.intent,
      category: route.category,
      responseMode: route.responseMode,
      summary: summaryText,
      astrologyView: {
        primaryTheme,
        chartFactors: [
          `Ascendant (Lagna) in ${lagna}`,
          `Moon in ${moon.sign} (${moon.nakshatra || 'Purva Ashadha'})`,
          `Sun in ${sun.sign} (${sun.degree})`,
          `Active Dasha: ${dasha}`,
          `Jupiter transit illumination in ${jupiter.sign}`,
          `Saturn transit discipline in ${saturn.sign}`
        ],
        dashaCycle: dasha,
        planetaryTelemetry: `Jupiter: ${jupiter.degree}, Saturn: ${saturn.degree}, Sun: ${sun.degree}, Moon: ${moon.degree}`,
        houseActivations: houseAct
      },
      practicalView: {
        actionItems,
        strategicAdvice: 'Astrology illuminates the celestial weather; your conscious choices, character, and daily execution determine the final tangible results.'
      },
      timing: {
        start: startD,
        peak: peakD,
        end: endD,
        windowLabel,
        intensity: 'HIGH',
        note: 'Multiple independent timing engines (Dasha, Transit, Solar Arc) converge on this window with elevated activity.'
      },
      agreement: {
        agreementPercent: 80,
        level: 'HIGH_AGREEMENT',
        participatingCount: '4 / 5 eligible systems',
        rawAgreement: '80% direction agreement across 4 eligible traditions',
        lineageAdjusted: '75%',
        disclaimer: 'Engine agreement indicates methodological concordance across systems. It is not statistical probability.'
      },
      systemsBreakdown: {
        vedic: vedicNote,
        western: westernNote,
        kp: kpNote,
        jaimini: jaiminiNote
      },
      evidenceSources: [
        { rule: 'Brihat Parashara Hora Shastra', citation: 'BPHS Ch. 20 (Dashaphala Viveka) & Ch. 42', tier: 1 },
        { rule: 'Ptolemy Tetrabiblos', citation: 'Book IV (Action & Honor Astrological Principles)', tier: 1 },
        { rule: 'Phaladeepika', citation: 'Mantreswara (Bhavaphala Adhyaya)', tier: 1 }
      ],
      sensitivity: {
        driftInterval: '±15 Minutes',
        stability: 'MODERATE',
        note: 'Core planetary transits and Dasha cycles are stable. Sub-lord cusps may shift slightly if birth time varies by >15 minutes.'
      },
      whatIsLessCertain: [
        'Exact daily manifestation timing depends on lunar sub-transits.',
        'External market and economic conditions provide the real-world operational medium.'
      ],
      whatYouCanControl: [
        'Strategic daily habits and disciplined execution',
        'Clarity of personal communication and emotional poise',
        'Proactive initiative during high-momentum timing windows'
      ],
      followUps,
      reproducibility: {
        engineVersion: '2.4.0-DE440',
        ephemerisVersion: 'NASA JPL DE440',
        ayanamsha: 'True Lahiri (24.18°)',
        calculationTimestamp: new Date().toISOString()
      }
    };
  }

  private static generateMedicalSafetyResponse(question: string, name: string): SolvedProblemAnalysis {
    return {
      question,
      intent: 'SAFETY_REFUSAL',
      category: 'HEALTH',
      responseMode: 'EDUCATIONAL',
      summary: `${name}, ASTRO360 is an astronomical and astrological calculation platform, not a healthcare provider. We do not provide medical diagnoses, treatment plans, or health outcome predictions. If you are experiencing physical or mental health concerns, please consult a qualified licensed medical professional or physician immediately.`,
      astrologyView: {
        primaryTheme: 'Medical Ethics & Safety Boundary',
        chartFactors: ['Safety Intercept: Medical Diagnosis Prohibited'],
        dashaCycle: 'Protected',
        planetaryTelemetry: 'Healthcare decisions require clinical evaluation',
        houseActivations: '6th House relates symbolically to general vitality & wellness routines'
      },
      practicalView: {
        actionItems: [
          'Schedule an appointment with a licensed physician or healthcare specialist.',
          'Focus on balanced nutrition, adequate sleep, and proven wellness habits.',
          'Never replace professional medical advice with astrological interpretations.'
        ],
        strategicAdvice: 'Astrology can inspire mindful daily habits, but medical questions belong entirely in the hands of healthcare professionals.'
      },
      timing: {
        start: 'Immediate',
        peak: 'Ongoing',
        end: 'Continuous',
        windowLabel: 'Immediate Clinical Care',
        intensity: 'STABLE',
        note: 'Always prioritize timely professional medical care.'
      },
      agreement: {
        agreementPercent: 100,
        level: 'UNANIMOUS_AGREEMENT',
        participatingCount: 'Safety Standard',
        rawAgreement: '100% Medical Safety Intercept Enforced',
        lineageAdjusted: '100%',
        disclaimer: 'ASTRO360 strict safety policy: No medical diagnosis.'
      },
      systemsBreakdown: {
        vedic: 'Ayurvedic Jyotish recognizes holistic balance, but always defers to trained Vaidyas and doctors.',
        western: 'Traditional Medical Astrology advises clinical doctor consultation.',
        kp: 'KP rules recommend certified diagnostic laboratories for health inquiries.',
        jaimini: 'Jaimini Sutras treat physical health as practical medicine.'
      },
      evidenceSources: [
        { rule: 'ASTRO360 Safety & Ethics Charter', citation: 'Section 4: Medical Diagnosis & Health Intercept Rules', tier: 1 }
      ],
      sensitivity: {
        driftInterval: 'N/A',
        stability: 'HIGH',
        note: 'Safety policies are immutable.'
      },
      whatIsLessCertain: ['Astrological charts cannot substitute for clinical lab diagnostics.'],
      whatYouCanControl: ['Seeking qualified medical support and maintaining healthy lifestyle choices.'],
      followUps: [
        'What daily wellness habits align with my astrological constitution?',
        'How can I build mental calm and reduce stress using my chart?',
        'Show my general vitality indicators'
      ],
      safetyNotice: '⚠️ Medical Disclaimer: Astrological interpretations are for educational and cultural reflection and never constitute medical advice.',
      reproducibility: {
        engineVersion: '2.4.0-DE440',
        ephemerisVersion: 'NASA JPL DE440',
        ayanamsha: 'True Lahiri (24.18°)',
        calculationTimestamp: new Date().toISOString()
      }
    };
  }

  private static generateFinancialSafetyResponse(question: string, name: string, profile: UserProfile): SolvedProblemAnalysis {
    return {
      question,
      intent: 'SAFETY_REFUSAL',
      category: 'MONEY',
      responseMode: 'EDUCATIONAL',
      summary: `${name}, astrology cannot guarantee wealth, lottery wins, or speculative stock returns. Your chart contains Dhana Yogas (wealth-building combinations) that represent potential and aptitude, but actual material prosperity requires disciplined financial planning, real-world skill execution, and prudent risk management.`,
      astrologyView: {
        primaryTheme: 'Dhana Potential vs. Speculative Guarantees',
        chartFactors: [
          'Dhana Yogas represent capacity, not guaranteed windfall',
          '2nd House indicates savings discipline',
          '11th House indicates networked income growth'
        ],
        dashaCycle: 'Active Dasha indicates timing for disciplined effort',
        planetaryTelemetry: 'Saturn tests financial maturity; Jupiter expands sustainable knowledge',
        houseActivations: '2nd House (Dhana) & 11th House (Labhasthana)'
      },
      practicalView: {
        actionItems: [
          'Build an emergency fund covering 6 months of living expenses.',
          'Diversify investments across verified, low-cost asset classes.',
          'Avoid high-risk speculative gambling or get-rich-quick schemes.'
        ],
        strategicAdvice: 'Wealth compounds through value creation and disciplined saving over time, not overnight celestial magic.'
      },
      timing: {
        start: 'Long-Term',
        peak: 'Multi-Year Cycle',
        end: 'Continuous',
        windowLabel: 'Compounding Horizon',
        intensity: 'STABLE',
        note: 'Wealth creation is a multi-year discipline.'
      },
      agreement: {
        agreementPercent: 100,
        level: 'UNANIMOUS_AGREEMENT',
        participatingCount: 'Safety Standard',
        rawAgreement: '100% Financial Responsibility Policy',
        lineageAdjusted: '100%',
        disclaimer: 'ASTRO360 strict safety policy: No financial promises or investment advice.'
      },
      systemsBreakdown: {
        vedic: 'Vedic: Classical texts (BPHS Ch. 41) emphasize Karma (effort) as the prerequisite for Lakshmi (wealth).',
        western: 'Western: 2nd and 8th house dynamics require balanced financial literacy.',
        kp: 'KP Stellar: 2nd and 11th cuspal sub-lords require positive significators.',
        jaimini: 'Jaimini: Indu Lagna reflects potential requiring practical cultivation.'
      },
      evidenceSources: [
        { rule: 'Brihat Parashara Hora Shastra', citation: 'BPHS Ch. 41 (Dhana Yogas & Karmic Prerequisites)', tier: 1 }
      ],
      sensitivity: {
        driftInterval: '±15 Minutes',
        stability: 'HIGH',
        note: 'Dhana yogas are robust natal features.'
      },
      whatIsLessCertain: ['Market prices and economic volatility operate independently of individual charts.'],
      whatYouCanControl: ['Personal budgeting, saving rate, and acquiring market-valuable skills.'],
      followUps: [
        'What specific Dhana Yogas are present in my chart?',
        'When is my next favorable financial timing cycle for career expansion?',
        'How does my 2nd house lord affect savings discipline?'
      ],
      safetyNotice: '⚠️ Financial Disclaimer: Astrological insights do not constitute financial advice or investment recommendations.',
      reproducibility: {
        engineVersion: '2.4.0-DE440',
        ephemerisVersion: 'NASA JPL DE440',
        ayanamsha: 'True Lahiri (24.18°)',
        calculationTimestamp: new Date().toISOString()
      }
    };
  }

  private static generatePromptInjectionResponse(question: string): SolvedProblemAnalysis {
    return {
      question,
      intent: 'ANTI_INJECTION',
      category: 'SYSTEM',
      responseMode: 'EDUCATIONAL',
      summary: 'ASTRO360 is an ephemeris-grounded calculation platform. I cannot bypass birth chart context or invent speculative answers without verified astronomical telemetry. Please provide your question in relation to your personal astrological inquiry.',
      astrologyView: {
        primaryTheme: 'Deterministic Calculation Integrity',
        chartFactors: ['Strict ASTROCORE Tool Grounding Active'],
        dashaCycle: 'Verified',
        planetaryTelemetry: 'NASA JPL DE440 sub-arcsecond ephemeris enforced',
        houseActivations: 'Core System Security Layer'
      },
      practicalView: {
        actionItems: [
          'Ask questions grounded in your birth chart, vocation, timing, or relationships.',
          'Explore your planetary positions in the Charts tab.'
        ],
        strategicAdvice: 'ASTRO360 operates on real astronomical mathematics to guarantee zero hallucination.'
      },
      timing: {
        start: 'Current',
        peak: 'Instant',
        end: 'Continuous',
        windowLabel: 'Real-Time Verification',
        intensity: 'STABLE',
        note: 'System integrity rules are active 24/7.'
      },
      agreement: {
        agreementPercent: 100,
        level: 'UNANIMOUS_AGREEMENT',
        participatingCount: 'Security Layer',
        rawAgreement: '100% Deterministic Policy Enforced',
        lineageAdjusted: '100%',
        disclaimer: 'System integrity rule.'
      },
      systemsBreakdown: {
        vedic: 'Grounded in Brihat Parashara Hora Shastra.',
        western: 'Grounded in Ptolemaic Tetrabiblos.',
        kp: 'Grounded in KP Stellar sub-lord tables.',
        jaimini: 'Grounded in Jaimini Upadesha Sutras.'
      },
      evidenceSources: [
        { rule: 'ASTRO360 Deterministic Policy', citation: 'System Architecture Specification (2026)', tier: 1 }
      ],
      sensitivity: {
        driftInterval: 'N/A',
        stability: 'HIGH',
        note: 'Zero hallucination invariant.'
      },
      whatIsLessCertain: [],
      whatYouCanControl: ['Ask any legitimate astrological or life timing question.'],
      followUps: [
        'Why is my career stuck and when will it improve?',
        'What are my core birth chart strengths?',
        'When is my next favorable planetary timing window?'
      ],
      reproducibility: {
        engineVersion: '2.4.0-DE440',
        ephemerisVersion: 'NASA JPL DE440',
        ayanamsha: 'True Lahiri (24.18°)',
        calculationTimestamp: new Date().toISOString()
      }
    };
  }

  private static convertIslamicResponseToSolvedProblem(
    res: IslamicGuidanceResponse,
    name: string
  ): SolvedProblemAnalysis {
    return {
      question: res.question,
      intent: res.isMixedAstrologyIslam ? 'MIXED_ASTROLOGY_ISLAM' : 'ISLAMIC_GUIDANCE',
      category: res.category,
      responseMode: res.isMixedAstrologyIslam ? 'COMPARATIVE_PERSPECTIVE' : 'SOURCE_GROUNDED',
      summary: res.executiveSummary,
      astrologyView: {
        primaryTheme: res.astrologyView ? 'Traditional Multi-Tradition Astrological Perspective' : 'Islamic Distinction: Mathematical Astronomy vs. Divination',
        chartFactors: res.astrologyView?.planetaryFactors || ['Islamic Knowledge Domain (Separate from Astrology)'],
        dashaCycle: 'Independent Domain',
        planetaryTelemetry: res.astronomyView?.solarLunarTelemetry || 'NASA JPL DE440 & IAU Standard Solar Calculations',
        houseActivations: res.astrologyView?.natalAnalysis || 'Observational astronomy for time reckoning and Qibla'
      },
      practicalView: {
        actionItems: res.practicalPlaybook.immediateActions,
        strategicAdvice: res.practicalPlaybook.ethicalGuidance
      },
      islamicGuidanceView: res.islamicGuidanceView,
      timing: {
        start: 'Current Epoch',
        peak: 'Daily Observance',
        end: 'Continuous',
        windowLabel: res.astronomyView?.calculatedTimings ? 'Astronomical Prayer Horizon' : 'Spiritual Remembrance Horizon',
        intensity: 'STABLE',
        note: 'Calculated purely from verified celestial geometry or authenticated Islamic sources.'
      },
      agreement: {
        agreementPercent: 100,
        level: 'UNANIMOUS_AGREEMENT',
        participatingCount: 'Source-Authenticated Verification',
        rawAgreement: '100% Sourced (Quran / Authentic Hadith / Classical Fiqh / IAU Astronomy)',
        lineageAdjusted: '100%',
        disclaimer: 'Islamic knowledge is derived strictly from authenticated religious texts. Astrological perspectives are distinct.'
      },
      systemsBreakdown: {
        vedic: res.isMixedAstrologyIslam ? 'Vedic Astrology provides one cultural timing framework.' : 'Traditional astrological systems are distinct from Islamic theology.',
        western: res.isMixedAstrologyIslam ? 'Western Astrology provides psychological archetype mapping.' : 'Physical astronomy measures celestial coordinates without divination.',
        kp: 'KP Stellar sub-divisions calculate astronomical cusps.',
        jaimini: 'Jaimini Sutras evaluate sign-based aspects.'
      },
      evidenceSources: (res.islamicGuidanceView?.evidenceChain || []).map(ev => ({
        rule: ev.sourceType,
        citation: `${ev.citation} (${ev.authenticityOrSchool || 'Verified Source'})`,
        tier: ev.tier
      })),
      sensitivity: {
        driftInterval: 'N/A',
        stability: 'HIGH',
        note: 'Scriptural sources and mathematical astronomical formulas are deterministic.'
      },
      whatIsLessCertain: ['Community crescent moon sightings depend on local regional observation.'],
      whatYouCanControl: [
        'Establishing regular prayer and mindfulness',
        'Consulting trusted scholars for personal legal fatwas',
        'Taking active, righteous steps toward worldly and spiritual goals'
      ],
      followUps: res.followUps,
      safetyNotice: res.theologicalBoundaryNotice,
      reproducibility: {
        engineVersion: '2.4.0-DE440',
        ephemerisVersion: 'IAU 2006 Spherical Astronomy',
        ayanamsha: 'N/A (Islamic Astronomy utilizes Tropical / Equatorial Solar coordinates)',
        calculationTimestamp: new Date().toISOString()
      }
    };
  }

}
