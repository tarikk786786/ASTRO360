import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, Download, Printer, ShieldCheck, Sparkles, CheckCircle2, 
  User, Briefcase, HeartHandshake, Gem, Calendar, ArrowUpRight, Copy, Check,
  Globe2, Eye, Flame
} from 'lucide-react';
import { toast } from 'sonner';
import { printExecutiveDossierPdf } from '../lib/pdfReportEngine';
import type { UserProfile } from '../types';

interface ReportModule {
  id: 'comprehensive' | 'career' | 'relationship' | 'wealth' | 'annual';
  name: string;
  category: string;
  pages: number;
  description: string;
  sections: string[];
  prescribedRemedy: string;
}

const REPORT_CATALOG: ReportModule[] = [
  { 
    id: 'comprehensive', 
    name: 'Comprehensive 6-Tradition Master Dossier', 
    category: 'Full Ephemeris & Multi-Faith Blueprint', 
    pages: 18, 
    description: 'Complete 360° Natal Kundli, D1 Ascendant, 9 Planetary Ephemeris, Vimshottari Dasha timeline, 6-Tradition Cross-Synthesis, and multi-faith remedies.',
    sections: ['1. Ascendant & Planetary Coordinates (DE440)', '2. Vimshottari Mahadasha Timeline', '3. 6-Tradition Master Synthesis Matrix', '4. Prescribed Gemstones & Vedic/Islamic Mantras'],
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
    id: 'relationship', 
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

interface ExecutiveReportGeneratorProps {
  userProfile?: UserProfile;
}

export default function ExecutiveReportGenerator({ userProfile = {
  name: 'Cosmic Seeker',
  dob: '1998-06-15',
  time: '12:00',
  location: 'Universal Coordinates',
  preferredSystem: 'vedic',
} as UserProfile }: ExecutiveReportGeneratorProps) {
  const [selectedReport, setSelectedReport] = useState<ReportModule>(REPORT_CATALOG[0]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const seekerName = userProfile?.name || 'Cosmic Seeker';
  const seekerLocation = userProfile?.location || 'Universal Meridian';

  const handleExportPDF = () => {
    setIsGenerating(true);
    toast.info('Generating high-resolution vector PDF dossier...');
    setTimeout(() => {
      printExecutiveDossierPdf({
        userProfile,
        reportType: selectedReport.id,
        includeDivisionalCharts: true,
        includeRemedies: true,
      });
      setIsGenerating(false);
    }, 400);
  };

  const handleDownloadMD = () => {
    const text = `# ASTRO360 OMNI — ${selectedReport.name.toUpperCase()}\n` +
      `Subject: ${seekerName} | Location: ${seekerLocation} | Date: ${new Date().toLocaleDateString()}\n` +
      `Sidereal Lahiri Ayanamsha: 23.856° | Report Length: ${selectedReport.pages} Pages\n\n` +
      `---\n\n` +
      `## 1. EXECUTIVE SUMMARY & BLUEPRINT\n` +
      `${selectedReport.description}\n\n` +
      `## 2. REPORT STRUCTURE & SECTIONS\n` +
      selectedReport.sections.map(s => `- ${s}`).join('\n') + `\n\n` +
      `## 3. PRESCRIBED SACRED REMEDIAL PROTOCOL\n` +
      `${selectedReport.prescribedRemedy}\n\n` +
      `---\nGenerated deterministically by ASTRO360 NASA JPL DE440 Core Engine.`;

    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ASTRO360_${selectedReport.id}_Dossier_${seekerName.replace(/\s+/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Markdown summary downloaded successfully!');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 text-left pb-16 select-none">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0B132B] via-[#080E1C] to-[#040812] border border-white/[0.08] shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-white/[0.08] text-amber-300 text-xs font-mono font-bold">
            <FileText className="w-3.5 h-3.5" />
            <span>EXECUTIVE PDF REPORT GENERATOR</span>
          </div>

          <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 font-bold">
            NASA JPL DE440 Ephemeris • Lahiri 23.856°
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
            High-Resolution Astrological PDF Dossiers
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl font-sans leading-relaxed">
            Generate publication-grade, multi-page vector PDF dossiers formatted for executive consulting, personal archives, and ceremonial printing.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportPDF}
            disabled={isGenerating}
            className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-400/20 active:scale-95 disabled:opacity-50"
          >
            <Printer className="w-4 h-4" />
            <span>{isGenerating ? 'Generating PDF...' : 'Print / Export Official PDF'}</span>
          </button>

          <button
            onClick={handleDownloadMD}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs font-mono border border-white/10 flex items-center gap-2 transition-all cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download Summary (.md)</span>
          </button>
        </div>
      </div>

      {/* REPORT SELECTION GRID */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-white font-sans flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>Select Report Module</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REPORT_CATALOG.map((rep) => {
            const isSelected = selectedReport.id === rep.id;
            return (
              <button
                key={rep.id}
                onClick={() => setSelectedReport(rep)}
                className={`p-5 rounded-2xl border text-left transition-all space-y-3 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0E172B] border-amber-400 shadow-lg shadow-amber-400/10'
                    : 'bg-[#080E1B] hover:bg-[#0B1324] border-white/10 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-amber-400">
                    {rep.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-md">
                    {rep.pages} Pages
                  </span>
                </div>

                <div className="text-sm font-extrabold text-white font-sans leading-snug">
                  {rep.name}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-2">
                  {rep.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* SELECTED REPORT LIVE PREVIEW */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#080E1B] border border-white/10 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-lg font-extrabold text-white font-sans">
              {selectedReport.name}
            </h3>
            <span className="text-xs font-mono text-slate-400">
              Prepared for {seekerName} • {seekerLocation}
            </span>
          </div>

          <button
            onClick={handleExportPDF}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Generate This PDF</span>
          </button>
        </div>

        {/* Sections Preview */}
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
            Included Analytical Chapters
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {selectedReport.sections.map((sec, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs text-slate-200 font-sans font-medium">{sec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Prescribed Remedy Highlight */}
        <div className="p-4 rounded-2xl bg-amber-400/10 border border-white/[0.08] space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300">
            <Flame className="w-4 h-4" />
            <span>Prescribed Remedial Protocol</span>
          </div>
          <p className="text-xs text-slate-200 font-sans leading-relaxed">
            {selectedReport.prescribedRemedy}
          </p>
        </div>
      </div>
    </div>
  );
}
