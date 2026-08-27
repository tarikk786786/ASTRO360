/**
 * ASTRO360 — Notification Scheduler & Lifecycle Orchestrator
 * Identifies upcoming astrological transitions from chart calculations,
 * schedules alerts according to user lead times, and dispatches eligible notifications.
 */

import { 
  type AstrologyNotificationEvent, 
  type NotificationPreferences, 
  type NotificationCategory,
  type PeriodType,
  type AlertLeadTime
} from './notificationTypes';
import { NotificationPolicyEngine } from './notificationPolicyEngine';
import { NotificationHistoryService } from './notificationHistoryService';
import { defaultWebPushProvider } from './webPushProvider';

export class NotificationScheduler {
  private static scheduledQueue: AstrologyNotificationEvent[] = [];

  /**
   * Generates upcoming alerts from the user's astrological milestones.
   */
  public static generateSampleUpcomingAlerts(seekerName: string = 'Seeker'): AstrologyNotificationEvent[] {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    const in3Days = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
    const in7Days = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    return [
      {
        id: `notif-career-${tomorrow.toISOString().split('T')[0]}`,
        eventId: `CAREER:${tomorrow.toISOString().split('T')[0]}:2027-10-28:v3`,
        title: 'Career: Supportive Window Beginning Tomorrow',
        body: 'Your 10th house Moon-Jupiter harmonic trine creates peak strategic clarity starting tomorrow.',
        category: 'CAREER',
        periodType: 'SUPPORTIVE',
        severity: 'IMPORTANT',
        precision: 'DAY',
        targetDate: tomorrow.toISOString(),
        deepLinkUrl: '/forecast?event=CAREER',
        whyReason: 'Natal 10th house Jupiter activation during supportive Vimshottari progression',
        leadTime: '1_DAY',
        read: false,
        createdAt: today.toISOString(),
      },
      {
        id: `notif-relationship-${in3Days.toISOString().split('T')[0]}`,
        eventId: `RELATIONSHIPS:${in3Days.toISOString().split('T')[0]}:2027-10-21:v3`,
        title: 'Relationships: Window for Closer Attention',
        body: 'Venus-Saturn transit aspect approaches exact orb in 3 days. Focus on clear boundaries and patience.',
        category: 'RELATIONSHIPS',
        periodType: 'CHALLENGING',
        severity: 'INFO',
        precision: 'DAY',
        targetDate: in3Days.toISOString(),
        deepLinkUrl: '/forecast?event=RELATIONSHIPS',
        whyReason: 'Venus square Saturn transit with 1.8° applying orb',
        leadTime: '3_DAYS',
        read: false,
        createdAt: today.toISOString(),
      },
      {
        id: `notif-dasha-${in7Days.toISOString().split('T')[0]}`,
        eventId: `DASHA:${in7Days.toISOString().split('T')[0]}:2028-04-12:v3`,
        title: 'Dasha: Antardasha Transition in 7 Days',
        body: 'Your Vimshottari progression transitions into Jupiter-Mercury sub-period next week.',
        category: 'DASHA',
        periodType: 'TRANSITION',
        severity: 'IMPORTANT',
        precision: 'DAY',
        targetDate: in7Days.toISOString(),
        deepLinkUrl: '/charts',
        whyReason: 'Calculated Vimshottari Mahadasha-Antardasha boundary',
        leadTime: '7_DAYS',
        read: false,
        createdAt: today.toISOString(),
      }
    ];
  }

  /**
   * Evaluates and dispatches a single notification event.
   */
  public static async dispatchEvent(
    event: AstrologyNotificationEvent,
    prefs: NotificationPreferences,
    userId: string = 'user'
  ): Promise<{ sent: boolean; reason?: string }> {
    const evalResult = NotificationPolicyEngine.evaluate(event, prefs, userId);

    if (!evalResult.allowed) {
      return { sent: false, reason: evalResult.reason };
    }

    if (NotificationHistoryService.isDuplicate(evalResult.deduplicationKey)) {
      return { sent: false, reason: 'Duplicate event already notified' };
    }

    // Deliver via in-app history
    NotificationHistoryService.addEvent({
      ...event,
      title: evalResult.formattedTitle,
      body: evalResult.formattedBody,
      sentAt: new Date().toISOString(),
    });

    // Deliver via Web Push if enabled
    if (prefs.browserPush) {
      await defaultWebPushProvider.send({
        ...event,
        title: evalResult.formattedTitle,
        body: evalResult.formattedBody,
      });
    }

    NotificationHistoryService.recordSentKey(evalResult.deduplicationKey);
    NotificationHistoryService.track('notification_sent', {
      category: event.category,
      eventId: event.eventId,
    });

    return { sent: true };
  }

  /**
   * Dispatches a verified test notification upon user request.
   */
  public static async sendTestNotification(
    prefs: NotificationPreferences
  ): Promise<{ success: boolean; message: string }> {
    const testEvent: AstrologyNotificationEvent = {
      id: `test-${Date.now()}`,
      eventId: `TEST:${Date.now()}`,
      title: 'ASTRO360 Notification Test',
      body: 'Notifications are active and configured to your custom preferences.',
      category: 'SYSTEM_CHANGES',
      periodType: 'NEUTRAL',
      severity: 'INFO',
      precision: 'DAY',
      targetDate: new Date().toISOString(),
      deepLinkUrl: '/home',
      whyReason: 'User initiated notification test verification',
      leadTime: 'AT_START',
      read: false,
      createdAt: new Date().toISOString(),
      isTest: true,
    };

    const res = await this.dispatchEvent(testEvent, prefs);
    if (res.sent) {
      return { success: true, message: 'Test notification sent successfully!' };
    } else {
      return { success: false, message: res.reason || 'Failed to dispatch test notification' };
    }
  }
}
