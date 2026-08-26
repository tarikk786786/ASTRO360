/**
 * ASTRO360 OMNI - Evidence & Negative Evidence Engine (PRD Section 16, 17)
 * Gathers complete evidence trees including supporting factors, contradicting/restricting factors,
 * weakening factors, and missing expected indicators to prevent one-sided interpretations.
 */

import { EvidenceItem, CodifiedRule, AstrologyTradition } from './predictionSchema';

export interface EvidenceAudit {
  supporting: EvidenceItem[];
  contradicting: EvidenceItem[];
  weakening: EvidenceItem[];
  missingExpectedIndicators: string[];
  netBalanceScore: number; // 0 to 1
  synthesis: string;
}

export class EvidenceEngine {
  /**
   * Compiles an evidence audit for a set of astrological rules and planetary factors.
   */
  public static compileEvidence(
    rules: CodifiedRule[],
    planetaryContext: {
      hasBeneficTransit: boolean;
      hasMaleficAspect: boolean;
      isCombust: boolean;
      isDebilitated: boolean;
      dashaStrengthScore: number;
    }
  ): EvidenceAudit {
    const supporting: EvidenceItem[] = [];
    const contradicting: EvidenceItem[] = [];
    const weakening: EvidenceItem[] = [];
    const missingExpectedIndicators: string[] = [];

    // Process codified rules
    for (const r of rules) {
      const sourceCitation = r.sources[0]?.text
        ? `${r.sources[0].text}${r.sources[0].chapter ? ` (${r.sources[0].chapter})` : ''}`
        : 'Classical Reference';

      supporting.push({
        id: `ev_sup_${r.ruleId}`,
        factor: r.conditions[0] || r.trigger,
        system: r.tradition,
        technique: r.technique,
        ruleId: r.ruleId,
        value: r.trigger,
        relationship: 'Supports primary event manifestation',
        timing: r.timing,
        source: sourceCitation,
        weight: r.calibratedWeight || r.weight,
        isSupporting: true,
        isContradicting: false,
        explanation: r.interpretation
      });
    }

    // Check for negative / contradicting evidence
    if (planetaryContext.hasMaleficAspect) {
      contradicting.push({
        id: 'ev_contra_saturn_mars',
        factor: 'Saturn / Mars restrictive aspect on active house',
        system: 'vedic_parashari',
        technique: 'Gochara Papakartari / Malefic Aspect',
        ruleId: 'VEDIC_RESTRICTION_001',
        value: 'Restrictive Drishti',
        relationship: 'Delays, structural friction, or requires rigorous discipline',
        timing: 'Concurrent with active transit',
        source: 'Brihat Parashara Hora Shastra, Ch. 42',
        weight: 0.70,
        isSupporting: false,
        isContradicting: true,
        explanation: 'Saturn aspect demands careful pacing and introduces procedural delay, moderating rapid expansion.'
      });
    }

    // Check for weakening factors
    if (planetaryContext.isCombust) {
      weakening.push({
        id: 'ev_weak_combustion',
        factor: 'Planetary Combustion (Kopa/Asta)',
        system: 'vedic_parashari',
        technique: 'Solar Proximity Combustion',
        ruleId: 'VEDIC_COMBUSTION_002',
        value: 'Within 6° of Sun',
        relationship: 'Reduces direct external expression of planetary significations',
        timing: 'Combustion duration',
        source: 'Saravali, Ch. 5',
        weight: 0.60,
        isSupporting: false,
        isContradicting: false,
        explanation: 'Planetary energy is internalized rather than manifesting easily on material planes.'
      });
    }

    if (planetaryContext.isDebilitated) {
      weakening.push({
        id: 'ev_weak_debilitation',
        factor: 'Neecha (Debilitation) Rashi Placement',
        system: 'vedic_parashari',
        technique: 'Essential Planetary Dignity',
        ruleId: 'VEDIC_NEECHA_003',
        value: 'Debilitated Rashi',
        relationship: 'Diminishes natural benefic output unless Neecha Bhanga is present',
        timing: 'Natal baseline',
        source: 'Brihat Jataka, Ch. 2',
        weight: 0.65,
        isSupporting: false,
        isContradicting: false,
        explanation: 'Requires Neecha Bhanga Raja Yoga cancellation to unlock constructive results.'
      });
    }

    // Check for missing expected indicators
    if (planetaryContext.dashaStrengthScore < 0.5) {
      missingExpectedIndicators.push('Current Vimshottari Mahadasha lord lacks direct functional benefic link to event house.');
    }

    // Compute net balance score
    const supWeight = supporting.reduce((a, b) => a + b.weight, 0);
    const contraWeight = contradicting.reduce((a, b) => a + b.weight, 0);
    const weakWeight = weakening.reduce((a, b) => a + b.weight, 0);

    const rawBalance = (supWeight - (contraWeight * 0.5 + weakWeight * 0.3)) / Math.max(1, supWeight + contraWeight);
    const netBalanceScore = Math.max(0.2, Math.min(0.98, (rawBalance + 1) / 2));

    let synthesis = '';
    if (contradicting.length > 0) {
      synthesis = `Strong supportive indicators exist alongside ${contradicting.length} restricting factor(s), resulting in a calibrated moderate prediction.`;
    } else if (weakening.length > 0) {
      synthesis = `Supportive indicators present with ${weakening.length} planetary dignity nuance(s) requiring intentional effort.`;
    } else {
      synthesis = 'Unobstructed supportive indicators across evaluated classical factors.';
    }

    return {
      supporting,
      contradicting,
      weakening,
      missingExpectedIndicators,
      netBalanceScore,
      synthesis
    };
  }
}
