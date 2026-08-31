/**
 * ASTRO360 Trend Monitoring & Alert Engine
 * Tracks saved keyword watchlists and flags meaningful trend movements and breakouts.
 */

import { TrendAlertItem, KeywordItem } from './types';

const STORAGE_KEY_WATCHLIST = 'astro_seolab_watchlist';

export function getSavedWatchlist(): string[] {
  if (typeof window === 'undefined' || !window.localStorage) return ['birth chart calculator', 'nakshatra finder', 'today panchang', 'kundli matching'];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_WATCHLIST);
    if (raw) return JSON.parse(raw);
  } catch {}
  return ['birth chart calculator', 'nakshatra finder', 'today panchang', 'kundli matching'];
}

export function saveToWatchlist(keyword: string): string[] {
  const current = getSavedWatchlist();
  const norm = keyword.trim().toLowerCase();
  if (!current.includes(norm)) {
    const updated = [...current, norm];
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEY_WATCHLIST, JSON.stringify(updated));
    }
    return updated;
  }
  return current;
}

export function removeFromWatchlist(keyword: string): string[] {
  const current = getSavedWatchlist();
  const norm = keyword.trim().toLowerCase();
  const updated = current.filter(k => k !== norm);
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem(STORAGE_KEY_WATCHLIST, JSON.stringify(updated));
  }
  return updated;
}

/**
 * Checks watchlist items for meaningful shifts and creates alerts.
 */
export function generateTrendAlerts(items: KeywordItem[]): TrendAlertItem[] {
  const alerts: TrendAlertItem[] = [];

  for (const item of items) {
    if (item.trend.isBreakout) {
      alerts.push({
        id: `alert-breakout-${item.id}`,
        keyword: item.rawKeyword,
        changeType: 'BREAKOUT',
        previousScore: Math.max(10, item.trend.score - 45),
        currentScore: item.trend.score,
        timestamp: new Date().toISOString(),
        notes: `Breakout interest detected (+${item.trend.historicalDelta}% delta). Prioritize content publication immediately.`
      });
    } else if (item.trend.direction === 'RISING' && item.trend.historicalDelta >= 25) {
      alerts.push({
        id: `alert-surge-${item.id}`,
        keyword: item.rawKeyword,
        changeType: 'TREND_SURGE',
        previousScore: Math.round(item.trend.score / (1 + item.trend.historicalDelta / 100)),
        currentScore: item.trend.score,
        timestamp: new Date().toISOString(),
        notes: `Strong upward momentum (+${item.trend.historicalDelta}%). Consider adding interactive CTA.`
      });
    } else if (item.trend.direction === 'DECLINING' && item.trend.historicalDelta <= -30) {
      alerts.push({
        id: `alert-decline-${item.id}`,
        keyword: item.rawKeyword,
        changeType: 'TREND_DECLINE',
        previousScore: Math.round(item.trend.score / (1 + item.trend.historicalDelta / 100)),
        currentScore: item.trend.score,
        timestamp: new Date().toISOString(),
        notes: `Seasonal or cyclical dip observed (${item.trend.historicalDelta}%). Maintain evergreen coverage.`
      });
    }
  }

  return alerts;
}
