import React from 'react';
import { Star, ShieldCheck, Calendar, ArrowRight, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface AstrologerSectionProps {
  onBookAstrologer: (astrologerId: string) => void;
}

const SCHOLARS = [
  {
    id: 'ananya-sharma',
    name: 'Acharya Ananya Sharma',
    title: 'Vedic Astrologer & Vastu Consultant',
    experience: '16+ years experience',
    languages: 'English, Hindi, Sanskrit',
    rating: 4.95,
    reviews: 420,
    price: '₹799 / 30 mins',
    specialties: ['Career Yogas', 'Marriage Matching', 'Gemstone Remedies'],
  },
  {
    id: 'rajesh-shastri',
    name: 'Pandit Rajesh Shastri',
    title: 'Senior Jyotish & Muhurta Scholar',
    experience: '24+ years experience',
    languages: 'Hindi, Gujarati, English',
    rating: 4.98,
    reviews: 860,
    price: '₹1,299 / 45 mins',
    specialties: ['Birth Time Rectification', 'Sade Sati', 'Prashna Kundli'],
  },
  {
    id: 'elena-vance',
    name: 'Dr. Elena Vance',
    title: 'Hellenistic & Psychological Astrologer',
    experience: '12+ years experience',
    languages: 'English, French',
    rating: 4.92,
    reviews: 310,
    price: '₹999 / 30 mins',
    specialties: ['Synastry & Attachment', 'Midheaven Career', 'Solar Returns'],
  },
];

export default function AstrologerSection({ onBookAstrologer }: AstrologerSectionProps) {
  return (
    <section id="astrologers-section" className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C9A86A] mb-2 inline-block">
            1-on-1 Personalized Consultations
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif">
            Prefer talking to a person?
          </h2>
          <p className="text-sm text-slate-300 mt-2 font-normal">
            Connect with seasoned, verified astrologers for private audio/video chart readings and deep life guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {SCHOLARS.map((scholar, idx) => (
            <motion.div
              key={scholar.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-3xl bg-[#0D1220]/80 border border-white/[0.08] backdrop-blur-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C9A86A]/20 to-cyan-500/20 border border-[#C9A86A]/30 flex items-center justify-center text-lg font-bold text-white font-serif">
                    {scholar.name.split(' ')[1]?.charAt(0) || 'A'}
                  </div>
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    <Star className="w-3.5 h-3.5 fill-amber-300" />
                    <span>{scholar.rating}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-white font-serif">
                  {scholar.name}
                </h3>
                <div className="text-xs text-[#C9A86A] font-medium mb-1">
                  {scholar.title}
                </div>
                <div className="text-[11px] text-slate-400 font-mono mb-4">
                  {scholar.experience} • {scholar.languages}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {scholar.specialties.map((spec) => (
                    <span key={spec} className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-slate-300 font-mono">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 font-mono">Session Rate</div>
                  <div className="text-sm font-bold text-white font-serif">{scholar.price}</div>
                </div>
                <button
                  onClick={() => onBookAstrologer(scholar.id)}
                  className="px-4 py-2 rounded-xl bg-[#C9A86A] text-[#070A12] text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
