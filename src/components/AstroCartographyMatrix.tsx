import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, Compass, Sun, Moon, DollarSign, Heart, Briefcase, MapPin, 
  Sparkles, Zap, ShieldCheck, ArrowRight, Award, Layers, CheckCircle2,
  Navigation, Eye, RefreshCw, Filter
} from 'lucide-react';
import type { UserProfile } from '../types';
import Interactive3DAstroCartographyGlobe, { WORLD_CITIES, type WorldCityPin } from './3d/Interactive3DAstroCartographyGlobe';

export interface PlanetaryCrossingHub {
  id: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  planets: string[];
  planetSymbols: string[];
  crossingName: string;
  category: 'wealth' | 'love' | 'innovation' | 'spiritual' | 'leadership';
  powerRating: number;
  synergyDescription: string;
  historicalPrecedent: string;
  remoteWorkAdvice: string;
  color: string;
  gradient: string;
  borderColor: string;
}

export const PLANETARY_CROSSING_HUBS: PlanetaryCrossingHub[] = [
  {
    id: 'nyc-corridor',
    name: 'New York – Boston Axis',
    region: 'North America',
    lat: 41.2,
    lng: -73.5,
    planets: ['Sun', 'Jupiter'],
    planetSymbols: ['☉', '♃'],
    crossingName: 'Sun Midheaven ✖ Jupiter Ascendant',
    category: 'leadership',
    powerRating: 99,
    synergyDescription: 'The ultimate royal power crossing. Sun elevated on the 10th Zenith intersects Jupiter rising on the 1st horizon, conferring sovereign executive charisma, institutional backing, and extraordinary public authority.',
    historicalPrecedent: 'Birthplace of global corporate empires, top-tier legal dynasties, and dominant media headquarters.',
    remoteWorkAdvice: 'Incorporate entities, pitch venture investors, publish books, and sign multi-million dollar master contracts while tethered to this meridian.',
    color: '#F59E0B',
    gradient: 'from-amber-500/20 via-indigo-950/40 to-[#0A101D]',
    borderColor: 'border-amber-400/40 hover:border-amber-400'
  },
  {
    id: 'dubai-gulf',
    name: 'Dubai – Abu Dhabi Mega-Hub',
    region: 'Middle East',
    lat: 24.8,
    lng: 54.9,
    planets: ['Jupiter', 'Sun'],
    planetSymbols: ['♃', '☉'],
    crossingName: 'Jupiter Midheaven ✖ Sun Descendant',
    category: 'wealth',
    powerRating: 99,
    synergyDescription: 'Unbounded capital expansion and tax-free institutional prosperity. Jupiter on the zenith intersects the Sun on the partnership axis, attracting sovereign wealth funds, ultra-high-net-worth alliances, and exponential scale.',
    historicalPrecedent: 'Rapid transformation into the premier international financial gateway connecting East and West.',
    remoteWorkAdvice: 'Structure wealth trusts, manage hedge funds, launch luxury commercial brands, and conduct global real estate acquisitions.',
    color: '#10B981',
    gradient: 'from-emerald-500/20 via-cyan-950/40 to-[#0A101D]',
    borderColor: 'border-emerald-400/40 hover:border-emerald-400'
  },
  {
    id: 'silicon-valley',
    name: 'San Francisco – Silicon Valley',
    region: 'North America',
    lat: 37.4,
    lng: -122.1,
    planets: ['Uranus', 'Mercury'],
    planetSymbols: ['♅', '☿'],
    crossingName: 'Uranus Midheaven ✖ Mercury Ascendant',
    category: 'innovation',
    powerRating: 98,
    synergyDescription: 'The supreme genius and tech innovation vortex. Uranus electric insight combines with Mercury analytical agility, creating sudden patent breakthroughs, algorithmic mastery, and multi-billion-dollar disruptive startups.',
    historicalPrecedent: 'Cradle of semiconductor revolution, modern Internet architecture, artificial intelligence, and venture capital.',
    remoteWorkAdvice: 'Code core infrastructure, deploy AI foundation models, file patents, and raise seed/series capital from angel syndicates.',
    color: '#38BDF8',
    gradient: 'from-cyan-500/20 via-blue-950/40 to-[#0A101D]',
    borderColor: 'border-cyan-400/40 hover:border-cyan-400'
  },
  {
    id: 'london-paris',
    name: 'London – Paris Cultural Axis',
    region: 'Western Europe',
    lat: 50.1,
    lng: 1.1,
    planets: ['Mercury', 'Venus'],
    planetSymbols: ['☿', '♀'],
    crossingName: 'Mercury Midheaven ✖ Venus Descendant',
    category: 'love',
    powerRating: 97,
    synergyDescription: 'The epicenter of global diplomacy, high fashion, intellectual elegance, and magnetic romantic alliances. Harmonizes commercial intellect with refined aesthetic taste.',
    historicalPrecedent: 'Centuries of treaty negotiations, legendary haute couture houses, literary salons, and master fine arts.',
    remoteWorkAdvice: 'Conduct international client negotiations, launch design studios, host cultural symposiums, and form lifelong romantic soulmate bonds.',
    color: '#EC4899',
    gradient: 'from-pink-500/20 via-purple-950/40 to-[#0A101D]',
    borderColor: 'border-pink-400/40 hover:border-pink-400'
  },
  {
    id: 'singapore-gateway',
    name: 'Singapore – Malacca Strait',
    region: 'Southeast Asia',
    lat: 1.4,
    lng: 103.8,
    planets: ['Jupiter', 'Mercury'],
    planetSymbols: ['♃', '☿'],
    crossingName: 'Jupiter Ascendant ✖ Mercury Midheaven',
    category: 'wealth',
    powerRating: 97,
    synergyDescription: 'Pristine legal governance, hyper-efficient trade liquidity, and unshakeable commercial reputation. Bestows effortless executive charm and elite status across Asia-Pacific.',
    historicalPrecedent: 'World-class maritime trade crossroads, ultra-stable sovereign currency, and tech-driven financial hub.',
    remoteWorkAdvice: 'Establish APAC regional headquarters, automate cross-border treasury operations, and conduct international dispute resolution.',
    color: '#FBBF24',
    gradient: 'from-amber-500/20 via-yellow-950/40 to-[#0A101D]',
    borderColor: 'border-yellow-400/40 hover:border-yellow-400'
  },
  {
    id: 'bali-ubud',
    name: 'Bali – Ubud Sacred Vortex',
    region: 'Southeast Asia',
    lat: -8.5,
    lng: 115.3,
    planets: ['Neptune', 'Ketu'],
    planetSymbols: ['♆', '☿'],
    crossingName: 'Neptune IC ✖ Ketu Ascendant',
    category: 'spiritual',
    powerRating: 98,
    synergyDescription: 'World-renowned somatic vortex for profound nervous system rejuvenation, spiritual kundalini awakening, visionary writing, and karmic release.',
    historicalPrecedent: 'Ancient volcanic temple axis, traditional holistic healing sanctuaries, and retreat haven for world creators.',
    remoteWorkAdvice: 'Write introspective manuscripts, conduct silent meditation immersions, compose transcendental music, and heal burnout.',
    color: '#A7F3D0',
    gradient: 'from-emerald-500/20 via-teal-950/40 to-[#0A101D]',
    borderColor: 'border-teal-400/40 hover:border-teal-400'
  },
  {
    id: 'tokyo-kyoto',
    name: 'Tokyo – Kyoto Geodesic Line',
    region: 'East Asia',
    lat: 35.2,
    lng: 137.8,
    planets: ['Venus', 'Uranus'],
    planetSymbols: ['♀', '♅'],
    crossingName: 'Venus Ascendant ✖ Uranus Midheaven',
    category: 'innovation',
    powerRating: 96,
    synergyDescription: 'Aesthetic perfectionism merged with cutting-edge robotics, gaming, and visual futurism. Elevates individual craft to global iconic status.',
    historicalPrecedent: 'Centuries of imperial craftsmanship transitioned into global technological, culinary, and design leadership.',
    remoteWorkAdvice: 'Design high-end digital interfaces, engineer hardware prototypes, cultivate disciplined artistic output, and build brand loyalty.',
    color: '#818CF8',
    gradient: 'from-indigo-500/20 via-violet-950/40 to-[#0A101D]',
    borderColor: 'border-indigo-400/40 hover:border-indigo-400'
  },
  {
    id: 'zurich-geneva',
    name: 'Zurich – Geneva Sanctuary',
    region: 'Central Europe',
    lat: 46.8,
    lng: 7.5,
    planets: ['Saturn', 'Jupiter'],
    planetSymbols: ['♄', '♃'],
    crossingName: 'Saturn Midheaven ✖ Jupiter IC',
    category: 'wealth',
    powerRating: 95,
    synergyDescription: 'Multi-generational dynasty wealth preservation and fortified security. Saturn anchors rigorous discipline while Jupiter protects ancestral assets.',
    historicalPrecedent: 'Neutral haven for centuries of private wealth banking, international diplomacy (UN), and precision watchmaking.',
    remoteWorkAdvice: 'Secure family office assets, negotiate sovereign peace pacts, structure long-term endowments, and build enduring legacy systems.',
    color: '#8B5CF6',
    gradient: 'from-purple-500/20 via-slate-950/40 to-[#0A101D]',
    borderColor: 'border-purple-400/40 hover:border-purple-400'
  }
];

