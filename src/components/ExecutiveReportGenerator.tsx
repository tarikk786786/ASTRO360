import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Download, Share2, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ReportType {
  id: string;
  name: string;
  category: 'Birth' | 'Career' | 'Marriage' | 'Wealth' | 'Annual' | 'Panchang';
  pages: number;
  description: string;
}

const REPORTS: ReportType[] = [
  { id: 'birth', name: 'Comprehensive Birth Chart Dossier', category: 'Birth', pages: 18, description: 'Complete 360° Natal Kundli, D9 Navamsha, Shadbala, and Multi-Faith remedies.' },
  { id: 'career', name: 'Career & Professional Wealth Report', category: 'Career', pages: 12, description: 'D10 Dashamsha analysis, 10th lord status, and optimal business windows.' },
  { id: 'marriage', name: 'Marriage & Relationship Synastry Report', category: 'Marriage', pages: 14, description: 'Ashta Koota 36-Guna match, Nadi analysis, and Venus-Jupiter synastry.' },
  { id: 'wealth', name: 'Wealth & Asset Expansion Forecast', category: 'Wealth', pages: 10, description: '2nd & 11th house lords, Dhana Yogas, and stock/crypto investment timing.' }
];

export default function ExecutiveReportGenerator() {
  const [selectedReport, setSelectedReport] = useState<ReportType>(REPORTS[0]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleDownload = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const text = `# ASTRO360 Executive Report — ${selectedReport.name}\n\n` +
        `Generated: ${new Date().toLocaleDateString()}\n\n` +
        `## 1. Executive Summary\n` +
        `${selectedReport.description}\n\n` +
        `## 2. Planetary Dignities & Positions\n` +
        `- Sun: Leo 1st House (Lagna Lord Exalted Power)\n` +
        `- Moon: Taurus 10th House (Exalted Wealth & Fame)\n` +
        `- Mercury: Virgo 2nd House (Exalted Tech & Commerce)\n\n` +
        `## 3. Prescribed Remedies\n` +
        `- Recite Surah Al-Waqi'ah after Maghrib\n` +
        `- Wear Yellow Sapphire for Jupiter 9th House\n` +
        `- Execute major contracts during Abhijit Muhurta (11:48 AM - 12:36 PM)\n`;

      const blob = new Blob([text], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ASTRO360_${selectedReport.id.toUpperCase()}_Report.md`;
      a.click();
    }, 1000);
  };

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-white/10 shadow-2xl space-y-4 text-left relative">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" /> Executive PDF & Dossier Report Generator
          </h3>
          <p className="text-xs text-slate-400 font-mono pt-0.5">
            Printable Astrological Reports for Birth, Career, Marriage, Wealth & Annual Forecasts
          </p>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30 font-bold">
          PDF & Markdown Exporter
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {REPORTS.map((report) => (
          <div
            key={report.id}
            onClick={() => setSelectedReport(report)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 text-left ${
              selectedReport.id === report.id
                ? 'bg-emerald-500/10 border-emerald-400 shadow-lg'
                : 'bg-[#0B1220] border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">{report.name}</span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">{report.pages} Pages</span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
              {report.description}
            </p>
          </div>
        ))}
      </div>

      <div className="pt-2 flex items-center justify-between border-t border-white/10">
        <span className="text-xs font-mono text-slate-400">Selected: <strong className="text-white">{selectedReport.name}</strong></span>
        <button
          onClick={handleDownload}
          disabled={isGenerating}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-mono font-bold flex items-center gap-2 cursor-pointer transition-all shadow-lg"
        >
          <Download className="w-4 h-4" />
          <span>{isGenerating ? 'Compiling Dossier...' : 'Export Dossier Report (PDF/MD)'}</span>
        </button>
      </div>
    </div>
  );
}
