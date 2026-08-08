import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, Star, Sparkles, TrendingUp, Heart, Briefcase, Brain } from 'lucide-react';

interface DailyHoroscopeCardProps {
  sunSign?: string;
  moonSign?: string;
}

const DAILY_INSIGHTS: Record<string, { theme: string; career: string; love: string; health: string; luckyNumber: number; luckyColor: string; overallScore: number }> = {
  'Aries': { theme: 'Bold action brings unexpected rewards today. Mars fuels your ambition.', career: 'A leadership opportunity may present itself. Speak up in meetings.', love: 'Passion runs high — express your feelings directly.', health: 'High energy; channel it through vigorous exercise.', luckyNumber: 9, luckyColor: 'Red', overallScore: 85 },
  'Taurus': { theme: 'Stability meets transformation. Venus brings comfort and beauty.', career: 'Financial matters favor careful planning and long-term investments.', love: 'Sensual energy surrounds you — plan a romantic evening.', health: 'Focus on nourishing foods and grounding activities.', luckyNumber: 6, luckyColor: 'Emerald', overallScore: 78 },
  'Gemini': { theme: 'Communication channels open wide. Mercury sharpens your intellect.', career: 'Networking pays dividends today. Make those connections.', love: 'Stimulating conversations lead to deeper bonds.', health: 'Mental stimulation is key — try puzzles or reading.', luckyNumber: 5, luckyColor: 'Yellow', overallScore: 82 },
  'Cancer': { theme: 'Emotional depth brings wisdom. The Moon illuminates your inner world.', career: 'Trust your intuition about a work decision.', love: 'Nurturing energy draws others to you naturally.', health: 'Water-based activities restore your energy.', luckyNumber: 2, luckyColor: 'Silver', overallScore: 75 },
  'Leo': { theme: 'Your radiance attracts abundance. The Sun crowns your endeavors.', career: 'Creative projects receive recognition. Step into the spotlight.', love: 'Generosity in love returns tenfold today.', health: 'Heart-centered activities and golden sunlight energize you.', luckyNumber: 1, luckyColor: 'Gold', overallScore: 92 },
  'Virgo': { theme: 'Precision and service create opportunities. Mercury refines your vision.', career: 'Detail-oriented work wins praise from superiors.', love: 'Acts of service speak louder than words today.', health: 'Digestive health benefits from mindful eating.', luckyNumber: 7, luckyColor: 'Forest Green', overallScore: 80 },
  'Libra': { theme: 'Harmony and justice guide your path. Venus bestows grace.', career: 'Diplomatic skills resolve a lingering workplace tension.', love: 'Partnership energy is strong — collaborate and co-create.', health: 'Balance active and rest periods equally today.', luckyNumber: 6, luckyColor: 'Rose', overallScore: 83 },
  'Scorpio': { theme: 'Transformation deepens your power. Pluto reveals hidden truths.', career: 'Research and investigation lead to breakthrough insights.', love: 'Vulnerability creates true intimacy — let walls down.', health: 'Detox and renewal practices restore vitality.', luckyNumber: 8, luckyColor: 'Crimson', overallScore: 88 },
  'Sagittarius': { theme: 'Adventure calls your spirit. Jupiter expands horizons.', career: 'International connections or higher learning opportunities arise.', love: 'Shared adventures strengthen romantic bonds.', health: 'Outdoor activities and travel invigorate body and soul.', luckyNumber: 3, luckyColor: 'Purple', overallScore: 86 },
  'Capricorn': { theme: 'Discipline builds lasting legacy. Saturn rewards patience.', career: 'Long-term planning today yields compound returns tomorrow.', love: 'Commitment and reliability deepen trust in relationships.', health: 'Bone and joint care; structured exercise routines help.', luckyNumber: 4, luckyColor: 'Charcoal', overallScore: 77 },
  'Aquarius': { theme: 'Innovation disrupts the ordinary. Uranus sparks genius.', career: 'Unconventional approaches solve problems others can\'t.', love: 'Intellectual connection matters more than tradition today.', health: 'Circulation and nervous system benefit from meditation.', luckyNumber: 11, luckyColor: 'Electric Blue', overallScore: 84 },
  'Pisces': { theme: 'Intuition flows like water. Neptune deepens spiritual sight.', career: 'Creative and artistic pursuits are especially favored.', love: 'Empathic connections create soulful moments.', health: 'Swimming and water therapy restore energetic balance.', luckyNumber: 12, luckyColor: 'Sea Green', overallScore: 79 },
};

export default function DailyHoroscopeCard({ sunSign = 'Leo', moonSign = 'Taurus' }: DailyHoroscopeCardProps) {
  const insight = useMemo(() => DAILY_INSIGHTS[sunSign] || DAILY_INSIGHTS['Leo'], [sunSign]);
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-5 rounded-2xl bg-gradient-to-br from-[#111827] to-[#0f1729] border border-amber-500/20 shadow-lg space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <Sun className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Daily Cosmic Insight</h4>
            <p className="text-[10px] text-slate-400 font-mono">{today} • {sunSign} ☉ / {moonSign} ☽</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-amber-400">Score</span>
          <span className="text-sm font-bold text-amber-300">{insight.overallScore}%</span>
        </div>
      </div>

      <p className="text-xs text-slate-200 leading-relaxed font-medium">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 inline mr-1" />
        {insight.theme}
      </p>

      <div className="grid grid-cols-3 gap-2">
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
          <div className="flex items-center gap-1">
            <Briefcase className="w-3 h-3 text-cyan-400" />
            <span className="text-[9px] font-mono text-cyan-400 font-bold">CAREER</span>
          </div>
          <p className="text-[10px] text-slate-300 leading-snug">{insight.career}</p>
        </div>
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
          <div className="flex items-center gap-1">
            <Heart className="w-3 h-3 text-rose-400" />
            <span className="text-[9px] font-mono text-rose-400 font-bold">LOVE</span>
          </div>
          <p className="text-[10px] text-slate-300 leading-snug">{insight.love}</p>
        </div>
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
          <div className="flex items-center gap-1">
            <Brain className="w-3 h-3 text-emerald-400" />
            <span className="text-[9px] font-mono text-emerald-400 font-bold">HEALTH</span>
          </div>
          <p className="text-[10px] text-slate-300 leading-snug">{insight.health}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-white/5 pt-2">
        <span>Lucky Number: <strong className="text-amber-300">{insight.luckyNumber}</strong></span>
        <span>Lucky Color: <strong className="text-amber-300">{insight.luckyColor}</strong></span>
        <span className="text-[9px] text-slate-600">Updated at sunrise</span>
      </div>
    </motion.div>
  );
}
