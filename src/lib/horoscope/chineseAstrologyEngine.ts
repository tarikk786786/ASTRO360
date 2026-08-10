/**
 * ASTRO360 Chinese Astrology Engine (BaZi & Zi Wei Dou Shu)
 * 
 * Includes:
 * 1. BaZi (Four Pillars of Destiny - 四柱八字):
 *    - 10 Heavenly Stems (Tian Gan 天干) & 12 Earthly Branches (Di Zhi 地支)
 *    - Year, Month, Day, and Hour Pillars calculation
 *    - Day Master (Ri Zhu 日主) analysis & 10 Gods (Shi Shen 十神)
 *    - Da Yun (10-Year Luck Pillars 大运) engine
 * 
 * 2. Zi Wei Dou Shu (Purple Star Astrology 紫微斗数):
 *    - 12 Palaces (Shi Er Gong 十二宫) & Life/Body Palace placement
 *    - 14 Major Stars (Zi Wei & Tian Fu Series 紫微星系/天府星系) placement
 *    - Si Hua (Four Transformations 四化: 禄 权 科 忌) table & calculations
 */

export type ElementChinese = 'Wood' | 'Fire' | 'Earth' | 'Metal' | 'Water';
export type YinYang = 'Yang' | 'Yin';

// --- 1. BAZI REFERENCE DATA (HEAVENLY STEMS & EARTHLY BRANCHES) ---

export interface HeavenlyStem {
  index: number; // 0..9
  chinese: string;
  pinyin: string;
  element: ElementChinese;
  polarity: YinYang;
  bodyPart: string;
}

export const HEAVENLY_STEMS: HeavenlyStem[] = [
  { index: 0, chinese: '甲', pinyin: 'Jia', element: 'Wood', polarity: 'Yang', bodyPart: 'Head, Gallbladder' },
  { index: 1, chinese: '乙', pinyin: 'Yi', element: 'Wood', polarity: 'Yin', bodyPart: 'Shoulders, Liver' },
  { index: 2, chinese: '丙', pinyin: 'Bing', element: 'Fire', polarity: 'Yang', bodyPart: 'Small Intestine, Eyes' },
  { index: 3, chinese: '丁', pinyin: 'Ding', element: 'Fire', polarity: 'Yin', bodyPart: 'Heart, Tongue' },
  { index: 4, chinese: '戊', pinyin: 'Wu', element: 'Earth', polarity: 'Yang', bodyPart: 'Stomach, Ribs' },
  { index: 5, chinese: '己', pinyin: 'Ji', element: 'Earth', polarity: 'Yin', bodyPart: 'Spleen, Abdomen' },
  { index: 6, chinese: '庚', pinyin: 'Geng', element: 'Metal', polarity: 'Yang', bodyPart: 'Large Intestine, Lung' },
  { index: 7, chinese: '辛', pinyin: 'Xin', element: 'Metal', polarity: 'Yin', bodyPart: 'Lungs, Chest' },
  { index: 8, chinese: '壬', pinyin: 'Ren', element: 'Water', polarity: 'Yang', bodyPart: 'Bladder, Shin' },
  { index: 9, chinese: '癸', pinyin: 'Gui', element: 'Water', polarity: 'Yin', bodyPart: 'Kidneys, Feet' },
];

export interface HiddenStem {
  stemIndex: number;
  percentage: number; // Main stem 60-70%, secondary 20-30%, etc.
}

export interface EarthlyBranch {
  index: number; // 0..11
  chinese: string;
  pinyin: string;
  zodiacAnimal: string;
  element: ElementChinese;
  polarity: YinYang;
  hiddenStems: HiddenStem[];
  startHour: number; // 2-hour double hour start (e.g. 23 for Zi)
  endHour: number;
}

