import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Play, Pause, Sparkles, Sun, Moon, ShieldCheck, Heart, Radio, Flame } from 'lucide-react';
import { playSolfeggioTone, stopSolfeggioTone } from '../lib/audioResonator';

interface MantraItem {
  id: string;
  title: string;
  tradition: 'Vedic' | 'Islamic' | 'Western' | 'CBT';
  deityOrEnergy: string;
  scriptText: string;
  phonetic: string;
  meaning: string;
  frequency: string;
  benefit: string;
}

const MANTRAS_DATABASE: MantraItem[] = [
  {
    id: 'gayatri',
    title: 'Mahagayatri Mantra (Solar Illumination)',
    tradition: 'Vedic',
    deityOrEnergy: 'Sun ☉ (Surya)',
    scriptText: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥',
    phonetic: 'Om Bhur Bhuvah Swaha, Tat Savitur Varenyam, Bhargo Devasya Dhimahi, Dhiyo Yo Nah Prachodayat',
    meaning: 'May the divine light of the Sun illuminate our intellect and dispel all spiritual darkness.',
    frequency: '528 Hz (Solar Transformation)',
    benefit: 'Enhances executive clarity, leadership power, vitality, and eliminates self-doubt.'
  },
  {
    id: 'ayatul-kursi',
    title: 'Ayatul Kursi (Verse of the Throne)',
    tradition: 'Islamic',
    deityOrEnergy: 'Divine Protection & Barakah',
    scriptText: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ',
    phonetic: 'Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum. La ta\'khudhuhu sinatun wa la nawm.',
    meaning: 'Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence.',
    frequency: '432 Hz (Universal Peace)',
    benefit: 'Protects against negative energies, grants peace of mind, and brings financial Barakah.'
  },
  {
    id: 'mahamrityunjaya',
    title: 'Mahamrityunjaya Mantra (Conquest of Fear)',
    tradition: 'Vedic',
    deityOrEnergy: 'Saturn ♄ & Lord Shiva',
    scriptText: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥',
    phonetic: 'Om Tryambakam Yajamahe Sugandhim Pushti-Vardhanam, Urvarukamiva Bandhanan Mrityor Mukshiya Ma-Amritat',
    meaning: 'We meditate on the Three-Eyed One, who nourishes all beings. May He liberate us from death and suffering.',
    frequency: '396 Hz (Root Liberation)',
    benefit: 'Neutralizes Sade Sati friction, heals physical ailments, and instills deep courage.'
  },
  {
    id: 'istikhara',
    title: 'Dua al-Istikhara (Divine Decision Guidance)',
    tradition: 'Islamic',
    deityOrEnergy: 'Divine Wisdom & Direction',
    scriptText: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ',
    phonetic: 'Allahumma inni astakhiruka bi\'ilmika wa astaqdiruka biqudratika',
    meaning: 'O Allah, I seek Your guidance through Your knowledge and Your power.',
    frequency: '741 Hz (Truth & Wisdom)',
    benefit: 'Removes decision ambiguity, aligns business choices, and opens doors of ease.'
  },
  {
    id: 'metta',
    title: 'Metta Bhavana (Loving-Kindness Frequency)',
    tradition: 'Western',
    deityOrEnergy: 'Venus ♀ & Heart Center',
    scriptText: 'May all beings be happy. May all beings be peaceful. May all beings be free from suffering.',
    phonetic: 'May I be at peace. May my family be blessed. May the world thrive in harmony.',
    meaning: 'Universal radiation of unconditional love and goodwill to all sentient existence.',
    frequency: '639 Hz (Heart Harmony)',
    benefit: 'Heals relationship rifts, attracts harmonious soul connections, and calms anxiety.'
  },
  {
    id: 'cbt-grounding',
    title: 'Neuro-Cognitive Grounding Affirmation',
    tradition: 'CBT',
    deityOrEnergy: 'Mindfulness & Mental Stability',
    scriptText: 'I control my focus. I release what I cannot alter. I execute my daily priorities with calm precision.',
    phonetic: 'Breathe in clarity. Exhale friction. I am capable and grounded in the present moment.',
    meaning: 'Cognitive restructuring designed to disarm anxiety and focus energy on actionable steps.',
    frequency: '852 Hz (Third Eye Focus)',
    benefit: 'Eliminates cognitive overload, sharpens concentration, and restores emotional balance.'
  }
];

