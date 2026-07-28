import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Shield, Sparkles, BookOpen, Sun, Moon, Flame, Compass, CheckCircle2, ArrowRight, Lightbulb, MessageCircle 
} from 'lucide-react';
import type { UserProfile } from '../types';

interface CustomRemedialMediumEngineProps {
  userProfile: UserProfile;
}

type WisdomMedium = 'islamic' | 'vedic' | 'western' | 'chinese' | 'universal';
type LifeProblemCategory = 
  | 'career' 
  | 'relationship' 
  | 'health' 
  | 'finance' 
  | 'peace' 
  | 'anxiety' 
  | 'protection' 
  | 'exams' 
  | 'marriage' 
  | 'istikhara';

interface ProblemSolutionRemedy {
  id: string;
  problem: string;
  rootCause: string;
  medium: WisdomMedium;
  arabicOrSacredText?: string;
  transliteration?: string;
  prayerOrMantra: string;
  dailyActions: string[];
  charityOrGoodDeed: string;
  bestTime: string;
  authenticReference?: string;
}

export default function CustomRemedialMediumEngine({ userProfile }: CustomRemedialMediumEngineProps) {
  const [selectedMedium, setSelectedMedium] = useState<WisdomMedium>('islamic');
  const [selectedCategory, setSelectedCategory] = useState<LifeProblemCategory>('career');

  const remediesDatabase: Record<WisdomMedium, Partial<Record<LifeProblemCategory, ProblemSolutionRemedy>>> = {
    islamic: {
      career: {
        id: 'isl-car',
        problem: 'Stagnation in career growth, employment delays, or business barrier.',
        rootCause: 'Planetary friction in 10th House of Authority combined with spiritual heedlessness (Ghaflah).',
        medium: 'islamic',
        arabicOrSacredText: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
        transliteration: 'Hasbunallahu wa ni\'mal wakeel',
        prayerOrMantra: 'Surah Al-Waqi’ah after Maghrib prayer & Ya Razzaq (308 times daily)',
        dailyActions: [
          'Perform Tahajjud (night prayer) asking for Halal sustenance.',
          'Recite "Hasbunallahu wa ni\'mal wakeel" (70 times in the morning).'
        ],
        charityOrGoodDeed: 'Give daily morning Sadaqah (secret charity) to those in need.',
        bestTime: 'Post-Fajr and Post-Maghrib hours',
        authenticReference: 'Hisnul Muslim & Surah Al-Imran 3:173'
      },
      relationship: {
        id: 'isl-rel',
        problem: 'Misunderstandings, family tension, or delay in finding a compatible life partner.',
        rootCause: 'Subconscious blockage and misalignment in Lunar Mansions (Manazil al-Qamar).',
        medium: 'islamic',
        arabicOrSacredText: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
        transliteration: 'Rabbana hab lana min azwajina wa dhurriyyatina qurrata a’yunin waj’alna lil-muttaqina imama',
        prayerOrMantra: 'Surah Al-Furqan Ayah 74 (33 times after Isha)',
        dailyActions: [
          'Maintain Istighfar ("Astaghfirullah") 100 times daily.',
          'Practice emotional forgiveness toward relatives before sleeping.'
        ],
        charityOrGoodDeed: 'Feed hungry individuals or provide water to animals.',
        bestTime: 'Before bedtime and during Last Third of the Night',
        authenticReference: 'Surah Al-Furqan 25:74'
      },
      health: {
        id: 'isl-hea',
        problem: 'Unexplained illness, bodily pain, or low physical vitality.',
        rootCause: 'Energy congestion affecting spiritual heart (Qalb) and physical balance.',
        medium: 'islamic',
        arabicOrSacredText: 'اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَاسَ اشْفِ أَنْتَ الشَّافِي لاَ شِفَاءَ إِلاَّ شِفَاؤُكَ شِفَاءً لاَ يُغَادِرُ سَقَمًا',
        transliteration: 'Allahumma Rabban-nas, adhhibil-ba\'s, ishfi antash-Shafi, la shifa\'a illa shifa\'uka, shifa\'an la yughadiru saqama',
        prayerOrMantra: 'Prophetic Health Ruqyah Du’a & 3 Quls (Surah Ikhlas, Falaq, Naas)',
        dailyActions: [
          'Blow over water after recitation and drink on empty stomach.',
          'Place right hand over area of discomfort and recite Bismillah (3x) + A\'udhu billahi (7x).'
        ],
        charityOrGoodDeed: 'Help care for an elderly or sick neighbor.',
        bestTime: 'Immediately after Morning Fajr prayer',
        authenticReference: 'Sahih Al-Bukhari 5743 & Hisnul Muslim'
      },
      finance: {
        id: 'isl-fin',
        problem: 'Unexpected expenses, debt burden, or financial instability.',
        rootCause: 'Blockage in flow of Barakah (spiritual abundance).',
        medium: 'islamic',
        arabicOrSacredText: 'رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ',
        transliteration: 'Rabbi inni lima anzalta ilayya min khayrin faqeer',
        prayerOrMantra: 'Du’a of Prophet Musa & "Allahummak-fini bihalalika \'an haramik"',
        dailyActions: [
          'Purify wealth with 2.5% Zakat and voluntary Sadaqah.',
          'Maintain absolute honesty in trade and agreements.'
        ],
        charityOrGoodDeed: 'Sponsor meals for underprivileged children.',
        bestTime: 'During Friday Jumu’ah hour',
        authenticReference: 'Surah Al-Qasas 28:24 & Sunan At-Tirmidhi 3563'
      },
      peace: {
        id: 'isl-pea',
        problem: 'Restlessness, overthinking, and lack of inner stillness.',
        rootCause: 'Disconnection from daily remembrance (Dhikr).',
        medium: 'islamic',
        arabicOrSacredText: 'أَلا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
        transliteration: 'Ala bi dhikrillahi tatma’innul quloob',
        prayerOrMantra: 'Surah Ar-Ra’d Ayah 28 & Morning Morning/Evening Azkar',
        dailyActions: [
          'Perform 5 minutes of quiet heart meditation post-prayer.',
          'Disconnect from screens 30 minutes before sleep.'
        ],
        charityOrGoodDeed: 'Plant a tree or water local greenery.',
        bestTime: 'Sunset Maghrib transition',
        authenticReference: 'Surah Ar-Ra’d 13:28'
      },
      anxiety: {
        id: 'isl-anx',
        problem: 'Severe anxiety, panic attacks, depression, or emotional grief.',
        rootCause: 'Heavy planetary transits over 12th House / Moon placement.',
        medium: 'islamic',
        arabicOrSacredText: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَالْعَجْزِ وَالْكَسَلِ',
        transliteration: 'Allahumma inni a’udhu bika minal-hammi wal-hazan, wal-’ajzi wal-kasal',
        prayerOrMantra: 'Prophetic Anxiety Du’a from Hisnul Muslim',
        dailyActions: [
          'Recite this Du’a 3 times every morning and evening.',
          'Perform 2 Rakat Nafl Salatul Hajah for relief.'
        ],
        charityOrGoodDeed: 'Console someone going through hardship.',
        bestTime: 'Morning Fajr & Evening Asr hours',
        authenticReference: 'Hisnul Muslim Chapter 35 & Sahih Al-Bukhari'
      },
      protection: {
        id: 'isl-pro',
        problem: 'Protection against Evil Eye (Hasad), negative energies, or jealousy.',
        rootCause: 'External energetic impact on subtle energy body.',
        medium: 'islamic',
        arabicOrSacredText: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
        transliteration: 'A’udhu bi-kalimatillahit-tammati min sharri ma khalaq',
        prayerOrMantra: 'Morning/Evening Protection Azkar & Ayat al-Kursi',
        dailyActions: [
          'Recite 3 Quls in palm, blow into hands, and wipe over body before sleep.',
          'Recite Ayat al-Kursi after every fard prayer.'
        ],
        charityOrGoodDeed: 'Distribute food or water quietly.',
        bestTime: 'Before Sunrise & Sunset',
        authenticReference: 'Hisnul Muslim Chapter 27 & Sahih Muslim'
      },
      exams: {
        id: 'isl-exa',
        problem: 'Exam stress, memory retention difficulty, or academic blockage.',
        rootCause: 'Mercury transit friction affecting learning capacity.',
        medium: 'islamic',
        arabicOrSacredText: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي يَفْقَهُوا قَوْلِي',
        transliteration: 'Rabbi-shrah li sadri wa yassir li amri wah-lul \'uqdatam-mil-lisani yafqahu qawli',
        prayerOrMantra: 'Du’a of Prophet Musa for eloquence & "Rabbi Zidni \'Ilma"',
        dailyActions: [
          'Recite "Rabbi Zidni \'Ilma" (7 times before studying).',
          'Study during high focus morning hours post-Fajr.'
        ],
        charityOrGoodDeed: 'Share notes or tutor a fellow student.',
        bestTime: 'Post-Fajr study hours',
        authenticReference: 'Surah Taha 20:25-28 & Surah Taha 20:114'
      },
      marriage: {
        id: 'isl-mar',
        problem: 'Delays in finding a pious spouse or pre-marriage clarity.',
        rootCause: '7th House obstacles & timing alignment in Lunar Mansions.',
        medium: 'islamic',
        arabicOrSacredText: 'رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ',
        transliteration: 'Rabbi inni lima anzalta ilayya min khayrin faqeer',
        prayerOrMantra: 'Du’a of Prophet Musa & Istighfar (100x daily)',
        dailyActions: [
          'Recite "Astaghfirullah" abundantly throughout the day.',
          'Perform Tahajjud prayer asking for a compatible spouse.'
        ],
        charityOrGoodDeed: 'Help support a marriage ceremony for someone in need.',
        bestTime: 'Last third of the night (Tahajjud)',
        authenticReference: 'Surah Al-Qasas 28:24 & Hisnul Muslim'
      },
      istikhara: {
        id: 'isl-ist',
        problem: 'Indecision regarding major life choices (career, business, marriage).',
        rootCause: 'Ambiguity in future path requiring divine guidance.',
        medium: 'islamic',
        arabicOrSacredText: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ',
        transliteration: 'Allahumma inni astakhiruka bi-\'ilmika wa astaqdiruka bi-qudratik',
        prayerOrMantra: 'Full Prophetic Salatul Istikhara Du’a',
        dailyActions: [
          'Perform 2 Rakat non-obligatory prayer.',
          'Recite the authentic Istikhara Du’a naming your decision explicitly.'
        ],
        charityOrGoodDeed: 'Seek counsel from trustworthy elders.',
        bestTime: 'Before sleeping or post-Isha',
        authenticReference: 'Sahih Al-Bukhari 1166 & Hisnul Muslim Chapter 26'
      },
    },

    vedic: {
      career: {
        id: 'ved-car',
        problem: 'Obstacles in promotion, delayed recognition, or authority conflict.',
        rootCause: 'Afflicted Saturn or Sun in 10th House of Karma.',
        medium: 'vedic',
        prayerOrMantra: 'Aditya Hrudayam Stotram & Gayatri Mantra (108 times at sunrise)',
        dailyActions: [
          'Offer Surya Arghya (water offering to Sun god) at sunrise.',
          'Maintain disciplined routine and honor mentors.'
        ],
        charityOrGoodDeed: 'Donate black sesame or wheat on Saturdays.',
        bestTime: 'Sunrise Hour (Brahma Muhurta)',
      },
      relationship: {
        id: 'ved-rel',
        problem: 'Marital friction or delay in marriage compatibility.',
        rootCause: 'Venus or Rahu/Ketu axis impact on 7th House.',
        medium: 'vedic',
        prayerOrMantra: 'Om Katyayani Mahamaye Mahayoginyadheeshwari',
        dailyActions: [
          'Light a ghee lamp in front of altar every evening.',
          'Practice compassionate speech and self-reflection.'
        ],
        charityOrGoodDeed: 'Feed white cows or donate sweets to young girls on Fridays.',
        bestTime: 'Friday evenings',
      },
      health: {
        id: 'ved-hea',
        problem: 'Low immunity, digestive imbalance, or lethargy.',
        rootCause: 'Weak Sun or afflicted Lagna lord.',
        medium: 'vedic',
        prayerOrMantra: 'Mahamrityunjaya Mantra (108 times daily)',
        dailyActions: [
          'Practice 15 minutes of Pranayama (breath control).',
          'Sip warm water with turmeric in the morning.'
        ],
        charityOrGoodDeed: 'Donate green vegetables to animal shelters.',
        bestTime: 'Early morning after bath',
      },
      finance: {
        id: 'ved-fin',
        problem: 'Fluctuating income or wealth retention difficulty.',
        rootCause: '2nd/11th House financial planetary affliction.',
        medium: 'vedic',
        prayerOrMantra: 'Kanakadhara Stotram & Sri Suktam',
        dailyActions: [
          'Keep your cash vault clean and oriented North.',
          'Chant "Om Shreem Hreem Shreem Mahalakshmyei Namah".'
        ],
        charityOrGoodDeed: 'Provide food for temple community kitchens.',
        bestTime: 'Friday morning during Hora of Venus',
      },
      peace: {
        id: 'ved-pea',
        problem: 'Anxiety, emotional turbulence, or sleep disturbance.',
        rootCause: 'Afflicted Moon (Chandra) in natal chart.',
        medium: 'vedic',
        prayerOrMantra: 'Om Som Somaya Namah (108 times)',
        dailyActions: [
          'Drink water stored in a silver vessel.',
          'Practice 10 minutes of evening silent meditation.'
        ],
        charityOrGoodDeed: 'Donate milk or white rice on Mondays.',
        bestTime: 'Monday evening',
      },
    },

    western: {
      career: {
        id: 'wes-car',
        problem: 'Lack of direction, vocational burnout, or creative block.',
        rootCause: 'Saturn Square Sun transit or Midheaven blockage.',
        medium: 'western',
        prayerOrMantra: 'Affirmation: "I am fully aligned with my authentic purpose and creative authority."',
        dailyActions: [
          'Set 3 major priority goals at the start of each morning.',
          'Audit energy drains and eliminate non-essential tasks.'
        ],
        charityOrGoodDeed: 'Volunteer skills for local community mentoring.',
        bestTime: 'Solar Midday (12:00 PM)',
      },
      relationship: {
        id: 'wes-rel',
        problem: 'Boundary issues or recurring relationship patterns.',
        rootCause: 'Venus opposite Pluto or 7th House transit tension.',
        medium: 'western',
        prayerOrMantra: 'Affirmation: "I welcome healthy, balanced, and loving connections in truth."',
        dailyActions: [
          'Journal daily emotional triggers and practice active listening.',
          'Communicate open boundaries without anger.'
        ],
        charityOrGoodDeed: 'Support relationship wellness community causes.',
        bestTime: 'Sunset hour',
      },
      health: {
        id: 'wes-hea',
        problem: 'Stress exhaustion and bodily tension.',
        rootCause: 'Mars in detriment or 6th House transit workload.',
        medium: 'western',
        prayerOrMantra: 'Affirmation: "My body is a resilient sanctuary of vitality and balance."',
        dailyActions: [
          'Engage in 20 minutes of daily grounding nature walks.',
          'Prioritize 8 hours of restorative sleep.'
        ],
        charityOrGoodDeed: 'Support local organic food banks.',
        bestTime: 'Early morning',
      },
      finance: {
        id: 'wes-fin',
        problem: 'Financial insecurity or money management stress.',
        rootCause: '2nd House Taurus/Scorpio axis planetary transit.',
        medium: 'western',
        prayerOrMantra: 'Affirmation: "Abundance flows naturally into my life through disciplined action."',
        dailyActions: [
          'Review budget weekly and automate long-term savings.',
          'Invest in skill building.'
        ],
        charityOrGoodDeed: 'Support ethical financial literacy initiatives.',
        bestTime: 'New Moon phase',
      },
      peace: {
        id: 'wes-pea',
        problem: 'Information overload and mental fatigue.',
        rootCause: 'Mercury Retrograde or Neptune square 1st house.',
        medium: 'western',
        prayerOrMantra: 'Affirmation: "I release noise and anchor into deep inner stillness."',
        dailyActions: [
          'Digital detox for 1 hour every evening.',
          'Practice breathwork grounding.'
        ],
        charityOrGoodDeed: 'Donate unused books to local libraries.',
        bestTime: 'Full Moon phase',
      },
    },

    chinese: {
      career: {
        id: 'chi-car',
        problem: 'Workplace politics or lack of momentum.',
        rootCause: 'Imbalance in Wood and Fire elements in BaZi Four Pillars.',
        medium: 'chinese',
        prayerOrMantra: 'Feng Shui Mantra: "Flow with the current of nature; harmony yields power."',
        dailyActions: [
          'Place a healthy green plant in the South-East corner of your desk.',
          'Face your lucky cardinal direction during work hours.'
        ],
        charityOrGoodDeed: 'Support local environmental planting projects.',
        bestTime: 'Dragon Hour (7:00 AM - 9:00 AM)',
      },
      relationship: {
        id: 'chi-rel',
        problem: 'Domestic friction or misaligned expectations.',
        rootCause: 'Clash in Earth and Water elemental energetic pillars.',
        medium: 'chinese',
        prayerOrMantra: 'Yin-Yang Balance Affirmation: "Softness overcomes hardness; peace prevails."',
        dailyActions: [
          'Clear clutter from the South-West sector of your home.',
          'Practice peaceful speech and active compromise.'
        ],
        charityOrGoodDeed: 'Share meals with family and neighbors.',
        bestTime: 'Evening Ox Hour',
      },
      health: {
        id: 'chi-hea',
        problem: 'Stagnant Qi energy or digestive weakness.',
        rootCause: 'Overactive Metal element weakening Earth Qi.',
        medium: 'chinese',
        prayerOrMantra: 'Qi Healing Mantra: "Harmonize breath with bodily flow."',
        dailyActions: [
          'Practice 15 minutes of gentle Qigong or Tai Chi.',
          'Drink warm herbal teas.'
        ],
        charityOrGoodDeed: 'Assist community health centers.',
        bestTime: 'Morning Tiger Hour (5:00 AM - 7:00 AM)',
      },
      finance: {
        id: 'chi-fin',
        problem: 'Wealth drain or unexpected losses.',
        rootCause: 'Water element leak in wealth corner.',
        medium: 'chinese',
        prayerOrMantra: 'Wealth Alignment: "Respect the flow of Qi; abundance gathers in order."',
        dailyActions: [
          'Fix any leaking faucets in the home immediately.',
          'Keep your entrance foyer well lit.'
        ],
        charityOrGoodDeed: 'Donate money anonymously to elders.',
        bestTime: 'Midday Horse Hour (11:00 AM - 1:00 PM)',
      },
      peace: {
        id: 'chi-pea',
        problem: 'Restlessness and emotional agitation.',
        rootCause: 'Fire element excess disrupting Heart Qi.',
        medium: 'chinese',
        prayerOrMantra: 'Taoist Peace Mantra: "Empty the mind, fill the belly with calm breath."',
        dailyActions: [
          'Sip warm water and sit quietly in nature.',
          'Avoid heated arguments.'
        ],
        charityOrGoodDeed: 'Donate tea or water supplies to public shelters.',
        bestTime: 'Evening Water Hour',
      },
    },

    universal: {
      career: {
        id: 'uni-car',
        problem: 'Uncertainty about true life calling.',
        rootCause: 'Misalignment between internal values and external actions.',
        medium: 'universal',
        prayerOrMantra: 'Universal Prayer: "Guide my hands and mind toward service and authentic mastery."',
        dailyActions: [
          'Dedicate 30 minutes daily to high-impact skill building.',
          'Seek feedback from trusted mentors.'
        ],
        charityOrGoodDeed: 'Offer free mentorship to a beginner.',
        bestTime: 'Morning sunrise',
      },
      relationship: {
        id: 'uni-rel',
        problem: 'Communication breakdown or feeling unheard.',
        rootCause: 'Lack of empathetic presence.',
        medium: 'universal',
        prayerOrMantra: 'Universal Prayer: "May I listen with compassion and speak with truth."',
        dailyActions: [
          'Practice 100% focused attention during conversations.',
          'Express genuine gratitude daily.'
        ],
        charityOrGoodDeed: 'Perform a random act of kindness daily.',
        bestTime: 'Evening reflection',
      },
      health: {
        id: 'uni-hea',
        problem: 'Chronic tiredness or low motivation.',
        rootCause: 'Physical neglect and sleep disruption.',
        medium: 'universal',
        prayerOrMantra: 'Universal Prayer: "May every cell in my body be filled with light and health."',
        dailyActions: [
          'Hydrate well and move for 30 minutes.',
          'Sleep and wake at consistent hours.'
        ],
        charityOrGoodDeed: 'Support local athletic youth programs.',
        bestTime: 'Morning start',
      },
      finance: {
        id: 'uni-fin',
        problem: 'Budget anxiety and impulse spending.',
        rootCause: 'Lack of clear financial boundaries.',
        medium: 'universal',
        prayerOrMantra: 'Universal Prayer: "Grant me wisdom to steward resources with discipline and generosity."',
        dailyActions: [
          'Track every expense daily.',
          'Focus on value creation rather than quick gain.'
        ],
        charityOrGoodDeed: 'Support local small businesses.',
        bestTime: 'Weekly review',
      },
      peace: {
        id: 'uni-pea',
        problem: 'Mental noise and overthinking.',
        rootCause: 'Attaching identity to temporary external thoughts.',
        medium: 'universal',
        prayerOrMantra: 'Universal Prayer: "I am at peace with what was, what is, and what will be."',
        dailyActions: [
          '10 minutes of silent deep breathing.',
          'Express gratitude for 3 simple things daily.'
        ],
        charityOrGoodDeed: 'Help clean a local public space.',
        bestTime: 'Bedtime',
      },
    },
  };

  const activeRemedy = remediesDatabase[selectedMedium][selectedCategory];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 mb-1">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-semibold tracking-widest uppercase">Multi-Medium Remedy Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-100">
            Problem & <span className="gradient-text">Solution Remedy Engine</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Select your preferred wisdom medium (Islamic, Vedic, Western, Chinese, or Universal) to receive targeted prayers, mantras, daily actions, and charitable deeds.
          </p>
        </div>
      </div>

      {/* 1. SELECT WISDOM MEDIUM */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Step 1: Choose Your Preferred Wisdom Medium
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { id: 'islamic', name: 'Islamic (Dua/Azkar)', icon: '🌙' },
            { id: 'vedic', name: 'Vedic (Mantra/Puja)', icon: '🕉️' },
            { id: 'western', name: 'Western (Affirmations)', icon: '⭐' },
            { id: 'chinese', name: 'Chinese (Feng Shui)', icon: '☯️' },
            { id: 'universal', name: 'Universal (Mindful)', icon: '🌐' },
          ].map((med) => (
            <button
              key={med.id}
              onClick={() => setSelectedMedium(med.id as WisdomMedium)}
              className={`p-3.5 rounded-2xl text-xs font-semibold flex flex-col items-center gap-2 transition-all cursor-pointer ${
                selectedMedium === med.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/10 scale-105'
                  : 'glass-card text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="text-lg">{med.icon}</span>
              <span className="text-center">{med.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. SELECT LIFE PROBLEM AREA */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Step 2: Select Your Life Concern / Focus Area
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'career', name: '💼 Career & Profession' },
            { id: 'relationship', name: '❤️ Love & Relationships' },
            { id: 'health', name: '🌿 Health & Illness Ruqyah' },
            { id: 'finance', name: '💰 Wealth & Debt Relief' },
            { id: 'peace', name: '🧘 Inner Peace & Dhikr' },
            { id: 'anxiety', name: '🛡️ Anxiety & Depression Support' },
            { id: 'protection', name: '🧿 Protection & Evil Eye (Hasad)' },
            { id: 'exams', name: '🎓 Success in Exams & Memory' },
            { id: 'marriage', name: '💍 Marriage & Spouse Match' },
            { id: 'istikhara', name: '✨ Istikhara Decision Guidance' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as LifeProblemCategory)}
              className={`px-4 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold shadow-sm'
                  : 'glass-card text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3. DIAGNOSTIC & REMEDY DISPLAY CARD */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRemedy?.id || 'remedy-card'}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6"
        >
          {/* Diagnostic Header */}
          <div className="border-b border-slate-800 pb-5 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                {selectedMedium.toUpperCase()} MEDIUM DIAGNOSTIC
              </span>
              <span className="text-xs text-slate-400 font-mono">Best Hour: {activeRemedy?.bestTime}</span>
              {activeRemedy?.authenticReference && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  {activeRemedy.authenticReference}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-100">
              {activeRemedy?.problem}
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              <span className="text-amber-400 font-semibold">Astrological Root Cause:</span> {activeRemedy?.rootCause}
            </p>
          </div>

          {/* 4 Action Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Sacred Prayer / Mantra / Du’a */}
            <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-800/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" /> 1. Sacred Supplication / Du’a
                </div>
              </div>

              {/* Arabic Script Display if present */}
              {activeRemedy?.arabicOrSacredText && (
                <div className="p-3 rounded-xl bg-black/40 border border-amber-500/20 text-right font-serif text-xl sm:text-2xl text-amber-200 leading-loose">
                  {activeRemedy.arabicOrSacredText}
                </div>
              )}

              {/* Transliteration */}
              {activeRemedy?.transliteration && (
                <p className="text-xs text-slate-300 italic">
                  "{activeRemedy.transliteration}"
                </p>
              )}

              <p className="text-xs font-mono text-amber-100 leading-relaxed font-semibold pt-1 border-t border-amber-800/30">
                {activeRemedy?.prayerOrMantra}
              </p>
            </div>

            {/* 2. Daily Practical Actions */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" /> 2. Daily Things To Do
              </div>
              <ul className="space-y-2 text-xs text-slate-200">
                {activeRemedy?.dailyActions.map((act, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Charity & Good Deed */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                <Heart className="w-4 h-4" /> 3. Recommended Charity & Good Deed
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {activeRemedy?.charityOrGoodDeed}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
