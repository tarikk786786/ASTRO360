/**
 * ASTRO360 Islamic Question Router
 * Directs incoming user queries to Quran, Hadith, Tafsir, Fiqh, Prayer, Qibla, Hijri, Fasting, Zakat, or Mixed Astrology/Islam mode
 */

export type IslamicCategory = 
  | "QURAN"
  | "HADITH"
  | "TAFSIR"
  | "FIQH"
  | "PRAYER"
  | "FASTING"
  | "ZAKAT"
  | "INHERITANCE"
  | "DUA"
  | "AZKAR"
  | "HIJRI"
  | "QIBLA"
  | "ISLAMIC_ASTRONOMY"
  | "GENERAL_ISLAMIC_KNOWLEDGE"
  | "MIXED_ASTROLOGY_ISLAM";

export interface IslamicRouteResult {
  category: IslamicCategory;
  isMixedAstrologyIslam: boolean;
  isAstrologyDivinationInquiry: boolean;
  primaryTools: string[];
  suggestedAction: string;
}

export class IslamicQuestionRouter {
  public static route(question: string): IslamicRouteResult {
    const q = question.toLowerCase();

    // 1. Detect Mixed Question (Astrology + Islamic Guidance simultaneously)
    const mentionsAstrology = q.includes("astrology") || q.includes("horoscope") || q.includes("chart") || q.includes("zodiac") || q.includes("birth star") || q.includes("dasha") || q.includes("vedic");
    const mentionsIslam = q.includes("islam") || q.includes("quran") || q.includes("hadith") || q.includes("allah") || q.includes("prophet") || q.includes("fiqh") || q.includes("tafsir") || q.includes("muslim");

    if (mentionsAstrology && mentionsIslam) {
      // Check if user is asking about the Islamic ruling on astrology/horoscopes
      const isRulingQuery = q.includes("ruling on astrology") || 
        q.includes("islam say about astrology") || 
        q.includes("islam say about horoscope") || 
        q.includes("permissible") || 
        q.includes("haram") || 
        q.includes("halal") || 
        q.includes("can my birth star") || 
        q.includes("is astrology allowed");

      if (isRulingQuery) {
        return {
          category: "FIQH",
          isMixedAstrologyIslam: false,
          isAstrologyDivinationInquiry: true,
          primaryTools: ["fiqh.search", "hadith.search"],
          suggestedAction: "Explain Islamic ruling on astrology with authenticated Hadith and classical madhhab consensus."
        };
      }
      return {
        category: "MIXED_ASTROLOGY_ISLAM",
        isMixedAstrologyIslam: true,
        isAstrologyDivinationInquiry: false,
        primaryTools: ["chart.get", "quran.search", "hadith.search"],
        suggestedAction: "Deliver distinct 3-part response: (1) Astrology Chart View, (2) Sourced Islamic Guidance, (3) Practical Action."
      };
    }

    // 2. Pure Prayer Times
    if (q.includes("fajr") || q.includes("dhuhr") || q.includes("asr") || q.includes("maghrib") || q.includes("isha") || q.includes("prayer time") || q.includes("namaz") || q.includes("salah time")) {
      return {
        category: "PRAYER",
        isMixedAstrologyIslam: false,
        isAstrologyDivinationInquiry: false,
        primaryTools: ["prayer.calculate"],
        suggestedAction: "Calculate high-precision astronomical prayer times."
      };
    }

    // 3. Pure Qibla
    if (q.includes("qibla") || q.includes("kaaba direction") || q.includes("mecca direction") || q.includes("which direction")) {
      return {
        category: "QIBLA",
        isMixedAstrologyIslam: false,
        isAstrologyDivinationInquiry: false,
        primaryTools: ["qibla.calculate"],
        suggestedAction: "Calculate great-circle bearing and distance to Kaaba."
      };
    }

    // 4. Pure Hijri Calendar
    if (q.includes("hijri") || q.includes("islamic date") || q.includes("ramadan start") || q.includes("eid") || q.includes("muharram") || q.includes("shawwal")) {
      return {
        category: "HIJRI",
        isMixedAstrologyIslam: false,
        isAstrologyDivinationInquiry: false,
        primaryTools: ["hijri.convert"],
        suggestedAction: "Convert date and explain calculation vs moonsighting announcement."
      };
    }

    // 5. Fasting / Imsak
    if (q.includes("fasting") || q.includes("imsak") || q.includes("suhoor") || q.includes("iftar") || q.includes("roza")) {
      return {
        category: "FASTING",
        isMixedAstrologyIslam: false,
        isAstrologyDivinationInquiry: false,
        primaryTools: ["prayer.calculate", "quran.search"],
        suggestedAction: "Provide accurate fasting horizon and Quranic foundations."
      };
    }

    // 6. Zakat
    if (q.includes("zakat") || q.includes("nisab") || q.includes("charity rate") || q.includes("zakah")) {
      return {
        category: "ZAKAT",
        isMixedAstrologyIslam: false,
        isAstrologyDivinationInquiry: false,
        primaryTools: ["zakat.calculate"],
        suggestedAction: "Provide transparent Zakat calculation on 2.5% standard."
      };
    }

    // 7. Inheritance
    if (q.includes("inheritance") || q.includes("estate") || q.includes("faraid") || q.includes("mirath") || q.includes("heirs")) {
      return {
        category: "INHERITANCE",
        isMixedAstrologyIslam: false,
        isAstrologyDivinationInquiry: false,
        primaryTools: ["inheritance.calculate"],
        suggestedAction: "Calculate standard Quranic fixed shares with advisory disclaimer."
      };
    }

    // 8. Hadith Search / Verification
    if (q.includes("hadith") || q.includes("bukhari") || q.includes("muslim") || q.includes("is this hadith authentic") || q.includes("prophet said")) {
      return {
        category: "HADITH",
        isMixedAstrologyIslam: false,
        isAstrologyDivinationInquiry: false,
        primaryTools: ["hadith.search"],
        suggestedAction: "Retrieve verified Hadith text with collection, number, narrator, and authentic grading."
      };
    }

    // 9. Tafsir
    if (q.includes("tafsir") || q.includes("exegesis") || q.includes("ibn kathir") || q.includes("what does this verse mean")) {
      return {
        category: "TAFSIR",
        isMixedAstrologyIslam: false,
        isAstrologyDivinationInquiry: false,
        primaryTools: ["tafsir.search", "quran.getVerse"],
        suggestedAction: "Deliver comparative Tafsir perspectives."
      };
    }

    // 10. Dua / Azkar / Personal Distress
    if (q.includes("dua") || q.includes("azkar") || q.includes("supplication") || q.includes("worried") || q.includes("anxious") || q.includes("patience") || q.includes("sad")) {
      return {
        category: "DUA",
        isMixedAstrologyIslam: false,
        isAstrologyDivinationInquiry: false,
        primaryTools: ["quran.search", "hadith.search"],
        suggestedAction: "Provide authentic Quranic verses and Sunnah Duas with Arabic, translation, and practical spiritual guidance."
      };
    }

    // 11. Pure Quran Lookup
    if (q.includes("quran") || q.includes("surah") || q.includes("ayah") || q.includes("verse")) {
      return {
        category: "QURAN",
        isMixedAstrologyIslam: false,
        isAstrologyDivinationInquiry: false,
        primaryTools: ["quran.search", "quran.getVerse"],
        suggestedAction: "Retrieve authentic Quran text and verified translations."
      };
    }

    // Default to General Islamic Knowledge
    return {
      category: "GENERAL_ISLAMIC_KNOWLEDGE",
      isMixedAstrologyIslam: false,
      isAstrologyDivinationInquiry: false,
      primaryTools: ["quran.search", "hadith.search", "fiqh.search"],
      suggestedAction: "Synthesize verified source-backed Islamic guidance."
    };
  }
}
