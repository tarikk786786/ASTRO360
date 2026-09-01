import React, { useRef, useState, useMemo, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Html, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles, RotateCw, Zap } from 'lucide-react';
import type { UserProfile } from '../../types';
import { calculatePlanetaryPositions, type PlanetPosition } from '../../lib/astroCalculations';

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
  roughness: number;
  metalness: number;
  hasRing?: boolean;
  ringInner?: number;
  ringOuter?: number;
  hasMoon?: boolean;
  textureType: 'sun' | 'mercury' | 'venus' | 'earth' | 'mars' | 'jupiter' | 'saturn' | 'uranus' | 'neptune';
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
    grad.addColorStop(0.00, '#5A2A0C');
    grad.addColorStop(0.12, '#C26A20');
    grad.addColorStop(0.22, '#F6DEC2');
    grad.addColorStop(0.35, '#8C3D12');
    grad.addColorStop(0.48, '#FCE8D3');
    grad.addColorStop(0.60, '#6C2B0B');
    grad.addColorStop(0.72, '#E28637');
    grad.addColorStop(0.85, '#DDA15E');
    grad.addColorStop(1.00, '#381608');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    // Turbulent atmospheric bands & whorls
    for (let y = 30; y < 480; y += 45) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.14)';
      ctx.beginPath();
      ctx.ellipse(512, y, 512, 12, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Great Red Spot Oval Storm
    ctx.fillStyle = '#B91C1C';
    ctx.beginPath();
    ctx.ellipse(680, 310, 48, 28, 0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#FCA5A5';
    ctx.lineWidth = 4;
    ctx.stroke();

  } else if (type === 'sun') {
    // Ultra-radiant solar plasma granulation
    const grad = ctx.createRadialGradient(512, 256, 30, 512, 256, 512);
    grad.addColorStop(0.00, '#FFFFFF');
    grad.addColorStop(0.15, '#FFFBEB');
    grad.addColorStop(0.35, '#FDE047');
    grad.addColorStop(0.60, '#F59E0B');
    grad.addColorStop(0.85, '#EA580C');
    grad.addColorStop(1.00, '#991B1B');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    // Solar flares & convective granules
    ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
    for (let i = 0; i < 80; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 1024, Math.random() * 512, Math.random() * 18 + 4, 0, Math.PI * 2);
      ctx.fill();
    }

  } else if (type === 'earth') {
    // Realistic Blue Marble Earth
    ctx.fillStyle = '#0F2A4A';
    ctx.fillRect(0, 0, 1024, 512);

    // Continents
    ctx.fillStyle = '#2D6A4F';
    // Eurasia & Africa
    ctx.beginPath();
    ctx.ellipse(540, 200, 160, 90, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(500, 340, 90, 120, 0, 0, Math.PI * 2);
    ctx.fill();
    // Americas
    ctx.beginPath();
    ctx.ellipse(240, 180, 110, 80, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(320, 380, 80, 110, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // Swirling white clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    for (let i = 0; i < 28; i++) {
      ctx.beginPath();
      ctx.ellipse(Math.random() * 1024, Math.random() * 512, Math.random() * 140 + 40, Math.random() * 20 + 6, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }

  } else if (type === 'mars') {
    // Red Martian terrain
    ctx.fillStyle = '#991B1B';
    ctx.fillRect(0, 0, 1024, 512);
    ctx.fillStyle = '#7F1D1D';
    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 1024, Math.random() * 512, Math.random() * 50 + 10, 0, Math.PI * 2);
      ctx.fill();
    }
    // Polar ice caps
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 1024, 30);
    ctx.fillRect(0, 482, 1024, 30);

  } else if (type === 'venus') {
    // Dense golden atmosphere
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0.0, '#B45309');
    grad.addColorStop(0.3, '#F59E0B');
    grad.addColorStop(0.5, '#FEF3C7');
    grad.addColorStop(0.7, '#D97706');
    grad.addColorStop(1.0, '#78350F');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

  } else if (type === 'saturn') {
    // Saturn golden ochre cloud bands
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0.0, '#5E3A18');
    grad.addColorStop(0.2, '#A16207');
    grad.addColorStop(0.5, '#FDE68A');
    grad.addColorStop(0.8, '#B45309');
    grad.addColorStop(1.0, '#451A03');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

  } else if (type === 'uranus') {
    // Pale cyan ice giant
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0.0, '#0E7490');
    grad.addColorStop(0.5, '#A5F3FC');
    grad.addColorStop(1.0, '#164E63');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

  } else if (type === 'neptune') {
    // Deep royal azure blue ice giant
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0.0, '#1E1B4B');
    grad.addColorStop(0.4, '#1D4ED8');
    grad.addColorStop(0.6, '#3B82F6');
    grad.addColorStop(1.0, '#1E3A8A');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    // Subtle white methane cirrus streaks
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.ellipse(450, 240, 220, 14, -0.05, 0, Math.PI * 2);
    ctx.fill();

  } else {
    // Mercury cratered rocky slate
    ctx.fillStyle = '#64748B';
    ctx.fillRect(0, 0, 1024, 512);
    ctx.fillStyle = '#334155';
    for (let i = 0; i < 50; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 1024, Math.random() * 512, Math.random() * 30 + 6, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// Well-spaced linear cinematic visual alignment matching the user reference
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
    roughness: 0.25,
    metalness: 0.1,
    textureType: 'neptune',
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
    roughness: 0.3,
    metalness: 0.1,
    textureType: 'uranus',
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
    roughness: 0.35,
    metalness: 0.2,
    hasRing: true,
    ringInner: 1.35,
    ringOuter: 2.35,
    textureType: 'saturn',
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
    roughness: 0.2,
    metalness: 0.1,
    textureType: 'jupiter',
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
    roughness: 0.55,
    metalness: 0.3,
    textureType: 'mars',
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
    roughness: 0.35,
    metalness: 0.2,
    hasMoon: true,
    textureType: 'earth',
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
    roughness: 0.2,
    metalness: 0.2,
    textureType: 'venus',
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
    roughness: 0.65,
    metalness: 0.4,
    textureType: 'mercury',
    lifeMeaning: 'Sharp intellect, commercial eloquence, analytical agility & mental speed.',
    careerImpact: 'Media publishing, software engineering, financial trading, and strategic speech.'
  }
];

