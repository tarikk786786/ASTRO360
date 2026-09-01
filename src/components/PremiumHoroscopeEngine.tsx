import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sun, Moon, Star, Sparkles, TrendingUp, Heart, Briefcase, Shield,
  Zap, Activity, Clock, Calendar, ChevronRight, Eye, Flame, Globe2,
  Compass, Award, Target, Brain, Gem, ArrowUpRight, ArrowDownRight,
  RefreshCw, Download, ChevronDown, Users, Wallet, GraduationCap,
  HeartPulse, Lightbulb, Crown, Orbit
} from 'lucide-react';
import type { UserProfile } from '../types';
import { calculatePlanetaryPositions, calculatePanchang, calculateVimshottariDasha } from '../lib/astroCalculations';
import { exportUniversalPdf } from '../lib/pdfReportEngine';

interface PremiumHoroscopeEngineProps {
  userProfile: UserProfile;
  activeTab?: string;
  initialTab?: string;
}

// ─── ZODIAC DATA ──────────────────────────────────────────────────
const ZODIAC_SIGNS = [
  { name: 'Aries', symbol: '♈', emoji: '🐏', dates: 'Mar 21 – Apr 19', element: 'Fire', modality: 'Cardinal', ruler: 'Mars', rulerSymbol: '♂', color: 'from-red-500 to-orange-500', colorHex: '#EF4444', traits: ['Bold', 'Ambitious', 'Energetic'], lucky: { number: 9, day: 'Tuesday', color: 'Red', stone: 'Diamond' } },
  { name: 'Taurus', symbol: '♉', emoji: '🐂', dates: 'Apr 20 – May 20', element: 'Earth', modality: 'Fixed', ruler: 'Venus', rulerSymbol: '♀', color: 'from-emerald-500 to-green-600', colorHex: '#10B981', traits: ['Reliable', 'Patient', 'Devoted'], lucky: { number: 6, day: 'Friday', color: 'Green', stone: 'Emerald' } },
  { name: 'Gemini', symbol: '♊', emoji: '👯', dates: 'May 21 – Jun 20', element: 'Air', modality: 'Mutable', ruler: 'Mercury', rulerSymbol: '☿', color: 'from-yellow-400 to-amber-500', colorHex: '#F59E0B', traits: ['Versatile', 'Curious', 'Expressive'], lucky: { number: 5, day: 'Wednesday', color: 'Yellow', stone: 'Agate' } },
  { name: 'Cancer', symbol: '♋', emoji: '🦀', dates: 'Jun 21 – Jul 22', element: 'Water', modality: 'Cardinal', ruler: 'Moon', rulerSymbol: '☽', color: 'from-slate-300 to-blue-400', colorHex: '#94A3B8', traits: ['Intuitive', 'Nurturing', 'Protective'], lucky: { number: 2, day: 'Monday', color: 'Silver', stone: 'Pearl' } },
  { name: 'Leo', symbol: '♌', emoji: '🦁', dates: 'Jul 23 – Aug 22', element: 'Fire', modality: 'Fixed', ruler: 'Sun', rulerSymbol: '☉', color: 'from-amber-400 to-yellow-500', colorHex: '#F59E0B', traits: ['Confident', 'Dramatic', 'Generous'], lucky: { number: 1, day: 'Sunday', color: 'Gold', stone: 'Ruby' } },
  { name: 'Virgo', symbol: '♍', emoji: '🌾', dates: 'Aug 23 – Sep 22', element: 'Earth', modality: 'Mutable', ruler: 'Mercury', rulerSymbol: '☿', color: 'from-green-500 to-emerald-600', colorHex: '#22C55E', traits: ['Analytical', 'Practical', 'Diligent'], lucky: { number: 5, day: 'Wednesday', color: 'Navy', stone: 'Sapphire' } },
  { name: 'Libra', symbol: '♎', emoji: '⚖️', dates: 'Sep 23 – Oct 22', element: 'Air', modality: 'Cardinal', ruler: 'Venus', rulerSymbol: '♀', color: 'from-pink-400 to-rose-500', colorHex: '#EC4899', traits: ['Diplomatic', 'Harmonious', 'Fair'], lucky: { number: 6, day: 'Friday', color: 'Pink', stone: 'Opal' } },
  { name: 'Scorpio', symbol: '♏', emoji: '🦂', dates: 'Oct 23 – Nov 21', element: 'Water', modality: 'Fixed', ruler: 'Pluto', rulerSymbol: '♇', color: 'from-red-700 to-purple-800', colorHex: '#9333EA', traits: ['Passionate', 'Strategic', 'Intense'], lucky: { number: 8, day: 'Tuesday', color: 'Crimson', stone: 'Topaz' } },
  { name: 'Sagittarius', symbol: '♐', emoji: '🏹', dates: 'Nov 22 – Dec 21', element: 'Fire', modality: 'Mutable', ruler: 'Jupiter', rulerSymbol: '♃', color: 'from-purple-500 to-indigo-600', colorHex: '#7C3AED', traits: ['Adventurous', 'Philosophical', 'Optimistic'], lucky: { number: 3, day: 'Thursday', color: 'Purple', stone: 'Turquoise' } },
  { name: 'Capricorn', symbol: '♑', emoji: '🐐', dates: 'Dec 22 – Jan 19', element: 'Earth', modality: 'Cardinal', ruler: 'Saturn', rulerSymbol: '♄', color: 'from-gray-500 to-slate-700', colorHex: '#475569', traits: ['Disciplined', 'Responsible', 'Ambitious'], lucky: { number: 8, day: 'Saturday', color: 'Brown', stone: 'Garnet' } },
  { name: 'Aquarius', symbol: '♒', emoji: '🏺', dates: 'Jan 20 – Feb 18', element: 'Air', modality: 'Fixed', ruler: 'Uranus', rulerSymbol: '♅', color: 'from-cyan-400 to-blue-500', colorHex: '#06B6D4', traits: ['Independent', 'Innovative', 'Humanitarian'], lucky: { number: 4, day: 'Saturday', color: 'Electric Blue', stone: 'Amethyst' } },
  { name: 'Pisces', symbol: '♓', emoji: '🐟', dates: 'Feb 19 – Mar 20', element: 'Water', modality: 'Mutable', ruler: 'Neptune', rulerSymbol: '♆', color: 'from-blue-400 to-indigo-500', colorHex: '#3B82F6', traits: ['Empathetic', 'Artistic', 'Dreamy'], lucky: { number: 7, day: 'Thursday', color: 'Sea Green', stone: 'Aquamarine' } },
];

const ELEMENT_ICONS: Record<string, string> = { Fire: '🔥', Earth: '🌍', Air: '🌬️', Water: '💧' };

// ─── HELPER: Determine western zodiac from DOB ─────────────────
function getZodiacIndex(month: number, day: number): number {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 0;
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 1;
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 2;
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 3;
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 4;
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 5;
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 6;
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 7;
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 8;
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 9;
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 10;
  return 11;
}

