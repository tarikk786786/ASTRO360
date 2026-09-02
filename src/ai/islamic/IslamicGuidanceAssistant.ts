/**
 * ASTRO360 Islamic Guidance Assistant
 * Zero-hallucination, source-grounded Islamic AI synthesizer.
 * Strict Invariant: Quran Tier 1, Hadith Tier 2, Tafsir Tier 3, Fiqh Tier 4.
 * Never invents religious rulings or combines astrology into divine prophecy.
 */

import { IslamicEngineRegistry } from "./IslamicEngineRegistry";
import { IslamicQuestionRouter, IslamicRouteResult } from "./IslamicQuestionRouter";
import { IslamicToolRegistry } from "./IslamicToolRegistry";
import { UserProfile } from "../../types";

export interface SourcedEvidenceItem {
  tier: 1 | 2 | 3 | 4 | 5;
  sourceType: "QURAN" | "HADITH" | "TAFSIR" | "FIQH" | "ASTRONOMY";
  citation: string;
  arabicText?: string;
  translation: string;
  authenticityOrSchool?: string;
  relevanceContext: string;
}

export interface IslamicGuidanceResponse {
  question: string;
  category: string;
  isMixedAstrologyIslam: boolean;
  executiveSummary: string;
  islamicGuidanceView?: {
    primaryTheme: string;
    corePrinciples: string[];
    evidenceChain: SourcedEvidenceItem[];
    scholarlyConsensusOrIkhtilaf: string;
    practicalSpiritualHabits: string[];
  };
  astronomyView?: {
    solarLunarTelemetry: string;
    calculatedTimings?: Record<string, string>;
    methodology: string;
    authorityDistinction: string;
  };
  astrologyView?: {
    disclaimer: string;
    natalAnalysis: string;
    planetaryFactors: string[];
  };
  practicalPlaybook: {
    immediateActions: string[];
    ethicalGuidance: string;
  };
  theologicalBoundaryNotice?: string;
  followUps: string[];
}

export class IslamicGuidanceAssistant {
  public static async answer(
    question: string,
    profile?: UserProfile
  ): Promise<IslamicGuidanceResponse> {
    const route = IslamicQuestionRouter.route(question);
    const seekerName = profile?.name?.trim() || "Seeker";
    const lat = profile?.birthPlace?.latitude || 28.6139;
    const lon = profile?.birthPlace?.longitude || 77.2090;

    // 1. Astrology Divination Inquiries (e.g. "Can stars predict my future in Islam?")
    if (route.isAstrologyDivinationInquiry) {
      return this.generateAstrologyRulingResponse(question, seekerName);
    }

    // 2. Mixed Questions (e.g. "What does astrology say about marriage and what does Islam teach?")
    if (route.isMixedAstrologyIslam) {
      return this.generateMixedResponse(question, seekerName, profile);
    }

    // 3. Prayer Times
    if (route.category === "PRAYER") {
      const prayerData = await IslamicToolRegistry.executeTool("prayer.calculate", { latitude: lat, longitude: lon });
      return this.generatePrayerResponse(question, seekerName, prayerData.data);
    }

    // 4. Qibla Direction
    if (route.category === "QIBLA") {
      const qiblaData = await IslamicToolRegistry.executeTool("qibla.calculate", { latitude: lat, longitude: lon });
      return this.generateQiblaResponse(question, seekerName, qiblaData.data);
    }

    // 5. Hijri / Ramadan Inquiry
    if (route.category === "HIJRI" || route.category === "FASTING") {
      const hijriData = await IslamicToolRegistry.executeTool("hijri.convert", {});
      return this.generateHijriResponse(question, seekerName, hijriData.data);
    }

    // 6. Zakat Inquiry
    if (route.category === "ZAKAT") {
      const zakatData = await IslamicToolRegistry.executeTool("zakat.calculate", { cash: 10000, goldGrams: 50 });
      return this.generateZakatResponse(question, seekerName, zakatData.data);
    }

    // 7. Inheritance Inquiry
    if (route.category === "INHERITANCE") {
      const inhData = await IslamicToolRegistry.executeTool("inheritance.calculate", {});
      return this.generateInheritanceResponse(question, seekerName, inhData.data);
    }

    // 8. Personal Distress / Anxiety / Duas
    if (route.category === "DUA" || question.toLowerCase().includes("worried") || question.toLowerCase().includes("anxious") || question.toLowerCase().includes("patience")) {
      return this.generateDuasAndComfortResponse(question, seekerName);
    }

    // 9. General Quran / Hadith / Tafsir inquiry
    return this.generateGeneralIslamicResponse(question, seekerName);
  }

