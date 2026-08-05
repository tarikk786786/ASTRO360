import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, AlertTriangle, Lightbulb, RefreshCw, Clock, CheckCircle2, 
  Shield, Globe, Sparkles, Gem, BookOpen, Heart, Flame, Sun, Moon, 
  Download, Cpu, Filter, Info, Scale
} from 'lucide-react';
import type { UserProfile } from '../types';
import { calculatePlanetaryPositions } from '../lib/astroCalculations';

interface LiveCosmicDiagnosticsProps {
  userProfile: UserProfile;
}

export type DiagnosticCategory = 'all' | 'career' | 'wealth' | 'mind' | 'vitality' | 'relationships' | 'spiritual';
export type TraditionFilter = 'all' | 'islamic' | 'vedic' | 'western' | 'chinese' | 'cbt';

interface MultiTraditionDiagnosticItem {
  id: string;
  category: Exclude<DiagnosticCategory, 'all'>;
  planet: string;
  symbol: string;
  transitSign: string;
  houseAffected: string;
  intensityScore: number;
  statusColor: string;
  
  // 1. What is Happening
  whatIsHappening: string;
  
  // 2. Why it is Happening (Root Cause)
  whyIsHappening: string;

  // 3. Multi-Tradition Solutions
  solutions: {
    islamic: {
      title: string;
      duaArabic?: string;
      duaTranslation?: string;
      action: string;
    };
    vedic: {
      gemstone: string;
      mantra: string;
      ritual: string;
    };
    western: {
      crystal: string;
      affirmation: string;
      archangel?: string;
    };
    chinese: {
      element: string;
      fengShuiZone: string;
      action: string;
    };
    cbt: {
      framework: string;
      exercise: string;
    };
  };
}