export const EARTHLY_BRANCHES: EarthlyBranch[] = [
  { index: 0, chinese: '子', pinyin: 'Zi', zodiacAnimal: 'Rat', element: 'Water', polarity: 'Yang', hiddenStems: [{ stemIndex: 9, percentage: 100 }], startHour: 23, endHour: 1 },
  { index: 1, chinese: '丑', pinyin: 'Chou', zodiacAnimal: 'Ox', element: 'Earth', polarity: 'Yin', hiddenStems: [{ stemIndex: 5, percentage: 60 }, { stemIndex: 9, percentage: 30 }, { stemIndex: 7, percentage: 10 }], startHour: 1, endHour: 3 },
  { index: 2, chinese: '寅', pinyin: 'Yin', zodiacAnimal: 'Tiger', element: 'Wood', polarity: 'Yang', hiddenStems: [{ stemIndex: 0, percentage: 60 }, { stemIndex: 2, percentage: 30 }, { stemIndex: 4, percentage: 10 }], startHour: 3, endHour: 5 },
  { index: 3, chinese: '卯', pinyin: 'Mao', zodiacAnimal: 'Rabbit', element: 'Wood', polarity: 'Yin', hiddenStems: [{ stemIndex: 1, percentage: 100 }], startHour: 5, endHour: 7 },
  { index: 4, chinese: '辰', pinyin: 'Chen', zodiacAnimal: 'Dragon', element: 'Earth', polarity: 'Yang', hiddenStems: [{ stemIndex: 4, percentage: 60 }, { stemIndex: 1, percentage: 30 }, { stemIndex: 9, percentage: 10 }], startHour: 7, endHour: 9 },
  { index: 5, chinese: '巳', pinyin: 'Si', zodiacAnimal: 'Snake', element: 'Fire', polarity: 'Yin', hiddenStems: [{ stemIndex: 2, percentage: 60 }, { stemIndex: 4, percentage: 30 }, { stemIndex: 6, percentage: 10 }], startHour: 9, endHour: 11 },
  { index: 6, chinese: '午', pinyin: 'Wu', zodiacAnimal: 'Horse', element: 'Fire', polarity: 'Yang', hiddenStems: [{ stemIndex: 3, percentage: 70 }, { stemIndex: 5, percentage: 30 }], startHour: 11, endHour: 13 },
  { index: 7, chinese: '未', pinyin: 'Wei', zodiacAnimal: 'Goat', element: 'Earth', polarity: 'Yin', hiddenStems: [{ stemIndex: 5, percentage: 60 }, { stemIndex: 3, percentage: 30 }, { stemIndex: 1, percentage: 10 }], startHour: 13, endHour: 15 },
  { index: 8, chinese: '申', pinyin: 'Shen', zodiacAnimal: 'Monkey', element: 'Metal', polarity: 'Yang', hiddenStems: [{ stemIndex: 6, percentage: 60 }, { stemIndex: 8, percentage: 30 }, { stemIndex: 4, percentage: 10 }], startHour: 15, endHour: 17 },
  { index: 9, chinese: '酉', pinyin: 'You', zodiacAnimal: 'Rooster', element: 'Metal', polarity: 'Yin', hiddenStems: [{ stemIndex: 7, percentage: 100 }], startHour: 17, endHour: 19 },
  { index: 10, chinese: '戌', pinyin: 'Xu', zodiacAnimal: 'Dog', element: 'Earth', polarity: 'Yang', hiddenStems: [{ stemIndex: 4, percentage: 60 }, { stemIndex: 7, percentage: 30 }, { stemIndex: 3, percentage: 10 }], startHour: 19, endHour: 21 },
  { index: 11, chinese: '亥', pinyin: 'Hai', zodiacAnimal: 'Pig', element: 'Water', polarity: 'Yin', hiddenStems: [{ stemIndex: 8, percentage: 70 }, { stemIndex: 0, percentage: 30 }], startHour: 21, endHour: 23 },
];

// --- 2. TEN GODS (SHI SHEN 十神) ---

export type TenGodName =
  | 'Bi Jian (Friend 比肩)'
  | 'Jie Cai (Rob Wealth 劫财)'
  | 'Shi Shen (Eating God 食神)'
  | 'Shang Guan (Hurting Officer 伤官)'
  | 'Pian Cai (Indirect Wealth 偏财)'
  | 'Zheng Cai (Direct Wealth 正财)'
  | 'Qian Sha (Seven Killings 七杀)'
  | 'Zheng Guan (Direct Officer 正官)'
  | 'Pian Yin (Indirect Seal 偏印)'
  | 'Zheng Yin (Direct Seal 正印)';

