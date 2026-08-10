/**
 * ASTRO360 Vedic Astrology Reference Data & Calculation Engine
 * 
 * Includes comprehensive reference data for:
 * - 12 Rashis (Zodiac Signs)
 * - 27 Nakshatras (Lunar Mansions) with 108 Padas & Navamsha mappings
 * - 9 Grahas (Planets) with natural friendships, mantras, and dignities
 * - Exaltation, Debilitation, Moolatrikona, & Own Sign dignities
 * - Natural, Temporal, and Panchadha Maitri (5-fold) Friendship rules
 * - Vedic Drishti (Planetary Aspect) calculation rules
 * - Karakas for 12 Houses (Bhava Karakas) & 7 Jaimini Karakas
 */

export type GrahaId =
  | 'surya'
  | 'chandra'
  | 'mangala'
  | 'budha'
  | 'guru'
  | 'shukra'
  | 'shani'
  | 'rahu'
  | 'ketu';

export type ElementVedic = 'agni' | 'prithvi' | 'vayu' | 'jala'; // Fire, Earth, Air, Water
export type ModalityVedic = 'chara' | 'sthira' | 'dwisvabhava'; // Movable, Fixed, Dual
export type GunaVedic = 'sattva' | 'rajas' | 'tamas';
export type GanaVedic = 'deva' | 'manushya' | 'rakshasa';
export type NadiVedic = 'adi' | 'madhya' | 'antya';

// --- 1. RASHIS (12 ZODIAC SIGNS) ---

export interface Rashi {
  id: number; // 1..12
  name: string;
  sanskritName: string;
  englishTranslation: string;
  ruler: GrahaId;
  element: ElementVedic;
  modality: ModalityVedic;
  gender: 'male' | 'female';
  guna: GunaVedic;
  bodyPart: string;
  symbol: string;
  startDegree: number; // 0, 30, 60...
  endDegree: number;   // 30, 60, 90...
}

export const RASHIS: Rashi[] = [
  {
    id: 1,
    name: 'Aries',
    sanskritName: 'Mesha',
    englishTranslation: 'Ram',
    ruler: 'mangala',
    element: 'agni',
    modality: 'chara',
    gender: 'male',
    guna: 'rajas',
    bodyPart: 'Head, Brain',
    symbol: 'Ram',
    startDegree: 0,
    endDegree: 30,
  },
  {
    id: 2,
    name: 'Taurus',
    sanskritName: 'Vrishabha',
    englishTranslation: 'Bull',
    ruler: 'shukra',
    element: 'prithvi',
    modality: 'sthira',
    gender: 'female',
    guna: 'rajas',
    bodyPart: 'Face, Neck, Throat',
    symbol: 'Bull',
    startDegree: 30,
    endDegree: 60,
  },
  {
    id: 3,
    name: 'Gemini',
    sanskritName: 'Mithuna',
    englishTranslation: 'Twins',
    ruler: 'budha',
    element: 'vayu',
    modality: 'dwisvabhava',
    gender: 'male',
    guna: 'rajas',
    bodyPart: 'Shoulders, Arms, Lungs',
    symbol: 'Twins',
    startDegree: 60,
    endDegree: 90,
  },
  {
    id: 4,
    name: 'Cancer',
    sanskritName: 'Karka',
    englishTranslation: 'Crab',
    ruler: 'chandra',
    element: 'jala',
    modality: 'chara',
    gender: 'female',
    guna: 'sattva',
    bodyPart: 'Chest, Breast, Heart',
    symbol: 'Crab',
    startDegree: 90,
    endDegree: 120,
  },
  {
    id: 5,
    name: 'Leo',
    sanskritName: 'Simha',
    englishTranslation: 'Lion',
    ruler: 'surya',
    element: 'agni',
    modality: 'sthira',
    gender: 'male',
    guna: 'sattva',
    bodyPart: 'Stomach, Upper Back, Spine',
    symbol: 'Lion',
    startDegree: 120,
    endDegree: 150,
  },
  {
    id: 6,
    name: 'Virgo',
    sanskritName: 'Kanya',
    englishTranslation: 'Maiden',
    ruler: 'budha',
    element: 'prithvi',
    modality: 'dwisvabhava',
    gender: 'female',
    guna: 'tamas',
    bodyPart: 'Abdomen, Digestive System',
    symbol: 'Virgin / Maiden',
    startDegree: 150,
    endDegree: 180,
  },
  {
    id: 7,
    name: 'Libra',
    sanskritName: 'Tula',
    englishTranslation: 'Balance / Scale',
    ruler: 'shukra',
    element: 'vayu',
    modality: 'chara',
    gender: 'male',
    guna: 'rajas',
    bodyPart: 'Lower Back, Kidneys, Reins',
    symbol: 'Scales',
    startDegree: 180,
    endDegree: 210,
  },
  {
    id: 8,
    name: 'Scorpio',
    sanskritName: 'Vrischika',
    englishTranslation: 'Scorpion',
    ruler: 'mangala',
    element: 'jala',
    modality: 'sthira',
    gender: 'female',
    guna: 'tamas',
    bodyPart: 'Generative Organs, Excretory System',
    symbol: 'Scorpion',
    startDegree: 210,
    endDegree: 240,
  },
  {
    id: 9,
    name: 'Sagittarius',
    sanskritName: 'Dhanu',
    englishTranslation: 'Bow / Archer',
    ruler: 'guru',
    element: 'agni',
    modality: 'dwisvabhava',
    gender: 'male',
    guna: 'sattva',
    bodyPart: 'Thighs, Hips',
    symbol: 'Centaur Archer',
    startDegree: 240,
    endDegree: 270,
  },
  {
    id: 10,
    name: 'Capricorn',
    sanskritName: 'Makara',
    englishTranslation: 'Sea-Monster / Crocodile',
    ruler: 'shani',
    element: 'prithvi',
    modality: 'chara',
    gender: 'female',
    guna: 'tamas',
    bodyPart: 'Knees, Bones, Joints',
    symbol: 'Sea Monster / Crocodile',
    startDegree: 270,
    endDegree: 300,
  },
  {
    id: 11,
    name: 'Aquarius',
    sanskritName: 'Kumbha',
    englishTranslation: 'Water Bearer',
    ruler: 'shani',
    element: 'vayu',
    modality: 'sthira',
    gender: 'male',
    guna: 'tamas',
    bodyPart: 'Shins, Ankles, Blood Circulation',
    symbol: 'Water Pot / Bearer',
    startDegree: 300,
    endDegree: 330,
  },
  {
    id: 12,
    name: 'Pisces',
    sanskritName: 'Meena',
    englishTranslation: 'Fish',
    ruler: 'guru',
    element: 'jala',
    modality: 'dwisvabhava',
    gender: 'female',
    guna: 'sattva',
    bodyPart: 'Feet, Toes, Lymphatic System',
    symbol: 'Two Fish',
    startDegree: 330,
    endDegree: 360,
  },
];

