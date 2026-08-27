import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Sparkles, Clock, Compass, FileText, Settings, Heart, HelpCircle, ArrowRight } from 'lucide-react';
import { PRIMARY_NAV_ITEMS, MORE_SHEET_ITEMS } from './navigationConfig';
import { resolveSearchIntent } from '../../lib/seoKeywordMatrix';

export interface AstroCommandFinderProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
  onAskQuery?: (query: string) => void;
}

const COMMON_QUESTIONS = [
  "When is my strongest career period?",
  "What does this month mean for love and relationships?",
  "Compare my Vedic and Western birth charts",
  "What is my current Vimshottari Mahadasha balance?",
  "Check today's auspicious Abhijit Muhurta timing",
  "Calculate Ashta Koota 36-Guna relationship compatibility"
];

export const AstroCommandFinder: React.FC<AstroCommandFinderProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onAskQuery,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const directAnswer = useMemo(() => {
    if (!query.trim()) return null;
    return resolveSearchIntent(query);
  }, [query]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    // 1. Match primary routes
    const matchedPrimary = PRIMARY_NAV_ITEMS.filter(
      p => p.label.toLowerCase().includes(q) || p.meaning.toLowerCase().includes(q)
    ).map(p => ({
      id: p.id,
      title: p.label,
      subtitle: p.meaning,
      icon: p.icon,
      route: p.route,
      type: 'Navigation',
    }));

    // 2. Match tools & more items
    const matchedTools = MORE_SHEET_ITEMS.filter(
      t => t.label.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
    ).map(t => ({
      id: t.id,
      title: t.label,
      subtitle: t.description,
      icon: t.icon,
      route: t.route,
      type: 'Tool',
    }));

    // 3. Match questions
    const matchedQuestions = COMMON_QUESTIONS.filter(
      qStr => qStr.toLowerCase().includes(q)
    ).map((qStr, idx) => ({
      id: 'q-' + idx,
      title: qStr,
      subtitle: 'Ask ASTRO360 Assistant',
      icon: Sparkles,
      route: '/ask?q=' + encodeURIComponent(qStr),
      type: 'Question',
    }));

    return [...matchedPrimary, ...matchedTools, ...matchedQuestions];
  }, [query]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal Container */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Search and command finder"
          initial={{ scale: 0.95, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: -20 }}
          className="relative w-full max-w-xl bg-[#070C16] border border-white/15 rounded-3xl shadow-2xl z-10 overflow-hidden flex flex-col mt-12 sm:mt-16 max-h-[80vh]"
        >
          {/* Top Search Input Box */}
          <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-[#0B1220]/80">
            <Search className="w-5 h-5 text-amber-400 shrink-0" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools, charts, dasha, questions, reports..."
              className="w-full bg-transparent text-sm font-mono text-white placeholder-slate-500 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close search"
              className="p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results / Default State */}
          <div className="p-3 sm:p-4 overflow-y-auto space-y-3 text-left">
            {query.trim() && directAnswer?.directAnswer && (
              <div className="p-3.5 rounded-2xl bg-amber-400/10 border border-amber-400/30 space-y-1.5 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Direct Answer • {directAnswer.category}
                  </span>
                  <button
                    onClick={() => {
                      onNavigate(directAnswer.targetRoute);
                      onClose();
                    }}
                    className="text-[10px] font-mono text-amber-300 hover:text-white underline cursor-pointer"
                  >
                    Open {directAnswer.targetRoute} →
                  </button>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">{directAnswer.directAnswer}</p>
              </div>
            )}

            {query.trim() ? (
              searchResults.length === 0 ? (
                <div className="text-center py-10 space-y-2">
                  <HelpCircle className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-sm font-mono text-slate-400">No results found for "{query}"</p>
                  <button
                    onClick={() => {
                      onAskQuery?.(query);
                      onNavigate('/ask');
                      onClose();
                    }}
                    className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs font-mono cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ask ASTRO360 this question →</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-1.5">
                  {searchResults.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (item.type === 'Question') {
                            onAskQuery?.(item.title);
                            onNavigate('/ask');
                          } else {
                            onNavigate(item.route);
                          }
                          onClose();
                        }}
                        className="w-full p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 hover:border-amber-400/30 flex items-center justify-between gap-3 text-left transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="p-2 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20 shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                              {item.title}
                            </div>
                            <div className="text-[11px] font-mono text-slate-400 truncate">
                              {item.subtitle}
                            </div>
                          </div>
                        </div>

                        <span className="text-[9.5px] font-mono text-slate-500 uppercase px-2 py-0.5 rounded bg-white/5 shrink-0">
                          {item.type}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-1.5">
                    {COMMON_QUESTIONS.slice(0, 4).map((qStr, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          onAskQuery?.(qStr);
                          onNavigate('/ask');
                          onClose();
                        }}
                        className="w-full p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] text-xs font-mono text-slate-300 hover:text-white text-left flex items-center justify-between gap-2 cursor-pointer transition-colors"
                      >
                        <span className="truncate">{qStr}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Core Destinations
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {PRIMARY_NAV_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            onNavigate(item.route);
                            onClose();
                          }}
                          className="p-3 rounded-xl bg-[#0D1526] hover:bg-white/[0.08] border border-white/10 text-left flex items-center gap-2.5 cursor-pointer"
                        >
                          <Icon className="w-4 h-4 text-amber-400 shrink-0" />
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-white block">{item.label}</span>
                            <span className="text-[10px] font-mono text-slate-400 truncate block">{item.meaning}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AstroCommandFinder;
