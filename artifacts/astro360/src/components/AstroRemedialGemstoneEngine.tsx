import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Sparkles, Heart, Zap, RefreshCw, CheckCircle2, Scale, AlertTriangle, Globe, Compass, Gem, 
  BookOpen, Activity, ChevronRight, X, Download, Filter, Cpu, Flame, Sun, Moon, Info, HelpCircle
} from 'lucide-react';
import type { UserProfile } from '../types';
import { calculatePlanetaryPositions } from '../lib/astroCalculations';

interface AstroRemedialGemstoneEngineProps {
  userProfile: UserProfile;
}

interface GemstoneDetail {
  id: string;
  name: string;
  sanskritName: string;
  rulingPlanet: string;
  planetSymbol: string;
  category: 'career' | 'wealth' | 'love' | 'health' | 'protection' | 'spiritual';
  element: string;
  idealFinger: string;
  metal: string;
  auspiciousDay: string;
  mantra: string;
  primaryBenefit: string;
  compatibilityScore: number;
  colorGradient: string;
  colorHex: string;
  upratna: string;
  caratWeight: string;
  purification: string;
  // Deep Why & Root Cause Details
  whyItWorks: string;
  rootCauseDiagnosed: string;
  targetProblemSolved: string;
  incompatibleStones: string[];
  physicsExplanation: string;
  wearingDirection: string;
}

