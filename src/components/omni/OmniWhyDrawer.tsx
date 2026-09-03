import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, CheckCircle2, AlertCircle, BookOpen, ShieldCheck, ChevronDown, ChevronUp, Layers } from 'lucide-react';

export interface SupportedSystemInfo {
  name: string;
  status: 'Strong' | 'Moderate' | 'Favorable' | 'Balanced';
  note: string;
}

export interface TechnicalRuleInfo {
  id: string;
  source: string;
  rule: string;
}

export interface OmniWhyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  period?: string;
  confidence?: 'High' | 'Moderate–High' | 'Moderate' | 'Calibrated' | string;
  confidenceScore?: number;
  factors?: string[];
  supportedSystems?: SupportedSystemInfo[];
  technicalRules?: TechnicalRuleInfo[];
}

export default function OmniWhyDrawer({
  isOpen,
  onClose,
  title = "Career Expansion & Responsibility",
  period = "Sep 12 – Oct 28",
  confidence = "Moderate–High",
  confidenceScore = 84,
  factors = [
    "Jupiter enters 10th house of public standing and career deliverables",
    "Current timing cycle activates leadership & strategic responsibility",
    "Harmonious solar transit supporting visibility in major discussions"
  ],
  supportedSystems = [
    { name: "Vedic (Jyotish)", status: "Strong", note: "Jupiter Mahadasha sub-cycle activates 10th house Kendra" },
    { name: "Western Tropical", status: "Strong", note: "Transiting Sun trine Midheaven (MC) with Mars drive" },
    { name: "KP Astrology", status: "Moderate", note: "Sub-lord 10 connects to houses 2, 6, 10, and 11" },
    { name: "Chinese BaZi", status: "Favorable", note: "Yang Fire Heavenly Stem harmonizes with Day Master" }
  ],
  technicalRules = [
    { id: "BPHS-CH24-V12", source: "Brihat Parashara Hora Shastra", rule: "Jupiter transit through 10th house from natal Moon/Lagna bestows royal favor, public authority, and professional triumph." },
    { id: "TETRA-BK4-C3", source: "Ptolemaic Tetrabiblos", rule: "Solar-Jupiter angular aspect to Midheaven confers civic advancement and enterprise success." },
    { id: "KP-R4-S10", source: "KP Reader IV (Krishnamurti)", rule: "10th cusp sub-lord posited in star of planet signifying 2, 6, 10, 11 guarantees promotion with financial increment." }
  ]
}: OmniWhyDrawerProps) {
  const [showTechnical, setShowTechnical] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="why-drawer-title"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 text-left"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Bottom Sheet on Mobile / Centered Card on Desktop */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative w-full max-w-lg bg-[#0F172A] border-t sm:border border-white/15 rounded-t-[2rem] sm:rounded-3xl p-5 sm:p-7 shadow-2xl space-y-4 sm:space-y-5 text-white max-h-[85vh] sm:max-h-[90vh] overflow-y-auto pb-safe"
          >
            {/* Mobile Drag Indicator */}
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-1 sm:hidden"></div>

            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3 sm:pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    Why This Prediction?
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{period}</span>
                </div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  {title}
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close why explanation modal"
                className="min-w-[48px] min-h-[48px] p-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/20 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center justify-center shrink-0 active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Level 1: Simple Overview */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <p className="text-xs font-semibold text-slate-300">
                Your selected astrology systems show increased activity during this timing window.
              </p>
              <div className="flex items-center justify-between text-xs font-mono pt-1">
                <span className="text-slate-400">Multi-System Confidence:</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  {confidence} ({confidenceScore}%)
                </span>
              </div>
            </div>

            {/* Level 2: Multi-Tradition Consensus */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" /> Tradition Consensus Breakdown
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {supportedSystems.map((sys, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-[#0B1220] border border-white/10 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">{sys.name}</span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                        sys.status === 'Strong'
                          ? 'bg-emerald-500/15 text-emerald-300 border border-white/[0.08]'
                          : 'bg-cyan-500/15 text-cyan-300 border border-white/[0.08]'
                      }`}>
                        {sys.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">{sys.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Astrological Drivers */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Main Astrological Factors
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {factors.map((factor, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 text-sm leading-none">•</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Honest Scientific & Astrological Disclaimer */}
            <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-[11px] text-amber-200/80 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>This is a multi-tradition astrological interpretation for personal reflection, not a deterministic guarantee of future events.</span>
            </div>

            {/* Level 3: Progressive Disclosure to Technical Evidence */}
            <div className="border-t border-white/10 pt-3 space-y-3">
              <button
                onClick={() => setShowTechnical(!showTechnical)}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  {showTechnical ? "Hide Technical Evidence" : "View Technical Classical Rules (Tier 1/2)"}
                </span>
                {showTechnical ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showTechnical && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2.5 pt-1"
                >
                  {technicalRules.map((rule, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#080E1A] border border-indigo-500/20 space-y-1 text-xs">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-indigo-400 font-bold">{rule.source}</span>
                        <span className="text-slate-500">{rule.id}</span>
                      </div>
                      <p className="text-slate-300 text-[11px] font-serif italic">"{rule.rule}"</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
