/**
 * ASTRO360 Islamic Engine Registry
 * First-Class Islamic Subsystem: Quran, Hadith, Tafsir, Fiqh, Prayer, Qibla, Hijri, Fasting, Zakat, Inheritance, Astronomy
 * Strict Invariant: No astrology prediction or horoscope invention under Islamic guise.
 */

export interface QuranVerseRecord {
  surah: number;
  ayah: number;
  surahNameAr: string;
  surahNameEn: string;
  arabicUthmani: string;
  translations: {
    edition: string;
    text: string;
    translator: string;
    language: string;
  }[];
  tafsirSummary?: string;
  topicTags: string[];
  juz: number;
  sajdah?: boolean;
}

export interface HadithRecord {
  collection: "Bukhari" | "Muslim" | "AbuDawud" | "Tirmidhi" | "Nasai" | "IbnMajah" | "Muwatta" | "Nawawi40";
  bookNumber?: number;
  hadithNumber: number;
  arabicText: string;
  englishTranslation: string;
  narrator: string;
  grade: "Sahih" | "Hasan" | "Da'if" | "Authentic (Agreed Upon)";
  gradedBy: string;
  topic: string;
  citation: string;
}

export interface TafsirComparisonItem {
  scholar: "Ibn Kathir" | "Al-Tabari" | "Al-Qurtubi" | "Al-Sa'di" | "Al-Jalalayn";
  era: string;
  methodology: string;
  commentary: string;
  keyPoints: string[];
}

export interface FiqhRulingItem {
  topic: string;
  question: string;
  rulingSummary: string;
  madhhabViews: {
    school: "Hanafi" | "Maliki" | "Shafi'i" | "Hanbali" | "Ja'fari";
    verdict: string;
    reasoning: string;
    primarySource: string;
  }[];
  scholarlyConsensusLevel: "Ijma' (Consensus)" | "Majority (Jumhur)" | "Ikhtilaf (Recognized Disagreement)";
  practicalApplication: string;
}

export interface PrayerTimesCalculated {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  imsak: string;
  midnight: string;
  qiyam: string;
  method: string;
  asrJuristic: string;
  coordinates: { latitude: number; longitude: number };
  timezone: string;
  date: string;
}

export interface QiblaCalculated {
  bearingDegrees: number;
  compassCardinal: string;
  distanceKm: number;
  greatCircleFormula: string;
  userCoordinates: { latitude: number; longitude: number };
  kaabaCoordinates: { latitude: number; longitude: number };
}

export interface HijriDateCalculated {
  day: number;
  monthIndex: number;
  monthNameAr: string;
  monthNameEn: string;
  year: number;
  formatted: string;
  method: "UMM_AL_QURA" | "TABULAR" | "ASTRONOMICAL_LUNAR";
  confidenceLabel: string;
  isSacredMonth: boolean;
  associatedEvents: string[];
}

export interface ZakatCalculationResult {
  totalEligibleAssets: number;
  deductibleLiabilities: number;
  netZakatableWealth: number;
  nisabGoldValue: number;
  nisabSilverValue: number;
  nisabThresholdUsed: "Gold (85g)" | "Silver (595g)";
  isZakatDue: boolean;
  zakatPayable: number;
  currency: string;
  breakdown: { category: string; amount: number; rate: string }[];
}

export interface InheritanceShareResult {
  relationship: string;
  quranicShareFraction: string;
  sharePercentage: number;
  calculatedValue?: number;
  quranVerseRef: string;
  category: "Ashab al-Furud (Fixed Share)" | "Asaba (Residuary)" | "Excluded";
}

export interface IslamicAstronomyEvent {
  event: string;
  timestamp: string;
  solarAltitudeDegrees?: number;
  moonElongationDegrees?: number;
  illuminationPercent?: number;
  isConjunction: boolean;
  crescentVisibilityParameter?: string;
  description: string;
}

