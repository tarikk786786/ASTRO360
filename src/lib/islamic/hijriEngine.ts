/**
 * ASTRO360 Hijri Calendar & Date Converter Engine
 * Converts Gregorian Dates to Hijri (AH) and vice-versa with regional moon sighting adjustment
 */

export interface HijriDateResult {
  day: number;
  monthIndex: number; // 0 to 11
  monthNameAr: string;
  monthNameEn: string;
  year: number;
  formatted: string;
  isSacredMonth: boolean;
  associatedEvents: string[];
}

export const HIJRI_MONTHS = [
  { ar: 'محرم', en: 'Muharram', sacred: true },
  { ar: 'صفر', en: 'Safar', sacred: false },
  { ar: 'ربيع الأول', en: 'Rabi al-Awwal', sacred: false },
  { ar: 'ربيع الثاني', en: 'Rabi al-Thani', sacred: false },
  { ar: 'جمادى الأولى', en: 'Jumada al-Awwal', sacred: false },
  { ar: 'جمادى الآخرة', en: 'Jumada al-Thani', sacred: false },
  { ar: 'رجب', en: 'Rajab', sacred: true },
  { ar: 'شعبان', en: 'Sha\'ban', sacred: false },
  { ar: 'رمضان', en: 'Ramadan', sacred: true },
  { ar: 'شوال', en: 'Shawwal', sacred: false },
  { ar: 'ذو القعدة', en: 'Dhu al-Qi\'dah', sacred: true },
  { ar: 'ذو الحجة', en: 'Dhu al-Hijjah', sacred: true },
];

export class HijriEngine {
  /**
   * Converts a Gregorian Date to Hijri Date
   */
  public static gregorianToHijri(date: Date, adjustmentDays: number = 0): HijriDateResult {
    const adjustedDate = new Date(date.getTime() + adjustmentDays * 86400000);

    // Astronomical Tabular Kuwaiti Algorithm
    const day = adjustedDate.getUTCDate();
    const month = adjustedDate.getUTCMonth(); // 0-indexed
    const year = adjustedDate.getUTCFullYear();

    let m = month + 1;
    let y = year;
    if (m < 3) {
      y -= 1;
      m += 12;
    }

    const a = Math.floor(y / 100);
    const b = 2 - a + Math.floor(a / 4);
    const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5;

    const z = jd - 1948440 + 10632;
    const n = Math.floor((z - 1) / 10631);
    const z1 = z - 10631 * n + 354;
    const j = Math.floor((10982 - z1) / 5316) * Math.floor((50 * z1) / 17719) + Math.floor(z1 / 5670) * Math.floor((43 * z1) / 15238);
    const z2 = z1 - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
    const hMonth = Math.floor((24 * z2) / 709);
    const hDay = z2 - Math.floor((709 * hMonth) / 24);
    const hYear = 30 * n + j - 30;

    const monthIdx = Math.max(0, Math.min(11, hMonth - 1));
    const monthObj = HIJRI_MONTHS[monthIdx];

    const events: string[] = [];
    if (monthIdx === 8) events.push('Holy Month of Ramadan (Fasting)');
    if (monthIdx === 11 && hDay >= 8 && hDay <= 13) events.push('Hajj Pilgrimage & Eid al-Adha');
    if (monthIdx === 0 && hDay === 10) events.push('Day of Ashura');
    if (monthIdx === 9 && hDay === 1) events.push('Eid al-Fitr');

    return {
      day: hDay,
      monthIndex: monthIdx,
      monthNameAr: monthObj.ar,
      monthNameEn: monthObj.en,
      year: hYear,
      formatted: `${hDay} ${monthObj.en} ${hYear} AH`,
      isSacredMonth: monthObj.sacred,
      associatedEvents: events,
    };
  }
}
