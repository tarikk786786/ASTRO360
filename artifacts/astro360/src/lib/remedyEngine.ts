// ASTRO360 Multi-Tradition Astrological Diagnostic & Remedy Engine
// Delivers exact root-cause analysis, planetary diagnostics, and verified remedies across all 6 global astrology traditions.

export type AstrologyTraditionType = 'vedic' | 'western' | 'islamic' | 'chinese' | 'mayan' | 'scientific';

export interface PlanetaryRemedyItem {
  planet: string;
  symbol: string;
  problem: string;
  rootCause: string;
  vedicRemedies: {
    gemstone: string;
    mantra: string;
    yantra: string;
    charity: string;
  };
  westernRemedies: {
    crystal: string;
    herbalEssence: string;
    talismanRitual: string;
  };
  islamicRemedies: {
    quranicAyah: string;
    asmaUlHusna: string;
    sadaqahAction: string;
  };
  chineseRemedies: {
    fiveElement: string;
    fengShuiPlacement: string;
    colorHarmony: string;
  };
  mayanRemedies: {
    galacticTone: string;
    spiritAnimal: string;
    earthOffering: string;
  };
  scientificRemedies: {
    circadianWindow: string;
    spaceWeatherMitigation: string;
  };
}

export const MULTI_TRADITION_REMEDIES: PlanetaryRemedyItem[] = [
  {
    planet: 'Sun (Surya / Sol)',
    symbol: '☉',
    problem: 'Low confidence, career friction, lack of vitality, executive delay',
    rootCause: 'Sun transiting 9th House in Aries (or afflicted by Rahu/Saturn node)',
    vedicRemedies: {
      gemstone: 'Natural Ruby (Manik) set in Copper on Sunday morning',
      mantra: 'Om Hram Hrim Hroom Sah Suryaya Namah (108 times at sunrise)',
      yantra: 'Surya Yantra etched on copper plate placed in East direction',
      charity: 'Donate wheat grain, jaggery, or red clothes to elders on Sunday'
    },
    westernRemedies: {
      crystal: 'Sunstone & Citrine for solar plexus chakra alignment',
      herbalEssence: 'St. John\'s Wort & Frankincense Essential Oil',
      talismanRitual: 'Gold talisman worn during Sunday noon solar culmination'
    },
    islamicRemedies: {
      quranicAyah: 'Surah Ash-Shams (91:1-10) — "By the Sun and its brightness"',
      asmaUlHusna: 'Ya Noor (The Light), Ya Hayyu (The Ever-Living) x 100',
      sadaqahAction: 'Give morning charity (Sadaqah) before starting work'
    },
    chineseRemedies: {
      fiveElement: 'Yang Fire (Bing Fire) activation in South sector',
      fengShuiPlacement: 'Place bright warm light or red dragon emblem in South',
      colorHarmony: 'Wear Crimson Red, Gold, or Bright Orange'
    },
    mayanRemedies: {
      galacticTone: 'Tone 1: Magnetic Sun (Ahau) — Light & Enlightenment',
      spiritAnimal: 'Eagle (Kawil) — Vision and high spiritual perspective',
      earthOffering: 'Burn Copal resin incense at sunrise facing East'
    },
    scientificRemedies: {
      circadianWindow: 'Expose eyes to 10,000 lux natural morning sunlight for 15 mins',
      spaceWeatherMitigation: 'Monitor NOAA Solar Flare Kp-index during peak solar activity'
    }
  },
  {
    planet: 'Moon (Chandra / Luna)',
    symbol: '☽',
    problem: 'Emotional anxiety, sleep disturbance, mental restlessness, relationship mood swings',
    rootCause: 'Moon in 10th House in Taurus (Exalted) impacted by transit aspect',
    vedicRemedies: {
      gemstone: 'Natural South Sea Pearl (Moti) set in Silver on Monday evening',
      mantra: 'Om Shram Shrim Shrom Sah Chandraya Namah (108 times at dusk)',
      yantra: 'Chandra Yantra placed in North-West sector of residence',
      charity: 'Donate milk, rice, or silver ornaments to women on Monday'
    },
    westernRemedies: {
      crystal: 'Moonstone & Selenite for emotional intuitive cleansing',
      herbalEssence: 'Jasmine & Chamomile infusion before sleep',
      talismanRitual: 'Silver crescent pendant charged under Waxing Moon'
    },
    islamicRemedies: {
      quranicAyah: 'Surah Al-Qamar (54:1) — "The Hour has drawn near, and the moon has split"',
      asmaUlHusna: 'Ya Lateef (The Subtle), Ya Salam (The Source of Peace) x 129',
      sadaqahAction: 'Donate clean water or sponsor a well in honor of family peace'
    },
    chineseRemedies: {
      fiveElement: 'Yin Water (Gui Water) balance in North sector',
      fengShuiPlacement: 'Place quiet water feature or metallic singing bowl in North',
      colorHarmony: 'Wear Pure White, Pearl, or Soft Silver'
    },
    mayanRemedies: {
      galacticTone: 'Tone 2: Lunar Dragon (Imix) — Nurturing & Primordial Trust',
      spiritAnimal: 'Jaguar (Balam) — Intuitive night sight and emotional courage',
      earthOffering: 'Pour clean spring water onto earth at dusk with gratitude'
    },
    scientificRemedies: {
      circadianWindow: 'Dim screen blue light 2 hours before sleep to boost melatonin',
      spaceWeatherMitigation: 'Track 29.5-day synodic lunar sleep cycles using EEG/wearables'
    }
  },
  {
    planet: 'Saturn (Shani / Saturnus)',
    symbol: '♄',
    problem: 'Systemic delays, heavy responsibility burdens, career friction, chronic fatigue',
    rootCause: 'Saturn transiting 7th House in Aquarius (Own House) enforcing discipline',
    vedicRemedies: {
      gemstone: 'Natural Blue Sapphire (Neelam) set in Iron/Steel on Saturday',
      mantra: 'Om Pram Prim Prom Sah Shanaye Namah (108 times at dusk)',
      yantra: 'Shani Yantra placed in West direction of workplace',
      charity: 'Donate black sesame seeds, mustard oil, or iron utensils on Saturday'
    },
    westernRemedies: {
      crystal: 'Black Tourmaline & Onyx for heavy energy grounding',
      herbalEssence: 'Myrrh, Cypress & Cedarwood Essential Oil',
      talismanRitual: 'Lead or Hematite ring worn during Saturnian hour'
    },
    islamicRemedies: {
      quranicAyah: 'Surah Al-Inshirah (94:5-6) — "For indeed, with hardship comes ease"',
      asmaUlHusna: 'Ya Saboor (The Patient), Ya Malik (The Sovereign) x 100',
      sadaqahAction: 'Feed needy workers or laborers on Saturday mornings'
    },
    chineseRemedies: {
      fiveElement: 'Yin Earth (Ji Earth) stabilizing in Center/North-East',
      fengShuiPlacement: 'Place heavy black obsidian or mountain stone in West',
      colorHarmony: 'Wear Deep Navy Blue, Charcoal, or Black'
    },
    mayanRemedies: {
      galacticTone: 'Tone 7: Resonant Mirror (Etznab) — Order, Truth & Reflection',
      spiritAnimal: 'Owl (Caban) — Wisdom through quiet patience and endurance',
      earthOffering: 'Bury a black stone in soil with intention of firm grounding'
    },
    scientificRemedies: {
      circadianWindow: 'Establish strict consistent daily sleep-wake times (within 15 mins)',
      spaceWeatherMitigation: 'Engage in long-form focused work sprints without multitasking'
    }
  }
];
