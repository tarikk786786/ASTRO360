import React, { useState } from 'react';
import { 
  X, Upload, FileText, CheckCircle2, AlertTriangle, 
  Sparkles, Database, ArrowRight 
} from 'lucide-react';
import { motion } from 'motion/react';
import { parseGSCData, summarizeGSCData } from '../../lib/seo-lab/gscEngine';
import { GSCMetricData } from '../../lib/seo-lab/types';

interface GSCImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (data: GSCMetricData[]) => void;
}

const SAMPLE_GSC_CSV = `Top queries,Clicks,Impressions,CTR,Position
birth chart calculator,145,3400,4.26%,4.8
free kundli online,210,5200,4.04%,3.2
nakshatra finder by date of birth,85,2100,4.05%,7.4
vimshottari dasha calculator,42,1800,2.33%,9.1
ashta koota matching,18,950,1.89%,11.3
sade sati calculator,64,2800,2.29%,6.7
saturn transit 2026 effects,92,4100,2.24%,8.5
today panchang tithi,180,6400,2.81%,2.9
gemstone recommendation vedic,35,1450,2.41%,12.1
navamsha d9 chart calculator,28,1100,2.55%,10.4`;

export default function GSCImportModal({
  isOpen,
  onClose,
  onImport
}: GSCImportModalProps) {
  const [rawText, setRawText] = useState('');
  const [parsedItems, setParsedItems] = useState<GSCMetricData[]>([]);

  if (!isOpen) return null;

  const handleParse = (text: string) => {
    setRawText(text);
    const parsed = parseGSCData(text);
    setParsedItems(parsed);
  };

  const handleLoadSample = () => {
    handleParse(SAMPLE_GSC_CSV);
  };

  const handleConfirm = () => {
    if (parsedItems.length > 0) {
      onImport(parsedItems);
      onClose();
    }
  };

  const summary = summarizeGSCData(parsedItems);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-[#0B1220] border border-cyan-500/40 shadow-2xl space-y-5 text-left text-xs my-8"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="border-b border-white/10 pb-3 space-y-1">
          <span className="text-[10px] font-bold font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/30">
            FIRST-PARTY DATA INGESTION
          </span>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Connect Google Search Console (GSC) Performance
          </h3>
          <p className="text-slate-400 text-xs">
            Paste your Google Search Console performance export (CSV or JSON). ASTRO360 will match queries to spot striking-distance opportunities and low-CTR pages.
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between gap-2">
          <label className="text-slate-300 font-bold font-mono">
            Paste CSV or JSON Rows
          </label>
          <button
            type="button"
            onClick={handleLoadSample}
            className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono text-[11px] flex items-center gap-1 transition-all cursor-pointer"
          >
            <Sparkles className="w-3 h-3" /> Load Sample ASTRO360 GSC Export
          </button>
        </div>

        {/* Text Area */}
        <textarea
          rows={6}
          value={rawText}
          onChange={(e) => handleParse(e.target.value)}
          placeholder={`Top queries,Clicks,Impressions,CTR,Position\nbirth chart calculator,145,3400,4.2%,4.8...`}
          className="w-full p-3 rounded-2xl bg-black/50 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 custom-scrollbar"
        />

        {/* Summary Card if data parsed */}
        {parsedItems.length > 0 && (
          <div className="p-4 rounded-2xl bg-black/40 border border-cyan-500/30 space-y-3 font-mono">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-2 rounded-xl bg-white/[0.02]">
                <span className="text-slate-400 text-[10px] block">Queries</span>
                <span className="text-white font-bold text-base">{summary.totalQueries}</span>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.02]">
                <span className="text-slate-400 text-[10px] block">Total Impressions</span>
                <span className="text-cyan-300 font-bold text-base">{summary.totalImpressions.toLocaleString()}</span>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.02]">
                <span className="text-slate-400 text-[10px] block">Avg Position</span>
                <span className="text-amber-300 font-bold text-base">{summary.avgPosition}</span>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.02]">
                <span className="text-slate-400 text-[10px] block">Striking Distance</span>
                <span className="text-emerald-400 font-bold text-base">{summary.strikingDistanceCount}</span>
              </div>
            </div>

            <p className="text-[11px] text-emerald-400 font-sans flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Parsed {parsedItems.length} first-party queries successfully. Ready to combine with keyword mining.</span>
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 font-mono text-xs cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={parsedItems.length === 0}
            onClick={handleConfirm}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold font-mono text-xs shadow-lg shadow-cyan-500/25 flex items-center gap-2 cursor-pointer"
          >
            <span>Apply First-Party Data</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
