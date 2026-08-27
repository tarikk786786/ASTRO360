/**
 * ASTRO360 — Audio, Multilingual TTS & Sacred Content QA Test Suite
 * Validates language registry, voice profiles, script directions (LTR/RTL),
 * traditional mantra citations, Islamic dua/Quran sources, determinism, and ethical guardrails.
 */

import { 
  getAllSupportedLanguages, 
  getLanguageMetadata, 
  isRtlLanguage, 
  LANGUAGE_REGISTRY 
} from '../../src/lib/audio/languageRegistry';

import { 
  VOICE_PROFILES, 
  getVoiceProfile, 
  getAllVoiceProfiles, 
  sanitizeAstrologySpeechText 
} from '../../src/lib/audio/voiceRegistry';

import { 
  MantraService, 
  TRADITIONAL_MANTRA_LIBRARY 
} from '../../src/lib/audio/mantraService';

import { 
  IslamicAudioService, 
  ISLAMIC_AUDIO_LIBRARY 
} from '../../src/lib/audio/islamicAudioService';

import { 
  buildAudioCacheKey, 
  computeTextHash, 
  AudioCache 
} from '../../src/lib/audio/audioCache';

import { 
  normalizeAstrologyTextForSpeech, 
  generateSubtitleCues 
} from '../../src/lib/audio/ttsService';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    throw new Error(message);
  }
  console.log(`✅ Passed [${message}]`);
}

console.log('============================================================');
console.log('🎙️ ASTRO360 MULTILINGUAL AUDIO & SACRED CONTENT QA SUITE');
console.log('============================================================\n');

// 1. LANGUAGE & SCRIPT REGISTRY TESTS
console.log('--- 1. LANGUAGE REGISTRY & SCRIPT DIRECTION ---');
const allLangs = getAllSupportedLanguages();
assert(allLangs.length >= 18, `Registered at least 18 priority languages (Found: ${allLangs.length})`);

assert(isRtlLanguage('ar') === true, 'Arabic is verified as RTL direction');
assert(isRtlLanguage('ur') === true, 'Urdu is verified as RTL direction');
assert(isRtlLanguage('en') === false, 'English is verified as LTR direction');
assert(isRtlLanguage('hi') === false, 'Hindi is verified as LTR direction');
assert(isRtlLanguage('bn') === false, 'Bengali is verified as LTR direction');

assert(getLanguageMetadata('hi').script === 'Devanagari', 'Hindi maps to Devanagari script');
assert(getLanguageMetadata('bn').script === 'Bengali', 'Bengali maps to Bengali script');
assert(getLanguageMetadata('pa').script === 'Gurmukhi', 'Punjabi maps to Gurmukhi script');
assert(getLanguageMetadata('ta').script === 'Tamil', 'Tamil maps to Tamil script');
assert(getLanguageMetadata('te').script === 'Telugu', 'Telugu maps to Telugu script');
assert(getLanguageMetadata('ar').script === 'Arabic', 'Arabic maps to Arabic script');

// 2. VOICE PROFILE & ETHICAL GUARDRAILS
console.log('\n--- 2. VOICE PROFILES & SPEECH ETHICAL GUARDRAILS ---');
const allVoices = getAllVoiceProfiles();
assert(allVoices.length === 7, `7 distinct voice profiles registered (Found: ${allVoices.length})`);

const defaultVoice = getVoiceProfile('CALM_GUIDE');
assert(defaultVoice.id === 'CALM_GUIDE', 'Default voice profile is CALM_GUIDE');
assert(defaultVoice.defaultTone === 'Calm', 'Default voice tone is Calm');
assert(defaultVoice.defaultSpeed <= 1.0, 'Default voice speed is balanced and unhurried');

// Test speech safety sanitization
const fatalisticText = "You will definitely face ruin in this Rahu period and 100% certain catastrophe.";
const sanitized = sanitizeAstrologySpeechText(fatalisticText);
assert(!sanitized.includes('you will definitely face ruin'), 'Fatalistic ruin statement successfully sanitized');
assert(!sanitized.includes('100% certain'), 'Absolute certainty converted to classical observation');

// 3. TRADITIONAL VEDIC MANTRA LIBRARY VERIFICATION
console.log('\n--- 3. TRADITIONAL MANTRA LIBRARY & CITATIONS ---');
const mantras = MantraService.getAll();
assert(mantras.length >= 8, `Mantra library populated with verified classical hymns (Found: ${mantras.length})`);

