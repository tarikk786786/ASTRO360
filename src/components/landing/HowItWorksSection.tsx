import React from 'react';
import { Calendar, Cpu, Compass, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HowItWorksSectionProps {
  onStartStep: () => void;
}

const STEPS = [
  {
    step: '01',
    title: 'Enter your birth details',
    description: 'Provide your birth date, exact time, and birth city. Precision ensures accurate Ascendant and Nakshatra calculation.',
    icon: Calendar,
  },
  {
    step: '02',
    title: 'Generate your chart',
    description: 'Our ephemeris engine calculates your planetary degrees, 12 Bhava houses, Vimshottari Dasha, and divisional vargas.',
    icon: Cpu,
  },
  {
    step: '03',
    title: 'Explore your reading',
    description: 'Receive crystal-clear explanations of your strengths, relationship tendencies, career timing, and personalized remedies.',
    icon: Compass,
  },
];

export default function HowItWorksSection({ onStartStep }: HowItWorksSectionProps) {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C9A86A] mb-2 inline-block">
            Seamless Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif">
            How it works
          </h2>
          <p className="text-sm text-slate-300 mt-2 font-normal">
            From raw birth coordinates to deep self-understanding in three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                className="relative p-8 rounded-3xl bg-[#0D1220]/70 border border-white/[0.07] backdrop-blur-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-bold font-serif text-[#C9A86A]/70">
                      {s.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#C9A86A]/10 border border-[#C9A86A]/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#C9A86A]" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 font-serif">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {s.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.05] text-[11px] font-mono text-slate-500 flex items-center justify-between">
                  <span>Step {idx + 1} of 3</span>
                  {idx < 2 && <ArrowRight className="w-3.5 h-3.5 text-[#C9A86A]/60 hidden md:block" />}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onStartStep}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C9A86A] to-[#DFBF7A] text-[#070A12] text-xs font-bold shadow-[0_0_25px_rgba(201,168,106,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>Start With Step 01</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
