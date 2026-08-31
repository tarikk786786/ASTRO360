/**
 * ASTRO360 Web Worker Bridge & Ephemeris Dispatcher
 * Seamlessly routes calculation tasks to background Web Workers with LRU caching.
 */

import { calculatePlanetaryPositions, calculatePanchang, calculateVimshottariDasha } from './astroCalculations';
import { generateJaiminiProfile } from './vedic/jaiminiEngine';
import { calculateAllShadBala } from './vedic/shadBalaEngine';
import { calculateHouses } from './ephemeris/houseCalculation';

export interface FullChartCalculationResult {
  positions: any[];
  ascendant: number;
  panchang: any;
  dasha: any;
  jaimini: any;
  shadbala: any;
  customHouses: any[];
  calculatedAt: number;
}

class AstroWorkerBridge {
  private worker: Worker | null = null;
  private pendingRequests: Map<string, { resolve: (data: any) => void; reject: (err: any) => void }> = new Map();
  private cache: Map<string, FullChartCalculationResult> = new Map();

  constructor() {
    this.initWorker();
  }

  private initWorker() {
    if (typeof window !== 'undefined' && typeof Worker !== 'undefined') {
      try {
        this.worker = new Worker(
          new URL('../workers/astroCalculator.worker.ts', import.meta.url),
          { type: 'module' }
        );

        this.worker.onmessage = (event) => {
          const { id, success, data, error } = event.data;
          const pending = this.pendingRequests.get(id);
          if (pending) {
            this.pendingRequests.delete(id);
            if (success) {
              pending.resolve(data);
            } else {
              pending.reject(new Error(error || 'Worker calculation failed'));
            }
          }
        };

        this.worker.onerror = (err) => {
          console.warn('[AstroWorkerBridge] Worker error, falling back to sync calculations:', err);
        };
      } catch (e) {
        console.warn('[AstroWorkerBridge] Failed to initialize Web Worker:', e);
      }
    }
  }

  public async calculateFullChart(
    dateStr: string,
    timeStr: string,
    latitude: number,
    longitude: number,
    houseSystem: string = 'placidus'
  ): Promise<FullChartCalculationResult> {
    const cacheKey = `${dateStr}_${timeStr}_${latitude.toFixed(4)}_${longitude.toFixed(4)}_${houseSystem}`;
    
    // Check in-memory LRU cache
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    // Try background Web Worker dispatch
    if (this.worker) {
      try {
        const id = `calc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const resultPromise = new Promise<FullChartCalculationResult>((resolve, reject) => {
          this.pendingRequests.set(id, { resolve, reject });
        });

        this.worker.postMessage({
          id,
          type: 'FULL_CHART_CALCULATION',
          payload: { dateStr, timeStr, latitude, longitude, houseSystem }
        });

        // Set a 3-second safety timeout before falling back to synchronous execution
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Worker timeout')), 3000)
        );

        const result = await Promise.race([resultPromise, timeoutPromise]);
        this.cache.set(cacheKey, result);
        return result;
      } catch (e) {
        // Fallback to synchronous calculation below
      }
    }

    // Synchronous execution fallback
    const [hours] = (timeStr || '12:00').split(':').map(Number);
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
    const customHouses = calculateHouses(ascPos, 0, houseSystem as any, latitude);

    const result: FullChartCalculationResult = {
      positions,
      ascendant: ascPos,
      panchang,
      dasha,
      jaimini,
      shadbala,
      customHouses,
      calculatedAt: Date.now()
    };

    this.cache.set(cacheKey, result);
    return result;
  }
}

export const astroWorkerBridge = new AstroWorkerBridge();
