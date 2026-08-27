/**
 * ASTRO360 — Personal Astrology Notification System Data Types
 * Safe, non-alarmist, privacy-respecting, explainable notification schemas.
 */

export type NotificationPermissionState = 
  | 'unsupported'
  | 'default'
  | 'granted'
  | 'denied';

export type NotificationCategory = 
  | 'CAREER'
  | 'RELATIONSHIPS'
  | 'LOVE'
  | 'MONEY'
  | 'EDUCATION'
  | 'TRAVEL'
  | 'FAMILY'
  | 'PERSONAL_GROWTH'
  | 'SPIRITUALITY'
  | 'PANCHANGA'
  | 'DASHA'
  | 'TRANSITS'
  | 'MOON'
  | 'CALENDAR'
  | 'REPORTS'
  | 'SYSTEM_CHANGES';

export type PeriodType = 
  | 'SUPPORTIVE'
  | 'NEUTRAL'
  | 'CHALLENGING'
  | 'TRANSITION'
  | 'IMPORTANT'
  | 'HIGH_ACTIVITY'
  | 'LOW_ACTIVITY'
  | 'START'
  | 'PEAK'
  | 'END';

export type AlertSeverity = 
  | 'INFO'
  | 'IMPORTANT'
  | 'HIGH_IMPORTANCE';

export type NotificationTimingPrecision = 
  | 'EXACT_MINUTE'
  | 'HOUR'
  | 'DAY'
  | 'WEEK'
  | 'MONTH';

export type AlertLeadTime = 
  | '7_DAYS'
  | '3_DAYS'
  | '1_DAY'
  | '12_HOURS'
  | '1_HOUR'
  | 'AT_START'
  | 'AT_PEAK';

export type NotificationTone = 
  | 'Calm'
  | 'Minimal'
  | 'Warm'
  | 'Professional'
  | 'Traditional';

export type WordingPreference = 
  | 'Supportive / Attention'
  | 'Favorable / Challenging'
  | 'Good / Attention';

export interface QuietHoursConfig {
  enabled: boolean;
  start: string; // e.g. "22:00"
  end: string;   // e.g. "07:00"
}

export interface CategoryPolaritySetting {
  supportive: boolean;
  challenging: boolean;
  neutral: boolean;
}

export interface NotificationPreferences {
  enabled: boolean;
  categories: Record<NotificationCategory, boolean>;
  categoryPolarity: Partial<Record<NotificationCategory, CategoryPolaritySetting>>;
  intensity: 'Minimal' | 'Important' | 'Detailed';
  wordingPreference: WordingPreference;
  quietHours: QuietHoursConfig;
  timezone: string;
  language: string;
  tone: NotificationTone;
  browserPush: boolean;
  inApp: boolean;
  dailyDigest: boolean;
  weeklyDigest: boolean;
  maxDailyAlerts: number;
  importantOnly: boolean;
  lastUpdated: string;
}

export interface PushSubscriptionRecord {
  subscriptionId: string;
  userId: string;
  endpoint: string;
  publicKey: string;
  authKey: string;
  browser: string;
  platform: string;
  createdAt: string;
  lastSeenAt: string;
  status: 'active' | 'revoked' | 'expired';
}

export interface AstrologyNotificationEvent {
  id: string;
  eventId: string; // Canonical event ID, e.g. "CAREER:2027-09-12:2027-10-28:v3"
  title: string;
  body: string;
  category: NotificationCategory;
  periodType: PeriodType;
  severity: AlertSeverity;
  precision: NotificationTimingPrecision;
  targetDate: string; // ISO-8601
  deepLinkUrl: string; // e.g. "/forecast?event=CAREER:2027-09-12:2027-10-28:v3"
  whyReason: string; // Explainability
  leadTime: AlertLeadTime;
  read: boolean;
  createdAt: string;
  sentAt?: string;
  clickedAt?: string;
  isTest?: boolean;
}

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  enabled: false, // Explicit opt-in only
  categories: {
    CAREER: true,
    RELATIONSHIPS: true,
    LOVE: true,
    MONEY: true,
    EDUCATION: false,
    TRAVEL: false,
    FAMILY: false,
    PERSONAL_GROWTH: true,
    SPIRITUALITY: false,
    PANCHANGA: false,
    DASHA: true,
    TRANSITS: true,
    MOON: false,
    CALENDAR: true,
    REPORTS: true,
    SYSTEM_CHANGES: true,
  },
  categoryPolarity: {
    CAREER: { supportive: true, challenging: true, neutral: true },
    RELATIONSHIPS: { supportive: true, challenging: true, neutral: false },
    LOVE: { supportive: true, challenging: false, neutral: false },
    MONEY: { supportive: true, challenging: true, neutral: false },
    DASHA: { supportive: true, challenging: true, neutral: true },
    TRANSITS: { supportive: true, challenging: true, neutral: true },
  },
  intensity: 'Important',
  wordingPreference: 'Supportive / Attention',
  quietHours: {
    enabled: true,
    start: '22:00',
    end: '07:00',
  },
  timezone: Intl?.DateTimeFormat?.()?.resolvedOptions?.()?.timeZone || 'UTC',
  language: 'en',
  tone: 'Calm',
  browserPush: true,
  inApp: true,
  dailyDigest: false,
  weeklyDigest: false,
  maxDailyAlerts: 3,
  importantOnly: true,
  lastUpdated: new Date().toISOString(),
};