// --- 2. NAKSHATRAS (27 LUNAR MANSIONS) ---

export interface NakshatraPada {
  pada: 1 | 2 | 3 | 4;
  startDegree: number;
  endDegree: number;
  navamshaRashi: number; // 1..12
}

export interface Nakshatra {
  id: number; // 1..27
  name: string;
  sanskritName: string;
  ruler: GrahaId;
  deity: string;
  symbol: string;
  gana: GanaVedic;
  yoniAnimal: string;
  yoniGender: 'male' | 'female';
  nadi: NadiVedic;
  tatva: string;
  startDegree: number;
  endDegree: number;
  padas: NakshatraPada[];
}

const NAKSHATRA_RAW: Omit<Nakshatra, 'startDegree' | 'endDegree' | 'padas'>[] = [
  { id: 1, name: 'Ashwini', sanskritName: 'अश्विनी', ruler: 'ketu', deity: 'Ashwini Kumaras', symbol: 'Horse Head', gana: 'deva', yoniAnimal: 'Horse', yoniGender: 'male', nadi: 'adi', tatva: 'Bhumii (Earth)' },
  { id: 2, name: 'Bharani', sanskritName: 'भरणी', ruler: 'shukra', deity: 'Yama', symbol: 'Yoni / Elephant', gana: 'manushya', yoniAnimal: 'Elephant', yoniGender: 'male', nadi: 'madhya', tatva: 'Agni (Fire)' },
  { id: 3, name: 'Krittika', sanskritName: 'कृत्तिका', ruler: 'surya', deity: 'Agni', symbol: 'Razor / Flame', gana: 'rakshasa', yoniAnimal: 'Sheep', yoniGender: 'female', nadi: 'antya', tatva: 'Agni (Fire)' },
  { id: 4, name: 'Rohini', sanskritName: 'रोहिणी', ruler: 'chandra', deity: 'Brahma / Prajapati', symbol: 'Chariot / Temple', gana: 'manushya', yoniAnimal: 'Serpent', yoniGender: 'male', nadi: 'antya', tatva: 'Prithvi (Earth)' },
  { id: 5, name: 'Mrigashira', sanskritName: 'मृगशिरा', ruler: 'mangala', deity: 'Soma (Moon God)', symbol: 'Deer Head', gana: 'deva', yoniAnimal: 'Serpent', yoniGender: 'female', nadi: 'madhya', tatva: 'Vayu (Air)' },
  { id: 6, name: 'Ardra', sanskritName: 'आर्द्रा', ruler: 'rahu', deity: 'Rudra', symbol: 'Teardrop / Diamond', gana: 'rakshasa', yoniAnimal: 'Dog', yoniGender: 'female', nadi: 'adi', tatva: 'Jala (Water)' },
  { id: 7, name: 'Punarvasu', sanskritName: 'पुनर्वसु', ruler: 'guru', deity: 'Aditi', symbol: 'Bow and Quiver', gana: 'deva', yoniAnimal: 'Cat', yoniGender: 'female', nadi: 'adi', tatva: 'Vayu (Air)' },
  { id: 8, name: 'Pushya', sanskritName: 'पुष्य', ruler: 'shani', deity: 'Brihaspati', symbol: 'Cow Udder / Lotus', gana: 'deva', yoniAnimal: 'Ram', yoniGender: 'male', nadi: 'madhya', tatva: 'Jala (Water)' },
  { id: 9, name: 'Ashlesha', sanskritName: 'अश्लेषा', ruler: 'budha', deity: 'Nagas (Serpents)', symbol: 'Coiled Serpent', gana: 'rakshasa', yoniAnimal: 'Cat', yoniGender: 'male', nadi: 'antya', tatva: 'Jala (Water)' },
  { id: 10, name: 'Magha', sanskritName: 'मघा', ruler: 'ketu', deity: 'Pitris (Ancestors)', symbol: 'Royal Throne', gana: 'rakshasa', yoniAnimal: 'Rat', yoniGender: 'male', nadi: 'antya', tatva: 'Agni (Fire)' },
  { id: 11, name: 'Purva Phalguni', sanskritName: 'पूर्वा फाल्गुनी', ruler: 'shukra', deity: 'Bhaga', symbol: 'Front Legs of Bed', gana: 'manushya', yoniAnimal: 'Rat', yoniGender: 'female', nadi: 'madhya', tatva: 'Jala (Water)' },
  { id: 12, name: 'Uttara Phalguni', sanskritName: 'उत्तरा फाल्गुनी', ruler: 'surya', deity: 'Aryaman', symbol: 'Back Legs of Bed', gana: 'manushya', yoniAnimal: 'Bull', yoniGender: 'male', nadi: 'adi', tatva: 'Agni (Fire)' },
  { id: 13, name: 'Hasta', sanskritName: 'हस्त', ruler: 'chandra', deity: 'Savitar (Sun)', symbol: 'Open Hand / Fist', gana: 'deva', yoniAnimal: 'Buffalo', yoniGender: 'female', nadi: 'adi', tatva: 'Prithvi (Earth)' },
  { id: 14, name: 'Chitra', sanskritName: 'चित्रा', ruler: 'mangala', deity: 'Vishwakarma', symbol: 'Bright Jewel / Pearl', gana: 'rakshasa', yoniAnimal: 'Tiger', yoniGender: 'female', nadi: 'madhya', tatva: 'Agni (Fire)' },
  { id: 15, name: 'Swati', sanskritName: 'स्वाति', ruler: 'rahu', deity: 'Vayu (Wind)', symbol: 'Coral / Young Plant', gana: 'deva', yoniAnimal: 'Buffalo', yoniGender: 'male', nadi: 'antya', tatva: 'Vayu (Air)' },
  { id: 16, name: 'Vishakha', sanskritName: 'विशाखा', ruler: 'guru', deity: 'Indra & Agni', symbol: 'Triumphal Arch', gana: 'rakshasa', yoniAnimal: 'Tiger', yoniGender: 'male', nadi: 'antya', tatva: 'Agni (Fire)' },
  { id: 17, name: 'Anuradha', sanskritName: 'अनुराधा', ruler: 'shani', deity: 'Mitra', symbol: 'Lotus / Triumphal Arch', gana: 'deva', yoniAnimal: 'Deer', yoniGender: 'female', nadi: 'madhya', tatva: 'Agni (Fire)' },
  { id: 18, name: 'Jyeshtha', sanskritName: 'ज्येष्ठा', ruler: 'budha', deity: 'Indra', symbol: 'Circular Amulet / Umbrella', gana: 'rakshasa', yoniAnimal: 'Deer', yoniGender: 'male', nadi: 'adi', tatva: 'Vayu (Air)' },
  { id: 19, name: 'Moola', sanskritName: 'मूल', ruler: 'ketu', deity: 'Nirriti (Goddess of Dissolution)', symbol: 'Tied Roots', gana: 'rakshasa', yoniAnimal: 'Dog', yoniGender: 'male', nadi: 'adi', tatva: 'Prithvi (Earth)' },
  { id: 20, name: 'Purva Ashadha', sanskritName: 'पूर्वाषाढा', ruler: 'shukra', deity: 'Apas (Water Goddess)', symbol: 'Elephant Tusk / Fan', gana: 'manushya', yoniAnimal: 'Monkey', yoniGender: 'male', nadi: 'madhya', tatva: 'Jala (Water)' },
  { id: 21, name: 'Uttara Ashadha', sanskritName: 'उत्तराषाढा', ruler: 'surya', deity: 'Vishwadevas', symbol: 'Elephant Tusk / Small Bed', gana: 'manushya', yoniAnimal: 'Mongoose', yoniGender: 'male', nadi: 'antya', tatva: 'Agni (Fire)' },
  { id: 22, name: 'Shravana', sanskritName: 'श्रवण', ruler: 'chandra', deity: 'Vishnu', symbol: 'Ear / Three Footprints', gana: 'deva', yoniAnimal: 'Monkey', yoniGender: 'female', nadi: 'antya', tatva: 'Jala (Water)' },
  { id: 23, name: 'Dhanishta', sanskritName: 'धनिष्ठा', ruler: 'mangala', deity: 'Eight Vasus', symbol: 'Drum / Flute', gana: 'rakshasa', yoniAnimal: 'Lion', yoniGender: 'female', nadi: 'madhya', tatva: 'Ether (Akasha)' },
  { id: 24, name: 'Shatabhisha', sanskritName: 'शतभिषा', ruler: 'rahu', deity: 'Varuna', symbol: 'Empty Circle / 100 Physicians', gana: 'rakshasa', yoniAnimal: 'Horse', yoniGender: 'female', nadi: 'adi', tatva: 'Ether (Akasha)' },
  { id: 25, name: 'Purva Bhadrapada', sanskritName: 'पूर्वभाद्रपदा', ruler: 'guru', deity: 'Aja Ekapada', symbol: 'Swords / Two Front Legs of Cot', gana: 'manushya', yoniAnimal: 'Lion', yoniGender: 'male', nadi: 'adi', tatva: 'Agni (Fire)' },
  { id: 26, name: 'Uttara Bhadrapada', sanskritName: 'उत्तरभाद्रपदा', ruler: 'shani', deity: 'Ahirbudhnya', symbol: 'Twin / Two Back Legs of Cot', gana: 'manushya', yoniAnimal: 'Cow', yoniGender: 'female', nadi: 'madhya', tatva: 'Jala (Water)' },
  { id: 27, name: 'Revati', sanskritName: 'रेवती', ruler: 'budha', deity: 'Pushan', symbol: 'Fish / Drum', gana: 'deva', yoniAnimal: 'Elephant', yoniGender: 'female', nadi: 'antya', tatva: 'Jala (Water)' },
];