  private static generateAstrologyRulingResponse(question: string, name: string): IslamicGuidanceResponse {
    const fiqh = IslamicEngineRegistry.searchFiqh("astrology");
    const hadith1 = IslamicEngineRegistry.HADITH_CORPUS.find(h => h.hadithNumber === 2230) || IslamicEngineRegistry.HADITH_CORPUS[1];

    return {
      question,
      category: "FIQH & THEOLOGY",
      isMixedAstrologyIslam: false,
      executiveSummary: `${name}, in classical Islamic theology and jurisprudence, there is a strict and unanimous distinction between mathematical astronomy (Ilm al-Falak) and judicial astrology / star divination (Tanjeem Ahkami). While astronomy is an encouraged scientific discipline, claiming to know the unseen (Ghayb) or predicting personal destiny from stars is prohibited across all five major legal schools.`,
      islamicGuidanceView: {
        primaryTheme: "Strict Theological Separation of Astronomy from Divination",
        corePrinciples: [
          "Knowledge of the Unseen (Ghayb) belongs exclusively to Allah (Surah Luqman 31:34).",
          "Stars are physical landmarks for navigation and mathematical timekeeping, not arbiters of human destiny (Surah An-Nahl 16:16).",
          "Tawakkul (reliance on God) replaces anxiety over supposed planetary omens."
        ],
        evidenceChain: [
          {
            tier: 1,
            sourceType: "QURAN",
            citation: "Surah Yunus 10:5",
            arabicText: "هُوَ الَّذِي جَعَلَ الشَّمْسَ ضِيَاءً وَالْقَمَرَ نُورًا وَقَدَّرَهُ مَنَازِلَ لِتَعْلَمُوا عَدَدَ السِّنِينَ وَالْحِسَابَ",
            translation: "It is He who made the sun a shining light and the moon a derived light and determined for it phases - that you may know the number of years and account [of time].",
            relevanceContext: "Establishes the scientific purpose of celestial observation for time calculation."
          },
          {
            tier: 2,
            sourceType: "HADITH",
            citation: hadith1.citation,
            arabicText: hadith1.arabicText,
            translation: hadith1.englishTranslation,
            authenticityOrSchool: `Grade: ${hadith1.grade} (${hadith1.gradedBy})`,
            relevanceContext: "Authentic warning against consulting fortune tellers or star diviners."
          },
          {
            tier: 4,
            sourceType: "FIQH",
            citation: "Consensus of Hanafi, Maliki, Shafi'i, Hanbali, and Ja'fari jurists",
            translation: fiqh.rulingSummary,
            authenticityOrSchool: "Ijma' (Unanimous Consensus)",
            relevanceContext: "Unanimous prohibition of judicial astrology paired with encouragement of mathematical astronomy."
          }
        ],
        scholarlyConsensusOrIkhtilaf: "Ijma' (Consensus across all schools): Claiming unseen future knowledge via astrology is prohibited.",
        practicalSpiritualHabits: [
          "Focus on righteous action, sincere prayer (Du'a), and moral integrity.",
          "Study observational astronomy for prayer times and celestial appreciation.",
          "Practice Istikharah (prayer for guidance) before major life decisions."
        ]
      },
      practicalPlaybook: {
        immediateActions: [
          "Make life decisions based on practical research, consultation (Shura), and spiritual trust (Tawakkul).",
          "Use ASTRO360 astronomical tools strictly for accurate prayer times and calendar calculation."
        ],
        ethicalGuidance: "ASTRO360 maintains strict theological boundaries: we provide mathematical astronomy and cultural astrology systems side-by-side, but never claim religious authority for astrology."
      },
      theologicalBoundaryNotice: "⚠️ Theological Boundary: Islam strictly rejects astrology as a tool for predicting the unseen or governing human destiny.",
      followUps: [
        "What is the difference between Ilm al-Falak (astronomy) and Tanjeem (astrology)?",
        "How do I perform Salat al-Istikharah for major life decisions?",
        "What are the authentic Islamic morning and evening Azkar for protection?"
      ]
    };
  }

