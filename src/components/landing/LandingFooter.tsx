import React, { useState } from 'react';
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
    <footer className="border-t border-white/[0.06] py-16 px-6 sm:px-8 text-[#78716c] text-sm">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">
          <div className="space-y-3 sm:col-span-1">
            <p className="font-[family-name:var(--font-display)] text-[#e8d5a3] text-lg">
              ASTRO360
            </p>
            <p className="text-xs leading-relaxed max-w-xs">
              A personal observatory for your chart. Calculated with care, explained in plain language.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs tracking-[0.1em] uppercase text-[#57534e]">Explore</p>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigateTab('birth-chart')} className="hover:text-[#e8d5a3] transition-colors cursor-pointer">
                  Birth chart
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('free-tools')} className="hover:text-[#e8d5a3] transition-colors cursor-pointer">
                  Free tools
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('compatibility')} className="hover:text-[#e8d5a3] transition-colors cursor-pointer">
                  Compatibility
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('panchanga')} className="hover:text-[#e8d5a3] transition-colors cursor-pointer">
                  Panchang
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-xs tracking-[0.1em] uppercase text-[#57534e]">Legal</p>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => openLegal('privacy')} className="hover:text-[#e8d5a3] transition-colors cursor-pointer text-left">
                  Privacy
                </button>
              </li>
              <li>
                <button onClick={() => openLegal('terms')} className="hover:text-[#e8d5a3] transition-colors cursor-pointer text-left">
                  Terms
                </button>
              </li>
              <li>
                <button onClick={() => openLegal('contact')} className="hover:text-[#e8d5a3] transition-colors cursor-pointer text-left">
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <span>© {new Date().getFullYear()} ASTRO360</span>
          <span className="text-[#57534e] text-center sm:text-right max-w-sm">
            For reflection and personal insight — not medical, legal, or financial advice.
          </span>
        </div>
      </div>

      <LegalPolicyModal
        isOpen={isLegalOpen}
        onClose={() => setIsLegalOpen(false)}
        initialPolicy={selectedPolicy}
      />
    </footer>
  );
}