export const NAKSHATRAS: Nakshatra[] = NAKSHATRA_RAW.map((raw, idx) => {
  const nakArc = 360 / 27; // 13.333333333333334 degrees per nakshatra
  const startDegree = idx * nakArc;
  const endDegree = (idx + 1) * nakArc;
  const padaArc = nakArc / 4; // 3.3333333333333335 degrees per pada

  const padas: NakshatraPada[] = [1, 2, 3, 4].map((p) => {
    const padaIdx = idx * 4 + (p - 1);
    const pStart = startDegree + (p - 1) * padaArc;
    const pEnd = startDegree + p * padaArc;
    const navamshaRashi = (padaIdx % 12) + 1;

    return {
      pada: p as 1 | 2 | 3 | 4,
      startDegree: pStart,
      endDegree: pEnd,
      navamshaRashi,
    };
  });

  return {
    ...raw,
    startDegree,
    endDegree,
    padas,
  };
});

// --- 3. GRAHAS (9 PLANETS) ---

export interface Graha {
  id: GrahaId;
  name: string;
  sanskritName: string;
  gender: 'male' | 'female' | 'neuter';
  element: ElementVedic;
  guna: GunaVedic;
  caste: string;
  direction: string;
  gemstone: string;
  metal: string;
  color: string;
  dayOfWeek: string;
  bijaMantra: string;
  vedicMantra: string;
  naturalFriends: GrahaId[];
  naturalEnemies: GrahaId[];
  naturalNeutrals: GrahaId[];
}

