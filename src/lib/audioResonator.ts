// ASTRO360 Web Audio API & Audio Stream Engine
// Real Solfeggio Oscillators, Binaural Beats, Singing Bowl Synthesis & Real HD Recitations

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let oscLeft: OscillatorNode | null = null;
let oscRight: OscillatorNode | null = null;
let subOsc: OscillatorNode | null = null;
let harmonicOsc: OscillatorNode | null = null;
let currentAudioElement: HTMLAudioElement | null = null;
let analyserNode: AnalyserNode | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export type WaveformType = 'binaural' | 'drone' | 'sine' | 'triangle';

export function getAudioAnalyser(): AnalyserNode | null {
  if (!audioCtx) return null;
  if (!analyserNode) {
    analyserNode = audioCtx.createAnalyser();
    analyserNode.fftSize = 64;
  }
  return analyserNode;
}

export function playSolfeggioTone(
  freqHz: number,
  volumeLevel: number = 0.25,
  waveform: WaveformType = 'binaural',
  beatHz: number = 4.0
): () => void {
  try {
    const ctx = getAudioContext();
    stopSolfeggioTone();
    stopAudioStream();

    const now = ctx.currentTime;
    const targetVol = Math.max(0.001, Math.min(0.5, volumeLevel));

    masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.exponentialRampToValueAtTime(targetVol, now + 0.15);

    const analyser = getAudioAnalyser();
    if (analyser) {
      masterGain.connect(analyser);
      analyser.connect(ctx.destination);
    } else {
      masterGain.connect(ctx.destination);
    }

    if (waveform === 'binaural' && 'createStereoPanner' in ctx) {
      const pannerLeft = (ctx as AudioContext).createStereoPanner();
      pannerLeft.pan.setValueAtTime(-0.8, now);
      
      const pannerRight = (ctx as AudioContext).createStereoPanner();
      pannerRight.pan.setValueAtTime(0.8, now);

      oscLeft = ctx.createOscillator();
      oscLeft.type = 'sine';
      oscLeft.frequency.setValueAtTime(freqHz, now);
      oscLeft.connect(pannerLeft);
      pannerLeft.connect(masterGain);
      oscLeft.start(now);

      oscRight = ctx.createOscillator();
      oscRight.type = 'sine';
      oscRight.frequency.setValueAtTime(freqHz + beatHz, now);
      oscRight.connect(pannerRight);
      pannerRight.connect(masterGain);
      oscRight.start(now);

      subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(freqHz / 2, now);
      subGain.gain.setValueAtTime(targetVol * 0.2, now);
      subOsc.connect(subGain);
      subGain.connect(masterGain);
      subOsc.start(now);
    } else if (waveform === 'drone') {
      oscLeft = ctx.createOscillator();
      oscLeft.type = 'triangle';
      oscLeft.frequency.setValueAtTime(freqHz, now);
      oscLeft.connect(masterGain);
      oscLeft.start(now);

      oscRight = ctx.createOscillator();
      oscRight.type = 'sine';
      oscRight.frequency.setValueAtTime(freqHz * 1.5, now);
      const gain5th = ctx.createGain();
      gain5th.gain.setValueAtTime(targetVol * 0.25, now);
      oscRight.connect(gain5th);
      gain5th.connect(masterGain);
      oscRight.start(now);

      subOsc = ctx.createOscillator();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(freqHz * 2.0, now);
      const gainOct = ctx.createGain();
      gainOct.gain.setValueAtTime(targetVol * 0.15, now);
      subOsc.connect(gainOct);
      gainOct.connect(masterGain);
      subOsc.start(now);
    } else {
      oscLeft = ctx.createOscillator();
      oscLeft.type = waveform === 'triangle' ? 'triangle' : 'sine';
      oscLeft.frequency.setValueAtTime(freqHz, now);
      oscLeft.connect(masterGain);
      oscLeft.start(now);

      harmonicOsc = ctx.createOscillator();
      harmonicOsc.type = 'sine';
      harmonicOsc.frequency.setValueAtTime(freqHz * 1.5, now);
      const hGain = ctx.createGain();
      hGain.gain.setValueAtTime(targetVol * 0.15, now);
      harmonicOsc.connect(hGain);
      hGain.connect(masterGain);
      harmonicOsc.start(now);
    }

    return () => {
      stopSolfeggioTone();
    };
  } catch (err) {
    console.warn("Web Audio API warning:", err);
    return () => {};
  }
}