// ─── SEEDED RANDOM for deterministic daily forecasts ───────────
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function getDaySeed(dateOffset = 0): number {
  const d = new Date();
  d.setDate(d.getDate() + dateOffset);
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

// ─── FORECAST GENERATION ENGINE ────────────────────────────────
interface DayForecast {
  overallScore: number;
  love: number;
  career: number;
  health: number;
  finance: number;
  spiritual: number;
  mood: string;
  luckyTime: string;
  warning: string;
  affirmation: string;
  detailedReading: string;
  careerReading: string;
  loveReading: string;
  healthReading: string;
  financeReading: string;
  spiritualReading: string;
}

function generateForecast(signIndex: number, dateOffset = 0): DayForecast {
  const seed = getDaySeed(dateOffset) + signIndex * 137;
  const rng = seededRandom(seed);

  const scores = {
    love: Math.floor(rng() * 35) + 65,
    career: Math.floor(rng() * 35) + 65,
    health: Math.floor(rng() * 30) + 70,
    finance: Math.floor(rng() * 35) + 65,
    spiritual: Math.floor(rng() * 30) + 70,
  };
  const overall = Math.round((scores.love + scores.career + scores.health + scores.finance + scores.spiritual) / 5);

  const moods = ['Energized & Driven', 'Calm & Reflective', 'Creative & Inspired', 'Ambitious & Focused', 'Romantic & Tender', 'Restless but Productive', 'Harmonious & Balanced', 'Introspective & Wise', 'Charged & Dynamic', 'Grounded & Stable'];
  const luckyTimes = ['6:00 AM – 8:00 AM', '9:00 AM – 11:00 AM', '11:00 AM – 1:00 PM', '2:00 PM – 4:00 PM', '4:00 PM – 6:00 PM', '7:00 PM – 9:00 PM', '10:00 PM – 12:00 AM'];
  const warnings = [
    'Avoid impulsive financial decisions today.',
    'Communication misunderstandings possible — double-check messages.',
    'Take breaks to avoid burnout. Pace yourself.',
    "Don't let others' opinions shake your confidence.",
    'Be mindful of your health — hydrate and rest well.',
    'Avoid confrontation; diplomacy wins today.',
    "Don't rush major commitments or sign binding agreements.",
    'Watch out for energy vampires — protect your peace.',
  ];

  const sign = ZODIAC_SIGNS[signIndex];

  const detailedReadings = [
    `The cosmic alignment brings ${sign.element === 'Fire' ? 'fiery ambition' : sign.element === 'Water' ? 'deep emotional clarity' : sign.element === 'Air' ? 'intellectual breakthroughs' : 'practical grounding'} to your day. Your ruling planet ${sign.ruler} is ${rng() > 0.5 ? 'harmoniously aspecting the Moon' : 'forming a trine with Jupiter'}, amplifying your natural talents. This is an excellent day to ${rng() > 0.5 ? 'pursue creative ventures and express yourself boldly' : 'tackle complex problems that require analytical thinking'}. Trust your intuition — the universe is guiding you toward alignment with your highest purpose.`,
    `Today's planetary transits create a powerful ${rng() > 0.5 ? 'sextile' : 'conjunction'} between ${sign.ruler} and the current Moon, activating your ${sign.modality === 'Cardinal' ? 'leadership abilities' : sign.modality === 'Fixed' ? 'determination and persistence' : 'adaptability and versatility'}. The ${sign.element} energy coursing through the celestial grid is particularly strong, making this an ideal moment to ${rng() > 0.5 ? 'initiate new projects' : 'deepen existing commitments'}. Pay attention to synchronicities and signs from the universe — they are more potent now than usual.`,
    `With ${sign.ruler} ${rng() > 0.5 ? 'progressing through a supportive sign' : 'receiving beneficial aspects from Venus'}, your ${sign.traits[0].toLowerCase()} nature finds its fullest expression today. The Moon's transit through ${ZODIAC_SIGNS[Math.floor(rng() * 12)].name} brings ${rng() > 0.5 ? 'emotional wisdom and self-awareness' : 'creative inspiration and social magnetism'}. Consider using this powerful cosmic energy to ${rng() > 0.5 ? 'manifest your deepest desires through focused intention' : 'strengthen bonds with those who truly matter'}. Your energy field is radiant — others will naturally gravitate toward you.`,
  ];

  const careerReadings = [
    `Professional prospects are ${scores.career >= 85 ? 'exceptionally strong' : scores.career >= 75 ? 'promising and dynamic' : 'steady with growth potential'} today. ${sign.ruler}'s influence encourages ${rng() > 0.5 ? 'bold strategic moves and taking calculated risks' : 'methodical progress and attention to detail'}. ${scores.career >= 80 ? 'A significant opportunity may present itself — be ready to seize it' : 'Focus on building foundations rather than chasing quick wins'}. Collaboration with ${ZODIAC_SIGNS[Math.floor(rng() * 12)].name} individuals could prove particularly rewarding.`,
    `The workplace energy favors ${rng() > 0.5 ? 'independent projects and solo initiatives' : 'teamwork and collaborative brainstorming'}. Your ${sign.traits[1].toLowerCase()} approach will be especially valued by colleagues and superiors. ${scores.career >= 80 ? 'Recognition or advancement may be on the horizon' : 'Patience is key — lay groundwork now for future success'}. Financial negotiations are ${rng() > 0.5 ? 'favored' : 'best postponed to a more auspicious time'}.`,
  ];

  const loveReadings = [
    `Romance is ${scores.love >= 85 ? 'electrifying' : scores.love >= 75 ? 'warmly harmonious' : 'gently stirring'} under today's Venus-${sign.ruler} aspect. ${rng() > 0.5 ? 'Single natives may encounter a magnetic connection through unexpected channels' : 'Partnered individuals will find deeper emotional resonance through honest conversation'}. Your ${sign.element === 'Water' ? 'emotional depth' : sign.element === 'Fire' ? 'passionate energy' : sign.element === 'Air' ? 'intellectual charm' : 'grounded warmth'} makes you particularly attractive today. ${scores.love >= 80 ? 'Express your feelings openly — vulnerability is your superpower right now.' : 'Focus on self-love and personal boundaries — they strengthen all relationships.'}`,
    `The cosmic love matrix highlights ${rng() > 0.5 ? 'deep soul connections' : 'playful, lighthearted attractions'} for ${sign.name} today. ${scores.love >= 85 ? 'A meaningful romantic development is likely — stay open to the unexpected' : 'Existing bonds strengthen through shared experiences and mutual understanding'}. The Moon's influence brings ${rng() > 0.5 ? 'tenderness and emotional awareness' : 'passion and desire for closeness'}. Best compatibility today: ${ZODIAC_SIGNS[Math.floor(rng() * 12)].name} and ${ZODIAC_SIGNS[Math.floor(rng() * 12)].name}.`,
  ];

  const healthReadings = [
    `Physical vitality is ${scores.health >= 85 ? 'at peak levels' : scores.health >= 75 ? 'strong and resilient' : 'requiring mindful attention'}. The ${sign.element} element governs your ${sign.element === 'Fire' ? 'metabolism and muscular energy' : sign.element === 'Water' ? 'lymphatic system and emotional wellness' : sign.element === 'Air' ? 'respiratory and nervous system' : 'digestive system and bone health'}. ${scores.health >= 80 ? 'This is an excellent day for challenging workouts and pushing physical boundaries.' : 'Prioritize rest, hydration, and gentle movement like yoga or walking.'} Mental health benefits from ${rng() > 0.5 ? 'meditation and breathwork' : 'creative expression and social connection'}.`,
  ];

  const financeReadings = [
    `Financial energies are ${scores.finance >= 85 ? 'highly favorable for growth' : scores.finance >= 75 ? 'stable with cautious optimism' : 'better suited for conservation'}. ${sign.ruler}'s position suggests ${rng() > 0.5 ? 'unexpected financial opportunities through networking or side ventures' : 'steady gains through disciplined saving and smart investments'}. ${scores.finance >= 80 ? 'Consider exploring new income streams or investment opportunities.' : 'Avoid major purchases and risky financial moves today.'} Lucky financial window: ${luckyTimes[Math.floor(rng() * luckyTimes.length)]}.`,
  ];

  const spiritualReadings = [
    `Spiritual awareness is ${scores.spiritual >= 85 ? 'profoundly heightened' : scores.spiritual >= 75 ? 'comfortably open' : 'gently awakening'}. ${rng() > 0.5 ? 'Meditation and contemplation will yield deep insights about your soul path' : 'Connecting with nature will recharge your spiritual batteries'}. Your ${sign.modality} ${sign.element} nature aligns with ${rng() > 0.5 ? 'mantras and affirmations' : 'visualization and journaling'} as today's most powerful spiritual practice. ${scores.spiritual >= 80 ? 'Trust your psychic impressions — they carry genuine wisdom.' : 'Simplify your practice — stillness reveals more than effort.'}`,
  ];

  const affirmations = [
    `I am a radiant ${sign.name} soul, aligned with the cosmic flow of abundance and purpose.`,
    `The universe supports my ${sign.traits[0].toLowerCase()} nature. I trust my path and embrace growth.`,
    `I attract love, prosperity, and wellness effortlessly. My ${sign.element} energy illuminates all I touch.`,
    `Today, I choose courage over fear. My ${sign.ruler} guides me toward my highest potential.`,
    `I release all that no longer serves me. I am powerful, worthy, and cosmically protected.`,
  ];

  return {
    overallScore: overall,
    love: scores.love,
    career: scores.career,
    health: scores.health,
    finance: scores.finance,
    spiritual: scores.spiritual,
    mood: moods[Math.floor(rng() * moods.length)],
    luckyTime: luckyTimes[Math.floor(rng() * luckyTimes.length)],
    warning: warnings[Math.floor(rng() * warnings.length)],
    affirmation: affirmations[Math.floor(rng() * affirmations.length)],
    detailedReading: detailedReadings[Math.floor(rng() * detailedReadings.length)],
    careerReading: careerReadings[Math.floor(rng() * careerReadings.length)],
    loveReading: loveReadings[Math.floor(rng() * loveReadings.length)],
    healthReading: healthReadings[Math.floor(rng() * healthReadings.length)],
    financeReading: financeReadings[Math.floor(rng() * financeReadings.length)],
    spiritualReading: spiritualReadings[Math.floor(rng() * spiritualReadings.length)],
  };
}

// ─── ASPECT CALCULATION ───────────────────────────────────────────
interface PlanetaryAspect {
  planet1: string;
  planet2: string;
  aspectType: string;
  angle: number;
  orb: number;
  nature: 'Harmonious' | 'Challenging' | 'Dynamic';
  effect: string;
  color: string;
}

function calculateAspects(positions: ReturnType<typeof calculatePlanetaryPositions>): PlanetaryAspect[] {
  const aspectDefs = [
    { name: 'Conjunction', angle: 0, orb: 8, nature: 'Dynamic' as const },
    { name: 'Sextile', angle: 60, orb: 6, nature: 'Harmonious' as const },
    { name: 'Square', angle: 90, orb: 7, nature: 'Challenging' as const },
    { name: 'Trine', angle: 120, orb: 8, nature: 'Harmonious' as const },
    { name: 'Opposition', angle: 180, orb: 8, nature: 'Challenging' as const },
  ];

  const effects: Record<string, string[]> = {
    Conjunction: ['Intensified energy fusion', 'Merged planetary powers', 'Concentrated focus point'],
    Sextile: ['Gentle opportunity flow', 'Creative synergy activation', 'Harmonious skill blending'],
    Square: ['Growth through tension', 'Motivating friction', 'Breakthrough catalyst'],
    Trine: ['Natural talent amplification', 'Effortless grace period', 'Blessed cosmic flow'],
    Opposition: ['Balancing polarities', 'Partnership awareness', 'Integration challenge'],
  };

  const colors: Record<string, string> = {
    Conjunction: 'text-amber-400', Sextile: 'text-cyan-400', Square: 'text-red-400',
    Trine: 'text-emerald-400', Opposition: 'text-purple-400',
  };

  const aspects: PlanetaryAspect[] = [];

  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const diff = Math.abs(positions[i].degreeDecimal - positions[j].degreeDecimal);
      const angle = Math.min(diff, 360 - diff);

      for (const def of aspectDefs) {
        const orb = Math.abs(angle - def.angle);
        if (orb <= def.orb) {
          const effectList = effects[def.name] || ['Cosmic influence'];
          aspects.push({
            planet1: positions[i].name,
            planet2: positions[j].name,
            aspectType: def.name,
            angle: Math.round(angle * 10) / 10,
            orb: Math.round(orb * 10) / 10,
            nature: def.nature,
            effect: effectList[Math.floor(Math.abs(positions[i].degreeDecimal + positions[j].degreeDecimal) % effectList.length)],
            color: colors[def.name] || 'text-white',
          });
          break;
        }
      }
    }
  }

  return aspects.sort((a, b) => a.orb - b.orb).slice(0, 8);
}

