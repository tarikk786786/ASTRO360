import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Repeat, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  Layers, 
  Clock, 
  Check,
  Plus
} from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const AstroAudioPlayer: React.FC = () => {
  const { 
    activeTrack, 
    playbackState, 
    currentTime, 
    duration, 
    progress, 
    speed, 
    isLooping, 
    isMuted,
    isFullPlayerOpen, 
    activeSubtitle,
    togglePlay, 
    seek, 
    skipForward, 
    skipBackward, 
    setSpeed, 
    toggleLoop, 
    incrementCount, 
    resetCount, 
    closeFullPlayer,
    toggleMute
  } = useAudio();

  if (!activeTrack || !isFullPlayerOpen) return null;

  const isPlaying = playbackState === 'playing';
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const SPEED_OPTIONS = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeFullPlayer}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal Player Drawer */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="audio-player-title"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full max-w-xl bg-[#070C16] border-t sm:border border-white/15 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col z-10 max-h-[90vh] overflow-hidden"
          style={{
            paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))',
          }}
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between gap-3 bg-[#0B1220]/90">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-2 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 shrink-0">
                <Volume2 className="w-5 h-5" />
              </div>
              <div className="text-left min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-400/15 px-2 py-0.2 rounded-full font-bold uppercase">
                    {activeTrack.domain}
                  </span>
                  {activeTrack.isSynthetic && (
                    <span className="text-[9px] font-mono text-slate-400 bg-white/5 px-1.5 py-0.2 rounded">
                      Synthetic Voice
                    </span>
                  )}
                </div>
                <h2 id="audio-player-title" className="text-base sm:text-lg font-extrabold text-white truncate font-sans">
                  {activeTrack.title}
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={closeFullPlayer}
              aria-label="Close audio player"
              className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Player Scrollable Content */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-left">
            {/* Live Synchronized Subtitle / Transcript Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0D1526] border border-white/10 space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-white/5 pb-2">
                <span className="flex items-center gap-1 text-amber-300 font-bold">
                  <BookOpen className="w-3.5 h-3.5" /> Synchronized Text
                </span>
                <span>Language: {activeTrack.language.toUpperCase()}</span>
              </div>

              <div 
                className={`text-sm sm:text-base font-medium text-slate-100 leading-relaxed min-h-[60px] ${
                  activeTrack.isRtl ? 'text-right font-arabic' : 'text-left font-sans'
                }`}
                dir={activeTrack.isRtl ? 'rtl' : 'ltr'}
              >
                {activeSubtitle || activeTrack.text || 'Audio playback in progress...'}
              </div>
            </div>

            {/* Repetition / Japa Counter (For Mantra / Dhikr Modes) */}
            {(activeTrack.targetCount && activeTrack.targetCount > 1) ? (
              <div className="p-3.5 rounded-2xl bg-[#0D1526] border border-amber-400/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                    Traditional Repetition Tally
                  </span>
                  <span className="text-sm font-bold font-mono text-white">
                    Count: <span className="text-amber-400 text-base">{activeTrack.currentCount || 1}</span> / {activeTrack.targetCount}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={incrementCount}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs font-mono cursor-pointer active:scale-95 shadow-md"
                  >
                    <Plus className="w-3.5 h-3.5" /> <span>Tally +1</span>
                  </button>
                  <button
                    type="button"
                    onClick={resetCount}
                    className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 text-xs font-mono cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </div>
            ) : null}

            {/* Seek Slider & Time Stamps */}
            <div className="space-y-2">
              <div className="relative w-full flex items-center">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={(e) => seek(Number(e.target.value))}
                  aria-label="Audio progress slider"
                  className="w-full h-2 rounded-lg bg-slate-800 accent-amber-400 cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Main Center Control Buttons (All >= 48px touch targets) */}
            <div className="flex items-center justify-center gap-3 sm:gap-6 py-2">
              {/* Skip 10s Backward */}
              <button
                type="button"
                onClick={() => skipBackward(10)}
                aria-label="Rewind 10 seconds"
                className="flex items-center justify-center min-w-[48px] min-h-[48px] rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer active:scale-90"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              {/* Main Play / Pause Button */}
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="flex items-center justify-center min-w-[64px] min-h-[64px] rounded-3xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 shadow-xl shadow-amber-400/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-slate-950" />
                ) : (
                  <Play className="w-7 h-7 fill-slate-950 translate-x-0.5" />
                )}
              </button>

              {/* Skip 10s Forward */}
              <button
                type="button"
                onClick={() => skipForward(10)}
                aria-label="Forward 10 seconds"
                className="flex items-center justify-center min-w-[48px] min-h-[48px] rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer active:scale-90"
              >
                <RotateCw className="w-5 h-5" />
              </button>
            </div>

            {/* Secondary Controls Bar: Speed, Loop, Mute */}
            <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[#090F1C] border border-white/10 text-xs font-mono">
              {/* Speed Selector */}
              <div className="flex items-center gap-1">
                <span className="text-slate-400 text-[11px] pr-1">Speed:</span>
                {SPEED_OPTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSpeed(s)}
                    className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                      speed === s ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>

              {/* Loop & Mute */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={toggleLoop}
                  aria-label={isLooping ? 'Disable loop' : 'Enable loop'}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    isLooping ? 'bg-amber-400/15 border-amber-400/40 text-amber-300' : 'border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <Repeat className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  className="p-2 rounded-xl border border-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Scripture Source Citation & Disclaimer */}
            <div className="space-y-1.5 pt-1">
              {activeTrack.traditionSource && (
                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Source: {activeTrack.traditionSource}</span>
                </div>
              )}
              {activeTrack.disclaimer && (
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans border-t border-white/5 pt-2">
                  {activeTrack.disclaimer}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AstroAudioPlayer;