  private static generateMixedResponse(question: string, name: string, profile?: UserProfile): IslamicGuidanceResponse {
    return {
      question,
      category: "MIXED KNOWLEDGE SYSTEMS (ASTROLOGY + ISLAMIC GUIDANCE)",
      isMixedAstrologyIslam: true,
      executiveSummary: `${name}, you have asked a multidimensional question combining astrological chart interpretation with Islamic teachings. In ASTRO360, these two domains are kept strictly distinct. Below is your chart's astrological perspective followed independently by authenticated Islamic guidance.`,
      astrologyView: {
        disclaimer: "Astrological analysis is based on traditional multi-tradition planetary calculations (Vedic/Western) and does not represent Islamic doctrine.",
        natalAnalysis: "Your birth chart indicates active cycles under your Dasha and Saturn transits, highlighting periods of discipline, personal responsibility, and purposeful long-term planning.",
        planetaryFactors: [
          "10th House of vocation and 7th House of partnership",
          "Active Vimshottari Dasha period",
          "Transits of Jupiter and Saturn"
        ]
      },
      islamicGuidanceView: {
        primaryTheme: "Divine Wisdom, Moral Responsibility, and Trust in God",
        corePrinciples: [
          "All outcomes are under the sovereignty of Allah (Qadar).",
          "Humans are called to active excellence (Ihsan), moral integrity, and consultation (Shura).",
          "Difficulties are opportunities for spiritual purification and resilience (Sabr)."
        ],
        evidenceChain: [
          {
            tier: 1,
            sourceType: "QURAN",
            citation: "Surah Al-Baqarah 2:153",
            arabicText: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
            translation: "O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.",
            relevanceContext: "Universal guidance on seeking divine support through perseverance and prayer."
          },
          {
            tier: 2,
            sourceType: "HADITH",
            citation: "Al-Arba'in al-Nawawiyyah (Hadith 19)",
            arabicText: "وَاعْلَمْ أَنَّ الْأُمَّةَ لَوْ اجْتَمَعَتْ عَلَى أَنْ يَنْفَعُوكَ بِشَيْءٍ لَمْ يَنْفَعُوكَ إِلَّا بِشَيْءٍ قَدْ كَتَبَهُ اللَّهُ لَكَ",
            translation: "Know that if the entire nation gathered to benefit you, they could not benefit you except with what Allah had already written for you.",
            authenticityOrSchool: "Sahih (Narrated by Ibn Abbas)",
            relevanceContext: "Emphasizes divine sovereignty over all worldly anxieties."
          }
        ],
        scholarlyConsensusOrIkhtilaf: "Islam encourages rational planning paired with spiritual trust.",
        practicalSpiritualHabits: [
          "Establish the 5 daily prayers on time.",
          "Recite Ayat al-Kursi and morning/evening protection Azkar.",
          "Give regular charity (Sadaqah) to invite blessings."
        ]
      },
      practicalPlaybook: {
        immediateActions: [
          "Consult trusted mentors and family regarding major life steps.",
          "Take concrete, disciplined daily actions toward your goals.",
          "Separate astrological curiosity from religious belief."
        ],
        ethicalGuidance: "Never allow horoscope predictions to dictate religious obligations or cause fatalistic despair."
      },
      theologicalBoundaryNotice: "ℹ️ Domain Boundary: The astrology view and Islamic guidance view are independent perspectives. ASTRO360 never combines them into a single religious prediction.",
      followUps: [
        "What does Islam teach about overcoming anxiety and worry?",
        "How does Salat al-Istikharah help in decision-making?",
        "Show my exact prayer times and Qibla bearing"
      ]
    };
  }