// ─── SCORE RING SVG COMPONENT ─────────────────────────────────
function ScoreRing({ score, size = 80, strokeWidth = 6, color = '#7C3AED', label = '' }: {
  score: number; size?: number; strokeWidth?: number; color?: string; label?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="font-bold text-white"
          style={{ fontSize: size > 70 ? '1.25rem' : '0.875rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {score}%
        </motion.span>
        {label && <span className="text-[9px] text-slate-400 mt-0.5">{label}</span>}
      </div>
    </div>
  );
}

// ─── ZODIAC WHEEL SVG ─────────────────────────────────────────
function ZodiacWheel({ activeIndex, onSelect }: { activeIndex: number; onSelect: (i: number) => void }) {
  const size = 320;
  const center = size / 2;
  const outerR = 148;
  const innerR = 105;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-2xl">
        {/* Outer glow ring */}
        <circle cx={center} cy={center} r={outerR + 6} fill="none" stroke="url(#wheelGlow)" strokeWidth="2" opacity="0.4" />
        {/* Background ring */}
        <circle cx={center} cy={center} r={outerR} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={outerR - innerR} />

        {ZODIAC_SIGNS.map((sign, i) => {
          const startAngle = (i * 30 - 90) * (Math.PI / 180);
          const endAngle = ((i + 1) * 30 - 90) * (Math.PI / 180);
          const midAngle = ((i + 0.5) * 30 - 90) * (Math.PI / 180);
          const isActive = i === activeIndex;

          const x1 = center + outerR * Math.cos(startAngle);
          const y1 = center + outerR * Math.sin(startAngle);
          const x2 = center + outerR * Math.cos(endAngle);
          const y2 = center + outerR * Math.sin(endAngle);
          const x3 = center + innerR * Math.cos(endAngle);
          const y3 = center + innerR * Math.sin(endAngle);
          const x4 = center + innerR * Math.cos(startAngle);
          const y4 = center + innerR * Math.sin(startAngle);

          const labelR = (outerR + innerR) / 2;
          const lx = center + labelR * Math.cos(midAngle);
          const ly = center + labelR * Math.sin(midAngle);

          return (
            <g key={i} onClick={() => onSelect(i)} className="cursor-pointer">
              <path
                d={`M ${x1} ${y1} A ${outerR} ${outerR} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 0 0 ${x4} ${y4} Z`}
                fill={isActive ? 'rgba(124, 58, 237, 0.35)' : 'rgba(255,255,255,0.03)'}
                stroke={isActive ? '#7C3AED' : 'rgba(255,255,255,0.1)'}
                strokeWidth={isActive ? 2 : 0.5}
                className="transition-all duration-300 hover:fill-[rgba(124,58,237,0.2)]"
              />
              <text x={lx} y={ly}
                textAnchor="middle" dominantBaseline="central"
                fill={isActive ? '#E9D5FF' : '#94A3B8'}
                fontSize={isActive ? 18 : 15}
                className="font-bold pointer-events-none transition-all"
              >
                {sign.symbol}
              </text>
            </g>
          );
        })}

        {/* Center core */}
        <circle cx={center} cy={center} r={innerR - 8} fill="url(#centerGrad)" stroke="rgba(124,58,237,0.3)" strokeWidth="1.5" />
        <text x={center} y={center - 14} textAnchor="middle" fill="#F8FAFC" fontSize="22" className="font-bold">
          {ZODIAC_SIGNS[activeIndex].symbol}
        </text>
        <text x={center} y={center + 6} textAnchor="middle" fill="#CBD5E1" fontSize="11" className="font-semibold">
          {ZODIAC_SIGNS[activeIndex].name}
        </text>
        <text x={center} y={center + 22} textAnchor="middle" fill="#64748B" fontSize="8">
          {ZODIAC_SIGNS[activeIndex].dates}
        </text>

        <defs>
          <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(124,58,237,0.2)" />
            <stop offset="100%" stopColor="rgba(11,18,32,0.95)" />
          </radialGradient>
          <linearGradient id="wheelGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────
export default function PremiumHoroscopeEngine({ userProfile }: PremiumHoroscopeEngineProps) {
  const dobDate = userProfile?.dob ? new Date(userProfile.dob) : new Date(1998, 5, 15);
  const userSignIndex = getZodiacIndex(dobDate.getMonth() + 1, dobDate.getDate());

  const [selectedSignIndex, setSelectedSignIndex] = useState(userSignIndex);
  const [timeframe, setTimeframe] = useState<'today' | 'tomorrow' | 'week' | 'month'>('today');
  const [expandedSection, setExpandedSection] = useState<string | null>('overview');
  const [showAllSigns, setShowAllSigns] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const selectedSign = ZODIAC_SIGNS[selectedSignIndex];

  // Compute forecasts
  const dateOffset = timeframe === 'tomorrow' ? 1 : 0;
  const forecast = useMemo(() => generateForecast(selectedSignIndex, dateOffset), [selectedSignIndex, dateOffset, refreshKey]);

  // Weekly forecast array
  const weeklyForecasts = useMemo(() =>
    Array.from({ length: 7 }, (_, i) => ({
      day: new Date(Date.now() + i * 86400000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      ...generateForecast(selectedSignIndex, i),
    })),
    [selectedSignIndex, refreshKey]
  );

  // Planetary positions & transits
  const currentPositions = useMemo(() => calculatePlanetaryPositions(), [refreshKey]);
  const natalPositions = useMemo(
    () => calculatePlanetaryPositions(userProfile?.dob, userProfile?.time),
    [userProfile?.dob, userProfile?.time, refreshKey]
  );

  // Planetary aspects
  const aspects = useMemo(() => calculateAspects(currentPositions), [currentPositions]);

  // Panchang
  const panchang = useMemo(() => calculatePanchang(), [refreshKey]);

  // Dasha
  const dasha = useMemo(() => {
    const moonPos = natalPositions.find(p => p.name === 'Moon');
    const nakshatraIdx = moonPos ? Math.floor(moonPos.degreeDecimal / (360 / 27)) : 3;
    return calculateVimshottariDasha(nakshatraIdx, userProfile?.dob);
  }, [natalPositions, userProfile?.dob]);

  const timeframeLabel = timeframe === 'today' ? "Today's" : timeframe === 'tomorrow' ? "Tomorrow's" : timeframe === 'week' ? "This Week's" : "This Month's";

  // Life domain sections
  const lifeDomains = [
    { id: 'overview', icon: <Sparkles className="w-4 h-4" />, label: 'Overview', color: '#7C3AED' },
    { id: 'love', icon: <Heart className="w-4 h-4" />, label: 'Love & Relationships', color: '#EC4899' },
    { id: 'career', icon: <Briefcase className="w-4 h-4" />, label: 'Career & Finance', color: '#F59E0B' },
    { id: 'health', icon: <HeartPulse className="w-4 h-4" />, label: 'Health & Wellness', color: '#22C55E' },
    { id: 'spiritual', icon: <Eye className="w-4 h-4" />, label: 'Spiritual & Growth', color: '#06B6D4' },
    { id: 'transits', icon: <Orbit className="w-4 h-4" />, label: 'Transits & Aspects', color: '#8B5CF6' },
    { id: 'panchang', icon: <Moon className="w-4 h-4" />, label: 'Vedic Panchang', color: '#CBD5E1' },
  ];

  const scoreColor = (s: number) => s >= 85 ? '#22C55E' : s >= 70 ? '#F59E0B' : '#EF4444';
  const scoreLabel = (s: number) => s >= 90 ? 'Excellent' : s >= 80 ? 'Very Good' : s >= 70 ? 'Good' : s >= 60 ? 'Fair' : 'Challenging';

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 pb-28">
      {/* ═══ HEADER ═══ */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl glass-card border border-white/10 p-6 md:p-8"
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br ${selectedSign.color} opacity-10 rounded-full blur-3xl`} />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-gradient-to-br from-indigo-600 to-purple-700 opacity-8 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
          {/* Zodiac Wheel (Desktop) */}
          <div className="hidden lg:block shrink-0">
            <ZodiacWheel activeIndex={selectedSignIndex} onSelect={setSelectedSignIndex} />
          </div>

          {/* Main Info */}
          <div className="flex-1 text-center lg:text-left space-y-4 w-full">
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-indigo-400">
                <Sun className="w-5 h-5" />
                <span className="text-xs font-semibold tracking-wider uppercase">Premium Horoscope Engine</span>
              </div>
              <button
                onClick={() => { setRefreshKey(k => k + 1); }}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Refresh
              </button>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {timeframeLabel}{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
                {selectedSign.name} Horoscope
              </span>
              <span className="ml-2 text-3xl">{selectedSign.symbol}</span>
            </h1>

            <p className="text-sm text-slate-400 max-w-2xl">
              {selectedSign.dates} · {ELEMENT_ICONS[selectedSign.element]} {selectedSign.element} · {selectedSign.modality} · Ruled by {selectedSign.ruler} {selectedSign.rulerSymbol}
              {selectedSignIndex === userSignIndex && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30">
                  YOUR SIGN
                </span>
              )}
            </p>

            {/* Timeframe Selector */}
            <div className="flex flex-wrap items-center gap-2 justify-center lg:justify-start">
              {(['today', 'tomorrow', 'week', 'month'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    timeframe === t
                      ? 'bg-indigo-500/25 text-white border border-indigo-500/40 shadow-sm shadow-indigo-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>

            {/* Mini Scores Row */}
            <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start pt-2">
              {[
                { label: 'Overall', score: forecast.overallScore, icon: <Star className="w-3.5 h-3.5" /> },
                { label: 'Love', score: forecast.love, icon: <Heart className="w-3.5 h-3.5" /> },
                { label: 'Career', score: forecast.career, icon: <Briefcase className="w-3.5 h-3.5" /> },
                { label: 'Health', score: forecast.health, icon: <HeartPulse className="w-3.5 h-3.5" /> },
                { label: 'Finance', score: forecast.finance, icon: <Wallet className="w-3.5 h-3.5" /> },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5">
                  <span style={{ color: scoreColor(item.score) }}>{item.icon}</span>
                  <span className="text-[10px] text-slate-400">{item.label}</span>
                  <span className="text-xs font-bold" style={{ color: scoreColor(item.score) }}>{item.score}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Overall Score Ring (Desktop) */}
          <div className="hidden md:flex flex-col items-center gap-2 shrink-0">
            <ScoreRing score={forecast.overallScore} size={110} strokeWidth={8} color={scoreColor(forecast.overallScore)} label="COSMIC" />
            <span className="text-xs font-bold" style={{ color: scoreColor(forecast.overallScore) }}>
              {scoreLabel(forecast.overallScore)}
            </span>
          </div>
        </div>

        {/* Mobile Zodiac Selector */}
        <div className="lg:hidden mt-6 flex flex-wrap items-center justify-center gap-2">
          {ZODIAC_SIGNS.map((sign, i) => (
            <button
              key={i}
              onClick={() => setSelectedSignIndex(i)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all ${
                selectedSignIndex === i
                  ? 'bg-indigo-500/30 border-2 border-indigo-400 shadow-md shadow-indigo-500/20 scale-110'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              } ${i === userSignIndex && selectedSignIndex !== i ? 'ring-1 ring-amber-500/40' : ''}`}
              title={sign.name}
            >
              {sign.symbol}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ═══ DOMAIN NAVIGATION ═══ */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 glass-card rounded-2xl">
        {lifeDomains.map(d => (
          <button
            key={d.id}
            onClick={() => setExpandedSection(expandedSection === d.id ? null : d.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              expandedSection === d.id
                ? 'text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
            style={expandedSection === d.id ? { backgroundColor: `${d.color}20`, borderColor: `${d.color}40`, border: `1px solid ${d.color}40` } : {}}
          >
            <span style={{ color: expandedSection === d.id ? d.color : undefined }}>{d.icon}</span>
            <span className="hidden sm:inline">{d.label}</span>
          </button>
        ))}
      </div>

      {/* ═══ CONTENT SECTIONS ═══ */}
      <AnimatePresence mode="wait">
        {/* ── OVERVIEW ── */}
        {expandedSection === 'overview' && (
          <motion.div key="overview" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-6">
            {/* Main Reading Card */}
            <div className="glass-card rounded-3xl border border-white/10 p-6 md:p-8 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{timeframeLabel} Cosmic Reading</h2>
                  <p className="text-xs text-slate-400">Personalized for {selectedSign.name} {selectedSign.symbol}</p>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{forecast.detailedReading}</p>

              {/* Mood & Lucky Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Mood', value: forecast.mood, icon: <Brain className="w-4 h-4 text-purple-400" /> },
                  { label: 'Lucky Time', value: forecast.luckyTime, icon: <Clock className="w-4 h-4 text-cyan-400" /> },
                  { label: 'Lucky Number', value: selectedSign.lucky.number.toString(), icon: <Zap className="w-4 h-4 text-amber-400" /> },
                  { label: 'Lucky Color', value: selectedSign.lucky.color, icon: <Gem className="w-4 h-4 text-pink-400" /> },
                ].map(item => (
                  <div key={item.label} className="p-3 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-2 mb-1">
                      {item.icon}
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{item.label}</span>
                    </div>
                    <p className="text-sm font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Warning */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
                <Shield className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-0.5">Cosmic Advisory</p>
                  <p className="text-xs text-amber-200/80">{forecast.warning}</p>
                </div>
              </div>

              {/* Affirmation */}
              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1 flex items-center gap-2">
                  <Crown className="w-4 h-4" /> Daily Affirmation
                </p>
                <p className="text-sm text-indigo-200 italic">"{forecast.affirmation}"</p>
              </div>
            </div>

            {/* Score Breakdown Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: 'Love', score: forecast.love, color: '#EC4899', icon: <Heart className="w-5 h-5" /> },
                { label: 'Career', score: forecast.career, color: '#F59E0B', icon: <Briefcase className="w-5 h-5" /> },
                { label: 'Health', score: forecast.health, color: '#22C55E', icon: <HeartPulse className="w-5 h-5" /> },
                { label: 'Finance', score: forecast.finance, color: '#3B82F6', icon: <Wallet className="w-5 h-5" /> },
                { label: 'Spiritual', score: forecast.spiritual, color: '#8B5CF6', icon: <Eye className="w-5 h-5" /> },
              ].map(item => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.03 }}
                  className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col items-center gap-3 text-center"
                >
                  <ScoreRing score={item.score} size={70} strokeWidth={5} color={item.color} />
                  <div className="flex items-center gap-1.5" style={{ color: item.color }}>
                    {item.icon}
                    <span className="text-xs font-bold">{item.label}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{scoreLabel(item.score)}</span>
                </motion.div>
              ))}
            </div>

            {/* Sign Info Card */}
            <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-400" />
                {selectedSign.name} Profile
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Element', value: `${ELEMENT_ICONS[selectedSign.element]} ${selectedSign.element}` },
                  { label: 'Modality', value: selectedSign.modality },
                  { label: 'Ruler', value: `${selectedSign.ruler} ${selectedSign.rulerSymbol}` },
                  { label: 'Lucky Day', value: selectedSign.lucky.day },
                  { label: 'Lucky Stone', value: selectedSign.lucky.stone },
                  { label: 'Key Traits', value: selectedSign.traits.join(', ') },
                  { label: 'Dates', value: selectedSign.dates },
                  { label: 'Lucky Number', value: selectedSign.lucky.number.toString() },
                ].map(item => (
                  <div key={item.label} className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{item.label}</p>
                    <p className="text-sm font-semibold text-white mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Outlook Mini */}
            {(timeframe === 'week' || timeframe === 'month') && (
              <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  7-Day Cosmic Outlook
                </h3>
                <div className="grid grid-cols-7 gap-2">
                  {weeklyForecasts.map((wf, i) => (
                    <div key={i} className={`p-3 rounded-xl text-center border transition-all ${i === 0 ? 'bg-indigo-500/15 border-indigo-500/30' : 'bg-white/5 border-white/5'}`}>
                      <p className="text-[9px] text-slate-400 font-semibold">{wf.day.split(',')[0]}</p>
                      <p className="text-lg font-bold mt-1" style={{ color: scoreColor(wf.overallScore) }}>{wf.overallScore}</p>
                      <div className="w-full h-1 rounded-full bg-white/10 mt-1.5">
                        <div className="h-full rounded-full transition-all" style={{ width: `${wf.overallScore}%`, backgroundColor: scoreColor(wf.overallScore) }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ── LOVE & RELATIONSHIPS ── */}
        {expandedSection === 'love' && (
          <motion.div key="love" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-6">
            <div className="glass-card rounded-3xl border border-pink-500/20 p-6 md:p-8 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Love & Relationship Forecast</h2>
                    <p className="text-xs text-slate-400">{selectedSign.name} {selectedSign.symbol} · {timeframeLabel} Reading</p>
                  </div>
                </div>
                <ScoreRing score={forecast.love} size={65} strokeWidth={5} color="#EC4899" label="LOVE" />
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">{forecast.loveReading}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-pink-500/10 border border-pink-500/15 space-y-2">
                  <p className="text-xs font-bold text-pink-300 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5" /> Romance Energy
                  </p>
                  <div className="w-full h-2 rounded-full bg-white/10">
                    <motion.div className="h-full rounded-full bg-pink-500" initial={{ width: 0 }} animate={{ width: `${forecast.love}%` }} transition={{ duration: 1 }} />
                  </div>
                  <p className="text-[10px] text-slate-400">{forecast.love >= 80 ? 'Magnetic attraction energy is high' : 'Gentle energy — focus on emotional depth'}</p>
                </div>
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/15 space-y-2">
                  <p className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Compatibility Boost
                  </p>
                  <p className="text-sm font-semibold text-white">
                    Best with: {ZODIAC_SIGNS[(selectedSignIndex + 4) % 12].name} {ZODIAC_SIGNS[(selectedSignIndex + 4) % 12].symbol}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Also harmonious: {ZODIAC_SIGNS[(selectedSignIndex + 8) % 12].name} {ZODIAC_SIGNS[(selectedSignIndex + 8) % 12].symbol}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/15 space-y-2">
                  <p className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5" /> Love Advice
                  </p>
                  <p className="text-xs text-slate-300">
                    {forecast.love >= 85 ? 'Express your feelings boldly — the cosmos supports vulnerability.' :
                     forecast.love >= 70 ? 'Patience and understanding strengthen your bonds today.' :
                     'Focus on self-love. The right connections will follow.'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── CAREER & FINANCE ── */}
        {expandedSection === 'career' && (
          <motion.div key="career" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-6">
            <div className="glass-card rounded-3xl border border-amber-500/20 p-6 md:p-8 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Career & Finance Forecast</h2>
                    <p className="text-xs text-slate-400">{selectedSign.name} {selectedSign.symbol} · {timeframeLabel} Reading</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <ScoreRing score={forecast.career} size={55} strokeWidth={4} color="#F59E0B" label="CAREER" />
                  <ScoreRing score={forecast.finance} size={55} strokeWidth={4} color="#3B82F6" label="FINANCE" />
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">{forecast.careerReading}</p>
              <p className="text-sm text-slate-300 leading-relaxed">{forecast.financeReading}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Career Score', value: `${forecast.career}%`, trend: forecast.career >= 80, color: '#F59E0B' },
                  { label: 'Finance Score', value: `${forecast.finance}%`, trend: forecast.finance >= 80, color: '#3B82F6' },
                  { label: 'Best Sector', value: selectedSign.element === 'Fire' ? 'Leadership' : selectedSign.element === 'Earth' ? 'Finance' : selectedSign.element === 'Air' ? 'Tech/Media' : 'Creative Arts', trend: true, color: '#7C3AED' },
                  { label: 'Money Flow', value: forecast.finance >= 80 ? 'Inflow ↑' : 'Steady →', trend: forecast.finance >= 80, color: '#22C55E' },
                ].map(item => (
                  <div key={item.label} className="p-3 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{item.label}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-sm font-bold" style={{ color: item.color }}>{item.value}</span>
                      {item.trend ? <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" /> : <ArrowDownRight className="w-3.5 h-3.5 text-amber-400" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── HEALTH ── */}
        {expandedSection === 'health' && (
          <motion.div key="health" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-6">
            <div className="glass-card rounded-3xl border border-emerald-500/20 p-6 md:p-8 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                    <HeartPulse className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Health & Wellness Forecast</h2>
                    <p className="text-xs text-slate-400">{selectedSign.name} {selectedSign.symbol} · {timeframeLabel} Reading</p>
                  </div>
                </div>
                <ScoreRing score={forecast.health} size={65} strokeWidth={5} color="#22C55E" label="HEALTH" />
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">{forecast.healthReading}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/15">
                  <p className="text-xs font-bold text-emerald-300 mb-2">🧘 Recommended Practice</p>
                  <p className="text-xs text-slate-300">
                    {selectedSign.element === 'Fire' ? 'High-intensity interval training or martial arts. Channel your fire energy.' :
                     selectedSign.element === 'Earth' ? 'Hiking, yoga, or weight training. Connect with earth grounding energy.' :
                     selectedSign.element === 'Air' ? 'Breathwork, swimming, or dancing. Let air energy move through you.' :
                     'Meditation, hydrotherapy, or gentle stretching. Honor your water nature.'}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/15">
                  <p className="text-xs font-bold text-green-300 mb-2">🍃 Nutrition Tip</p>
                  <p className="text-xs text-slate-300">
                    {selectedSign.element === 'Fire' ? 'Cooling foods: cucumbers, melons, mint tea. Balance your internal heat.' :
                     selectedSign.element === 'Earth' ? 'Light, warm foods: soups, steamed vegetables. Support digestion.' :
                     selectedSign.element === 'Air' ? 'Grounding foods: root vegetables, nuts, whole grains. Stabilize scattered energy.' :
                     'Warming spices: ginger, turmeric, cinnamon. Counter excess moisture.'}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/15">
                  <p className="text-xs font-bold text-teal-300 mb-2">💤 Rest & Recovery</p>
                  <p className="text-xs text-slate-300">
                    Optimal sleep window: {forecast.health >= 80 ? '10:30 PM – 6:30 AM' : '10:00 PM – 7:00 AM'}.
                    {forecast.health < 75 ? ' Extra rest needed — listen to your body today.' : ' Your vitality supports active recovery.'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── SPIRITUAL ── */}
        {expandedSection === 'spiritual' && (
          <motion.div key="spiritual" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-6">
            <div className="glass-card rounded-3xl border border-cyan-500/20 p-6 md:p-8 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Spiritual & Growth Forecast</h2>
                    <p className="text-xs text-slate-400">{selectedSign.name} {selectedSign.symbol} · {timeframeLabel} Reading</p>
                  </div>
                </div>
                <ScoreRing score={forecast.spiritual} size={65} strokeWidth={5} color="#06B6D4" label="SPIRIT" />
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">{forecast.spiritualReading}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/15 space-y-3">
                  <p className="text-xs font-bold text-indigo-300 flex items-center gap-2">
                    <Crown className="w-4 h-4" /> Mantra of the Day
                  </p>
                  <p className="text-base font-semibold text-white italic">
                    {selectedSign.element === 'Fire' ? '"Om Suryaya Namaha" — Salutations to the Solar Force' :
                     selectedSign.element === 'Earth' ? '"Om Bhu Devi Namaha" — Salutations to Earth Mother' :
                     selectedSign.element === 'Air' ? '"Om Vayave Namaha" — Salutations to the Wind God' :
                     '"Om Varunaya Namaha" — Salutations to the Water Lord'}
                  </p>
                  <p className="text-[10px] text-slate-400">Chant 108 times during {forecast.luckyTime} for maximum effect.</p>
                </div>
                <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/15 space-y-3">
                  <p className="text-xs font-bold text-purple-300 flex items-center gap-2">
                    <Gem className="w-4 h-4" /> Crystal & Gemstone
                  </p>
                  <p className="text-base font-semibold text-white">
                    {selectedSign.lucky.stone}
                  </p>
                  <p className="text-xs text-slate-300">
                    Wear or carry {selectedSign.lucky.stone} to amplify {selectedSign.name}'s {selectedSign.traits[0].toLowerCase()} energy.
                    Best worn on {selectedSign.lucky.day} for enhanced planetary connection.
                  </p>
                </div>
              </div>

              {/* Dasha Info */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <p className="text-xs font-bold text-amber-300 flex items-center gap-2 uppercase tracking-wider">
                  <Activity className="w-4 h-4" /> Vimshottari Dasha Period
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <p className="text-[10px] text-slate-400">Mahadasha</p>
                    <p className="text-sm font-bold text-white">{dasha.mahadasha}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400">Antardasha</p>
                    <p className="text-sm font-bold text-white">{dasha.antardasha}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400">Progress</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-white/10">
                        <motion.div className="h-full rounded-full bg-amber-500" initial={{ width: 0 }} animate={{ width: `${dasha.progressPercent}%` }} />
                      </div>
                      <span className="text-xs font-bold text-amber-400">{dasha.progressPercent}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400">Period</p>
                    <p className="text-xs text-slate-300">{dasha.startDate} → {dasha.endDate}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 pt-2 border-t border-white/5">{dasha.interpretation}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── TRANSITS & ASPECTS ── */}
        {expandedSection === 'transits' && (
          <motion.div key="transits" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-6">
            {/* Current Planetary Transits */}
            <div className="glass-card rounded-3xl border border-purple-500/20 p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Orbit className="w-5 h-5 text-purple-400" />
                Live Planetary Transits
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 ml-2">LIVE</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {currentPositions.map((planet, idx) => (
                  <motion.div
                    key={planet.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`p-4 rounded-2xl bg-white/5 border ${planet.border} space-y-2`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-lg ${planet.color}`}>{planet.symbol}</span>
                        <span className="text-sm font-bold text-white">{planet.name}</span>
                      </div>
                      {planet.retrograde && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">℞ Rx</span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-slate-400">Sign:</span>
                        <span className="text-slate-200 ml-1 font-medium">{planet.sign}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Degree:</span>
                        <span className="text-slate-200 ml-1 font-mono">{planet.degree}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">House:</span>
                        <span className="text-slate-200 ml-1">{planet.house}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Nakshatra:</span>
                        <span className="text-slate-200 ml-1">{planet.nakshatra}</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 border-t border-white/5 pt-1.5">{planet.strength}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Planetary Aspects */}
            <div className="glass-card rounded-3xl border border-indigo-500/20 p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-400" />
                Active Planetary Aspects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {aspects.map((asp, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      asp.nature === 'Harmonious' ? 'bg-emerald-500/20' : asp.nature === 'Challenging' ? 'bg-red-500/20' : 'bg-amber-500/20'
                    }`}>
                      {asp.nature === 'Harmonious' ? <TrendingUp className="w-4 h-4 text-emerald-400" /> :
                       asp.nature === 'Challenging' ? <Zap className="w-4 h-4 text-red-400" /> :
                       <Activity className="w-4 h-4 text-amber-400" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-white">{asp.planet1}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                          asp.nature === 'Harmonious' ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300' :
                          asp.nature === 'Challenging' ? 'bg-red-500/15 border-red-500/30 text-red-300' :
                          'bg-amber-500/15 border-amber-500/30 text-amber-300'
                        }`}>{asp.aspectType}</span>
                        <span className="text-sm font-bold text-white">{asp.planet2}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">{asp.angle}° (Orb: {asp.orb}°) · {asp.effect}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── VEDIC PANCHANG ── */}
        {expandedSection === 'panchang' && (
          <motion.div key="panchang" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-6">
            <div className="glass-card rounded-3xl border border-slate-500/20 p-6 md:p-8 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-400 to-blue-500 flex items-center justify-center">
                  <Moon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Vedic Panchang</h2>
                  <p className="text-xs text-slate-400">Today's Hindu Calendar & Muhurta</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: 'Tithi', value: panchang.tithi, icon: '🌙' },
                  { label: 'Nakshatra', value: panchang.nakshatra, icon: '⭐' },
                  { label: 'Yoga', value: panchang.yoga, icon: '🧘' },
                  { label: 'Karana', value: panchang.karana, icon: '📐' },
                  { label: 'Moon Phase', value: panchang.moonPhase, icon: '🌓' },
                  { label: 'Moon Illumination', value: `${panchang.moonIllumination}%`, icon: '💡' },
                  { label: 'Sun Sign', value: panchang.sunSign, icon: '☀️' },
                  { label: 'Moon Sign', value: panchang.moonSign, icon: '🌕' },
                  { label: 'Abhijit Muhurta', value: panchang.abhijitMuhurta, icon: '⏰' },
                  { label: 'Rahu Kalam', value: panchang.rahuKalam, icon: '⚠️' },
                ].map(item => (
                  <div key={item.label} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-2 mb-1">
                      <span>{item.icon}</span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{item.label}</span>
                    </div>
                    <p className="text-sm font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Moon Phase Visual */}
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center gap-6">
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-r from-slate-800 to-slate-600 overflow-hidden shrink-0">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-amber-200 to-yellow-100 rounded-full"
                    initial={{ clipPath: 'inset(0 100% 0 0)' }}
                    animate={{ clipPath: `inset(0 ${100 - panchang.moonIllumination}% 0 0)` }}
                    transition={{ duration: 1.5 }}
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{panchang.moonPhase}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {panchang.moonIllumination >= 80 ? 'Full Moon energy — heightened emotions & intuition.' :
                     panchang.moonIllumination >= 50 ? 'Half Moon phase — balance action with reflection.' :
                     panchang.moonIllumination >= 20 ? 'Crescent phase — ideal for new beginnings & planting seeds.' :
                     'New Moon energy — introspection, rest, and setting intentions.'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ ALL SIGNS QUICK VIEW ═══ */}
      <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-4">
        <button
          onClick={() => setShowAllSigns(!showAllSigns)}
          className="w-full flex items-center justify-between"
        >
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-indigo-400" />
            All 12 Zodiac Signs — {timeframeLabel} Scores
          </h3>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${showAllSigns ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {showAllSigns && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-4">
                {ZODIAC_SIGNS.map((sign, i) => {
                  const signForecast = generateForecast(i, dateOffset);
                  const isUserSign = i === userSignIndex;
                  const isSelected = i === selectedSignIndex;
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      onClick={() => setSelectedSignIndex(i)}
                      className={`p-4 rounded-2xl border text-center transition-all ${
                        isSelected ? 'bg-indigo-500/15 border-indigo-500/40 shadow-md shadow-indigo-500/10' :
                        'bg-white/5 border-white/5 hover:border-white/15'
                      }`}
                    >
                      <div className="text-2xl mb-1">{sign.symbol}</div>
                      <p className="text-xs font-bold text-white">{sign.name}</p>
                      <p className="text-[9px] text-slate-400 mt-0.5">{sign.dates}</p>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <div className="w-8 h-1 rounded-full bg-white/10">
                          <div className="h-full rounded-full" style={{ width: `${signForecast.overallScore}%`, backgroundColor: scoreColor(signForecast.overallScore) }} />
                        </div>
                        <span className="text-[10px] font-bold" style={{ color: scoreColor(signForecast.overallScore) }}>
                          {signForecast.overallScore}%
                        </span>
                      </div>
                      {isUserSign && (
                        <span className="inline-block mt-1.5 text-[8px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                          YOU
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══ PDF EXPORT ═══ */}
      <div className="flex justify-center">
        <button
          onClick={() => {
            const htmlContent = `<!DOCTYPE html><html><head><title>${selectedSign.name} Horoscope Report — ASTRO360</title>
            <style>body{font-family:'Segoe UI',system-ui,sans-serif;padding:40px;color:#0f172a;background:#fff;line-height:1.7}.h{text-align:center;border-bottom:3px double #6366f1;padding-bottom:20px;margin-bottom:30px}h1{font-size:24px;color:#4f46e5;margin:0}p.sub{font-size:12px;color:#64748b;margin-top:5px}.g{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:20px}.c{border:1px solid #e2e8f0;padding:14px;border-radius:10px;background:#f8fafc}.ct{font-size:13px;font-weight:bold;color:#1e293b;margin-bottom:3px}.cv{font-size:12px;color:#334155}.s{font-size:20px;font-weight:bold;color:#4f46e5;text-align:center;padding:20px;border:2px solid #e2e8f0;border-radius:12px;margin-bottom:20px;background:#eef2ff}.f{text-align:center;font-size:10px;color:#94a3b8;border-top:1px solid #e2e8f0;padding-top:20px;margin-top:30px}</style></head><body>
            <div class="h"><h1>${selectedSign.symbol} ${selectedSign.name} ${timeframeLabel} Horoscope</h1><p class="sub">${selectedSign.dates} · ${selectedSign.element} · Ruled by ${selectedSign.ruler} ${selectedSign.rulerSymbol}</p></div>
            <div class="s">Overall Cosmic Score: ${forecast.overallScore}%</div>
            <div class="g">
              <div class="c"><div class="ct">❤️ Love: ${forecast.love}%</div><div class="cv">${forecast.loveReading}</div></div>
              <div class="c"><div class="ct">💼 Career: ${forecast.career}%</div><div class="cv">${forecast.careerReading}</div></div>
              <div class="c"><div class="ct">💚 Health: ${forecast.health}%</div><div class="cv">${forecast.healthReading}</div></div>
              <div class="c"><div class="ct">💰 Finance: ${forecast.finance}%</div><div class="cv">${forecast.financeReading}</div></div>
            </div>
            <div class="c" style="margin-bottom:15px"><div class="ct">🔮 Full Reading</div><div class="cv">${forecast.detailedReading}</div></div>
            <div class="c" style="margin-bottom:15px"><div class="ct">🧘 Spiritual</div><div class="cv">${forecast.spiritualReading}</div></div>
            <div class="c" style="margin-bottom:15px;background:#fff7ed"><div class="ct">⚠️ Advisory: ${forecast.warning}</div></div>
            <div class="c" style="background:#eef2ff"><div class="ct">✨ Affirmation</div><div class="cv" style="font-style:italic">"${forecast.affirmation}"</div></div>
            <div class="f">Generated by ASTRO360 Premium Horoscope Engine · ${new Date().toLocaleDateString()}</div></body></html>`;
            exportUniversalPdf(htmlContent, `ASTRO360_Horoscope_${selectedSign.name}_${timeframe}`);
          }}
          className="px-6 py-3 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-500/30 text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-indigo-500/10"
        >
          <Download className="w-4 h-4" />
          Download Horoscope PDF Report
        </button>
      </div>
    </div>
  );
}
