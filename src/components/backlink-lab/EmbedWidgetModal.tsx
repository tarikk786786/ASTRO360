import React, { useState } from 'react';
import { X, Copy, Check, Code, Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { generateBirthChartWidgetSnippet, WidgetConfig } from '../../lib/backlink-lab/embeddableWidgetEngine';

interface EmbedWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmbedWidgetModal({ isOpen, onClose }: EmbedWidgetModalProps) {
  const [config, setConfig] = useState<WidgetConfig>({
    theme: 'dark',
    width: '100%',
    height: '520px',
    defaultZodiac: 'sidereal',
    showAttribution: true
  });
  const [copiedFormat, setCopiedFormat] = useState<'html' | 'react' | null>(null);

  if (!isOpen) return null;

  const { htmlSnippet, reactSnippet, previewUrl } = generateBirthChartWidgetSnippet(config);

  const handleCopy = (format: 'html' | 'react') => {
    const text = format === 'html' ? htmlSnippet : reactSnippet;
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-[#0B1220] border border-cyan-500/40 shadow-2xl space-y-5 text-left text-xs my-8"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="border-b border-white/10 pb-3 space-y-1">
          <span className="text-[10px] font-bold font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/30">
            TRANSPARENT EMBEDDABLE WIDGET
          </span>
          <h3 className="text-xl font-bold text-white tracking-tight">
            ASTRO360 Free Birth Chart Embed Generator
          </h3>
          <p className="text-slate-400 text-xs font-mono">
            Empower external websites, astrology bloggers, and publishers with an ad-free Swiss Ephemeris calculator.
          </p>
        </div>

        {/* Ethical attribution badge */}
        <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-start gap-2.5 text-slate-300">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            Zero hidden CSS links or deceptive anchor text. Every embed provides clear, optional "Powered by ASTRO360" attribution adhering to Google Search Essentials.
          </p>
        </div>

        {/* Config Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase font-bold">Theme</label>
            <select
              value={config.theme}
              onChange={(e) => setConfig({ ...config, theme: e.target.value as any })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-xs"
            >
              <option value="dark">Dark Cosmic</option>
              <option value="midnight">Midnight Blue</option>
              <option value="light">Clean Light</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase font-bold">Default Zodiac</label>
            <select
              value={config.defaultZodiac}
              onChange={(e) => setConfig({ ...config, defaultZodiac: e.target.value as any })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-xs"
            >
              <option value="sidereal">Sidereal (Lahiri)</option>
              <option value="tropical">Tropical (Western)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase font-bold">Attribution</label>
            <label className="flex items-center gap-2 pt-2 text-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={config.showAttribution}
                onChange={(e) => setConfig({ ...config, showAttribution: e.target.checked })}
                className="w-4 h-4 accent-cyan-400 rounded"
              />
              <span className="text-xs">Visible Link</span>
            </label>
          </div>
        </div>

        {/* Code Snippets */}
        <div className="space-y-3 font-mono">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 uppercase font-bold">HTML / Iframe Snippet</span>
              <button
                onClick={() => handleCopy('html')}
                className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer font-bold"
              >
                {copiedFormat === 'html' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedFormat === 'html' ? 'Copied' : 'Copy HTML'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-slate-950 border border-white/10 text-slate-300 text-[11px] overflow-x-auto">
              {htmlSnippet}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 cursor-pointer"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
}
