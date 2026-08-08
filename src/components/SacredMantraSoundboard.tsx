import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Play, Pause, Sparkles, Sun, Moon, ShieldCheck, Heart, Radio, Flame, RefreshCw, CheckCircle2, RotateCcw } from 'lucide-react';
import { playSolfeggioTone, stopSolfeggioTone, setSolfeggioVolume } from '../lib/audioResonator';
import { toast } from 'sonner';

export interface MantraItem {
  id: string;
  title: string;
  tradition: 'Vedic' | 'Islamic' | 'Western' | 'CBT';
  deityOrEnergy: string;
  scriptText: string;
  phonetic: string;
  meaning: string;
  frequency: string;
  benefit: string;
  targetCount: number;
}

export const MANTRAS_DATABASE: MantraItem[] = [
  {
    id: 'gayatri',
    title: 'Mahagayatri Mantra (Solar Illumination)',
    tradition: 'Vedic',
    deityOrEnergy: 'Sun ☉ (Surya)',
    scriptText: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥',
    phonetic: 'Om Bhur Bhuvah Swaha, Tat Savitur Varenyam, Bhargo Devasya Dhimahi, Dhiyo Yo Nah Prachodayat',
    meaning: 'May the divine light of the Sun illuminate our intellect and dispel all spiritual darkness.',
    frequency: '528 Hz (Solar Transformation)',
    benefit: 'Enhances executive clarity, leadership power, vitality, and eliminates self-doubt.',
    targetCount: 108
  },
  {
    id: 'ayatul-kursi',
    title: 'Ayatul Kursi (Verse of the Throne)',
    tradition: 'Islamic',
    deityOrEnergy: 'Divine Protection & Barakah',
    scriptText: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ',
    phonetic: 'Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum. La ta\'khudhuhu sinatun wa la nawm.',
    meaning: 'Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence.',
    frequency: '432 Hz (Universal Peace)',
    benefit: 'Protects against negative energies, grants peace of mind, and brings financial Barakah.',
    targetCount: 33
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
    benefit: 'Neutralizes Sade Sati friction, heals physical ailments, and instills deep courage.',
    targetCount: 108
  },
  {
    id: 'durood-ibrahim',
    title: 'Durood Ibrahim (Salawat on the Prophet)',
    tradition: 'Islamic',
    deityOrEnergy: 'Divine Blessings & Peace',
    scriptText: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
    phonetic: 'Allahumma salli \'ala Muhammadin wa \'ala ali Muhammadin kama sallayta \'ala Ibrahima',
    meaning: 'O Allah, send blessings upon Muhammad and the family of Muhammad, as You sent blessings upon Ibrahim.',
    frequency: '528 Hz (Heart Transformation)',
    benefit: 'Opens spiritual light, brings tranquility to the household, and attracts divine mercy.',
    targetCount: 33
  },
  {
    id: 'lakshmi-mantra',
    title: 'Mahalakshmi Wealth & Prosperity Mantra',
    tradition: 'Vedic',
    deityOrEnergy: 'Venus ♀ & Goddess Lakshmi',
    scriptText: 'ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद श्रीं ह्रीं श्रीं ॐ महालक्ष्म्यै नमः॥',
    phonetic: 'Om Shreem Hreem Shreem Kamale Kamalalaye Praseeda Praseeda Shreem Hreem Shreem Om Mahalakshmyai Namah',
    meaning: 'Om, Goddess Lakshmi residing in the lotus, grant Your grace, abundance, and divine prosperity.',
    frequency: '639 Hz (Abundance Resonance)',
    benefit: 'Activates Venus wealth channels, attracts financial opportunities, and dissolves monetary stress.',
    targetCount: 108
  },
  {
    id: 'istikhara',
    title: 'Dua al-Istikhara (Divine Decision Guidance)',
    tradition: 'Islamic',
    deityOrEnergy: 'Divine Wisdom & Direction',
    scriptText: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ',
    phonetic: 'Allahumma inni astakhiruka bi\'ilmika wa astaqdiruka biqudratika',
    meaning: 'O Allah, I seek Your guidance through Your knowledge and Your power, and ask from Your great bounty.',
    frequency: '741 Hz (Truth & Wisdom)',
    benefit: 'Removes decision ambiguity, aligns business choices, and opens doors of ease.',
    targetCount: 7
  },
  {
    id: 'hasbunallah',
    title: 'Hasbunallahu wa Ni\'mal Wakeel (Sufficiency in God)',
    tradition: 'Islamic',
    deityOrEnergy: 'Supreme Reliance & Victory',
    scriptText: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    phonetic: 'Hasbunallahu wa ni\'mal-Wakeel',
    meaning: 'Sufficient for us is Allah, and He is the best Disposer of affairs.',
    frequency: '852 Hz (Spiritual Order)',
    benefit: 'Dissolves overwhelming anxiety, protects against adversaries, and strengthens inner fortitude.',
    targetCount: 100
  },
  {
    id: 'saraswati',
    title: 'Saraswati Vandana (Knowledge & Arts)',
    tradition: 'Vedic',
    deityOrEnergy: 'Mercury ☿ & Goddess Saraswati',
    scriptText: 'ॐ ऐं सरस्वत्यै नमः॥ ॐ वाग्दैव्यै च विद्महे कामराजाय धीमहि। तन्नो देवी प्रचोदयात्॥',
    phonetic: 'Om Aim Saraswatyai Namah',
    meaning: 'Salutations to Goddess Saraswati, the embodiment of wisdom, speech, and creative mastery.',
    frequency: '741 Hz (Awakening Intuition)',
    benefit: 'Sharpens memory, enhances examination performance, and unlocks artistic inspiration.',
    targetCount: 108
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
    benefit: 'Heals relationship rifts, attracts harmonious soul connections, and calms anxiety.',
    targetCount: 21
  },
  {
    id: 'hermetic-tuning',
    title: 'Hermetic Emerald Frequency (432Hz Sacred Pitch)',
    tradition: 'Western',
    deityOrEnergy: 'Cosmic Geometry & Microcosm',
    scriptText: 'As above, so below; as within, so without. As the universe, so the soul.',
    phonetic: 'Harmonize the inner microcosm with the celestial macrocosm.',
    meaning: 'Alchemical alignment tuning the physical body to the natural 432Hz orbital harmonics.',
    frequency: '432 Hz (Natural Resonance)',
    benefit: 'Restores bio-energetic coherence, lowers cortisol, and deepens meditative states.',
    targetCount: 15
  },
  {
    id: 'solfeggio-963',
    title: 'Solfeggio 963Hz (Crown & Pure Consciousness)',
    tradition: 'Western',
    deityOrEnergy: 'Crown Chakra & Divine Light',
    scriptText: 'I am connected to the infinite source of all light, truth, and universal intelligence.',
    phonetic: 'Connecting with the high frequency of oneness and pure spirit.',
    meaning: 'Frequency of divine awakening, connecting the individual consciousness with the Source.',
    frequency: '963 Hz (Crown Awakening)',
    benefit: 'Activates pineal gland awareness, dissolves ego friction, and elevates spiritual vision.',
    targetCount: 12
  },
  {
    id: 'solfeggio-174',
    title: 'Solfeggio 174Hz (Pain & Tension Release)',
    tradition: 'Western',
    deityOrEnergy: 'Physical Healing & Grounding',
    scriptText: 'My physical body relaxes into natural equilibrium, releasing all cellular tension.',
    phonetic: 'Cellular soothing frequency for natural physical alignment.',
    meaning: 'Natural anesthetic frequency designed to soothe bodily pain and nervous tension.',
    frequency: '174 Hz (Somatic Healing)',
    benefit: 'Relieves physical stress, aids sleep onset, and grounds erratic physical energy.',
    targetCount: 10
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
    benefit: 'Eliminates cognitive overload, sharpens concentration, and restores emotional balance.',
    targetCount: 10
  },
  {
    id: 'cbt-somatic-reset',
    title: 'Somatic Breath & Focus Reset (4-7-8 Pulse)',
    tradition: 'CBT',
    deityOrEnergy: 'Parasympathetic Activation',
    scriptText: 'Inhale peace (4s) — Hold serenity (7s) — Exhale friction (8s). My mind is steady.',
    phonetic: 'Inhale focus. Hold strength. Exhale tension.',
    meaning: 'Neuro-physiological vagus nerve stimulation protocol for instant panic disarming.',
    frequency: '528 Hz (Cellular Repair)',
    benefit: 'Lowers heart rate variability, interrupts panic loops, and restores executive control.',
    targetCount: 8
  }
];

