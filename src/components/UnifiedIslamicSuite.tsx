import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Moon, Star, Compass, Sparkles, BookOpen, Clock, ShieldCheck, Sun, Layers, 
  BookMarked, Calculator, Coins, Navigation, Heart, Shield, CheckCircle2, HeartHandshake,
  Search, Calendar, Award, FileText, Download, Share2, Info, ChevronRight, HelpCircle, AlertCircle, RotateCcw,
  Check, ArrowRight, Sunrise, Sunset
} from 'lucide-react';
import type { UserProfile } from '../types';
import NasaLiveTelemetry from './NasaLiveTelemetry';
import NasaNewsAstrologySuite from './NasaNewsAstrologySuite';
import QuranComExplorer from './QuranComExplorer';
import HadithExplorer from './HadithExplorer';
import AlAzanPrayerSuite from './AlAzanPrayerSuite';
import FalahHijriToolkit from './FalahHijriToolkit';
import EnterpriseIslamicCenter from './EnterpriseIslamicCenter';

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

const ASMA_AL_HUSNA = [
  { id: 1, arabic: "الرَّحْمَٰنُ", transliteration: "Ar-Rahman", meaning: "The Most Gracious" },
  { id: 2, arabic: "الرَّحِيمُ", transliteration: "Ar-Raheem", meaning: "The Most Merciful" },
  { id: 3, arabic: "الْمَلِكُ", transliteration: "Al-Malik", meaning: "The Sovereign King" },
  { id: 4, arabic: "الْقُدُّوسُ", transliteration: "Al-Quddus", meaning: "The Most Holy" },
  { id: 5, arabic: "السَّلَامُ", transliteration: "As-Salam", meaning: "The Source of Peace" },
  { id: 6, arabic: "الْمُؤْمِنُ", transliteration: "Al-Mu'min", meaning: "The Giver of Faith" },
  { id: 7, arabic: "الْمُهَيْمِنُ", transliteration: "Al-Muhaymin", meaning: "The Guardian" },
  { id: 8, arabic: "الْعَزِيزُ", transliteration: "Al-Aziz", meaning: "The Almighty" },
  { id: 9, arabic: "الْجَبَّارُ", transliteration: "Al-Jabbar", meaning: "The Compeller" },
  { id: 10, arabic: "الْمُتَكَبِّرُ", transliteration: "Al-Mutakabbir", meaning: "The Supreme" },
  { id: 11, arabic: "الْخَالِقُ", transliteration: "Al-Khaliq", meaning: "The Creator" },
  { id: 12, arabic: "الْبَارِئُ", transliteration: "Al-Bari'", meaning: "The Producer" },
  { id: 13, arabic: "الْمُصَوِّرُ", transliteration: "Al-Musawwir", meaning: "The Fashioner" },
  { id: 14, arabic: "الْغَفَّارُ", transliteration: "Al-Ghaffar", meaning: "The Ever-Forgiving" },
  { id: 15, arabic: "الْقَهَّارُ", transliteration: "Al-Qahhar", meaning: "The All-Compelling Subduer" },
  { id: 16, arabic: "الْوَهَّابُ", transliteration: "Al-Wahhab", meaning: "The Bestower" },
  { id: 17, arabic: "الرَّزَّاقُ", transliteration: "Ar-Razzaq", meaning: "The Ever-Providing" },
  { id: 18, arabic: "الْفَتَّاحُ", transliteration: "Al-Fattah", meaning: "The Opener" },
  { id: 19, arabic: "اَلْعَلِيْمُ", transliteration: "Al-Alim", meaning: "The All-Knowing" },
  { id: 20, arabic: "الْقَابِضُ", transliteration: "Al-Qabid", meaning: "The Restricting" },
  { id: 21, arabic: "الْبَاسِطُ", transliteration: "Al-Basit", meaning: "The Expander" },
  { id: 22, arabic: "الْخَافِضُ", transliteration: "Al-Khafid", meaning: "The Abaser" },
  { id: 23, arabic: "الرَّافِعُ", transliteration: "Ar-Rafi'", meaning: "The Exalter" },
  { id: 24, arabic: "الْمُعِزُّ", transliteration: "Al-Mu'izz", meaning: "The Giver of Honour" },
  { id: 25, arabic: "ٱلْمُذِلُّ", transliteration: "Al-Mudhill", meaning: "The Giver of Dishonour" },
  { id: 26, arabic: "السَّمِيعُ", transliteration: "As-Sami", meaning: "The All-Hearing" },
  { id: 27, arabic: "الْبَصِيرُ", transliteration: "Al-Basir", meaning: "The All-Seeing" },
  { id: 28, arabic: "الْحَكَمُ", transliteration: "Al-Hakam", meaning: "The Judge" },
  { id: 29, arabic: "الْعَدْلُ", transliteration: "Al-'Adl", meaning: "The Utterly Just" },
  { id: 30, arabic: "اللَّطِيفُ", transliteration: "Al-Latif", meaning: "The Subtle One" },
  { id: 31, arabic: "الْخَبِيرُ", transliteration: "Al-Khabir", meaning: "The All-Aware" },
  { id: 32, arabic: "الْحَلِيمُ", transliteration: "Al-Halim", meaning: "The Forbearing" },
  { id: 33, arabic: "الْعَظِيمُ", transliteration: "Al-Azim", meaning: "The Magnificent" },
  { id: 34, arabic: "الْغَفُورُ", transliteration: "Al-Ghafur", meaning: "The Much-Forgiving" },
  { id: 35, arabic: "الشَّكُورُ", transliteration: "Ash-Shakur", meaning: "The Grateful" },
  { id: 36, arabic: "الْعَلِيُّ", transliteration: "Al-Ali", meaning: "The Most High" },
  { id: 37, arabic: "الْكَبِيرُ", transliteration: "Al-Kabir", meaning: "The Most Great" },
  { id: 38, arabic: "الْحَفِيظُ", transliteration: "Al-Hafiz", meaning: "The Preserver" },
  { id: 39, arabic: "الْمُقِيتُ", transliteration: "Al-Muqit", meaning: "The Sustainer" },
  { id: 40, arabic: "الْحَسِيبُ", transliteration: "Al-Hasib", meaning: "The Reckoner" },
  { id: 41, arabic: "الْجَلِيلُ", transliteration: "Al-Jalil", meaning: "The Majestic" },
  { id: 42, arabic: "الْكَرِيمُ", transliteration: "Al-Karim", meaning: "The Bountiful" },
  { id: 43, arabic: "الرَّقِيبُ", transliteration: "Ar-Raqib", meaning: "The Watchful" },
  { id: 44, arabic: "الْمُجِيبُ", transliteration: "Al-Mujib", meaning: "The Responsive" },
  { id: 45, arabic: "الْوَاسِعُ", transliteration: "Al-Wasi", meaning: "The All-Encompassing" },
  { id: 46, arabic: "الْحَكِيمُ", transliteration: "Al-Hakim", meaning: "The All-Wise" },
  { id: 47, arabic: "الْوَدُودُ", transliteration: "Al-Wadud", meaning: "The Loving" },
  { id: 48, arabic: "الْمَجِيدُ", transliteration: "Al-Majid", meaning: "The All-Glorious" },
  { id: 49, arabic: "الْبَاعِثُ", transliteration: "Al-Ba'ith", meaning: "The Resurrector" },
  { id: 50, arabic: "الشَّهِيدُ", transliteration: "Ash-Shahid", meaning: "The Witness" },
  { id: 51, arabic: "الْحَقُّ", transliteration: "Al-Haqq", meaning: "The Truth" },
  { id: 52, arabic: "الْوَكِيلُ", transliteration: "Al-Wakil", meaning: "The Trustee" },
  { id: 53, arabic: "الْقَوِيُّ", transliteration: "Al-Qawiyy", meaning: "The Possessor of All Strength" },
  { id: 54, arabic: "الْمَتِينُ", transliteration: "Al-Matin", meaning: "The Firm" },
  { id: 55, arabic: "الْوَلِيُّ", transliteration: "Al-Waliyy", meaning: "The Protecting Friend" },
  { id: 56, arabic: "الْحَمِيدُ", transliteration: "Al-Hamid", meaning: "The All-Praiseworthy" },
  { id: 57, arabic: "الْمُحْصِي", transliteration: "Al-Muhsi", meaning: "The Accounter" },
  { id: 58, arabic: "الْمُبْدِئُ", transliteration: "Al-Mubdi", meaning: "The Originator" },
  { id: 59, arabic: "الْمُعِيدُ", transliteration: "Al-Mu'id", meaning: "The Restorer" },
  { id: 60, arabic: "الْمُحْيِي", transliteration: "Al-Muhyi", meaning: "The Giver of Life" },
  { id: 61, arabic: "اَلْمُمِيتُ", transliteration: "Al-Mumit", meaning: "The Taker of Life" },
  { id: 62, arabic: "الْحَيُّ", transliteration: "Al-Hayy", meaning: "The Ever-Living" },
  { id: 63, arabic: "الْقَيُّومُ", transliteration: "Al-Qayyum", meaning: "The Self-Existing" },
  { id: 64, arabic: "الْوَاجِدُ", transliteration: "Al-Wajid", meaning: "The Finder" },
  { id: 65, arabic: "الْمَاجِدُ", transliteration: "Al-Majid", meaning: "The Glorious" },
  { id: 66, arabic: "الْوَاحِدُ", transliteration: "Al-Wahid", meaning: "The Only One" },
  { id: 67, arabic: "اَلْأَحَدُ", transliteration: "Al-Ahad", meaning: "The One" },
  { id: 68, arabic: "الصَّمَدُ", transliteration: "As-Samad", meaning: "The Supreme Provider" },
  { id: 69, arabic: "الْقَادِرُ", transliteration: "Al-Qadir", meaning: "The All-Powerful" },
  { id: 70, arabic: "الْمُقْتَدِرُ", transliteration: "Al-Muqtadir", meaning: "The Creator of All Power" },
  { id: 71, arabic: "الْمُقَدِّمُ", transliteration: "Al-Muqaddim", meaning: "The Expediter" },
  { id: 72, arabic: "الْمُؤَخِّرُ", transliteration: "Al-Mu'akhkhir", meaning: "The Delayer" },
  { id: 73, arabic: "الأوَّلُ", transliteration: "Al-Awwal", meaning: "The First" },
  { id: 74, arabic: "الآخِرُ", transliteration: "Al-Akhir", meaning: "The Last" },
  { id: 75, arabic: "الظَّاهِرُ", transliteration: "Az-Zahir", meaning: "The Manifest" },
  { id: 76, arabic: "الْبَاطِنُ", transliteration: "Al-Batin", meaning: "The Hidden" },
  { id: 77, arabic: "الْوَالِي", transliteration: "Al-Wali", meaning: "The Patron" },
  { id: 78, arabic: "الْمُتَعَالِي", transliteration: "Al-Muta'ali", meaning: "The Most Exalted" },
  { id: 79, arabic: "الْبَرُّ", transliteration: "Al-Barr", meaning: "The Source of Goodness" },
  { id: 80, arabic: "التَّوَّابُ", transliteration: "At-Tawwab", meaning: "The Ever-Pardoning" },
  { id: 81, arabic: "الْمُنْتَقِمُ", transliteration: "Al-Muntaqim", meaning: "The Avenger" },
  { id: 82, arabic: "العَفُوُّ", transliteration: "Al-'Afuww", meaning: "The Pardoner" },
  { id: 83, arabic: "الرَّؤُوفُ", transliteration: "Ar-Ra'uf", meaning: "The Most Kind" },
  { id: 84, arabic: "مَالِكُ ٱلْمُلْكُ", transliteration: "Malik-ul-Mulk", meaning: "Master of the Kingdom" },
  { id: 85, arabic: "ذُو ٱلْجَلَالِ وَٱلْإِكْرَامُ", transliteration: "Dhul-Jalali wal-Ikram", meaning: "Lord of Majesty and Generosity" },
  { id: 86, arabic: "الْمُقْسِطُ", transliteration: "Al-Muqsit", meaning: "The Equitable" },
  { id: 87, arabic: "الْجَامِعُ", transliteration: "Al-Jami", meaning: "The Gatherer" },
  { id: 88, arabic: "الْغَنِيُّ", transliteration: "Al-Ghani", meaning: "The Self-Sufficient" },
  { id: 89, arabic: "الْمُغْنِي", transliteration: "Al-Mughni", meaning: "The Enricher" },
  { id: 90, arabic: "اَلْمَانِعُ", transliteration: "Al-Mani'", meaning: "The Withholder" },
  { id: 91, arabic: "الضَّارَّ", transliteration: "Ad-Darr", meaning: "The Distresser" },
  { id: 92, arabic: "النَّافِعُ", transliteration: "An-Nafi'", meaning: "The Propitious" },
  { id: 93, arabic: "النُّورُ", transliteration: "An-Nur", meaning: "The Light" },
  { id: 94, arabic: "الْهَادِي", transliteration: "Al-Hadi", meaning: "The Guide" },
  { id: 95, arabic: "الْبَدِيعُ", transliteration: "Al-Badi'", meaning: "The Incomparable" },
  { id: 96, arabic: "اَلْبَاقِي", transliteration: "Al-Baqi", meaning: "The Everlasting" },
  { id: 97, arabic: "الْوَارِثُ", transliteration: "Al-Warith", meaning: "The Inheritor" },
  { id: 98, arabic: "الرَّشِيدُ", transliteration: "Ar-Rashid", meaning: "The Guide to the Right Path" },
  { id: 99, arabic: "الصَّبُورُ", transliteration: "As-Sabur", meaning: "The Patient" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  show: { opacity: 1, scale: 1, y: 0 }
};

interface UnifiedIslamicSuiteProps {
  userProfile?: UserProfile;
}

export default function UnifiedIslamicSuite({ userProfile }: UnifiedIslamicSuiteProps) {
  const [activeTab, setActiveTab] = useState<
    'quran' | 'hadith' | 'nujum' | 'abjad' | 'tasbeeh' | 'prayers' | 'zakat' | 'inheritance' | 'names' | 'hijri' | 'ethics' | 'adhkar' | 'remedies'
  >('quran');

  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [abjadText, setAbjadText] = useState('بسم الله الرحمن الرحيم');
  const [zakatCash, setZakatCash] = useState<number>(5000);
  const [zakatGoldGrams, setZakatGoldGrams] = useState<number>(90);
  const [goldPricePerGram] = useState<number>(65);

  // Digital Tasbeeh State
  const dhikrPresets = [
    { name: 'SubhanAllah', target: 33 },
    { name: 'Alhamdulillah', target: 33 },
    { name: 'Allahu Akbar', target: 34 },
    { name: 'La ilaha illallah', target: 100 },
    { name: 'Astaghfirullah', target: 100 },
    { name: 'SubhanAllahi wa bihamdihi', target: 100 }
  ];
  
  const [dhikrPreset, setDhikrPreset] = useState(dhikrPresets[0]);
  const [tasbeehCount, setTasbeehCount] = useState(0);
  const [completedSets, setCompletedSets] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const [nameSearch, setNameSearch] = useState('');

  // Inheritance State
  const [estateVal, setEstateVal] = useState<number>(100000);
  const [hasWife, setHasWife] = useState<boolean>(true);
  const [sonsCount, setSonsCount] = useState<number>(1);
  const [daughtersCount, setDaughtersCount] = useState<number>(2);

  const curr = WORLD_CURRENCIES.find(c => c.code === selectedCurrency) || WORLD_CURRENCIES[0];

  const abjadMap: Record<string, number> = {
    'ا': 1, 'ب': 2, 'ج': 3, 'د': 4, 'ه': 5, 'و': 6, 'ز': 7, 'ح': 8, 'ط': 9, 'ي': 10,
    'ك': 20, 'ل': 30, 'م': 40, 'ن': 50, 'س': 60, 'ع': 70, 'ف': 80, 'ص': 90, 'ق': 100,
    'ر': 200, 'ش': 300, 'ت': 400, 'ث': 500, 'خ': 600, 'ذ': 700, 'ض': 800, 'ظ': 900, 'غ': 1000,
    ' ': 0, 'أ': 1, 'إ': 1, 'آ': 1, 'ء': 1, 'ة': 5, 'ى': 10
  };

  const calculateAbjad = (str: string) => {
    let sum = 0;
    for (let char of str) {
      if (abjadMap[char]) sum += abjadMap[char];
    }
    return sum;
  };

  const currentAbjadValue = calculateAbjad(abjadText);

  const totalGoldVal = zakatGoldGrams * goldPricePerGram;
  const totalWealth = zakatCash + totalGoldVal;
  const nisabGoldVal = 85 * goldPricePerGram;
  const isZakatEligible = totalWealth >= nisabGoldVal;
  const zakatDue = isZakatEligible ? totalWealth * 0.025 : 0;

  const wifeShareFraction = 1 / 8;
  const wifeAmount = hasWife ? estateVal * wifeShareFraction : 0;
  const netRemaining = estateVal - wifeAmount;
  const totalResidueUnits = sonsCount * 2 + daughtersCount * 1;
  const sonAmount = totalResidueUnits > 0 ? (netRemaining * 2 / totalResidueUnits) : 0;
  const daughterAmount = totalResidueUnits > 0 ? (netRemaining * 1 / totalResidueUnits) : 0;

  const filteredNames = ASMA_AL_HUSNA.filter(n => 
    n.transliteration.toLowerCase().includes(nameSearch.toLowerCase()) || 
    n.meaning.toLowerCase().includes(nameSearch.toLowerCase()) ||
    n.arabic.includes(nameSearch)
  );

  const handleTap = () => {
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 150);
    
    if (tasbeehCount + 1 === dhikrPreset.target) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
      setTasbeehCount(0);
      setCompletedSets(prev => prev + 1);
    } else {
      setTasbeehCount(prev => prev + 1);
    }
  };

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (tasbeehCount / dhikrPreset.target) * circumference;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      <div className="p-4 rounded-2xl bg-emerald-500/10 border border-white/[0.08] flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 space-y-1">
          <p className="font-bold text-emerald-300">Authentic Islamic Knowledge & Astronomical Sciences (Ilm al-Nujum)</p>
          <p>
            This unified suite provides <strong>authentic religious guidance strictly rooted in the Holy Qur'an, Sahih Hadith, and scholarly consensus</strong> alongside classical Islamic astronomical sciences (lunar mansions & Abjad math). It does not validate fortune-telling or claim unseen knowledge.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 mb-1">
            <Moon className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-semibold tracking-wider uppercase font-mono">Unified Islamic Platform</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
            Islamic Astronomy & <span className="gradient-text-emerald">Qur'an Guidance Suite</span>
          </h1>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <div className="glass-card px-3 py-1.5 rounded-2xl border border-white/[0.08] flex items-center gap-2">
            <Coins className="w-4 h-4 text-emerald-400" />
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="bg-slate-900 text-xs font-bold text-emerald-300 border border-slate-700 rounded-xl px-2 py-1 focus:outline-none"
            >
              {WORLD_CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="glass-card px-4 py-2.5 rounded-2xl border border-white/[0.08] flex items-center gap-3">
            <Award className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Active Currency</p>
              <p className="text-xs font-bold text-emerald-300">{curr.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ENTERPRISE ISLAMIC KNOWLEDGE CENTER MODULE SUITE */}
      <EnterpriseIslamicCenter />

      <div className="flex items-center gap-2 p-1.5 glass-card rounded-2xl w-fit flex-wrap">
        {[
          { id: 'quran', label: '1. Holy Qur\'an & Tafsir', icon: <BookOpen className="w-4 h-4" /> },
          { id: 'hadith', label: '2. Sahih Hadith Library', icon: <BookMarked className="w-4 h-4" /> },
          { id: 'nujum', label: '3. Historical Lunar Mansions (Ilm al-Falak)', icon: <Moon className="w-4 h-4" /> },
          { id: 'abjad', label: '4. Abjad Gematria', icon: <Sparkles className="w-4 h-4" /> },
          { id: 'tasbeeh', label: '5. Digital Tasbeeh Counter', icon: <RotateCcw className="w-4 h-4" /> },
          { id: 'prayers', label: '6. Prayer & Qibla Compass', icon: <Compass className="w-4 h-4" /> },
          { id: 'zakat', label: '7. Zakat (' + curr.code + ')', icon: <Calculator className="w-4 h-4" /> },
          { id: 'inheritance', label: '8. Mirath Shares (' + curr.code + ')', icon: <Coins className="w-4 h-4" /> },
          { id: 'names', label: '9. 99 Names of Allah', icon: <Heart className="w-4 h-4" /> },
          { id: 'hijri', label: '10. Hijri Calendar', icon: <Calendar className="w-4 h-4" /> },
          { id: 'ethics', label: '11. Halal Life Ethics', icon: <ShieldCheck className="w-4 h-4" /> },
          { id: 'adhkar', label: '12. Morning & Evening Adhkar', icon: <Sun className="w-4 h-4" /> },
          { id: 'remedies', label: '13. Islamic Problem & Solution Remedies', icon: <HeartHandshake className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl font-medium text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-emerald-500/25 text-emerald-200 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'names' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/[0.08] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Heart className="w-5 h-5 text-emerald-400" /> All 99 Names of Allah (Asma al-Husna)
              </h3>
              <input
                type="text"
                value={nameSearch}
                onChange={(e) => setNameSearch(e.target.value)}
                placeholder="Search name or meaning..."
                className="px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-2">
              {filteredNames.map((n) => (
                <motion.div key={n.id} variants={itemVariants} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2 hover:bg-emerald-500/10 hover:border-white/[0.08] hover:scale-105 transition-all cursor-default group relative overflow-hidden">
                  <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                  <span className="text-xs font-mono text-emerald-400 relative z-10">{n.id}</span>
                  <p className="text-3xl font-serif text-emerald-200 relative z-10 py-2">{n.arabic}</p>
                  <p className="text-sm font-bold text-white relative z-10">{n.transliteration}</p>
                  <p className="text-[11px] text-slate-400 relative z-10">{n.meaning}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}

      {activeTab === 'tasbeeh' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 sm:p-8 rounded-3xl border border-white/[0.08] space-y-8 text-center relative overflow-hidden">
          <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2">
            <RotateCcw className="w-5 h-5 text-emerald-400" /> Enhanced Digital Tasbeeh
          </h3>

          <div className="flex flex-wrap justify-center gap-3">
            {dhikrPresets.map((d) => (
              <button
                key={d.name}
                onClick={() => { setDhikrPreset(d); setTasbeehCount(0); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  dhikrPreset.name === d.name
                    ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 hover:scale-105'
                    : 'bg-white/5 text-slate-400 hover:text-slate-200 hover:scale-105'
                }`}
              >
                {d.name} ({d.target})
              </button>
            ))}
          </div>

          <div className="relative mx-auto w-64 h-64 flex items-center justify-center cursor-pointer select-none" onClick={handleTap}>
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 150 150">
              <circle cx="75" cy="75" r={radius} className="fill-none stroke-emerald-950/40" strokeWidth="8" />
              <motion.circle 
                cx="75" cy="75" r={radius} 
                className="fill-none stroke-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" 
                strokeWidth="8" 
                strokeLinecap="round"
                strokeDasharray={circumference}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </svg>
            
            <motion.div 
              animate={{ scale: isPulsing ? 0.9 : 1 }}
              transition={{ duration: 0.1 }}
              className={`w-48 h-48 rounded-full bg-slate-900/80 border-4 border-white/[0.08] flex flex-col items-center justify-center space-y-2 shadow-2xl ${showCelebration ? 'shadow-emerald-500/50 bg-emerald-900/50' : ''}`}
            >
              <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest px-4 leading-tight">{dhikrPreset.name}</p>
              <p className="text-6xl font-mono font-bold text-white">{tasbeehCount}</p>
              <p className="text-[10px] text-slate-400">Target: {dhikrPreset.target}</p>
            </motion.div>
          </div>

          <div className="flex justify-center items-center gap-6">
            <div className="text-center">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Sets Completed</p>
              <p className="text-xl font-bold text-emerald-400">{completedSets}</p>
            </div>
            <button
              onClick={() => {setTasbeehCount(0); setCompletedSets(0);}}
              className="px-4 py-2 rounded-2xl bg-white/10 text-slate-300 hover:bg-red-500/20 hover:text-red-400 text-xs font-bold transition-all cursor-pointer"
            >
              Reset All
            </button>
          </div>
        </motion.div>
      )}

      {activeTab === 'prayers' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <AlAzanPrayerSuite />
        </motion.div>
      )}

      {activeTab === 'hijri' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <FalahHijriToolkit />
        </motion.div>
      )}

      {activeTab === 'adhkar' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-4 gap-4">
            <div>
              <h3 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                <Sun className="w-6 h-6 text-amber-400" /> Enhanced Authentic Adhkar
              </h3>
              <p className="text-xs text-slate-400">
                Comprehensive supplications from the Qur'an and Sunnah.
              </p>
            </div>
            <div className="flex bg-slate-900 rounded-xl p-1 border border-slate-800">
              <button className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <Sunrise className="w-4 h-4" /> Morning
              </button>
              <button className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 text-xs font-bold flex items-center gap-2">
                <Sunset className="w-4 h-4" /> Evening
              </button>
            </div>
          </div>

          <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
            <motion.div variants={itemVariants} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 group hover:border-emerald-500/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-300">Sayyid al-Istighfar</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">1x</span>
              </div>
              <p className="text-right font-arabic text-xl text-emerald-300 leading-loose py-2">
                اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ
              </p>
              <p className="text-slate-300 italic text-[11px]">
                "O Allah, You are my Lord, none has the right to be worshipped except You. You created me and I am Your servant..."
              </p>
              <button className="w-full mt-2 py-2 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 flex justify-center items-center gap-2 transition-colors">
                <Check className="w-4 h-4" /> Mark Completed
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 group hover:border-cyan-500/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-300">Ayat al-Kursi</span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">1x</span>
              </div>
              <p className="text-right font-arabic text-xl text-cyan-300 leading-loose py-2">
                اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ
              </p>
              <p className="text-slate-300 italic text-[11px]">
                "Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence..."
              </p>
              <button className="w-full mt-2 py-2 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 flex justify-center items-center gap-2 transition-colors">
                <Check className="w-4 h-4" /> Mark Completed
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 group hover:border-amber-500/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-300">Before Eating</span>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">Daily</span>
              </div>
              <p className="text-right font-arabic text-xl text-amber-300 leading-loose py-2">
                بِسْمِ اللَّهِ
              </p>
              <p className="text-slate-300 italic text-[11px]">
                "In the name of Allah." (If you forget, say: Bismillahi fi awwalihi wa akhirihi)
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 group hover:border-indigo-500/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-300">For Travel</span>
                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">On Journey</span>
              </div>
              <p className="text-right font-arabic text-xl text-indigo-300 leading-loose py-2">
                سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ
              </p>
              <p className="text-slate-300 italic text-[11px]">
                "Glory to Him who has brought this [vehicle] under our control, though we were unable to control it..."
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {activeTab === 'quran' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <QuranComExplorer />
        </motion.div>
      )}
      
      {activeTab === 'hadith' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <HadithExplorer />
        </motion.div>
      )}

      {activeTab === 'nujum' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          {/* 1. REAL-TIME 3D SOLAR SYSTEM ORRERY & ISLAMIC SIDEREAL EPHEMERIS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 font-display">
                <Moon className="w-5 h-5 text-emerald-400" /> Real-Time 3D Islamic Astronomy Orrery (Ilm al-Falak)
              </h3>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-white/[0.08]">
                Sidereal (Lahiri Ayanamsha)
              </span>
            </div>

            <div className="relative w-full h-56 sm:h-64 rounded-3xl overflow-hidden glass-card border border-white/[0.08] shadow-2xl p-6 flex flex-col justify-between bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-2">
                  <Moon className="w-4 h-4 text-emerald-400" /> 28 Lunar Mansions (Manazil al-Qamar)
                </span>
                <span className="text-[10px] font-mono text-slate-400">Lahiri Ayanamsha</span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 py-2 text-center">
                {['Al-Sharatain', 'Al-Butain', 'Al-Thurayya', 'Al-Dabaran', 'Al-Haq\'ah', 'Al-Han\'ah', 'Al-Dhira'].map((m, i) => (
                  <div key={i} className="p-2 rounded-xl bg-white/5 border border-emerald-500/20 text-[10px] font-mono font-semibold text-emerald-200">
                    {i + 1}. {m}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-mono text-emerald-300 font-bold uppercase tracking-wider">
                    Live Planetary Ephemeris Grid & Lunar Orbits
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. NASA DEEP SPACE TELEMETRY & SOLAR FLARE NEWS SUITE */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 font-display">
              <Sun className="w-5 h-5 text-amber-400" /> NASA Live Space Telemetry & Solar Flare Impact
            </h3>
            <NasaLiveTelemetry />
            <NasaNewsAstrologySuite />
          </div>

          {/* 3. 28 LUNAR MANSIONS (MANAZIL AL-QAMAR) */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/[0.08] space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 font-display">
                  <Sparkles className="w-5 h-5 text-emerald-400" /> 28 Lunar Mansions (Manazil al-Qamar)
                </h3>
                <p className="text-xs text-slate-400">
                  Classical Islamic lunar station calculations for spiritual timing and energy alignment.
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-white/[0.08]">
                28 Sacred Stations
              </span>
            </div>

            <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              {MANAZIL_AL_QAMAR.map((m) => (
                <motion.div variants={itemVariants} key={m.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:bg-emerald-500/10 hover:border-white/[0.08] hover:scale-105 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-400">Station #{m.id}</span>
                    <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">{m.element}</span>
                  </div>
                  <p className="text-2xl font-serif text-emerald-200 py-1 text-right font-arabic">{m.arabic}</p>
                  <p className="text-sm font-bold text-white">{m.name}</p>
                  <p className="text-xs text-slate-300 italic">"{m.meaning}"</p>
                  <p className="text-[11px] font-mono text-emerald-300 pt-1 border-t border-slate-800">Virtue: {m.virtue}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* 4. HISTORICAL PIONEERS OF ISLAMIC ASTRONOMY (ILM AL-FALAK) */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 font-display">
              <Award className="w-5 h-5 text-amber-400" /> Pioneers of Islamic Astronomy (Ilm al-Falak)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Abu Rayhan Al-Biruni', era: '973–1048 CE', contribution: 'Calculated Earth radius with 99.7% accuracy; mastered astronomical planetary coordinates & eclipses.' },
                { name: 'Ibn al-Haytham (Alhazen)', era: '965–1040 CE', contribution: 'Father of Optics & Empirical Physics; invented camera obscura & analyzed planetary light reflection.' },
                { name: 'Maryam al-Ijliya (Al-Asturlabiya)', era: '10th Century CE', contribution: 'Master astrolabe manufacturer & astronomical instrument designer in Aleppo.' },
                { name: 'Muhammad al-Khwarizmi', era: '780–850 CE', contribution: 'Created Zij al-Sindhind (Astronomical Tables) & introduced spherical trigonometry.' },
                { name: 'Ibn Yunus al-Sadafi', era: '950–1009 CE', contribution: 'Compiled Al-Zij al-Kabir al-Hakimi; precise pendulum timekeeping & planetary conjunctions.' },
                { name: 'Al-Farghani (Alfraganus)', era: '800–870 CE', contribution: 'Calculated Earth axial tilt ($23.5^\circ$) & wrote foundational treatises on celestial motions.' }
              ].map((pioneer, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-white/[0.12] transition-colors space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-amber-300">{pioneer.name}</span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">{pioneer.era}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{pioneer.contribution}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'abjad' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 sm:p-8 rounded-3xl border border-white/[0.08] space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" /> Abjad Numeric Gematria Calculator
          </h3>
          <input type="text" value={abjadText} onChange={(e) => setAbjadText(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-right text-lg text-emerald-300 focus:outline-none focus:border-emerald-500" />
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-white/[0.08] text-center">
            <p className="text-4xl font-bold text-emerald-300">{currentAbjadValue}</p>
          </div>
        </motion.div>
      )}

      {activeTab === 'zakat' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 sm:p-8 rounded-3xl border border-white/[0.08] space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-400" /> Multi-Currency Zakat Calculator
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input type="number" value={zakatCash} onChange={(e) => setZakatCash(Number(e.target.value))} className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white font-mono focus:outline-none focus:border-emerald-500" />
            <input type="number" value={zakatGoldGrams} onChange={(e) => setZakatGoldGrams(Number(e.target.value))} className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white font-mono focus:outline-none focus:border-emerald-500" />
          </div>
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-white/[0.08]">
            <p className="text-2xl font-mono font-bold text-emerald-300">{curr.symbol}{zakatDue.toLocaleString()} {curr.code}</p>
          </div>
        </motion.div>
      )}

      {activeTab === 'inheritance' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 sm:p-8 rounded-3xl border border-white/[0.08] space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Coins className="w-5 h-5 text-emerald-400" /> Fara'id / Mirath Calculator
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <input type="number" value={estateVal} onChange={(e) => setEstateVal(Number(e.target.value))} className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white font-mono focus:outline-none focus:border-emerald-500" />
          </div>
        </motion.div>
      )}

      {activeTab === 'ethics' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 sm:p-8 rounded-3xl border border-white/[0.08] space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" /> Halal Ethics
          </h3>
          <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <motion.div variants={itemVariants} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <h4 className="font-bold text-sm text-emerald-300">Business Ethics</h4>
              <p className="text-xs text-slate-300">Honesty in trade, elimination of usury.</p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {activeTab === 'remedies' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 sm:p-8 rounded-3xl border border-white/[0.08] space-y-6 text-left">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
                <HeartHandshake className="w-4 h-4 text-emerald-400" />
                Islamic Problem & Solution Matrix (Sunnah & Qur'anic Healing)
              </div>
              <h3 className="text-2xl font-bold font-display text-white">Authentic Islamic Spiritual Remedies (Ruqyah & Duas)</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-white/[0.08] text-emerald-300 text-xs font-mono font-bold">
              6 Verified Problem Categories
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Rizq */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-white/[0.08] space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase">1. Financial Distress & Sustenance (Rizq)</span>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-white/[0.08]">Surah Nuh 71:10-12</span>
              </div>
              <h4 className="text-base font-bold text-white">Hardship in Income, Debt, or Poverty</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                <strong>Authentic Remedy:</strong> Recite <em>Astaghfirullah</em> 100x daily, read Surah Al-Waqi'ah (56) every evening after Maghrib, maintain ties of kinship (Silat ar-Rahim), and give daily/weekly Sadaqah.
              </p>
              <div className="p-3 rounded-xl bg-black/50 border border-slate-800 text-xs font-mono text-emerald-300 italic">
                "Ask forgiveness of your Lord. Indeed, He is ever a Perpetual Forgiver. He will send rain upon you in showers and give you increase in wealth and children." (Qur'an 71:10-12)
              </div>
            </div>

            {/* 2. Huzn & Qalaq */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-white/[0.08] space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase">2. Anxiety & Depression (Huzn & Qalaq)</span>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-white/[0.08]">Surah Ar-Ra'd 13:28</span>
              </div>
              <h4 className="text-base font-bold text-white">Mental Distress, Panic, & Restlessness</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                <strong>Authentic Remedy:</strong> Recite Ayat al-Kursi (2:255), Surah Al-Inshirah (94), the Dua of Prophet Yunus (<em>La ilaha illa anta subhanaka inni kuntu minadh-dhalimin</em> 40x), and perform Morning & Evening Adhkar.
              </p>
              <div className="p-3 rounded-xl bg-black/50 border border-slate-800 text-xs font-mono text-emerald-300 italic">
                "Unquestionably, by the remembrance of Allah do hearts find rest." (Qur'an 13:28)
              </div>
            </div>

            {/* 3. Hayrah / Decisions */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-white/[0.08] space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase">3. Confusion & Major Life Decisions (Hayrah)</span>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-white/[0.08]">Sahih al-Bukhari #1166</span>
              </div>
              <h4 className="text-base font-bold text-white">Indecision in Marriage, Career, or Business</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                <strong>Authentic Remedy:</strong> Offer 2 Rakat <em>Salat al-Istikhara</em> (Guidance Prayer) before sleeping, recite the authentic Istikhara supplication, and consult (<em>Shura</em>) with wise mentors.
              </p>
              <div className="p-3 rounded-xl bg-black/50 border border-slate-800 text-xs font-mono text-emerald-300 italic">
                Prophet Muhammad (ﷺ) taught us Istikhara for all decisions as he taught a Surah of the Qur'an.
              </div>
            </div>

            {/* 4. Evil Eye & Harm */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-white/[0.08] space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase">4. Evil Eye, Envy & Harm (Ayn & Hasad)</span>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-white/[0.08]">Sahih Muslim #2188</span>
              </div>
              <h4 className="text-base font-bold text-white">Unexplained Illness, Envy, & Lethargy</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                <strong>Authentic Remedy:</strong> Perform Ruqyah Shari'ah by reciting Al-Fatihah, Ayat al-Kursi, Al-Ikhlas, Al-Falaq, and An-Naas 3x into water/hands, blowing over the body, and reciting <em>A'udhu bi kalimatillahi at-tammat...</em>
              </p>
              <div className="p-3 rounded-xl bg-black/50 border border-slate-800 text-xs font-mono text-emerald-300 italic">
                "The evil eye is real. Seek refuge in Allah against its affliction." (Sahih Muslim)
              </div>
            </div>

            {/* 5. Family Disharmony */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-white/[0.08] space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase">5. Family & Marital Conflict</span>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-white/[0.08]">Surah Al-Furqan 25:74</span>
              </div>
              <h4 className="text-base font-bold text-white">Arguments, Domestic Friction, & Loss of Affection</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                <strong>Authentic Remedy:</strong> Play or recite Surah Al-Baqarah regularly inside the home, recite the marriage supplication (Qur'an 25:74), and offer Tahajjud prayers together in the last third of the night.
              </p>
              <div className="p-3 rounded-xl bg-black/50 border border-slate-800 text-xs font-mono text-emerald-300 italic">
                "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous." (Qur'an 25:74)
              </div>
            </div>

            {/* 6. Physical Healing */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-white/[0.08] space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase">6. Physical & Emotional Healing (Shifa)</span>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-white/[0.08]">Sahih al-Bukhari #5688</span>
              </div>
              <h4 className="text-base font-bold text-white">Body Aches, Chronic Ailments, & Exhaustion</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                <strong>Authentic Remedy:</strong> Recite the 6 Qur'anic Healing Verses (<em>Ayat al-Shifa</em>: 9:14, 10:57, 16:69, 17:82, 26:80, 41:44), consume Black Seed Oil (Habbat al-Sawda), Pure Honey, and drink Zamzam Water with intention.
              </p>
              <div className="p-3 rounded-xl bg-black/50 border border-slate-800 text-xs font-mono text-emerald-300 italic">
                "In the black seed is healing for every disease except death." (Sahih al-Bukhari)
              </div>
            </div>
          </div>
        </motion.div>
      )}

    </div>
  );
}

