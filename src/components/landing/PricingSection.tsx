import React from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface PricingSectionProps {
  onSelectPlan: (plan: 'free' | 'premium' | 'consultation') => void;
}

const PLANS = [
  {
    id: 'free' as const,
    name: 'Free Access',
    price: '₹0',
    frequency: 'forever',
    description: 'Essential daily transits, zodiac archetypes, and baseline birth chart calculation.',
    features: [
      'Basic Natal Chart & Lagna calculation',
      'Daily transit horoscope & lunar phase',
      '12 Zodiac Sign profiles & elemental traits',
      'Panchang & auspicious Tithi lookup',
    ],
    cta: 'Start Free',
    isPopular: false,
  },
  {
    id: 'premium' as const,
    name: 'Cosmic Premium',
    price: '₹499',
    frequency: '/ month',
    description: 'Comprehensive Vedic analytics, multi-year Dasha forecasts, and unlimited AI consultations.',
    features: [
      'Full 16 Divisional Charts (D1 to D60 Vargas)',
      '120-Year Vimshottari Mahadasha timeline',
      '36-Guna Ashta Koota marriage compatibility',
      '24/7 AI Astrological Oracle with memory',
      'Personalized Gemstone, Rudraksha & Mantra remedies',
      'Executive PDF chart dossier downloads',
    ],
    cta: 'Unlock Premium',
    isPopular: true,
  },
  {
    id: 'consultation' as const,
    name: '1-on-1 Consultation',
    price: '₹799+',
    frequency: '/ session',
    description: 'Private 30–60 minute audio/video consultation with a verified senior Vedic scholar.',
    features: [
      'Direct 1-on-1 discussion with an experienced astrologer',
      'In-depth Birth Time Rectification (BTR) assistance',
      'Custom remedial roadmap for career, health & relationships',
      'Private recording and written summary included',
    ],
    cta: 'Book Astrologer',
    isPopular: false,
  },
];

export default function PricingSection({ onSelectPlan }: PricingSectionProps) {
  return (
    <section id="pricing-section" className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.05] bg-[#070A12]/90">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C9A86A] mb-2 inline-block">
            Transparent Plans
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif">
            Simple, honest pricing.
          </h2>
          <p className="text-sm text-slate-300 mt-2 font-normal">
            Start with our full free foundation. Upgrade only when you are ready for deep multi-year forecasts and 1-on-1 guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`relative p-8 rounded-3xl backdrop-blur-xl flex flex-col justify-between transition-all ${
                plan.isPopular
                  ? 'bg-gradient-to-b from-[#0D1220] via-[#0D1220] to-[#070A12] border-2 border-[#C9A86A] shadow-[0_0_40px_rgba(201,168,106,0.25)] scale-105 z-10'
                  : 'bg-[#0D1220]/70 border border-white/[0.08]'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#C9A86A] text-[#070A12] text-[10.5px] font-bold uppercase tracking-wider shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white font-serif">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{plan.description}</p>
                </div>

                <div className="flex items-baseline gap-1 my-6">
                  <span className="text-3xl sm:text-4xl font-bold text-white font-serif">{plan.price}</span>
                  <span className="text-xs font-mono text-slate-400">{plan.frequency}</span>
                </div>

                <ul className="space-y-3 text-xs text-slate-300">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#C9A86A] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => onSelectPlan(plan.id)}
                  className={`w-full py-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-[#C9A86A] to-[#DFBF7A] text-[#070A12] shadow-[0_0_20px_rgba(201,168,106,0.4)] hover:scale-[1.02] active:scale-95'
                      : 'bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.1]'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
