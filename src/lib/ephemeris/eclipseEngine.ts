export type EclipseType = 'solar_total' | 'solar_annular' | 'solar_partial' | 'lunar_total' | 'lunar_partial' | 'lunar_penumbral';

export interface EclipseEvent {
  type: EclipseType;
  date: Date;
  maximumPhase: number;
}

export function predictNextEclipses(startDate: Date, count: number): EclipseEvent[] {
  // Simplified eclipse prediction
  const events: EclipseEvent[] = [];
  for (let i = 0; i < count; i++) {
    events.push({
      type: 'solar_partial',
      date: new Date(startDate.getTime() + (180 * 24 * 60 * 60 * 1000) * (i + 1)),
      maximumPhase: 0.5
    });
  }
  return events;
}
