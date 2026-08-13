import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, Download, Printer, ShieldCheck, Sparkles, CheckCircle2, 
  User, Briefcase, HeartHandshake, Gem, Calendar, ArrowUpRight, Copy, Check
} from 'lucide-react';
import { toast } from 'sonner';
import { useGlobalConfig } from '../context/GlobalConfigContext';

interface ReportModule {
  id: 'birth' | 'career' | 'marriage' | 'wealth' | 'annual';
  name: string;
  category: string;
  pages: number;
  description: string;
  sections: string[];
  prescribedRemedy: string;
}

const REPORT_CATALOG: ReportModule[] = [
  { 
    id: 'birth', 
    name: 'Comprehensive Birth Chart Dossier (Kundli & Divisional)', 
    category: 'Natal Astrological Blueprint', 
    pages: 18, 
    description: 'Complete 360° Natal Kundli, D1 Ascendant, D9 Navamsha, D10 Dashamsha, Vimshottari Dasha timeline, and multi-tradition remedies.',
    sections: ['1. Ascendant & Planetary Coordinates', '2. Vimshottari Mahadasha Timeline', '3. D9 Navamsha & Soul Purpose', '4. Prescribed Gemstones & Mantras'],
    prescribedRemedy: 'Mahagayatri Mantra & Yellow Sapphire (Pukhraj) 4.5+ Carats on Index Finger'
  },
  { 
    id: 'career', 
    name: 'Career, Executive Leadership & Corporate Growth Report', 
    category: 'Business & Professional Mastery', 
    pages: 12, 
    description: '10th House Lord status, D10 Dashamsha analysis, corporate leadership timing, optimal business launch windows, and wealth sectors.',
    sections: ['1. 10th House Lord & Executive Power', '2. D10 Dashamsha Corporate Blueprint', '3. Ideal Venture Launch Muhurtas', '4. Business Prosperity Mantras'],
    prescribedRemedy: 'Surya Beej Mantra & Emerald (Panna) for Mercury 2nd House Commerce'
  },
  { 
    id: 'marriage', 
    name: 'Marriage & Relationship Synastry Dossier', 
    category: 'Relationship Harmony & 36-Guna Match', 
    pages: 14, 
    description: '36-Guna Ashta Koota match score, Nadi Dosha check, 7th house lord status, Venus & Jupiter dual-ring overlay synastry, and marital peace remedies.',
    sections: ['1. Ashta Koota 36-Guna Compatibility', '2. 7th House & Venus/Jupiter Synastry', '3. Manglik & Nadi Dosha Mitigation', '4. Family Harmony Adhkar'],
    prescribedRemedy: 'Tasbeeh al-Fatima & 639 Hz Interpersonal Solfeggio Harmonies'
  },
  { 
    id: 'wealth', 
    name: 'Wealth, Assets & Financial Barakah Expansion Forecast', 
    category: 'Monetary Growth & Asset Timing', 
    pages: 10, 
    description: '2nd House (Accumulated Wealth) & 11th House (Gains) Dhana Yogas, stock & real estate investment timing, and Islamic Barakah principles.',
    sections: ['1. 2nd & 11th House Dhana Yogas', '2. Capital Investment Timing', '3. Real Estate & Asset Sectors', '4. Mahalakshmi & Surah Waqi\'ah Remedies'],
    prescribedRemedy: 'Mahalakshmi Wealth Stotram & Surah Al-Waqi\'ah after Maghrib'
  },
  { 
    id: 'annual', 
    name: '12-Month Annual Transit & Ephemeris Dossier', 
    category: 'Annual Predictive Forecast', 
    pages: 24, 
    description: 'Month-by-month planetary ingress timeline, Sade Sati & Rahu/Ketu transit windows, auspicious Muhurtas, and monthly priority actions.',
    sections: ['1. Month-by-Month Planetary Ingress', '2. Sade Sati & Transits Analysis', '3. Quarterly Strategic Windows', '4. Monthly Prescribed Mantras'],
    prescribedRemedy: 'Mahamrityunjaya Mantra (108x) & Shani Shanti Beej Mantra'
  }
];

