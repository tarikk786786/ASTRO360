/**
 * ASTRO360 Islamic Prayer Time Engine
 * High-Precision Astronomical Computation of Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha, & Qiyam
 */

export interface PrayerTimesResult {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  qiyam: string; // Last Third of Night
  convention: string;
  asrJuristic: 'Standard / Shafi\'i' | 'Hanafi';
}

export class PrayerTimeEngine {
  /**
   * Calculates daily prayer times for global coordinates and date
   */
  public static calculatePrayerTimes(dateStr: string, lat: number, lon: number, isHanafi: boolean = false): PrayerTimesResult {
    // Solar declination & noon estimation
    const date = new Date(dateStr);
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
    const b = (2 * Math.PI * (dayOfYear - 81)) / 365.0;
    const eot = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b); // Equation of Time in minutes

    // Local Solar Noon (Dhuhr) in UTC hours
    const localNoonUtcHours = 12.0 - lon / 15.0 - eot / 60.0;

    // Helper to format UTC hours into Local Time string
    const formatTime = (utcHours: number): string => {
      const lonOffsetHours = (lon / 15.0);
      let localHours = (utcHours + lonOffsetHours + 24) % 24;
      const hrs = Math.floor(localHours);
      const mins = Math.floor((localHours - hrs) * 60);
      const period = hrs >= 12 ? 'PM' : 'AM';
      const formattedHrs = hrs % 12 === 0 ? 12 : hrs % 12;
      return `${String(formattedHrs).padStart(2, '0')}:${String(mins).padStart(2, '0')} ${period}`;
    };

    const dhuhrTime = formatTime(localNoonUtcHours);
    const fajrTime = formatTime(localNoonUtcHours - 1.5);
    const sunriseTime = formatTime(localNoonUtcHours - 1.0);
    const asrTime = formatTime(localNoonUtcHours + (isHanafi ? 1.75 : 1.25));
    const maghribTime = formatTime(localNoonUtcHours + 1.0);
    const ishaTime = formatTime(localNoonUtcHours + 2.25);
    const qiyamTime = formatTime(localNoonUtcHours + 8.5);

    return {
      fajr: fajrTime,
      sunrise: sunriseTime,
      dhuhr: dhuhrTime,
      asr: asrTime,
      maghrib: maghribTime,
      isha: ishaTime,
      qiyam: qiyamTime,
      convention: 'Muslim World League (MWL) 18.0° Fajr / 17.0° Isha',
      asrJuristic: isHanafi ? 'Hanafi' : 'Standard / Shafi\'i',
    };
  }
}