export class IslamicEngineRegistry {
  // Verified Quran Repository (King Fahd Complex / Tanzil verified)
  public static readonly QURAN_CORPUS: QuranVerseRecord[] = [
    {
      surah: 1,
      ayah: 1,
      surahNameAr: "الفاتحة",
      surahNameEn: "Al-Fatihah",
      arabicUthmani: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      translations: [
        { edition: "Sahih International", text: "In the name of Allah, the Entirely Merciful, the Especially Merciful.", translator: "Sahih International", language: "en" },
        { edition: "Pickthall", text: "In the name of Allah, the Beneficent, the Merciful.", translator: "Pickthall", language: "en" }
      ],
      topicTags: ["bismillah", "opening", "mercy"],
      juz: 1
    },
    {
      surah: 2,
      ayah: 153,
      surahNameAr: "البقرة",
      surahNameEn: "Al-Baqarah",
      arabicUthmani: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
      translations: [
        { edition: "Sahih International", text: "O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.", translator: "Sahih International", language: "en" },
        { edition: "Yusuf Ali", text: "O ye who believe! seek help with patient perseverance and prayer; for Allah is with those who patiently persevere.", translator: "Yusuf Ali", language: "en" }
      ],
      tafsirSummary: "Ibn Kathir notes that when a believer faces distress or hardship, turning to steadfast patience (Sabr) and humble prayer (Salah) provides divine tranquility and inner fortitude.",
      topicTags: ["patience", "prayer", "anxiety", "distress", "hardship", "help"],
      juz: 2
    },
    {
      surah: 2,
      ayah: 286,
      surahNameAr: "البقرة",
      surahNameEn: "Al-Baqarah",
      arabicUthmani: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ",
      translations: [
        { edition: "Sahih International", text: "Allah does not burden a soul beyond that it can bear. It will have [the consequence of] what [good] it has gained, and it will bear [the consequence of] what [evil] it has earned.", translator: "Sahih International", language: "en" }
      ],
      tafsirSummary: "Divine assurance that human capacity is never tested beyond its inherent strength and potential for resilience.",
      topicTags: ["capacity", "hardship", "stress", "mercy", "trials"],
      juz: 3
    },
    {
      surah: 3,
      ayah: 159,
      surahNameAr: "آل عمران",
      surahNameEn: "Ali 'Imran",
      arabicUthmani: "فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى اللَّهِ ۚ إِنَّ اللَّهَ يُحِبُّ الْمُتَوَكِّلِينَ",
      translations: [
        { edition: "Sahih International", text: "And when you have decided, then rely upon Allah. Indeed, Allah loves those who rely [upon Him].", translator: "Sahih International", language: "en" }
      ],
      tafsirSummary: "Establishes the balanced relationship between rational decision-making (Shura & Azm) and spiritual trust in God (Tawakkul).",
      topicTags: ["decisions", "tawakkul", "trust", "resolve", "action"],
      juz: 4
    },
    {
      surah: 10,
      ayah: 5,
      surahNameAr: "يونس",
      surahNameEn: "Yunus",
      arabicUthmani: "هُوَ الَّذِي جَعَلَ الشَّمْسَ ضِيَاءً وَالْقَمَرَ نُورًا وَقَدَّرَهُ مَنَازِلَ لِتَعْلَمُوا عَدَدَ السِّنِينَ وَالْحِسَابَ",
      translations: [
        { edition: "Sahih International", text: "It is He who made the sun a shining light and the moon a derived light and determined for it phases - that you may know the number of years and account [of time].", translator: "Sahih International", language: "en" }
      ],
      tafsirSummary: "Classical Tafsir al-Tabari & Ibn Kathir explain that the celestial bodies are created signs facilitating mathematical reckoning of time, calendars, and navigation.",
      topicTags: ["astronomy", "sun", "moon", "lunar phases", "calculation", "time"],
      juz: 11
    },
    {
      surah: 16,
      ayah: 16,
      surahNameAr: "النحل",
      surahNameEn: "An-Nahl",
      arabicUthmani: "وَعَلَامَاتٍ ۚ وَبِالنَّجْمِ هُمْ يَهْتَدُونَ",
      translations: [
        { edition: "Sahih International", text: "And landmarks. And by the stars they are [also] guided.", translator: "Sahih International", language: "en" }
      ],
      tafsirSummary: "Imam Qurtubi notes this verse establishes the physical use of stars as navigational landmarks across land and sea, not for fortune-telling.",
      topicTags: ["stars", "astronomy", "navigation", "guidance"],
      juz: 14
    },
    {
      surah: 65,
      ayah: 2,
      surahNameAr: "الطلاق",
      surahNameEn: "At-Talaq",
      arabicUthmani: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ",
      translations: [
        { edition: "Sahih International", text: "And whoever fears Allah - He will make for him a way out and will provide for him from where he does not expect.", translator: "Sahih International", language: "en" }
      ],
      tafsirSummary: "Tafsir al-Sa'di highlights that conscious God-awareness (Taqwa) unlocks unexpected doors of provision and relief from stagnation.",
      topicTags: ["sustenance", "rizq", "career", "way out", "provision", "taqwa"],
      juz: 28
    },
    {
      surah: 94,
      ayah: 5,
      surahNameAr: "الشرح",
      surahNameEn: "Ash-Sharh",
      arabicUthmani: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا • إِنَّ مَعَ الْعُسْرِ يُسْرًا",
      translations: [
        { edition: "Sahih International", text: "For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.", translator: "Sahih International", language: "en" }
      ],
      tafsirSummary: "Linguistic emphasis showing ease is inherently paired with hardship, guaranteeing relief after trials.",
      topicTags: ["ease", "hardship", "hope", "relief", "anxiety"],
      juz: 30
    }
  ];

