import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Menu, X, ShieldCheck } from 'lucide-react';

interface OmniLandingNavbarProps {
  onCreateChart: () => void;
  onExploreHowItWorks: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenDashboard?: () => void;
}

export default function OmniLandingNavbar({
  onCreateChart,
  onExploreHowItWorks,
  onNavigateSection,
  onOpenDashboard
}: OmniLandingNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* 1. Small Top Announcement Bar */}
      <div className="w-full bg-[#080E1A] border-b border-white/5 py-1.5 px-4 text-center text-xs font-mono text-slate-400 flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span>Intelligence for the way you explore astrology</span>
        <button
          onClick={() => onNavigateSection('systems-section')}
          className="text-slate-200 hover:text-white font-bold underline underline-offset-2 ml-1 cursor-pointer"
        >
          Explore Systems →
        </button>
      </div>

      {/* 2. Glass Sticky Navigation Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-[#060A12]/95 backdrop-blur-md border-b border-white/10 shadow-xl py-3'
            : 'bg-[#060A12]/80 backdrop-blur-sm border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Logo (Minimal 360° Orbital Wordmark) */}
          <div 
            onClick={() => onNavigateSection('hero')} 
            className="flex items-center gap-3 cursor-pointer shrink-0 group"
          >
            <div className="relative w-8 h-8 rounded-xl bg-slate-900 border border-white/15 flex items-center justify-center shadow-inner group-hover:border-amber-400/50 transition-colors">
              {/* Abstract 360 Orbit Geometry */}
              <div className="w-4 h-4 rounded-full border border-amber-400/80 group-hover:scale-105 transition-transform" />
              <div className="absolute w-1.5 h-1.5 rounded-full bg-amber-400 top-1.5 right-1.5 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-base tracking-tight text-white font-sans">ASTRO360</span>
              <span className="text-[9px] font-mono text-slate-400 tracking-widest leading-none">INTELLIGENCE</span>
            </div>
          </div>

          {/* Desktop Nav Links (PRD Section 9 & Free Tools PRD) */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-300">
            <button
              onClick={() => onNavigateSection('free-tools')}
              className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Free Tools</span>
            </button>
            <button
              onClick={() => onNavigateSection('product-preview')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Product
            </button>
            <button
              onClick={() => onNavigateSection('systems-section')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Systems
            </button>
            <button
              onClick={() => onNavigateSection('methodology-section')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Methodology
            </button>
            <button
              onClick={() => onNavigateSection('professional-section')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Professionals
            </button>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {onOpenDashboard && (
              <button
                onClick={onOpenDashboard}
                className="px-3.5 py-1.5 rounded-xl text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Sign In
              </button>
            )}
            <button
              onClick={onCreateChart}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <span>Create My Free Chart</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#080E1A] border-b border-white/10 p-4 space-y-3 text-left">
            <div className="flex flex-col space-y-2 text-xs font-mono text-slate-300">
              <button
                onClick={() => { onNavigateSection('free-tools'); setMobileMenuOpen(false); }}
                className="py-2 text-left text-emerald-400 font-bold hover:text-emerald-300 flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Free Astrology Tools</span>
              </button>
              <button
                onClick={() => { onNavigateSection('product-preview'); setMobileMenuOpen(false); }}
                className="py-2 text-left hover:text-white"
              >
                Product Preview
              </button>
              <button
                onClick={() => { onNavigateSection('forecast-section'); setMobileMenuOpen(false); }}
                className="py-2 text-left hover:text-white"
              >
                Forecast
              </button>
              <button
                onClick={() => { onNavigateSection('systems-section'); setMobileMenuOpen(false); }}
                className="py-2 text-left hover:text-white"
              >
                Astrology Systems
              </button>
              <button
                onClick={() => { onNavigateSection('methodology-section'); setMobileMenuOpen(false); }}
                className="py-2 text-left hover:text-white"
              >
                Methodology
              </button>
              <button
                onClick={() => { onNavigateSection('faq-section'); setMobileMenuOpen(false); }}
                className="py-2 text-left hover:text-white"
              >
                FAQ
              </button>
            </div>
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => { onCreateChart(); setMobileMenuOpen(false); }}
                className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-1.5 shadow-md"
              >
                <span>Create My Free Chart</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
