import React, { useState } from 'react';
import { X, FileSpreadsheet, FileCode, FileText, Download, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { BacklinkOpportunity, CompetitorBacklinkGap, OutreachRecord, LinkVerificationResult } from '../../lib/backlink-lab/types';
import { exportBacklinksToCSV, exportBacklinksToJSON, exportBacklinksToMarkdown } from '../../lib/backlink-lab/reportExportEngine';

interface BacklinkReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunities: BacklinkOpportunity[];
  gaps: CompetitorBacklinkGap[];
  outreach: OutreachRecord[];
  verifications: LinkVerificationResult[];
}

export default function BacklinkReportModal({
  isOpen,
  onClose,
  opportunities,
  gaps,
  outreach,
  verifications
}: BacklinkReportModalProps) {
  if (!isOpen) return null;

  const triggerDownload = (content: string, filename: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    onClose();
  };

  const handleExportCSV = () => {
    const csv = exportBacklinksToCSV(opportunities);
    triggerDownload(csv, `astro360-backlink-opportunities.csv`, 'text/csv');
  };

  const handleExportJSON = () => {
    const json = exportBacklinksToJSON({ opportunities, gaps, outreach, verifications });
    triggerDownload(json, `astro360-backlink-report.json`, 'application/json');
  };

  const handleExportMarkdown = () => {
    const md = exportBacklinksToMarkdown(opportunities);
    triggerDownload(md, `astro360-backlink-report.md`, 'text/markdown');
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md p-6 rounded-3xl bg-[#0B1220] border border-cyan-500/40 shadow-2xl space-y-4 text-left text-xs my-8"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b border-white/10 pb-3 space-y-1">
          <span className="text-[10px] font-bold font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/30">
            EXPORT DATA & REPORTS
          </span>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Backlink Opportunity Dossier
          </h3>
          <p className="text-slate-400 text-xs font-mono">
            Download your verified prospects, competitor gaps, and outreach campaign pipeline.
          </p>
        </div>

        <div className="space-y-2 font-mono">
          <button
            onClick={handleExportCSV}
            className="w-full p-3.5 rounded-2xl bg-[#0E172A] hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/40 text-slate-200 hover:text-cyan-300 flex items-center justify-between transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">Export CSV Spreadsheet</span>
                <span className="text-[10px] text-slate-400">Compatible with Google Sheets, Excel & CRM tools</span>
              </div>
            </div>
            <Download className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={handleExportJSON}
            className="w-full p-3.5 rounded-2xl bg-[#0E172A] hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/40 text-slate-200 hover:text-cyan-300 flex items-center justify-between transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <FileCode className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">Export Full JSON Schema</span>
                <span className="text-[10px] text-slate-400">Structured data with opportunity scores & outreach logs</span>
              </div>
            </div>
            <Download className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={handleExportMarkdown}
            className="w-full p-3.5 rounded-2xl bg-[#0E172A] hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/40 text-slate-200 hover:text-cyan-300 flex items-center justify-between transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">Export Markdown Brief</span>
                <span className="text-[10px] text-slate-400">Formatted executive summary table for GitHub or Notion</span>
              </div>
            </div>
            <Download className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