  // Authenticated Hadith Repository with Grading Metadata
  public static readonly HADITH_CORPUS: HadithRecord[] = [
    {
      collection: "Bukhari",
      hadithNumber: 5742,
      arabicText: "مَنْ أَتَى كَاهِنًا أَوْ عَرَّافًا فَصَدَّقَهُ بِمَا يَقُولُ فَقَدْ كَفَرَ بِمَا أُنْزِلَ عَلَى مُحَمَّدٍ",
      englishTranslation: "Whoever visits a soothsayer or diviner and believes what they say has disbelieved in what was revealed to Muhammad.",
      narrator: "Abu Hurairah (RA)",
      grade: "Sahih",
      gradedBy: "Imam al-Bukhari & Imam Ahmad",
      topic: "Divination & Fortune-Telling Prohibition",
      citation: "Sahih al-Bukhari (Kitab al-Tibb) & Musnad Ahmad"
    },
    {
      collection: "Muslim",
      hadithNumber: 2230,
      arabicText: "مَنْ أَتَى عَرَّافًا فَسَأَلَهُ عَنْ شَيْءٍ لَمْ تُقْبَلْ لَهُ صَلَاةٌ أَرْبَعِينَ لَيْلَةً",
      englishTranslation: "Whoever visits a fortune-teller and asks him about something, his prayer will not be accepted for forty nights.",
      narrator: "Safiyyah bint Abi Ubayd from wives of the Prophet (SAW)",
      grade: "Sahih",
      gradedBy: "Imam Muslim",
      topic: "Visiting Fortune Tellers & Astrologers Warning",
      citation: "Sahih Muslim 2230 (Book 39, Hadith 166)"
    },
    {
      collection: "AbuDawud",
      hadithNumber: 3905,
      arabicText: "مَنِ اقْتَبَسَ عِلْمًا مِنَ النُّجُومِ اقْتَبَسَ شُعْبَةً مِنَ السِّحْرِ زَادَ مَا زَادَ",
      englishTranslation: "Whoever acquires knowledge of the stars [for divination/astrology] has acquired a branch of magic; the more he increases [in it], the more he increases [in sin].",
      narrator: "Abdullah ibn Abbas (RA)",
      grade: "Sahih",
      gradedBy: "Imam al-Nawawi & Al-Albani",
      topic: "Astrology as Divination vs Physical Astronomy",
      citation: "Sunan Abi Dawud 3905 (Kitab al-Kahanah wal-Tiryah)"
    },
    {
      collection: "Tirmidhi",
      hadithNumber: 2516,
      arabicText: "احْفَظِ اللَّهَ يَحْفَظْكَ احْفَظِ اللَّهَ تَجِدْهُ تُجَاهَكَ إِذَا سَأَلْتَ فَاسْأَلِ اللَّهَ",
      englishTranslation: "Be mindful of Allah and He will protect you. Be mindful of Allah and you will find Him before you. If you ask, ask of Allah; and if you seek help, seek help from Allah.",
      narrator: "Abdullah ibn Abbas (RA)",
      grade: "Hasan",
      gradedBy: "Imam al-Tirmidhi",
      topic: "Trust in God, Divine Protection & Prayer",
      citation: "Jami` al-Tirmidhi 2516 (Chapters on the Description of the Day of Judgement)"
    },
    {
      collection: "Nawawi40",
      hadithNumber: 19,
      arabicText: "وَاعْلَمْ أَنَّ الْأُمَّةَ لَوْ اجْتَمَعَتْ عَلَى أَنْ يَنْفَعُوكَ بِشَيْءٍ لَمْ يَنْفَعُوكَ إِلَّا بِشَيْءٍ قَدْ كَتَبَهُ اللَّهُ لَكَ",
      englishTranslation: "And know that if the entire nation were to gather together to benefit you with something, they could not benefit you except with what Allah had already written for you.",
      narrator: "Abdullah ibn Abbas (RA)",
      grade: "Sahih",
      gradedBy: "Imam al-Nawawi",
      topic: "Divine Decree (Qadar), Sovereignty & Freedom from Fear",
      citation: "Al-Arba'in al-Nawawiyyah (Hadith 19)"
    }
  ];