export default function SacredMantraSoundboard() {
  const [selectedMantra, setSelectedMantra] = useState<MantraItem>(MANTRAS_DATABASE[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [recitationCount, setRecitationCount] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.2);

  const filteredMantras = useMemo(() => {
    if (activeFilter === 'All') return MANTRAS_DATABASE;
    return MANTRAS_DATABASE.filter(m => m.tradition === activeFilter);
  }, [activeFilter]);

  const handleSelectMantra = (m: MantraItem) => {
    setSelectedMantra(m);
    setRecitationCount(0);
    if (isPlaying) {
      const match = m.frequency.match(/(\d+)\s*Hz/i);
      const hz = match ? parseInt(match[1], 10) : 528;
      playSolfeggioTone(hz, volume);
    }
  };

  const handleTogglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);

    if (nextState) {
      const match = selectedMantra.frequency.match(/(\d+)\s*Hz/i);
      const hz = match ? parseInt(match[1], 10) : 528;
      playSolfeggioTone(hz, volume);
      toast.success(`Playing ${selectedMantra.title} (${selectedMantra.frequency})`);
    } else {
      stopSolfeggioTone();
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    setSolfeggioVolume(newVol);
  };

  const handleIncrementCount = () => {
    const next = recitationCount + 1;
    setRecitationCount(next);
    if (next === selectedMantra.targetCount) {
      toast.success(`🎉 Completed Full Set of ${selectedMantra.targetCount} Recitations! Barakah & Light!`, {
        duration: 4000
      });
    }
  };

  const handleResetCount = () => {
    setRecitationCount(0);
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
            Vedic Gayatris, Islamic Adhkar, Solfeggio Harmonies (174Hz–963Hz) & CBT Resonances
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 font-bold">
            100% Web Audio Synthesized
          </span>
        </div>
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

          <div className="flex items-center gap-3">
            {/* VOLUME CONTROLLER */}
            <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10">
              {volume === 0 ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
              <input
                type="range"
                min="0"
                max="0.5"
                step="0.01"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                title="Solfeggio Tone Volume"
              />
            </div>

            {/* PLAY/PAUSE BUTTON */}
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
        </div>

        {/* LIVE SOUND WAVE VISUAL ANIMATION */}
        {isPlaying && (
          <div className="flex items-center justify-center gap-1.5 h-8 py-1">
            {Array.from({ length: 28 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: ['15%', '100%', '25%'] }}
                transition={{ duration: 0.5 + (i % 6) * 0.08, repeat: Infinity, repeatType: 'reverse' }}
                className="w-1.5 rounded-full bg-gradient-to-t from-amber-500 via-cyan-400 to-emerald-400"
              />
            ))}
          </div>
        )}

        {/* SCRIPT TEXT & PHONETIC */}
        <div className="space-y-2">
          <div className="p-4 rounded-xl bg-black/50 border border-white/10 text-center space-y-1">
            <p className="text-xl font-serif text-amber-300 font-bold leading-relaxed">{selectedMantra.scriptText}</p>
          </div>
          <p className="text-xs font-mono text-slate-300 text-center italic">"{selectedMantra.phonetic}"</p>
        </div>

        {/* RECITATION COUNTER WIDGET */}
        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="text-center">
              <span className="text-[9px] font-mono text-slate-400 block font-bold uppercase">Recitations</span>
              <span className="text-xl font-bold text-amber-400 font-mono">
                {recitationCount} <span className="text-xs text-slate-500">/ {selectedMantra.targetCount}</span>
              </span>
            </div>
            {recitationCount >= selectedMantra.targetCount && (
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-1 rounded-full font-mono font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Target Met
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleIncrementCount}
              className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> +1 Recite
            </button>
            <button
              onClick={handleResetCount}
              className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white border border-white/10 text-xs font-mono transition-all cursor-pointer"
              title="Reset Counter"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
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
            onClick={() => handleSelectMantra(m)}
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
