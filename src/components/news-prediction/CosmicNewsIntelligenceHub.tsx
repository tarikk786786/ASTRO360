import React, { useState, useMemo, useEffect } from 'react';
import { 
  Globe2, Zap, Shield, TrendingUp, Cpu, Radio, Sparkles, 
  Search, Filter, ExternalLink, RefreshCw, Activity, Compass, 
  Layers, CheckCircle2, AlertTriangle, Clock, ArrowRight, 
  BarChart3, Settings, Database, BookOpen, Sun, Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  NewsPredictionState, 
  NewsCategory, 
  PlanetaryRuler, 
  MacroNewsItem, 
  MundaneForecast, 
  FreeNewsProvider 
} from '../../lib/news-prediction/types';
import { 
  getInitialNewsPredictionState, 
  filterMacroNewsItems, 
  getPersonalizedNewsSyntheses,
  fetchLiveSpaceWeather,
  saveNewsProviders 
} from '../../lib/news-prediction/newsPredictionCore';
import { UserProfile } from '../../types';

interface CosmicNewsIntelligenceHubProps {
  userProfile?: UserProfile;
  onNavigate?: (tab: string) => void;
}

export default function CosmicNewsIntelligenceHub({
  userProfile,
  onNavigate
}: CosmicNewsIntelligenceHubProps) {
  const [state, setState] = useState<NewsPredictionState>(() => getInitialNewsPredictionState());
  const [activeTab, setActiveTab] = useState<'news' | 'mundane' | 'personal' | 'space_seismic' | 'providers'>('news');
  const [selectedNews, setSelectedNews] = useState<MacroNewsItem | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Refresh live space weather on mount
  useEffect(() => {
    fetchLiveSpaceWeather().then(weather => {
      setState(prev => ({ ...prev, spaceWeather: weather }));
    });
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const weather = await fetchLiveSpaceWeather();
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        spaceWeather: weather,
        lastRefreshed: new Date().toISOString()
      }));
      setIsRefreshing(false);
    }, 600);
  };

  const filteredNews = useMemo(() => {
    return filterMacroNewsItems(
      state.newsItems,
      state.selectedCategory,
      state.selectedPlanet,
      state.searchQuery
    );
  }, [state.newsItems, state.selectedCategory, state.selectedPlanet, state.searchQuery]);

  const personalSyntheses = useMemo(() => {
    return getPersonalizedNewsSyntheses(filteredNews, userProfile);
  }, [filteredNews, userProfile]);

  const toggleProvider = (id: string) => {
    setState(prev => {
      const updated = prev.providers.map(p => 
        p.id === id ? { ...p, isEnabled: !p.isEnabled } : p
      );
      saveNewsProviders(updated);
      return { ...prev, providers: updated };
    });
  };

  const categories: Array<{ id: NewsCategory | 'ALL'; label: string; icon: any }> = [
    { id: 'ALL', label: 'All Categories', icon: Globe2 },
    { id: 'GEOPOLITICS', label: 'Geopolitics & Treaties', icon: Shield },
    { id: 'MACRO_ECONOMY', label: 'Macro Economy', icon: TrendingUp },
    { id: 'MARKETS_COMMODITIES', label: 'Markets & Gold/Oil', icon: BarChart3 },
    { id: 'SCIENCE_TECH', label: 'AI & Deep Tech', icon: Cpu },
    { id: 'SPACE_WEATHER', label: 'Space Weather (NOAA)', icon: Sun },
    { id: 'NATURAL_SEISMIC', label: 'Seismic & Earth (USGS)', icon: Flame },
    { id: 'SOCIETY_CULTURE', label: 'Society & Culture', icon: Sparkles }
  ];

  const planets: Array<PlanetaryRuler | 'ALL'> = [
    'ALL', 'Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu', 'Uranus', 'Pluto'
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-left font-sans pb-24">
      
      {/* ─── 1. TOP HEADER BANNER ────────────────────────────────────────── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111315]/80 backdrop-blur-xl border border-white/[0.08] shadow-2xl space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-white/[0.08] text-amber-300 font-mono text-xs font-bold uppercase">
              <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> Live Cosmic News & Prediction Intelligence
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Real-World News, Open APIs & Celestial Cycles
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-mono">
              Grounding astrological temporal forecasting in 100% free open APIs: GDELT Project, Google News RSS, NOAA Space Weather, USGS Earthquakes, and Classical Mundane Samhita correlations.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap font-mono text-xs">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-white/[0.08] transition-all flex items-center gap-2 cursor-pointer font-bold disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Syncing Feeds...' : 'Sync Live Feeds'}</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs">
          <div className="p-3 rounded-2xl bg-black/40 border border-white/[0.08] space-y-0.5">
            <span className="text-slate-400 text-[10px] uppercase font-bold block flex items-center gap-1">
              <Sun className="w-3 h-3 text-amber-400" /> NOAA Geomagnetic Kp
            </span>
            <span className="text-lg font-bold text-amber-400">
              Kp {state.spaceWeather.kpIndex.toFixed(1)} <span className="text-[10px] text-amber-300 font-normal">({state.spaceWeather.stormLevel.replace('_', ' ')})</span>
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-black/40 border border-white/[0.08] space-y-0.5">
            <span className="text-slate-400 text-[10px] uppercase font-bold block flex items-center gap-1">
              <Activity className="w-3 h-3 text-cyan-400" /> Global Sentiment Pulse
            </span>
            <span className="text-lg font-bold text-cyan-400">
              Bullish Tech & Commodities
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-black/40 border border-white/[0.08] space-y-0.5">
            <span className="text-slate-400 text-[10px] uppercase font-bold block flex items-center gap-1">
              <Database className="w-3 h-3 text-purple-400" /> Active Free Feeds
            </span>
            <span className="text-lg font-bold text-purple-400">
              {state.providers.filter(p => p.isEnabled).length} / {state.providers.length} Open APIs
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-black/40 border border-white/[0.08] space-y-0.5">
            <span className="text-slate-400 text-[10px] uppercase font-bold block flex items-center gap-1">
              <Flame className="w-3 h-3 text-emerald-400" /> Key Celestial Driver
            </span>
            <span className="text-lg font-bold text-emerald-400">
              Jupiter-Pluto Trine
            </span>
          </div>
        </div>
      </div>

      {/* ─── 2. NAVIGATION TABS ──────────────────────────────────────────── */}
      <div className="flex items-center gap-1.5 border-b border-white/[0.08] pb-2 overflow-x-auto font-mono text-xs">
        <button
          onClick={() => setActiveTab('news')}
          className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'news'
              ? 'bg-white text-black font-semibold shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <Radio className="w-3.5 h-3.5" />
          <span>Live World News & Planetary Correlator ({filteredNews.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('mundane')}
          className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'mundane'
              ? 'bg-white text-black font-semibold shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Mundane World Forecasts ({state.mundaneForecasts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('personal')}
          className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'personal'
              ? 'bg-white text-black font-semibold shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Personal Impact ("My Chart vs News")</span>
        </button>

        <button
          onClick={() => setActiveTab('space_seismic')}
          className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'space_seismic'
              ? 'bg-white text-black font-semibold shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <Sun className="w-3.5 h-3.5" />
          <span>Space Weather & Seismic Radar</span>
        </button>

        <button
          onClick={() => setActiveTab('providers')}
          className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'providers'
              ? 'bg-white text-black font-semibold shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Free Open APIs & RSS Catalog ({state.providers.length})</span>
        </button>
      </div>

      {/* ─── 3. TAB CONTENT ──────────────────────────────────────────────── */}

      {/* TAB 1: LIVE WORLD EVENTS & PLANETARY CORRELATOR */}
      {activeTab === 'news' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="p-4 rounded-2xl bg-[#111315]/80 border border-white/[0.08] space-y-3 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search live events by keyword, region, or source..."
                  value={state.searchQuery}
                  onChange={(e) => setState(prev => ({ ...prev, searchQuery: e.target.value }))}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/40 border border-white/[0.08] focus:border-amber-400 text-white placeholder-slate-500 outline-none text-xs"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Filter Planet:</span>
                <select
                  value={state.selectedPlanet}
                  onChange={(e) => setState(prev => ({ ...prev, selectedPlanet: e.target.value as any }))}
                  className="px-2.5 py-2 rounded-xl bg-black/40 border border-white/[0.08] text-white text-xs outline-none"
                >
                  {planets.map(p => (
                    <option key={p} value={p}>{p === 'ALL' ? 'All Planetary Rulers' : `🪐 ${p}`}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {categories.map(cat => {
                const Icon = cat.icon;
                const active = state.selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setState(prev => ({ ...prev, selectedCategory: cat.id }))}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs whitespace-nowrap cursor-pointer transition-all ${
                      active
                        ? 'bg-amber-500 text-black font-bold'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* News List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNews.map(item => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-[#111315]/80 border border-white/[0.08] hover:border-white/[0.08] transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2 font-mono text-[10px]">
                    <span className="px-2.5 py-0.5 rounded bg-amber-500/10 border border-white/[0.08] text-amber-300 font-bold uppercase">
                      {item.category.replace('_', ' ')}
                    </span>
                    <span className="text-slate-400">{item.publishedAt.slice(0, 10)} • {item.source}</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {item.summary}
                  </p>
                </div>

                {/* Planetary Correlation Box */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08] space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-amber-400 font-bold flex items-center gap-1.5">
                      🪐 Primary Celestial Ruler: <span className="text-white underline">{item.primaryPlanet}</span>
                    </span>
                    <span className="text-emerald-400 font-bold">
                      {item.planetaryCorrelations[0]?.correlationStrength || 90}% Match
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 font-sans">
                    {item.planetaryCorrelations[0]?.explanation}
                  </p>

                  <div className="text-[10px] text-slate-500 italic pt-1 border-t border-white/5">
                    {item.planetaryCorrelations[0]?.classicalPrinciple}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 font-mono text-xs">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    item.sentimentLabel === 'VERY_BULLISH' || item.sentimentLabel === 'BULLISH'
                      ? 'bg-emerald-500/10 text-emerald-300 border border-white/[0.08]'
                      : item.sentimentLabel === 'CRISIS_ALERT' || item.sentimentLabel === 'BEARISH'
                      ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                      : 'bg-slate-500/10 text-slate-300 border border-slate-500/20'
                  }`}>
                    {item.sentimentLabel.replace('_', ' ')}
                  </span>

                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 flex items-center gap-1 text-[11px]"
                  >
                    <span>View Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: MUNDANE WORLD FORECASTS */}
      {activeTab === 'mundane' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-white/[0.08] text-amber-200 text-xs font-mono">
            <strong>Classical Mundane Principles (Samhita Jyotish):</strong> Planetary ingresses and aspect configurations govern macroeconomic liquidity, sovereign boundary shifts, and technological breakthroughs.
          </div>

          <div className="space-y-4">
            {state.mundaneForecasts.map(forecast => (
              <div
                key={forecast.id}
                className="p-6 rounded-2xl bg-[#111315]/80 border border-white/[0.08] space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-white/[0.08] font-bold uppercase">
                      {forecast.domain.replace('_', ' ')}
                    </span>
                    <h3 className="text-lg font-bold text-white">{forecast.title}</h3>
                    <span className="text-xs font-mono text-slate-400">Window: {forecast.timeWindow}</span>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-white/[0.08] text-emerald-300 font-bold">
                      {forecast.confidenceScore}% Confidence
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-mono text-amber-300 uppercase font-bold">Macro Celestial Trajectory:</h4>
                  <p className="text-sm text-slate-200 leading-relaxed font-sans">{forecast.macroTrend}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08] space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Classical Treatise Source</span>
                    <span className="text-white text-xs">{forecast.classicalSource}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08] space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Live Verified Evidence</span>
                    <span className="text-white text-xs">{forecast.realWorldEvidence}</span>
                  </div>
                </div>

                {/* Historical Precedents */}
                <div className="space-y-2 pt-2 border-t border-white/5 font-mono text-xs">
                  <span className="text-[11px] text-slate-400 uppercase font-bold block">Historical Precedent Comparison:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {forecast.historicalPrecedents.map((hist, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-white/5 border border-white/5 space-y-1">
                        <div className="flex items-center justify-between text-amber-300 font-bold text-[11px]">
                          <span>Year {hist.year}</span>
                          <span className="text-slate-400 font-normal text-[10px]">{hist.planetarySetup}</span>
                        </div>
                        <p className="text-[11px] text-slate-300 font-sans">{hist.historicalEvent}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actionable Strategy */}
                <div className="p-3 rounded-xl bg-amber-500/5 border border-white/[0.08] space-y-1 font-mono text-xs">
                  <span className="text-amber-300 font-bold text-xs block">Strategic Actionable Counsel:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-300 text-xs font-sans">
                    {forecast.actionableInsights.map((ins, i) => (
                      <li key={i}>{ins}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PERSONAL IMPACT SYNTHESIZER */}
      {activeTab === 'personal' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#111315]/80 border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white">Natal Chart vs Macro World News</h3>
              <p className="text-xs text-slate-400 font-mono">
                Cross-referencing real-time world events with {userProfile?.name ? `seeker ${userProfile.name}` : 'your personal birth chart'} (12 Bhavas & Active Dasha).
              </p>
            </div>

            {userProfile?.name && (
              <span className="px-3 py-1 rounded-xl bg-cyan-500/10 border border-white/[0.08] text-cyan-300 text-xs font-mono font-bold">
                Profile Active: {userProfile.name}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {personalSyntheses.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#111315]/80 border border-white/[0.08] hover:border-white/[0.08] transition-all space-y-3"
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 border border-white/[0.08] text-cyan-300 font-bold">
                    House {item.activatedNatalHouse}: {item.houseTheme.split(',')[0]}
                  </span>
                  <span className="text-slate-400 text-[10px]">{item.primaryPlanet} Activated</span>
                </div>

                <h4 className="text-sm font-bold text-white">{item.globalEventTitle}</h4>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {item.strategicAdvice}
                </p>

                <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08] font-mono text-[11px] space-y-1">
                  <span className="text-amber-400 font-bold block">Personal Guidance:</span>
                  <span className="text-slate-300 font-sans block">{item.personalImpactSummary}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SPACE WEATHER & SEISMIC RADAR */}
      {activeTab === 'space_seismic' && (
        <div className="space-y-6">
          {/* NOAA Space Weather SWPC Live Dashboard */}
          <div className="p-6 rounded-3xl bg-[#111315]/80 border border-white/[0.08] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-white/[0.08] font-bold uppercase">
                  NOAA SWPC Open Science Feed
                </span>
                <h3 className="text-xl font-bold text-white">Geomagnetic Kp-Index & Solar Activity Radar</h3>
                <p className="text-xs text-slate-400 font-mono">Real-time solar wind, coronal mass ejections, and terrestrial magnetic flux</p>
              </div>

              <span className="text-xs font-mono text-amber-300 bg-amber-500/20 px-3 py-1 rounded-xl border border-white/[0.08] font-bold">
                {state.spaceWeather.stormLevel.replace('_', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.08] space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Geomagnetic Kp Index</span>
                <span className="text-2xl font-bold text-amber-400">{state.spaceWeather.kpIndex.toFixed(1)} / 9.0</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.08] space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Solar Flux (10.7cm)</span>
                <span className="text-2xl font-bold text-white">{state.spaceWeather.solarFlux} sfu</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.08] space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Active Solar Flare Class</span>
                <span className="text-2xl font-bold text-rose-400">Class {state.spaceWeather.solarFlareClass}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.08] space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Solar Wind Speed</span>
                <span className="text-2xl font-bold text-cyan-400">{state.spaceWeather.solarWindSpeedKmS} km/s</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] space-y-2 font-mono text-xs">
              <span className="text-amber-400 font-bold block text-sm">Astrological Ephemeris Synthesis:</span>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                {state.spaceWeather.astrologicalSignificance}
              </p>
              <p className="text-amber-300 font-sans text-xs">
                <strong>Recommended Practice:</strong> {state.spaceWeather.recommendedAction}
              </p>
            </div>
          </div>

          {/* USGS Real-Time Global Earthquake Feed */}
          <div className="p-6 rounded-3xl bg-[#111315]/80 border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div>
                <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30 font-bold uppercase">
                  USGS Real-Time GeoJSON Feed
                </span>
                <h3 className="text-xl font-bold text-white">Global Seismic & Tectonic Pulse</h3>
                <p className="text-xs text-slate-400 font-mono">Cross-referenced with Lunar Perigee and Planetary Quadrature Triggers (Brihat Samhita Ch. 32)</p>
              </div>
            </div>

            <div className="space-y-3">
              {state.recentSeismic.map(seismic => (
                <div
                  key={seismic.id}
                  className="p-4 rounded-2xl bg-white/5 border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-rose-400">M{seismic.magnitude.toFixed(1)}</span>
                      <span className="font-bold text-white">{seismic.location}</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">Lunar Phase: <span className="text-slate-200">{seismic.lunarPhaseCorrelation}</span></p>
                    <p className="text-amber-300 text-[11px]">Celestial Trigger: {seismic.planetaryTrigger}</p>
                  </div>

                  <span className="text-[10px] text-slate-400 shrink-0">
                    Depth: {seismic.depthKm} km • {seismic.timestamp.slice(0, 16).replace('T', ' ')} UTC
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: FREE OPEN APIS & RSS CATALOG */}
      {activeTab === 'providers' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#111315]/80 border border-white/[0.08] space-y-1 font-mono text-xs">
            <h3 className="text-base font-bold text-white">100% Free Open News & Science Feeds</h3>
            <p className="text-slate-400">
              All feeds operate without paid paywalls or mandatory private credentials. You can enable or disable feeds as needed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {state.providers.map(prov => (
              <div
                key={prov.id}
                className="p-5 rounded-2xl bg-[#111315]/80 border border-white/[0.08] space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-slate-300 uppercase font-bold">
                      {prov.protocol.replace('_', ' ')}
                    </span>
                    <button
                      onClick={() => toggleProvider(prov.id)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        prov.isEnabled
                          ? 'bg-emerald-500/20 text-emerald-300 border border-white/[0.08]'
                          : 'bg-slate-700/30 text-slate-400 border border-slate-600/30'
                      }`}
                    >
                      {prov.isEnabled ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>

                  <h4 className="text-sm font-bold text-white">{prov.name}</h4>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">{prov.description}</p>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08] space-y-1 font-mono text-[10px] text-slate-400">
                  <div><strong>Endpoint:</strong> <span className="text-slate-300 truncate block">{prov.endpointUrl}</span></div>
                  <div><strong>Rate Limit:</strong> <span className="text-slate-300">{prov.rateLimitInfo}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