export default function AstroRemedialGemstoneEngine({ userProfile }: AstroRemedialGemstoneEngineProps) {
  const [selectedTradition, setSelectedTradition] = useState<'vedic' | 'western' | 'chinese' | 'islamic' | 'universal'>('vedic');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [userBodyWeightKg, setUserBodyWeightKg] = useState<number>(70);
  const [selectedGemForModal, setSelectedGemForModal] = useState<GemstoneDetail | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Calculate live seeker planetary longitudes
  const livePositions = useMemo(() => {
    return calculatePlanetaryPositions(userProfile?.dob, userProfile?.time, 24.178);
  }, [userProfile?.dob, userProfile?.time]);

  // Derived user birth chart summary
  const seekerSunSign = livePositions.find(p => p.name === 'Sun')?.sign || 'Aries';
  const seekerMoonSign = livePositions.find(p => p.name === 'Moon')?.sign || 'Taurus';
  const seekerAscendant = livePositions.find(p => p.houseNumber === 1)?.sign || 'Virgo';

  // Calculated recommended carat weight formula: (Body Weight in KG / 12) + 0.5 to 1.5 Carats
  const calculatedIdealCarats = useMemo(() => {
    const minC = ((userBodyWeightKg / 12) * 0.85).toFixed(2);
    const maxC = ((userBodyWeightKg / 12) * 1.15).toFixed(2);
    return `${minC} to ${maxC} Ratti / Carats`;
  }, [userBodyWeightKg]);

  // 💎 1. Comprehensive Vedic Planetary Gemstones
  const vedicGemstones: GemstoneDetail[] = [
    {
      id: 'yellow-sapphire',
      name: 'Yellow Sapphire (Pukhraj)',
      sanskritName: 'Guru Ratna / Pushparaja',
      rulingPlanet: 'Jupiter (Guru)',
      planetSymbol: '♃',
      category: 'wealth',
      element: 'Ether / Fire',
      idealFinger: 'Index finger (Tarjani) of dominant hand',
      metal: '22k Yellow Gold or Brass',
      auspiciousDay: 'Thursday morning during Shukla Paksha (Jupiter Hora)',
      mantra: 'Om Gram Greem Groom Sah Gurave Namah (108 Chants)',
      primaryBenefit: 'Expands divine luck, wealth retention, marriage bliss, and higher wisdom.',
      compatibilityScore: 96,
      colorGradient: 'from-amber-400 via-yellow-600 to-amber-900',
      colorHex: '#F59E0B',
      upratna: 'Yellow Topaz (Sunela) or Golden Citrine',
      caratWeight: calculatedIdealCarats,
      purification: 'Immerse in unboiled cow milk, honey, and turmeric water for 45 mins at sunrise.',
      whyItWorks: 'Yellow Sapphire absorbs yellow light frequencies (570-590nm) from Jupiter, amplifying bio-energetic aura strength and stimulating the Solar Plexus (Manipura) chakra to clear cosmic scarcity vibration.',
      rootCauseDiagnosed: 'Afflicted 9th/5th Lord Jupiter in 6th, 8th, or 12th house, causing academic obstacles, financial leakages, delay in child birth, or marital misunderstanding.',
      targetProblemSolved: 'Financial Instability, Delayed Marriage, Educational Stagnation & Lack of Divine Favor.',
      incompatibleStones: ['Blue Sapphire (Neelam)', 'Emerald (Panna)', 'Diamond (Hira)'],
      physicsExplanation: 'High specific gravity (4.00) and aluminum oxide crystal matrix lattice frequency resonance.',
      wearingDirection: 'Face East or North-East while slipping on the ring.'
    },
    {
      id: 'blue-sapphire',
      name: 'Blue Sapphire (Neelam)',
      sanskritName: 'Shani Ratna / Indranila',
      rulingPlanet: 'Saturn (Shani)',
      planetSymbol: '♄',
      category: 'career',
      element: 'Air / Ether',
      idealFinger: 'Middle finger (Madhyama) of dominant hand',
      metal: 'Pure Silver, Platinum, or Panchdhatu',
      auspiciousDay: 'Saturday evening or morning during Saturn Hora',
      mantra: 'Om Sham Shanaishcharaya Namah (108 Chants)',
      primaryBenefit: 'Instantly eliminates career friction, protects against Sade Sati, and builds discipline.',
      compatibilityScore: 94,
      colorGradient: 'from-blue-600 via-indigo-800 to-slate-950',
      colorHex: '#2563EB',
      upratna: 'Amethyst (Jamuniya) or Blue Topaz / Iolite',
      caratWeight: calculatedIdealCarats,
      purification: 'Soak in mustard oil or Gangajal with black sesame seeds before wearing.',
      whyItWorks: 'Refracts ultra-violet planetary rays of Saturn into the nervous system, sharpening mental stamina and resolving systemic karmic delays.',
      rootCauseDiagnosed: 'Debilitated or Retrograde Saturn in birth chart causing chronic job insecurity, false accusations, bone weakness, or paralysis of execution.',
      targetProblemSolved: 'Career Stagnation, Unexplained Business Losses, Enemy Envy & Sade Sati Hardships.',
      incompatibleStones: ['Ruby (Manik)', 'Pearl (Moti)', 'Coral (Moonga)', 'Yellow Sapphire (Pukhraj)'],
      physicsExplanation: 'Corundum structure with trace iron/titanium impurities producing piezo-electric resonance.',
      wearingDirection: 'Face West or North while wearing after testing for 3 days under pillow.'
    },
    {
      id: 'ruby',
      name: 'Ruby (Manik)',
      sanskritName: 'Surya Ratna / Padmaraga',
      rulingPlanet: 'Sun (Surya)',
      planetSymbol: '☉',
      category: 'career',
      element: 'Fire (Agni)',
      idealFinger: 'Ring finger (Anamika) of dominant hand',
      metal: 'Pure Copper or 18k Yellow Gold',
      auspiciousDay: 'Sunday sunrise during Sun Hora',
      mantra: 'Om Hram Hreem Hroom Sah Suryaya Namah',
      primaryBenefit: 'Ignites sovereign authority, public status, vital stamina, and executive confidence.',
      compatibilityScore: 95,
      colorGradient: 'from-red-600 via-rose-700 to-slate-950',
      colorHex: '#DC2626',
      upratna: 'Red Garnet (Tamdra) or Red Spinel',
      caratWeight: calculatedIdealCarats,
      purification: 'Bathe in Gangajal, rose water, and unboiled milk; offer Surya Arghya.',
      whyItWorks: 'Sun ray optical spectrum enhancer. Infuses red infrared warmth directly into blood hemoglobin and Anahata/Manipura chakras.',
      rootCauseDiagnosed: 'Weak Sun placed in 8th/12th house or afflicted by Rahu (Grahan Yoga), leading to low self-esteem, paternal conflicts, or cardiac weakness.',
      targetProblemSolved: 'Lack of Leadership Recognition, Timidity, Government/Legal Hassles & Chronic Lethargy.',
      incompatibleStones: ['Blue Sapphire (Neelam)', 'Diamond (Hira)', 'Gomed (Hessonite)'],
      physicsExplanation: 'Chromium-pigmented aluminum oxide lattice delivering high thermal refractive index.',
      wearingDirection: 'Face East towards rising Sun.'
    },
    {
      id: 'emerald',
      name: 'Emerald (Panna)',
      sanskritName: 'Budha Ratna / Marakata',
      rulingPlanet: 'Mercury (Budh)',
      planetSymbol: '☿',
      category: 'wealth',
      element: 'Earth / Air',
      idealFinger: 'Little finger (Kanishtha) of dominant hand',
      metal: 'Yellow Gold or Silver',
      auspiciousDay: 'Wednesday morning during Mercury Hora',
      mantra: 'Om Bram Breem Broom Sah Budhaya Namah',
      primaryBenefit: 'Supercharges analytical intelligence, business negotiation, memory, and speech.',
      compatibilityScore: 92,
      colorGradient: 'from-emerald-500 via-teal-700 to-slate-950',
      colorHex: '#059669',
      upratna: 'Peridot (Margaj) or Green Tourmaline',
      caratWeight: calculatedIdealCarats,
      purification: 'Soak in Tulsi leaf water and raw milk on Wednesday morning.',
      whyItWorks: 'Green wavelength spectrum (500-550nm) aligns synaptic firing in the brain, improving executive decision-making under high volatility.',
      rootCauseDiagnosed: 'Mercury in 6th/8th house or combust with Sun without Budhaditya dignity, causing stuttering, financial miscalculations, or nervous anxiety.',
      targetProblemSolved: 'Business Miscommunication, Mathematical Impairment, Anxiety & Contract Failures.',
      incompatibleStones: ['Pearl (Moti)'],
      physicsExplanation: 'Beryl crystal structure containing chromium and vanadium trace elements.',
      wearingDirection: 'Face North (mercantile direction) while wearing.'
    },
    {
      id: 'pearl',
      name: 'Natural Pearl (Moti)',
      sanskritName: 'Chandra Ratna / Mukta',
      rulingPlanet: 'Moon (Chandra)',
      planetSymbol: '☽',
      category: 'health',
      element: 'Water (Jala)',
      idealFinger: 'Little finger (Kanishtha) or Ring finger',
      metal: 'Pure Silver (Fidda)',
      auspiciousDay: 'Monday evening or morning during Moon Hora',
      mantra: 'Om Shram Shreem Shroom Sah Chandraya Namah',
      primaryBenefit: 'Soothes turbulent emotions, cures insomnia, regulates bodily fluids, and restores peace.',
      compatibilityScore: 93,
      colorGradient: 'from-slate-100 via-blue-100 to-indigo-300',
      colorHex: '#E2E8F0',
      upratna: 'Moonstone (Chandrakant) or White Coral',
      caratWeight: calculatedIdealCarats,
      purification: 'Immerse in raw milk and Gangajal on Full Moon night.',
      whyItWorks: 'Calcium carbonate organic crystal absorbs lunar magnetic gravitational waves, calming erratic mind fluctuations (Chitta Vrittis).',
      rootCauseDiagnosed: 'Afflicted Moon by Rahu/Ketu (Kemadruma Yoga or Vish Yoga with Saturn) causing bipolar mood swings, depression, or digestive fluid imbalance.',
      targetProblemSolved: 'Chronic Mental Stress, Emotional Hypersensitivity, Insomnia & Hormonal Imbalance.',
      incompatibleStones: ['Rahu Gomed', 'Ketu Cat Eye'],
      physicsExplanation: 'Aragonite nacre layers reflecting cool iridescent light rays.',
      wearingDirection: 'Face North-West or North while donning.'
    },
    {
      id: 'red-coral',
      name: 'Red Coral (Moonga)',
      sanskritName: 'Mangal Ratna / Pravala',
      rulingPlanet: 'Mars (Mangal)',
      planetSymbol: '♂',
      category: 'protection',
      element: 'Fire / Earth',
      idealFinger: 'Ring finger (Anamika) of dominant hand',
      metal: 'Copper, Red Gold, or Silver',
      auspiciousDay: 'Tuesday morning during Mars Hora',
      mantra: 'Om Kram Kreem Kroom Sah Bhaumaya Namah',
      primaryBenefit: 'Eliminates Manglik Dosha, boosts physical courage, property victory, and blood vitality.',
      compatibilityScore: 95,
      colorGradient: 'from-orange-600 via-red-600 to-slate-900',
      colorHex: '#EA580C',
      upratna: 'Red Carnelian or Red Jasper',
      caratWeight: calculatedIdealCarats,
      purification: 'Wash in Gangajal, unboiled milk, and present before Hanumanji.',
      whyItWorks: 'Organic marine calcium carbonate matrix amplifies iron absorption in blood and strengthens muscular drive.',
      rootCauseDiagnosed: 'Debilitated Mars in Cancer or 1st/4th/7th/8th/12th Manglik Placement causing anger bursts, accident vulnerability, or real estate lawsuits.',
      targetProblemSolved: 'Manglik Dosha, Blood Impurities, Phobias, Debt & Property Disputes.',
      incompatibleStones: ['Emerald (Panna)', 'Blue Sapphire (Neelam)', 'Gomed'],
      physicsExplanation: 'Calcium carbonate skeleton with organic carotenoid pigment.',
      wearingDirection: 'Face South or East while wearing.'
    },
    {
      id: 'diamond',
      name: 'Diamond (Hira) / White Sapphire',
      sanskritName: 'Shukra Ratna / Vajra',
      rulingPlanet: 'Venus (Shukra)',
      planetSymbol: '♀',
      category: 'love',
      element: 'Water / Air',
      idealFinger: 'Middle or Little finger of dominant hand',
      metal: 'Platinum or White Gold',
      auspiciousDay: 'Friday morning during Venus Hora',
      mantra: 'Om Dram Dreem Droom Sah Shukraya Namah',
      primaryBenefit: 'Attracts luxurious romance, magnetic charm, artistic genius, and marital sensuality.',
      compatibilityScore: 97,
      colorGradient: 'from-cyan-100 via-blue-200 to-slate-400',
      colorHex: '#38BDF8',
      upratna: 'White Sapphire or Natural Zircon',
      caratWeight: calculatedIdealCarats,
      purification: 'Soak in milk with white fragrant flowers on Friday morning.',
      whyItWorks: 'Highest dispersion and thermal conductivity of any mineral. Focuses pure white prana directly into the Swadhisthana (Sacral) chakra.',
      rootCauseDiagnosed: 'Afflicted Venus causing relationship heartbreak, lack of luxury, reproductive weakness, or artistic creative block.',
      targetProblemSolved: 'Marital Discord, Low Charm, Financial Sterility & Lack of Comforts.',
      incompatibleStones: ['Ruby (Manik)', 'Pearl (Moti)', 'Red Coral (Moonga)'],
      physicsExplanation: 'Covalent carbon lattice with maximum Mohs hardness (10.0).',
      wearingDirection: 'Face South-East or East.'
    },
    {
      id: 'hessonite',
      name: 'Hessonite Garnet (Gomed)',
      sanskritName: 'Rahu Ratna / Rahu Mani',
      rulingPlanet: 'North Node (Rahu)',
      planetSymbol: '☊',
      category: 'protection',
      element: 'Air / Ether',
      idealFinger: 'Middle finger of dominant hand',
      metal: 'Silver or Panchdhatu',
      auspiciousDay: 'Saturday evening or Wednesday night',
      mantra: 'Om Bhram Bhreem Bhroom Sah Rahave Namah',
      primaryBenefit: 'Neutralizes Rahu illusion, grants sudden wealth leaps, political victory, and tech success.',
      compatibilityScore: 91,
      colorGradient: 'from-amber-700 via-orange-900 to-black',
      colorHex: '#B45309',
      upratna: 'Orange Zircon or Spessartite Garnet',
      caratWeight: calculatedIdealCarats,
      purification: 'Purify with mustard oil, Gangajal, and recite 108 Rahu Beej Mantras.',
      whyItWorks: 'Honey-colored calcium aluminum silicate gar net filters chaotic electromagnetic frequencies from shadow node Rahu.',
      rootCauseDiagnosed: 'Afflicted Rahu in 1st/5th/10th causing addiction, sudden paranoia, unexpected scandals, or speculative gambling losses.',
      targetProblemSolved: 'Unexplained Phobias, Rahu Mahadasha Confusion, Legal Traps & Sudden Losses.',
      incompatibleStones: ['Ruby (Manik)', 'Pearl (Moti)', 'Coral (Moonga)'],
      physicsExplanation: 'Grossular garnet crystal system with iron/manganese honey hue.',
      wearingDirection: 'Face South-West direction.'
    },
    {
      id: 'cat-eye',
      name: 'Chrysoberyl Cat\'s Eye (Lahsuniya)',
      sanskritName: 'Ketu Ratna / Vaidurya',
      rulingPlanet: 'South Node (Ketu)',
      planetSymbol: '☋',
      category: 'spiritual',
      element: 'Fire / Ether',
      idealFinger: 'Ring finger of dominant hand',
      metal: 'Silver or Gold',
      auspiciousDay: 'Tuesday night or Thursday night',
      mantra: 'Om Stram Streem Stroom Sah Ketave Namah',
      primaryBenefit: 'Protects from hidden enemies, black magic, grants sharp intuition and instant spiritual awakening.',
      compatibilityScore: 94,
      colorGradient: 'from-yellow-700 via-emerald-900 to-black',
      colorHex: '#854D0E',
      upratna: 'Tiger\'s Eye or Quartz Cat\'s Eye',
      caratWeight: calculatedIdealCarats,
      purification: 'Cleanse with Gangajal and raw milk; chant Ketu Beej Mantra 108 times.',
      whyItWorks: 'Chatoyancy optical phenomenon (light streak) acts as a psychic mirror reflecting malefic non-physical energies back to source.',
      rootCauseDiagnosed: 'Ketu affliction causing sudden physical accidents, loss of identity, mystery diseases, or severe detachment.',
      targetProblemSolved: 'Hidden Enemy Attacks, Evil Eye (Nazar), Unexplained Ailments & Spiritual Disconnection.',
      incompatibleStones: ['Ruby (Manik)', 'Pearl (Moti)'],
      physicsExplanation: 'Parallel needle-like inclusions of rutile causing distinct chatoyant light beam.',
      wearingDirection: 'Face North-West while wearing.'
    }
  ];

  // 🔮 2. Western Zodiac & Crystal Resonators
  const westernCrystals: GemstoneDetail[] = [
    {
      id: 'amethyst-crystal',
      name: 'Deep Siberian Amethyst',
      sanskritName: 'Pisces / Aquarius Cosmic Shield',
      rulingPlanet: 'Neptune & Saturn',
      planetSymbol: '♆',
      category: 'spiritual',
      element: 'Water / Air',
      idealFinger: 'Necklace Pendant over Third Eye / Heart',
      metal: 'Sterling Silver (925)',
      auspiciousDay: 'Thursday evening or Full Moon night',
      mantra: 'Affirmation: "My mind is crystal clear, tranquil, and divinely guided."',
      primaryBenefit: 'Cures psychic exhaustion, deepens meditation, and transmutes negative environmental stress.',
      compatibilityScore: 96,
      colorGradient: 'from-purple-600 via-violet-800 to-slate-950',
      colorHex: '#7C3AED',
      upratna: 'Lepidolite or Purple Fluorite',
      caratWeight: '8.00 to 15.00 Carats',
      purification: 'Rest on a bed of Selenite or wash in cool spring water under moonlight.',
      whyItWorks: 'High iron-irradiated quartz lattice stimulates Third Eye (Ajna) chakra beta wave modulation.',
      rootCauseDiagnosed: 'Overactive nervous system, psychic vampirism, and insomnia caused by transiting Neptune squares.',
      targetProblemSolved: 'Mental Overwhelm, Panic Attacks, Bad Dreams & Chemical Addiction.',
      incompatibleStones: ['Carnelian (High Aggressive Fire)'],
      physicsExplanation: 'Silicon dioxide with ferric iron center inclusions.',
      wearingDirection: 'Wear near throat/chest.'
    },
    {
      id: 'citrine-crystal',
      name: 'Natural Golden Citrine',
      sanskritName: 'Leo / Gemini Merchant Stone',
      rulingPlanet: 'Sun & Jupiter',
      planetSymbol: '☀️',
      category: 'wealth',
      element: 'Fire / Air',
      idealFinger: 'Right wrist bracelet or Index finger',
      metal: '14k Gold or Copper',
      auspiciousDay: 'Sunday noon or New Moon sunrise',
      mantra: 'Affirmation: "Unlimited financial abundance and golden vitality flow to me."',
      primaryBenefit: 'Magnifies business cashflow, solar plexus power, and optimism.',
      compatibilityScore: 98,
      colorGradient: 'from-amber-400 via-yellow-600 to-slate-950',
      colorHex: '#D97706',
      upratna: 'Golden Pyrite or Yellow Jasper',
      caratWeight: '10.00 to 20.00 Carats',
      purification: 'Expose to direct noon sunlight for 2 hours.',
      whyItWorks: 'Piezoelectric quartz frequency amplifies personal aura radius up to 3 meters.',
      rootCauseDiagnosed: 'Solar Plexus chakra blockage causing poverty mindset, fear of taking sales risks, and sluggish digestion.',
      targetProblemSolved: 'Financial Stagnation, Low Self-Confidence & Lack of Drive.',
      incompatibleStones: ['Black Tourmaline (Grounded Heavy Void)'],
      physicsExplanation: 'Heat-treated or natural quartz with iron oxide inclusions.',
      wearingDirection: 'Right arm / wrist.'
    }
  ];

  // 🌙 3. Islamic Celestial Stones (Nujum & Sunnah)
  const islamicStones: GemstoneDetail[] = [
    {
      id: 'yemeni-aqeeq',
      name: 'Yemeni Red Aqeeq (عقيق يماني)',
      sanskritName: 'Sunnah Blessed Celestial Aqeeq',
      rulingPlanet: 'Shams (Sun) & Celestial Barakah',
      planetSymbol: '☀️',
      category: 'protection',
      element: 'Fire / Earth',
      idealFinger: 'Little finger of right hand (Sunnah Method)',
      metal: 'Pure Silver (Fidda 925)',
      auspiciousDay: 'Friday (Jumuah) morning after Fajr',
      mantra: 'Recite Ayat al-Kursi, Surah Al-Ikhlas (3x) & Salawat',
      primaryBenefit: 'Brings divine Barakah, protection against evil eye (Hasad), and poverty relief.',
      compatibilityScore: 99,
      colorGradient: 'from-red-700 via-amber-900 to-black',
      colorHex: '#991B1B',
      upratna: 'Kabudi Aqeeq or Carnelian',
      caratWeight: calculatedIdealCarats,
      purification: 'Wash in Zamzam water or pure rose water and recite Darood Sharif.',
      whyItWorks: 'Historically blessed in Hadith traditions; natural microcrystalline quartz holds peaceful thermal resonance.',
      rootCauseDiagnosed: 'Spiritual vulnerability to Hasad (envy), financial distress, and heart anxiety.',
      targetProblemSolved: 'Evil Eye (Hasad), Financial Distress, Heart Nervousness & Bad Omens.',
      incompatibleStones: ['Synthetic / Plastic Imitations'],
      physicsExplanation: 'Cryptocrystalline silica chalcedony with iron oxide band formations.',
      wearingDirection: 'Right Hand Little Finger.'
    },
    {
      id: 'nishapuri-firoza',
      name: 'Nishapuri Firoza / Turquoise (فيروزج)',
      sanskritName: 'Stone of Divine Victory & Peace',
      rulingPlanet: 'Mushtari (Jupiter) & Zuhrah (Venus)',
      planetSymbol: '♃',
      category: 'love',
      element: 'Water / Air',
      idealFinger: 'Ring or Little finger of right hand',
      metal: 'Pure Silver (Fidda 925)',
      auspiciousDay: 'Thursday morning before Dhuhr',
      mantra: 'Recite "Ya Razzaq, Ya Hafiz, Ya Wadud" (100x)',
      primaryBenefit: 'Softens human hearts, ensures acceptance of Dua, and safeguards against sudden perils.',
      compatibilityScore: 97,
      colorGradient: 'from-cyan-500 via-teal-700 to-slate-950',
      colorHex: '#0891B2',
      upratna: 'Iranian Sky Blue Turquoise or Larimar',
      caratWeight: calculatedIdealCarats,
      purification: 'Keep away from oils/soaps, wipe with pure water and rose oil.',
      whyItWorks: 'Hydrous phosphate of copper and aluminum restores heart equilibrium and emotional serenity.',
      rootCauseDiagnosed: 'Hardness of heart, strained interpersonal relations, and blockage in spiritual Duas.',
      targetProblemSolved: 'Relationship Tension, Unaccepted Duas, Heart Heaviness & Accidents.',
      incompatibleStones: ['Heavy Acidic Chemicals'],
      physicsExplanation: 'Triclinic copper aluminum phosphate mineral structure.',
      wearingDirection: 'Right Hand Ring Finger.'
    }
  ];

  // Active gemstone list filtered by Tradition & Category
  const activeList = useMemo(() => {
    let list = selectedTradition === 'vedic' ? vedicGemstones :
               selectedTradition === 'western' ? westernCrystals :
               selectedTradition === 'islamic' ? islamicStones : vedicGemstones;

    if (selectedCategory !== 'all') {
      list = list.filter(item => item.category === selectedCategory);
    }
    return list;
  }, [selectedTradition, selectedCategory]);

  // Export PDF Blueprint for Gemstone Recommendation
  const handleExportGemstonePdf = (gem: GemstoneDetail) => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      const printWin = window.open('', '_blank');
      if (printWin) {
        printWin.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Gemstone Remedy Blueprint — ${gem.name}</title>
              <style>
                body { font-family: system-ui, sans-serif; padding: 40px; color: #0f172a; line-height: 1.6; }
                .h { border-bottom: 3px double #d97706; padding-bottom: 16px; margin-bottom: 24px; }
                .title { font-size: 24px; font-weight: 800; color: #b45309; }
                .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px; }
                .card { border: 1px solid #e2e8f0; padding: 16px; border-radius: 12px; background: #f8fafc; }
                .lbl { font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; }
                .val { font-size: 14px; font-weight: 700; color: #1e293b; }
                .alert { background: #fef2f2; border: 1px solid #fca5a5; padding: 16px; border-radius: 12px; color: #991b1b; margin-bottom: 20px; }
                .footer { text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 16px; margin-top: 30px; }
              </style>
            </head>
            <body>
              <div class="h">
                <div class="title">💎 ASTRO360 GEMSTONE & PLANETARY MINERAL BLUEPRINT</div>
                <div>Personalized Prescribed Remedial Guide for ${userProfile?.name || 'Tarik Islam'}</div>
              </div>

              <div class="grid">
                <div class="card"><div class="lbl">Prescribed Gemstone</div><div class="val">${gem.name} (${gem.sanskritName})</div></div>
                <div class="card"><div class="lbl">Ruling Planet & Aspect</div><div class="val">${gem.rulingPlanet} ${gem.planetSymbol}</div></div>
                <div class="card"><div class="lbl">Exact Body Carat Weight</div><div class="val">${gem.caratWeight} (Body Wt: ${userBodyWeightKg} kg)</div></div>
                <div class="card"><div class="lbl">Wearing Finger & Metal</div><div class="val">${gem.idealFinger} (${gem.metal})</div></div>
              </div>

              <div class="card" style="margin-bottom: 20px; background: #fffdf5; border-color: #fde68a;">
                <div class="lbl" style="color: #b45309;">🔬 Why It Works (Root Cause Physics & Astro Diagnostics)</div>
                <p style="font-size: 13px; color: #78350f; margin-top: 4px;"><strong>Root Cause Diagnosed:</strong> ${gem.rootCauseDiagnosed}</p>
                <p style="font-size: 13px; color: #78350f;"><strong>Scientific & Bio-energetic Mechanism:</strong> ${gem.whyItWorks}</p>
              </div>

              <div class="card" style="margin-bottom: 20px;">
                <div class="lbl">✨ Activation Mantra & Purification Protocol</div>
                <p style="font-size: 14px; font-weight: 700; color: #4f46e5; margin: 6px 0;">Mantra: ${gem.mantra}</p>
                <p style="font-size: 12px; color: #334155;"><strong>Ritual:</strong> ${gem.purification}</p>
                <p style="font-size: 12px; color: #334155;"><strong>Best Timing & Direction:</strong> ${gem.auspiciousDay} | Face ${gem.wearingDirection}</p>
              </div>

              <div class="alert">
                <strong>⚠️ INCOMPATIBILITY WARNING:</strong> NEVER wear <strong>${gem.name}</strong> together with: ${gem.incompatibleStones.join(', ')}. Combining incompatible gemstones causes severe energetic friction!
              </div>

              <div class="footer">
                ASTRO360 Precision Remedial Engine · ${new Date().toLocaleDateString()}
              </div>
            </body>
          </html>
        `);
        printWin.document.close();
        printWin.focus();
        setTimeout(() => printWin.print(), 500);
      }
    }, 300);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-8 text-left">
      {/* 🔮 ENGINE HEADER & LIVE BIRTH CHART CALCULATOR */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-amber-500/30 relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-600/20 via-purple-600/10 to-transparent blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <Gem className="w-5 h-5 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase">Universal Remedial Diagnostic Suite</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">
              Planetary Gemstones & <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">Root Cause Remedies</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Scientific, astronomical, and energetic gemstone recommendations tailored to {userProfile?.name || 'Tarik Islam'}. Resolves core planetary afflictions with exact weight formulas, ritual purifications, and incompatibility warnings.
            </p>
          </div>

          {/* Live Seeker Chart Summary Card */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shrink-0 space-y-2 min-w-[240px]">
            <div className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> Seeker Ephemeris Alignment
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">Sun Sign</span>
                <span className="font-bold text-white">{seekerSunSign}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Moon Sign</span>
                <span className="font-bold text-white">{seekerMoonSign}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Lagna / Ascendant</span>
                <span className="font-bold text-white">{seekerAscendant}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Body Wt (Carat Ratio)</span>
                <span className="font-bold text-amber-300">{userBodyWeightKg} kg</span>
              </div>
            </div>
          </div>
        </div>

        {/* 🎛️ CUSTOMIZATION CONTROLS (Body Weight & Filters) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10 relative z-10">
          {/* Body Weight Carat Calculator Slider */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/20 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-amber-300 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-amber-400" /> Body Weight (Carat Formula)
              </span>
              <span className="font-mono font-bold text-white">{userBodyWeightKg} kg</span>
            </div>
            <input
              type="range"
              min="40"
              max="130"
              value={userBodyWeightKg}
              onChange={(e) => setUserBodyWeightKg(Number(e.target.value))}
              className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="text-[10px] text-slate-400 flex justify-between">
              <span>Ideal Gem Weight:</span>
              <span className="font-mono font-bold text-amber-300">{calculatedIdealCarats}</span>
            </div>
          </div>

          {/* Goal / Problem Filter */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
            <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-indigo-400" /> Target Problem / Life Area
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl text-xs p-2.5 outline-none focus:border-indigo-500"
            >
              <option value="all">🌟 All Problem Areas & Remedies</option>
              <option value="career">💼 Career Stagnation & Business Leadership</option>
              <option value="wealth">💰 Financial Wealth & Debt Neutralization</option>
              <option value="love">❤️ Marriage Harmony & Relationship Attraction</option>
              <option value="health">💚 Health Vitality & Mental Stress</option>
              <option value="protection">🛡️ Evil Eye, Rahu-Ketu & Legal Protection</option>
              <option value="spiritual">🧘 Spiritual Intuition & Karma Clearing</option>
            </select>
          </div>

          {/* Tradition Filter */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
            <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-400" /> Remedy Tradition
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
              {[
                { id: 'vedic', label: '🕉️ Vedic' },
                { id: 'western', label: '🔮 Western' },
                { id: 'islamic', label: '🌙 Islamic' },
                { id: 'chinese', label: '☯️ BaZi' },
                { id: 'universal', label: '🌐 Universal' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTradition(t.id as any)}
                  className={`py-2 rounded-xl text-[11px] font-bold transition-all ${
                    selectedTradition === t.id
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 📚 WHY GEMSTONES WORK (Physics & Metaphysics Infographic Banner) */}
      <div className="glass-card p-6 rounded-3xl border border-indigo-500/20 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          The Science & Cosmic Physics: Why Gemstones Heal & Transform
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/15 space-y-2">
            <div className="font-bold text-indigo-300 flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-yellow-400" /> 1. Chromotherapy & Light Spectrum
            </div>
            <p className="leading-relaxed">
              Planets radiate distinct electromagnetic wavelengths. Natural gemstones act as optical prisms, absorbing specific cosmic rays and transferring focused light energy into body chakras via cutaneous capillaries.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/15 space-y-2">
            <div className="font-bold text-purple-300 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-purple-400" /> 2. Piezoelectric Frequency Modulation
            </div>
            <p className="leading-relaxed">
              Under pressure, gemstone crystal lattices generate micro-voltage electricity. When touching the skin, this continuous frequency stabilizes biomagnetic aura fields and corrects nerve pulse imbalances.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/15 space-y-2">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-amber-400" /> 3. Planetary Malefic Neutralization
            </div>
            <p className="leading-relaxed">
              When a planet is weak or malefic in your birth chart, wearing its gemstone amplifies positive planetary benefic rays while purifying toxic karmic transit frequencies.
            </p>
          </div>
        </div>
      </div>

      {/* 💎 GEMSTONES & REMEDIES CATALOG GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeList.map((gem) => (
          <motion.div
            key={gem.id}
            whileHover={{ scale: 1.02, y: -4 }}
            className="glass-card rounded-3xl p-6 border border-white/10 space-y-5 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-xl relative overflow-hidden"
          >
            <div className="space-y-4">
              {/* Gem Visual Box */}
              <div className={`h-32 w-full rounded-2xl bg-gradient-to-br ${gem.colorGradient} flex flex-col items-center justify-center p-4 border border-white/20 shadow-inner relative overflow-hidden`}>
                <Sparkles className="w-8 h-8 text-white/90 animate-pulse mb-1" />
                <span className="text-[10px] font-mono text-white font-bold uppercase tracking-wider bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  {gem.compatibilityScore}% Seeker Compatibility Match
                </span>
                <span className="absolute top-2 right-2 text-2xl opacity-40">{gem.planetSymbol}</span>
              </div>

              <div>
                <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider">{gem.sanskritName}</span>
                <h3 className="text-xl font-bold text-white mt-0.5">{gem.name}</h3>
                <p className="text-xs text-slate-400 mt-1">Ruling Aspect: <strong className="text-slate-200">{gem.rulingPlanet}</strong></p>
              </div>

              {/* Quick Details */}
              <div className="space-y-2 text-xs text-slate-300 border-t border-white/10 pt-3">
                <p><span className="text-slate-400 font-medium">Wearing Finger:</span> {gem.idealFinger}</p>
                <p><span className="text-slate-400 font-medium">Metal & Metal Weight:</span> {gem.metal}</p>
                <p><span className="text-slate-400 font-medium">Prescribed Weight:</span> <strong className="text-amber-300 font-mono">{gem.caratWeight}</strong></p>
                <p><span className="text-slate-400 font-medium">Secondary Upratna:</span> <span className="text-cyan-300">{gem.upratna}</span></p>

                {/* Problem Solved Tag */}
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase block text-amber-400">Target Problem Solved</span>
                  <p className="font-semibold text-xs leading-snug">{gem.targetProblemSolved}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-3 border-t border-white/10">
              <button
                onClick={() => setSelectedGemForModal(gem)}
                className="w-full py-2.5 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Info className="w-4 h-4" /> Inspect Why & Root Cause Details
              </button>

              <button
                onClick={() => handleExportGemstonePdf(gem)}
                className="w-full py-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" /> Download Remedy PDF Report
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔍 DETAILED INSPECTION MODAL (WHY, ROOT CAUSE & INCOMPATIBILITIES) */}
      <AnimatePresence>
        {selectedGemForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar p-6 md:p-8 rounded-3xl border border-amber-500/30 space-y-6 text-left relative"
            >
              <button
                onClick={() => setSelectedGemForModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${selectedGemForModal.colorGradient} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                  {selectedGemForModal.planetSymbol}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedGemForModal.name}</h2>
                  <p className="text-xs text-amber-400 font-mono font-bold">{selectedGemForModal.sanskritName} · {selectedGemForModal.rulingPlanet}</p>
                </div>
              </div>

              {/* Diagnostics Grid */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-200 space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Root Cause Diagnosed
                  </h4>
                  <p className="text-xs leading-relaxed text-slate-200">{selectedGemForModal.rootCauseDiagnosed}</p>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4" /> Scientific & Physics Mechanism (Why It Works)
                  </h4>
                  <p className="text-xs leading-relaxed text-slate-200">{selectedGemForModal.whyItWorks}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Activation Mantra</span>
                    <p className="font-mono text-amber-300">{selectedGemForModal.mantra}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Cleansing Ritual</span>
                    <p className="text-slate-300">{selectedGemForModal.purification}</p>
                  </div>
                </div>

                {/* INCOMPATIBILITY WARNING */}
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                  <h4 className="text-xs font-bold uppercase text-amber-300 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-amber-400" /> Incompatible Gemstones (NEVER Wear Together!)
                  </h4>
                  <div className="flex items-center gap-2 flex-wrap">
                    {selectedGemForModal.incompatibleStones.map((st, i) => (
                      <span key={i} className="text-xs font-bold px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/40">
                        ⛔ {st}
                      </span>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Combining incompatible gemstone frequency spectra creates opposing energetic vortexes, causing physical headache, financial leakage, or erratic temperament.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => handleExportGemstonePdf(selectedGemForModal)}
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:brightness-110 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Download Complete Remedy Blueprint (PDF)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
