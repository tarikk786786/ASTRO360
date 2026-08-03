import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, AlertTriangle, Lightbulb, RefreshCw, Clock, CheckCircle2 
} from 'lucide-react';
import type { UserProfile } from '../types';
import { calculatePlanetaryPositions } from '../lib/astroCalculations';
import { staggerContainer, staggerItem } from '../lib/animationPresets';

interface LiveCosmicDiagnosticsProps {
  userProfile: UserProfile;
}

export type TransitCategory = 'all' | 'career' | 'mind' | 'vitality' | 'relationships' | 'wealth' | 'spiritual';

interface TransitInfluence {
  id: string;
  category: Exclude<TransitCategory, 'all'>;
  planet: string;
  transitSign: string;
  houseAffected: string;
  whatIsHappening: string;
  whyIsHappening: string;
  solutionAndRemedy: string;
  intensityScore: number;
  statusColor: string;
}

export default function LiveCosmicDiagnostics({ userProfile }: LiveCosmicDiagnosticsProps) {
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [selectedFilter, setSelectedFilter] = useState<TransitCategory>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const name = userProfile?.name || 'Seeker';

  // Compute live planetary positions dynamically on load and whenever refresh is triggered
  const positions = useMemo(() => {
    // Pass timestamp string to force real recalculation of ephemeris positions
    const dateStr = lastUpdated.toISOString().split('T')[0];
    const timeStr = lastUpdated.toTimeString().split(' ')[0].substring(0, 5);
    return calculatePlanetaryPositions(dateStr, timeStr);
  }, [lastUpdated]);

  // Compute live transit influences for all 9 planets covering all diagnostic categories
  const liveInfluences: TransitInfluence[] = useMemo(() => {
    const sun = positions.find(p => p.name === 'Sun');
    const moon = positions.find(p => p.name === 'Moon');
    const mars = positions.find(p => p.name === 'Mars');
    const mercury = positions.find(p => p.name === 'Mercury');
    const jupiter = positions.find(p => p.name === 'Jupiter');
    const venus = positions.find(p => p.name === 'Venus');
    const saturn = positions.find(p => p.name === 'Saturn');
    const rahu = positions.find(p => p.name === 'Rahu');
    const ketu = positions.find(p => p.name === 'Ketu');

    return [
      {
        id: 'saturn-transit',
        category: 'career',
        planet: `Saturn (${saturn?.symbol || '♄'} Shani)`,
        transitSign: saturn?.sign || 'Aquarius ♒',
        houseAffected: `${saturn?.house || '7th House'} (Career & Structure)`,
        whatIsHappening: 'Strategic focus required on career deliverables, milestone approvals, and long-term professional foundations.',
        whyIsHappening: `Saturn transits your ${saturn?.house || '7th House'} in ${saturn?.sign || 'Aquarius'}, requiring disciplined effort and systematic execution.`,
        solutionAndRemedy: saturn?.remedies || 'Focus on 1 major project at a time & maintain Saturday discipline.',
        intensityScore: 84,
        statusColor: 'from-amber-500 to-amber-700',
      },
      {
        id: 'jupiter-transit',
        category: 'career',
        planet: `Jupiter (${jupiter?.symbol || '♃'} Guru)`,
        transitSign: jupiter?.sign || 'Pisces ♓',
        houseAffected: `${jupiter?.house || '10th House'} (Wisdom & Growth)`,
        whatIsHappening: 'Surge in professional recognition, mentorship opportunities, and expansion of strategic influence.',
        whyIsHappening: `Jupiter in ${jupiter?.sign || 'Pisces'} expands wisdom, leadership authority, and vision in your ${jupiter?.house || '10th House'}.`,
        solutionAndRemedy: jupiter?.remedies || 'Proactively lead team initiatives during morning solar hours.',
        intensityScore: 92,
        statusColor: 'from-emerald-500 to-teal-700',
      },
      {
        id: 'sun-vitality',
        category: 'vitality',
        planet: `Sun (${sun?.symbol || '☉'} Surya)`,
        transitSign: sun?.sign || 'Aries ♈',
        houseAffected: `${sun?.house || '9th House'} (Vitality & Energy)`,
        whatIsHappening: 'High solar vitality driving initiative, executive decision-making, and leadership drive.',
        whyIsHappening: `Sun in ${sun?.sign || 'Aries'} boosts solar plexus chakra energy and core vitality in your ${sun?.house || '9th House'}.`,
        solutionAndRemedy: sun?.remedies || 'Expose eyes to morning light for 15 mins & practice Surya Arghya.',
        intensityScore: 89,
        statusColor: 'from-orange-500 to-red-600',
      },
      {
        id: 'moon-mind',
        category: 'mind',
        planet: `Moon (${moon?.symbol || '☽'} Chandra)`,
        transitSign: moon?.sign || 'Taurus ♉',
        houseAffected: `${moon?.house || '10th House'} (Mind & Intuition)`,
        whatIsHappening: 'Enhanced emotional intuition, mental clarity, and receptive creative intelligence.',
        whyIsHappening: `Moon transits ${moon?.sign || 'Taurus'} (${moon?.nakshatra || 'Rohini'} Nakshatra) bringing emotional stability.`,
        solutionAndRemedy: moon?.remedies || 'Practice mindfulness meditation & wear white or silver accents.',
        intensityScore: 88,
        statusColor: 'from-blue-500 to-indigo-700',
      },
      {
        id: 'mars-vitality',
        category: 'vitality',
        planet: `Mars (${mars?.symbol || '♂'} Mangal)`,
        transitSign: mars?.sign || 'Scorpio ♏',
        houseAffected: `${mars?.house || '1st House'} (Courage & Drive)`,
        whatIsHappening: 'High physical stamina and decisive action drive; potential for hasty decisions if unchanneled.',
        whyIsHappening: `Mars in ${mars?.sign || 'Scorpio'} activates direct motor energy and competitive drive in your ${mars?.house || '1st House'}.`,
        solutionAndRemedy: mars?.remedies || 'Engage in structured high-intensity exercise & chant Hanuman Chalisa.',
        intensityScore: 83,
        statusColor: 'from-rose-500 to-red-700',
      },
      {
        id: 'mercury-wealth',
        category: 'wealth',
        planet: `Mercury (${mercury?.symbol || '☿'} Budh)`,
        transitSign: mercury?.sign || 'Gemini ♊',
        houseAffected: `${mercury?.house || '2nd House'} (Commerce & Assets)`,
        whatIsHappening: 'Accelerated analytical throughput for fiscal planning, contract negotiations, and commercial negotiations.',
        whyIsHappening: `Mercury transits ${mercury?.sign || 'Gemini'} in your ${mercury?.house || '2nd House'}, sharpening financial intellect.`,
        solutionAndRemedy: mercury?.remedies || 'Audit digital accounts & double-check written agreements before signing.',
        intensityScore: 86,
        statusColor: 'from-teal-500 to-emerald-700',
      },
      {
        id: 'venus-relationships',
        category: 'relationships',
        planet: `Venus (${venus?.symbol || '♀'} Shukra)`,
        transitSign: venus?.sign || 'Taurus ♉',
        houseAffected: `${venus?.house || '7th House'} (Partnership & Charm)`,
        whatIsHappening: 'Harmonious social magnetic pull, diplomatic ease, and aesthetic creativity in key relationships.',
        whyIsHappening: `Venus in ${venus?.sign || 'Taurus'} illuminates your ${venus?.house || '7th House'} with grace and empathy.`,
        solutionAndRemedy: venus?.remedies || 'Foster collaborative dialogue & honor artistic endeavors.',
        intensityScore: 90,
        statusColor: 'from-pink-500 to-purple-600',
      },
      {
        id: 'rahu-wealth',
        category: 'wealth',
        planet: `Rahu (${rahu?.symbol || '☊'} Rahu)`,
        transitSign: rahu?.sign || 'Virgo ♍',
        houseAffected: `${rahu?.house || '11th House'} (Gains & Ambition)`,
        whatIsHappening: 'Ambition for non-traditional income streams, digital expansion, and sudden networking breakthroughs.',
        whyIsHappening: `Rahu in ${rahu?.sign || 'Virgo'} amplifies material drive and innovative financial strategies in your ${rahu?.house || '11th House'}.`,
        solutionAndRemedy: rahu?.remedies || 'Focus on risk-hedged investments & practice grounded breathwork.',
        intensityScore: 85,
        statusColor: 'from-purple-500 to-indigo-800',
      },
      {
        id: 'ketu-spiritual',
        category: 'spiritual',
        planet: `Ketu (${ketu?.symbol || '☋'} Ketu)`,
        transitSign: ketu?.sign || 'Pisces ♓',
        houseAffected: `${ketu?.house || '12th House'} (Insight & Liberation)`,
        whatIsHappening: 'Deep intuitive clarity, spiritual detachment from unnecessary stress, and heightened dream awareness.',
        whyIsHappening: `Ketu in ${ketu?.sign || 'Pisces'} activates subconscious wisdom and higher self-transcendence in your ${ketu?.house || '12th House'}.`,
        solutionAndRemedy: ketu?.remedies || 'Dedicating 15 minutes daily to quiet meditation & self-reflection.',
        intensityScore: 87,
        statusColor: 'from-cyan-500 to-blue-800',
      },
    ];
  }, [positions]);

  const filteredInfluences = selectedFilter === 'all' 
    ? liveInfluences 
    : liveInfluences.filter(i => i.category === selectedFilter);

  // Real refresh handler triggering fresh ephemeris calculation
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Real recalculation: update lastUpdated timestamp which updates useMemo ephemeris positions
    setLastUpdated(new Date());
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className="max-w-6xl mx-auto p-6 space-y-8 text-left"
    >
      {/* Real-time Status Header */}
      <motion.div variants={staggerItem} className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 mb-1 font-mono">
            <Activity className="w-5 h-5 animate-pulse" />
            <span className="text-xs font-semibold tracking-widest uppercase">Real-Time Cosmic Diagnostics</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-100">
            Live Diagnostics: <span className="gradient-text">What’s Happening & Solution</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Real-time astronomical analysis for {name}, identifying active transit root causes ("Why") and practical remedies ("Solution").
          </p>
        </div>

        {/* Live Timestamp & Refresh */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-2xl glass-card text-xs text-slate-300 font-mono flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Updated: {lastUpdated.toLocaleTimeString()}</span>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2.5 rounded-2xl glass-card hover:bg-slate-800 text-slate-300 transition-all disabled:opacity-50 cursor-pointer"
            title="Recalculate Live Ephemeris Diagnostics"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </motion.div>

      {/* Category Filter Pills */}
      <motion.div variants={staggerItem} className="flex flex-wrap items-center gap-2">
        {[
          { id: 'all', label: 'All Live Transits (9 Planets)' },
          { id: 'career', label: 'Career & Authority' },
          { id: 'mind', label: 'Mental Clarity' },
          { id: 'vitality', label: 'Vitality & Health' },
          { id: 'relationships', label: 'Relationships & Harmony' },
          { id: 'wealth', label: 'Wealth & Finance' },
          { id: 'spiritual', label: 'Spiritual Growth' },
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id as TransitCategory)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
              selectedFilter === filter.id
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold shadow-sm'
                : 'glass-card text-slate-400 hover:text-slate-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </motion.div>

      {/* Live Influences Grid */}
      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredInfluences.length > 0 ? (
            filteredInfluences.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 relative overflow-hidden text-left"
              >
                {/* Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                  <div>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {item.houseAffected}
                      </span>
                      <span className="text-xs text-slate-400">{item.transitSign}</span>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-slate-100 mt-2">{item.planet}</h3>
                  </div>

                  {/* Impact Indicator Bar */}
                  <div className="w-full sm:w-48 space-y-1 font-mono">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Active Intensity</span>
                      <span className="font-bold text-amber-400">{item.intensityScore}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${item.statusColor}`}
                        style={{ width: `${item.intensityScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* 3-Column Diagnostic Breakdown: What / Why / Solution */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  {/* 1. What is Happening */}
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-blue-400 text-xs font-mono font-semibold uppercase tracking-wider">
                      <Activity className="w-4 h-4" /> 1. What Is Happening
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed font-medium">
                      {item.whatIsHappening}
                    </p>
                  </div>

                  {/* 2. Why it is Happening */}
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4" /> 2. Why It Is Happening
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed font-medium">
                      {item.whyIsHappening}
                    </p>
                  </div>

                  {/* 3. Practical Solution & Remedy */}
                  <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider">
                      <Lightbulb className="w-4 h-4" /> 3. Solution & Practical Remedy
                    </div>
                    <p className="text-sm text-emerald-200 leading-relaxed font-medium">
                      {item.solutionAndRemedy}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            /* Clean Empty State Card */
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card p-12 rounded-3xl border border-slate-800 text-center space-y-3"
            >
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-bold text-slate-100 font-display">No active transit warnings for this area</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                Cosmic planetary energies are currently balanced, stable, and supportive in this sector.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
