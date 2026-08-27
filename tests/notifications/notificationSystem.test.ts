/**
 * ASTRO360 — Personal Astrology Notification System QA Test Suite
 * Validates permission state lifecycle, non-alarmist phrasing, quiet hours,
 * timezone calculations, precision limits, deduplication, and throttling.
 */

import { 
  DEFAULT_NOTIFICATION_PREFERENCES, 
  type NotificationPreferences,
  type AstrologyNotificationEvent,
  type PeriodType
} from '../../src/lib/notifications/notificationTypes';

import { NotificationPermissionService } from '../../src/lib/notifications/notificationPermissionService';
import { 
  NotificationPolicyEngine, 
  isInsideQuietHours, 
  formatAstrologyNotificationCopy 
} from '../../src/lib/notifications/notificationPolicyEngine';
import { NotificationHistoryService } from '../../src/lib/notifications/notificationHistoryService';
import { NotificationScheduler } from '../../src/lib/notifications/notificationScheduler';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    throw new Error(message);
  }
  console.log(`✅ Passed [${message}]`);
}

console.log('============================================================');
console.log('🔔 ASTRO360 PERSONAL ASTROLOGY ALERT & NOTIFICATION QA SUITE');
console.log('============================================================\n');

// 1. PERMISSION LIFECYCLE & INSTRUCTIONS
console.log('--- 1. PERMISSION LIFECYCLE & BROWSER GUIDANCE ---');
const unblockGuide = NotificationPermissionService.getUnblockInstructions();
assert(unblockGuide.length > 20, 'Browser unblock instructions generated clearly');
assert(DEFAULT_NOTIFICATION_PREFERENCES.enabled === false, 'Notifications are disabled by default (explicit opt-in only)');

// 2. NON-ALARMIST ASTROLOGICAL COPY GENERATION
console.log('\n--- 2. NON-ALARMIST ASTROLOGICAL COPY ---');
const supportiveCopy = formatAstrologyNotificationCopy('CAREER', 'SUPPORTIVE', '1_DAY', 'Supportive / Attention');
assert(supportiveCopy.title.includes('Career: Supportive Window'), 'Supportive title formatted cleanly');
assert(supportiveCopy.body.includes('supportive period') || supportiveCopy.body.includes('favorable window'), 'Non-alarmist supportive body generated');
assert(!supportiveCopy.body.includes('guaranteed'), 'Zero outcome guarantees in copy');

const challengingCopy = formatAstrologyNotificationCopy('RELATIONSHIPS', 'CHALLENGING', '3_DAYS', 'Supportive / Attention');
assert(challengingCopy.title.includes('Relationships: Attention Window'), 'Challenging period framed as Attention Window');
assert(challengingCopy.body.includes('period for closer attention'), 'Challenging phrasing formatted as closer attention');
assert(!challengingCopy.body.includes('bad') && !challengingCopy.body.includes('doomed'), 'Zero fatalistic wording in copy');

// 3. QUIET HOURS & TIMEZONE EVALUATION
console.log('\n--- 3. QUIET HOURS & TIMEZONE BOUNDARIES ---');
const quietConfig = { enabled: true, start: '22:00', end: '07:00' };

// Test 23:30 UTC -> inside quiet hours
const nightDate = new Date('2026-08-27T23:30:00Z');
assert(isInsideQuietHours(nightDate, quietConfig, 'UTC') === true, '23:30 is correctly detected inside 22:00-07:00 quiet hours');

// Test 14:00 UTC -> outside quiet hours
const dayDate = new Date('2026-08-27T14:00:00Z');
assert(isInsideQuietHours(dayDate, quietConfig, 'UTC') === false, '14:00 is correctly detected outside quiet hours');

// Test across timezones (e.g. 14:00 UTC = 19:30 IST [Daytime, not quiet], but 20:00 UTC = 01:30 IST [Quiet])
const istNightInUtc = new Date('2026-08-27T20:00:00Z'); // 01:30 AM in Asia/Kolkata
assert(isInsideQuietHours(istNightInUtc, quietConfig, 'Asia/Kolkata') === true, 'Asia/Kolkata 01:30 AM correctly detected as quiet hours');

// 4. PRECISION-AWARE TIMING RULES
console.log('\n--- 4. TIMING PRECISION ENFORCEMENT ---');
const activePrefs: NotificationPreferences = {
  ...DEFAULT_NOTIFICATION_PREFERENCES,
  enabled: true,
  quietHours: { enabled: false, start: '22:00', end: '07:00' }, // disable quiet hours for pure policy tests
};

