import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, ShieldCheck, Sparkles, Check, Heart, Flame } from 'lucide-react';

interface Gemstone {
  type: 'Lagna' | 'Ishta' | 'Bhagya';
  stone: string;
  weight: string;
  metal: string;
  finger: string;
  mantra: string;
  benefit: string;
  color: string;
}

interface Rudraksha {
  mukhi: string;
  rulingPlanet: string;
  deity: string;
  mantra: string;
  benefit: string;
}

const GEMSTONES: Gemstone[] = [
  { type: 'Lagna', stone: 'Blue Sapphire (Neelam)', weight: '4.25 Carats', metal: 'White Gold / Silver', finger: 'Middle Finger (Saturn)', mantra: 'Om Sham Shanayscharaya Namah', benefit: 'Protection, focus, authority & karmic resilience.', color: 'border-blue-500/40 text-blue-300' },
  { type: 'Ishta', stone: 'Emerald (Panna)', weight: '5.50 Carats', metal: 'Yellow Gold', finger: 'Little Finger (Mercury)', mantra: 'Om Bum Budhaya Namah', benefit: 'Intellectual brilliance, business expansion & eloquence.', color: 'border-emerald-500/40 text-emerald-300' },
  { type: 'Bhagya', stone: 'Yellow Sapphire (Pukhraj)', weight: '6.15 Carats', metal: 'Yellow Gold', finger: 'Index Finger (Jupiter)', mantra: 'Om Gram Greem Groom Sah Gurave Namah', benefit: 'Divine luck, spiritual wisdom & financial prosperity.', color: 'border-amber-500/40 text-amber-300' }
];

const RUDRAKSHAS: Rudraksha[] = [
  { mukhi: '7 Mukhi', rulingPlanet: 'Saturn', deity: 'Goddess Mahalakshmi', mantra: 'Om Hroom Namah', benefit: 'Overcomes Financial Blockages & Shani Dhaiya/Sade Sati' },
  { mukhi: '4 Mukhi', rulingPlanet: 'Mercury', deity: 'Lord Brahma', mantra: 'Om Hreem Namah', benefit: 'Enhances Memory, Communication & Public Speaking' },
  { mukhi: '5 Mukhi', rulingPlanet: 'Jupiter', deity: 'Lord Kalagni Rudra', mantra: 'Om Hreem Namah', benefit: 'Universal Peace, Health & Spiritual Cleansing' }
];

export default function GemstoneRudrakshaSuite() {
  const [selectedGem, setSelectedGem] = useState<Gemstone>(GEMSTONES[0]);

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-white/10 shadow-2xl space-y-5 text-left relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" /> Gemstone & Sacred Rudraksha Prescription Engine
          </h3>
          <p className="text-xs text-slate-400 font-mono pt-0.5">
            Anukool (Lagna), Ishta (5th Lord) & Bhagya (9th Lord) Gemstones & 1–14 Mukhi Rudrakshas
          </p>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30 font-bold">
          Prana Pratishtha Energy Matched
        </span>
      </div>

      {/* GEMSTONES SECTION */}
      <div className="space-y-3">
        <span className="text-xs font-mono font-bold text-amber-400 block">Recommended Natal Gemstones (Ratna):</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {GEMSTONES.map((gem, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02, y: -2 }}
              onClick={() => setSelectedGem(gem)}
              className={`p-4 rounded-2xl bg-[#0B1220] border ${gem.color} space-y-2.5 shadow-lg cursor-pointer transition-all ${
                selectedGem.type === gem.type ? 'ring-2 ring-emerald-400 bg-emerald-950/20' : ''
              }`}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                  {gem.type} Ratna
                </span>
                <span className="text-xs font-bold font-mono">{gem.weight}</span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">{gem.stone}</h4>
                <p className="text-[11px] text-slate-400 font-mono pt-0.5">{gem.finger} • {gem.metal}</p>
              </div>

              <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-[11px] text-slate-300">
                <strong className="text-emerald-400 font-mono block">Benefit:</strong> {gem.benefit}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* RUDRAKSHAS SECTION */}
      <div className="space-y-3 pt-2 border-t border-white/10">
        <span className="text-xs font-mono font-bold text-cyan-400 block">Prescribed Sacred Rudrakshas:</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {RUDRAKSHAS.map((rudra, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" /> {rudra.mukhi}
                </h4>
                <span className="text-[10px] font-mono text-cyan-300">{rudra.rulingPlanet}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">{rudra.benefit}</p>
              <span className="text-[10px] font-mono text-purple-300 block pt-1 border-t border-white/5">
                Mantra: {rudra.mantra}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