export const GRAHAS: Record<GrahaId, Graha> = {
  surya: {
    id: 'surya',
    name: 'Sun',
    sanskritName: 'Surya (सूर्य)',
    gender: 'male',
    element: 'agni',
    guna: 'sattva',
    caste: 'Kshatriya (Warrior)',
    direction: 'East',
    gemstone: 'Ruby (Manikya)',
    metal: 'Copper / Gold',
    color: 'Red / Copper',
    dayOfWeek: 'Sunday',
    bijaMantra: 'Om Hram Hreem Hroum Sah Suryaya Namah',
    vedicMantra: 'Om Aashtyena Rajasa Vartamano Nivesayann Amrtam Martyam Ca...',
    naturalFriends: ['chandra', 'mangala', 'guru'],
    naturalEnemies: ['shukra', 'shani', 'rahu', 'ketu'],
    naturalNeutrals: ['budha'],
  },
  chandra: {
    id: 'chandra',
    name: 'Moon',
    sanskritName: 'Chandra (चन्द्र)',
    gender: 'female',
    element: 'jala',
    guna: 'sattva',
    caste: 'Vaishya (Merchant)',
    direction: 'North-West',
    gemstone: 'Pearl (Moti)',
    metal: 'Silver',
    color: 'White / Silver',
    dayOfWeek: 'Monday',
    bijaMantra: 'Om Shram Shreem Shroum Sah Chandramase Namah',
    vedicMantra: 'Om Imadhavya Asapatnam Suvadhvam Mahate Kshatraya...',
    naturalFriends: ['surya', 'budha'],
    naturalEnemies: ['rahu', 'ketu'],
    naturalNeutrals: ['mangala', 'guru', 'shukra', 'shani'],
  },
  mangala: {
    id: 'mangala',
    name: 'Mars',
    sanskritName: 'Mangala (मङ्गल)',
    gender: 'male',
    element: 'agni',
    guna: 'tamas',
    caste: 'Kshatriya (Warrior)',
    direction: 'South',
    gemstone: 'Red Coral (Moonga)',
    metal: 'Copper',
    color: 'Bright Red',
    dayOfWeek: 'Tuesday',
    bijaMantra: 'Om Kram Kreem Kroum Sah Bhaumaya Namah',
    vedicMantra: 'Om Agnir Murdha Divah Kakut Patih Prthivya Ayam...',
    naturalFriends: ['surya', 'chandra', 'guru'],
    naturalEnemies: ['budha', 'rahu', 'ketu'],
    naturalNeutrals: ['shukra', 'shani'],
  },
  budha: {
    id: 'budha',
    name: 'Mercury',
    sanskritName: 'Budha (बुध)',
    gender: 'neuter',
    element: 'prithvi',
    guna: 'rajas',
    caste: 'Vaishya (Merchant)',
    direction: 'North',
    gemstone: 'Emerald (Panna)',
    metal: 'Bronze / Brass',
    color: 'Green',
    dayOfWeek: 'Wednesday',
    bijaMantra: 'Om Bram Breem Broum Sah Budhaya Namah',
    vedicMantra: 'Om Udbudhyasvagne Prati Jagrhi Twam Ishtapurte Sam Srijetham Ayam Ca...',
    naturalFriends: ['surya', 'shukra'],
    naturalEnemies: ['chandra'],
    naturalNeutrals: ['mangala', 'guru', 'shani', 'rahu', 'ketu'],
  },
  guru: {
    id: 'guru',
    name: 'Jupiter',
    sanskritName: 'Guru / Brihaspati (गुरु)',
    gender: 'male',
    element: 'vayu',
    guna: 'sattva',
    caste: 'Brahmin (Priest/Scholar)',
    direction: 'North-East',
    gemstone: 'Yellow Sapphire (Pukhraj)',
    metal: 'Gold',
    color: 'Yellow / Gold',
    dayOfWeek: 'Thursday',
    bijaMantra: 'Om Gram Greem Groum Sah Gurave Namah',
    vedicMantra: 'Om Brihaspate Ati Yad Aryo Arhad Dyumad Vibhati Kratumaj Janeshu...',
    naturalFriends: ['surya', 'chandra', 'mangala'],
    naturalEnemies: ['budha', 'shukra'],
    naturalNeutrals: ['shani', 'rahu', 'ketu'],
  },
  shukra: {
    id: 'shukra',
    name: 'Venus',
    sanskritName: 'Shukra (शुक्र)',
    gender: 'female',
    element: 'jala',
    guna: 'rajas',
    caste: 'Brahmin (Priest/Scholar)',
    direction: 'South-East',
    gemstone: 'Diamond (Heera)',
    metal: 'Silver / Platinum',
    color: 'White / Translucent',
    dayOfWeek: 'Friday',
    bijaMantra: 'Om Dram Dreem Droum Sah Shukraya Namah',
    vedicMantra: 'Om Annat Parisrutao Rutam Brahmanaspatir Vyapibat Ksatram Payah...',
    naturalFriends: ['budha', 'shani', 'rahu', 'ketu'],
    naturalEnemies: ['surya', 'chandra'],
    naturalNeutrals: ['mangala', 'guru'],
  },
  shani: {
    id: 'shani',
    name: 'Saturn',
    sanskritName: 'Shani (शनि)',
    gender: 'neuter',
    element: 'vayu',
    guna: 'tamas',
    caste: 'Shudra (Worker)',
    direction: 'West',
    gemstone: 'Blue Sapphire (Neelam)',
    metal: 'Iron / Steel',
    color: 'Dark Blue / Black',
    dayOfWeek: 'Saturday',
    bijaMantra: 'Om Pram Preem Proum Sah Shanaischaraya Namah',
    vedicMantra: 'Om Sham No Devir Abhishtaya Aapo Bhavantu Peetaye...',
    naturalFriends: ['budha', 'shukra', 'rahu'],
    naturalEnemies: ['surya', 'chandra', 'mangala', 'ketu'],
    naturalNeutrals: ['guru'],
  },
  rahu: {
    id: 'rahu',
    name: 'Rahu (North Node)',
    sanskritName: 'Rahu (राहु)',
    gender: 'neuter',
    element: 'vayu',
    guna: 'tamas',
    caste: 'Outcaste / Mlechha',
    direction: 'South-West',
    gemstone: 'Hessonite Garnet (Gomed)',
    metal: 'Lead / Mixed Alloy',
    color: 'Smoky Grey / Black',
    dayOfWeek: 'Saturday',
    bijaMantra: 'Om Bhram Bhreem Bhroum Sah Rahave Namah',
    vedicMantra: 'Om Kayanash Chitra A Bhuvad Uti Sadavridhah Sakha...',
    naturalFriends: ['shukra', 'shani', 'budha'],
    naturalEnemies: ['surya', 'chandra', 'mangala'],
    naturalNeutrals: ['guru'],
  },
  ketu: {
    id: 'ketu',
    name: 'Ketu (South Node)',
    sanskritName: 'Ketu (केतु)',
    gender: 'neuter',
    element: 'agni',
    guna: 'tamas',
    caste: 'Outcaste / Mlechha',
    direction: 'North-East',
    gemstone: 'Chrysoberyl Cat\'s Eye (Lahsuniya)',
    metal: 'Iron / Bell Metal',
    color: 'Smoky / Multi-colored',
    dayOfWeek: 'Tuesday',
    bijaMantra: 'Om Stram Streem Stroum Sah Ketave Namah',
    vedicMantra: 'Om Ketum Krinvan Ketave Pesho Marya Apeshase...',
    naturalFriends: ['mangala', 'shukra', 'shani'],
    naturalEnemies: ['surya', 'chandra'],
    naturalNeutrals: ['budha', 'guru'],
  },
};

