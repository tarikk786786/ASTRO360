import { Calendar, Cpu, Compass, BookOpen, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HowItWorksSectionProps {
  onStartStep: () => void;
}

const STEPS = [
  {
    step: '01',
    title: 'Enter Birth Coordinates',
    description: 'Provide your exact birth date, time down to the minute, and geographic location for precise local sidereal time calculation.',
    icon: Calendar,
  },
  {
    step: '02',
    title: 'Astronomical Reduction',
    description: 'Our engine applies J2000 epoch orbital mechanics and Lahiri Sidereal Ayanamsha (24° 11\' 14") to compute exact planetary longitudes.',
    icon: Cpu,
  },
  {
    step: '03',
    title: 'Birth Chart Generation',
    description: 'Maps the 12 Bhava houses, 16 Divisional Vargas (D1 to D60), and 120-Year Vimshottari Mahadasha timeline balances.',
    icon: Compass,
  },
  {
    step: '04',
    title: 'Classical Interpretation',
    description: 'Evaluates 100+ classical yogas, Shadbala strengths, and Ashtakavarga bindus grounded in Brihat Parashara Hora Shastra.',
    icon: BookOpen,
  },
];

export default function HowItWorksSection({ onStartStep }: HowItWorksSectionProps) {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.05] text-left">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C9A86A] mb-2 inline-block">
            Scientific & Classical Pipeline
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif">
            How it works
          </h2>
          <p className="text-sm text-slate-300 mt-2 font-normal">
            From raw celestial coordinates to evidence-grounded self-understanding in four transparent stages.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative p-6 rounded-3xl bg-[#0D1220]/70 border border-white/[0.07] backdrop-blur-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold font-serif text-[#C9A86A]">
                      {s.step}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-[#C9A86A]/10 border border-[#C9A86A]/20 flex items-center justify-center">
                      <Icon className="w-4.5 h-4.5 text-[#C9A86A]" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 font-serif">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {s.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/[0.05] text-[10.5px] font-mono text-slate-500 flex items-center justify-between">
                  <span>Stage {idx + 1} of 4</span>
                  {idx < 3 && <ArrowRight className="w-3 h-3 text-[#C9A86A]/60 hidden lg:block" />}
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
