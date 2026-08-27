/**
 * ASTRO360 — Notification Policy & Evaluation Engine
 * Validates, filters, and formats astrological alerts strictly according to user preferences,
 * timezone boundaries, quiet hours, timing precision, and ethical non-alarmist standards.
 */

import { 
  type AstrologyNotificationEvent, 
  type NotificationPreferences, 
  type PeriodType,
  type WordingPreference
} from './notificationTypes';

export interface PolicyEvaluationResult {
  allowed: boolean;
  reason?: string;
  formattedTitle: string;
  formattedBody: string;
  deduplicationKey: string;
  isQuietHours: boolean;
}

/**
 * Checks if the current instant falls inside the user's configured Quiet Hours in their local timezone.
 */
export function isInsideQuietHours(
  now: Date, 
  quietHours: { enabled: boolean; start: string; end: string },
  userTimezone: string = 'UTC'
): boolean {
  if (!quietHours.enabled) return false;

  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: userTimezone,
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });

    const parts = formatter.formatToParts(now);
    const hour = parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10);
    const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10);
    const currentMinutes = hour * 60 + minute;

    const [startH, startM] = quietHours.start.split(':').map(Number);
    const [endH, endM] = quietHours.end.split(':').map(Number);
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    if (startMinutes > endMinutes) {
      // Crosses midnight, e.g. 22:00 (1320) to 07:00 (420)
      return currentMinutes >= startMinutes || currentMinutes < endMinutes;
    } else {
      // Same day quiet window, e.g. 13:00 to 15:00
      return currentMinutes >= startMinutes && currentMinutes < endMinutes;
    }
  } catch (err) {
    console.warn('Timezone calculation error for quiet hours:', err);
    return false;
  }
}

/**
 * Generates respectful, non-alarmist astrological notification copy.
 */
export function formatAstrologyNotificationCopy(
  category: string,
  periodType: PeriodType,
  leadTime: string,
  wording: WordingPreference = 'Supportive / Attention',
  customTitle?: string
): { title: string; body: string } {
  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

  let polarityTerm = 'important transition';
  if (periodType === 'SUPPORTIVE') {
    polarityTerm = wording.includes('Favorable') ? 'favorable window' : 'supportive period';
  } else if (periodType === 'CHALLENGING') {
    polarityTerm = wording.includes('Attention') ? 'period for closer attention' : 'challenging period';
  }

  let timeContext = 'beginning tomorrow';
  if (leadTime === '7_DAYS') timeContext = 'approaching in 7 days';
  else if (leadTime === '3_DAYS') timeContext = 'approaching in 3 days';
  else if (leadTime === '1_DAY') timeContext = 'beginning tomorrow';
  else if (leadTime === 'AT_START') timeContext = 'beginning today';
  else if (leadTime === 'AT_PEAK') timeContext = 'reaching peak astronomical alignment today';

  const title = customTitle || `${categoryLabel}: ${periodType === 'SUPPORTIVE' ? 'Supportive Window' : periodType === 'CHALLENGING' ? 'Attention Window' : 'Astrological Transition'}`;
  const body = `An astrologically ${polarityTerm} in your ${categoryLabel} forecast is ${timeContext}.`;

  return { title, body };
}

export class NotificationPolicyEngine {
  /**
   * Evaluates if a notification event complies with all user preferences and safety boundaries.
   */
  public static evaluate(
    event: AstrologyNotificationEvent,
    userPrefs: NotificationPreferences,
    userId: string = 'user',
    todaySentCount: number = 0
  ): PolicyEvaluationResult {
    const deduplicationKey = `${userId}:${event.eventId}:${event.leadTime}:v3`;

    // 1. Check if notifications are globally enabled
    if (!userPrefs.enabled) {
      return {
        allowed: false,
        reason: 'User has notifications disabled',
        formattedTitle: event.title,
        formattedBody: event.body,
        deduplicationKey,
        isQuietHours: false,
      };
    }

    // 2. Check if category is enabled
    if (userPrefs.categories && userPrefs.categories[event.category] === false) {
      return {
        allowed: false,
        reason: `Category ${event.category} is disabled by user`,
        formattedTitle: event.title,
        formattedBody: event.body,
        deduplicationKey,
        isQuietHours: false,
      };
    }

    // 3. Check polarity preferences (supportive vs challenging)
    const catPolarity = userPrefs.categoryPolarity?.[event.category];
    if (catPolarity) {
      if (event.periodType === 'SUPPORTIVE' && !catPolarity.supportive) {
        return {
          allowed: false,
          reason: `Supportive periods for ${event.category} muted by user`,
          formattedTitle: event.title,
          formattedBody: event.body,
          deduplicationKey,
          isQuietHours: false,
        };
      }
      if (event.periodType === 'CHALLENGING' && !catPolarity.challenging) {
        return {
          allowed: false,
          reason: `Challenging periods for ${event.category} muted by user`,
          formattedTitle: event.title,
          formattedBody: event.body,
          deduplicationKey,
          isQuietHours: false,
        };
      }
    }

    // 4. Timing Precision Rule: Month-precision predictions cannot have day/hour specific alerts
    if (event.precision === 'MONTH' && (event.leadTime === '1_DAY' || event.leadTime === '1_HOUR' || event.leadTime === '12_HOURS')) {
      return {
        allowed: false,
        reason: 'Event timing precision is MONTH-level; sub-day lead times not permitted',
        formattedTitle: event.title,
        formattedBody: event.body,
        deduplicationKey,
        isQuietHours: false,
      };
    }

    // 5. Daily Throttling Limit
    const maxAlerts = userPrefs.maxDailyAlerts || 3;
    if (todaySentCount >= maxAlerts && !event.isTest && event.severity !== 'HIGH_IMPORTANCE') {
      return {
        allowed: false,
        reason: `Daily notification threshold of ${maxAlerts} reached`,
        formattedTitle: event.title,
        formattedBody: event.body,
        deduplicationKey,
        isQuietHours: false,
      };
    }

    // 6. Quiet Hours check
    const isQuiet = isInsideQuietHours(new Date(), userPrefs.quietHours, userPrefs.timezone);
    if (isQuiet && event.severity !== 'HIGH_IMPORTANCE' && !event.isTest) {
      return {
        allowed: false,
        reason: 'Currently inside user Quiet Hours (queued for morning)',
        formattedTitle: event.title,
        formattedBody: event.body,
        deduplicationKey,
        isQuietHours: true,
      };
    }

    // 7. Format clean copy
    const formatted = formatAstrologyNotificationCopy(
      event.category,
      event.periodType,
      event.leadTime,
      userPrefs.wordingPreference,
      event.title
    );

    return {
      allowed: true,
      formattedTitle: formatted.title,
      formattedBody: formatted.body,
      deduplicationKey,
      isQuietHours: false,
    };
  }
}
