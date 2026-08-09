/**
 * ASTRO360 Nakshatra & Compatibility Engine
 * 27 Nakshatras, 4 Padas, Deity Attributes, & Ashtakoota 36-Guna Compatibility Matching
 */

export interface NakshatraInfo {
  index: number; // 0 to 26
  name: string;
  ruler: string;
  deity: string;
  symbol: string;
  pada: number; // 1 to 4
  startDeg: number;
  endDeg: number;
  gana: 'Deva' | 'Manushya' | 'Rakshasa';
  yoni: string;
  nadi: 'Adi' | 'Madhya' | 'Antya';
  varna: string;
  vashya: string;
}

export const NAKSHATRAS_DATA: Array<Omit<NakshatraInfo, 'pada' | 'startDeg' | 'endDeg'>> = [
  { index: 0, name: 'Ashwini', ruler: 'Ketu', deity: 'Ashwini Kumaras', symbol: 'Horse Head', gana: 'Deva', yoni: 'Horse', nadi: 'Adi', varna: 'Kshatriya', vashya: 'Quadruped' },
  { index: 1, name: 'Bharani', ruler: 'Venus', deity: 'Yama', symbol: 'Yoni / Vessel', gana: 'Manushya', yoni: 'Elephant', nadi: 'Madhya', varna: 'Outcaste', vashya: 'Quadruped' },
  { index: 2, name: 'Krittika', ruler: 'Sun', deity: 'Agni', symbol: 'Razor / Flame', gana: 'Rakshasa', yoni: 'Sheep', nadi: 'Antya', varna: 'Brahmin', vashya: 'Biped' },
  { index: 3, name: 'Rohini', ruler: 'Moon', deity: 'Brahma / Prajapati', symbol: 'Chariot', gana: 'Manushya', yoni: 'Serpent', nadi: 'Antya', varna: 'Shudra', vashya: 'Quadruped' },
  { index: 4, name: 'Mrigashira', ruler: 'Mars', deity: 'Soma / Moon', symbol: 'Deer Head', gana: 'Deva', yoni: 'Serpent', nadi: 'Madhya', varna: 'Servant', vashya: 'Biped' },
  { index: 5, name: 'Ardra', ruler: 'Rahu', deity: 'Rudra', symbol: 'Teardrop', gana: 'Manushya', yoni: 'Dog', nadi: 'Adi', varna: 'Outcaste', vashya: 'Biped' },
  { index: 6, name: 'Punarvasu', ruler: 'Jupiter', deity: 'Aditi', symbol: 'Bow & Quiver', gana: 'Deva', yoni: 'Cat', nadi: 'Adi', varna: 'Vaisya', vashya: 'Biped' },
  { index: 7, name: 'Pushya', ruler: 'Saturn', deity: 'Brihaspati', symbol: 'Cow Udder / Lotus', gana: 'Deva', yoni: 'Goat', nadi: 'Madhya', varna: 'Kshatriya', vashya: 'Quadruped' },
  { index: 8, name: 'Ashlesha', ruler: 'Mercury', deity: 'Nagas', symbol: 'Coiled Serpent', gana: 'Rakshasa', yoni: 'Cat', nadi: 'Antya', varna: 'Outcaste', vashya: 'Water' },
  { index: 9, name: 'Magha', ruler: 'Ketu', deity: 'Pitris / Ancestors', symbol: 'Royal Throne', gana: 'Rakshasa', yoni: 'Rat', nadi: 'Antya', varna: 'Shudra', vashya: 'Quadruped' },
  { index: 10, name: 'Purva Phalguni', ruler: 'Venus', deity: 'Bhaga', symbol: 'Hammock / Couch', gana: 'Manushya', yoni: 'Rat', nadi: 'Madhya', varna: 'Brahmin', vashya: 'Biped' },
  { index: 11, name: 'Uttara Phalguni', ruler: 'Sun', deity: 'Aryaman', symbol: 'Bed Legs', gana: 'Manushya', yoni: 'Cow', nadi: 'Adi', varna: 'Kshatriya', vashya: 'Quadruped' },
  { index: 12, name: 'Hasta', ruler: 'Moon', deity: 'Savitar', symbol: 'Open Hand', gana: 'Deva', yoni: 'Buffalo', nadi: 'Adi', varna: 'Vaisya', vashya: 'Biped' },
  { index: 13, name: 'Chitra', ruler: 'Mars', deity: 'Vishwakarma', symbol: 'Bright Jewel', gana: 'Rakshasa', yoni: 'Tiger', nadi: 'Madhya', varna: 'Servant', vashya: 'Biped' },
  { index: 14, name: 'Swati', ruler: 'Rahu', deity: 'Vayu', symbol: 'Coral / Sword', gana: 'Deva', yoni: 'Buffalo', nadi: 'Antya', varna: 'Outcaste', vashya: 'Biped' },
  { index: 15, name: 'Vishakha', ruler: 'Jupiter', deity: 'Indra-Agni', symbol: 'Triumphal Arch', gana: 'Rakshasa', yoni: 'Tiger', nadi: 'Antya', varna: 'Outcaste', vashya: 'Biped' },
  { index: 16, name: 'Anuradha', ruler: 'Saturn', deity: 'Mitra', symbol: 'Lotus / Staff', gana: 'Deva', yoni: 'Deer', nadi: 'Madhya', varna: 'Shudra', vashya: 'Quadruped' },
  { index: 17, name: 'Jyeshtha', ruler: 'Mercury', deity: 'Indra', symbol: 'Circular Amulet', gana: 'Rakshasa', yoni: 'Deer', nadi: 'Adi', varna: 'Servant', vashya: 'Insect' },
  { index: 18, name: 'Mula', ruler: 'Ketu', deity: 'Nirriti', symbol: 'Tied Roots', gana: 'Rakshasa', yoni: 'Dog', nadi: 'Adi', varna: 'Outcaste', vashya: 'Biped' },
  { index: 19, name: 'Purva Ashadha', ruler: 'Venus', deity: 'Apas / Water', symbol: 'Winnowing Basket', gana: 'Manushya', yoni: 'Monkey', nadi: 'Madhya', varna: 'Brahmin', vashya: 'Biped' },
  { index: 20, name: 'Uttara Ashadha', ruler: 'Sun', deity: 'Vishwa Devas', symbol: 'Elephant Tusk', gana: 'Manushya', yoni: 'Mongoose', nadi: 'Antya', varna: 'Kshatriya', vashya: 'Quadruped' },
  { index: 21, name: 'Shravana', ruler: 'Moon', deity: 'Vishnu', symbol: 'Three Footprints / Ear', gana: 'Deva', yoni: 'Monkey', nadi: 'Antya', varna: 'Vaisya', vashya: 'Biped' },
  { index: 22, name: 'Dhanishta', ruler: 'Mars', deity: 'Eight Vasus', symbol: 'Drum / Flute', gana: 'Rakshasa', yoni: 'Lion', nadi: 'Madhya', varna: 'Servant', vashya: 'Quadruped' },
  { index: 23, name: 'Shatabhisha', ruler: 'Rahu', deity: 'Varuna', symbol: '100 Physicians / Circle', gana: 'Rakshasa', yoni: 'Horse', nadi: 'Adi', varna: 'Outcaste', vashya: 'Water' },
  { index: 24, name: 'Purva Bhadrapada', ruler: 'Jupiter', deity: 'Aja Ekapada', symbol: 'Sword / Two-Faced Man', gana: 'Manushya', yoni: 'Lion', nadi: 'Adi', varna: 'Brahmin', vashya: 'Biped' },
  { index: 25, name: 'Uttara Bhadrapada', ruler: 'Saturn', deity: 'Ahirbudhnya', symbol: 'Twin / Back Legs of Bed', gana: 'Manushya', yoni: 'Cow', nadi: 'Madhya', varna: 'Kshatriya', vashya: 'Water' },
  { index: 26, name: 'Revati', ruler: 'Mercury', deity: 'Pushan', symbol: 'Fish / Drum', gana: 'Deva', yoni: 'Elephant', nadi: 'Antya', varna: 'Shudra', vashya: 'Water' },
];

