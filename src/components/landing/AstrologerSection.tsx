import React, { useState } from 'react';
import { Star, ShieldCheck, Calendar, ArrowRight, UserCheck, Clock, Sparkles, CheckCircle2, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface AstrologerSectionProps {
  onBookAstrologer?: (astrologerId: string) => void;
}

const SCHOLARS = [
  {
    id: 'ananya-sharma',
    name: 'Acharya Ananya Sharma',
    title: 'Vedic Astrologer & Energy Consultant',
    experience: '16+ years experience',
    languages: 'English, Sanskrit',
    rating: 4.95,
    reviews: 420,
    price: '$45 / 30 mins',
    specialties: ['Career Yogas', 'Synastry & Relationships', 'Harmonic Remedies'],
  },
  {
    id: 'rajesh-shastri',
    name: 'Master Rajesh Shastri',
    title: 'Senior Astrological & Muhurta Scholar',
    experience: '24+ years experience',
    languages: 'English, Multilingual',
    rating: 4.98,
    reviews: 860,
    price: '$75 / 45 mins',
    specialties: ['Birth Time Rectification', 'Planetary Cycles', 'Karmic Horary'],
  },
  {
    id: 'elena-vance',
    name: 'Dr. Elena Vance',
    title: 'Hellenistic & Psychological Astrologer',
    experience: '12+ years experience',
    languages: 'English, French',
    rating: 4.92,
    reviews: 310,
    price: '$60 / 30 mins',
    specialties: ['Synastry & Attachment', 'Midheaven Career', 'Solar Returns'],
  },
];

export default function AstrologerSection({ onBookAstrologer }: AstrologerSectionProps) {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleJoinWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail.trim() || !waitlistEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    setIsSubscribed(true);
    toast.success('✨ You are on the VIP Early Access list for 1-on-1 Consultations!');
  };

  return (
    <section id="astrologers-section" className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>Coming Soon • Private VIP Consultations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif">
            Prefer talking to a person?
          </h2>
          <p className="text-sm text-slate-300 mt-2 font-normal">
            Connect with seasoned, verified astrologers for private audio/video chart readings and deep life guidance.
          </p>
        </div>

        {/* VIP Early Access Waitlist Bar */}
        <div className="max-w-xl mx-auto mb-12 p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-[#0D1220] to-indigo-950/40 border border-purple-500/30 backdrop-blur-xl text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-purple-300 font-mono font-bold mb-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Get Notified When 1-on-1 Video Consultations Go Live</span>
          </div>
          {isSubscribed ? (
            <div className="flex items-center justify-center gap-2 py-2 text-xs font-mono text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" /> You're on the priority notification list!
            </div>
          ) : (
            <form onSubmit={handleJoinWaitlist} className="flex gap-2">
              <input
                type="email"
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
                placeholder="Enter your email for VIP early access..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 font-sans"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow-md flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Notify Me</span>
              </button>
            </form>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {SCHOLARS.map((scholar, idx) => (
            <motion.div
              key={scholar.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-3xl bg-[#0D1220]/80 border border-white/[0.08] backdrop-blur-xl flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-3 right-3">
                <span className="text-[10px] font-mono font-bold text-purple-300 bg-purple-900/50 px-2 py-0.5 rounded-full border border-purple-500/30">
                  Coming Soon
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center text-lg font-bold text-white font-serif">
                    {scholar.name.split(' ')[1]?.charAt(0) || 'A'}
                  </div>
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 mr-16">
                    <Star className="w-3.5 h-3.5 fill-amber-300" />
                    <span>{scholar.rating}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-white font-serif">
                  {scholar.name}
                </h3>
                <div className="text-xs text-purple-300 font-medium mb-1">
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
                  <div className="text-[10px] text-purple-400 font-mono font-bold">1-on-1 Video Session</div>
                  <div className="text-xs font-bold text-slate-300 font-mono">{scholar.price}</div>
                </div>
                <button
                  disabled
                  className="px-4 py-2 rounded-xl bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-bold font-mono opacity-80 cursor-not-allowed inline-flex items-center gap-1.5"
                >
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  <span>Coming Soon</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
