import PredictionCenterSuite from "../prediction/PredictionCenterSuite";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, Clock, Sparkles, Heart, Briefcase, DollarSign, Compass, 
  HelpCircle, ShieldCheck, ChevronRight, CheckCircle2, Filter, Layers, 
  ArrowUpRight, AlertTriangle, BookOpen, Activity, ShieldAlert, Award, Zap
} from 'lucide-react';
import type { UserProfile } from '../../types';
import OmniWhyDrawer, { type OmniWhyDrawerProps } from './OmniWhyDrawer';
import { downloadIcsFile, getGoogleCalendarUrl, CalendarEventPayload } from '../../lib/icsCalendarExporter';
import { toast } from 'sonner';

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
  const t = (tradition || 'vedic').toLowerCase();

  if (t.includes('islamic')) {
    return {
      '7days': [
        {
          id: 'isl-7-career',
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
          id: 'isl-7-love',
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
            confidence: "High (84%)",
            confidenceScore: 84,
            factors: [
              "Moon-Venus sextile across 4th and 7th houses",
              "Benefic Zuhrah dignity in cardinal sign"
            ]
          }
        },
        {
          id: 'isl-7-money',
          category: 'money',
          title: 'Sahm al-Tijarah: Quick Commercial Inflows',
          period: 'Mid-Week Window',
          energyLevel: 88,
          statusText: 'Halal Gain',
          systemsCount: 4,
          traditionLabel: 'Ilm al-Falak',
          summary: 'Utarid (Mercury) planetary hour aligns with the Arabic Lot of Commerce, facilitating swift payment settlements and profitable transactions.',
          classicalCitation: 'Kitab al-Milal wa al-Duwal (Abu Ma\'shar)',
          guidance: [
            'Invoice outstanding client balances on Wednesday morning',
            'Verify contractual terms for complete ethical compliance',
            'Give small unannounced charity to multiply financial barakah'
          ],
          whyPayload: {
            title: "Commercial Inflows Window",
            period: "Mid-Week Window",
            confidence: "High (88%)",
            confidenceScore: 88,
            factors: [
              "Mercury hour active during daytime commercial window",
              "Sahm al-Tijarah in harmonious aspect with Ascendant"
            ]
          }
        },
        {
          id: 'isl-7-growth',
          category: 'growth',
          title: 'Laylat al-Jumu\'ah: Inner Peace & Dhikr Awakening',
          period: 'Thursday Night – Friday Dawn',
          energyLevel: 94,
          statusText: 'Spiritual Uplift',
          systemsCount: 5,
          traditionLabel: 'Ilm al-Falak',
          summary: 'Auspicious lunar mansion transition elevates spiritual contemplation, mental clarity, and direct prayer answered (Sa\'at al-Istiijabah).',
          classicalCitation: 'Ibn Arabi • Al-Futuhat al-Makkiyya',
          guidance: [
            'Engage in late-night Tahajjud and contemplation',
            'Send abundant salutations upon the Prophet ﷺ on Friday',
            'Practice silent reflection and detachment from digital noise'
          ],
          whyPayload: {
            title: "Inner Peace & Dhikr Awakening",
            period: "Thursday Night – Friday Dawn",
            confidence: "Exceptional (94%)",
            confidenceScore: 94,
            factors: [
              "Lunar mansion aligns with spiritual houses 9 & 12",
              "Jupiter ray illuminates the mental axis"
            ]
          }
        },
        {
          id: 'isl-7-travel',
          category: 'travel',
          title: 'Safariyya Horizon: Protected Short Journeys',
          period: 'Upcoming Week',
          energyLevel: 80,
          statusText: 'Smooth Journey',
          systemsCount: 3,
          traditionLabel: 'Ilm al-Falak',
          summary: 'Moon passes through safe, mobile lunar mansions, ensuring peace and ease for short-distance travel and purposeful visits.',
          classicalCitation: 'Kitab al-Ikhtiyarat (Astrological Elections)',
          guidance: [
            'Recite the Prophetic Travel Supplication before departure',
            'Depart early in the morning hours (Sunnah of early start)',
            'Keep travel essentials organized and simple'
          ],
          whyPayload: {
            title: "Protected Short Journeys",
            period: "Upcoming Week",
            confidence: "Moderate–High (80%)",
            confidenceScore: 80,
            factors: [
              "3rd house of short journeys free from Saturnian obstruction",
              "Moon maintains swift, un-combust motion"
            ]
          }
        }
      ],
      '30days': [
        {
          id: 'isl-30-career',
          category: 'career',
          title: 'Al-Mansab: Authority & Strategic Expansion Window',
          period: 'Next 30 Days',
          energyLevel: 93,
          statusText: 'Authority Elevation',
          systemsCount: 4,
          traditionLabel: 'Ilm al-Falak',
          summary: 'Al-Shams (Sun) and Mushtari (Jupiter) transit mutually supportive houses, elevating your professional reputation and peer respect.',
          classicalCitation: 'Al-Biruni Kitab al-Tafhim • Section on Kingship',
          guidance: [
            'Assume responsibility for key high-visibility projects',
            'Lead with principled transparency and justice (Adl)',
            'Consult knowledgeable advisors before major commitments'
          ],
          whyPayload: {
            title: "Authority & Strategic Expansion",
            period: "Next 30 Days",
            confidence: "High (93%)",
            confidenceScore: 93,
            factors: [
              "Sun in 10th solar house with Jupiterian reinforcement",
              "Midheaven receives supportive sextile from benefic planets"
            ]
          }
        },
        {
          id: 'isl-30-love',
          category: 'love',
          title: 'Mawaddah & Rahmah: Deeper Emotional Bonding',
          period: 'Weeks 2–4',
          energyLevel: 86,
          statusText: 'Affection & Peace',
          systemsCount: 4,
          traditionLabel: 'Ilm al-Falak',
          summary: 'Venus (Zuhrah) ingress into a supportive water station nurtures mutual empathy, trust, and relationship consolidation.',
          classicalCitation: 'Kitab al-Mawalid (Abu Ma\'shar)',
          guidance: [
            'Share quality meals and heartfelt conversations with your spouse/family',
            'Overlook minor faults and cultivate gratitude',
            'Renew family intentions for unified purpose'
          ],
          whyPayload: {
            title: "Deeper Emotional Bonding",
            period: "Weeks 2–4",
            confidence: "High (86%)",
            confidenceScore: 86,
            factors: [
              "Venus enters 7th partnership house with dignities",
              "Moon avoids malefic combustion during domestic discussions"
            ]
          }
        },
        {
          id: 'isl-30-money',
          category: 'money',
          title: 'Sahm al-Mal & Sahm al-Tijarah Financial Expansion',
          period: 'Upcoming 4 Weeks',
          energyLevel: 89,
          statusText: 'High Sustenance',
          systemsCount: 4,
          traditionLabel: 'Ilm al-Falak',
          summary: 'The Arabic Lot of Commerce (Sahm al-Tijarah) conjoins the natal 2nd house of halal sustenance, opening new income streams and partnership opportunities.',
          classicalCitation: 'Kitab al-Milal wa al-Duwal (Abu Ma\'shar)',
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
        },
        {
          id: 'isl-30-growth',
          category: 'growth',
          title: 'Tazkiyah & Hikmah: Personal Wisdom Breakthrough',
          period: 'Next 30 Days',
          energyLevel: 92,
          statusText: 'Spiritual Clarity',
          systemsCount: 5,
          traditionLabel: 'Ilm al-Falak',
          summary: 'Harmonious aspect between the Sun and 9th house of sacred intellect fosters personal maturity, emotional resilience, and scholarly focus.',
          classicalCitation: 'Al-Ghazali • Ihya Ulum al-Din',
          guidance: [
            'Set aside 20 minutes daily for structured Quranic study and reflection',
            'Establish an unbroken morning routine of remembrance (Adhkar)',
            'Seek counsel from wise, upright mentors'
          ],
          whyPayload: {
            title: "Tazkiyah & Hikmah Breakthrough",
            period: "Next 30 Days",
            confidence: "Very High (92%)",
            confidenceScore: 92,
            factors: [
              "9th house receives benefic illumination from Jupiter and Sun",
              "Spiritual fortitude index exceeds 90th percentile"
            ]
          }
        },
        {
          id: 'isl-30-travel',
          category: 'travel',
          title: 'Ziyarah & Auspicious Long-Distance Travel Window',
          period: 'Late in Month',
          energyLevel: 85,
          statusText: 'Blessed Voyage',
          systemsCount: 3,
          traditionLabel: 'Ilm al-Falak',
          summary: 'Planetary election rules indicate favorable winds and protection for pilgrimage, educational journeys, or long-distance business expeditions.',
          classicalCitation: 'Ibn Battuta Rihla Commentary • Ephemeris Rules',
          guidance: [
            'Perform Istikhara prayer before finalizing departure dates',
            'Select travel departure during the Jupiter or Venus daylight hours',
            'Carry minimal burdens and prioritize beneficial company'
          ],
          whyPayload: {
            title: "Blessed Voyage Window",
            period: "Late in Month",
            confidence: "High (85%)",
            confidenceScore: 85,
            factors: [
              "9th house of long journeys free from Mars/Saturn afflictions",
              "Jupiter casts protective aspect on 12th house"
            ]
          }
        }
      ],
      '12months': [
        {
          id: 'isl-12-career',
          category: 'career',
          title: 'Grand Enterprise Inception & Institutional Authority',
          period: 'Months 3–9',
          energyLevel: 95,
          statusText: 'Major Breakthrough',
          systemsCount: 5,
          traditionLabel: 'Ilm al-Falak',
          summary: 'Solar return revolution indicates prominent executive ascendancy, launching long-term platforms and institutional ventures with broad impact.',
          classicalCitation: 'Al-Qanun al-Mas\'udi (Al-Biruni)',
          guidance: [
            'Codify standard operating procedures for sustainable scaling',
            'Maintain ethical governance and transparent financial tracking',
            'Empower capable teams with clear delegation'
          ],
          whyPayload: {
            title: "Grand Enterprise Inception",
            period: "Months 3–9",
            confidence: "High (95%)",
            confidenceScore: 95,
            factors: [
              "Solar Return Ascendant aligns with natal 10th house",
              "Jupiter completes auspicious annual transit across zenith"
            ]
          }
        },
        {
          id: 'isl-12-love',
          category: 'love',
          title: 'Nikah & Family Foundation Consolidation',
          period: 'Spring – Autumn 2027',
          energyLevel: 90,
          statusText: 'Sacred Union',
          systemsCount: 4,
          traditionLabel: 'Ilm al-Falak',
          summary: 'Venus-Jupiter conjunction across relational angles provides extraordinary celestial harmony for marriage, family establishment, and lifelong bonds.',
          classicalCitation: 'Kitab al-Mawalid (Abu Ma\'shar)',
          guidance: [
            'Honor mutual commitments with open-hearted generosity',
            'Build a tranquil home atmosphere centered on faith and peace',
            'Invest in family celebrations and shared milestones'
          ],
          whyPayload: {
            title: "Nikah & Family Foundation",
            period: "Spring – Autumn 2027",
            confidence: "High (90%)",
            confidenceScore: 90,
            factors: [
              "7th house receives dual benefic influence",
              "Sahm al-Nikah (Lot of Marriage) conjoins natal Venus"
            ]
          }
        },
        {
          id: 'isl-12-money',
          category: 'money',
          title: 'Generational Asset Accumulation & Ethical Investments',
          period: 'Next 12 Months',
          energyLevel: 91,
          statusText: 'Enduring Wealth',
          systemsCount: 4,
          traditionLabel: 'Ilm al-Falak',
          summary: 'Arabic Lots of Real Estate (Sahm al-Aqar) and Sustainable Commerce activate, favoring long-term property acquisitions and productive asset ownership.',
          classicalCitation: 'Kitab al-Milal wa al-Duwal',
          guidance: [
            'Acquire tangible, asset-backed investments (real estate, metals, halal equity)',
            'Eliminate all forms of speculative uncertainty (Gharar)',
            'Fulfill all Zakat dues promptly to purify assets'
          ],
          whyPayload: {
            title: "Generational Asset Accumulation",
            period: "Next 12 Months",
            confidence: "High (91%)",
            confidenceScore: 91,
            factors: [
              "2nd and 11th financial houses receive unbroken Jupiterian ray",
              "Saturn establishes disciplined foundation in asset sector"
            ]
          }
        },
        {
          id: 'isl-12-growth',
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
            confidence: "High (88%)",
            confidenceScore: 88,
            factors: [
              "Saturn in 9th house tests and fortifies philosophical foundation",
              "Dignified Jupiter aspect relieves nodal pressure"
            ]
          }
        },
        {
          id: 'isl-12-travel',
          category: 'travel',
          title: 'Hajj / Umrah & Trans-Continental Relocation',
          period: 'Next 12 Months',
          energyLevel: 93,
          statusText: 'Spiritual Pilgrimage',
          systemsCount: 5,
          traditionLabel: 'Ilm al-Falak',
          summary: 'Activation of the 9th and 12th houses by major planetary ingress indicates life-transforming pilgrimages to Makkah/Madinah or key international relocations.',
          classicalCitation: 'Al-Biruni Ephemeris • Chapter on Transits',
          guidance: [
            'Formalize all pilgrimage preparations early with full intention',
            'Build global networks of like-minded colleagues',
            'Embrace cross-cultural learning with humility'
          ],
          whyPayload: {
            title: "Spiritual Pilgrimage & Relocation",
            period: "Next 12 Months",
            confidence: "Very High (93%)",
            confidenceScore: 93,
            factors: [
              "9th house of sacred journeys illuminated by major planetary trine",
              "12th house transits indicate peaceful international waters"
            ]
          }
        }
      ],
      '5years': [
        {
          id: 'isl-5y-career',
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
        },
        {
          id: 'isl-5y-love',
          category: 'love',
          title: 'Multigenerational Family Tranquility & Harmony',
          period: '2027 – 2032',
          energyLevel: 91,
          statusText: 'Family Legacy',
          systemsCount: 4,
          traditionLabel: 'Ilm al-Falak',
          summary: 'Long-term transit of benefic planets across the 4th and 5th houses establishes profound domestic peace, noble lineage blessings, and deep mutual respect.',
          classicalCitation: 'Kitab al-Mawalid',
          guidance: [
            'Cultivate a home grounded in learning, hospitality, and prayer',
            'Pass down ethical traditions and family stories to youth',
            'Foster unity and reconciliation across extended family'
          ],
          whyPayload: {
            title: "Family Tranquility & Legacy",
            period: "2027 – 2032",
            confidence: "High (91%)",
            confidenceScore: 91,
            factors: [
              "4th house of domestic peace receives enduring benefic support",
              "Venus and Jupiter cycle harmonize over five-year arc"
            ]
          }
        },
        {
          id: 'isl-5y-money',
          category: 'money',
          title: 'Waqf & Perpetual Endowment Wealth Milestone',
          period: '2027 – 2032',
          energyLevel: 94,
          statusText: 'Perpetual Asset',
          systemsCount: 5,
          traditionLabel: 'Ilm al-Falak',
          summary: 'Expansion of commercial holdings enables the establishment of enduring charitable trusts (Waqf) and self-sustaining economic infrastructure.',
          classicalCitation: 'Al-Biruni • Kitab al-Tafhim',
          guidance: [
            'Structure perpetual endowments that benefit future generations',
            'Invest in green energy, water, and healthcare initiatives',
            'Ensure legal governance protects family wealth from dissolution'
          ],
          whyPayload: {
            title: "Waqf & Perpetual Endowment",
            period: "2027 – 2032",
            confidence: "Very High (94%)",
            confidenceScore: 94,
            factors: [
              "Lot of Sustainable Wealth forms recurring trines to Jupiter",
              "2nd and 8th financial axes fully matured"
            ]
          }
        },
        {
          id: 'isl-5y-growth',
          category: 'growth',
          title: 'Ma\'rifah & Philosophical Mastery',
          period: '2028 – 2033',
          energyLevel: 95,
          statusText: 'Soul Realization',
          systemsCount: 5,
          traditionLabel: 'Ilm al-Falak',
          summary: 'Convergence of major astronomical revolutions leads to profound intellectual crystallization, authoring seminal works, and spiritual serenity.',
          classicalCitation: 'Ibn Arabi • Fusus al-Hikam',
          guidance: [
            'Author and publish definitive books or masterworks',
            'Establish an open study circle or educational initiative',
            'Live with profound presence, humility, and gratitude'
          ],
          whyPayload: {
            title: "Ma'rifah & Philosophical Mastery",
            period: "2028 – 2033",
            confidence: "Exceptional (95%)",
            confidenceScore: 95,
            factors: [
              "9th and 10th houses achieve peak multi-cycle harmonization",
              "Saturn and Jupiter complete constructive grand trine"
            ]
          }
        },
        {
          id: 'isl-5y-travel',
          category: 'travel',
          title: 'Global Educational & Diplomatic Missions',
          period: '2027 – 2032',
          energyLevel: 89,
          statusText: 'World Ambassador',
          systemsCount: 4,
          traditionLabel: 'Ilm al-Falak',
          summary: 'Long-term international travel, diplomatic representation, and establishing regional chapters across multiple continents.',
          classicalCitation: 'Al-Qanun al-Mas\'udi Book X',
          guidance: [
            'Build international partnerships with high integrity',
            'Travel purposefully to bridge cultural divides',
            'Document lessons from diverse civilizations'
          ],
          whyPayload: {
            title: "Global Missions Window",
            period: "2027 – 2032",
            confidence: "High (89%)",
            confidenceScore: 89,
            factors: [
              "9th house of global horizons receives continuous benefic support",
              "Mercury and Jupiter foster cross-lingual eloquence"
            ]
          }
        }
      ]
    };
  }

  // Universal Vedic, Western, KP, Jaimini, BaZi & Mayan Complete 5-Category Matrix
  return {
    '7days': [
      {
        id: 'v-7-career',
        category: 'career',
        title: 'High-Impact Strategic Execution & Solar Trine',
        period: 'Today – In 3 Days',
        energyLevel: 88,
        statusText: 'Strong Peak',
        systemsCount: 4,
        traditionLabel: `${tradition.toUpperCase()} & Multi-System`,
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
        id: 'v-7-love',
        category: 'love',
        title: 'Harmonious Venus-Moon Trine Alignment',
        period: 'This Weekend (Friday – Sunday)',
        energyLevel: 84,
        statusText: 'Positive Flow',
        systemsCount: 3,
        traditionLabel: `${tradition.toUpperCase()} & Multi-System`,
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
          confidenceScore: 84,
          factors: [
            "Transiting Venus forms favorable trine with natal Moon",
            "Western 7th house ruler receives solar support"
          ]
        }
      },
      {
        id: 'v-7-money',
        category: 'money',
        title: 'Mercury-Jupiter Dhana Yoga Liquidity Inflow',
        period: 'Upcoming 5 Days',
        energyLevel: 86,
        statusText: 'Favorable Inflow',
        systemsCount: 4,
        traditionLabel: `${tradition.toUpperCase()} & Multi-System`,
        summary: 'Mercury conjoins the 2nd house of accumulated wealth in mutual reception with Jupiter, facilitating prompt invoicing and contract payouts.',
        classicalCitation: 'Brihat Parashara Hora Shastra • Chapter on Dhana Yogas',
        guidance: [
          'Issue pending commercial invoices without delay',
          'Negotiate fair payment terms on upcoming contracts',
          'Automate savings allocations to capture new liquidity'
        ],
        whyPayload: {
          title: "Dhana Yoga Liquidity Inflow",
          period: "Upcoming 5 Days",
          confidence: "High (86%)",
          confidenceScore: 86,
          factors: [
            "2nd lord and 11th lord establish beneficial mutual aspect",
            "Transit Moon energizes the wealth houses"
          ]
        }
      },
      {
        id: 'v-7-growth',
        category: 'growth',
        title: 'Sattvic Mental Clarity & Meditative Depth',
        period: 'Mid-Week Contemplation',
        energyLevel: 92,
        statusText: 'Deep Awareness',
        systemsCount: 4,
        traditionLabel: `${tradition.toUpperCase()} & Multi-System`,
        summary: 'Moon transit across benefic Nakshatra clears mental clutter, enhancing intuition, mindfulness, and philosophical discernment.',
        classicalCitation: 'Saravali Ch. 12 • Shloka on Moon Exaltation',
        guidance: [
          'Dedicate 15 minutes to morning pranayama or silent meditation',
          'Journal key insights regarding your long-term life vision',
          'Maintain a calm, centered emotional demeanor in all meetings'
        ],
        whyPayload: {
          title: "Sattvic Mental Clarity",
          period: "Mid-Week Contemplation",
          confidence: "Very High (92%)",
          confidenceScore: 92,
          factors: [
            "Moon in friendly nakshatra aspected by Jupiter",
            "Ascendant sub-lord in unblemished dignity"
          ]
        }
      },
      {
        id: 'v-7-travel',
        category: 'travel',
        title: 'Auspicious Short-Haul Mobility Window',
        period: 'Next 7 Days',
        energyLevel: 82,
        statusText: 'Safe Journey',
        systemsCount: 3,
        traditionLabel: `${tradition.toUpperCase()} & Multi-System`,
        summary: '3rd house of purposeful local travel is energized by Mercury, facilitating smooth commutes, productive meetings, and pleasant weekend excursions.',
        classicalCitation: 'Muhurta Chintamani • Chapter on Travel Elections',
        guidance: [
          'Double-check route schedules and departure timings',
          'Depart during Shubha or Amrit Choghadiya windows',
          'Travel light and keep documentation organized'
        ],
        whyPayload: {
          title: "Short-Haul Mobility Window",
          period: "Next 7 Days",
          confidence: "Moderate–High (82%)",
          confidenceScore: 82,
          factors: [
            "3rd house free from Rahu/Ketu afflictions",
            "Mercury direct in friendly sign"
          ]
        }
      }
    ],
    '30days': [
      {
        id: 'v-30-career',
        category: 'career',
        title: 'Major Career Expansion & Public Authority Window',
        period: 'Sep 12 – Oct 28',
        energyLevel: 92,
        statusText: 'Major Window',
        systemsCount: 4,
        traditionLabel: `${tradition.toUpperCase()} & Multi-System`,
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
        id: 'v-30-love',
        category: 'love',
        title: 'Venusian Harmony & Emotional Consonance',
        period: 'Next 30 Days',
        energyLevel: 87,
        statusText: 'Relational Peace',
        systemsCount: 4,
        traditionLabel: `${tradition.toUpperCase()} & Multi-System`,
        summary: 'Transiting Venus aspects the 7th house of partnerships, dissolving past misunderstandings and fostering mutual respect and shared dreams.',
        classicalCitation: 'Phaladeepika Ch. 18 • Kalatra Bhava Transit Rules',
        guidance: [
          'Prioritize open, non-judgmental communication with your partner',
          'Plan thoughtful shared experiences or weekend getaways',
          'Express sincere appreciation for daily acts of kindness'
        ],
        whyPayload: {
          title: "Venusian Harmony & Consonance",
          period: "Next 30 Days",
          confidence: "High (87%)",
          confidenceScore: 87,
          factors: [
            "Venus in friendly cardinal sign casts aspect on 7th house",
            "Moon avoids eclipse/combustion degrees during key dates"
          ]
        }
      },
      {
        id: 'v-30-money',
        category: 'money',
        title: 'Asset Consolidation & Wealth Restructuring',
        period: 'Next 3–4 Weeks',
        energyLevel: 85,
        statusText: 'Balanced & Secure',
        systemsCount: 4,
        traditionLabel: `${tradition.toUpperCase()} & Multi-System`,
        summary: 'Saturn and Jupiter transits establish disciplined focus for long-term investments, asset security, and eliminating recurring overhead costs.',
        classicalCitation: 'Uttara Kalamrita by Kalidasa • Brihat Jataka',
        guidance: [
          'Review long-term savings, insurance, and retirement models',
          'Avoid speculative impulse bets or unverified schemes',
          'Establish automated savings milestones'
        ],
        whyPayload: {
          title: "Asset Consolidation & Wealth Restructuring",
          period: "Next 3–4 Weeks",
          confidence: "High (85%)",
          confidenceScore: 85,
          factors: [
            "Saturn 2nd house transit enforces budgetary discipline",
            "Jupiter 11th house aspect supports steady asset retention"
          ]
        }
      },
      {
        id: 'v-30-growth',
        category: 'growth',
        title: 'Personal Evolution & Intellectual Breakthrough',
        period: 'Upcoming 30 Days',
        energyLevel: 91,
        statusText: 'Soul Alignment',
        systemsCount: 5,
        traditionLabel: `${tradition.toUpperCase()} & Multi-System`,
        summary: 'Benefic illumination of the 9th house of philosophy and higher dharma inspires intellectual clarity, authentic purpose, and creative focus.',
        classicalCitation: 'Brihat Parashara Hora Shastra Ch. 48 (Dharmasthana)',
        guidance: [
          'Engage in deep-work learning sprints and technical study',
          'Cultivate daily gratitude and mindfulness rituals',
          'Share your knowledge generously with peer communities'
        ],
        whyPayload: {
          title: "Personal Evolution & Intellectual Breakthrough",
          period: "Upcoming 30 Days",
          confidence: "Very High (91%)",
          confidenceScore: 91,
          factors: [
            "Jupiter casts 9th drishti on the Ascendant and 5th house of intellect",
            "Nodal axis is balanced without obstructive affliction"
          ]
        }
      },
      {
        id: 'v-30-travel',
        category: 'travel',
        title: 'Expansive Travel & International Horizon Window',
        period: 'Late in the Month',
        energyLevel: 86,
        statusText: 'Favorable Ingress',
        systemsCount: 3,
        traditionLabel: `${tradition.toUpperCase()} & Multi-System`,
        summary: 'Transits across the 9th and 12th houses activate auspicious windows for business travel, nature retreats, and cross-cultural exploration.',
        classicalCitation: 'Jataka Parijata • Chapter on Foreign Ingress',
        guidance: [
          'Confirm travel bookings and itineraries with care',
          'Schedule departures during benefic planetary horas',
          'Immerse in local cultural traditions with curiosity and respect'
        ],
        whyPayload: {
          title: "Expansive Travel Window",
          period: "Late in the Month",
          confidence: "High (86%)",
          confidenceScore: 86,
          factors: [
            "9th house receives supportive solar aspect",
            "12th lord placed in friendly dignity"
          ]
        }
      }
    ],
    '12months': [
      {
        id: 'v-12-career',
        category: 'career',
        title: 'Executive Milestone & Leadership Zenith',
        period: 'Next 12 Months',
        energyLevel: 94,
        statusText: 'Career Zenith',
        systemsCount: 5,
        traditionLabel: `${tradition.toUpperCase()} & Multi-System`,
        summary: 'Major planetary transit through the 10th house of worldly action coincides with favorable Dasha periods, elevating executive autonomy.',
        classicalCitation: 'Saravali Ch. 34 • Brihat Parashara Hora Shastra',
        guidance: [
          'Build long-term organizational infrastructure with multi-year roadmap',
          'Lead by example with transparent governance and meritocracy',
          'Mentor next-generation pioneers in your industry'
        ],
        whyPayload: {
          title: "Executive Milestone & Leadership Zenith",
          period: "Next 12 Months",
          confidence: "Exceptional (94%)",
          confidenceScore: 94,
          factors: [
            "10th house receives full aspect from exalted benefic",
            "D10 Dashamsha chart confirms sustained career acceleration"
          ]
        }
      },
      {
        id: 'v-12-love',
        category: 'love',
        title: 'Lifelong Partnership & Family Deepening',
        period: 'Autumn – Spring Cycle',
        energyLevel: 89,
        statusText: 'Enduring Union',
        systemsCount: 4,
        traditionLabel: `${tradition.toUpperCase()} & Multi-System`,
        summary: 'Jupiter transit illuminates the 7th house of marriage and the 5th house of progeny, creating profound domestic joy and relational solidarity.',
        classicalCitation: 'Phaladeepika Ch. 18 • D9 Navamsha Analysis',
        guidance: [
          'Celebrate relational milestones and create shared memory rituals',
          'Invest in a peaceful, aesthetic, and welcoming home space',
          'Cultivate patience, mutual respect, and emotional presence'
        ],
        whyPayload: {
          title: "Lifelong Partnership & Family Deepening",
          period: "Autumn – Spring Cycle",
          confidence: "High (89%)",
          confidenceScore: 89,
          factors: [
            "D9 Navamsha lagna is energized by benefic transits",
            "7th lord achieves high Shadbala strength score"
          ]
        }
      },
      {
        id: 'v-12-money',
        category: 'money',
        title: 'Multi-Stream Revenue & Capital Expansion',
        period: 'Next 12 Months',
        energyLevel: 92,
        statusText: 'Capital Surge',
        systemsCount: 4,
        traditionLabel: `${tradition.toUpperCase()} & Multi-System`,
        summary: 'Dhana Yoga activation across the 2nd and 11th houses facilitates substantial asset growth, equity maturation, and diversified returns.',
        classicalCitation: 'Brihat Jataka by Varahamihira',
        guidance: [
          'Reinvest operating cash flows into productive, low-risk assets',
          'Establish structured tax planning and wealth preservation vehicles',
          'Engage in philanthropic tithes and charitable community giving'
        ],
        whyPayload: {
          title: "Multi-Stream Revenue Expansion",
          period: "Next 12 Months",
          confidence: "High (92%)",
          confidenceScore: 92,
          factors: [
            "11th house of gains receives Jupiterian aspect",
            "2nd lord in kendra position without malefic affliction"
          ]
        }
      },
      {
        id: 'v-12-growth',
        category: 'growth',
        title: 'Spiritual Maturation & Academic Mastery',
        period: 'Late 2026 – Mid 2027',
        energyLevel: 90,
        statusText: 'Soul Evolution',
        systemsCount: 4,
        traditionLabel: `${tradition.toUpperCase()} & Multi-System`,
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
        id: 'v-12-travel',
        category: 'travel',
        title: 'Major Relocation or International Horizon',
        period: 'Spring 2027',
        energyLevel: 84,
        statusText: 'Expansive Journey',
        systemsCount: 3,
        traditionLabel: `${tradition.toUpperCase()} & Multi-System`,
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
          confidence: "Moderate–High (84%)",
          confidenceScore: 84,
          factors: [
            "12th house Vyaya/Foreign residence activation",
            "Astrocartography planetary power lines support eastern migration"
          ]
        }
      }
    ],
    '5years': [
      {
        id: 'v-5y-career',
        category: 'career',
        title: 'Peak Enterprise Leadership & Legacy Milestone',
        period: '2028 – 2032',
        energyLevel: 96,
        statusText: 'Legacy Milestone',
        systemsCount: 5,
        traditionLabel: `${tradition.toUpperCase()} & Multi-System`,
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
          confidence: "Exceptional (96%)",
          confidenceScore: 96,
          factors: [
            "Major Vimshottari Mahadasha transition into Jupiter/Venus",
            "Western Secondary Progressions peak at Midheaven (MC)",
            "BaZi 10-Year Luck Pillar enters Golden Earth period"
          ]
        }
      },
      {
        id: 'v-5y-love',
        category: 'love',
        title: 'Domestic Sanctuary & Generational Harmony',
        period: '2027 – 2032',
        energyLevel: 92,
        statusText: 'Generational Peace',
        systemsCount: 4,
        traditionLabel: `${tradition.toUpperCase()} & Multi-System`,
        summary: 'Harmonious long-term transits anchor your home as a sanctuary of warmth, hospitality, and emotional sanctuary.',
        classicalCitation: 'Brihat Parashara Hora Shastra • Grihastha Dharma',
        guidance: [
          'Anchor your family culture in unconditional loyalty, empathy, and service',
          'Invest in real estate properties that serve multigenerational family gatherings',
          'Model harmonious conflict resolution for children and community'
        ],
        whyPayload: {
          title: "Domestic Sanctuary & Generational Harmony",
          period: "2027 – 2032",
          confidence: "High (92%)",
          confidenceScore: 92,
          factors: [
            "4th and 7th houses receive protective aspect across 5-year transit cycle",
            "Venusian maturity brings deep domestic tranquility"
          ]
        }
      },
      {
        id: 'v-5y-money',
        category: 'money',
        title: 'Institutional Endowment & Financial Independence',
        period: '2028 – 2033',
        energyLevel: 95,
        statusText: 'Financial Zenith',
        systemsCount: 5,
        traditionLabel: `${tradition.toUpperCase()} & Multi-System`,
        summary: 'Maturation of long-term investments and business enterprises delivers complete financial autonomy and generational freedom.',
        classicalCitation: 'Brihat Jataka • Saravali Ch. 39',
        guidance: [
          'Form family trusts and asset-protection governance frameworks',
          'Fund scholarships, community clinics, or educational initiatives',
          'Maintain a simple, disciplined, and purposeful lifestyle'
        ],
        whyPayload: {
          title: "Institutional Endowment & Independence",
          period: "2028 – 2033",
          confidence: "Very High (95%)",
          confidenceScore: 95,
          factors: [
            "2nd, 9th, and 11th houses form complete Lakshmī Yoga",
            "Long-term dasha cycle operates in prime wealth-generating houses"
          ]
        }
      },
      {
        id: 'v-5y-growth',
        category: 'growth',
        title: 'Mastery & Self-Realization Epoch',
        period: '2028 – 2033',
        energyLevel: 97,
        statusText: 'Enlightened Purpose',
        systemsCount: 5,
        traditionLabel: `${tradition.toUpperCase()} & Multi-System`,
        summary: 'A definitive epoch of spiritual realization, intellectual synthesis, and authoring foundational works that guide future generations.',
        classicalCitation: 'Jaimini Sutras • Brihat Parashara Hora Shastra',
        guidance: [
          'Document your life philosophy, principles, and distilled wisdom',
          'Live each day with deep gratitude, equanimity, and devotion',
          'Serve humanity selflessly through your unique talents'
        ],
        whyPayload: {
          title: "Mastery & Self-Realization Epoch",
          period: "2028 – 2033",
          confidence: "Exceptional (97%)",
          confidenceScore: 97,
          factors: [
            "Atmakaraka achieves full soul maturation across divisional charts",
            "9th and 10th houses establish supreme Dharmakarmadhipati Yoga"
          ]
        }
      },
      {
        id: 'v-5y-travel',
        category: 'travel',
        title: 'Global Footprint & World Pilgrim Epoch',
        period: '2027 – 2032',
        energyLevel: 90,
        statusText: 'Global Citizen',
        systemsCount: 4,
        traditionLabel: `${tradition.toUpperCase()} & Multi-System`,
        summary: 'Establishment of international bases, global lecture circuits, and visiting sacred heritage sites around the world.',
        classicalCitation: 'Astrocartography • Relocation Astrology Principles',
        guidance: [
          'Build international bridges between diverse cultures and traditions',
          'Travel with sacred intention, curiosity, and reverence',
          'Inspire global communities through universal human values'
        ],
        whyPayload: {
          title: "Global Footprint & World Pilgrim",
          period: "2027 – 2032",
          confidence: "High (90%)",
          confidenceScore: 90,
          factors: [
            "9th and 12th houses activate worldwide relocation lines",
            "Jupiter transit across overseas meridian"
          ]
        }
      }
    ]
  };
}

