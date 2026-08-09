/**
 * ASTRO360 Bhagavad Gita API Engine
 * Official Integration for Bhagavad Gita Open API (https://github.com/gita/bhagavad-gita-api)
 * Covers: 18 Chapters, 700 Slokas, Translations, Transliteration, & Commentaries
 */

export interface GitaChapter {
  chapter_number: number;
  name: string;
  name_meaning: string;
  name_translation: string;
  name_transliteration: string;
  verses_count: number;
  summary: {
    en: string;
    hi?: string;
  };
}

export interface GitaVerse {
  chapter: number;
  verse: number;
  slok: string; // Sanskrit text
  transliteration: string;
  tej?: { author: string; ht: string };
  siva?: { author: string; et: string };
  purohit?: { author: string; et: string };
  chinmay?: { author: string; hc: string };
  san?: { author: string; et: string };
  adi?: { author: string; et: string };
  gambir?: { author: string; et: string };
}

export class GitaEngine {
  private static BASE_URL = 'https://bhagavadgitaapi.in';
  private static FALLBACK_BASE_URL = 'https://gita-api.vercel.app';

  /**
   * Fetch all 18 Chapters of the Bhagavad Gita
   */
  public static async fetchChapters(): Promise<GitaChapter[]> {
    try {
      const res = await fetch(`${this.BASE_URL}/chapters`);
      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data) ? data : [];
      }
      