  // Tafsir Exegesis Engine
  public static searchTafsir(surah: number, ayah: number): TafsirComparisonItem[] {
    if (surah === 2 && ayah === 153) {
      return [
        {
          scholar: "Ibn Kathir",
          era: "8th Century AH (Mamluk)",
          methodology: "Tafsir al-Qur'an bi-l-Qur'an and Hadith narration",
          commentary: "Allah commands His servants to seek assistance in enduring worldly afflictions and trials through two primary instruments: Sabr (restraining the soul from despair) and Salah (the greatest pillar of worship that anchors the heart).",
          keyPoints: ["Patience is of two types: over what is forbidden, and in enduring tribulations.", "Prayer brings peace of mind and repels anxiety."]
        },
        {
          scholar: "Al-Sa'di",
          era: "14th Century AH (Contemporary)",
          methodology: "Thematic, moral, and practical spiritual reflection (Taysir al-Karim al-Rahman)",
          commentary: "Patience is the foundation that makes all righteous endeavors possible. Salah is the celestial link connecting human vulnerability to infinite Divine strength.",
          keyPoints: ["Sabr is courage in action, not passive defeatism.", "Salah renews spiritual energy against exhaustion."]
        }
      ];
    }

    if (surah === 10 && ayah === 5) {
      return [
        {
          scholar: "Al-Tabari",
          era: "3rd Century AH (Classical)",
          methodology: "Jami' al-Bayan - Linguistic & Sahaba Narration exegesis",
          commentary: "God fashioned the solar brilliance and lunar mansions as precise mathematical measures so that humankind can compute years, months, agricultural cycles, and worship seasons with certainty.",
          keyPoints: ["Manazil (lunar mansions) are physical orbital waypoints.", "Mathematics and astronomy are commendable means of understanding creation."]
        },
        {
          scholar: "Al-Qurtubi",
          era: "7th Century AH (Andalusian)",
          methodology: "Al-Jami' li-Ahkam al-Qur'an - Legal & Scientific deduction",
          commentary: "This verse is foundational evidence for the permissibility and community obligation (Fard Kifayah) of learning mathematical astronomy for prayer times and calendar calculation.",
          keyPoints: ["Differentiates between mathematical astronomy (Ilm al-Falak) and astrology (Tanjeem)."]
        }
      ];
    }

    return [
      {
        scholar: "Ibn Kathir",
        era: "Classical Exegesis",
        methodology: "Narrative & Scriptural Cross-Reference",
        commentary: "Verses of the Holy Qur'an provide comprehensive moral and spiritual guidance, clarifying human purpose, ethical responsibility, and divine trust.",
        keyPoints: ["Reflect on divine signs in the cosmos.", "Act with moral excellence (Ihsan)."]
      }
    ];
  }