// --- 4. DIGNITIES (Exaltation, Debilitation, Moolatrikona, Own Sign) ---

export interface GrahaDignity {
  exaltationSign: number;           // 1..12 Rashi ID
  deepExaltationDegree: number;     // 0..30 degree inside sign
  debilitationSign: number;         // 1..12 Rashi ID
  deepDebilitationDegree: number;   // 0..30 degree inside sign
  moolatrikonaSign: number;         // 1..12 Rashi ID
  moolatrikonaStartDegree: number;  // 0..30
  moolatrikonaEndDegree: number;    // 0..30
  ownSigns: number[];              // Array of 1..12 Rashi IDs
}

export const GRAHA_DIGNITIES: Record<GrahaId, GrahaDignity> = {
  surya: {
    exaltationSign: 1, // Aries
    deepExaltationDegree: 10,
    debilitationSign: 7, // Libra
    deepDebilitationDegree: 10,
    moolatrikonaSign: 5, // Leo
    moolatrikonaStartDegree: 0,
    moolatrikonaEndDegree: 20,
    ownSigns: [5],
  },
  chandra: {
    exaltationSign: 2, // Taurus
    deepExaltationDegree: 3,
    debilitationSign: 8, // Scorpio
    deepDebilitationDegree: 3,
    moolatrikonaSign: 2, // Taurus
    moolatrikonaStartDegree: 4,
    moolatrikonaEndDegree: 30,
    ownSigns: [4], // Cancer
  },
  mangala: {
    exaltationSign: 10, // Capricorn
    deepExaltationDegree: 28,
    debilitationSign: 4, // Cancer
    deepDebilitationDegree: 28,
    moolatrikonaSign: 1, // Aries
    moolatrikonaStartDegree: 0,
    moolatrikonaEndDegree: 12,
    ownSigns: [1, 8], // Aries, Scorpio
  },
  budha: {
    exaltationSign: 6, // Virgo
    deepExaltationDegree: 15,
    debilitationSign: 12, // Pisces
    deepDebilitationDegree: 15,
    moolatrikonaSign: 6, // Virgo
    moolatrikonaStartDegree: 16,
    moolatrikonaEndDegree: 20,
    ownSigns: [3, 6], // Gemini, Virgo
  },
  guru: {
    exaltationSign: 4, // Cancer
    deepExaltationDegree: 5,
    debilitationSign: 10, // Capricorn
    deepDebilitationDegree: 5,
    moolatrikonaSign: 9, // Sagittarius
    moolatrikonaStartDegree: 0,
    moolatrikonaEndDegree: 10,
    ownSigns: [9, 12], // Sagittarius, Pisces
  },
  shukra: {
    exaltationSign: 12, // Pisces
    deepExaltationDegree: 27,
    debilitationSign: 6, // Virgo
    deepDebilitationDegree: 27,
    moolatrikonaSign: 7, // Libra
    moolatrikonaStartDegree: 0,
    moolatrikonaEndDegree: 15,
    ownSigns: [2, 7], // Taurus, Libra
  },
  shani: {
    exaltationSign: 7, // Libra
    deepExaltationDegree: 20,
    debilitationSign: 1, // Aries
    deepDebilitationDegree: 20,
    moolatrikonaSign: 11, // Aquarius
    moolatrikonaStartDegree: 0,
    moolatrikonaEndDegree: 20,
    ownSigns: [10, 11], // Capricorn, Aquarius
  },
  rahu: {
    exaltationSign: 2, // Taurus (also Gemini in some texts)
    deepExaltationDegree: 15,
    debilitationSign: 8, // Scorpio
    deepDebilitationDegree: 15,
    moolatrikonaSign: 3, // Gemini
    moolatrikonaStartDegree: 0,
    moolatrikonaEndDegree: 30,
    ownSigns: [11], // Aquarius co-ruler
  },
  ketu: {
    exaltationSign: 8, // Scorpio (also Sagittarius)
    deepExaltationDegree: 15,
    debilitationSign: 2, // Taurus
    deepDebilitationDegree: 15,
    moolatrikonaSign: 9, // Sagittarius
    moolatrikonaStartDegree: 0,
    moolatrikonaEndDegree: 30,
    ownSigns: [8], // Scorpio co-ruler
  },
};

