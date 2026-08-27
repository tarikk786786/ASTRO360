/**
 * ASTRO360 — Speech Synthesis & Pronunciation Engine
 * Coordinates client-side TTS synthesis, phonetic lexicons,
 * and synchronized subtitle generation.
 */

import { getLanguageMetadata, detectBrowserVoicesForLanguage } from './languageRegistry';
import { getVoiceProfile, sanitizeAstrologySpeechText, type VoiceProfileId, type AudioTone } from './voiceRegistry';
import { buildAudioCacheKey, AudioCache } from './audioCache';

export interface TTSRequest {
  text: string;
  language?: string;        // Default 'en'
  voiceProfileId?: VoiceProfileId; // Default 'CALM_GUIDE'
  tone?: AudioTone;         // Default 'Calm'
  speed?: number;           // 0.5 to 2.0 (Default 1.0)
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
  onBoundary?: (wordIndex: number, charIndex: number) => void;
}

export interface SubtitleCue {
  id: number;
  text: string;
  startTimeSec: number;
  endTimeSec: number;
}

// Classical Astrological Phonetic Pronunciation Lexicon
const ASTRO_PRONUNCIATION_LEXICON: Record<string, Record<string, string>> = {
  en: {
    'Ayanamsha': 'eye-yah-NAHM-shah',
    'Lahiri': 'lah-HEE-ree',
    'Nakshatra': 'nuk-SHAH-trah',
    'Kundli': 'KOOND-lee',
    'Vimshottari': 'vim-SHO-tah-ree',
    'Mahadasha': 'mah-hah-DAH-shah',
    'Antardasha': 'un-tar-DAH-shah',
    'Pratyantar': 'prut-yun-TAR',
    'Navamsha': 'nah-VAHM-shah',
    'Dashamsha': 'dah-SHAHM-shah',
    'Shadbala': 'shud-BAH-lah',
    'Ashtakavarga': 'ush-tah-kah-VAR-gah',
    'Muhurta': 'moo-HOOR-tah',
    'Abhijit': 'ub-hee-JEET',
    'Rahu': 'RAH-hoo',
    'Ketu': 'KAY-too',
    'Lagna': 'LUG-nah',
  }
};

/**
 * Normalizes text and injects phonetic hints where useful.
 */
export function normalizeAstrologyTextForSpeech(text: string, lang: string = 'en'): string {
  const sanitized = sanitizeAstrologySpeechText(text);
  let normalized = sanitized;

  // Replace symbols with spoken equivalents
  normalized = normalized.replace(/°/g, ' degrees ');
  normalized = normalized.replace(/′/g, ' minutes ');
  normalized = normalized.replace(/″/g, ' seconds ');
  normalized = normalized.replace(/σ/g, ' sigma ');
  normalized = normalized.replace(/\b10th\b/g, 'tenth');
  normalized = normalized.replace(/\b1st\b/g, 'first');
  normalized = normalized.replace(/\b7th\b/g, 'seventh');
  normalized = normalized.replace(/\b4th\b/g, 'fourth');
  normalized = normalized.replace(/\b9th\b/g, 'ninth');
  normalized = normalized.replace(/\b11th\b/g, 'eleventh');
  normalized = normalized.replace(/\b12th\b/g, 'twelfth');

  return normalized;
}

/**
 * Generates timed subtitle cues from text based on average speaking rate (approx 150 words/min).
 */
export function generateSubtitleCues(text: string, speedMultiplier: number = 1.0): SubtitleCue[] {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const cues: SubtitleCue[] = [];
  let currentTime = 0;

  sentences.forEach((sentence, idx) => {
    const trimmed = sentence.trim();
    if (!trimmed) return;
    const wordCount = trimmed.split(/\s+/).length;
    // Base 0.35 seconds per word adjusted by speed
    const duration = Math.max(1.2, (wordCount * 0.35) / Math.max(0.5, speedMultiplier));
    cues.push({
      id: idx,
      text: trimmed,
      startTimeSec: currentTime,
      endTimeSec: currentTime + duration,
    });
    currentTime += duration;
  });

  return cues;
}

export class TTSService {
  private static currentUtterance: SpeechSynthesisUtterance | null = null;

  /**
   * Synthesizes and plays astrological narration using the browser SpeechSynthesis API.
   */
  public static speak(request: TTSRequest): { stop: () => void; durationEstimateSec: number } {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      console.warn('SpeechSynthesis API not available in this environment');
      request.onError?.(new Error('SpeechSynthesis not supported'));
      return { stop: () => {}, durationEstimateSec: 0 };
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const langCode = request.language || 'en';
    const langMeta = getLanguageMetadata(langCode);
    const voiceProfile = getVoiceProfile(request.voiceProfileId);
    const speed = request.speed || voiceProfile.defaultSpeed;
    const tone = request.tone || voiceProfile.defaultTone;

    const normalizedText = normalizeAstrologyTextForSpeech(request.text, langCode);
    const words = normalizedText.split(/\s+/).length;
    const durationEstimateSec = (words * 0.38) / speed;

    // Check cache
    const cacheKey = buildAudioCacheKey({
      text: normalizedText,
      language: langCode,
      voice: voiceProfile.id,
      tone,
      speed,
    });

    if (AudioCache.has(cacheKey)) {
      // Fast path cache hit
    } else {
      AudioCache.set({
        cacheKey,
        textHash: cacheKey.split(':')[0],
        language: langCode,
        voice: voiceProfile.id,
        tone,
        speed,
        engine: 'WebSpeech',
        engineVersion: '1.0.0',
        durationSeconds: durationEstimateSec,
        createdAt: Date.now(),
      });
    }

    const utterance = new SpeechSynthesisUtterance(normalizedText);
    utterance.lang = langMeta.locale;
    utterance.rate = speed;
    utterance.pitch = voiceProfile.pitch;

    // Select the best matching synthesizer voice
    const availableVoices = window.speechSynthesis.getVoices();
    const matchedVoice = availableVoices.find(v => 
      v.lang.toLowerCase() === langMeta.locale.toLowerCase() ||
      v.lang.toLowerCase().startsWith(langMeta.code.toLowerCase())
    );

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      request.onStart?.();
    };

    utterance.onend = () => {
      TTSService.currentUtterance = null;
      request.onEnd?.();
    };

    utterance.onerror = (e) => {
      TTSService.currentUtterance = null;
      request.onError?.(e);
    };

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        request.onBoundary?.(event.charIndex, event.charLength || 1);
      }
    };

    TTSService.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);

    return {
      stop: () => {
        window.speechSynthesis.cancel();
        TTSService.currentUtterance = null;
      },
      durationEstimateSec,
    };
  }

  public static stop(): void {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      TTSService.currentUtterance = null;
    }
  }

  public static isSpeaking(): boolean {
    if (typeof window === 'undefined' || !window.speechSynthesis) return false;
    return window.speechSynthesis.speaking;
  }
}
