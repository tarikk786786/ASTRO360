// ASTRO360 Web Audio API Solfeggio & Soundboard Resonator Engine
// Synthesizes pure harmonic Solfeggio tones with smooth envelope & warm overtones.

let audioCtx: AudioContext | null = null;
let currentOsc: OscillatorNode | null = null;
let currentGain: GainNode | null = null;
let currentHarmonicOsc: OscillatorNode | null = null;

export function playSolfeggioTone(freqHz: number): () => void {
  try {
    // 1. Initialize or Resume AudioContext inside user gesture handler
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // 2. Stop any existing tone cleanly
    stopSolfeggioTone();

    const now = audioCtx.currentTime;

    // 3. Main Master Gain Node with soft attack & release
    const masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.exponentialRampToValueAtTime(0.2, now + 0.15);
    masterGain.connect(audioCtx.destination);

    // 4. Fundamental Sine Wave Oscillator
    const osc = audioCtx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freqHz, now);
    osc.connect(masterGain);
    osc.start(now);

    // 5. Warm Harmonic Overtone Oscillator (Perfect fifth or Octave)
    const harmonicOsc = audioCtx.createOscillator();
    const harmonicGain = audioCtx.createGain();
    harmonicOsc.type = 'sine';
    harmonicOsc.frequency.setValueAtTime(freqHz * 1.5, now);
    harmonicGain.gain.setValueAtTime(0.03, now);
    harmonicOsc.connect(harmonicGain);
    harmonicGain.connect(masterGain);
    harmonicOsc.start(now);

    currentOsc = osc;
    currentHarmonicOsc = harmonicOsc;
    currentGain = masterGain;

    // Return stop function
    return () => {
      stopSolfeggioTone();
    };
  } catch (err) {
    console.warn("Web Audio API not supported or user interaction required:", err);
    return () => {};
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
