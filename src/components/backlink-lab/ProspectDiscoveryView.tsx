import React, { useState } from 'react';
import { 
  Search, Filter, Layers, Globe, ExternalLink, Bookmark, 
  Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Mail, Building2, User 
} from 'lucide-react';
import { BacklinkOpportunity, CompetitorBacklinkGap, UnlinkedBrandMention, ProspectType } from '../../lib/backlink-lab/types';
import OpportunityCard from './OpportunityCard';

interface ProspectDiscoveryViewProps {
  opportunities: BacklinkOpportunity[];
  competitorGaps: CompetitorBacklinkGap[];
  unlinkedMentions: UnlinkedBrandMention[];
  onDraftOutreach: (item: BacklinkOpportunity) => void;
  onVerify: (item: BacklinkOpportunity) => void;
  onToggleSave: (item: BacklinkOpportunity) => void;
  onNavigateToTarget?: (url: string) => void;
}

export default function ProspectDiscoveryView({
  opportunities,
  competitorGaps,
  unlinkedMentions,
  onDraftOutreach,
  onVerify,
  onToggleSave,
  onNavigateToTarget
}: ProspectDiscoveryViewProps) {
  const [subTab, setSubTab] = useState<'all_prospects' | 'competitor_gaps' | 'unlinked_mentions'>('all_prospects');
  const [filterType, setFilterType] = useState<ProspectType | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOpportunities = opportunities.filter(opp => {
    if (filterType !== 'ALL' && opp.sourceType !== filterType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        opp.sourceDomain.toLowerCase().includes(q) ||
        opp.topic.toLowerCase().includes(q) ||
        opp.notes.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-4 font-sans text-left">
      {/* Sub-tabs header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-1.5 overflow-x-auto font-mono text-xs">
          <button
            onClick={() => setSubTab('all_prospects')}
            className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
              subTab === 'all_prospects'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40 font-bold'
                : 'text-slate-400 hover:text-white border-transparent hover:bg-white/5'
            }`}
          >
            Qualified Prospects ({opportunities.length})
          </button>
          <button
            onClick={() => setSubTab('competitor_gaps')}
            className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
              subTab === 'competitor_gaps'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40 font-bold'
                : 'text-slate-400 hover:text-white border-transparent hover:bg-white/5'
            }`}
          >
            Competitor Link Gaps ({competitorGaps.length})
          </button>
          <button
            onClick={() => setSubTab('unlinked_mentions')}
            className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
              subTab === 'unlinked_mentions'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40 font-bold'
                : 'text-slate-400 hover:text-white border-transparent hover:bg-white/5'
            }`}
          >
            Unlinked Brand Mentions ({unlinkedMentions.length})
          </button>
        </div>

        {/* Search input */}
        {subTab === 'all_prospects' && (
          <div className="relative font-mono text-xs">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search prospects & topics..."
              className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-xs w-full sm:w-60"
            />
          </div>
        )}
      </div>

      {/* ─── SUB-TAB 1: ALL QUALIFIED PROSPECTS ──────────────────────────── */}
      {subTab === 'all_prospects' && (
        <div className="space-y-4">
          {/* Type filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono text-[11px]">
            {[
              'ALL',
              'RESOURCE_PAGE',
              'EDITORIAL',
              'DIGITAL_PR',
              'TOOL_LIST',
              'EDUCATION',
              'RESEARCH',
              'ROUNDUP',
              'UNLINKED_MENTION'
            ].map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type as any)}
                className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                  filterType === type
                    ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                    : 'bg-white/[0.03] text-slate-400 border-white/10 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                {type.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          {filteredOpportunities.length === 0 ? (
            <div className="p-12 rounded-3xl bg-white/[0.02] border border-white/[0.06] text-center space-y-2 font-mono text-xs text-slate-400">
              <p>No backlink opportunities matched the selected criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredOpportunities.map(opp => (
                <OpportunityCard
                  key={opp.id}
                  item={opp}
                  onDraftOutreach={onDraftOutreach}
                  onVerify={onVerify}
                  onToggleSave={onToggleSave}
                  onNavigateToTarget={onNavigateToTarget}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── SUB-TAB 2: COMPETITOR LINK GAPS ─────────────────────────────── */}
      {subTab === 'competitor_gaps' && (
        <div className="space-y-3">
          <p className="text-xs text-slate-400 font-mono">
            High-authority publications linking to competitors (AstroSage, Astro-Seek, CafeAstrology) where ASTRO360 has a superior, ad-free tool or deeper scripture documentation.
          </p>

          <div className="grid grid-cols-1 gap-3 font-mono text-xs">
            {competitorGaps.map(gap => (
              <div
                key={gap.id}
                className="p-4 sm:p-5 rounded-2xl bg-[#0E172A] border border-white/10 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{gap.sourceDomain}</span>
                    <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[10px] font-bold">
                      vs {gap.competitor}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-bold">
                    {gap.actionRecommendation.replace('_', ' ')}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300 text-[11px]">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Source Page:</span>
                    <a href={gap.sourcePage} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline truncate block">
                      {gap.sourcePage}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Recommended ASTRO360 Asset:</span>
                    <span className="text-white font-bold">{gap.astro360RelevantAsset} ({gap.astro360TargetUrl})</span>
                  </div>
                </div>

                <p className="text-slate-300 text-[11px] bg-black/40 p-2.5 rounded-xl border border-white/5">
                  <span className="text-cyan-400 font-bold">Strategic Angle: </span>
                  {gap.notes}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── SUB-TAB 3: UNLINKED BRAND MENTIONS ─────────────────────────── */}
      {subTab === 'unlinked_mentions' && (
        <div className="space-y-3">
          <p className="text-xs text-slate-400 font-mono">
            Pages that already reference ASTRO360 in articles or forum discussions but lack a direct hyperlink. Ready for low-friction editorial conversion.
          </p>

          <div className="grid grid-cols-1 gap-3 font-mono text-xs">
            {unlinkedMentions.map(mention => (
              <div
                key={mention.id}
                className="p-4 sm:p-5 rounded-2xl bg-[#0E172A] border border-cyan-500/30 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="font-bold text-white text-sm">{mention.sourceDomain}</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                    UNLINKED MENTION DETECTED
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[10px] text-slate-500 block uppercase">Context Snippet:</span>
                  <p className="text-slate-200 text-xs italic">
                    "{mention.mentionSnippet}"
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
                  <div className="text-slate-400">
                    Target Route: <span className="text-cyan-400 font-bold">{mention.targetAstroUrl}</span>
                  </div>
                  <button
                    onClick={() => onDraftOutreach({
                      id: mention.id,
                      sourceDomain: mention.sourceDomain,
                      sourceUrl: mention.sourcePage,
                      targetUrl: mention.targetAstroUrl,
                      topic: 'ASTRO360 Brand Mention',
                      relevance: 100,
                      country: 'Global',
                      language: 'English',
                      sourceType: 'UNLINKED_MENTION',
                      linkType: 'UNLINKED_MENTION',
                      status: 'QUALIFIED',
                      qualitySignals: {} as any,
                      opportunityScore: { total: 92, tier: 'HIGH', breakdown: {} as any, factors: [], explanation: '' },
                      confidence: 0.98,
                      discoveredAt: mention.discoveredAt,
                      lastChecked: mention.discoveredAt,
                      notes: mention.outreachAngle,
                      contactName: mention.authorOrEditor,
                      contactUrl: mention.contactUrl
                    })}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Draft Friendly Note</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
