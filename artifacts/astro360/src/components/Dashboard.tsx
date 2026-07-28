import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Star, Globe2, Target, 
  Heart, ArrowRight, Zap, Flame, MessageCircle,
  Sun, Moon, Shield, Compass
} from 'lucide-react';
import { TRADITIONS, type CategoryInfo, type UserProfile } from '../types';

interface DashboardProps {
  onNavigate: (tab: string) => void;
  userProfile: UserProfile;
}

function getZodiacSign(month: number, day: number): { sign: string; emoji: string } {
  if ((month===3&&day>=21)||(month===4&&day<=19)) return{sign:'Aries',emoji:'♈'};
  if ((month===4&&day>=20)||(month===5&&day<=20)) return{sign:'Taurus',emoji:'♉'};
  if ((month===5&&day>=21)||(month===6&&day<=20)) return{sign:'Gemini',emoji:'♊'};
  if ((month===6&&day>=21)||(month===7&&day<=22)) return{sign:'Cancer',emoji:'♋'};
  if ((month===7&&day>=23)||(month===8&&day<=22)) return{sign:'Leo',emoji:'♌'};
  if ((month===8&&day>=23)||(month===9&&day<=22)) return{sign:'Virgo',emoji:'♍'};
  if ((month===9&&day>=23)||(month===10&&day<=22)) return{sign:'Libra',emoji:'♎'};
  if ((month===10&&day>=23)||(month===11&&day<=21)) return{sign:'Scorpio',emoji:'♏'};
  if ((month===11&&day>=22)||(month===12&&day<=21)) return{sign:'Sagittarius',emoji:'♐'};
  if ((month===12&&day>=22)||(month===1&&day<=19)) return{sign:'Capricorn',emoji:'♑'};
  if ((month===1&&day>=20)||(month===2&&day<=18)) return{sign:'Aquarius',emoji:'♒'};
  return{sign:'Pisces',emoji:'♓'};
}

function getMoonPhase(): {phase:string;emoji:string} {
  const now=new Date();const syn=29.53;const kn=new Date(2000,0,6,18,14);
  const d=(now.getTime()-kn.getTime())/(1000*60*60*24);const a=((d%syn)+syn)%syn;
  if(a<1.85)return{phase:'New Moon',emoji:'🌑'};
  if(a<7.38)return{phase:'Waxing Crescent',emoji:'🌒'};
  if(a<9.23)return{phase:'First Quarter',emoji:'🌓'};
  if(a<14.77)return{phase:'Waxing Gibbous',emoji:'🌔'};
  if(a<16.61)return{phase:'Full Moon',emoji:'🌕'};
  if(a<22.15)return{phase:'Waning Gibbous',emoji:'🌖'};
  if(a<23.99)return{phase:'Last Quarter',emoji:'🌗'};
  return{phase:'Waning Crescent',emoji:'🌘'};
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } }
};

