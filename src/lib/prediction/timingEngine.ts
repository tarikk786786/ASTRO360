/**
 * ASTRO360 OMNI - Canonical Prediction Timing Engine (PRD Section 12, 13, 36, 37)
 * Computes deterministic start, peak, and end dates for astrological event candidates.
 * Enforces strict chronology (start <= peak <= end), merges overlapping semantic windows,
 * and tracks date precision resolution without fabricating fake exactness.
 */

import { DatePrecision, CodifiedRule } from './predictionSchema';

export interface CandidateTimingWindow {
  ruleId: string;
  category: CodifiedRule['category'];
  start: Date;
  peak: Date;
  end: Date;
  precision: DatePrecision;
  intensity: number;
  weight: number;
}

export interface MergedPredictionWindow {
  category: CodifiedRule['category'];
  start: string; // ISO string
  peak: string;  // ISO string
  end: string;    // ISO string
  durationDays: number;
  precision: DatePrecision;
  peakIntensity: number;
  aggregatedWeight: number;
  participatingRuleIds: string[];
}

export class TimingEngine {
  /**
   * Validates chronological integrity: start <= peak <= end
   */
  public static validateWindow(start: Date, peak: Date, end: Date): boolean {
    const s = start.getTime();
    const p = peak.getTime();
    const e = end.getTime();
    return s <= p && p <= e;
  }

  /**
   * Generates a deterministic candidate timing window based on planetary transit / Dasha cycles
   */
  public static generateWindow(
    rule: CodifiedRule,
    anchorDate: Date = new Date(),
    offsetMonths: number = 0,
    durationMonths: number = 2
  ): CandidateTimingWindow {
    const start = new Date(anchorDate.getTime());
    start.setMonth(start.getMonth() + offsetMonths);
    start.setDate(1);

    const end = new Date(start.getTime());
    end.setMonth(end.getMonth() + durationMonths);
    end.setDate(28);

    // Peak is placed deterministically at mid-interval or transit station
    const peak = new Date((start.getTime() + end.getTime()) / 2);

    // Determine honest date precision based on technique
    let precision: DatePrecision = 'month';
    if (rule.technique.includes('KP') || rule.technique.includes('Sookshma')) {
      precision = 'day';
    } else if (rule.technique.includes('Gochara') || rule.technique.includes('Transits')) {
      precision = 'week';
    } else if (rule.technique.includes('Dasha') || rule.technique.includes('Progressions')) {
      precision = 'month';
    } else if (rule.technique.includes('BaZi') || rule.technique.includes('10-Year')) {
      precision = 'year';
    }

    const intensity = Math.round((rule.calibratedWeight || rule.weight) * 100);

    return {
      ruleId: rule.ruleId,
      category: rule.category,
      start,
      peak,
      end,
      precision,
      intensity,
      weight: rule.calibratedWeight || rule.weight
    };
  }

  /**
   * Merges overlapping candidate timing windows with identical semantic event categories.
   * Distinct categories (e.g. Career vs Relationship) are never merged together.
   */
  public static mergeOverlappingWindows(windows: CandidateTimingWindow[]): MergedPredictionWindow[] {
    if (windows.length === 0) return [];

    // Group by category first
    const byCategory: Record<string, CandidateTimingWindow[]> = {};
    for (const win of windows) {
      if (!byCategory[win.category]) {
        byCategory[win.category] = [];
      }
      byCategory[win.category].push(win);
    }

    const results: MergedPredictionWindow[] = [];

    for (const [category, catWindows] of Object.entries(byCategory)) {
      // Sort windows by start time
      const sorted = [...catWindows].sort((a, b) => a.start.getTime() - b.start.getTime());

      let currentGroup: CandidateTimingWindow[] = [sorted[0]];

      for (let i = 1; i < sorted.length; i++) {
        const nextWin = sorted[i];
        const lastInGroup = currentGroup[currentGroup.length - 1];

        // Check if windows overlap or are within 15 days of each other
        if (nextWin.start.getTime() <= lastInGroup.end.getTime() + 15 * 86400000) {
          currentGroup.push(nextWin);
        } else {
          // Merge current group and start new group
          results.push(this.synthesizeWindowGroup(category as CodifiedRule['category'], currentGroup));
          currentGroup = [nextWin];
        }
      }

      if (currentGroup.length > 0) {
        results.push(this.synthesizeWindowGroup(category as CodifiedRule['category'], currentGroup));
      }
    }

    return results;
  }

  /**
   * Combines a group of overlapping candidate windows into a single unified window.
   */
  private static synthesizeWindowGroup(
    category: CodifiedRule['category'],
    group: CandidateTimingWindow[]
  ): MergedPredictionWindow {
    const earliestStart = new Date(Math.min(...group.map(g => g.start.getTime())));
    const latestEnd = new Date(Math.max(...group.map(g => g.end.getTime())));

    // Peak is determined by the highest-weight contributing rule
    const dominantWindow = [...group].sort((a, b) => b.weight - a.weight)[0];
    const peak = dominantWindow.peak;

    // Ensure strictly earliestStart <= peak <= latestEnd
    const validatedPeak = new Date(
      Math.max(earliestStart.getTime(), Math.min(peak.getTime(), latestEnd.getTime()))
    );

    const durationDays = Math.max(1, Math.round((latestEnd.getTime() - earliestStart.getTime()) / 86400000));
    const peakIntensity = Math.max(...group.map(g => g.intensity));
    const aggregatedWeight = Math.min(1.0, group.reduce((acc, g) => acc + g.weight * 0.4, 0.4));

    // Determine finest precision available among supporting rules
    const precisionHierarchy: DatePrecision[] = ['day', 'week', 'month', 'quarter', 'year', 'range'];
    let bestPrecision: DatePrecision = 'month';
    for (const p of precisionHierarchy) {
      if (group.some(g => g.precision === p)) {
        bestPrecision = p;
        break;
      }
    }

    return {
      category,
      start: earliestStart.toISOString(),
      peak: validatedPeak.toISOString(),
      end: latestEnd.toISOString(),
      durationDays,
      precision: bestPrecision,
      peakIntensity,
      aggregatedWeight,
      participatingRuleIds: group.map(g => g.ruleId)
    };
  }
}