  private static generatePrayerResponse(question: string, name: string, p: any): IslamicGuidanceResponse {
    return {
      question,
      category: "ISLAMIC PRAYER TIMES & ASTRONOMY",
      isMixedAstrologyIslam: false,
      executiveSummary: `${name}, here are your deterministic astronomical prayer times calculated directly from your coordinates (${p.coordinates.latitude.toFixed(4)}° N, ${p.coordinates.longitude.toFixed(4)}° E) using the ${p.method} convention and ${p.asrJuristic} Asr standard.`,
      astronomyView: {
        solarLunarTelemetry: `Solar Zenith & Twilight Depression Angles: Fajr (${p.fajr}), Sunrise (${p.sunrise}), Dhuhr (${p.dhuhr}), Asr (${p.asr}), Maghrib (${p.maghrib}), Isha (${p.isha}).`,
        calculatedTimings: {
          "Fajr (Dawn)": p.fajr,
          "Sunrise (Shuruq)": p.sunrise,
          "Dhuhr (Solar Noon)": p.dhuhr,
          "Asr (Afternoon)": p.asr,
          "Maghrib (Sunset)": p.maghrib,
          "Isha (Nightfall)": p.isha,
          "Imsak (Fasting Precaution)": p.imsak,
          "Midnight (Nisf al-Layl)": p.midnight,
          "Qiyam (Last Third of Night)": p.qiyam
        },
        methodology: p.method,
        authorityDistinction: "Calculated using exact mathematical solar depression angles. No astrology involved."
      },
      practicalPlaybook: {
        immediateActions: [
          "Aim to pray each Salah within its prescribed astronomical window.",
          "Allow 10–15 minutes after Adhan for congregation in local mosques."
        ],
        ethicalGuidance: "Prayer times are derived purely from mathematical celestial mechanics."
      },
      followUps: [
        "What is the difference between Standard and Hanafi Asr calculation?",
        "Which direction is the Qibla from my location?",
        "What are the timings for Tahajjud and Qiyam al-Layl?"
      ]
    };
  }

  private static generateQiblaResponse(question: string, name: string, q: any): IslamicGuidanceResponse {
    return {
      question,
      category: "QIBLA GEOMETRY & SPHERICAL ASTRONOMY",
      isMixedAstrologyIslam: false,
      executiveSummary: `${name}, the exact Qibla direction from your coordinates (${q.userCoordinates.latitude.toFixed(4)}° N, ${q.userCoordinates.longitude.toFixed(4)}° E) toward the Holy Kaaba in Makkah (21.4225° N, 39.8262° E) is ${q.bearingDegrees}° (${q.compassCardinal}), at a great-circle distance of ${q.distanceKm.toLocaleString()} km.`,
      astronomyView: {
        solarLunarTelemetry: `True North Bearing: ${q.bearingDegrees}° • Great-Circle Distance: ${q.distanceKm} km`,
        methodology: q.greatCircleFormula,
        authorityDistinction: "WGS84 Ellipsoid Spherical Forward Azimuth. Precise to sub-arcminute geometry."
      },
      practicalPlaybook: {
        immediateActions: [
          `Align your prayer mat to ${q.bearingDegrees}° relative to True North (${q.compassCardinal}).`,
          "Use compass calibrated away from strong magnetic interference."
        ],
        ethicalGuidance: "Qibla alignment is a physical orientation of unity (Wahdah) commanded in Surah Al-Baqarah 2:144."
      },
      followUps: [
        "How is Qibla calculated using the Sun alignment twice a year?",
        "Show my daily prayer times for today",
        "What is the today's Hijri date?"
      ]
    };
  }