export function calculateTenGod(dayMasterStemIdx: number, targetStemIdx: number): TenGodName {
  const dm = HEAVENLY_STEMS[dayMasterStemIdx];
  const target = HEAVENLY_STEMS[targetStemIdx];

  const elementOrder: ElementChinese[] = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
  const dmElemIdx = elementOrder.indexOf(dm.element);
  const targetElemIdx = elementOrder.indexOf(target.element);

  const diff = (targetElemIdx - dmElemIdx + 5) % 5;
  const samePolarity = dm.polarity === target.polarity;

  switch (diff) {
    case 0: // Same element
      return samePolarity ? 'Bi Jian (Friend 比肩)' : 'Jie Cai (Rob Wealth 劫财)';
    case 1: // DM produces Target (Output)
      return samePolarity ? 'Shi Shen (Eating God 食神)' : 'Shang Guan (Hurting Officer 伤官)';
    case 2: // DM controls Target (Wealth)
      return samePolarity ? 'Pian Cai (Indirect Wealth 偏财)' : 'Zheng Cai (Direct Wealth 正财)';
    case 3: // Target controls DM (Officer/Power)
      return samePolarity ? 'Qian Sha (Seven Killings 七杀)' : 'Zheng Guan (Direct Officer 正官)';
    case 4: // Target produces DM (Resource/Seal)
      return samePolarity ? 'Pian Yin (Indirect Seal 偏印)' : 'Zheng Yin (Direct Seal 正印)';
    default:
      return 'Bi Jian (Friend 比肩)';
  }
}

// --- 3. BAZI FOUR PILLARS ENGINE ---

export interface BaZiPillar {
  stem: HeavenlyStem;
  branch: EarthlyBranch;
  tenGodStem: TenGodName;
  tenGodBranchMain: TenGodName;
  naYin: string;
}

export interface BaZiChart {
  yearPillar: BaZiPillar;
  monthPillar: BaZiPillar;
  dayPillar: BaZiPillar;
  hourPillar: BaZiPillar;
  dayMaster: HeavenlyStem;
  dayMasterStrength: 'Strong' | 'Weak' | 'Balanced';
  favorableElements: ElementChinese[];
  unfavorableElements: ElementChinese[];
  luckPillars: {
    ageStart: number;
    ageEnd: number;
    pillar: BaZiPillar;
  }[];
}

const NAYIN_TABLE: string[] = [
  'Sea Metal', 'Sea Metal', 'Furnace Fire', 'Furnace Fire', 'Forest Wood', 'Forest Wood',
  'Ground Earth', 'Ground Earth', 'Sword Metal', 'Sword Metal', 'Mountain Fire', 'Mountain Fire',
  'Cave Water', 'Cave Water', 'Sand Gold', 'Sand Gold', 'Willow Wood', 'Willow Wood',
  'Stream Water', 'Stream Water', 'Roof Earth', 'Roof Earth', 'Thunder Fire', 'Thunder Fire',
  'Pawn Wood', 'Pawn Wood', 'Clear Water', 'Clear Water', 'Highway Earth', 'Highway Earth',
  'Parchment Metal', 'Parchment Metal', 'Hilltop Fire', 'Hilltop Fire', 'Meadow Wood', 'Meadow Wood',
  'Fountain Water', 'Fountain Water', 'House Earth', 'House Earth', 'Hairpin Gold', 'Hairpin Gold',
  'Mulberry Wood', 'Mulberry Wood', 'Rapids Water', 'Rapids Water', 'Desert Earth', 'Desert Earth',
  'Sun Fire', 'Sun Fire', 'Pomegranate Wood', 'Pomegranate Wood', 'Ocean Water', 'Ocean Water',
];

export function getNaYin(stemIdx: number, branchIdx: number): string {
  const jiaZiIndex = (stemIdx * 6 + branchIdx * 5) % 60;
  return NAYIN_TABLE[Math.min(jiaZiIndex, 59)];
}

/**
 * Calculates complete BaZi Four Pillars chart for a given Gregorian date and time.
 */
