import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, Sparkles, Heart, Zap, RefreshCw, CheckCircle, Scale, AlertTriangle, Globe, Compass, Gem 
} from 'lucide-react';
import type { UserProfile } from '../types';

interface AstroRemedialGemstoneEngineProps {
  userProfile: UserProfile;
}

export default function AstroRemedialGemstoneEngine({ userProfile }: AstroRemedialGemstoneEngineProps) {
  const [selectedTradition, setSelectedTradition] = useState<'vedic' | 'western' | 'chinese' | 'islamic' | 'universal'>('vedic');

  const dobDate = userProfile?.dob ? new Date(userProfile.dob) : new Date(1998, 5, 15);

  // 1. Vedic Planetary Gemstones
  const vedicGemstones = [
    {
      id: 'blue-sapphire',
      name: 'Blue Sapphire (Neelam)',
      sanskritName: 'Shani Ratna',
      rulingPlanet: 'Saturn (Shani)',
      idealFinger: 'Middle finger of dominant hand',
      metal: 'Silver or Panchdhatu',
      auspiciousDay: 'Saturday morning during Hora of Saturn',
      mantra: 'Om Sham Shanaishcharaya Namah (108 times)',
      primaryBenefit: 'Stabilizes career friction, enhances deep focus, and mitigates Saturn transit delays.',
      compatibilityScore: 94,
      colorGradient: 'from-blue-600 via-indigo-700 to-slate-900',
      upratna: 'Amethyst (Jamuniya) or Blue Topaz',
      caratWeight: '4.25 to 5.50 Carat',
      purification: 'Immerse in unboiled cow milk, Gangajal, and honey for 45 mins before wearing at sunrise.',
    },
    {
      id: 'yellow-sapphire',
      name: 'Yellow Sapphire (Pukhraj)',
      sanskritName: 'Guru Ratna',
      rulingPlanet: 'Jupiter (Guru)',
      idealFinger: 'Index finger of dominant hand',
      metal: 'Yellow Gold or Brass',
      auspiciousDay: 'Thursday morning during Shukla Paksha',
      mantra: 'Om Gram Greem Groom Sah Gurave Namah',
      primaryBenefit: 'Expands spiritual wisdom, attracts wealth, and safeguards higher education & luck.',
      compatibilityScore: 96,
      colorGradient: 'from-amber-400 via-yellow-600 to-amber-900',
      upratna: 'Yellow Topaz (Sunela) or Citrine',
      caratWeight: '5.25 to 6.50 Carat',
      purification: 'Purify with raw milk, turmeric water, and perform 108 chants of Guru Beej Mantra.',
    },
    {
      id: 'emerald',
      name: 'Emerald (Panna)',
      sanskritName: 'Budha Ratna',
      rulingPlanet: 'Mercury (Budh)',
      idealFinger: 'Little finger of dominant hand',
      metal: 'Gold or Silver',
      auspiciousDay: 'Wednesday morning',
      mantra: 'Om Bram Breem Broom Sah Budhaya Namah',
      primaryBenefit: 'Amplifies analytical intellect, verbal eloquence, and business negotiation skills.',
      compatibilityScore: 91,
      colorGradient: 'from-emerald-500 via-teal-700 to-slate-900',
      upratna: 'Peridot (Margaj) or Green Tourmaline',
      caratWeight: '4.50 to 5.75 Carat',
      purification: 'Soak in Tulsi leaves water and raw milk on Wednesday morning during Mercury Hora.',
    },
    {
      id: 'ruby',
      name: 'Ruby (Manik)',
      sanskritName: 'Surya Ratna',
      rulingPlanet: 'Sun (Surya)',
      idealFinger: 'Ring finger of dominant hand',
      metal: 'Gold or Copper',
      auspiciousDay: 'Sunday morning at sunrise',
      mantra: 'Om Hram Hreem Hroom Sah Suryaya Namah',
      primaryBenefit: 'Boosts leadership authority, vital health, confidence, and public reputation.',
      compatibilityScore: 95,
      colorGradient: 'from-red-600 via-rose-700 to-slate-900',
      upratna: 'Red Garnet or Spinel',
      caratWeight: '3.50 to 5.00 Carat',
      purification: 'Cleanse with rose water, Gangajal, and present to morning sunlight.',
    }
  ];

  // 2. Western Zodiac Birthstones & Crystals
  const westernCrystals = [
    {
      id: 'amethyst',
      name: 'Amethyst & Fluorite',
      sanskritName: 'Pisces / Aquarius Birthstone',
      rulingPlanet: 'Neptune & Uranus',
      idealFinger: 'Necklace pendant or Ring finger',
      metal: 'Sterling Silver',
      auspiciousDay: 'Thursday / Full Moon',
      mantra: 'Affirmation: "I am calm, intuitive, and spiritually protected."',
      primaryBenefit: 'Calms anxious overthinking, enhances psychic intuition, and shields emotional aura.',
      compatibilityScore: 95,
      colorGradient: 'from-purple-600 via-violet-800 to-slate-900',
      upratna: 'Lepidolite or Clear Quartz',
      caratWeight: '6.00 to 10.00 Carat',
      purification: 'Cleanse under cold running spring water and charge under moonlight.',
    },
    {
      id: 'rose-quartz',
      name: 'Rose Quartz & Emerald',
      sanskritName: 'Taurus / Libra Heart Crystal',
      rulingPlanet: 'Venus',
      idealFinger: 'Heart pendant or Left hand ring',
      metal: 'Rose Gold or Silver',
      auspiciousDay: 'Friday',
      mantra: 'Affirmation: "I attract unconditional love, emotional balance, and grace."',
      primaryBenefit: 'Opens the Heart Chakra, heals relationship wounds, and nurtures deep self-worth.',
      compatibilityScore: 93,
      colorGradient: 'from-pink-400 via-rose-600 to-slate-900',
      upratna: 'Rhodochrosite or Pink Tourmaline',
      caratWeight: '8.00 to 12.00 Carat',
      purification: 'Rest on a bed of Selenite or smudged with white sage smoke.',
    },
    {
      id: 'citrine',
      name: 'Golden Citrine & Tiger Eye',
      sanskritName: 'Solar Plexus Power Stone',
      rulingPlanet: 'Sun & Jupiter',
      idealFinger: 'Right wrist bracelet or Index finger',
      metal: 'Yellow Gold or Copper',
      auspiciousDay: 'Sunday / Waxing Moon',
      mantra: 'Affirmation: "Abundance, wealth, and sovereign power flow to me freely."',
      primaryBenefit: 'Magnifies manifestation drive, financial prosperity, and personal willpower.',
      compatibilityScore: 97,
      colorGradient: 'from-amber-400 via-yellow-600 to-slate-900',
      upratna: 'Pyrite or Amber',
      caratWeight: '7.50 to 10.00 Carat',
      purification: 'Charge under direct noon sun rays for 2 hours.',
    }
  ];

  // 3. Chinese Five-Element (Wu Xing) Crystals & Jade
  const chineseCrystals = [
    {
      id: 'imperial-jade',
      name: 'Imperial Green Jade (翡翠)',
      sanskritName: 'Wood Element (木) Harmony',
      rulingPlanet: 'Eastern Dragon / Wood Star',
      idealFinger: 'Jade Bangle on left wrist',
      metal: 'Pure Jade carving or Fine Gold',
      auspiciousDay: 'Spring Equinox / Lunar New Moon',
      mantra: 'Mantra: "Om Mani Padme Hum" & Five-Element Balance',
      primaryBenefit: 'Harmonizes Liver energy, attracts long-term wealth luck, and guarantees bodily longevity.',
      compatibilityScore: 98,
      colorGradient: 'from-emerald-600 via-green-800 to-slate-900',
      upratna: 'Nephrite Jade or Green Aventurine',
      caratWeight: '10.00 to 20.00 Grams',
      purification: 'Wash in clean mountain spring water and sound a Tibetan singing bowl.',
    },
    {
      id: 'black-obsidian',
      name: 'Black Obsidian & Pixiu (黑曜石)',
      sanskritName: 'Water Element (水) Shield',
      rulingPlanet: 'Black Tortoise / Water Star',
      idealFinger: 'Right hand Pixiu bracelet',
      metal: 'Black Agate beads with Gold Pixiu',
      auspiciousDay: 'Winter Solstice / Midnight',
      mantra: 'Affirmation: "All negative qi is absorbed and transformed into strength."',
      primaryBenefit: 'Repels malevolent energy (Sha Qi), protects financial savings, and grounds stress.',
      compatibilityScore: 94,
      colorGradient: 'from-slate-700 via-slate-900 to-black',
      upratna: 'Black Tourmaline or Charcoal Hematite',
      caratWeight: '12.00 to 15.00 mm Beads',
      purification: 'Bury in natural sea salt overnight.',
    }
  ];

  // 4. Islamic Celestial Stones (Nujum & Aqeeq)
  const islamicStones = [
    {
      id: 'yemeni-aqeeq',
      name: 'Yemeni Red Aqeeq (عقيق يماني)',
      sanskritName: 'Sunnah Blessed Stone',
      rulingPlanet: 'Shams (Sun) & Celestial Protection',
      idealFinger: 'Little finger of right hand (Sunnah method)',
      metal: 'Pure Silver (Fidda 925)',
      auspiciousDay: 'Friday (Jumuah) morning',
      mantra: 'Recite Ayat al-Kursi & Surah Al-Ikhlas (3x)',
      primaryBenefit: 'Blessed by Islamic tradition for protection against envy (Hasad), poverty, and anxiety.',
      compatibilityScore: 99,
      colorGradient: 'from-red-700 via-amber-900 to-black',
      upratna: 'Kabudi Aqeeq or Carnelian',
      caratWeight: '6.00 to 9.00 Carat',
      purification: 'Wash with Zamzam water or pure spring water and recite Salawat.',
    },
    {
      id: 'firoza',
      name: 'Nishapuri Firoza / Turquoise (فيروزج)',
      sanskritName: 'Stone of Victory & Peace',
      rulingPlanet: 'Mushtari (Jupiter) & Zuhrah (Venus)',
      idealFinger: 'Ring finger of right hand',
      metal: 'Pure Silver (Fidda 925)',
      auspiciousDay: 'Thursday morning',
      mantra: 'Recite "Ya Razzaq, Ya Hafiz" (100 times)',
      primaryBenefit: 'Brings tranquility to the heart, acceptance of prayers (Dua), and shields against danger.',
      compatibilityScore: 96,
      colorGradient: 'from-cyan-500 via-teal-700 to-slate-900',
      upratna: 'Sky Blue Turquoise or Larimar',
      caratWeight: '5.00 to 8.00 Carat',
      purification: 'Keep away from oil/chemicals, clean with pure water and rose essence.',
    }
  ];

  // 5. Universal Quantum Resonators
  const universalResonators = [
    {
      id: 'moldavite',
      name: 'Moldavite & Herkimer Diamond',
      sanskritName: 'Tektite Cosmic Transmuter',
      rulingPlanet: 'Starseed Interstellar Grid',
      idealFinger: 'Thymus High Heart Pendant',
      metal: 'Platinum or Silver Matrix',
      auspiciousDay: 'Solar Eclipse / Equinox',
      mantra: 'Quantum Code: 528 Hz DNA Repair Frequency',
      primaryBenefit: 'Accelerates rapid spiritual evolution, clears karmic blockages, and aligns soul timeline.',
      compatibilityScore: 97,
      colorGradient: 'from-lime-600 via-emerald-900 to-black',
      upratna: 'Libyan Desert Glass or Meteorite',
      caratWeight: '3.00 to 6.00 Carat',
      purification: 'Place on sound frequency plate (432 Hz / 528 Hz tuning fork).',
    }
  ];

  // Select active array based on tradition
  const activeList = 
    selectedTradition === 'vedic' ? vedicGemstones :
    selectedTradition === 'western' ? westernCrystals :
    selectedTradition === 'chinese' ? chineseCrystals :
    selectedTradition === 'islamic' ? islamicStones : universalResonators;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 mb-1">
            <Shield className="w-5 h-5" />
            <span className="text-xs font-semibold tracking-widest uppercase">Universal Remedial Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-100">
            Global Gemstone & <span className="gradient-text">Remedy Suite</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Personalized planetary gemstones, birthstones, five-element crystals, Islamic celestial stones, and sacred Yantras tailored to {userProfile?.name || 'Seeker'}.
          </p>
        </div>
      </div>

      {/* 🌐 TRADITION SELECTOR TABS */}
      <div className="space-y-3">
        <label className="text-[11px] font-mono text-slate-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
          <Globe className="w-4 h-4 text-amber-400" /> Select Remedy Tradition:
        </label>
        <div className="flex items-center gap-2 flex-wrap border-b border-slate-800 pb-4">
          {[
            { id: 'vedic', label: '🕉️ Vedic Ratna (Jyotish)' },
            { id: 'western', label: '🔮 Western Birthstones & Crystals' },
            { id: 'chinese', label: '☯️ Chinese Wu Xing (Five Elements)' },
            { id: 'islamic', label: '🌙 Islamic Celestial Stones (Nujum)' },
            { id: 'universal', label: '🌌 Universal Quantum Resonators' },
          ].map((trad) => (
            <button
              key={trad.id}
              onClick={() => setSelectedTradition(trad.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                selectedTradition === trad.id
                  ? 'bg-gradient-to-r from-amber-500/30 to-purple-500/30 text-amber-300 border border-amber-500/50 shadow-lg shadow-amber-500/10'
                  : 'glass-card text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {trad.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gemstones & Remedies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeList.map((gem) => (
          <motion.div 
            key={gem.id}
            whileHover={{ scale: 1.02, y: -4 }}
            className="glass-card rounded-3xl p-6 border border-slate-800 space-y-5 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-xl"
          >
            <div className="space-y-4">
              <div className={`h-28 w-full rounded-2xl bg-gradient-to-br ${gem.colorGradient} flex flex-col items-center justify-center p-4 border border-white/10 shadow-inner relative overflow-hidden`}>
                <Sparkles className="w-8 h-8 text-white/90 animate-pulse mb-1" />
                <span className="text-[10px] font-mono text-white/90 font-bold uppercase tracking-wider bg-black/40 px-2.5 py-0.5 rounded-full border border-white/20">
                  {gem.compatibilityScore}% Compatibility Match
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">{gem.sanskritName}</span>
                <h3 className="text-xl font-display font-bold text-slate-100">{gem.name}</h3>
                <p className="text-xs text-slate-400 mt-1 font-medium">Ruling Aspect: <strong className="text-slate-200">{gem.rulingPlanet}</strong></p>
              </div>

              <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-3 font-sans">
                <p><span className="font-semibold text-slate-400">Position & Metal:</span> {gem.idealFinger} ({gem.metal})</p>
                <p><span className="font-semibold text-slate-400">Weight Standard:</span> <span className="text-amber-300 font-mono font-bold">{gem.caratWeight}</span></p>
                <p><span className="font-semibold text-slate-400">Alternative Mineral:</span> <span className="text-cyan-300 font-medium">{gem.upratna}</span></p>
                <p><span className="font-semibold text-slate-400">Best Timing:</span> {gem.auspiciousDay}</p>

                <div className="p-3 rounded-2xl bg-slate-950 border border-amber-500/20 space-y-1 mt-2">
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">Activation Mantra / Affirmation</span>
                  <p className="font-mono text-[11px] text-amber-300 leading-tight">{gem.mantra}</p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950 border border-emerald-500/20 space-y-1">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">Consecration Ritual</span>
                  <p className="text-[11px] text-slate-300 leading-tight">{gem.purification}</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {gem.primaryBenefit}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
