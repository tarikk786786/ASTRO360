import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Check, ChevronDown, Search, Sparkles } from 'lucide-react';
import { useGlobalConfig } from '../context/GlobalConfigContext';
import { toast } from 'sonner';

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  region: 'Global' | 'Europe & Americas' | 'Middle East' | 'East Asia' | 'Southeast Asia' | 'South Asia';
}

export const LANGUAGES: LanguageOption[] = [
  // ── Global Lingua Franca & Americas
  { code: 'en', name: 'English (US / Global)', nativeName: 'English', flag: '🇺🇸', region: 'Global' },
  { code: 'en-gb', name: 'English (UK)', nativeName: 'English (UK)', flag: '🇬🇧', region: 'Europe & Americas' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', region: 'Europe & Americas' },
  { code: 'pt', name: 'Portuguese (Brazil)', nativeName: 'Português (Brasil)', flag: '🇧🇷', region: 'Europe & Americas' },
  { code: 'pt-pt', name: 'Portuguese (Portugal)', nativeName: 'Português (Portugal)', flag: '🇵🇹', region: 'Europe & Americas' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', region: 'Europe & Americas' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', region: 'Europe & Americas' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', region: 'Europe & Americas' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', region: 'Europe & Americas' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', region: 'Europe & Americas' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦', region: 'Europe & Americas' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', region: 'Europe & Americas' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷', region: 'Europe & Americas' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', region: 'Europe & Americas' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴', region: 'Europe & Americas' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰', region: 'Europe & Americas' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮', region: 'Europe & Americas' },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿', region: 'Europe & Americas' },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺', region: 'Europe & Americas' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴', region: 'Europe & Americas' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', region: 'Middle East' },

  // ── Middle East & North Africa
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', region: 'Middle East' },
  { code: 'fa', name: 'Persian (Farsi)', nativeName: 'فارسی', flag: '🇮🇷', region: 'Middle East' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', region: 'Middle East' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱', region: 'Middle East' },

  // ── East Asia
  { code: 'zh', name: 'Chinese (Simplified)', nativeName: '简体中文', flag: '🇨🇳', region: 'East Asia' },
  { code: 'zh-tw', name: 'Chinese (Traditional)', nativeName: '繁體中文', flag: '🇹🇼', region: 'East Asia' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', region: 'East Asia' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', region: 'East Asia' },

  // ── Southeast Asia
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', region: 'Southeast Asia' },
  { code: 'th', name: 'Thai', nativeName: 'ภาษาไทย', flag: '🇹🇭', region: 'Southeast Asia' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', region: 'Southeast Asia' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾', region: 'Southeast Asia' },
  { code: 'tl', name: 'Filipino / Tagalog', nativeName: 'Tagalog', flag: '🇵🇭', region: 'Southeast Asia' },

  // ── South Asia
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', region: 'South Asia' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', region: 'South Asia' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', region: 'South Asia' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', region: 'South Asia' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', region: 'South Asia' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', region: 'South Asia' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', region: 'South Asia' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳', region: 'South Asia' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', region: 'South Asia' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', flag: '🕉️', region: 'South Asia' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', flag: '🇳🇵', region: 'South Asia' },
  { code: 'si', name: 'Sinhala', nativeName: 'සිංහල', flag: '🇱🇰', region: 'South Asia' },
];

interface GlobalLanguageSelectorProps {
  compact?: boolean;
  align?: 'left' | 'right';
}

export default function GlobalLanguageSelector({ compact = false, align = 'right' }: GlobalLanguageSelectorProps) {
  const { config, updateConfig } = useGlobalConfig();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLang = useMemo(() => {
    return LANGUAGES.find(l => l.code === config.language) || LANGUAGES[0];
  }, [config.language]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const filteredLanguages = useMemo(() => {
    let list = LANGUAGES;
    if (selectedRegion !== 'All') {
      list = list.filter(l => l.region === selectedRegion || (selectedRegion === 'Global' && l.code === 'en'));
    }
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter(l => 
      l.name.toLowerCase().includes(q) || 
      l.nativeName.toLowerCase().includes(q) ||
      l.code.toLowerCase().includes(q) ||
      l.region.toLowerCase().includes(q)
    );
  }, [search, selectedRegion]);

  const handleSelectLanguage = (lang: LanguageOption) => {
    const isRtl = ['ar', 'fa', 'ur', 'he'].includes(lang.code);
    updateConfig({ language: lang.code as any, isRtl });
    
    // Update HTML lang and direction
    document.documentElement.lang = lang.code;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    
    setIsOpen(false);
    setSearch('');
    toast.success(`🌐 Switched to ${lang.nativeName} (${lang.name})`);
  };

  const regions = ['All', 'Europe & Americas', 'Middle East', 'East Asia', 'Southeast Asia', 'South Asia'];

  return (
    <div className="relative z-50 inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-3 py-1.5 rounded-xl bg-[#0F172A]/90 border border-white/10 hover:border-amber-400/50 text-xs font-mono text-white flex items-center gap-2 cursor-pointer transition-all shadow-md active:scale-95 group ${compact ? 'text-[11px] px-2 py-1' : ''}`}
        aria-label="Select Worldwide Language"
        title="Worldwide Multi-Language Selector"
      >
        <Globe className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
        <span className="font-semibold">{selectedLang.flag} {selectedLang.nativeName}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-amber-400' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} mt-2 w-80 sm:w-96 max-h-[460px] overflow-hidden rounded-2xl bg-[#090E17]/98 border border-white/[0.12] p-3 shadow-2xl space-y-2.5 backdrop-blur-2xl`}
          >
            {/* Header Badge */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white font-mono">Global Language Matrix</span>
              </div>
              <span className="text-[10px] text-amber-300 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                45+ Worldwide Locales
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search worldwide languages (e.g. Spanish, Arabic, 日本語)..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#0F172A] border border-white/10 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                autoFocus
              />
            </div>

            {/* Region Filter Chips */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none font-mono text-[10px]">
              {regions.map(r => (
                <button
                  key={r}
                  onClick={() => setSelectedRegion(r)}
                  className={`px-2 py-0.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    selectedRegion === r
                      ? 'bg-white text-black font-semibold shadow-sm font-bold'
                      : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Language list */}
            <div className="max-h-64 overflow-y-auto custom-scrollbar space-y-1 pr-1">
              {filteredLanguages.map((lang) => {
                const isSelected = selectedLang.code === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelectLanguage(lang)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-400/15 text-amber-300 font-bold border border-white/[0.12] shadow-sm'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white border border-transparent'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 truncate">
                      <span className="text-base leading-none">{lang.flag}</span>
                      <div>
                        <div className="font-bold text-white leading-tight">{lang.nativeName}</div>
                        <div className="text-[10px] text-slate-400 font-sans leading-tight">
                          {lang.name} • <span className="text-slate-500">{lang.region}</span>
                        </div>
                      </div>
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                  </button>
                );
              })}
              {filteredLanguages.length === 0 && (
                <div className="p-4 text-center text-xs text-slate-400 font-mono">
                  No language found for "{search}"
                </div>
              )}
            </div>

            {/* Footer Notice */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Universal RTL & LTR Support</span>
              <span className="text-emerald-400">100% In-Browser</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