export function calculateBaZiChart(date: Date, hour: number, gender: 'male' | 'female'): BaZiChart {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 1..12
  const day = date.getDate();

  // 1. Year Pillar (Sexagenary cycle offset from 1924 Jia Zi)
  // Solar Lichun cuts off around Feb 4
  let solarYear = year;
  if (month < 2 || (month === 2 && day < 4)) solarYear -= 1;
  const yearStemIdx = (solarYear - 4) % 10 < 0 ? (solarYear - 4) % 10 + 10 : (solarYear - 4) % 10;
  const yearBranchIdx = (solarYear - 4) % 12 < 0 ? (solarYear - 4) % 12 + 12 : (solarYear - 4) % 12;

  // 2. Month Pillar (Wu Hu Zhi rule: 5 Tigers Seeking Month)
  // Month branch: Feb=Tiger(2), Mar=Rabbit(3)... Jan=Ox(1)
  const monthBranchIdx = ((month + 1) % 12);
  const wuHuZhiStems = [2, 4, 6, 8, 0]; // Stems for Tiger month based on Year Stem % 5
  const tigerStemIdx = wuHuZhiStems[yearStemIdx % 5];
  const monthOffset = (monthBranchIdx - 2 + 12) % 12;
  const monthStemIdx = (tigerStemIdx + monthOffset) % 10;

  // 3. Day Pillar (Sexagenary epoch calculation)
  // Reference epoch: 2000-01-01 was Wu Wu (Stem 4, Branch 6)
  const refDate = new Date(2000, 0, 1);
  const diffDays = Math.floor((date.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));
  const dayStemIdx = ((4 + diffDays) % 10 + 10) % 10;
  const dayBranchIdx = ((6 + diffDays) % 12 + 12) % 12;

  // 4. Hour Pillar (Wu Shu Zhi rule: 5 Rats Seeking Hour)
  // Hour Branch (Zi=0, Chou=1... Hai=11)
  let hourBranchIdx = Math.floor(((hour + 1) % 24) / 2);
  const wuShuZhiStems = [0, 2, 4, 6, 8]; // Stems for Zi hour based on Day Stem % 5
  const ziHourStemIdx = wuShuZhiStems[dayStemIdx % 5];
  const hourStemIdx = (ziHourStemIdx + hourBranchIdx) % 10;

  const dayMaster = HEAVENLY_STEMS[dayStemIdx];

  const createPillar = (sIdx: number, bIdx: number): BaZiPillar => ({
    stem: HEAVENLY_STEMS[sIdx],
    branch: EARTHLY_BRANCHES[bIdx],
    tenGodStem: calculateTenGod(dayStemIdx, sIdx),
    tenGodBranchMain: calculateTenGod(dayStemIdx, EARTHLY_BRANCHES[bIdx].hiddenStems[0].stemIndex),
    naYin: getNaYin(sIdx, bIdx),
  });

  const yearPillar = createPillar(yearStemIdx, yearBranchIdx);
  const monthPillar = createPillar(monthStemIdx, monthBranchIdx);
  const dayPillar = createPillar(dayStemIdx, dayBranchIdx);
  const hourPillar = createPillar(hourStemIdx, hourBranchIdx);

  // Day Master Strength & Favorable Elements Analysis
  const dmElem = dayMaster.element;
  const monthElem = monthPillar.branch.element;
  const isSupportedByMonth = monthElem === dmElem || (
    (dmElem === 'Wood' && monthElem === 'Water') ||
    (dmElem === 'Fire' && monthElem === 'Wood') ||
    (dmElem === 'Earth' && monthElem === 'Fire') ||
    (dmElem === 'Metal' && monthElem === 'Earth') ||
    (dmElem === 'Water' && monthElem === 'Metal')
  );

  const dayMasterStrength: 'Strong' | 'Weak' | 'Balanced' = isSupportedByMonth ? 'Strong' : 'Weak';

  const favorableElements: ElementChinese[] = dayMasterStrength === 'Weak'
    ? [dmElem, dmElem === 'Wood' ? 'Water' : dmElem === 'Fire' ? 'Wood' : dmElem === 'Earth' ? 'Fire' : dmElem === 'Metal' ? 'Earth' : 'Metal']
    : [dmElem === 'Wood' ? 'Fire' : dmElem === 'Fire' ? 'Earth' : dmElem === 'Earth' ? 'Metal' : dmElem === 'Metal' ? 'Water' : 'Wood'];

  const unfavorableElements: ElementChinese[] = dayMasterStrength === 'Weak'
    ? [dmElem === 'Wood' ? 'Metal' : dmElem === 'Fire' ? 'Water' : dmElem === 'Earth' ? 'Wood' : dmElem === 'Metal' ? 'Fire' : 'Earth']
    : [dmElem, dmElem === 'Wood' ? 'Water' : dmElem === 'Fire' ? 'Wood' : dmElem === 'Earth' ? 'Fire' : dmElem === 'Metal' ? 'Earth' : 'Metal'];

  // Da Yun (10-Year Luck Pillars)
  const isYangYear = HEAVENLY_STEMS[yearStemIdx].polarity === 'Yang';
  const isForward = (gender === 'male' && isYangYear) || (gender === 'female' && !isYangYear);

  const luckPillars = [];
  const startAgeBase = 5; // Average start age

  for (let i = 1; i <= 8; i++) {
    const step = isForward ? i : -i;
    const lStemIdx = (monthStemIdx + step + 100) % 10;
    const lBranchIdx = (monthBranchIdx + step + 120) % 12;

    luckPillars.push({
      ageStart: startAgeBase + (i - 1) * 10,
      ageEnd: startAgeBase + i * 10 - 1,
      pillar: createPillar(lStemIdx, lBranchIdx),
    });
  }

  return {
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
    dayMaster,
    dayMasterStrength,
    favorableElements,
    unfavorableElements,
    luckPillars,
  };
}

