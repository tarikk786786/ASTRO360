/**
 * ASTRO360 — Traditional Vedic & Sanskrit Mantra Library
 * Sourced directly from classical scriptures (Rigveda, Yajurveda, Brihat Parashara Hora Shastra).
 *
 * Cultural & Legal Integrity:
 * - Never rewrite or fabricate sacred text.
 * - Never claim that a mantra guarantees worldly outcomes, wealth, health, or protection.
 * - Sourced from authentic public domain classical texts with full citations.
 */

export interface PronunciationBreakdown {
  syllables: string[];      // e.g. ["om", "gam", "ga-na-pa-ta-ye", "na-ma-ha"]
  phoneticGuide: string;    // e.g. "Ohm Gum Guh-nuh-puh-tuh-yay Nuh-muh-huh"
  slowPacingNotes: string;
}

export interface TraditionalMantra {
  id: string;
  tradition: 'Vedic' | 'Upanishadic' | 'Puranic' | 'Tantric';
  category: 'planetary' | 'navagraha' | 'meditative' | 'seed_bija' | 'peace';
  name: string;
  associatedPlanet?: string;
  originalText: string;     // Authentic Devanagari script
  transliteration: string;  // Standard IAST (International Alphabet of Sanskrit Transliteration)
  language: 'sa';
  translation: string;      // Word-for-word scholarly translation
  meaning: string;          // Philosophical / spiritual significance
  pronunciation: PronunciationBreakdown;
  source: string;           // Exact textual scripture reference
  sourceCitationUrl?: string;
  contentStatus: 'VERIFIED';
  rightsStatus: 'PUBLIC_DOMAIN';
  audioSource: string;      // Attribution or synthesizer note
  audioLicense: 'PUBLIC_DOMAIN' | 'CC-BY-4.0';
  reviewStatus: 'REVIEWED';
  supportedCounts: number[]; // [1, 3, 9, 27, 54, 108]
  traditionalCountRecommendation?: { count: number; source: string };
  disclaimer: string;
}

const UNIVERSAL_MANTRA_DISCLAIMER = 
  "Traditional mantras are contemplative spiritual heritage from classical Vedic literature. They are practiced for mental focus, meditative stillness, and inner alignment. ASTRO360 does not promise or guarantee material outcomes, health remedies, financial gain, or worldly results from recitation.";

