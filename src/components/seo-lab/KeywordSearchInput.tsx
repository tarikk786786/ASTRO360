import React, { useState } from 'react';
import { 
  Search, Globe, SlidersHorizontal, Sparkles, RefreshCw, 
  Smartphone, Monitor, HelpCircle, ArrowRight 
} from 'lucide-react';
import { KeywordInputState, SearchEngine, DeviceType, TimeRange } from '../../lib/seo-lab/types';

interface KeywordSearchInputProps {
  inputState: KeywordInputState;
  onChange: (updated: Partial<KeywordInputState>) => void;
  onSearch: () => void;
  isLoading: boolean;
  progressMessage?: string;
  progressPercent?: number;
}

const COUNTRIES = [
  { name: 'United States', code: 'US' },
  { name: 'India', code: 'IN' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'Canada', code: 'CA' },
  { name: 'Australia', code: 'AU' },
  { name: 'United Arab Emirates', code: 'AE' },
  { name: 'Germany', code: 'DE' },
  { name: 'Singapore', code: 'SG' }
];

const LANGUAGES = [
  { name: 'English', code: 'en' },
  { name: 'Hindi (हिन्दी)', code: 'hi' },
  { name: 'Spanish (Español)', code: 'es' },
  { name: 'French (Français)', code: 'fr' },
  { name: 'Arabic (العربية)', code: 'ar' },
  { name: 'German (Deutsch)', code: 'de' }
];

const QUICK_SEEDS = [
  'birth chart',
  'nakshatra',
  'kundli matching',
  'today panchang',
  'vimshottari dasha',
  'sade sati remedies',
  'saturn transit 2026',
  'ascendant calculator'
];

export default function KeywordSearchInput({
  inputState,
  onChange,
  onSearch,
  isLoading,
  progressMessage,
  progressPercent
}: KeywordSearchInputProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputState.seed.trim() || isLoading) return;
    onSearch();
  };

  return (
    <div className="w-full space-y-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 sm:p-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-500/20 backdrop-blur-xl transition-all shadow-xl">
          <div className="flex items-center flex-1 px-3 gap-2.5">
            <Search className="w-5 h-5 text-cyan-400 shrink-0" />
            <input
              type="text"
              value={inputState.seed}
              onChange={(e) => onChange({ seed: e.target.value })}
              placeholder="Enter seed keyword (e.g. birth chart, nakshatra, kundli matching)..."
              disabled={isLoading}
              className="w-full bg-transparent text-white placeholder:text-slate-500 text-sm sm:text-base font-medium focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 px-2 sm:px-0">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`p-2.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                showAdvanced 
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40' 
                  : 'bg-white/[0.04] text-slate-400 border-white/10 hover:text-white hover:bg-white/[0.08]'
              }`}
              title="Toggle Scope & Targeting Options"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Scope</span>
            </button>

            <button
              type="submit"
              disabled={isLoading || !inputState.seed.trim()}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold text-xs sm:text-sm font-mono flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/25 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Mining...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Mine Keywords</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Progress Bar during mining */}
        {isLoading && (
          <div className="mt-2 px-3 py-2 rounded-xl bg-black/40 border border-white/[0.08] space-y-1 text-left">
            <div className="flex justify-between text-[11px] font-mono text-cyan-300">
              <span>{progressMessage || 'Synthesizing keyword graph...'}</span>
              <span>{progressPercent || 25}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent || 25}%` }}
              />
            </div>
          </div>
        )}
      </form>

      {/* Advanced Scope Drawer */}
      {showAdvanced && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0B1220]/90 border border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left font-mono text-xs">
          {/* Country */}
          <div className="space-y-1.5">
            <label className="text-slate-400 flex items-center gap-1.5 font-bold">
              <Globe className="w-3.5 h-3.5 text-cyan-400" /> Target Country
            </label>
            <select
              value={inputState.countryCode}
              onChange={(e) => {
                const found = COUNTRIES.find(c => c.code === e.target.value);
                onChange({ countryCode: e.target.value, country: found?.name || 'United States' });
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
            >
              {COUNTRIES.map(c => (
                <option key={c.code} value={c.code}>{c.name} ({c.code})</option>
              ))}
            </select>
          </div>

          {/* Language */}
          <div className="space-y-1.5">
            <label className="text-slate-400 font-bold block">Language</label>
            <select
              value={inputState.languageCode}
              onChange={(e) => {
                const found = LANGUAGES.find(l => l.code === e.target.value);
                onChange({ languageCode: e.target.value, language: found?.name || 'English' });
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
            >
              {LANGUAGES.map(l => (
                <option key={l.code} value={l.code}>{l.name}</option>
              ))}
            </select>
          </div>

          {/* Search Engine & Device */}
          <div className="space-y-1.5">
            <label className="text-slate-400 font-bold block">Search Engine & Device</label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={inputState.engine}
                onChange={(e) => onChange({ engine: e.target.value as SearchEngine })}
                className="w-full px-2.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400 capitalize"
              >
                <option value="google">Google</option>
                <option value="bing">Bing</option>
                <option value="youtube">YouTube</option>
              </select>
              <select
                value={inputState.device}
                onChange={(e) => onChange({ device: e.target.value as DeviceType })}
                className="w-full px-2.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400 capitalize"
              >
                <option value="desktop">Desktop</option>
                <option value="mobile">Mobile</option>
                <option value="all">All Devices</option>
              </select>
            </div>
          </div>

          {/* Time Range */}
          <div className="space-y-1.5">
            <label className="text-slate-400 font-bold block">Trends Window</label>
            <select
              value={inputState.timeRange}
              onChange={(e) => onChange({ timeRange: e.target.value as TimeRange })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="now 7-d">Past 7 Days</option>
              <option value="today 1-m">Past 30 Days</option>
              <option value="today 3-m">Past 90 Days</option>
              <option value="today 12-m">Past 12 Months</option>
              <option value="today 5-y">Past 5 Years</option>
            </select>
          </div>
        </div>
      )}

      {/* Quick Suggestion Pills */}
      <div className="flex items-center gap-1.5 flex-wrap text-left">
        <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1 mr-1">
          <Sparkles className="w-3 h-3 text-cyan-400" /> Popular Seeds:
        </span>
        {QUICK_SEEDS.map(seed => (
          <button
            key={seed}
            type="button"
            onClick={() => {
              onChange({ seed });
            }}
            className="px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.06] text-[11px] font-mono transition-all cursor-pointer"
          >
            {seed}
          </button>
        ))}
      </div>
    </div>
  );
}
