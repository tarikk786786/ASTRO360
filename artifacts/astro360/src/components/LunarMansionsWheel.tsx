import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Moon, Sparkles, Compass, CheckCircle2, ChevronRight, Info } from 'lucide-react';

interface Mansion {
  id: number;
  arabicName: string;
  vedicName: string;
  symbol: string;
  degreeSpan: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  spiritualFocus: string;
  recommendedActions: string;
  color: string;
}

export default function LunarMansionsWheel() {
  const [selectedMansion, setSelectedMansion] = useState<Mansion | null>(null);

  const mansions: Mansion[] = useMemo(() => [
    { id: 1, arabicName: 'Al-Sharatan (الشَّرَطَان)', vedicName: 'Ashwini', symbol: '♈', degreeSpan: '00°00\' - 13°20\' Aries', element: 'Fire', spiritualFocus: 'Initiation, swift travel & healing', recommendedActions: 'Start new projects, medical treatments & bold actions.', color: 'text-amber-400 border-amber-500/30' },
    { id: 2, arabicName: 'Al-Butayn (البُطَيْن)', vedicName: 'Bharani', symbol: '♈', degreeSpan: '13°20\' - 26°40\' Aries', element: 'Fire', spiritualFocus: 'Transformation, restraint & duty', recommendedActions: 'Financial audits, shadow work & completing pending tasks.', color: 'text-rose-400 border-rose-500/30' },
    { id: 3, arabicName: 'Al-Thurayya (الثَّرَيَّا)', vedicName: 'Krittika', symbol: '♉', degreeSpan: '26°40\' Aries - 10°00\' Taurus', element: 'Earth', spiritualFocus: 'Purification, clarity & solar fire', recommendedActions: 'Decisive leadership, spiritual detox & cutting bad habits.', color: 'text-amber-300 border-amber-500/30' },
    { id: 4, arabicName: 'Al-Dabaran (الدَّبَرَان)', vedicName: 'Rohini', symbol: '♉', degreeSpan: '10°00\' - 23°20\' Taurus', element: 'Earth', spiritualFocus: 'Abundance, beauty & commerce', recommendedActions: 'Trade negotiations, artistic creation & romance.', color: 'text-emerald-400 border-emerald-500/30' },
    { id: 5, arabicName: 'Al-Haq\'ah (الهَقْعَة)', vedicName: 'Mrigashira', symbol: '♊', degreeSpan: '23°20\' Taurus - 06°40\' Gemini', element: 'Air', spiritualFocus: 'Curiosity, research & travel', recommendedActions: 'Study, writing, publishing & networking.', color: 'text-cyan-400 border-cyan-500/30' },
    { id: 6, arabicName: 'Al-Han\'ah (الهَنْعَة)', vedicName: 'Ardra', symbol: '♊', degreeSpan: '06°40\' - 20°00\' Gemini', element: 'Air', spiritualFocus: 'Emotional breakthrough & storm', recommendedActions: 'Deep self-inquiry, resolving conflicts & detox.', color: 'text-indigo-400 border-indigo-500/30' },
    { id: 7, arabicName: 'Al-Dhira\' (الذِّرَاع)', vedicName: 'Punarvasu', symbol: '♋', degreeSpan: '20°00\' Gemini - 03°20\' Cancer', element: 'Water', spiritualFocus: 'Return of light, renewal & family', recommendedActions: 'Home optimization, reconciliation & spiritual retreat.', color: 'text-blue-400 border-blue-500/30' },
    { id: 8, arabicName: 'Al-Nathrah (النَّثْرَة)', vedicName: 'Pushya', symbol: '♋', degreeSpan: '03°20\' - 16°40\' Cancer', element: 'Water', spiritualFocus: 'Nourishment, wisdom & auspiciousness', recommendedActions: 'Highest auspicious window for purchases & investments.', color: 'text-emerald-300 border-emerald-500/30' },
    { id: 9, arabicName: 'Al-Tarf (الطَّرْف)', vedicName: 'Ashlesha', symbol: '♋', degreeSpan: '16°40\' - 30°00\' Cancer', element: 'Water', spiritualFocus: 'Mystical wisdom & intuitive defense', recommendedActions: 'Occult study, protection prayers & strategy.', color: 'text-purple-400 border-purple-500/30' },
    { id: 10, arabicName: 'Al-Jabhah (الجَبْهَة)', vedicName: 'Magha', symbol: '♌', degreeSpan: '00°00\' - 13°20\' Leo', element: 'Fire', spiritualFocus: 'Ancestral blessings & regal authority', recommendedActions: 'Honoring mentors, executive decisions & charity.', color: 'text-amber-400 border-amber-500/30' },
  ], []);

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-white/10 shadow-2xl space-y-4 text-left relative">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Moon className="w-5 h-5 text-cyan-400" /> 28 Lunar Mansions (Manazil al-Qamar / Nakshatras)
          </h3>
          <p className="text-xs text-slate-400 font-mono pt-0.5">
            Semitic & Vedic Lunar Stations • Spiritual Intentions & Timing
          </p>
        </div>
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/30 font-bold">
          28 Mansions Hub
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {mansions.map((m) => (
          <motion.div
            key={m.id}
            whileHover={{ scale: 1.03, y: -2 }}
            onClick={() => setSelectedMansion(m)}
            className={`p-3.5 rounded-2xl bg-[#0B1220] border ${m.color} hover:border-cyan-400 transition-all cursor-pointer space-y-1.5 shadow-lg group`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-400">Mansion {m.id}</span>
              <span className="text-sm font-bold text-amber-300">{m.symbol}</span>
            </div>

            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                {m.arabicName}
              </h4>
              <span className="text-[10px] font-mono text-emerald-400 block">{m.vedicName}</span>
            </div>

            <span className="text-[9px] font-mono text-slate-400 block truncate">{m.degreeSpan}</span>
          </motion.div>
        ))}
      </div>

      {/* Selected Mansion Detailed Panel */}
      {selectedMansion && (
        <div className="p-4 rounded-2xl bg-[#0B1220] border border-cyan-500/40 space-y-2 text-xs">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <div>
                <h4 className="font-bold text-white font-mono">{selectedMansion.arabicName} — {selectedMansion.vedicName}</h4>
                <span className="text-[10px] text-cyan-400 font-mono">{selectedMansion.degreeSpan} • {selectedMansion.element} Element</span>
              </div>
            </div>
            <button onClick={() => setSelectedMansion(null)} className="text-slate-400 hover:text-white">✕</button>
          </div>

          <div className="space-y-1 text-slate-300 text-[11px]">
            <p><strong className="text-amber-300">Spiritual Intention:</strong> {selectedMansion.spiritualFocus}</p>
            <p><strong className="text-emerald-400">Prescribed Actions:</strong> {selectedMansion.recommendedActions}</p>
          </div>
        </div>
      )}
    </div>
  );
}
