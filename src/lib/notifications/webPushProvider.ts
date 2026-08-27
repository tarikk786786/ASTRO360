/**
 * ASTRO360 — Native Web Push Provider
 * Implements NotificationProvider using standard W3C Push API, Notifications API,
 * and Service Worker. Free-first, zero third-party lock-in.
 */

import { type NotificationProvider } from './notificationProvider';
import { type AstrologyNotificationEvent, type PushSubscriptionRecord } from './notificationTypes';
import { NotificationPermissionService } from './notificationPermissionService';

export class WebPushProvider implements NotificationProvider {
  public readonly name = 'WebPush';

  public isAvailable(): boolean {
    return NotificationPermissionService.isSupported();
  }

  public async subscribe(userId: string): Promise<PushSubscriptionRecord | null> {
    if (!this.isAvailable()) return null;

    try {
      const reg = await navigator.serviceWorker.ready;
      let subscription = await reg.pushManager.getSubscription();

      if (!subscription) {
        // Subscribe using applicationServerKey if available, or basic push
        subscription = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          // Standard public VAPID application key can be attached here
        }).catch(() => null);
      }

      const pKey = subscription?.getKey('p256dh');
      const aKey = subscription?.getKey('auth');

      const record: PushSubscriptionRecord = {
        subscriptionId: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        userId: userId || 'anonymous_seeker',
        endpoint: subscription?.endpoint || 'local_service_worker',
        publicKey: pKey ? btoa(String.fromCharCode(...new Uint8Array(pKey))) : '',
        authKey: aKey ? btoa(String.fromCharCode(...new Uint8Array(aKey))) : '',
        browser: navigator.userAgent.includes('Chrome') ? 'Chrome' : navigator.userAgent.includes('Firefox') ? 'Firefox' : 'Safari',
        platform: navigator.platform || 'mobile',
        createdAt: new Date().toISOString(),
        lastSeenAt: new Date().toISOString(),
        status: 'active',
      };

      return record;
    } catch (err) {
      console.warn('WebPush subscription error:', err);
      return null;
    }
  }

  public async unsubscribe(): Promise<boolean> {
    if (!this.isAvailable()) return false;
    try {
      const reg = await navigator.serviceWorker.ready;
      const subscription = await reg.pushManager.getSubscription();
      if (subscription) {
        return await subscription.unsubscribe();
      }
      return true;
    } catch (err) {
      console.warn('Error unsubscribing from Web Push:', err);
      return false;
    }
  }

  public async send(event: AstrologyNotificationEvent): Promise<boolean> {
    if (!this.isAvailable()) return false;
    if (Notification.permission !== 'granted') return false;

    try {
      const reg = await navigator.serviceWorker.ready;
      if (reg && reg.showNotification) {
        await reg.showNotification(event.title, {
          body: event.body,
          icon: '/favicon.svg',
          badge: '/favicon.svg',
          tag: event.eventId,
          data: {
            url: event.deepLinkUrl,
            eventId: event.eventId,
            category: event.category,
            whyReason: event.whyReason,
          },
          requireInteraction: event.severity === 'HIGH_IMPORTANCE',
        });
        return true;
      }
      return false;
    } catch (err) {
      console.warn('Failed to display service worker notification:', err);
      // Fallback to desktop Notification if SW fails
      try {
        new Notification(event.title, {
          body: event.body,
          icon: '/favicon.svg',
          tag: event.eventId,
        });
        return true;
      } catch {
        return false;
      }
    }
  }

  public async getSubscriptionStatus(): Promise<'active' | 'inactive' | 'unsupported'> {
    if (!this.isAvailable()) return 'unsupported';
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      return sub ? 'active' : 'inactive';
    } catch {
      return 'inactive';
    }
  }
}

export const defaultWebPushProvider = new WebPushProvider();
