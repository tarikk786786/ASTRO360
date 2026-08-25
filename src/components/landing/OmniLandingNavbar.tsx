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
      <div className="w-full bg-[#0B1220] border-b border-white/5 py-1.5 px-4 text-center text-xs font-mono text-slate-400 flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>Now building a global multi-tradition astrology intelligence engine</span>
        <button
          onClick={() => onNavigateSection('systems-section')}
          className="text-amber-400 hover:text-amber-300 font-bold underline underline-offset-2 ml-1 cursor-pointer"
        >
          Explore →
        </button>
      </div>

      {/* 2. Glass Sticky Navigation Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-[#080E1A]/95 backdrop-blur-md border-b border-white/10 shadow-xl py-2.5'
            : 'bg-[#080E1A]/70 backdrop-blur-sm border-b border-white/5 py-3.5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Logo */}
          <div 
            onClick={() => onNavigateSection('hero')} 
            className="flex items-center gap-2.5 cursor-pointer shrink-0"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-md shadow-amber-500/20">
              <Sparkles className="w-4 h-4 text-slate-950" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-base tracking-wider text-white">ASTRO360</span>
              <span className="text-[8px] font-mono text-amber-400 tracking-widest leading-none">OMNI INTELLIGENCE</span>
            </div>
          </div>

          {/* Desktop Nav Links (PRD Section 7) */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-300">
            <button
              onClick={() => onNavigateSection('hero')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => onNavigateSection('forecast-section')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Forecast
            </button>
            <button
              onClick={() => onNavigateSection('product-preview')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Ask
            </button>
            <button
              onClick={() => onNavigateSection('product-preview')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Charts
            </button>
            <button
              onClick={() => onNavigateSection('methodology-section')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Methodology
            </button>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {onOpenDashboard && (
              <button
                onClick={onOpenDashboard}
                className="px-3 py-1.5 rounded-xl text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Sign In
              </button>
            )}
            <button
              onClick={onCreateChart}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 shadow-md shadow-amber-400/20 transition-all cursor-pointer"
            >
              <span>Create My Chart</span>
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
                <span>Create My Chart</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
