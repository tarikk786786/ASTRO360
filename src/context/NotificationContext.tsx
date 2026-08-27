/**
 * ASTRO360 — Global Notification Context & State Manager
 * Synchronizes browser push subscriptions, in-app notification center,
 * user alert preferences, and permission prompts.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  type NotificationPermissionState, 
  type NotificationPreferences, 
  type AstrologyNotificationEvent,
  DEFAULT_NOTIFICATION_PREFERENCES 
} from '../lib/notifications/notificationTypes';
import { NotificationPermissionService } from '../lib/notifications/notificationPermissionService';
import { NotificationHistoryService } from '../lib/notifications/notificationHistoryService';
import { NotificationScheduler } from '../lib/notifications/notificationScheduler';
import { defaultWebPushProvider } from '../lib/notifications/webPushProvider';

const PREFS_STORAGE_KEY = 'astro_notification_prefs_v1';

interface NotificationContextType {
  permissionState: NotificationPermissionState;
  preferences: NotificationPreferences;
  notifications: AstrologyNotificationEvent[];
  unreadCount: number;
  isCenterOpen: boolean;
  isPrePermissionOpen: boolean;
  
  // Actions
  updatePreferences: (partial: Partial<NotificationPreferences>) => void;
  requestPermission: () => Promise<boolean>;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  sendTestAlert: () => Promise<{ success: boolean; message: string }>;
  openCenter: () => void;
  closeCenter: () => void;
  openPrePermission: () => void;
  closePrePermission: () => void;
  refreshNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [permissionState, setPermissionState] = useState<NotificationPermissionState>('default');
  const [preferences, setPreferences] = useState<NotificationPreferences>(() => {
    if (typeof window === 'undefined') return DEFAULT_NOTIFICATION_PREFERENCES;
    try {
      const stored = localStorage.getItem(PREFS_STORAGE_KEY);
      return stored ? { ...DEFAULT_NOTIFICATION_PREFERENCES, ...JSON.parse(stored) } : DEFAULT_NOTIFICATION_PREFERENCES;
    } catch {
      return DEFAULT_NOTIFICATION_PREFERENCES;
    }
  });

  const [notifications, setNotifications] = useState<AstrologyNotificationEvent[]>([]);
  const [isCenterOpen, setIsCenterOpen] = useState(false);
  const [isPrePermissionOpen, setIsPrePermissionOpen] = useState(false);

  // Sync initial state and history
  const refreshNotifications = useCallback(() => {
    const history = NotificationHistoryService.getHistory();
    if (history.length === 0) {
      // Seed with initial upcoming forecast milestones
      const initialAlerts = NotificationScheduler.generateSampleUpcomingAlerts();
      initialAlerts.forEach(a => NotificationHistoryService.addEvent(a));
      setNotifications(NotificationHistoryService.getHistory());
    } else {
      setNotifications(history);
    }
  }, []);

  useEffect(() => {
    setPermissionState(NotificationPermissionService.getPermissionState());
    refreshNotifications();
  }, [refreshNotifications]);

  // Update preferences and persist
  const updatePreferences = useCallback((partial: Partial<NotificationPreferences>) => {
    setPreferences(prev => {
      const updated: NotificationPreferences = {
        ...prev,
        ...partial,
        lastUpdated: new Date().toISOString(),
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  // Request browser permission upon user gesture
  const requestPermission = useCallback(async (): Promise<boolean> => {
    NotificationHistoryService.track('permission_requested');
    const newState = await NotificationPermissionService.requestPermission();
    setPermissionState(newState);

    if (newState === 'granted') {
      NotificationHistoryService.track('permission_granted');
      updatePreferences({ enabled: true, browserPush: true });
      await defaultWebPushProvider.subscribe('current_user');
      setIsPrePermissionOpen(false);
      return true;
    } else {
      NotificationHistoryService.track('permission_denied');
      updatePreferences({ enabled: false, browserPush: false });
      return false;
    }
  }, [updatePreferences]);

  const markAsRead = useCallback((id: string) => {
    NotificationHistoryService.markAsRead(id);
    refreshNotifications();
  }, [refreshNotifications]);

  const markAllAsRead = useCallback(() => {
    NotificationHistoryService.markAllAsRead();
    refreshNotifications();
  }, [refreshNotifications]);

  const deleteNotification = useCallback((id: string) => {
    NotificationHistoryService.deleteEvent(id);
    refreshNotifications();
  }, [refreshNotifications]);

  const sendTestAlert = useCallback(async () => {
    const res = await NotificationScheduler.sendTestNotification(preferences);
    refreshNotifications();
    return res;
  }, [preferences, refreshNotifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        permissionState,
        preferences,
        notifications,
        unreadCount,
        isCenterOpen,
        isPrePermissionOpen,
        updatePreferences,
        requestPermission,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        sendTestAlert,
        openCenter: () => setIsCenterOpen(true),
        closeCenter: () => setIsCenterOpen(false),
        openPrePermission: () => setIsPrePermissionOpen(true),
        closePrePermission: () => setIsPrePermissionOpen(false),
        refreshNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export function useNotifications(): NotificationContextType {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