export class NakshatraEngine {
  /**
   * Calculates Nakshatra details from Sidereal Longitude (0° to 360°)
   */
  public static calculateNakshatra(longitudeDeg: number): NakshatraInfo {
    const normalized = ((longitudeDeg % 360) + 360) % 360;
    const nakshatraSpan = 13.333333333333334; // 13° 20'
    const index = Math.floor(normalized / nakshatraSpan);
    const degInNakshatra = normalized % nakshatraSpan;
    const pada = Math.floor(degInNakshatra / 3.3333333333333335) + 1;

    const base = NAKSHATRAS_DATA[index];
    const startDeg = index * nakshatraSpan;
    const endDeg = startDeg + nakshatraSpan;

    return {
      ...base,
      pada: Math.min(pada, 4),
      startDeg,
      endDeg,
    };
  }

  /**
   * Calculates Ashtakoota 36-Guna Compatibility Match Score between two Moon positions
   */
  public static calculateAshtakootaGunas(moon1Deg: number, moon2Deg: number): { totalGunas: number; maxGunas: number; breakdown: Record<string, number>; summary: string } {
    const nak1 = this.calculateNakshatra(moon1Deg);
    const nak2 = this.calculateNakshatra(moon2Deg);

    // 8 Koota Scores
    let varnaScore = nak1.varna === nak2.varna ? 1 : 0.5;
    let vashyaScore = nak1.vashya === nak2.vashya ? 2 : 1;
    let taraScore = (Math.abs(nak1.index - nak2.index) % 9) % 2 === 0 ? 3 : 1.5;
    let yoniScore = nak1.yoni === nak2.yoni ? 4 : 2;
    let maitriScore = nak1.ruler === nak2.ruler ? 5 : 3;
    let ganaScore = nak1.gana === nak2.gana ? 6 : (nak1.gana === 'Deva' || nak2.gana === 'Deva' ? 4 : 1);
    let bhakootScore = (Math.abs(nak1.index - nak2.index) % 6) === 0 ? 7 : 4;
    let nadiScore = nak1.nadi !== nak2.nadi ? 8 : 0; // Nadi Dosha if same Nadi

    const totalGunas = varnaScore + vashyaScore + taraScore + yoniScore + maitriScore + ganaScore + bhakootScore + nadiScore;

    let summary = 'Excellent Compatibility';
    if (totalGunas < 18) summary = 'Low Compatibility - Requires Conscious Effort';
    else if (totalGunas < 25) summary = 'Moderate & Harmonious Compatibility';

    return {
      totalGunas,
      maxGunas: 36,
      breakdown: {
        varna: varnaScore,
        vashya: vashyaScore,
        tara: taraScore,
        yoni: yoniScore,
        maitri: maitriScore,
        gana: ganaScore,
        bhakoot: bhakootScore,
        nadi: nadiScore,
      },
      summary,
    };
  }
}
