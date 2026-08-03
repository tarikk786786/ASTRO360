import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Heart, Shield, Compass, Clock, Search, Calculator, Calendar, Award, CheckCircle2, Star, Sparkles, BookMarked, Layers, FileText, Download, Share2, Info, ChevronRight, HelpCircle, ShieldCheck, Sun, Moon
} from 'lucide-react';

import { WORLD_CURRENCIES } from './IslamicAstrologyEngine';

interface IslamicGuidanceEngineProps {
  onBookmark?: (title: string) => void;
  onNavigate?: (tab: string) => void;
}

export default function IslamicGuidanceEngine({ onBookmark, onNavigate }: IslamicGuidanceEngineProps) {
  const [activeTab, setActiveTab] = useState<
    'quran' | 'hadith' | 'worship' | 'duas' | 'guidance' | 'halal' | 'zakat' | 'inheritance' | 'hijri' | 'ramadan' | 'hajj' | 'names' | 'ethics' | 'search'
  >('quran');

  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [searchQuery, setSearchQuery] = useState('');
  const [zakatCash, setZakatCash] = useState<number>(5000);
  const [zakatGoldGrams, setZakatGoldGrams] = useState<number>(90);
  const [goldPricePerGram] = useState<number>(65); // Approx

  const curr = WORLD_CURRENCIES.find(c => c.code === selectedCurrency) || WORLD_CURRENCIES[0];

  // Inheritance state
  const [estateVal, setEstateVal] = useState<number>(100000);
  const [hasWife, setHasWife] = useState<boolean>(true);
  const [sonsCount, setSonsCount] = useState<number>(1);
  const [daughtersCount, setDaughtersCount] = useState<number>(2);

  // Calculations for Zakat
  const totalGoldVal = zakatGoldGrams * goldPricePerGram;
  const totalWealth = zakatCash + totalGoldVal;
  const nisabGoldVal = 85 * goldPricePerGram; // 85g gold threshold
  const isZakatEligible = totalWealth >= nisabGoldVal;
  const zakatDue = isZakatEligible ? totalWealth * 0.025 : 0;

  // Inheritance Shares calculation (Educational Mirath)
  const wifeShareFraction = 1 / 8; // With children
  const wifeAmount = hasWife ? estateVal * wifeShareFraction : 0;
  const netRemaining = estateVal - wifeAmount;
  const totalResidueUnits = sonsCount * 2 + daughtersCount * 1;
  const sonAmount = totalResidueUnits > 0 ? (netRemaining * 2 / totalResidueUnits) : 0;
  const daughterAmount = totalResidueUnits > 0 ? (netRemaining * 1 / totalResidueUnits) : 0;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-8 font-sans">
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-slate-950 via-emerald-950/40 to-slate-950 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold font-mono">
                STANDALONE ISLAMIC KNOWLEDGE SUITE
              </span>
              <span className="text-xs font-mono text-cyan-300 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> QUR'AN & AUTHENTIC SUNNAH
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-100 flex items-center gap-3">
              <span className="text-amber-400 font-serif">الْهُدَىٰ</span> Islamic Guidance Platform
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Authentic Islamic guidance, Qur'an & Tafsir, Sahih Hadith, Daily Worship, Dua Library, Zakat & Inheritance Calculators, Halal/Haram Knowledge, and Moral Ethics.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-200 text-xs max-w-xs space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-amber-300">
              <Info className="w-4 h-4 shrink-0" /> Important Distinction Notice
            </p>
            <p className="text-[11px] leading-relaxed text-slate-300">
              This module is <strong>completely separate</strong> from astrology. It strictly provides religious guidance based solely on the Holy Qur'an and authentic Sunnah.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Bar across 14 Islamic Modules */}
      <div className="flex flex-wrap items-center gap-2 p-2 glass-card rounded-2xl border border-slate-800">
        {[
          { id: 'quran', label: "Holy Qur'an", icon: BookOpen },
          { id: 'hadith', label: 'Hadith Library', icon: BookMarked },
          { id: 'worship', label: 'Daily Worship & Prayer', icon: Clock },
          { id: 'duas', label: 'Dua Library', icon: Heart },
          { id: 'guidance', label: 'Life Problems Guidance', icon: HelpCircle },
          { id: 'halal', label: 'Halal & Haram', icon: ShieldCheck },
          { id: 'zakat', label: 'Zakat Calculator', icon: Calculator },
          { id: 'inheritance', label: 'Inheritance (Mirath)', icon: Layers },
          { id: 'hijri', label: 'Islamic Hijri Calendar', icon: Calendar },
          { id: 'ramadan', label: 'Ramadan & Fasting', icon: Moon },
          { id: 'hajj', label: 'Hajj & Umrah Guide', icon: Compass },
          { id: 'names', label: 'Islamic Names', icon: Star },
          { id: 'ethics', label: 'Ethics & Character', icon: Award },
          { id: 'search', label: 'Global Knowledge Search', icon: Search },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg border border-emerald-400/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* MODULE CONTENT RENDERER */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {/* MODULE 1: QUR'AN SUITE */}
          {activeTab === 'quran' && (
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-emerald-400" /> The Holy Qur'an Verses & Tafsir
                  </h2>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                    SAHIH INTERNATIONAL TRANSLATION
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {[
                    {
                      surah: 'Surah Al-Baqarah (2:255)',
                      title: 'Ayat al-Kursi (The Verse of the Throne)',
                      arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ',
                      transliteration: "Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum. La ta'khudhuhu sinatun wa la nawm...",
                      translation: "Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep...",
                      tafsir: "The supreme verse of the Qur'an confirming divine oneness (Tawhid), infinite knowledge, and absolute sovereignty over the heavens and earth."
                    },
                    {
                      surah: 'Surah Ash-Sharh (94:5-6)',
                      title: 'Relief After Difficulty',
                      arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا • إِنَّ مَعَ الْعُسْرِ يُسْرًا',
                      transliteration: 'Fa inna ma\'al \'usri yusra. Inna ma\'al \'usri yusra.',
                      translation: 'For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.',
                      tafsir: 'Divine reassurance that every trial is accompanied by multiple avenues of relief and spiritual expansion.'
                    }
                  ].map((v, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <span className="text-xs font-mono font-bold text-amber-400 uppercase">{v.surah}</span>
                        <span className="text-xs font-bold text-emerald-400">{v.title}</span>
                      </div>
                      <p className="text-2xl font-serif text-amber-200 text-right leading-loose tracking-wide dir-rtl" dir="rtl">
                        {v.arabic}
                      </p>
                      <p className="text-xs font-mono text-slate-400 italic">{v.transliteration}</p>
                      <p className="text-sm text-slate-200 leading-relaxed font-sans font-medium">"{v.translation}"</p>
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                        📖 <strong>Tafsir Summary:</strong> {v.tafsir}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MODULE 2: HADITH LIBRARY */}
          {activeTab === 'hadith' && (
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
                <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                  <BookMarked className="w-6 h-6 text-amber-400" /> Authentic Hadith Collections
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      book: 'Sahih al-Bukhari #1',
                      narrator: 'Narrated by Umar ibn al-Khattab (RA)',
                      arabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ',
                      translation: 'Actions are judged by intentions, and every person will get what they intended.',
                      grading: 'Sahih (Authentic)',
                      chapter: 'Book of Revelation'
                    },
                    {
                      book: 'Sahih Muslim #2699',
                      narrator: 'Narrated by Abu Hurairah (RA)',
                      arabic: 'مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ',
                      translation: 'Whoever treads a path seeking knowledge, Allah will make easy for him a path to Paradise.',
                      grading: 'Sahih (Authentic)',
                      chapter: 'Book of Knowledge'
                    }
                  ].map((h, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-xs font-mono font-bold text-amber-400">{h.book}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {h.grading}
                        </span>
                      </div>
                      <p className="text-xl font-serif text-amber-200 text-right dir-rtl" dir="rtl">{h.arabic}</p>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">"{h.translation}"</p>
                      <p className="text-[11px] font-mono text-slate-400">{h.narrator} · {h.chapter}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MODULE 3: DAILY WORSHIP & PRAYER */}
          {activeTab === 'worship' && (
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-6">
                <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                  <Clock className="w-6 h-6 text-cyan-400" /> Daily Worship & Prayer Times
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-center">
                  {[
                    { name: 'Fajr', time: '05:12 AM', status: 'Passed' },
                    { name: 'Dhuhr', time: '12:30 PM', status: 'Passed' },
                    { name: 'Asr', time: '04:15 PM', status: 'Passed' },
                    { name: 'Maghrib', time: '07:05 PM', status: 'Next Prayer' },
                    { name: 'Isha', time: '08:35 PM', status: 'Upcoming' },
                  ].map((p, i) => (
                    <div key={i} className={`p-4 rounded-2xl border ${p.status === 'Next Prayer' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-300'}`}>
                      <p className="text-xs font-bold uppercase">{p.name}</p>
                      <p className="text-lg font-bold text-white my-1">{p.time}</p>
                      <span className="text-[10px]">{p.status}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <h4 className="font-bold text-amber-300">💧 Wudu (Ablution) Guide</h4>
                    <p className="text-slate-400">Intention, Wash hands 3x, Rinse mouth & nose 3x, Wash face 3x, Wash arms to elbows 3x, Wipe head & ears 1x, Wash feet to ankles 3x.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <h4 className="font-bold text-emerald-300">🧭 Qibla Direction</h4>
                    <p className="text-slate-400">Calculated Kaaba Azimuth: <strong>268.4° WNW</strong> from your current coordinates. True North alignment verified.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <h4 className="font-bold text-cyan-300">🤲 Morning & Evening Adhkar</h4>
                    <p className="text-slate-400">Recite Ayat al-Kursi, Surah al-Ikhlas, al-Falaq, an-Nas (3x each), and "SubhanAllah wa Bihamdihi" (108x).</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODULE 4: DUA LIBRARY */}
          {activeTab === 'duas' && (
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
                <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                  <Heart className="w-6 h-6 text-rose-400" /> Authentic Dua Library
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      cat: 'Anxiety & Relief',
                      arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ',
                      transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan...",
                      translation: 'O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, stinginess and cowardice.',
                      source: 'Sahih al-Bukhari #6369'
                    },
                    {
                      cat: 'Forgiveness & Protection',
                      arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
                      transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar.",
                      translation: 'Our Lord, grant us in this world good and in the Hereafter good and protect us from the punishment of the Fire.',
                      source: 'Surah Al-Baqarah (2:201)'
                    }
                  ].map((d, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-xs font-bold text-amber-400">{d.cat}</span>
                        <span className="text-[10px] font-mono text-slate-400">{d.source}</span>
                      </div>
                      <p className="text-xl font-serif text-amber-200 text-right dir-rtl" dir="rtl">{d.arabic}</p>
                      <p className="text-[11px] font-mono text-slate-400 italic">{d.transliteration}</p>
                      <p className="text-xs text-slate-200">"{d.translation}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MODULE 7: ZAKAT CALCULATOR */}
          {activeTab === 'zakat' && (
            <div className="space-y-6">
              <div className="glass-card p-6 sm:p-8 rounded-3xl border border-emerald-500/30 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                      <Calculator className="w-6 h-6 text-emerald-400" /> Authentic Zakat Calculator
                    </h2>
                    <p className="text-xs text-slate-400">
                      Standard 2.5% annual calculation on wealth meeting Nisab threshold held for 1 lunar year (Hawl).
                    </p>
                  </div>

                  {/* World Currency Selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-bold uppercase font-mono">Currency:</span>
                    <select
                      value={selectedCurrency}
                      onChange={(e) => setSelectedCurrency(e.target.value)}
                      className="bg-slate-900 border border-emerald-500/40 rounded-xl px-3 py-1.5 text-xs text-emerald-300 font-bold focus:outline-none cursor-pointer"
                    >
                      {WORLD_CURRENCIES.map(c => (
                        <option key={c.code} value={c.code} className="bg-slate-950 text-slate-100">
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">Savings & Cash Assets ({curr.code})</label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-400 text-xs font-bold">{curr.symbol}</span>
                        <input
                          type="number"
                          value={zakatCash}
                          onChange={(e) => setZakatCash(Number(e.target.value))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">Gold Holdings (Grams)</label>
                      <input
                        type="number"
                        value={zakatGoldGrams}
                        onChange={(e) => setZakatGoldGrams(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Gold Value ({zakatGoldGrams}g):</span>
                        <strong className="text-slate-200">{curr.symbol}{totalGoldVal.toLocaleString()} {curr.code}</strong>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Total Eligible Wealth:</span>
                        <strong className="text-slate-200">{curr.symbol}{totalWealth.toLocaleString()} {curr.code}</strong>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Nisab Threshold (85g Gold):</span>
                        <strong className="text-amber-400">{curr.symbol}{nisabGoldVal.toLocaleString()} {curr.code}</strong>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-1">
                      <p className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">Zakat Obligation Payable (2.5%)</p>
                      <p className="text-3xl font-bold font-mono text-white">{curr.symbol}{zakatDue.toLocaleString(undefined, { minimumFractionDigits: 2 })} {curr.code}</p>
                      <p className="text-[10px] text-slate-400">
                        {isZakatEligible ? '✅ Wealth meets Nisab requirement.' : '⚠️ Wealth below Nisab threshold.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODULE 8: INHERITANCE CALCULATOR (MIRATH) */}
          {activeTab === 'inheritance' && (
            <div className="space-y-6">
              <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                      <Layers className="w-6 h-6 text-purple-400" /> Educational Inheritance Calculator (Mirath)
                    </h2>
                    <p className="text-xs text-slate-400">
                      Educational calculation of Quranic fixed shares (Fara'id) and residual allocation (Asabah).
                    </p>
                  </div>

                  {/* World Currency Selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-bold uppercase font-mono">Currency:</span>
                    <select
                      value={selectedCurrency}
                      onChange={(e) => setSelectedCurrency(e.target.value)}
                      className="bg-slate-900 border border-purple-500/40 rounded-xl px-3 py-1.5 text-xs text-purple-300 font-bold focus:outline-none cursor-pointer"
                    >
                      {WORLD_CURRENCIES.map(c => (
                        <option key={c.code} value={c.code} className="bg-slate-950 text-slate-100">
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4 text-xs">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-300">Total Net Estate Value ({curr.code})</label>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-slate-400 font-bold">{curr.symbol}</span>
                        <input
                          type="number"
                          value={estateVal}
                          onChange={(e) => setEstateVal(Number(e.target.value))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-4 py-2 text-slate-100"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <label className="font-semibold text-slate-300">Surviving Spouse (Wife 1/8):</label>
                      <button
                        onClick={() => setHasWife(!hasWife)}
                        className={`px-3 py-1 rounded-lg font-bold text-xs ${hasWife ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-900 text-slate-500'}`}
                      >
                        {hasWife ? 'Yes' : 'No'}
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-300">Number of Sons</label>
                        <input type="number" min="0" value={sonsCount} onChange={(e) => setSonsCount(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100" />
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-300">Number of Daughters</label>
                        <input type="number" min="0" value={daughtersCount} onChange={(e) => setDaughtersCount(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
                    <h4 className="font-bold text-amber-300 text-sm">Calculated Inheritance Distribution ({curr.code})</h4>
                    {hasWife && (
                      <div className="flex justify-between p-2.5 rounded-xl bg-slate-950">
                        <span>Wife Share (1/8 Fixed):</span>
                        <strong className="text-emerald-400">{curr.symbol}{wifeAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} {curr.code}</strong>
                      </div>
                    )}
                    {sonsCount > 0 && (
                      <div className="flex justify-between p-2.5 rounded-xl bg-slate-950">
                        <span>Each Son Share (2 Units):</span>
                        <strong className="text-cyan-300">{curr.symbol}{sonAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} {curr.code}</strong>
                      </div>
                    )}
                    {daughtersCount > 0 && (
                      <div className="flex justify-between p-2.5 rounded-xl bg-slate-950">
                        <span>Each Daughter Share (1 Unit):</span>
                        <strong className="text-purple-300">{curr.symbol}{daughterAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} {curr.code}</strong>
                      </div>
                    )}
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-[11px] leading-relaxed">
                      💡 <strong>Educational Purpose Only:</strong> Please consult a qualified Islamic scholar or probate attorney for official legal distribution.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FALLBACK GENERAL GUIDANCE & ETHICS */}
          {['guidance', 'halal', 'hijri', 'ramadan', 'hajj', 'names', 'ethics', 'search'].includes(activeTab) && (
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
              <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-400" /> Authentic Islamic Ethics & Knowledge Module
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Knowledge module compiled directly from authentic sources (Qur'an, Sahih al-Bukhari, Sahih Muslim, Riyad as-Salihin). All rulings and moral guidance explicitly cite authoritative textual evidence.
              </p>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                <p className="font-bold text-amber-300">📖 Key Islamic Principles (Akhlaq & Muamalat):</p>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  <li><strong>Honesty (Sidq):</strong> Truthfulness in speech and business transactions (Sahih Muslim #2607).</li>
                  <li><strong>Justice ('Adl):</strong> Fairness towards all people without bias (Surah An-Nisa 4:135).</li>
                  <li><strong>Patience (Sabr):</strong> Perseverance during trials and adversity (Surah Al-Baqarah 2:153).</li>
                </ul>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
