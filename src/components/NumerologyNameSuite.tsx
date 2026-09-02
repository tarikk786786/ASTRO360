import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Hash, Sparkles, User, CheckCircle2, AlertCircle } from 'lucide-react';

const CHALDEAN_MAP: Record<string, number> = {
  a: 1, i: 1, j: 1, q: 1, y: 1,
  b: 2, c: 2, k: 2, r: 2,
  g: 3, l: 3, s: 3,
  d: 4, m: 4, t: 4,
  e: 5, h: 5, n: 5, x: 5,
  u: 6, v: 6, w: 6,
  o: 7, z: 7,
  f: 8, p: 8
};

export default function NumerologyNameSuite() {
  const [fullName, setFullName] = useState<string>('Tarik Islam');
  const [dob, setDob] = useState<string>('1998-06-15');

  // Chaldean Name Number
  const nameNumber = useMemo(() => {
    let sum = 0;
    const clean = fullName.toLowerCase().replace(/[^a-z]/g, '');
    for (let char of clean) {
      sum += CHALDEAN_MAP[char] || 0;
    }
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((a, b) => a + parseInt(b, 10), 0);
    }
    return sum || 7;
  }, [fullName]);

  // Life Path Number from DOB
  const lifePathNumber = useMemo(() => {
    const digits = dob.replace(/[^0-9]/g, '');
    let sum = digits.split('').reduce((a, b) => a + parseInt(b, 10), 0);
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((a, b) => a + parseInt(b, 10), 0);
    }
    return sum || 3;
  }, [dob]);

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-white/10 shadow-2xl space-y-5 text-left relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Hash className="w-5 h-5 text-cyan-400" /> Chaldean & Pythagorean Numerology Engine
          </h3>
          <p className="text-xs text-slate-400 font-mono pt-0.5">
            Name Vibration Harmony, Life Path, Expression & Destiny Numbers
          </p>
        </div>
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-white/[0.08] font-bold">
          Chaldean Frequency Matrix
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Controls */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 space-y-3">
            <label className="text-xs font-mono font-bold text-amber-400 block">Full Name for Frequency Analysis:</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#111827] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
              placeholder="e.g. Tarik Islam"
            />
          </div>

          <div className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 space-y-3">
            <label className="text-xs font-mono font-bold text-purple-400 block">Date of Birth (Life Path):</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#111827] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Results Cards */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#0B1220] border border-white/[0.08] text-center space-y-2 flex flex-col items-center justify-center">
            <span className="text-xs font-mono text-slate-400">Chaldean Name Number</span>
            <span className="text-4xl font-bold font-mono text-cyan-300">{nameNumber}</span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-white/[0.08]">
              Harmonious Vibration
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#0B1220] border border-white/[0.08] text-center space-y-2 flex flex-col items-center justify-center">
            <span className="text-xs font-mono text-slate-400">Life Path Number</span>
            <span className="text-4xl font-bold font-mono text-amber-300">{lifePathNumber}</span>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-white/[0.08]">
              Destiny Alignment
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
