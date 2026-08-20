import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';

const TESTIMONIALS = [
  {
    quote: 'I had used astrology apps before, but this was the first time the planetary placements and houses actually felt understandable and respectful.',
    author: 'Priya N.',
    location: 'Bangalore, India',
    focus: 'Birth Chart & Kundli',
  },
  {
    quote: 'Seeing my Vimshottari Mahadasha timeline laid out clearly gave me immense perspective and calm during a major career transition.',
    author: 'David K.',
    location: 'London, UK',
    focus: 'Dasha & Timing',
  },
  {
    quote: 'The synthesis between classical Vedic principles and modern psychology is rare. It avoids fatalistic predictions and focuses on self-awareness.',
    author: 'Dr. Sarah M.',
    location: 'Toronto, Canada',
    focus: 'Synastry & Counseling',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.05] bg-[#070A12]/80">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C9A86A] mb-2 inline-block">
            Member Reflections
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif">
            Readings that resonate.
          </h2>
          <p className="text-sm text-slate-300 mt-2 font-normal">
            Real experiences from people exploring their natal charts and life cycles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-[#0D1220]/70 border border-white/[0.06] backdrop-blur-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#C9A86A] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C9A86A]" />
                  ))}
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-serif italic mb-6">
                  “{t.quote}”
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">{t.author}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{t.location}</div>
                </div>
                <span className="text-[9px] font-mono text-[#C9A86A] uppercase px-2 py-0.5 rounded bg-[#C9A86A]/10 border border-[#C9A86A]/20">
                  {t.focus}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
