import React, { useState, useMemo } from 'react';
import { Search, Globe2, ArrowUpDown, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import type { PlanetPosition } from '../lib/astroCalculations';

interface EphemerisDataTableProps {
  planetPositions: PlanetPosition[];
}

export default function EphemerisDataTable({ planetPositions }: EphemerisDataTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof PlanetPosition>('degreeDecimal');
  const [sortAsc, setSortAsc] = useState(true);

  const filteredPlanets = useMemo(() => {
    let list = [...planetPositions];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.sign.toLowerCase().includes(q) ||
          p.nakshatra.toLowerCase().includes(q) ||
          p.house.toLowerCase().includes(q) ||
          p.strength.toLowerCase().includes(q)
      );
    }

    list.sort((a, b) => {
      let valA: any = a[sortField];
      let valB: any = b[sortField];

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

    return list;
  }, [planetPositions, searchQuery, sortField, sortAsc]);

  const handleSort = (field: keyof PlanetPosition) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-white/10 shadow-2xl space-y-4 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-3">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-[#06B6D4]" /> Astronomical Ephemeris Data Table
          </h3>
          <p className="text-xs text-slate-400 font-mono pt-0.5">
            Lahiri Sidereal Ayanamsha • Real-time Planetary Positions
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search planets, signs, nakshatras..."
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-[#0B1220] border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar rounded-2xl border border-white/10 bg-[#0B1220]">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#1E293B] text-slate-300 font-bold border-b border-white/10 uppercase text-[10px]">
            <tr>
              <th className="p-3 cursor-pointer hover:text-white" onClick={() => handleSort('name')}>
                Planet <ArrowUpDown className="w-3 h-3 inline ml-1" />
              </th>
              <th className="p-3 cursor-pointer hover:text-white" onClick={() => handleSort('sign')}>
                Sign Placement <ArrowUpDown className="w-3 h-3 inline ml-1" />
              </th>
              <th className="p-3 cursor-pointer hover:text-white" onClick={() => handleSort('degreeDecimal')}>
                Longitude <ArrowUpDown className="w-3 h-3 inline ml-1" />
              </th>
              <th className="p-3 cursor-pointer hover:text-white" onClick={() => handleSort('houseNumber')}>
                House <ArrowUpDown className="w-3 h-3 inline ml-1" />
              </th>
              <th className="p-3 cursor-pointer hover:text-white" onClick={() => handleSort('nakshatra')}>
                Nakshatra & Pada <ArrowUpDown className="w-3 h-3 inline ml-1" />
              </th>
              <th className="p-3 cursor-pointer hover:text-white" onClick={() => handleSort('retrograde')}>
                Motion <ArrowUpDown className="w-3 h-3 inline ml-1" />
              </th>
              <th className="p-3 cursor-pointer hover:text-white" onClick={() => handleSort('strength')}>
                Dignity <ArrowUpDown className="w-3 h-3 inline ml-1" />
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5 text-slate-300">
            {filteredPlanets.map((p, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition-colors">
                <td className="p-3 font-bold text-white flex items-center gap-2">
                  <span className={`text-base ${p.color}`}>{p.symbol}</span>
                  <span>{p.name}</span>
                </td>
                <td className="p-3 font-semibold text-amber-300">{p.sign}</td>
                <td className="p-3 text-cyan-300 font-bold">{p.degree}</td>
                <td className="p-3 text-slate-300">{p.house}</td>
                <td className="p-3 text-emerald-300 font-semibold">{p.nakshatra} (Pada {p.pada})</td>
                <td className="p-3">
                  {p.retrograde ? (
                    <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
                      Retrograde (Rx)
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-white/[0.08]">
                      Direct ({p.speed})
                    </span>
                  )}
                </td>
                <td className="p-3">
                  <span className="text-[10px] font-semibold text-slate-200">
                    {p.strength}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
