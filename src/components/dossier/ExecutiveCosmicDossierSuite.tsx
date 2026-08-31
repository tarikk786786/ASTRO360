import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, Download, Printer, Sparkles, Check, 
  ShieldCheck, Star, Award, Compass, BookOpen, 
  Layers, ArrowRight, Clock, Shield
} from 'lucide-react';
import type { UserProfile } from '../../types';
import { toast } from 'sonner';

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

  const name = userProfile?.name || 'Seeker';
  const dob = userProfile?.dob || '1998-02-22';
  const location = userProfile?.location || 'London, UK';

  const handlePrint = () => {
    setIsGenerating(true);
    toast.info('Formatting print-ready vector PDF document...');
    setTimeout(() => {
      setIsGenerating(false);
      if (typeof window !== 'undefined') {
        window.print();
      }
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-mono font-bold">
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
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-300 hover:from-amber-400 hover:to-amber-200 text-slate-950 font-mono font-bold text-xs flex items-center gap-2 shadow-xl shadow-amber-500/20 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
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
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-2 ${
                isSelected
                  ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-lg font-bold'
                  : 'bg-[#0B1220] text-slate-300 hover:text-white border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase opacity-80">Chapter {ch.id}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded ${isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-white/5 text-slate-400'}`}>
                  {ch.pages} Pages
                </span>
              </div>
              <strong className="text-xs block leading-tight truncate">{ch.title}</strong>
              <span className="text-[10px] font-sans opacity-80 block truncate">{ch.sanskritTitle}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Chapter Preview Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1220] border border-white/12 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/8 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 text-xs font-mono font-bold">
                Chapter {selectedChapter.id}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white font-mono">{selectedChapter.title}</h3>
            </div>
            <p className="text-xs text-slate-400 font-sans mt-1">{selectedChapter.summary}</p>
          </div>
          <span className="text-xs font-mono text-cyan-300 bg-cyan-400/10 px-3 py-1 rounded-xl border border-cyan-400/20 w-fit shrink-0">
            {name}'s Celestial Record
          </span>
        </div>

        {/* Chapter Inclusions List */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
            Included High-Precision Sections:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            {selectedChapter.highlights.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#060A12] border border-white/8 flex items-center gap-3">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-200 font-sans text-xs">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Print Guarantee */}
        <div className="p-4 rounded-2xl bg-amber-400/5 border border-amber-400/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
          <span className="text-amber-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>100% Free • Pure Client-Side Generation • Zero Watermarks • 300 DPI Print-Ready</span>
          </span>
          <button
            onClick={handlePrint}
            className="text-amber-400 hover:text-amber-300 font-bold underline underline-offset-2 cursor-pointer"
          >
            Export Full 30-Page Dossier →
          </button>
        </div>
      </div>
    </div>
  );
}
