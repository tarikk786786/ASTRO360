import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  ShieldCheck, Globe, Search, Sparkles, Database, 
  Layers, Building2, Bell, Download, Filter, 
  RefreshCw, Key, HelpCircle, CheckCircle2, ArrowRight,
  TrendingUp, Wrench, FileText, Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  KeywordInputState, 
  KeywordItem, 
  ClusterGroup, 
  CompetitorGapItem, 
  GSCMetricData, 
  ContentBrief,
  ProviderApiConfig 
} from '../../lib/seo-lab/types';
import { runKeywordResearchPipeline } from '../../lib/seo-lab/keywordLabCore';
import { generateContentBrief } from '../../lib/seo-lab/contentBriefEngine';
import { getSavedWatchlist, saveToWatchlist, removeFromWatchlist, generateTrendAlerts } from '../../lib/seo-lab/trendMonitorEngine';

import KeywordSearchInput from './KeywordSearchInput';
import KeywordResultCard from './KeywordResultCard';
import ClusterAccordionView from './ClusterAccordionView';
import CompetitorGapView from './CompetitorGapView';
import TrendMonitoringView from './TrendMonitoringView';
import GSCImportModal from './GSCImportModal';
import ContentBriefModal from './ContentBriefModal';
import ProviderSettingsModal from './ProviderSettingsModal';
import ExportMenu from './ExportMenu';

interface KeywordResearchLabProps {
  onNavigate?: (tab: string) => void;
}

