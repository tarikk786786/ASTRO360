/**
 * ASTRO360 MARKETING BRAIN DASHBOARD
 * The internal growth intelligence and conversion optimization command center for ASTRO360.
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, Users, Target, ShieldCheck, Sparkles, AlertTriangle, 
  HelpCircle, CheckCircle2, ArrowRight, Activity, Search, RefreshCw, 
  Layers, FlaskConical, Bot, Globe, BarChart3, Eye, FileText, Send, 
  Zap, ChevronRight, ToggleLeft, ToggleRight, X
} from 'lucide-react';
import { 
  MarketingEventTracker, 
  FunnelEngine, 
  OpportunityEngine, 
  BehaviorIntelligence, 
  ExperimentEngine, 
  MarketingCopilot,
  MARKETING_BRAND_RULES,
  COMPETITOR_BENCHMARKS,
  GrowthOpportunity,
  BehaviorIssue,
  GrowthExperiment,
  FeatureFlag,
  MarketingCopilotResponse
} from '../../lib/marketingBrain';

export default function AstroMarketingBrainDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'funnels' | 'behavior' | 'seo' | 'experiments' | 'copilot' | 'rules'>('overview');
  const [selectedOpportunity, setSelectedOpportunity] = useState<GrowthOpportunity | null>(null);
  const [selectedBehaviorIssue, setSelectedBehaviorIssue] = useState<BehaviorIssue | null>(null);

  // Copilot Query State
  const [copilotQuery, setCopilotQuery] = useState('');
  const [copilotResponse, setCopilotResponse] = useState<MarketingCopilotResponse | null>(() => 
    MarketingCopilot.query('What are the top growth priorities for ASTRO360?')
  );
  const [isCopilotLoading, setIsCopilotLoading] = useState(false);

  // Growth Data
  const storedEvents = useMemo(() => MarketingEventTracker.getStoredEvents(), []);
  const funnels = useMemo(() => FunnelEngine.calculateFunnels(storedEvents), [storedEvents]);
  const opportunities = useMemo(() => OpportunityEngine.getPrioritizedOpportunities(storedEvents), [storedEvents]);
  const behaviorIssues = useMemo(() => BehaviorIntelligence.analyzeFriction(storedEvents), [storedEvents]);
  const [experiments, setExperiments] = useState<GrowthExperiment[]>(() => ExperimentEngine.getExperiments());
  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>(() => ExperimentEngine.getFeatureFlags());

  const handleRunCopilot = (q?: string) => {
    const text = q || copilotQuery;
    if (!text.trim()) return;
    setIsCopilotLoading(true);
    setTimeout(() => {
      setCopilotResponse(MarketingCopilot.query(text));
      setIsCopilotLoading(false);
    }, 300);
  };

  const handleToggleFlag = (key: string, current: boolean) => {
    ExperimentEngine.toggleFlag(key, !current);
    setFeatureFlags([...ExperimentEngine.getFeatureFlags()]);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 text-left pb-24 pt-2">
      {/* 1. Executive Growth Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#0C1322] via-[#0F1A2E] to-[#0A0E1A] border border-amber-500/30 shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/40 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              ASTRO360 <span className="text-amber-400">MARKETING BRAIN</span>
            </h1>
            <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-400/15 px-2.5 py-0.5 rounded-full border border-amber-400/30">
              GROWTH INTELLIGENCE V3.4
            </span>
          </div>
          <p className="text-xs text-slate-300 font-mono">
            Full-Stack Observability • Real User Friction Signals • Safe Experiments • Epistemic Prioritization
          </p>
        </div>

        {/* Global Growth Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30 font-bold flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" /> 100% Zero-PII Protected
          </span>
          <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 px-3 py-1.5 rounded-xl border border-cyan-500/30 font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Human Approval Enforced
          </span>
        </div>
      </div>

      {/* 2. Top-Line Growth KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Organic Visitors */}
        <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Organic Traffic</span>
            <span className="text-emerald-400 font-bold">↑ +12%</span>
          </div>
          <p className="text-xl sm:text-2xl font-black text-white">12,450</p>
          <span className="text-[10px] font-mono text-slate-500">Weekly Unique Visitors</span>
        </div>

        {/* Chart Activation Rate */}
        <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Chart Activation</span>
            <span className="text-emerald-400 font-bold">↑ +8%</span>
          </div>
          <p className="text-xl sm:text-2xl font-black text-white">49.3%</p>
          <span className="text-[10px] font-mono text-slate-500">Landing to Generated Chart</span>
        </div>

        {/* Mobile Conversion Gap */}
        <div className="p-4 rounded-2xl bg-[#0F172A] border border-amber-500/30 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-amber-400">
            <span>Mobile Conv. Gap</span>
            <span className="text-amber-400 font-bold">44.8%</span>
          </div>
          <p className="text-xl sm:text-2xl font-black text-amber-300">-9.4%</p>
          <span className="text-[10px] font-mono text-amber-400/80">Desktop: 54.2% (P0 Fix)</span>
        </div>

        {/* Free Tool Executions */}
        <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Free Tools Used</span>
            <span className="text-emerald-400 font-bold">↑ +18%</span>
          </div>
          <p className="text-xl sm:text-2xl font-black text-white">6,450</p>
          <span className="text-[10px] font-mono text-slate-500">Calculators Executed / Wk</span>
        </div>

        {/* Executive Report Conversions */}
        <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Pro / Dossier Conv.</span>
            <span className="text-emerald-400 font-bold">↑ +1.2%</span>
          </div>
          <p className="text-xl sm:text-2xl font-black text-white">5.5%</p>
          <span className="text-[10px] font-mono text-slate-500">680 Upgrades / Month</span>
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-white/10 no-scrollbar">
        {[
          { id: 'overview', label: '📊 Growth Overview', icon: BarChart3 },
          { id: 'funnels', label: '🌪️ Funnel Engine (PostHog)', icon: Target },
          { id: 'behavior', label: '🔍 Behavior & Rage Clicks', icon: Eye },
          { id: 'seo', label: '🌐 SEO & Content Matrix', icon: Globe },
          { id: 'experiments', label: '🧪 A/B Experiments (GrowthBook)', icon: FlaskConical },
          { id: 'copilot', label: '🤖 AI Growth Copilot', icon: Bot },
          { id: 'rules', label: '📜 Brand Rules & Guardrails', icon: ShieldCheck },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold shrink-0 transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. TAB CONTENTS */}

      {/* TAB: OVERVIEW & TOP PRIORITIZED OPPORTUNITIES */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Top Prioritized Growth Opportunities Table (ICE Ranking) */}
          <div className="p-6 rounded-3xl bg-[#0F172A] border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-amber-400" /> Prioritized Growth Opportunities (ICE Model)
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Ranked deterministically by Impact × Confidence ÷ Effort with recorded telemetry evidence.
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400 self-start sm:self-auto">
                {opportunities.length} Active Opportunities
              </span>
            </div>

            <div className="space-y-3">
              {opportunities.map((opp) => (
                <div
                  key={opp.id}
                  onClick={() => setSelectedOpportunity(opp)}
                  className="p-4 sm:p-5 rounded-2xl bg-[#0B1220] hover:bg-[#131F37] border border-white/10 hover:border-amber-400/40 transition-all cursor-pointer space-y-3 group"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                        opp.priority === 'P0' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                        opp.priority === 'P1' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      }`}>
                        {opp.priority}
                      </span>
                      <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                        {opp.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-slate-400 block">ICE Score</span>
                        <span className="text-sm font-black text-amber-400 font-mono">{opp.iceScore}</span>
                      </div>
                      <span className="text-xs font-mono text-slate-300 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                        {opp.status}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    <strong>Evidence:</strong> {opp.evidence[0]}
                  </p>

                  <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-white/5">
                    <span>Category: <strong className="text-slate-200">{opp.category}</strong></span>
                    <span>Action Level: <strong className="text-cyan-300">{opp.actionLevel}</strong></span>
                    <span>Impact: <strong className="text-emerald-400">{opp.impactScore}/10</strong> • Confidence: <strong className="text-emerald-400">{opp.confidenceScore}/10</strong> • Effort: <strong className="text-amber-400">{opp.effortScore}/10</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Copilot Inquiry Callout */}
          <div 
            onClick={() => setActiveTab('copilot')}
            className="p-5 rounded-3xl bg-gradient-to-r from-indigo-950/60 to-[#0F172A] border border-indigo-500/30 hover:border-indigo-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                  Ask AI Growth Copilot
                </h4>
                <p className="text-xs text-slate-400">
                  "Why did mobile conversion drop?", "Generate an A/B experiment brief", or "Inspect free tool drop-offs"
                </p>
              </div>
            </div>
            <span className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs font-mono flex items-center justify-center gap-1.5 shrink-0 transition-colors shadow-md">
              Launch Copilot Terminal <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      )}

      {/* TAB: FUNNEL ENGINE */}
      {activeTab === 'funnels' && (
        <div className="space-y-6">
          {funnels.map((funnel) => (
            <div key={funnel.id} className="p-6 rounded-3xl bg-[#0F172A] border border-white/10 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">{funnel.name}</h3>
                  <p className="text-xs text-slate-400 font-mono">{funnel.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-400 block">Overall Conversion</span>
                    <span className="text-lg font-black text-emerald-400 font-mono">{funnel.overallConversionRate}%</span>
                  </div>
                </div>
              </div>

              {/* Step Flow Bar Visualization */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {funnel.steps.map((step, sIdx) => (
                  <div key={step.name} className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 space-y-2 relative">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400 font-bold">{step.name}</span>
                      <span className="text-white font-bold">{step.visitors.toLocaleString()}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full" 
                        style={{ width: `${step.conversionRate}%` }} 
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono pt-1 text-slate-400">
                      <span>Conv: <strong className="text-emerald-400">{step.conversionRate}%</strong></span>
                      {sIdx > 0 && (
                        <span className="text-rose-400">Drop: -{step.dropOffRate}%</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Device Comparison Segmentation */}
              <div className="p-3.5 rounded-2xl bg-[#070B14] border border-white/5 flex flex-wrap items-center justify-between text-xs font-mono text-slate-300">
                <span className="flex items-center gap-2">
                  <strong className="text-white">Device Conversion Breakdown:</strong>
                </span>
                <div className="flex items-center gap-4">
                  <span>🖥️ Desktop: <strong className="text-emerald-400">{funnel.deviceBreakdown.desktopConversion}%</strong></span>
                  <span>📱 Mobile: <strong className="text-amber-400">{funnel.deviceBreakdown.mobileConversion}%</strong></span>
                  <span>Gap: <strong className="text-rose-400">-{Math.round((funnel.deviceBreakdown.desktopConversion - funnel.deviceBreakdown.mobileConversion) * 10) / 10}%</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB: BEHAVIOR & RAGE CLICKS */}
      {activeTab === 'behavior' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#0F172A] border border-white/10 space-y-4">
            <div className="border-b border-white/10 pb-3">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-amber-400" /> User Friction & Behavior Anomalies
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Real-time detection of rage clicks, dead taps, form hesitation & unexpected drop-offs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {behaviorIssues.map((issue) => (
                <div 
                  key={issue.id}
                  onClick={() => setSelectedBehaviorIssue(issue)}
                  className="p-5 rounded-2xl bg-[#0B1220] border border-white/10 hover:border-amber-400/40 transition-all cursor-pointer space-y-3 group"
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                      issue.type === 'RAGE_CLICK' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                      issue.type === 'DEAD_CLICK' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    }`}>
                      {issue.type} • {issue.incidentCount} incidents
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                      {issue.deviceAffected}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                      {issue.page}
                    </h4>
                    <p className="text-xs text-slate-400 pt-1 leading-snug">
                      <strong>Selector:</strong> {issue.elementSelector}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-300 space-y-1">
                    <p><strong>Evidence:</strong> {issue.evidence}</p>
                    <p className="text-emerald-400"><strong>Recommended Fix:</strong> {issue.recommendedFix}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: EXPERIMENTS & FEATURE FLAGS */}
      {activeTab === 'experiments' && (
        <div className="space-y-6">
          {/* Active A/B Experiments */}
          <div className="p-6 rounded-3xl bg-[#0F172A] border border-white/10 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-amber-400" /> Active Experiments (GrowthBook Standard)
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Bayesian experimentation engine with strict guardrails, sample sizes & decision rules.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {experiments.map((exp) => (
                <div key={exp.id} className="p-5 rounded-2xl bg-[#0B1220] border border-white/10 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono uppercase font-bold text-amber-400 bg-amber-400/15 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                        {exp.key} • {exp.status}
                      </span>
                      <h4 className="text-base font-bold text-white pt-1">{exp.name}</h4>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-xs text-slate-400 block">Bayesian Win Probability</span>
                      <span className="text-base font-black text-emerald-400">{exp.bayesianWinProb}%</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>Hypothesis:</strong> {exp.hypothesis}
                  </p>

                  {/* Variants Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {exp.variants.map((v) => (
                      <div key={v.id} className={`p-3.5 rounded-xl border ${
                        exp.winnerVariantId === v.id ? 'bg-emerald-500/10 border-emerald-500/40' : 'bg-white/[0.03] border-white/5'
                      } space-y-1.5`}>
                        <div className="flex items-center justify-between text-xs font-mono font-bold">
                          <span className="text-white">{v.name}</span>
                          <span className="text-amber-400">{v.conversionRate}% Conv</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                          <span>{v.conversions} conversions / {v.visitors} visitors</span>
                          {exp.winnerVariantId === v.id && (
                            <span className="text-emerald-400 font-bold">🏆 Confirmed Winner</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Guardrails & Decision */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono pt-2 border-t border-white/5">
                    <span className="text-slate-400">
                      Guardrails: <strong className="text-slate-200">{exp.guardrailMetrics.join(' • ')}</strong>
                    </span>
                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/30">
                      Decision: {exp.decisionRule} (Ship to 100%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Flags Console */}
          <div className="p-6 rounded-3xl bg-[#0F172A] border border-white/10 space-y-4">
            <div className="border-b border-white/10 pb-3">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" /> Feature Flags & Gradual Rollouts
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Control canary rollouts, device cohorts, and instant emergency rollbacks.
              </p>
            </div>

            <div className="space-y-3">
              {featureFlags.map((flag) => (
                <div key={flag.id} className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-white">{flag.name}</span>
                      <span className="text-[10px] font-mono text-slate-400">({flag.key})</span>
                    </div>
                    <p className="text-xs text-slate-400">{flag.description}</p>
                    <span className="text-[10px] font-mono text-amber-400">
                      Rollout: {flag.rolloutPercentage}% • Targets: {flag.targetDevices.join(', ')}
                    </span>
                  </div>

                  <button
                    onClick={() => handleToggleFlag(flag.key, flag.enabled)}
                    className="cursor-pointer p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all shrink-0"
                  >
                    {flag.enabled ? (
                      <ToggleRight className="w-8 h-8 text-emerald-400" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-slate-500" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: AI GROWTH COPILOT */}
      {activeTab === 'copilot' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#0F172A] border border-white/10 space-y-5">
            <div className="border-b border-white/10 pb-3">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Bot className="w-5 h-5 text-amber-400" /> Ask the ASTRO360 Marketing Brain
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Ask growth, conversion, SEO, or user friction questions. Responses are grounded in live telemetry evidence.
              </p>
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                'Why did mobile conversion drop?',
                'Which free tool deserves an SEO page?',
                'What should we test on the landing page hero?',
                'What is our top growth opportunity right now?'
              ].map(prompt => (
                <button
                  key={prompt}
                  onClick={() => {
                    setCopilotQuery(prompt);
                    handleRunCopilot(prompt);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-mono transition-all cursor-pointer"
                >
                  "{prompt}"
                </button>
              ))}
            </div>

            {/* Inquiry Input Bar */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={copilotQuery}
                onChange={(e) => setCopilotQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRunCopilot()}
                placeholder="Ask growth question (e.g. Why are users dropping off before chart completion?)..."
                className="flex-1 px-4 py-3 rounded-2xl bg-[#0B1220] border border-white/10 text-sm text-white focus:outline-none focus:border-amber-400 font-mono"
              />
              <button
                onClick={() => handleRunCopilot()}
                disabled={isCopilotLoading}
                className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 shadow-lg shadow-amber-400/20 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isCopilotLoading ? 'Analyzing...' : 'Inquire'}</span>
              </button>
            </div>

            {/* Copilot Structured Response */}
            {copilotResponse && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-2xl bg-[#090D16] border border-amber-400/30 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-mono text-amber-400 font-bold">
                    Query: "{copilotResponse.query}"
                  </span>
                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/15 px-2.5 py-0.5 rounded border border-emerald-500/30">
                    Epistemic Status: {copilotResponse.epistemicStatus} • Confidence: {copilotResponse.confidence}%
                  </span>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed">
                  {copilotResponse.answer}
                </p>

                {/* Evidence List */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1 text-xs font-mono">
                  <span className="text-amber-400 font-bold block pb-1">Verified Telemetry Evidence:</span>
                  {copilotResponse.evidence.map((ev, i) => (
                    <p key={i} className="text-slate-300">• {ev}</p>
                  ))}
                </div>

                {/* Recommended Action Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-white/5">
                  <span className="text-xs font-mono text-slate-300">
                    Recommended Action: <strong className="text-white">{copilotResponse.recommendedAction}</strong>
                  </span>
                  <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/30 self-start sm:self-auto">
                    Approval Level: {copilotResponse.actionLevel}
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* TAB: SEO & CONTENT MATRIX */}
      {activeTab === 'seo' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#0F172A] border border-white/10 space-y-4">
            <div className="border-b border-white/10 pb-3">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-amber-400" /> SEO Content Gaps & Tool-Bridge Opportunities
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Identifies high-intent queries with high conversion potential to interactive tools.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { topic: 'Vedic Nakshatra Calculator & 27 Lunar Mansions', intent: 'CALCULATOR', vol: '48,000/mo', gap: 'Competitors show static tables; ASTRO360 calculates real-time pada & lord', bridge: 'Connect to Natal Kundli Tool', action: 'BUILD PROGRAMMATIC CLUSTER', priority: 'P0' },
                { topic: 'Ashta Koota 36 Guna Compatibility Matching', intent: 'CALCULATOR', vol: '32,000/mo', gap: 'Competitors give generic scores without dosha cancellation rules', bridge: 'Connect to Synastry Matchmaker', action: 'EXPAND DIRECT-ANSWER CONTENT', priority: 'P1' },
                { topic: 'Daily Panchanga & Auspicious Muhurta Today', intent: 'INFORMATIONAL', vol: '65,000/mo', gap: 'High daily re-query volume requiring fast-loading mobile answers', bridge: 'Connect to Personal Daily Forecast', action: 'OPTIMIZE CORE WEB VITALS', priority: 'P1' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-white">{item.topic}</h4>
                    <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-400/15 px-2 py-0.5 rounded border border-amber-400/30">
                      {item.vol} • {item.intent}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400"><strong>Content Gap:</strong> {item.gap}</p>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 pt-1 border-t border-white/5">
                    <span>Tool Bridge: <strong className="text-cyan-300">{item.bridge}</strong></span>
                    <span className="text-emerald-400 font-bold">{item.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: BRAND RULES & GUARDRAILS */}
      {activeTab === 'rules' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#0F172A] border border-white/10 space-y-4">
            <div className="border-b border-white/10 pb-3">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" /> Brand Positioning Rules & Forbidden Claims
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                AI and growth copy must strictly respect astronomical calculation vs interpretive claims.
              </p>
            </div>

            <div className="space-y-4">
              {MARKETING_BRAND_RULES.map((rule) => (
                <div key={rule.id} className="p-5 rounded-2xl bg-[#0B1220] border border-white/10 space-y-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {rule.rule}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-1">
                      <span className="font-bold block">✅ Allowed Positioning:</span>
                      {rule.allowedExamples.map((ex, i) => (
                        <p key={i}>• "{ex}"</p>
                      ))}
                    </div>
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 space-y-1">
                      <span className="font-bold block">❌ Strictly Forbidden:</span>
                      {rule.forbiddenExamples.map((ex, i) => (
                        <p key={i}>• "{ex}"</p>
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] font-mono text-slate-400 italic">
                    Rationale: {rule.rationale}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal for Selected Opportunity */}
      <AnimatePresence>
        {selectedOpportunity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-2xl w-full bg-[#0F172A] border border-amber-400/40 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/15 px-2.5 py-1 rounded-lg border border-amber-400/30">
                    {selectedOpportunity.priority} • ICE: {selectedOpportunity.iceScore}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white">{selectedOpportunity.title}</h3>
                </div>
                <button onClick={() => setSelectedOpportunity(null)} className="p-1 text-slate-400 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#090D16] border border-white/10 space-y-1">
                  <span className="font-mono font-bold text-amber-400 block">Observed Evidence:</span>
                  {selectedOpportunity.evidence.map((ev, i) => (
                    <p key={i} className="text-slate-300">• {ev}</p>
                  ))}
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-1">
                  <span className="font-bold block">Recommended Engineering Fix:</span>
                  <p>{selectedOpportunity.recommendedFix}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 space-y-1">
                  <span className="font-bold block">Expected Measurable Outcome:</span>
                  <p>{selectedOpportunity.expectedOutcome}</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10">
                <span className="text-xs font-mono text-slate-400">
                  Required Action Level: <strong className="text-white">{selectedOpportunity.actionLevel}</strong>
                </span>
                <button
                  onClick={() => setSelectedOpportunity(null)}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs font-mono cursor-pointer shadow-lg shadow-amber-400/20"
                >
                  Approve & Queue Implementation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}