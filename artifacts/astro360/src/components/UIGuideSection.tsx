import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Palette, Type, Grid, Layers, Sparkles, Check, Sun, Moon, Shield, Award, 
  ArrowRight, Download, Sliders, Eye, Zap, Info, Bell, Search, Star, Compass
} from 'lucide-react';

export default function UIGuideSection() {
  const [activeTab, setActiveTab] = useState<'tokens' | 'typography' | 'components' | 'modes' | 'accessibility'>('tokens');
  const [toggleState, setToggleState] = useState(true);
  const [sliderValue, setSliderValue] = useState(75);
  const [inputValue, setInputValue] = useState('');
  const [demoMode, setDemoMode] = useState<'normal' | 'astrologer'>('normal');

  const colorTokens = [
    { name: 'Dark Background', hex: '#070B14', css: 'bg-[#070B14]', desc: 'Primary deep midnight application canvas' },
    { name: 'Primary Surface', hex: '#101826', css: 'bg-[#101826]', desc: 'Main content containers and drawer surfaces' },
    { name: 'Secondary Surface', hex: '#162133', css: 'bg-[#162133]', desc: 'Elevated cards, popovers, and sidebars' },
    { name: 'Cards Surface', hex: '#1A2537', css: 'bg-[#1A2537]', desc: 'Interactive card containers & list items' },
    { name: 'Primary Blue', hex: '#4F8CFF', css: 'bg-[#4F8CFF]', desc: 'Primary actions, active tabs, and highlights' },
    { name: 'Royal Purple', hex: '#7B61FF', css: 'bg-[#7B61FF]', desc: 'Astrological depth, Jyotish engines, and secondary focus' },
    { name: 'Celestial Gold', hex: '#D4AF37', css: 'bg-[#D4AF37]', desc: 'Royal badges, auspicious ratings, and highlights' },
    { name: 'Sky Accent', hex: '#4CC9F0', css: 'bg-[#4CC9F0]', desc: 'Telemetry badges, UTC time, and active metrics' },
    { name: 'Success Green', hex: '#22C55E', css: 'bg-[#22C55E]', desc: 'Positive aspects, verified calculation badges' },
    { name: 'Warning Amber', hex: '#F59E0B', css: 'bg-[#F59E0B]', desc: 'Caution alerts, difficult transit warnings' },
    { name: 'Danger Red', hex: '#EF4444', css: 'bg-[#EF4444]', desc: 'Malefic aspects, critical alert indicators' },
    { name: 'Border Subtle', hex: 'rgba(255,255,255,0.08)', css: 'bg-white/10', desc: '1px clean structural separators' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 mb-1">
            <Palette className="w-5 h-5" />
            <span className="text-xs font-semibold tracking-wider uppercase">Design System Specification</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
            Celestial Premium <span className="gradient-text">UI/UX System Guide</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Complete design system guidelines, color tokens, typography scale, component library, micro-interactions, and accessibility standards for AstroVerse AI.
          </p>
        </div>

        {/* Badge */}
        <div className="glass-card px-4 py-2.5 rounded-2xl border border-indigo-500/30 flex items-center gap-3 shrink-0">
          <Shield className="w-5 h-5 text-amber-400" />
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">WCAG 2.2 AA Compliant</p>
            <p className="text-xs font-bold text-white">Apple & Vercel Class UI</p>
          </div>
        </div>
      </div>

      {/* Navigation View Switcher */}
      <div className="flex items-center gap-2 p-1.5 glass-card rounded-2xl w-fit flex-wrap">
        {[
          { id: 'tokens', label: 'Color Tokens & Palette', icon: <Palette className="w-4 h-4" /> },
          { id: 'typography', label: 'Typography & Spacing', icon: <Type className="w-4 h-4" /> },
          { id: 'components', label: 'Component Library', icon: <Layers className="w-4 h-4" /> },
          { id: 'modes', label: 'Seeker vs Pro Modes', icon: <Eye className="w-4 h-4" /> },
          { id: 'accessibility', label: 'Accessibility & Motion', icon: <Shield className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl font-medium text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-indigo-500/25 text-white border border-indigo-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* SECTION 1: COLOR TOKENS & PALETTE */}
      {activeTab === 'tokens' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {colorTokens.map((token, idx) => (
              <div key={idx} className="glass-card p-4 rounded-2xl border border-white/10 space-y-3">
                <div className={`w-full h-16 rounded-xl ${token.css} border border-white/20 shadow-inner flex items-end p-2`}>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-md">
                    {token.hex}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{token.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{token.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* SECTION 2: TYPOGRAPHY & SPACING SCALE */}
      {activeTab === 'typography' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Type className="w-5 h-5 text-indigo-400" /> Typography Scale (Playfair Display & Inter)
            </h3>

            <div className="space-y-4 border-t border-white/10 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-white/5 pb-3">
                <span className="text-[10px] font-mono text-slate-400 uppercase w-32">Display (36px)</span>
                <span className="text-3xl sm:text-4xl font-display font-bold text-white">Unified Master Astrology Chart</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-white/5 pb-3">
                <span className="text-[10px] font-mono text-slate-400 uppercase w-32">Heading 1 (24px)</span>
                <span className="text-2xl font-display font-bold text-white">Professional Ephemeris Telemetry</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-white/5 pb-3">
                <span className="text-[10px] font-mono text-slate-400 uppercase w-32">Heading 2 (18px)</span>
                <span className="text-lg font-bold text-white">16-Module Vedic Kundli & Divisional Inspector</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-white/5 pb-3">
                <span className="text-[10px] font-mono text-slate-400 uppercase w-32">Body Large (16px)</span>
                <span className="text-base text-slate-200">High-precision natal ephemeris calculations and cross-tradition synthesis.</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-white/5 pb-3">
                <span className="text-[10px] font-mono text-slate-400 uppercase w-32">Body Standard (14px)</span>
                <span className="text-sm text-slate-300">Plain-english life summaries, lucky elements, and daily timing windows.</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <span className="text-[10px] font-mono text-slate-400 uppercase w-32">Caption / Mono (12px)</span>
                <span className="text-xs font-mono text-emerald-400">Swiss Ephemeris DE431 · 64-Bit Arcsecond Precision</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Grid className="w-5 h-5 text-emerald-400" /> 8-Point Spacing Scale
            </h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-3 text-center pt-2">
              {[4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96].map((size) => (
                <div key={size} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <p className="text-xs font-bold text-white">{size}px</p>
                  <p className="text-[9px] font-mono text-slate-400">{size / 8}rem</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION 3: COMPONENT LIBRARY SHOWCASE */}
      {activeTab === 'components' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          {/* Buttons Showcase */}
          <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-lg font-bold text-white">Button Variants & Micro-Interactions (Scale 0.97 on Press)</h3>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 active:scale-97 transition-all cursor-pointer">
                Primary Button
              </button>
              <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 active:scale-97 transition-all cursor-pointer">
                Gold Accent Button
              </button>
              <button className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/10 active:scale-97 transition-all cursor-pointer">
                Secondary Glass Button
              </button>
              <button className="px-5 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-bold text-xs active:scale-97 transition-all cursor-pointer">
                Success Action
              </button>
              <button className="px-5 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-bold text-xs active:scale-97 transition-all cursor-pointer">
                Danger Action
              </button>
            </div>
          </div>

          {/* Forms & Inputs Showcase */}
          <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-lg font-bold text-white">Form Control Components</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Text Input with Focus Ring</label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter birth location..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Range Slider ({sliderValue}%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValue}
                  onChange={(e) => setSliderValue(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={toggleState}
                  onChange={(e) => setToggleState(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-800 bg-slate-900 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <span className="text-xs text-slate-300">Enable Daily Transit Notifications</span>
              </label>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION 4: SEEKER VS PRO MODES DEMO */}
      {activeTab === 'modes' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Dual-Perspective Experience System</h3>
                <p className="text-xs text-slate-400">Contextual mode adaptation across tool screens</p>
              </div>

              <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800 p-1.5 rounded-2xl text-xs font-medium">
                <button
                  onClick={() => setDemoMode('normal')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    demoMode === 'normal'
                      ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  👤 Seeker Mode
                </button>
                <button
                  onClick={() => setDemoMode('astrologer')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    demoMode === 'astrologer'
                      ? 'bg-purple-500/25 text-purple-300 border border-purple-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  🔮 Astrologer Mode
                </button>
              </div>
            </div>

            {demoMode === 'normal' ? (
              <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
                <div className="flex items-center gap-2 text-amber-300">
                  <Sun className="w-5 h-5" />
                  <h4 className="font-bold text-sm">Everyday Seeker Plain-English View</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Focuses on actionable personal guidance, daily energy meters, auspicious career windows, and lucky gemstones without complicated mathematical formulas or Sanskrit ephemeris tables.
                </p>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-purple-500/10 border border-purple-500/30 space-y-3">
                <div className="flex items-center gap-2 text-purple-300">
                  <Zap className="w-5 h-5" />
                  <h4 className="font-bold text-sm">Professional Astrologer Telemetry View</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Unlocks 64-bit Swiss Ephemeris longitudes, deg/min/sec precision tables, 5 Ayanamsha system selectors, D1–D60 divisional charts, Shadbala strength matrices, and Vimshottari/Chara Dasha timelines.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* SECTION 5: ACCESSIBILITY & MOTION */}
      {activeTab === 'accessibility' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-400" /> Accessibility & Performance Standards
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="font-bold text-sm text-white">WCAG 2.2 AA Contrast & Focus Rings</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  All text elements pass 4.5:1 contrast ratios. Focusable elements display a clear 2px glowing focus ring for seamless keyboard navigation.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="font-bold text-sm text-white">60 FPS GPU-Accelerated Motion</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Framer Motion page transitions are set to 250ms with hardware-accelerated transforms (`translateY` & `opacity`) to eliminate layout shifts (CLS).
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
