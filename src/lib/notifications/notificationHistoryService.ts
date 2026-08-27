/**
 * ASTRO360 — Notification History, Deduplication & Telemetry Service
 * Manages in-app notification state, deduplication storage, and observability metrics.
 */

import { type AstrologyNotificationEvent, type NotificationCategory } from './notificationTypes';

const HISTORY_STORAGE_KEY = 'astro_notification_history_v1';
const DEDUPLICATION_KEY_STORAGE = 'astro_sent_notification_keys_v1';
const TELEMETRY_STORAGE_KEY = 'astro_notification_telemetry_v1';

export interface NotificationTelemetryEvent {
  event: 'permission_requested' | 'permission_granted' | 'permission_denied' | 'notification_scheduled' | 'notification_sent' | 'notification_clicked' | 'notification_dismissed' | 'category_muted';
  category?: string;
  eventId?: string;
  timestamp: string;
}

export class NotificationHistoryService {
  /**
   * Retrieves all in-app notification history.
   */
  public static getHistory(): AstrologyNotificationEvent[] {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  /**
   * Appends an event to the in-app notification history.
   */
  public static addEvent(event: AstrologyNotificationEvent): void {
    if (typeof window === 'undefined') return;
    try {
      const history = this.getHistory();
      // Unshift to put newest first, limit to 50 items
      const updated = [event, ...history.filter(h => h.id !== event.id)].slice(0, 50);
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn('Failed to save notification history:', err);
    }
  }

  /**
   * Marks a specific notification as read.
   */
  public static markAsRead(id: string): void {
    if (typeof window === 'undefined') return;
    const history = this.getHistory();
    const updated = history.map(item => item.id === id ? { ...item, read: true } : item);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  }

  /**
   * Marks all notifications as read.
   */
  public static markAllAsRead(): void {
    if (typeof window === 'undefined') return;
    const history = this.getHistory();
    const updated = history.map(item => ({ ...item, read: true }));
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  }

  /**
   * Deletes a notification from history.
   */
  public static deleteEvent(id: string): void {
    if (typeof window === 'undefined') return;
    const history = this.getHistory();
    const updated = history.filter(item => item.id !== id);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  }

  /**
   * Checks if an event key has already been sent to prevent duplicates.
   */
  public static isDuplicate(deduplicationKey: string): boolean {
    if (typeof window === 'undefined') return false;
    try {
      const keys = JSON.parse(localStorage.getItem(DEDUPLICATION_KEY_STORAGE) || '[]');
      return keys.includes(deduplicationKey);
    } catch {
      return false;
    }
  }

  /**
   * Records a sent deduplication key.
   */
  public static recordSentKey(deduplicationKey: string): void {
    if (typeof window === 'undefined') return;
    try {
      const keys = JSON.parse(localStorage.getItem(DEDUPLICATION_KEY_STORAGE) || '[]');
      if (!keys.includes(deduplicationKey)) {
        keys.push(deduplicationKey);
        // Keep last 200 keys
        if (keys.length > 200) keys.shift();
        localStorage.setItem(DEDUPLICATION_KEY_STORAGE, JSON.stringify(keys));
      }
    } catch (err) {
      console.warn('Failed to record sent key:', err);
    }
  }

  /**
   * Records telemetry for notification observability.
   */
  public static track(event: NotificationTelemetryEvent['event'], details?: { category?: string; eventId?: string }): void {
    if (typeof window === 'undefined') return;
    try {
      const list: NotificationTelemetryEvent[] = JSON.parse(localStorage.getItem(TELEMETRY_STORAGE_KEY) || '[]');
      list.push({
        event,
        category: details?.category,
        eventId: details?.eventId,
        timestamp: new Date().toISOString(),
      });
      if (list.length > 100) list.shift();
      localStorage.setItem(TELEMETRY_STORAGE_KEY, JSON.stringify(list));
    } catch {}
  }
}
