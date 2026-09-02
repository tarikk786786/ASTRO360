import React, { useRef, useState, useMemo, useEffect, memo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, OrbitControls, Html, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { 
  Sparkles, RotateCw, Zap, ShieldCheck, CheckCircle2, 
  Layers, Clock, Calendar, ArrowRight, Award, Compass, Heart, Briefcase, DollarSign,
  Play, Pause, FastForward, Volume2, VolumeX, Maximize2, Eye
} from 'lucide-react';
import type { UserProfile } from '../../types';
import { calculatePlanetaryPositions, type PlanetPosition } from '../../lib/astroCalculations';
import { HighPrecisionPredictionEngine, type ComprehensivePredictionReport } from '../../lib/highPrecisionPredictionEngine';

export interface RealisticPlanetData {
  id: string;
  name: string;
  vedicName: string;
  symbol: string;
  xPos: number;
  yPos: number;
  zPos: number;
  radius: number;
  rotationSpeed: number;
  baseColor: string;
  glowColor: string;
  roughness: number;
  metalness: number;
  hasRing?: boolean;
  ringInner?: number;
  ringOuter?: number;
  hasMoon?: boolean;
  textureType: 'sun' | 'mercury' | 'venus' | 'earth' | 'mars' | 'jupiter' | 'saturn' | 'uranus' | 'neptune';
  frequency: number; // Hans Cousto Cosmic Octave in Hz
  lifeMeaning: string;
  careerImpact: string;
}

// Procedural high-fidelity photorealistic textures for celestial bodies
function createProceduralTexture(type: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  if (type === 'jupiter') {
    // Rich photorealistic Jupiter cloud bands & storms
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0.00, '#6C2B0B');
    grad.addColorStop(0.08, '#D97706');
    grad.addColorStop(0.18, '#FEF3C7');
    grad.addColorStop(0.28, '#92400E');
    grad.addColorStop(0.38, '#FDE68A');
    grad.addColorStop(0.48, '#78350F');
    grad.addColorStop(0.58, '#F59E0B');
    grad.addColorStop(0.68, '#FEF9C3');
    grad.addColorStop(0.78, '#B45309');
    grad.addColorStop(0.88, '#D97706');
    grad.addColorStop(1.00, '#451A03');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    // Turbulent atmospheric bands & whorls
    for (let y = 20; y < 500; y += 24) {
      ctx.fillStyle = y % 48 === 0 ? 'rgba(255, 255, 255, 0.25)' : 'rgba(120, 53, 15, 0.2)';
      ctx.beginPath();
      ctx.ellipse(512, y, 512, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Atmospheric eddies
      for (let x = 40; x < 1000; x += 120) {
        ctx.fillStyle = 'rgba(254, 243, 199, 0.2)';
        ctx.beginPath();
        ctx.arc(x + Math.sin(y) * 20, y, Math.random() * 8 + 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Great Red Spot Oval Storm
    ctx.fillStyle = '#7F1D1D';
    ctx.beginPath();
    ctx.ellipse(650, 320, 56, 32, 0.05, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#B91C1C';
    ctx.beginPath();
    ctx.ellipse(650, 320, 42, 22, 0.05, 0, Math.PI * 2);
    ctx.fill();

  } else if (type === 'sun') {
    // Seamless Radiant Solar Photosphere
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0.0, '#EA580C');
    grad.addColorStop(0.2, '#F59E0B');
    grad.addColorStop(0.5, '#FDE047');
    grad.addColorStop(0.8, '#F59E0B');
    grad.addColorStop(1.0, '#EA580C');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    // Soft convective horizontal bands instead of circles to prevent polar stretching
    for (let y = 0; y < 512; y += 6) {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.15})`;
      ctx.fillRect(0, y, 1024, Math.random() * 4 + 1);
      
      ctx.fillStyle = `rgba(220, 38, 38, ${Math.random() * 0.1})`;
      ctx.fillRect(0, y + 2, 1024, Math.random() * 2 + 1);
    }

  } else if (type === 'earth') {
    // Vibrant Blue Marble Earth (Deep Oceans, Continents, Atmosphere)
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, 512);
    oceanGrad.addColorStop(0.0, '#1E3A8A');
    oceanGrad.addColorStop(0.5, '#2563EB');
    oceanGrad.addColorStop(1.0, '#1E3A8A');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, 1024, 512);

    // Continents
    ctx.fillStyle = '#15803D';
    // Eurasia
    ctx.beginPath();
    ctx.ellipse(560, 180, 180, 90, 0.1, 0, Math.PI * 2);
    ctx.fill();
    // Africa
    ctx.beginPath();
    ctx.ellipse(510, 310, 90, 110, -0.1, 0, Math.PI * 2);
    ctx.fill();
    // North America
    ctx.beginPath();
    ctx.ellipse(220, 160, 120, 80, 0.3, 0, Math.PI * 2);
    ctx.fill();
    // South America
    ctx.beginPath();
    ctx.ellipse(300, 350, 70, 120, -0.2, 0, Math.PI * 2);
    ctx.fill();
    // Australia
    ctx.beginPath();
    ctx.ellipse(820, 360, 70, 50, 0.1, 0, Math.PI * 2);
    ctx.fill();

    // Deserts
    ctx.fillStyle = '#CA8A04';
    ctx.beginPath();
    ctx.ellipse(500, 240, 70, 35, 0, 0, Math.PI * 2);
    ctx.fill();

    // Polar Ice Caps
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 1024, 28);
    ctx.fillRect(0, 484, 1024, 28);

    // Swirling white clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    for (let i = 0; i < 35; i++) {
      ctx.beginPath();
      ctx.ellipse(Math.random() * 1024, Math.random() * 512, Math.random() * 120 + 30, Math.random() * 16 + 5, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }

  } else if (type === 'mars') {
    // Red Martian terrain
    ctx.fillStyle = '#EA580C';
    ctx.fillRect(0, 0, 1024, 512);
    ctx.fillStyle = '#9A3412';
    for (let i = 0; i < 50; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 1024, Math.random() * 512, Math.random() * 45 + 10, 0, Math.PI * 2);
      ctx.fill();
    }
    // Polar ice caps
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 1024, 24);
    ctx.fillRect(0, 488, 1024, 24);

  } else if (type === 'venus') {
    // Golden-amber dense atmosphere
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0.0, '#D97706');
    grad.addColorStop(0.25, '#F59E0B');
    grad.addColorStop(0.5, '#FEF3C7');
    grad.addColorStop(0.75, '#FBBF24');
    grad.addColorStop(1.0, '#92400E');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

  } else if (type === 'saturn') {
    // Saturn golden ochre gas bands
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0.0, '#78350F');
    grad.addColorStop(0.2, '#B45309');
    grad.addColorStop(0.4, '#FDE68A');
    grad.addColorStop(0.6, '#F59E0B');
    grad.addColorStop(0.8, '#D97706');
    grad.addColorStop(1.0, '#451A03');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

  } else if (type === 'uranus') {
    // Pale cyan crystal ice giant
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0.0, '#0E7490');
    grad.addColorStop(0.5, '#67E8F9');
    grad.addColorStop(1.0, '#155E75');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

  } else if (type === 'neptune') {
    // Deep royal cobalt and azure blue ice giant
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0.0, '#1E3A8A');
    grad.addColorStop(0.4, '#2563EB');
    grad.addColorStop(0.6, '#3B82F6');
    grad.addColorStop(1.0, '#1E1B4B');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.beginPath();
    ctx.ellipse(480, 220, 240, 16, -0.08, 0, Math.PI * 2);
    ctx.fill();

  } else {
    // Mercury cratered rocky slate
    ctx.fillStyle = '#94A3B8';
    ctx.fillRect(0, 0, 1024, 512);
    ctx.fillStyle = '#475569';
    for (let i = 0; i < 60; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 1024, Math.random() * 512, Math.random() * 25 + 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}

// Procedural texture for Saturn Rings with Cassini Division
function createSaturnRingTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 32;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 512, 0);
  grad.addColorStop(0.00, 'rgba(0, 0, 0, 0)');
  grad.addColorStop(0.08, 'rgba(180, 83, 9, 0.25)');
  grad.addColorStop(0.35, 'rgba(253, 230, 138, 0.65)'); // Ring B
  grad.addColorStop(0.55, 'rgba(0, 0, 0, 0)'); // Cassini Division Gap
  grad.addColorStop(0.65, 'rgba(217, 119, 6, 0.55)'); // Ring A
  grad.addColorStop(0.95, 'rgba(254, 243, 199, 0.35)');
  grad.addColorStop(1.00, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 32);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

// Well-spaced linear cinematic visual alignment with realistic matte scattering
const REALISTIC_PLANETS: RealisticPlanetData[] = [
  {
    id: 'neptune',
    name: 'Neptune',
    vedicName: 'Varuna',
    symbol: '♆',
    xPos: -12.6,
    yPos: 0,
    zPos: 0,
    radius: 0.72,
    rotationSpeed: 0.008,
    baseColor: '#2563EB',
    glowColor: '#3B82F6',
    roughness: 0.85,
    metalness: 0.05,
    textureType: 'neptune',
    frequency: 211.44,
    lifeMeaning: 'Spiritual mysticism, cosmic imagination, dreams & divine transcendence.',
    careerImpact: 'Artistic vision, cinema, music, psychology, and global brand intuition.'
  },
  {
    id: 'uranus',
    name: 'Uranus',
    vedicName: 'Indra / Rahu Aspect',
    symbol: '♅',
    xPos: -9.8,
    yPos: 0,
    zPos: 0.1,
    radius: 0.74,
    rotationSpeed: 0.009,
    baseColor: '#67E8F9',
    glowColor: '#22D3EE',
    roughness: 0.85,
    metalness: 0.05,
    textureType: 'uranus',
    frequency: 207.36,
    lifeMeaning: 'Breakthrough genius, sudden inventions, independence & radical innovation.',
    careerImpact: 'Quantum technology, AI architecture, aviation, and scientific disruption.'
  },
  {
    id: 'saturn',
    name: 'Saturn',
    vedicName: 'Shani Dev',
    symbol: '♄',
    xPos: -6.4,
    yPos: 0,
    zPos: 0.2,
    radius: 0.98,
    rotationSpeed: 0.006,
    baseColor: '#D97706',
    glowColor: '#F59E0B',
    roughness: 0.85,
    metalness: 0.05,
    hasRing: true,
    ringInner: 1.35,
    ringOuter: 2.35,
    textureType: 'saturn',
    frequency: 147.85,
    lifeMeaning: 'Perseverance, karmic discipline, mastery over time, and permanent legacy.',
    careerImpact: 'Institutional leadership, real estate infrastructure, law, and enduring wealth.'
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    vedicName: 'Guru / Brihaspati',
    symbol: '♃',
    xPos: -2.4,
    yPos: 0,
    zPos: 0.1,
    radius: 1.25,
    rotationSpeed: 0.012,
    baseColor: '#D97706',
    glowColor: '#FBBF24',
    roughness: 0.88,
    metalness: 0.05,
    textureType: 'jupiter',
    frequency: 183.58,
    lifeMeaning: 'Supreme wisdom, divine luck, financial expansion, mentorship & righteousness.',
    careerImpact: 'Executive counsel, banking, philanthropy, education, and venture capital.'
  },
  {
    id: 'mars',
    name: 'Mars',
    vedicName: 'Mangala',
    symbol: '♂',
    xPos: 0.9,
    yPos: 0,
    zPos: 0,
    radius: 0.46,
    rotationSpeed: 0.007,
    baseColor: '#DC2626',
    glowColor: '#EF4444',
    roughness: 0.92,
    metalness: 0.05,
    textureType: 'mars',
    frequency: 144.72,
    lifeMeaning: 'Courage, physical stamina, decisive action, protection & victory over obstacles.',
    careerImpact: 'Defense, surgical precision, engineering, athletics, and executive execution.'
  },
  {
    id: 'earth',
    name: 'Earth & Moon',
    vedicName: 'Bhumi & Chandra',
    symbol: '⊕',
    xPos: 3.4,
    yPos: 0,
    zPos: 0,
    radius: 0.62,
    rotationSpeed: 0.008,
    baseColor: '#2563EB',
    glowColor: '#38BDF8',
    roughness: 0.85,
    metalness: 0.05,
    hasMoon: true,
    textureType: 'earth',
    frequency: 136.10, // Om Year Tone
    lifeMeaning: 'Physical embodiment, emotional nourishment, ancestral roots & sensory joy.',
    careerImpact: 'Ecological innovation, community leadership, and global communication.'
  },
  {
    id: 'venus',
    name: 'Venus',
    vedicName: 'Shukra Dev',
    symbol: '♀',
    xPos: 5.9,
    yPos: 0,
    zPos: 0,
    radius: 0.54,
    rotationSpeed: 0.004,
    baseColor: '#F59E0B',
    glowColor: '#FDE047',
    roughness: 0.85,
    metalness: 0.05,
    textureType: 'venus',
    frequency: 221.23,
    lifeMeaning: 'Magnetic attraction, romantic harmony, artistic elegance & refined luxury.',
    careerImpact: 'Design direction, luxury commerce, diplomacy, architecture, and fine arts.'
  },
  {
    id: 'mercury',
    name: 'Mercury',
    vedicName: 'Budha',
    symbol: '☿',
    xPos: 8.1,
    yPos: 0,
    zPos: 0,
    radius: 0.34,
    rotationSpeed: 0.005,
    baseColor: '#9CA3AF',
    glowColor: '#E2E8F0',
    roughness: 0.95,
    metalness: 0.05,
    textureType: 'mercury',
    frequency: 141.27,
    lifeMeaning: 'Sharp intellect, commercial eloquence, analytical agility & mental speed.',
    careerImpact: 'Media publishing, software engineering, financial trading, and strategic speech.'
  }
];

// Camera Flight Controller (Smooth zoom to planet when selected)
function CameraFlightController({ targetPlanet }: { targetPlanet?: RealisticPlanetData | null }) {
  const { camera } = useThree();
  const targetPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.8, 17.5));

  useEffect(() => {
    if (targetPlanet) {
      targetPos.current.set(targetPlanet.xPos, targetPlanet.yPos + 0.3, 4.5);
    } else {
      targetPos.current.set(0, 0.8, 17.5);
    }
  }, [targetPlanet]);

  useFrame(() => {
    camera.position.lerp(targetPos.current, 0.05);
  });

  return null;
}

function RealisticPlanetMesh({
  planet,
  natalPosition,
  isSelected,
  onSelect,
  speedMultiplier
}: {
  planet: RealisticPlanetData;
  natalPosition?: PlanetPosition;
  isSelected: boolean;
  onSelect: (p: RealisticPlanetData) => void;
  speedMultiplier: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const moonGroupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const texture = useMemo(() => createProceduralTexture(planet.textureType), [planet.textureType]);
  const ringTexture = useMemo(() => planet.hasRing ? createSaturnRingTexture() : null, [planet.hasRing]);

  useFrame((_, delta) => {
    if (meshRef.current && speedMultiplier > 0) {
      meshRef.current.rotation.y += planet.rotationSpeed * speedMultiplier * (delta * 60);
    }
    if (moonGroupRef.current && speedMultiplier > 0) {
      moonGroupRef.current.rotation.y += 0.02 * speedMultiplier * (delta * 60);
    }
  });

  return (
    <group position={[planet.xPos, planet.yPos, planet.zPos]}>
      {/* 3D Planet Sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => { e.stopPropagation(); onSelect(planet); }}
        scale={isSelected ? [1.25, 1.25, 1.25] : hovered ? [1.12, 1.12, 1.12] : [1, 1, 1]}
      >
        <sphereGeometry args={[planet.radius, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          roughness={planet.roughness}
          metalness={planet.metalness}
          emissive={isSelected ? planet.baseColor : '#000000'}
          emissiveIntensity={isSelected ? 0.3 : 0}
        />
      </mesh>

      {/* Atmospheric Halo Glow */}
      <mesh scale={[1.04, 1.04, 1.04]}>
        <sphereGeometry args={[planet.radius, 32, 32]} />
        <meshBasicMaterial
          color={planet.glowColor}
          transparent
          opacity={hovered || isSelected ? 0.35 : 0.1}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Saturn 3D Ring System with Cassini Division Texture */}
      {planet.hasRing && ringTexture && (
        <mesh
          ref={ringRef}
          rotation={[Math.PI / 2.3, 0, Math.PI / 5]}
          scale={isSelected ? [1.25, 1.25, 1.25] : [1, 1, 1]}
        >
          <ringGeometry args={[planet.ringInner || 1.35, planet.ringOuter || 2.35, 128]} />
          <meshStandardMaterial
            map={ringTexture}
            roughness={0.6}
            transparent
            opacity={0.92}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Orbiting Moon for Earth */}
      {planet.hasMoon && (
        <group ref={moonGroupRef}>
          <mesh position={[1.15, 0.2, 0]}>
            <sphereGeometry args={[0.13, 16, 16]} />
            <meshStandardMaterial color="#E2E8F0" roughness={0.9} />
          </mesh>
        </group>
      )}

      {/* Dynamic Smart Badge: Selective Expansion */}
      <Html position={[0, planet.radius + 0.65, 0]} center distanceFactor={14}>
        {isSelected || hovered ? (
          <button
            onClick={(e) => { e.stopPropagation(); onSelect(planet); }}
            className="px-3 py-1 rounded-full text-xs font-mono font-bold whitespace-nowrap shadow-2xl flex items-center gap-1.5 bg-white text-black font-semibold shadow-sm ring-2 ring-amber-300 scale-110 shadow-amber-400/50 cursor-pointer transition-transform select-none"
          >
            <span className="font-black">{planet.symbol}</span>
            <span>{planet.name}</span>
            {natalPosition && (
              <span className="text-[10.5px] font-normal text-slate-900">
                ({natalPosition.sign.slice(0, 3)} {natalPosition.degree})
              </span>
            )}
          </button>
        ) : (
          <button
            onClick={(e) => { e.stopPropagation(); onSelect(planet); }}
            className="w-6 h-6 rounded-full bg-black/80 hover:bg-black/95 text-slate-200 hover:text-amber-300 border border-white/20 hover:border-amber-400 text-xs font-mono flex items-center justify-center shadow-lg transition-all cursor-pointer hover:scale-125 select-none"
            title={`${planet.name} (${natalPosition ? `${natalPosition.sign} ${natalPosition.degree}` : ''})`}
          >
            <span>{planet.symbol}</span>
          </button>
        )}
      </Html>
    </group>
  );
}

// Giant Radiant Sun Sphere on the Far Right Edge
function GiantSunOnRight({ speedMultiplier }: { speedMultiplier: number }) {
  const sunTexture = useMemo(() => createProceduralTexture('sun'), []);
  const sunMeshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (sunMeshRef.current && speedMultiplier > 0) {
      sunMeshRef.current.rotation.y += 0.002 * speedMultiplier * (delta * 60);
    }
  });

  return (
    <group position={[15.2, 0, 0]}>
      {/* Radiant Sun Sphere */}
      <mesh ref={sunMeshRef}>
        <sphereGeometry args={[5.2, 64, 64]} />
        <meshBasicMaterial map={sunTexture} />
      </mesh>

      {/* Atmospheric Solar Corona Rim Glow */}
      <mesh scale={[1.1, 1.1, 1.1]}>
        <sphereGeometry args={[5.2, 32, 32]} />
        <meshBasicMaterial
          color="#F59E0B"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

export const Realistic3DSolarSystemAlignment: React.FC<{
  userProfile?: UserProfile;
  onSelectPlanet?: (p: RealisticPlanetData) => void;
}> = memo(({ userProfile, onSelectPlanet }) => {
  const [selectedPlanet, setSelectedPlanet] = useState<RealisticPlanetData | null>(REALISTIC_PLANETS[3]); // Default Jupiter
  const [activeHorizon, setActiveHorizon] = useState<'today' | '7days' | '30days' | '12months' | '5years'>('today');
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [isPlayingFrequency, setIsPlayingFrequency] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  // Compute natal positions for overlay
  const natalPositions = useMemo(() => {
    const dob = userProfile?.dob || '1998-06-15';
    const time = userProfile?.time || '12:00';
    return calculatePlanetaryPositions(dob, time);
  }, [userProfile]);

  // Compute multi-horizon predictions & 7-engine consensus report
  const predictionReport: ComprehensivePredictionReport = useMemo(() => {
    const effectiveProfile: UserProfile = userProfile || {
      name: 'Seeker',
      dob: '1998-06-15',
      time: '12:00',
      location: 'Greenwich, London, UK',
      preferredSystem: 'universal'
    };
    return HighPrecisionPredictionEngine.generatePredictionReport(effectiveProfile);
  }, [userProfile]);

  const handleSelect = (p: RealisticPlanetData) => {
    setSelectedPlanet(p);
    if (onSelectPlanet) onSelectPlanet(p);
  };

  const handleResetCamera = () => {
    setSelectedPlanet(null);
  };

  // Cosmic Octave Tone Synthesizer
  const toggleFrequency = () => {
    if (isPlayingFrequency) {
      if (oscRef.current) {
        oscRef.current.stop();
        oscRef.current.disconnect();
      }
      setIsPlayingFrequency(false);
    } else if (selectedPlanet) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(selectedPlanet.frequency, audioCtxRef.current.currentTime);
        gain.gain.setValueAtTime(0.12, audioCtxRef.current.currentTime);
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start();
        oscRef.current = osc;
        setIsPlayingFrequency(true);
      } catch (err) {
        console.error('Audio synthesizer error:', err);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (oscRef.current) {
        try { oscRef.current.stop(); } catch {}
      }
    };
  }, []);

  const activeNatal = selectedPlanet ? natalPositions.find(pos => 
    pos.name.toLowerCase().includes(selectedPlanet.name.toLowerCase().split(' ')[0])
  ) : null;

  const activeForecast = predictionReport.forecasts.find(f => f.horizon === activeHorizon) || predictionReport.forecasts[0];

  return (
    <div className="w-full h-full min-h-[400px] sm:min-h-[500px] relative bg-[#0B0C10] overflow-hidden">
      {/* 3D WebGL Canvas (Cinematic Viewport) */}
      <Canvas
        camera={{ position: [0, 0.8, 17.5], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        {/* Deep Space Background Stars */}
        <Stars radius={100} depth={50} count={3500} factor={4} saturation={0.5} fade speed={1} />

        {/* Soft ambient space illumination */}
        <ambientLight intensity={0.65} />

        {/* Soft camera front diffuse fill (no specular glare) */}
        <directionalLight position={[0, 2, 18]} intensity={1.1} color="#FFFFFF" />

        {/* Cinematic sunlight from the Sun on the right */}
        <directionalLight position={[18, 0, 3]} intensity={3.6} color="#FFF8E7" />
        <pointLight position={[15.2, 0, 0]} intensity={4.5} color="#FFF8E7" distance={45} decay={1.2} />

        {/* Subtle deep space rim fill from left */}
        <directionalLight position={[-18, -1, -3]} intensity={0.6} color="#38BDF8" />

        {/* Smooth Camera Flight Controller */}
        <CameraFlightController targetPlanet={selectedPlanet} />

        {/* Giant Radiant Sun on the right */}
        <GiantSunOnRight speedMultiplier={1} />

        {/* Realistic Alignment of Planets */}
        {REALISTIC_PLANETS.map((p) => {
          const natal = natalPositions.find(pos => 
            pos.name.toLowerCase().includes(p.name.toLowerCase().split(' ')[0])
          );
          return (
            <RealisticPlanetMesh
              key={p.id}
              planet={p}
              natalPosition={natal}
              isSelected={selectedPlanet?.id === p.id}
              onSelect={handleSelect}
              speedMultiplier={1}
            />
          );
        })}

        <OrbitControls
          enableZoom={true}
          minDistance={3}
          maxDistance={32}
          enablePan={true}
          autoRotate={false}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>

      {/* Floating Canvas Controls Overlay */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-sans font-medium text-slate-300 pointer-events-none select-none">
        <RotateCw className="w-3.5 h-3.5 text-slate-400" />
        <span>Drag to orbit • Scroll to zoom • Click planet to focus</span>
      </div>
      
      {/* Sleek Minimalist Celestial HUD Overlay */}
      {selectedPlanet && (
        <div className="absolute top-4 left-4 max-w-[280px] p-4 rounded-xl bg-[#0B0C10]/80 backdrop-blur-xl border border-white/10 shadow-2xl pointer-events-auto">
          {/* Close / Reset Camera Button */}
          <button
            onClick={handleResetCamera}
            className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Reset View"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <div className="flex items-center gap-3 border-b border-white/10 pb-3 mb-3 pr-6">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold shadow-inner shrink-0"
              style={{ background: selectedPlanet.baseColor, color: '#090D16' }}
            >
              {selectedPlanet.symbol}
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-sans flex items-center gap-1.5 leading-tight">
                {selectedPlanet.name}
              </h4>
              <p className="text-[10px] font-mono text-emerald-400 truncate w-[160px]">
                {activeNatal ? `${activeNatal.sign} ${activeNatal.degree} • H${activeNatal.house || 1}` : 'Transit Active'}
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div>
              <span className="text-[9px] font-mono font-bold uppercase text-slate-500">Core Essence</span>
              <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">
                {selectedPlanet.lifeMeaning}
              </p>
            </div>
            <div>
              <span className="text-[9px] font-mono font-bold uppercase text-slate-500">Frequency</span>
              <p className="text-[11px] font-mono text-amber-400">
                {selectedPlanet.frequency} Hz Cosmic Resonator
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default Realistic3DSolarSystemAlignment;