// --- 4. ZI WEI DOU SHU (PURPLE STAR ASTROLOGY) ENGINE ---

export type ZiWeiPalaceName =
  | 'Ming Gong (Life Palace 命宫)'
  | 'Xiong Di (Brothers 兄弟宫)'
  | 'Fu Qi (Spouse 夫妻宫)'
  | 'Zi Nv (Children 子女宫)'
  | 'Cai Bo (Wealth 财帛宫)'
  | 'Ji E (Health 疾厄宫)'
  | 'Qian Yi (Travel 迁移宫)'
  | 'Jiao You (Friends 仆役宫)'
  | 'Guan Lu (Career 官禄宫)'
  | 'Tian Zhai (Property 田宅宫)'
  | 'Fu De (Mental/Karma 福德宫)'
  | 'Fu Mu (Parents 父母宫)';

export const ZI_WEI_PALACE_NAMES: ZiWeiPalaceName[] = [
  'Ming Gong (Life Palace 命宫)',
  'Xiong Di (Brothers 兄弟宫)',
  'Fu Qi (Spouse 夫妻宫)',
  'Zi Nv (Children 子女宫)',
  'Cai Bo (Wealth 财帛宫)',
  'Ji E (Health 疾厄宫)',
  'Qian Yi (Travel 迁移宫)',
  'Jiao You (Friends 仆役宫)',
  'Guan Lu (Career 官禄宫)',
  'Tian Zhai (Property 田宅宫)',
  'Fu De (Mental/Karma 福德宫)',
  'Fu Mu (Parents 父母宫)',
];

export interface ZiWeiStar {
  id: string;
  name: string;
  chinese: string;
  series: 'ZiWei' | 'TianFu' | 'Auxiliary';
  element: ElementChinese;
  brightness: 'Miao (Temple 庙)' | 'Wang (Prosperous 旺)' | 'De (Gain 得)' | 'Ping (Average 平)' | 'Xian (Trapped 陷)';
  siHua?: 'Hua Lu (禄)' | 'Hua Quan (权)' | 'Hua Ke (科)' | 'Hua Ji (忌)';
}

export interface ZiWeiPalace {
  palaceName: ZiWeiPalaceName;
  branch: EarthlyBranch;
  isLifePalace: boolean;
  isBodyPalace: boolean;
  stars: ZiWeiStar[];
}

export interface ZiWeiChart {
  palaces: ZiWeiPalace[];
  lifePalaceBranch: EarthlyBranch;
  bodyPalaceBranch: EarthlyBranch;
  elementBureau: string; // e.g. "Water 2nd Bureau"
  siHuaMap: Record<string, string>;
}

