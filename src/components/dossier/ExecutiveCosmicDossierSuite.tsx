import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, Download, Printer, Sparkles, Check, 
  ShieldCheck, Star, Award, Compass, BookOpen, 
  Layers, ArrowRight, Clock, Shield
} from 'lucide-react';
import type { UserProfile } from '../../types';
import { toast } from 'sonner';
import { printExecutiveDossierPdf } from '../../lib/pdfReportEngine';

interface ExecutiveCosmicDossierSuiteProps {
  userProfile?: UserProfile;
  onNavigateToTab?: (tab: string) => void;
}

interface DossierChapter {
  id: number;
  title: string;
  sanskritTitle: string;
  pages: number;
  summary: string;
  highlights: string[];
}

const DOSSIER_CHAPTERS: DossierChapter[] = [
  {
    id: 1,
    title: 'Astronomical Verification & Natal Ephemeris',
    sanskritTitle: 'जन्म कुण्डली एवं ग्रह स्थिति',
    pages: 4,
    summary: 'Sub-arcsecond celestial snapshot calculated via NASA JPL DE440 ephemeris and True Lahiri Ayanamsha.',
    highlights: ['North & South Indian Rashi Chart', 'Ascendant (Lagna) & Degree Coordinates', '9 Planetary Longitudes, Speeds & Dignities', 'Exact Retrograde (Vakri) & Combustion (Asta) Orbs']
  },
  {
    id: 2,
    title: '16 Shodashavarga Harmonic Divisional Charts',
    sanskritTitle: 'षोडशवर्ग सूक्ष्म कुण्डली',
    pages: 6,
    summary: 'Parashari micro-harmonics breaking down specific life sectors from D1 gross existence to D60 past life karma.',
    highlights: ['D9 Navamsha (Spouse & Dharma)', 'D10 Dashamsha (Career & Executive Authority)', 'D7 Saptamsha (Progeny & Creativity)', 'D60 Shashtiamsha (Karmic Root Cause)']
  },
  {
    id: 3,
    title: '6-Fold Parashari Shadbala Strength Matrix',
    sanskritTitle: 'षड्बल सामर्थ्य विश्लेषण',
    pages: 4,
    summary: 'Mathematical quantification of planetary capacity to deliver auspicious results across 6 classical vectors.',
    highlights: ['Sthana Bala (Positional Strength)', 'Dig Bala (Directional Strength)', 'Kala & Chesta Bala (Temporal & Motional)', 'Planetary Potency Ranking (Rank 1 to 7)']
  },
  {
    id: 4,
    title: '120-Year Vimshottari Dasha Master Timeline',
    sanskritTitle: 'विंशोत्तरी महादशा एवं अन्तर्दशा काल',
    pages: 5,
    summary: 'Chronological timeline mapping your past, present, and future planetary epochs down to the exact month.',
    highlights: ['Current Mahadasha & Antardasha Cycle', 'Upcoming Career & Wealth Fructification Windows', 'Pratyantardasha Sub-Cycles', 'Sade Sati & Saturn Transit Phases']
  },
  {
    id: 5,
    title: '337-Bindu Sarvashtakavarga (SAV) Energy Map',
    sanskritTitle: 'सर्वाष्टकवर्ग बिन्दु चक्र',
    pages: 3,
    summary: 'Benefic transit point allocation across all 12 signs evaluated against the 28-bindu equilibrium baseline.',
    highlights: ['Exalted Strength Signs (30+ Bindus)', 'Cautionary Transit Windows (<25 Bindus)', 'Bhinnashtakavarga Individual Planetary Maps', 'Optimal Relocation Directions']
  },
  {
    id: 6,
    title: 'Classical Sanskrit Raja & Dhana Yogas',
    sanskritTitle: 'राजयोग एवं धनयोग प्रमाण',
    pages: 4,
    summary: 'Canonical auspicious planetary combinations with word-for-word shloka citations from ancient treatises.',
    highlights: ['Gaja Kesari & Mahapurusha Yogas', 'Neechabhanga Raja Yoga Forensics', 'Dhana (Wealth) & Saraswati Yogas', 'Citations from BPHS, Phaladeepika, Saravali']
  },
  {
    id: 7,
    title: 'Prescriptive Gemstones, Mantras & Remedial Protocol',
    sanskritTitle: 'रत्न, मन्त्र एवं यन्त्र अनुष्ठान',
    pages: 4,
    summary: 'Scientifically calibrated remedial prescriptions to fortify functional benefics without aggravating malefics.',
    highlights: ['Carat/Ratti Weight Formula by Body Weight', 'Consecrated Metals & Auspicious Wearing Fingers', '108-Count Vedic Seed Mantras', '1–14 Mukhi Rudraksha Alignments']
  }
];