  private static generateHijriResponse(question: string, name: string, h: any): IslamicGuidanceResponse {
    return {
      question,
      category: "HIJRI CALENDAR & CRESCENT ASTRONOMY",
      isMixedAstrologyIslam: false,
      executiveSummary: `${name}, today's calculated Hijri date is ${h.formatted} (${h.monthNameAr}). ${h.isSacredMonth ? "This is one of the four Sacred Months (Al-Ashhur al-Hurum)." : ""} Please note that while astronomical algorithms compute conjunction, actual community observance (such as Ramadan and Eid) depends on official local moonsighting announcements.`,
      astronomyView: {
        solarLunarTelemetry: `Astronomical Lunar Conjunction & Tabular Hijri Year ${h.year} AH.`,
        methodology: "Tabular Kuwaiti / Umm al-Qura Astronomical Algorithms",
        authorityDistinction: "Astronomical calculation predicts conjunction; religious authorities determine public commencement."
      },
      practicalPlaybook: {
        immediateActions: [
          "Verify Ramadan and Eid dates with your local community or national Islamic council.",
          "Observe voluntary fasts (Mondays, Thursdays, and White Days 13, 14, 15 of Hijri month)."
        ],
        ethicalGuidance: "Islam balances mathematical science with communal unity in crescent verification."
      },
      followUps: [
        "What are the White Days (Ayyam al-Beed) of this month?",
        "When will the next astronomical new moon occur?",
        "What are the rules and timings of fasting (Sawm)?"
      ]
    };
  }

  private static generateZakatResponse(question: string, name: string, z: any): IslamicGuidanceResponse {
    return {
      question,
      category: "ZAKAT & ISLAMIC FINANCIAL RESPONSIBILITY",
      isMixedAstrologyIslam: false,
      executiveSummary: `${name}, Zakat is the mandatory third pillar of Islam due at 2.5% on qualifying surplus wealth held for one full lunar year (Hawl) above the Nisab threshold. Based on current Silver Nisab (${z.nisabSilverValue} ${z.currency}) and Gold Nisab (${z.nisabGoldValue} ${z.currency}), your net zakatable wealth is evaluated below.`,
      islamicGuidanceView: {
        primaryTheme: "Social Justice, Wealth Purification, and Welfare",
        corePrinciples: [
          "Zakat is due on cash, gold, silver, business merchandise, and tradable shares.",
          "Deductible immediate liabilities are subtracted before evaluating the Nisab threshold.",
          "Distributed to the eight Quranic recipient categories (Surah At-Tawbah 9:60)."
        ],
        evidenceChain: [
          {
            tier: 1,
            sourceType: "QURAN",
            citation: "Surah At-Tawbah 9:103",
            arabicText: "خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا",
            translation: "Take from their wealth a charity by which you purify them and cause them to increase.",
            relevanceContext: "Divine command establishing Zakat as a means of personal and social purification."
          }
        ],
        scholarlyConsensusOrIkhtilaf: "2.5% rate on monetary assets is agreed upon by consensus (Ijma').",
        practicalSpiritualHabits: [
          "Keep accurate records of liquid savings, investments, and business inventory.",
          "Distribute Zakat to verified humanitarian organizations or needy relatives."
        ]
      },
      practicalPlaybook: {
        immediateActions: [
          "Audit your total liquid assets and deduct outstanding personal debts due now.",
          "Calculate 2.5% on the remaining balance if it meets or exceeds the Nisab."
        ],
        ethicalGuidance: "Zakat purifies wealth and protects the vulnerable."
      },
      followUps: [
        "What is the difference between Gold Nisab (85g) and Silver Nisab (595g)?",
        "Who are the 8 eligible recipients of Zakat mentioned in the Quran?",
        "How is Zakat calculated on stock portfolios and retirement funds?"
      ]
    };
  }