// 14 Major Stars catalog
export const MAJOR_STARS: Omit<ZiWeiStar, 'brightness' | 'siHua'>[] = [
  // Zi Wei Series
  { id: 'zi_wei', name: 'Zi Wei (Emperor Star)', chinese: '紫微', series: 'ZiWei', element: 'Earth' },
  { id: 'tian_ji', name: 'Tian Ji (Advisor Star)', chinese: '天机', series: 'ZiWei', element: 'Wood' },
  { id: 'tai_yang', name: 'Tai Yang (Sun Star)', chinese: '太阳', series: 'ZiWei', element: 'Fire' },
  { id: 'wu_qu', name: 'Wu Qu (Finance Star)', chinese: '武曲', series: 'ZiWei', element: 'Metal' },
  { id: 'tian_tong', name: 'Tian Tong (Pleasure Star)', chinese: '天同', series: 'ZiWei', element: 'Water' },
  { id: 'lian_zhen', name: 'Lian Zhen (Diplomat Star)', chinese: '廉贞', series: 'ZiWei', element: 'Fire' },

  // Tian Fu Series
  { id: 'tian_fu', name: 'Tian Fu (Treasury Star)', chinese: '天府', series: 'TianFu', element: 'Earth' },
  { id: 'tai_yin', name: 'Tai Yin (Moon Star)', chinese: '太阴', series: 'TianFu', element: 'Water' },
  { id: 'tan_lang', name: 'Tan Lang (Greed Star)', chinese: '贪狼', series: 'TianFu', element: 'Wood' },
  { id: 'ju_men', name: 'Ju Men (Gossip/Advocacy Star)', chinese: '巨门', series: 'TianFu', element: 'Water' },
  { id: 'tian_xiang', name: 'Tian Xiang (Minister Star)', chinese: '天相', series: 'TianFu', element: 'Water' },
  { id: 'tian_liang', name: 'Tian Liang (Inspector Star)', chinese: '天梁', series: 'TianFu', element: 'Earth' },
  { id: 'qi_sha', name: 'Qi Sha (General Star)', chinese: '七杀', series: 'TianFu', element: 'Metal' },
  { id: 'po_jun', name: 'Po Jun (Destroyer Star)', chinese: '破军', series: 'TianFu', element: 'Water' },
];

// Si Hua 10 Stems Transformation Table
export const SI_HUA_TABLE: Record<number, { lu: string; quan: string; ke: string; ji: string }> = {
  0: { lu: '廉贞', quan: '破军', ke: '武曲', ji: '太阳' }, // Jia
  1: { lu: '天机', quan: '天梁', ke: '紫微', ji: '太阴' }, // Yi
  2: { lu: '天同', quan: '天机', ke: '文昌', ji: '廉贞' }, // Bing
  3: { lu: '太阴', quan: '天同', ke: '天机', ji: '巨门' }, // Ding
  4: { lu: '贪狼', quan: '太阴', ke: '右弼', ji: '天机' }, // Wu
  5: { lu: '武曲', quan: '贪狼', ke: '天梁', ji: '文曲' }, // Ji
  6: { lu: '太阳', quan: '武曲', ke: '太阴', ji: '天同' }, // Geng
  7: { lu: '巨门', quan: '太阳', ke: '文曲', ji: '文昌' }, // Xin
  8: { lu: '天梁', quan: '紫微', ke: '左辅', ji: '武曲' }, // Ren
  9: { lu: '破军', quan: '巨门', ke: '太阴', ji: '贪狼' }, // Gui
};

/**
 * Calculates Zi Wei Dou Shu Chart.
 */
