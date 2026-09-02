import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Globe2 } from 'lucide-react';
import { ASTROLOGY_SYSTEMS, AstrologySystemOption } from './navigationConfig';

export interface AstroSystemSheetProps {
  isOpen: boolean;
  activeSystem: string;
  onSelectSystem: (systemId: string) => void;
  onClose: () => void;
}

export const AstroSystemSheet: React.FC<AstroSystemSheetProps> = ({
  isOpen,
  activeSystem,
  onSelectSystem,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Bottom Sheet Modal */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="system-sheet-title"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full max-w-lg max-h-[85vh] bg-[#070C16] border-t sm:border border-white/15 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col z-10 overflow-hidden"
          style={{
            paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))',
          }}
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-400/10 border border-white/[0.08] text-amber-400">
                <Globe2 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h2 id="system-sheet-title" className="text-base sm:text-lg font-extrabold text-white font-sans">
                  Astrology Tradition Engine
                </h2>
                <p className="text-xs font-mono text-slate-400">
                  Select your primary computational framework
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close system selector"
              className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Traditions List */}
          <div className="p-3 sm:p-4 overflow-y-auto space-y-2.5 text-left">
            {ASTROLOGY_SYSTEMS.map((sys: AstrologySystemOption) => {
              const isSelected = activeSystem.toLowerCase() === sys.id || (activeSystem.toLowerCase().includes('vedic') && sys.id === 'vedic');
              return (
                <button
                  key={sys.id}
                  onClick={() => {
                    onSelectSystem(sys.id);
                    onClose();
                  }}
                  className={`w-full p-4 rounded-2xl border transition-all text-left flex items-start justify-between gap-3 cursor-pointer group ${
                    isSelected
                      ? 'bg-amber-400/10 border-amber-400/50 shadow-lg shadow-amber-400/10'
                      : 'bg-[#0D1526] hover:bg-white/[0.06] border-white/10'
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-white font-sans group-hover:text-amber-300 transition-colors">
                        {sys.name}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 px-1.5 py-0.2 rounded bg-white/5 border border-white/10">
                        {sys.traditionGroup}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono text-amber-300 font-bold">
                      {sys.subtitle}
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed font-sans pt-0.5">
                      {sys.description}
                    </p>
                  </div>

                  {isSelected && (
                    <div className="p-1.5 rounded-full bg-white text-black font-semibold shadow-sm shrink-0 mt-1">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AstroSystemSheet;
