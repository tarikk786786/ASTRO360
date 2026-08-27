import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Bell, 
  Moon, 
  ShieldCheck, 
  Sliders, 
  Sparkles, 
  Check, 
  Volume2, 
  Clock, 
  Send,
  AlertTriangle,
  Globe
} from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { type NotificationCategory, type WordingPreference, type NotificationTone } from '../../lib/notifications/notificationTypes';
import { toast } from 'sonner';

export const AstroNotificationSettings: React.FC = () => {
  const { 
    preferences, 
    updatePreferences, 
    requestPermission, 
    permissionState,
    sendTestAlert 
  } = useNotifications();

  const [isSendingTest, setIsSendingTest] = useState(false);

  const handleToggleCategory = (cat: NotificationCategory) => {
    const nextCategories = {
      ...preferences.categories,
      [cat]: !preferences.categories[cat],
    };
    updatePreferences({ categories: nextCategories });
  };

  const handleTogglePolarity = (cat: NotificationCategory, polarityType: 'supportive' | 'challenging') => {
    const currentCatPolarity = preferences.categoryPolarity?.[cat] || { supportive: true, challenging: true, neutral: true };
    const updated = {
      ...preferences.categoryPolarity,
      [cat]: {
        ...currentCatPolarity,
        [polarityType]: !currentCatPolarity[polarityType],
      },
    };
    updatePreferences({ categoryPolarity: updated });
  };

  const handleSendTest = async () => {
    setIsSendingTest(true);
    try {
      const res = await sendTestAlert();
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } finally {
      setIsSendingTest(false);
    }
  };

  return (
    <div className="space-y-6 text-left font-sans">
      {/* Global Master Switch */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#090F1E] border border-white/10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white">Astrology Alerts & Push Notifications</h3>
            <p className="text-xs text-slate-400 font-mono">
              Status: {permissionState === 'granted' ? 'Active in Browser' : permissionState === 'denied' ? 'Blocked in Browser' : 'Opt-in Required'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            if (!preferences.enabled && permissionState !== 'granted') {
              requestPermission();
            } else {
              updatePreferences({ enabled: !preferences.enabled });
            }
          }}
          className={`px-4 py-2 rounded-2xl text-xs font-mono font-bold transition-all cursor-pointer shadow-md ${
            preferences.enabled
              ? 'bg-amber-400 text-slate-950 font-black'
              : 'bg-white/10 text-slate-400 hover:text-white'
          }`}
        >
          {preferences.enabled ? 'Enabled' : 'Disabled'}
        </button>
      </div>

      {/* Wording Preference & Tone */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#090F1E] border border-white/10 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
          <Sliders className="w-4 h-4 text-amber-400" />
          <span>Wording & Astrological Tone</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs text-slate-300 font-bold block">Period Wording Style</label>
            <select
              value={preferences.wordingPreference}
              onChange={(e) => updatePreferences({ wordingPreference: e.target.value as WordingPreference })}
              className="w-full px-3 py-2 rounded-xl bg-[#070C16] border border-white/15 text-xs font-mono text-white focus:outline-none focus:border-amber-400"
            >
              <option value="Supportive / Attention">Supportive / Attention (Recommended)</option>
              <option value="Favorable / Challenging">Favorable / Challenging</option>
              <option value="Good / Attention">Good / Attention</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-300 font-bold block">Notification Tone</label>
            <select
              value={preferences.tone}
              onChange={(e) => updatePreferences({ tone: e.target.value as NotificationTone })}
              className="w-full px-3 py-2 rounded-xl bg-[#070C16] border border-white/15 text-xs font-mono text-white focus:outline-none focus:border-amber-400"
            >
              <option value="Calm">Calm (Default)</option>
              <option value="Warm">Warm</option>
              <option value="Minimal">Minimal</option>
              <option value="Professional">Professional</option>
              <option value="Traditional">Traditional</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quiet Hours & Timezone */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#090F1E] border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
            <Moon className="w-4 h-4 text-cyan-400" />
            <span>Quiet Hours (No Disturbances)</span>
          </div>

          <button
            type="button"
            onClick={() => updatePreferences({ quietHours: { ...preferences.quietHours, enabled: !preferences.quietHours.enabled } })}
            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer ${
              preferences.quietHours.enabled ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/40' : 'bg-white/5 text-slate-400'
            }`}
          >
            {preferences.quietHours.enabled ? 'Active' : 'Off'}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-slate-400">Quiet Window Start</span>
            <input
              type="time"
              value={preferences.quietHours.start}
              onChange={(e) => updatePreferences({ quietHours: { ...preferences.quietHours, start: e.target.value } })}
              className="w-full px-3 py-2 rounded-xl bg-[#070C16] border border-white/15 text-xs font-mono text-white"
            />
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-mono text-slate-400">Quiet Window End</span>
            <input
              type="time"
              value={preferences.quietHours.end}
              onChange={(e) => updatePreferences({ quietHours: { ...preferences.quietHours, end: e.target.value } })}
              className="w-full px-3 py-2 rounded-xl bg-[#070C16] border border-white/15 text-xs font-mono text-white"
            />
          </div>
        </div>

        <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 pt-1">
          <Globe className="w-3.5 h-3.5 text-slate-500" />
          <span>Configured Timezone: <strong>{preferences.timezone}</strong></span>
        </div>
      </div>

      {/* Category Toggles & Polarity */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#090F1E] border border-white/10 space-y-4">
        <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider block">
          Category Alerts & Polarity Controls
        </span>

        <div className="space-y-2.5">
          {(['CAREER', 'RELATIONSHIPS', 'LOVE', 'MONEY', 'DASHA', 'TRANSITS', 'PANCHANGA', 'REPORTS'] as NotificationCategory[]).map(cat => {
            const isEnabled = preferences.categories[cat];
            const catPolarity = preferences.categoryPolarity?.[cat] || { supportive: true, challenging: true, neutral: true };

            return (
              <div
                key={cat}
                className="p-3.5 rounded-2xl bg-[#070C16] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleToggleCategory(cat)}
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${
                      isEnabled ? 'bg-amber-400 border-amber-400 text-slate-950' : 'border-white/20 bg-white/5'
                    }`}
                  >
                    {isEnabled && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>
                  <span className="text-xs font-bold text-white font-mono uppercase">{cat}</span>
                </div>

                {/* Polarity Pills (Supportive vs Attention) */}
                {isEnabled && (
                  <div className="flex items-center gap-1.5 self-end sm:self-auto text-[11px] font-mono">
                    <button
                      type="button"
                      onClick={() => handleTogglePolarity(cat, 'supportive')}
                      className={`px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                        catPolarity.supportive ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-bold' : 'border-white/10 text-slate-500'
                      }`}
                    >
                      Supportive
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTogglePolarity(cat, 'challenging')}
                      className={`px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                        catPolarity.challenging ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 font-bold' : 'border-white/10 text-slate-500'
                      }`}
                    >
                      Attention
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Test Notification Trigger */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#090F1E] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 className="text-xs font-bold text-white">Verify System Delivery</h4>
          <p className="text-[11px] text-slate-400 font-mono">Dispatches a safe test notification to confirm browser delivery.</p>
        </div>

        <button
          type="button"
          onClick={handleSendTest}
          disabled={isSendingTest}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white font-mono font-bold text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <Send className="w-3.5 h-3.5 text-amber-400" />
          <span>{isSendingTest ? 'Sending...' : 'Send Test Alert'}</span>
        </button>
      </div>
    </div>
  );
};

export default AstroNotificationSettings;
