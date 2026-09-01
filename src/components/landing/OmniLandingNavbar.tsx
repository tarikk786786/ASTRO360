import React, { useState, useEffect } from 'react';
import { 
  Sparkles, ArrowRight, Menu, X, ShieldCheck, Search, 
  Compass, Heart, Clock, Gem, Globe, Activity, Star, 
  ChevronDown, BookOpen, Layers, Zap
} from 'lucide-react';
import GlobalLanguageSelector from '../GlobalLanguageSelector';
import { AstroCommandCenterDrawer } from '../navigation/AstroCommandCenterDrawer';

interface OmniLandingNavbarProps {
  onCreateChart?: () => void;
  onExploreHowItWorks?: () => void;
  onNavigateSection?: (sectionId: string) => void;
  onOpenDashboard?: () => void;
  onStartOnboarding?: (presetData?: Partial<any>) => void;
  onNavigateToTab?: (tabId: string) => void;
  userProfile?: any;
}

interface ToolQuickLink {
  name: string;
  tab: string;
  category: 'charts' | 'predictions' | 'love' | 'timing' | 'remedies' | 'labs';
  desc: string;
}

const ALL_TOOL_LINKS: ToolQuickLink[] = [
  { name: 'Free Birth Chart (Kundli)', tab: 'birth-chart', category: 'charts', desc: 'North & South Indian D1 Rashi & planetary positions' },
  { name: 'Divisional Charts (D1–D60)', tab: 'vargas', category: 'charts', desc: 'Navamsha D9, Dashamsha D10, Shodashavarga' },
  { name: 'Shadbala Planetary Potency', tab: 'shadbala', category: 'charts', desc: '6-fold mathematical strength matrix' },
  { name: 'Vimshottari Dasha Timeline', tab: 'dasha', category: 'predictions', desc: '120-year planetary timeline with Antardasha cycles' },
  { name: 'Gochara Planetary Transits', tab: 'transits', category: 'predictions', desc: 'Live planetary movements across your natal houses' },
  { name: 'Sade Sati & Shani Dhaiya', tab: 'sadesati', category: 'predictions', desc: '7.5-year Saturn transit phase diagnostic' },
  { name: 'Ashta Koota 36-Guna Milan', tab: 'compatibility', category: 'love', desc: 'Complete relationship compatibility with Nadi rules' },
  { name: 'Manglik & Kuja Dosha Check', tab: 'dosha-engine', category: 'love', desc: 'Mars 7th house evaluation & cancellation shlokas' },
  { name: 'Daily Vedic Panchanga', tab: 'panchanga', category: 'timing', desc: 'Tithi, Vara, Nakshatra, Yoga, Karana & Rahu Kaal' },
  { name: '24-Hour Planetary Horas', tab: 'muhurta', category: 'timing', desc: 'Diurnal planetary hour calendar for optimal action' },
  { name: 'Shubh Muhurta & Choghadiya', tab: 'muhurta', category: 'timing', desc: 'Abhijit Muhurta & auspicious decision windows' },
  { name: 'Sacred Gemstone Advisor', tab: 'gemstone-suite', category: 'remedies', desc: 'Benefic ratna recommendations with metal & finger' },
  { name: 'Cosmic News & Mundane Hub', tab: 'news-intelligence', category: 'labs', desc: 'Global geopolitical and financial astrology radar' },
  { name: 'Shareable Cosmic Passport', tab: 'passport', category: 'charts', desc: '1-click viral Instagram story & WhatsApp birth chart ID' },
  { name: 'Dual Chart Wheel Studio', tab: 'chart-studio', category: 'charts', desc: 'North Indian Diamond, South Indian & Western 360° Wheel' },
  { name: '30-Page Executive PDF Dossier', tab: 'dossier', category: 'charts', desc: 'Keepsake-grade 7-chapter life architecture book' },
  { name: 'Ask ASTRO360 AI Copilot', tab: 'copilot', category: 'labs', desc: 'Ephemeris-grounded deterministic astrological copilot' },
  { name: 'Daily Muhurta Briefing & App', tab: 'pwa', category: 'timing', desc: 'PWA home screen install & automated Abhijit Muhurta alerts' },
  { name: 'Classical Shloka Library', tab: 'shlokas', category: 'remedies', desc: 'Devanagari Sanskrit sutras, transliterations & word breakdowns' },
  { name: 'Sabian Symbols 360° Degree Lab', tab: 'sabian', category: 'charts', desc: 'Clairvoyant degree archetypes & evolutionary challenges' },
  { name: 'Multi-System Ephemeris Lab', tab: 'ephemeris-lab', category: 'labs', desc: 'Side-by-side Lahiri, KP, Raman & Tropical delta diff' },
  { name: 'Celebrity Charts & Directory', tab: 'directory', category: 'charts', desc: 'Verified ephemeris charts of Einstein, Jobs, Vivekananda' },
  { name: 'Executive Report Generator', tab: 'report-generator', category: 'charts', desc: '18+ page structured analytical client reports' },
  { name: 'AstroCartography Global Map', tab: 'astrocartography', category: 'labs', desc: 'Planetary relocation lines across worldwide cities' },
];

