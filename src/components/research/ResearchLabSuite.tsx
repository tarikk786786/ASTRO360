import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FlaskConical, CheckCircle2, AlertTriangle, ShieldCheck, Scale, 
  Layers, Clock, Download, RefreshCcw, BookOpen, Compass, ChevronRight
} from 'lucide-react';
import { ASTROLOGY_ENGINE_REGISTRY, PredictionCategory } from '../../lib/prediction/engineRegistry';
import { AgreementEngine, EngineFinding } from '../../lib/prediction/agreementEngine';
import { ResearchEngine, MasterPredictionResult } from '../../lib/prediction/researchEngine';
import type { UserProfile } from '../../types';

export interface ResearchLabSuiteProps {
  userProfile?: UserProfile;
  className?: string;
}

export default function ResearchLabSuite({ userProfile, className = '' }: ResearchLabSuiteProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'engines' | 'timeline' | 'evidence' | 'rules' | 'reproducibility'>('overview');
  const [selectedCategory, setSelectedCategory] = useState<PredictionCategory>('CAREER');

  // Simulated live normalized findings from independent engines
  const liveFindings: EngineFinding[] = useMemo(() => [
    {
      engineId: 'vedic_parashari',
      category: 'CAREER',
      eventType: 'PROMOTION_THEME',
      direction: 'SUPPORTIVE',
      strength: 0.94,
      start: '2026-09-01',
      peak: '2026-09-28',
      end: '2026-10-31',
      precision: 'MONTH',
      factors: ['10th Kendra Surya Activation', 'Jupiter 5th Drishti on Lagna'],
      rules: ['BPHS Ch. 34 Sl. 14', 'Phaladeepika Ch. 16'],
      evidence: ['Sun-Mars trine in D10 Dashamsha'],
      contradictions: ['Saturn 8th house transit demands audit'],
      confidence: 0.92,
      stability: 'HIGH',
      assumptions: ['True Lahiri Ayanamsha 24.18°'],
      version: '2.4.0'
    },
    {
      engineId: 'western_tropical',
      category: 'CAREER',
      eventType: 'PROMOTION_THEME',
      direction: 'SUPPORTIVE',
      strength: 0.91,
      start: '2026-09-10',
      peak: '2026-09-25',
      end: '2026-10-20',
      precision: 'DAY',
      factors: ['Sun sextile Mars across Air/Fire', 'Jupiter trine Midheaven'],
      rules: ['Ptolemy Tetrabiblos Book III'],
      evidence: ['Harmonic angular trine'],
      contradictions: [],
      confidence: 0.89,
      stability: 'HIGH',
      assumptions: ['Placidus House Cusps'],
      version: '2.1.0'
    },
    {
      engineId: 'kp_stellar',
      category: 'CAREER',
      eventType: 'PROMOTION_THEME',
      direction: 'SUPPORTIVE',
      strength: 0.96,
      start: '2026-09-12',
      peak: '2026-09-24',
      end: '2026-10-05',
      precision: 'DAY',
      factors: ['10th Cusp Sub-Lord linked to 2, 6, 11'],
      rules: ['KP Reader III Page 142'],
      evidence: ['Sub-lord Mercury in Star of Sun'],
      contradictions: [],
      confidence: 0.95,
      stability: 'HIGH',
      assumptions: ['249 Sub Divisions'],
      version: '1.9.0'
    },
    {
      engineId: 'jaimini_sutras',
      category: 'CAREER',
      eventType: 'PROMOTION_THEME',
      direction: 'SUPPORTIVE',
      strength: 0.89,
      start: '2026-09-01',
      peak: '2026-10-01',
      end: '2026-11-15',
      precision: 'MONTH',
      factors: ['Atmakaraka Sun aspecting 5th/9th Trikona'],
      rules: ['Jaimini Upadesha Adhyaya 1'],
      evidence: ['AK-AmK Mutual Aspect'],
      contradictions: ['Rahu Argala on 10th Arudha'],
      confidence: 0.88,
      stability: 'MODERATE',
      assumptions: ['7 Karaka Scheme'],
      version: '1.8.0'
    },
    {
      engineId: 'chinese_bazi',
      category: 'CAREER',
      eventType: 'PROMOTION_THEME',
      direction: 'SUPPORTIVE',
      strength: 0.88,
      start: '2026-08-15',
      peak: '2026-09-20',
      end: '2026-10-15',
      precision: 'MONTH',
      factors: ['Day Master Yang Metal supported by Earth & Fire'],
      rules: ['San Ming Tong Hui'],
      evidence: ['Resource and Output Harmony'],
      contradictions: [],
      confidence: 0.87,
      stability: 'HIGH',
      assumptions: ['Solar Term Calendar'],
      version: '1.6.0'
    }
  ], []);

  const masterPrediction = useMemo(() => {
    return ResearchEngine.generateMasterPrediction(
      'When is my peak career progression and contract window in 2026?',
      selectedCategory,
      liveFindings
    );
  }, [selectedCategory, liveFindings]);

  return (
    <div className={`w-full max-w-6xl mx-auto space-y-6 text-left select-none font-sans pb-12 ${className}`}>
      
      {/* ── 1. RESEARCH LAB HEADER ──────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-[#111315] border border-white/[0.08] shadow-2xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-white/[0.08] text-amber-300 text-xs font-mono font-bold">
            <FlaskConical className="w-3.5 h-3.5 text-amber-400" />
            <span>ASTRO360 Multi-Engine Research & Consensus Suite</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1.5 font-sans">
            RESEARCH LAB & BACKTEST MATRIX
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans mt-0.5">
            Transparent cross-tradition concordance evaluation grounded on NASA JPL DE440 sub-arcsecond ephemeris.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-white/[0.08] overflow-x-auto no-scrollbar">
          {(['CAREER', 'WEALTH', 'RELATIONSHIP', 'TIMING'] as const).map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-black shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── 2. RESEARCH NAVIGATION TABS ─────────────────────────────── */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: '📊 Overview & Agreement' },
          { id: 'engines', label: '⚙️ 5 Participating Engines' },
          { id: 'timeline', label: '⏳ Overlap Timeline' },
          { id: 'evidence', label: '📜 Evidence Factors' },
          { id: 'rules', label: '🏛️ Classical Rules' },
          { id: 'reproducibility', label: '🔒 Reproducibility' },
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === tab.id
                ? 'bg-amber-400/20 text-amber-300 border border-white/[0.08]'
                : 'text-slate-400 hover:text-white bg-white/[0.02]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── 3. TAB CONTENT ─────────────────────────────────────────── */}
      
      {/* TAB: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Agreement Metric Card */}
            <div className="p-5 rounded-2xl bg-[#111315] border border-white/[0.08] space-y-2">
              <span className="text-xs font-mono text-slate-400 block font-bold">CROSS-ENGINE AGREEMENT</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-emerald-400 font-mono">
                  {masterPrediction.agreement.agreementPercent}%
                </span>
                <span className="text-xs font-mono font-bold text-slate-300">
                  {masterPrediction.agreement.agreementLevel}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                {masterPrediction.agreement.interpretationStatement}
              </p>
            </div>

            {/* Timing Overlap Card */}
            <div className="p-5 rounded-2xl bg-[#111315] border border-white/[0.08] space-y-2">
              <span className="text-xs font-mono text-slate-400 block font-bold">COMMON TIMING WINDOW</span>
              <div className="text-xl font-bold text-white font-mono">
                {masterPrediction.agreement.commonTimeWindow?.start} → {masterPrediction.agreement.commonTimeWindow?.end}
              </div>
              <span className="text-[11px] font-mono text-cyan-300 block">
                {masterPrediction.agreement.timingAgreementPercent}% Window Overlap Concordance
              </span>
            </div>

            {/* Stability & Data Quality Card */}
            <div className="p-5 rounded-2xl bg-[#111315] border border-white/[0.08] space-y-2">
              <span className="text-xs font-mono text-slate-400 block font-bold">DATA QUALITY & STABILITY</span>
              <div className="flex items-center gap-2 text-sm font-bold text-white font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{masterPrediction.stabilityScore} STABILITY</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400 block">
                Ephemeris: {masterPrediction.dataQuality.ephemerisPrecision}
              </span>
            </div>
          </div>

          {/* Executive Answer Card */}
          <div className="p-6 rounded-3xl bg-[#111315] border border-white/[0.08] space-y-3">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white font-mono">RESEARCH SYNTHESIS & EXECUTIVE SUMMARY</h3>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-sans">
              {masterPrediction.executiveAnswer}
            </p>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs font-mono text-slate-400">
              ⚠️ <strong>Scientific Disclaimer:</strong> Engine agreement measures directional consensus among classical astronomical frameworks. It does NOT represent empirical probability or guaranteed real-world outcomes.
            </div>
          </div>
        </div>
      )}

      {/* TAB: ENGINES */}
      {activeTab === 'engines' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {liveFindings.map(f => {
            const reg = ASTROLOGY_ENGINE_REGISTRY[f.engineId];
            return (
              <div key={f.engineId} className="p-5 rounded-2xl bg-[#111315] border border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                  <div>
                    <h4 className="text-sm font-bold text-white font-sans">{reg?.name || f.engineId}</h4>
                    <span className="text-[10px] font-mono text-slate-400">{reg?.school} • v{f.version}</span>
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-white/[0.08]">
                    {f.direction} ({Math.round(f.strength * 100)}%)
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="text-slate-400 font-mono">Timing: <strong className="text-white">{f.start} → {f.end}</strong></div>
                  <div className="text-slate-400 font-mono">Primary Factor: <span className="text-amber-300">{f.factors[0]}</span></div>
                  <div className="text-slate-400 font-mono">Rule Citation: <span className="text-slate-300">{f.rules[0]}</span></div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB: TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="p-6 rounded-3xl bg-[#111315] border border-white/[0.08] space-y-4">
          <h3 className="text-sm font-bold text-white font-mono">CROSS-ENGINE EVENT WINDOW ALIGNMENT</h3>
          <div className="space-y-3 pt-2">
            {liveFindings.map(f => (
              <div key={f.engineId} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 font-bold">{f.engineId}</span>
                  <span className="text-slate-400">{f.start} to {f.end}</span>
                </div>
                <div className="w-full h-3 rounded-full bg-white/[0.04] overflow-hidden relative">
                  <div className="absolute top-0 bottom-0 left-[20%] right-[30%] bg-amber-400 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: EVIDENCE */}
      {activeTab === 'evidence' && (
        <div className="p-6 rounded-3xl bg-[#111315] border border-white/[0.08] space-y-4">
          <h3 className="text-sm font-bold text-white font-mono">DETERMINISTIC EVIDENCE FACTORS</h3>
          <div className="space-y-2">
            {masterPrediction.evidenceFactors.map((ev, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <span className="font-mono text-amber-300 font-bold block">{ev.engine}</span>
                  <span className="text-slate-200">{ev.factor}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-white/[0.04] px-2 py-1 rounded-md border border-white/[0.06]">
                  {ev.rule}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: RULES */}
      {activeTab === 'rules' && (
        <div className="p-6 rounded-3xl bg-[#111315] border border-white/[0.08] space-y-4">
          <h3 className="text-sm font-bold text-white font-mono">CLASSICAL SCRIPTURE CITATIONS & RULES</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {Object.values(ASTROLOGY_ENGINE_REGISTRY).map(reg => (
              <div key={reg.engineId} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-1.5">
                <span className="font-mono font-bold text-white block">{reg.name}</span>
                <p className="text-slate-400 text-[11px] font-mono">Source: {reg.source}</p>
                <p className="text-slate-400 text-[11px] font-mono">Rule Set: {reg.ruleSetVersion}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {reg.techniques.map(t => (
                    <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-slate-300 border border-white/[0.04]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: REPRODUCIBILITY */}
      {activeTab === 'reproducibility' && (
        <div className="p-6 rounded-3xl bg-[#111315] border border-white/[0.08] space-y-4 text-xs font-mono">
          <h3 className="text-sm font-bold text-white font-mono">RESEARCH REPRODUCIBILITY MANIFEST</h3>
          <div className="p-4 rounded-2xl bg-[#090A0C] border border-white/[0.06] text-slate-300 space-y-2">
            <div>Dataset Version: <span className="text-amber-400">{masterPrediction.reproducibility.datasetVersion}</span></div>
            <div>Ephemeris Kernel: <span className="text-cyan-300">{masterPrediction.reproducibility.ephemerisVersion}</span></div>
            <div>Ayanamsha Framework: <span className="text-emerald-400">{masterPrediction.reproducibility.ayanamsha}</span></div>
            <div>Timestamp: <span className="text-slate-400">{masterPrediction.reproducibility.runTimestamp}</span></div>
            <div>Deterministic Config Hash: <span className="text-slate-400">{masterPrediction.reproducibility.configHash}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}
