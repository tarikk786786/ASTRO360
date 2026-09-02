import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Volume2, 
  Sparkles, 
  Sun, 
  Moon, 
  Compass, 
  BookOpen, 
  Heart, 
  Clock, 
  ShieldCheck, 
  Sliders, 
  Globe2, 
  Check, 
  Play, 
  Layers,
  Repeat
} from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { getAllSupportedLanguages } from '../../lib/audio/languageRegistry';
import { getAllVoiceProfiles, type VoiceProfileId, type AudioTone, type ContentDomain } from '../../lib/audio/voiceRegistry';
import { MantraService, type TraditionalMantra } from '../../lib/audio/mantraService';
import { IslamicAudioService, type IslamicAudioEntry } from '../../lib/audio/islamicAudioService';
import { playSolfeggioTone } from '../../lib/audioResonator';
import type { UserProfile } from '../../types';

export interface AstroAudioHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile?: UserProfile;
}

export const AstroAudioHubModal: React.FC<AstroAudioHubModalProps> = ({
  isOpen,
  onClose,
  userProfile,
}) => {
  const { playTrack, openFullPlayer } = useAudio();
  const [activeDomain, setActiveDomain] = useState<ContentDomain>('ASTROLOGY');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [selectedVoice, setSelectedVoice] = useState<VoiceProfileId>('CALM_GUIDE');
  const [selectedTone, setSelectedTone] = useState<AudioTone>('Calm');

  if (!isOpen) return null;

  const languages = getAllSupportedLanguages();
  const voices = getAllVoiceProfiles();
  const mantras = MantraService.getAll();
  const islamicEntries = IslamicAudioService.getAll();

  const seekerName = userProfile?.name || 'Seeker';

  const handlePlayAstrologyBriefing = () => {
    const text = `Good morning, ${seekerName}. Today, the Moon transits your auspicious professional house, forming a harmonic trine with Jupiter. In your Vimshottari progression, you are anchored in a supportive sub-period favoring calculated initiative. Trust the underlying timing and lead with quiet confidence.`;
    playTrack({
      id: `briefing-${Date.now()}`,
      title: 'Daily 2-Minute Cosmic Briefing',
      subtitle: `Personalized for ${seekerName}`,
      domain: 'ASTROLOGY',
      language: selectedLanguage,
      voiceProfileId: selectedVoice,
      tone: selectedTone,
      text,
      isSynthetic: true,
      provenance: 'ASTRO360 Ephemeris Speech Synthesizer',
      disclaimer: 'Astrological interpretations are reflective perspectives on astronomical timing, not deterministic guarantees.',
    });
    openFullPlayer();
  };

  const handlePlayMantra = (mantra: TraditionalMantra, targetCount: number = 108) => {
    playTrack({
      id: mantra.id,
      title: mantra.name,
      subtitle: `${mantra.tradition} • ${mantra.source}`,
      domain: 'MANTRA',
      language: 'sa',
      voiceProfileId: 'CALM_GUIDE',
      tone: 'Calm',
      text: `${mantra.originalText} — ${mantra.transliteration}. Meaning: ${mantra.translation}`,
      isSynthetic: true,
      provenance: mantra.audioSource,
      targetCount,
      currentCount: 1,
      traditionSource: mantra.source,
      disclaimer: mantra.disclaimer,
    });
    openFullPlayer();
  };

  const handlePlayIslamic = (item: IslamicAudioEntry) => {
    playTrack({
      id: item.id,
      title: item.title,
      subtitle: `${item.source}`,
      domain: 'ISLAMIC',
      language: 'ar',
      isRtl: true,
      text: `${item.arabicText} \n\n${item.transliteration} \n\nTranslation: ${item.translation}`,
      isSynthetic: item.isSyntheticVoice,
      provenance: item.reciter,
      traditionSource: item.source,
      disclaimer: item.disclaimer,
    });
    openFullPlayer();
  };

  const handlePlaySolfeggio = (freqHz: number, name: string) => {
    playSolfeggioTone(freqHz, 0.25, 'binaural');
    playTrack({
      id: `solfeggio-${freqHz}`,
      title: `${name} (${freqHz} Hz)`,
      subtitle: 'Pure Solfeggio Harmonic Waveform',
      domain: 'MEDITATION',
      language: 'en',
      isSynthetic: false,
      provenance: 'ASTRO360 WebAudio Precision Harmonic Synthesizer',
      text: `Listening to ${freqHz}Hz ${name}. Focus on your breathing, release tension in your shoulders, and cultivate stillness.`,
      disclaimer: 'Soundscapes and frequencies are intended for meditative relaxation and focus.',
    });
    openFullPlayer();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal Sheet */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="audio-hub-title"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-[#070C16] border-t sm:border border-white/15 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col z-10 max-h-[88vh] overflow-hidden"
          style={{
            paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))',
          }}
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between gap-3 bg-[#0B1220]/90">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-400/10 border border-white/[0.08] text-amber-400">
                <Volume2 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h2 id="audio-hub-title" className="text-base sm:text-lg font-extrabold text-white font-sans">
                  ASTRO360 Audio Studio & Sacred Sound
                </h2>
                <p className="text-xs font-mono text-slate-400">
                  Multilingual astrology narration, traditional mantras & authentic Islamic duas
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close audio hub"
              className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* 4 Content Domain Tabs */}
          <div className="flex items-center gap-1.5 p-3 border-b border-white/10 bg-[#090F1C] overflow-x-auto no-scrollbar">
            {[
              { id: 'ASTROLOGY', label: '🪐 Astrology & Forecast' },
              { id: 'MEDITATION', label: '🧘 Meditative & Waves' },
              { id: 'MANTRA', label: '🕉️ Traditional Mantras' },
              { id: 'ISLAMIC', label: '☪️ Islamic Dua & Qur\'an' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveDomain(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeDomain === tab.id
                    ? 'bg-white text-black font-semibold shadow-sm shadow-md font-black'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Body Content */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-left">
            {/* 1. ASTROLOGY DOMAIN */}
            {activeDomain === 'ASTROLOGY' && (
              <div className="space-y-4">
                {/* Voice & Language Settings Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Language Selector */}
                  <div className="p-3 rounded-2xl bg-[#0D1526] border border-white/10 space-y-1.5">
                    <span className="text-[11px] font-mono font-bold text-slate-400 uppercase flex items-center gap-1">
                      <Globe2 className="w-3.5 h-3.5 text-cyan-400" /> Language / Script
                    </span>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="w-full bg-[#070C16] border border-white/15 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                    >
                      {languages.map(lang => (
                        <option key={lang.code} value={lang.code}>
                          {lang.name} ({lang.nativeName}) — {lang.direction.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Voice Profile Selector */}
                  <div className="p-3 rounded-2xl bg-[#0D1526] border border-white/10 space-y-1.5">
                    <span className="text-[11px] font-mono font-bold text-slate-400 uppercase flex items-center gap-1">
                      <Volume2 className="w-3.5 h-3.5 text-amber-400" /> Voice Profile
                    </span>
                    <select
                      value={selectedVoice}
                      onChange={(e) => setSelectedVoice(e.target.value as any)}
                      className="w-full bg-[#070C16] border border-white/15 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                    >
                      {voices.map(v => (
                        <option key={v.id} value={v.id}>
                          {v.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Daily Audio Briefing Launcher Card */}
                <div className="p-5 rounded-3xl bg-gradient-to-br from-[#0B1220] via-[#0E172A] to-[#080E1A] border border-white/[0.08] space-y-3 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" /> Daily Ephemeris Audio Briefing
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      2 Minutes
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                    Personalized audio summary of today's lunar transit, active Vimshottari Dasha window, and peak harmonic alignment.
                  </p>
                  <button
                    type="button"
                    onClick={handlePlayAstrologyBriefing}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-400/20 active:scale-95 transition-all cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>Listen to Today's Astrology</span>
                  </button>
                </div>
              </div>
            )}

            {/* 2. MEDITATIVE DOMAIN */}
            {activeDomain === 'MEDITATION' && (
              <div className="space-y-3">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  Harmonic Solfeggio & Planetary Frequencies
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { hz: 528, name: 'Transformation & Clarity (Solfeggio)', desc: 'Promotes deep mental coherence and stress release.' },
                    { hz: 432, name: 'Cosmic Earth Resonance (Verdi A)', desc: 'Natural harmonic tuning aligned with celestial mathematics.' },
                    { hz: 639, name: 'Harmonious Relationship Frequency', desc: 'Heart-centered empathy and social equilibrium.' },
                    { hz: 136.1, name: 'Ohm / Earth Year Frequency', desc: 'Deep grounding frequency linked to the orbital cycle.' },
                  ].map(sound => (
                    <div
                      key={sound.hz}
                      className="p-4 rounded-2xl bg-[#0D1526] border border-white/10 hover:border-white/[0.12] transition-all flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1 min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{sound.name}</h4>
                        <p className="text-[11px] text-slate-400 leading-snug">{sound.desc}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handlePlaySolfeggio(sound.hz, sound.name)}
                        className="flex items-center justify-center min-w-[36px] min-h-[36px] rounded-xl bg-white text-black font-semibold shadow-sm hover:bg-amber-300 cursor-pointer active:scale-90 shadow-md shrink-0"
                      >
                        <Play className="w-3.5 h-3.5 fill-slate-950 translate-x-0.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. TRADITIONAL MANTRA DOMAIN */}
            {activeDomain === 'MANTRA' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                    Classical Sourced Mantras (Devanagari + IAST)
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">108x Counter Ready</span>
                </div>

                <div className="space-y-3">
                  {mantras.map(m => (
                    <div
                      key={m.id}
                      className="p-4 rounded-2xl bg-[#0D1526] border border-white/10 hover:border-white/[0.12] transition-all space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{m.name}</span>
                          {m.associatedPlanet && (
                            <span className="text-[9.5px] font-mono text-amber-300 bg-amber-400/10 px-1.5 py-0.2 rounded border border-white/[0.08]">
                              {m.associatedPlanet}
                            </span>
                          )}
                        </div>
                        <span className="text-[9.5px] font-mono text-slate-400 truncate max-w-[150px]">
                          {m.source}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-[#070C16] border border-white/5 space-y-1">
                        <p className="text-sm font-bold text-amber-300 font-devanagari">{m.originalText}</p>
                        <p className="text-xs font-mono text-slate-300">{m.transliteration}</p>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed font-sans">{m.meaning}</p>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] font-mono text-slate-400">
                          Syllables: {m.pronunciation.syllables.join(' • ')}
                        </span>
                        <button
                          type="button"
                          onClick={() => handlePlayMantra(m, 108)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-black font-semibold shadow-sm font-bold text-xs font-mono cursor-pointer active:scale-95 shadow-md"
                        >
                          <Play className="w-3.5 h-3.5 fill-slate-950" />
                          <span>Recite (108x)</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. ISLAMIC DUA & QUR'AN DOMAIN */}
            {activeDomain === 'ISLAMIC' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                    Authentic Duas & Qur'an Verses (Uthmani Arabic)
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400">Verified Sources</span>
                </div>

                <div className="space-y-3">
                  {islamicEntries.map(item => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-[#0D1526] border border-white/10 hover:border-emerald-500/40 transition-all space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-white">{item.title}</span>
                        <span className="text-[9.5px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                          {item.source}
                        </span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#070C16] border border-white/5 text-right space-y-1.5" dir="rtl">
                        <p className="text-base font-bold text-emerald-300 font-arabic leading-loose">
                          {item.arabicText}
                        </p>
                      </div>

                      <p className="text-xs font-mono text-slate-300">{item.transliteration}</p>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">{item.translation}</p>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] font-mono text-slate-400">
                          Reciter: {item.reciter}
                        </span>
                        <button
                          type="button"
                          onClick={() => handlePlayIslamic(item)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-400 text-slate-950 font-bold text-xs font-mono cursor-pointer active:scale-95 shadow-md"
                        >
                          <Play className="w-3.5 h-3.5 fill-slate-950" />
                          <span>Listen (Arabic)</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AstroAudioHubModal;
