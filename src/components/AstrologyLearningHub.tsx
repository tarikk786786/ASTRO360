import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Sparkles, Award, CheckCircle2, Search, HelpCircle } from 'lucide-react';

interface EncyclopediaItem {
  id: string;
  category: 'Yoga' | 'Dosha' | 'Planet' | 'Nakshatra' | 'House';
  title: string;
  sanskritName: string;
  description: string;
  effect: string;
  remedy: string;
}

const ENCYCLOPEDIA_DATA: EncyclopediaItem[] = [
  { id: '1', category: 'Yoga', title: 'Gajakesari Yoga', sanskritName: 'गजकेसरी योग', description: 'Formed when Jupiter is in a Kendra (1st, 4th, 7th, 10th) from Moon.', effect: 'Grants high intellect, noble fame, lasting wealth, and widespread respect.', remedy: 'Recite Guru Stotram & offer yellow flowers on Thursday.' },
  { id: '2', category: 'Yoga', title: 'Raja Yoga', sanskritName: 'राज योग', description: 'Formed by conjunction/aspect between Kendra (Quadrant) and Trikona (Trine) lords.', effect: 'Bestows executive leadership, governance power, and political success.', remedy: 'Perform Surya Namaskar at dawn.' },
  { id: '3', category: 'Yoga', title: 'Dhana Yoga', sanskritName: 'धन योग', description: 'Formed by mutual connection between 2nd (Wealth) and 11th (Gains) lords.', effect: 'Brings multiple revenue streams and financial prosperity.', remedy: 'Chant Sri Suktam & maintain clean wealth space.' },
  { id: '4', category: 'Dosha', title: 'Manglik Dosha (Kuja Dosha)', sanskritName: 'मंगल दोष', description: 'Occurs when Mars is in 1st, 4th, 7th, 8th, or 12th house from Lagna.', effect: 'Creates high intensity in partnerships requiring emotional maturity.', remedy: 'Recite Hanuman Chalisa daily; match compatibility with another Manglik.' },
  { id: '5', category: 'Dosha', title: 'Kaal Sarp Dosha', sanskritName: 'काल सर्प दोष', description: 'Occurs when all 7 major planets are hemmed between Rahu and Ketu.', effect: 'Creates initial struggles followed by massive late-life rise to power.', remedy: 'Perform Maha Mrityunjaya Jaap & offer water to Shivling on Mondays.' },
  { id: '6', category: 'Planet', title: 'Exalted Mercury (Budha)', sanskritName: 'बुध (कन्या)', description: 'Mercury placed in its exaltation sign of Virgo (0°-15°).', effect: 'Unmatched analytical brilliance, coding mastery, trade success.', remedy: 'Feed green grass to cows on Wednesday.' }
];

export default function AstrologyLearningHub() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const filteredItems = ENCYCLOPEDIA_DATA.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.sanskritName.includes(searchQuery) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-white/10 shadow-2xl space-y-4 text-left relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" /> Master Astrology Encyclopedia & Learning Hub
          </h3>
          <p className="text-xs text-slate-400 font-mono pt-0.5">
            Encyclopedias for Yogas, Doshas, Planets, Nakshatras & Interactive Quizzes
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Yogas, Doshas, Planets..."
            className="pl-9 pr-4 py-1.5 rounded-xl bg-[#0B1220] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 w-48 sm:w-64"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {['All', 'Yoga', 'Dosha', 'Planet', 'Nakshatra', 'House'].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-md'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            {cat}s
          </button>
        ))}
      </div>

      {/* Encyclopedia Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 hover:border-cyan-500/40 transition-all space-y-2 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">{item.title}</span>
              <span className="text-[10px] font-mono font-bold text-amber-300">{item.sanskritName}</span>
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed">
              {item.description}
            </p>

            <div className="pt-2 border-t border-white/10 space-y-1 text-[10px] font-mono">
              <p><strong className="text-emerald-400">Effect:</strong> {item.effect}</p>
              <p><strong className="text-amber-300">Remedy:</strong> {item.remedy}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