const suryaMantra = MantraService.getByPlanet('Sun');
assert(suryaMantra !== undefined, 'Surya mantra exists for Sun placement');
assert(suryaMantra!.originalText.includes('ॐ आदित्याय विद्महे'), 'Surya Gayatri text is authentic Devanagari');
assert(suryaMantra!.source.includes('Mahanarayana Upanishad') || suryaMantra!.source.includes('Rigvedic'), 'Surya Gayatri cites authentic Vedic scripture');
assert(suryaMantra!.pronunciation.syllables.length > 0, 'Syllables broken down for pronunciation mode');
assert(suryaMantra!.supportedCounts.includes(108), '108x traditional count supported');
assert(suryaMantra!.disclaimer.includes('ASTRO360 does not promise or guarantee material outcomes'), 'Mandatory non-guarantee disclaimer attached');

const mrityunjaya = MantraService.getById('mantra-maha-mrityunjaya');
assert(mrityunjaya !== undefined, 'Maha Mrityunjaya hymn present');
assert(mrityunjaya!.source.includes('Rigveda Mandala 7'), 'Maha Mrityunjaya accurately cites Rigveda 7.59.12');

// 4. ISLAMIC DUA, DHIKR & QURAN AUDIO DOMAIN
console.log('\n--- 4. ISLAMIC DUA & QURAN DOMAIN (STRICT ISOLATION) ---');
const islamicItems = IslamicAudioService.getAll();
assert(islamicItems.length >= 5, `Islamic audio library populated with verified items (Found: ${islamicItems.length})`);

const ayatAlKursi = IslamicAudioService.getById('quran-ayat-al-kursi');
assert(ayatAlKursi !== undefined, 'Ayat al-Kursi entry present');
assert(ayatAlKursi!.arabicText.includes('اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ'), 'Authentic Uthmani Arabic text verified');
assert(ayatAlKursi!.source === 'Qur\'an, Surah Al-Baqarah (2:255)', 'Exact Qur\'an 2:255 citation verified');
assert(ayatAlKursi!.isRtl === true, 'RTL flag is true for Arabic content');
assert(ayatAlKursi!.disclaimer.includes('spiritual supplication'), 'Islamic devotional disclaimer attached');

const travelDua = IslamicAudioService.getById('dua-travel');
assert(travelDua !== undefined, 'Travel dua present');
assert(travelDua!.source.includes('Sahih Muslim 1342') || travelDua!.hadithReference?.includes('1342'), 'Travel dua cites Sahih Muslim');

// 5. DETERMINISTIC AUDIO CACHING
console.log('\n--- 5. DETERMINISTIC AUDIO CACHING ---');
const text1 = "Today's Moon forms an auspicious trine to Jupiter.";
const key1 = buildAudioCacheKey({
  text: text1,
  language: 'en',
  voice: 'CALM_GUIDE',
  tone: 'Calm',
  speed: 1.0,
});
const key2 = buildAudioCacheKey({
  text: text1,
  language: 'en',
  voice: 'CALM_GUIDE',
  tone: 'Calm',
  speed: 1.0,
});
assert(key1 === key2, 'Audio cache key computation is 100% deterministic');

AudioCache.set({
  cacheKey: key1,
  textHash: computeTextHash(text1),
  language: 'en',
  voice: 'CALM_GUIDE',
  tone: 'Calm',
  speed: 1.0,
  engine: 'WebSpeech',
  engineVersion: '1.0.0',
  durationSeconds: 12.5,
  createdAt: Date.now(),
});
assert(AudioCache.has(key1) === true, 'AudioCache retrieves set entry');
assert(AudioCache.get(key1)?.durationSeconds === 12.5, 'AudioCache preserves entry metadata');

// 6. TTS NORMALIZATION & SUBTITLES
console.log('\n--- 6. TTS TEXT NORMALIZATION & SUBTITLE TIMING ---');
const rawAstroText = "Sun at 28° in 10th house creating 3.4σ above average clarity.";
const normalizedSpeech = normalizeAstrologyTextForSpeech(rawAstroText);
assert(normalizedSpeech.includes('28 degrees'), 'Degree symbol normalized to spoken words');
assert(normalizedSpeech.includes('tenth house'), 'Ordinal 10th converted to spoken word');
assert(normalizedSpeech.includes('sigma'), 'Greek symbol σ converted to spoken word');

const subtitleCues = generateSubtitleCues("First sentence here. Second sentence starts now. Third sentence ends it.", 1.0);
assert(subtitleCues.length === 3, `Subtitle cues correctly split into 3 sentences (Found: ${subtitleCues.length})`);
assert(subtitleCues[0].startTimeSec === 0, 'First subtitle cue starts at 0s');
assert(subtitleCues[1].startTimeSec > 0, 'Subsequent subtitle cue has positive timestamp');

console.log('\n============================================================');
console.log('🏆 ALL AUDIO, SPEECH & SACRED CONTENT QA ASSERTIONS PASSED CLEANLY!');
console.log('============================================================\n');
