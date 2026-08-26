/**
 * ASTRO360 OMNI - Canonical Multi-System Consensus & Contradiction Engine (PRD Section 18, 19, 20)
 * Evaluates multi-tradition astrological indicators, detects agreement and
 * explicit divergence across traditions without erasing differences.
 */

import {
  AstrologyTradition,
  ConsensusClassification,
  EventType,
  CodifiedRule,
  PredictionContradiction,
  EvidenceItem
} from './predictionSchema';

export interface TraditionAnalysisView {
  tradition: AstrologyTradition;
  theme: string;
  strength: 'Strong' | 'Moderate' | 'Weak' | 'Neutral';
  specificManifestation: string;
  triggeredRules: CodifiedRule[];
  evidence?: EvidenceItem[];
}

export interface MultiSystemConsensusResult {
  eventType: EventType;
  classification: ConsensusClassification;
  consensusLevel: 'HIGH_CONSENSUS' | 'MODERATE_CONSENSUS' | 'DIVERGENT' | 'CONFLICTING';
  commonTheme: string;
  overallDirection: string;
  systemDifferences: {
    tradition: AstrologyTradition;
    emphasis: string;
    indicators: string;
  }[];
  contradictions: PredictionContradiction[];
  explicitContradictions: any[];
  traditionViews: TraditionAnalysisView[];
  synthesisNote: string;
  synthesis: string;
  confidenceScore: number;
}

export class ConsensusEngine {
  /**
   * Evaluates consensus and contradiction across multiple traditions for a given event type.
   */
  public static evaluateConsensus(
    eventType: EventType,
    views: TraditionAnalysisView[]
  ): MultiSystemConsensusResult {
    const activeViews = views.filter(v => v.strength === 'Strong' || v.strength === 'Moderate');
    const strongCount = views.filter(v => v.strength === 'Strong').length;

    // Detect explicit contradictions between traditions
    const contradictions: PredictionContradiction[] = [];

    const western = views.find(v => v.tradition === 'western_tropical');
    const vedic = views.find(v => v.tradition === 'vedic_parashari');
    const kp = views.find(v => v.tradition === 'vedic_kp');

    if (western && vedic) {
      if (western.theme.toLowerCase().includes('expansion') && vedic.theme.toLowerCase().includes('responsibility')) {
        contradictions.push({
          conflictType: 'THEMATIC_EMPHASIS_DIVERGENCE',
          systemsInvolved: ['western_tropical', 'vedic_parashari'],
          description: 'Western Solar Arc projects vocational expansion and public optimism, while Vedic Dasha emphasizes rigorous Saturnian discipline and structural duty.',
          possibleReason: 'Western focuses on psychological aspiration & solar trajectory; Vedic emphasizes karmic accountability and dasha lord dignity.',
          confidenceImpact: 'low'
        });
      }
    }

    if (kp && vedic) {
      if (kp.strength === 'Weak' && vedic.strength === 'Strong') {
        contradictions.push({
          conflictType: 'CUSPAL_TIMING_DISAGREEMENT',
          systemsInvolved: ['vedic_kp', 'vedic_parashari'],
          description: 'Vedic general Gochara shows favorable Jupiter transit, but KP cuspal sub-lord does not signify the 10th cusp directly in current sub-period.',
          possibleReason: 'KP requires cuspal sub-lord star connectivity which refines broad transit windows into narrower event triggers.',
          confidenceImpact: 'moderate'
        });
      }
    }

    // Determine consensus classification
    let classification: ConsensusClassification = 'INSUFFICIENT_DATA';
    let confidenceScore = 0.50;

    if (views.length === 0) {
      classification = 'INSUFFICIENT_DATA';
      confidenceScore = 0.30;
    } else if (contradictions.some(c => c.confidenceImpact === 'high')) {
      classification = 'CONFLICT';
      confidenceScore = 0.55;
    } else if (strongCount >= 3) {
      classification = 'STRONG_CONSENSUS';
      confidenceScore = 0.92;
    } else if (activeViews.length >= 2) {
      classification = 'MODERATE_CONSENSUS';
      confidenceScore = 0.82;
    } else if (activeViews.length === 1) {
      classification = 'MIXED';
      confidenceScore = 0.68;
    } else {
      classification = 'MIXED';
      confidenceScore = 0.58;
    }

    // Synthesize common theme
    const formattedEventName = eventType.replace(/_/g, ' ').toLowerCase();
    let commonTheme = '';
    if (classification === 'STRONG_CONSENSUS') {
      commonTheme = `Elevated activity and significant milestones regarding ${formattedEventName} supported across multiple astrological traditions.`;
    } else if (classification === 'MODERATE_CONSENSUS') {
      commonTheme = `Moderate alignment across traditions regarding ${formattedEventName}, with traditional nuances on internal vs external focus.`;
    } else if (classification === 'CONFLICT') {
      commonTheme = `Divergent traditional indications for ${formattedEventName}. Cross-system analysis reveals conflicting timing or strength markers.`;
    } else {
      commonTheme = `Baseline thematic focus on ${formattedEventName} with distinct traditional perspectives.`;
    }

    // Map system differences (never average them)
    const systemDifferences = views.map(v => ({
      tradition: v.tradition,
      emphasis: v.theme,
      indicators: v.specificManifestation
    }));

    const synthesisParts = views.map(v => `[${v.tradition.toUpperCase()}]: ${v.theme}`);
    const synthesisNote = `Synthesis: ${synthesisParts.join(' | ')}`;

    const consensusLevel = classification === 'STRONG_CONSENSUS'
      ? 'HIGH_CONSENSUS'
      : classification === 'MODERATE_CONSENSUS'
      ? 'MODERATE_CONSENSUS'
      : classification === 'CONFLICT'
      ? 'CONFLICTING'
      : 'DIVERGENT';

    return {
      eventType,
      classification,
      consensusLevel,
      commonTheme,
      overallDirection: commonTheme,
      systemDifferences,
      contradictions,
      explicitContradictions: contradictions.map(c => ({
        traditionA: c.systemsInvolved[0] || 'western',
        viewA: c.description,
        traditionB: c.systemsInvolved[1] || 'vedic',
        viewB: c.possibleReason,
        resolutionNote: c.description
      })),
      traditionViews: views,
      synthesisNote,
      synthesis: synthesisNote,
      confidenceScore
    };
  }

  /**
   * Computes calibrated confidence metrics
   */
  public static computeCalibratedConfidence(
    hasPreciseBirthTime: boolean,
    isAstronomicallyVerified: boolean,
    ruleCount: number,
    consensusLevel: any
  ) {
    const inputQuality = hasPreciseBirthTime ? 0.98 : 0.72;
    const astronomicalPrecision = isAstronomicallyVerified ? 0.99 : 0.94;
    const ruleReliability = Math.min(0.65 + ruleCount * 0.05, 0.88);
    const timingPrecision = hasPreciseBirthTime ? 0.82 : 0.60;
    const crossAgreement = consensusLevel === 'HIGH_CONSENSUS' || consensusLevel === 'STRONG_CONSENSUS' ? 0.92 : 0.75;
    const overallModelConfidence = Math.round(((inputQuality + astronomicalPrecision + ruleReliability + timingPrecision + crossAgreement) / 5) * 100) / 100;

    return {
      inputQuality,
      astronomicalPrecision,
      ruleReliability,
      timingPrecision,
      crossSystemAgreement: crossAgreement,
      historicalValidation: 0.80,
      overallModelConfidence,
      disclaimer: 'Calibrated confidence represents model mathematical convergence, not empirical certainty.'
    };
  }
}

export type MultiTraditionEvidence = TraditionAnalysisView;

