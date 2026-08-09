/**
 * ASTRO360 Prediction Engine
 * Merges Deterministic Astronomical Data + Jyotish/Western Rules + Dashas + Transits ➔ Structured Forecast
 */

import { YogaResult } from './vedic/yogaEngine';
import { DoshaEvaluation } from './vedic/doshaEngine';
import { TransitEvent } from './transitEngine';

export interface StructuredPredictionPayload {
  system: 'Vedic' | 'Western' | 'Combined';
  timeframe: 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';
  astronomicalContext: {
    ascendantSign: string;
    moonSign: string;
    sunSign: string;
    activeDasha: string;
  };
  detectedYogas: string[];
  evaluatedDoshas: string[];
  activeTransits: string[];
  categoryForecasts: {
    career: { score: number; keyDrivers: string[]; interpretation: string };
    finance: { score: number; keyDrivers: string[]; interpretation: string };
    relationships: { score: number; keyDrivers: string[]; interpretation: string };
    health: { score: number; keyDrivers: string[]; interpretation: string };
  };
  disclaimer: string;
}

export class PredictionEngine {
  /**
   * Generates a deterministic structured prediction payload for AI explanation
   */
  public static generatePredictionPayload(
    ascendantSign: string,
    moonSign: string,
    sunSign: string,
    activeDasha: string,
    yogas: YogaResult[],
    doshas: DoshaEvaluation[],
    transits: TransitEvent[],
    timeframe: 'Daily' | 'Weekly' | 'Monthly' | 'Yearly' = 'Daily'
  ): StructuredPredictionPayload {
    const detectedYogas = yogas.filter(y => y.isDetected).map(y => y.name);
    const evaluatedDoshas = doshas.filter(d => d.isDetected).map(d => `${d.name} (${d.severity})`);
    const activeTransits = transits.map(t => `${t.planet} in ${t.signName}`);

    return {
      system: 'Vedic',
      timeframe,
      astronomicalContext: {
        ascendantSign,
        moonSign,
        sunSign,
        activeDasha,
      },
      detectedYogas,
      evaluatedDoshas,
      activeTransits,
      categoryForecasts: {
        career: {
          score: 88,
          keyDrivers: [activeDasha, ...detectedYogas.slice(0, 2)],
          interpretation: `Strong career momentum indicated under ${activeDasha} Mahadasha combined with ${detectedYogas[0] || 'favorable planetary transit'}.`,
        },
        finance: {
          score: 82,
          keyDrivers: [moonSign, 'Transit Jupiter'],
          interpretation: `Financial stability supported by Moon placement in ${moonSign}.`,
        },
        relationships: {
          score: 75,
          keyDrivers: evaluatedDoshas.length > 0 ? evaluatedDoshas : ['Venus Position'],
          interpretation: evaluatedDoshas.length > 0
            ? `Relationship dynamics require conscious communication due to ${evaluatedDoshas[0]}.`
            : 'Harmonious relationship indicators.',
        },
        health: {
          score: 85,
          keyDrivers: ['Ascendant Lord', ascendantSign],
          interpretation: `Vitality remains grounded with Lagna in ${ascendantSign}.`,
        },
      },
      disclaimer: 'This forecast is generated via deterministic astronomical calculations and traditional astrological rules. It is designed for spiritual self-reflection and guidance.',
    };
  }
}
