import React, { useRef, useState, useMemo, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Html, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles, Info, RotateCw, CheckCircle2, Eye, Compass, Zap, Layers } from 'lucide-react';
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

// Procedural high-fidelity textures for realistic celestial bodies
function createProceduralTexture(type: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  if (type === 'jupiter') {
    // Banded gas giant stripes
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0.0, '#B45309');
    grad.addColorStop(0.18, '#D97706');
    grad.addColorStop(0.32, '#FEF3C7');
    grad.addColorStop(0.48, '#92400E');
    grad.addColorStop(0.62, '#FDE68A');
    grad.addColorStop(0.76, '#78350F');
    grad.addColorStop(0.88, '#F59E0B');
    grad.addColorStop(1.0, '#451A03');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);

    // Subtle atmospheric swirls
    ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
    for (let i = 0; i < 15; i++) {
      ctx.beginPath();
      ctx.ellipse(Math.random() * 512, Math.random() * 256, Math.random() * 90 + 30, Math.random() * 8 + 3, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    // Great Red Spot
    ctx.fillStyle = '#DC2626';
    ctx.beginPath();
    ctx.ellipse(320, 160, 26, 14, 0, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === 'sun') {
    // Fiery solar corona granulation
    const grad = ctx.createRadialGradient(256, 128, 10, 256, 128, 256);
    grad.addColorStop(0.0, '#FFFBEB');
    grad.addColorStop(0.25, '#FDE047');
    grad.addColorStop(0.55, '#F59E0B');
    grad.addColorStop(0.85, '#DC2626');
    grad.addColorStop(1.0, '#7F1D1D');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 12 + 2, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === 'earth') {
    // Deep blue oceans and green-brown continents
    ctx.fillStyle = '#1E3A8A';
    ctx.fillRect(0, 0, 512, 256);
    ctx.fillStyle = '#15803D';
    for (let i = 0; i < 18; i++) {
      ctx.beginPath();
      ctx.ellipse(Math.random() * 512, Math.random() * 256, Math.random() * 60 + 20, Math.random() * 40 + 15, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
    // White swirling clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    for (let i = 0; i < 16; i++) {
      ctx.beginPath();
      ctx.ellipse(Math.random() * 512, Math.random() * 256, Math.random() * 90 + 30, Math.random() * 14 + 4, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === 'mars') {
    // Rust red surface
    ctx.fillStyle = '#991B1B';
    ctx.fillRect(0, 0, 512, 256);
    ctx.fillStyle = '#7F1D1D';
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 35 + 8, 0, Math.PI * 2);
      ctx.fill();
    }
    // White polar caps
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 512, 16);
    ctx.fillRect(0, 240, 512, 16);
  } else if (type === 'venus') {
    // Dense golden-cream atmosphere
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0.0, '#D97706');
    grad.addColorStop(0.5, '#FDE68A');
    grad.addColorStop(1.0, '#B45309');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);
  } else if (type === 'saturn') {
    // Golden ochre gas bands
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0.0, '#78350F');
    grad.addColorStop(0.3, '#D97706');
    grad.addColorStop(0.7, '#FCD34D');
    grad.addColorStop(1.0, '#92400E');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);
  } else if (type === 'uranus') {
    // Pale cyan ice
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0.0, '#0E7490');
    grad.addColorStop(0.5, '#A5F3FC');
    grad.addColorStop(1.0, '#155E75');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);
  } else if (type === 'neptune') {
    // Deep royal azure blue
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0.0, '#1E1B4B');
    grad.addColorStop(0.5, '#2563EB');
    grad.addColorStop(1.0, '#1D4ED8');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);
  } else {
    // Mercury / cratered rocky
    ctx.fillStyle = '#6B7280';
    ctx.fillRect(0, 0, 512, 256);
    ctx.fillStyle = '#374151';
    for (let i = 0; i < 25; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 20 + 4, 0, Math.PI * 2);
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
    xPos: -12.2,
    yPos: 0,
    zPos: 0,
    radius: 0.7,
    rotationSpeed: 0.008,
    baseColor: '#2563EB',
    roughness: 0.3,
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
    xPos: -9.4,
    yPos: 0,
    zPos: 0.1,
    radius: 0.72,
    rotationSpeed: 0.009,
    baseColor: '#67E8F9',
    roughness: 0.4,
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
    xPos: -6.2,
    yPos: 0,
    zPos: 0.2,
    radius: 0.95,
    rotationSpeed: 0.006,
    baseColor: '#D97706',
    roughness: 0.3,
    metalness: 0.2,
    hasRing: true,
    ringInner: 1.25,
    ringOuter: 2.2,
    textureType: 'saturn',
    lifeMeaning: 'Perseverance, karmic discipline, mastery over time, and permanent legacy.',
    careerImpact: 'Institutional leadership, real estate infrastructure, law, and enduring wealth.'
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    vedicName: 'Guru / Brihaspati',
    symbol: '♃',
    xPos: -2.6,
    yPos: 0,
    zPos: 0.1,
    radius: 1.15,
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
    xPos: 0.6,
    yPos: 0,
    zPos: 0,
    radius: 0.45,
    rotationSpeed: 0.007,
    baseColor: '#DC2626',
    roughness: 0.6,
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
    xPos: 3.0,
    yPos: 0,
    zPos: 0,
    radius: 0.58,
    rotationSpeed: 0.008,
    baseColor: '#2563EB',
    roughness: 0.4,
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
    xPos: 5.4,
    yPos: 0,
    zPos: 0,
    radius: 0.52,
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
    xPos: 7.5,
    yPos: 0,
    zPos: 0,
    radius: 0.32,
    rotationSpeed: 0.005,
    baseColor: '#9CA3AF',
    roughness: 0.7,
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
        <sphereGeometry args={[planet.radius, 48, 48]} />
        <meshStandardMaterial
          map={texture}
          roughness={planet.roughness}
          metalness={planet.metalness}
          emissive={isSelected ? planet.baseColor : '#000000'}
          emissiveIntensity={isSelected ? 0.4 : 0}
        />
      </mesh>

      {/* Saturn 3D Ring System */}
      {planet.hasRing && (
        <mesh
          ref={ringRef}
          rotation={[Math.PI / 2.6, 0, Math.PI / 8]}
          scale={isSelected ? [1.25, 1.25, 1.25] : [1, 1, 1]}
        >
          <ringGeometry args={[planet.ringInner || 1.25, planet.ringOuter || 2.2, 64]} />
          <meshStandardMaterial
            color="#D97706"
            roughness={0.4}
            transparent
            opacity={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Orbiting Moon for Earth */}
      {planet.hasMoon && (
        <group ref={moonGroupRef}>
          <mesh position={[1.1, 0.2, 0]}>
            <sphereGeometry args={[0.13, 16, 16]} />
            <meshStandardMaterial color="#E5E7EB" roughness={0.8} />
          </mesh>
        </group>
      )}

      {/* Dynamic Smart Badge: Selective Expansion to avoid overlapping */}
      <Html position={[0, planet.radius + 0.55, 0]} center distanceFactor={14}>
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

function GiantSunOnRight() {
  const sunTexture = useMemo(() => createProceduralTexture('sun'), []);
  const sunMeshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (sunMeshRef.current) {
      sunMeshRef.current.rotation.y += 0.003 * (delta * 60);
    }
  });

  return (
    <group position={[13.5, 0, 0]}>
      {/* Radiant Sun Sphere */}
      <mesh ref={sunMeshRef}>
        <sphereGeometry args={[3.8, 64, 64]} />
        <meshBasicMaterial map={sunTexture} />
      </mesh>

      {/* Atmospheric Corona Glow */}
      <mesh scale={[1.08, 1.08, 1.08]}>
        <sphereGeometry args={[3.8, 32, 32]} />
        <meshBasicMaterial
          color="#F59E0B"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Sun Minimal Badge */}
      <Html position={[-3.5, 0, 0]} center distanceFactor={16}>
        <div className="px-2.5 py-0.5 rounded-full bg-black/90 border border-amber-400/50 text-amber-300 font-mono text-[11px] font-bold shadow-xl flex items-center gap-1">
          <span>☉ SUN</span>
        </div>
      </Html>
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
          camera={{ position: [0, 1.2, 17], fov: 42 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          {/* Deep Space Background Stars */}
          <Stars radius={100} depth={50} count={3500} factor={4} saturation={0.5} fade speed={1} />

          {/* Ambient space illumination */}
          <ambientLight intensity={0.45} />

          {/* Powerful directional sunlight originating from the Sun on the right */}
          <pointLight position={[13.0, 0, 0]} intensity={4.8} color="#FFFBEB" distance={45} decay={1.4} />
          <pointLight position={[-18, 10, 10]} intensity={0.5} color="#38BDF8" />

          {/* Sun on the right */}
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
            maxDistance={25}
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