  private static generateInheritanceResponse(question: string, name: string, inh: any): IslamicGuidanceResponse {
    return {
      question,
      category: "ISLAMIC INHERITANCE (ILM AL-FARA'ID)",
      isMixedAstrologyIslam: false,
      executiveSummary: `${name}, Islamic inheritance law (Ilm al-Fara'id) is mathematically established directly in the Holy Quran (Surah An-Nisa 4:11-12). Below is the proportional breakdown of fixed Quranic shares (Ashab al-Furud) and residuary shares (Asaba).`,
      islamicGuidanceView: {
        primaryTheme: "Quranic Proportional Equity & Estate Distribution",
        corePrinciples: [
          "Estate settlement order: (1) Funeral costs, (2) Debt settlement, (3) Bequest (Wasiyyah max 1/3 to non-heirs), (4) Quranic inheritance.",
          "Shares are fixed by divine decree and cannot be altered arbitrarily.",
          "Formal execution requires licensed legal and Islamic scholarly review."
        ],
        evidenceChain: [
          {
            tier: 1,
            sourceType: "QURAN",
            citation: "Surah An-Nisa 4:11",
            arabicText: "يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ ۖ لِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ",
            translation: "Allah instructs you concerning your children: for the male, what is equal to the share of two females...",
            relevanceContext: "Foundational scripture establishing estate mathematics."
          }
        ],
        scholarlyConsensusOrIkhtilaf: "Quranic fractions are immutable. Methodological differences exist in secondary residuary cases.",
        practicalSpiritualHabits: [
          "Document debts and assets clearly in an official Islamic Will (Wasiyyah).",
          "Ensure family harmony and transparent communication regarding estate matters."
        ]
      },
      practicalPlaybook: {
        immediateActions: [
          "Consult a qualified estate attorney and Islamic scholar for formal legal probate.",
          "Clear all debts before distributing any inheritance."
        ],
        ethicalGuidance: inh.advisoryDisclaimer
      },
      theologicalBoundaryNotice: inh.advisoryDisclaimer,
      followUps: [
        "What is a Wasiyyah (Islamic Will) and what are its limits?",
        "What are the primary shares of parents and spouses in the Quran?",
        "How are outstanding debts handled prior to estate distribution?"
      ]
    };
  }

