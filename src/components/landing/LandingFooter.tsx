import React, { useState } from 'react';
import { Compass, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import LegalPolicyModal, { PolicyType } from '../LegalPolicyModal';

interface LandingFooterProps {
  onNavigateTab: (tabId: string) => void;
}

export default function LandingFooter({ onNavigateTab }: LandingFooterProps) {
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyType>('privacy');

  const openLegal = (policy: PolicyType) => {
    setSelectedPolicy(policy);
    setIsLegalOpen(true);
  };
  return (
    <footer className="relative bg-[#050810] border-t border-white/[0.06] text-slate-400 text-xs py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#C9A86A]/20 to-purple-500/20 border border-[#C9A86A]/30 flex items-center justify-center">
                <Compass className="w-4 h-4 text-[#C9A86A]" />
              </div>
              <span className="text-base font-bold tracking-tight text-white">
                COSMOS <span className="text-[#C9A86A] font-serif italic text-xs">OMNI</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-normal">
              Your birth chart has a story. Discover yours through high-precision Vedic calculations, classical ephemeris algorithms, and intelligent interpretation.
            </p>

            <div className="text-[11px] font-mono text-slate-500">
              Architected & Engineered by Tarik Islam
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
              Product
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigateTab('birth-chart')} className="hover:text-[#C9A86A] transition-colors cursor-pointer">
                  Birth Chart & Kundli
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('horoscope')} className="hover:text-[#C9A86A] transition-colors cursor-pointer">
                  Daily Horoscope
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('compatibility')} className="hover:text-[#C9A86A] transition-colors cursor-pointer">
                  Relationship Synastry
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('tools-catalog')} className="hover:text-[#C9A86A] transition-colors cursor-pointer">
                  150+ Astrological Tools
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('chat')} className="hover:text-[#C9A86A] transition-colors cursor-pointer">
                  AI Astrological Oracle
                </button>
              </li>
            </ul>
          </div>

          {/* Traditions Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
              Traditions
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigateTab('vedic')} className="hover:text-[#C9A86A] transition-colors cursor-pointer">
                  Vedic Jyotish & Nakshatras
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('islamic-suite')} className="hover:text-[#C9A86A] transition-colors cursor-pointer">
                  Islamic Firdaria & Lunar
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('western')} className="hover:text-[#C9A86A] transition-colors cursor-pointer">
                  Western Hellenistic
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('chinese')} className="hover:text-[#C9A86A] transition-colors cursor-pointer">
                  Chinese BaZi & 4 Pillars
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('global-suite')} className="hover:text-[#C9A86A] transition-colors cursor-pointer">
                  30+ World Systems
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
              Legal & Compliance
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => openLegal('privacy')} className="hover:text-[#C9A86A] transition-colors cursor-pointer text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => openLegal('terms')} className="hover:text-[#C9A86A] transition-colors cursor-pointer text-left">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => openLegal('refund')} className="hover:text-[#C9A86A] transition-colors cursor-pointer text-left">
                  Refund & Cancellation Policy
                </button>
              </li>
              <li>
                <button onClick={() => openLegal('shipping')} className="hover:text-[#C9A86A] transition-colors cursor-pointer text-left">
                  Delivery & Shipping Policy
                </button>
              </li>
              <li>
                <button onClick={() => openLegal('contact')} className="hover:text-[#C9A86A] transition-colors cursor-pointer text-left">
                  Contact Us & Grievances
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Disclaimer */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4 text-[10.5px] text-slate-500 font-mono">
          <p>© 2026 COSMOS OMNI. All rights reserved.</p>
          <p className="text-center md:text-right max-w-xl">
            Astrology readings are intended for self-reflection, personal insight, and entertainment. They do not constitute medical, legal, psychological, or financial counsel.
          </p>
        </div>
      </div>

      {/* Compliance Policy Modal */}
      <LegalPolicyModal
        isOpen={isLegalOpen}
        onClose={() => setIsLegalOpen(false)}
        initialPolicy={selectedPolicy}
      />
    </footer>
  );
}
