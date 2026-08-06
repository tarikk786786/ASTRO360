import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Calendar, MessageSquare, Star, Award, CheckCircle2 } from 'lucide-react';

interface Astrologer {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: string;
  badge: string;
}

const ASTROLOGERS: Astrologer[] = [
  { id: '1', name: 'Dr. Parashara Vedant', specialty: 'Vedic Jyotish & Vimshottari Dasha', rating: 4.9, reviews: 412, experience: '22 Yrs Exp', badge: 'Master Scholar' },
  { id: '2', name: 'Sheikh Al-Mansoor', specialty: 'Ilm al-Nujum & 28 Manazil al-Qamar', rating: 4.95, reviews: 389, experience: '19 Yrs Exp', badge: 'Islamic Scholar' },
  { id: '3', name: 'Master Wu Chen', specialty: 'BaZi 4 Pillars & Feng Shui Wu Xing', rating: 4.88, reviews: 294, experience: '16 Yrs Exp', badge: 'BaZi Grandmaster' }
];

export default function CommunityConsultationHub() {
  const [selectedAstro, setSelectedAstro] = useState<Astrologer | null>(null);

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-white/10 shadow-2xl space-y-4 text-left relative">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" /> Astrologer Consultation & Community Q&A Hub
          </h3>
          <p className="text-xs text-slate-400 font-mono pt-0.5">
            Book 1-on-1 Consultations with Certified Astrologers & Engage in Sacred Q&A Forums
          </p>
        </div>
        <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/30 font-bold">
          Verified Astrologers
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ASTROLOGERS.map((astro) => (
          <div
            key={astro.id}
            className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 hover:border-purple-500/40 transition-all space-y-3 shadow-lg group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">{astro.name}</h4>
                <span className="text-[10px] font-mono text-purple-400 block">{astro.specialty}</span>
              </div>
              <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 font-bold">
                {astro.badge}
              </span>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-3 h-3 fill-amber-400" /> {astro.rating} ({astro.reviews} reviews)
              </span>
              <span>{astro.experience}</span>
            </div>

            <button
              onClick={() => setSelectedAstro(astro)}
              className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-md"
            >
              <Calendar className="w-3.5 h-3.5" /> Book Consultation
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