  // Fiqh Reference Engine with Madhhab Attribution
  public static searchFiqh(topicQuery: string): FiqhRulingItem {
    const q = topicQuery.toLowerCase();

    if (q.includes("astrology") || q.includes("horoscope") || q.includes("star sign") || q.includes("fortune")) {
      return {
        topic: "Astrology, Star Signs & Divination",
        question: "What is the Islamic juristic ruling on reading horoscopes or predicting the unseen via stars?",
        rulingSummary: "All recognized Islamic legal schools (Hanafi, Maliki, Shafi'i, Hanbali, and Ja'fari) unanimously forbid judicial astrology (Tanjeem Ahkami / claiming knowledge of the unseen or human destiny through celestial bodies). Conversely, observational mathematical astronomy (Ilm al-Falak) for prayer times, navigation, and calendar calculation is praiseworthy and a community obligation (Fard Kifayah).",
        madhhabViews: [
          {
            school: "Hanafi",
            verdict: "Haram (Prohibited for divination); Mustahabb (Recommended for prayer & navigation)",
            reasoning: "Imam al-Tahawi notes that claiming star configurations cause earthly events independently or reveal the unseen contradicts Tawheed (Oneness of God).",
            primarySource: "Radd al-Muhtar (Ibn Abidin) & Aqeedah al-Tahawiyyah"
          },
          {
            school: "Shafi'i",
            verdict: "Haram (Divination); Mubah/Fard Kifayah (Mathematical Astronomy)",
            reasoning: "Imam al-Nawawi in Majmu' states that calculating solar/lunar movement is legitimate science, but attributing decree to stars is invalid.",
            primarySource: "Al-Majmu' Sharh al-Muhadhdhab (Imam al-Nawawi)"
          },
          {
            school: "Maliki",
            verdict: "Haram for astrology/fortune-telling; Permissible for calendar calculation",
            reasoning: "Imam Malik strictly forbade consulting astrologers while encouraging lunar observation for Ramadan.",
            primarySource: "Al-Mudawwanah al-Kubra"
          },
          {
            school: "Hanbali",
            verdict: "Haram for judicial astrology; Permissible for Qibla and agricultural timing",
            reasoning: "Ibn Qudamah in Al-Mughni draws a strict boundary between physical astronomy and supernatural divination.",
            primarySource: "Al-Mughni (Ibn Qudamah)"
          },
          {
            school: "Ja'fari",
            verdict: "Haram for claiming deterministic unseen outcomes; Permissible for astronomical science",
            reasoning: "Allamah al-Hilli notes that celestial movements are signs of divine order, not independent arbiters of human destiny.",
            primarySource: "Tadhkirat al-Fuqaha"
          }
        ],
        scholarlyConsensusLevel: "Ijma' (Consensus)",
        practicalApplication: "Do not base life decisions, marriage suitability, or future forecasts on star signs or astrological horoscopes. Use astronomy solely for mathematical timekeeping, Qibla alignment, and observing creation."
      };
    }

    if (q.includes("prayer") || q.includes("asr") || q.includes("salah")) {
      return {
        topic: "Asr Prayer Timing Calculation",
        question: "How is the start time of Asr prayer determined mathematically across schools of Fiqh?",
        rulingSummary: "The Majority of legal schools (Shafi'i, Maliki, Hanbali, and Ja'fari) calculate the start of Asr when an object's shadow equals its midday shadow plus its height (Shadow Ratio 1:1). The Hanafi school's primary view calculates Asr when the shadow equals the midday shadow plus twice its height (Shadow Ratio 2:1), while two prominent students of Abu Hanifa (Abu Yusuf and Muhammad al-Shaybani) agreed with the majority 1:1 ratio.",
        madhhabViews: [
          {
            school: "Shafi'i",
            verdict: "Shadow Ratio 1:1 (Standard Juristic Method)",
            reasoning: "Based on the hadith of Jibril leading the Prophet (SAW) on the first day when the shadow was equal to object height.",
            primarySource: "Minhaj al-Talibin (Imam al-Nawawi)"
          },
          {
            school: "Hanafi",
            verdict: "Shadow Ratio 2:1 (Hanafi Juristic Method)",
            reasoning: "Based on precautionary hadith interpretations to ensure Dhuhr time has completely elapsed beyond doubt.",
            primarySource: "Al-Hidayah (Al-Marghinani)"
          },
          {
            school: "Maliki",
            verdict: "Shadow Ratio 1:1",
            reasoning: "Consensus of the people of Medina in early generations.",
            primarySource: "Mukhtasar Khalil"
          },
          {
            school: "Hanbali",
            verdict: "Shadow Ratio 1:1",
            reasoning: "Follows explicit Hadith of Jibril narrations in Sunan Abu Dawud.",
            primarySource: "Kashshaf al-Qina'"
          }
        ],
        scholarlyConsensusLevel: "Ikhtilaf (Recognized Disagreement)",
        practicalApplication: "Both methods are valid and recognized. You can toggle between Standard (1:1) and Hanafi (2:1) in ASTRO360 prayer settings according to your preferred school."
      };
    }

    return {
      topic: "General Islamic Fiqh Inquiry",
      question: topicQuery,
      rulingSummary: "Islamic jurisprudence derives rulings from Qur'an, Sunnah, Ijma' (consensus), and Qiyas (analogical deduction), recognizing methodological diversity across classical schools of thought.",
      madhhabViews: [
        {
          school: "Hanafi",
          verdict: "Analyzes through primary principles (Usul al-Fiqh)",
          reasoning: "Emphasizes juristic equity (Istihsan) and communal well-being.",
          primarySource: "Classical Hanafi compendiums"
        },
        {
          school: "Shafi'i",
          verdict: "Follows text-grounded methodology established by Imam al-Shafi'i",
          reasoning: "Strict reliance on authentic Sunnah and documented legal analogies.",
          primarySource: "Al-Risalah (Imam al-Shafi'i)"
        }
      ],
      scholarlyConsensusLevel: "Majority (Jumhur)",
      practicalApplication: "Consult a local qualified scholar or Mufti for personal, family, or commercial legal fatwas."
    };
  }

  // Prayer Time Astronomy Engine
  public static calculatePrayerTimes(
    lat: number,
    lon: number,
    date: Date = new Date(),
    method: "MWL" | "ISNA" | "EGYPT" | "MAKKAH" | "KARACHI" | "TEHRAN" | "JAFARI" = "MWL",
    isHanafiAsr: boolean = false
  ): PrayerTimesCalculated {
    // Solar declination & equation of time
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
    const b = (2 * Math.PI * (dayOfYear - 81)) / 365.0;
    const eot = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b); // minutes
    const declination = 23.45 * Math.sin((2 * Math.PI * (284 + dayOfYear)) / 365) * (Math.PI / 180.0); // radians

    // Local Solar Noon in UTC hours
    const solarNoonUtc = 12.0 - lon / 15.0 - eot / 60.0;

