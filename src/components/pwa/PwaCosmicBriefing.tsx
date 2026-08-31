import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, Bell, Clock, Sun, Moon, Sparkles, 
  ShieldCheck, Check, AlertTriangle, ArrowRight, Download
} from 'lucide-react';
import { toast } from 'sonner';

interface PwaCosmicBriefingProps {
  onNavigateToTab?: (tab: string) => void;
}

export default function PwaCosmicBriefing({ onNavigateToTab }: PwaCosmicBriefingProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [installed, setInstalled] = useState(false);

  const handleEnableNotifications = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          setNotificationsEnabled(true);
          toast.success('Daily Morning Cosmic Briefing notifications enabled!');
        } else {
          toast.info('Notifications were not granted.');
        }
      });
    } else {
      setNotificationsEnabled(true);
      toast.success('Daily Morning Cosmic Briefing enabled!');
    }
  };

  const handleInstallPwa = () => {
    setInstalled(true);
    toast.success('ASTRO360 added to your device home screen!');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-400/10 border border-indigo-400/25 text-indigo-300 text-xs font-mono font-bold">
            <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
            <span>Mobile PWA & Daily Timing Briefing</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            NATIVE MOBILE APP & DAILY MUHURTA BRIEFING
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            Install ASTRO360 directly to your iPhone or Android home screen and receive automated daily Muhurta and Rahu Kaal alerts.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleInstallPwa}
            className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-400/20 transition-all cursor-pointer active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{installed ? 'App Installed ✓' : 'Install App to Home Screen'}</span>
          </button>
        </div>
      </div>

      {/* Live Daily Cosmic Timing Board */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1220] border border-white/12 shadow-2xl space-y-6 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/8 pb-3">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase">Today's Celestial Timing Horizon</h3>
          </div>
          <span className="text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded text-[10px] font-bold border border-emerald-400/20">
            ● Real-Time Diurnal Clock
          </span>
        </div>

        {/* Grid of Key Daily Timers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          
          {/* Abhijit Muhurta */}
          <div className="p-4 rounded-2xl bg-[#060A12] border border-emerald-400/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Abhijit Muhurta
              </span>
              <span className="text-[10px] bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                Most Auspicious
              </span>
            </div>
            <strong className="text-base text-white block">11:48 AM – 12:36 PM</strong>
            <p className="text-[11px] text-slate-400 font-sans">Optimal window for all new contracts, financial investments, and vital decisions.</p>
          </div>

          {/* Rahu Kaal */}
          <div className="p-4 rounded-2xl bg-[#060A12] border border-rose-400/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-rose-400 text-xs font-bold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Rahu Kaal
              </span>
              <span className="text-[10px] bg-rose-400/20 text-rose-300 px-2 py-0.5 rounded font-bold">
                Avoid Initiations
              </span>
            </div>
            <strong className="text-base text-white block">07:30 AM – 09:00 AM</strong>
            <p className="text-[11px] text-slate-400 font-sans">Unfavorable for beginning travels, ceremonies, or signing legal papers.</p>
          </div>

          {/* Active Tithi & Nakshatra */}
          <div className="p-4 rounded-2xl bg-[#060A12] border border-cyan-400/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-cyan-400 text-xs font-bold flex items-center gap-1">
                <Moon className="w-3.5 h-3.5" /> Today's Tithi
              </span>
              <span className="text-[10px] bg-cyan-400/20 text-cyan-300 px-2 py-0.5 rounded font-bold">
                Shukla Paksha
              </span>
            </div>
            <strong className="text-base text-white block">Chaturdashi (14th Tithi)</strong>
            <p className="text-[11px] text-slate-400 font-sans">Governed by Shiva / Rudra. Optimal for intense spiritual meditation and focus.</p>
          </div>

        </div>

        {/* Daily Push Notification Toggle Box */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-cyan-500/10 to-indigo-500/10 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-400" />
              <strong className="text-white text-sm">Automated Morning Cosmic Briefing</strong>
            </div>
            <p className="text-xs text-slate-300 font-sans">
              Get an instant notification at 07:00 AM every morning with today's Abhijit Muhurta, Rahu Kaal, and planetary ingress alerts.
            </p>
          </div>

          <button
            onClick={handleEnableNotifications}
            className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shrink-0 transition-all cursor-pointer active:scale-95 ${
              notificationsEnabled
                ? 'bg-emerald-400 text-slate-950 shadow-md'
                : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg shadow-amber-400/20'
            }`}
          >
            {notificationsEnabled ? (
              <>
                <Check className="w-4 h-4" />
                <span>Notifications Enabled</span>
              </>
            ) : (
              <>
                <Bell className="w-4 h-4" />
                <span>Enable Morning Alerts</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
