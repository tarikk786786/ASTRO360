/**
 * ASTRO360 MARKETING BRAIN - Privacy-Preserving Event Tracker
 * Strict telemetry without capturing sensitive PII / birth coordinates.
 */

import { MarketingEvent, MarketingEventType } from './types';

const BUFFER_KEY = 'astro_marketing_events_buffer';
const MAX_LOCAL_EVENTS = 500;

// Sensitive keys that must NEVER be passed into generic analytics events
const FORBIDDEN_KEYS = [
  'dob', 'birthDate', 'birth_date',
  'time', 'birthTime', 'birth_time',
  'location', 'birthLocation', 'birthCity',
  'latitude', 'lat', 'longitude', 'lng',
  'notes', 'privateNotes', 'password', 'token', 'apiKey',
  'cardNumber', 'cvv'
];

export class MarketingEventTracker {
  private static sessionId: string = MarketingEventTracker.initSession();

  private static initSession(): string {
    try {
      if (typeof window !== 'undefined') {
        let sid = sessionStorage.getItem('astro_mb_session_id');
        if (!sid) {
          sid = 'sess_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
          sessionStorage.setItem('astro_mb_session_id', sid);
        }
        return sid;
      }
      return 'sess_ssr_' + Date.now();
    } catch {
      return 'sess_fallback_' + Date.now();
    }
  }

  /**
   * Sanitizes payload properties to strictly enforce zero PII leakage
   */
  public static sanitizeProperties(rawProps?: Record<string, any>): Record<string, string | number | boolean> {
    if (!rawProps) return {};
    const sanitized: Record<string, string | number | boolean> = {};

    for (const [key, val] of Object.entries(rawProps)) {
      const lowerKey = key.toLowerCase();
      const isForbidden = FORBIDDEN_KEYS.some(f => lowerKey.includes(f.toLowerCase()));
      if (!isForbidden) {
        if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
          sanitized[key] = val;
        } else if (val !== null && val !== undefined) {
          sanitized[key] = String(val).substring(0, 100);
        }
      } else {
        sanitized[key] = '[MASKED_PII]';
      }
    }
    return sanitized;
  }

  /**
   * Captures a high-signal marketing / product event
   */
  public static track(
    type: MarketingEventType,
    properties?: Record<string, any>,
    page?: string
  ): MarketingEvent {
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
    const isTablet = typeof window !== 'undefined' ? window.innerWidth >= 768 && window.innerWidth < 1024 : false;

    const event: MarketingEvent = {
      id: 'evt_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now(),
      type,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      page: page || (typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/'),
      device: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
      properties: this.sanitizeProperties(properties),
    };

    this.persistEvent(event);
    return event;
  }

  private static persistEvent(event: MarketingEvent) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(BUFFER_KEY);
        const list: MarketingEvent[] = raw ? JSON.parse(raw) : [];
        list.push(event);
        if (list.length > MAX_LOCAL_EVENTS) {
          list.splice(0, list.length - MAX_LOCAL_EVENTS);
        }
        localStorage.setItem(BUFFER_KEY, JSON.stringify(list));
      }
    } catch (e) {
      // Graceful fallback if storage quota or privacy mode is blocked
    }
  }

  public static getStoredEvents(): MarketingEvent[] {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(BUFFER_KEY);
        return raw ? JSON.parse(raw) : [];
      }
      return [];
    } catch {
      return [];
    }
  }

  public static clearBuffer(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(BUFFER_KEY);
      }
    } catch {}
  }
}
