import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const FAQS = [
  {
    q: 'What information do I need to calculate my birth chart?',
    a: 'You need three pieces of information: your exact date of birth, exact time of birth, and place (city/country) of birth. The exact time allows our ephemeris to determine your rising sign (Ascendant/Lagna), which changes roughly every two hours.',
  },
  {
    q: 'What happens if I don’t know my exact birth time?',
    a: 'If you only know an approximate time (e.g. "morning" or within 1–2 hours), we can still calculate your Sun sign, Moon sign, and planetary transits accurately. For high-precision house placements and D9 Navamsha, you can use our Birth Time Rectification (BTR) tool or consult with a verified astrologer.',
  },
  {
    q: 'What astrological system does COSMOS OMNI use?',
    a: 'Our core calculation engine uses high-precision sidereal Vedic Jyotish with the Lahiri (Chitra Paksha) Ayanamsa. We also provide full comparative support for Western Tropical, Krishnamurti Paddhati (KP), Raman, and Islamic Firdaria frameworks.',
  },
  {
    q: 'Is astrology scientifically proven?',
    a: 'No. Astrology is a traditional symbolic and archetypal system developed over millennia for psychological self-reflection, cyclical pattern recognition, and timing. We treat it as an empowering introspective framework rather than a deterministic physical science.',
  },
  {
    q: 'Can I use the platform for free?',
    a: 'Yes. You can generate your full natal birth chart, check daily transits and lunar phases, view zodiac profiles, and explore relationship compatibility completely free without a credit card.',
  },
  {
    q: 'Can I consult with a real astrologer?',
    a: 'Yes. Our platform hosts verified senior Jyotish scholars and counselors available for private 1-on-1 video or audio consultations to discuss complex life questions, Sade Sati mitigation, and personalized remedial measures.',
  },
  {
    q: 'Is my birth information private and secure?',
    a: 'Yes. Your birth date, time, and location coordinates are encrypted and never sold or shared with third parties. You maintain full ownership and can export or delete your profile data anytime with one click.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq-section" className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.05]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C9A86A] mb-2 inline-block">
            Clear Answers
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-300 mt-2 font-normal">
            Honest, transparent answers about our methodology, privacy, and services.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#0D1220]/70 border border-white/[0.06] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm font-semibold text-slate-100 font-serif">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C9A86A] flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-5 pb-5 pt-0 text-xs text-slate-300 leading-relaxed font-normal border-t border-white/[0.03]"
                    >
                      <div className="pt-3">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
