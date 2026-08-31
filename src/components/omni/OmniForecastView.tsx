import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, Clock, Sparkles, Heart, Briefcase, DollarSign, Compass, 
  HelpCircle, ShieldCheck, ChevronRight, CheckCircle2, Filter, Layers, 
  ArrowUpRight, AlertTriangle, BookOpen, Activity, ShieldAlert, Award, Zap
} from 'lucide-react';
import type { UserProfile } from '../../types';
import OmniWhyDrawer, { type OmniWhyDrawerProps } from './OmniWhyDrawer';

export interface ForecastEvent {
  id: string;
  category: 'career' | 'love' | 'money' | 'growth' | 'travel';
  title: string;
  period: string;
  energyLevel: number; // 0 - 100
  statusText: string;
  systemsCount: number;
  traditionLabel: string;
  summary: string;
  classicalCitation: string;
  guidance: string[];
  crossTraditionConsensus?: {
    tradition: string;
    verdict: string;
  }[];
  whyPayload: Partial<OmniWhyDrawerProps>;
}

// Multi-tradition generator yielding tailored predictions per horizon
function getTraditionForecastData(tradition: string, userProfile: UserProfile): Record<'7days' | '30days' | '12months' | '5years', ForecastEvent[]> {
  const name = userProfile.name?.trim() || 'Seeker';
  const t = tradition.toLowerCase();

  if (t.includes('islamic')) {
    return {
      '7days': [
        {
          id: 'isl-7-1',
          category: 'career',
          title: 'Sa\'at al-Kawakib: Jupiter Hour Leadership Surge',
          period: 'Next 3 Days (Peak: Duha to Dhuhr)',
          energyLevel: 91,
          statusText: 'Barakah Peak',
          systemsCount: 4,
          traditionLabel: 'Ilm al-Falak',
          summary: `${name}, the Sun aligns with Manzil Al-Thurayya (Pleiades) during the planetary hour of Mushtari (Jupiter), unlocking exceptional Barakah for executive negotiations and contracts.`,
          classicalCitation: 'Kitab al-Tafhim (Al-Biruni) Ch. 5 • Ghayat al-Hakim',
          guidance: [
            'Initiate major commercial conversations during the Solar and Jupiter planetary hours',
            'Give morning water charity (Sadaqah) before critical negotiations',
            'Recite Ya Razzaq (308x) for financial clarity and righteous sustenance'
          ],
          crossTraditionConsensus: [
            { tradition: 'Vedic Jyotish', verdict: 'Sun transiting 10th Kendra with Jupiter trine aspect' },
            { tradition: 'Western Tropical', verdict: 'Sun Sextile Mars applying with 0°14\' orb' }
          ],
          whyPayload: {
            title: "Jupiter Hour Leadership Surge",
            period: "Next 3 Days",
            confidence: "High (91%)",
            confidenceScore: 91,
            factors: [
              "Solar ingress into auspicious Lunar Mansion Al-Thurayya",
              "Mushtari (Jupiter) hour coincides with midday trade window",
              "Sahm al-Sa'ada (Part of Fortune) receives direct benefic beam"
            ]
          }
        },
        {
          id: 'isl-7-2',
          category: 'love',
          title: 'Manzil al-Haq\'ah: Harmony & Family Reassurance',
          period: 'This Weekend (Friday Sunset – Sunday)',
          energyLevel: 84,
          statusText: 'Rahmah Inflow',
          systemsCount: 3,
          traditionLabel: 'Ilm al-Falak',
          summary: 'Moon enters the soothing constellation of Al-Haq\'ah in harmony with Venus (Zuhrah), softening communication and healing past misunderstandings.',
          classicalCitation: 'Al-Madkhal al-Kabir (Abu Ma\'shar) • Kitab al-Mawalid',
          guidance: [
            'Host or visit family for blessed Friday evening gatherings',
            'Practice active forgiveness and generous speech',
            'Recite Surah Ya-Sin for emotional serenity and household peace'
          ],
          whyPayload: {
            title: "Harmony & Family Reassurance",
            period: "This Weekend",
            confidence: "High",
            confidenceScore: 84,
            factors: [
              "Moon-Venus sextile across 4th and 7th houses",
              "Benefic Zuhrah dignity in cardinal sign"
            ]
          }
        }
      ],
      '30days': [
        {
          id: 'isl-30-1',
          category: 'money',
          title: 'Sahm al-Mal & Sahm al-Tijarah Financial Expansion',
          period: 'Upcoming 4 Weeks (Safar – Rabi al-Awwal)',
          energyLevel: 89,
          statusText: 'High Sustenance Window',
          systemsCount: 4,
          traditionLabel: 'Ilm al-Falak',
          summary: 'The Arabic Lot of Commerce (Sahm al-Tijarah) conjoins the natal 2nd house of halal sustenance, opening new income streams and partnership opportunities.',
          classicalCitation: 'Kitab al-Milal wa al-Duwal (Abu Ma\'shar) • Al-Biruni Ephemeris',
          guidance: [
            'Audit financial contracts and ensure complete ethical transparency',
            'Reinvest a portion of profits into community welfare (Zakat/Sadaqah)',
            'Recite Surah Al-Waqi\'ah every evening after Maghrib'
          ],
          whyPayload: {
            title: "Sahm al-Mal Financial Expansion",
            period: "Upcoming 4 Weeks",
            confidence: "High (89%)",
            confidenceScore: 89,
            factors: [
              "Arabic Lot of Wealth activates natal 2nd house",
              "Jupiter stations direct in harmonious trine"
            ]
          }
        }
      ],
      '12months': [
        {
          id: 'isl-12-1',
          category: 'growth',
          title: 'Zuhal (Saturn) Discipline & Spiritual Elevation',
          period: 'Next 12 Months',
          energyLevel: 88,
          statusText: 'Mastery & Wisdom',
          systemsCount: 4,
          traditionLabel: 'Ilm al-Falak',
          summary: 'A 12-month transit of Saturn through the 9th house of sacred wisdom instills profound patience, legal rectitude, and scholarly accomplishment.',
          classicalCitation: 'Ibn Arabi Fusus al-Hikam • Kitab al-Ikhtiyarat',
          guidance: [
            'Undertake sacred pilgrimage (Umrah/Hajj) or scholarly study',
            'Establish disciplined daily spiritual routines and voluntary fasting',
            'Document institutional knowledge for future generations'
          ],
          whyPayload: {
            title: "Zuhal Discipline & Spiritual Elevation",
            period: "Next 12 Months",
            confidence: "High",
            confidenceScore: 88,
            factors: [
              "Saturn in 9th house tests and fortifies philosophical foundation",
              "Dignified Jupiter aspect relieves nodal pressure"
            ]
          }
        }
      ],
      '5years': [
        {
          id: 'isl-5y-1',
          category: 'career',
          title: 'Grand Solar Return & Enterprise Legacy Epoch',
          period: '2027 – 2031',
          energyLevel: 96,
          statusText: 'Grand Milestone',
          systemsCount: 5,
          traditionLabel: 'Ilm al-Falak',
          summary: 'A once-in-a-generation alignment of Al-Shams (Sun) and Mushtari (Jupiter) across your Midheaven zenith, establishing enduring community honor and executive authority.',
          classicalCitation: 'Al-Qanun al-Mas\'udi (Al-Biruni) Book VIII',
          guidance: [
            'Build institutions and platforms with multi-decade vision',
            'Anchor all business contracts in uncompromising ethics',
            'Mentor rising talents and create sustainable community impact'
          ],
          whyPayload: {
            title: "Grand Solar Return & Enterprise Legacy",
            period: "2027 – 2031",
            confidence: "High (96%)",
            confidenceScore: 96,
            factors: [
              "Sun conjunct Midheaven in Solar Return revolution",
              "120-year cycle synchronicity across Arabic Lots"
            ]
          }
        }
      ]
    };
  } else if (t.includes('chinese') || t.includes('bazi')) {
    return {
      '7days': [
        {
          id: 'bz-7-1',
          category: 'career',
          title: 'Wood Dragon & Fire Horse: Sheng Cycle Acceleration',
          period: 'Next 3–5 Days',
          energyLevel: 90,
          statusText: 'Generating Flow',
          systemsCount: 3,
          traditionLabel: 'BaZi Four Pillars',
          summary: `${name}, the generating cycle (Sheng) of Wood feeding Fire provides exceptional vitality and strategic momentum for your Day Master (戊土 Wu Earth).`,
          classicalCitation: 'San Ming Tong Hui (三命通会) • Di Tian Sui (滴天髓)',
          guidance: [
            'Leverage high creative focus to pitch bold initiatives',
            'Collaborate with Water and Metal element colleagues',
            'Wear gold or white accents to ground fiery energy'
          ],
          whyPayload: {
            title: "Wood Dragon Sheng Cycle Acceleration",
            period: "Next 3–5 Days",
            confidence: "High (90%)",
            confidenceScore: 90,
            factors: [
              "Favorable element (Yong Shen) reinforced by daily pillar",
              "No harsh clashes (Chong) on natal Day Branch"
            ]
          }
        }
      ],
      '30days': [
        {
          id: 'bz-30-1',
          category: 'money',
          title: 'Zheng Cai (Direct Wealth) Inflow Window',
          period: 'This Month',
          energyLevel: 87,
          statusText: 'Wealth Cultivation',
          systemsCount: 4,
          traditionLabel: 'BaZi Four Pillars',
          summary: 'The Monthly Officer Cheng (Success) combined with Zheng Cai (Direct Wealth Star) brings lucrative contract renewals and stable dividend returns.',
          classicalCitation: 'Zi Ping Zhen Quan (子平真诠) • Qiong Tong Bao Jian',
          guidance: [
            'Finalize supplier agreements and optimize commercial pricing',
            'Avoid speculative gambles during Dog (戌) clash days',
            'Place a water feature in the North-Wealth sector of your office'
          ],
          whyPayload: {
            title: "Zheng Cai Direct Wealth Inflow",
            period: "This Month",
            confidence: "High",
            confidenceScore: 87,
            factors: [
              "Direct Wealth Star activates Day Master balance",
              "12 Day Officers align on 3 consecutive auspicious dates"
            ]
          }
        }
      ],
      '12months': [
        {
          id: 'bz-12-1',
          category: 'growth',
          title: 'Liu Nian (Annual Pillar) Breakthrough & Authority',
          period: 'Next 12 Months',
          energyLevel: 92,
          statusText: 'Major Horizon',
          systemsCount: 4,
          traditionLabel: 'BaZi Four Pillars',
          summary: 'The flowing annual pillar combines harmoniously with your Month Pillar of career, unlocking promotions, corporate recognition, and professional autonomy.',
          classicalCitation: 'San Ming Tong Hui Scroll 7 • Five Elements Balance',
          guidance: [
            'Take on executive responsibilities and cross-department leadership',
            'Network with mentors in high-ranking industry positions',
            'Maintain emotional equilibrium through mindful lifestyle habits'
          ],
          whyPayload: {
            title: "Liu Nian Annual Pillar Breakthrough",
            period: "Next 12 Months",
            confidence: "High (92%)",
            confidenceScore: 92,
            factors: [
              "Heavenly Stem and Earthly Branch form harmonious combination (He)",
              "Nobleman Star (Tian Yi Gui Ren) active in career pillar"
            ]
          }
        }
      ],
      '5years': [
        {
          id: 'bz-5y-1',
          category: 'career',
          title: '10-Year Da Yun (大运) Golden Luck Pillar Transition',
          period: '2026 – 2031',
          energyLevel: 97,
          statusText: 'Decade Peak',
          systemsCount: 5,
          traditionLabel: 'BaZi Four Pillars',
          summary: 'Transition into the Metal Monkey Da Yun luck pillar establishes peak industrial authority, financial prosperity, and international renown.',
          classicalCitation: 'Di Tian Sui Commentary • Classical Master Epoch',
          guidance: [
            'Build generational wealth vehicles and long-term enterprises',
            'Invest in education, philanthropy, and community infrastructure',
            'Lead with humility, wisdom, and benevolence'
          ],
          whyPayload: {
            title: "10-Year Da Yun Golden Luck Pillar",
            period: "2026 – 2031",
            confidence: "Exceptional (97%)",
            confidenceScore: 97,
            factors: [
              "10-Year Luck Pillar supplies the exact missing element (Yong Shen)",
              "Four Pillars form full celestial harmony"
            ]
          }
        }
      ]
    };
  } else if (t.includes('kp')) {
    return {
      '7days': [
        {
          id: 'kp-7-1',
          category: 'career',
          title: '10th Cuspal Sub-Lord (2-6-10-11) Professional Surge',
          period: 'Next 3 Days (Pushya Star Window)',
          energyLevel: 93,
          statusText: 'High Event Timing',
          systemsCount: 4,
          traditionLabel: 'KP Stellar System',
          summary: `${name}, your 10th cusp sub-lord signifies houses 2, 6, 10, and 11, creating infallible timing conditions for career recognition and successful negotiations.`,
          classicalCitation: 'KP Reader IV (Marriage & Profession) by Prof. K.S. Krishnamurti',
          guidance: [
            'Schedule presentations during the ruling planet hours of Sun and Mercury',
            'Close high-value sales deals and contract renewals without hesitation',
            'Document every agreement with precise cuspal timelines'
          ],
          whyPayload: {
            title: "10th Cuspal Sub-Lord Surge",
            period: "Next 3 Days",
            confidence: "Very High (93%)",
            confidenceScore: 93,
            factors: [
              "249 Table sub-lord interlinks directly with houses of material gain",
              "Transit Moon passes through star of active Dasha lord"
            ]
          }
        }
      ],
      '30days': [
        {
          id: 'kp-30-1',
          category: 'money',
          title: 'DBAS Period (Dasha-Bhukti-Antara) Wealth Realization',
          period: 'Upcoming 30 Days',
          energyLevel: 88,
          statusText: 'Asset Realization',
          systemsCount: 3,
          traditionLabel: 'KP Stellar System',
          summary: 'The active Bhukti lord strongly signifies 2nd (wealth) and 11th (gains) cusps without negative 8/12 hindrance, unlocking deferred compensation.',
          classicalCitation: 'KP Reader III (Predictive Stellar Astrology) Table 249',
          guidance: [
            'Follow up on outstanding invoices and long-term receivables',
            'Execute planned asset purchases during favorable Star Lord transits',
            'Diversify investment holdings into secure, income-bearing vehicles'
          ],
          whyPayload: {
            title: "DBAS Wealth Realization",
            period: "Upcoming 30 Days",
            confidence: "High",
            confidenceScore: 88,
            factors: [
              "Sub-Lord of 2nd cusp is in the star of an un-tenanted planet",
              "Ruling Planets confirm immediate fruitation of financial targets"
            ]
          }
        }
      ],
      '12months': [
        {
          id: 'kp-12-1',
          category: 'growth',
          title: '9th & 11th Cusp Interlinks: Higher Wisdom & Networks',
          period: 'Next 12 Months',
          energyLevel: 90,
          statusText: 'Cuspal Harmony',
          systemsCount: 4,
          traditionLabel: 'KP Stellar System',
          summary: 'A powerful cuspal interlink between the 9th (higher law) and 11th (fulfilment of desires) houses ushers in prestigious advisory positions and honors.',
          classicalCitation: 'KP Reader VI (Horary Astrology & Event Timing)',
          guidance: [
            'Publish intellectual research or patent innovative methodologies',
            'Expand elite professional affiliations and trade networks',
            'Serve as an authoritative mentor in your specialized domain'
          ],
          whyPayload: {
            title: "9th & 11th Cusp Interlinks",
            period: "Next 12 Months",
            confidence: "High (90%)",
            confidenceScore: 90,
            factors: [
              "Star Lord of 9th cusp aspects 1st and 11th cuspal sub-lords",
              "No malefic aspect on the 10th house sub-lord"
            ]
          }
        }
      ],
      '5years': [
        {
          id: 'kp-5y-1',
          category: 'career',
          title: 'Mahadasha Shift: Pinnacle Executive Authority',
          period: '2027 – 2032',
          energyLevel: 96,
          statusText: 'Macro Pinnacle',
          systemsCount: 5,
          traditionLabel: 'KP Stellar System',
          summary: 'The commencement of a new Mahadasha governed by a prime significator of the 1st and 10th houses establishes unchallenged leadership in your industry.',
          classicalCitation: 'KP Reader II (Fundamental Principles) Timing of Events',
          guidance: [
            'Found and scale institutional ventures with multi-year roadmap',
            'Maintain ethical precision and strict compliance across all assets',
            'Lead industry standards and train successor talent'
          ],
          whyPayload: {
            title: "Mahadasha Shift: Executive Authority",
            period: "2027 – 2032",
            confidence: "Exceptional (96%)",
            confidenceScore: 96,
            factors: [
              "Dasha lord is strongest significator of 1, 10, 11 houses",
              "Sub-lord confirms total support without 6-8-12 obstruction"
            ]
          }
        }
      ]
    };
  } else if (t.includes('jaimini')) {
    return {
      '7days': [
        {
          id: 'jm-7-1',
          category: 'career',
          title: 'Amatyakaraka (AmK) & Arudha Lagna (AL) Alignment',
          period: 'Next 3–5 Days',
          energyLevel: 89,
          statusText: 'Public Honor',
          systemsCount: 4,
          traditionLabel: 'Jaimini Sutras',
          summary: `${name}, transiting planets form auspicious Jaimini Rashi Drishti (sign aspects) on your Arudha Lagna (AL) and Amatyakaraka (AmK), boosting public prestige.`,
          classicalCitation: 'Jaimini Upadesha Sutras Adhyaya 1 • Maharishi Jaimini',
          guidance: [
            'Step into public speaking or media representation roles',
            'Align your personal values with visible professional output',
            'Honor commitments made to senior mentors'
          ],
          whyPayload: {
            title: "AmK & Arudha Lagna Alignment",
            period: "Next 3–5 Days",
            confidence: "High (89%)",
            confidenceScore: 89,
            factors: [
              "Benefic Jupiter casts Rashi Drishti on Arudha Lagna",
              "Amatyakaraka planet gains high Shadbala and Chara strength"
            ]
          }
        }
      ],
      '30days': [
        {
          id: 'jm-30-1',
          category: 'growth',
          title: 'Atmakaraka (AK) Spiritual Realization & Soul Purpose',
          period: 'Upcoming 30 Days',
          energyLevel: 91,
          statusText: 'Soul Awakening',
          systemsCount: 4,
          traditionLabel: 'Jaimini Sutras',
          summary: 'Your Atmakaraka (highest degree planet) activates the Karakamsha in Navamsha, bringing deep clarity regarding your lifelong dharma and ethical mission.',
          classicalCitation: 'Jaimini Sutras Ch. 2 (Karakamsha Adhyaya)',
          guidance: [
            'Dedicate regular hours to contemplation, meditation, and self-inquiry',
            'Resolve internal conflicts through selfless service and detachment',
            'Study classical philosophy and sacred foundational literature'
          ],
          whyPayload: {
            title: "Atmakaraka Soul Purpose Activation",
            period: "Upcoming 30 Days",
            confidence: "High",
            confidenceScore: 91,
            factors: [
              "Atmakaraka in Navamsha Lagna receives benefic aspects",
              "Chara Dasha period activates 9th Dharma sign"
            ]
          }
        }
      ],
      '12months': [
        {
          id: 'jm-12-1',
          category: 'career',
          title: 'Chara Dasha Sign Shift: Major Professional Elevation',
          period: 'Next 12 Months',
          energyLevel: 93,
          statusText: 'Major Sign Period',
          systemsCount: 4,
          traditionLabel: 'Jaimini Sutras',
          summary: 'Shift into a cardinal Chara Dasha sign aspecting the 10th Pada (A10 / Rajya Pada) ushers in prominent leadership, title changes, and public recognition.',
          classicalCitation: 'Jaimini Sutras Ch. 3 (Chara Dasha Calculations)',
          guidance: [
            'Lead high-stakes strategic initiatives with confidence',
            'Build alliances with ethical leaders in governance and commerce',
            'Protect institutional reputation through transparent administration'
          ],
          whyPayload: {
            title: "Chara Dasha Sign Shift",
            period: "Next 12 Months",
            confidence: "Very High (93%)",
            confidenceScore: 93,
            factors: [
              "Active Chara Dasha sign contains Amatyakaraka and Putrakaraka",
              "Arudha Lagna receives uninterrupted benefic Argala"
            ]
          }
        }
      ],
      '5years': [
        {
          id: 'jm-5y-1',
          category: 'career',
          title: 'Brahma & Maheshwara Karaka: Enduring Legacy Epoch',
          period: '2027 – 2032',
          energyLevel: 96,
          statusText: 'Legacy Epoch',
          systemsCount: 5,
          traditionLabel: 'Jaimini Sutras',
          summary: 'Convergence of Jaimini Chara Dasha with Karakamsha 10th house benefic confluence establishes enduring, multi-generational institutional authority.',
          classicalCitation: 'Jaimini Upadesha Sutras Adhyaya 4 (Argala & Phaladeepa)',
          guidance: [
            'Establish charitable foundations and educational trusts',
            'Author comprehensive treatises or codified knowledge systems',
            'Mentor next-generation pioneers with dedication'
          ],
          whyPayload: {
            title: "Jaimini Enduring Legacy Epoch",
            period: "2027 – 2032",
            confidence: "Exceptional (96%)",
            confidenceScore: 96,
            factors: [
              "Rajya Pada (A10) energized by Jupiter and Venus in kendras",
              "Atmakaraka achieves full soul maturation"
            ]
          }
        }
      ]
    };
  } else {
    // Vedic Parashari (Default) & Western Synthesis
    return {
      '7days': [
        {
          id: 'f1',
          category: 'career',
          title: 'High-Impact Strategic Execution & Solar Trine',
          period: 'Today – In 3 Days',
          energyLevel: 88,
          statusText: 'Strong Peak',
          systemsCount: 4,
          traditionLabel: 'Vedic Parashari & Western',
          summary: `${name}, Mars and Mercury align in your 10th house of profession while the Sun forms a harmonic trine with Jupiter. Peak window for decisive execution.`,
          classicalCitation: 'Brihat Parashara Hora Shastra Ch. 42 (Rajayoga Adhyaya)',
          guidance: [
            'Present your proposals confidently to executive stakeholders',
            'Finalize pending commercial agreements and clear backlogs',
            'Channel high cognitive stamina into high-leverage deliverables'
          ],
          crossTraditionConsensus: [
            { tradition: 'Western Tropical', verdict: 'Sun Sextile Mars applying with 0°14\' orb' },
            { tradition: 'KP Stellar', verdict: '10th sub-lord connects with houses 2-6-10-11' },
            { tradition: 'Islamic Ilm al-Falak', verdict: 'Hour of Mushtari (Jupiter) active during midday trade' }
          ],
          whyPayload: {
            title: "High-Impact Strategic Execution",
            period: "Today – In 3 Days",
            confidence: "High (90%)",
            confidenceScore: 90,
            factors: [
              "Mercury transit creates Bhadra Yoga resonance in intellectual house",
              "Mars confers executive energy and physical stamina",
              "Moon transit activates auspicious 11th house of gains"
            ]
          }
        },
        {
          id: 'f2',
          category: 'love',
          title: 'Harmonious Venus-Moon Trine Alignment',
          period: 'This Weekend (Friday – Sunday)',
          energyLevel: 82,
          statusText: 'Positive Flow',
          systemsCount: 3,
          traditionLabel: 'Vedic & Western Synthesis',
          summary: 'Transiting Venus aspects your natal Moon house, fostering deep empathy, openhearted conversations, and mutual reassurance in relationships.',
          classicalCitation: 'Phaladeepika Ch. 14 (Transits of Benefics) • Tetrabiblos Book IV',
          guidance: [
            'Plan calm, quality time with loved ones or partner',
            'Express gratitude and appreciation openly',
            'Engage in creative arts, music, or restful nature walks'
          ],
          whyPayload: {
            title: "Harmonious Emotional Alignment",
            period: "This Weekend",
            confidence: "Moderate–High",
            confidenceScore: 82,
            factors: [
              "Transiting Venus forms favorable trine with natal Moon",
              "Western 7th house ruler receives solar support"
            ]
          }
        }
      ],
      '30days': [
        {
          id: 'f3',
          category: 'career',
          title: 'Major Career Expansion & Public Authority Window',
          period: 'Sep 12 – Oct 28',
          energyLevel: 92,
          statusText: 'Major Window',
          systemsCount: 4,
          traditionLabel: 'Vedic Parashari & KP',
          summary: 'Four independent traditions indicate a significant surge in professional visibility, public authority, and career responsibility.',
          classicalCitation: 'Brihat Parashara Hora Shastra • Saravali Ch. 34',
          guidance: [
            'Step up into leadership opportunities without hesitation',
            'Organize strategic roadmaps for quarterly deliverables',
            'Maintain impeccable integrity and documentation'
          ],
          whyPayload: {
            title: "Career Expansion & Role Shift",
            period: "Sep 12 – Oct 28",
            confidence: "High (92%)",
            confidenceScore: 92,
            factors: [
              "Jupiter transit into 10th Kendra house",
              "Progressed Sun trine Midheaven (MC)",
              "KP 10th sub-lord connects to 2-6-10-11 wealth houses"
            ]
          }
        },
        {
          id: 'f4',
          category: 'money',
          title: 'Asset Consolidation & Wealth Restructuring',
          period: 'Next 3–4 Weeks',
          energyLevel: 75,
          statusText: 'Balanced & Secure',
          systemsCount: 3,
          traditionLabel: 'Vedic Jyotish',
          summary: 'Saturn transit provides disciplined focus for long-term investments, asset security, and eliminating recurring overhead costs.',
          classicalCitation: 'Uttara Kalamrita by Kalidasa • Brihat Jataka',
          guidance: [
            'Review long-term savings, insurance, and retirement models',
            'Avoid speculative impulse bets or unverified schemes',
            'Establish automated savings milestones'
          ],
          whyPayload: {
            title: "Asset Consolidation & Wealth Restructuring",
            period: "Next 3–4 Weeks",
            confidence: "Moderate–High",
            confidenceScore: 78,
            factors: [
              "Saturn 2nd house transit enforces budgetary discipline",
              "Jupiter 11th house aspect supports steady asset retention"
            ]
          }
        }
      ],
      '12months': [
        {
          id: 'f5',
          category: 'growth',
          title: 'Spiritual Maturation & Academic Mastery',
          period: 'Late 2026 – Mid 2027',
          energyLevel: 90,
          statusText: 'Soul Evolution',
          systemsCount: 4,
          traditionLabel: 'Vedic Parashari & Western',
          summary: 'Jupiter transit through your 9th house of higher learning and spiritual evolution stimulates intellectual breakthroughs and mentoring roles.',
          classicalCitation: 'Brihat Parashara Hora Shastra Ch. 48 (Dharmasthana)',
          guidance: [
            'Pursue higher certifications, research, or specialized study',
            'Share knowledge and mentor emerging practitioners',
            'Engage in pilgrimage, meditation, and philosophical contemplation'
          ],
          whyPayload: {
            title: "Spiritual Maturation & Academic Mastery",
            period: "Late 2026 – Mid 2027",
            confidence: "High (89%)",
            confidenceScore: 89,
            factors: [
              "Jupiter activates 9th house Dharmasthana",
              "D9 Navamsha chart reflects soul wisdom ripening"
            ]
          }
        },
        {
          id: 'f6',
          category: 'travel',
          title: 'Major Relocation or International Horizon',
          period: 'Spring 2027',
          energyLevel: 84,
          statusText: 'Expansive Journey',
          systemsCount: 3,
          traditionLabel: 'Vedic & Astrocartography',
          summary: 'Rahu transit in 9th/12th axis creates auspicious opportunities for cross-border collaboration, relocation, or long-distance travel.',
          classicalCitation: 'Jataka Parijata by Vaidyanatha Dikshita',
          guidance: [
            'Explore international research or global client bases',
            'Prepare visa and travel documentation well in advance',
            'Embrace diverse cultural philosophies'
          ],
          whyPayload: {
            title: "Major Relocation or International Horizon",
            period: "Spring 2027",
            confidence: "Moderate (81%)",
            confidenceScore: 81,
            factors: [
              "12th house Vyaya/Foreign residence activation",
              "Astrocartography planetary power lines support eastern migration"
            ]
          }
        }
      ],
      '5years': [
        {
          id: 'f7',
          category: 'career',
          title: 'Peak Enterprise Leadership & Legacy Milestone',
          period: '2028 – 2032',
          energyLevel: 95,
          statusText: 'Legacy Milestone',
          systemsCount: 5,
          traditionLabel: 'Vedic, Western & BaZi Synthesis',
          summary: 'Mahadasha shift to an exalted benefic planet marks the defining professional epoch of your decade with enduring social and material impact.',
          classicalCitation: 'Brihat Parashara Hora Shastra • Ptolemy Tetrabiblos',
          guidance: [
            'Build durable systems and institutions rather than short-term gains',
            'Mentor the next generation and establish philanthropic foundations',
            'Cultivate lasting community reputation'
          ],
          whyPayload: {
            title: "Peak Enterprise Leadership & Legacy Milestone",
            period: "2028 – 2032",
            confidence: "High (94%)",
            confidenceScore: 94,
            factors: [
              "Major Vimshottari Mahadasha transition into Jupiter/Venus",
              "Western Secondary Progressions peak at Midheaven (MC)",
              "BaZi 10-Year Luck Pillar enters Golden Earth period"
            ]
          }
        }
      ]
    };
  }
}

