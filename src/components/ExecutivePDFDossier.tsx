import React from 'react';
import { motion } from 'motion/react';
import { FileText, Download, Printer, ShieldCheck, Sparkles, Sun, Moon, MapPin } from 'lucide-react';
import type { UserProfile } from '../types';
import { printExecutiveDossierPdf } from '../lib/pdfReportEngine';

interface ExecutivePDFDossierProps {
  userProfile: UserProfile;
}

export default function ExecutivePDFDossier({ userProfile }: ExecutivePDFDossierProps) {
  const name = userProfile?.name || 'Seeker';
  const email = userProfile?.email || 'seeker@astro360.com';
  const location = userProfile?.location || 'Universal Meridian';

  const handlePrintPDF = () => {
    printExecutiveDossierPdf({ userProfile });
  };

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-white/[0.12] shadow-2xl space-y-6 text-left relative overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" /> Executive Multi-Page PDF Cosmic Dossier Report
          </h3>
          <p className="text-xs text-slate-400 font-mono pt-0.5">
            Full Astrological, Astronomical, Remedial & Multi-Tradition Report for {name}
          </p>
        </div>

        <button
          onClick={handlePrintPDF}
          className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-white text-black font-semibold shadow-sm font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 shrink-0"
        >
          <Printer className="w-4 h-4" /> Export / Print PDF Dossier
        </button>
      </div>

      {/* PRINTABLE DOSSIER PREVIEW CONTAINER */}
      <div className="p-6 rounded-2xl bg-[#0B1220] border border-white/10 space-y-6 text-xs font-mono">
        <div className="border-b border-white/[0.08] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-base font-bold text-amber-300">ASTRO360 OMNI — MASTER EXECUTIVE DOSSIER</h4>
            <span className="text-[10px] text-slate-400">Subject: {name} • Location: {location}</span>
          </div>
          <span className="text-[10px] text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-white/[0.08] font-bold">
            Sidereal Lahiri Ayanamsha 24.2132°
          </span>
        </div>

        {/* SECTION SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
            <span className="text-[10px] text-amber-400 font-bold block">1. Executive Astrological Overview</span>
            <p className="text-slate-300 leading-relaxed">
              Subject {name} possesses a prominent Leo Ascendant (Lagna) with Sun ☉ in executive dignity. Active Jupiter ♃ Mahadasha triggers career expansion and high-visibility purpose.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
            <span className="text-[10px] text-cyan-400 font-bold block">2. Multi-Faith Alignment</span>
            <p className="text-slate-300 leading-relaxed">
              Synthesizes Islamic Abjad al-Kabir numerical weight matrix, Vedic Solfeggio 528 Hz solar tones, BaZi Feng Shui Kua 1, and CBT cognitive grounding.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-emerald-950/40 border border-white/[0.08] text-emerald-300 space-y-1">
          <span className="text-[10px] font-bold block text-emerald-400">Prescribed Remedial Protocol:</span>
          <p className="text-slate-200 leading-relaxed">
            Yellow Sapphire (Pukhraj) 4.5+ Carats set in Gold on Index Finger. Daily recitation of Ayatul Kursi (432 Hz) and Mahagayatri Mantra (528 Hz).
          </p>
        </div>
      </div>
    </div>
  );
}
