/**
 * ASTRO360 Search Intent Classification Engine
 * Analyzes keyword semantics, syntactic markers, and lexical triggers to determine user intent.
 */

import { PrimaryIntent, SecondaryIntent } from './types';

// Regex / Token Matchers for Primary Intent
const TOOL_TRIGGERS = [
  /\bcalculator\b/i,
  /\bgenerator\b/i,
  /\btool\b/i,
  /\bcalculate\b/i,
  /\bchart maker\b/i,
  /\bkundli maker\b/i,
  /\bmatcher\b/i,
  /\bfinder\b/i,
  /\btracker\b/i,
  /\bconverter\b/i,
  /\bsoftware\b/i,
  /\bapp\b/i,
  /\bscore\b/i,
  /\bmatching score\b/i,
  /\bcheck\b/i,
  /\bgenerate\b/i,
  /\bcreate\b/i,
  /\bfree online\b/i,
  /\bonline\b/i
];

const COMMERCIAL_TRIGGERS = [
  /\bbest\b/i,
  /\btop\b/i,
  /\breview\b/i,
  /\breviews\b/i,
  /\bcomparison\b/i,
  /\bconsultation\b/i,
  /\bconsultant\b/i,
  /\breading service\b/i,
  /\bastrologer\b/i,
  /\bexpert\b/i,
  /\bprofessional\b/i,
  /\bagency\b/i,
  /\bplatform\b/i
];

const TRANSACTIONAL_TRIGGERS = [
  /\bbuy\b/i,
  /\bprice\b/i,
  /\bpricing\b/i,
  /\bcost\b/i,
  /\border\b/i,
  /\bbook now\b/i,
  /\bbooking\b/i,
  /\bdownload report\b/i,
  /\bpdf report\b/i,
  /\bpremium\b/i,
  /\bhire\b/i,
  /\bconsult now\b/i,
  /\bshop\b/i,
  /\bpurchase\b/i,
  /\bdiscount\b/i
];

const NAVIGATIONAL_TRIGGERS = [
  /\bastro360\b/i,
  /\bastrosage\b/i,
  /\bastro-seek\b/i,
  /\bcafeastrology\b/i,
  /\bganeshaspeaks\b/i,
  /\bcostar\b/i,
  /\bastrotheme\b/i,
  /\blogin\b/i,
  /\bsign in\b/i,
  /\bportal\b/i,
  /\bofficial site\b/i,
  /\bwebsite\b/i
];

const LOCAL_TRIGGERS = [
  /\bnear me\b/i,
  /\bnearby\b/i,
  /\bin delhi\b/i,
  /\bin mumbai\b/i,
  /\bin bangalore\b/i,
  /\bin london\b/i,
  /\bin new york\b/i,
  /\bin california\b/i,
  /\bin toronto\b/i,
  /\bin dubai\b/i,
  /\bin sydney\b/i,
  /\bclinic\b/i,
  /\bcenter\b/i,
  /\blocation\b/i
];

// Regex Matchers for Secondary Intent
const QUESTION_PATTERNS = [
  /^(what|how|why|when|who|where|which|can|will|does|is|are|should|do)\b/i,
  /\?$/
];

const HOW_TO_PATTERNS = [
  /\bhow to\b/i,
  /\bhow do i\b/i,
  /\bhow can i\b/i,
  /\bstep by step\b/i,
  /\bguide to\b/i,
  /\bways to\b/i
];

const DEFINITION_PATTERNS = [
  /\bmeaning\b/i,
  /\bdefinition\b/i,
  /\bwhat is\b/i,
  /\bwhat does\b/i,
  /\bmeans\b/i,
  /\bsignificance\b/i,
  /\bexplained\b/i,
  /\bconcept\b/i
];

const COMPARISON_PATTERNS = [
  /\bvs\b/i,
  /\bversus\b/i,
  /\bdifference between\b/i,
  /\bcompare\b/i,
  /\bcompared to\b/i,
  /\bor\b/i,
  /\bcompatibility\b/i
];

/**
 * Classifies the primary and secondary search intents of a keyword string.
 */
export function classifyKeywordIntent(keyword: string): {
  primary: PrimaryIntent;
  secondary: SecondaryIntent;
  confidence: number;
} {
  const norm = keyword.toLowerCase().trim();

  // 1. Check Navigational
  if (NAVIGATIONAL_TRIGGERS.some(r => r.test(norm))) {
    return { primary: 'NAVIGATIONAL', secondary: 'GENERAL', confidence: 0.95 };
  }

  // 2. Check Local
  if (LOCAL_TRIGGERS.some(r => r.test(norm))) {
    return { primary: 'LOCAL', secondary: 'GENERAL', confidence: 0.9 };
  }

  // 3. Check Transactional
  if (TRANSACTIONAL_TRIGGERS.some(r => r.test(norm))) {
    return { primary: 'TRANSACTIONAL', secondary: 'GENERAL', confidence: 0.9 };
  }

  // 4. Check How-To & Question patterns (Informational precedence over bare 'calculate' verb)
  const isExplicitTool = /\b(calculator|generator|tool|maker|software|app|tracker|finder|converter)\b/i.test(norm);
  const isHowTo = HOW_TO_PATTERNS.some(r => r.test(norm));
  const isQuestion = QUESTION_PATTERNS.some(r => r.test(norm));
  const isDefinition = DEFINITION_PATTERNS.some(r => r.test(norm));

  if (!isExplicitTool && (isHowTo || isQuestion || isDefinition)) {
    let secondary: SecondaryIntent = 'GENERAL';
    if (isHowTo) secondary = 'HOW-TO';
    else if (isDefinition) secondary = 'DEFINITION';
    else if (isQuestion) secondary = 'QUESTION';

    return {
      primary: 'INFORMATIONAL',
      secondary,
      confidence: 0.9
    };
  }

  // 5. Check Tool Triggers
  if (TOOL_TRIGGERS.some(r => r.test(norm))) {
    return {
      primary: 'TOOL',
      secondary: isHowTo ? 'HOW-TO' : 'GENERAL',
      confidence: 0.92
    };
  }

  // 5. Check Commercial
  if (COMMERCIAL_TRIGGERS.some(r => r.test(norm))) {
    const isComp = COMPARISON_PATTERNS.some(r => r.test(norm));
    return {
      primary: 'COMMERCIAL',
      secondary: isComp ? 'COMPARISON' : 'GENERAL',
      confidence: 0.85
    };
  }

  // 6. Secondary Intent evaluation for Informational
  let secondary: SecondaryIntent = 'GENERAL';
  if (HOW_TO_PATTERNS.some(r => r.test(norm))) {
    secondary = 'HOW-TO';
  } else if (DEFINITION_PATTERNS.some(r => r.test(norm))) {
    secondary = 'DEFINITION';
  } else if (COMPARISON_PATTERNS.some(r => r.test(norm))) {
    secondary = 'COMPARISON';
  } else if (QUESTION_PATTERNS.some(r => r.test(norm))) {
    secondary = 'QUESTION';
  }

  return {
    primary: 'INFORMATIONAL',
    secondary,
    confidence: 0.88
  };
}