export function stopSolfeggioTone() {
  if (masterGain && audioCtx) {
    try {
      const now = audioCtx.currentTime;
      masterGain.gain.setValueAtTime(masterGain.gain.value, now);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

      setTimeout(() => {
        [oscLeft, oscRight, subOsc, harmonicOsc].forEach(osc => {
          if (osc) {
            try { osc.stop(); } catch {}
            try { osc.disconnect(); } catch {}
          }
        });
        oscLeft = null;
        oscRight = null;
        subOsc = null;
        harmonicOsc = null;
        masterGain = null;
      }, 220);
    } catch {
      oscLeft = null;
      oscRight = null;
      subOsc = null;
      harmonicOsc = null;
      masterGain = null;
    }
  }
}

export function setSolfeggioVolume(volumeLevel: number) {
  if (audioCtx && masterGain) {
    try {
      const now = audioCtx.currentTime;
      const targetVol = Math.max(0.001, Math.min(0.5, volumeLevel));
      masterGain.gain.setValueAtTime(masterGain.gain.value, now);
      masterGain.gain.exponentialRampToValueAtTime(targetVol, now + 0.05);
    } catch {}
  }
  if (currentAudioElement) {
    currentAudioElement.volume = Math.max(0, Math.min(1, volumeLevel * 2));
  }
}

// REAL MP3 RECITATION AUDIO STREAM PLAYBACK ENGINE
export function playAudioStream(
  url: string,
  volumeLevel: number = 0.5,
  onEnd?: () => void
): HTMLAudioElement {
  stopAudioStream();
  stopSolfeggioTone();

  const audio = new Audio(url);
  audio.crossOrigin = 'anonymous';
  audio.volume = Math.max(0, Math.min(1, volumeLevel * 2));
  audio.play().catch(err => console.warn("Audio stream playback failed:", err));

  if (onEnd) {
    audio.onended = onEnd;
  }

  currentAudioElement = audio;
  return audio;
}

export function stopAudioStream() {
  if (currentAudioElement) {
    try {
      currentAudioElement.pause();
      currentAudioElement.currentTime = 0;
    } catch {}
    currentAudioElement = null;
  }
}

// Tibetan Singing Bowl Chime
export function playSingingBowlChime(baseFreqHz: number = 432) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.35, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);
    gainNode.connect(ctx.destination);

    const bell1 = ctx.createOscillator();
    bell1.type = 'sine';
    bell1.frequency.setValueAtTime(baseFreqHz, now);
    bell1.connect(gainNode);
    bell1.start(now);
    bell1.stop(now + 3.8);

    const bell2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    bell2.type = 'sine';
    bell2.frequency.setValueAtTime(baseFreqHz * 2.76, now);
    gain2.gain.setValueAtTime(0.12, now);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);
    bell2.connect(gain2);
    gain2.connect(gainNode);
    bell2.start(now);
    bell2.stop(now + 2.2);

    const bell3 = ctx.createOscillator();
    const gain3 = ctx.createGain();
    bell3.type = 'sine';
    bell3.frequency.setValueAtTime(baseFreqHz * 5.4, now);
    gain3.gain.setValueAtTime(0.05, now);
    gain3.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);
    bell3.connect(gain3);
    gain3.connect(gainNode);
    bell3.start(now);
    bell3.stop(now + 1.4);
  } catch (err) {
    console.warn("Singing bowl chime sound error:", err);
  }
}

// Dhikr Bead Click
export function playDhikrClickSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();

    clickOsc.type = 'triangle';
    clickOsc.frequency.setValueAtTime(850, now);
    clickOsc.frequency.exponentialRampToValueAtTime(140, now + 0.04);

    clickGain.gain.setValueAtTime(0.28, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);

    clickOsc.start(now);
    clickOsc.stop(now + 0.05);
  } catch {}
}

// Web Speech Synthesis
export function speakSacredText(text: string, rate: number = 0.85): () => void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = 1.0;
    utterance.volume = 0.9;
    
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.includes('en') || v.lang.includes('ar') || v.lang.includes('hi')) || voices[0];
    if (preferredVoice) utterance.voice = preferredVoice;

    window.speechSynthesis.speak(utterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }
  return () => {};
}

export function stopSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
