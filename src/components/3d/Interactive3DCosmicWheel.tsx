import React, { useRef, useState, useMemo, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles, Info, ArrowRight, RotateCw } from 'lucide-react';
import type { UserProfile } from '../../types';
import { calculatePlanetaryPositions, type PlanetPosition } from '../../lib/astroCalculations';

interface Interactive3DCosmicWheelProps {
  userProfile?: UserProfile;
  onSelectPlanet?: (planetName: string) => void;
}

const PLANET_METADATA: Record<string, { color: string; glow: string; size: number; symbol: string; simpleMeaning: string; lifeArea: string }> = {
  'Sun': { color: '#FCD34D', glow: '#F59E0B', size: 0.55, symbol: '☉', simpleMeaning: 'Your Core Confidence, Vitality & Purpose', lifeArea: 'Career & Soul Authority' },
  'Moon': { color: '#F1F5F9', glow: '#93C5FD', size: 0.42, symbol: '☽', simpleMeaning: 'Your Inner Peace, Mind & Emotions', lifeArea: 'Relationships & Happiness' },
  'Mars': { color: '#F87171', glow: '#DC2626', size: 0.38, symbol: '♂', simpleMeaning: 'Your Courage, Drive & Action Power', lifeArea: 'Ambition & Physical Energy' },
  'Mercury': { color: '#6EE7B7', glow: '#059669', size: 0.32, symbol: '☿', simpleMeaning: 'Your Speech, Intellect & Decision-Making', lifeArea: 'Business, Communication & Logic' },
  'Jupiter': { color: '#FBBF24', glow: '#D97706', size: 0.65, symbol: '♃', simpleMeaning: 'Your Luck, Wisdom, Expansion & Wealth', lifeArea: 'Higher Knowledge & Prosperity' },
  'Venus': { color: '#F472B6', glow: '#DB2777', size: 0.46, symbol: '♀', simpleMeaning: 'Your Love, Harmony, Beauty & Luxury', lifeArea: 'Marriage, Art & Pleasures' },
  'Saturn': { color: '#C084FC', glow: '#7C3AED', size: 0.52, symbol: '♄', simpleMeaning: 'Your Discipline, Karma & Long-Term Mastery', lifeArea: 'Life Structure & Enduring Success' },
};

