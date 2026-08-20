import React from 'react';
import { Sparkles, Compass, BookOpen, Lock } from 'lucide-react';
import { motion } from 'motion/react';

const TRUST_POINTS = [
  {
    icon: Sparkles,
    title: 'Personalized',
    description: 'Calculated from the precise mathematical coordinates of your birth time and location.',
  },
  {
    icon: Compass,
    title: 'Traditional',
    description: 'Grounded in classical Vedic principles, ephemeris calculations, and sidereal wisdom.',
  },
  {
    icon: BookOpen,
    title: 'Clear',
    description: 'Complex planetary periods and divisional charts translated into human, actionable insights.',
  },
  {
    icon: Lock,
    title: 'Private',
    description: 'Your birth coordinates and queries remain strictly private, encrypted, and under your control.',
  },
];

export default function TrustSection() {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-y border-white/[0.05] bg-[#070A12]/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-[#C9A86A] mb-2">
            Principled & Authentic
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Astrology made personal.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_POINTS.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <motion.div
                key={pt.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-[#C9A86A]/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#C9A86A]/10 border border-[#C9A86A]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-[#C9A86A]" />
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2 font-serif">
                  {pt.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {pt.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
