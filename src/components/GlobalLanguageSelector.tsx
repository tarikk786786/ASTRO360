import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useGlobalConfig } from '../context/GlobalConfigContext';

interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'কন্নড়', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' }
];

export default function GlobalLanguageSelector() {
  const { config, updateConfig } = useGlobalConfig();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const selectedLang = LANGUAGES.find(l => l.code === config.language) || LANGUAGES[0];

  return (
    <div className="relative z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1.5 rounded-xl bg-[#111827] border border-white/10 hover:border-cyan-400 text-xs font-mono text-white flex items-center gap-2 cursor-pointer transition-all shadow-md"
      >
        <Globe className="w-4 h-4 text-cyan-400" />
        <span>{selectedLang.flag} {selectedLang.nativeName}</span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 max-h-64 overflow-y-auto rounded-2xl bg-[#111827] border border-cyan-500/40 p-2 shadow-2xl space-y-1 custom-scrollbar">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                updateConfig({ language: lang.code as any });
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-mono flex items-center justify-between transition-colors cursor-pointer ${
                selectedLang.code === lang.code
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{lang.flag}</span> {lang.nativeName} ({lang.name})
              </span>
              {selectedLang.code === lang.code && <Check className="w-3.5 h-3.5 text-cyan-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
