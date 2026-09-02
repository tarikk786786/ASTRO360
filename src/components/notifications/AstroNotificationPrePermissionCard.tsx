import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  X, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { NotificationPermissionService } from '../../lib/notifications/notificationPermissionService';

export const AstroNotificationPrePermissionCard: React.FC = () => {
  const { 
    isPrePermissionOpen, 
    closePrePermission, 
    requestPermission, 
    permissionState 
  } = useNotifications();

  if (!isPrePermissionOpen) return null;

  const isDenied = permissionState === 'denied';

  const handleEnable = async () => {
    await requestPermission();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closePrePermission}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Permission Card */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="permission-card-title"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full max-w-md bg-[#070C16] border-t sm:border border-white/15 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col z-10 p-5 sm:p-6 text-left space-y-4"
          style={{
            paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/15 border border-white/[0.08] flex items-center justify-center text-amber-300">
              <Bell className="w-5 h-5" />
            </div>
            <button
              type="button"
              onClick={closePrePermission}
              aria-label="Close permission dialog"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-1">
            <h3 id="permission-card-title" className="text-lg font-extrabold text-white font-sans">
              Stay Informed on Key Planetary Windows
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              ASTRO360 can quietly alert you when important personal astrological milestones approach in your saved chart.
            </p>
          </div>

          {/* Value Points */}
          <div className="space-y-2 py-1">
            {[
              'Supportive career & relationship alignment windows',
              'Exact transit peaks and Vimshottari Dasha sub-period shifts',
              'Quiet hours respected (no alerts between 22:00–07:00)',
              'Zero fear-inducing or alarmist messages',
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* If Denied, show browser unblocking guide */}
          {isDenied ? (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-rose-300 font-bold font-mono">
                <AlertCircle className="w-4 h-4" />
                <span>Notifications are blocked in your browser</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {NotificationPermissionService.getUnblockInstructions()}
              </p>
            </div>
          ) : null}

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-2">
            {!isDenied ? (
              <button
                type="button"
                onClick={handleEnable}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-300 hover:from-amber-400 hover:to-amber-200 text-slate-950 font-bold font-mono text-sm shadow-lg shadow-amber-400/25 active:scale-95 transition-all cursor-pointer"
              >
                Enable Astrology Notifications
              </button>
            ) : null}

            <button
              type="button"
              onClick={closePrePermission}
              className="w-full py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white font-mono text-xs transition-colors cursor-pointer"
            >
              {isDenied ? 'Close' : 'Not Now'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AstroNotificationPrePermissionCard;
