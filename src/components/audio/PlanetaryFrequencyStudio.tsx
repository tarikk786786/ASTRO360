import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, Play, Square, Sparkles, Activity, ShieldCheck, Waves, Info } from 'lucide-react';
import { PLANETARY_TONES, planetarySynthesizer, PlanetaryTone } from '../../lib/audio/planetaryFrequencies';

export default function PlanetaryFrequencyStudio() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetaryTone>(PLANETARY_TONES[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.35);

  useEffect(() => {
    return () => {
      planetarySynthesizer.stopTone(0.3);
    };
  }, []);

  const handleTogglePlay = (tone: PlanetaryTone) => {
    if (isPlaying && selectedPlanet.planet === tone.planet) {
      planetarySynthesizer.stopTone(0.6);
      setIsPlaying(false);
    } else {
      setSelectedPlanet(tone);
      planetarySynthesizer.playTone(tone.planet, volume);
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (isPlaying) {
      planetarySynthesizer.playTone(selectedPlanet.planet, newVol);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E1B4B] to-[#0F172A] border border-indigo-500/30 relative overflow-hidden">
        
        
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
            <Waves className="w-3.5 h-3.5" />
            <span>Hans Cousto Cosmic Octave Synthesis</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Planetary Acoustic Resonance & Binaural Brainwave Studio
          </h2>
          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            Real-time synthesized planetary tuning frequencies calculated from astronomical planetary orbital periods. 
            Features stereo binaural beat offsets for alpha/theta brainwave entrainment, meditative alignment, and chakra balancing.
          </p>
        </div>
      </div>

      {/* Active Frequency Display & Audio Controls */}
      <div className="p-6 rounded-3xl bg-[#0B1220] border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-xl shrink-0"
              style={{ backgroundColor: `${selectedPlanet.color}20`, color: selectedPlanet.color, borderColor: `${selectedPlanet.color}40`, borderWidth: '1px' }}
            >
              {selectedPlanet.symbol}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">Current Tuning</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/10 text-white">
                  {selectedPlanet.rulingSign}
                </span>
              </div>
              <h3 className="text-2xl font-black text-white flex items-center gap-3">
                {selectedPlanet.planet}
                <span className="text-base font-mono font-normal text-cyan-400">
                  {selectedPlanet.frequency.toFixed(2)} Hz
                </span>
              </h3>
              <p className="text-xs font-mono text-amber-400">
                + {selectedPlanet.binauralBeat} Hz Binaural Beat ({selectedPlanet.chakra})
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-snug">
            {selectedPlanet.description}
          </p>
        </div>

        {/* Audio Player Controls */}
        <div className="lg:col-span-5 flex flex-col gap-4 p-5 rounded-2xl bg-[#070D18] border border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Live Synthesis Status</span>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
              isPlaying ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse' : 'bg-slate-800 text-slate-400'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400' : 'bg-slate-500'}`} />
              {isPlaying ? 'Acoustic Signal Active' : 'Idle (Ready)'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleTogglePlay(selectedPlanet)}
              className={`flex-1 py-3 px-4 rounded-xl font-bold font-mono text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                isPlaying 
                  ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/25' 
                  : 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-cyan-500/25'
              }`}
            >
              {isPlaying ? (
                <>
                  <Square className="w-4 h-4 fill-white" />
                  <span>Stop Harmonic Tone</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Synthesize {selectedPlanet.planet} ({selectedPlanet.frequency} Hz)</span>
                </>
              )}
            </button>
          </div>

          {/* Volume Control */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1">
                {volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                Output Volume
              </span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Grid of All 8 Planetary Frequencies */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" /> Select Celestial Frequency
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLANETARY_TONES.map((tone) => {
            const isSelected = selectedPlanet.planet === tone.planet;
            const isCurrentlySounding = isPlaying && isSelected;

            return (
              <motion.div
                key={tone.planet}
                whileHover={{ scale: 1.02, y: -2 }}
                onClick={() => handleTogglePlay(tone)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between space-y-4 ${
                  isCurrentlySounding
                    ? 'bg-[#0F1D33] border-cyan-400 shadow-xl shadow-cyan-500/20'
                    : isSelected
                    ? 'bg-[#0B1526] border-white/30'
                    : 'bg-[#090E17] hover:bg-[#0E1726] border-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold shadow-md"
                    style={{ backgroundColor: `${tone.color}20`, color: tone.color }}
                  >
                    {tone.symbol}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-300">
                    {tone.frequency.toFixed(2)} Hz
                  </span>
                </div>

                <div className="space-y-1">
                  <h5 className="text-base font-bold text-white flex items-center justify-between">
                    <span>{tone.planet}</span>
                    <span className="text-[11px] font-normal text-slate-400 font-mono">{tone.rulingSign}</span>
                  </h5>
                  <p className="text-xs text-slate-400 leading-snug line-clamp-2">
                    {tone.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-cyan-400">{tone.chakra.split(' ')[0]}</span>
                  <span className={isCurrentlySounding ? 'text-emerald-400 font-bold flex items-center gap-1' : 'text-slate-500'}>
                    {isCurrentlySounding ? 'Playing 🔊' : 'Tap to Tune'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
