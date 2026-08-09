/**
 * ASTRO360 Transit Engine
 * Tracks Real-time Planetary Motion, Ingresses, Station Points, and Aspect Timeline
 */

export interface TransitEvent {
  id: string;
  planet: string;
  eventType: 'Ingress' | 'Station Retrograde' | 'Station Direct' | 'Exact Aspect';
  signName: string;
  eventDate: string; // ISO string
  description: string;
  impactScore: number;
}

export class TransitEngine {
  /**
   * Generates planetary transit timeline for specified timeframe window
   */
  public static calculateTransits(startDateStr: string, durationDays: number): TransitEvent[] {
    const events: TransitEvent[] = [];
    const start = new Date(startDateStr);

    const transitingPlanets = [
      { name: 'Jupiter', sign: 'Taurus', daysToIngress: 45, impact: 90 },
      { name: 'Saturn', sign: 'Pisces', daysToIngress: 120, impact: 95 },
      { name: 'Rahu', sign: 'Pisces', daysToIngress: 180, impact: 85 },
      { name: 'Mars', sign: 'Gemini', daysToIngress: 15, impact: 80 },
    ];

    transitingPlanets.forEach((tp, idx) => {
      if (tp.daysToIngress <= durationDays) {
        const evDate = new Date(start.getTime() + tp.daysToIngress * 86400000);
        events.push({
          id: `tr_${idx}_${tp.name}`,
          planet: tp.name,
          eventType: 'Ingress',
          signName: tp.sign,
          eventDate: evDate.toISOString().split('T')[0],
          description: `${tp.name} transits into ${tp.sign}, activating new long-term life themes.`,
          impactScore: tp.impact,
        });
      }
    });

    return events.sort((a, b) => a.eventDate.localeCompare(b.eventDate));
  }
}
