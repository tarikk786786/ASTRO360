/**
 * ASTRO360 OMNI - Research, Comparative & Explainability Suite
 * Implements PRD Section 17, 37-43, 74, 89, 108 ("Why?" Explainability),
 * and 109 ("Compare Systems" Consensus & Contradiction Matrix).
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Layers,
  Cpu,
  BookOpen,
  GitCompare,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Code,
  Download,
  Copy,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Scale
} from 'lucide-react';
import { CanonicalAstroSchema, EventOntologyCategory } from '../lib/schema/canonicalAstroSchema';
import { AstroCoreOrchestrator } from '../lib/astroCoreOrchestrator';
import { ASTRO360_ENGINE_REGISTRY, getEngineStats } from '../lib/engineRegistry';

interface AstroOmniResearchSuiteProps {
  userProfile?: {
    name: string;
    dob: string;
    time: string;
    location: string;
    latitude?: number;
    longitude?: number;
    timezone?: string;
  };
}

export const AstroOmniResearchSuite: React.FC<AstroOmniResearchSuiteProps> = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState<'consensus' | 'explainability' | 'schema' | 'registry'>('consensus');
  const [selectedFocus, setSelectedFocus] = useState<EventOntologyCategory>('CAREER_CHANGE');
  const [copied, setCopied] = useState(false);

  const schemaOutput: CanonicalAstroSchema = React.useMemo(() => {
    return AstroCoreOrchestrator.executePipeline({
      name: userProfile?.name || 'Cosmic Seeker',
      dob: userProfile?.dob || '1998-06-15',
      time: userProfile?.time || '12:00',
      location: userProfile?.location || 'London, UK',
      latitude: userProfile?.latitude || 51.5074,
      longitude: userProfile?.longitude || -0.1278,
      timezone: userProfile?.timezone || 'UTC',
      primaryFocus: selectedFocus
    });
  }, [userProfile, selectedFocus]);

  const stats = getEngineStats();
  const consensusItem = schemaOutput.consensus[0];
  const predictionItem = schemaOutput.predictions[0];
  const confidence = schemaOutput.confidence;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(schemaOutput, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-indigo-500/30 shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 mb-1.5">
              <Layers className="w-5 h-5 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-wider uppercase">
                ASTRO360 OMNI • Deterministic Multi-Tradition Research Core
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Explainable <span className="gradient-text">Astrology Intelligence & Consensus</span>
            </h1>
            <p className="text-xs text-slate-300 mt-2 max-w-3xl leading-relaxed">
              Auditable planetary ephemeris math, classical rule provenance (Tier 1/2 source texts), 
              cross-tradition consensus/contradiction matrix, and non-fatalistic calibrated confidence.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 shrink-0">
            <div className="px-3.5 py-2 rounded-2xl bg-slate-900/90 border border-indigo-500/40 flex items-center gap-2 text-xs font-mono text-indigo-300">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>{stats.productionEngines} Engines Production</span>
            </div>
            <div className="px-3.5 py-2 rounded-2xl bg-slate-900/90 border border-emerald-500/40 flex items-center gap-2 text-xs font-mono text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{stats.totalTests}+ Validated Tests</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-8 border-b border-white/10 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('consensus')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'consensus'
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <GitCompare className="w-4 h-4" />
            <span>Cross-System Consensus (Compare Mode)</span>
          </button>

          <button
            onClick={() => setActiveTab('explainability')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'explainability'
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>"Why?" Rule Provenance</span>
          </button>

          <button
            onClick={() => setActiveTab('schema')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'schema'
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Canonical Astro Schema (JSON)</span>
          </button>

          <button
            onClick={() => setActiveTab('registry')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'registry'
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Engine Maturity Registry</span>
          </button>
        </div>
      </div>

      {/* Focus Category Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-bold text-slate-300">Target Prediction & Event Domain:</span>
        </div>
        <select
          value={selectedFocus}
          onChange={(e) => setSelectedFocus(e.target.value as EventOntologyCategory)}
          className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-1.5 text-xs text-indigo-300 font-mono focus:outline-none focus:border-indigo-500"
        >
          <option value="CAREER_CHANGE">CAREER CHANGE & VOCATIONAL ELEVATION</option>
          <option value="PROMOTION">PROMOTION & EXECUTIVE APPOINTMENT</option>
          <option value="PUBLIC_RECOGNITION">PUBLIC RECOGNITION & REPUTATION</option>
          <option value="MARRIAGE_THEME">RELATIONSHIP & MARRIAGE THEME</option>
          <option value="FINANCIAL_THEME">FINANCIAL GROWTH & MATERIAL CAPITAL</option>
          <option value="RELOCATION">GEOGRAPHIC RELOCATION & TRAVEL</option>
        </select>
      </div>

      {/* Tab 1: Cross-System Consensus & Contradictions */}
      {activeTab === 'consensus' && (
        <div className="space-y-6">
          {/* Top Consensus Summary Card */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-indigo-500/30 space-y-4 bg-slate-950/70">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">
                  Synthesis Matrix (PRD Section 42)
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                  {selectedFocus.replace(/_/g, ' ')} Multi-Tradition Ensemble
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">Consensus Level:</span>
                <span className="px-3 py-1 rounded-xl text-xs font-bold font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {consensusItem.consensusLevel}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed font-sans">
              {consensusItem.overallDirection}
            </p>

            {/* Tradition Views Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {consensusItem.traditionViews.map((tv, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase">
                        {tv.tradition}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        {tv.strength}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-100 mt-1">{tv.theme}</h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-white/5">
                    {tv.specificManifestation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Explicit Contradiction & Resolution Panel (PRD Section 43) */}
          {consensusItem.explicitContradictions.length > 0 && (
            <div className="glass-card p-6 rounded-3xl border border-amber-500/30 space-y-4 bg-amber-950/10">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Explicit Traditional Divergence Detected & Resolved (Zero Masking)</span>
              </div>
              {consensusItem.explicitContradictions.map((ec, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/20 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">[{ec.traditionA.toUpperCase()} PERSPECTIVE]</span>
                      <p className="text-xs text-slate-200 mt-1">{ec.viewA}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">[{ec.traditionB.toUpperCase()} PERSPECTIVE]</span>
                      <p className="text-xs text-slate-200 mt-1">{ec.viewB}</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 leading-relaxed">
                    <span className="font-bold text-indigo-300">Methodological Resolution: </span>
                    {ec.resolutionNote}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Calibrated Confidence Model Dashboard (PRD Section 40-41) */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Six-Factor Verification</span>
                <h3 className="text-lg font-bold text-white">Calibrated Model Confidence</h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold font-mono text-indigo-400">
                  {Number((confidence?.overallModelConfidence ?? 0) * 100).toFixed(0)}%
                </span>
                <span className="text-[10px] block font-mono text-slate-400">Calibrated Score</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
                <span className="text-[10px] font-mono text-slate-400">Input Quality</span>
                <div className="text-sm font-bold font-mono text-emerald-400">{Number((confidence?.inputQuality ?? 0) * 100).toFixed(0)}%</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
                <span className="text-[10px] font-mono text-slate-400">Astro Precision</span>
                <div className="text-sm font-bold font-mono text-emerald-400">{Number((confidence?.astronomicalPrecision ?? 0) * 100).toFixed(0)}%</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
                <span className="text-[10px] font-mono text-slate-400">Rule Reliability</span>
                <div className="text-sm font-bold font-mono text-indigo-400">{Number((confidence?.ruleReliability ?? 0) * 100).toFixed(0)}%</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
                <span className="text-[10px] font-mono text-slate-400">Timing Precision</span>
                <div className="text-sm font-bold font-mono text-indigo-400">{Number((confidence?.timingPrecision ?? 0) * 100).toFixed(0)}%</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
                <span className="text-[10px] font-mono text-slate-400">Consensus Agree</span>
                <div className="text-sm font-bold font-mono text-emerald-400">{Number((confidence?.crossSystemAgreement ?? 0) * 100).toFixed(0)}%</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
                <span className="text-[10px] font-mono text-slate-400">Historical Val</span>
                <div className="text-sm font-bold font-mono text-amber-400">{Number((confidence?.historicalValidation ?? 0) * 100).toFixed(0)}%</div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic pt-1">
              * {confidence.disclaimer}
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: "Why?" Explainability & Rule Provenance (PRD Section 38, 108) */}
      {activeTab === 'explainability' && (
        <div className="space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-indigo-500/30 space-y-6 bg-slate-950/70">
            <div>
              <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">
                Auditable Rule Provenance (PRD Section 38)
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                Why was this prediction generated?
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Every calculation and forecast is grounded in verified classical manuscripts and deterministic celestial positions.
              </p>
            </div>

            <div className="space-y-4">
              {predictionItem.rulesTriggered.map((rule, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded border border-indigo-500/20">
                        {rule.ruleId}
                      </span>
                      <span className="text-xs font-semibold text-slate-200">
                        {rule.school} ({rule.tradition.toUpperCase()})
                      </span>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-bold">
                      Weight: {Number((rule.weight ?? 0) * 100).toFixed(0)}%
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 font-bold block mb-1">Astronomical Trigger:</span>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-200">
                        {rule.astronomicalFactors.map((af, i) => (
                          <li key={i}>{af}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold block mb-1">Timing Window:</span>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-200">
                        {rule.timingFactors.map((tf, i) => (
                          <li key={i}>{tf}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/5">
                    <span className="text-[11px] font-bold text-slate-400 block mb-1">Classical Source Provenance:</span>
                    <div className="flex flex-wrap gap-2">
                      {rule.sources.map((src, i) => (
                        <span key={i} className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                          📖 Tier {src.tier}: {src.text} {src.chapter ? `(${src.chapter})` : ''} {src.author ? `— ${src.author}` : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Canonical Astro Schema (PRD Section 17) */}
      {activeTab === 'schema' && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-indigo-500/30 space-y-4 bg-slate-950">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">
                Deterministic Output Schema (PRD Section 17)
              </span>
              <h2 className="text-xl font-bold text-white">CanonicalAstroSchema v3.0.0</h2>
            </div>
            <button
              onClick={handleCopyJson}
              className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-500/20"
            >
              {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied JSON' : 'Copy Full JSON'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-emerald-400 font-mono text-xs overflow-x-auto max-h-[500px] leading-relaxed">
            {JSON.stringify(schemaOutput, null, 2)}
          </pre>
        </div>
      )}

      {/* Tab 4: Engine Maturity Registry (PRD Section 89, 90) */}
      {activeTab === 'registry' && (
        <div className="space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-indigo-500/30 space-y-6 bg-slate-950/70">
            <div>
              <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">
                ASTRO360 Engine Index (PRD Section 89)
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                Engine Maturity & Precision Registry
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Transparency catalog tracking maturity stage, automated unit test coverage, and source citations for every calculation module.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ASTRO360_ENGINE_REGISTRY.map((eng) => (
                <div key={eng.id} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">{eng.tradition}</span>
                      <h3 className="text-base font-bold text-white">{eng.name}</h3>
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${
                      eng.status === 'PRODUCTION'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                    }`}>
                      {eng.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{eng.description}</p>

                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5 text-[11px] font-mono text-slate-400">
                    <span className="text-indigo-400 font-bold">{eng.testCount} Tests</span>
                    <span>•</span>
                    <span>Tolerance: ±{eng.precisionToleranceDeg}°</span>
                    <span>•</span>
                    <span className="text-emerald-400">{eng.license}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
