# ASTRO360 OMNI — Universal Astrological & Ephemeris Intelligence Platform

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://astro.tarikislam.in)
[![Vite](https://img.shields.io/badge/vite-7.3.6-646CFF.svg)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/react-19.0.0-61DAFB.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-5.9.3-3178C6.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**ASTRO360** is a comprehensive, production-grade astrological calculation, predictive timing, and multi-tradition intelligence platform. It unites classical **Vedic Jyotish** (Parashari, Jaimini, KP, Tajika, Prashna), **Western Psychological & Tropical Astrology**, and **Islamic Astronomy (Ilm al-Falak)** on top of a 64-bit Swiss Ephemeris mathematical foundation.

---

## 🏛️ Four-Layer Architectural Separation

ASTRO360 enforces strict separation between raw astronomical facts and astrological interpretations:

1. **Astronomical Fact Layer**: Pure physical mathematics (J2000 epoch reduction, true obliquity of the ecliptic, Greenwich Mean Sidereal Time, Julian Day, topocentric coordinates).
2. **Astrological Calculation Layer**: Configurable Ayanamshas (*Lahiri Sidereal*, *B.V. Raman*, *KP Krishnamurti*, *Tropical 0° Aries*), 7 House Division Systems (*Whole Sign*, *Placidus*, *Equal*, *Sripati*, *Koch*, *Regiomontanus*), D1–D60 Divisional Vargas, and 120-Year Vimshottari Dasha calculations.
3. **Structured Rule & Tradition Layer**: Deterministic classical rules codified from *Brihat Parashara Hora Shastra*, *Jaimini Upadesha Sutras*, *Phaladeepika*, *Saravali*, *Tajika Neelakanthi*, and *Ptolemy's Tetrabiblos*.
4. **AI Explanation & Grounding Layer**: LLM synthesis engine receiving strictly validated JSON ephemeris payloads to explain astrological patterns without hallucination.

---

## 🚀 Key Platform Capabilities

### 1. Vedic Jyotish Core Suite
- **D1 to D60 Divisional Vargas**: Comprehensive harmonic charts with Vargottama dignity evaluation.
- **120-Year Vimshottari Dasha**: Exact Mahadasha, Antardasha, and Pratyantardasha periods derived from Moon Nakshatra arc balances.
- **Shadbala 6-Fold Strength Matrix**: Positional (*Sthana*), Directional (*Dig*), Temporal (*Kala*), Motional (*Chesta*), Natural (*Naisargika*), and Aspectual (*Drik*) Bala.
- **Sarvashtakavarga (SAV)**: 337-Bindu planetary distribution matrix with Trikona & Ekadhipatya Shodhana reductions.
- **100+ Classical Yogas**: Detection of Raja, Dhana, Nipuna, Viparita, Gaja Kesari, and Pancha Mahapurusha yogas with strength ratios and classical textual references.
- **Kuja & Dosha Diagnostics**: Non-fatalistic Manglik and Kalsarpa evaluation with 14 classical cancellation rules.

### 2. Multi-Tradition Frameworks
- **Jaimini Astrology**: 7-Chara Karakas (AK, AmK, BK, MK, PK, GK, DK), Jaimini Rashi Drishti, and Arudha Lagna (AL).
- **KP System (Krishnamurti Padhdhati)**: Placidus cuspal sub-lords, ruling planets, and 1–249 horary seed division.
- **Tajika Varshaphal**: Annual Solar Return chart casting, Muntha progression (1 sign/year), Varsheshwara, and 16 Tajika Sahams.
- **Prashna Horary**: Real-time query chart resolution with applying/separating aspect analysis.
- **Western Tropical Astrology**: Placidus house wheel, geometric aspect grid with configurable orbs, synastry, and composite charts.
- **Islamic Astronomy**: 28 Lunar Mansions (*Manazil al-Qamar*), Qibla direction, solar prayer times, and Firdaria planetary periods.

### 3. Production Infrastructure & Security
- **Multi-Profile Management**: Store and switch between multiple named birth profiles (*Self*, *Partner*, *Child*, *Parent*, *Friend*) with timezone and coordinate resolution.
- **HMAC-SHA256 Webhook Verification**: Cryptographically verified Cashfree payments gateway with server-side order state enforcement.
- **Ethical AI Safeguards**: Explicit systemic guardrails forbidding fatalistic predictions regarding death, terminal illness, or guaranteed wealth.
- **High-Resolution PDF Dossiers**: Vector SVG chart wheels and printable executive astrological dossiers.
- **Automated Health Monitoring**: Real-time `/api/health` diagnostics endpoint.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript 5.9, Vite 7.3, Tailwind CSS v4, Motion (`motion/react`), Lucide React, Recharts.
- **Backend / Serverless**: Vercel Serverless Functions (`api/astrology`, `api/payment`, `api/health`, `api/proxy`).
- **State Management**: Zustand stores with persistent `localStorage` and cloud sync adapters.
- **Mathematical Ephemeris**: Swiss Ephemeris mathematical models, J2000 planetary orbital reduction, Lahiri Ayanamsha algorithms.

---

## 📦 Getting Started

### Prerequisites
- Node.js 20+
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/tarikk786786/ASTRO360.git
cd ASTRO360

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build & Typecheck
```bash
# Verify TypeScript types
npm run typecheck

# Build for production
npm run build
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# AI Intelligence (Optional for Grounded Multi-Agent LLM Gateway)
GEMINI_API_KEY=your_gemini_api_key_here

# Payment Gateway (Optional for Cashfree Production PG)
CASHFREE_APP_ID=your_cashfree_app_id
CASHFREE_SECRET_KEY=your_cashfree_secret_key
CASHFREE_ENV=production

# Supabase (Optional for Multi-Device Cloud Sync)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 📄 License & Ethical Disclaimer

Astrological guidance provided by ASTRO360 is interpretive wisdom for self-reflection and philosophical contemplation. It does not constitute medical, legal, psychological, or financial advice.

© 2026 ASTRO360. Built by Tarik Islam ([tarikislam.in](https://tarikislam.in)).
