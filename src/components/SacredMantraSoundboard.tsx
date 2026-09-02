import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Play, Pause, Sparkles, ShieldCheck, Radio, CheckCircle2, RotateCcw, Volume2 as BellIcon, Mic, Sliders, Music, Headphones, Wind } from 'lucide-react';
import {
  playSolfeggioTone,
  stopSolfeggioTone,
  setSolfeggioVolume,
  playSingingBowlChime,
  playDhikrClickSound,
  playAudioStream,
  stopAudioStream,
  speakSacredText,
  stopSpeech,
  WaveformType
} from '../lib/audioResonator';
import { toast } from 'sonner';

export interface MantraItem {
  id: string;
  title: string;
  tradition: 'Vedic' | 'Islamic' | 'Solfeggio' | 'Binaural' | 'CBT';
  deityOrEnergy: string;
  scriptText: string;
  phonetic: string;
  meaning: string;
  frequency: string;
  benefit: string;
  targetCount: number;
  audioUrl?: string;
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
    targetCount: 108,
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Gayatri_Mantra.ogg'
  },
  {
    id: 'yatul-kursi',
    title: 'Ayatul Kursi (Verse of the Throne)',
    tradition: 'Islamic',
    deityOrEnergy: 'Divine Protection & Barakah',
    scriptText: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ',
    phonetic: 'Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum. La ta\'khudhuhu sinatun wa la nawm.',
    meaning: 'Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence.',
    frequency: '432 Hz (Universal Peace)',
    benefit: 'Protects against negative energies, grants peace of mind, and brings financial Barakah.',
    targetCount: 33,
    audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/255.mp3'
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
    targetCount: 108,
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Mahamrityunjaya_Mantra.ogg'
  },
  {
    id: 'tasbeeh-fatima',
    title: 'Tasbeeh al-Fatima (SubhanAllah, Alhamdulillah, Allahu Akbar)',
    tradition: 'Islamic',
    deityOrEnergy: 'Divine Remembrance & Contentment',
    scriptText: 'سُبْحَانَ اللَّهِ (33x) • الْحَمْدُ لِلَّهِ (33x) • اللَّهُ أَكْبَرُ (34x)',
    phonetic: 'SubhanAllah (Glory be to Allah) • Alhamdulillah (Praise be to Allah) • Allahu Akbar (Allah is Greatest)',
    meaning: 'Glorification, praise, and declaration of the supreme greatness of Allah.',
    frequency: '432 Hz (Heart Equanimity)',
    benefit: 'Removes physical fatigue before sleep, brings immense peace, and multiplies daily blessings.',
    targetCount: 100,
    audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3'
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
    targetCount: 33,
    audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/112.mp3'
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
    targetCount: 108,
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Gayatri_Mantra.ogg'
  },
  {
    id: 'surya-beej',
    title: 'Surya Beej Mantra (Solar Power)',
    tradition: 'Vedic',
    deityOrEnergy: 'Sun ☉ (Surya)',
    scriptText: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः॥',
    phonetic: 'Om Hram Hreem Hroum Sah Suryaya Namah',
    meaning: 'Salutations to the Divine Sun God, seed of all energy, light, and vitality.',
    frequency: '528 Hz (Solar Core)',
    benefit: 'Strengthens willpower, confidence, social prestige, and physical immunity.',
    targetCount: 108,
    audioUrl: 'https://archive.org/download/SuryaMantra_201712/Surya%20Mantra.mp3'
  },
  {
    id: 'shani-beej',
    title: 'Shani Shanti Beej Mantra (Saturn Discipline)',
    tradition: 'Vedic',
    deityOrEnergy: 'Saturn ♄ (Shani)',
    scriptText: 'ॐ शं शनैश्चराय नमः॥',
    phonetic: 'Om Sham Shanaishcharaya Namah',
    meaning: 'Salutations to Saturn, the slow-moving arbiter of justice, patience, and karmic refinement.',
    frequency: '285 Hz (Somatic Healing)',
    benefit: 'Mitigates Saturnian delays, instills steady patience, and transforms karmic trials into mastery.',
    targetCount: 108,
    audioUrl: 'https://archive.org/download/ShaniMantra_201712/Shani%20Mantra.mp3'
  },
  {
    id: 'dua-younus',
    title: 'Dua Younus (Ayat Kareema - Relief from Distress)',
    tradition: 'Islamic',
    deityOrEnergy: 'Relief from Overwhelming Trial',
    scriptText: 'لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
    phonetic: 'La ilaha illa Anta Subhanaka Inni Kuntu Minaz-Zalimin',
    meaning: 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.',
    frequency: '174 Hz (Deep Stress Relief)',
    benefit: 'Extinguishes severe anxiety, breaks emotional impasses, and invokes immediate divine assistance.',
    targetCount: 40,
    audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/2585.mp3'
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
    targetCount: 100,
    audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/404.mp3'
  },
  {
    id: 'solfeggio-174',
    title: 'Somatic Healing Tone — 174 Hz',
    tradition: 'Solfeggio',
    deityOrEnergy: 'Physical Healing & Grounding',
    scriptText: 'Harmonic frequency for physical comfort, soothing tension, and cellular relaxation.',
    phonetic: '174 Hz Fundamental Pure Solfeggio Wave',
    meaning: 'Natural acoustic frequency designed to soothe bodily pain and nervous tension.',
    frequency: '174 Hz (Somatic Healing)',
    benefit: 'Relieves physical stress, aids sleep onset, and grounds erratic physical energy.',
    targetCount: 10
  },
  {
    id: 'solfeggio-285',
    title: 'Cellular Vitality Tone — 285 Hz',
    tradition: 'Solfeggio',
    deityOrEnergy: 'Tissue Restructuring & Renewal',
    scriptText: 'Harmonic frequency for field restructuring and energetic revitalization.',
    phonetic: '285 Hz Regenerative Solfeggio Pitch',
    meaning: 'Vibrational pulse associated with cellular memory repair and energetic recovery.',
    frequency: '285 Hz (Cellular Renewal)',
    benefit: 'Accelerates recovery from burnout, enhances physical stamina, and clears bio-energetic slumps.',
    targetCount: 10
  },
  {
    id: 'solfeggio-396',
    title: 'Liberation Frequency — 396 Hz',
    tradition: 'Solfeggio',
    deityOrEnergy: 'Root Center & Fear Release',
    scriptText: 'Harmonic frequency for liberating guilt, subconscious grief, and existential fear.',
    phonetic: '396 Hz Root Chakra Alignment Frequency',
    meaning: 'Vibrational stimulus targeting emotional blockages and subconscious anxieties.',
    frequency: '396 Hz (Root Liberation)',
    benefit: 'Clears subconscious guilt, stabilizes emotional foundation, and promotes security.',
    targetCount: 15
  },
  {
    id: 'solfeggio-528',
    title: 'Miracle & DNA Transformation — 528 Hz',
    tradition: 'Solfeggio',
    deityOrEnergy: 'Solar & Heart Core Harmonies',
    scriptText: 'The Golden Frequency of transformation, clarity, peace, and cellular harmony.',
    phonetic: '528 Hz Solar Transformation Frequency',
    meaning: 'Known as the "Frequency of Miracles", associated with deep acoustic peace and focus.',
    frequency: '528 Hz (Miracle & DNA Repair)',
    benefit: 'Enhances cognitive focus, reduces cortisol, and inspires creative breakthroughs.',
    targetCount: 21
  },
  {
    id: 'solfeggio-639',
    title: 'Interpersonal Harmony — 639 Hz',
    tradition: 'Solfeggio',
    deityOrEnergy: 'Heart Chakra & Connection',
    scriptText: 'Harmonic frequency for enhancing communication, love, and social cohesion.',
    phonetic: '639 Hz Relationship & Heart Harmonizer',
    meaning: 'Resonance that promotes empathy, understanding, and peaceful relationship dynamics.',
    frequency: '639 Hz (Heart & Relationships)',
    benefit: 'Harmonizes marital & family dynamics, resolves conflict friction, and opens empathy.',
    targetCount: 21
  },
  {
    id: 'solfeggio-741',
    title: 'Intuition & Expression — 741 Hz',
    tradition: 'Solfeggio',
    deityOrEnergy: 'Throat & Third Eye Center',
    scriptText: 'Harmonic frequency for problem-solving, self-expression, and awakening intuition.',
    phonetic: '741 Hz Expression & Truth Resonance',
    meaning: 'Vibrational pulse for cleansing toxins, promoting clear voice and intellectual flow.',
    frequency: '741 Hz (Awakening Intuition)',
    benefit: 'Sharpens public speaking, unlocks artistic genius, and resolves complex dilemmas.',
    targetCount: 15
  },
  {
    id: 'solfeggio-852',
    title: 'Spiritual Order & Light — 852 Hz',
    tradition: 'Solfeggio',
    deityOrEnergy: 'Third Eye & Higher Awareness',
    scriptText: 'Harmonic frequency for returning to spiritual order, clarity, and inner vision.',
    phonetic: '852 Hz Higher Consciousness Tone',
    meaning: 'Resonance associated with replacing illusion with spiritual truth and clarity.',
    frequency: '852 Hz (Spiritual Order)',
    benefit: 'Raises spiritual perception, eliminates brain fog, and stabilizes executive focus.',
    targetCount: 12
  },
  {
    id: 'solfeggio-963',
    title: 'Crown Pure Consciousness — 963 Hz',
    tradition: 'Solfeggio',
    deityOrEnergy: 'Crown Chakra & Divine Source',
    scriptText: 'Harmonic frequency for divine connection, oneness, and pure awareness.',
    phonetic: '963 Hz Crown Consciousness Frequency',
    meaning: 'The "Frequency of the Gods", connecting individual awareness with universal oneness.',
    frequency: '963 Hz (Crown Awakening)',
    benefit: 'Deepens meditation, dissolves ego friction, and elevates spiritual consciousness.',
    targetCount: 12
  },
  {
    id: 'binaural-theta',
    title: 'Theta Brainwave (4.0 Hz Beat - Meditation)',
    tradition: 'Binaural',
    deityOrEnergy: 'Deep Subconscious & Memory',
    scriptText: '4.0 Hz Binaural Pulse layered over 432 Hz carrier tone for deep meditative states.',
    phonetic: 'Theta 4Hz Binaural Acoustic Pulse',
    meaning: 'Acoustic beat stimulus designed to induce deep theta relaxation, memory consolidation, and calm.',
    frequency: '4.0 Hz Beat (Theta State)',
    benefit: 'Ideal for deep meditation, intuition building, stress reduction, and restorative rest.',
    targetCount: 10
  },
  {
    id: 'binaural-alpha',
    title: 'Alpha Brainwave (10.0 Hz Beat - Executive Focus)',
    tradition: 'Binaural',
    deityOrEnergy: 'Calm Executive Alertness',
    scriptText: '10.0 Hz Binaural Pulse layered over 528 Hz carrier tone for flow state study and focus.',
    phonetic: 'Alpha 10Hz Binaural Flow Pulse',
    meaning: 'Acoustic beat stimulus promoting relaxed alertness, flow state work, and mental clarity.',
    frequency: '10.0 Hz Beat (Alpha Flow)',
    benefit: 'Maximizes work productivity, study retention, calm problem solving, and reduces fatigue.',
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
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [audioSource, setAudioSource] = useState<'stream' | 'synth'>('stream');
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [recitationCount, setRecitationCount] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.3);
  const [waveformMode, setWaveformMode] = useState<WaveformType>('binaural');
  const [binauralBeatHz, setBinauralBeatHz] = useState<number>(4.0);

  const filteredMantras = useMemo(() => {
    if (activeFilter === 'All') return MANTRAS_DATABASE;
    return MANTRAS_DATABASE.filter(m => m.tradition === activeFilter);
  }, [activeFilter]);

  const extractHz = (freqStr: string): number => {
    const match = freqStr.match(/(\d+(?:\.\d+)?)\s*Hz/i);
    return match ? parseFloat(match[1]) : 528;
  };

  const startCurrentAudio = (m: MantraItem) => {
    if (audioSource === 'stream' && m.audioUrl) {
      stopSolfeggioTone();
      playAudioStream(m.audioUrl, volume, () => {
        setIsPlaying(false);
      });
      toast.success(`🎶 Playing Real Audio Stream: ${m.title}`);
    } else {
      stopAudioStream();
      const hz = extractHz(m.frequency);
      playSolfeggioTone(hz, volume, waveformMode, binauralBeatHz);
      toast.success(`📻 Web Audio Oscillator: ${m.title} (${hz} Hz)`);
    }
  };

  const handleSelectMantra = (m: MantraItem) => {
    setSelectedMantra(m);
    setRecitationCount(0);
    stopSpeech();
    setIsSpeaking(false);
    setIsPlaying(true);
    startCurrentAudio(m);
  };

  const handleTogglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);

    if (nextState) {
      startCurrentAudio(selectedMantra);
    } else {
      stopSolfeggioTone();
      stopAudioStream();
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    setSolfeggioVolume(newVol);
  };

  const handleWaveformChange = (newWave: WaveformType) => {
    setWaveformMode(newWave);
    if (isPlaying && audioSource === 'synth') {
      const hz = extractHz(selectedMantra.frequency);
      playSolfeggioTone(hz, volume, newWave, binauralBeatHz);
    }
  };

  const handleStrikeChime = () => {
    const hz = extractHz(selectedMantra.frequency);
    playSingingBowlChime(hz);
    toast.success(`🔔 Tibetan Singing Bowl Chime Struck (${hz} Hz)`);
  };

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const textToSpeak = `${selectedMantra.title}. ${selectedMantra.phonetic}. ${selectedMantra.meaning}`;
      speakSacredText(textToSpeak, 0.85);
      toast.info(`🗣️ Voice Recitation: ${selectedMantra.title}`);
    }
  };

  const handleIncrementCount = () => {
    playDhikrClickSound();
    const next = recitationCount + 1;
    setRecitationCount(next);

    if (next === selectedMantra.targetCount) {
      playSingingBowlChime(extractHz(selectedMantra.frequency));
      toast.success(`🎉 Completed Target of ${selectedMantra.targetCount} Recitations! Barakah & Light!`, {
        duration: 5000
      });
    }
  };

  useEffect(() => {
    return () => {
      stopSolfeggioTone();
      stopAudioStream();
      stopSpeech();
    };
  }, []);

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-white/[0.12] shadow-2xl space-y-6 text-left relative overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2.5">
            <Radio className="w-5.5 h-5.5 text-amber-400 animate-pulse" /> Sacred Mantras & Vibrational Soundboard
          </h3>
          <p className="text-xs text-slate-300 font-mono pt-1">
            Vedic Gayatris, Islamic Adhkar, Solfeggio Harmonies (174Hz–963Hz) & CBT Resonances
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-white/[0.08] font-bold flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-cyan-400" /> Real Audio & Web Audio Engine
          </span>
        </div>
      </div>

      {/* SCIENTIFIC DISTINCTION DISCLAIMER BANNER */}
      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-white/[0.08] text-xs font-mono space-y-1">
        <div className="flex items-center gap-2 text-amber-400 font-bold">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Scientific Distinction & Tradition Framework</span>
        </div>
        <p className="text-slate-300 leading-relaxed text-[11px]">
          Includes real High-Definition audio recitations of sacred texts, Islamic Adhkar, and Vedic Gayatris, alongside real Web Audio Solfeggio frequency oscillators (174Hz–963Hz) and CBT Somatic Resonances.
        </p>
      </div>

      {/* TRADITION FILTER TABS */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {['All', 'Vedic', 'Islamic', 'Solfeggio', 'Binaural', 'CBT'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeFilter === tab
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-md'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            {tab === 'Vedic' && '🕉️ Vedic Gayatris'}
            {tab === 'Islamic' && '🕌 Islamic Adhkar'}
            {tab === 'Solfeggio' && '✨ Solfeggio Harmonies'}
            {tab === 'Binaural' && '🎧 Binaural Beats'}
            {tab === 'CBT' && '🧠 CBT Resonances'}
            {tab === 'All' && '🌐 All Collections'}
          </button>
        ))}
      </div>

      {/* MAIN PLAYER DASHBOARD PANEL */}
      <div className="p-5 rounded-2xl bg-[#0B1220] border border-white/[0.12] space-y-5 shadow-xl relative overflow-hidden">
        {/* TITLE & QUICK AUDIO CONTROLS */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-white/[0.08]">
              {selectedMantra.tradition} • {selectedMantra.deityOrEnergy}
            </span>
            <h4 className="text-base sm:text-lg font-bold text-white mt-1">{selectedMantra.title}</h4>
            <span className="text-xs font-mono text-cyan-300 font-bold">{selectedMantra.frequency}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* AUDIO SOURCE TOGGLE: STREAM vs SYNTH */}
            {selectedMantra.audioUrl && (
              <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-white/10 text-xs font-mono">
                <button
                  onClick={() => {
                    setAudioSource('stream');
                    if (isPlaying) startCurrentAudio(selectedMantra);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    audioSource === 'stream'
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Music className="w-3 h-3" /> Real Recitation
                </button>
                <button
                  onClick={() => {
                    setAudioSource('synth');
                    if (isPlaying) startCurrentAudio(selectedMantra);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    audioSource === 'synth'
                      ? 'bg-cyan-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Headphones className="w-3 h-3" /> Solfeggio Hz Tone
                </button>
              </div>
            )}

            {/* TIBETAN SINGING BOWL CHIME BUTTON */}
            <button
              onClick={handleStrikeChime}
              className="px-3.5 py-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30 text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5"
              title="Strike Tibetan Singing Bowl Chime"
            >
              <BellIcon className="w-3.5 h-3.5 text-purple-400" /> Strike Chime
            </button>

            {/* VOCAL RECITATION SPEECH BUTTON */}
            <button
              onClick={handleToggleSpeech}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isSpeaking
                  ? 'bg-rose-500/30 text-rose-200 border border-rose-400 animate-pulse'
                  : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-500/30'
              }`}
              title="Speak Vocal Recitation"
            >
              <Mic className="w-3.5 h-3.5 text-indigo-400" />
              <span>{isSpeaking ? 'Stop Voice' : 'Voice Recite'}</span>
            </button>

            {/* VOLUME CONTROLLER */}
            <div className="flex items-center gap-1.5 bg-black/50 px-3 py-2 rounded-xl border border-white/10">
              {volume === 0 ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
              <input
                type="range"
                min="0"
                max="0.5"
                step="0.01"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                title="Audio Volume Level"
              />
            </div>

            {/* MAIN PLAY/PAUSE BUTTON */}
            <button
              onClick={handleTogglePlay}
              className={`px-5 py-2.5 rounded-2xl font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                isPlaying
                  ? 'bg-amber-500/30 text-amber-200 border border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-105'
                  : 'bg-amber-500 text-slate-950 hover:bg-amber-400 border border-amber-400 shadow-lg'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isPlaying ? 'Pause Resonator' : 'Play Audio'}</span>
            </button>
          </div>
        </div>

        {/* SYNTHESIS ENGINE CONFIGURATION BAR */}
        <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-300 font-bold">Acoustic Mode:</span>
            {(['binaural', 'drone', 'sine', 'triangle'] as WaveformType[]).map(w => (
              <button
                key={w}
                onClick={() => handleWaveformChange(w)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                  waveformMode === w
                    ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                {w}
              </button>
            ))}
          </div>

          {waveformMode === 'binaural' && (
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[11px]">Binaural Beat Offset:</span>
              <select
                value={binauralBeatHz}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setBinauralBeatHz(val);
                  if (isPlaying && audioSource === 'synth') {
                    playSolfeggioTone(extractHz(selectedMantra.frequency), volume, 'binaural', val);
                  }
                }}
                className="bg-slate-900 text-cyan-300 border border-white/[0.08] rounded-lg px-2 py-0.5 text-xs font-mono"
              >
                <option value={2.0}>Delta (2.0 Hz - Deep Sleep)</option>
                <option value={4.0}>Theta (4.0 Hz - Meditation)</option>
                <option value={7.83}>Schumann (7.83 Hz - Earth Resonance)</option>
                <option value={10.0}>Alpha (10.0 Hz - Focus)</option>
                <option value={40.0}>Gamma (40.0 Hz - Peak Cognition)</option>
              </select>
            </div>
          )}
        </div>

        {/* LIVE AUDIO WAVE VISUALIZER */}
        {isPlaying && (
          <div className="flex items-center justify-center gap-1.5 h-10 py-1 bg-black/30 rounded-xl border border-amber-500/20">
            {Array.from({ length: 36 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: ['15%', '100%', '25%'] }}
                transition={{ duration: 0.35 + (i % 7) * 0.06, repeat: Infinity, repeatType: 'reverse' }}
                className="w-1.5 rounded-full bg-gradient-to-t from-amber-500 via-cyan-400 to-emerald-400"
              />
            ))}
          </div>
        )}

        {/* SCRIPT TEXT DISPLAY & PHONETIC */}
        <div className="space-y-2">
          <div className="p-4 rounded-xl bg-black/60 border border-white/[0.08] text-center space-y-1">
            <p className="text-xl sm:text-2xl font-serif text-amber-300 font-bold leading-relaxed">{selectedMantra.scriptText}</p>
          </div>
          <p className="text-xs font-mono text-slate-300 text-center italic">"{selectedMantra.phonetic}"</p>
        </div>

        {/* DIGITAL TASBEEH / RECITATION COUNTER */}
        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="text-center">
              <span className="text-[9px] font-mono text-slate-400 block font-bold uppercase">Digital Recitations Counter</span>
              <span className="text-xl font-bold text-amber-400 font-mono">
                {recitationCount} <span className="text-xs text-slate-500">/ {selectedMantra.targetCount}</span>
              </span>
            </div>
            {recitationCount >= selectedMantra.targetCount && (
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-full font-mono font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Target Completed!
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleIncrementCount}
              className="px-5 py-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/50 hover:bg-amber-500/30 text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> +1 Tap Recite
            </button>
            <button
              onClick={() => setRecitationCount(0)}
              className="p-2.5 rounded-xl bg-white/5 text-slate-400 hover:text-white border border-white/10 text-xs font-mono transition-all cursor-pointer"
              title="Reset Counter"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* MEANING & BENEFIT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono pt-1">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 block font-bold uppercase">Translation & Meaning:</span>
            <p className="text-slate-200 text-[11px] leading-relaxed">{selectedMantra.meaning}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-white/[0.08] text-emerald-300 space-y-1">
            <span className="text-[10px] font-bold block text-emerald-400 uppercase">Cognitive & Spiritual Benefit:</span>
            <p className="text-[11px] leading-relaxed text-slate-200">{selectedMantra.benefit}</p>
          </div>
        </div>
      </div>

      {/* MANTRAS SOUNDBOARD GRID CATALOG */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredMantras.map(m => {
          const isCurrentPlaying = selectedMantra.id === m.id && isPlaying;
          return (
            <button
              key={m.id}
              onClick={() => handleSelectMantra(m)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer space-y-1.5 group relative overflow-hidden ${
                selectedMantra.id === m.id
                  ? 'bg-amber-500/20 border-amber-400 text-white shadow-xl ring-1 ring-amber-400/40'
                  : 'bg-[#0B1220] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-amber-400 font-bold">{m.tradition}</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-mono text-cyan-300 font-bold">{m.frequency}</span>
                  {isCurrentPlaying ? (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  ) : (
                    <Play className="w-3 h-3 text-slate-500 group-hover:text-amber-400 transition-colors" />
                  )}
                </div>
              </div>
              <h5 className="text-xs font-bold text-white truncate group-hover:text-amber-300">{m.title}</h5>
              <span className="text-[10px] text-slate-400 font-mono block truncate">{m.deityOrEnergy}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