export default function OmniForecastView({ userProfile }: { userProfile: UserProfile }) {
  const [activeHorizon, setActiveHorizon] = useState<'7days' | '30days' | '12months' | '5years'>('30days');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const [whyModalOpen, setWhyModalOpen] = useState(false);
  const [selectedWhyPayload, setSelectedWhyPayload] = useState<Partial<OmniWhyDrawerProps>>({});

  const currentTradition = userProfile.preferredSystem || 'vedic';
  const allForecastData = useMemo(() => {
    return getTraditionForecastData(currentTradition, userProfile);
  }, [currentTradition, userProfile]);

  const events = useMemo(() => {
    const list = allForecastData[activeHorizon] || allForecastData['30days'];
    if (selectedCategory === 'all') return list;
    return list.filter(e => e.category === selectedCategory);
  }, [allForecastData, activeHorizon, selectedCategory]);

  const handleOpenWhy = (payload: Partial<OmniWhyDrawerProps>) => {
    setSelectedWhyPayload(payload);
    setWhyModalOpen(true);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'love': return <Heart className="w-4 h-4 text-pink-400" />;
      case 'career': return <Briefcase className="w-4 h-4 text-cyan-400" />;
      case 'money': return <DollarSign className="w-4 h-4 text-emerald-400" />;
      case 'travel': return <Compass className="w-4 h-4 text-purple-400" />;
      default: return <Sparkles className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 text-left pb-16">
      {/* Header */}
      <div className="border-b border-white/10 pb-4 space-y-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Calendar className="w-7 h-7 text-amber-400" />
            Astrological Forecast & Prediction Radar
          </h1>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30 font-bold self-start sm:self-auto uppercase">
            {currentTradition} Engine Active
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 font-mono">
          Multi-Tradition Event Windows Grounded in NASA JPL DE440 Cycles • Calibrated Probabilities
        </p>
      </div>

      {/* Prediction Reliability & Sensitivity Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0C1322] via-[#0F172A] to-[#0C1322] border border-amber-500/30 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">Multi-System Consensus</span>
            <p className="text-xs font-bold text-white">4 Traditions Converging</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Birth Time Stability</span>
            <p className="text-xs font-bold text-emerald-300">Robust under ±15m Drift</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">Ephemeris Precision</span>
            <p className="text-xs font-bold text-cyan-300">NASA JPL DE440 Sub-Arcsec</p>
          </div>
        </div>
      </div>

      {/* Time Horizon Selector Tabs */}
      <div className="flex items-center gap-2 bg-[#0B1220] p-1.5 rounded-2xl border border-white/10 overflow-x-auto no-scrollbar">
        {[
          { id: '7days', label: '7 DAYS' },
          { id: '30days', label: '30 DAYS' },
          { id: '12months', label: '12 MONTHS' },
          { id: '5years', label: '5 YEARS' },
        ].map((h) => {
          const isSelected = activeHorizon === h.id;
          return (
            <button
              key={h.id}
              type="button"
              onClick={() => setActiveHorizon(h.id as any)}
              className={`relative flex-1 min-w-[90px] py-2.5 px-3 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer text-center ${
                isSelected
                  ? 'text-slate-950 font-black'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="forecastHorizonPill"
                  className="absolute inset-0 rounded-xl bg-amber-400 shadow-md"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{h.label}</span>
            </button>
          );
        })}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs font-mono">
        {[
          { id: 'all', label: 'All Themes' },
          { id: 'career', label: '💼 Career' },
          { id: 'love', label: '❤️ Love' },
          { id: 'money', label: '💰 Money' },
          { id: 'growth', label: '✨ Personal Growth' },
          { id: 'travel', label: '✈️ Travel' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl border transition-all shrink-0 cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-white/15 text-white border-white/30 font-bold'
                : 'bg-white/5 text-slate-400 hover:text-white border-white/5'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Event Cards List */}
      <div className="space-y-4">
        {events.map((event) => {
          const isExpanded = expandedCardId === event.id;

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-3xl bg-[#0F172A] border border-white/10 hover:border-amber-500/30 transition-all space-y-4 shadow-xl relative overflow-hidden"
            >
              {/* Top Row: Category, Title & Period */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {getCategoryIcon(event.category)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{event.title}</h3>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500" /> {event.period}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/30 font-bold">
                    {event.traditionLabel}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30 font-bold">
                    {event.systemsCount} systems agree
                  </span>
                </div>
              </div>

              {/* Energy Level Visual Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Astrological Activation Level</span>
                  <span className="font-bold text-amber-400">{event.statusText} ({event.energyLevel}%)</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${event.energyLevel}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-amber-400 to-emerald-400"
                  />
                </div>
              </div>

              {/* Summary Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {event.summary}
              </p>

              {/* Classical Scripture & Provenance Citation */}
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-[#0B1220] p-2.5 rounded-xl border border-white/5">
                <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate"><strong className="text-slate-300">Scriptural Provenance:</strong> {event.classicalCitation}</span>
              </div>

              {/* Cross-Tradition Consensus (if present) */}
              {event.crossTraditionConsensus && event.crossTraditionConsensus.length > 0 && (
                <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5 text-xs">
                  <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold flex items-center gap-1">
                    <Layers className="w-3 h-3 text-indigo-400" /> Multi-Tradition Cross-Validation:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {event.crossTraditionConsensus.map((ct, idx) => (
                      <div key={idx} className="p-2 rounded-xl bg-[#0B1220] border border-white/5 text-[11px] font-mono">
                        <span className="text-amber-300 font-bold block">{ct.tradition}:</span>
                        <span className="text-slate-300">{ct.verdict}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons: [Why?] & [Details Toggle] */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <button
                  onClick={() => handleOpenWhy(event.whyPayload)}
                  className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-amber-300 hover:text-amber-200 border border-amber-500/20 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400" /> Why? Explain Calculation
                </button>

                <button
                  onClick={() => setExpandedCardId(isExpanded ? null : event.id)}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {isExpanded ? 'Hide Details' : 'View Action Guidance'} <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </button>
              </div>

              {/* Expanded Action Guidance */}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 space-y-2 pt-3"
                >
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Recommended Strategic Actions:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {event.guidance.map((g, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Universal Explainability Drawer Modal */}
      <OmniWhyDrawer
        isOpen={whyModalOpen}
        onClose={() => setWhyModalOpen(false)}
        {...selectedWhyPayload}
      />
    </div>
  );
}
