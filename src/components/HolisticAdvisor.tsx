import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, ShieldCheck, Heart, Briefcase, DollarSign, Activity, BookOpen, Download, 
  Compass, CheckCircle2, AlertCircle, RefreshCw, Layers, Search, Sun, Moon, Zap, 
  HelpCircle, Eye, Users, GraduationCap, Anchor, ArrowRight, Check, Share2, Filter,
  Sliders, User, Shield, CheckSquare
} from 'lucide-react';
import type { UserProfile } from '../types';
import { calculatePlanetaryPositions, calculateAshtaKootaScore } from '../lib/astroCalculations';
import { exportUniversalPdf } from '../lib/pdfReportEngine';

interface HolisticAdvisorProps {
  userProfile: UserProfile;
}

export type SolutionPerspective = 'all' | 'islamic' | 'planetary' | 'psychological';

export interface ProblemDomain {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  iconName: string;
  color: string;
  badge: string;
  
  // Problem breakdown
  rootCauses: string[];
  symptoms: string[];
  
  // 4-Dimensional Multi-Perspective Solutions
  islamicRemedy: {
    title: string;
    duaArabic?: string;
    duaTranslation?: string;
    action: string;
    source: string;
  };
  planetaryRemedy: {
    planet: string;
    element: string;
    gemstone: string;
    day: string;
    action: string;
  };
  psychologicalRemedy: {
    framework: string;
    mindsetShift: string;
    exercise: string;
  };
  sevenDayPlan: string[];
}

