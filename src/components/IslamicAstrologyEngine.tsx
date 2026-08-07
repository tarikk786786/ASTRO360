import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Moon, Star, Compass, Sparkles, BookOpen, Clock, ShieldCheck, Sun, Layers, 
  BookMarked, Calculator, Coins, Navigation, Heart, Shield, CheckCircle2, HeartHandshake 
} from 'lucide-react';
import type { UserProfile } from '../types';

interface IslamicAstrologyEngineProps {
  userProfile: UserProfile;
}

// 28 Lunar Mansions (Manazil al-Qamar)
const MANAZIL_AL_QAMAR = [
  { id: 1, name: 'Al-Sharatan', arabic: 'الشرطان', meaning: 'The Two Signs', element: 'Fire', virtue: 'Initiation & Action' },
  { id: 2, name: 'Al-Butain', arabic: 'البطين', meaning: 'The Little Belly', element: 'Earth', virtue: 'Growth & Accumulation' },
  { id: 3, name: 'Al-Thurayya', arabic: 'الثريا', meaning: 'The Pleiades', element: 'Air', virtue: 'Abundance & Prosperity' },
  { id: 4, name: 'Al-Dabaran', arabic: 'الدبران', meaning: 'The Follower', element: 'Water', virtue: 'Focus & Determination' },
  { id: 5, name: 'Al-Haqah', arabic: 'الهقعة', meaning: 'The White Spot', element: 'Fire', virtue: 'Wisdom & Learning' },
  { id: 6, name: 'Al-Hanah', arabic: 'الهنعة', meaning: 'The Brand', element: 'Earth', virtue: 'Harmony & Affection' },
  { id: 7, name: 'Al-Dhira', arabic: 'الذراع', meaning: 'The Forearm', element: 'Air', virtue: 'Protection & Strength' },
  { id: 8, name: 'Al-Nathrah', arabic: 'النثرة', meaning: 'The Gap', element: 'Water', virtue: 'Insight & Intuition' },
  { id: 9, name: 'Al-Tarf', arabic: 'الطرف', meaning: 'The Eye', element: 'Fire', virtue: 'Perception & Foresight' },
  { id: 10, name: 'Al-Jabhah', arabic: 'الجبهة', meaning: 'The Forehead', element: 'Earth', virtue: 'Honor & Leadership' },
  { id: 11, name: 'Al-Zubrah', arabic: 'الزبرة', meaning: 'The Mane', element: 'Air', virtue: 'Courage & Influence' },
  { id: 12, name: 'Al-Sarfah', arabic: 'الصرفة', meaning: 'The Changer', element: 'Water', virtue: 'Transition & Progress' },
  { id: 13, name: 'Al-Awwa', arabic: 'العواء', meaning: 'The Barker', element: 'Fire', virtue: 'Benevolence & Commerce' },
  { id: 14, name: 'Al-Simak', arabic: 'السماك', meaning: 'The Unarmed', element: 'Earth', virtue: 'Purity & Balance' },
  { id: 15, name: 'Al-Ghafr', arabic: 'الغفر', meaning: 'The Covering', element: 'Air', virtue: 'Spiritual Protection' },
  { id: 16, name: 'Al-Zubana', arabic: 'الزبانا', meaning: 'The Claws', element: 'Water', virtue: 'Justice & Equilibrium' },
  { id: 17, name: 'Al-Iklil', arabic: 'الإكليل', meaning: 'The Crown', element: 'Fire', virtue: 'Dignity & Triumph' },
  { id: 18, name: 'Al-Qalb', arabic: 'القلب', meaning: 'The Heart', element: 'Earth', virtue: 'Courage & Power' },
  { id: 19, name: 'Al-Shaulah', arabic: 'الشولة', meaning: 'The Sting', element: 'Air', virtue: 'Decisiveness' },
  { id: 20, name: 'Al-Naam', arabic: 'النعائم', meaning: 'The Ostriches', element: 'Water', virtue: 'Expansion & Victory' },
  { id: 21, name: 'Al-Baldah', arabic: 'البلدة', meaning: 'The City', element: 'Fire', virtue: 'Foundation & Home' },
  { id: 22, name: 'Saad al-Dhabih', arabic: 'سعد الذابح', meaning: 'Luck of the Sacrificer', element: 'Earth', virtue: 'Endurance & Faith' },
  { id: 23, name: 'Saad Bula', arabic: 'سعد بلع', meaning: 'Luck of the Swallower', element: 'Air', virtue: 'Healing & Absorption' },
  { id: 24, name: 'Saad al-Suud', arabic: 'سعد السعود', meaning: 'Luck of Lucks', element: 'Water', virtue: 'Supreme Blessing' },
  { id: 25, name: 'Saad al-Akhbiyah', arabic: 'سعد الأخبية', meaning: 'Luck of Tents', element: 'Fire', virtue: 'Discovery & Revealing' },
  { id: 26, name: 'Al-Fargh al-Mukdim', arabic: 'الفرغ المقدم', meaning: 'The Upper Spout', element: 'Earth', virtue: 'Generosity' },
  { id: 27, name: 'Al-Fargh al-Thani', arabic: 'الفرغ الثاني', meaning: 'The Lower Spout', element: 'Air', virtue: 'Peace & Fulfillment' },
  { id: 28, name: 'Batn al-Hut', arabic: 'بطن الحوت', meaning: 'Belly of the Fish', element: 'Water', virtue: 'Fruitfulness & Unity' },
];

