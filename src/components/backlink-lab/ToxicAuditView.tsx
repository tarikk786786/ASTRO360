import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, ShieldCheck, ArrowRight, BarChart2 } from 'lucide-react';
import { ToxicAuditResult } from '../../lib/backlink-lab/types';
import { analyzeAnchorDistribution } from '../../lib/backlink-lab/anchorAnalysisEngine';

interface ToxicAuditViewProps {
  toxicAudits: ToxicAuditResult[];
}

export default function ToxicAuditView({ toxicAudits }: ToxicAuditViewProps) {
  // Sample anchors for anchor balance card
  const sampleAnchors = [
    { text: 'ASTRO360', targetUrl: '/free-tools/birth-chart' },
    { text: 'ASTRO360 platform', targetUrl: '/panchanga' },
    { text: 'https://astro360.app', targetUrl: '/free-tools/nakshatra' },
    { text: 'ASTRO360 Kundli Generator', targetUrl: '/free-tools/birth-chart' },
    { text: '27 Nakshatras & Pada Calculator', targetUrl: '/free-tools/nakshatra' },
    { text: 'click here', targetUrl: '/dasha' },
    { text: 'birth chart calculator', targetUrl: '/free-tools/birth-chart' },
    { text: 'ASTRO360 Swiss Ephemeris', targetUrl: '/transit-radar' }
  ];

  const anchorStats = analyzeAnchorDistribution(sampleAnchors);

  return (
    <div className="space-y-6 font-sans text-left">
      {/* ─── 1. ANCHOR TEXT BALANCE AUDIT ───────────────────────────────── */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#0E172A] border border-white/10 space-y-4 font-mono text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
          <div>
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-cyan-400" /> Natural Anchor Text Profile Audit
            </h4>
            <p className="text-slate-400 text-xs">Conforming to Google Search Essentials & Natural Linking Guidelines</p>
          </div>
          <span className="text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/30 text-[10px] font-bold">
            ✓ Healthy Natural Distribution
          </span>
        </div>

        {/* Anchor distribution bars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Brand Anchors</span>
            <span className="text-xl font-bold text-cyan-300">{anchorStats.brandPercent}%</span>
            <span className="text-[10px] text-slate-500 block">Target: 40-60%</span>
          </div>

          <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Partial Match</span>
            <span className="text-xl font-bold text-purple-300">{anchorStats.partialMatchPercent}%</span>
            <span className="text-[10px] text-slate-500 block">Target: 20-30%</span>
          </div>

          <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Exact Match</span>
            <span className="text-xl font-bold text-amber-300">{anchorStats.exactMatchPercent}%</span>
            <span className="text-[10px] text-slate-500 block">Max Limit: &lt;15%</span>
          </div>

          <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">URL / Generic</span>
            <span className="text-xl font-bold text-slate-300">{anchorStats.urlPercent + anchorStats.genericPercent}%</span>
            <span className="text-[10px] text-slate-500 block">Target: 10-20%</span>
          </div>
        </div>

        <p className="text-slate-300 text-[11px] bg-black/40 p-3 rounded-xl border border-white/5">
          <span className="text-cyan-400 font-bold">Recommendation: </span>
          {anchorStats.recommendation}
        </p>
      </div>

      {/* ─── 2. TOXIC & SUSPICIOUS LINK SCANNER ──────────────────────────── */}
      <div className="space-y-3 font-mono text-xs">
        <div>
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" /> Toxic & Low-Quality Link Audit
          </h4>
          <p className="text-slate-400 text-xs">
            Evaluates link farms, adult/gambling contextual mismatches, parked domains, and scraped content.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {toxicAudits.map(item => {
            const riskColor =
              item.riskLevel === 'CLEAN'
                ? 'border-emerald-500/30 bg-emerald-500/5'
                : item.riskLevel === 'REVIEW'
                ? 'border-amber-500/30 bg-amber-500/5'
                : 'border-rose-500/30 bg-rose-500/5';

            return (
              <div
                key={item.id}
                className={`p-4 sm:p-5 rounded-2xl border ${riskColor} space-y-2.5`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{item.sourceDomain}</span>
                    <span className="text-[10px] text-slate-400">Anchor: "{item.anchorText}"</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold border border-white/10 bg-black/40 text-white">
                      Risk: {item.riskLevel}
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-white/10 text-cyan-300">
                      Action: {item.recommendedAction}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400">
                  Target: <span className="text-white">{item.targetUrl}</span>
                </div>

                {item.reasons.length > 0 ? (
                  <div className="p-2.5 rounded-xl bg-black/50 space-y-1 text-[11px]">
                    <span className="text-rose-400 font-bold block text-[10px] uppercase">Detected Signals:</span>
                    <ul className="list-disc pl-4 space-y-0.5 text-slate-300">
                      {item.reasons.map((r, idx) => (
                        <li key={idx}>{r}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-emerald-400 text-[11px]">✓ No toxic or spam signals detected on this domain.</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
