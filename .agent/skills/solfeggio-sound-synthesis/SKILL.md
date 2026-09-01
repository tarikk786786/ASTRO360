---
name: solfeggio-sound-synthesis
description: Hans Cousto Cosmic Octave acoustic frequencies, WebAudio API sine synthesis, stereo binaural beat alpha/theta brainwave entrainment, and sacred sound healing standards for ASTRO360.
---

# Solfeggio & Planetary Sound Synthesis Standards

## 1. Hans Cousto Cosmic Octave Mathematics
1. **Orbital Period Conversion**: $f = \frac{1}{T} \times 2^n$ where $T$ is orbital period in seconds and $n$ is octave doubling factor.
   - **Sun**: $126.22\text{ Hz}$ (Leo / Solar Plexus)
   - **Moon**: $210.42\text{ Hz}$ (Cancer / Sacral)
   - **Mercury**: $141.27\text{ Hz}$ (Gemini & Virgo / Throat)
   - **Venus**: $221.23\text{ Hz}$ (Taurus & Libra / Third Eye)
   - **Mars**: $144.72\text{ Hz}$ (Aries & Scorpio / Root)
   - **Jupiter**: $183.58\text{ Hz}$ (Sagittarius & Pisces / Crown)
   - **Saturn**: $147.85\text{ Hz}$ (Capricorn & Aquarius / Crown Base)

## 2. WebAudio API Synthesis Pipeline
1. **Pure Dual Oscillator**: Left channel runs carrier frequency $f_c$, right channel runs $f_c + \Delta f$ to generate psychoacoustic binaural beats in the brainstem.
2. **Gain Smoothing & Anti-Popping**: Use `linearRampToValueAtTime` with smooth $0.4\text{s}$ attack and $0.6\text{s}$ decay envelopes to prevent speaker clicks.
