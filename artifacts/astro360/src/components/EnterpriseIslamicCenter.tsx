import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, BookMarked, Compass, Sun, Moon, Sparkles, Search, Volume2, Pause, Eye, EyeOff,
  Clock, ShieldCheck, Heart, MapPin, Calculator, Calendar, Download, FileText, Share2, CheckCircle2, Bot, Send, RefreshCw
} from 'lucide-react';
import QuranComExplorer from './QuranComExplorer';
import HadithExplorer from './HadithExplorer';
import AlAzanPrayerSuite from './AlAzanPrayerSuite';
import FalahHijriToolkit from './FalahHijriToolkit';
import { IslamicKnowledgeEngine } from '../lib/islamicKnowledgeEngine';

export default function EnterpriseIslamicCenter() {
  const [activeModule, setActiveModule] = useState<'quran' | 'hadith' | 'prayer' | 'duas' | 'ramadan' | 'hajj' | 'ai' | 'reports'>('quran');

  // AI Assistant State
  const [aiQuery, setAiQuery] = useState<string>('What does the Quran say about Ramadan and fasting?');
  const [aiResult, setAiResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Duas Category Filter State
  const [duaCategory, setDuaCategory] = useState<string>('Morning & Evening');

  const runAiSearch = async () => {
    setIsSearching(true);
    const res = await IslamicKnowledgeEngine.queryKnowledgeBase(aiQuery);
    setAiResult(res);
    setIsSearching(false);
  };

  useEffect(() => {
    runAiSearch();
  }, []);

  const DUAS_DATABASE = [
    { cat: 'Morning & Evening', title: 'Sayyid al-Istighfar (Master Supplication)', ar: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ', eng: 'O Allah, You are my Lord; none has the right to be worshipped except You. You created me and I am Your servant...', ref: 'Sahih al-Bukhari #6306' },
    { cat: 'Travel', title: 'Supplication for Journey & Travel', ar: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ', eng: 'Glory to Him who has brought this vehicle under our control, though we were unable to control it ourselves...', ref: 'Surah Az-Zukhruf (43:13)' },
    { cat: 'Food & Drink', title: 'Supplication Before Eating', ar: 'بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ', eng: 'In the name of Allah and upon the blessing of Allah.', ref: 'Hisnul Muslim #184' },
    { cat: 'Stress & Relief', title: 'Dua of Prophet Yunus (Jonah)', ar: 'لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ', eng: 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.', ref: 'Surah Al-Anbya (21:87)' }
  ];

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl space-y-8 text-left">
      {/* HEADER & ISLAMIC KNOWLEDGE CENTER BADGE */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            ASTRO360 Enterprise Islamic Knowledge & Worship Center
          </div>
          <h3 className="text-2xl font-bold font-display text-white">Islamic Knowledge Center</h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Authentic References (Qur'an & Sunnah)
          </span>
        </div>
      </div>

      {/* STRICT ISLAMIC SEPARATION & SOURCE VERIFICATION BANNER */}
      <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-1 text-xs text-emerald-200 font-sans">
        <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono uppercase tracking-wider text-[11px]">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Strict Principle: Evidence-Based Islamic Module</span>
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed">
          This module is <strong>100% separate</strong> from astrological calculations. Astrological predictions, fortune-telling, and horoscopes are <strong>never</strong> presented as Islamic teachings. All religious content is sourced directly from verified primary texts (Holy Qur'an & authentic Sunnah).
        </p>
      </div>

      {/* MODULE SELECTION TABS */}
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2">
        {[
          { id: 'quran', label: '1. Holy Qur\'an', icon: <BookOpen className="w-3.5 h-3.5" /> },
          { id: 'hadith', label: '2. Hadith Library', icon: <BookMarked className="w-3.5 h-3.5" /> },
          { id: 'prayer', label: '3. Prayer & Qibla', icon: <Compass className="w-3.5 h-3.5" /> },
          { id: 'duas', label: '4. Duas & Adhkar', icon: <Heart className="w-3.5 h-3.5" /> },
          { id: 'ramadan', label: '5. Ramadan & Hijri', icon: <Moon className="w-3.5 h-3.5" /> },
          { id: 'hajj', label: '6. Hajj & Umrah', icon: <Sparkles className="w-3.5 h-3.5" /> },
          { id: 'ai', label: '7. AI Knowledge Assistant', icon: <Bot className="w-3.5 h-3.5" /> },
          { id: 'reports', label: '8. Worship Reports', icon: <FileText className="w-3.5 h-3.5" /> }
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setActiveModule(m.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeModule === m.id
                ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/40 shadow-sm'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            {m.icon}
            <span>{m.label}</span>
          </button>
        ))}
      </div>

      {/* MODULE RENDERERS */}
      <AnimatePresence mode="wait">
        {activeModule === 'quran' && (
          <motion.div key="quran" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <QuranComExplorer />
          </motion.div>
        )}

        {activeModule === 'hadith' && (
          <motion.div key="hadith" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <HadithExplorer />
          </motion.div>
        )}

        {activeModule === 'prayer' && (
          <motion.div key="prayer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <AlAzanPrayerSuite />
          </motion.div>
        )}

        {activeModule === 'duas' && (
          <motion.div key="duas" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Heart className="w-4 h-4 text-emerald-400" /> Hisnul Muslim Authentic Supplications
              </h4>
              <select
                value={duaCategory}
                onChange={(e) => setDuaCategory(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Morning & Evening">Morning & Evening</option>
                <option value="Travel">Travel & Journey</option>
                <option value="Food & Drink">Food & Drink</option>
                <option value="Stress & Relief">Stress & Relief</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DUAS_DATABASE.filter(d => duaCategory === 'All' || d.cat === duaCategory).map((dua, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-300">{dua.title}</span>
                    <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      {dua.ref}
                    </span>
                  </div>
                  <p className="text-2xl font-serif text-right text-emerald-200 font-arabic leading-loose">{dua.ar}</p>
                  <p className="text-xs text-slate-300 italic">{dua.eng}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeModule === 'ramadan' && (
          <motion.div key="ramadan" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <FalahHijriToolkit />
          </motion.div>
        )}

        {activeModule === 'hajj' && (
          <motion.div key="hajj" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h4 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" /> Hajj & Umrah Pilgrimage Step-by-Step Guide
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { step: '1. Ihram & Niyyah', desc: 'Enter state of Ihram at Miqat, recite Talbiyah: Labbayk Allahumma Labbayk.' },
                { step: '2. Tawaf al-Qudum', desc: 'Circumambulate the Holy Kaaba 7 times counter-clockwise with devotion.' },
                { step: '3. Sa\'i Safa & Marwa', desc: 'Walk 7 times between Mount Safa and Mount Marwa in memory of Hajar (AS).' }
              ].map((h, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-emerald-300 font-mono">{h.step}</span>
                  <p className="text-xs text-slate-300">{h.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeModule === 'ai' && (
          <motion.div key="ai" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold">
                <Bot className="w-4 h-4" /> AI Islamic Knowledge Search Assistant (Strict References Only)
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && runAiSearch()}
                  placeholder="Ask any Islamic question (e.g. Fasting, Prayer, Charity)..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={runAiSearch}
                  disabled={isSearching}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {isSearching ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span>Search</span>
                </button>
              </div>
            </div>

            {aiResult && (
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <p className="text-xs text-slate-300 font-sans leading-relaxed">{aiResult.answer}</p>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                    Verified Citations & References
                  </span>
                  {aiResult.citations.map((c: any, idx: number) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-mono text-emerald-300 font-bold">
                        <span>{c.source} ({c.reference})</span>
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      </div>
                      <p className="text-xs text-slate-200">{c.text}</p>
                    </div>
                  ))}
                </div>

                <p className="text-[10px] font-mono text-slate-500 italic">{aiResult.disclaimer}</p>
              </div>
            )}
          </motion.div>
        )}

        {activeModule === 'reports' && (
          <motion.div key="reports" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 text-center">
            <h4 className="text-lg font-bold text-white font-display">Export Worship & Study Report (PDF)</h4>
            <p className="text-xs text-slate-400 font-sans">Generate a printable summary of your Quran reading progress, prayer logs, and bookmarked Hadiths.</p>
            <button className="px-6 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold inline-flex items-center gap-2 transition-all cursor-pointer">
              <Download className="w-4 h-4" /> Download PDF Report
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
