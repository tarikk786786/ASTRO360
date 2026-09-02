/**
 * ASTRO360 Worldwide Tradition Registry
 * Canonical register of all supported astrology, astronomy, and Islamic knowledge domains.
 */

export interface TraditionDomainRecord {
  domainId: string;
  name: string;
  category: "ASTROLOGY" | "ASTRONOMY" | "ISLAMIC_KNOWLEDGE";
  independenceGroup: string; // Used to prevent artificial agreement inflation across derivative traditions
  status: "ACTIVE" | "EXPERIMENTAL" | "REFERENCE_ONLY";
  version: string;
  calculationEngine: string;
  ephemerisBasis: "NASA_JPL_DE440" | "IAU_SOFA" | "TABULAR" | "SCRIPTURAL";
  primaryEvidenceSources: string[];
  testCoveragePercent: number;
  knownLimitations: string[];
}

export class TraditionRegistry {
  public static readonly DOMAINS: TraditionDomainRecord[] = [
    {
      domainId: "VEDIC_PARASHARI",
      name: "Vedic Parashari Jyotish (Nirayana)",
      category: "ASTROLOGY",
      independenceGroup: "INDIAN_SIDEREAL",
      status: "ACTIVE",
      version: "2.4.0",
      calculationEngine: "ASTROCORE",
      ephemerisBasis: "NASA_JPL_DE440",
      primaryEvidenceSources: ["Brihat Parashara Hora Shastra", "Phaladeepika", "Saravali", "Jataka Parijata"],
      testCoveragePercent: 98,
      knownLimitations: ["Sub-divisional charts beyond D9 require birth time precision within ±2 minutes."]
    },
    {
      domainId: "WESTERN_TROPICAL",
      name: "Western Tropical Astrology (Sayana)",
      category: "ASTROLOGY",
      independenceGroup: "WESTERN_TROPICAL",
      status: "ACTIVE",
      version: "2.4.0",
      calculationEngine: "ASTROCORE",
      ephemerisBasis: "NASA_JPL_DE440",
      primaryEvidenceSources: ["Ptolemy Tetrabiblos", "William Lilly Christian Astrology", "Robert Hand Planets in Transit"],
      testCoveragePercent: 96,
      knownLimitations: ["Progressions and Solar Arcs require verified birth timezone histories."]
    },
    {
      domainId: "KP_STELLAR",
      name: "KP Stellar Astrology (Krishnamurti Padhdhati)",
      category: "ASTROLOGY",
      independenceGroup: "INDIAN_SIDEREAL_KP",
      status: "ACTIVE",
      version: "2.4.0",
      calculationEngine: "ASTROCORE",
      ephemerisBasis: "NASA_JPL_DE440",
      primaryEvidenceSources: ["KP Readers Vol I-VI (Prof. K.S. Krishnamurti)"],
      testCoveragePercent: 95,
      knownLimitations: ["Sub-lord cusps shift rapidly with birth time uncertainty."]
    },
    {
      domainId: "JAIMINI_SUTRAS",
      name: "Jaimini Upadesha Sutras",
      category: "ASTROLOGY",
      independenceGroup: "INDIAN_JAIMINI",
      status: "ACTIVE",
      version: "2.4.0",
      calculationEngine: "ASTROCORE",
      ephemerisBasis: "NASA_JPL_DE440",
      primaryEvidenceSources: ["Jaimini Upadesha Sutras (Maharishi Jaimini)"],
      testCoveragePercent: 92,
      knownLimitations: ["Chara Karaka calculations require precise sub-degree planetary ranking."]
    },
    {
      domainId: "TAJIKA_ANNUAL",
      name: "Tajika Varshaphala (Solar Return)",
      category: "ASTROLOGY",
      independenceGroup: "INDIAN_TAJIKA",
      status: "ACTIVE",
      version: "2.4.0",
      calculationEngine: "ASTROCORE",
      ephemerisBasis: "NASA_JPL_DE440",
      primaryEvidenceSources: ["Tajika Neelakanthi", "Prashna Marga"],
      testCoveragePercent: 90,
      knownLimitations: ["Varshaphala chart valid exclusively for the single operating solar year."]
    },
    {
      domainId: "ASTRONOMY_CORE",
      name: "ASTRO-ASTRONOMY Core (Solar, Lunar, Planetary)",
      category: "ASTRONOMY",
      independenceGroup: "SCIENTIFIC_ASTRONOMY",
      status: "ACTIVE",
      version: "2.4.0",
      calculationEngine: "ASTRO-ASTRONOMY CORE",
      ephemerisBasis: "NASA_JPL_DE440",
      primaryEvidenceSources: ["IAU 2006 Precession Framework", "Astronomical Almanac (USNO/HMNAO)"],
      testCoveragePercent: 100,
      knownLimitations: ["Atmospheric refraction variations below 5° altitude."]
    },
    {
      domainId: "ISLAMIC_KNOWLEDGE",
      name: "Islamic Guidance & Jurisprudence (Qur'an, Hadith, Tafsir, Fiqh)",
      category: "ISLAMIC_KNOWLEDGE",
      independenceGroup: "ISLAMIC_REVELATION",
      status: "ACTIVE",
      version: "1.0.0",
      calculationEngine: "ISLAMIC_ENGINE_REGISTRY",
      ephemerisBasis: "SCRIPTURAL",
      primaryEvidenceSources: ["Holy Qur'an", "Sahih al-Bukhari", "Sahih Muslim", "Classical Tafsir", "5-Madhhab Fiqh Compendiums"],
      testCoveragePercent: 100,
      knownLimitations: ["Does not provide astrological predictions; strictly provides religious sources, ethics, and prayers."]
    }
  ];

  public static getDomain(domainId: string): TraditionDomainRecord | undefined {
    return this.DOMAINS.find(d => d.domainId === domainId);
  }
}