export default function ExecutiveReportGenerator() {
  const { config } = useGlobalConfig();
  const [selectedReport, setSelectedReport] = useState<ReportModule>(REPORT_CATALOG[0]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const seekerName = 'Tarik Islam';
  const seekerLocation = 'Mecca, Saudi Arabia';

  const handlePrintPDF = () => {
    window.print();
  };

  const handleDownloadMD = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const text = `# ASTRO360 OMNI — ${selectedReport.name.toUpperCase()}\n` +
        `Subject: ${seekerName} | Location: ${seekerLocation} | Date: ${new Date().toLocaleDateString()}\n` +
        `Sidereal Lahiri Ayanamsha: 24.2216° | Report Length: ${selectedReport.pages} Pages\n\n` +
        `---\n\n` +
        `## 1. EXECUTIVE SUMMARY & BLUEPRINT\n` +
        `${selectedReport.description}\n\n` +
        `## 2. REPORT STRUCTURE & SECTIONS\n` +
        selectedReport.sections.map(s => `- ${s}`).join('\n') + `\n\n` +
        `## 3. PRESCRIBED SACRED REMEDIAL PROTOCOL\n` +
        `Key Remedy: ${selectedReport.prescribedRemedy}\n\n` +
        `---\n` +
        `Verified by ASTRO360 Astronomical Engine • 100% Confidential Seeker Dossier`;

      const blob = new Blob([text], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ASTRO360_${selectedReport.id.toUpperCase()}_Dossier.md`;
      a.click();
      toast.success(`Exported ${selectedReport.name} Dossier!`);
    }, 800);
  };

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-amber-500/40 shadow-2xl space-y-6 text-left relative overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 print:hidden">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2.5">
            <FileText className="w-5.5 h-5.5 text-amber-400" /> Executive PDF & Dossier Report Generator
          </h3>
          <p className="text-xs text-slate-300 font-mono pt-1">
            Printable Astrological Reports for Birth, Career, Marriage, Wealth & Annual Forecasts
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleDownloadMD}
            disabled={isGenerating}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 border border-white/10"
          >
            <Download className="w-3.5 h-3.5" /> {isGenerating ? 'Compiling...' : 'Download Markdown'}
          </button>

          <button
            onClick={handlePrintPDF}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
          >
            <Printer className="w-4 h-4 text-slate-950" /> Print / Export PDF Dossier
          </button>
        </div>
      </div>

      {/* REPORT SELECTOR GRID (Hidden during print) */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 print:hidden">
        {REPORT_CATALOG.map((report) => {
          const isSelected = selectedReport.id === report.id;
          return (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer space-y-2 flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-500/20 border-amber-400 text-white shadow-xl ring-1 ring-amber-400/40'
                  : 'bg-[#0B1220] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-amber-400 font-bold uppercase">{report.category}</span>
                  <span className="text-[9px] font-mono text-cyan-300 font-bold bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/30">
                    {report.pages} Pages
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white leading-tight">{report.name}</h4>
              </div>

              <span className="text-[10px] text-slate-300 font-mono flex items-center gap-1 font-bold pt-2 border-t border-white/10">
                <Sparkles className="w-3 h-3 text-amber-400" /> Select Report
              </span>
            </button>
          );
        })}
      </div>

      {/* PRINTABLE DOSSIER REPORT DOCUMENT PREVIEW */}
      <div className="p-6 rounded-2xl bg-[#0B1220] border border-amber-500/40 space-y-6 text-xs font-mono print:bg-white print:text-black print:p-0 print:border-none shadow-2xl">
        {/* Dossier Document Header */}
        <div className="border-b border-amber-500/40 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 print:text-black bg-amber-500/10 print:bg-transparent px-2.5 py-0.5 rounded border border-amber-500/30 print:border-black font-mono">
                CONFIDENTIAL EXECUTIVE DOSSIER
              </span>
              <span className="text-[10px] text-slate-400 print:text-gray-600 font-mono">ID: ASTRO-DOSSIER-2026-98A</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white print:text-black">{selectedReport.name}</h2>
            <p className="text-[11px] text-slate-300 print:text-gray-800 font-mono">
              Prepared for: <strong className="text-amber-300 print:text-black">{seekerName}</strong> • Location: <strong className="text-cyan-300 print:text-black">{seekerLocation}</strong>
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs font-mono font-bold text-emerald-400 print:text-black block">Sidereal Lahiri Ayanamsha 24.2216°</span>
            <span className="text-[10px] text-slate-400 print:text-gray-600 font-mono">Generated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Section 1: Executive Overview */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-amber-400 print:text-black font-mono flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-400 print:text-black" /> 1. Executive Blueprint & Diagnostic Summary
          </h4>
          <p className="text-slate-200 print:text-black text-[11px] leading-relaxed bg-black/40 print:bg-transparent p-4 rounded-xl border border-white/10 print:border-gray-300">
            {selectedReport.description}
          </p>
        </div>

        {/* Section 2: Structure & Key Chapters */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-cyan-400 print:text-black font-mono flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-400 print:text-black" /> 2. Included Analysis Sections
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {selectedReport.sections.map((sec, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/5 print:bg-transparent border border-white/10 print:border-gray-300 flex items-center gap-2 text-slate-300 print:text-black text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 print:text-black shrink-0" />
                <span>{sec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Prescribed Sacred Remedies */}
        <div className="p-4 rounded-xl bg-emerald-950/40 print:bg-transparent border border-emerald-500/40 print:border-gray-300 space-y-2">
          <h4 className="text-xs font-bold text-emerald-400 print:text-black font-mono flex items-center gap-1.5">
            <Gem className="w-4 h-4 text-emerald-400 print:text-black" /> 3. Prescribed Sacred Remedial Protocol
          </h4>
          <p className="text-slate-200 print:text-black text-[11px] leading-relaxed">
            {selectedReport.prescribedRemedy}
          </p>
        </div>

        {/* Dossier Footer Signature */}
        <div className="pt-4 border-t border-white/10 print:border-gray-300 flex items-center justify-between text-[10px] text-slate-400 print:text-gray-600 font-mono">
          <span>ASTRO360 Omni Astronomical Engine • Version 7.4.2</span>
          <span>Page 1 of {selectedReport.pages} • Verified Certified Dossier</span>
        </div>
      </div>
    </div>
  );
}
