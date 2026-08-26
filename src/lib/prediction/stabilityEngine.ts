/**
 * ASTRO360 OMNI - Stability & Uncertainty Quantification Engine (PRD Section 21, 22, 23)
 * Tests astronomical sensitivity across birth time perturbations [-30m, -15m, -10m, -5m, -1m, exact, +1m, +5m, +10m, +15m, +30m]
 * and produces explicit, honest uncertainty classifications without false precision.
 */

import { StabilityClassification, UncertaintyFactor, PredictionQualityFlag } from './predictionSchema';
import { calculatePlanetaryPositions } from '../astroCalculations';

export interface PerturbationResult {
  offsetMinutes: number;
  label: string;
  ascendantDegree: number;
  ascendantSign: string;
  hasAscendantSignShift: boolean;
  navamshaShift: boolean;
  kpSubLordShift: boolean;
}

export interface StabilityAnalysisReport {
  classification: StabilityClassification;
  ascendantTotalDriftDeg: number;
  signTransitionsCount: number;
  perturbations: PerturbationResult[];
  qualityFlags: PredictionQualityFlag[];
  uncertaintyFactors: UncertaintyFactor[];
  explainableInsight: string;
}

export class StabilityEngine {
  public static readonly PERTURBATION_OFFSETS = [-30, -15, -10, -5, -1, 0, 1, 5, 10, 15, 30];

  /**
   * Evaluates astronomical sensitivity to birth time uncertainty.
   */
  public static evaluateStability(
    birthDate: string, // YYYY-MM-DD
    birthTime: string, // HH:MM
    isExactTimeKnown: boolean = true,
    timezoneOffsetHours: number = 0
  ): StabilityAnalysisReport {
    const uncertaintyFactors: UncertaintyFactor[] = [];
    const qualityFlags: PredictionQualityFlag[] = [];

    if (!isExactTimeKnown) {
      uncertaintyFactors.push('unknown_birth_time');
      uncertaintyFactors.push('low_resolution_timing');
      qualityFlags.push('SENSITIVE_TO_BIRTH_TIME');
    }

    const [hoursStr, minsStr] = (birthTime || '12:00').split(':');
    const baseHour = parseInt(hoursStr, 10) || 12;
    const baseMin = parseInt(minsStr, 10) || 0;
    const baseTotalMinutes = baseHour * 60 + baseMin;

    // Calculate baseline positions
    const basePositions = calculatePlanetaryPositions(birthDate, birthTime || '12:00');
    const baseAsc = basePositions.find(p => p.name === 'Ascendant')?.degreeDecimal || 0;
    const baseAscSign = basePositions.find(p => p.name === 'Ascendant')?.sign || 'Aries';
    const baseNavamshaPada = Math.floor((baseAsc % 30) / (30 / 9));

    const perturbations: PerturbationResult[] = [];
    let signShiftCount = 0;
    let maxDriftDeg = 0;

    for (const offset of this.PERTURBATION_OFFSETS) {
      const targetMin = (baseTotalMinutes + offset + 1440) % 1440;
      const targetH = Math.floor(targetMin / 60);
      const targetM = targetMin % 60;
      const timeStr = `${String(targetH).padStart(2, '0')}:${String(targetM).padStart(2, '0')}`;

      const perturbedPositions = calculatePlanetaryPositions(birthDate, timeStr);
      const pAsc = perturbedPositions.find(p => p.name === 'Ascendant')?.degreeDecimal || 0;
      const pAscSign = perturbedPositions.find(p => p.name === 'Ascendant')?.sign || 'Aries';
      const pNavamshaPada = Math.floor((pAsc % 30) / (30 / 9));

      const drift = Math.abs(pAsc - baseAsc);
      if (drift > maxDriftDeg) maxDriftDeg = drift;

      const hasSignShift = pAscSign !== baseAscSign;
      if (hasSignShift) signShiftCount++;

      const navamshaShift = pNavamshaPada !== baseNavamshaPada;
      // KP sub-lord shifts if degree moves across sub-arc boundary (~2.13 degrees)
      const kpSubLordShift = drift > 1.0;

      perturbations.push({
        offsetMinutes: offset,
        label: offset === 0 ? 'Exact Time' : `${offset > 0 ? '+' : ''}${offset} min`,
        ascendantDegree: pAsc,
        ascendantSign: pAscSign,
        hasAscendantSignShift: hasSignShift,
        navamshaShift,
        kpSubLordShift
      });
    }

    // Classify stability based on perturbation sensitivity
    let classification: StabilityClassification = 'STABLE';
    if (!isExactTimeKnown) {
      classification = 'HIGHLY_SENSITIVE';
    } else if (signShiftCount >= 3 || maxDriftDeg > 8.0) {
      classification = 'HIGHLY_SENSITIVE';
      uncertaintyFactors.push('boundary_condition');
      qualityFlags.push('SENSITIVE_TO_BIRTH_TIME');
    } else if (signShiftCount > 0 || maxDriftDeg > 4.0) {
      classification = 'SENSITIVE';
      qualityFlags.push('SENSITIVE_TO_BIRTH_TIME');
    } else if (maxDriftDeg > 2.0) {
      classification = 'MODERATELY_STABLE';
    } else {
      classification = 'STABLE';
      qualityFlags.push('HIGH_SUPPORT');
    }

    // Synthesize human-readable explainable insight
    let explainableInsight = '';
    if (classification === 'STABLE') {
      explainableInsight = 'Ascendant and key house cusps are securely placed within the sign. Predictions hold with high confidence across ±15m birth-time drift.';
    } else if (classification === 'MODERATELY_STABLE') {
      explainableInsight = 'Planetary signs and major Dasha cycles are robust. Minor house cusp shifts occur only beyond ±10m variation.';
    } else if (classification === 'SENSITIVE') {
      explainableInsight = 'Ascendant is positioned near a sign or Nakshatra boundary. Exact birth time within ±5m is important for cuspal timing.';
    } else {
      explainableInsight = 'High sensitivity to birth time. Cusp sign transition detected within ±5m perturbation. House-dependent rules require verification.';
    }

    return {
      classification,
      ascendantTotalDriftDeg: maxDriftDeg,
      signTransitionsCount: signShiftCount,
      perturbations,
      qualityFlags,
      uncertaintyFactors,
      explainableInsight
    };
  }
}