export default function OmniLandingNavbar({
  onCreateChart,
  onExploreHowItWorks,
  onNavigateSection,
  onOpenDashboard,
  onStartOnboarding,
  onNavigateToTab,
  userProfile
}: OmniLandingNavbarProps) {
  const handleCreate = onStartOnboarding ? () => onStartOnboarding() : onCreateChart || (() => {});
  const handleNavSection = (id: string) => {
    if (onNavigateToTab) onNavigateToTab(id);
    else if (onNavigateSection) onNavigateSection(id);
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [commandCenterOpen, setCommandCenterOpen] = useState(false);

  // Bind ⌘K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandCenterOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredTools = ALL_TOOL_LINKS.filter(t => 
    t.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    t.desc.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <>
      {/* 1. Global Announcement Header */}
      <div className="w-full bg-[#090E17] border-b border-white/8 py-2 px-4 text-center text-xs font-mono text-slate-300 flex flex-wrap items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/15 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-400/25">
          <Sparkles className="w-3 h-3 text-amber-400" /> Free-First Open Platform
        </span>
        <span>All 150+ Astrological Ephemeris Calculators & Research Suites are <strong>100% Free</strong>.</span>
        <button
          onClick={handleCreate}
          className="text-amber-400 hover:text-amber-300 font-bold underline underline-offset-2 ml-1 cursor-pointer transition-colors"
        >
          Create My Free Chart →
        </button>
      </div>

      {/* 2. Glass Sticky Navigation Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-[#060A12]/95 backdrop-blur-md border-b border-white/10 shadow-xl py-3'
            : 'bg-[#060A12]/80 backdrop-blur-sm border-b border-white/5 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavSection('hero')} 
            className="flex items-center gap-3 cursor-pointer shrink-0 group"
          >
            <div className="relative w-8 h-8 rounded-xl bg-slate-900 border border-white/15 flex items-center justify-center shadow-inner group-hover:border-amber-400/50 transition-colors">
              <div className="w-4 h-4 rounded-full border border-amber-400/80 group-hover:scale-105 transition-transform" />
              <div className="absolute w-1.5 h-1.5 rounded-full bg-amber-400 top-1.5 right-1.5 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-base tracking-tight text-white font-sans">ASTRO360</span>
              <span className="text-[9px] font-mono text-slate-400 tracking-widest leading-none">INTELLIGENCE</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-mono text-slate-300">
            
            {/* Tools Mega Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                className="text-amber-300 hover:text-amber-200 font-bold transition-colors cursor-pointer flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-white/5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>All Free Tools (150+)</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Dropdown Menu */}
              {toolsDropdownOpen && (
                <div 
                  onMouseLeave={() => setToolsDropdownOpen(false)}
                  className="absolute top-full left-0 mt-2 w-[520px] p-4 rounded-2xl bg-[#0B1220] border border-white/12 shadow-2xl grid grid-cols-2 gap-2 text-left z-50 animate-reveal-up"
                >
                  {ALL_TOOL_LINKS.slice(0, 10).map((tool, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        handleNavSection(tool.tab);
                        setToolsDropdownOpen(false);
                      }}
                      className="p-2.5 rounded-xl hover:bg-white/5 transition-colors text-left group cursor-pointer"
                    >
                      <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors block">{tool.name}</span>
                      <span className="text-[10px] text-slate-400 font-sans block truncate">{tool.desc}</span>
                    </button>
                  ))}
                  <div className="col-span-2 pt-2 border-t border-white/8 flex justify-between items-center text-[11px] font-mono">
                    <span className="text-slate-400">100% Free Calculations</span>
                    <button
                      onClick={() => {
                        handleNavSection('free-tools');
                        setToolsDropdownOpen(false);
                      }}
                      className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Full Catalog</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button onClick={() => handleNavSection('birth-chart')} className="hover:text-white transition-colors cursor-pointer">
              Birth Chart (Kundli)
            </button>
            <button onClick={() => handleNavSection('compatibility')} className="hover:text-white transition-colors cursor-pointer">
              36-Guna Matcher
            </button>
            <button onClick={() => handleNavSection('panchanga')} className="hover:text-white transition-colors cursor-pointer">
              Daily Panchanga
            </button>
            <button onClick={() => handleNavSection('news-intelligence')} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1">
              <Activity className="w-3 h-3 text-cyan-400" />
              <span>News Radar</span>
            </button>
            <button onClick={() => handleNavSection('methodology')} className="hover:text-white transition-colors cursor-pointer">
              Methodology
            </button>
          </nav>

          {/* Action Bar (Search + Language + Command Center + CTAs) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Multi-Language Selector */}
            <div className="hidden sm:block">
              <GlobalLanguageSelector compact={true} />
            </div>

            {/* Master Command Center Button */}
            <button
              onClick={() => setCommandCenterOpen(true)}
              className="px-2.5 py-1.5 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 hover:text-white border border-amber-400/30 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
              title="Open Command Center (⌘K)"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Command Center</span>
              <kbd className="hidden lg:inline bg-amber-400/20 px-1 py-0.2 rounded text-[9px] text-amber-300">⌘K</kbd>
            </button>

            {/* Quick Search Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/8 text-xs font-mono flex items-center gap-2 cursor-pointer transition-all"
              title="Search all tools"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline text-[11px] text-slate-400">Search tools...</span>
            </button>

            {onOpenDashboard && (
              <button
                onClick={onOpenDashboard}
                className="hidden sm:inline-flex px-3.5 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer min-h-[36px] items-center"
              >
                Dashboard
              </button>
            )}

            <button
              onClick={handleCreate}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:from-amber-400 hover:to-amber-200 active:scale-95 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer min-h-[36px]"
            >
              <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
              <span className="hidden sm:inline">Create Free Chart</span>
              <span className="sm:hidden">Chart</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#090E17] border-b border-white/10 p-4 space-y-3 text-left animate-reveal-up">
            <div className="flex flex-col space-y-1 text-xs font-mono text-slate-300">
              <button
                onClick={() => { handleNavSection('free-tools'); setMobileMenuOpen(false); }}
                className="py-2.5 px-3 rounded-lg text-left text-amber-300 font-bold bg-amber-400/10 flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>All 150+ Free Astrology Tools</span>
              </button>
              <button
                onClick={() => { handleNavSection('birth-chart'); setMobileMenuOpen(false); }}
                className="py-2 px-3 rounded-lg text-left hover:bg-white/5 text-slate-200"
              >
                Birth Chart (Kundli)
              </button>
              <button
                onClick={() => { handleNavSection('compatibility'); setMobileMenuOpen(false); }}
                className="py-2 px-3 rounded-lg text-left hover:bg-white/5 text-slate-200"
              >
                36-Guna Compatibility Matcher
              </button>
              <button
                onClick={() => { handleNavSection('panchanga'); setMobileMenuOpen(false); }}
                className="py-2 px-3 rounded-lg text-left hover:bg-white/5 text-slate-200"
              >
                Daily Panchanga & Shubh Muhurta
              </button>
              <button
                onClick={() => { handleNavSection('news-intelligence'); setMobileMenuOpen(false); }}
                className="py-2 px-3 rounded-lg text-left hover:bg-white/5 text-cyan-300 flex items-center gap-1.5"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Cosmic News & Mundane Radar</span>
              </button>
              <button
                onClick={() => { handleNavSection('seo-lab/keywords'); setMobileMenuOpen(false); }}
                className="py-2 px-3 rounded-lg text-left hover:bg-white/5 text-emerald-300 flex items-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>SEO Keyword Research Lab</span>
              </button>
              <button
                onClick={() => { handleNavSection('methodology'); setMobileMenuOpen(false); }}
                className="py-2 px-3 rounded-lg text-left hover:bg-white/5 text-slate-400"
              >
                Ephemeris Methodology
              </button>
            </div>

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <div className="pb-1">
                <span className="text-[10px] text-slate-400 font-mono block mb-1">Select Language:</span>
                <GlobalLanguageSelector compact={false} align="left" />
              </div>
              <button
                onClick={() => { handleCreate(); setMobileMenuOpen(false); }}
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <span>Create My Free Chart</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 3. Search Quick-Finder Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 pt-20">
          <div className="w-full max-w-xl bg-[#0B1220] border border-white/15 rounded-2xl p-5 shadow-2xl space-y-4 text-left animate-reveal-up">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono font-bold text-white uppercase">Instant Tool Quick-Finder</span>
              </div>
              <button
                onClick={() => setSearchModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                autoFocus
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Type to search (e.g. Kundli, Dasha, Compatibility, Panchanga, Sade Sati, Gemstone)..."
                className="w-full p-3 rounded-xl bg-[#060A12] border border-white/15 text-white text-xs font-mono focus:border-amber-400 outline-none"
              />
            </div>

            <div className="max-h-72 overflow-y-auto custom-scrollbar space-y-1.5">
              {filteredTools.length > 0 ? (
                filteredTools.map((tool, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      handleNavSection(tool.tab);
                      setSearchModalOpen(false);
                    }}
                    className="w-full p-3 rounded-xl bg-[#060A12] hover:bg-white/5 border border-white/8 hover:border-amber-400/40 text-left flex items-center justify-between gap-3 group cursor-pointer transition-all"
                  >
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-white group-hover:text-amber-300 font-mono block">{tool.name}</span>
                      <p className="text-[11px] text-slate-400 font-sans">{tool.desc}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 shrink-0 transition-colors" />
                  </button>
                ))
              ) : (
                <div className="text-center py-6 text-xs font-mono text-slate-500">
                  No direct tools found matching "{searchFilter}".
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-white/10 text-center text-[10px] font-mono text-slate-400">
              Press Escape to close • All calculations are 100% Free & Zero-PII
            </div>
          </div>
        </div>
      )}

      {/* 4. Master Command Center Drawer */}
      <AstroCommandCenterDrawer
        isOpen={commandCenterOpen}
        onClose={() => setCommandCenterOpen(false)}
        activeTab="landing"
        onNavigate={(tab) => {
          handleNavSection(tab);
          setCommandCenterOpen(false);
        }}
        userProfile={userProfile}
      />
    </>
  );
}