function PlanetMesh({ 
  planet, 
  radius, 
  isSelected, 
  onSelect 
}: { 
  planet: PlanetPosition; 
  radius: number; 
  isSelected: boolean; 
  onSelect: (name: string) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const meta = PLANET_METADATA[planet.name] || { color: '#FCD34D', glow: '#F59E0B', size: 0.35, symbol: '✦', simpleMeaning: 'Celestial Body', lifeArea: 'Cosmic Influence' };

  // Calculate Cartesian position on 360-degree circle
  const angleRad = ((planet.degreeDecimal - 90) * Math.PI) / 180;
  const x = radius * Math.cos(angleRad);
  const z = radius * Math.sin(angleRad);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (hovered ? 1.5 : 0.4);
    }
  });

  return (
    <group position={[x, 0, z]}>
      {/* 3D Planet Core */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => { e.stopPropagation(); onSelect(planet.name); }}
        scale={isSelected ? [1.4, 1.4, 1.4] : hovered ? [1.25, 1.25, 1.25] : [1, 1, 1]}
      >
        <sphereGeometry args={[meta.size, 32, 32]} />
        <meshStandardMaterial
          color={meta.color}
          emissive={meta.glow}
          emissiveIntensity={hovered || isSelected ? 0.8 : 0.3}
          roughness={0.2}
          metalness={0.4}
        />
      </mesh>

      {/* Atmospheric Glow Aura */}
      <mesh scale={[2.2, 2.2, 2.2]}>
        <sphereGeometry args={[meta.size, 16, 16]} />
        <meshBasicMaterial
          color={meta.glow}
          transparent
          opacity={hovered || isSelected ? 0.45 : 0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Saturn Planetary Ring Special Effect */}
      {planet.name === 'Saturn' && (
        <mesh rotation={[-Math.PI / 2.5, 0, 0]}>
          <ringGeometry args={[meta.size * 1.5, meta.size * 2.4, 32]} />
          <meshBasicMaterial
            color="#E9D5FF"
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

function CosmicOrbitRings({ radius }: { radius: number }) {
  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      {/* Outer Ecliptic Halo */}
      <mesh>
        <ringGeometry args={[radius - 0.04, radius + 0.04, 128]} />
        <meshBasicMaterial
          color="#F59E0B"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Inner Concentric Guide */}
      <mesh>
        <ringGeometry args={[radius * 0.6 - 0.02, radius * 0.6 + 0.02, 96]} />
        <meshBasicMaterial
          color="#06B6D4"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export const Interactive3DCosmicWheel: React.FC<Interactive3DCosmicWheelProps> = memo(({
  userProfile,
  onSelectPlanet,
}) => {
  const [selectedPlanetName, setSelectedPlanetName] = useState<string>('Sun');

  const planets: PlanetPosition[] = useMemo(() => {
    try {
      return calculatePlanetaryPositions(
        userProfile?.dob || '1998-06-15',
        userProfile?.time || '12:00'
      );
    } catch {
      return [];
    }
  }, [userProfile?.dob, userProfile?.time]);

  const activePlanet = useMemo(() => {
    return planets.find(p => p.name === selectedPlanetName) || planets[0] || {
      name: 'Sun',
      sign: 'Cancer ♋',
      degree: '28°14\'',
      degreeDecimal: 118.23,
      nakshatra: 'Pushya',
      pada: 3,
      house: 10,
    };
  }, [planets, selectedPlanetName]);

  const activeMeta = PLANET_METADATA[activePlanet.name] || {
    color: '#FCD34D',
    glow: '#F59E0B',
    size: 0.5,
    symbol: '✦',
    simpleMeaning: 'Your Natural Vitality & Leadership Energy',
    lifeArea: 'Career & Authority'
  };

  const handleSelect = (name: string) => {
    setSelectedPlanetName(name);
    if (onSelectPlanet) onSelectPlanet(name);
  };

  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-b from-[#0B1220]/90 via-[#070B14]/95 to-[#04060E] border border-amber-400/25 p-4 sm:p-6 shadow-2xl overflow-hidden text-left">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </span>
            <h3 className="text-base sm:text-lg font-black text-white font-sans tracking-tight">
              Interactive 3D Cosmic Sphere
            </h3>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/25">
              Touch & Spin
            </span>
          </div>
          <p className="text-xs text-slate-400 font-sans">
            Your real birth planets orbiting in 3D space. Drag with mouse or finger to rotate. Click any glowing planet below.
          </p>
        </div>

        {/* 1-Tap Planet Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none font-mono text-xs">
          {['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'].map((pName) => {
            const isSelected = selectedPlanetName === pName;
            const meta = PLANET_METADATA[pName];
            return (
              <button
                key={pName}
                onClick={() => handleSelect(pName)}
                className={`px-2.5 py-1 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20 scale-105'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                <span className="text-xs">{meta?.symbol}</span>
                <span className="text-[11px]">{pName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Center 3D WebGL Canvas & Live Explanation Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center pt-4">
        {/* Left: 3D Interactive WebGL Orbit Canvas (7 cols) */}
        <div className="lg:col-span-7 h-[280px] sm:h-[340px] relative rounded-2xl bg-[#03060C]/90 border border-white/8 overflow-hidden">
          <Canvas
            camera={{ position: [0, 8, 12], fov: 42 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <ambientLight intensity={0.8} />
            <pointLight position={[0, 0, 0]} intensity={2.5} color="#FFFBEB" />
            <pointLight position={[10, 10, 10]} intensity={1.2} color="#60A5FA" />
            
            <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
              <group position={[0, 0, 0]}>
                {/* Sun Core in Center */}
                <mesh>
                  <sphereGeometry args={[0.7, 32, 32]} />
                  <meshStandardMaterial color="#FDE047" emissive="#F59E0B" emissiveIntensity={1} />
                </mesh>
                <mesh scale={[2.4, 2.4, 2.4]}>
                  <sphereGeometry args={[0.7, 16, 16]} />
                  <meshBasicMaterial color="#F59E0B" transparent opacity={0.25} blending={THREE.AdditiveBlending} />
                </mesh>

                {/* Orbit Concentric Rings */}
                <CosmicOrbitRings radius={5.5} />

                {/* Orbiting Planetary Meshes */}
                {planets.slice(0, 7).map((p) => (
                  <PlanetMesh
                    key={p.name}
                    planet={p}
                    radius={5.5}
                    isSelected={selectedPlanetName === p.name}
                    onSelect={handleSelect}
                  />
                ))}
              </group>
            </Float>

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.8}
              maxPolarAngle={Math.PI / 2.1}
              minPolarAngle={Math.PI / 6}
            />
          </Canvas>

          {/* Quick Helper Floating Overlay */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10.5px] font-mono text-slate-300 pointer-events-none">
            <RotateCw className="w-3 h-3 text-amber-400 animate-spin" />
            <span>Spin with mouse / finger to explore</span>
          </div>
        </div>

        {/* Right: Plain-English "What This Means For You" Card (5 cols) */}
        <div className="lg:col-span-5 space-y-3.5">
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-amber-400/30 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold shadow-inner"
                  style={{ background: `linear-gradient(135deg, ${activeMeta.color}, ${activeMeta.glow})`, color: '#090D16' }}
                >
                  {activeMeta.symbol}
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white font-sans flex items-center gap-1.5">
                    {activePlanet.name} in {activePlanet.sign}
                  </h4>
                  <span className="text-[11px] font-mono text-amber-400">
                    {activePlanet.degree} • House {activePlanet.house || 1}
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/25">
                {activePlanet.nakshatra || 'Vital Star'}
              </span>
            </div>

            {/* Plain English Translation Block */}
            <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Info className="w-3 h-3 text-cyan-400" /> What this means in simple words:
              </span>
              <p className="text-xs sm:text-sm text-slate-100 font-sans leading-relaxed">
                {activeMeta.simpleMeaning}
              </p>
            </div>

            {/* Life Focus Area Badge */}
            <div className="flex items-center justify-between text-xs font-mono text-slate-300 pt-1">
              <span className="text-slate-400">Primary Impact:</span>
              <span className="font-bold text-amber-300">{activeMeta.lifeArea}</span>
            </div>
          </div>

          {/* Quick Guide Tips for Non-Tech Users */}
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs font-sans text-slate-300 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong>Beginner Tip:</strong> The Sun represents who you are, the Moon reveals your mind & happiness, and the Ascendant is your path of success.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Interactive3DCosmicWheel;