export const LIFE_PROBLEMS: ProblemDomain[] = [
  {
    id: 'career_stagnation',
    category: 'Career & Business',
    title: 'Career Stagnation, Job Loss & Workplace Conflict',
    subtitle: 'Overcome stalled promotions, unfulfilling work, unexpected layoffs, or toxic work environments',
    iconName: 'Briefcase',
    color: 'from-amber-500 to-orange-600',
    badge: 'High Priority',
    rootCauses: [
      'Saturn transit testing professional resilience & patience',
      'Misalignment between core innate talents and current job role',
      'Unresolved interpersonal friction with supervisors or colleagues'
    ],
    symptoms: [
      'Feeling stuck despite working long hours',
      'Imposter syndrome or anxiety before meetings',
      'Fear of career change or financial disruption'
    ],
    islamicRemedy: {
      title: 'Salat al-Istikhara & Provision Dhikr (Surah Al-Waqi\'ah)',
      duaArabic: 'رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ',
      duaTranslation: '"My Lord, indeed I am, for whatever good You would send down to me, in need." (Qur\'an 28:24)',
      action: 'Recite Astaghfirullah 100x daily after Fajr for opening doors of Rizq. Perform Istikhara when considering career shifts.',
      source: 'Authentic Sunnah & Sahih Hadith on Rizq'
    },
    planetaryRemedy: {
      planet: 'Saturn (Shani) & Sun (Surya)',
      element: 'Earth & Fire',
      gemstone: 'Blue Sapphire / Yellow Sapphire',
      day: 'Saturday (Focus & Discipline) & Sunday (Leadership)',
      action: 'Perform disciplined skill audits every Saturday; practice public presentation or initiative on Sundays.'
    },
    psychologicalRemedy: {
      framework: 'Cognitive Reframing & Career Ikigai',
      mindsetShift: 'View career friction not as a wall, but as a compass signaling it is time to upgrade skills or refine position.',
      exercise: 'Draft a 3-column matrix: (1) What I Excel At, (2) Market Demand, (3) What Gives Me Energy. Focus only on the overlap.'
    },
    sevenDayPlan: [
      'Day 1: Audit top 3 career bottlenecks and write down ideal outcome without fear.',
      'Day 2: Update resume/portfolio highlighting measurable outcomes rather than duties.',
      'Day 3: Reach out to 2 trusted mentors or former colleagues for honest feedback.',
      'Day 4: Dedicate 2 hours to acquiring a key missing technical or leadership skill.',
      'Day 5: Practice boundary setting: politely decline non-essential low-impact tasks.',
      'Day 6: Recite Istikhara / reflect deeply on pros and cons of potential career moves.',
      'Day 7: Submit 2 targeted applications or launch a pilot business initiative.'
    ]
  },
  {
    id: 'financial_debt',
    category: 'Finance & Wealth',
    title: 'Financial Debt, Income Instability & Money Anxiety',
    subtitle: 'Clear financial burdens, eliminate debt stress, and build sustainable wealth habits',
    iconName: 'DollarSign',
    color: 'from-emerald-500 to-teal-600',
    badge: 'Crucial',
    rootCauses: [
      'Lack of structured cash flow tracking & emotional spending',
      'Retrograde Mercury / 2nd House afflictions causing money leaks',
      'Relying on single income streams without contingency reserves'
    ],
    symptoms: [
      'Persistent chest tightness when checking bank balances',
      'Accumulating credit card debt or loans with high interest',
      'Reluctance to invest due to fear of loss'
    ],
    islamicRemedy: {
      title: 'Du\'a for Debt Clearance & Barakah (Prophetic Remedy)',
      duaArabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ',
      duaTranslation: '"O Allah, I seek refuge in You from anxiety and grief, weakness and laziness, miserliness and cowardice, the burden of debt and the oppression of men."',
      action: 'Recite this morning & evening. Give small secret charity (Sadaqah) daily—it increases Barakah in wealth.',
      source: 'Sahih al-Bukhari 6369'
    },
    planetaryRemedy: {
      planet: 'Jupiter (Guru) & Mercury (Budh)',
      element: 'Water & Earth',
      gemstone: 'Emerald / Yellow Topaz',
      day: 'Wednesday (Accounts & Trade) & Thursday (Wealth Expansion)',
      action: 'Review balance sheet and automate 10-20% savings every Thursday morning during Jupiter Hora.'
    },
    psychologicalRemedy: {
      framework: 'Behavioral Financial Therapy & Debt Avalanche',
      mindsetShift: 'Debt is a mechanical formula, not a personal character flaw. Separate self-worth from net worth.',
      exercise: 'List all debts by interest rate. Automate minimum payments on all, and direct all extra cash to the highest interest debt.'
    },
    sevenDayPlan: [
      'Day 1: Calculate exact total debt and cash flow with zero denial.',
      'Day 2: Cut 3 non-essential recurring subscriptions or impulsive spending habits.',
      'Day 3: Call creditors to negotiate lower interest rates or payment plans.',
      'Day 4: Set up an automated separate emergency savings account.',
      'Day 5: Identify 1 freelance skill or unused item to sell for instant cash flow.',
      'Day 6: Give a small anonymous gift/charity to shift mindset from scarcity to abundance.',
      'Day 7: Establish a weekly 15-minute financial check-in ritual every Sunday.'
    ]
  },
  {
    id: 'relationship_heartbreak',
    category: 'Love & Relationships',
    title: 'Relationship Tension, Breakups & Loneliness',
    subtitle: 'Heal emotional wounds, align Venusian energy, and attract genuine soul connection',
    iconName: 'Heart',
    color: 'from-pink-500 to-rose-600',
    badge: 'Soul Healing',
    rootCauses: [
      'Venus-Ketu affliction causing detachment or repetition of toxic patterns',
      'Unresolved childhood attachment style insecurities',
      'Lack of clear boundary communication with partners'
    ],
    symptoms: [
      'Fear of abandonment or anxious attachment loops',
      'Difficulty trusting new partners after past betrayals',
      'Feeling misunderstood or unappreciated in relationships'
    ],
    islamicRemedy: {
      title: 'Du\'a of Prophet Musa for Soulmates & Mawaddah',
      duaArabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
      duaTranslation: '"Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous." (Qur\'an 25:74)',
      action: 'Recite 7x after Isha prayer. Perform Tahajjud prayer for divine emotional healing and noble spouse.',
      source: 'Qur\'an 25:74'
    },
    planetaryRemedy: {
      planet: 'Venus (Shukra) & Moon (Chandra)',
      element: 'Water & Air',
      gemstone: 'Diamond / White Sapphire / Opal',
      day: 'Friday (Love & Harmony)',
      action: 'Wear light pastel colors on Fridays; practice loving-kindness journaling during Moon hours.'
    },
    psychologicalRemedy: {
      framework: 'Attachment Theory & Emotionally Focused Healing',
      mindsetShift: 'Your current heartbreak is a sacred threshold clearing space for a higher quality, aligned partnership.',
      exercise: 'Write a letter to your ex or past self forgiving all transgressions. Do not send it—burn or delete it as a ritual of release.'
    },
    sevenDayPlan: [
      'Day 1: Unfollow or mute social triggers related to past relationships.',
      'Day 2: Write down 5 core values you require in your future partner.',
      'Day 3: Spend 1 full day practicing self-care and self-love rituals.',
      'Day 4: Engage in a group hobby or community service to broaden social horizons.',
      'Day 5: Practice vocalizing personal boundaries politely with friends or family.',
      'Day 6: Recite Quranic supplications for harmonious companionship.',
      'Day 7: Step into the world with an open, resilient, and confident heart.'
    ]
  },
  {
    id: 'health_lethargy',
    category: 'Health & Vitality',
    title: 'Chronic Fatigue, Lethargy & Mental Anxiety',
    subtitle: 'Re-energize your physical vessel, balance Ojas/Prana, and restore inner peace',
    iconName: 'Activity',
    color: 'from-purple-500 to-indigo-600',
    badge: 'Vitality Boost',
    rootCauses: [
      'Sun or Mars weakness causing low digestive fire (Agni) and stamina',
      'Disrupted circadian sleep cycles and screen overuse before bed',
      'Repressed emotions manifesting as physical aches or brain fog'
    ],
    symptoms: [
      'Waking up tired despite 8 hours of sleep',
      'Constant digestive bloating or erratic appetite',
      'Racing thoughts or panic attacks during low-energy periods'
    ],
    islamicRemedy: {
      title: 'Ruqyah & Prophetic Healing (Tibb al-Nabawi)',
      duaArabic: 'اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَاسَ اشْفِ أَنْتَ الشَّافِي لاَ شِفَاءَ إِلاَّ شِفَاؤُكَ شِفَاءً لاَ يُغَادِرُ سَقَمًا',
      duaTranslation: '"O Allah, Lord of mankind, remove the hardship and heal, You are the Healer. There is no healing except Your healing, a healing that leaves no illness."',
      action: 'Recite over water and drink. Take 1 tsp of pure Black Seed (Habbat al-Sawda) honey every morning.',
      source: 'Sahih al-Bukhari 5675'
    },
    planetaryRemedy: {
      planet: 'Sun (Surya) & Mars (Mangal)',
      element: 'Fire & Solar Prana',
      gemstone: 'Ruby / Red Coral',
      day: 'Sunday (Solar Vitality)',
      action: 'Expose skin to early morning sunlight (7:00–7:30 AM) for 15 minutes to absorb Prana.'
    },
    psychologicalRemedy: {
      framework: 'Somatic Experiencing & Polyvagal Nervous System Reset',
      mindsetShift: 'Fatigue is your body\'s intelligent emergency brake. Honor the need for deep restoration.',
      exercise: 'Perform 4-7-8 Breathing (Inhale 4s, Hold 7s, Exhale 8s) for 5 minutes when anxiety peaks.'
    },
    sevenDayPlan: [
      'Day 1: Eliminate screens 1 hour before bedtime; drink warm chamomile or mint tea.',
      'Day 2: Walk outdoors in morning sunlight for 20 minutes.',
      'Day 3: Replace processed sugars with raw dates, almonds, and clean hydration.',
      'Day 4: Practice 15 minutes of light stretching or yoga/pranayama.',
      'Day 5: Take a warm sea-salt bath or shower while practicing mindful gratitude.',
      'Day 6: Recite prophetic healing supplications during quiet morning hours.',
      'Day 7: Schedule a complete rest day with zero high-stress commitments.'
    ]
  },
  {
    id: 'family_conflict',
    category: 'Family & Home',
    title: 'Family Discord, Domestic Strain & In-Law Tension',
    subtitle: 'Harmonize domestic energy, establish healthy boundaries, and restore peace at home',
    iconName: 'Users',
    color: 'from-rose-600 to-purple-600',
    badge: 'Harmony Shield',
    rootCauses: [
      '4th House (Home) afflicted by Rahu/Saturn transits',
      'Intergenerational communication gaps and unaligned priorities',
      'Boundary erosion where extended relatives overly dictate private decisions'
    ],
    symptoms: [
      'Frequent tense atmosphere during family dinners or gatherings',
      'Feeling forced to choose sides in family arguments',
      'Resentment over unmet expectations regarding duty or care'
    ],
    islamicRemedy: {
      title: 'Silat al-Rahim (Maintaining Family Ties) & Surah Al-Baqarah',
      duaArabic: 'رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِمَن دَخَلَ بَيْتِيَ مُؤْمِنًا',
      duaTranslation: '"My Lord! Forgive me and my parents and whoever enters my house a believer." (Qur\'an 71:28)',
      action: 'Play Surah Al-Baqarah aloud in the house—the Prophet ﷺ stated it repels household discord and negative energies.',
      source: 'Sahih Muslim 780'
    },
    planetaryRemedy: {
      planet: 'Moon (Fourth House) & Jupiter',
      element: 'Water & Earth',
      gemstone: 'Yellow Sapphire / Pearl',
      day: 'Monday & Thursday',
      action: 'Place natural plants or clean water bowls in the North-East quadrant of your home.'
    },
    psychologicalRemedy: {
      framework: 'Family Systems Theory & Non-Violent Communication (NVC)',
      mindsetShift: 'You cannot change family members\' personalities; you can only change how you respond to their triggers.',
      exercise: 'Use "I" statements instead of "You" accusations (e.g., "I feel overwhelmed when..." instead of "You always...").'
    },
    sevenDayPlan: [
      'Day 1: Identify your top 2 emotional triggers when speaking with problematic family members.',
      'Day 2: Practice "pause before responding"—wait 5 full seconds before answering heated comments.',
      'Day 3: Clean and declutter the central living space of your home.',
      'Day 4: Initiate a small gesture of kindness (prepare a tea, send a sweet message) with no expectation.',
      'Day 5: Establish polite, firm boundaries on topics that are off-limits for debate.',
      'Day 6: Recite du\'a for your parents and relatives during tahajjud or quiet reflection.',
      'Day 7: Host or attend a family gathering with a neutral, peaceful mindset.'
    ]
  },
  {
    id: 'academic_focus',
    category: 'Education & Mind',
    title: 'Lack of Concentration, Study Stress & Exam Anxiety',
    subtitle: 'Sharpen memory, eliminate brain fog, and achieve academic/certification success',
    iconName: 'GradCap',
    color: 'from-cyan-500 to-teal-600',
    badge: 'Focus Mastery',
    rootCauses: [
      '5th House (Intellect) or Mercury combust condition',
      'Over-reliance on multitasking and short-form video dopamine spikes',
      'Inadequate study retention techniques and cramming panic'
    ],
    symptoms: [
      'Reading the same paragraph 5 times without absorbing information',
      'Procrastinating until hours before critical deadlines',
      'Blanking out during tests despite studying for days'
    ],
    islamicRemedy: {
      title: 'Du\'a for Knowledge & Speech Clarity (Surah Taha)',
      duaArabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي يَفْقَهُوا قَوْلِي ... رَّبِّ زِدْنِي عِلْمًا',
      duaTranslation: '"My Lord! Expand for me my chest, ease for me my task, and untie the knot from my tongue... My Lord, increase me in knowledge."',
      action: 'Recite "Rabbi Zidni \'Ilma" 21x before every study session. Eat 7 almonds and raisins in morning.',
      source: 'Qur\'an 20:25-28, 20:114'
    },
    planetaryRemedy: {
      planet: 'Mercury (Budh) & Saraswati/Minerva Archetype',
      element: 'Air',
      gemstone: 'Emerald / Peridot / Green Tourmaline',
      day: 'Wednesday (Intellect & Learning)',
      action: 'Study facing East or North; write study notes in green ink on Wednesdays.'
    },
    psychologicalRemedy: {
      framework: 'Pomodoro Technique (50/10) & Active Recall',
      mindsetShift: 'Memory is built by retrieval practice, not passive reading. Test yourself constantly.',
      exercise: 'Feynman Technique: Explain complex concepts aloud in simple terms as if teaching a 10-year-old.'
    },
    sevenDayPlan: [
      'Day 1: Turn off all notification sounds on phone during study blocks.',
      'Day 2: Organize study material into 50-minute Pomodoro focus blocks with 10-min rest.',
      'Day 3: Create handwritten flashcards or mind maps for key formulas/concepts.',
      'Day 4: Test yourself on past questions without looking at answer keys.',
      'Day 5: Teach a study partner or speak out loud to consolidate memory.',
      'Day 6: Review high-yield notes right before sleep to leverage memory consolidation.',
      'Day 7: Take an exam simulation under timed conditions with calm confidence.'
    ]
  },
  {
    id: 'evil_eye_envy',
    category: 'Protection & Energy',
    title: 'Evil Eye (Ain/Hasad), Envy & Negative Energy Drain',
    subtitle: 'Protect your success, home, and well-being from malice, envy, and psychic heaviness',
    iconName: 'Eye',
    color: 'from-amber-600 to-red-700',
    badge: 'Spiritual Shield',
    rootCauses: [
      'Sharing achievements prematurely on social media or with envious acquaintances',
      'Weak aura due to lack of morning/evening spiritual fortresses (Adhkar)',
      'Ketu/Rahu transit through 8th or 12th House of subtle energies'
    ],
    symptoms: [
      'Sudden unexplained illness or severe lethargy after receiving praise',
      'Breakdown of household appliances or sudden loss right after good news',
      'Feeling heavy, cold chills, or irrational panic in specific environments'
    ],
    islamicRemedy: {
      title: 'Ruqyah Sunnah & The Three Quls (Mu\'awwidhatayn)',
      duaArabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ ... أُعِيذُكُمَا بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ',
      duaTranslation: '"I seek refuge in the Perfect Words of Allah from the evil of what He has created... I seek refuge for you in the Perfect Words of Allah from every devil, toxic reptile, and envious eye."',
      action: 'Recite Surah Al-Ikhlas, Al-Falaq, and An-Nas 3x every morning & evening. Blow into hands and wipe over body.',
      source: 'Sahih al-Bukhari 5017, Sahih Muslim'
    },
    planetaryRemedy: {
      planet: 'Mars (Kavach) & Saturn',
      element: 'Fire & Earth Grounding',
      gemstone: 'Black Tourmaline / Onyx / Tiger\'s Eye',
      day: 'Tuesday & Saturday (Protection Rituals)',
      action: 'Carry a natural black obsidian or tourmaline crystal; sprinkle coarse sea salt in corners of room.'
    },
    psychologicalRemedy: {
      framework: 'Privacy Hygiene & Energy Boundary Management',
      mindsetShift: 'Conceal your blessings until they are fully established. Discretion is your greatest armor.',
      exercise: 'Practice "Strategic Concealment": Do not post unverified income, relationships, or wins online.'
    },
    sevenDayPlan: [
      'Day 1: Cleanse social media profile—remove overly intimate personal displays.',
      'Day 2: Recite morning and evening Adhkar with deep conviction.',
      'Day 3: Bath with sea salt or Sidr leaf water for spiritual refreshing.',
      'Day 4: Give secret charity (Sadaqah) specifically with intention of warding off evil.',
      'Day 5: Practice saying "MashaAllah TabarakAllah" whenever admiring your own blessings.',
      'Day 6: Declutter dark unused corners of the house where heaviness accumulates.',
      'Day 7: Maintain an impenetrable shield of spiritual routine and mental peace.'
    ]
  },
  {
    id: 'spiritual_emptiness',
    category: 'Spiritual & Purpose',
    title: 'Spiritual Emptiness, Crisis of Faith & Meaning',
    subtitle: 'Reconnect with divine purpose, heal existential numbness, and find profound sacred alignment',
    iconName: 'Anchor',
    color: 'from-blue-600 to-purple-700',
    badge: 'Soul Renewal',
    rootCauses: [
      'Distant connection from divine source & living purely material life',
      '9th House or Jupiter affliction blocking higher philosophy and faith',
      'Unprocessed grief or unanswered prayers creating cynicism'
    ],
    symptoms: [
      'Feeling like an empty shell despite material accomplishments',
      'Inability to feel sweetness in prayer or meditation',
      'Pessimistic outlook on the ultimate purpose of human existence'
    ],
    islamicRemedy: {
      title: 'Tawbah (Repentance), Tahajjud & Contemplation (Tafakkur)',
      duaArabic: 'يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ',
      duaTranslation: '"O Turner of the hearts, keep my heart firm upon Your religion."',
      action: 'Wake up 20 minutes before Fajr for 2 Rakat of Tahajjud. Speak directly to Allah in sincere personal supplication.',
      source: 'Sunan at-Tirmidhi 3522'
    },
    planetaryRemedy: {
      planet: 'Jupiter (Guru) & Sun (Atmakaraka)',
      element: 'Ether / Spirit',
      gemstone: 'Lapis Lazuli / Yellow Sapphire / Clear Quartz',
      day: 'Thursday (Spiritual Guidance)',
      action: 'Spend 30 minutes in silent nature contemplation or reading sacred scripture every Thursday.'
    },
    psychologicalRemedy: {
      framework: 'Logotherapy (Viktor Frankl) & Existential Re-centering',
      mindsetShift: 'Life is not asking what it can give you; life is asking what response you will give to its challenges.',
      exercise: 'Write your ideal legacy: What do you want your loved ones to say about your soul at your memorial?'
    },
    sevenDayPlan: [
      'Day 1: Spend 15 minutes in absolute silence without any electronics.',
      'Day 2: Read 5 pages of sacred text with translation and deep reflection.',
      'Day 3: Perform 2 Rakat of Tahajjud prayer in the quiet pre-dawn hours.',
      'Day 4: Volunteer or help someone in need with zero expectation of return.',
      'Day 5: Write down 10 profound things you are grateful for that money cannot buy.',
      'Day 6: Fast for one day to cleanse spiritual channels and soften the heart.',
      'Day 7: Renew your primary life intention (Niyyah) for everything you do.'
    ]
  },
  {
    id: 'decision_crossroads',
    category: 'Decision & Crossroads',
    title: 'Decision Paralysis, Major Life Crossroads & Uncertainty',
    subtitle: 'Gain absolute clarity when choosing between relocation, career moves, or marriage',
    iconName: 'Compass',
    color: 'from-emerald-600 to-indigo-700',
    badge: 'Clarity Engine',
    rootCauses: [
      'Dual sign (Gemini/Pisces/Virgo/Sagittarius) planetary transits causing doubt',
      'Fear of making the wrong choice leading to chronic hesitation',
      'Too many conflicting opinions from family and friends'
    ],
    symptoms: [
      'Endlessly weighing Option A vs Option B without moving forward',
      'Asking 10 different people for advice and feeling more confused',
      'Physical exhaustion from mental back-and-forth decision fatigue'
    ],
    islamicRemedy: {
      title: 'Complete Protocol of Salat al-Istikhara (Guidance Seeking)',
      duaArabic: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ',
      duaTranslation: '"O Allah, I seek Your counsel through Your knowledge and I seek capability through Your power..."',
      action: 'Pray 2 Rakat non-obligatory prayer, recite Istikhara Du\'a, then consult trustworthy experts (Shura). Trust the outcome.',
      source: 'Sahih al-Bukhari 1166'
    },
    planetaryRemedy: {
      planet: 'Mercury (Analysis) & Jupiter (Wisdom)',
      element: 'Air & Ether',
      gemstone: 'Fluorite / Emerald',
      day: 'Wednesday & Thursday',
      action: 'Make major analytical charts on Wednesday; make final intuitive commitment on Thursday.'
    },
    psychologicalRemedy: {
      framework: 'Regret Minimization Framework (Jeff Bezos) & 10/10/10 Rule',
      mindsetShift: 'In major choices, there is rarely a single "right" path—there are two different paths of growth.',
      exercise: 'Ask: How will I feel about this choice in 10 minutes? 10 months? 10 years?'
    },
    sevenDayPlan: [
      'Day 1: Write down Option A and Option B clearly on a single page.',
      'Day 2: List top 5 non-negotiable personal values and score both options against them.',
      'Day 3: Perform Istikhara prayer at night with a clean heart.',
      'Day 4: Consult exactly 2 qualified, objective mentors—no more.',
      'Day 5: Apply 10/10/10 rule to evaluate long-term impact of both choices.',
      'Day 6: Assume Option A is chosen for 24h and observe how your body feels. Repeat for Option B.',
      'Day 7: Make a firm decision, execute the first step, and commit with complete trust.'
    ]
  }
];