export function calculateZiWeiChart(
  date: Date,
  birthHour: number, // 0..23
  gender: 'male' | 'female'
): ZiWeiChart {
  const lunarMonth = date.getMonth() + 1; // Simplified 1..12 month representation
  const birthHourBranchIdx = Math.floor(((birthHour + 1) % 24) / 2); // Zi=0, Chou=1...

  // 1. Life Palace Branch position: (Lunar Month - Birth Hour Branch + 12) % 12
  const lifePalaceBranchIdx = (lunarMonth - birthHourBranchIdx + 12) % 12;

  // 2. Body Palace Branch position: (Lunar Month + Birth Hour Branch) % 12
  const bodyPalaceBranchIdx = (lunarMonth + birthHourBranchIdx) % 12;

  // 3. Arrange 12 Palaces counter-clockwise starting from Life Palace
  const palaces: ZiWeiPalace[] = [];
  for (let i = 0; i < 12; i++) {
    const branchIdx = (lifePalaceBranchIdx + i) % 12;
    palaces.push({
      palaceName: ZI_WEI_PALACE_NAMES[i],
      branch: EARTHLY_BRANCHES[branchIdx],
      isLifePalace: i === 0,
      isBodyPalace: branchIdx === bodyPalaceBranchIdx,
      stars: [],
    });
  }

  // 4. Element Bureau Determination (Simplified Water 2nd Bureau)
  const bureau = 'Water 2nd Bureau (水二局)';

  // 5. Star Positions Placement Algorithm
  // Zi Wei Star Index in Palaces
  const ziWeiPalaceIdx = (lunarMonth + Math.floor(date.getDate() / 2)) % 12;
  const tianFuPalaceIdx = (12 - ziWeiPalaceIdx) % 12;

  // Si Hua for Year Stem
  const yearStemIdx = (date.getFullYear() - 4) % 10;
  const siHua = SI_HUA_TABLE[yearStemIdx] || SI_HUA_TABLE[0];

  const siHuaMap: Record<string, string> = {
    'Hua Lu (禄)': siHua.lu,
    'Hua Quan (权)': siHua.quan,
    'Hua Ke (科)': siHua.ke,
    'Hua Ji (忌)': siHua.ji,
  };

  // Place Zi Wei Series Stars relative to Zi Wei position
  const ziWeiOffsets: { star: typeof MAJOR_STARS[0]; offset: number }[] = [
    { star: MAJOR_STARS[0], offset: 0 },   // Zi Wei
    { star: MAJOR_STARS[1], offset: -1 },  // Tian Ji
    { star: MAJOR_STARS[2], offset: -3 },  // Tai Yang
    { star: MAJOR_STARS[3], offset: -4 },  // Wu Qu
    { star: MAJOR_STARS[4], offset: -5 },  // Tian Tong
    { star: MAJOR_STARS[5], offset: -8 },  // Lian Zhen
  ];

  ziWeiOffsets.forEach(({ star, offset }) => {
    const pIdx = (ziWeiPalaceIdx + offset + 120) % 12;
    const isLu = siHua.lu === star.chinese;
    const isQuan = siHua.quan === star.chinese;
    const isKe = siHua.ke === star.chinese;
    const isJi = siHua.ji === star.chinese;

    let sTransformation: ZiWeiStar['siHua'];
    if (isLu) sTransformation = 'Hua Lu (禄)';
    else if (isQuan) sTransformation = 'Hua Quan (权)';
    else if (isKe) sTransformation = 'Hua Ke (科)';
    else if (isJi) sTransformation = 'Hua Ji (忌)';

    palaces[pIdx].stars.push({
      ...star,
      brightness: 'Wang (Prosperous 旺)',
      siHua: sTransformation,
    });
  });

  // Place Tian Fu Series Stars relative to Tian Fu position
  const tianFuOffsets: { star: typeof MAJOR_STARS[0]; offset: number }[] = [
    { star: MAJOR_STARS[6], offset: 0 },  // Tian Fu
    { star: MAJOR_STARS[7], offset: 1 },  // Tai Yin
    { star: MAJOR_STARS[8], offset: 2 },  // Tan Lang
    { star: MAJOR_STARS[9], offset: 3 },  // Ju Men
    { star: MAJOR_STARS[10], offset: 4 }, // Tian Xiang
    { star: MAJOR_STARS[11], offset: 5 }, // Tian Liang
    { star: MAJOR_STARS[12], offset: 6 }, // Qi Sha
    { star: MAJOR_STARS[13], offset: 10 },// Po Jun
  ];

  tianFuOffsets.forEach(({ star, offset }) => {
    const pIdx = (tianFuPalaceIdx + offset + 120) % 12;
    const isLu = siHua.lu === star.chinese;
    const isQuan = siHua.quan === star.chinese;
    const isKe = siHua.ke === star.chinese;
    const isJi = siHua.ji === star.chinese;

    let sTransformation: ZiWeiStar['siHua'];
    if (isLu) sTransformation = 'Hua Lu (禄)';
    else if (isQuan) sTransformation = 'Hua Quan (权)';
    else if (isKe) sTransformation = 'Hua Ke (科)';
    else if (isJi) sTransformation = 'Hua Ji (忌)';

    palaces[pIdx].stars.push({
      ...star,
      brightness: 'Miao (Temple 庙)',
      siHua: sTransformation,
    });
  });

  return {
    palaces,
    lifePalaceBranch: EARTHLY_BRANCHES[lifePalaceBranchIdx],
    bodyPalaceBranch: EARTHLY_BRANCHES[bodyPalaceBranchIdx],
    elementBureau: bureau,
    siHuaMap,
  };
}
