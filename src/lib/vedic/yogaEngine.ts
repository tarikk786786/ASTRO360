/**
 * ASTRO360 Vedic Yoga Detection Engine
 * Deterministic Rule-Based Evaluator for Traditional Planetary Combinations
 */

export interface YogaResult {
  id: string;
  name: string;
  category: 'Raja' | 'Dhana' | 'Mahapurusha' | 'Auspicious' | 'Inauspicious';
  description: string;
  ruleUsed: string;
  isDetected: boolean;
  confidenceScore: number; // 0 to 100
  participatingPlanets: string[];
}

export class YogaEngine {
  /**
   * Evaluates planetary positions for traditional Vedic Yogas
   */
  public static detectYogas(planetPositions: Array<{ name: string; signIndex: number; houseNumber: number; isRetrograde?: boolean }>): YogaResult[] {
    const results: YogaResult[] = [];

    const sun = planetPositions.find(p => p.name === 'Sun');
    const moon = planetPositions.find(p => p.name === 'Moon');
    const mercury = planetPositions.find(p => p.name === 'Mercury');
    const mars = planetPositions.find(p => p.name === 'Mars');
    const jupiter = planetPositions.find(p => p.name === 'Jupiter');
    const venus = planetPositions.find(p => p.name === 'Venus');
    const saturn = planetPositions.find(p => p.name === 'Saturn');

    // 1. Budha-Aditya Yoga (Sun + Mercury in same sign/house)
    if (sun && mercury && sun.signIndex === mercury.signIndex) {
      results.push({
        id: 'budha_aditya',
        name: 'Budha-Aditya Yoga',
        category: 'Auspicious',
        description: 'Conjunction of Sun and Mercury enhances intellect, executive leadership, and academic acuity.',
        ruleUsed: 'Sun and Mercury occupy the same zodiac sign.',
        isDetected: true,
        confidenceScore: 95,
        participatingPlanets: ['Sun', 'Mercury'],
      });
    }

    // 2. Gaja-Kesari Yoga (Jupiter in Kendra 1, 4, 7, 10 from Moon)
    if (jupiter && moon) {
      const moonHouse = moon.houseNumber || 1;
      const jupiterHouse = jupiter.houseNumber || 1;
      const diff = Math.abs(jupiterHouse - moonHouse);
      const isKendra = diff === 0 || diff === 3 || diff === 6 || diff === 9;

      if (isKendra) {
        results.push({
          id: 'gaja_kesari',
          name: 'Gaja-Kesari Yoga',
          category: 'Raja',
          description: 'Jupiter in a quadrant (Kendra) from Moon confers wisdom, lasting fame, prosperity, and protection.',
          ruleUsed: 'Jupiter occupies a Kendra house (1st, 4th, 7th, or 10th) from Moon.',
          isDetected: true,
          confidenceScore: 92,
          participatingPlanets: ['Jupiter', 'Moon'],
        });
      }
    }

    // 3. Pancha Mahapurusha Yogas (Mars, Mercury, Jupiter, Venus, Saturn in Own/Exalted sign in Kendra)
    // Ruchaka Yoga (Mars)
    if (mars && [0, 7, 9].includes(mars.signIndex) && [1, 4, 7, 10].includes(mars.houseNumber)) {
      results.push({
        id: 'ruchaka_yoga',
        name: 'Ruchaka Yoga (Pancha Mahapurusha)',
        category: 'Mahapurusha',
        description: 'Mars in Aries, Scorpio, or Capricorn in a Kendra house bestows courage, physical prowess, and strategic authority.',
        ruleUsed: 'Mars in own or exalted sign in a Kendra house.',
        isDetected: true,
        confidenceScore: 98,
        participatingPlanets: ['Mars'],
      });
    }

    // Bhadra Yoga (Mercury)
    if (mercury && [2, 5].includes(mercury.signIndex) && [1, 4, 7, 10].includes(mercury.houseNumber)) {
      results.push({
        id: 'bhadra_yoga',
        name: 'Bhadra Yoga (Pancha Mahapurusha)',
        category: 'Mahapurusha',
        description: 'Mercury in Gemini or Virgo in a Kendra house grants exceptional intellect, eloquence, and commercial success.',
        ruleUsed: 'Mercury in own or exalted sign in a Kendra house.',
        isDetected: true,
        confidenceScore: 98,
        participatingPlanets: ['Mercury'],
      });
    }

    // Hamsa Yoga (Jupiter)
    if (jupiter && [8, 11, 3].includes(jupiter.signIndex) && [1, 4, 7, 10].includes(jupiter.houseNumber)) {
      results.push({
        id: 'hamsa_yoga',
        name: 'Hamsa Yoga (Pancha Mahapurusha)',
        category: 'Mahapurusha',
        description: 'Jupiter in Sagittarius, Pisces, or Cancer in a Kendra house grants spiritual purity, noble character, and immense wisdom.',
        ruleUsed: 'Jupiter in own or exalted sign in a Kendra house.',
        isDetected: true,
        confidenceScore: 98,
        participatingPlanets: ['Jupiter'],
      });
    }

    // Malavya Yoga (Venus)
    if (venus && [1, 6, 11].includes(venus.signIndex) && [1, 4, 7, 10].includes(venus.houseNumber)) {
      results.push({
        id: 'malavya_yoga',
        name: 'Malavya Yoga (Pancha Mahapurusha)',
        category: 'Mahapurusha',
        description: 'Venus in Taurus, Libra, or Pisces in a Kendra house bestows artistic genius, charm, refined luxury, and happiness.',
        ruleUsed: 'Venus in own or exalted sign in a Kendra house.',
        isDetected: true,
        confidenceScore: 98,
        participatingPlanets: ['Venus'],
      });
    }

    // Sasa Yoga (Saturn)
    if (saturn && [9, 10, 6].includes(saturn.signIndex) && [1, 4, 7, 10].includes(saturn.houseNumber)) {
      results.push({
        id: 'sasa_yoga',
        name: 'Sasa Yoga (Pancha Mahapurusha)',
        category: 'Mahapurusha',
        description: 'Saturn in Capricorn, Aquarius, or Libra in a Kendra house confers perseverance, organizational leadership, and authority over institutions.',
        ruleUsed: 'Saturn in own or exalted sign in a Kendra house.',
        isDetected: true,
        confidenceScore: 98,
        participatingPlanets: ['Saturn'],
      });
    }

    // 4. Chandra-Mangala Yoga (Moon + Mars)
    if (moon && mars && moon.signIndex === mars.signIndex) {
      results.push({
        id: 'chandra_mangala',
        name: 'Chandra-Mangala Yoga',
        category: 'Dhana',
        description: 'Conjunction of Moon and Mars creates strong financial acumen, drive, and wealth accumulation.',
        ruleUsed: 'Moon and Mars occupy the same zodiac sign.',
        isDetected: true,
        confidenceScore: 90,
        participatingPlanets: ['Moon', 'Mars'],
      });
    }

    return results;
  }
}
