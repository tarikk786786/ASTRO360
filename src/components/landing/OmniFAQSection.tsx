import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

export default function OmniFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is ASTRO360?",
      a: "ASTRO360 is a multi-tradition astrology intelligence platform that combines high-precision astronomical calculations (JPL DE440 ephemeris), traditional astrology systems (Vedic, Western, KP, BaZi), personalized timing techniques, and explainable AI presentation."
    },
    {
      q: "Is ASTRO360 scientifically proven?",
      a: "Astronomical calculations (planetary positions, eclipses, sidereal time) are computed with scientific-grade precision (±0.0001°). However, astrological interpretations and predictions belong to traditional symbolic systems and are not established empirical sciences. ASTRO360 strictly separates computational facts from symbolic interpretations."
    },
    {
      q: "Does AI calculate my chart?",
      a: "No. All planetary coordinates, houses, ascendants, and dasha cycles are calculated by deterministic mathematical algorithms. AI is used solely as an explainability and translation layer to summarize the calculated data in plain, elegant language."
    },
    {
      q: "What astrology systems are supported?",
      a: "ASTRO360 supports 9 global traditions: Vedic (Parashari & Jaimini), Western (Tropical & Psychological), Krishnamurti Paddhati (KP System), Chinese (Four Pillars of Destiny / BaZi), Islamic (Ilm al-Falak & Lunar Mansions), Hellenistic, Mayan, Celtic, and Pythagorean Numerology."
    },
    {
      q: "Do I need my exact birth time?",
      a: "An exact birth time provides the highest precision for Ascendant (Lagna), house cusps, and sub-lord timing. If you do not know your exact time, ASTRO360 uses Solar Noon (12:00) and clearly flags house-based interpretations with an approximate quality badge."
    },
    {
      q: "Can I compare Vedic and Western astrology side-by-side?",
      a: "Yes. ASTRO360's Multi-System Consensus engine compares interpretations across traditions to highlight where they agree on major life themes and where their perspectives differ."
    },
    {
      q: "Can professional astrologers use ASTRO360?",
      a: "Yes. Professional Mode exposes raw celestial coordinates, classical rule IDs (BPHS, Tetrabiblos, KP Reader), Ayanamsha toggles (Lahiri, Raman, KP, Fagan-Bradley), house systems, and client dossier exports."
    },
    {
      q: "Is my birth data private and secure?",
      a: "Your birth data is saved securely on your device and encrypted. We do not sell user data, train third-party public AI models on your personal charts, or share private information."
    }
  ];

  return (
    <section id="faq-section" className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-left space-y-8">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          FREQUENTLY ASKED QUESTIONS
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Clear, Transparent Answers
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-mono">
          Understanding our methodology, calculations, and privacy commitments.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#0F172A] border border-white/10 hover:border-white/20 transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
              >
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  {faq.q}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-3 text-xs text-slate-300 leading-relaxed border-t border-white/5 mt-3"
                >
                  {faq.a}
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