export function Dashboard({ onNavigate, userProfile }: DashboardProps) {
  const [selectedRemedyMedium, setSelectedRemedyMedium] = React.useState<'islamic' | 'vedic' | 'western' | 'chinese' | 'universal'>('islamic');
  const date = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', { 
    weekday: 'long', month: 'long', day: 'numeric' 
  }).format(date);
  
  let zodiacInfo = { sign: 'Unknown', emoji: '✨' };
  if (userProfile.dob) {
    const dob = new Date(userProfile.dob);
    if (!isNaN(dob.getTime())) {
      zodiacInfo = getZodiacSign(dob.getMonth() + 1, dob.getDate());
    }
  }
  
  const moonInfo = getMoonPhase();

  const traditions = [
    { id: 'western', name: 'Western', icon: <Star className="w-5 h-5 text-indigo-400" />, desc: 'Psychological & Archetypal' },
    { id: 'vedic', name: 'Vedic (Jyotish)', icon: <Sun className="w-5 h-5 text-amber-400" />, desc: 'Karmic & Predictive' },
    { id: 'chinese', name: 'Chinese', icon: <Flame className="w-5 h-5 text-red-400" />, desc: 'Five Elements & Animals' },
    { id: 'mayan', name: 'Mayan', icon: <Globe2 className="w-5 h-5 text-emerald-400" />, desc: 'Dreamspell & Time Matrix' },
    { id: 'celtic', name: 'Celtic', icon: <Heart className="w-5 h-5 text-green-400" />, desc: 'Tree Lore & Earth Cycles' },
    { id: 'egyptian', name: 'Egyptian', icon: <Target className="w-5 h-5 text-yellow-400" />, desc: 'Gods & Ancient Wisdom' },
  ];

  const quickActions = [
    { id: 'chat', name: 'Consult Astrologer', icon: <MessageCircle className="w-6 h-6 text-purple-400" />, desc: 'Ask your cosmic questions', colSpan: 2 },
    { id: 'live-diagnostics', name: 'Live Cosmic Diagnostics', icon: <Sparkles className="w-6 h-6 text-amber-400" />, desc: 'What is happening & practical solution', colSpan: 1 },
    { id: 'advisor', name: 'Holistic Life Advisor', icon: <Shield className="w-6 h-6 text-emerald-400" />, desc: 'Multi-axis practical life guidance', colSpan: 1 },
    { id: 'birth-chart', name: 'Birth Chart (Kundli)', icon: <Sparkles className="w-6 h-6 text-indigo-400" />, desc: 'D1-D60 charts & planetary degrees', colSpan: 1 },
    { id: 'master-chart', name: 'Master Overall Chart', icon: <Compass className="w-6 h-6 text-amber-400" />, desc: 'Synthesizes 5 global traditions', colSpan: 1 },
    { id: 'islamic-astrology', name: 'Islamic Astronomy (Nujum)', icon: <Moon className="w-6 h-6 text-cyan-400" />, desc: '28 Lunar Mansions, Prayer & Faraid', colSpan: 1 },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans overflow-y-auto custom-scrollbar starfield p-6 md:p-10 lg:p-14 pb-24">
      <motion.div 
        className="max-w-6xl mx-auto space-y-10"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Welcome Hero */}
        <motion.section variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <p className="text-indigo-400 font-medium mb-1 tracking-wide uppercase text-sm">{formattedDate}</p>
            <h1 className="text-4xl md:text-5xl font-display font-bold">
              Welcome back, <span className="gradient-text">{userProfile.name || 'Traveler'}</span>
            </h1>
          </div>
          <div className="flex gap-4">
            <div className="glass-card px-4 py-2 rounded-2xl flex items-center gap-3 border border-indigo-500/20">
              <span className="text-2xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{zodiacInfo.emoji}</span>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Sun</p>
                <p className="font-medium text-sm">{zodiacInfo.sign}</p>
              </div>
            </div>
            <div className="glass-card px-4 py-2 rounded-2xl flex items-center gap-3 border border-purple-500/20">
              <span className="text-2xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{moonInfo.emoji}</span>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Moon</p>
                <p className="font-medium text-sm">{moonInfo.phase}</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Today's Cosmic Challenge & Solution Remedy Card (Interactive Medium Selector) */}
        <motion.section variants={itemVariants} className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <h2 className="text-xl font-display font-semibold flex items-center">
              <Zap className="w-5 h-5 text-amber-400 mr-2" /> Today's Cosmic Challenge & Solution Remedy
            </h2>

            {/* Interactive Wisdom Medium Selector */}
            <div className="flex items-center gap-1.5 p-1 glass-card rounded-xl border border-white/10 shrink-0">
              {[
                { id: 'islamic', label: 'Islamic (Du’a)', icon: '🌙' },
                { id: 'vedic', label: 'Vedic (Mantra)', icon: '🕉️' },
                { id: 'western', label: 'Western (Affirmation)', icon: '⭐' },
                { id: 'chinese', label: 'Chinese (Feng Shui)', icon: '☯️' },
                { id: 'universal', label: 'Universal', icon: '🌐' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedRemedyMedium(m.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    selectedRemedyMedium === m.id
                      ? 'bg-amber-500/25 text-amber-200 border border-amber-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{m.icon}</span>
                  <span className="hidden sm:inline">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 md:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-slate-900/90 via-slate-950 to-amber-950/20 relative overflow-hidden space-y-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 1. Today's Best Things (Favorable Opportunities) */}
              <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                  1. Today's Best Things ✨
                </span>
                <h3 className="text-sm font-semibold text-emerald-200 pt-1">
                  {selectedRemedyMedium === 'islamic' && 'High Barakah for Learning & Dhikr'}
                  {selectedRemedyMedium === 'vedic' && 'Strong Sun Dignity for Career Focus'}
                  {selectedRemedyMedium === 'western' && 'Trine Aspect for Creative Problem Solving'}
                  {selectedRemedyMedium === 'chinese' && 'Favorable Wood Element Flow for Growth'}
                  {selectedRemedyMedium === 'universal' && 'Peak Morning Mental Clarity & Intuition'}
                </h3>
                <ul className="text-xs text-slate-300 space-y-1 pt-1">
                  <li className="flex items-center gap-1.5 text-emerald-300">
                    <span>✓</span> High potential for resolving pending work
                  </li>
                  <li className="flex items-center gap-1.5 text-emerald-300">
                    <span>✓</span> Good hour for sincere prayers & reflection
                  </li>
                  <li className="flex items-center gap-1.5 text-emerald-300">
                    <span>✓</span> Positive energy for peaceful negotiations
                  </li>
                </ul>
              </div>

              {/* 2. Today's Bad Things / Warnings */}
              <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/30">
                  2. Today's Pitfalls & Warnings ⚠️
                </span>
                <h3 className="text-sm font-semibold text-rose-200 pt-1">
                  {selectedRemedyMedium === 'islamic' && 'Risk of Impatience & Ghaflah (Distraction)'}
                  {selectedRemedyMedium === 'vedic' && 'Saturn Rahu Friction & Communication Delay'}
                  {selectedRemedyMedium === 'western' && 'Mercury Retrograde Shadow & Overthinking'}
                  {selectedRemedyMedium === 'chinese' && 'Water Fire Qi Clash in Late Afternoon'}
                  {selectedRemedyMedium === 'universal' && 'Digital Overstimulation & Sleep Disruptions'}
                </h3>
                <ul className="text-xs text-slate-300 space-y-1 pt-1">
                  <li className="flex items-center gap-1.5 text-rose-300">
                    <span>✕</span> Avoid hasty financial or emotional decisions
                  </li>
                  <li className="flex items-center gap-1.5 text-rose-300">
                    <span>✕</span> Guard against harsh speech during afternoon hours
                  </li>
                  <li className="flex items-center gap-1.5 text-rose-300">
                    <span>✕</span> Do not skip circadian rest and hydration
                  </li>
                </ul>
              </div>

              {/* 3. Why it is Happening (Astrological Cause) */}
              <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30">
                  3. Astrological Why / Root Cause 🌌
                </span>
                <h3 className="text-sm font-semibold text-indigo-200 pt-1">
                  {selectedRemedyMedium === 'islamic' && 'Lunar Mansion Shift (Manzil al-Thurayya)'}
                  {selectedRemedyMedium === 'vedic' && 'Moon Square Saturn & 10th House Dignity'}
                  {selectedRemedyMedium === 'western' && 'Mercury Retrograde & Saturn Square Axis'}
                  {selectedRemedyMedium === 'chinese' && 'Yang Energy Surplus & Deficient Yin Stillness'}
                  {selectedRemedyMedium === 'universal' && 'Circadian Rhythm & Mind Disalignment'}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedRemedyMedium === 'islamic' && 'Heart needs immediate grounding in authentic morning & evening remembrance (Dhikr).'}
                  {selectedRemedyMedium === 'vedic' && 'Karma lord Saturn demands patience, discipline, and charitable acts.'}
                  {selectedRemedyMedium === 'western' && '3rd House mental axis requires mindful breath & written priorities.'}
                  {selectedRemedyMedium === 'chinese' && 'South sector fire energy needs calm water elements for equilibrium.'}
                  {selectedRemedyMedium === 'universal' && 'Mind requires 15 minutes of nature grounding & digital detox.'}
                </p>
              </div>

              {/* 4. Practical Solution & Remedy (Selected Medium Choice) */}
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                  4. Solution ({selectedRemedyMedium.toUpperCase()}) 🔑
                </span>
                <h3 className="text-sm font-semibold text-amber-200 pt-1">Remedial Action To Neutralize Bad Things</h3>
                
                {selectedRemedyMedium === 'islamic' && (
                  <div className="space-y-1.5 text-xs text-emerald-200 font-mono">
                    <p className="text-[11px] text-amber-300 font-bold">حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ</p>
                    <p className="italic">"Hasbunallahu wa ni'mal wakeel" (70x)</p>
                    <p>• Perform 2 Rakat Salatul Hajah</p>
                    <p>• Give morning Sadaqah (Charity)</p>
                  </div>
                )}

                {selectedRemedyMedium === 'vedic' && (
                  <div className="space-y-1.5 text-xs text-emerald-200 font-mono">
                    <p className="text-[11px] text-amber-300 font-bold">ॐ शं शनैश्चराय नमः</p>
                    <p className="italic">"Om Sham Shanaishcharaya Namah" (108x)</p>
                    <p>• Offer water to Sun at sunrise</p>
                    <p>• Donate black sesame or mustard oil</p>
                  </div>
                )}

                {selectedRemedyMedium === 'western' && (
                  <div className="space-y-1.5 text-xs text-emerald-200 font-mono">
                    <p className="text-[11px] text-amber-300 font-bold">AFFIRMATION:</p>
                    <p className="italic">"I remain calm, structured, and focused amidst external noise."</p>
                    <p>• Write down top 3 priorities</p>
                    <p>• Take 10 deep belly breaths before calls</p>
                  </div>
                )}

                {selectedRemedyMedium === 'chinese' && (
                  <div className="space-y-1.5 text-xs text-emerald-200 font-mono">
                    <p className="text-[11px] text-amber-300 font-bold">FENG SHUI HARMONY:</p>
                    <p className="italic">"Place water fountain or bowl in North Sector."</p>
                    <p>• Drink green or chrysanthemum tea</p>
                    <p>• Wear black or blue garments today</p>
                  </div>
                )}

                {selectedRemedyMedium === 'universal' && (
                  <div className="space-y-1.5 text-xs text-emerald-200 font-mono">
                    <p className="text-[11px] text-amber-300 font-bold">MINDFUL PRACTICE:</p>
                    <p className="italic">"15 Minutes Barefoot Grounding on Earth."</p>
                    <p>• No screens 30 mins before sleep</p>
                    <p>• Do one anonymous act of kindness</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Cosmic Energy Cards */}
        <motion.section variants={itemVariants}>
          <h2 className="text-xl font-display font-semibold mb-4 flex items-center">
            <Zap className="w-5 h-5 text-indigo-400 mr-2" /> Current Influences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card p-6 rounded-3xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
              <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-2">Today's Energy</h3>
              <p className="text-2xl font-medium mb-4">High & Creative</p>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                ></motion.div>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-3xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
              <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-2">Lucky Element</h3>
              <div className="flex items-center gap-3 mt-1">
                <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xl font-medium">Fire</p>
                  <p className="text-sm text-gray-400">Action & Passion</p>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-3xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"></div>
              <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-2">Power Hour</h3>
              <div className="flex items-center gap-3 mt-1">
                <div className="p-3 bg-amber-500/20 rounded-xl text-amber-400">
                  <Sun className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xl font-medium">14:00 - 15:30</p>
                  <p className="text-sm text-gray-400">Peak mental clarity</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Quick Actions */}
          <motion.section variants={itemVariants} className="lg:col-span-5">
            <h2 className="text-xl font-display font-semibold mb-4 flex items-center">
              <Sparkles className="w-5 h-5 text-purple-400 mr-2" /> Actions
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <div 
                  key={action.id} 
                  onClick={() => onNavigate(action.id)}
                  className={`glass-card-hover p-5 rounded-3xl border border-white/5 flex flex-col justify-between min-h-[140px] cursor-pointer group ${action.colSpan === 2 ? 'col-span-2' : 'col-span-1'}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="p-2 bg-white/5 rounded-xl group-hover:scale-110 transition-transform">
                      {action.icon}
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{action.name}</h3>
                    <p className="text-sm text-gray-400">{action.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Explore Global Systems */}
          <motion.section variants={itemVariants} className="lg:col-span-7">
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-xl font-display font-semibold flex items-center">
                <Globe2 className="w-5 h-5 text-blue-400 mr-2" /> Global Wisdom
              </h2>
              <button className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center group">
                View All <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {traditions.map((tradition) => (
                <div 
                  key={tradition.id}
                  onClick={() => onNavigate(tradition.id)}
                  className="glass-card-hover p-4 rounded-3xl border border-white/5 cursor-pointer group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors"></div>
                  <div className="flex items-center gap-3 mb-2 relative z-10">
                    <div className="p-2 bg-white/5 rounded-lg">
                      {tradition.icon}
                    </div>
                    <h3 className="font-medium">{tradition.name}</h3>
                  </div>
                  <p className="text-xs text-gray-400 relative z-10">{tradition.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;
