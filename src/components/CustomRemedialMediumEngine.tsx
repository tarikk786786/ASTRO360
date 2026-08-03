import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Shield, Sparkles, BookOpen, Sun, Moon, Flame, Compass, CheckCircle2, ArrowRight, Lightbulb, MessageCircle 
} from 'lucide-react';
import type { UserProfile } from '../types';

interface CustomRemedialMediumEngineProps {
  userProfile: UserProfile;
}

type WisdomMedium = 'islamic' | 'vedic' | 'christian' | 'jewish' | 'buddhist' | 'chinese' | 'sikh' | 'indigenous' | 'western' | 'universal';
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

  const remediesDatabase: Record<WisdomMedium, Record<LifeProblemCategory, ProblemSolutionRemedy>> = {
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
        prayerOrMantra: 'Surah Ar-Ra’d Ayah 28 & Morning/Evening Azkar',
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
        authenticReference: 'Valmiki Ramayana & Rigveda 3.62.10'
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
        authenticReference: 'Srimad Bhagavatam Canto 10'
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
        authenticReference: 'Rigveda 7.59.12'
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
        authenticReference: 'Sri Suktam (Rigveda Samhita)'
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
        authenticReference: 'Shukla Yajurveda'
      },
      anxiety: {
        id: 'ved-anx',
        problem: 'Deep mental restlessness, panic, and fear of unknown.',
        rootCause: 'Rahu transiting 1st or 5th house influencing Manas.',
        medium: 'vedic',
        prayerOrMantra: 'Om Namah Shivaya (108 times) & Sheetali Pranayama',
        dailyActions: [
          'Practice grounding earth meditation for 15 minutes.',
          'Wear a 5-Mukhi Rudraksha bead after sanctification.'
        ],
        charityOrGoodDeed: 'Feed stray animals and birds daily.',
        bestTime: 'Sunset twilight (Sandhya Kal)',
        authenticReference: 'Shiva Purana'
      },
      protection: {
        id: 'ved-pro',
        problem: 'Protection against evil eye, black energy, and malefic transits.',
        rootCause: 'Affliction by Saturn-Rahu conjunction (Shapit Dosha).',
        medium: 'vedic',
        prayerOrMantra: 'Hanuman Chalisa & Om Namo Bhagavate Vasudevaya',
        dailyActions: [
          'Light a mustard oil lamp under a Peepal tree on Saturdays.',
          'Apply Tilak of vermilion (Sindoor) on forehead.'
        ],
        charityOrGoodDeed: 'Donate black umbrella or leather footwear to needy.',
        bestTime: 'Saturday evening',
        authenticReference: 'Ramcharitmanas & Skanda Purana'
      },
      exams: {
        id: 'ved-exa',
        problem: 'Memory slips, focus loss, and examination performance stress.',
        rootCause: 'Weak Mercury (Budha) in 5th House of Intelligence.',
        medium: 'vedic',
        prayerOrMantra: 'Saraswati Vandana & Om Aim Saraswatyai Namah (108x)',
        dailyActions: [
          'Keep green cardamom in your pocket while studying.',
          'Study facing North or East during Brahma Muhurta.'
        ],
        charityOrGoodDeed: 'Donate books, pens, and paper to underprivileged students.',
        bestTime: 'Brahma Muhurta (4:00 AM - 6:00 AM)',
        authenticReference: 'Rigveda Saraswati Suktam'
      },
      marriage: {
        id: 'ved-mar',
        problem: 'Delay in finding suitable match or Manglik Dosha friction.',
        rootCause: 'Mars placement in 1st, 4th, 7th, 8th, or 12th house.',
        medium: 'vedic',
        prayerOrMantra: 'Om Gauri Shankaraya Namah & Mangala Gauri Vrat',
        dailyActions: [
          'Offer yellow flowers and jaggery at Lord Vishnu temple.',
          'Wear yellow clothes on Thursdays.'
        ],
        charityOrGoodDeed: 'Donate yellow lentils (Chana Dal) on Thursdays.',
        bestTime: 'Thursday mornings',
        authenticReference: 'Padma Purana'
      },
      istikhara: {
        id: 'ved-ist',
        problem: 'Confusion regarding major decisions and future life path.',
        rootCause: 'Transiting Jupiter in 8th or 12th house causing illusion.',
        medium: 'vedic',
        prayerOrMantra: 'Om Namo Narayanaya (108x) & Dhyana Meditation',
        dailyActions: [
          'Perform 10 minutes of inner inquiry in silent Dhyana.',
          'Maintain absolute truthfulness (Satya) for 21 days.'
        ],
        charityOrGoodDeed: 'Seek blessings of spiritual gurus and teachers.',
        bestTime: 'Brahma Muhurta hour',
        authenticReference: 'Yoga Sutras of Patanjali'
      }
    },

    christian: {
      career: {
        id: 'chr-car',
        problem: 'Stagnation at work, ethical dilemmas, or lack of vocational alignment.',
        rootCause: 'Disconnection from divine purpose and stewardship values.',
        medium: 'christian',
        prayerOrMantra: 'Psalm 90:17 - "May the favor of the Lord our God rest on us; establish the work of our hands."',
        dailyActions: [
          'Dedicate your work daily as a service unto God.',
          'Maintain high ethical standards and honesty in business.'
        ],
        charityOrGoodDeed: 'Mentor a young worker or support vocational training.',
        bestTime: 'Morning prayer before starting work',
        authenticReference: 'Holy Bible - Psalm 90:17 & Colossians 3:23'
      },
      relationship: {
        id: 'chr-rel',
        problem: 'Marital friction, unforgiveness, or breakdown in loving communion.',
        rootCause: 'Pride, impatience, and hardened heart energy.',
        medium: 'christian',
        prayerOrMantra: '1 Corinthians 13:4-7 - "Love is patient, love is kind. It does not envy, it does not boast..."',
        dailyActions: [
          'Practice active forgiveness and release resentment before sunset.',
          'Pray together with your spouse or family daily.'
        ],
        charityOrGoodDeed: 'Reconcile with an estranged family member or friend.',
        bestTime: 'Evening family prayer',
        authenticReference: 'Holy Bible - 1 Corinthians 13 & Ephesians 4:32'
      },
      health: {
        id: 'chr-hea',
        problem: 'Physical ailment, chronic illness, or physical exhaustion.',
        rootCause: 'Bodily depletion and need for spiritual renewal.',
        medium: 'christian',
        prayerOrMantra: 'Psalm 103:2-3 - "Praise the Lord, my soul... who heals all your diseases."',
        dailyActions: [
          'Anoint forehead with blessed oil while praying for healing.',
          'Practice quiet sabbath rest to allow bodily restoration.'
        ],
        charityOrGoodDeed: 'Visit or call someone in the hospital or nursing home.',
        bestTime: 'Early morning devotional hour',
        authenticReference: 'Holy Bible - Psalm 103 & James 5:14-15'
      },
      finance: {
        id: 'chr-fin',
        problem: 'Financial strain, overwhelming debt, or scarcity mindset.',
        rootCause: 'Fear of lack and neglect of faithful stewardship.',
        medium: 'christian',
        prayerOrMantra: 'Philippians 4:19 - "And my God will meet all your needs according to the riches of his glory."',
        dailyActions: [
          'Practice faithful tithing (10%) and joyful giving.',
          'Create a disciplined, debt-free monthly budget.'
        ],
        charityOrGoodDeed: 'Donate food or financial support to a local shelter.',
        bestTime: 'Sunday morning worship',
        authenticReference: 'Holy Bible - Philippians 4:19 & Malachi 3:10'
      },
      peace: {
        id: 'chr-pea',
        problem: 'Inner restlessness, turmoil, and mental agitation.',
        rootCause: 'Carrying heavy burdens without trusting Divine Providence.',
        medium: 'christian',
        prayerOrMantra: 'Psalm 46:10 - "Be still, and know that I am God."',
        dailyActions: [
          'Spend 15 minutes in contemplative silent prayer (Centering Prayer).',
          'Read a chapter from the Gospel of John or Psalms daily.'
        ],
        charityOrGoodDeed: 'Offer a listening ear to someone in distress.',
        bestTime: 'Late evening stillness',
        authenticReference: 'Holy Bible - Psalm 46:10 & Matthew 11:28'
      },
      anxiety: {
        id: 'chr-anx',
        problem: 'Overwhelming worry, panic, and fear of the future.',
        rootCause: 'Anxiety from trying to control outcome instead of trusting Grace.',
        medium: 'christian',
        prayerOrMantra: '1 Peter 5:7 - "Cast all your anxiety on Him because He cares for you."',
        dailyActions: [
          'Write down 3 blessings daily to cultivate gratitude.',
          'Memorize Philippians 4:6-7 and recite during anxious moments.'
        ],
        charityOrGoodDeed: 'Comfort a grieving friend or community member.',
        bestTime: 'Morning twilight',
        authenticReference: 'Holy Bible - 1 Peter 5:7 & Philippians 4:6-7'
      },
      protection: {
        id: 'chr-pro',
        problem: 'Feeling under spiritual attack, negative influences, or oppression.',
        rootCause: 'Vulnerability in spiritual warfare and need for divine shield.',
        medium: 'christian',
        prayerOrMantra: 'Psalm 91 - "He who dwells in the shelter of the Most High will rest in the shadow of the Almighty."',
        dailyActions: [
          'Put on the Armor of God (Ephesians 6) through morning prayer.',
          'Keep a Cross or Bible in your primary living space.'
        ],
        charityOrGoodDeed: 'Protect and stand up for someone vulnerable.',
        bestTime: 'Nightfall before sleep',
        authenticReference: 'Holy Bible - Psalm 91 & Ephesians 6:10-18'
      },
      exams: {
        id: 'chr-exa',
        problem: 'Academic anxiety, difficulty comprehending subjects, or test fears.',
        rootCause: 'Lack of clarity and stress obscuring God-given intelligence.',
        medium: 'christian',
        prayerOrMantra: 'James 1:5 - "If any of you lacks wisdom, you should ask God, who gives generously to all."',
        dailyActions: [
          'Pray for wisdom and focus before starting study sessions.',
          'Maintain a structured, orderly study schedule.'
        ],
        charityOrGoodDeed: 'Tutor a classmate struggling with subjects.',
        bestTime: 'Morning before classes',
        authenticReference: 'Holy Bible - James 1:5 & Proverbs 2:6'
      },
      marriage: {
        id: 'chr-mar',
        problem: 'Disconnections in commitment or longing for a godly partner.',
        rootCause: 'Misalignment in core spiritual values and timing.',
        medium: 'christian',
        prayerOrMantra: 'Ecclesiastes 4:12 - "A cord of three strands is not quickly broken."',
        dailyActions: [
          'Pray for your present or future spouse daily.',
          'Cultivate patience, purity, and readiness for covenant.'
        ],
        charityOrGoodDeed: 'Support newlyweds or couples undergoing hard times.',
        bestTime: 'Evening devotional hour',
        authenticReference: 'Holy Bible - Ecclesiastes 4:9-12'
      },
      istikhara: {
        id: 'chr-ist',
        problem: 'Crossroads in major life decisions requiring divine discernment.',
        rootCause: 'Human confusion between self-will and divine call.',
        medium: 'christian',
        prayerOrMantra: 'Proverbs 3:5-6 - "Trust in the Lord with all your heart and lean not on your own understanding..."',
        dailyActions: [
          'Practice a 3-day Daniel Fast (light plant-based diet) for spiritual clarity.',
          'Seek counsel from a trusted pastor, priest, or spiritual mentor.'
        ],
        charityOrGoodDeed: 'Serve silently in a church or community ministry.',
        bestTime: 'Early morning fasting hour',
        authenticReference: 'Holy Bible - Proverbs 3:5-6 & Psalm 32:8'
      }
    },

    jewish: {
      career: {
        id: 'jew-car',
        problem: 'Business friction, lack of Parnassah (sustenance), or professional obstacles.',
        rootCause: 'Blockage in Kabbalistic Sephirah of Malchut / Yesod connection.',
        medium: 'jewish',
        prayerOrMantra: 'Ana B\'Koach (42-Letter Sacred Name Prayer) & Psalm 145:16',
        dailyActions: [
          'Place Tzedakah (charity coins) into a pushke box every morning before work.',
          'Conduct business with absolute integrity and honesty (Kashrut in business).'
        ],
        charityOrGoodDeed: 'Support Jewish community relief funds or local entrepreneurs.',
        bestTime: 'Shacharit (Morning prayer hour)',
        authenticReference: 'Siddur & Kabbalistic Zohar'
      },
      relationship: {
        id: 'jew-rel',
        problem: 'Lack of Shalom Bayit (peace in the home) or delay in Shidduch (match).',
        rootCause: 'Energetic disharmony between Chesed (loving-kindness) and Gevurah (discipline).',
        medium: 'jewish',
        prayerOrMantra: 'Song of Songs (Shir HaShirim) Chapter 8 & Psalm 128',
        dailyActions: [
          'Light Shabbat candles every Friday evening before sunset.',
          'Practice Dan L\'Chaf Zechut (judging others favorably).'
        ],
        charityOrGoodDeed: 'Assist needy brides and grooms (Hachnasat Kallah).',
        bestTime: 'Friday afternoon before Shabbat',
        authenticReference: 'Talmud Pirkei Avot & Shir HaShirim'
      },
      health: {
        id: 'jew-hea',
        problem: 'Illness, physical suffering, or low vital energy.',
        rootCause: 'Need for Refuah Shleimah (complete healing of body and soul).',
        medium: 'jewish',
        prayerOrMantra: 'Mi Sheberach Prayer & Psalm 6 / Psalm 121',
        dailyActions: [
          'Recite Modeh Ani upon waking up with gratitude for life.',
          'Wash hands ritually (Netilat Yadayim) for physical and spiritual purity.'
        ],
        charityOrGoodDeed: 'Perform Bikkur Cholim (visiting the sick).',
        bestTime: 'Shacharit morning hours',
        authenticReference: 'Siddur Shulchan Aruch & Psalms'
      },
      finance: {
        id: 'jew-fin',
        problem: 'Financial distress, debt, or unstable livelihood.',
        rootCause: 'Blockage in flow of divine abundance (Shefa).',
        medium: 'jewish',
        prayerOrMantra: 'Birkat HaEsek (Business Blessing) & Tefillat HaParnassah',
        dailyActions: [
          'Separate Ma\'aser (10% tithe of income) faithfully.',
          'Avoid taking or charging unlawful interest.'
        ],
        charityOrGoodDeed: 'Provide interest-free loans to community members (Free Loan Society).',
        bestTime: 'Mincha (Afternoon prayer)',
        authenticReference: 'Deuteronomy 8:18 & Shulchan Aruch'
      },
      peace: {
        id: 'jew-pea',
        problem: 'Mental anguish, doubt, and absence of inner peace.',
        rootCause: 'Disconnection from Bitachon (deep trust in Divine Providence).',
        medium: 'jewish',
        prayerOrMantra: 'Shalom Aleichem & Psalm 23 - "The Lord is my shepherd; I shall not want."',
        dailyActions: [
          'Observe 25 hours of total Shabbat digital rest every week.',
          'Practice 10 minutes of Hitbodedut (personal unscripted prayer to God in nature).'
        ],
        charityOrGoodDeed: 'Host guests for Shabbat meals (Hachnasat Orchim).',
        bestTime: 'Shabbat & Havdalah transition',
        authenticReference: 'Psalms 23 & Teachings of Rebbe Nachman'
      },
      anxiety: {
        id: 'jew-anx',
        problem: 'Overwhelming worry, fear, or emotional heaviness.',
        rootCause: 'Overactive Gevurah energy without sweetening by Chesed.',
        medium: 'jewish',
        prayerOrMantra: 'Psalm 121 - "I lift up my eyes to the mountains—where does my help come from?"',
        dailyActions: [
          'Say "Gam Zu L\'Tovah" (This too is for the good) in every trial.',
          'Recite the Shema prayer twice daily.'
        ],
        charityOrGoodDeed: 'Comfort mourners (Nichum Aveilim).',
        bestTime: 'Bedtime Kriat Shema',
        authenticReference: 'Psalm 121 & Mishnah Taanit 21a'
      },
      protection: {
        id: 'jew-pro',
        problem: 'Ayin Hara (Evil Eye), harmful vibes, or spiritual negativity.',
        rootCause: 'Vulnerability to envious gazes affecting spiritual aura.',
        medium: 'jewish',
        prayerOrMantra: 'Ben Porat Yosef & Ana B\'Koach line 2',
        dailyActions: [
          'Inspect Mezuzot on your doorways to ensure Kosher writing.',
          'Recite Psalm 91 before sleeping.'
        ],
        charityOrGoodDeed: 'Give Tzedakah anonymously (Matan B\'Seter).',
        bestTime: 'Nightfall before sleep',
        authenticReference: 'Genesis 49:22 & Zohar'
      },
      exams: {
        id: 'jew-exa',
        problem: 'Difficulty concentrating, memory retention, or academic stress.',
        rootCause: 'Need for illumination of the Sephirah of Chokhmah and Binah.',
        medium: 'jewish',
        prayerOrMantra: 'Ahavat Olam prayer & Psalm 119 Nun section ("Your word is a lamp to my feet")',
        dailyActions: [
          'Engage in daily study of Torah or wisdom text (Chavruta study).',
          'Review notes systematically with clear intention.'
        ],
        charityOrGoodDeed: 'Share notes or help fund educational books for poor students.',
        bestTime: 'Early morning study hours',
        authenticReference: 'Pirkei Avot Chapter 2'
      },
      marriage: {
        id: 'jew-mar',
        problem: 'Longing to find a soulmate (Bashert) or marital harmony.',
        rootCause: 'Unification of souls requiring divine heavenly decree.',
        medium: 'jewish',
        prayerOrMantra: 'Tefillat HaZivug & Psalm 121 / Seven Blessings',
        dailyActions: [
          'Light candles for soul alignment on Eve of Rosh Chodesh.',
          'Develop character traits of humility and patience.'
        ],
        charityOrGoodDeed: 'Contribute to weddings of underprivileged couples.',
        bestTime: 'Rosh Chodesh (New Moon)',
        authenticReference: 'Talmud Sotah 2a & Zohar'
      },
      istikhara: {
        id: 'jew-ist',
        problem: 'Crossroads in life choices needing Hashgacha Pratit (Divine Guidance).',
        rootCause: 'Doubt obscuring God\'s hidden providence.',
        medium: 'jewish',
        prayerOrMantra: 'Psalm 25:4-5 - "Show me your ways, Lord, teach me your paths."',
        dailyActions: [
          'Engage in Hitbodedut (outloud conversation with God in a private room or field).',
          'Consult with a Torah scholar or wise mentor.'
        ],
        charityOrGoodDeed: 'Perform an unexpected act of loving-kindness.',
        bestTime: 'Midnight (Tikkun Chatzot hour)',
        authenticReference: 'Psalms 25 & Likutey Moharan'
      }
    },

    buddhist: {
      career: {
        id: 'bud-car',
        problem: 'Workplace stress, lack of meaningful work, or career obstacles.',
        rootCause: 'Karmic impressions (Samskara) and practice of wrong livelihood.',
        medium: 'buddhist',
        prayerOrMantra: 'Heart Sutra Mantra: "Gate Gate Paragate Parasamgate Bodhi Svaha"',
        dailyActions: [
          'Align work with Right Livelihood (Eightfold Path) causing no harm.',
          'Dedicate merit of your daily work for the benefit of all sentient beings.'
        ],
        charityOrGoodDeed: 'Practice Dana (generosity) by donating skills to community.',
        bestTime: 'Early morning meditation',
        authenticReference: 'Heart Sutra & Dhammapada'
      },
      relationship: {
        id: 'bud-rel',
        problem: 'Attachment pain, interpersonal conflict, or feeling isolated.',
        rootCause: 'Clinging (Upadana) and unrealistic expectations based on ego.',
        medium: 'buddhist',
        prayerOrMantra: 'Metta Meditation Prayer: "May all beings be happy, peaceful, and liberated."',
        dailyActions: [
          'Practice 15 minutes of Metta Bhavana (Loving-Kindness Meditation) daily.',
          'Reflect on impermanence (Anicca) to reduce attachment-driven anger.'
        ],
        charityOrGoodDeed: 'Offer forgiveness to someone who hurt you.',
        bestTime: 'Morning and Evening seat',
        authenticReference: 'Karaniya Metta Sutta'
      },
      health: {
        id: 'bud-hea',
        problem: 'Physical disease, pain, or low energy body.',
        rootCause: 'Karmic imbalance affecting the 5 Aggregates (Skandhas).',
        medium: 'buddhist',
        prayerOrMantra: 'Medicine Buddha Mantra: "Tayata Om Bhekhandzye Bhekhandzye Maha Bhekhandzye Radza Samudgate Soha"',
        dailyActions: [
          'Visualize lapis lazuli blue healing light filling your body.',
          'Practice mindful body scan meditation twice daily.'
        ],
        charityOrGoodDeed: 'Save lives of animals destined for slaughter (Life Release).',
        bestTime: 'Sunrise hour',
        authenticReference: 'Medicine Buddha Sutra'
      },
      finance: {
        id: 'bud-fin',
        problem: 'Financial poverty mindset or material scarcity.',
        rootCause: 'Past stinginess or lack of cultivating seeds of generosity.',
        medium: 'buddhist',
        prayerOrMantra: 'Green Tara Mantra: "Om Tare Tuttare Ture Soha"',
        dailyActions: [
          'Cultivate open-handed generosity (Dana) without expectation of return.',
          'Simplify lifestyle and reduce unnecessary consumer desires.'
        ],
        charityOrGoodDeed: 'Support monks, nuns, or community food banks.',
        bestTime: 'Morning offering hour',
        authenticReference: 'Green Tara Dharani & Sigalovada Sutta'
      },
      peace: {
        id: 'bud-pea',
        problem: 'Restlessness, racing thoughts, and loss of serenity.',
        rootCause: 'Mental pollution by the Three Poisons: Greed, Anger, and Ignorance.',
        medium: 'buddhist',
        prayerOrMantra: 'Om Mani Padme Hum (Mantra of Compassion)',
        dailyActions: [
          'Practice Anapanasati (Mindfulness of Breathing) for 20 minutes daily.',
          'Observe thoughts without judgment as passing clouds.'
        ],
        charityOrGoodDeed: 'Create a quiet space for others to rest or meditate.',
        bestTime: 'Sunset hour',
        authenticReference: 'Maha Satipatthana Sutta'
      },
      anxiety: {
        id: 'bud-anx',
        problem: 'Fear, existential dread, and emotional instability.',
        rootCause: 'Delusion of a separate permanent self (Anatta misunderstanding).',
        medium: 'buddhist',
        prayerOrMantra: 'Refuge in the Three Jewels: "Namo Buddhaya, Namo Dharmaya, Namo Sanghaya"',
        dailyActions: [
          'Anchor awareness in the present moment (Here and Now).',
          'Recite Om Mani Padme Hum on mala beads during panic moments.'
        ],
        charityOrGoodDeed: 'Comfort animal shelters or lonely seniors.',
        bestTime: 'Early morning sit',
        authenticReference: 'Dhammapada Chapter 1'
      },
      protection: {
        id: 'bud-pro',
        problem: 'Protection against negative spirits, bad karma, and psychic disturbance.',
        rootCause: 'Negative karmic seeds ripening into obstructive circumstances.',
        medium: 'buddhist',
        prayerOrMantra: 'Great Compassion Mantra (Nikantha Dharani) & White Umbrella Tara',
        dailyActions: [
          'Chant protective Paritta Suttas every night before sleep.',
          'Keep your mind grounded in non-violence (Ahimsa).'
        ],
        charityOrGoodDeed: 'Plant flowers and care for trees in sacred spaces.',
        bestTime: 'Nightfall seat',
        authenticReference: 'Ratana Sutta & Heart Sutra'
      },
      exams: {
        id: 'bud-exa',
        problem: 'Mental fog, lack of focus, and study anxiety.',
        rootCause: 'Dullness (Thina-Middha) obscuring natural Buddha-nature wisdom.',
        medium: 'buddhist',
        prayerOrMantra: 'Manjushri Mantra of Wisdom: "Om A Ra Pa Cha Na Dhih"',
        dailyActions: [
          'Chant "Dhih" repeatedly while focusing light at forehead.',
          'Practice single-pointed concentration (Samatha) before studying.'
        ],
        charityOrGoodDeed: 'Share educational materials with disadvantaged kids.',
        bestTime: 'Morning study hour',
        authenticReference: 'Manjushri Namasamgiti'
      },
      marriage: {
        id: 'bud-mar',
        problem: 'Discord in partnership or difficulty attracting a peaceful companion.',
        rootCause: 'Karmic disharmony and lack of mutual spiritual direction.',
        medium: 'buddhist',
        prayerOrMantra: 'Mangala Sutta (Highest Blessings) & Metta Mantra',
        dailyActions: [
          'Practice deep listening (Sati) without interrupting your partner.',
          'Cultivate Mudita (sympathetic joy for partner\'s happiness).'
        ],
        charityOrGoodDeed: 'Help care for orphans or families in need.',
        bestTime: 'Evening reflection',
        authenticReference: 'Mangala Sutta'
      },
      istikhara: {
        id: 'bud-ist',
        problem: 'Uncertainty in major life directions requiring inner wisdom.',
        rootCause: 'Clouded perception due to emotional aversion or preference.',
        medium: 'buddhist',
        prayerOrMantra: 'Prajnaparamita Mantra & Silent Vipassana Inquiry',
        dailyActions: [
          'Sit in silent Vipassana insight meditation to observe inner inclination.',
          'Walk along the Middle Way avoiding extremes of impulsive action.'
        ],
        charityOrGoodDeed: 'Offer tea or quiet hospitality to elders.',
        bestTime: 'Dawn hour',
        authenticReference: 'Diamond Sutra & Majjhima Nikaya'
      }
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
        authenticReference: 'I Ching & BaZi Classics'
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
        authenticReference: 'Tao Te Ching Chapter 78'
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
        authenticReference: 'Huangdi Neijing (Yellow Emperor\'s Classic)'
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
        authenticReference: 'Feng Shui Water Method Classics'
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
        authenticReference: 'Tao Te Ching Chapter 16'
      },
      anxiety: {
        id: 'chi-anx',
        problem: 'Unstable mood, liver Qi stagnation, and fear.',
        rootCause: 'Wood Qi stagnation affecting Shen (spirit) in Heart.',
        medium: 'chinese',
        prayerOrMantra: 'Shen Grounding Affirmation: "Rooted like Earth, tranquil like calm water."',
        dailyActions: [
          'Perform 10 minutes of kidney and liver Qigong tapping.',
          'Soak feet in warm water with ginger before bedtime.'
        ],
        charityOrGoodDeed: 'Care for gardens or park trees.',
        bestTime: 'Rat Hour (11:00 PM - 1:00 AM)',
        authenticReference: 'Taoist Medical Qigong Classics'
      },
      protection: {
        id: 'chi-pro',
        problem: 'Sha Qi (negative energy knife), bad luck transits, or envious energy.',
        rootCause: 'Energy clash with Tai Sui (Grand Duke Jupiter).',
        medium: 'chinese',
        prayerOrMantra: 'Tai Sui Protection Affirmation: "Harmonize with time; walk in alignment."',
        dailyActions: [
          'Hang a Bagua mirror or gourds (Wu Lou) at main door.',
          'Wear a red obsidian or jade bracelet for grounding.'
        ],
        charityOrGoodDeed: 'Support temple renovations or public parks.',
        bestTime: 'Morning Dragon Hour',
        authenticReference: 'Imperial Feng Shui Almanacs'
      },
      exams: {
        id: 'chi-exa',
        problem: 'Difficulty with memory, academic pressure, and test anxiety.',
        rootCause: 'Weak Wenchang Star in natal or annual Flying Star grid.',
        medium: 'chinese',
        prayerOrMantra: 'Wenchang Wisdom Invocation: "Clarity of mind, sharpness of thought."',
        dailyActions: [
          'Place 4 stems of lucky bamboo in water at North-East of study desk.',
          'Keep study area lit with natural light.'
        ],
        charityOrGoodDeed: 'Donate stationeries to poor village children.',
        bestTime: 'Snake Hour (9:00 AM - 11:00 AM)',
        authenticReference: 'Wenchang Emperor Texts'
      },
      marriage: {
        id: 'chi-mar',
        problem: 'Peach Blossom luck friction or delay in marriage.',
        rootCause: 'Afflicted Peach Blossom (Tao Hua) position in BaZi.',
        medium: 'chinese',
        prayerOrMantra: 'Yue Lao (Moon Matchmaker) Affirmation: "Threads of destiny tie souls in peace."',
        dailyActions: [
          'Place fresh pink or red peonies in your Peach Blossom sector.',
          'Ensure double symbols (Double Happiness) in bedroom.'
        ],
        charityOrGoodDeed: 'Help sponsor wedding meals for poor families.',
        bestTime: 'Rooster Hour (5:00 PM - 7:00 PM)',
        authenticReference: 'Chinese Folk Traditions & BaZi'
      },
      istikhara: {
        id: 'chi-ist',
        problem: 'Uncertainty in choosing between business or life paths.',
        rootCause: 'Conflict in Five Elements requiring dynamic balance.',
        medium: 'chinese',
        prayerOrMantra: 'I Ching Hexagram Reflection: "Observe the signs of Heaven and Earth."',
        dailyActions: [
          'Consult I Ching (Book of Changes) with 3 coins ritual.',
          'Walk silently in nature to observe natural signs.'
        ],
        charityOrGoodDeed: 'Consult and respect elders in family.',
        bestTime: 'Brahma / Dragon Hour',
        authenticReference: 'I Ching (Book of Changes)'
      }
    },

    sikh: {
      career: {
        id: 'sik-car',
        problem: 'Obstacles in job, business delays, or lack of honest success.',
        rootCause: 'Forgetfulness of Naam and neglect of Kirat Karo principles.',
        medium: 'sikh',
        prayerOrMantra: 'Japji Sahib (Pauri 38) & Chaupai Sahib',
        dailyActions: [
          'Practice Kirat Karo (earn an honest living with hard work).',
          'Recite "Waheguru" 108 times before starting work.'
        ],
        charityOrGoodDeed: 'Practice Vand Chhako (share earnings with needy) & Dasvandh (10%).',
        bestTime: 'Amrit Vela (3:00 AM - 6:00 AM)',
        authenticReference: 'Sri Guru Granth Sahib Ji - Ang 1'
      },
      relationship: {
        id: 'sik-rel',
        problem: 'Family discord, misunderstanding, or delayed marriage match.',
        rootCause: 'Ego (Haumai) creating distance between hearts.',
        medium: 'sikh',
        prayerOrMantra: 'Anand Sahib (Song of Bliss) & Ardas',
        dailyActions: [
          'Practice humility (Nimrata) in all communications.',
          'Perform family Rehras Sahib together in the evening.'
        ],
        charityOrGoodDeed: 'Perform Nishkam Sewa (selfless service) at Gurdwara Langar.',
        bestTime: 'Evening Rehras hour',
        authenticReference: 'Sri Guru Granth Sahib Ji - Ramkali M.3'
      },
      health: {
        id: 'sik-hea',
        problem: 'Illness, bodily suffering, or physical weakness.',
        rootCause: 'Disconnection from divine medicine of Naam.',
        medium: 'sikh',
        prayerOrMantra: 'Dukh Bhanjan Tera Naam & Sukhmani Sahib',
        dailyActions: [
          'Listen to or recite Dukh Bhanjani Sahib daily.',
          'Drink water blessed with Naam Simran.'
        ],
        charityOrGoodDeed: 'Serve medical care or food to sick people in hospital.',
        bestTime: 'Amrit Vela hours',
        authenticReference: 'Sri Guru Granth Sahib Ji - Gauri M.5'
      },
      finance: {
        id: 'sik-fin',
        problem: 'Financial distress, debt, or lack of prosperity.',
        rootCause: 'Blockage in divine grace due to lack of sharing.',
        medium: 'sikh',
        prayerOrMantra: 'Sukhmani Sahib (Ashtapadi 11) & Ardas for Sarbat Da Bhalla',
        dailyActions: [
          'Set aside 10% Dasvandh of income for charity.',
          'Work with absolute integrity and faith.'
        ],
        charityOrGoodDeed: 'Provide food for community Langar kitchen.',
        bestTime: 'Morning Nitnem hour',
        authenticReference: 'Sri Guru Granth Sahib Ji'
      },
      peace: {
        id: 'sik-pea',
        problem: 'Inner restlessness, mental anxiety, and lack of peace.',
        rootCause: 'Mind wandering away from Remembrance of Creator.',
        medium: 'sikh',
        prayerOrMantra: 'Waheguru Naam Simran & Sukhmani Sahib',
        dailyActions: [
          'Sit in silent Simran focusing on breath and "Waheguru" chant.',
          'Listen to Kirtan (sacred music) for 20 minutes.'
        ],
        charityOrGoodDeed: 'Clean shoes of Sangat (congregation) at Gurdwara.',
        bestTime: 'Amrit Vela (3:00 AM - 5:00 AM)',
        authenticReference: 'Sri Guru Granth Sahib Ji - Ang 262'
      },
      anxiety: {
        id: 'sik-anx',
        problem: 'Fear of future, panic, and grief.',
        rootCause: 'Ego-driven fear forgetting that God is the supreme protector.',
        medium: 'sikh',
        prayerOrMantra: 'Tav-Prasad Savaiye & Chaupai Sahib',
        dailyActions: [
          'Recite Benti Chaupai Sahib for courage and protection.',
          'Remind self: "Nirbhau Nirvair" (Without Fear, Without Hatred).'
        ],
        charityOrGoodDeed: 'Distribute blankets or warm clothes to poor.',
        bestTime: 'Night Sohila prayer before sleep',
        authenticReference: 'Dasam Granth & Nitnem'
      },
      protection: {
        id: 'sik-pro',
        problem: 'Protection against evil forces, enemies, and harm.',
        rootCause: 'Spiritual vulnerability requiring Divine Shield.',
        medium: 'sikh',
        prayerOrMantra: 'Jaap Sahib & Chandi Di Var / Ardas',
        dailyActions: [
          'Recite Sohila Sahib before sleeping at night.',
          'Maintain purity of mind, body, and speech.'
        ],
        charityOrGoodDeed: 'Stand up and defend the weak and oppressed.',
        bestTime: 'Nightfall hour',
        authenticReference: 'Dasam Granth'
      },
      exams: {
        id: 'sik-exa',
        problem: 'Study stress, memory retention difficulty, and focus loss.',
        rootCause: 'Scattered mind requiring focused Naad (sound current).',
        medium: 'sikh',
        prayerOrMantra: 'Japji Sahib Pauri 1 & "Satnam Waheguru" chant',
        dailyActions: [
          'Do 5 minutes of Naam Simran before opening textbooks.',
          'Study in quiet early morning hours.'
        ],
        charityOrGoodDeed: 'Help fellow students with books and study guidance.',
        bestTime: 'Amrit Vela study hours',
        authenticReference: 'Japji Sahib'
      },
      marriage: {
        id: 'sik-mar',
        problem: 'Delay in Anand Karaj (marriage union) or marital friction.',
        rootCause: 'Lack of spiritual unity between souls.',
        medium: 'sikh',
        prayerOrMantra: 'Laavan (4 Sacred Wedding Hymns) & Ardas',
        dailyActions: [
          'Read Suhi Mahala 4 Laavan hymns with deep reflection.',
          'Practice unconditional respect and devotion.'
        ],
        charityOrGoodDeed: 'Support marriages of underprivileged girls.',
        bestTime: 'Morning Nitnem hour',
        authenticReference: 'Sri Guru Granth Sahib Ji - Ang 773'
      },
      istikhara: {
        id: 'sik-ist',
        problem: 'Indecision regarding career, business, or life choices.',
        rootCause: 'Human intellect trying to override Divine Will (Hukam).',
        medium: 'sikh',
        prayerOrMantra: 'Hukamnama & Ardas for Divine Direction',
        dailyActions: [
          'Perform sincere Ardas asking Guru Ji for clear guidance.',
          'Take Hukamnama from Sri Guru Granth Sahib Ji and reflect.'
        ],
        charityOrGoodDeed: 'Seek counsel from wise Gurmukh elders.',
        bestTime: 'Amrit Vela after Nitnem',
        authenticReference: 'Sri Guru Granth Sahib Ji'
      }
    },

    indigenous: {
      career: {
        id: 'ind-car',
        problem: 'Disconnect from life purpose, career confusion, or dishonored talent.',
        rootCause: 'Out of balance with Medicine Wheel North (Wisdom & Calling).',
        medium: 'indigenous',
        prayerOrMantra: 'Great Spirit Invocation: "Grandfathers, guide my footsteps in honor and truth."',
        dailyActions: [
          'Smudge workspace with White Sage or Sweetgrass morning ritual.',
          'Align career goals with 7 Grandfather Teachings (Honesty, Courage).'
        ],
        charityOrGoodDeed: 'Mentor indigenous youth or local community members.',
        bestTime: 'Sunrise facing East',
        authenticReference: '7 Grandfather Teachings & Medicine Wheel'
      },
      relationship: {
        id: 'ind-rel',
        problem: 'Conflict in family circle or disconnection from community.',
        rootCause: 'Broken sacred hoop and lack of active listening in circle.',
        medium: 'indigenous',
        prayerOrMantra: 'Mitakuye Oyasin ("All My Relations" Sacred Union Prayer)',
        dailyActions: [
          'Practice Talking Circle etiquette: listen without judgment.',
          'Offer tobacco (Asemaa) to Mother Earth with gratitude.'
        ],
        charityOrGoodDeed: 'Share food harvest or cook for community elders.',
        bestTime: 'Sunset fire hour',
        authenticReference: 'Lakota / Anishinaabe Sacred Teachings'
      },
      health: {
        id: 'ind-hea',
        problem: 'Physical disease, emotional heaviness, or low spirit.',
        rootCause: 'Disconnection from Earth energy and plant spirit medicines.',
        medium: 'indigenous',
        prayerOrMantra: 'Medicine Wheel East Prayer: "Breathe in life, illumination, and renewal."',
        dailyActions: [
          'Take a cedar bath or smudge body from head to toe.',
          'Walk barefoot on bare earth (grounding) for 15 minutes daily.'
        ],
        charityOrGoodDeed: 'Protect local water sources and natural sacred lands.',
        bestTime: 'Dawn hour',
        authenticReference: 'Traditional Native Plant Medicine'
      },
      finance: {
        id: 'ind-fin',
        problem: 'Resource scarcity or financial imbalance.',
        rootCause: 'Violating principle of Reciprocity (taking without giving back).',
        medium: 'indigenous',
        prayerOrMantra: 'Abundance Prayer: "Mother Earth provides for all when shared with honor."',
        dailyActions: [
          'Make an offering of tobacco or cornmeal to nature before receiving.',
          'Share excess wealth with elders and children in need.'
        ],
        charityOrGoodDeed: 'Support tribal food sovereignty programs.',
        bestTime: 'Midday solar hour',
        authenticReference: 'Indigenous Reciprocity Laws'
      },
      peace: {
        id: 'ind-pea',
        problem: 'Mental turbulence, noise, and spiritual confusion.',
        rootCause: 'Severed connection with sacred elements (Earth, Water, Fire, Air).',
        medium: 'indigenous',
        prayerOrMantra: '4 Directions Prayer: "East for illumination, South for growth, West for introspection, North for wisdom."',
        dailyActions: [
          'Sit quietly near water or trees for 20 minutes daily.',
          'Drum or listen to sacred flute music to restore natural rhythm.'
        ],
        charityOrGoodDeed: 'Help clean up a local riverbed or forest trail.',
        bestTime: 'Twilight hour',
        authenticReference: 'Four Directions Wisdom'
      },
      anxiety: {
        id: 'ind-anx',
        problem: 'Panic, bad dreams, or fear of negative forces.',
        rootCause: 'Weakness in protective medicine aura.',
        medium: 'indigenous',
        prayerOrMantra: 'Protective Song: "Great Eagle, carry away fear on swift wings."',
        dailyActions: [
          'Hang a consecrated Dreamcatcher above your bed.',
          'Smudge room with sage and cedar before sleep.'
        ],
        charityOrGoodDeed: 'Donate blankets to homeless shelters.',
        bestTime: 'Nightfall hour',
        authenticReference: 'Traditional Ojibwe Teachings'
      },
      protection: {
        id: 'ind-pro',
        problem: 'Protection from dark energies, jealous eyes, and harm.',
        rootCause: 'Negative spiritual intrusion requiring Bear Spirit shielding.',
        medium: 'indigenous',
        prayerOrMantra: 'Bear Medicine Shield Invocation & 4 Cardinal Directions Shield',
        dailyActions: [
          'Carry a piece of black tourmaline or red jasper stone.',
          'Smudge self and threshold with sweetgrass.'
        ],
        charityOrGoodDeed: 'Protect wild animals and habitats.',
        bestTime: 'Nightfall before sleep',
        authenticReference: 'Indigenous Bear Medicine Tradition'
      },
      exams: {
        id: 'ind-exa',
        problem: 'Mental sluggishness, memory blocks, and exam nerves.',
        rootCause: 'Need for Eagle Eye focus and ancestral wisdom connection.',
        medium: 'indigenous',
        prayerOrMantra: 'Eagle Medicine Invocation: "Grant me high vision and acute clarity."',
        dailyActions: [
          'Gaze at the morning sun (Sun-gazing) for 2 minutes for mental vitality.',
          'Keep study area clean and smudged.'
        ],
        charityOrGoodDeed: 'Pass down traditional knowledge to younger peers.',
        bestTime: 'Sunrise hour',
        authenticReference: 'Eagle Clan Wisdom'
      },
      marriage: {
        id: 'ind-mar',
        problem: 'Disconnection in marital bond or seeking true soulmate.',
        rootCause: 'Sacred fire between souls needing re-kindling.',
        medium: 'indigenous',
        prayerOrMantra: 'Sacred Pipe Prayer for Union & Harmony of Two Souls',
        dailyActions: [
          'Light a quiet sacred candle or small fire together.',
          'Honesty ritual: express appreciation daily.'
        ],
        charityOrGoodDeed: 'Support tribal elders and family gatherings.',
        bestTime: 'Evening fire hour',
        authenticReference: 'Sacred Pipe Ceremony Teachings'
      },
      istikhara: {
        id: 'ind-ist',
        problem: 'Crossroads in life choices needing Vision Quest insight.',
        rootCause: 'Ego noise drowning out subtle signs of nature.',
        medium: 'indigenous',
        prayerOrMantra: 'Vision Quest Prayer: "Creator, speak through nature and signs."',
        dailyActions: [
          'Spend half a day in solo wilderness reflection (Vision Quest).',
          'Pay attention to animal totems and natural signs.'
        ],
        charityOrGoodDeed: 'Give tobacco offering at the foot of an ancient tree.',
        bestTime: 'Dawn hour',
        authenticReference: 'Vision Quest Tradition'
      }
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
        authenticReference: 'Hellenistic & Modern Astrological Affirmations'
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
        authenticReference: 'Western Archetypal Astrology'
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
        authenticReference: 'Medical Astrology & Wellness'
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
        authenticReference: 'Financial Astrology & Mindset'
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
        authenticReference: 'Contemplative Western Hermetics'
      },
      anxiety: {
        id: 'wes-anx',
        problem: 'Overthinking, panic attacks, and future worry.',
        rootCause: 'Uranus hard aspect to natal Moon or Mercury.',
        medium: 'western',
        prayerOrMantra: 'Affirmation: "I am safe in this present moment; peace grounds my mind."',
        dailyActions: [
          'Practice 4-7-8 nervous system breathwork twice daily.',
          'Write down automatic thoughts and rational re-framings.'
        ],
        charityOrGoodDeed: 'Support mental health helpline initiatives.',
        bestTime: 'Morning sun hour',
        authenticReference: 'Psychological Astrology & CBT'
      },
      protection: {
        id: 'wes-pro',
        problem: 'Feeling energetically drained or absorb others\' negative emotions.',
        rootCause: 'Empathic vulnerability and 12th House Neptune sensitivity.',
        medium: 'western',
        prayerOrMantra: 'Affirmation: "A shield of divine white light surrounds and protects my aura."',
        dailyActions: [
          'Visualize a glowing sphere of golden light around body morning and night.',
          'Perform energetic cord cutting meditation post social interactions.'
        ],
        charityOrGoodDeed: 'Help clean up local urban environments.',
        bestTime: 'Bedtime hour',
        authenticReference: 'Western Hermetic Energy Shielding'
      },
      exams: {
        id: 'wes-exa',
        problem: 'Focus difficulty, exam anxiety, and information retention stress.',
        rootCause: 'Mercury square Saturn or 3rd House blockage.',
        medium: 'western',
        prayerOrMantra: 'Affirmation: "My mind absorbs knowledge easily, accurately, and effortlessly."',
        dailyActions: [
          'Use Pomodoro technique (25 min study, 5 min rest).',
          'Review summary notes right before sleeping.'
        ],
        charityOrGoodDeed: 'Help organize study groups for peers.',
        bestTime: 'Morning study hours',
        authenticReference: 'Cognitive Science & Hermetic Learning'
      },
      marriage: {
        id: 'wes-mar',
        problem: 'Relational distance or seeking a compatible life partner.',
        rootCause: '7th House Venus / Juno asteroid transits.',
        medium: 'western',
        prayerOrMantra: 'Affirmation: "I attract and cultivate a harmonious, equal, and loving partnership."',
        dailyActions: [
          'Create a vision board of shared values and qualities.',
          'Express authentic vulnerability with your partner.'
        ],
        charityOrGoodDeed: 'Support community family counseling centers.',
        bestTime: 'Friday Venus hour',
        authenticReference: 'Synastry & Relationship Astrology'
      },
      istikhara: {
        id: 'wes-ist',
        problem: 'Dilemma between career paths or major life choices.',
        rootCause: 'Transiting Jupiter forming opposition or square to natal Sun.',
        medium: 'western',
        prayerOrMantra: 'Affirmation: "My higher self reveals the optimal path with absolute clarity."',
        dailyActions: [
          'Conduct a Pros & Cons Values Audit matrix.',
          'Meditate quietly for 15 minutes asking for intuitive dreams.'
        ],
        charityOrGoodDeed: 'Share non-biased advice with someone seeking guidance.',
        bestTime: 'New Moon intention hour',
        authenticReference: 'Horary Astrology & Intuitive Guidance'
      }
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
        authenticReference: 'Universal Humanist Wisdom'
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
        authenticReference: 'Universal Non-Violent Communication'
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
        authenticReference: 'Holistic Health Principles'
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
        authenticReference: 'Universal Stewardship Principles'
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
        authenticReference: 'Universal Mindfulness Practice'
      },
      anxiety: {
        id: 'uni-anx',
        problem: 'Emotional overload, stress, and nervous system tension.',
        rootCause: 'Overactive sympathetic nervous system response.',
        medium: 'universal',
        prayerOrMantra: 'Universal Affirmation: "I breathe in peace, I breathe out tension. All is well."',
        dailyActions: [
          'Practice box breathing (4 sec in, 4 hold, 4 out, 4 hold).',
          'Limit caffeine and screen exposure.'
        ],
        charityOrGoodDeed: 'Support mental wellness community groups.',
        bestTime: 'Midday pause hour',
        authenticReference: 'Universal Somatic Healing'
      },
      protection: {
        id: 'uni-pro',
        problem: 'Sensory overload and negative environment impact.',
        rootCause: 'Lack of energetic boundaries.',
        medium: 'universal',
        prayerOrMantra: 'Universal Affirmation: "My inner calm is untouched by outer storms."',
        dailyActions: [
          'Establish clear personal boundaries.',
          'Keep your workspace clean and organized.'
        ],
        charityOrGoodDeed: 'Plant a tree or flower garden.',
        bestTime: 'Morning routine',
        authenticReference: 'Universal Energy Hygiene'
      },
      exams: {
        id: 'uni-exa',
        problem: 'Exam stress and memory retention issues.',
        rootCause: 'Performance pressure and lack of spaced learning.',
        medium: 'universal',
        prayerOrMantra: 'Universal Affirmation: "Focus, understanding, and recall come naturally to me."',
        dailyActions: [
          'Practice spaced repetition study technique.',
          'Get 8 hours of sleep before exam day.'
        ],
        charityOrGoodDeed: 'Help a student with learning tools.',
        bestTime: 'Morning study window',
        authenticReference: 'Universal Learning Science'
      },
      marriage: {
        id: 'uni-mar',
        problem: 'Partnership friction or seeking mutual life vision.',
        rootCause: 'Divergent goals and unexpressed needs.',
        medium: 'universal',
        prayerOrMantra: 'Universal Prayer: "May love, mutual honor, and understanding guide our union."',
        dailyActions: [
          'Schedule weekly quality time without phones.',
          'Appreciate partner\'s unique contributions.'
        ],
        charityOrGoodDeed: 'Assist families experiencing hardship.',
        bestTime: 'Weekend evening',
        authenticReference: 'Universal Human Values'
      },
      istikhara: {
        id: 'uni-ist',
        problem: 'Indecision regarding major life transitions.',
        rootCause: 'Cognitive overload and emotional bias.',
        medium: 'universal',
        prayerOrMantra: 'Universal Prayer: "May clarity emerge through quiet awareness and truth."',
        dailyActions: [
          'Write down intuition notes upon waking.',
          'Take a quiet solo walk to let thoughts settle.'
        ],
        charityOrGoodDeed: 'Help someone make an informed decision.',
        bestTime: 'Dawn contemplation',
        authenticReference: 'Universal Intuitive Discernment'
      }
    }
  };

  const fallbackRemedy: ProblemSolutionRemedy = {
    id: `${selectedMedium}-${selectedCategory}-fallback`,
    problem: `Guidance and solutions for ${selectedCategory} under ${selectedMedium} wisdom tradition.`,
    rootCause: 'Planetary or energetic friction affecting this life focus area.',
    medium: selectedMedium,
    prayerOrMantra: 'Practice daily mindfulness, positive intention, and spiritual reflection.',
    dailyActions: [
      'Maintain a consistent daily spiritual practice and reflection.',
      'Align your actions with moral integrity and purpose.'
    ],
    charityOrGoodDeed: 'Perform an act of kindness or charity to someone in need.',
    bestTime: 'Morning sunrise or evening quiet hours',
    authenticReference: 'Universal Wisdom Tradition'
  };

  const activeRemedy: ProblemSolutionRemedy = 
    remediesDatabase[selectedMedium]?.[selectedCategory] || fallbackRemedy;

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
            Select your preferred wisdom medium (Islamic, Vedic, Christian, Jewish, Buddhist, Chinese, Sikh, Indigenous, Western, or Universal) to receive targeted prayers, mantras, daily actions, and charitable deeds.
          </p>
        </div>
      </div>

      {/* 1. SELECT WISDOM MEDIUM */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Step 1: Choose Your Preferred Wisdom Medium
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {[
            { id: 'islamic', name: 'Islamic (Du\'a/Azkar)', icon: '🌙' },
            { id: 'vedic', name: 'Vedic (Mantra/Puja)', icon: '🕉️' },
            { id: 'christian', name: 'Christian (Psalms)', icon: '✝️' },
            { id: 'jewish', name: 'Jewish (Kabbalah)', icon: '✡️' },
            { id: 'buddhist', name: 'Buddhist (Mindfulness)', icon: '☸️' },
            { id: 'chinese', name: 'Chinese (Feng Shui)', icon: '☯️' },
            { id: 'sikh', name: 'Sikh (Nām Simran)', icon: 'ੴ' },
            { id: 'indigenous', name: 'Indigenous (Medicine Wheel)', icon: '🦅' },
            { id: 'western', name: 'Western (Affirmations)', icon: '⭐' },
            { id: 'universal', name: 'Universal (Mindful)', icon: '🌐' },
          ].map((med) => (
            <button
              key={med.id}
              onClick={() => setSelectedMedium(med.id as WisdomMedium)}
              className={`p-3 rounded-2xl text-[11px] font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                selectedMedium === med.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/10 scale-105'
                  : 'glass-card text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="text-base">{med.icon}</span>
              <span className="text-center truncate w-full">{med.name}</span>
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
            { id: 'health', name: '🌿 Health & Vitality' },
            { id: 'finance', name: '💰 Wealth & Debt Relief' },
            { id: 'peace', name: '🧘 Inner Peace & Stillness' },
            { id: 'anxiety', name: '🛡️ Anxiety & Stress Relief' },
            { id: 'protection', name: '🧿 Protection & Aura Shield' },
            { id: 'exams', name: '🎓 Success in Exams & Focus' },
            { id: 'marriage', name: '💍 Marriage & Life Partner' },
            { id: 'istikhara', name: '✨ Decision Guidance & Istikhara' },
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
                {activeRemedy?.dailyActions?.map((act, idx) => (
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
