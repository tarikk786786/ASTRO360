import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { BookMarked, Search, Sparkles, RefreshCw, CheckCircle2, ShieldCheck, Copy, Volume2, Globe } from 'lucide-react';

interface HadithItem {
  id: number;
  hadithnumber?: number;
  idInBook?: number;
  arabic?: string;
  english?: {
    narrator?: string;
    text?: string;
  };
  text?: string; // Fallback plain text
}

const HADITH_BOOKS = [
  { id: 'bukhari', fallbackId: 'eng-bukhari', name: 'Sahih al-Bukhari', arabicTitle: 'صحيح البخاري', scholar: 'Imam al-Bukhari (d. 256 AH)', status: 'Sahih (Most Authentic)' },
  { id: 'muslim', fallbackId: 'eng-muslim', name: 'Sahih Muslim', arabicTitle: 'صحيح مسلم', scholar: 'Imam Muslim (d. 261 AH)', status: 'Sahih (Most Authentic)' },
  { id: 'abudawud', fallbackId: 'eng-abudawud', name: 'Sunan Abi Dawud', arabicTitle: 'سنن أبي داود', scholar: 'Imam Abu Dawud (d. 275 AH)', status: 'Sunan' },
  { id: 'tirmidhi', fallbackId: 'eng-tirmidhi', name: 'Jami` at-Tirmidhi', arabicTitle: 'جامع الترمذي', scholar: 'Imam at-Tirmidhi (d. 279 AH)', status: 'Sunan' },
  { id: 'nasai', fallbackId: 'eng-nasai', name: 'Sunan an-Nasa\'i', arabicTitle: 'سنن النسائي', scholar: 'Imam an-Nasa\'i (d. 303 AH)', status: 'Sunan' },
  { id: 'ibnmajah', fallbackId: 'eng-ibnmajah', name: 'Sunan Ibn Majah', arabicTitle: 'سنن ابن ماجه', scholar: 'Imam Ibn Majah (d. 273 AH)', status: 'Sunan' }
];

export default function HadithExplorer() {
  const [selectedBook, setSelectedBook] = useState(HADITH_BOOKS[0]);
  const [hadiths, setHadiths] = useState<HadithItem[]>([]);
  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const fetchHadiths = async (book: typeof HADITH_BOOKS[0]) => {
    setIsLoading(true);
    try {
      // Primary: Fetch from Ahmed Baset Hadith-JSON repository
      const res = await fetch(`https://raw.githubusercontent.com/AhmedBaset/hadith-json/main/db/by_chapter/the_9_books/${book.id}/1.json`);
      if (res.ok) {
        const data = await res.json();
        setHadiths(data.hadiths || []);
      } else {
        // Fallback: Fawaz Ahmed API
        const fallbackRes = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${book.fallbackId}/sections/1.json`);
        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json();
          setHadiths(fallbackData.hadiths || []);
        }
      }
    } catch (e) {
      console.error('Failed to fetch Hadith dataset', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHadiths(selectedBook);
  }, [selectedBook]);

  const copyHadith = (h: HadithItem) => {
    const num = h.idInBook || h.hadithnumber || h.id;
    const arabicText = h.arabic ? `${h.arabic}\n\n` : '';
    const engText = h.english?.text || h.text || '';
    const narratorText = h.english?.narrator ? `${h.english.narrator} ` : '';
    navigator.clipboard.writeText(`[${selectedBook.name} #${num}]\n${arabicText}${narratorText}${engText}`);
    setCopiedId(num);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredHadiths = hadiths.filter(h => {
    const num = String(h.idInBook || h.hadithnumber || h.id);
    const engText = (h.english?.text || h.text || '').toLowerCase();
    const narrator = (h.english?.narrator || '').toLowerCase();
    const arabicText = h.arabic || '';
    const q = search.toLowerCase();

    return num === q || engText.includes(q) || narrator.includes(q) || arabicText.includes(search);
  });

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl space-y-6">
      {/* HEADER & HADITH BOOK SELECTOR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            <BookMarked className="w-4 h-4 text-emerald-400" />
            Ahmed Baset Hadith-JSON & Kutub al-Sittah
          </div>
          <h3 className="text-2xl font-bold font-display text-white">Sahih Hadith Digital Library</h3>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Arabic or English (e.g. Intention, Niyyah)..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* BOOK SELECTION TABS */}
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2">
        {HADITH_BOOKS.map((b) => (
          <button
            key={b.id}
            onClick={() => setSelectedBook(b)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
              selectedBook.id === b.id
                ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/40 shadow-sm'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span>{b.name}</span>
            <span className="text-[11px] font-serif text-emerald-400">{b.arabicTitle}</span>
          </button>
        ))}
      </div>

      {/* HADITH LISTING CONTAINER WITH ARABIC & ENGLISH */}
      {isLoading ? (
        <div className="h-64 flex flex-col items-center justify-center gap-3 text-slate-400 text-xs font-mono">
          <RefreshCw className="w-6 h-6 animate-spin text-emerald-400" />
          <span>Loading {selectedBook.name} Hadith Dataset...</span>
        </div>
      ) : (
        <div className="space-y-4 max-h-[520px] overflow-y-auto custom-scrollbar pr-2">
          {filteredHadiths.length > 0 ? (
            filteredHadiths.map((h) => {
              const num = h.idInBook || h.hadithnumber || h.id;
              return (
                <div
                  key={num}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 transition-all space-y-4 text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        {selectedBook.name} #{num}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" /> Authentic Grade: Sahih
                      </span>
                    </div>

                    <button
                      onClick={() => copyHadith(h)}
                      className="text-xs font-mono text-slate-400 hover:text-emerald-300 flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 transition-colors cursor-pointer"
                    >
                      {copiedId === num ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy Text
                        </>
                      )}
                    </button>
                  </div>

                  {/* ARABIC HADITH TEXT */}
                  {h.arabic && (
                    <p className="text-2xl font-serif text-right text-emerald-200 font-arabic leading-loose border-b border-slate-800/80 pb-3">
                      {h.arabic}
                    </p>
                  )}

                  {/* ENGLISH TRANSLATION & NARRATOR */}
                  <div className="space-y-1">
                    {h.english?.narrator && (
                      <p className="text-xs font-bold text-amber-300 font-sans">{h.english.narrator}</p>
                    )}
                    <p className="text-xs text-slate-200 leading-relaxed font-sans">
                      {h.english?.text || h.text || ''}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="h-40 flex items-center justify-center text-slate-400 text-xs font-mono">
              No Hadith matched your query "{search}". Try searching for another keyword.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
