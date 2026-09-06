import React, { useState, useEffect } from 'react';
import { Menu, X, Search, ArrowRight } from 'lucide-react';
import { AstroCommandCenterDrawer } from '../navigation/AstroCommandCenterDrawer';

interface OmniLandingNavbarProps {
  onCreateChart?: () => void;
  onStartOnboarding?: (presetData?: Partial<any>) => void;
  onNavigateToTab?: (tabId: string) => void;
  userProfile?: any;
}

const SEARCH_TOOLS = [
  { name: 'Birth chart', tab: 'birth-chart' },
  { name: 'Free calculators', tab: 'free-tools' },
  { name: 'Compatibility', tab: 'compatibility' },
  { name: 'Life periods (Dasha)', tab: 'dasha' },
  { name: "Today's panchang", tab: 'panchanga' },
  { name: 'Charts hub', tab: 'charts' },
  { name: 'Ask a question', tab: 'ask' },
  { name: 'Consultation hub', tab: 'consultation-hub' },
];

export default function OmniLandingNavbar({
  onCreateChart,
  onStartOnboarding,
  onNavigateToTab,
  userProfile,
}: OmniLandingNavbarProps) {
  const handleBegin = onStartOnboarding ? () => onStartOnboarding() : onCreateChart || (() => {});
  const handleNav = (tab: string) => {
    onNavigateToTab?.(tab);
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [commandCenterOpen, setCommandCenterOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandCenterOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredTools = SEARCH_TOOLS.filter((t) =>
    t.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const navLinks = [
    { label: 'Tools', tab: 'free-tools' },
    { label: 'Charts', tab: 'birth-chart' },
    { label: 'Compatibility', tab: 'compatibility' },
    { label: 'Panchang', tab: 'panchanga' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0b0d12]/85 backdrop-blur-xl border-b border-white/[0.06] py-3'
            : 'bg-transparent border-b border-transparent py-4'
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-[family-name:var(--font-display)] text-lg tracking-wide text-[#e8d5a3] hover:text-[#f5f0e6] transition-colors cursor-pointer shrink-0"
          >
            ASTRO360
          </button>

          <nav className="hidden md:flex items-center gap-6 text-sm text-[#a8a29e]">
            {navLinks.map((link) => (
              <button
                key={link.tab}
                onClick={() => handleNav(link.tab)}
                className="hover:text-[#e8d5a3] transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2 rounded-full hover:bg-white/[0.04] text-[#78716c] hover:text-[#e8d5a3] transition-colors cursor-pointer"
              title="Search"
              aria-label="Search tools"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={handleBegin}
              className="hidden sm:inline-flex px-4 py-2 rounded-full bg-[#c9a227] hover:bg-[#d4b03a] text-[#0b0d12] font-medium text-sm transition-colors cursor-pointer"
            >
              Begin
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-[#78716c] hover:text-[#e8d5a3] hover:bg-white/[0.04] transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/[0.06] bg-[#0b0d12]/95 backdrop-blur-xl px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.tab}
                onClick={() => {
                  handleNav(link.tab);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 text-left text-[#a8a29e] hover:text-[#e8d5a3] transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                handleBegin();
                setMobileMenuOpen(false);
              }}
              className="w-full mt-3 py-3 rounded-full bg-[#c9a227] text-[#0b0d12] font-medium text-sm cursor-pointer"
            >
              Begin
            </button>
          </div>
        )}
      </header>

      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 pt-24">
          <div className="w-full max-w-md bg-[#12141a] border border-white/[0.08] rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#e8d5a3]">Find a tool</span>
              <button
                onClick={() => setSearchModalOpen(false)}
                className="p-1 text-[#78716c] hover:text-[#e8d5a3] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <input
              type="text"
              autoFocus
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Birth chart, panchang, compatibility…"
              className="w-full p-3 rounded-xl bg-[#0b0d12] border border-white/[0.08] text-[#f5f0e6] text-sm placeholder-[#57534e] focus:outline-none focus:border-[#c9a227]/40"
            />

            <div className="max-h-64 overflow-y-auto space-y-1">
              {filteredTools.map((tool) => (
                <button
                  key={tool.tab}
                  onClick={() => {
                    handleNav(tool.tab);
                    setSearchModalOpen(false);
                  }}
                  className="w-full p-3 rounded-xl hover:bg-white/[0.04] text-left flex items-center justify-between gap-2 group cursor-pointer transition-colors"
                >
                  <span className="text-sm text-[#f5f0e6] group-hover:text-[#e8d5a3]">{tool.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#c9a227]/40 group-hover:text-[#c9a227]" />
                </button>
              ))}
              {filteredTools.length === 0 && (
                <p className="text-center py-4 text-sm text-[#57534e]">Nothing matched that search.</p>
              )}
            </div>

            <p className="text-[11px] text-[#57534e] text-center">
              Press ⌘K for the full command center
            </p>
          </div>
        </div>
      )}

      <AstroCommandCenterDrawer
        isOpen={commandCenterOpen}
        onClose={() => setCommandCenterOpen(false)}
        activeTab="landing"
        onNavigate={(tab) => {
          handleNav(tab);
          setCommandCenterOpen(false);
        }}
        userProfile={userProfile}
      />
    </>
  );
}
