/**
 * ASTRO360 — Notification Permission Service
 * Manages browser push notification permission lifecycle responsibly.
 *
 * Web Platform & UX Rules:
 * - Never prompt immediately on first page load without user context.
 * - Always trigger permission requests via explicit user gesture.
 * - Respect denial without repeated nagging.
 */

import { type NotificationPermissionState } from './notificationTypes';

export class NotificationPermissionService {
  /**
   * Checks current browser notification permission state.
   */
  public static getPermissionState(): NotificationPermissionState {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return 'unsupported';
    }
    return Notification.permission as NotificationPermissionState;
  }

  /**
   * Evaluates if Web Push & Notifications API are supported on this platform.
   */
  public static isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    const hasNotification = 'Notification' in window;
    const hasServiceWorker = 'serviceWorker' in navigator;
    const hasPushManager = 'PushManager' in window;
    return hasNotification && hasServiceWorker && hasPushManager;
  }

  /**
   * Requests browser notification permission. Must be called from a user gesture.
   */
  public static async requestPermission(): Promise<NotificationPermissionState> {
    if (!this.isSupported()) {
      return 'unsupported';
    }

    try {
      const permission = await Notification.requestPermission();
      return permission as NotificationPermissionState;
    } catch (err) {
      console.warn('Error requesting notification permission:', err);
      return Notification.permission as NotificationPermissionState;
    }
  }

  /**
   * Returns human-readable browser instructions for unblocking notifications.
   */
  public static getUnblockInstructions(): string {
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    if (/iPhone|iPad|iPod/i.test(userAgent)) {
      return 'To enable notifications on iOS: Tap the Share button in Safari, select "Add to Home Screen", open the ASTRO360 app from your home screen, and enable notifications in Settings.';
    }
    if (/Android/i.test(userAgent)) {
      return 'To enable notifications on Android Chrome: Tap the padlock or settings icon in the address bar → Site Settings → Notifications → Allow.';
    }
    if (/Chrome|Chromium|Edg/i.test(userAgent)) {
      return 'To enable notifications on Chrome/Edge: Click the tune/padlock icon on the left of the address bar → Site settings → Notifications → Allow.';
    }
    if (/Firefox/i.test(userAgent)) {
      return 'To enable notifications on Firefox: Click the permissions icon next to the URL → Clear blocked permission → Refresh and tap Enable.';
    }
    return 'Open your browser settings, navigate to Site Permissions for ASTRO360, and set Notifications to Allow.';
  }
}