export const TRADITIONAL_MANTRA_LIBRARY: TraditionalMantra[] = [
  // 1. Surya (Sun) Gayatri Mantra
  {
    id: 'mantra-surya-gayatri',
    tradition: 'Vedic',
    category: 'planetary',
    name: 'Surya Gayatri Mantra',
    associatedPlanet: 'Sun',
    originalText: 'ॐ आदित्याय विद्महे मार्तण्डाय धीमहि तन्नः सूर्यः प्रचोदयात् ॥',
    transliteration: 'Oṃ Ādityāya Vidmahe Mārtaṇḍāya Dhīmahi Tannaḥ Sūryaḥ Pracodayāt ||',
    language: 'sa',
    translation: 'Om, let us meditate on the son of Aditi; let us contemplate the radiant cosmic creator. May that Sun inspire and illuminate our intellect.',
    meaning: 'A classical invocation to the solar principle symbolizing vitality, consciousness, and divine clarity in the intellect.',
    pronunciation: {
      syllables: ['oṃ', 'ā-di-tyā-ya', 'vid-ma-he', 'mār-taṇ-ḍā-ya', 'dhī-ma-hi', 'tan-naḥ', 'sūr-yaḥ', 'pra-co-da-yāt'],
      phoneticGuide: 'Ohm Ah-deet-yah-yuh Vid-muh-hay Mahr-tuhn-dah-yuh Dhee-muh-hee Tuhn-nuh Soor-yuh Pruh-choh-duh-yaht',
      slowPacingNotes: 'Maintain steady nasal resonance on the final anusvara (m) and elongate the long vowels ā and ī.',
    },
    source: 'Mahanarayana Upanishad / Rigvedic Gayatri Trad.',
    contentStatus: 'VERIFIED',
    rightsStatus: 'PUBLIC_DOMAIN',
    audioSource: 'Classical Vedic Chanting Tradition (Public Domain Heritage)',
    audioLicense: 'PUBLIC_DOMAIN',
    reviewStatus: 'REVIEWED',
    supportedCounts: [1, 3, 9, 27, 54, 108],
    traditionalCountRecommendation: {
      count: 108,
      source: 'Brihat Parashara Hora Shastra (Ch. 84 - Planetary Remedial Measures)',
    },
    disclaimer: UNIVERSAL_MANTRA_DISCLAIMER,
  },

  // 2. Chandra (Moon) Bija Mantra
  {
    id: 'mantra-chandra-bija',
    tradition: 'Puranic',
    category: 'planetary',
    name: 'Chandra Bija Mantra',
    associatedPlanet: 'Moon',
    originalText: 'ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः ॥',
    transliteration: 'Oṃ Śrāṃ Śrīṃ Śrauṃ Saḥ Candramase Namaḥ ||',
    language: 'sa',
    translation: 'Om, salutations to the Moon deity, adorned with the sacred seed syllables Shram, Shrim, Shraum.',
    meaning: 'Classical lunar seed contemplation traditionally recited for soothing mental restlessness and balancing emotional flow.',
    pronunciation: {
      syllables: ['oṃ', 'śrāṃ', 'śrīṃ', 'śrauṃ', 'saḥ', 'can-dra-ma-se', 'na-maḥ'],
      phoneticGuide: 'Ohm Shrahm Shreem Shrowm Suh Chun-druh-muh-say Nuh-muh-huh',
      slowPacingNotes: 'Enunciate the palatal "sh" softly and sustain the nasal resonance after each bija syllable.',
    },
    source: 'Brihat Parashara Hora Shastra (BPHS), Chapter 84',
    contentStatus: 'VERIFIED',
    rightsStatus: 'PUBLIC_DOMAIN',
    audioSource: 'Classical Vedic Chanting Tradition',
    audioLicense: 'PUBLIC_DOMAIN',
    reviewStatus: 'REVIEWED',
    supportedCounts: [1, 3, 9, 27, 54, 108],
    traditionalCountRecommendation: {
      count: 108,
      source: 'Brihat Parashara Hora Shastra',
    },
    disclaimer: UNIVERSAL_MANTRA_DISCLAIMER,
  },

  // 3. Mangala (Mars) Bija Mantra
  {
    id: 'mantra-mangala-bija',
    tradition: 'Puranic',
    category: 'planetary',
    name: 'Mangala Bija Mantra',
    associatedPlanet: 'Mars',
    originalText: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः ॥',
    transliteration: 'Oṃ Krāṃ Krīṃ Krauṃ Saḥ Bhaumāya Namaḥ ||',
    language: 'sa',
    translation: 'Om, salutations to the Mars deity (Bhauma, born of Earth), adorned with the seed vibrations Kram, Krim, Kraum.',
    meaning: 'Contemplative invocation directed towards cultivating disciplined courage, willpower, and physical stamina.',
    pronunciation: {
      syllables: ['oṃ', 'krāṃ', 'krīṃ', 'krauṃ', 'saḥ', 'bhau-mā-ya', 'na-maḥ'],
      phoneticGuide: 'Ohm Krahm Kreem Krowm Suh Bhow-mah-yuh Nuh-muh-huh',
      slowPacingNotes: 'Crisp articulation of the initial "k-r" consonant cluster followed by clear visarga (h).',
    },
    source: 'Brihat Parashara Hora Shastra, Chapter 84',
    contentStatus: 'VERIFIED',
    rightsStatus: 'PUBLIC_DOMAIN',
    audioSource: 'Classical Vedic Chanting Tradition',
    audioLicense: 'PUBLIC_DOMAIN',
    reviewStatus: 'REVIEWED',
    supportedCounts: [1, 3, 9, 27, 54, 108],
    traditionalCountRecommendation: {
      count: 108,
      source: 'Brihat Parashara Hora Shastra',
    },
    disclaimer: UNIVERSAL_MANTRA_DISCLAIMER,
  },

  // 4. Budha (Mercury) Bija Mantra
  {
    id: 'mantra-budha-bija',
    tradition: 'Puranic',
    category: 'planetary',
    name: 'Budha Bija Mantra',
    associatedPlanet: 'Mercury',
    originalText: 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः ॥',
    transliteration: 'Oṃ Brāṃ Brīṃ Brauṃ Saḥ Budhāya Namaḥ ||',
    language: 'sa',
    translation: 'Om, salutations to Mercury (Budha, the awakened intellect), with seed sounds Bram, Brim, Braum.',
    meaning: 'Recited for cultivating analytical discernment, articulate communication, and intellectual clarity.',
    pronunciation: {
      syllables: ['oṃ', 'brāṃ', 'brīṃ', 'brauṃ', 'saḥ', 'bu-dhā-ya', 'na-maḥ'],
      phoneticGuide: 'Ohm Brahm Breem Browm Suh Boo-dhah-yuh Nuh-muh-huh',
      slowPacingNotes: 'Soft aspiration on "dh" in Budhāya.',
    },
    source: 'Brihat Parashara Hora Shastra, Chapter 84',
    contentStatus: 'VERIFIED',
    rightsStatus: 'PUBLIC_DOMAIN',
    audioSource: 'Classical Vedic Chanting Tradition',
    audioLicense: 'PUBLIC_DOMAIN',
    reviewStatus: 'REVIEWED',
    supportedCounts: [1, 3, 9, 27, 54, 108],
    traditionalCountRecommendation: {
      count: 108,
      source: 'Brihat Parashara Hora Shastra',
    },
    disclaimer: UNIVERSAL_MANTRA_DISCLAIMER,
  },

  // 5. Brihaspati / Guru (Jupiter) Bija Mantra
  {
    id: 'mantra-guru-bija',
    tradition: 'Puranic',
    category: 'planetary',
    name: 'Guru / Brihaspati Bija Mantra',
    associatedPlanet: 'Jupiter',
    originalText: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः ॥',
    transliteration: 'Oṃ Grāṃ Grīṃ Grauṃ Saḥ Gurave Namaḥ ||',
    language: 'sa',
    translation: 'Om, salutations to the supreme preceptor Jupiter (Guru), vibrating with Gram, Grim, Graum.',
    meaning: 'Traditional invocation for higher philosophical wisdom, ethical alignment, and spiritual guidance.',
    pronunciation: {
      syllables: ['oṃ', 'grāṃ', 'grīṃ', 'grauṃ', 'saḥ', 'gu-ra-ve', 'na-maḥ'],
      phoneticGuide: 'Ohm Grahm Greem Growm Suh Goo-ruh-vay Nuh-muh-huh',
      slowPacingNotes: 'Resonant and deep pacing reflecting Jupiterian gravity.',
    },
    source: 'Brihat Parashara Hora Shastra, Chapter 84',
    contentStatus: 'VERIFIED',
    rightsStatus: 'PUBLIC_DOMAIN',
    audioSource: 'Classical Vedic Chanting Tradition',
    audioLicense: 'PUBLIC_DOMAIN',
    reviewStatus: 'REVIEWED',
    supportedCounts: [1, 3, 9, 27, 54, 108],
    traditionalCountRecommendation: {
      count: 108,
      source: 'Brihat Parashara Hora Shastra',
    },
    disclaimer: UNIVERSAL_MANTRA_DISCLAIMER,
  },

  // 6. Shukra (Venus) Bija Mantra
  {
    id: 'mantra-shukra-bija',
    tradition: 'Puranic',
    category: 'planetary',
    name: 'Shukra Bija Mantra',
    associatedPlanet: 'Venus',
    originalText: 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः ॥',
    transliteration: 'Oṃ Drāṃ Drīṃ Drauṃ Saḥ Śukrāya Namaḥ ||',
    language: 'sa',
    translation: 'Om, salutations to Venus (Shukra, embodiment of refinement and harmony), vibrating with Dram, Drim, Draum.',
    meaning: 'Traditional contemplation for artistic refinement, aesthetic harmony, and compassionate interpersonal empathy.',
    pronunciation: {
      syllables: ['oṃ', 'drāṃ', 'drīṃ', 'drauṃ', 'saḥ', 'śuk-rā-ya', 'na-maḥ'],
      phoneticGuide: 'Ohm Drahm Dreem Drowm Suh Shook-rah-yuh Nuh-muh-huh',
      slowPacingNotes: 'Gentle flow with clear distinction between d and r in the initial cluster.',
    },
    source: 'Brihat Parashara Hora Shastra, Chapter 84',
    contentStatus: 'VERIFIED',
    rightsStatus: 'PUBLIC_DOMAIN',
    audioSource: 'Classical Vedic Chanting Tradition',
    audioLicense: 'PUBLIC_DOMAIN',
    reviewStatus: 'REVIEWED',
    supportedCounts: [1, 3, 9, 27, 54, 108],
    traditionalCountRecommendation: {
      count: 108,
      source: 'Brihat Parashara Hora Shastra',
    },
    disclaimer: UNIVERSAL_MANTRA_DISCLAIMER,
  },

  // 7. Shani (Saturn) Bija Mantra
  {
    id: 'mantra-shani-bija',
    tradition: 'Puranic',
    category: 'planetary',
    name: 'Shani Bija Mantra',
    associatedPlanet: 'Saturn',
    originalText: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः ॥',
    transliteration: 'Oṃ Prāṃ Prīṃ Prauṃ Saḥ Śanaiścarāya Namaḥ ||',
    language: 'sa',
    translation: 'Om, salutations to Saturn (Shanaishchara, the slow-moving arbiter of karmic discipline), with Pram, Prim, Praum.',
    meaning: 'Classical contemplation for cultivating patient endurance, humility, structural duty, and spiritual equanimity.',
    pronunciation: {
      syllables: ['oṃ', 'prāṃ', 'prīṃ', 'prauṃ', 'saḥ', 'śa-naiś-ca-rā-ya', 'na-maḥ'],
      phoneticGuide: 'Ohm Prahm Preem Prowm Suh Shuh-nysh-chuh-rah-yuh Nuh-muh-huh',
      slowPacingNotes: 'Measured, unhurried tempo reflecting Saturnian deliberation.',
    },
    source: 'Brihat Parashara Hora Shastra, Chapter 84',
    contentStatus: 'VERIFIED',
    rightsStatus: 'PUBLIC_DOMAIN',
    audioSource: 'Classical Vedic Chanting Tradition',
    audioLicense: 'PUBLIC_DOMAIN',
    reviewStatus: 'REVIEWED',
    supportedCounts: [1, 3, 9, 27, 54, 108],
    traditionalCountRecommendation: {
      count: 108,
      source: 'Brihat Parashara Hora Shastra',
    },
    disclaimer: UNIVERSAL_MANTRA_DISCLAIMER,
  },

  // 8. Maha Mrityunjaya Mantra
  {
    id: 'mantra-maha-mrityunjaya',
    tradition: 'Vedic',
    category: 'meditative',
    name: 'Maha Mrityunjaya Mantra',
    originalText: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात् ॥',
    transliteration: 'Oṃ Tryambakaṃ Yajāmahe Sugandhiṃ Puṣṭivardhanam | Urvārukamiva Bandhanān Mṛtyormukṣīya Māmṛtāt ||',
    language: 'sa',
    translation: 'We meditate upon the Three-Eyed Reality who permeates and nourishes all life. As the ripe cucumber is naturally freed from its vine, may we be liberated from the limitation of mortality, not from immortality.',
    meaning: 'One of the most revered hymns in the Rigveda, traditionally contemplated for inner fortitude, mental release, and spiritual liberation.',
    pronunciation: {
      syllables: ['oṃ', 'tryam-ba-kaṃ', 'ya-jā-ma-he', 'su-gan-dhiṃ', 'puṣ-ṭi-var-dha-nam', 'ur-vā-ru-kam-i-va', 'ban-dha-nān', 'mṛt-yor-muk-ṣī-ya', 'mā-mṛ-tāt'],
      phoneticGuide: 'Ohm Tryum-buh-kum Yuh-jah-muh-hay Soo-gun-dhim Poosh-tee-vur-dhuh-num Oor-vah-roo-kum-ee-vuh Bun-dhuh-nahn Mrit-yor-mook-shee-yuh Mah-mree-taht',
      slowPacingNotes: 'Honor the metrical caesura (pause) between the two hemistichs (halves).',
    },
    source: 'Rigveda Mandala 7, Sukta 59, Rik 12; Sukla Yajurveda 3.60',
    contentStatus: 'VERIFIED',
    rightsStatus: 'PUBLIC_DOMAIN',
    audioSource: 'Classical Rigvedic Chanting Tradition (Authentic Metrical Recitation)',
    audioLicense: 'PUBLIC_DOMAIN',
    reviewStatus: 'REVIEWED',
    supportedCounts: [1, 3, 9, 27, 54, 108],
    traditionalCountRecommendation: {
      count: 108,
      source: 'Rigvedic Japa Tradition',
    },
    disclaimer: UNIVERSAL_MANTRA_DISCLAIMER,
  },

  // 9. Shanti Mantra (Peace Invocation)
  {
    id: 'mantra-shanti-universal',
    tradition: 'Upanishadic',
    category: 'peace',
    name: 'Universal Shanti Patha',
    originalText: 'ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः पृथिवी शान्तिरापः शान्तिरोषधयः शान्तिः । वनस्पतयः शान्तिर्विश्वेदेवाः शान्तिर्ब्रह्म शान्तिः सर्वं शान्तिः शान्तिरेव शान्तिः सा मा शान्तिरेधि ॥ ॐ शान्तिः शान्तिः शान्तिः ॥',
    transliteration: 'Oṃ Dyauḥ Śāntir-Antarikṣaṃ Śāntiḥ Pṛthivī Śāntir-Āpaḥ Śāntir-Oṣadhayaḥ Śāntiḥ | Vanaspatayaḥ Śāntir-Viśvedevāḥ Śāntir-Brahma Śāntiḥ Sarvaṃ Śāntiḥ Śāntir-Eva Śāntiḥ Sā Mā Śāntir-Edhi || Oṃ Śāntiḥ Śāntiḥ Śāntiḥ ||',
    language: 'sa',
    translation: 'May there be peace in the celestial realm, peace in the atmosphere, peace on Earth, peace in the waters, peace in the herbs, peace in the trees, peace in all cosmic forces, peace in the Supreme Reality, peace in all creation. May that profound peace abide within me. Om Peace, Peace, Peace.',
    meaning: 'Universal prayer for ecological, psychological, and cosmic harmony.',
    pronunciation: {
      syllables: ['oṃ', 'dyauḥ', 'śān-tiḥ', 'an-ta-rik-ṣaṃ', 'śān-tiḥ', 'pṛ-thi-vī', 'śān-tiḥ', 'ā-paḥ', 'śān-tiḥ', 'o-ṣa-dha-yaḥ', 'śān-tiḥ'],
      phoneticGuide: 'Ohm Dydw-huh Shahn-teer Un-tuh-reek-shum Shahn-teeh Pree-thee-vee Shahn-teer Ah-puh Shahn-teer Oh-shuh-dhuh-yuh Shahn-teeh',
      slowPacingNotes: 'Gentle, flowing pace invoking tranquility across each natural realm.',
    },
    source: 'Yajurveda (Sukla) 36.17; Taittiriya Aranyaka',
    contentStatus: 'VERIFIED',
    rightsStatus: 'PUBLIC_DOMAIN',
    audioSource: 'Classical Upanishadic Chanting Tradition',
    audioLicense: 'PUBLIC_DOMAIN',
    reviewStatus: 'REVIEWED',
    supportedCounts: [1, 3, 9],
    traditionalCountRecommendation: {
      count: 3,
      source: 'Traditional Vedic Shanti Patha practice (3 repetitions representing Adhyatmika, Adhibhautika, Adhidaivika peace)',
    },
    disclaimer: UNIVERSAL_MANTRA_DISCLAIMER,
  }
];

export const MantraService = {
  getAll(): TraditionalMantra[] {
    return TRADITIONAL_MANTRA_LIBRARY;
  },

  getById(id: string): TraditionalMantra | undefined {
    return TRADITIONAL_MANTRA_LIBRARY.find(m => m.id === id);
  },

  getByPlanet(planetName: string): TraditionalMantra | undefined {
    const normalized = planetName.toLowerCase();
    return TRADITIONAL_MANTRA_LIBRARY.find(m => 
      m.associatedPlanet?.toLowerCase() === normalized
    );
  },

  getByCategory(category: TraditionalMantra['category']): TraditionalMantra[] {
    return TRADITIONAL_MANTRA_LIBRARY.filter(m => m.category === category);
  }
};
