import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  X, 
  CheckCheck, 
  Trash2, 
  ArrowRight, 
  Sparkles, 
  ShieldAlert, 
  Compass, 
  Sliders, 
  Calendar, 
  Clock, 
  HelpCircle,
  TrendingUp,
  Heart,
  Briefcase
} from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { type AstrologyNotificationEvent } from '../../lib/notifications/notificationTypes';

export interface AstroNotificationCenterModalProps {
  onNavigate?: (tab: string, params?: any) => void;
  onOpenSettings?: () => void;
}

export const AstroNotificationCenterModal: React.FC<AstroNotificationCenterModalProps> = ({
  onNavigate,
  onOpenSettings,
}) => {
  const { 
    isCenterOpen, 
    closeCenter, 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification,
    openPrePermission,
    permissionState
  } = useNotifications();

  const [activeTab, setActiveTab] = useState<'today' | 'upcoming' | 'earlier'>('today');

  if (!isCenterOpen) return null;

  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  const todayList = notifications.filter(n => n.targetDate?.startsWith(todayStr) || n.sentAt?.startsWith(todayStr));
  const upcomingList = notifications.filter(n => n.targetDate && n.targetDate > todayStr);
  const earlierList = notifications.filter(n => !todayList.includes(n) && !upcomingList.includes(n));

  const currentList = activeTab === 'today' ? todayList : activeTab === 'upcoming' ? upcomingList : earlierList;

  const handleOpenItem = (item: AstrologyNotificationEvent) => {
    markAsRead(item.id);
    closeCenter();
    if (onNavigate) {
      if (item.deepLinkUrl.includes('forecast')) {
        onNavigate('forecast');
      } else if (item.deepLinkUrl.includes('charts')) {
        onNavigate('charts');
      } else {
        onNavigate('home');
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCenter}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Center Modal Drawer */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="notification-center-title"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full max-w-xl bg-[#070C16] border-t sm:border border-white/15 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col z-10 max-h-[88vh] overflow-hidden"
          style={{
            paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))',
          }}
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between gap-3 bg-[#0B1220]/90">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-400/10 border border-white/[0.08] text-amber-400">
                <Bell className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <h2 id="notification-center-title" className="text-base sm:text-lg font-extrabold text-white font-sans">
                    Astrology Notifications
                  </h2>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-mono font-bold bg-white text-black font-semibold shadow-sm px-2 py-0.2 rounded-full shadow-sm">
                      {unreadCount} unread
                    </span>
                  )}
                </div>
                <p className="text-xs font-mono text-slate-400">Personalized timing alerts & milestone updates</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllAsRead}
                  title="Mark all as read"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <CheckCheck className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={closeCenter}
                aria-label="Close notification center"
                className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Browser Permission Prompt Banner if Default */}
          {permissionState !== 'granted' && (
            <div className="p-3 bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-transparent border-b border-white/[0.08] flex items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-200">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Enable push notifications to receive timing alerts when closed.</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  closeCenter();
                  openPrePermission();
                }}
                className="px-2.5 py-1 rounded-lg bg-white text-black font-semibold shadow-sm font-bold text-xs font-mono shrink-0 cursor-pointer shadow-sm hover:bg-amber-300"
              >
                Enable
              </button>
            </div>
          )}

          {/* Tabs (Today / Upcoming / Earlier) */}
          <div className="grid grid-cols-3 p-2 border-b border-white/10 bg-[#090F1C] gap-1.5 text-xs font-mono font-bold">
            {[
              { id: 'today', label: `Today (${todayList.length})` },
              { id: 'upcoming', label: `Upcoming (${upcomingList.length})` },
              { id: 'earlier', label: `Earlier (${earlierList.length})` },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 rounded-xl transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white text-black font-semibold shadow-sm shadow-md font-black'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Scrollable Notification List */}
          <div className="p-4 sm:p-5 overflow-y-auto space-y-3 text-left">
            {currentList.length === 0 ? (
              <div className="py-12 text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-500">
                  <Bell className="w-6 h-6 opacity-40" />
                </div>
                <p className="text-sm font-medium text-slate-300">No notifications in this section</p>
                <p className="text-xs text-slate-500 font-mono">You will be alerted as astrological milestones approach.</p>
              </div>
            ) : (
              currentList.map(item => {
                const isSupportive = item.periodType === 'SUPPORTIVE';
                const isChallenging = item.periodType === 'CHALLENGING';

                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl border transition-all space-y-2.5 relative group ${
                      !item.read
                        ? 'bg-[#0E172B] border-white/[0.12] shadow-lg'
                        : 'bg-[#090F1C] border-white/10 hover:border-white/20'
                    }`}
                  >
                    {/* Category & Polarity Badges */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[9.5px] font-mono font-bold uppercase text-slate-300 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                          {item.category}
                        </span>

                        <span className={`text-[9.5px] font-mono font-bold px-2 py-0.5 rounded border ${
                          isSupportive
                            ? 'text-emerald-300 bg-emerald-500/10 border-white/[0.08]'
                            : isChallenging
                            ? 'text-amber-300 bg-amber-500/10 border-white/[0.08]'
                            : 'text-cyan-300 bg-cyan-500/10 border-white/[0.08]'
                        }`}>
                          {isSupportive ? 'Supportive' : isChallenging ? 'Attention Window' : 'Transition'}
                        </span>

                        {!item.read && (
                          <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.9)]" />
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => deleteNotification(item.id)}
                        aria-label="Delete alert"
                        className="opacity-60 hover:opacity-100 text-slate-400 hover:text-rose-400 p-1 transition-opacity cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Notification Title & Body */}
                    <div>
                      <h4 className="text-sm font-bold text-white font-sans">{item.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed pt-0.5 font-sans">{item.body}</p>
                    </div>

                    {/* Explainability / Why Reason */}
                    {item.whyReason && (
                      <div className="p-2.5 rounded-xl bg-[#060A14] border border-white/5 text-[11px] font-mono text-slate-400 flex items-start gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span><strong>Why:</strong> {item.whyReason}</span>
                      </div>
                    )}

                    {/* Action Deep-Link Button */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] font-mono text-slate-500">
                        {item.targetDate ? new Date(item.targetDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Today'}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleOpenItem(item)}
                        className="flex items-center gap-1 text-xs font-mono font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                      >
                        <span>View Context</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer with Preferences Deep-Link */}
          <div className="p-3 border-t border-white/10 bg-[#090F1C] flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Manage your alert rules</span>
            <button
              type="button"
              onClick={() => {
                closeCenter();
                if (onOpenSettings) onOpenSettings();
                else if (onNavigate) onNavigate('me');
              }}
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Notification Settings</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AstroNotificationCenterModal;
