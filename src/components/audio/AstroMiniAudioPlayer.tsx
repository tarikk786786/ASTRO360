import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, X, Volume2, Sparkles, ChevronUp } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const AstroMiniAudioPlayer: React.FC = () => {
  const { activeTrack, playbackState, togglePlay, stop, openFullPlayer, progress } = useAudio();

  if (!activeTrack || playbackState === 'idle') {
    return null;
  }

  const isPlaying = playbackState === 'playing';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', damping: 26, stiffness: 320 }}
        className="fixed bottom-[calc(4.2rem+env(safe-area-inset-bottom,0px))] inset-x-3 sm:inset-x-auto sm:right-6 sm:w-96 z-40 select-none"
      >
        <div
          onClick={openFullPlayer}
          className="relative overflow-hidden rounded-2xl bg-[#090F1E]/95 backdrop-blur-2xl border border-amber-400/30 p-3 shadow-[0_10px_32px_rgba(0,0,0,0.75)] flex items-center justify-between gap-3 cursor-pointer group hover:border-amber-400/60 transition-all"
        >
          {/* Top Progress Line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Left info */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="w-9 h-9 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0 shadow-inner">
              <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-pulse text-amber-400' : ''}`} />
            </div>
            <div className="text-left min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-extrabold text-white truncate font-sans">
                  {activeTrack.title}
                </span>
                {activeTrack.isSynthetic && (
                  <span className="text-[8.5px] font-mono text-amber-300/80 bg-white/5 px-1 rounded">
                    Synthetic
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-400 font-mono truncate">
                {activeTrack.subtitle || activeTrack.domain}
              </p>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
              className="flex items-center justify-center min-w-[40px] min-h-[40px] rounded-xl bg-amber-400 text-slate-950 hover:bg-amber-300 active:scale-90 transition-all cursor-pointer shadow-md"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950 translate-x-0.5" />}
            </button>

            <button
              type="button"
              onClick={stop}
              aria-label="Close mini player"
              className="flex items-center justify-center min-w-[36px] min-h-[36px] rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AstroMiniAudioPlayer;