export default function SacredMantraSoundboard() {
  const [selectedMantra, setSelectedMantra] = useState<MantraItem>(MANTRAS_DATABASE[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filteredMantras = useMemo(() => {
    if (activeFilter === 'All') return MANTRAS_DATABASE;
    return MANTRAS_DATABASE.filter(m => m.tradition === activeFilter);
  }, [activeFilter]);

  const handleTogglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);

    if (nextState) {
      const match = selectedMantra.frequency.match(/(\d+)\s*Hz/i);
      const hz = match ? parseInt(match[1], 10) : 528;
      playSolfeggioTone(hz);
    } else {
      stopSolfeggioTone();
    }
  };

  useEffect(() => {
    return () => {
      stopSolfeggioTone();
    };
  }, []);

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-amber-500/40 shadow-2xl space-y-6 text-left relative overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Radio className="w-5 h-5 text-amber-400" /> Sacred Mantras & Vibrational Soundboard
          </h3>
          <p className="text-xs text-slate-400 font-mono pt-0.5">
            Vedic Gayatris, Islamic Adhkar, Solfeggio Harmonies (396Hz–852Hz) & CBT Resonances
          </p>
        </div>
        <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 font-bold">
          Sacred Soundboard Engine
        </span>
      </div>

      {/* TRADITION FILTER TABS */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {['All', 'Vedic', 'Islamic', 'Western', 'CBT'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeFilter === tab
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-md'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            {tab === 'Vedic' && '🕉️ Vedic'}
            {tab === 'Islamic' && '🕌 Islamic'}
            {tab === 'Western' && '⭐ Western'}
            {tab === 'CBT' && '🧠 CBT'}
            {tab === 'All' && '🌐 All Traditions'}
          </button>
        ))}
      </div>

      {/* ACTIVE MANTRA PLAYER BANNER */}
      <div className="p-5 rounded-2xl bg-[#0B1220] border border-amber-500/40 space-y-4 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div>
            <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/30">
              {selectedMantra.tradition} • {selectedMantra.deityOrEnergy}
            </span>
            <h4 className="text-base font-bold text-white mt-1">{selectedMantra.title}</h4>
            <span className="text-xs font-mono text-cyan-300">{selectedMantra.frequency}</span>
          </div>

          <button
            onClick={handleTogglePlay}
            className={`px-5 py-2.5 rounded-2xl font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              isPlaying
                ? 'bg-amber-500/30 text-amber-200 border border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-105'
                : 'bg-amber-500 text-slate-950 hover:bg-amber-400 border border-amber-400'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isPlaying ? 'Pause Resonator' : 'Play Resonance'}</span>
          </button>
        </div>

        {/* LIVE SOUND WAVE VISUAL ANIMATION */}
        {isPlaying && (
          <div className="flex items-center justify-center gap-1.5 h-8 py-1">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: ['20%', '100%', '30%'] }}
                transition={{ duration: 0.6 + (i % 5) * 0.1, repeat: Infinity, repeatType: 'reverse' }}
                className="w-1.5 rounded-full bg-gradient-to-t from-amber-500 to-cyan-400"
              />
            ))}
          </div>
        )}

        {/* SCRIPT TEXT & PHONETIC */}
        <div className="space-y-2">
          <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-center">
            <p className="text-lg font-serif text-amber-300 font-bold leading-relaxed">{selectedMantra.scriptText}</p>
          </div>
          <p className="text-xs font-mono text-slate-300 text-center italic">"{selectedMantra.phonetic}"</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono pt-1">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 block font-bold">Meaning:</span>
            <p className="text-slate-200 text-[11px] leading-relaxed">{selectedMantra.meaning}</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 space-y-1">
            <span className="text-[10px] font-bold block text-emerald-400">Astrological Benefit:</span>
            <p className="text-[11px] leading-relaxed text-slate-200">{selectedMantra.benefit}</p>
          </div>
        </div>
      </div>

      {/* MANTRAS LIST GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredMantras.map(m => (
          <button
            key={m.id}
            onClick={() => { setSelectedMantra(m); setIsPlaying(false); }}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer space-y-1.5 ${
              selectedMantra.id === m.id
                ? 'bg-amber-500/15 border-amber-400 text-white shadow-lg'
                : 'bg-[#0B1220] border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-amber-400 font-bold">{m.tradition}</span>
              <span className="text-[9px] font-mono text-cyan-300">{m.frequency}</span>
            </div>
            <h5 className="text-xs font-bold text-white truncate">{m.title}</h5>
            <span className="text-[10px] text-slate-400 font-mono block truncate">{m.deityOrEnergy}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