export default function ExecutiveCosmicDossierSuite({ userProfile, onNavigateToTab }: ExecutiveCosmicDossierSuiteProps) {
  const [selectedChapter, setSelectedChapter] = useState<DossierChapter>(DOSSIER_CHAPTERS[0]);
  const [isGenerating, setIsGenerating] = useState(false);

  const safeProfile: UserProfile = userProfile || {
    name: 'Cosmic Seeker',
    dob: '1998-06-15',
    time: '12:00',
    location: 'Universal Coordinates',
    gender: 'male',
    preferredSystem: 'vedic',
  } as UserProfile;

  const handlePrint = () => {
    setIsGenerating(true);
    toast.info('Formatting print-ready vector PDF document...');
    setTimeout(() => {
      setIsGenerating(false);
      printExecutiveDossierPdf({
        userProfile: safeProfile,
        includeDivisionalCharts: true,
        includeRemedies: true,
      });
    }, 400);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-left select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-white/[0.08] text-amber-300 text-xs font-mono font-bold">
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Print-Ready Executive Astrological Book</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            30-PAGE EXECUTIVE COSMIC DOSSIER
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            A comprehensive, keepsake-grade astrological dossier covering all 7 chapters of life architecture with zero watermarks.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handlePrint}
            disabled={isGenerating}
            className="px-5 py-2.5 rounded-2xl bg-white hover:bg-slate-100 text-black font-mono font-bold text-xs flex items-center gap-2 shadow-xl shadow-amber-500/20 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
          >
            <Printer className="w-4 h-4" />
            <span>{isGenerating ? 'Compiling Dossier...' : 'Print / Export PDF'}</span>
          </button>
        </div>
      </div>

      {/* Dossier Structure Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
        {DOSSIER_CHAPTERS.map((ch) => {
          const isSelected = selectedChapter.id === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => setSelectedChapter(ch)}
              className={`p-4 rounded-2xl border text-left transition-all space-y-2 cursor-pointer ${
                isSelected
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'bg-[#111315]/80 hover:bg-white/5 border-white/10 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-amber-400 font-bold">CH 0{ch.id}</span>
                <span className="text-slate-400">{ch.pages} Pages</span>
              </div>
              <div className="font-bold text-white leading-snug truncate">{ch.title}</div>
              <div className="text-[10px] text-slate-400">{ch.sanskritTitle}</div>
            </button>
          );
        })}
      </div>

      {/* Chapter Deep Dive Preview Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111315]/80 border border-white/[0.08] shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-amber-400">
              CHAPTER 0{selectedChapter.id} PREVIEW
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
              {selectedChapter.title}
            </h3>
            <p className="text-xs text-slate-300 font-mono mt-1">{selectedChapter.sanskritTitle}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-300 bg-cyan-400/10 px-3 py-1.5 rounded-xl border border-white/[0.08] font-bold">
              Included in PDF
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed font-sans">
          {selectedChapter.summary}
        </p>

        {/* Highlights List */}
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
            Analytical Modules in this Chapter
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {selectedChapter.highlights.map((h, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-200 font-sans">{h}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
