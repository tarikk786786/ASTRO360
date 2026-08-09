/**
 * ASTRO360 Muhurta (Electional Timing) Engine
 * Calculates auspicious timing windows for Marriage, Business, Travel, Property, and Education
 */

export type MuhurtaActivity = 'marriage' | 'business' | 'travel' | 'property' | 'education';

export interface MuhurtaWindow {
  date: string;
  timeWindow: string; // e.g. "09:30 AM - 11:15 AM"
  score: number; // 0 to 100
  quality: 'Excellent' | 'Favorable' | 'Neutral' | 'Avoid';
  governingHora: string;
  recommendedActivity: string;
  supportingFactors: string[];
}

export class MuhurtaEngine {
  /**
   * Generates favorable Muhurta windows for a specified date and activity
   */
  public static calculateMuhurta(dateStr: string, activity: MuhurtaActivity): MuhurtaWindow[] {
    const windows: MuhurtaWindow[] = [];
    const date = new Date(dateStr);
    const dayOfWeek = date.getDay(); // 0 = Sun, 1 = Mon ...

    const horaLordsByDay = [
      ['Sun', 'Venus', 'Mercury', 'Moon', 'Saturn', 'Jupiter', 'Mars'], // Sun
      ['Moon', 'Saturn', 'Jupiter', 'Mars', 'Sun', 'Venus', 'Mercury'], // Mon
      ['Mars', 'Sun', 'Venus', 'Mercury', 'Moon', 'Saturn', 'Jupiter'], // Tue
      ['Mercury', 'Moon', 'Saturn', 'Jupiter', 'Mars', 'Sun', 'Venus'], // Wed
      ['Jupiter', 'Mars', 'Sun', 'Venus', 'Mercury', 'Moon', 'Saturn'], // Thu
      ['Venus', 'Mercury', 'Moon', 'Saturn', 'Jupiter', 'Mars', 'Sun'], // Fri
      ['Saturn', 'Jupiter', 'Mars', 'Sun', 'Venus', 'Mercury', 'Moon'], // Sat
    ];

    const todayHoras = horaLordsByDay[dayOfWeek] || horaLordsByDay[0];

    // Favorable horas for activities
    const favorableMap: Record<MuhurtaActivity, string[]> = {
      marriage: ['Venus', 'Jupiter', 'Moon'],
      business: ['Mercury', 'Jupiter', 'Sun'],
      travel: ['Moon', 'Mercury', 'Venus'],
      property: ['Mars', 'Saturn', 'Jupiter'],
      education: ['Mercury', 'Jupiter', 'Sun'],
    };

    const targetHoras = favorableMap[activity] || ['Jupiter', 'Mercury'];

    todayHoras.slice(0, 4).forEach((lord, idx) => {
      const isFav = targetHoras.includes(lord);
      const score = isFav ? 85 + idx * 3 : 60 - idx * 5;
      const startHour = 7 + idx * 2;
      const endHour = startHour + 1;

      windows.push({
        date: dateStr,
        timeWindow: `${String(startHour).padStart(2, '0')}:00 AM - ${String(endHour).padStart(2, '0')}:30 AM`,
        score,
        quality: isFav ? 'Excellent' : score >= 60 ? 'Favorable' : 'Neutral',
        governingHora: `${lord} Hora`,
        recommendedActivity: activity.toUpperCase(),
        supportingFactors: [
          `Governed by ${lord} Hora.`,
          isFav ? `Highly aligned for ${activity}.` : `Acceptable alignment for general tasks.`,
        ],
      });
    });

    return windows;
  }
}
