import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, AlertTriangle, Lightbulb, RefreshCw, Clock, CheckCircle2, 
  Shield, Globe, Sparkles, Gem, BookOpen, Heart, Flame, Sun, Moon, 
  Download, Cpu, Filter, Info, Scale, Search, Calendar, ChevronDown, CheckSquare, Square, X, Sliders
} from 'lucide-react';
import type { UserProfile } from '../types';
import { calculatePlanetaryPositions } from '../lib/astroCalculations';

interface LiveCosmicDiagnosticsProps {
  userProfile: UserProfile;
}

export type DiagnosticCategory = 'all' | 'career' | 'wealth' | 'mind' | 'vitality' | 'relationships' | 'spiritual';
export type TraditionFilter = 'all' | 'islamic' | 'vedic' | 'western' | 'chinese' | 'kabbalah' | 'cbt';
export type SymptomFilter = 'all' | 'anxiety' | 'insomnia' | 'financial-block' | 'career-delay' | 'relationship-friction' | 'heavy-aura';

interface MultiTraditionDiagnosticItem {
  id: string;
  category: Exclude<DiagnosticCategory, 'all'>;
  symptomKey: Exclude<SymptomFilter, 'all'>;
  symptomName: string;
  planet: string;
  symbol: string;
  transitSign: string;
  houseAffected: string;
  intensityScore: number;
  statusColor: string;
  
  // 1. What is Happening (Symptom & Real Experience)
  whatIsHappening: string;
  
  // 2. Why it is Happening (Astrological & Energetic Root Cause)
  whyIsHappening: string;

  // 3. Multi-Tradition Solutions Across All World Religions & Practices
  solutions: {
    islamic: {
      title: string;
      duaArabic?: string;
      duaTranslation?: string;
      action: string;
      recommendedCharity: string;
    };
    vedic: {
      gemstone: string;
      caratFormula: string;
      mantra: string;
      ritual: string;
      rudraksha: string;
    };
    western: {
      crystal: string;
      affirmation: string;
      archangel: string;
      colorFrequency: string;
    };
    chinese: {
      element: string;
      fengShuiZone: string;
      action: string;
      yinYangDiet: string;
    };
    kabbalah: {
      sephira: string;
      hebrewName: string;
      psalmRecitation: string;
      meditation: string;
    };
    cbt: {
      framework: string;
      exercise: string;
      somaticProtocol: string;
    };
  };
}

