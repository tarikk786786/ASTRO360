/**
 * ASTRO360 — Privacy-Preserving Audio Analytics & Telemetry
 * Tracks playback events, completion rates, and domain metrics without
 * capturing private astrological consultation queries or personal identifiers.
 */

export interface AudioAnalyticsEvent {
  eventType: 'play' | 'pause' | 'complete' | 'seek' | 'count_increment' | 'speed_change';
  contentDomain: 'ASTROLOGY' | 'MEDITATION' | 'MANTRA' | 'ISLAMIC' | 'EDUCATION';
  language: string;
  voiceProfileId?: string;
  durationSeconds?: number;
  completedPercent?: number;
  timestamp: number;
}

const ANALYTICS_EVENT_BUFFER: AudioAnalyticsEvent[] = [];

export const AudioAnalytics = {
  track(event: Omit<AudioAnalyticsEvent, 'timestamp'>): void {
    const payload: AudioAnalyticsEvent = {
      ...event,
      timestamp: Date.now(),
    };

    ANALYTICS_EVENT_BUFFER.push(payload);
    // Keep in-memory buffer bounded to last 200 events
    if (ANALYTICS_EVENT_BUFFER.length > 200) {
      ANALYTICS_EVENT_BUFFER.shift();
    }
  },

  getRecentEvents(): AudioAnalyticsEvent[] {
    return [...ANALYTICS_EVENT_BUFFER];
  },

  getPlaybackStats(): {
    totalPlays: number;
    completionRate: number;
    domainBreakdown: Record<string, number>;
  } {
    const plays = ANALYTICS_EVENT_BUFFER.filter(e => e.eventType === 'play');
    const completes = ANALYTICS_EVENT_BUFFER.filter(e => e.eventType === 'complete');
    
    const domainBreakdown: Record<string, number> = {
      ASTROLOGY: 0,
      MEDITATION: 0,
      MANTRA: 0,
      ISLAMIC: 0,
      EDUCATION: 0,
    };

    plays.forEach(p => {
      domainBreakdown[p.contentDomain] = (domainBreakdown[p.contentDomain] || 0) + 1;
    });

    const completionRate = plays.length > 0 ? Math.round((completes.length / plays.length) * 100) : 100;

    return {
      totalPlays: plays.length,
      completionRate,
      domainBreakdown,
    };
  }
};
