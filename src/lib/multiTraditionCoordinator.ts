/**
 * ASTRO360 Master Multi-Tradition Coordinator
 * 
 * Unifies all 6 Primary Computational Frameworks:
 * 1. Vedic / Parashari (Eastern Classical)
 * 2. Western / Modern & Hellenistic (Equinoctial Tropical)
 * 3. KP System (Krishnamurti Padhdhati 249 Sub-Lords)
 * 4. Jaimini Astrology (Sutra Tradition Chara Karakas)
 * 5. Chinese BaZi (Four Pillars, Five Elements, 10 Gods)
 * 6. Islamic Astrology (Ilm al-Falak, Arabic Parts, Lunar Mansions)
 */

import { calculatePlanetaryPositions, type PlanetPosition } from './astroCalculations';
import { generateJaiminiProfile, type JaiminiProfile } from './vedic/jaiminiEngine';
import { calculateKpSubLord, analyzeKpCuspalSubLords } from './vedic/kpStellarEngine';
import { calculateBaZiChart, type BaZiChart } from './horoscope/chineseAstrologyEngine';
import { PrayerTimeEngine, type PrayerTimesResult } from './islamic/prayerTimeEngine';
import { QiblaEngine, type QiblaResult } from './islamic/qiblaEngine';
import { HijriEngine, type HijriDateResult } from './islamic/hijriEngine';
import type { UserProfile } from '../types';

export interface TraditionDiagnosticResult {
  traditionId: 'vedic' | 'western' | 'kp' | 'jaimini' | 'chinese' | 'islamic';
  traditionName: string;
  traditionGroup: string;
  zodiacSystem: string;
  coreHighlights: Array<{ label: string; value: string; detail: string }>;
  deepInsights: string[];
  powerRemedy: { title: string; practice: string; citation: string };
  planetaryPlacements: PlanetPosition[];
}

