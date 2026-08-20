import React from 'react';
import { motion } from 'motion/react';

interface ZodiacGridSectionProps {
  onSelectSign: (signId: string) => void;
}

const ZODIAC_CARDS = [
  { id: 'aries', symbol: '♈', name: 'Aries', dates: 'Mar 21 – Apr 19', element: 'Fire', quality: 'Cardinal', ruler: 'Mars', desc: 'Pioneering initiative, fearless courage, and infectious momentum.' },
  { id: 'taurus', symbol: '♉', name: 'Taurus', dates: 'Apr 20 – May 20', element: 'Earth', quality: 'Fixed', ruler: 'Venus', desc: 'Steadfast loyalty, grounding presence, and mastery of material beauty.' },
  { id: 'gemini', symbol: '♊', name: 'Gemini', dates: 'May 21 – Jun 20', element: 'Air', quality: 'Mutable', ruler: 'Mercury', desc: 'Curious intellect, versatile communication, and quick wit.' },
  { id: 'cancer', symbol: '♋', name: 'Cancer', dates: 'Jun 21 – Jul 22', element: 'Water', quality: 'Cardinal', ruler: 'Moon', desc: 'Profound emotional depth, intuitive shielding, and devoted care.' },
  { id: 'leo', symbol: '♌', name: 'Leo', dates: 'Jul 23 – Aug 22', element: 'Fire', quality: 'Fixed', ruler: 'Sun', desc: 'Radiant leadership, generous warmth, and expressive creativity.' },
  { id: 'virgo', symbol: '♍', name: 'Virgo', dates: 'Aug 23 – Sep 22', element: 'Earth', quality: 'Mutable', ruler: 'Mercury', desc: 'Analytical elegance, practical discernment, and selfless service.' },
  { id: 'libra', symbol: '♎', name: 'Libra', dates: 'Sep 23 – Oct 22', element: 'Air', quality: 'Cardinal', ruler: 'Venus', desc: 'Harmonious mediation, aesthetic refinement, and diplomatic vision.' },
  { id: 'scorpio', symbol: '♏', name: 'Scorpio', dates: 'Oct 23 – Nov 21', element: 'Water', quality: 'Fixed', ruler: 'Mars & Ketu', desc: 'Transformative resilience, penetrative truth-seeking, and power.' },
  { id: 'sagittarius', symbol: '♐', name: 'Sagittarius', dates: 'Nov 22 – Dec 21', element: 'Fire', quality: 'Mutable', ruler: 'Jupiter', desc: 'Philosophical optimism, adventurous spirit, and quest for truth.' },
  { id: 'capricorn', symbol: '♑', name: 'Capricorn', dates: 'Dec 22 – Jan 19', element: 'Earth', quality: 'Fixed', ruler: 'Saturn', desc: 'Unshakable discipline, executive endurance, and legacy building.' },
  { id: 'aquarius', symbol: '♒', name: 'Aquarius', dates: 'Jan 20 – Feb 18', element: 'Air', quality: 'Fixed', ruler: 'Saturn & Rahu', desc: 'Visionary reform, humanitarian intellect, and unique innovation.' },
  { id: 'pisces', symbol: '♓', name: 'Pisces', dates: 'Feb 19 – Mar 20', element: 'Water', quality: 'Mutable', ruler: 'Jupiter', desc: 'Boundless empathy, mystical imagination, and spiritual surrender.' },
];

export default function ZodiacGridSection({ onSelectSign }: ZodiacGridSectionProps) {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C9A86A] mb-2 inline-block">
            The 12 Archetypes
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif">
            Explore the Zodiac
          </h2>
          <p className="text-sm text-slate-300 mt-2 font-normal">
            Discover the elemental qualities, planetary rulers, and core archetypal gifts of each sign.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {ZODIAC_CARDS.map((z, idx) => (
            <motion.div
              key={z.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              onClick={() => onSelectSign(z.id)}
              className="p-6 rounded-2xl bg-[#0D1220]/70 hover:bg-[#0D1220] border border-white/[0.06] hover:border-[#C9A86A]/40 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl text-white group-hover:text-[#C9A86A] transition-colors">
                    {z.symbol}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 uppercase px-2 py-0.5 rounded bg-white/[0.02] border border-white/[0.04]">
                    {z.element} • {z.quality}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white font-serif group-hover:text-[#C9A86A] transition-colors">
                  {z.name}
                </h3>
                <div className="text-[11px] text-[#C9A86A] font-mono mb-2">
                  {z.dates}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {z.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.04] text-[10px] font-mono text-slate-500 flex items-center justify-between">
                <span>Ruler: {z.ruler}</span>
                <span className="group-hover:translate-x-1 transition-transform">Explore →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