// --- 5. KARAKAS FOR 12 HOUSES (BHAVA KARAKAS) ---

export interface BhavaKaraka {
  houseNumber: number; // 1..12
  name: string;
  sanskritName: string;
  primaryKaraka: GrahaId;
  secondaryKarakas: GrahaId[];
  significations: string[];
}

export const BHAVA_KARAKAS: BhavaKaraka[] = [
  { houseNumber: 1, name: 'Lagna Bhava', sanskritName: 'तनू भाव', primaryKaraka: 'surya', secondaryKarakas: [], significations: ['Self', 'Physical Body', 'Health', 'Character', 'Vigor'] },
  { houseNumber: 2, name: 'Dhana Bhava', sanskritName: 'धन भाव', primaryKaraka: 'guru', secondaryKarakas: ['budha'], significations: ['Wealth', 'Family', 'Speech', 'Food', 'Right Eye'] },
  { houseNumber: 3, name: 'Sahaja Bhava', sanskritName: 'सहज भाव', primaryKaraka: 'mangala', secondaryKarakas: ['budha'], significations: ['Younger Siblings', 'Courage', 'Hands/Arms', 'Short Journeys', 'Skills'] },
  { houseNumber: 4, name: 'Sukha Bhava', sanskritName: 'सुख भाव', primaryKaraka: 'chandra', secondaryKarakas: ['budha', 'shukra'], significations: ['Mother', 'Home', 'Land', 'Vehicles', 'Mind/Happiness'] },
  { houseNumber: 5, name: 'Putra Bhava', sanskritName: 'पुत्र भाव', primaryKaraka: 'guru', secondaryKarakas: [], significations: ['Children', 'Intelligence', 'Purva Punya', 'Mantra', 'Speculation'] },
  { houseNumber: 6, name: 'Ari / Shatru Bhava', sanskritName: 'रिपु भाव', primaryKaraka: 'mangala', secondaryKarakas: ['shani'], significations: ['Enemies', 'Debts', 'Disease', 'Litigation', 'Service'] },
  { houseNumber: 7, name: 'Yuvati / Kalatra Bhava', sanskritName: 'कलत्र भाव', primaryKaraka: 'shukra', secondaryKarakas: ['guru'], significations: ['Spouse', 'Marriage', 'Business Partners', 'Public Trade'] },
  { houseNumber: 8, name: 'Randhra Bhava', sanskritName: 'रन्ध्र भाव', primaryKaraka: 'shani', secondaryKarakas: [], significations: ['Longevity', 'Obstacles', 'Secrets', 'Occult', 'Transformation'] },
  { houseNumber: 9, name: 'Dharma / Pitru Bhava', sanskritName: 'धर्म भाव', primaryKaraka: 'guru', secondaryKarakas: ['surya'], significations: ['Father', 'Guru', 'Dharma', 'Fortune', 'Higher Learning'] },
  { houseNumber: 10, name: 'Karma Bhava', sanskritName: 'कर्म भाव', primaryKaraka: 'surya', secondaryKarakas: ['budha', 'guru', 'shani'], significations: ['Career', 'Profession', 'Status', 'Fame', 'Public Actions'] },
  { houseNumber: 11, name: 'Labha Bhava', sanskritName: 'लाभ भाव', primaryKaraka: 'guru', secondaryKarakas: [], significations: ['Gains', 'Income', 'Elder Siblings', 'Fulfillment of Desires', 'Networks'] },
  { houseNumber: 12, name: 'Vyaya Bhava', sanskritName: 'व्यय भाव', primaryKaraka: 'shani', secondaryKarakas: ['ketu', 'shukra'], significations: ['Expenditure', 'Losses', 'Moksha', 'Foreign Lands', 'Sleep/Bed Pleasures'] },
];

