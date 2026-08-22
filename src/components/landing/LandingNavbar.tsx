import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, ArrowRight, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LandingNavbarProps {
  onGetStarted: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenDashboard: () => void;
  onOpenStore?: () => void;
  hasProfile?: boolean;
}

export default function LandingNavbar({
  onGetStarted,
  onNavigateSection,
  onOpenDashboard,
  onOpenStore,
  hasProfile,
}: LandingNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Kundli (Birth Chart)', id: 'birth-chart-section' },
    { label: 'Panchang (Almanac)', id: 'panchang-section' },
    { label: 'Horoscope (Rashifal)', id: 'horoscope-section' },
    { label: 'Nakshatra Matrix', id: 'nakshatra-section' },
    { label: 'Kundli Milan (Match)', id: 'compatibility-section' },
    { label: 'Vimshottari Dasha', id: 'dasha-section' },
    { label: 'Astrologer Consult', id: 'astrologers-section' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#090D16]/95 backdrop-blur-xl border-b border-[#C9A86A]/20 shadow-[0_8px_30px_rgba(0,0,0,0.6)]'
          : 'bg-[#090D16]/70 border-b border-white/[0.04]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo with Vedic Jyotish Heritage */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C9A86A]/25 to-[#936A26]/30 border border-[#C9A86A]/40 flex items-center justify-center shadow-[0_0_15px_rgba(201,168,106,0.25)] group-hover:scale-105 transition-transform">
            <span className="text-base text-[#C9A86A] font-serif font-bold">ॐ</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-wider text-white font-serif flex items-center gap-1.5">
              ASTRO<span className="text-[#C9A86A] font-sans font-extrabold text-sm tracking-normal">360</span>
            </span>
            <span className="text-[9px] tracking-[0.16em] text-[#C9A86A]/80 font-mono">
              ज्योतिष • SWISS EPHEMERIS
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-300 font-sans">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="hover:text-[#C9A86A] transition-colors cursor-pointer text-slate-300"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onGetStarted}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A86A] to-[#B8934A] text-[#090D16] text-xs font-bold font-serif shadow-[0_0_20px_rgba(201,168,106,0.35)] hover:shadow-[0_0_25px_rgba(201,168,106,0.5)] hover:scale-105 transition-all cursor-pointer"
          >
            <span>Create Kundli</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {hasProfile ? (
            <button
              onClick={onOpenDashboard}
              className="px-4 py-2.5 text-xs font-medium text-slate-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-xl transition-all cursor-pointer"
            >
              Enter Dashboard
            </button>
          ) : (
            <button
              onClick={onOpenDashboard}
              className="px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Explore Studio
            </button>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onGetStarted}
            className="px-3 py-1.5 rounded-lg bg-[#C9A86A] text-[#070A12] text-[11px] font-semibold"
          >
            Free Chart
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#070A12]/95 backdrop-blur-2xl border-b border-white/[0.08] px-4 py-5 space-y-3 overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-2 text-xs">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="text-left px-3 py-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] text-slate-300 hover:text-[#C9A86A] transition-all"
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="pt-2 border-t border-white/[0.06] flex gap-2">
              <button
                onClick={onOpenDashboard}
                className="flex-1 py-2.5 text-center text-xs font-medium text-slate-200 bg-white/[0.05] rounded-lg"
              >
                {hasProfile ? 'Dashboard' : 'Explore Studio'}
              </button>
              <button
                onClick={onGetStarted}
                className="flex-1 py-2.5 text-center text-xs font-semibold text-[#070A12] bg-[#C9A86A] rounded-lg shadow-[0_0_15px_rgba(201,168,106,0.3)]"
              >
                Get Birth Chart
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