      const fbRes = await fetch(`${this.FALLBACK_BASE_URL}/chapters`);
      if (fbRes.ok) {
        return await fbRes.json();
      }
    } catch (e) {
      console.warn('Gita API fetchChapters error, using built-in metadata fallback:', e);
    }

    // Built-in 18 Chapters Metadata Fallback
    return [
      { chapter_number: 1, name: 'अर्जुनविषादयोग', name_meaning: 'Arjuna\'s Dilemma', name_translation: 'Observing the Armies', name_transliteration: 'Arjuna Viṣāda Yoga', verses_count: 47, summary: { en: 'Arjuna sees his relatives on the battlefield of Kurukshetra and becomes overwhelmed with grief and confusion.' } },
      { chapter_number: 2, name: 'सांख्ययोग', name_meaning: 'Transcendental Knowledge', name_translation: 'Contents of the Gita Summarized', name_transliteration: 'Sāṅkhya Yoga', verses_count: 72, summary: { en: 'Lord Krishna imparts divine knowledge regarding the eternal nature of the soul (Atman) and duty (Dharma).' } },
      { chapter_number: 3, name: 'कर्मयोग', name_meaning: 'Path of Selfless Action', name_translation: 'Karma Yoga', name_transliteration: 'Karma Yoga', verses_count: 43, summary: { en: 'Krishna explains the necessity of selfless duty without attachment to the fruits of action.' } },
      { chapter_number: 4, name: 'ज्ञानकर्मसंन्यासयोग', name_meaning: 'Path of Wisdom & Action', name_translation: 'Transcendental Knowledge', name_transliteration: 'Jñāna Karma Sannyāsa Yoga', verses_count: 42, summary: { en: 'Krishna reveals divine incarnations (Avatara) and how spiritual knowledge purifies all karma.' } },
      { chapter_number: 5, name: 'कर्मसंन्यासयोग', name_meaning: 'Path of Renunciation', name_translation: 'Karma Action and Renunciation', name_transliteration: 'Karma Sannyāsa Yoga', verses_count: 29, summary: { en: 'Krishna explains that true renunciation is performing duty with mind detached from desires.' } },
      { chapter_number: 6, name: 'आत्मसंयमयोग', name_meaning: 'Path of Meditation', name_translation: 'Dhyana Yoga', name_transliteration: 'Ātma Saṁyama Yoga', verses_count: 47, summary: { en: 'Krishna describes Ashtanga Yoga, mind control, and deep meditation upon the Supreme Self.' } },
      { chapter_number: 7, name: 'ज्ञानविज्ञानयोग', name_meaning: 'Knowledge of the Ultimate Truth', name_translation: 'Knowledge of the Ultimate', name_transliteration: 'Jñāna Vijñāna Yoga', verses_count: 30, summary: { en: 'Krishna manifests His material and spiritual energies and reveals four types of devotees.' } },
      { chapter_number: 8, name: 'अक्षरब्रह्मयोग', name_meaning: 'Attaining the Supreme', name_translation: 'Attaining the Supreme', name_transliteration: 'Akṣara Brahma Yoga', verses_count: 28, summary: { en: 'Krishna teaches how remembrance of the Supreme at the time of death leads to liberation (Moksha).' } },
      { chapter_number: 9, name: 'राजविद्याराजगुह्ययोग', name_meaning: 'Royal Knowledge & Secret', name_translation: 'The Most Confidential Knowledge', name_transliteration: 'Rāja Vidyā Rāja Guhya Yoga', verses_count: 34, summary: { en: 'Krishna reveals supreme devotion (Bhakti) and how He preserves what His devotees lack.' } },
      { chapter_number: 10, name: 'विभूतियोग', name_meaning: 'Divine Opulences', name_translation: 'The Opulence of the Absolute', name_transliteration: 'Vibhūti Yoga', verses_count: 42, summary: { en: 'Krishna describes His divine manifestations as the Sun among stars, Om among sounds, and Rama among warriors.' } },
      { chapter_number: 11, name: 'विश्वरूपदर्शनयोग', name_meaning: 'Cosmic Form Revelation', name_translation: 'The Universal Form', name_transliteration: 'Viśvarūpa Darśana Yoga', verses_count: 55, summary: { en: 'Krishna grants Arjuna divine vision to behold the terrifying and glorious Vishvarupa (Universal Cosmic Form).' } },
      { chapter_number: 12, name: 'भक्तियोग', name_meaning: 'Path of Devotion', name_translation: 'Devotional Service', name_transliteration: 'Bhakti Yoga', verses_count: 20, summary: { en: 'Krishna extols pure devotional love as the sweetest and most direct path to God-realization.' } },
      { chapter_number: 13, name: 'क्षेत्रक्षेत्रज्ञविभागयोग', name_meaning: 'Field & Knower of the Field', name_translation: 'Nature, the Enjoyer, and Consciousness', name_transliteration: 'Kṣetra Kṣetrajña Vibhāga Yoga', verses_count: 35, summary: { en: 'Krishna distinguishes the body (Kshetra), the individual soul (Kshetrajna), and the Supreme Soul.' } },
      { chapter_number: 14, name: 'गुणत्रयविभागयोग', name_meaning: 'Three Modes of Material Nature', name_translation: 'The Three Gunas', name_transliteration: 'Guṇatraya Vibhāga Yoga', verses_count: 27, summary: { en: 'Krishna details Sattva (goodness), Rajas (passion), and Tamas (ignorance) and how to transcend them.' } },
      { chapter_number: 15, name: 'पुरुषोत्तमयोग', name_meaning: 'Supreme Divine Person', name_translation: 'The Yoga of the Supreme Person', name_transliteration: 'Puruṣottama Yoga', verses_count: 20, summary: { en: 'Krishna compares the material world to an upside-down Banyan tree and reveals Himself as Purushottama.' } },
      { chapter_number: 16, name: 'दैवासुरसम्पद्विभागयोग', name_meaning: 'Divine & Demonic Natures', name_translation: 'Divine and Demonic Natures', name_transliteration: 'Daivāsura Sampad Vibhāga Yoga', verses_count: 24, summary: { en: 'Krishna contrasts divine virtues (honesty, compassion) with demonic vices (lust, anger, greed).' } },
      { chapter_number: 17, name: 'श्रद्धात्रयविभागयोग', name_meaning: 'Three Divisions of Faith', name_translation: 'The Divisions of Faith', name_transliteration: 'Śraddhātraya Vibhāga Yoga', verses_count: 28, summary: { en: 'Krishna explains how faith, food, sacrifice, austerity, and charity are shaped by the three Gunas.' } },
      { chapter_number: 18, name: 'मोक्षसंन्यासयोग', name_meaning: 'Liberation through Renunciation', name_translation: 'Conclusion—The Perfection of Renunciation', name_transliteration: 'Mokṣa Sannyāsa Yoga', verses_count: 78, summary: { en: 'The grand synthesis of the Bhagavad Gita, culminating in total surrender (Sharanagati) to Krishna.' } }
    ];
  }

  /**
   * Fetch a specific Verse/Sloka by Chapter and Verse Number
   */
  public static async fetchVerse(chapter: number, verse: number): Promise<GitaVerse | null> {
    try {
      const res = await fetch(`${this.BASE_URL}/slok/${chapter}/${verse}`);
      if (res.ok) {
        return await res.json();
      }

      const fbRes = await fetch(`${this.FALLBACK_BASE_URL}/slok/${chapter}/${verse}`);
      if (fbRes.ok) {
        return await fbRes.json();
      }
    } catch (e) {
      console.warn(`Gita API fetchVerse (${chapter}:${verse}) error:`, e);
    }

    // High Quality Fallback for Gita Sloka 2:47
    if (chapter === 2 && verse === 47) {
      return {
        chapter: 2,
        verse: 47,
        slok: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
        transliteration: 'karmaṇy-evādhikāras te mā phaleṣu kadāchana | mā karma-phala-hetur bhūr mā te saṅgo ’stv akarmaṇi ||',
        siva: { author: 'Swami Sivananda', et: 'You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.' },
        purohit: { author: 'Shri Purohit Swami', et: 'Thy right is to work only, but never to its fruits; let not the fruit of action be thy motive, nor let thy attachment be to inaction.' }
      };
    }

    return null;
  }
}