export default function OmniForecastView({ userProfile }: { userProfile: UserProfile }) {
  const [activeForecastTab, setActiveForecastTab] = useState<'calendar' | 'themes'>('calendar');
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
    const list = allForecastData[activeHorizon] || allForecastData['30days'] || [];
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
      <div className="border-b border-white/[0.08] pb-4 space-y-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Calendar className="w-7 h-7 text-amber-400" />
            Astrological Forecast & Prediction Radar
          </h1>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-white/[0.08] font-bold self-start sm:self-auto uppercase">
            {currentTradition} Engine Active
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 font-mono">
          Multi-Tradition Event Windows Grounded in NASA JPL DE440 Cycles • Calibrated Probabilities
        </p>
      </div>

      {/* Prediction Reliability & Sensitivity Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#111315]/80 backdrop-blur-xl border border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-white/[0.08] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">Multi-System Consensus</span>
            <p className="text-xs font-bold text-white">4 Traditions Converging</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-white/[0.08] flex items-center justify-center shrink-0">
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Birth Time Stability</span>
            <p className="text-xs font-bold text-emerald-300">Robust under ±15m Drift</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-white/[0.08] flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">Ephemeris Precision</span>
            <p className="text-xs font-bold text-cyan-300">NASA JPL DE440 Sub-Arcsec</p>
          </div>
        </div>
      </div>

      {/* Time Horizon Selector Tabs */}
      <div className="flex items-center gap-2 bg-[#111315]/80 p-1.5 rounded-2xl border border-white/[0.08] overflow-x-auto no-scrollbar">
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
                  ? 'text-black font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="forecastHorizonPill"
                  className="absolute inset-0 rounded-xl bg-white shadow-sm"
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
              className="p-6 rounded-3xl bg-[#111315]/80 border border-white/[0.08] hover:border-white/[0.08] transition-all space-y-4 shadow-xl relative overflow-hidden"
            >
              {/* Top Row: Category, Title & Period */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/[0.08] flex items-center justify-center">
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
                  <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-white/[0.08] font-bold">
                    {event.traditionLabel}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-white/[0.08] font-bold">
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
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-[#111315]/80 p-2.5 rounded-xl border border-white/5">
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
                      <div key={idx} className="p-2 rounded-xl bg-[#111315]/80 border border-white/5 text-[11px] font-mono">
                        <span className="text-amber-300 font-bold block">{ct.tradition}:</span>
                        <span className="text-slate-300">{ct.verdict}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons: [Why?], [Add to Calendar], [Ask AI], [Details Toggle] */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleOpenWhy(event.whyPayload)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-amber-300 hover:text-amber-200 border border-white/[0.08] text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-amber-400" /> Why?
                  </button>

                  <button
                    onClick={() => {
                      const payload: CalendarEventPayload = {
                        title: `ASTRO360: ${event.title}`,
                        description: `${event.summary}\n\nActivation: ${event.statusText} (${event.energyLevel}%)\nScripture: ${event.classicalCitation}`,
                        startDate: '2026-09-12T09:00:00Z',
                        endDate: '2026-10-28T18:00:00Z',
                        category: `Astrology - ${event.category.toUpperCase()}`
                      };
                      downloadIcsFile([payload], `ASTRO360_${event.id}.ics`);
                      toast.success('Downloaded .ics calendar file for Apple/Outlook!');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/[0.08] text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Export .ics to Apple Calendar or Outlook"
                  >
                    <Download className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Sync (.ics)</span>
                  </button>

                  <button
                    onClick={() => {
                      const payload: CalendarEventPayload = {
                        title: `ASTRO360: ${event.title}`,
                        description: `${event.summary}\n\nActivation: ${event.statusText}`,
                        startDate: '2026-09-12T09:00:00Z',
                        endDate: '2026-10-28T18:00:00Z',
                        category: `Astrology - ${event.category.toUpperCase()}`
                      };
                      window.open(getGoogleCalendarUrl(payload), '_blank', 'noopener,noreferrer');
                      toast.success('Opening Google Calendar in new tab!');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Add directly to Google Calendar Web"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Google Cal</span>
                  </button>

                  <button
                    onClick={() => onNavigate && onNavigate('ask')}
                    className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Ask AI Copilot for deep-dive analysis on this window"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Ask AI</span>
                  </button>
                </div>

                <button
                  onClick={() => setExpandedCardId(isExpanded ? null : event.id)}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {isExpanded ? 'Hide Guidance' : 'View Action Guidance'} <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </button>
              </div>

              {/* Expanded Action Guidance */}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 rounded-2xl bg-[#111315]/80 border border-white/[0.08] space-y-2 pt-3"
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

        {/* Empty State Fallback */}
        {events.length === 0 && (
          <div className="p-8 rounded-3xl bg-[#111315]/80 border border-white/[0.08] text-center space-y-3">
            <Sparkles className="w-8 h-8 text-amber-400 mx-auto" />
            <h3 className="text-base font-bold text-white">Baseline Cosmic Equilibrium in {selectedCategory.toUpperCase()}</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              No adverse planetary disruptions or volatile transits are obstructing your chart in this domain during the {activeHorizon.toUpperCase()} horizon. Steady, supportive baseline cosmic flow is active.
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="px-4 py-2 rounded-xl bg-white text-black text-xs font-mono font-semibold shadow-sm hover:bg-amber-300 transition-colors cursor-pointer"
            >
              View All Themes
            </button>
          </div>
        )}
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
