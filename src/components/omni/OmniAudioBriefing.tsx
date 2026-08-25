import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, Sparkles, FastForward, RotateCcw, FileText, ChevronDown, CheckCircle2 } from 'lucide-react';
import type { UserProfile } from '../../types';

interface OmniAudioBriefingProps {
  userProfile: UserProfile;
}

export default function OmniAudioBriefing({ userProfile }: OmniAudioBriefingProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.25 | 1.5>(1);
  const [progress, setProgress] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [narrator, setNarrator] = useState<'Aura (Harmonic)' | 'Orion (Analytical)' | 'Kavya (Classical)'>('Aura (Harmonic)');

  const seekerName = userProfile.name || 'Seeker';

  const briefingText = `Good morning, ${seekerName}. Today, the Moon transits your 10th house of ambition, forming an auspicious trine to natal Jupiter. You may feel a clear surge of strategic clarity around your career and long-term milestones. In your Vimshottari progression, you remain anchored in a supportive Rahu-Jupiter sub-period, favoring calculated initiative over hesitation. Between 2:15 PM and 4:30 PM, communication channels are especially receptive. Stay centered, trust the underlying timing, and lead with quiet confidence.`;

  // Simulated audio playback progression
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1 * playbackSpeed;
        });
      }, 300);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const cycleSpeed = () => {
    if (playbackSpeed === 1) setPlaybackSpeed(1.25);
    else if (playbackSpeed === 1.25) setPlaybackSpeed(1.5);
    else setPlaybackSpeed(1);
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
                AI Voice
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">Personalized for {seekerName} • Generated at Dawn</p>
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
        <div className="h-10 flex items-center justify-center gap-1 bg-black/30 rounded-2xl p-2 border border-white/5 overflow-hidden">
          {Array.from({ length: 36 }).map((_, i) => {
            const height = isPlaying
              ? Math.sin((i + progress / 2) * 0.5) * 14 + 16
              : (i % 3 === 0 ? 8 : i % 2 === 0 ? 14 : 6);
            const isPassed = (i / 36) * 100 <= progress;
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

        {/* Progress Bar & Timestamps */}
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span>0:{Math.floor((progress / 100) * 120).toString().padStart(2, '0')}</span>
          <div className="flex-1 mx-3 bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-amber-400 h-full rounded-full transition-all duration-200 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span>2:00</span>
        </div>

        {/* Primary Controls */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 shadow-lg shadow-amber-500/25 active:scale-95 transition-all cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950" />}
              <span>{isPlaying ? 'Pause Briefing' : 'Play Briefing'}</span>
            </button>

            <button
              onClick={() => setProgress(0)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs transition-colors cursor-pointer"
              title="Restart from beginning"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={cycleSpeed}
              className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-amber-300 border border-white/10 text-[11px] font-mono font-bold transition-colors cursor-pointer"
              title="Toggle Playback Speed"
            >
              {playbackSpeed}x
            </button>
          </div>

          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{showTranscript ? 'Hide Text' : 'Read Transcript'}</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${showTranscript ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Expandable Full Text Transcript */}
      <AnimatePresence>
        {showTranscript && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 pt-3 text-xs text-slate-300 font-sans leading-relaxed space-y-2"
          >
            <p className="bg-black/30 p-3.5 rounded-2xl border border-white/5 italic text-slate-200">
              "{briefingText}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
