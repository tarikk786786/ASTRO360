import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Sparkles, Flame, Sun, Heart, Compass, Shield, Award, Search, 
  ChevronRight, RefreshCw, Bookmark, Share2, Volume2, HelpCircle
} from 'lucide-react';
import { GitaEngine, GitaChapter, GitaVerse } from '../lib/gitaEngine';

export default function BhagavadGitaSuite() {
  const [chapters, setChapters] = useState<GitaChapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<number>(2); // Default to Chapter 2 (Sankhya Yoga)
  const [selectedVerseNum, setSelectedVerseNum] = useState<number>(47); // Default to Sloka 2:47
  const [currentVerse, setCurrentVerse] = useState<GitaVerse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const loadChapters = async () => {
      const chs = await GitaEngine.fetchChapters();
      setChapters(chs);
    };
    loadChapters();
  }, []);

  useEffect(() => {
    const loadVerse = async () => {
      setIsLoading(true);
      const v = await GitaEngine.fetchVerse(selectedChapter, selectedVerseNum);
      setCurrentVerse(v);
      setIsLoading(false);
    };
    loadVerse();
  }, [selectedChapter, selectedVerseNum]);

  const activeChapterMeta = chapters.find(c => c.chapter_number === selectedChapter) || chapters[1];

  const handleRandomWisdom = () => {
    const randomCh = Math.floor(Math.random() * 18) + 1;
    const randomV = Math.floor(Math.random() * 20) + 1;
    setSelectedChapter(randomCh);
    setSelectedVerseNum(randomV);
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl space-y-8 text-left">
      {/* HEADER & VEDIC WISDOM BADGE */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            <Flame className="w-4 h-4 text-amber-400" />
            Bhagavad Gita Open API Suite (gita/bhagavad-gita-api)
          </div>
          <h3 className="text-2xl font-bold font-display text-white">Bhagavad Gita Wisdom & Philosophy</h3>
        </div>

        <button
          onClick={handleRandomWisdom}
          className="px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-white/[0.08] text-amber-300 text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          Random Divine Wisdom
        </button>
      </div>

      {/* CHAPTER SELECTION TABS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" /> 18 Sacred Adhyayas (Chapters)
          </h4>
          <span className="text-[11px] font-mono text-amber-400">
            Selected: Chapter {selectedChapter} — {activeChapterMeta?.name_transliteration}
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {Array.from({ length: 18 }, (_, i) => i + 1).map((chNum) => {
            const ch = chapters.find(c => c.chapter_number === chNum);
            const isSelected = selectedChapter === chNum;
            return (
              <button
                key={chNum}
                onClick={() => {
                  setSelectedChapter(chNum);
                  setSelectedVerseNum(1);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-mono font-bold shrink-0 transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-white/[0.12] hover:text-white'
                }`}
              >
                Ch {chNum} {ch ? `(${ch.name})` : ''}
              </button>
            );
          })}
        </div>
      </div>

      {/* CHAPTER SUMMARY CARD */}
      {activeChapterMeta && (
        <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-amber-400 font-bold">
              {activeChapterMeta.name} • {activeChapterMeta.name_transliteration}
            </div>
            <div className="text-sm font-semibold text-white mt-0.5">
              {activeChapterMeta.name_translation} ({activeChapterMeta.name_meaning})
            </div>
            <p className="text-xs text-slate-300 font-mono mt-1 leading-relaxed">
              {activeChapterMeta.summary?.en}
            </p>
          </div>
          <span className="text-xs font-mono text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-full border border-white/[0.08] shrink-0">
            {activeChapterMeta.verses_count} Slokas
          </span>
        </div>
      )}

      {/* VERSE NAVIGATION & DISPLAY CARD */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Sloka Number:</span>
            <select
              value={selectedVerseNum}
              onChange={(e) => setSelectedVerseNum(Number(e.target.value))}
              className="bg-slate-900 border border-slate-700 text-white font-mono text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-400"
            >
              {Array.from({ length: activeChapterMeta?.verses_count || 47 }, (_, i) => i + 1).map((v) => (
                <option key={v} value={v}>
                  Sloka {selectedChapter}:{v}
                </option>
              ))}
            </select>
          </div>

          <div className="text-xs font-mono text-slate-400">
            Chapter {selectedChapter}, Verse {selectedVerseNum}
          </div>
        </div>

        {/* SLOKA DISPLAY BOX */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className="p-12 text-center font-mono text-xs text-amber-400 flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
              Retrieving Divine Sloka from Gita API...
            </div>
          ) : currentVerse ? (
            <motion.div
              key={`${selectedChapter}-${selectedVerseNum}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 rounded-3xl bg-slate-900/90 border border-white/[0.08] space-y-6 shadow-xl"
            >
              {/* SANSKRIT SLOKA */}
              <div className="text-center space-y-2">
                <div className="text-xl sm:text-2xl font-bold font-serif text-amber-300 leading-loose">
                  {currentVerse.slok}
                </div>
                <div className="text-xs font-mono text-slate-400 italic">
                  {currentVerse.transliteration}
                </div>
              </div>

              {/* TRANSLATION & COMMENTARY */}
              <div className="p-4 rounded-2xl bg-black/40 border border-slate-800 space-y-3 text-left">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold">
                  <Sun className="w-4 h-4 text-amber-400" />
                  English Translation ({currentVerse.siva?.author || currentVerse.purohit?.author || 'Swami Sivananda'}):
                </div>
                <p className="text-sm font-sans text-white leading-relaxed font-medium">
                  "{currentVerse.siva?.et || currentVerse.purohit?.et || currentVerse.tej?.ht || 'You have a right to perform your prescribed duty, but never to the fruits of action.'}"
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="p-8 text-center text-xs font-mono text-slate-400 border border-dashed border-slate-800 rounded-2xl">
              Sloka {selectedChapter}:{selectedVerseNum} is ready for contemplation. Select another Sloka above.
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