export default function KeywordResearchLab({ onNavigate }: KeywordResearchLabProps) {
  // 1. Input and Filter State
  const [inputState, setInputState] = useState<KeywordInputState>({
    seed: 'birth chart',
    country: 'United States',
    countryCode: 'US',
    language: 'English',
    languageCode: 'en',
    engine: 'google',
    device: 'desktop',
    category: 'Astrology & Horoscope',
    timeRange: 'today 1-m'
  });

  const [activeTab, setActiveTab] = useState<'keywords' | 'clusters' | 'gaps' | 'monitoring'>('keywords');
  const [activeFilter, setActiveFilter] = useState<'all' | 'critical' | 'tools' | 'content_gaps' | 'rising'>('all');
  const [selectedClusterFilter, setSelectedClusterFilter] = useState<string>('all');

  // 2. Execution State
  const [isLoading, setIsLoading] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');

  // 3. Data Collections
  const [items, setItems] = useState<KeywordItem[]>([]);
  const [clusters, setClusters] = useState<ClusterGroup[]>([]);
  const [competitorGaps, setCompetitorGaps] = useState<CompetitorGapItem[]>([]);
  const [gscData, setGscData] = useState<GSCMetricData[]>([]);
  const [watchlist, setWatchlist] = useState<string[]>(getSavedWatchlist());
  const [apiConfig, setApiConfig] = useState<ProviderApiConfig>({});

  // 4. Modals State
  const [isGSCModalOpen, setIsGSCModalOpen] = useState(false);
  const [isProviderModalOpen, setIsProviderModalOpen] = useState(false);
  const [activeContentBrief, setActiveContentBrief] = useState<ContentBrief | null>(null);

  // Trigger search pipeline
  const executeMining = useCallback(async (customSeed?: string) => {
    const seedToUse = customSeed !== undefined ? customSeed : inputState.seed;
    if (!seedToUse.trim()) return;

    setIsLoading(true);
    setProgressPercent(10);
    setProgressMessage(`Mining real keyword suggestions for "${seedToUse}"...`);

    try {
      const result = await runKeywordResearchPipeline(
        { ...inputState, seed: seedToUse },
        gscData,
        apiConfig,
        (percent, step) => {
          setProgressPercent(percent);
          setProgressMessage(step);
        }
      );

      setItems(result.items);
      setClusters(result.clusters);
      setCompetitorGaps(result.competitorGaps);
    } catch (err) {
      console.error("Keyword mining failed", err);
    } finally {
      setIsLoading(false);
      setProgressPercent(100);
    }
  }, [inputState, gscData, apiConfig]);

  // Initial load auto-mine
  useEffect(() => {
    executeMining();
  }, []);

  // Handle Watchlist Toggling
  const handleToggleWatchlist = (item: KeywordItem) => {
    const norm = item.normalizedKeyword.toLowerCase();
    if (watchlist.includes(norm)) {
      const updated = removeFromWatchlist(norm);
      setWatchlist(updated);
      setItems(prev => prev.map(k => k.id === item.id ? { ...k, isSaved: false } : k));
    } else {
      const updated = saveToWatchlist(norm);
      setWatchlist(updated);
      setItems(prev => prev.map(k => k.id === item.id ? { ...k, isSaved: true } : k));
    }
  };

  // Filtered Keywords list
  const filteredKeywords = useMemo(() => {
    return items.filter(item => {
      // Cluster filter
      if (selectedClusterFilter !== 'all' && item.cluster !== selectedClusterFilter) {
        return false;
      }
      // Action filter
      if (activeFilter === 'critical') return item.opportunity.tier === 'CRITICAL' || item.opportunity.tier === 'HIGH';
      if (activeFilter === 'tools') return item.primaryIntent === 'TOOL' || item.mapping.status === 'TOOL_NEEDED';
      if (activeFilter === 'content_gaps') return item.mapping.status === 'MISSING_NEW_PAGE';
      if (activeFilter === 'rising') return item.trend.direction === 'RISING' || item.trend.isBreakout;
      return true;
    });
  }, [items, activeFilter, selectedClusterFilter]);

  // Generate automated alerts for watchlist
  const trendAlerts = useMemo(() => {
    return generateTrendAlerts(items);
  }, [items]);

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-left font-sans pb-20">
      
      {/* ─── 1. TOP HEADER BANNER ────────────────────────────────────────── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0B1220] via-[#0E172A] to-[#070B14] border border-white/[0.08] shadow-2xl space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-white/[0.08] text-cyan-300 font-mono text-xs font-bold uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Free-First Keyword Research Lab
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Real Search Intelligence & Astrology Cluster Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-mono">
              Grounding keyword discovery in real Google Autocomplete, Trends momentum, and first-party GSC signals. Zero simulated search volume.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsGSCModalOpen(true)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                gscData.length > 0
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-white/[0.04] text-slate-300 hover:text-white border-white/10 hover:bg-white/[0.08]'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>{gscData.length > 0 ? `GSC Connected (${gscData.length})` : 'Connect GSC'}</span>
            </button>

            <button
              onClick={() => setIsProviderModalOpen(true)}
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 text-xs font-mono transition-all cursor-pointer"
              title="Optional API Providers"
            >
              <Key className="w-3.5 h-3.5" />
            </button>

            <ExportMenu items={items} clusters={clusters} seedQuery={inputState.seed} />
          </div>
        </div>

        {/* Real Data Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs">
          <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-0.5">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Keywords Mined</span>
            <span className="text-xl font-bold text-white">{items.length}</span>
          </div>
          <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-0.5">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">High Opportunities</span>
            <span className="text-xl font-bold text-cyan-400">
              {items.filter(i => i.opportunity.tier === 'CRITICAL' || i.opportunity.tier === 'HIGH').length}
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-0.5">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Calculators Needed</span>
            <span className="text-xl font-bold text-purple-400">
              {items.filter(i => i.mapping.status === 'TOOL_NEEDED').length}
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-0.5">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Active Clusters</span>
            <span className="text-xl font-bold text-amber-400">{clusters.length}</span>
          </div>
        </div>
      </div>

      {/* ─── 2. KEYWORD INPUT COMPONENT ──────────────────────────────────── */}
      <KeywordSearchInput
        inputState={inputState}
        onChange={(updated) => setInputState(prev => ({ ...prev, ...updated }))}
        onSearch={() => executeMining()}
        isLoading={isLoading}
        progressMessage={progressMessage}
        progressPercent={progressPercent}
      />

      {/* ─── 3. SUB-NAVIGATION TABS ──────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 overflow-x-auto gap-2">
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setActiveTab('keywords')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'keywords'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>All Keywords ({items.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('clusters')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'clusters'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Pillars & Clusters ({clusters.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gaps')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'gaps'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Competitor Gaps</span>
          </button>

          <button
            onClick={() => setActiveTab('monitoring')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'monitoring'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Watchlist & Alerts ({watchlist.length})</span>
          </button>
        </div>
      </div>

      {/* ─── 4. TAB CONTENTS ─────────────────────────────────────────────── */}
      
      {/* TAB 1: ALL KEYWORDS */}
      {activeTab === 'keywords' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            {/* Quick Filter Chips */}
            <div className="flex items-center gap-1.5 flex-wrap font-mono text-xs">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                    : 'bg-white/[0.03] text-slate-300 border-white/10 hover:bg-white/[0.06]'
                }`}
              >
                All ({items.length})
              </button>
              <button
                onClick={() => setActiveFilter('critical')}
                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  activeFilter === 'critical'
                    ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                    : 'bg-white/[0.03] text-slate-300 border-white/10 hover:bg-white/[0.06]'
                }`}
              >
                High Priority
              </button>
              <button
                onClick={() => setActiveFilter('tools')}
                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  activeFilter === 'tools'
                    ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                    : 'bg-white/[0.03] text-slate-300 border-white/10 hover:bg-white/[0.06]'
                }`}
              >
                Calculators / Tools
              </button>
              <button
                onClick={() => setActiveFilter('content_gaps')}
                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  activeFilter === 'content_gaps'
                    ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                    : 'bg-white/[0.03] text-slate-300 border-white/10 hover:bg-white/[0.06]'
                }`}
              >
                Content Gaps
              </button>
              <button
                onClick={() => setActiveFilter('rising')}
                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  activeFilter === 'rising'
                    ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                    : 'bg-white/[0.03] text-slate-300 border-white/10 hover:bg-white/[0.06]'
                }`}
              >
                ▲ Rising Trends
              </button>
            </div>

            {/* Cluster Dropdown Filter */}
            <div className="flex items-center gap-2 font-mono text-xs shrink-0">
              <span className="text-slate-500 hidden sm:inline">Pillar:</span>
              <select
                value={selectedClusterFilter}
                onChange={(e) => setSelectedClusterFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-xs"
              >
                <option value="all">All 16 Astrology Pillars</option>
                {clusters.map(c => (
                  <option key={c.pillar} value={c.pillar}>{c.pillar} ({c.clusterKeywords.length})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Grid */}
          {filteredKeywords.length === 0 ? (
            <div className="p-12 rounded-3xl bg-white/[0.02] border border-white/[0.06] text-center space-y-2 font-mono text-xs text-slate-400">
              <Search className="w-8 h-8 mx-auto text-slate-600 mb-2" />
              <p>No keywords match your selected filter criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredKeywords.map(item => (
                <KeywordResultCard
                  key={item.id}
                  item={item}
                  onGenerateBrief={(k) => setActiveContentBrief(generateContentBrief(k))}
                  onToggleSave={handleToggleWatchlist}
                  onNavigateToTarget={(url, tab) => {
                    if (tab && onNavigate) {
                      onNavigate(tab);
                    } else if (onNavigate) {
                      onNavigate(url.replace(/^\//, ''));
                    }
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CLUSTERS & PILLARS */}
      {activeTab === 'clusters' && (
        <ClusterAccordionView
          clusters={clusters}
          onGenerateBrief={(k) => setActiveContentBrief(generateContentBrief(k))}
          onNavigateToTarget={(url, tab) => {
            if (tab && onNavigate) onNavigate(tab);
            else if (onNavigate) onNavigate(url.replace(/^\//, ''));
          }}
        />
      )}

      {/* TAB 3: COMPETITOR GAPS */}
      {activeTab === 'gaps' && (
        <CompetitorGapView
          gaps={competitorGaps}
          onNavigateToTarget={(url) => onNavigate?.(url.replace(/^\//, ''))}
        />
      )}

      {/* TAB 4: TREND MONITORING & ALERTS */}
      {activeTab === 'monitoring' && (
        <TrendMonitoringView
          watchlist={watchlist}
          alerts={trendAlerts}
          onRemoveFromWatchlist={(kw) => {
            const updated = removeFromWatchlist(kw);
            setWatchlist(updated);
          }}
          onSearchKeyword={(kw) => {
            setInputState(prev => ({ ...prev, seed: kw }));
            setActiveTab('keywords');
            executeMining(kw);
          }}
        />
      )}

      {/* ─── 5. MODALS ───────────────────────────────────────────────────── */}
      
      {/* GSC Import Modal */}
      <GSCImportModal
        isOpen={isGSCModalOpen}
        onClose={() => setIsGSCModalOpen(false)}
        onImport={(imported) => {
          setGscData(imported);
          executeMining();
        }}
      />

      {/* Optional Provider Keys Modal */}
      <ProviderSettingsModal
        isOpen={isProviderModalOpen}
        onClose={() => setIsProviderModalOpen(false)}
        onSave={(cfg) => setApiConfig(cfg)}
      />

      {/* Content Brief Slide-Over */}
      <ContentBriefModal
        brief={activeContentBrief}
        onClose={() => setActiveContentBrief(null)}
      />

    </div>
  );
}