function RealisticPlanetMesh({
  planet,
  natalPosition,
  isSelected,
  onSelect
}: {
  planet: RealisticPlanetData;
  natalPosition?: PlanetPosition;
  isSelected: boolean;
  onSelect: (p: RealisticPlanetData) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const moonGroupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const texture = useMemo(() => createProceduralTexture(planet.textureType), [planet.textureType]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += planet.rotationSpeed * (delta * 60);
    }
    if (moonGroupRef.current) {
      moonGroupRef.current.rotation.y += 0.02 * (delta * 60);
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
          emissiveIntensity={isSelected ? 0.45 : 0}
        />
      </mesh>

      {/* Saturn 3D Ring System */}
      {planet.hasRing && (
        <mesh
          ref={ringRef}
          rotation={[Math.PI / 2.5, 0, Math.PI / 7]}
          scale={isSelected ? [1.25, 1.25, 1.25] : [1, 1, 1]}
        >
          <ringGeometry args={[planet.ringInner || 1.35, planet.ringOuter || 2.35, 96]} />
          <meshStandardMaterial
            color="#D97706"
            roughness={0.3}
            transparent
            opacity={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Orbiting Moon for Earth */}
      {planet.hasMoon && (
        <group ref={moonGroupRef}>
          <mesh position={[1.15, 0.2, 0]}>
            <sphereGeometry args={[0.13, 16, 16]} />
            <meshStandardMaterial color="#E2E8F0" roughness={0.8} />
          </mesh>
        </group>
      )}

      {/* Dynamic Smart Badge: Selective Expansion to avoid overlapping */}
      <Html position={[0, planet.radius + 0.65, 0]} center distanceFactor={14}>
        {isSelected || hovered ? (
          <button
            onClick={(e) => { e.stopPropagation(); onSelect(planet); }}
            className="px-3 py-1 rounded-full text-xs font-mono font-bold whitespace-nowrap shadow-2xl flex items-center gap-1.5 bg-amber-400 text-slate-950 ring-2 ring-amber-300 scale-110 shadow-amber-400/50 cursor-pointer transition-transform"
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
            className="w-6 h-6 rounded-full bg-black/80 hover:bg-black/95 text-slate-200 hover:text-amber-300 border border-white/20 hover:border-amber-400 text-xs font-mono flex items-center justify-center shadow-lg transition-all cursor-pointer hover:scale-125"
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
function GiantSunOnRight() {
  const sunTexture = useMemo(() => createProceduralTexture('sun'), []);
  const sunMeshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (sunMeshRef.current) {
      sunMeshRef.current.rotation.y += 0.002 * (delta * 60);
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
      <mesh scale={[1.06, 1.06, 1.06]}>
        <sphereGeometry args={[5.2, 32, 32]} />
        <meshBasicMaterial
          color="#F59E0B"
          transparent
          opacity={0.4}
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
  const [selectedPlanet, setSelectedPlanet] = useState<RealisticPlanetData>(REALISTIC_PLANETS[3]); // Default Jupiter

  // Compute natal positions for overlay
  const natalPositions = useMemo(() => {
    const dob = userProfile?.dob || '1998-06-15';
    const time = userProfile?.time || '12:00';
    return calculatePlanetaryPositions(dob, time);
  }, [userProfile]);

  const handleSelect = (p: RealisticPlanetData) => {
    setSelectedPlanet(p);
    if (onSelectPlanet) onSelectPlanet(p);
  };

  const activeNatal = natalPositions.find(pos => 
    pos.name.toLowerCase().includes(selectedPlanet.name.toLowerCase().split(' ')[0])
  );

  return (
    <div className="w-full rounded-3xl bg-gradient-to-b from-[#080E1C] via-[#040812] to-[#020308] border border-amber-400/40 p-4 sm:p-6 shadow-2xl space-y-4 text-left">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-amber-400/15 text-amber-300 border border-amber-400/30">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-base sm:text-lg font-black text-white font-sans tracking-tight">
              Photorealistic 3D Solar System Alignment Studio
            </h3>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-400/15 text-emerald-300 border border-emerald-400/30">
              True Cosmic Scale
            </span>
          </div>
          <p className="text-xs text-slate-300 font-sans">
            Cinematic alignment of all planets illuminated by the Sun. Drag to orbit, zoom into Saturn's rings or Earth, and tap any celestial body to inspect your birth chart placements.
          </p>
        </div>

        {/* Quick Planet Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {REALISTIC_PLANETS.map((p) => {
            const isSelected = selectedPlanet.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleSelect(p)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/25 scale-105 font-black'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                <span>{p.symbol}</span>
                <span>{p.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D WebGL Canvas (Cinematic Viewport) */}
      <div className="w-full h-[360px] sm:h-[440px] relative rounded-2xl bg-[#020306] border border-white/10 overflow-hidden shadow-inner">
        <Canvas
          camera={{ position: [0, 0.8, 17.5], fov: 42 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          {/* Deep Space Background Stars */}
          <Stars radius={100} depth={50} count={3500} factor={4} saturation={0.5} fade speed={1} />

          {/* Ambient space illumination */}
          <ambientLight intensity={0.4} />

          {/* Powerful directional sunlight originating from the Sun on the right */}
          <pointLight position={[15.0, 0, 0]} intensity={5.2} color="#FFFBEB" distance={50} decay={1.3} />
          <pointLight position={[-18, 8, 8]} intensity={0.4} color="#38BDF8" />

          {/* Giant Radiant Sun on the right */}
          <GiantSunOnRight />

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
                isSelected={selectedPlanet.id === p.id}
                onSelect={handleSelect}
              />
            );
          })}

          <OrbitControls
            enableZoom={true}
            minDistance={4}
            maxDistance={28}
            enablePan={true}
            autoRotate={false}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>

        {/* Floating Canvas Controls Overlay */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-slate-300 pointer-events-none">
          <RotateCw className="w-3.5 h-3.5 text-amber-400" />
          <span>Interactive 3D Viewport • Drag to rotate • Scroll to zoom</span>
        </div>
      </div>

      {/* Selected Celestial Body Astrological & Astronomical Dossier */}
      {selectedPlanet && (
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0C1527] via-[#09101E] to-[#060A14] border border-amber-400/40 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg"
                style={{ background: selectedPlanet.baseColor, color: '#090D16' }}
              >
                {selectedPlanet.symbol}
              </div>
              <div>
                <h4 className="text-lg font-black text-white font-sans flex items-center gap-2">
                  {selectedPlanet.name} ({selectedPlanet.vedicName})
                </h4>
                <p className="text-xs font-mono text-amber-300">
                  {activeNatal ? `Natal Placement: ${activeNatal.sign} at ${activeNatal.degree} • House ${activeNatal.house || 1}` : 'Celestial Body'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                Astronomical Transit Active
              </span>
            </div>
          </div>

          {/* Meaning Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
              <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Soul & Psychological Essence:
              </span>
              <p className="text-slate-100 leading-relaxed">
                {selectedPlanet.lifeMeaning}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
              <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> Career & Worldly Manifestation:
              </span>
              <p className="text-slate-100 leading-relaxed">
                {selectedPlanet.careerImpact}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default Realistic3DSolarSystemAlignment;
