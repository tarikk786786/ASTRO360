import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, Copy, Check, ExternalLink, Sparkles, 
  Calendar, Sun, Moon, Heart, Clock, Layers, ShieldCheck
} from 'lucide-react';
import { toast } from 'sonner';

interface EmbeddableWidgetGeneratorProps {
  onNavigateToTab?: (tab: string) => void;
}

interface WidgetType {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: any;
  iframePath: string;
  defaultHeight: number;
}

const AVAILABLE_WIDGETS: WidgetType[] = [
  {
    id: 'panchang',
    name: 'Live Vedic Panchanga & Tithi Widget',
    category: 'Vedic Astronomy',
    description: 'Displays current Tithi, Nakshatra, Yoga, Karana, Sunrise/Sunset, and Rahu Kaal in real time.',
    icon: Calendar,
    iframePath: '/panchanga',
    defaultHeight: 420,
  },
  {
    id: 'horas',
    name: '24-Hour Planetary Horas Clock',
    category: 'Muhurta & Timing',
    description: 'Live hour-by-hour planetary rulers with optimal action recommendations.',
    icon: Sun,
    iframePath: '/planetary-horas',
    defaultHeight: 400,
  },
  {
    id: 'moon-phase',
    name: 'Real-Time Moon Phase & Lunar Tracker',
    category: 'Lunar Ephemeris',
    description: 'Exact lunar illumination percentage, next Full/New Moon countdown, and Nakshatra transit.',
    icon: Moon,
    iframePath: '/live-diagnostics',
    defaultHeight: 380,
  },
  {
    id: 'compatibility',
    name: '36-Guna Kundli Milan Matcher',
    category: 'Relationship Synastry',
    description: 'Ashta-Koota 36-point marital compatibility calculator for lifestyle and wedding websites.',
    icon: Heart,
    iframePath: '/compatibility',
    defaultHeight: 480,
  },
];

export default function EmbeddableWidgetGenerator({ onNavigateToTab }: EmbeddableWidgetGeneratorProps) {
  const [selectedWidget, setSelectedWidget] = useState<WidgetType>(AVAILABLE_WIDGETS[0]);
  const [theme, setTheme] = useState<'dark' | 'gold' | 'cyan'>('dark');
  const [copied, setCopied] = useState(false);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://astro-360-neon.vercel.app';
  const embedCode = `<iframe 
  src="${baseUrl}${selectedWidget.iframePath}?embed=true&theme=${theme}" 
  width="100%" 
  height="${selectedWidget.defaultHeight}" 
  style="border:1px solid rgba(255,255,255,0.12); border-radius:16px; background:#0B1220; overflow:hidden;" 
  title="${selectedWidget.name} by ASTRO360"
  loading="lazy"
></iframe>
<p style="font-size:11px; text-align:center; color:#94a3b8; font-family:sans-serif; margin-top:6px;">
  Powered by <a href="${baseUrl}" target="_blank" rel="noopener noreferrer" style="color:#fbbf24; text-decoration:none; font-weight:bold;">ASTRO360 Ephemeris</a>
</p>`;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(embedCode);
      setCopied(true);
      toast.success('Embed snippet copied to clipboard! Paste it into your website HTML.');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/25 text-cyan-300 text-xs font-mono font-bold">
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Free Webmaster & Blogger Tools</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            FREE EMBEDDABLE CELESTIAL WIDGETS
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            Embed live Panchang, Horas, Moon Phase, and Compatibility calculators into any website, blog, or WordPress site with 1 line of HTML.
          </p>
        </div>
      </div>

      {/* Widget Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {AVAILABLE_WIDGETS.map((widget) => {
          const Icon = widget.icon;
          const isSelected = selectedWidget.id === widget.id;
          return (
            <button
              key={widget.id}
              onClick={() => setSelectedWidget(widget)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-2 ${
                isSelected
                  ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-lg font-bold'
                  : 'bg-[#0B1220] text-slate-300 hover:text-white border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-5 h-5 ${isSelected ? 'text-slate-950' : 'text-amber-400'}`} />
                <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded ${
                  isSelected ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-white/5 text-slate-400'
                }`}>
                  {widget.category}
                </span>
              </div>
              <strong className="text-xs font-mono block leading-tight">{widget.name}</strong>
            </button>
          );
        })}
      </div>

      {/* Configuration & Embed Code Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1220] border border-white/12 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/8 pb-4">
          <div>
            <h3 className="text-base font-bold text-white font-mono">{selectedWidget.name}</h3>
            <p className="text-xs text-slate-400 font-sans">{selectedWidget.description}</p>
          </div>

          {/* Theme Selector */}
          <div className="flex items-center gap-1.5 bg-[#060A12] p-1.5 rounded-xl border border-white/10 font-mono text-xs">
            <span className="text-slate-500 text-[10px] px-2">Theme:</span>
            {[
              { id: 'dark', label: 'Dark Graphite' },
              { id: 'gold', label: 'Gold Astral' },
              { id: 'cyan', label: 'Celestial Cyan' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id as any)}
                className={`px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                  theme === t.id
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Snippet Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Copy & Paste this HTML Code into your website:</span>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Code Snippet'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-[#060A12] border border-white/10 text-xs font-mono text-amber-300 overflow-x-auto selection:bg-amber-400 selection:text-slate-950">
            <code>{embedCode}</code>
          </pre>
        </div>

        {/* SEO & Publisher Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono text-slate-300">
          <div className="p-3 rounded-xl bg-white/3 border border-white/6 space-y-1">
            <span className="text-amber-400 font-bold block">✓ 100% Free Forever</span>
            <p className="text-slate-400 font-sans text-[11px]">Zero API keys, zero rate limits, completely open access.</p>
          </div>
          <div className="p-3 rounded-xl bg-white/3 border border-white/6 space-y-1">
            <span className="text-cyan-400 font-bold block">✓ Sub-Arcsecond Precision</span>
            <p className="text-slate-400 font-sans text-[11px]">Powered by real NASA JPL DE440 & Swiss Ephemeris data.</p>
          </div>
          <div className="p-3 rounded-xl bg-white/3 border border-white/6 space-y-1">
            <span className="text-emerald-400 font-bold block">✓ Responsive & Mobile-First</span>
            <p className="text-slate-400 font-sans text-[11px]">Auto-scales seamlessly to fit desktop, tablet, and mobile screens.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
