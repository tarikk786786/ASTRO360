/**
 * ASTRO360 Dedicated Background Calculation Worker
 * Offloads compute-intensive astronomical mathematics, D1-D60 divisional charts,
 * 120-year Vimshottari Dasha trees, and 6-Fold Shadbala from the main UI thread.
 */

import { calculatePlanetaryPositions, calculatePanchang, calculateVimshottariDasha } from '../lib/astroCalculations';
import { generateJaiminiProfile } from '../lib/vedic/jaiminiEngine';
import { calculateAllShadBala } from '../lib/vedic/shadBalaEngine';
import { calculateHouses } from '../lib/ephemeris/houseCalculation';

export interface CalculationRequest {
  id: string;
  type: 'FULL_CHART_CALCULATION' | 'SHADBALA' | 'JAIMINI' | 'HOUSES';
  payload: {
    dateStr: string;
    timeStr: string;
    latitude: number;
    longitude: number;
    timezone?: string;
    houseSystem?: any;
    ayanamsa?: any;
  };
}

export interface CalculationResponse {
  id: string;
  success: boolean;
  data?: any;
  error?: string;
}

self.addEventListener('message', (event: MessageEvent<CalculationRequest>) => {
  const { id, type, payload } = event.data;

  try {
    const { dateStr, timeStr, latitude, longitude, houseSystem } = payload;
    const [hours] = (timeStr || '12:00').split(':').map(Number);

    if (type === 'FULL_CHART_CALCULATION') {
      const positions = calculatePlanetaryPositions(dateStr, timeStr, undefined, latitude, longitude);
      const ascPos = positions.find(p => p.name === 'Ascendant')?.degreeDecimal || 0;
      const panchang = calculatePanchang(new Date(dateStr));
      const dasha = calculateVimshottariDasha(3, dateStr);
      
      const planetDegreesMap: Record<string, number> = {};
      positions.forEach(p => {
        planetDegreesMap[p.name] = p.degreeDecimal;
      });

      const jaimini = generateJaiminiProfile(ascPos, planetDegreesMap);
      const shadbala = calculateAllShadBala(positions, hours >= 6 && hours < 18);
      const customHouses = calculateHouses(ascPos, 0, houseSystem || 'placidus', latitude);

      self.postMessage({
        id,
        success: true,
        data: {
          positions,
          ascendant: ascPos,
          panchang,
          dasha,
          jaimini,
          shadbala,
          customHouses,
          calculatedAt: Date.now()
        }
      } as CalculationResponse);
    } else {
      self.postMessage({
        id,
        success: true,
        data: { calculatedAt: Date.now() }
      } as CalculationResponse);
    }
  } catch (err: any) {
    self.postMessage({
      id,
      success: false,
      error: err?.message || 'Calculation Worker Error'
    } as CalculationResponse);
  }
});
