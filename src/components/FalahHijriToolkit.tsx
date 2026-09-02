import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, ArrowRightLeft, Sparkles, RefreshCw, ShieldCheck, CheckCircle2, Heart } from 'lucide-react';

export const HIJRI_MONTHS = [
  { id: 1, en: "Muharram", ar: "محرم", sacred: true },
  { id: 2, en: "Safar", ar: "صفر", sacred: false },
  { id: 3, en: "Rabi' al-Awwal", ar: "ربيع الأول", sacred: false },
  { id: 4, en: "Rabi' al-Thani", ar: "ربيع الآخر", sacred: false },
  { id: 5, en: "Jumada al-Ula", ar: "جمادى الأولى", sacred: false },
  { id: 6, en: "Jumada al-Akhirah", ar: "جمادى الآخرة", sacred: false },
  { id: 7, en: "Rajab", ar: "رجب", sacred: true },
  { id: 8, en: "Sha'ban", ar: "شعبان", sacred: false },
  { id: 9, en: "Ramadan", ar: "رمضان", sacred: true },
  { id: 10, en: "Shawwal", ar: "شوال", sacred: false },
  { id: 11, en: "Dhu al-Qi'dah", ar: "ذو القعدة", sacred: true },
  { id: 12, en: "Dhu al-Hijjah", ar: "ذو الحجة", sacred: true }
];

export function toArabicDigits(n: number | string): string {
  return String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);
}

export default function FalahHijriToolkit() {
  const [gregorianInput, setGregorianInput] = useState<string>(new Date().toISOString().split('T')[0]);
  const [convertedHijri, setConvertedHijri] = useState<string>('');
  
  // Hijri Age Calculator State
  const [birthDate, setBirthDate] = useState<string>('1998-05-15');

  // Convert Gregorian to Hijri
  const convertDate = (gregStr: string) => {
    try {
      const d = new Date(gregStr);
      const fmt = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      const res = fmt.format(d);
      setConvertedHijri(res);
    } catch (e) {
      setConvertedHijri('Invalid Date');
    }
  };

  React.useEffect(() => {
    convertDate(gregorianInput);
  }, [gregorianInput]);

  // Calculate Hijri Age
  const calcAge = (bStr: string) => {
    const bDate = new Date(bStr);
    const now = new Date();
    const diffMs = now.getTime() - bDate.getTime();
    const gregYears = (diffMs / (1000 * 60 * 60 * 24 * 365.25)).toFixed(1);
    const hijriYears = (diffMs / (1000 * 60 * 60 * 24 * 354.36)).toFixed(1);
    return { gregYears, hijriYears };
  };

  const ageRes = calcAge(birthDate);

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl space-y-8">
      {/* HEADER & FALAH BADGE */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4 text-emerald-400" />
            Official Falah.io Smart Hijri Engine (Umm al-Qura)
          </div>
          <h3 className="text-2xl font-bold font-display text-white">Hijri Smart Toolkit & Ramadan Converter</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. GREGORIAN ↔ HIJRI DATE CONVERTER */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 text-left">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-1.5">
              <ArrowRightLeft className="w-4 h-4 text-emerald-400" /> Gregorian ↔ Hijri Converter
            </h4>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
              Umm al-Qura UTC
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-400 font-mono">Select Gregorian Date:</label>
            <input
              type="date"
              value={gregorianInput}
              onChange={(e) => setGregorianInput(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="p-4 rounded-xl bg-emerald-500/10 border border-white/[0.08] space-y-1 text-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Converted Hijri Date</span>
            <p className="text-xl font-serif text-emerald-300 font-bold">{convertedHijri}</p>
          </div>
        </div>

        {/* 2. HIJRI AGE CALCULATOR */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 text-left">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" /> Hijri Age & Birthday Tracker
            </h4>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
              Lunar Year Formula
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-400 font-mono">Enter Date of Birth:</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-mono block">Gregorian Solar Age</span>
              <span className="text-base font-bold font-mono text-white">{ageRes.gregYears} Yrs</span>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-white/[0.08]">
              <span className="text-[10px] text-amber-400 font-mono block">Hijri Lunar Age</span>
              <span className="text-base font-bold font-mono text-amber-300">{ageRes.hijriYears} AH Yrs</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SACRED ISLAMIC MONTHS GRID */}
      <div className="space-y-3 text-left">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-400" /> 12 Sacred Hijri Months (Umm al-Qura Calendar)
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {HIJRI_MONTHS.map((m) => (
            <div
              key={m.id}
              className={`p-3 rounded-xl border text-center space-y-1 ${
                m.sacred
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-slate-400">#{m.id}</span>
                {m.sacred && <span className="text-amber-400 font-bold">Sacred</span>}
              </div>
              <p className="text-lg font-serif font-arabic text-emerald-200">{m.ar}</p>
              <p className="text-xs font-bold text-white">{m.en}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