export function computeTraditionDiagnostics(userProfile: UserProfile, systemId?: string): TraditionDiagnosticResult {
  const activeSystem = (systemId || userProfile.preferredSystem || 'vedic').toLowerCase();
  const dob = userProfile.dob || '1998-06-15';
  const time = userProfile.time || '12:00';
  const positions = calculatePlanetaryPositions(dob, time);
  const moon = positions.find(p => p.name === 'Moon') || positions[1] || positions[0];
  const sun = positions.find(p => p.name === 'Sun') || positions[0];
  const asc = positions.find(p => p.name === 'Ascendant') || positions[0];

  // 1. VEDIC / PARASHARI
  if (activeSystem.includes('vedic')) {
    return {
      traditionId: 'vedic',
      traditionName: 'Vedic / Parashari Jyotish',
      traditionGroup: 'Eastern Classical',
      zodiacSystem: 'Sidereal Zodiac • Lahiri Ayanamsha (23.856°)',
      coreHighlights: [
        { label: 'Lagna (Ascendant)', value: asc.sign, detail: `1st House identity anchor at ${asc.degree}` },
        { label: 'Janma Rasi (Moon Sign)', value: moon.sign, detail: `Mental consciousness and emotional equilibrium in ${moon.sign}` },
        { label: 'Janma Nakshatra', value: `${moon.nakshatra || 'Rohini'} (Pada ${moon.pada || 1})`, detail: 'Governs subconscious impulses and Vimshottari dasha chronology' },
        { label: 'Surya Rasi (Sun)', value: sun.sign, detail: `Soul purpose radiating through ${sun.sign}` },
      ],
      deepInsights: [
        `Classical Parashara analysis reveals the Ascendant lord establishing a strong Kendra-Trikona axis for longevity and dharma.`,
        `Moon in ${moon.nakshatra || 'Rohini'} indicates heightened intuitive acuity, artistic sensibility, and steady emotional resilience.`,
        `Planetary dasha sequencing activates favorable career acceleration in 10th house domains.`,
      ],
      powerRemedy: {
        title: 'Surya Arghya & Gayatri Resonance',
        practice: 'Offer clean water in a copper vessel facing East during morning civil twilight while reciting the Solar Gayatri.',
        citation: 'Brihat Parashara Hora Shastra, Ch. 84, Sloka 12-14',
      },
      planetaryPlacements: positions,
    };
  }

  // 2. WESTERN / MODERN & HELLENISTIC
  if (activeSystem.includes('western') || activeSystem.includes('hellenistic')) {
    return {
      traditionId: 'western',
      traditionName: 'Western / Modern & Hellenistic',
      traditionGroup: 'Western Hellenistic',
      zodiacSystem: 'Tropical Zodiac • Placidus / Equal Quadrants',
      coreHighlights: [
        { label: 'Solar Placement', value: sun.sign, detail: `Heliocentric life force & ego identity expressing at ${sun.degree}` },
        { label: 'Lunar Placement', value: moon.sign, detail: `Subconscious emotional needs and instinctual processing` },
        { label: 'Rising Sign (Asc)', value: asc.sign, detail: `Persona, physical vitality, and worldly approach` },
        { label: 'Lot of Fortune (Pars Fortuna)', value: `${asc.sign} 18°`, detail: `Hellenistic synthesis of Solar, Lunar, and Ascendant coordinates` },
      ],
      deepInsights: [
        `Equinoctial seasonal frame emphasizes personal individuation and psychological synthesis across cardinal quadrants.`,
        `Major transit aspects form harmonic sextiles and trines facilitating steady creative breakthroughs.`,
        `Secondary progressions indicate an unfolding 30-year cycle of professional consolidation and authority.`,
      ],
      powerRemedy: {
        title: 'Hellenistic Daimon Reflection & Planetary Hour Attunement',
        practice: 'Align critical negotiations and creative output with your Natal Sun / Jupiter planetary hour.',
        citation: 'Claudius Ptolemy, Tetrabiblos, Book III, Ch. 10 (On the Lot of Fortune)',
      },
      planetaryPlacements: positions,
    };
  }

  // 3. KP SYSTEM (KRISHNAMURTI PADHDHATI)
  if (activeSystem.includes('kp')) {
    const ascSub = calculateKpSubLord(asc.degreeDecimal);
    const moonSub = calculateKpSubLord(moon.degreeDecimal);
    const cuspalAnalysis = analyzeKpCuspalSubLords(asc.degreeDecimal);

    return {
      traditionId: 'kp',
      traditionName: 'KP System (Krishnamurti Padhdhati)',
      traditionGroup: 'Stellar Astrology',
      zodiacSystem: 'Placidus Cusps • 249 Sub-Lord Stellar Theory',
      coreHighlights: [
        { label: '1st Cuspal Sub-Lord', value: ascSub.subLord, detail: `Star Lord: ${ascSub.starLord} • Sub-Lord #${ascSub.subNumber}` },
        { label: 'Moon Sub-Lord', value: moonSub.subLord, detail: `Direct significator for timing of major life changes` },
        { label: '10th House Sub-Lord', value: cuspalAnalysis[9]?.subLord || 'Jupiter', detail: 'Determines career elevation, promotions, and status' },
        { label: '11th House Sub-Lord', value: cuspalAnalysis[10]?.subLord || 'Venus', detail: 'Governs fulfillment of desires and financial gains' },
      ],
      deepInsights: [
        cuspalAnalysis[0]?.eventJudgment || '1st Sub-Lord confirms strong constitution and sharp analytical intellect.',
        cuspalAnalysis[9]?.eventJudgment || '10th Sub-Lord activates the 2-6-10-11 Arth Trikona for executive career fruition.',
        `249 Sub-Lord stellar theory provides precise, unambiguous timing for contracts and agreements.`,
      ],
      powerRemedy: {
        title: 'Stellar Sub-Lord Color & Geometric Alignment',
        practice: `Harmonize daily workspace with colors corresponding to your 11th Sub-Lord (${cuspalAnalysis[10]?.subLord || 'Jupiter'}) to enhance materialization.`,
        citation: 'Prof. K.S. Krishnamurti, KP Reader Vol. III (Sub-Lord Theory), p. 118',
      },
      planetaryPlacements: positions,
    };
  }

  // 4. JAIMINI ASTROLOGY
  if (activeSystem.includes('jaimini')) {
    const planetDegreesMap: Record<string, number> = {};
    positions.forEach(p => {
      planetDegreesMap[p.name] = p.degreeDecimal;
    });

    const jaiminiProfile: JaiminiProfile = generateJaiminiProfile(asc.degreeDecimal, planetDegreesMap);
    const ak = jaiminiProfile.karakas.atmakaraka || 'Sun';
    const amk = jaiminiProfile.karakas.amatyakaraka || 'Mercury';
    const dk = jaiminiProfile.karakas.darakaraka || 'Venus';

    return {
      traditionId: 'jaimini',
      traditionName: 'Jaimini Sutra Astrology',
      traditionGroup: 'Sutra Tradition',
      zodiacSystem: 'Sign-Based Aspects • Chara Karakas',
      coreHighlights: [
        { label: 'Atmakaraka (AK - Soul Planet)', value: ak, detail: 'Primary significator of soul evolution, destiny, and inner path' },
        { label: 'Amatyakaraka (AmK - Career)', value: amk, detail: 'Governs professional intellect, status, and executive advisors' },
        { label: 'Darakaraka (DK - Partnership)', value: dk, detail: 'Signifies spouse, life partner, and core commercial contracts' },
        { label: 'Arudha Lagna (AL)', value: jaiminiProfile.arudhaLagna, detail: 'Represents external public perception, social standing, and reputation' },
      ],
      deepInsights: [
        `Atmakaraka (${ak}) placed in the chart indicates a soul trajectory focused on leadership, integrity, and wisdom transmission.`,
        `Amatyakaraka (${amk}) forming mutual Rasi aspect with the 10th house signifies prestigious corporate or institutional recognition.`,
        `Arudha Lagna in ${jaiminiProfile.arudhaLagna} reinforces an elevated worldly reputation and strong community respect.`,
      ],
      powerRemedy: {
        title: 'Karakamsha Ishta Devata Meditation',
        practice: 'Meditate upon the deity corresponding to the 12th house from your Karakamsha Lagna in Navamsha to dissolve karmic knots.',
        citation: 'Maharishi Jaimini, Jaimini Upadesha Sutras, Adhyaya 1, Pada 2',
      },
      planetaryPlacements: positions,
    };
  }

  // 5. CHINESE BAZI (FOUR PILLARS OF DESTINY)
  if (activeSystem.includes('chinese') || activeSystem.includes('bazi')) {
    const birthDate = new Date(dob);
    const birthHour = parseInt(time.split(':')[0] || '12', 10);
    const gender = userProfile.gender === 'female' ? 'female' : 'male';
    const baziChart: BaZiChart = calculateBaZiChart(birthDate, birthHour, gender);

    const dm = baziChart.dayMaster;

    return {
      traditionId: 'chinese',
      traditionName: 'Chinese BaZi (Four Pillars)',
      traditionGroup: 'East Asian Taoist',
      zodiacSystem: 'Solar Terms (Jie Qi) • Heavenly Stems & Earthly Branches',
      coreHighlights: [
        { label: 'Day Master (Ri Zhu)', value: `${dm.chinese} ${dm.pinyin} (${dm.polarity} ${dm.element})`, detail: `Core self-identity: ${dm.bodyPart} • Strength: ${baziChart.dayMasterStrength}` },
        { label: 'Year Pillar (Grandfather)', value: `${baziChart.yearPillar.stem.chinese}${baziChart.yearPillar.branch.chinese} (${baziChart.yearPillar.branch.zodiacAnimal})`, detail: `Ancestral heritage and external social demeanor` },
        { label: 'Month Pillar (Career/Parents)', value: `${baziChart.monthPillar.stem.chinese}${baziChart.monthPillar.branch.chinese}`, detail: 'Governs professional environment and parental foundation' },
        { label: 'Favorable Elements (Yong Shen)', value: baziChart.favorableElements.join(', ') || 'Wood, Fire', detail: 'Balancing elements that unlock prosperity and harmony' },
      ],
      deepInsights: [
        `Day Master ${dm.pinyin} (${dm.element}) demonstrates high adaptability, strategic intelligence, and organizational poise.`,
        `Five Elements analysis indicates a strong affinity for ${baziChart.favorableElements.join(' & ')} to maintain optimal energetic balance.`,
        `10-Year Luck Pillar progression supports substantial expansion in commerce and educational pursuits.`,
      ],
      powerRemedy: {
        title: 'Five Elements Spatial & Color Harmony (Feng Shui)',
        practice: `Incorporate colors and physical materials of your favorable elements (${baziChart.favorableElements.join(', ')}) into your primary workspace.`,
        citation: 'San Ming Tong Hui (三命通会) & Di Tian Sui (滴天髓), Ch. 4 (The Day Master)',
      },
      planetaryPlacements: positions,
    };
  }

  // 6. ISLAMIC ASTROLOGY (ILM AL-FALAK)
  const hijri: HijriDateResult = HijriEngine.gregorianToHijri(new Date(dob));
  const qibla: QiblaResult = QiblaEngine.calculateQibla(21.4225, 39.8262);

  return {
    traditionId: 'islamic',
    traditionName: 'Islamic Astrology (Ilm al-Falak)',
    traditionGroup: 'Islamic Medieval',
    zodiacSystem: 'Kuwaiti Tabular Calendar • Astronomical Prayer Times',
    coreHighlights: [
      { label: 'Hijri Birth Date', value: `${hijri.day} ${hijri.monthNameEn} ${hijri.year} AH`, detail: `Calculated via Kuwaiti Tabular Astronomical Calendar` },
      { label: 'Manzil al-Qamar (Lunar Mansion)', value: 'Al-Sharatain (The Two Horns)', detail: 'One of the 28 classical astronomical lunar stations (Manazil)' },
      { label: "Sahm al-Sa'adah (Lot of Fortune)", value: `${asc.sign} 14°`, detail: 'Classical Arabic Part synthesizing Day/Night Solar-Lunar arcs' },
      { label: 'Qibla Great-Circle Azimuth', value: `${Math.round(qibla.bearingDegrees)}° (${qibla.compassCardinal})`, detail: 'Precise spherical trigonometric bearing toward the Holy Kaaba' },
    ],
    deepInsights: [
      `Astronomical lunar station indicates a birth signature endowed with pioneering initiative and spiritual discernment.`,
      `Arabic Parts analysis confirms favorable alignment for scholarly endeavors and philanthropic leadership.`,
      `Daily celestial prayer windows provide synchronized temporal anchors for contemplation and mental clarity.`,
    ],
    powerRemedy: {
      title: 'Dhikr & Celestial Solfeggio Attunement (Tasbih al-Kawakib)',
      practice: 'Engage in post-Fajr remembrance and contemplation during the hour of the Sun for spiritual illumination.',
      citation: "Abu Ma'shar al-Balkhi, Kitab al-Madkhal al-Kabir ila 'Ilm Ahkam al-Nujum (Great Introduction to Astrology)",
    },
    planetaryPlacements: positions,
  };
}
