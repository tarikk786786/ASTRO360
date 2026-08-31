/**
 * ASTRO360 Question Engine
 * Synthesizes high-utility, grammatically sound seeker questions across 4 core educational dimensions.
 */

import { normalizeKeyword } from './keywordNormalizer';
import { classifyAstrologyCluster } from './astrologyClusterEngine';

export interface QuestionBucket {
  category: 'Definitional' | 'Calculation & How-To' | 'Interpretive & Remedial' | 'Timing & Predictive';
  questions: string[];
}

export function generateAstrologyQuestions(keyword: string): QuestionBucket[] {
  const norm = normalizeKeyword(keyword);
  if (!norm) return [];

  const cluster = classifyAstrologyCluster(norm);

  const definitional: string[] = [
    `What is ${norm} and how does it work?`,
    `What does ${norm} mean in my horoscope?`,
    `What is the difference between Vedic and Western ${norm}?`,
    `What are the key characteristics of ${norm}?`
  ];

  const howTo: string[] = [
    `How do I calculate my ${norm} accurately?`,
    `How to read and interpret ${norm} step by step?`,
    `How to find my ${norm} using date and time of birth?`,
    `Can I generate a free ${norm} report online?`
  ];

  const interpretive: string[] = [
    `What happens if my ${norm} is weak or afflicted?`,
    `What are the classical remedies for ${norm}?`,
    `Which gemstones or mantras enhance ${norm}?`,
    `How does ${norm} affect career, marriage, and wealth?`
  ];

  const timing: string[] = [
    `When will the effects of ${norm} peak in my lifetime?`,
    `How long does the ${norm} period or transit last?`,
    `What are the planetary transits influencing ${norm} in 2026/2027?`,
    `How to choose an auspicious muhurta according to ${norm}?`
  ];

  // Specific custom adaptations based on cluster
  if (cluster === 'NAKSHATRA') {
    definitional[0] = `What is ${norm} Nakshatra and its ruling deity?`;
    howTo[0] = `How to find my Janma Nakshatra and Pada from birth details?`;
    interpretive[0] = `What is the compatibility and marriage score for ${norm} Nakshatra?`;
  } else if (cluster === 'DASHA') {
    definitional[0] = `What is ${norm} and how does the 120-year Vimshottari cycle work?`;
    timing[0] = `When does my next Antardasha or Mahadasha start and end?`;
  } else if (cluster === 'COMPATIBILITY') {
    definitional[0] = `What is Ashta Koota 36 Guna Milan in ${norm}?`;
    howTo[0] = `How to calculate marriage compatibility score using birth charts?`;
    interpretive[0] = `What are the remedies for Nadi Dosha and Bhakoot Dosha in matching?`;
  }

  return [
    { category: 'Definitional', questions: definitional },
    { category: 'Calculation & How-To', questions: howTo },
    { category: 'Interpretive & Remedial', questions: interpretive },
    { category: 'Timing & Predictive', questions: timing }
  ];
}

/**
 * Returns a flat list of top 6 clean, high-priority questions for a keyword.
 */
export function getTopQuestionsForKeyword(keyword: string): string[] {
  const buckets = generateAstrologyQuestions(keyword);
  const result: string[] = [];
  
  for (const b of buckets) {
    if (b.questions[0]) result.push(b.questions[0]);
  }
  if (buckets[0]?.questions[1]) result.push(buckets[0].questions[1]);
  if (buckets[1]?.questions[1]) result.push(buckets[1].questions[1]);

  return result.slice(0, 6);
}
