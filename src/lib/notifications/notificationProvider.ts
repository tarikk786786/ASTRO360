/**
 * ASTRO360 — Notification Provider Abstraction
 * Decouples notification delivery so native Web Push is the primary free-first engine,
 * with optional adapter interfaces for FCM / OneSignal.
 */

import { type AstrologyNotificationEvent, type PushSubscriptionRecord } from './notificationTypes';

export interface NotificationProvider {
  readonly name: string;
  isAvailable(): boolean;
  subscribe(userId: string): Promise<PushSubscriptionRecord | null>;
  unsubscribe(): Promise<boolean>;
  send(event: AstrologyNotificationEvent): Promise<boolean>;
  getSubscriptionStatus(): Promise<'active' | 'inactive' | 'unsupported'>;
}
