import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0B0C10] border-t border-white/[0.08] py-8 px-6 text-xs font-mono text-slate-400 space-y-4 text-left relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-white" />
          <span className="font-bold text-white tracking-wide">ASTRO360</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Universal Cosmic Operating System</span>
        </div>

        <div className="flex items-center gap-6 text-[11px]">
          <a href="#methodology" className="hover:text-white transition-colors">Ephemeris Methodology</a>
          <a href="#privacy" className="hover:text-white transition-colors">Zero-PII Privacy</a>
          <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="https://tarikislam.in" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white hover:underline">Author: Tarik Islam</a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/[0.06] pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-500">
        <p>
          ⚠️ <strong>Disclaimer:</strong> ASTRO360 provides astronomical calculation, educational timing analysis, and philosophical synthesis.
        </p>
        <p className="shrink-0">
          © {new Date().getFullYear()} ASTRO360. NASA JPL DE440 & True Lahiri Ephemeris Engine.
        </p>
      </div>
    </footer>
  );
}