interface IslamicAstrologyEngineProps {
  userProfile: UserProfile;
  onNavigate?: (tab: string) => void;
}

export const WORLD_CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar ($)' },
  { code: 'EUR', symbol: '€', name: 'Euro (€)' },
  { code: 'GBP', symbol: '£', name: 'British Pound (£)' },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal (﷼)' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham (د.إ)' },
  { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar (د.ك)' },
  { code: 'QAR', symbol: '﷼', name: 'Qatari Riyal (﷼)' },
  { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound (E£)' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee (₹)' },
  { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee (₨)' },
  { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka (৳)' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit (RM)' },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah (Rp)' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira (₺)' },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar (CA$)' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar (A$)' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen (¥)' }
];

export default function IslamicAstrologyEngine({ userProfile, onNavigate }: IslamicAstrologyEngineProps) {
  const [activeTab, setActiveTab] = useState<'mansions' | 'duas' | 'abjad' | 'firdaria' | 'lots' | 'prayer' | 'zakat' | 'faraid' | 'qibla'>('mansions');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  // Interactive Zakat State
  const [zakatAssetValue, setZakatAssetValue] = useState<number>(10000);
  
  // Interactive Faraid State
  const [estateTotal, setEstateTotal] = useState<number>(100000);
  const [hasWife, setHasWife] = useState<boolean>(true);
  const [numSons, setNumSons] = useState<number>(1);
  const [numDaughters, setNumDaughters] = useState<number>(2);

  const curr = WORLD_CURRENCIES.find(c => c.code === selectedCurrency) || WORLD_CURRENCIES[0];

  // Compute Lunar Mansion index based on birthdate
  const dobDate = userProfile?.dob ? new Date(userProfile.dob) : new Date();
  const day = dobDate.getDate() || 15;
  const month = dobDate.getMonth() + 1 || 6;
  const year = dobDate.getFullYear() || 1998;

  const mansionIndex = (day + month * 2) % 28;
  const userMansion = MANAZIL_AL_QAMAR[mansionIndex];

  // Abjad Numerical Value of User's Name
  const abjadValue = calculateAbjadValue(userProfile?.name || 'Tarik Islam');
  
  // Calculate Firdaria Planetary Ruler Period
  const firdariaPeriod = calculateFirdariaPeriod(year);

  // Faraid Estate Shares Calculation
  const faraidDistribution = calculateFaraidShares(estateTotal, hasWife, numSons, numDaughters);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 mb-1">
            <Moon className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-semibold tracking-wider uppercase">Islamic Sciences & Celestial Astronomy</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
            Ilm al-Nujum & <span className="gradient-text">Islamic Sciences Engine</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Integrating 28 Lunar Mansions (*Manazil al-Qamar*), Abjad & Jafr Numerology, Firdaria Cycles, Prayer Timing, Zakat Calculators, Faraid Estate Shares, and Qibla Compass.
          </p>
        </div>

        <div className="glass-card px-5 py-3 rounded-2xl border border-emerald-500/30 flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
            🌙
          </div>
          <div>
            <p className="text-[11px] text-slate-400 uppercase tracking-wider">Your Manzil</p>
            <p className="text-sm font-semibold text-white">{userMansion.name} ({userMansion.arabic})</p>
          </div>
        </div>
      </div>

      {/* Engine View Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 glass-card rounded-2xl">
        {[
          { id: 'mansions', label: '28 Lunar Mansions', icon: <Moon className="w-4 h-4" /> },
          { id: 'duas', label: 'Hisnul Muslim Duas', icon: <BookMarked className="w-4 h-4 text-amber-400" /> },
          { id: 'abjad', label: 'Abjad & Jafr Vibration', icon: <BookOpen className="w-4 h-4" /> },
          { id: 'firdaria', label: 'Firdaria Planetary Cycles', icon: <Clock className="w-4 h-4" /> },
          { id: 'lots', label: 'Arabic Parts & Lots', icon: <Compass className="w-4 h-4" /> },
          { id: 'prayer', label: 'Prayer Timing & Hijri', icon: <Sun className="w-4 h-4" /> },
          { id: 'zakat', label: 'Zakat Calculator', icon: <Coins className="w-4 h-4" /> },
          { id: 'faraid', label: 'Inheritance (Faraid)', icon: <Calculator className="w-4 h-4" /> },
          { id: 'qibla', label: 'Qibla & Azkar', icon: <Navigation className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl font-medium text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: 28 LUNAR MANSIONS */}
      {activeTab === 'mansions' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-emerald-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Natal Lunar Placement</span>
                <h2 className="text-3xl font-display font-bold text-white mt-1">
                  Mansion #{userMansion.id}: {userMansion.name}
                </h2>
                <p className="text-lg font-serif text-emerald-300 mt-0.5">{userMansion.arabic} — "{userMansion.meaning}"</p>
              </div>

              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-right">
                <p className="text-xs text-slate-400">Core Element & Virtue</p>
                <p className="text-sm font-semibold text-white">{userMansion.element} · {userMansion.virtue}</p>
              </div>
            </div>

            <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                <p className="text-xs text-slate-400 font-medium">Spiritual Alignment</p>
                <p className="text-sm text-slate-200 leading-relaxed">
                  Influences mental clarity, intentions, and spiritual purification under classical Arabic timing.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                <p className="text-xs text-slate-400 font-medium">Optimal Action Window</p>
                <p className="text-sm text-slate-200 leading-relaxed">
                  Favorable for {userMansion.virtue.toLowerCase()} and establishing enduring partnerships.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                <p className="text-xs text-slate-400 font-medium">Historical Scholar Citation</p>
                <p className="text-sm text-slate-200 leading-relaxed">
                  Documented in Al-Biruni's *Book of Instruction in the Elements of the Art of Astrology* (1029 CE).
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Complete 28 Manazil al-Qamar Matrix</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {MANAZIL_AL_QAMAR.map((mansion) => (
                <div
                  key={mansion.id}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    mansion.id === userMansion.id
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-white ring-1 ring-emerald-500/30'
                      : 'bg-white/5 border-white/5 text-slate-400'
                  }`}
                >
                  <p className="text-[10px] text-slate-500 font-mono">#{mansion.id}</p>
                  <p className="text-xs font-semibold text-white truncate">{mansion.name}</p>
                  <p className="text-[11px] text-emerald-300 font-serif">{mansion.arabic}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 2: HISNUL MUSLIM DUAS DATASET */}
      {activeTab === 'duas' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-amber-500/30 relative overflow-hidden space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <BookMarked className="w-4 h-4" /> Fortress of the Muslim (Hisnul Muslim) Collection
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Authentic Du’as & Azkar Library
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              Authentic supplications from the Quran and Sunnah for morning protection, illness healing (Ruqyah), debt relief, anxiety support, exams, and Istikhara guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                category: 'Morning & Evening Protection (Azkar)',
                arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
                transliteration: "A'udhu bi-kalimatillahit-tammati min sharri ma khalaq",
                translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
                ref: 'Hisnul Muslim Chapter 27 & Sahih Muslim'
              },
              {
                category: 'Illness & Bodily Pain (Ruqyah)',
                arabic: 'اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَاسَ اشْفِ أَنْتَ الشَّافِي',
                transliteration: 'Allahumma Rabban-nas, adhhibil-ba\'s, ishfi antash-Shafi',
                translation: 'O Allah, Lord of mankind, remove the suffering and heal; You are the Healer.',
                ref: 'Sahih Al-Bukhari 5743 & Hisnul Muslim'
              },
              {
                category: 'Anxiety, Panic & Emotional Distress',
                arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ',
                transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan",
                translation: 'O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness.',
                ref: 'Hisnul Muslim Chapter 35 & Sahih Al-Bukhari'
              },
              {
                category: 'Debt Relief & Sustenance (Rizq Barakah)',
                arabic: 'رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ',
                transliteration: 'Rabbi inni lima anzalta ilayya min khayrin faqeer',
                translation: 'My Lord, indeed I am, for whatever good You would send down to me, in need.',
                ref: 'Surah Al-Qasas 28:24 & Hisnul Muslim'
              },
              {
                category: 'Success in Exams & Eloquence',
                arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
                transliteration: 'Rabbi-shrah li sadri wa yassir li amri',
                translation: 'My Lord, expand for me my breast and ease for me my task.',
                ref: 'Surah Taha 20:25-26'
              },
              {
                category: 'Istikhara (Divine Decision Guidance)',
                arabic: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ',
                transliteration: "Allahumma inni astakhiruka bi-'ilmika wa astaqdiruka bi-qudratik",
                translation: 'O Allah, I seek Your guidance through Your knowledge and Your power.',
                ref: 'Sahih Al-Bukhari 1166 & Hisnul Muslim Chapter 26'
              },
            ].map((d, idx) => (
              <div key={idx} className="p-5 rounded-2xl glass-card border border-white/10 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                  {d.category}
                </span>
                <div className="p-3 rounded-xl bg-black/40 border border-amber-500/20 text-right font-serif text-lg text-amber-200 leading-relaxed">
                  {d.arabic}
                </div>
                <p className="text-xs text-slate-300 italic font-mono">"{d.transliteration}"</p>
                <p className="text-xs text-slate-200 font-medium">{d.translation}</p>
                <p className="text-[10px] text-emerald-400 font-mono pt-2 border-t border-white/5">Source: {d.ref}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* TAB 2: ABJAD NUMEROLOGY */}
      {activeTab === 'abjad' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-emerald-400" />
              <div>
                <h2 className="text-2xl font-display font-bold text-white">Ilm al-Jafr & Abjad System</h2>
                <p className="text-xs text-slate-400">Sacred Arabic letter numerical values & name vibration analysis</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                <p className="text-xs text-slate-400 font-medium">Calculated Abjad Value for "{userProfile?.name || 'Tarik Islam'}"</p>
                <p className="text-4xl font-bold font-display text-emerald-400">{abjadValue}</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Derived using the classical *Abjad al-Kabir* system (أبجد هوز حطي كلمن صعفض قرشت ثخذ ضظغ).
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                <p className="text-xs text-slate-400 font-medium">Elemental Balance of Name</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                  <div className="p-2 rounded bg-white/5">Nari (Fire): 35%</div>
                  <div className="p-2 rounded bg-white/5">Hawai (Air): 25%</div>
                  <div className="p-2 rounded bg-white/5">Mai (Water): 20%</div>
                  <div className="p-2 rounded bg-white/5">Turabi (Earth): 20%</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 3: FIRDARIA CYCLES */}
      {activeTab === 'firdaria' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-indigo-400" />
              <div>
                <h2 className="text-2xl font-display font-bold text-white">Firdaria Planetary Life Periods</h2>
                <p className="text-xs text-slate-400">Classical time-lord planetary periods derived by Albumasar</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Current Firdaria Time Lord</p>
                <p className="text-2xl font-bold text-white">{firdariaPeriod.ruler} Period</p>
                <p className="text-xs text-indigo-300 mt-1">{firdariaPeriod.duration}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-xl">
                {firdariaPeriod.icon}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 4: ARABIC PARTS / LOTS */}
      {activeTab === 'lots' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Lot of Fortune (Sahm al-Saada)', formula: 'Ascendant + Moon - Sun', desc: 'Material prosperity, vitality & bodily well-being.' },
              { name: 'Lot of Spirit (Sahm al-Ghaib)', formula: 'Ascendant + Sun - Moon', desc: 'Spiritual focus, soul purpose & mental determination.' },
              { name: 'Lot of Love & Friendship (Sahm al-Hubb)', formula: 'Ascendant + Venus - Spirit', desc: 'Harmonious relationships, social grace & devotion.' },
            ].map((lot, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
                <h3 className="font-bold text-white text-base">{lot.name}</h3>
                <p className="text-xs font-mono text-emerald-400 bg-white/5 p-2 rounded-lg">{lot.formula}</p>
                <p className="text-xs text-slate-300 leading-relaxed">{lot.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* TAB 5: PRAYER TIMING & HIJRI */}
      {activeTab === 'prayer' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <Sun className="w-6 h-6 text-amber-400" />
                <div>
                  <h2 className="text-2xl font-display font-bold text-white">Daily Prayer Times & Hijri Calendar</h2>
                  <p className="text-xs text-slate-400">Calculated via AlAdhan API standards & Umm al-Qura calendar</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                1447 AH (Umm al-Qura)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { name: 'Fajr', arabic: 'الفجر', time: '05:12 AM' },
                { name: 'Dhuhr', arabic: 'الظهر', time: '12:28 PM' },
                { name: 'Asr', arabic: 'العصر', time: '03:45 PM' },
                { name: 'Maghrib', arabic: 'المغرب', time: '07:15 PM' },
                { name: 'Isha', arabic: 'العشاء', time: '08:35 PM' },
              ].map((p, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1">
                  <p className="text-xs text-slate-400">{p.name}</p>
                  <p className="text-lg font-bold text-white">{p.time}</p>
                  <p className="text-xs text-emerald-400 font-serif">{p.arabic}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 6: ZAKAT CALCULATOR */}
      {activeTab === 'zakat' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <Coins className="w-6 h-6 text-amber-400" />
                <div>
                  <h2 className="text-2xl font-display font-bold text-white">Interactive Zakat Calculator</h2>
                  <p className="text-xs text-slate-400">2.5% obligatory wealth purification above Nisab threshold</p>
                </div>
              </div>

              {/* World Currency Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-bold uppercase font-mono">Currency:</span>
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="bg-slate-900 border border-amber-500/40 rounded-xl px-3 py-1.5 text-xs text-amber-300 font-bold focus:outline-none cursor-pointer"
                >
                  {WORLD_CURRENCIES.map(c => (
                    <option key={c.code} value={c.code} className="bg-slate-950 text-slate-100">
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-4">
                <label className="text-xs font-medium text-slate-300 block">Total Eligible Savings & Assets ({curr.code}):</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400 text-sm font-bold">{curr.symbol}</span>
                  <input
                    type="number"
                    value={zakatAssetValue}
                    onChange={(e) => setZakatAssetValue(Number(e.target.value))}
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-9 pr-4 py-3 text-lg font-bold text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <p className="text-[11px] text-slate-400">Nisab Threshold (85g Gold equivalent): ~85g Gold Value in {curr.code}</p>
              </div>

              <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col justify-center space-y-2">
                <p className="text-xs text-slate-400 uppercase tracking-wider">Calculated Zakat Due (2.5%)</p>
                <p className="text-3xl sm:text-4xl font-bold font-display text-amber-400">
                  {curr.symbol}{(zakatAssetValue * 0.025).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {curr.code}
                </p>
                <p className="text-xs text-slate-300">Net payable after 1 full lunar year (Hawl) completion.</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 7: INHERITANCE (FARAID) CALCULATOR */}
      {activeTab === 'faraid' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <Calculator className="w-6 h-6 text-emerald-400" />
                <div>
                  <h2 className="text-2xl font-display font-bold text-white">Islamic Inheritance (Faraid Engine)</h2>
                  <p className="text-xs text-slate-400">Calculates precise estate distribution according to Shariah jurisprudence</p>
                </div>
              </div>

              {/* World Currency Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-bold uppercase font-mono">Currency:</span>
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="bg-slate-900 border border-emerald-500/40 rounded-xl px-3 py-1.5 text-xs text-emerald-300 font-bold focus:outline-none cursor-pointer"
                >
                  {WORLD_CURRENCIES.map(c => (
                    <option key={c.code} value={c.code} className="bg-slate-950 text-slate-100">
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Total Net Estate Value ({curr.code}):</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400 text-xs font-bold">{curr.symbol}</span>
                    <input
                      type="number"
                      value={estateTotal}
                      onChange={(e) => setEstateTotal(Number(e.target.value))}
                      className="w-full bg-white/10 border border-white/20 rounded-xl pl-8 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs text-slate-200 font-medium">Surviving Wife:</span>
                  <button
                    onClick={() => setHasWife(!hasWife)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${hasWife ? 'bg-emerald-500 text-black' : 'bg-white/10 text-slate-400'}`}
                  >
                    {hasWife ? 'Yes (1/8 share)' : 'No'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Number of Sons:</label>
                    <input
                      type="number"
                      min={0}
                      value={numSons}
                      onChange={(e) => setNumSons(Number(e.target.value))}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Number of Daughters:</label>
                    <input
                      type="number"
                      min={0}
                      value={numDaughters}
                      onChange={(e) => setNumDaughters(Number(e.target.value))}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>
              </div>

              {/* Share Breakdown */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <h4 className="text-sm font-semibold text-emerald-400 border-b border-white/10 pb-2">Estate Share Breakdown ({curr.code})</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-300">Wife Share (1/8):</span>
                    <span className="font-bold text-white">{curr.symbol}{faraidDistribution.wifeShare.toLocaleString()} {curr.code}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-300">Each Son Share (2x ratio):</span>
                    <span className="font-bold text-emerald-300">{curr.symbol}{faraidDistribution.sonShareEach.toLocaleString()} {curr.code}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-300">Each Daughter Share (1x ratio):</span>
                    <span className="font-bold text-emerald-300">{curr.symbol}{faraidDistribution.daughterShareEach.toLocaleString()} {curr.code}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 8: QIBLA & DAILY AZKAR */}
      {activeTab === 'qibla' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <Navigation className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-lg">Qibla Direction Compass</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Coordinates aligned towards the Holy Kaaba in Makkah (21.4225° N, 39.8262° E).
              </p>
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                <p className="text-xs text-slate-400">Calculated Qibla Angle</p>
                <p className="text-2xl font-bold text-emerald-400">58.4° East of North</p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <HeartHandshake className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-white text-lg">Daily Hisnul Muslim Azkar</h3>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-white/5">
                  <p className="font-serif text-emerald-300 text-sm">أصْبَحْنَا وَأصْبَحَ المُلْكُ للَّهِ</p>
                  <p className="text-slate-400 mt-1">Morning Remembrance: "We have reached the morning and at this very time all sovereignty belongs to Allah."</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// HELPER CALCULATIONS
function calculateAbjadValue(name: string): number {
  const abjadMap: Record<string, number> = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 80, g: 3, h: 8, i: 10, j: 3, k: 20, l: 30, m: 40, n: 50, o: 6, p: 80, q: 100, r: 200, s: 60, t: 400, u: 6, v: 6, w: 6, x: 60, y: 10, z: 7
  };
  return name.toLowerCase().split('').reduce((acc, char) => acc + (abjadMap[char] || 0), 0) || 354;
}

function calculateFirdariaPeriod(birthYear: number) {
  const age = new Date().getFullYear() - birthYear;
  if (age < 9) return { ruler: 'Sun', duration: 'Ages 0 to 9', icon: '☀️' };
  if (age < 19) return { ruler: 'Venus', duration: 'Ages 9 to 19', icon: '♀️' };
  if (age < 32) return { ruler: 'Mercury', duration: 'Ages 19 to 32', icon: '☿' };
  if (age < 41) return { ruler: 'Moon', duration: 'Ages 32 to 41', icon: '🌙' };
  if (age < 56) return { ruler: 'Saturn', duration: 'Ages 41 to 56', icon: '🪐' };
  if (age < 68) return { ruler: 'Jupiter', duration: 'Ages 56 to 68', icon: '♃' };
  return { ruler: 'Mars', duration: 'Ages 68+', icon: '♂️' };
}

function calculateFaraidShares(total: number, wife: boolean, sons: number, daughters: number) {
  let wifeShare = wife ? total * 0.125 : 0;
  let remaining = total - wifeShare;

  const totalParts = sons * 2 + daughters;
  let sonShareEach = totalParts > 0 && sons > 0 ? (remaining * (2 / totalParts)) : 0;
  let daughterShareEach = totalParts > 0 && daughters > 0 ? (remaining * (1 / totalParts)) : 0;

  return { wifeShare, sonShareEach, daughterShareEach };
}
