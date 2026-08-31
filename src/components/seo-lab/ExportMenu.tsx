import React, { useState } from 'react';
import { Download, FileSpreadsheet, FileCode, FileText, ChevronDown, Check } from 'lucide-react';
import { KeywordItem, ClusterGroup } from '../../lib/seo-lab/types';
import { exportKeywordsToCSV, exportKeywordsToJSON, exportKeywordsToMarkdown } from '../../lib/seo-lab/exportEngine';

interface ExportMenuProps {
  items: KeywordItem[];
  clusters?: ClusterGroup[];
  seedQuery?: string;
}

export default function ExportMenu({
  items,
  clusters,
  seedQuery
}: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  if (!items.length) return null;

  const triggerDownload = (content: string, filename: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  const handleExportCSV = () => {
    const csv = exportKeywordsToCSV(items);
    triggerDownload(csv, `astro360-keywords-${slug(seedQuery || 'all')}.csv`, 'text/csv');
  };

  const handleExportJSON = () => {
    const json = exportKeywordsToJSON(items, clusters);
    triggerDownload(json, `astro360-keywords-${slug(seedQuery || 'all')}.json`, 'application/json');
  };

  const handleExportMarkdown = () => {
    const md = exportKeywordsToMarkdown(items, seedQuery);
    triggerDownload(md, `astro360-keywords-${slug(seedQuery || 'all')}.md`, 'text/markdown');
  };

  function slug(t: string) {
    return t.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
  }

  return (
    <div className="relative inline-block text-left font-mono">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
      >
        <Download className="w-3.5 h-3.5 text-cyan-400" />
        <span>Export ({items.length})</span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#0E172A] border border-white/15 shadow-2xl p-1.5 z-40 space-y-1 text-xs text-left">
          <button
            onClick={handleExportCSV}
            className="w-full px-3 py-2 rounded-xl hover:bg-cyan-500/10 text-slate-200 hover:text-cyan-300 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleExportJSON}
            className="w-full px-3 py-2 rounded-xl hover:bg-cyan-500/10 text-slate-200 hover:text-cyan-300 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <FileCode className="w-4 h-4 text-amber-400" />
            <span>Export JSON</span>
          </button>
          <button
            onClick={handleExportMarkdown}
            className="w-full px-3 py-2 rounded-xl hover:bg-cyan-500/10 text-slate-200 hover:text-cyan-300 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Export Markdown</span>
          </button>
        </div>
      )}
    </div>
  );
}
