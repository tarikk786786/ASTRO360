import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Sparkles, Compass, Clock, Heart, Bot, FileText, CheckCircle2, ArrowRight, ShieldCheck 
} from 'lucide-react';

interface BeginnerQuickGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string) => void;
}

export const BeginnerQuickGuideModal: React.FC<BeginnerQuickGuideModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar rounded-3xl bg-gradient-to-b from-[#0F172A] via-[#0B1220] to-[#060A14] border border-white/[0.08] p-5 sm:p-7 shadow-2xl space-y-6 text-left"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/15 text-amber-300 text-[10.5px] font-mono font-bold uppercase tracking-wider border border-white/[0.08]">
                <Sparkles className="w-3 h-3 text-amber-400" /> New to Astrology?
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-sans tracking-tight">
                How to Use ASTRO360 in 3 Simple Steps
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans">
                No complex astrology knowledge required. Here is how to get the most out of your cosmic dashboard.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 3 Simple Steps Grid */}
          <div className="space-y-4">
            {/* Step 1 */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/8 flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-white text-black font-semibold shadow-sm font-black text-base flex items-center justify-center shrink-0 shadow-md">
                1
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-400" /> Explore Your Birth Chart (Kundli)
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Think of this as your <strong>Personal Cosmic Fingerprint</strong>. It reveals your personality strengths, hidden talents, best career directions, and relationships based on exact planet positions when you were born.
                </p>
                <button
                  onClick={() => { onNavigate('birth-chart'); onClose(); }}
                  className="mt-2 text-xs font-mono font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                >
                  Open Birth Chart Generator <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/8 flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-cyan-400 text-slate-950 font-black text-base flex items-center justify-center shrink-0 shadow-md">
                2
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" /> Check Today's Good & Caution Hours
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every day has natural high-energy windows (<strong>Abhijit Muhurta</strong>) for starting deals or important tasks, and resting windows (<strong>Rahu Kaal</strong>) where you should avoid rush decisions.
                </p>
                <button
                  onClick={() => { onNavigate('muhurta'); onClose(); }}
                  className="mt-2 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                >
                  View Today's Timing Windows <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/8 flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-purple-400 text-slate-950 font-black text-base flex items-center justify-center shrink-0 shadow-md">
                3
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Bot className="w-4 h-4 text-purple-400" /> Ask AI Anything in Plain Language
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  You don't need to know technical terms. Just ask: <em>"When should I change jobs?", "How is my financial health this year?", or "Is this a good time to get married?"</em>
                </p>
                <button
                  onClick={() => { onNavigate('ask'); onClose(); }}
                  className="mt-2 text-xs font-mono font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer"
                >
                  Ask AI Copilot Now <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Glossary Pill Bar */}
          <div className="p-4 rounded-2xl bg-[#070B14] border border-white/10 space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              ⚡ Quick Astrological Cheat Sheet (In Plain Words):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-sans">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                <span><strong>Sun Sign:</strong> Your core identity & vitality</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                <span><strong>Moon Sign:</strong> Your emotional peace & mind</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span><strong>Lagna (Ascendant):</strong> Your health & path in life</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0" />
                <span><strong>Dasha:</strong> Your current 10-year life chapter</span>
              </div>
            </div>
          </div>

          {/* Footer Close CTA */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Free & Zero-PII Encrypted
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs font-mono transition-all cursor-pointer"
            >
              Got It, Let's Explore!
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BeginnerQuickGuideModal;
