/**
 * ASTRO360 — Voice & Tone Profile Registry
 * Configures distinct voice profiles, tonal modulations, speed parameters,
 * and ethical speech boundaries across content domains.
 *
 * Guardrails:
 * - Default to CALM GUIDE.
 * - Non-theatrical, non-dramatic, dignified delivery.
 * - Disallow fear-inducing, doom-laden or manipulative tone presets.
 */

export type VoiceProfileId = 
  | 'CALM_GUIDE'
  | 'WARM_GUIDE'
  | 'PROFESSIONAL'
  | 'EDITORIAL'
  | 'MEDITATIVE'
  | 'TECHNICAL'
  | 'CONVERSATIONAL';

export type AudioTone = 
  | 'Calm'
  | 'Warm'
  | 'Clear'
  | 'Encouraging'
  | 'Professional'
  | 'Reflective';

export type ContentDomain = 
  | 'ASTROLOGY'
  | 'MEDITATION'
  | 'MANTRA'
  | 'ISLAMIC'
  | 'EDUCATION';

export interface VoiceProfile {
  id: VoiceProfileId;
  name: string;
  description: string;
  recommendedTones: AudioTone[];
  defaultTone: AudioTone;
  defaultSpeed: number; // e.g. 0.95, 1.0, 1.1
  pitch: number;        // 0.8 - 1.2
  suitableDomains: ContentDomain[];
  isSynthetic: boolean;
  provenance: string;   // e.g. 'Browser Standard WebSpeech / Piper Clean'
}

export const VOICE_PROFILES: Record<VoiceProfileId, VoiceProfile> = {
  CALM_GUIDE: {
    id: 'CALM_GUIDE',
    name: 'Calm Guide (Default)',
    description: 'Serene, centered, reassuring delivery with balanced cadence and steady inflection.',
    recommendedTones: ['Calm', 'Reflective', 'Warm'],
    defaultTone: 'Calm',
    defaultSpeed: 0.95,
    pitch: 1.0,
    suitableDomains: ['ASTROLOGY', 'MEDITATION', 'EDUCATION'],
    isSynthetic: true,
    provenance: 'ASTRO360 Standard Synthesizer (Neutral Guide)',
  },
  WARM_GUIDE: {
    id: 'WARM_GUIDE',
    name: 'Warm Guide',
    description: 'Empathetic, grounded, personal and comforting voice ideal for relationship and life guidance.',
    recommendedTones: ['Warm', 'Encouraging', 'Calm'],
    defaultTone: 'Warm',
    defaultSpeed: 0.98,
    pitch: 1.02,
    suitableDomains: ['ASTROLOGY', 'EDUCATION'],
    isSynthetic: true,
    provenance: 'ASTRO360 Standard Synthesizer (Empathetic Guide)',
  },
  PROFESSIONAL: {
    id: 'PROFESSIONAL',
    name: 'Professional',
    description: 'Articulate, clear, objective presentation tailored for executive reports and commercial timings.',
    recommendedTones: ['Professional', 'Clear'],
    defaultTone: 'Professional',
    defaultSpeed: 1.02,
    pitch: 0.98,
    suitableDomains: ['ASTROLOGY', 'EDUCATION'],
    isSynthetic: true,
    provenance: 'ASTRO360 Standard Synthesizer (Executive)',
  },
  EDITORIAL: {
    id: 'EDITORIAL',
    name: 'Editorial',
    description: 'Scholarly, structured, authoritative tone for historical contexts and multi-tradition comparisons.',
    recommendedTones: ['Clear', 'Reflective', 'Professional'],
    defaultTone: 'Clear',
    defaultSpeed: 0.97,
    pitch: 0.96,
    suitableDomains: ['ASTROLOGY', 'EDUCATION'],
    isSynthetic: true,
    provenance: 'ASTRO360 Standard Synthesizer (Scholarly)',
  },
  MEDITATIVE: {
    id: 'MEDITATIVE',
    name: 'Meditative',
    description: 'Soft, slow, spacious acoustic pacing designed for breathwork, reflection, and quiet mindfulness.',
    recommendedTones: ['Calm', 'Reflective'],
    defaultTone: 'Calm',
    defaultSpeed: 0.85,
    pitch: 0.92,
    suitableDomains: ['MEDITATION'],
    isSynthetic: true,
    provenance: 'ASTRO360 Standard Synthesizer (Meditative)',
  },
  TECHNICAL: {
    id: 'TECHNICAL',
    name: 'Technical',
    description: 'Precise, measured, unadorned narration for mathematical ephemeris degrees and calculation parameters.',
    recommendedTones: ['Clear', 'Professional'],
    defaultTone: 'Clear',
    defaultSpeed: 1.05,
    pitch: 1.0,
    suitableDomains: ['ASTROLOGY', 'EDUCATION'],
    isSynthetic: true,
    provenance: 'ASTRO360 Standard Synthesizer (Technical Precision)',
  },
  CONVERSATIONAL: {
    id: 'CONVERSATIONAL',
    name: 'Conversational',
    description: 'Natural, friendly, responsive tone for interactive chat consultations and prompt replies.',
    recommendedTones: ['Warm', 'Clear', 'Encouraging'],
    defaultTone: 'Warm',
    defaultSpeed: 1.0,
    pitch: 1.0,
    suitableDomains: ['ASTROLOGY', 'EDUCATION'],
    isSynthetic: true,
    provenance: 'ASTRO360 Standard Synthesizer (Conversational)',
  },
};

/**
 * Returns list of all voice profiles.
 */
export function getAllVoiceProfiles(): VoiceProfile[] {
  return Object.values(VOICE_PROFILES);
}

/**
 * Retrieves a voice profile by identifier with fallback to CALM_GUIDE.
 */
export function getVoiceProfile(id?: string): VoiceProfile {
  if (!id) return VOICE_PROFILES.CALM_GUIDE;
  return VOICE_PROFILES[id as VoiceProfileId] || VOICE_PROFILES.CALM_GUIDE;
}

/**
 * Enforces ethical speech guardrails on text before TTS generation.
 * Strips fatalistic, manipulative or dogmatic claims.
 */
export function sanitizeAstrologySpeechText(text: string): string {
  let cleaned = text;

  // Replace absolute certainty and doom prophecies with respectful astrological phrasing
  cleaned = cleaned.replace(/\byou will definitely (die|fail|lose all your money|face ruin)\b/gi, 'this period indicates significant caution and structural transition');
  cleaned = cleaned.replace(/\bguaranteed to happen\b/gi, 'traditionally observed as a strong potential');
  cleaned = cleaned.replace(/\byou are doomed\b/gi, 'this phase presents developmental challenges to be navigated mindfully');
  cleaned = cleaned.replace(/\b100% certain\b/gi, 'high classical alignment');
  cleaned = cleaned.replace(/\bthis mantra will solve all your problems\b/gi, 'this mantra is traditionally recited for spiritual focus and inner peace');

  return cleaned.trim();
}
