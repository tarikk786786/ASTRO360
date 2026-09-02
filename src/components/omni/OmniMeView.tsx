import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, Calendar, Clock, MapPin, ShieldCheck, FileText, 
  Settings, Bell, Lock, Cpu, Sparkles, ChevronRight, 
  CheckCircle2, ArrowRight, Eye, RefreshCw, HelpCircle, Trash2 
} from 'lucide-react';
import { UserProfile } from '../../types';
import OmniShareCardGenerator from './OmniShareCardGenerator';
import { AstroNotificationSettings } from '../notifications';

interface OmniMeViewProps {
  userProfile: UserProfile;
  onEditProfile: () => void;
  onNavigate: (tab: string) => void;
  onResetAllData?: () => void;
}

export default function OmniMeView({
  userProfile,
  onEditProfile,
  onNavigate,
  onResetAllData
}: OmniMeViewProps) {
  const [expertMode, setExpertMode] = useState(false);

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-left pb-20">
      
      {/* 1. Header Profile Card */}
      <div className="p-6 rounded-3xl bg-[#111315]/80 border border-white/[0.08] shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-amber-500/20 shrink-0">
            {userProfile.name?.charAt(0).toUpperCase() || <User className="w-6 h-6" />}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              {userProfile.name || 'Seeker'}
            </h1>
            <p className="text-xs font-mono text-slate-400 flex items-center gap-2 pt-0.5">
              <span>{userProfile.location || 'Location set'}</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">Active Chart</span>
            </p>
          </div>
        </div>

        <button
          onClick={onEditProfile}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/[0.08] text-xs font-mono font-bold transition-all cursor-pointer self-start sm:self-auto"
        >
          Edit Birth Data
        </button>
      </div>

      {/* 2. Birth Data Details Summary */}
      <div className="p-5 rounded-3xl bg-[#111315]/80 border border-white/[0.08] space-y-3">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
          <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-amber-400" /> Your Birth Parameters
          </h2>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-white/[0.08] font-bold">
            Verified UTC
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-0.5">
            <span className="text-[10px] text-slate-500 block">Birth Date</span>
            <span className="font-bold text-white">{userProfile.dob || '1998-06-15'}</span>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-0.5">
            <span className="text-[10px] text-slate-500 block">Birth Time</span>
            <span className="font-bold text-white">{userProfile.time || '12:00'} (Local)</span>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-0.5">
            <span className="text-[10px] text-slate-500 block">Location</span>
            <span className="font-bold text-white truncate block">{userProfile.location || 'London, UK'}</span>
          </div>
        </div>

        {/* Active Tradition Engine Profile */}
        <div className="p-3.5 rounded-2xl bg-[#111315]/80 border border-white/[0.08] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-white/[0.08] flex items-center justify-center text-cyan-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <span className="text-white font-bold block capitalize">
                {userProfile.preferredSystem || 'Vedic Parashari'} Tradition Engine
              </span>
              <span className="text-[10.5px] text-slate-400">
                NASA JPL DE440 Sub-Arcsecond Ephemeris Synchronized
              </span>
            </div>
          </div>
          <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-white/[0.08] uppercase">
            Active Framework
          </span>
        </div>

        {/* Pro Free Access Status */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-indigo-500/10 border border-white/[0.08] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <div>
              <span className="text-white font-bold block">ASTRO360 Pro — Lifetime Free Access</span>
              <span className="text-[10.5px] text-emerald-400">All 152+ engines & deep multi-tradition tools unlocked free</span>
            </div>
          </div>
          <span className="text-[10px] font-bold text-slate-950 bg-amber-400 px-2.5 py-1 rounded-lg uppercase">
            100% Free ($0.00)
          </span>
        </div>
      </div>

      {/* 3. Saved Reports & Executive PDF Downloads */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-white tracking-tight">Executive Reports & Dossiers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div 
            onClick={() => onNavigate('report-generator')}
            className="p-4 rounded-2xl bg-[#111315]/80 hover:bg-[#131F37] border border-white/[0.08] hover:border-white/[0.08] transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-400/10 text-amber-400 border border-white/[0.08]">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                  18-Page Natal Dossier
                </h3>
                <p className="text-[10.5px] text-slate-400">Complete Kundli & Dasha Report</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
          </div>

          <div 
            onClick={() => onNavigate('report-generator')}
            className="p-4 rounded-2xl bg-[#111315]/80 hover:bg-[#131F37] border border-white/[0.08] hover:border-white/[0.08] transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-400/10 text-cyan-400 border border-white/[0.08]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Annual 2026–2027 Forecast
                </h3>
                <p className="text-[10.5px] text-slate-400">Timing Horizons & Transits</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>

      {/* 3.5. Social 9:16 Story Card Generator */}
      <OmniShareCardGenerator userProfile={userProfile} />

      {/* 4. Preferences, Privacy & Settings */}
      <div className="p-5 rounded-3xl bg-[#111315]/80 border border-white/[0.08] space-y-3 text-xs font-mono">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Preferences & Privacy
        </h2>

        <div className="space-y-2">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="font-bold text-white block">Private & Local Storage</span>
                <span className="text-[10.5px] text-slate-400 block">Your birth coordinates never leave your device.</span>
              </div>
            </div>
            <span className="text-emerald-400 font-bold text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-white/[0.08]">
              Encrypted
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <div>
                <span className="font-bold text-white block">Calculation Methodology</span>
                <span className="text-[10.5px] text-slate-400 block">JPL DE440 Ephemeris, Lahiri Ayanamsha, Placidus.</span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('methodology')}
              className="text-amber-400 hover:text-amber-300 text-xs font-bold underline cursor-pointer"
            >
              View →
            </button>
          </div>

          {onResetAllData && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Trash2 className="w-4 h-4 text-rose-400 shrink-0" />
                <div>
                  <span className="font-bold text-rose-300 block">Reset All Stored Data</span>
                  <span className="text-[10.5px] text-slate-400 block">Clear cached birth profile on this device and start completely fresh.</span>
                </div>
              </div>
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to reset all stored birth details on this device and return to the fresh start page?")) {
                    onResetAllData();
                  }
                }}
                className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 hover:text-rose-200 border border-rose-500/40 text-xs font-bold font-mono transition-colors cursor-pointer shrink-0"
              >
                Reset & Start Fresh
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 4.5. Personal Astrology Notification Settings */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
          <Bell className="w-4 h-4 text-amber-400" /> Notifications & Astrological Timing Alerts
        </h2>
        <AstroNotificationSettings />
      </div>

      {/* 5. Optional Expert Mode Switcher */}
      <div className="p-5 rounded-3xl bg-[#111315]/80 border border-white/[0.08] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-4 h-4 text-indigo-400" />
            <div>
              <h2 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Expert & Professional Tools
              </h2>
              <p className="text-[11px] text-slate-400">
                Unlock D1–D60 vargas, raw ephemeris, BTR suite, and research mode.
              </p>
            </div>
          </div>
          <button
            onClick={() => setExpertMode(!expertMode)}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
              expertMode
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white/10 text-slate-400 hover:text-white'
            }`}
          >
            {expertMode ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        {expertMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2 text-xs font-mono"
          >
            <button
              onClick={() => onNavigate('divisional-charts')}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/[0.08] text-left cursor-pointer"
            >
              📊 D1–D60 Vargas
            </button>
            <button
              onClick={() => onNavigate('btr-suite')}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/[0.08] text-left cursor-pointer"
            >
              🎯 Birth Time Rectification
            </button>
            <button
              onClick={() => onNavigate('omni-research')}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/[0.08] text-left cursor-pointer"
            >
              🔬 OMNI Research Core
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/[0.08] text-left cursor-pointer"
            >
              🚀 Master 152+ Studio
            </button>
          </motion.div>
        )}
      </div>

    </div>
  );
}
