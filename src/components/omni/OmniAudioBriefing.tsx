import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, Sparkles, FastForward, RotateCcw, FileText, ChevronDown, CheckCircle2 } from 'lucide-react';
import type { UserProfile } from '../../types';
import { useAudio } from '../../context/AudioContext';

interface OmniAudioBriefingProps {
  userProfile: UserProfile;
}

export default function OmniAudioBriefing({ userProfile }: OmniAudioBriefingProps) {
  const { playTrack, openFullPlayer, activeTrack, playbackState, togglePlay, speed, setSpeed, progress } = useAudio();
  const [showTranscript, setShowTranscript] = useState(false);
  const [narrator, setNarrator] = useState<'Aura (Harmonic)' | 'Orion (Analytical)' | 'Kavya (Classical)'>('Aura (Harmonic)');

  const seekerName = userProfile.name || 'Seeker';

  const briefingText = `Good morning, ${seekerName}. Today, the Moon transits your 10th house of ambition, forming an auspicious trine to natal Jupiter. You may feel a clear surge of strategic clarity around your career and long-term milestones. In your Vimshottari progression, you remain anchored in a supportive Rahu-Jupiter sub-period, favoring calculated initiative over hesitation. Between 2:15 PM and 4:30 PM, communication channels are especially receptive. Stay centered, trust the underlying timing, and lead with quiet confidence.`;

  const isThisTrackActive = activeTrack?.id === 'daily-briefing';
  const isPlaying = isThisTrackActive && playbackState === 'playing';

  const handleTogglePlay = () => {
    if (isThisTrackActive) {
      togglePlay();
    } else {
      const voiceId = narrator.includes('Aura') ? 'CALM_GUIDE' : narrator.includes('Orion') ? 'TECHNICAL' : 'EDITORIAL';
      playTrack({
        id: 'daily-briefing',
        title: 'Daily 2-Minute Cosmic Audio Briefing',
        subtitle: `Personalized for ${seekerName}`,
        domain: 'ASTROLOGY',
        language: 'en',
        voiceProfileId: voiceId,
        text: briefingText,
        isSynthetic: true,
        provenance: 'ASTRO360 Ephemeris Speech Synthesizer',
        disclaimer: 'Astrological interpretations are reflective perspectives on astronomical timing, not deterministic guarantees.',
      });
    }
  };

  const cycleSpeed = () => {
    if (speed === 1) setSpeed(1.25);
    else if (speed === 1.25) setSpeed(1.5);
    else setSpeed(1);
  };

  return (
    <div className="rounded-3xl bg-gradient-to-br from-[#0B1220] via-[#0E172A] to-[#080E1A] border border-amber-500/30 p-5 sm:p-6 shadow-xl relative overflow-hidden text-left font-sans">
      {/* Background ambient glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-inner">
            <Volume2 className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-white tracking-tight">Daily 2-Minute Cosmic Audio Briefing</h3>
              <span className="text-[9px] font-mono font-bold bg-amber-400/10 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">
                Synthetic Voice
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">Personalized for {seekerName} • Ephemeris Synchronized</p>
          </div>
        </div>

        {/* Narrator selector */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-black/40 p-1 rounded-xl border border-white/10 text-[11px] font-mono">
          <span className="text-slate-400 px-1.5">Voice:</span>
          {(['Aura (Harmonic)', 'Orion (Analytical)', 'Kavya (Classical)'] as const).map((voice) => (
            <button
              key={voice}
              onClick={() => setNarrator(voice)}
              className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                narrator === voice ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {voice.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Waveform Player Controls */}
      <div className="py-4 space-y-3">
        {/* Animated Waveform Visualizer */}
        <div 
          onClick={openFullPlayer}
          className="h-10 flex items-center justify-center gap-1 bg-black/30 rounded-2xl p-2 border border-white/5 overflow-hidden cursor-pointer hover:border-amber-400/30 transition-all"
        >
          {Array.from({ length: 36 }).map((_, i) => {
            const height = isPlaying
              ? Math.sin((i + progress / 2) * 0.5) * 14 + 16
              : (i % 3 === 0 ? 8 : i % 2 === 0 ? 14 : 6);
            const isPassed = isThisTrackActive ? (i / 36) * 100 <= progress : false;
            return (
              <motion.div
                key={i}
                className={`w-1 rounded-full transition-all duration-150 ${
                  isPassed ? 'bg-gradient-to-t from-amber-500 to-amber-300' : 'bg-slate-700/60'
                }`}
                style={{ height: `${height}px` }}
              />
            );
          })}
        </div>

        {/* Playback action bar */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleTogglePlay}
              aria-label={isPlaying ? 'Pause audio briefing' : 'Play audio briefing'}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-300 hover:from-amber-400 hover:to-amber-200 text-slate-950 font-bold text-xs font-mono shadow-lg shadow-amber-400/25 active:scale-95 transition-all cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950 translate-x-0.5" />}
              <span>{isPlaying ? 'Pause Briefing' : 'Listen to Briefing (2m)'}</span>
            </button>

            <button
              type="button"
              onClick={cycleSpeed}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-mono font-bold transition-colors cursor-pointer"
            >
              {speed}x
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowTranscript(!showTranscript)}
              className="flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-white cursor-pointer px-2 py-1 rounded-lg hover:bg-white/5"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Transcript</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${showTranscript ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Transcript Panel */}
      <AnimatePresence>
        {showTranscript && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 pt-3 mt-2"
          >
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 text-xs text-slate-300 leading-relaxed font-sans space-y-2">
              <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-wider block">
                Synchronized Briefing Transcript:
              </span>
              <p>{briefingText}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
