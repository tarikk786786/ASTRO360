// ASTRO360 Web Audio API Solfeggio & Soundboard Resonator Engine
// Synthesizes pure harmonic Solfeggio tones (174Hz–963Hz) with smooth envelope & warm overtones.

let audioCtx: AudioContext | null = null;
let currentOsc: OscillatorNode | null = null;
let currentGain: GainNode | null = null;
let currentHarmonicOsc: OscillatorNode | null = null;

export function playSolfeggioTone(freqHz: number, volumeLevel: number = 0.2): () => void {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    stopSolfeggioTone();

    const now = audioCtx.currentTime;
    const targetGain = Math.max(0.001, Math.min(0.5, volumeLevel));

    // Master Gain Node with smooth soft attack
    const masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.exponentialRampToValueAtTime(targetGain, now + 0.15);
    masterGain.connect(audioCtx.destination);

    // Fundamental Sine Wave Oscillator
    const osc = audioCtx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freqHz, now);
    osc.connect(masterGain);
    osc.start(now);

    // Warm Harmonic Overtone Oscillator (Perfect fifth or Octave)
    const harmonicOsc = audioCtx.createOscillator();
    const harmonicGain = audioCtx.createGain();
    harmonicOsc.type = 'sine';
    harmonicOsc.frequency.setValueAtTime(freqHz * 1.5, now);
    harmonicGain.gain.setValueAtTime(targetGain * 0.15, now);
    harmonicOsc.connect(harmonicGain);
    harmonicGain.connect(masterGain);
    harmonicOsc.start(now);

    currentOsc = osc;
    currentHarmonicOsc = harmonicOsc;
    currentGain = masterGain;

    return () => {
      stopSolfeggioTone();
    };
  } catch (err) {
    console.warn("Web Audio API not supported or user interaction required:", err);
    return () => {};
  }
}

export function setSolfeggioVolume(volumeLevel: number) {
  if (audioCtx && currentGain) {
    try {
      const now = audioCtx.currentTime;
      const targetGain = Math.max(0.001, Math.min(0.5, volumeLevel));
      currentGain.gain.setValueAtTime(currentGain.gain.value, now);
      currentGain.gain.exponentialRampToValueAtTime(targetGain, now + 0.05);
    } catch {}
  }
}

export function stopSolfeggioTone() {
  if (audioCtx && currentGain && currentOsc) {
    try {
      const now = audioCtx.currentTime;
      currentGain.gain.setValueAtTime(currentGain.gain.value, now);
      currentGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

      setTimeout(() => {
        if (currentOsc) {
          try { currentOsc.stop(); } catch {}
          currentOsc.disconnect();
          currentOsc = null;
        }
        if (currentHarmonicOsc) {
          try { currentHarmonicOsc.stop(); } catch {}
          currentHarmonicOsc.disconnect();
          currentHarmonicOsc = null;
        }
        currentGain = null;
      }, 220);
    } catch {
      currentOsc = null;
      currentHarmonicOsc = null;
      currentGain = null;
    }
  }
}
