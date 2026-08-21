import React from 'react';
import { Check, Sparkles, ArrowRight, Zap, Gift, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface PricingSectionProps {
  onSelectPlan: (plan: 'free' | 'premium' | 'consultation') => void;
}

const PLANS = [
  {
    id: 'free' as const,
    name: 'Free Seeker',
    price: '₹0',
    frequency: 'forever free',
    badge: 'Always Free',
    description: 'Essential daily planetary transits, zodiac archetypes, and baseline birth chart calculations.',
    features: [
      'Precision Vedic Natal Chart (Kundli)',
      'Daily transit horoscope & Moon nakshatra',
      '12 Zodiac Sign deep traits & element breakdown',
      'Panchang, Tithi & Abhijit Muhurta lookup',
      'Instant interactive birth chart wheel',
    ],
    cta: 'Generate Free Chart',
    isPopular: false,
  },
  {
    id: 'premium' as const,
    name: 'Cosmic Pro Suite',
    price: '₹0',
    originalPrice: '₹499',
    frequency: 'free early access',
    badge: '🎉 100% FREE TODAY',
    description: 'All 16 Divisional Vargas, 120-Year Vimshottari Mahadashas, and complete PDF dossiers.',
    features: [
      'Full 16 Divisional Charts (D1 to D60 Vargas)',
      '120-Year Vimshottari Mahadasha timeline',
      '36-Guna Ashta Koota marriage compatibility',
      'Personalized Gemstone, Rudraksha & Mantra remedies',
      'Executive Astrological PDF dossier downloads',
      'Zero credit card or payment required',
    ],
    cta: 'Unlock Pro Suite Free',
    isPopular: true,
  },
  {
    id: 'consultation' as const,
    name: 'AI Oracle & Consultations',
    price: '₹0',
    originalPrice: '₹799',
    frequency: 'free community pass',
    badge: 'Instant Access',
    description: 'Conversational 24/7 Vedic AI Astrological Oracle for deep queries on career, love, and life.',
    features: [
      '24/7 AI Astrological Oracle consultation',
      'Career, promotion & business timing guidance',
      'Relationship dynamics & karmic synastry',
      'Vedic remedies & personalized astrological WHY',
      'Complete privacy & instant instant replies',
    ],
    cta: 'Start Free AI Consultation',
    isPopular: false,
  },
];

export default function PricingSection({ onSelectPlan }: PricingSectionProps) {
  return (
    <section id="pricing-section" className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.05] bg-[#070A12]/90">
      <div className="max-w-7xl mx-auto">
        
        {/* Banner */}
        <div className="max-w-3xl mx-auto mb-10 p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-[#C9A86A]/20 via-purple-900/30 to-[#C9A86A]/20 border border-[#C9A86A]/40 text-center shadow-[0_0_30px_rgba(201,168,106,0.15)]">
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-[#C9A86A]">
            <Gift className="w-4 h-4 animate-bounce" />
            <span>SPECIAL EARLY ACCESS: All Pro Charts, AI Consultations & PDF Reports Are 100% FREE!</span>
          </div>
        </div>

        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C9A86A] mb-2 inline-block">
            Universal Access
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif">
            Free Vedic Wisdom for Everyone.
          </h2>
          <p className="text-sm text-slate-300 mt-2 font-normal">
            No paywalls, no hidden subscriptions, and no credit cards required. Explore your cosmic blueprint with full mathematical precision.
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
              {plan.badge && (
                <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-wider shadow-md ${
                  plan.isPopular ? 'bg-[#C9A86A] text-[#070A12]' : 'bg-white/[0.1] text-[#C9A86A] border border-[#C9A86A]/30'
                }`}>
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white font-serif">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{plan.description}</p>
                </div>

                <div className="flex items-baseline gap-2 my-6">
                  <span className="text-3xl sm:text-4xl font-bold text-white font-serif">{plan.price}</span>
                  {plan.originalPrice && (
                    <span className="text-sm line-through text-slate-500 font-mono">{plan.originalPrice}</span>
                  )}
                  <span className="text-xs font-mono text-[#C9A86A] uppercase font-bold">{plan.frequency}</span>
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

        <div className="mt-12 text-center text-xs font-mono text-slate-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>100% Free & Open Access • No Payment or Login Required</span>
        </div>
      </div>
    </section>
  );
}