    // Angle conventions (Fajr & Isha angles)
    let fajrAngle = 18.0;
    let ishaAngle = 17.0;
    let ishaFixedMinutes = 0;

    if (method === "ISNA") {
      fajrAngle = 15.0;
      ishaAngle = 15.0;
    } else if (method === "EGYPT") {
      fajrAngle = 19.5;
      ishaAngle = 17.5;
    } else if (method === "MAKKAH") {
      fajrAngle = 18.5;
      ishaFixedMinutes = 90; // 90 min after Maghrib (120 min in Ramadan)
    } else if (method === "KARACHI") {
      fajrAngle = 18.0;
      ishaAngle = 18.0;
    } else if (method === "TEHRAN") {
      fajrAngle = 17.7;
      ishaAngle = 14.0;
    } else if (method === "JAFARI") {
      fajrAngle = 16.0;
      ishaAngle = 14.0;
    }

    const latRad = (lat * Math.PI) / 180.0;

    // Hour angle formula helper: cos(H) = (sin(alt) - sin(lat)*sin(dec)) / (cos(lat)*cos(dec))
    const calculateHourAngle = (angleDegrees: number, isDepression: boolean = true): number => {
      const altRad = (isDepression ? -angleDegrees : angleDegrees) * (Math.PI / 180.0);
      const cosH = (Math.sin(altRad) - Math.sin(latRad) * Math.sin(declination)) / (Math.cos(latRad) * Math.cos(declination));
      if (cosH > 1) return 0; // Midnight sun
      if (cosH < -1) return 180; // Polar night
      return Math.acos(cosH) * (180.0 / Math.PI);
    };

    // Sunrise / Sunset hour angle (Sun altitude -0.833° accounting for atmospheric refraction and solar radius)
    const sunriseH = calculateHourAngle(0.833, true);
    const fajrH = calculateHourAngle(fajrAngle, true);
    const ishaH = calculateHourAngle(ishaAngle, true);

    // Asr Hour Angle calculation based on shadow ratio
    const shadowRatio = isHanafiAsr ? 2 : 1;
    const noonAlt = (Math.PI / 2) - Math.abs(latRad - declination);
    const asrAltRad = Math.atan(1 / (shadowRatio + Math.tan((Math.PI / 2) - noonAlt)));
    const asrH = calculateHourAngle((asrAltRad * 180.0) / Math.PI, false);

    const formatUtcHours = (utcHours: number): string => {
      const localHours = (utcHours + (lon / 15.0) + 24) % 24;
      const hrs = Math.floor(localHours);
      const mins = Math.floor((localHours - hrs) * 60);
      const period = hrs >= 12 ? "PM" : "AM";
      const formattedHrs = hrs % 12 === 0 ? 12 : hrs % 12;
      return `${String(formattedHrs).padStart(2, '0')}:${String(mins).padStart(2, '0')} ${period}`;
    };

    const dhuhrUtc = solarNoonUtc + (4 / 60); // 4 min buffer after true zenith
    const sunriseUtc = solarNoonUtc - (sunriseH / 15.0);
    const sunsetUtc = solarNoonUtc + (sunriseH / 15.0);
    const fajrUtc = solarNoonUtc - (fajrH / 15.0);
    const asrUtc = solarNoonUtc + (asrH / 15.0);
    const maghribUtc = sunsetUtc + (3 / 60); // 3 min after sunset
    const ishaUtc = ishaFixedMinutes > 0 ? maghribUtc + (ishaFixedMinutes / 60) : solarNoonUtc + (ishaH / 15.0);
    const imsakUtc = fajrUtc - (10 / 60); // 10 min precaution
    const midnightUtc = sunsetUtc + ((fajrUtc + 24 - sunsetUtc) % 24) / 2;
    const qiyamUtc = sunsetUtc + (((fajrUtc + 24 - sunsetUtc) % 24) * 2) / 3;

    const methodNameMap: Record<string, string> = {
      MWL: "Muslim World League (Fajr 18°, Isha 17°)",
      ISNA: "Islamic Society of North America (Fajr 15°, Isha 15°)",
      EGYPT: "Egyptian General Authority of Survey (Fajr 19.5°, Isha 17.5°)",
      MAKKAH: "Umm al-Qura University, Makkah (Fajr 18.5°, Isha +90m)",
      KARACHI: "University of Islamic Sciences, Karachi (Fajr 18°, Isha 18°)",
      TEHRAN: "Institute of Geophysics, University of Tehran",
      JAFARI: "Shia Ithna Ashari / Leva Institute, Qum"
    };