export default function AstroCartographyMatrix({ userProfile }: { userProfile: UserProfile }) {
  const [selectedCity, setSelectedCity] = useState<WorldCityPin>(WORLD_CITIES[0]);
  const [activeTab, setActiveTab] = useState<'hubs' | 'cities'>('hubs');
  const [selectedHubCategory, setSelectedHubCategory] = useState<string>('all');
  const [selectedHub, setSelectedHub] = useState<PlanetaryCrossingHub>(PLANETARY_CROSSING_HUBS[0]);

  const filteredHubs = useMemo(() => {
    if (selectedHubCategory === 'all') return PLANETARY_CROSSING_HUBS;
    return PLANETARY_CROSSING_HUBS.filter(h => h.category === selectedHubCategory);
  }, [selectedHubCategory]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 text-left pb-16">
      {/* 3D Interactive AstroCartography Globe */}
      <Interactive3DAstroCartographyGlobe
        userProfile={userProfile}
        onSelectCity={(city) => setSelectedCity(city)}
      />

      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg sm:text-xl font-black text-white font-sans tracking-tight">
            Worldwide Planetary Crossing Hubs & Power Meridians
          </h2>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10">
          <button
            onClick={() => setActiveTab('hubs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'hubs'
                ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ⚡ Planetary Parans (Crossings)
          </button>
          <button
            onClick={() => setActiveTab('cities')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'cities'
                ? 'bg-cyan-400 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🌐 12 Global Cities
          </button>
        </div>
      </div>

      {activeTab === 'hubs' ? (
        <div className="space-y-5">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-mono">
            {[
              { id: 'all', label: 'All Crossing Hubs' },
              { id: 'leadership', label: '👑 Sovereign Leadership' },
              { id: 'wealth', label: '💰 Dynasty Wealth & Scale' },
              { id: 'innovation', label: '⚡ Quantum Innovation & Tech' },
              { id: 'love', label: '💖 Love & Social Harmony' },
              { id: 'spiritual', label: '🧘 Spiritual Healing Sanctuary' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedHubCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap font-bold transition-all cursor-pointer ${
                  selectedHubCategory === cat.id
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/25 font-black'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Crossing Hubs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredHubs.map((hub) => {
              const isSelected = selectedHub.id === hub.id;
              return (
                <motion.div
                  key={hub.id}
                  onClick={() => setSelectedHub(hub)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-5 rounded-2xl bg-gradient-to-b ${hub.gradient} border ${hub.borderColor} transition-all cursor-pointer space-y-3 relative overflow-hidden shadow-xl ${
                    isSelected ? 'ring-2 ring-amber-400 shadow-amber-400/20' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white font-sans flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-amber-400" /> {hub.name}
                    </span>
                    <div className="flex items-center gap-1">
                      {hub.planetSymbols.map((sym, idx) => (
                        <span 
                          key={idx}
                          className="w-6 h-6 rounded-lg bg-black/60 border border-white/20 text-amber-300 text-xs font-mono font-bold flex items-center justify-center"
                        >
                          {sym}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono font-bold text-cyan-300 block">
                      {hub.crossingName}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">
                      {hub.powerRating}% Cosmic Amplification
                    </span>
                  </div>

                  <p className="text-xs text-slate-200 font-sans leading-relaxed line-clamp-3">
                    {hub.synergyDescription}
                  </p>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-300">
                    <span className="text-slate-400">{hub.region}</span>
                    <span className="text-amber-300 flex items-center gap-1 font-bold">
                      <span>Inspect Synergy</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Selected Crossing Hub Full Dossier */}
          {selectedHub && (
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#0E1729] via-[#09101E] to-[#060A14] border border-amber-400/40 shadow-2xl space-y-4 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg"
                    style={{ background: selectedHub.color, color: '#090D16' }}
                  >
                    {selectedHub.planetSymbols.join('')}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-white font-sans flex items-center gap-2">
                      {selectedHub.name} ({selectedHub.region})
                    </h3>
                    <p className="text-xs font-mono text-cyan-300 font-bold">
                      Planetary Parans: {selectedHub.crossingName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-400/15 text-emerald-300 border border-emerald-400/30 text-xs font-mono font-bold">
                    {selectedHub.powerRating}% Maximum Power Rating
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-1.5">
                  <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Planetary Energy Synergy:
                  </span>
                  <p className="text-slate-100 leading-relaxed">
                    {selectedHub.synergyDescription}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-1.5">
                  <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" /> Historical Manifestation:
                  </span>
                  <p className="text-slate-100 leading-relaxed">
                    {selectedHub.historicalPrecedent}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-1.5">
                  <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" /> Relocation & Remote Action:
                  </span>
                  <p className="text-slate-100 leading-relaxed">
                    {selectedHub.remoteWorkAdvice}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* 12 Worldwide Primary City Grid */
        <div className="p-6 rounded-3xl bg-[#0C1220] border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h3 className="text-base font-bold text-white font-sans">
                12 Primary Worldwide City Meridians
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">Zenith & Horizon Lines</span>
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
      )}
    </div>
  );
}
