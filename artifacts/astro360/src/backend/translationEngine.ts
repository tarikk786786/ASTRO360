/**
 * ASTRO360 7-Language Multi-Lingual Translation & Localization Engine
 * Languages: English 🇺🇸, Hindi 🇮🇳, Urdu 🇵🇰, Spanish 🇪🇸, French 🇫🇷, Chinese 🇨🇳, Arabic 🇸🇦
 */

export type SupportedLanguage = 'en' | 'hi' | 'ur' | 'es' | 'fr' | 'zh' | 'ar';

export interface TranslationDictionary {
  title: string;
  subtitle: string;
  cosmicScore: string;
  dignifiedPlanets: string;
  retrogradeCount: string;
  goldenWindow: string;
  remedies: string;
  aiOracle: string;
}

const DICTIONARIES: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    title: 'ASTRO360 Mission Control',
    subtitle: 'Universal Multi-Religious Astrological Intelligence',
    cosmicScore: 'Cosmic Alignment Score',
    dignifiedPlanets: 'Dignified Planets',
    retrogradeCount: 'Retrograde Velocity',
    goldenWindow: 'Golden Window (Abhijit)',
    remedies: 'Multi-Faith Remedies',
    aiOracle: 'Consult AI Oracle'
  },
  hi: {
    title: 'ASTRO360 मिशन कंट्रोल',
    subtitle: 'सर्वभौमिक बहु-धार्मिक ज्योतिषीय बुद्धिमत्ता',
    cosmicScore: 'कॉस्मिक अलाइनमेंट स्कोर',
    dignifiedPlanets: 'उच्च / स्वग्रही ग्रह',
    retrogradeCount: 'वक्री ग्रह गति',
    goldenWindow: 'अभिजीत मुहूर्त',
    remedies: 'सर्व-धर्म उपाय एवं मंत्र',
    aiOracle: 'एआई ओरकल से परामर्श करें'
  },
  ur: {
    title: 'ASTRO360 مشن کنٹرول',
    subtitle: 'عالمگیر کثیر المذاہب نجومی ذہانت',
    cosmicScore: 'کاسمک الائنمنٹ اسکور',
    dignifiedPlanets: 'شرف یا ذاتی گھر والے سیارے',
    retrogradeCount: 'معکوس رفتار (رجعت)',
    goldenWindow: 'ساعتِ مبارکہ (ابھیجیت)',
    remedies: 'وظائف، ادعیہ اور روحانی علاج',
    aiOracle: 'اے آئی اوریکل سے مشورہ کریں'
  },
  es: {
    title: 'ASTRO360 Control de Misión',
    subtitle: 'Inteligencia Astrológica Multirreligiosa Universal',
    cosmicScore: 'Puntuación de Alineación Cósmica',
    dignifiedPlanets: 'Planetas Dignificados',
    retrogradeCount: 'Velocidad Retrógrada',
    goldenWindow: 'Ventana Dorada (Abhijit)',
    remedies: 'Remedios Multife',
    aiOracle: 'Consultar Oráculo IA'
  },
  fr: {
    title: 'ASTRO360 Contrôle de Mission',
    subtitle: 'Intelligence Astrologique Multireligieuse Universelle',
    cosmicScore: 'Score d\'Alignement Cosmique',
    dignifiedPlanets: 'Planètes Dignifiées',
    retrogradeCount: 'Vitesse Rétrograde',
    goldenWindow: 'Fenêtre Dorée (Abhijit)',
    remedies: 'Remèdes Multiconfessionnels',
    aiOracle: 'Consulter l\'Oracle IA'
  },
  zh: {
    title: 'ASTRO360 任务控制中心',
    subtitle: '通用多宗教星象智慧系统',
    cosmicScore: '宇宙对齐得分',
    dignifiedPlanets: '庙旺行星数量',
    retrogradeCount: '逆行行星速度',
    goldenWindow: '黄金吉时 (Abhijit)',
    remedies: '多信仰解盘与化解方法',
    aiOracle: '咨询 AI 神谕'
  },
  ar: {
    title: 'ASTRO360 مركز التحكم بالمهمة',
    subtitle: 'الذكاء الفلكي العالمي متعدد الأديان',
    cosmicScore: 'درجة التوافق الكوني',
    dignifiedPlanets: 'الكواكب المسعفة والشريفة',
    retrogradeCount: 'سرعة التراجع',
    goldenWindow: 'الساعة المباركة (أبهيجيت)',
    remedies: 'العلاجات والوظائف الروحية',
    aiOracle: 'استشارة أوراكل الذكاء الاصطناعي'
  }
};

export function getTranslations(lang: SupportedLanguage = 'en'): TranslationDictionary {
  return DICTIONARIES[lang] || DICTIONARIES.en;
}