export type JaiminiKarakaRole =
  | 'Atmakaraka'     // AK - Soul indicator (Highest degree)
  | 'Amatyakaraka'   // AmK - Career/Mind (2nd highest)
  | 'Bhratrukaraka'  // BK - Siblings/Guru (3rd highest)
  | 'Matrukaraka'    // MK - Mother/Home (4th highest)
  | 'Putrakaraka'    // PK - Children/Creativity (5th highest)
  | 'Gnatikaraka'    // GK - Relatives/Obstacles (6th highest)
  | 'Darakaraka';    // DK - Spouse/Partner (Lowest degree)

// --- 6. HELPER & CALCULATION ENGINE FUNCTIONS ---

/**
 * Calculates Nakshatra and Pada for a given Sidereal degree (0 to 360).
 */
export function getNakshatraByDegree(longitude: number): {
  nakshatra: Nakshatra;
  pada: NakshatraPada;
  degreeInNakshatra: number;
} {
  const normDeg = ((longitude % 360) + 360) % 360;
  const nakIndex = Math.floor(normDeg / (360 / 27));
  const nakshatra = NAKSHATRAS[Math.min(nakIndex, 26)];
  
  const degInNak = normDeg - nakshatra.startDegree;
  const padaIndex = Math.floor(degInNak / (360 / 108));
  const padasIdxClamped = Math.min(Math.max(padaIndex % 4, 0), 3);
  const pada = nakshatra.padas[padasIdxClamped];

  return {
    nakshatra,
    pada,
    degreeInNakshatra: degInNak,
  };
}

/**
 * Calculates Rashi (Zodiac Sign) for a given Sidereal degree (0 to 360).
 */
export function getRashiByDegree(longitude: number): {
  rashi: Rashi;
  degreeInRashi: number;
} {
  const normDeg = ((longitude % 360) + 360) % 360;
  const rashiIndex = Math.floor(normDeg / 30);
  const rashi = RASHIS[Math.min(rashiIndex, 11)];

  return {
    rashi,
    degreeInRashi: normDeg % 30,
  };
}

/**
 * Calculates Temporal Friendship (Tatkalika Maitri) between two house positions.
 * Distance is defined as (Target House - Source House + 12) % 12, expressed as 1..12.
 * Planets in houses 2, 3, 4, 10, 11, 12 from a planet are Temporal Friends.
 * Planets in houses 1, 5, 6, 7, 8, 9 are Temporal Enemies.
 */