export default function HolisticAdvisor({ userProfile }: HolisticAdvisorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProblemId, setSelectedProblemId] = useState<string>(LIFE_PROBLEMS[0].id);
  const [perspective, setPerspective] = useState<SolutionPerspective>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  // Customization Controls State
  const [customUrgency, setCustomUrgency] = useState<'Standard' | 'High Priority' | 'Immediate Emergency'>('High Priority');
  const [customTraditionFocus, setCustomTraditionFocus] = useState<'Balanced All-4' | 'Islamic Sunnah Emphasis' | 'Planetary Vedic Focus' | 'Mindset & Psychology Focus'>('Balanced All-4');

  const name = userProfile?.name || 'Tarik Islam';
  const dob = userProfile?.dob || '1998-06-15';
  const time = userProfile?.time || '12:00';

  // Live Birth Chart Metrics Calculation
  const birthChartMetrics = useMemo(() => {
    const positions = calculatePlanetaryPositions(dob, time);
    const sunPos = positions.find(p => p.name === 'Sun');
    const moonPos = positions.find(p => p.name === 'Moon');
    const ascPos = positions.find(p => p.name === 'Ascendant') || positions[0];

    return {
      sunSign: sunPos ? `${sunPos.sign} (${sunPos.degree})` : 'Gemini 24°',
      moonSign: moonPos ? `${moonPos.sign} (${moonPos.degree})` : 'Taurus 12°',
      ascendant: ascPos ? `${ascPos.sign}` : 'Virgo',
      nakshatra: moonPos ? moonPos.nakshatra : 'Rohini',
    };
  }, [dob, time]);

  // Filter problems by search & category
  const filteredProblems = LIFE_PROBLEMS.filter(p => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const activeProblem = LIFE_PROBLEMS.find(p => p.id === selectedProblemId) || LIFE_PROBLEMS[0];
  const categories = ['all', ...Array.from(new Set(LIFE_PROBLEMS.map(p => p.category)))];

  // Calculate 7-Day Plan Progress
  const currentPlanDoneCount = activeProblem.sevenDayPlan.reduce((acc, _, idx) => {
    return completedSteps[`${activeProblem.id}_step_${idx}`] ? acc + 1 : acc;
  }, 0);
  const planProgressPercent = Math.round((currentPlanDoneCount / 7) * 100);

  const toggleStep = (stepIdx: number) => {
    const key = `${activeProblem.id}_step_${stepIdx}`;
    setCompletedSteps(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDownloadPdf = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Holistic Solution Blueprint — ${activeProblem.title}</title>
            <meta charset="utf-8" />
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Amiri:wght@400;700&display=swap');
              body {
                font-family: 'Inter', system-ui, -apple-system, sans-serif;
                background: #ffffff;
                color: #0f172a;
                padding: 40px;
                margin: 0;
                line-height: 1.6;
              }
              .header {
                border-bottom: 3px double #4f46e5;
                padding-bottom: 20px;
                margin-bottom: 24px;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
              }
              .logo {
                font-size: 22px;
                font-weight: 800;
                color: #4f46e5;
                letter-spacing: -0.5px;
              }
              .tagline {
                font-size: 11px;
                color: #64748b;
                text-transform: uppercase;
                letter-spacing: 1px;
              }
              .metrics-box {
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                padding: 16px;
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 12px;
                margin-bottom: 24px;
              }
              .metric-label {
                font-size: 10px;
                color: #64748b;
                text-transform: uppercase;
                font-weight: 700;
              }
              .metric-val {
                font-size: 13px;
                color: #1e293b;
                font-weight: 700;
              }
              .problem-banner {
                background: #eef2ff;
                border: 1px solid #c7d2fe;
                border-radius: 16px;
                padding: 20px;
                margin-bottom: 24px;
              }
              .problem-title {
                font-size: 20px;
                font-weight: 800;
                color: #312e81;
                margin: 0 0 6px 0;
              }
              .problem-sub {
                font-size: 13px;
                color: #4338ca;
                margin: 0;
              }
              .section-card {
                border: 1px solid #e2e8f0;
                border-radius: 14px;
                padding: 20px;
                margin-bottom: 20px;
                background: #ffffff;
              }
              .sec-title {
                font-size: 14px;
                font-weight: 700;
                color: #0f172a;
                margin-bottom: 12px;
                display: flex;
                align-items: center;
                gap: 8px;
              }
              .arabic-box {
                background: #f0fdf4;
                border: 1px solid #bbf7d0;
                border-radius: 12px;
                padding: 16px;
                text-align: right;
                margin: 12px 0;
              }
              .arabic-text {
                font-family: 'Amiri', serif;
                font-size: 22px;
                color: #14532d;
                line-height: 1.8;
              }
              .trans-text {
                font-size: 12px;
                color: #166534;
                text-align: left;
                font-style: italic;
                margin-top: 8px;
                border-top: 1px solid #dcfce7;
                padding-top: 8px;
              }
              .plan-step {
                padding: 10px 14px;
                border-radius: 10px;
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                margin-bottom: 8px;
                font-size: 12px;
                display: flex;
                align-items: center;
                gap: 10px;
              }
              .checkbox-done {
                width: 18px;
                height: 18px;
                border-radius: 4px;
                background: #10b981;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: bold;
              }
              .checkbox-open {
                width: 18px;
                height: 18px;
                border-radius: 4px;
                border: 1px solid #cbd5e1;
                background: white;
              }
              .footer {
                text-align: center;
                font-size: 11px;
                color: #94a3b8;
                border-top: 1px solid #e2e8f0;
                padding-top: 20px;
                margin-top: 30px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <div>
                <div class="logo">ASTRO360 HOLISTIC BLUEPRINT</div>
                <div class="tagline">Universal Multi-Perspective Problem Resolution Guide</div>
              </div>
              <div style="text-align: right; font-size: 12px; color: #64748b;">
                <div>Date: ${new Date().toLocaleDateString()}</div>
                <div>Urgency: <strong>${customUrgency}</strong></div>
              </div>
            </div>

            <div class="metrics-box">
              <div>
                <div class="metric-label">Seeker Name</div>
                <div class="metric-val">${name}</div>
              </div>
              <div>
                <div class="metric-label">Sun Sign</div>
                <div class="metric-val">${birthChartMetrics.sunSign}</div>
              </div>
              <div>
                <div class="metric-label">Moon Sign</div>
                <div class="metric-val">${birthChartMetrics.moonSign}</div>
              </div>
              <div>
                <div class="metric-label">Nakshatra & Lagna</div>
                <div class="metric-val">${birthChartMetrics.nakshatra} (${birthChartMetrics.ascendant})</div>
              </div>
            </div>

            <div class="problem-banner">
              <h1 class="problem-title">${activeProblem.title}</h1>
              <p class="problem-sub">${activeProblem.subtitle}</p>
            </div>

            <div class="section-card">
              <div class="sec-title">⚠️ Root Causes & Diagnostic Insights</div>
              <ul style="font-size: 12px; color: #334155; padding-left: 20px; margin: 0;">
                ${activeProblem.rootCauses.map(rc => `<li>${rc}</li>`).join('')}
              </ul>
            </div>

            <div class="section-card" style="border-color: #86efac; background: #fafdfb;">
              <div class="sec-title" style="color: #15803d;">🕌 1. Authentic Sunnah & Qur'anic Remedy (${activeProblem.islamicRemedy.source})</div>
              <div style="font-size: 13px; font-weight: 700; color: #166534; margin-bottom: 6px;">${activeProblem.islamicRemedy.title}</div>
              ${activeProblem.islamicRemedy.duaArabic ? `
                <div class="arabic-box">
                  <div class="arabic-text">${activeProblem.islamicRemedy.duaArabic}</div>
                  <div class="trans-text">${activeProblem.islamicRemedy.duaTranslation}</div>
                </div>
              ` : ''}
              <div style="font-size: 12px; color: #15803d;"><strong>Prescribed Action:</strong> ${activeProblem.islamicRemedy.action}</div>
            </div>

            <div class="section-card" style="border-color: #d8b4fe; background: #fdfafe;">
              <div class="sec-title" style="color: #7e22ce;">🪐 2. Classical Planetary & Gemstone Alignment</div>
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; font-size: 11px; margin-bottom: 12px; background: #f5f3ff; padding: 12px; border-radius: 10px;">
                <div><strong>Planet:</strong> ${activeProblem.planetaryRemedy.planet}</div>
                <div><strong>Element:</strong> ${activeProblem.planetaryRemedy.element}</div>
                <div><strong>Gemstone:</strong> ${activeProblem.planetaryRemedy.gemstone}</div>
                <div><strong>Day:</strong> ${activeProblem.planetaryRemedy.day}</div>
              </div>
              <div style="font-size: 12px; color: #6b21a8;"><strong>Energetic Action:</strong> ${activeProblem.planetaryRemedy.action}</div>
            </div>

            <div class="section-card" style="border-color: #a5f3fc; background: #f8fafc;">
              <div class="sec-title" style="color: #0369a1;">🧠 3. Psychological Framework & CBT Exercise</div>
              <div style="font-size: 12px; color: #0c4a6e; margin-bottom: 8px;"><strong>Framework:</strong> ${activeProblem.psychologicalRemedy.framework}</div>
              <div style="font-size: 12px; color: #0c4a6e; margin-bottom: 8px; font-style: italic;"><strong>Mindset Shift:</strong> "${activeProblem.psychologicalRemedy.mindsetShift}"</div>
              <div style="font-size: 12px; color: #0c4a6e;"><strong>Exercise:</strong> ${activeProblem.psychologicalRemedy.exercise}</div>
            </div>

            <div class="section-card" style="border-color: #fde68a; background: #fffdf5;">
              <div class="sec-title" style="color: #b45309;">📅 4. 7-Day Resolution Action Plan (${currentPlanDoneCount}/7 Days Completed)</div>
              ${activeProblem.sevenDayPlan.map((step, i) => {
                const isDone = completedSteps[`${activeProblem.id}_step_${i}`];
                return `
                  <div class="plan-step" style="${isDone ? 'background: #ecfdf5; border-color: #a7f3d0;' : ''}">
                    <div class="${isDone ? 'checkbox-done' : 'checkbox-open'}">${isDone ? '✓' : ''}</div>
                    <div style="${isDone ? 'text-decoration: line-through; color: #059669;' : ''}">${step}</div>
                  </div>
                `;
              }).join('')}
            </div>

            <div class="footer">
              Confidential & Personalized Solution Blueprint generated for ${name} · ASTRO360 Precision Engine
            </div>
          </body>
        </html>
      `;
      exportUniversalPdf(htmlContent, `ASTRO360_Blueprint_${activeProblem.id}_${name.replace(/\s+/g, '_')}`);
    }, 200);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 space-y-8 text-left">
      {/* HEADER SECTION WITH LIVE BIRTH CHART METRICS */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-indigo-500/30 relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 mb-2">
              <Compass className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-bold tracking-widest uppercase font-mono">Universal Problem-Solution Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white leading-tight">
              Life Problems & <span className="gradient-text">Holistic Remedy Advisor</span>
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
              Synthesized solutions for every human challenge—combining <span className="text-emerald-400 font-semibold">Authentic Sunnah Remedies</span>, <span className="text-purple-400 font-semibold">Classical Planetary Alignment</span>, <span className="text-cyan-400 font-semibold">Modern Psychology</span>, and <span className="text-amber-400 font-semibold">7-Day Resolution Action Plans</span> for {name}.
            </p>
          </div>

          <button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 shrink-0 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            {isDownloading ? 'Compiling Blueprint...' : 'Export Solution Blueprint'}
          </button>
        </div>

        {/* Live Seeker Astronomical Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-white/10 relative z-10 font-mono text-xs">
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 text-[10px] uppercase block">Seeker Sun Sign</span>
            <span className="font-bold text-amber-300">{birthChartMetrics.sunSign}</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 text-[10px] uppercase block">Seeker Moon Sign</span>
            <span className="font-bold text-purple-300">{birthChartMetrics.moonSign}</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 text-[10px] uppercase block">Nakshatra</span>
            <span className="font-bold text-cyan-300">{birthChartMetrics.nakshatra}</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 text-[10px] uppercase block">Lagna / Ascendant</span>
            <span className="font-bold text-emerald-300">{birthChartMetrics.ascendant}</span>
          </div>
        </div>

        {/* Responsible Guidance Disclaimer */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3 text-xs text-slate-300 relative z-10">
          <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-white">Ethical Guidance Standard:</strong> All Islamic remedies are strictly rooted in the Holy Qur'an and Sahih Hadith. Planetary insights provide energetic balancing. Psychological frameworks support emotional resilience. Always consult licensed medical or financial professionals for legal or clinical emergencies.
          </p>
        </div>
      </div>

      {/* CUSTOMIZATION CONTROLS: SEARCH & CATEGORY FILTER & PERSPECTIVE SELECTOR & URGENCY */}
      <div className="glass-card p-5 sm:p-6 rounded-3xl border border-white/10 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any problem (e.g. debt, job loss, anxiety, evil eye, exam)..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Custom Urgency Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <Sliders className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-slate-400 font-mono font-semibold">Urgency:</span>
            <select
              value={customUrgency}
              onChange={(e) => setCustomUrgency(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="Standard">Standard Guidance</option>
              <option value="High Priority">High Priority</option>
              <option value="Immediate Emergency">Immediate Emergency</option>
            </select>
          </div>

          {/* Perspective Selector */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 overflow-x-auto shrink-0">
            <span className="text-[11px] font-bold text-slate-400 px-3 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Perspective:
            </span>
            {[
              { id: 'all', label: 'All 4 Dimensions' },
              { id: 'islamic', label: '🕌 Islamic / Sunnah' },
              { id: 'planetary', label: '🪐 Planetary & Gem' },
              { id: 'psychological', label: '🧠 Psychology & Mind' },
            ].map(p => (
              <button
                key={p.id}
                onClick={() => setPerspective(p.id as SolutionPerspective)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  perspective === p.id 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer capitalize whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-indigo-500/30 text-indigo-300 border border-indigo-500/50'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-transparent'
              }`}
            >
              {cat === 'all' ? '✨ All Problem Categories' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN TWO-COLUMN LAYOUT: PROBLEM LIST & DETAILED BLUEPRINT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: PROBLEM SELECTION LIST (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
            Select Your Challenge ({filteredProblems.length})
          </h3>
          <div className="space-y-3 max-h-[750px] overflow-y-auto pr-1 custom-scrollbar">
            {filteredProblems.length === 0 ? (
              <div className="p-8 text-center glass-card rounded-2xl text-slate-400 text-xs">
                No problems matching "{searchQuery}". Try searching for debt, career, evil eye, or anxiety.
              </div>
            ) : (
              filteredProblems.map((prob) => {
                const isSelected = activeProblem.id === prob.id;
                return (
                  <motion.button
                    key={prob.id}
                    onClick={() => setSelectedProblemId(prob.id)}
                    whileHover={{ x: 4 }}
                    className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden space-y-2 ${
                      isSelected
                        ? 'bg-gradient-to-r from-indigo-950/80 to-slate-900 border-indigo-500/60 shadow-lg shadow-indigo-500/10'
                        : 'bg-slate-900/60 border-white/5 hover:border-white/20 hover:bg-slate-900/90'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                        {prob.category}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400">{prob.badge}</span>
                    </div>

                    <h4 className="text-sm font-bold text-white leading-tight">{prob.title}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{prob.subtitle}</p>

                    {isSelected && (
                      <div className="w-1 h-full absolute left-0 top-0 bg-gradient-to-b from-indigo-500 to-purple-500" />
                    )}
                  </motion.button>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: COMPREHENSIVE SOLUTION BLUEPRINT (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProblem.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* PROBLEM TITLE CARD */}
              <div className="glass-card p-6 sm:p-8 rounded-3xl border border-indigo-500/40 relative overflow-hidden space-y-4">
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${activeProblem.color} opacity-15 blur-3xl pointer-events-none`} />
                
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40">
                      {activeProblem.category}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                      {activeProblem.badge}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-amber-300 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
                    Urgency: {customUrgency}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
                  {activeProblem.title}
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeProblem.subtitle}
                </p>

                {/* Root Causes & Symptoms Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" /> Root Causes
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {activeProblem.rootCauses.map((rc, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-amber-400 mt-0.5">•</span>
                          <span>{rc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-2">
                    <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Activity className="w-4 h-4" /> Common Symptoms
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {activeProblem.symptoms.map((sym, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-indigo-400 mt-0.5">•</span>
                          <span>{sym}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* 1. ISLAMIC / SUNNAH AUTHENTIC REMEDY */}
              {(perspective === 'all' || perspective === 'islamic') && (
                <motion.div 
                  initial={{ opacity: 0, y: 12 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="glass-card p-6 sm:p-8 rounded-3xl border border-emerald-500/40 space-y-5"
                >
                  <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 text-lg">🕌</span> 
                      Authentic Sunnah & Qur'anic Remedy
                    </h3>
                    <span className="text-[10px] font-mono text-emerald-300 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                      {activeProblem.islamicRemedy.source}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-emerald-300">{activeProblem.islamicRemedy.title}</h4>

                    {activeProblem.islamicRemedy.duaArabic && (
                      <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-3 text-right">
                        <p className="text-xl sm:text-2xl font-serif text-emerald-200 leading-loose" style={{ direction: 'rtl' }}>
                          {activeProblem.islamicRemedy.duaArabic}
                        </p>
                        <p className="text-xs text-slate-300 text-left font-sans italic border-t border-emerald-500/20 pt-3">
                          {activeProblem.islamicRemedy.duaTranslation}
                        </p>
                      </div>
                    )}

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200 leading-relaxed">
                      <strong className="text-emerald-400 font-semibold block mb-1">Prescribed Action for {name}:</strong>
                      {activeProblem.islamicRemedy.action}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 2. CLASSICAL PLANETARY & GEMSTONE REMEDY */}
              {(perspective === 'all' || perspective === 'planetary') && (
                <motion.div 
                  initial={{ opacity: 0, y: 12 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="glass-card p-6 sm:p-8 rounded-3xl border border-purple-500/40 space-y-5"
                >
                  <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span className="p-2 rounded-xl bg-purple-500/20 text-purple-400 text-lg">🪐</span> 
                      Classical Planetary & Remedial Alignment
                    </h3>
                    <span className="text-[10px] font-mono text-purple-300 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30">
                      Energetic Balancing
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1">
                      <span className="text-[10px] text-slate-400 font-mono">Governing Body</span>
                      <p className="text-xs font-bold text-purple-300">{activeProblem.planetaryRemedy.planet}</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1">
                      <span className="text-[10px] text-slate-400 font-mono">Element</span>
                      <p className="text-xs font-bold text-cyan-300">{activeProblem.planetaryRemedy.element}</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1">
                      <span className="text-[10px] text-slate-400 font-mono">Resonant Gemstone</span>
                      <p className="text-xs font-bold text-amber-300">{activeProblem.planetaryRemedy.gemstone}</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1">
                      <span className="text-[10px] text-slate-400 font-mono">Optimal Alignment Day</span>
                      <p className="text-xs font-bold text-emerald-300">{activeProblem.planetaryRemedy.day}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-slate-200 leading-relaxed">
                    <strong className="text-purple-300 font-semibold block mb-1">Energetic Alignment Exercise for {name}:</strong>
                    {activeProblem.planetaryRemedy.action}
                  </div>
                </motion.div>
              )}

              {/* 3. PSYCHOLOGICAL & MINDFULNESS FRAMEWORK */}
              {(perspective === 'all' || perspective === 'psychological') && (
                <motion.div 
                  initial={{ opacity: 0, y: 12 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="glass-card p-6 sm:p-8 rounded-3xl border border-cyan-500/40 space-y-5"
                >
                  <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 text-lg">🧠</span> 
                      Psychological Framework & Mindset Shift
                    </h3>
                    <span className="text-[10px] font-mono text-cyan-300 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                      CBT & Behavioral Science
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 space-y-1">
                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Framework Name</span>
                      <p className="text-sm font-bold text-white">{activeProblem.psychologicalRemedy.framework}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1 text-xs text-slate-200">
                      <strong className="text-cyan-300 font-semibold block mb-1">Mindset Shift:</strong>
                      "{activeProblem.psychologicalRemedy.mindsetShift}"
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1 text-xs text-slate-200">
                      <strong className="text-amber-300 font-semibold block mb-1">Practical Behavioral Exercise:</strong>
                      {activeProblem.psychologicalRemedy.exercise}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 4. STEP-BY-STEP 7-DAY ACTION PLAN WITH LIVE PROGRESS COUNTER */}
              <motion.div 
                initial={{ opacity: 0, y: 12 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="glass-card p-6 sm:p-8 rounded-3xl border border-amber-500/40 space-y-6"
              >
                <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 text-lg">📅</span> 
                      7-Day Resolution Action Plan ({planProgressPercent}% Complete)
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">Check off daily action steps as you complete them</p>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {currentPlanDoneCount}/7 Days Checked
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-300"
                    style={{ width: `${planProgressPercent}%` }}
                  />
                </div>

                <div className="space-y-3">
                  {activeProblem.sevenDayPlan.map((stepText, idx) => {
                    const stepKey = `${activeProblem.id}_step_${idx}`;
                    const isDone = !!completedSteps[stepKey];
                    return (
                      <motion.button
                        key={idx}
                        onClick={() => toggleStep(idx)}
                        whileHover={{ scale: 1.01 }}
                        className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                          isDone 
                            ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200 line-through opacity-75' 
                            : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10 hover:border-amber-500/40'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isDone ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-600 bg-slate-900'
                        }`}>
                          {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-xs leading-relaxed font-medium">{stepText}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
