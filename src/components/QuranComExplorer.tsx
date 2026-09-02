import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Search, Play, Pause, ExternalLink, Sparkles, Volume2, RefreshCw, Layers, Mic, Eye, EyeOff, CheckCircle, ShieldCheck } from 'lucide-react';

interface Surah {
  id: number;
  name_simple: string;
  name_arabic: string;
  name_complex: string;
  verses_count: number;
  revelation_place: string;
  translated_name: {
    name: string;
  };
}

export default function QuranComExplorer() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [search, setSearch] = useState<string>('');
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [verses, setVerses] = useState<{ id: number; verse_key: string; text_uthmani: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  // QURAN AYAH LOOKUP ENGINE & TANZIL TEXT STYLE STATE
  const [quranStyle, setQuranStyle] = useState<'UTHMANI_ALL' | 'UTHMANI' | 'SIMPLE' | 'SIMPLE_CLEAN' | 'SIMPLE_MINIMAL'>('UTHMANI_ALL');
  const [directAyahRef, setDirectAyahRef] = useState<string>('');
  const [lookupResult, setLookupResult] = useState<string | null>(null);

  // TARTEEL AI HIFZ MEMORIZATION & TAJWEED STATE
  const [hifzMode, setHifzMode] = useState<boolean>(false);
  const [revealedVerses, setRevealedVerses] = useState<Record<string, boolean>>({});

  const fetchSurahs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('https://api.quran.com/api/v4/chapters');
      if (res.ok) {
        const data = await res.json();
        setSurahs(data.chapters || []);
        if (data.chapters && data.chapters.length > 0) {
          setSelectedSurah(data.chapters[0]); // Default to Surah Al-Fatihah
        }
      }
    } catch (e) {
      console.error('Quran.com API error', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSurahs();
  }, []);

  useEffect(() => {
    if (!selectedSurah) return;
    const fetchVerses = async () => {
      try {
        const res = await fetch(`https://api.quran.com/api/v4/verses/by_chapter/${selectedSurah.id}?per_page=15&fields=text_uthmani`);
        if (res.ok) {
          const data = await res.json();
          setVerses(data.verses || []);
          setRevealedVerses({});
        }
      } catch (e) {
        console.error('Failed to fetch verses', e);
      }
    };
    fetchVerses();
  }, [selectedSurah]);

  const toggleAudio = (surahId: number) => {
    if (isPlayingAudio && audioElement) {
      audioElement.pause();
      setIsPlayingAudio(false);
    } else {
      const audioUrl = `https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/${surahId}.mp3`;
      const audio = new Audio(audioUrl);
      audio.play();
      setAudioElement(audio);
      setIsPlayingAudio(true);
      audio.onended = () => setIsPlayingAudio(false);
    }
  };

  const toggleVerseReveal = (key: string) => {
    setRevealedVerses(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredSurahs = surahs.filter(s =>
    s.name_simple.toLowerCase().includes(search.toLowerCase()) ||
    s.translated_name.name.toLowerCase().includes(search.toLowerCase()) ||
    s.name_arabic.includes(search) ||
    String(s.id) === search
  );

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl space-y-6">
      {/* HEADER WITH TARTEEL AI HIFZ BADGE */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            Official Quran.com & Tarteel AI Universal Library
          </div>
          <h3 className="text-2xl font-bold font-display text-white">Holy Qur'an & Hifz Memorization Suite</h3>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* TARTEEL AI HIFZ MEMORIZATION MODE TOGGLE */}
          <button
            onClick={() => setHifzMode(!hifzMode)}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              hifzMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-lg'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
            }`}
          >
            <Mic className="w-3.5 h-3.5 text-amber-400" />
            Tarteel Hifz Mode: {hifzMode ? 'ACTIVE (Hidden Verses)' : 'OFF'}
          </button>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search 114 Surahs..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SURAH LISTING SIDEBAR */}
        <div className="lg:col-span-5 max-h-96 overflow-y-auto custom-scrollbar space-y-2 pr-1">
          {isLoading ? (
            <div className="h-40 flex items-center justify-center text-slate-400 text-xs font-mono">
              <RefreshCw className="w-5 h-5 animate-spin text-emerald-400 mr-2" /> Loading 114 Surahs...
            </div>
          ) : (
            filteredSurahs.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSurah(s)}
                className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  selectedSurah?.id === s.id
                    ? 'bg-emerald-500/20 border-emerald-500/50 shadow-md'
                    : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center border border-emerald-500/20">
                    {s.id}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{s.name_simple}</h4>
                    <p className="text-[11px] text-slate-400">{s.translated_name.name} • {s.verses_count} Verses</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-serif text-emerald-300 font-arabic">{s.name_arabic}</p>
                  <span className="text-[9px] uppercase font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                    {s.revelation_place}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>

        {/* SELECTED SURAH DETAILS & VERSES */}
        <div className="lg:col-span-7 space-y-4 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          {selectedSurah ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-400">Surah #{selectedSurah.id}</span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase bg-slate-800 px-2 py-0.5 rounded">
                      {selectedSurah.revelation_place} Revelation
                    </span>
                  </div>
                  <h4 className="text-xl font-bold font-display text-white mt-1">
                    {selectedSurah.name_simple} ({selectedSurah.translated_name.name})
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleAudio(selectedSurah.id)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {isPlayingAudio ? (
                      <>
                        <Pause className="w-3.5 h-3.5 text-amber-400" /> Pause Audio
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> Recite Audio
                      </>
                    )}
                  </button>

                  <a
                    href={`https://quran.com/${selectedSurah.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* TARTEEL HIFZ NOTICE IF ENABLED */}
              {hifzMode && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-white/[0.08] text-xs text-amber-300 font-mono flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Tarteel Hifz Self-Test: Recite Ayah from memory, then click "Reveal Verse" to check for mistakes!</span>
                </div>
              )}

              {/* VERSES DISPLAY */}
              <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar pr-1">
                {verses.map((v) => {
                  const isRevealed = !hifzMode || revealedVerses[v.verse_key];

                  return (
                    <div key={v.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2 text-left">
                      <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                        <span className="text-emerald-400 font-bold">Ayah {v.verse_key}</span>
                        {hifzMode && (
                          <button
                            onClick={() => toggleVerseReveal(v.verse_key)}
                            className="text-amber-400 hover:underline flex items-center gap-1 font-bold cursor-pointer"
                          >
                            {isRevealed ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                            {isRevealed ? 'Hide Verse' : 'Reveal Verse'}
                          </button>
                        )}
                      </div>

                      {isRevealed ? (
                        <p className="text-2xl font-serif text-right text-emerald-200 font-arabic leading-loose py-1">
                          {v.text_uthmani}
                        </p>
                      ) : (
                        <div
                          onClick={() => toggleVerseReveal(v.verse_key)}
                          className="py-4 text-center text-xs font-mono text-amber-400/80 bg-slate-900/90 rounded-xl border border-amber-500/20 cursor-pointer hover:bg-slate-900 transition-colors"
                        >
                          🙈 Verse hidden for Hifz practice. Click to reveal Uthmani script!
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-slate-400 text-xs font-mono">
              Select a Surah from the list to view Uthmani verses & listen to recitation.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