// Event with MONTH precision attempting 1_DAY lead time must be blocked
const monthPrecisionEvent: AstrologyNotificationEvent = {
  id: 'ev-month-1',
  eventId: 'CAREER:2027-09:2027-10:v3',
  title: 'Career Shift',
  body: 'Career shift in September',
  category: 'CAREER',
  periodType: 'SUPPORTIVE',
  severity: 'INFO',
  precision: 'MONTH',
  targetDate: '2027-09-01T00:00:00Z',
  deepLinkUrl: '/forecast',
  whyReason: 'General planetary movement',
  leadTime: '1_DAY', // Invalid for month precision!
  read: false,
  createdAt: new Date().toISOString(),
};

const precisionRes = NotificationPolicyEngine.evaluate(monthPrecisionEvent, activePrefs, 'test_user');
assert(precisionRes.allowed === false, 'Policy engine rejects 1_DAY alert for MONTH-precision prediction');
assert(precisionRes.reason?.includes('precision is MONTH-level'), 'Correct precision rejection reason returned');

// 5. CATEGORY & POLARITY FILTERING
console.log('\n--- 5. CATEGORY & POLARITY FILTERING ---');
const mutedCategoryPrefs: NotificationPreferences = {
  ...activePrefs,
  categories: {
    ...activePrefs.categories,
    TRAVEL: false, // Travel disabled
  },
  categoryPolarity: {
    CAREER: { supportive: true, challenging: false, neutral: false }, // Challenging career alerts muted
  }
};

const travelEvent: AstrologyNotificationEvent = {
  id: 'ev-travel-1',
  eventId: 'TRAVEL:2027-09-12:v3',
  title: 'Travel Timing',
  body: 'Favorable travel window',
  category: 'TRAVEL',
  periodType: 'SUPPORTIVE',
  severity: 'INFO',
  precision: 'DAY',
  targetDate: '2027-09-12T00:00:00Z',
  deepLinkUrl: '/forecast',
  whyReason: 'Jupiter 9th house transit',
  leadTime: '3_DAYS',
  read: false,
  createdAt: new Date().toISOString(),
};

const travelRes = NotificationPolicyEngine.evaluate(travelEvent, mutedCategoryPrefs, 'test_user');
assert(travelRes.allowed === false, 'Disabled category (TRAVEL) rejected by policy engine');

const challengingCareerEvent: AstrologyNotificationEvent = {
  id: 'ev-career-chal-1',
  eventId: 'CAREER:2027-10-01:v3',
  title: 'Career Attention',
  body: 'Closer attention needed',
  category: 'CAREER',
  periodType: 'CHALLENGING',
  severity: 'INFO',
  precision: 'DAY',
  targetDate: '2027-10-01T00:00:00Z',
  deepLinkUrl: '/forecast',
  whyReason: 'Saturn square natal Sun',
  leadTime: '1_DAY',
  read: false,
  createdAt: new Date().toISOString(),
};

const chalRes = NotificationPolicyEngine.evaluate(challengingCareerEvent, mutedCategoryPrefs, 'test_user');
assert(chalRes.allowed === false, 'Muted polarity (CHALLENGING) for CAREER rejected by policy engine');

// 6. DAILY THROTTLING CAP
console.log('\n--- 6. DAILY THROTTLING ENFORCEMENT ---');
const validDayEvent: AstrologyNotificationEvent = {
  id: 'ev-career-supp-1',
  eventId: 'CAREER:2027-09-15:v3',
  title: 'Career Support',
  body: 'Supportive career window',
  category: 'CAREER',
  periodType: 'SUPPORTIVE',
  severity: 'IMPORTANT',
  precision: 'DAY',
  targetDate: '2027-09-15T00:00:00Z',
  deepLinkUrl: '/forecast',
  whyReason: 'Moon trine Jupiter',
  leadTime: '1_DAY',
  read: false,
  createdAt: new Date().toISOString(),
};

// 3 alerts already sent today -> 4th alert throttled
const throttleRes = NotificationPolicyEngine.evaluate(validDayEvent, activePrefs, 'test_user', 3);
assert(throttleRes.allowed === false, 'Daily threshold cap of 3 prevents notification spam');
assert(throttleRes.reason?.includes('Daily notification threshold'), 'Throttling limit message returned');

// 7. DEDUPLICATION KEY GENERATION
console.log('\n--- 7. DEDUPLICATION ENGINE ---');
const eval1 = NotificationPolicyEngine.evaluate(validDayEvent, activePrefs, 'test_user', 0);
assert(eval1.allowed === true, 'Eligible astrological alert approved by policy engine');
assert(eval1.deduplicationKey === 'test_user:CAREER:2027-09-15:v3:1_DAY:v3', 'Deduplication key is deterministic and stable');

console.log('\n============================================================');
console.log('🏆 ALL NOTIFICATION & ASTROLOGY ALERT QA ASSERTIONS PASSED CLEANLY!');
console.log('============================================================\n');
