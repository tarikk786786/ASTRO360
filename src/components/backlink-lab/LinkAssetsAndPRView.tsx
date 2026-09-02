import React from 'react';
import { Sparkles, ArrowRight, ExternalLink, Globe, Layers, BookOpen, Clock, Activity } from 'lucide-react';
import { LinkableAsset, DigitalPRStory } from '../../lib/backlink-lab/types';

interface LinkAssetsAndPRViewProps {
  assets: LinkableAsset[];
  prStories: DigitalPRStory[];
  onNavigateToTarget?: (url: string) => void;
}

export default function LinkAssetsAndPRView({
  assets,
  prStories,
  onNavigateToTarget
}: LinkAssetsAndPRViewProps) {
  return (
    <div className="space-y-8 font-sans text-left">
      {/* ─── SECTION 1: LINKABLE ASSETS ─────────────────────────────────── */}
      <div className="space-y-3">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            High-Value Linkable Assets in ASTRO360
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            Answering: <span className="text-cyan-400 italic">"Why would an authoritative publisher legitimately want to link to this?"</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 font-mono text-xs">
          {assets.map(asset => (
            <div
              key={asset.id}
              className="p-4 sm:p-5 rounded-2xl bg-[#0E172A] border border-white/10 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] text-cyan-300 bg-cyan-500/10 border border-white/[0.08] px-2 py-0.5 rounded font-bold">
                    {asset.type}
                  </span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold">
                    {asset.conversionValue} VALUE
                  </span>
                </div>

                <h4 className="font-bold text-white text-sm leading-snug">
                  {asset.title}
                </h4>

                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {asset.whyLinkable}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 space-y-2">
                <div className="text-[10px] text-slate-400">
                  Target Audiences: {asset.targetAudience.join(', ')}
                </div>

                <button
                  onClick={() => onNavigateToTarget?.(asset.path)}
                  className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-300 border border-white/10 text-xs flex items-center justify-center gap-1.5 cursor-pointer font-bold transition-colors"
                >
                  <span>Explore Asset ({asset.path})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── SECTION 2: DIGITAL PR & DATA HOOKS ─────────────────────────── */}
      <div className="space-y-3 pt-4 border-t border-white/10">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Digital PR & Astronomical Story Angles
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            Data-backed seasonal and celestial stories crafted for media journalists and industry editors.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3.5 font-mono text-xs">
          {prStories.map(story => (
            <div
              key={story.id}
              className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#0B1220] via-[#0E172A] to-[#0B1220] border border-purple-500/30 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
                <span className="text-sm font-bold text-white">{story.storyAngle}</span>
                <span className="text-[10px] text-purple-300 bg-purple-500/10 border border-purple-500/30 px-2 py-0.5 rounded font-bold shrink-0">
                  {story.seasonalHook}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-slate-300">
                <div className="space-y-1">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Supporting Asset:</span>
                  <span className="text-cyan-300 font-bold">{story.supportingAstroAsset} ({story.targetAstroUrl})</span>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Target Outlets:</span>
                  <span className="text-slate-200">{story.targetPublications.join(' • ')}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] space-y-1">
                <span className="text-cyan-400 font-bold block text-[10px] uppercase">Sample Media Pitch Hook:</span>
                <p className="text-slate-300 italic leading-relaxed">
                  "{story.samplePitchHook}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