export function calculateTemporalFriendship(sourceHouse: number, targetHouse: number): 'friend' | 'enemy' {
  let diff = ((targetHouse - sourceHouse) % 12 + 12) % 12;
  if (diff === 0) diff = 12;
  
  const temporalFriends = [2, 3, 4, 10, 11, 12];
  return temporalFriends.includes(diff) ? 'friend' : 'enemy';
}

export type PanchadhaMaitriRelation = 'Ati Mitra' | 'Mitra' | 'Sama' | 'Satru' | 'Ati Satru';

/**
 * Calculates Combined Panchadha Maitri (5-fold Relationship) between two Grahas.
 * Combines Natural Friendship + Temporal Friendship.
 */
export function calculatePanchadhaMaitri(
  graha1: GrahaId,
  graha2: GrahaId,
  houseDistance: number // 1..12 distance from graha1 to graha2
): PanchadhaMaitriRelation {
  if (graha1 === graha2) return 'Sama';

  const g1Data = GRAHAS[graha1];
  let natural: 'friend' | 'enemy' | 'neutral' = 'neutral';
  if (g1Data.naturalFriends.includes(graha2)) natural = 'friend';
  else if (g1Data.naturalEnemies.includes(graha2)) natural = 'enemy';

  const temporal = calculateTemporalFriendship(1, houseDistance);

  if (natural === 'friend' && temporal === 'friend') return 'Ati Mitra'; // Great Friend
  if (natural === 'friend' && temporal === 'enemy') return 'Sama';      // Neutral
  if (natural === 'neutral' && temporal === 'friend') return 'Mitra';    // Friend
  if (natural === 'neutral' && temporal === 'enemy') return 'Satru';    // Enemy
  if (natural === 'enemy' && temporal === 'friend') return 'Sama';      // Neutral
  return 'Ati Satru'; // Great Enemy (Natural Enemy + Temporal Enemy)
}

/**
 * Calculates Vedic Planetary Aspect Strength (Drishti) from an aspecting Graha
 * located in aspectingHouse to targetHouse (both 1..12).
 * Returns aspect percentage (0 to 100).
 */
export function calculateVedicAspect(
  aspectingGraha: GrahaId,
  aspectingHouse: number,
  targetHouse: number
): number {
  let diff = ((targetHouse - aspectingHouse) % 12 + 12) % 12;
  if (diff === 0) diff = 12;

  // 1. All planets have 100% full aspect on the 7th house
  if (diff === 7) return 100;

  // 2. Vishesha Drishti (Special Aspects)
  if (aspectingGraha === 'mangala') {
    // Mars has 100% aspect on 4th and 8th houses
    if (diff === 4 || diff === 8) return 100;
  }

  if (aspectingGraha === 'guru' || aspectingGraha === 'rahu' || aspectingGraha === 'ketu') {
    // Jupiter, Rahu, and Ketu have 100% aspect on 5th and 9th houses
    if (diff === 5 || diff === 9) return 100;
  }

  if (aspectingGraha === 'shani') {
    // Saturn has 100% aspect on 3rd and 10th houses
    if (diff === 3 || diff === 10) return 100;
  }

  // 3. Partial Aspects (Standard Vedic rules for non-special houses)
  // 3rd & 10th house aspect: 25% for general planets
  if (diff === 3 || diff === 10) return 25;

  // 5th & 9th house aspect: 50% for general planets
  if (diff === 5 || diff === 9) return 50;

  // 4th & 8th house aspect: 75% for general planets
  if (diff === 4 || diff === 8) return 75;

  return 0;
}

/**
 * Calculates 7 Jaimini Karakas (AK, AmK, BK, MK, PK, GK, DK) from sidereal longitudes
 * of the 7 major Grahas (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn).
 */
export function calculateJaiminiKarakas(
  planetLongitudes: Record<'surya' | 'chandra' | 'mangala' | 'budha' | 'guru' | 'shukra' | 'shani', number>
): Record<JaiminiKarakaRole, { graha: GrahaId; signDegree: number }> {
  const mainGrahas: ('surya' | 'chandra' | 'mangala' | 'budha' | 'guru' | 'shukra' | 'shani')[] = [
    'surya',
    'chandra',
    'mangala',
    'budha',
    'guru',
    'shukra',
    'shani',
  ];

  const sorted = mainGrahas
    .map((g) => {
      const totalDeg = ((planetLongitudes[g] % 360) + 360) % 360;
      const signDegree = totalDeg % 30; // Jaimini karakas are sorted by degree inside sign (0..30)
      return { graha: g, signDegree };
    })
    .sort((a, b) => b.signDegree - a.signDegree);

  const roles: JaiminiKarakaRole[] = [
    'Atmakaraka',
    'Amatyakaraka',
    'Bhratrukaraka',
    'Matrukaraka',
    'Putrakaraka',
    'Gnatikaraka',
    'Darakaraka',
  ];

  const result = {} as Record<JaiminiKarakaRole, { graha: GrahaId; signDegree: number }>;
  roles.forEach((role, idx) => {
    result[role] = sorted[idx];
  });

  return result;
}