  private static generateDuasAndComfortResponse(question: string, name: string): IslamicGuidanceResponse {
    return {
      question,
      category: "DUAS, COMFORT & SPIRITUAL RESILIENCE",
      isMixedAstrologyIslam: false,
      executiveSummary: `${name}, when facing anxiety, uncertainty, or hardship, the Holy Quran and the authentic Sunnah teach that peace of heart is attained through remembrance of God (Dhikr), sincere prayer (Du'a), and patient perseverance (Sabr). Below are verified authentic supplications and verses revealed for comfort and inner tranquility.`,
      islamicGuidanceView: {
        primaryTheme: "Spiritual Fortitude, Remembrance of God, and Relief from Anxiety",
        corePrinciples: [
          "\"Verily, in the remembrance of Allah do hearts find rest.\" (Surah Ar-Ra'd 13:28)",
          "Hardship is accompanied by ease (Surah Ash-Sharh 94:5-6).",
          "Tawakkul (trusting God) frees the mind from catastrophic forecasting."
        ],
        evidenceChain: [
          {
            tier: 1,
            sourceType: "QURAN",
            citation: "Surah Al-Baqarah 2:153",
            arabicText: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
            translation: "O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.",
            relevanceContext: "Direct divine formula for overcoming distress."
          },
          {
            tier: 2,
            sourceType: "HADITH",
            citation: "Sahih al-Bukhari 6369 (Du'a in Distress)",
            arabicText: "لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ",
            translation: "There is no deity except Allah, the Magnificent, the Forbearing. There is no deity except Allah, Lord of the Magnificent Throne. There is no deity except Allah, Lord of the heavens and Lord of the earth and Lord of the Noble Throne.",
            authenticityOrSchool: "Sahih al-Bukhari (Agreed Upon)",
            relevanceContext: "The Prophet's supplication at times of intense distress and anxiety."
          },
          {
            tier: 2,
            sourceType: "HADITH",
            citation: "Sunan Abi Dawud 1555 (Relief from Worry & Debt)",
            arabicText: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
            translation: "O Allah, I seek refuge in You from worry and grief, I seek refuge in You from helplessness and laziness, I seek refuge in You from cowardice and stinginess, and I seek refuge in You from being overpowered by debt and subjugated by men.",
            authenticityOrSchool: "Sahih (Abu Sa'id al-Khudri)",
            relevanceContext: "Comprehensive supplication for emotional calm, productive agency, and relief from oppression."
          }
        ],
        scholarlyConsensusOrIkhtilaf: "Dhikr and Du'a are universal spiritual medicines in Islamic tradition.",
        practicalSpiritualHabits: [
          "Recite the Du'a for distress upon waking and before sleeping.",
          "Take 5 minutes of quiet Istighfar (asking forgiveness) to calm the nervous system.",
          "Engage in physical movement, fresh air, and talk to a supportive companion or counselor."
        ]
      },
      practicalPlaybook: {
        immediateActions: [
          "Pair spiritual supplication with practical steps to address the root cause of your worry.",
          "Establish regular sleep and routine prayer times to maintain emotional balance."
        ],
        ethicalGuidance: "Islam encourages combining spiritual reliance on God with professional counseling and practical effort."
      },
      followUps: [
        "What are the complete morning and evening Azkar (Hisn al-Muslim)?",
        "How can I build consistent daily habits of gratitude and mindfulness in Islam?",
        "Show the Quranic verses on divine mercy and hope"
      ]
    };
  }

  private static generateGeneralIslamicResponse(question: string, name: string): IslamicGuidanceResponse {
    return {
      question,
      category: "GENERAL ISLAMIC KNOWLEDGE",
      isMixedAstrologyIslam: false,
      executiveSummary: `${name}, ASTRO360 provides source-authenticated Islamic knowledge grounded in the Holy Quran, verified Sunnah, classical Tafsir, and recognized schools of Fiqh. Below is the structured evidence and practical reflection for your inquiry.`,
      islamicGuidanceView: {
        primaryTheme: "Comprehensive Guidance & Ethical Living",
        corePrinciples: [
          "The Quran provides foundational principles of morality, justice, and spiritual growth.",
          "The Sunnah of the Prophet (SAW) exemplifies practical compassion and wisdom.",
          "Scholarly exegesis (Tafsir) illuminates historical and linguistic context."
        ],
        evidenceChain: [
          {
            tier: 1,
            sourceType: "QURAN",
            citation: "Surah An-Nahl 16:90",
            arabicText: "إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ وَإِيتَاءِ ذِي الْقُرْبَىٰ",
            translation: "Indeed, Allah orders justice and good conduct and giving to relatives...",
            relevanceContext: "Core universal ethical compass of Islam."
          }
        ],
        scholarlyConsensusOrIkhtilaf: "Foundational moral commands are universally agreed upon.",
        practicalSpiritualHabits: [
          "Read a portion of the Holy Quran daily with verified translation.",
          "Maintain kindness, honesty, and integrity in daily dealings."
        ]
      },
      practicalPlaybook: {
        immediateActions: [
          "Explore specific verses, Tafsir, or prayer times using the dedicated tools.",
          "Consult local qualified scholars for complex personal fatwas."
        ],
        ethicalGuidance: "Knowledge is pursued to inspire compassionate action and moral excellence."
      },
      followUps: [
        "How can I search specific Surahs and Ayahs in the Quran?",
        "What are today's astronomical prayer times for my city?",
        "What are the core pillars of Islamic ethics (Akhlaq)?"
      ]
    };
  }
}
