/**
 * ASTRO360 Planetary Acoustic Resonance & Binaural Frequency Synthesizer
 * Uses the Web Audio API to synthesize Hans Cousto cosmic octave planetary frequencies.
 */

export interface PlanetaryTone {
  planet: string;
  symbol: string;
  frequency: number; // in Hz
  binauralBeat: number; // in Hz (delta/theta/alpha brainwave entrainment)
  rulingSign: string;
  chakra: string;
  color: string;
  description: string;
}

export const PLANETARY_TONES: PlanetaryTone[] = [
  {
    planet: 'Sun',
    symbol: '☉',
    frequency: 126.22,
    binauralBeat: 7.83, // Schumann Resonance
    rulingSign: 'Leo ♌',
    chakra: 'Solar Plexus & Crown',
    color: '#F59E0B',
    description: 'Empowers self-confidence, vitality, executive willpower, and radiant vitality.'
  },
  {
    planet: 'Moon',
    symbol: '☽',
    frequency: 210.42,
    binauralBeat: 4.5, // Deep Theta (Subconscious & Dreams)
    rulingSign: 'Cancer ♋',
    chakra: 'Sacral Chakra (Swadhisthana)',
    color: '#06B6D4',
    description: 'Soothes emotional distress, deepens intuition, and aligns hormonal biological rhythms.'
  },
  {
    planet: 'Mercury',
    symbol: '☿',
    frequency: 141.27,
    binauralBeat: 12.0, // High Alpha (Cognition & Memory)
    rulingSign: 'Gemini ♊ / Virgo ♍',
    chakra: 'Throat Chakra (Vishuddha)',
    color: '#10B981',
    description: 'Enhances cognitive speed, eloquent communication, mental clarity, and analytical processing.'
  },
  {
    planet: 'Venus',
    symbol: '♀',
    frequency: 221.23,
    binauralBeat: 6.3, // Theta (Heart Coherence)
    rulingSign: 'Taurus ♉ / Libra ♎',
    chakra: 'Heart Chakra (Anahata)',
    color: '#EC4899',
    description: 'Awakens unconditional affection, aesthetic creativity, romantic harmony, and inner peace.'
  },
  {
    planet: 'Mars',
    symbol: '♂',
    frequency: 144.72,
    binauralBeat: 14.0, // Low Beta (Action & Stamina)
    rulingSign: 'Aries ♈ / Scorpio ♏',
    chakra: 'Root Chakra (Muladhara)',
    color: '#EF4444',
    description: 'Ignites focused courage, athletic drive, physical resilience, and decisive execution.'
  },
  {
    planet: 'Jupiter',
    symbol: '♃',
    frequency: 183.58,
    binauralBeat: 8.0, // Alpha/Theta Threshold (Spiritual Insight)
    rulingSign: 'Sagittarius ♐ / Pisces ♓',
    chakra: 'Third Eye Chakra (Ajna)',
    color: '#8B5CF6',
    description: 'Stimulates philosophical expansion, wealth consciousness, abundance, and spiritual wisdom.'
  },
  {
    planet: 'Saturn',
    symbol: '♄',
    frequency: 147.85,
    binauralBeat: 4.0, // Delta (Grounding & Karmic Mastery)
    rulingSign: 'Capricorn ♑ / Aquarius ♒',
    chakra: 'Root / Earth Star Chakra',
    color: '#64748B',
    description: 'Fosters profound discipline, emotional endurance, karmic grounding, and structured perseverance.'
  },
  {
    planet: 'Earth / Cosmic Om',
    symbol: '♁',
    frequency: 136.10,
    binauralBeat: 7.83, // Earth Harmonic
    rulingSign: 'Universal',
    chakra: 'Heart / Anahata Universal',
    color: '#3B82F6',
    description: 'The ancient primordial Om frequency; restores cell equilibrium and nervous system tranquility.'
  }
];

class PlanetarySoundSynthesizer {
  private audioCtx: AudioContext | null = null;
  private leftOsc: OscillatorNode | null = null;
  private rightOsc: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying: boolean = false;
  private currentPlanet: string | null = null;

  private initContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public playTone(planetName: string, volume: number = 0.3) {
    this.stopTone();
    this.initContext();
    if (!this.audioCtx) return;

    const tone = PLANETARY_TONES.find(t => t.planet.toLowerCase() === planetName.toLowerCase()) || PLANETARY_TONES[0];
    
    // Create stereo panner / merger for true binaural brainwave entrainment
    const merger = this.audioCtx.createChannelMerger(2);
    this.gainNode = this.audioCtx.createGain();
    this.gainNode.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(Math.max(0.01, Math.min(1.0, volume)), this.audioCtx.currentTime + 1.5);

    // Left ear base frequency
    this.leftOsc = this.audioCtx.createOscillator();
    this.leftOsc.type = 'sine';
    this.leftOsc.frequency.setValueAtTime(tone.frequency, this.audioCtx.currentTime);

    // Right ear base frequency + binaural offset
    this.rightOsc = this.audioCtx.createOscillator();
    this.rightOsc.type = 'sine';
    this.rightOsc.frequency.setValueAtTime(tone.frequency + tone.binauralBeat, this.audioCtx.currentTime);

    // Route left to channel 0, right to channel 1
    this.leftOsc.connect(merger, 0, 0);
    this.rightOsc.connect(merger, 0, 1);
    merger.connect(this.gainNode);
    this.gainNode.connect(this.audioCtx.destination);

    this.leftOsc.start();
    this.rightOsc.start();
    this.isPlaying = true;
    this.currentPlanet = tone.planet;
  }

  public stopTone(fadeDurationSeconds: number = 0.8) {
    if (!this.isPlaying || !this.gainNode || !this.audioCtx) return;

    try {
      this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.audioCtx.currentTime);
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + fadeDurationSeconds);
      
      const left = this.leftOsc;
      const right = this.rightOsc;

      setTimeout(() => {
        try {
          left?.stop();
          right?.stop();
          left?.disconnect();
          right?.disconnect();
        } catch (e) {}
      }, fadeDurationSeconds * 1000);
    } catch (e) {}

    this.isPlaying = false;
    this.currentPlanet = null;
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      currentPlanet: this.currentPlanet
    };
  }
}

export const planetarySynthesizer = new PlanetarySoundSynthesizer();