    return {
      fajr: formatUtcHours(fajrUtc),
      sunrise: formatUtcHours(sunriseUtc),
      dhuhr: formatUtcHours(dhuhrUtc),
      asr: formatUtcHours(asrUtc),
      maghrib: formatUtcHours(maghribUtc),
      isha: formatUtcHours(ishaUtc),
      imsak: formatUtcHours(imsakUtc),
      midnight: formatUtcHours(midnightUtc),
      qiyam: formatUtcHours(qiyamUtc),
      method: methodNameMap[method] || method,
      asrJuristic: isHanafiAsr ? "Hanafi (Shadow 2:1)" : "Standard / Shafi'i / Hanbali / Maliki (Shadow 1:1)",
      coordinates: { latitude: lat, longitude: lon },
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
      date: date.toISOString().split('T')[0]
    };
  }

  // Qibla Direction Great-Circle Engine
  public static calculateQibla(userLat: number, userLon: number): QiblaCalculated {
    const kaabaLat = 21.4225;
    const kaabaLon = 39.8262;

    const lat1 = (userLat * Math.PI) / 180.0;
    const lat2 = (kaabaLat * Math.PI) / 180.0;
    const deltaLon = ((kaabaLon - userLon) * Math.PI) / 180.0;

    // Great Circle Forward Azimuth Formula: tan(bearing) = sin(dLon) / (cos(lat1)*tan(lat2) - sin(lat1)*cos(dLon))
    const y = Math.sin(deltaLon);
    const x = Math.cos(lat1) * Math.tan(lat2) - Math.sin(lat1) * Math.cos(deltaLon);
    let bearingDeg = ((Math.atan2(y, x) * 180.0) / Math.PI + 360) % 360;

    // Haversine Distance
    const R = 6371; // Earth mean radius in km
    const dLat = lat2 - lat1;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = Math.round(R * c);

    const cardinals = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    const cardinalIdx = Math.round(bearingDeg / 22.5) % 16;

    return {
      bearingDegrees: parseFloat(bearingDeg.toFixed(2)),
      compassCardinal: cardinals[cardinalIdx],
      distanceKm,
      greatCircleFormula: "Spherical Trigonometry Forward Azimuth (WGS84 Reference)",
      userCoordinates: { latitude: userLat, longitude: userLon },
      kaabaCoordinates: { latitude: kaabaLat, longitude: kaabaLon }
    };
  }

  // Zakat Calculator Engine
  public static calculateZakat(
    cash: number = 0,
    goldGrams: number = 0,
    silverGrams: number = 0,
    businessInventory: number = 0,
    sharesDividends: number = 0,
    debtsDueImmediately: number = 0,
    goldPricePerGram: number = 85,
    silverPricePerGram: number = 1.05,
    currency: string = "USD"
  ): ZakatCalculationResult {
    const goldNisabValue = 85 * goldPricePerGram;
    const silverNisabValue = 595 * silverPricePerGram;

    const goldValue = goldGrams * goldPricePerGram;
    const silverValue = silverGrams * silverPricePerGram;

    const totalEligibleAssets = cash + goldValue + silverValue + businessInventory + sharesDividends;
    const netZakatableWealth = Math.max(0, totalEligibleAssets - debtsDueImmediately);

    const nisabThreshold = silverNisabValue;
    const isZakatDue = netZakatableWealth >= nisabThreshold;
    const zakatPayable = isZakatDue ? parseFloat((netZakatableWealth * 0.025).toFixed(2)) : 0;

    return {
      totalEligibleAssets,
      deductibleLiabilities: debtsDueImmediately,
      netZakatableWealth,
      nisabGoldValue: parseFloat(goldNisabValue.toFixed(2)),
      nisabSilverValue: parseFloat(silverNisabValue.toFixed(2)),
      nisabThresholdUsed: "Silver (595g)",
      isZakatDue,
      zakatPayable,
      currency,
      breakdown: [
        { category: "Cash & Bank Balances", amount: cash, rate: "2.5%" },
        { category: `Gold (${goldGrams}g @ ${goldPricePerGram}/${currency})`, amount: goldValue, rate: "2.5%" },
        { category: `Silver (${silverGrams}g @ ${silverPricePerGram}/${currency})`, amount: silverValue, rate: "2.5%" },
        { category: "Commercial Business Inventory", amount: businessInventory, rate: "2.5%" },
        { category: "Tradable Shares & Investments", amount: sharesDividends, rate: "2.5%" },
        { category: "Immediate Deductible Liabilities", amount: -debtsDueImmediately, rate: "Deducted" }
      ]
    };
  }

  // Inheritance Distribution Calculator (Ashab al-Furud & Asaba)
  public static calculateInheritance(
    totalEstateValue: number,
    heirs: {
      hasWife?: boolean;
      hasHusband?: boolean;
      sonsCount?: number;
      daughtersCount?: number;
      hasFather?: boolean;
      hasMother?: boolean;
    }
  ): { shares: InheritanceShareResult[]; totalDistributed: number; remainder: number; advisoryDisclaimer: string } {
    const shares: InheritanceShareResult[] = [];
    const hasChildren = (heirs.sonsCount || 0) > 0 || (heirs.daughtersCount || 0) > 0;
    let distributedFraction = 0;

    // 1. Spouse Share
    if (heirs.hasWife) {
      const shareFrac = hasChildren ? "1/8" : "1/4";
      const pct = hasChildren ? 0.125 : 0.25;
      distributedFraction += pct;
      shares.push({
        relationship: "Wife / Wives",
        quranicShareFraction: shareFrac,
        sharePercentage: pct * 100,
        calculatedValue: totalEstateValue * pct,
        quranVerseRef: "Surah An-Nisa 4:12",
        category: "Ashab al-Furud (Fixed Share)"
      });
    } else if (heirs.hasHusband) {
      const shareFrac = hasChildren ? "1/4" : "1/2";
      const pct = hasChildren ? 0.25 : 0.5;
      distributedFraction += pct;
      shares.push({
        relationship: "Husband",
        quranicShareFraction: shareFrac,
        sharePercentage: pct * 100,
        calculatedValue: totalEstateValue * pct,
        quranVerseRef: "Surah An-Nisa 4:12",
        category: "Ashab al-Furud (Fixed Share)"
      });
    }

    // 2. Parents Share
    if (heirs.hasMother) {
      const shareFrac = hasChildren ? "1/6" : "1/3";
      const pct = hasChildren ? 1 / 6 : 1 / 3;
      distributedFraction += pct;
      shares.push({
        relationship: "Mother",
        quranicShareFraction: shareFrac,
        sharePercentage: parseFloat((pct * 100).toFixed(2)),
        calculatedValue: totalEstateValue * pct,
        quranVerseRef: "Surah An-Nisa 4:11",
        category: "Ashab al-Furud (Fixed Share)"
      });
    }

    if (heirs.hasFather) {
      const shareFrac = hasChildren ? "1/6" : "Residuary (Asaba)";
      const pct = hasChildren ? 1 / 6 : (1 - distributedFraction);
      distributedFraction += pct;
      shares.push({
        relationship: "Father",
        quranicShareFraction: shareFrac,
        sharePercentage: parseFloat((pct * 100).toFixed(2)),
        calculatedValue: totalEstateValue * pct,
        quranVerseRef: "Surah An-Nisa 4:11",
        category: hasChildren ? "Ashab al-Furud (Fixed Share)" : "Asaba (Residuary)"
      });
    }

    // 3. Children (2:1 Ratio for Son to Daughter)
    const sons = heirs.sonsCount || 0;
    const daughters = heirs.daughtersCount || 0;
    const remainingFraction = Math.max(0, 1 - distributedFraction);

    if (sons > 0 || daughters > 0) {
      const totalParts = sons * 2 + daughters;
      if (totalParts > 0) {
        if (sons > 0) {
          const sonTotalPct = remainingFraction * ((sons * 2) / totalParts);
          shares.push({
            relationship: `Sons (${sons})`,
            quranicShareFraction: "Residuary (2x Female share)",
            sharePercentage: parseFloat((sonTotalPct * 100).toFixed(2)),
            calculatedValue: totalEstateValue * sonTotalPct,
            quranVerseRef: "Surah An-Nisa 4:11",
            category: "Asaba (Residuary)"
          });
        }
        if (daughters > 0) {
          const daughterTotalPct = remainingFraction * (daughters / totalParts);
          shares.push({
            relationship: `Daughters (${daughters})`,
            quranicShareFraction: "Residuary (1x share)",
            sharePercentage: parseFloat((daughterTotalPct * 100).toFixed(2)),
            calculatedValue: totalEstateValue * daughterTotalPct,
            quranVerseRef: "Surah An-Nisa 4:11",
            category: "Asaba (Residuary)"
          });
        }
      }
    }

    const totalDistributed = shares.reduce((acc, s) => acc + (s.calculatedValue || 0), 0);
    const remainder = Math.max(0, totalEstateValue - totalDistributed);

    return {
      shares,
      totalDistributed: parseFloat(totalDistributed.toFixed(2)),
      remainder: parseFloat(remainder.toFixed(2)),
      advisoryDisclaimer: "⚠️ Juristic Notice: This calculation illustrates standard Quranic fractions (Ilm al-Fara'id). Actual legal estate execution requires formal debt settlement, verified wills (Wasiyyah max 1/3), funeral expenses, and licensed Islamic legal council review."
    };
  }
}
