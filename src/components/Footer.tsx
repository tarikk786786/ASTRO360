import React from 'react';
import { Compass, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#070C16] border-t border-white/10 py-8 px-6 text-xs font-mono text-slate-400 space-y-4 text-left relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-amber-400" />
          <span className="font-bold text-white tracking-wide">COSMOS OMNI</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Universal Cosmic Intelligence Platform</span>
        </div>

        <div className="flex items-center gap-6 text-[11px]">
          <a href="#about" className="hover:text-amber-400 transition-colors">About System</a>
          <a href="#privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-amber-400 transition-colors">Terms of Service</a>
          <a href="https://tarikislam.in" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">Author: Tarik Islam</a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-500">
        <p>
          ⚠️ <strong>Disclaimer:</strong> COSMOS OMNI provides astrological, astronomical, and spiritual educational analysis. Content is generated for informational & self-reflection purposes.
        </p>
        <p className="shrink-0">
          © {new Date().getFullYear()} Tarik Islam. Built with Lahiri Sidereal Ephemeris Engine.
        </p>
      </div>
    </footer>
  );
}
