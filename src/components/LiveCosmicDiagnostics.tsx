import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, AlertTriangle, Lightbulb, RefreshCw, Clock, CheckCircle2, 
  Shield, Globe, Sparkles, Gem, BookOpen, Heart, Flame, Sun, Moon, 
  Download, Cpu, Filter, Info, Scale, Search, Calendar, ChevronDown, CheckSquare, Square
} from 'lucide-react';
import type { UserProfile } from '../types';
import { calculatePlanetaryPositions } from '../lib/astroCalculations';

interface LiveCosmicDiagnosticsProps {
  userProfile: UserProfile;
}

export type DiagnosticCategory = 'all' | 'career' | 'wealth' | 'mind' | 'vitality' | 'relationships' | 'spiritual';
export type TraditionFilter = 'all' | 'islamic' | 'vedic' | 'western' | 'chinese' | 'kabbalah' | 'cbt';

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

  // 3. Multi-Tradition Solutions Across World Faiths
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
    kabbalah: {
      sephira: string;
      hebrewName: string;
      meditation: string;
    };
    cbt: {
      framework: string;
      exercise: string;
    };
  };
}

export default function LiveCosmicDiagnostics({ userProfile }: LiveCosmicDiagnosticsProps) {
  const [diagnosticDate, setDiagnosticDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [diagnosticTime, setDiagnosticTime] = useState<string>(() => new Date().toTimeString().split(' ')[0].substring(0, 5));
  const [useLiveNow, setUseLiveNow] = useState<boolean>(true);
  
  const [selectedCategory, setSelectedCategory] = useState<DiagnosticCategory>('all');
  const [selectedTradition, setSelectedTradition] = useState<TraditionFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [showPlanetaryTable, setShowPlanetaryTable] = useState<boolean>(false);
  const [completedRemedies, setCompletedRemedies] = useState<Record<string, boolean>>({});

  const name = userProfile?.name || 'Seeker';

  // Compute live planetary ephemeris positions dynamically for active date/time
  const positions = useMemo(() => {
    const activeD = useLiveNow ? new Date().toISOString().split('T')[0] : diagnosticDate;
    const activeT = useLiveNow ? new Date().toTimeString().split(' ')[0].substring(0, 5) : diagnosticTime;
    return calculatePlanetaryPositions(activeD, activeT, 24.178);
  }, [useLiveNow, diagnosticDate, diagnosticTime]);

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

  // Multi-Tradition Live Diagnostic Database for All 9 Planetary Energies
  const diagnosticItems: MultiTraditionDiagnosticItem[] = useMemo(() => [
    {
      id: 'saturn-career',
      category: 'career',
      planet: 'Saturn (Shani / زحل / Binah)',
      symbol: '♄',
      transitSign: saturn?.sign || 'Aquarius ♒',
      houseAffected: `${saturn?.house || '7th House'} (Structure & Career)`,
      intensityScore: 88,
      statusColor: 'from-amber-500 to-amber-700',
      whatIsHappening: 'High friction in career deliverables, milestone delays, and intense scrutiny from senior leadership or business partners.',
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
        kabbalah: {
          sephira: 'Binah (Understanding & Form)',
          hebrewName: 'YHVH Elohim (יְהוָה אֱלֹהִים)',
          meditation: 'Meditate on structured boundaries, accepting spiritual refinement through patience.'
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
      planet: 'Jupiter (Guru / مشتری / Chesed)',
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
        kabbalah: {
          sephira: 'Chesed (Lovingkindness & Expansion)',
          hebrewName: 'El (אֵל)',
          meditation: 'Contemplate infinite generosity and channel wealth into charitable deeds.'
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
      planet: 'Sun (Surya / شمس / Tiphereth)',
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
        kabbalah: {
          sephira: 'Tiphereth (Beauty & Central Sun)',
          hebrewName: 'YHVH Eloah Va-Daath (יְהוָה אֱלוֹהַ וָדַעַت)',
          meditation: 'Align heart center with radiant divine sun, balancing mercy and strength.'
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
      planet: 'Moon (Chandra / قمر / Yesod)',
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
        kabbalah: {
          sephira: 'Yesod (Foundation & Subconscious Astral)',
          hebrewName: 'Shaddai El Chai (שַׁדַּי אֵל חָי)',
          meditation: 'Purify memory and subconscious imagery through silver light meditation.'
        },
        cbt: {
          framework: 'Cognitive Reframing of Worry',
          exercise: 'Write down catastrophic thoughts, evaluate evidence for/against, and write balanced truths.'
        }
      }
    },
    {
      id: 'mars-vitality',
      category: 'vitality',
      planet: 'Mars (Mangal / مريخ / Gevurah)',
      symbol: '♂',
      transitSign: mars?.sign || 'Scorpio ♏',
      houseAffected: `${mars?.house || '1st House'} (Courage & Physical Stamina)`,
      intensityScore: 86,
      statusColor: 'from-red-600 to-rose-800',
      whatIsHappening: 'High motor courage, impulse drive, potential for heated arguments or physical inflammation.',
      whyIsHappening: `Mars in ${mars?.sign || 'Scorpio'} activates your ${mars?.house || '1st House'} motor center.`,
      solutions: {
        islamic: {
          title: 'Dua for Anger Control & Courage',
          duaArabic: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
          duaTranslation: 'I seek refuge in Allah from Satan the accursed.',
          action: 'Perform Wudu (ablution) with cold water when anger rises to cool internal thermal fire.'
        },
        vedic: {
          gemstone: 'Red Coral (Moonga)',
          mantra: 'Om Kram Kreem Kroom Sah Bhaumaya Namah (108x)',
          ritual: 'Chant Hanuman Chalisa on Tuesday morning.'
        },
        western: {
          crystal: 'Red Jasper & Bloodstone',
          affirmation: 'I channel my passion and courage into constructive achievement.',
          archangel: 'Archangel Camael (Angel of Courage & Strength)'
        },
        chinese: {
          element: 'Fire (火) / Metal (金)',
          fengShuiZone: 'South-West Zone',
          action: 'Avoid red decor in bedroom; introduce soothing earth tones to absorb excess fire.'
        },
        kabbalah: {
          sephira: 'Gevurah (Strength & Judgment)',
          hebrewName: 'Elohim Gibbor (אֱלֹהִים גִּבּוֹר)',
          meditation: 'Channel righteous discipline and burn away spiritual sloth.'
        },
        cbt: {
          framework: 'Impulse Delay Technique',
          exercise: 'Count backwards from 10 before responding in high-stakes negotiations.'
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
        kabbalah: {
          sephira: 'Daath (Hidden Knowledge & Abyss)',
          hebrewName: 'YHVH El Elyon (יְהוָה אֵל عֶלְיוֹן)',
          meditation: 'Anchor consciousness in divine truth to cross illusion without falling.'
        },
        cbt: {
          framework: 'Impulse Delay Protocol',
          exercise: 'Institute a mandatory 48-hour waiting rule before making large financial or lifestyle choices.'
        }
      }
    }
  ], [positions, saturn, jupiter, sun, moon, mars, rahu]);

  // Filter items by category, search query, and tradition
  const filteredDiagnostics = useMemo(() => {
    return diagnosticItems.filter(item => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch = searchQuery === '' || 
        item.planet.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.whatIsHappening.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.whyIsHappening.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.solutions.islamic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.solutions.vedic.gemstone.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [diagnosticItems, selectedCategory, searchQuery]);

  // Toggle remedy completion tracker
  const toggleRemedyDone = (key: string) => {
    setCompletedRemedies(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const totalRemediesCount = filteredDiagnostics.length * 4;
  const completedCount = Object.values(completedRemedies).filter(Boolean).length;
  const progressPercent = totalRemediesCount > 0 ? Math.round((completedCount / totalRemediesCount) * 100) : 0;

  // Refresh Ephemeris Handler
  const handleRefresh = () => {
    setIsRefreshing(true);
    setUseLiveNow(true);
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
              <div>Seeker: ${name} · Timestamp: ${useLiveNow ? 'Live Ephemeris' : `${diagnosticDate} ${diagnosticTime}`}</div>
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
                  <div class="sec-title">5. Western Crystal & Kabbalah</div>
                  <div>Crystal: ${item.solutions.western.crystal} | Sephira: ${item.solutions.kabbalah.sephira}</div>
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
              Live Cosmic Diagnostics: <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-400 bg-clip-text text-transparent">All World Religions & Ways</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Real-time ephemeris diagnostics analyzing 9 active planetary influences for {name}. Identifies exact root causes ("Why") and prescribes multi-tradition remedies spanning Sunnah Islamic, Vedic Ratnas, Western Crystals, Chinese BaZi, Kabbalah, and CBT Psychology.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              onClick={() => setShowPlanetaryTable(!showPlanetaryTable)}
              className="px-3.5 py-2 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs text-indigo-300 font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Cpu className="w-3.5 h-3.5" /> {showPlanetaryTable ? 'Hide Ephemeris Table' : 'Show Live Ephemeris Grid'}
            </button>
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

        {/* 📅 CUSTOM DATE/TIME OVERRIDE CONTROL */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-indigo-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-bold text-indigo-300 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-indigo-400" /> Diagnostic Transit Date/Time:
            </span>
            <button
              onClick={() => setUseLiveNow(true)}
              className={`px-3 py-1 rounded-xl font-bold transition-all ${
                useLiveNow ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-white/5 text-slate-400'
              }`}
            >
              🟢 Real-time NOW ({new Date().toLocaleTimeString()})
            </button>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <input
              type="date"
              value={diagnosticDate}
              onChange={(e) => {
                setDiagnosticDate(e.target.value);
                setUseLiveNow(false);
              }}
              className="bg-slate-950 border border-slate-700 text-white rounded-xl text-xs p-2 outline-none"
            />
            <input
              type="time"
              value={diagnosticTime}
              onChange={(e) => {
                setDiagnosticTime(e.target.value);
                setUseLiveNow(false);
              }}
              className="bg-slate-950 border border-slate-700 text-white rounded-xl text-xs p-2 outline-none"
            />
          </div>
        </div>

        {/* 📊 EPHEMERIS TABLE DRAWER */}
        {showPlanetaryTable && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 rounded-2xl bg-slate-950 border border-white/10 relative z-10 space-y-3"
          >
            <h4 className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest flex items-center gap-2">
              <Cpu className="w-4 h-4" /> Live Astronomical Positions & Longitudes (9 Planets)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-xs">
              {positions.map(p => (
                <div key={p.name} className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-0.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">{p.symbol} {p.name}</span>
                    <span className="text-[9px] text-amber-400 font-mono font-bold">{p.house}</span>
                  </div>
                  <div className="text-[11px] text-slate-300">{p.sign}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{p.nakshatra} ({p.pada})</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 🎛️ CONTROLS: SEARCH, TRADITION & CATEGORY FILTERS */}
        <div className="space-y-4 pt-2 relative z-10">
          {/* Search Input Bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search diagnostic symptoms, Dua, Gemstones, Planets, or Remedies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-indigo-500 text-white rounded-2xl pl-10 pr-4 py-2.5 text-xs outline-none"
            />
          </div>

          {/* Tradition Switcher */}
          <div className="space-y-2">
            <label className="text-[11px] font-mono text-slate-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-indigo-400" /> Highlight Specific Remedy Tradition:
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { id: 'all', label: '🌐 All 6 Traditions Combined' },
                { id: 'islamic', label: '🕌 Authentic Sunnah & Qur\'an' },
                { id: 'vedic', label: '🕉️ Vedic Ratna & Mantras' },
                { id: 'western', label: '🔮 Western Crystals & Archangels' },
                { id: 'chinese', label: '☯️ Chinese BaZi & Feng Shui' },
                { id: 'kabbalah', label: '✡️ Kabbalah & Sephirot' },
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
                { id: 'all', label: '✨ All Transits' },
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

        {/* 📈 REMEDY ACTION CHECKLIST & PROGRESS BAR */}
        <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10 text-xs">
          <div className="space-y-1">
            <div className="font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Active Remedy Checklist & Progress Tracker
            </div>
            <p className="text-slate-300 text-[11px]">
              {completedCount} of {totalRemediesCount} prescribe remedies checked ({progressPercent}% Complete)
            </p>
          </div>
          <div className="w-full md:w-64 space-y-1">
            <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
              />
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

              {/* 🕌 ☯️ 🕉️ MULTI-TRADITION REMEDY BREAKDOWN GRID WITH ACTION CHECKBOXES */}
              <div className="pt-2 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" /> Multi-Tradition Solution Breakdown & Checklist:
                  </h4>
                  <button
                    onClick={() => setExpandedItem(isExpanded ? null : item.id)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-bold cursor-pointer"
                  >
                    {isExpanded ? 'Collapse Details' : 'Expand All 6 Traditions'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  {/* 1. Islamic Sunnah Solution */}
                  {(selectedTradition === 'all' || selectedTradition === 'islamic') && (
                    <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-2 relative">
                      <div className="flex items-center justify-between font-bold text-emerald-300">
                        <span>🕌 Authentic Sunnah & Qur'an</span>
                        <button
                          onClick={() => toggleRemedyDone(`${item.id}_islamic`)}
                          className="text-emerald-400 hover:text-emerald-300 cursor-pointer"
                        >
                          {completedRemedies[`${item.id}_islamic`] ? <CheckSquare className="w-4 h-4 text-emerald-400" /> : <Square className="w-4 h-4 opacity-50" />}
                        </button>
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
                      <div className="flex items-center justify-between font-bold text-amber-300">
                        <span>🕉️ Vedic Ratna & Beej Mantra</span>
                        <button
                          onClick={() => toggleRemedyDone(`${item.id}_vedic`)}
                          className="text-amber-400 hover:text-amber-300 cursor-pointer"
                        >
                          {completedRemedies[`${item.id}_vedic`] ? <CheckSquare className="w-4 h-4 text-amber-400" /> : <Square className="w-4 h-4 opacity-50" />}
                        </button>
                      </div>
                      <p><strong>Gemstone:</strong> <span className="text-amber-200 font-bold">{item.solutions.vedic.gemstone}</span></p>
                      <p className="font-mono text-amber-300 text-[11px]"><strong>Mantra:</strong> {item.solutions.vedic.mantra}</p>
                      <p className="text-slate-300 text-[11px]"><strong>Ritual:</strong> {item.solutions.vedic.ritual}</p>
                    </div>
                  )}

                  {/* 3. Western Crystals & Archangel */}
                  {(selectedTradition === 'all' || selectedTradition === 'western') && (
                    <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-2">
                      <div className="flex items-center justify-between font-bold text-purple-300">
                        <span>🔮 Western Crystal & Archangel</span>
                        <button
                          onClick={() => toggleRemedyDone(`${item.id}_western`)}
                          className="text-purple-400 hover:text-purple-300 cursor-pointer"
                        >
                          {completedRemedies[`${item.id}_western`] ? <CheckSquare className="w-4 h-4 text-purple-400" /> : <Square className="w-4 h-4 opacity-50" />}
                        </button>
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
                      <div className="flex items-center justify-between font-bold text-red-300">
                        <span>☯️ Chinese BaZi & Feng Shui</span>
                      </div>
                      <p><strong>Wu Xing Element:</strong> <span className="text-red-200 font-bold">{item.solutions.chinese.element}</span></p>
                      <p><strong>Bagua Zone:</strong> {item.solutions.chinese.fengShuiZone}</p>
                      <p className="text-slate-300 text-[11px]"><strong>Cure:</strong> {item.solutions.chinese.action}</p>
                    </div>
                  )}

                  {/* 5. Kabbalah & Sephirot */}
                  {(selectedTradition === 'all' || selectedTradition === 'kabbalah') && (
                    <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
                      <div className="flex items-center justify-between font-bold text-indigo-300">
                        <span>✡️ Kabbalah & Sephirot</span>
                      </div>
                      <p><strong>Sephira:</strong> <span className="text-indigo-200 font-bold">{item.solutions.kabbalah.sephira}</span></p>
                      <p className="font-mono text-indigo-300 text-[11px]"><strong>Divine Name:</strong> {item.solutions.kabbalah.hebrewName}</p>
                      <p className="text-slate-300 text-[11px]"><strong>Meditation:</strong> {item.solutions.kabbalah.meditation}</p>
                    </div>
                  )}

                  {/* 6. CBT & Modern Psychology */}
                  {(selectedTradition === 'all' || selectedTradition === 'cbt') && (
                    <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 space-y-2">
                      <div className="flex items-center justify-between font-bold text-cyan-300">
                        <span>🧠 CBT & Psychology</span>
                        <button
                          onClick={() => toggleRemedyDone(`${item.id}_cbt`)}
                          className="text-cyan-400 hover:text-cyan-300 cursor-pointer"
                        >
                          {completedRemedies[`${item.id}_cbt`] ? <CheckSquare className="w-4 h-4 text-cyan-400" /> : <Square className="w-4 h-4 opacity-50" />}
                        </button>
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