export default function LiveCosmicDiagnostics({ userProfile }: LiveCosmicDiagnosticsProps) {
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [selectedCategory, setSelectedCategory] = useState<DiagnosticCategory>('all');
  const [selectedTradition, setSelectedTradition] = useState<TraditionFilter>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const name = userProfile?.name || 'Seeker';

  // Compute live planetary ephemeris positions dynamically
  const positions = useMemo(() => {
    const dateStr = lastUpdated.toISOString().split('T')[0];
    const timeStr = lastUpdated.toTimeString().split(' ')[0].substring(0, 5);
    return calculatePlanetaryPositions(dateStr, timeStr, 24.178);
  }, [lastUpdated]);

  // Derived ephemeris planets
  const sun = positions.find(p => p.name === 'Sun');
  const moon = positions.find(p => p.name === 'Moon');
  const mars = positions.find(p => p.name === 'Mars');
  const mercury = positions.find(p => p.name === 'Mercury');
  const jupiter = positions.find(p => p.name === 'Jupiter');
  const venus = positions.find(p => p.name === 'Venus');
  const saturn = positions.find(p => p.name === 'Saturn');
  const rahu = positions.find(p => p.name === 'Rahu');
  const ketu = positions.find(p => p.name === 'Ketu');

  // Multi-Tradition Live Diagnostic Database for 9 Planetary Energies
  const diagnosticItems: MultiTraditionDiagnosticItem[] = useMemo(() => [
    {
      id: 'saturn-career',
      category: 'career',
      planet: 'Saturn (Shani / زحل)',
      symbol: '♄',
      transitSign: saturn?.sign || 'Aquarius ♒',
      houseAffected: `${saturn?.house || '7th House'} (Structure & Career)`,
      intensityScore: 88,
      statusColor: 'from-amber-500 to-amber-700',
      whatIsHappening: 'High friction in career deadlines, milestone delays, and intense scrutiny from senior leadership or business partners.',
      whyIsHappening: `Saturn transits your ${saturn?.house || '7th House'} in ${saturn?.sign || 'Aquarius'}, enforcing systematic discipline, testing endurance, and dissolving weak foundations.`,
      solutions: {
        islamic: {
          title: 'Surah Ash-Sharh & Istighfar Protocol',
          duaArabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا · إِنَّ مَعَ الْعُسْرِ يُسْرًا',
          duaTranslation: 'For indeed, with hardship comes ease. Indeed, with hardship comes ease.',
          action: 'Recite Istighfar ("Astaghfirullah") 100 times after Fajr and give discreet Sadaqah (charity) on Fridays.'
        },
        vedic: {
          gemstone: 'Blue Sapphire (Neelam) / Amethyst',
          mantra: 'Om Sham Shanaishcharaya Namah (108x)',
          ritual: 'Offer mustard oil & black sesame seeds under a Peepal tree on Saturday evening.'
        },
        western: {
          crystal: 'Black Tourmaline & Onyx',
          affirmation: 'I am patient, disciplined, and build enduring success step by step.',
          archangel: 'Archangel Cassiel (Angel of Solitude & Boundaries)'
        },
        chinese: {
          element: 'Earth (土) / Metal (金)',
          fengShuiZone: 'North-East Zone',
          action: 'Place heavy black obsidian spheres in North-East sector to ground chaotic qi.'
        },
        cbt: {
          framework: 'Locus of Control Restructuring',
          exercise: 'Separate external delays from personal actions. List 3 controllable tasks every morning.'
        }
      }
    },
    {
      id: 'jupiter-wealth',
      category: 'wealth',
      planet: 'Jupiter (Guru / مشتری)',
      symbol: '♃',
      transitSign: jupiter?.sign || 'Pisces ♓',
      houseAffected: `${jupiter?.house || '10th House'} (Wisdom & Abundance)`,
      intensityScore: 94,
      statusColor: 'from-emerald-500 to-teal-700',
      whatIsHappening: 'Expansion of financial opportunities, unexpected mentorship support, and high receptivity for strategic wealth investments.',
      whyIsHappening: `Jupiter transits your ${jupiter?.house || '10th House'} in ${jupiter?.sign || 'Pisces'}, casting benefic aspects on your wealth & knowledge houses.`,
      solutions: {
        islamic: {
          title: 'Asmaul Husna: Ya Razzaq, Ya Ghani',
          duaArabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا',
          duaTranslation: 'O Allah, I ask You for beneficial knowledge, good provision, and accepted deeds.',
          action: 'Recite "Ya Razzaq" (O Provider) 308 times at sunrise with full conviction.'
        },
        vedic: {
          gemstone: 'Yellow Sapphire (Pukhraj) / Citrine',
          mantra: 'Om Gram Greem Groom Sah Gurave Namah (108x)',
          ritual: 'Offer chana dal (yellow lentils) to teachers or elders on Thursday morning.'
        },
        western: {
          crystal: 'Golden Citrine & Pyrite',
          affirmation: 'Prosperity and divine abundance flow to me through all righteous avenues.',
          archangel: 'Archangel Zadkiel (Angel of Abundance & Mercy)'
        },
        chinese: {
          element: 'Wood (木) / Water (水)',
          fengShuiZone: 'South-East Wealth Corner',
          action: 'Add a 9-step flowing water fountain in South-East to stimulate prosperity qi.'
        },
        cbt: {
          framework: 'Abundance Mindset Anchoring',
          exercise: 'Log daily gratitude items and write down 2 new monetization ideas before noon.'
        }
      }
    },
    {
      id: 'sun-vitality',
      category: 'vitality',
      planet: 'Sun (Surya / شمس)',
      symbol: '☉',
      transitSign: sun?.sign || 'Aries ♈',
      houseAffected: `${sun?.house || '1st House'} (Core Vitality & Aura)`,
      intensityScore: 91,
      statusColor: 'from-orange-500 to-red-600',
      whatIsHappening: 'High solar vitality driving executive leadership, but risk of dehydration, cardiac heat, or ego friction if unguided.',
      whyIsHappening: `Sun in ${sun?.sign || 'Aries'} energizes your ${sun?.house || '1st House'}, amplifying bodily thermal prana and solar plexus authority.`,
      solutions: {
        islamic: {
          title: 'Surah Ash-Shams & Solar Reflection',
          duaArabic: 'وَالشَّمْسِ وَضُحَاهَا · وَالْقَمَرِ إِذَا تَلَاهَا',
          duaTranslation: 'By the Sun and its brightness, and by the Moon when it follows it.',
          action: 'Drink water stored in copper vessel at dawn and recite Ayat al-Kursi for physical protection.'
        },
        vedic: {
          gemstone: 'Ruby (Manik) / Red Garnet',
          mantra: 'Om Hram Hreem Hroom Sah Suryaya Namah (108x)',
          ritual: 'Offer Surya Arghya (fresh water facing East at sunrise).'
        },
        western: {
          crystal: 'Sunstone & Carnelian',
          affirmation: 'I radiate confident light, physical vitality, and sovereign grace.',
          archangel: 'Archangel Uriel (Angel of Illumination & Sun Fire)'
        },
        chinese: {
          element: 'Fire (火) / Wood (木)',
          fengShuiZone: 'South Energy Zone',
          action: 'Ensure South area is brightly lit with warm amber lighting to strengthen prestige.'
        },
        cbt: {
          framework: 'Ego-Stamina Regulation',
          exercise: 'Practice 4-7-8 breathwork when feeling heat or frustration in conversations.'
        }
      }
    },
    {
      id: 'moon-mind',
      category: 'mind',
      planet: 'Moon (Chandra / قمر)',
      symbol: '☽',
      transitSign: moon?.sign || 'Taurus ♉',
      houseAffected: `${moon?.house || '4th House'} (Mental Peace & Emotion)`,
      intensityScore: 89,
      statusColor: 'from-blue-500 to-indigo-700',
      whatIsHappening: 'Heightened emotional sensitivity, vivid dream intuition, and susceptibility to environmental mood fluctuations.',
      whyIsHappening: `Moon in ${moon?.sign || 'Taurus'} (${moon?.nakshatra || 'Rohini'} Nakshatra) activates your ${moon?.house || '4th House'} of inner heart peace.`,
      solutions: {
        islamic: {
          title: 'Dua for Anxiety & Ruqyah Protection',
          duaArabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ',
          duaTranslation: 'O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness.',
          action: 'Recite Surah Al-Falaq & Surah An-Nas 3x morning and night before sleep.'
        },
        vedic: {
          gemstone: 'Natural Pearl (Moti) / Moonstone',
          mantra: 'Om Shram Shreem Shroom Sah Chandraya Namah (108x)',
          ritual: 'Drink water in a silver glass on Monday and keep raw milk under moonlight.'
        },
        western: {
          crystal: 'Selene Moonstone & Quartz',
          affirmation: 'My mind is a serene lake. I trust my divine intuition completely.',
          archangel: 'Archangel Gabriel (Angel of Moon, Dreams & Purity)'
        },
        chinese: {
          element: 'Water (水) / Yin Energy',
          fengShuiZone: 'North Sector',
          action: 'Place a clear glass bowl of still water in North bedroom corner to absorb anxiety.'
        },
        cbt: {
          framework: 'Cognitive Reframing of Worry',
          exercise: 'Write down catastrophic thoughts, evaluate evidence for/against, and write balanced truths.'
        }
      }
    },
    {
      id: 'rahu-protection',
      category: 'spiritual',
      planet: 'Rahu (North Node / الراس)',
      symbol: '☊',
      transitSign: rahu?.sign || 'Virgo ♍',
      houseAffected: `${rahu?.house || '11th House'} (Ambition & Illusion)`,
      intensityScore: 92,
      statusColor: 'from-purple-600 to-indigo-900',
      whatIsHappening: 'Intense urge for rapid expansion, risk of speculative traps, confusion from hidden enemies, or digital media overwhelm.',
      whyIsHappening: `Rahu transits ${rahu?.sign || 'Virgo'} in your ${rahu?.house || '11th House'}, generating phantom desires and karmic shadow tests.`,
      solutions: {
        islamic: {
          title: 'Protection from Waswas (Whispers) & Deception',
          duaArabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
          duaTranslation: 'I seek refuge in the Perfect Words of Allah from the evil of what He has created.',
          action: 'Recite "La ilaha illa Allah" 100 times daily to anchor absolute truth and dispel illusion.'
        },
        vedic: {
          gemstone: 'Hessonite Garnet (Gomed)',
          mantra: 'Om Bhram Bhreem Bhroom Sah Rahave Namah (108x)',
          ritual: 'Feed stray dogs or donate blankets to poor individuals on Saturday night.'
        },
        western: {
          crystal: 'Black Obsidian & Labradorite',
          affirmation: 'I see beyond illusion. I walk in truth, protected from all deceit.',
          archangel: 'Archangel Michael (Angel of Protection & Sword of Truth)'
        },
        chinese: {
          element: 'Water (水) Shield',
          fengShuiZone: 'North-West Bagua Area',
          action: 'Place a copper Pixiu or Wind Chime in North-West to block chaotic Sha Qi.'
        },
        cbt: {
          framework: 'Impulse Delay Protocol',
          exercise: 'Institute a mandatory 48-hour waiting rule before making large financial or lifestyle choices.'
        }
      }
    }
  ], [positions, saturn, jupiter, sun, moon, rahu]);

  // Filter items by category and tradition
  const filteredDiagnostics = useMemo(() => {
    return diagnosticItems.filter(item => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      return matchCat;
    });
  }, [diagnosticItems, selectedCategory]);

  // Refresh Ephemeris Handler
  const handleRefresh = () => {
    setIsRefreshing(true);
    setLastUpdated(new Date());
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // PDF Export Function for Complete Diagnostics Report
  const handleExportPdf = () => {
    const printWin = window.open('', '_blank');
    if (printWin) {
      printWin.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Live Multi-Tradition Diagnostic Report — ${name}</title>
            <style>
              body { font-family: system-ui, sans-serif; padding: 40px; color: #0f172a; line-height: 1.6; }
              .h { border-bottom: 3px double #4f46e5; padding-bottom: 16px; margin-bottom: 24px; }
              .title { font-size: 24px; font-weight: 800; color: #3730a3; }
              .item { border: 1px solid #cbd5e1; border-radius: 14px; padding: 20px; margin-bottom: 20px; background: #f8fafc; }
              .item-title { font-size: 18px; font-weight: 700; color: #1e1b4b; }
              .sec { margin-top: 10px; font-size: 12px; }
              .sec-title { font-weight: 700; color: #4338ca; text-transform: uppercase; font-size: 10px; }
              .arabic { font-family: serif; font-size: 18px; color: #14532d; text-align: right; background: #f0fdf4; padding: 10px; border-radius: 8px; margin: 8px 0; }
              .footer { text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 16px; margin-top: 30px; }
            </style>
          </head>
          <body>
            <div class="h">
              <div class="title">LIVE ASTRO360 MULTI-TRADITION DIAGNOSTIC REPORT</div>
              <div>Seeker: ${name} · Timestamp: ${lastUpdated.toLocaleString()}</div>
            </div>

            ${filteredDiagnostics.map(item => `
              <div class="item">
                <div class="item-title">${item.planet} — ${item.houseAffected} (${item.transitSign})</div>
                <div class="sec">
                  <div class="sec-title">1. What Is Happening</div>
                  <div>${item.whatIsHappening}</div>
                </div>
                <div class="sec">
                  <div class="sec-title">2. Root Cause (Why It Is Happening)</div>
                  <div>${item.whyIsHappening}</div>
                </div>
                <div class="sec">
                  <div class="sec-title">3. Islamic Sunnah Solution</div>
                  <div><strong>${item.solutions.islamic.title}</strong></div>
                  ${item.solutions.islamic.duaArabic ? `<div class="arabic">${item.solutions.islamic.duaArabic}</div>` : ''}
                  <div>${item.solutions.islamic.action}</div>
                </div>
                <div class="sec">
                  <div class="sec-title">4. Vedic Gemstone & Mantra</div>
                  <div>Gemstone: <strong>${item.solutions.vedic.gemstone}</strong> | Mantra: <em>${item.solutions.vedic.mantra}</em></div>
                </div>
                <div class="sec">
                  <div class="sec-title">5. Western Crystal & CBT Exercise</div>
                  <div>Crystal: ${item.solutions.western.crystal} | CBT: ${item.solutions.cbt.exercise}</div>
                </div>
              </div>
            `).join('')}

            <div class="footer">
              ASTRO360 Live Cosmic Ephemeris Diagnostics · Confidential Report
            </div>
          </body>
        </html>
      `);
      printWin.document.close();
      printWin.focus();
      setTimeout(() => printWin.print(), 500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-8 text-left">
      {/* 🔮 HEADER & EPHEMERIS LIVE TELEMETRY */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-indigo-500/30 relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 mb-2">
              <Activity className="w-5 h-5 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase">Universal Live Diagnostic Center</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">
              Live Cosmic Diagnostics: <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-400 bg-clip-text text-transparent">All Traditions & Ways</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Real-time ephemeris diagnostics analyzing 9 active planetary influences for {name}. Identifies exact root causes ("Why") and prescribes multi-tradition remedies spanning Sunnah Islamic, Vedic Ratnas, Western Crystals, Chinese BaZi, and CBT Psychology.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-3.5 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 font-mono flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{lastUpdated.toLocaleTimeString()}</span>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-500/30 transition-all cursor-pointer disabled:opacity-50"
              title="Recalculate Real-time Ephemeris"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleExportPdf}
              className="px-4 py-2.5 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" /> Export Report (PDF)
            </button>
          </div>
        </div>

        {/* 🎛️ CONTROLS: CATEGORY & TRADITION SELECTORS */}
        <div className="space-y-4 pt-4 border-t border-white/10 relative z-10">
          {/* Tradition Switcher */}
          <div className="space-y-2">
            <label className="text-[11px] font-mono text-slate-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-indigo-400" /> Highlight Specific Remedy Tradition:
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { id: 'all', label: '🌐 All 5 Traditions Combined' },
                { id: 'islamic', label: '🕌 Authentic Sunnah & Qur\'an' },
                { id: 'vedic', label: '🕉️ Vedic Ratna & Mantras' },
                { id: 'western', label: '🔮 Western Crystals & Archangels' },
                { id: 'chinese', label: '☯️ Chinese BaZi & Feng Shui' },
                { id: 'cbt', label: '🧠 CBT & Psychology' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTradition(t.id as TraditionFilter)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedTradition === t.id
                      ? 'bg-indigo-500/30 text-indigo-200 border border-indigo-500/50 shadow-md shadow-indigo-500/10'
                      : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Life Area Category Pills */}
          <div className="space-y-2">
            <label className="text-[11px] font-mono text-slate-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-amber-400" /> Life Sector Filter:
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { id: 'all', label: '✨ All 9 Planetary Transits' },
                { id: 'career', label: '💼 Career & Structure' },
                { id: 'wealth', label: '💰 Wealth & Abundance' },
                { id: 'vitality', label: '☀️ Vitality & Energy' },
                { id: 'mind', label: '🧠 Mental Peace & Emotion' },
                { id: 'spiritual', label: '🛡️ Spiritual & Rahu Protection' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id as DiagnosticCategory)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    selectedCategory === c.id
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                      : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 📊 DIAGNOSTICS LIST & EXPANDABLE MULTI-TRADITION CARDS */}
      <div className="space-y-6">
        {filteredDiagnostics.map((item) => {
          const isExpanded = expandedItem === item.id || expandedItem === 'all';
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6 relative overflow-hidden text-left hover:border-indigo-500/30 transition-all shadow-xl"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {item.houseAffected}
                    </span>
                    <span className="text-xs text-slate-300 font-semibold">{item.transitSign}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mt-1 flex items-center gap-2">
                    <span className="text-amber-400">{item.symbol}</span>
                    {item.planet}
                  </h3>
                </div>

                {/* Intensity Bar */}
                <div className="w-full sm:w-48 space-y-1 font-mono">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Cosmic Intensity</span>
                    <span className="font-bold text-amber-400">{item.intensityScore}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${item.statusColor}`} style={{ width: `${item.intensityScore}%` }} />
                  </div>
                </div>
              </div>

              {/* 3 Core Columns: 1. What Is Happening, 2. Root Cause (Why), 3. Quick Remedy */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-1.5">
                  <span className="text-[10px] font-mono text-blue-400 font-bold uppercase block flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5" /> 1. What Is Happening
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">{item.whatIsHappening}</p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1.5">
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> 2. Root Cause (Why)
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">{item.whyIsHappening}</p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5" /> 3. Primary Solution
                  </span>
                  <p className="text-xs text-emerald-200 leading-relaxed font-semibold">
                    {item.solutions.islamic.title} & {item.solutions.vedic.gemstone}
                  </p>
                </div>
              </div>

              {/* 🕌 ☯️ 🕉️ MULTI-TRADITION REMEDY BREAKDOWN GRID */}
              <div className="pt-2 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" /> Multi-Tradition Solution Breakdown:
                  </h4>
                  <button
                    onClick={() => setExpandedItem(isExpanded ? null : item.id)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-bold cursor-pointer"
                  >
                    {isExpanded ? 'Collapse Details' : 'Expand All 5 Traditions'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  {/* 1. Islamic Sunnah Solution */}
                  {(selectedTradition === 'all' || selectedTradition === 'islamic') && (
                    <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-2">
                      <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                        🕌 Authentic Sunnah & Qur'an
                      </div>
                      <div className="font-bold text-white text-xs">{item.solutions.islamic.title}</div>
                      {item.solutions.islamic.duaArabic && (
                        <div className="p-2.5 rounded-xl bg-emerald-900/40 text-right font-serif text-emerald-200 text-sm leading-relaxed border border-emerald-500/20">
                          {item.solutions.islamic.duaArabic}
                          <div className="text-[10px] text-left italic font-sans text-emerald-300 mt-1 border-t border-emerald-500/20 pt-1">
                            "{item.solutions.islamic.duaTranslation}"
                          </div>
                        </div>
                      )}
                      <p className="text-slate-300 text-[11px]"><strong>Action:</strong> {item.solutions.islamic.action}</p>
                    </div>
                  )}

                  {/* 2. Vedic Gemstone & Mantra */}
                  {(selectedTradition === 'all' || selectedTradition === 'vedic') && (
                    <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 space-y-2">
                      <div className="font-bold text-amber-300 flex items-center gap-1.5">
                        🕉️ Vedic Ratna & Beej Mantra
                      </div>
                      <p><strong>Gemstone:</strong> <span className="text-amber-200 font-bold">{item.solutions.vedic.gemstone}</span></p>
                      <p className="font-mono text-amber-300 text-[11px]"><strong>Mantra:</strong> {item.solutions.vedic.mantra}</p>
                      <p className="text-slate-300 text-[11px]"><strong>Ritual:</strong> {item.solutions.vedic.ritual}</p>
                    </div>
                  )}

                  {/* 3. Western Crystals & Archangel */}
                  {(selectedTradition === 'all' || selectedTradition === 'western') && (
                    <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-2">
                      <div className="font-bold text-purple-300 flex items-center gap-1.5">
                        🔮 Western Crystal & Archangel
                      </div>
                      <p><strong>Crystal:</strong> <span className="text-purple-200 font-bold">{item.solutions.western.crystal}</span></p>
                      {item.solutions.western.archangel && (
                        <p className="text-[11px] text-purple-300"><strong>Invocation:</strong> {item.solutions.western.archangel}</p>
                      )}
                      <p className="italic text-slate-300 text-[11px]">"{item.solutions.western.affirmation}"</p>
                    </div>
                  )}

                  {/* 4. Chinese BaZi & Feng Shui */}
                  {(selectedTradition === 'all' || selectedTradition === 'chinese') && (
                    <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/30 space-y-2">
                      <div className="font-bold text-red-300 flex items-center gap-1.5">
                        ☯️ Chinese BaZi & Feng Shui
                      </div>
                      <p><strong>Wu Xing Element:</strong> <span className="text-red-200 font-bold">{item.solutions.chinese.element}</span></p>
                      <p><strong>Bagua Zone:</strong> {item.solutions.chinese.fengShuiZone}</p>
                      <p className="text-slate-300 text-[11px]"><strong>Cure:</strong> {item.solutions.chinese.action}</p>
                    </div>
                  )}

                  {/* 5. CBT & Modern Psychology */}
                  {(selectedTradition === 'all' || selectedTradition === 'cbt') && (
                    <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 space-y-2">
                      <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                        🧠 CBT & Psychology
                      </div>
                      <p><strong>Framework:</strong> <span className="text-cyan-200 font-bold">{item.solutions.cbt.framework}</span></p>
                      <p className="text-slate-300 text-[11px]"><strong>Behavioral Exercise:</strong> {item.solutions.cbt.exercise}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
