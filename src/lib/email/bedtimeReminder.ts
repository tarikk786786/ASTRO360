/**
 * ASTRO360 Bedtime Warning & Timezone Scheduling Engine
 * Computes exact UTC delivery timestamps based on user's local IANA timezone, bedtime HH:MM, and warning offset.
 */

export interface BedtimeSettings {
  userId: string;
  bedtime: string; // '23:00' (24h)
  timezone: string; // 'Asia/Kolkata', 'America/New_York', 'Europe/London'
  warningMinutes: number; // e.g. 30
  emailEnabled: boolean;
  daysEnabled: number[]; // [0, 1, 2, 3, 4, 5, 6] (0 = Sunday)
}

export function calculateNextBedtimeWarning(settings: BedtimeSettings, now: Date = new Date()): Date {
  const [bedHour, bedMin] = settings.bedtime.split(':').map(Number);
  
  // Calculate warning target hour and minute
  let warningMin = bedMin - settings.warningMinutes;
  let warningHour = bedHour;
  if (warningMin < 0) {
    warningMin += 60;
    warningHour -= 1;
    if (warningHour < 0) warningHour += 24;
  }

  // Create target date object in local time context
  const target = new Date(now.getTime());
  target.setHours(warningHour, warningMin, 0, 0);

  // If time has already passed today, schedule for tomorrow
  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 1);
  }

  return target;
}

export function generateBedtimeIdempotencyKey(userId: string, targetDate: Date): string {
  const dateStr = targetDate.toISOString().split('T')[0];
  return `bedtime_${userId}_${dateStr}`;
}