export default function LiveCosmicDiagnostics({ userProfile }: LiveCosmicDiagnosticsProps) {
  const [diagnosticDate, setDiagnosticDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [diagnosticTime, setDiagnosticTime] = useState<string>(() => new Date().toTimeString().split(' ')[0].substring(0, 5));
  const [useLiveNow, setUseLiveNow] = useState<boolean>(true);
  
  const [selectedCategory, setSelectedCategory] = useState<DiagnosticCategory>('all');
  const [selectedTradition, setSelectedTradition] = useState<TraditionFilter>('all');
  const [selectedSymptom, setSelectedSymptom] = useState<SymptomFilter>('all');
  const [severityLevel, setSeverityLevel] = useState<'moderate' | 'acute' | 'chronic'>('acute');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>('saturn-career');
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

  // Comprehensive Multi-Tradition Symptom Diagnostic Database
  const diagnosticItems: MultiTraditionDiagnosticItem[] = useMemo(() => [
    {
      id: 'saturn-career',
      category: 'career',
      symptomKey: 'career-delay',
      symptomName: 'Career Stagnation, Unexplained Delays & Leadership Friction',
      planet: 'Saturn (Shani / زحل / Binah)',
      symbol: '♄',
      transitSign: saturn?.sign || 'Aquarius ♒',
      houseAffected: `${saturn?.house || '7th House'} (Structure & Career)`,
      intensityScore: severityLevel === 'chronic' ? 95 : severityLevel === 'acute' ? 88 : 75,
      statusColor: 'from-amber-500 to-amber-700',
      whatIsHappening: 'Experiencing sudden career bottlenecks, promotion delays, administrative friction, and heavy workload pressure despite high effort.',
      whyIsHappening: `Saturn transits your ${saturn?.house || '7th House'} in ${saturn?.sign || 'Aquarius'}, testing systemic foundation, dissolving weak strategies, and demanding absolute discipline.`,
      solutions: {
        islamic: {
          title: 'Surah Ash-Sharh & Istighfar Protocol',
          duaArabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا · إِنَّ مَعَ الْعُسْرِ يُسْرًا',
          duaTranslation: 'For indeed, with hardship comes ease. Indeed, with hardship comes ease.',
          action: 'Recite Istighfar ("Astaghfirullah") 100 times after Fajr prayer daily.',
          recommendedCharity: 'Give black sesame seeds or dark clothing to those in need on Friday.'
        },
        vedic: {
          gemstone: 'Blue Sapphire (Neelam) or Amethyst (5-7 Carats)',
          caratFormula: 'Body Weight in kg / 12 = Recommended Carat (e.g. 70kg = 5.8 Carat)',
          mantra: 'Om Sham Shanaishcharaya Namah (108x on Neem wood beads)',
          ritual: 'Light a mustard oil lamp under a Peepal tree on Saturday sunset.',
          rudraksha: '7 Mukhi Rudraksha (Governed by Goddess Lakshmi & Saturn)'
        },
        western: {
          crystal: 'Black Tourmaline & Onyx',
          affirmation: 'I embrace patient discipline, creating unbreakable foundations for lasting authority.',
          archangel: 'Archangel Cassiel (Angel of Boundaries & Perseverance)',
          colorFrequency: 'Deep Indigo / Dark Violet (432 Hz Solfeggio Tone)'
        },
        chinese: {
          element: 'Earth (土) / Metal (金) Equilibrium',
          fengShuiZone: 'North-East Sector (Gen Palace)',
          action: 'Place heavy black obsidian sphere or metallic Wu Lou in North-East to absorb chaotic energy.',
          yinYangDiet: 'Consume warm grounding foods (black beans, sesame, root vegetables).'
        },
        kabbalah: {
          sephira: 'Binah (Understanding & Divine Structure)',
          hebrewName: 'YHVH Elohim (יְהوָه אֱלֹהִים)',
          psalmRecitation: 'Recite Psalm 90 (Prayer of Moses for Divine Foundation)',
          meditation: 'Meditate on the column of divine understanding, accepting constructive refinement.'
        },
        cbt: {
          framework: 'Locus of Control Audit',
          exercise: 'Write down 3 uncontrollable external variables vs 3 immediate internal action steps.',
          somaticProtocol: 'Box breathing (4s inhale, 4s hold, 4s exhale, 4s hold) for 5 minutes.'
        }
      }
    },
    {
      id: 'moon-anxiety',
      category: 'mind',
      symptomKey: 'anxiety',
      symptomName: 'Unexplained Anxiety, Overthinking & Emotional Sensitivity',
      planet: 'Moon (Chandra / قمر / Yesod)',
      symbol: '☽',
      transitSign: moon?.sign || 'Taurus ♉',
      houseAffected: `${moon?.house || '4th House'} (Mental Peace & Emotion)`,
      intensityScore: severityLevel === 'chronic' ? 94 : severityLevel === 'acute' ? 89 : 78,
      statusColor: 'from-blue-500 to-indigo-700',
      whatIsHappening: 'Sudden waves of emotional insecurity, overthinking negative scenarios, restless sleep, and vulnerability to environmental moods.',
      whyIsHappening: `Moon in ${moon?.sign || 'Taurus'} (${moon?.nakshatra || 'Rohini'} Nakshatra) transits your ${moon?.house || '4th House'}, heightening psychic receptivity and emotional aura sensitivity.`,
      solutions: {
        islamic: {
          title: 'Dua for Anxiety & Ruqyah Protection',
          duaArabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ',
          duaTranslation: 'O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness.',
          action: 'Recite Surah Al-Falaq & Surah An-Nas 3x every morning and before sleep.',
          recommendedCharity: 'Distribute clean water or milk to thirsty travelers.'
        },
        vedic: {
          gemstone: 'Natural Pearl (Moti) or Moonstone (6-8 Carats in Silver)',
          caratFormula: 'Body Weight in kg / 10 = Recommended Carat',
          mantra: 'Om Shram Shreem Shroom Sah Chandraya Namah (108x)',
          ritual: 'Offer pure water mixed with raw milk to Shiva Lingam on Monday morning.',
          rudraksha: '2 Mukhi Rudraksha (Governed by Ardhanarishvara & Moon)'
        },
        western: {
          crystal: 'Selene Moonstone & Rose Quartz',
          affirmation: 'My mind is a serene lake. Divine peace flows through every cell of my body.',
          archangel: 'Archangel Gabriel (Angel of Intuition & Inner Purity)',
          colorFrequency: 'Silver White & Lunar Pale Blue (528 Hz Healing Tone)'
        },
        chinese: {
          element: 'Water (水) Yin Balance',
          fengShuiZone: 'North Sector (Kan Palace)',
          action: 'Place a still glass bowl of water with white lotus petals in North bedroom corner.',
          yinYangDiet: 'Incorporate cooling hydration foods (cucumber, pear, lily bulb tea).'
        },
        kabbalah: {
          sephira: 'Yesod (Foundation & Subconscious Astral Mirror)',
          hebrewName: 'Shaddai El Chai (שַׁדַּי אֵל חָי)',
          psalmRecitation: 'Recite Psalm 23 (The Lord is My Shepherd)',
          meditation: 'Visualize silver lunar light bathing the crown chakra and clearing subconscious worries.'
        },
        cbt: {
          framework: 'Cognitive Reframing of Catastrophizing',
          exercise: 'Write down worst-case fear, calculate objective probability (1-100%), and write best-case reality.',
          somaticProtocol: 'Vagus nerve stimulation (gentle cold water splash on face for 30 seconds).'
        }
      }
    },
    {
      id: 'jupiter-financial-block',
      category: 'wealth',
      symptomKey: 'financial-block',
      symptomName: 'Financial Stagnation & Cash Flow Instability',
      planet: 'Jupiter (Guru / مشتری / Chesed)',
      symbol: '♃',
      transitSign: jupiter?.sign || 'Pisces ♓',
      houseAffected: `${jupiter?.house || '10th House'} (Wisdom & Abundance)`,
      intensityScore: severityLevel === 'chronic' ? 92 : severityLevel === 'acute' ? 85 : 72,
      statusColor: 'from-emerald-500 to-teal-700',
      whatIsHappening: 'Delayed client payments, unexpected expenses draining savings, and difficulty scaling income streams.',
      whyIsHappening: `Jupiter transits your ${jupiter?.house || '10th House'} in ${jupiter?.sign || 'Pisces'}, demanding ethical alignment and strategic expansion before unlocking major reserves.`,
      solutions: {
        islamic: {
          title: 'Asmaul Husna: Ya Razzaq & Ya Ghani Protocol',
          duaArabic: 'اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ',
          duaTranslation: 'O Allah, suffice me with Your lawful provisions against Your forbidden ones, and enrich me by Your grace.',
          action: 'Recite "Ya Razzaq, Ya Ghani" 308 times daily after Morning Prayer.',
          recommendedCharity: 'Give 2.5% Zakat / voluntary Sadaqah to students of knowledge.'
        },
        vedic: {
          gemstone: 'Yellow Sapphire (Pukhraj) or Topaz (5-7 Carats in Gold)',
          caratFormula: 'Body Weight in kg / 11 = Recommended Carat',
          mantra: 'Om Gram Greem Groom Sah Gurave Namah (108x)',
          ritual: 'Donate yellow lentils (Chana Dal) and turmeric to spiritual teachers on Thursday.',
          rudraksha: '5 Mukhi Rudraksha (Governed by Lord Kalagni Rudra & Jupiter)'
        },
        western: {
          crystal: 'Golden Citrine & Pyrite (Fool\'s Gold)',
          affirmation: 'Divine wealth and righteous abundance flow to me effortlessly through multiple avenues.',
          archangel: 'Archangel Zadkiel (Angel of Abundance & Mercy)',
          colorFrequency: 'Golden Yellow (888 Hz Abundance Frequency)'
        },
        chinese: {
          element: 'Wood (木) / Water (水) Prosperity Flow',
          fengShuiZone: 'South-East Wealth Corner (Xun Palace)',
          action: 'Position a 9-ring bamboo plant or flowing water fountain in South-East sector.',
          yinYangDiet: 'Consume nourishing Qi foods (walnuts, dates, green tea).'
        },
        kabbalah: {
          sephira: 'Chesed (Lovingkindness & Expansive Grace)',
          hebrewName: 'El (אֵل)',
          psalmRecitation: 'Recite Psalm 112 (Blessings of the Generous)',
          meditation: 'Meditate on the sphere of Chesed, expanding generosity to unlock reciprocal flow.'
        },
        cbt: {
          framework: 'Scarcity vs Abundance Audit',
          exercise: 'Track every transaction with gratitude; write down 3 realistic monetization models.',
          somaticProtocol: 'Open posture embodiment exercise (5 minutes of standing expansion).'
        }
      }
    },
    {
      id: 'rahu-heavy-aura',
      category: 'spiritual',
      symptomKey: 'heavy-aura',
      symptomName: 'Sense of Heavy Aura, Unexplained Fears & Evil Eye (Nazar)',
      planet: 'Rahu (North Node / الراس / Daath)',
      symbol: '☊',
      transitSign: rahu?.sign || 'Virgo ♍',
      houseAffected: `${rahu?.house || '11th House'} (Illusion & Protection)`,
      intensityScore: severityLevel === 'chronic' ? 96 : severityLevel === 'acute' ? 90 : 80,
      statusColor: 'from-purple-600 to-indigo-900',
      whatIsHappening: 'Persistent sense of heavy psychic energy, sudden loss of motivation after good news, or suspicion of envy/Nazar.',
      whyIsHappening: `Rahu transits ${rahu?.sign || 'Virgo'} in your ${rahu?.house || '11th House'}, generating phantom shadow vibrations and exposing your aura to external envy.`,
      solutions: {
        islamic: {
          title: 'Ruqyah Shar\'iyyah & Ayatal Kursi Shield',
          duaArabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
          duaTranslation: 'I seek refuge in the Perfect Words of Allah from the evil of what He has created.',
          action: 'Recite Ayat al-Kursi, Surah Al-Falaq & Surah An-Nas over water, then drink and wipe over head.',
          recommendedCharity: 'Give hidden Sadaqah to orphans or widows to extinguish trial.'
        },
        vedic: {
          gemstone: 'Hessonite Garnet (Gomed) (6-8 Carats)',
          caratFormula: 'Body Weight in kg / 10 = Recommended Carat',
          mantra: 'Om Bhram Bhreem Bhroom Sah Rahave Namah (108x)',
          ritual: 'Perform rock-salt aura cleansing (Nazar Utarna) on Saturday evening.',
          rudraksha: '8 Mukhi Rudraksha (Governed by Lord Ganesha & Rahu)'
        },
        western: {
          crystal: 'Black Obsidian & Cobalt Blue Glass (Nazar Bead)',
          affirmation: 'I am surrounded by an impenetrable shield of divine light. No envy can enter my space.',
          archangel: 'Archangel Michael (Angel of Spiritual Protection & Sword of Light)',
          colorFrequency: 'Cobalt Blue & Shielding Black (741 Hz Aura Cleansing Tone)'
        },
        chinese: {
          element: 'Water (水) / Metal (金) Protective Shield',
          fengShuiZone: 'North-West Gate (Qian Palace)',
          action: 'Hang a bronze Bagua mirror or metallic wind chime outside entrance to deflect Sha Qi.',
          yinYangDiet: 'Drink warm ginger and black tea to activate internal Yang protection.'
        },
        kabbalah: {
          sephira: 'Daath (Knowledge & Abyss Crossing)',
          hebrewName: 'YHVH El Elyon (יְהوָה אֵל عֶلְיוֹن)',
          psalmRecitation: 'Recite Psalm 91 (Dwelling in the Secret Place of the Most High)',
          meditation: 'Visualize the 72 Names of God forming a golden armor of light around your soul.'
        },
        cbt: {
          framework: 'Boundary Reinforcement Audit',
          exercise: 'Limit over-sharing on social media; practice saying "No" to energy-draining demands.',
          somaticProtocol: 'Grounding walk barefoot on grass/earth for 15 minutes.'
        }
      }
    }
  ], [positions, saturn, moon, jupiter, rahu, severityLevel]);

  // Filter items by category, symptom, search query, and tradition
  const filteredDiagnostics = useMemo(() => {
    return diagnosticItems.filter(item => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSymptom = selectedSymptom === 'all' || item.symptomKey === selectedSymptom;
      const matchSearch = searchQuery === '' || 
        item.symptomName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.planet.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.whatIsHappening.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.whyIsHappening.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.solutions.islamic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.solutions.vedic.gemstone.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSymptom && matchSearch;
    });
  }, [diagnosticItems, selectedCategory, selectedSymptom, searchQuery]);

  // Toggle remedy completion tracker
  const toggleRemedyDone = (key: string) => {
    setCompletedRemedies(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const totalRemediesCount = filteredDiagnostics.length * 6;
  const completedCount = Object.values(completedRemedies).filter(Boolean).length;
  const progressPercent = totalRemediesCount > 0 ? Math.round((completedCount / totalRemediesCount) * 100) : 0;

  // Refresh Ephemeris Handler
  const handleRefresh = () => {
    setIsRefreshing(true);
    setUseLiveNow(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // PDF Export Function for Complete Diagnostics & Remedy Blueprint
  const handleExportPdf = () => {
    const printWin = window.open('', '_blank');
    if (printWin) {
      printWin.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Live Multi-Tradition Symptom Diagnostic & Remedy Report — ${name}</title>
            <style>
              body { font-family: system-ui, sans-serif; padding: 40px; color: #0f172a; line-height: 1.6; background: #ffffff; }
              .h { border-bottom: 3px double #4f46e5; padding-bottom: 16px; margin-bottom: 24px; }
              .title { font-size: 24px; font-weight: 800; color: #3730a3; }
              .item { border: 1px solid #cbd5e1; border-radius: 14px; padding: 20px; margin-bottom: 20px; background: #f8fafc; }
              .item-title { font-size: 18px; font-weight: 700; color: #1e1b4b; }
              .sec { margin-top: 12px; font-size: 12px; }
              .sec-title { font-weight: 700; color: #4338ca; text-transform: uppercase; font-size: 10px; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; }
              .arabic { font-family: serif; font-size: 18px; color: #14532d; text-align: right; background: #f0fdf4; padding: 10px; border-radius: 8px; margin: 8px 0; }
              .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 8px; }
              .box { border: 1px solid #e2e8f0; padding: 10px; border-radius: 8px; background: #ffffff; font-size: 11px; }
              .footer { text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 16px; margin-top: 30px; }
            </style>
          </head>
          <body>
            <div class="h">
              <div class="title">🔮 ASTRO360 MULTI-RELIGIOUS SYMPTOM DIAGNOSTIC REPORT</div>
              <div>Seeker: ${name} · Timestamp: ${useLiveNow ? 'Live Ephemeris' : `${diagnosticDate} ${diagnosticTime}`} · Severity: ${severityLevel.toUpperCase()}</div>
            </div>

            ${filteredDiagnostics.map(item => `
              <div class="item">
                <div class="item-title">${item.symptomName}</div>
                <div style="font-size: 12px; color: #64748b;">Energy: ${item.planet} — ${item.houseAffected} (${item.transitSign})</div>
                
                <div class="sec">
                  <div class="sec-title">1. What Is Happening (Symptom Experience)</div>
                  <div>${item.whatIsHappening}</div>
                </div>
                
                <div class="sec">
                  <div class="sec-title">2. Root Cause (Astrological & Energetic Cause)</div>
                  <div>${item.whyIsHappening}</div>
                </div>

                <div class="sec">
                  <div class="sec-title">3. Multi-Religious & World Faith Solutions</div>
                  <div class="grid">
                    <div class="box">
                      <strong>🕌 Islamic Sunnah Solution:</strong><br/>
                      ${item.solutions.islamic.title}<br/>
                      ${item.solutions.islamic.duaArabic ? `<div class="arabic">${item.solutions.islamic.duaArabic}</div>` : ''}
                      Action: ${item.solutions.islamic.action}<br/>
                      Charity: ${item.solutions.islamic.recommendedCharity}
                    </div>

                    <div class="box">
                      <strong>🕉️ Vedic Jyotish & Ratna:</strong><br/>
                      Gemstone: ${item.solutions.vedic.gemstone}<br/>
                      Formula: ${item.solutions.vedic.caratFormula}<br/>
                      Mantra: ${item.solutions.vedic.mantra}<br/>
                      Ritual: ${item.solutions.vedic.ritual}<br/>
                      Rudraksha: ${item.solutions.vedic.rudraksha}
                    </div>

                    <div class="box">
                      <strong>⭐ Western Archangel & Crystal:</strong><br/>
                      Crystal: ${item.solutions.western.crystal}<br/>
                      Archangel: ${item.solutions.western.archangel}<br/>
                      Frequency: ${item.solutions.western.colorFrequency}<br/>
                      Affirmation: ${item.solutions.western.affirmation}
                    </div>

                    <div class="box">
                      <strong>☯️ Chinese BaZi & Feng Shui:</strong><br/>
                      Element: ${item.solutions.chinese.element}<br/>
                      Zone: ${item.solutions.chinese.fengShuiZone}<br/>
                      Action: ${item.solutions.chinese.action}<br/>
                      Diet: ${item.solutions.chinese.yinYangDiet}
                    </div>

                    <div class="box">
                      <strong>✡️ Kabbalah Tree of Life:</strong><br/>
                      Sephira: ${item.solutions.kabbalah.sephira}<br/>
                      Hebrew: ${item.solutions.kabbalah.hebrewName}<br/>
                      Psalm: ${item.solutions.kabbalah.psalmRecitation}<br/>
                      Meditation: ${item.solutions.kabbalah.meditation}
                    </div>

                    <div class="box">
                      <strong>🧠 CBT & Mind Science:</strong><br/>
                      Framework: ${item.solutions.cbt.framework}<br/>
                      Exercise: ${item.solutions.cbt.exercise}<br/>
                      Protocol: ${item.solutions.cbt.somaticProtocol}
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}

            <div class="footer">
              Official Multi-Tradition Symptom Diagnostic Blueprint | ASTRO360 Ephemeris Engine
            </div>
          </body>
        </html>
      `);
      printWin.document.close();
      printWin.focus();
      setTimeout(() => { printWin.print(); }, 500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-8 text-left">
      {/* 🔮 DIAGNOSTICS HEADER */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-indigo-500/30 relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 mb-2">
              <Activity className="w-5 h-5 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase">Live Symptom & Solution Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">
              Live Cosmic <span className="bg-gradient-to-r from-amber-300 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Symptom Diagnostics</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
              Diagnose physical, emotional, financial, and spiritual symptoms. Every symptom features a 3-part breakdown: <strong className="text-amber-300">1. What is Happening</strong>, <strong className="text-indigo-300">2. Root Cause (Why)</strong>, and <strong className="text-emerald-300">3. Solutions in All World Religions & Practices</strong> (Islamic Sunnah, Vedic Ratna, Western Archangels, Chinese BaZi, Kabbalah, CBT).
            </p>
          </div>

          {/* CONTROLS */}
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              onClick={handleRefresh}
              className={`p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-all cursor-pointer ${isRefreshing ? 'animate-spin' : ''}`}
              title="Recalculate Ephemeris"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={handleExportPdf}
              className="px-4 py-2.5 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" /> Export Report (PDF)
            </button>
          </div>
        </div>

        {/* TIME TELEMETRY & SYMPTOM FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10 relative z-10 text-xs">
          {/* Active Ephemeris Mode Toggle */}
          <div className="p-3 rounded-2xl bg-slate-950/80 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span className="font-bold text-white font-mono">
                {useLiveNow ? 'Live Transit Ephemeris' : `${diagnosticDate} ${diagnosticTime}`}
              </span>
            </div>
            <button
              onClick={() => setUseLiveNow(!useLiveNow)}
              className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30 transition-all cursor-pointer"
            >
              {useLiveNow ? 'Set Custom Date' : 'Use Live Now'}
            </button>
          </div>

          {/* Severity Selector */}
          <div className="p-3 rounded-2xl bg-slate-950/80 border border-white/10 flex items-center justify-between">
            <span className="font-bold text-slate-300 font-mono">Symptom Severity:</span>
            <div className="flex items-center gap-1">
              {(['moderate', 'acute', 'chronic'] as const).map(sev => (
                <button
                  key={sev}
                  onClick={() => setSeverityLevel(sev)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                    severityLevel === sev ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50' : 'bg-white/5 text-slate-400'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search symptoms (e.g. anxiety, delays, money)..."
              className="w-full bg-slate-950/80 border border-white/10 rounded-2xl pl-9 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50"
            />
          </div>
        </div>

        {/* PROGRESS TRACKER */}
        <div className="p-4 rounded-2xl bg-slate-950/90 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="text-xs font-bold text-white block">Multi-Religious Remedy Checklist Progress</span>
              <span className="text-[11px] text-slate-400">{completedCount} of {totalRemediesCount} remedies completed</span>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-64">
            <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 shrink-0">{progressPercent}%</span>
          </div>
        </div>
      </div>

      {/* SYMPTOM DIAGNOSTIC CARDS LIST */}
      <div className="space-y-6">
        {filteredDiagnostics.map((item) => {
          const isExpanded = expandedItem === item.id;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-3xl border border-white/10 overflow-hidden space-y-4 hover:border-indigo-500/40 transition-all shadow-xl"
            >
              {/* CARD HEADER */}
              <div className="p-6 bg-slate-950/60 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.statusColor} flex items-center justify-center text-white font-bold text-2xl shadow-lg shrink-0`}>
                    {item.symbol}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">{item.symptomName}</h3>
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        {item.intensityScore}% Severity
                      </span>
                    </div>
                    <p className="text-xs text-indigo-300 font-mono mt-0.5">
                      Energy: {item.planet} · {item.houseAffected} ({item.transitSign})
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setExpandedItem(isExpanded ? null : item.id)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold flex items-center gap-2 border border-white/10 transition-all cursor-pointer shrink-0"
                >
                  <span>{isExpanded ? 'Collapse Solutions' : 'View Full Solutions'}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* CARD BODY BRIEF */}
              <div className="p-6 space-y-4 text-xs font-sans">
                {/* 1. WHAT IS HAPPENING */}
                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-1">
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">1. What is Happening (Symptom Experience)</span>
                  <p className="text-slate-200 leading-relaxed">{item.whatIsHappening}</p>
                </div>

                {/* 2. ROOT CAUSE (WHY IT IS HAPPENING) */}
                <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-1">
                  <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider block">2. Why It Is Happening (Astrological & Energetic Root Cause)</span>
                  <p className="text-slate-200 leading-relaxed">{item.whyIsHappening}</p>
                </div>

                {/* 3. MULTI-RELIGIOUS SOLUTIONS GRID (WHEN EXPANDED) */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-4 pt-2 border-t border-white/10">
                      <span className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-emerald-400" /> 3. Multi-Religious & World Faith Solutions:
                      </span>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* 🕌 ISLAMIC SUNNAH & RUQYAH */}
                        <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
                          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                            <span className="font-bold text-emerald-300 font-mono text-xs flex items-center gap-1.5">
                              🕌 Islamic Sunnah & Ruqyah
                            </span>
                            <button
                              onClick={() => toggleRemedyDone(`${item.id}-islamic`)}
                              className="text-emerald-400 hover:text-emerald-200 transition-all cursor-pointer"
                            >
                              {completedRemedies[`${item.id}-islamic`] ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-500" />}
                            </button>
                          </div>
                          <div className="space-y-1.5">
                            <span className="font-bold text-white text-xs block">{item.solutions.islamic.title}</span>
                            {item.solutions.islamic.duaArabic && (
                              <div className="p-2.5 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-300 font-serif text-right text-sm dir-rtl">
                                {item.solutions.islamic.duaArabic}
                              </div>
                            )}
                            <p className="text-slate-300 text-[11px] italic">"{item.solutions.islamic.duaTranslation}"</p>
                            <p className="text-slate-200 text-[11px]"><strong className="text-emerald-400">Action:</strong> {item.solutions.islamic.action}</p>
                            <p className="text-slate-300 text-[11px]"><strong className="text-amber-400">Charity:</strong> {item.solutions.islamic.recommendedCharity}</p>
                          </div>
                        </div>

                        {/* 🕉️ VEDIC JYOTISH & RATNA */}
                        <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-3">
                          <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
                            <span className="font-bold text-amber-300 font-mono text-xs flex items-center gap-1.5">
                              🕉️ Vedic Jyotish & Ratna
                            </span>
                            <button
                              onClick={() => toggleRemedyDone(`${item.id}-vedic`)}
                              className="text-amber-400 hover:text-amber-200 transition-all cursor-pointer"
                            >
                              {completedRemedies[`${item.id}-vedic`] ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-500" />}
                            </button>
                          </div>
                          <div className="space-y-1.5 text-[11px]">
                            <p className="text-white"><strong className="text-amber-400">Gemstone:</strong> {item.solutions.vedic.gemstone}</p>
                            <p className="text-slate-300"><strong className="text-slate-400">Formula:</strong> {item.solutions.vedic.caratFormula}</p>
                            <p className="text-slate-200"><strong className="text-amber-300">Mantra:</strong> {item.solutions.vedic.mantra}</p>
                            <p className="text-slate-300"><strong className="text-slate-400">Ritual:</strong> {item.solutions.vedic.ritual}</p>
                            <p className="text-slate-300"><strong className="text-amber-400">Rudraksha:</strong> {item.solutions.vedic.rudraksha}</p>
                          </div>
                        </div>

                        {/* ⭐ WESTERN ARCHANGEL & CRYSTALS */}
                        <div className="p-5 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-3">
                          <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
                            <span className="font-bold text-purple-300 font-mono text-xs flex items-center gap-1.5">
                              ⭐ Western Archangel & Crystal
                            </span>
                            <button
                              onClick={() => toggleRemedyDone(`${item.id}-western`)}
                              className="text-purple-400 hover:text-purple-200 transition-all cursor-pointer"
                            >
                              {completedRemedies[`${item.id}-western`] ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-500" />}
                            </button>
                          </div>
                          <div className="space-y-1.5 text-[11px]">
                            <p className="text-white"><strong className="text-purple-400">Crystal:</strong> {item.solutions.western.crystal}</p>
                            <p className="text-slate-200"><strong className="text-purple-300">Archangel:</strong> {item.solutions.western.archangel}</p>
                            <p className="text-slate-300"><strong className="text-slate-400">Frequency:</strong> {item.solutions.western.colorFrequency}</p>
                            <p className="text-slate-300 italic font-serif">"{item.solutions.western.affirmation}"</p>
                          </div>
                        </div>

                        {/* ☯️ CHINESE BAZI & FENG SHUI */}
                        <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-3">
                          <div className="flex items-center justify-between border-b border-rose-500/20 pb-2">
                            <span className="font-bold text-rose-300 font-mono text-xs flex items-center gap-1.5">
                              ☯️ Chinese BaZi & Feng Shui
                            </span>
                            <button
                              onClick={() => toggleRemedyDone(`${item.id}-chinese`)}
                              className="text-rose-400 hover:text-rose-200 transition-all cursor-pointer"
                            >
                              {completedRemedies[`${item.id}-chinese`] ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-500" />}
                            </button>
                          </div>
                          <div className="space-y-1.5 text-[11px]">
                            <p className="text-white"><strong className="text-rose-400">Element:</strong> {item.solutions.chinese.element}</p>
                            <p className="text-slate-200"><strong className="text-rose-300">Feng Shui Zone:</strong> {item.solutions.chinese.fengShuiZone}</p>
                            <p className="text-slate-300"><strong className="text-slate-400">Action:</strong> {item.solutions.chinese.action}</p>
                            <p className="text-slate-300"><strong className="text-amber-400">Diet:</strong> {item.solutions.chinese.yinYangDiet}</p>
                          </div>
                        </div>

                        {/* ✡️ KABBALAH TREE OF LIFE */}
                        <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-3">
                          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
                            <span className="font-bold text-cyan-300 font-mono text-xs flex items-center gap-1.5">
                              ✡️ Kabbalah Tree of Life
                            </span>
                            <button
                              onClick={() => toggleRemedyDone(`${item.id}-kabbalah`)}
                              className="text-cyan-400 hover:text-cyan-200 transition-all cursor-pointer"
                            >
                              {completedRemedies[`${item.id}-kabbalah`] ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-500" />}
                            </button>
                          </div>
                          <div className="space-y-1.5 text-[11px]">
                            <p className="text-white"><strong className="text-cyan-400">Sephira:</strong> {item.solutions.kabbalah.sephira}</p>
                            <p className="text-slate-200 font-mono"><strong className="text-cyan-300">Hebrew:</strong> {item.solutions.kabbalah.hebrewName}</p>
                            <p className="text-slate-300"><strong className="text-slate-400">Psalm:</strong> {item.solutions.kabbalah.psalmRecitation}</p>
                            <p className="text-slate-300"><strong className="text-amber-400">Meditation:</strong> {item.solutions.kabbalah.meditation}</p>
                          </div>
                        </div>

                        {/* 🧠 CBT & MIND SCIENCE */}
                        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700 space-y-3">
                          <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                            <span className="font-bold text-slate-300 font-mono text-xs flex items-center gap-1.5">
                              🧠 CBT & Mind Science
                            </span>
                            <button
                              onClick={() => toggleRemedyDone(`${item.id}-cbt`)}
                              className="text-slate-400 hover:text-white transition-all cursor-pointer"
                            >
                              {completedRemedies[`${item.id}-cbt`] ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-500" />}
                            </button>
                          </div>
                          <div className="space-y-1.5 text-[11px]">
                            <p className="text-white"><strong className="text-slate-300">Framework:</strong> {item.solutions.cbt.framework}</p>
                            <p className="text-slate-200"><strong className="text-slate-400">Exercise:</strong> {item.solutions.cbt.exercise}</p>
                            <p className="text-slate-300"><strong className="text-amber-400">Protocol:</strong> {item.solutions.cbt.somaticProtocol}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
