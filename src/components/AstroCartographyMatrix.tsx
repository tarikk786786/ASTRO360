import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, Compass, Sun, Moon, DollarSign, Heart, Briefcase, MapPin, Sparkles } from 'lucide-react';
import type { UserProfile } from '../types';
import Interactive3DAstroCartographyGlobe, { WORLD_CITIES, type WorldCityPin } from './3d/Interactive3DAstroCartographyGlobe';

export default function AstroCartographyMatrix({ userProfile }: { userProfile: UserProfile }) {
  const [selectedCity, setSelectedCity] = useState<WorldCityPin>(WORLD_CITIES[0]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 text-left pb-16">
      {/* 3D Interactive AstroCartography Globe */}
      <Interactive3DAstroCartographyGlobe
        userProfile={userProfile}
        onSelectCity={(city) => setSelectedCity(city)}
      />

      {/* Worldwide Geographic Power Grid */}
      <div className="p-6 rounded-3xl bg-[#0C1220] border border-white/10 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-bold text-white font-sans">
              Worldwide Planetary Crossing Hubs
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">12 Primary Global Meridians</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {WORLD_CITIES.map((city) => {
            const isSelected = selectedCity.name === city.name;
            return (
              <motion.div
                key={city.name}
                onClick={() => setSelectedCity(city)}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 text-left ${
                  isSelected
                    ? 'bg-cyan-500/15 border-cyan-400 shadow-lg shadow-cyan-500/20'
                    : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/8'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white font-sans flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" /> {city.name}, {city.country}
                  </span>
                  <span 
                    className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shadow-md"
                    style={{ background: city.color, color: '#090D16' }}
                  >
                    {city.planetSymbol}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                  <span>{city.dominantPlanet}</span>
                  <span className="font-bold text-emerald-400">{city.powerScore}% Power</span>
                </div>

                <p className="text-[11.5px] text-slate-300 font-sans leading-snug line-clamp-2">
                  {city.recommendation}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
