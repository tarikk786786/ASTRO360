import React, { useRef, useState, useMemo, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles, Info, RotateCw, CheckCircle2, Compass } from 'lucide-react';
import type { UserProfile } from '../../types';
import { calculatePlanetaryPositions, type PlanetPosition } from '../../lib/astroCalculations';

interface Interactive3DCosmicWheelProps {
  userProfile?: UserProfile;
  onSelectPlanet?: (planetName: string) => void;
}

interface PlanetConfig {
  color: string;
  emissive: string;
  roughness: number;
  metalness: number;
  size: number;
  orbitRadius: number;
  symbol: string;
  title: string;
  simpleMeaning: string;
  lifeArea: string;
}

const ZODIAC_GLYPHS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

const PLANET_CONFIGS: Record<string, PlanetConfig> = {
  'Ascendant': {
    color: '#38BDF8',
    emissive: '#0284C7',
    roughness: 0.2,
    metalness: 0.3,
    size: 0.32,
    orbitRadius: 1.6,
    symbol: '⚡',
    title: 'Ascendant (Lagna)',
    simpleMeaning: 'Your Rising Sign: Physical Self, Health, Vitality & Direct Path in Life.',
    lifeArea: 'Identity & Life Trajectory'
  },
  'Sun': {
    color: '#FBBF24',
    emissive: '#D97706',
    roughness: 0.1,
    metalness: 0.2,
    size: 0.52,
    orbitRadius: 2.3,
    symbol: '☉',
    title: 'Sun (Surya)',
    simpleMeaning: 'Your Core Vitality, True Confidence, Self-Worth & Natural Leadership.',
    lifeArea: 'Career & Soul Authority'
  },
  'Moon': {
    color: '#E0F2FE',
    emissive: '#38BDF8',
    roughness: 0.3,
    metalness: 0.1,
    size: 0.38,
    orbitRadius: 3.0,
    symbol: '☽',
    title: 'Moon (Chandra)',
    simpleMeaning: 'Your Inner Peace, Emotional Balance, Mind Stability & Intuition.',
    lifeArea: 'Emotional Health & Relationships'
  },
  'Mercury': {
    color: '#6EE7B7',
    emissive: '#059669',
    roughness: 0.4,
    metalness: 0.5,
    size: 0.32,
    orbitRadius: 3.7,
    symbol: '☿',
    title: 'Mercury (Budha)',
    simpleMeaning: 'Your Intelligence, Speech, Logical Reasoning & Business Acumen.',
    lifeArea: 'Commerce, Communication & Logic'
  },
  'Venus': {
    color: '#F472B6',
    emissive: '#DB2777',
    roughness: 0.2,
    metalness: 0.3,
    size: 0.42,
    orbitRadius: 4.4,
    symbol: '♀',
    title: 'Venus (Shukra)',
    simpleMeaning: 'Your Attraction, Love, Harmony, Artistic Joy & Refined Luxury.',
    lifeArea: 'Marriage, Art & Pleasure'
  },
  'Mars': {
    color: '#F87171',
    emissive: '#DC2626',
    roughness: 0.3,
    metalness: 0.4,
    size: 0.36,
    orbitRadius: 5.1,
    symbol: '♂',
    title: 'Mars (Mangala)',
    simpleMeaning: 'Your Physical Stamina, Drive, Courage & Decisive Action Power.',
    lifeArea: 'Courage, Energy & Property'
  },
  'Jupiter': {
    color: '#FDE68A',
    emissive: '#CA8A04',
    roughness: 0.25,
    metalness: 0.3,
    size: 0.58,
    orbitRadius: 5.8,
    symbol: '♃',
    title: 'Jupiter (Guru)',
    simpleMeaning: 'Your Luck, High Wisdom, Abundance, Spiritual Growth & Mentorship.',
    lifeArea: 'Wealth, Higher Education & Dharma'
  },
  'Saturn': {
    color: '#DDD6FE',
    emissive: '#7C3AED',
    roughness: 0.35,
    metalness: 0.4,
    size: 0.48,
    orbitRadius: 6.5,
    symbol: '♄',
    title: 'Saturn (Shani)',
    simpleMeaning: 'Your Patience, Karmic Discipline, Focus & Long-Term Enduring Success.',
    lifeArea: 'Mastery, Longevity & Hard Work'
  },
};

function LuxuryPlanetNode({
  planet,
  config,
  isSelected,
  onSelect,
}: {
  planet: PlanetPosition;
  config: PlanetConfig;
  isSelected: boolean;
  onSelect: (name: string) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Angle from degree decimal
  const angleRad = ((planet.degreeDecimal - 90) * Math.PI) / 180;
  const x = config.orbitRadius * Math.cos(angleRad);
  const z = config.orbitRadius * Math.sin(angleRad);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (hovered ? 2.0 : 0.5);
    }
  });

  return (
    <group position={[x, 0, z]}>
      {/* Selected Indicator Vertical Beam */}
      {isSelected && (
        <mesh position={[0, 1.4, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 2.8, 8]} />
          <meshBasicMaterial
            color={config.emissive}
            transparent
            opacity={0.8}
          />
        </mesh>
      )}

      {/* 3D Planet Sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(planet.name);
        }}
        scale={isSelected ? [1.4, 1.4, 1.4] : hovered ? [1.25, 1.25, 1.25] : [1, 1, 1]}
      >
        <sphereGeometry args={[config.size, 32, 32]} />
        <meshStandardMaterial
          color={config.color}
          emissive={config.emissive}
          emissiveIntensity={isSelected ? 1.1 : hovered ? 0.7 : 0.3}
          roughness={config.roughness}
          metalness={config.metalness}
        />
      </mesh>

      {/* Saturn Planetary Ring */}
      {planet.name === 'Saturn' && (
        <mesh rotation={[-Math.PI / 3, 0, 0]}>
          <ringGeometry args={[config.size * 1.35, config.size * 2.2, 32]} />
          <meshStandardMaterial
            color="#E9D5FF"
            emissive="#A855F7"
            emissiveIntensity={0.25}
            transparent
            opacity={0.75}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Floating 3D HTML Badge: Visible on Selected or Hovered, or subtle dot otherwise */}
      <Html position={[0, config.size + 0.3, 0]} center distanceFactor={13}>
        {isSelected || hovered ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(planet.name);
            }}
            className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-xl transition-transform ${
              isSelected
                ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300 scale-110 z-30 font-black'
                : 'bg-white text-slate-950 scale-105 z-20'
            }`}
          >
            <span>{config.symbol}</span>
            <span>{planet.name}</span>
            <span className="opacity-75 text-[9.5px]">({planet.degree})</span>
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(planet.name);
            }}
            className="w-5 h-5 rounded-full bg-black/80 hover:bg-amber-400 text-slate-300 hover:text-slate-950 border border-white/20 hover:border-amber-400 flex items-center justify-center text-[10px] font-mono shadow-md cursor-pointer transition-colors"
            title={`${planet.name} (${planet.sign})`}
          >
            {config.symbol}
          </button>
        )}
      </Html>
    </group>
  );
}

function OrbitTracks() {
  const radii = [1.6, 2.3, 3.0, 3.7, 4.4, 5.1, 5.8, 6.5];
  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      {radii.map((r, i) => (
        <mesh key={i}>
          <ringGeometry args={[r - 0.012, r + 0.012, 128]} />
          <meshBasicMaterial
            color={i === 0 ? '#38BDF8' : i % 2 === 0 ? '#F59E0B' : '#60A5FA'}
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Outer 12-Zodiac Boundary Track */}
      <mesh>
        <ringGeometry args={[7.2 - 0.02, 7.2 + 0.02, 128]} />
        <meshBasicMaterial
          color="#F59E0B"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function ZodiacGlyphRing() {
  return (
    <group>
      {ZODIAC_GLYPHS.map((glyph, i) => {
        const angle = ((i * 30 - 90) * Math.PI) / 180;
        const radius = 7.2;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        return (
          <group key={i} position={[x, 0, z]}>
            <Html center distanceFactor={14}>
              <span className="text-amber-400/60 hover:text-amber-300 text-xs font-mono select-none pointer-events-none">
                {glyph}
              </span>
            </Html>
          </group>
        );
      })}
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

  const activeConfig = PLANET_CONFIGS[activePlanet.name] || PLANET_CONFIGS['Sun'];

  const handleSelect = (name: string) => {
    setSelectedPlanetName(name);
    if (onSelectPlanet) onSelectPlanet(name);
  };

  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-b from-[#0C1322] via-[#080D18] to-[#04060E] border border-amber-400/30 p-4 sm:p-6 shadow-2xl overflow-hidden text-left space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-amber-400/15 text-amber-400 border border-amber-400/30">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-base sm:text-lg font-black text-white font-sans tracking-tight">
              Interactive 3D Planetary Orrery
            </h3>
            <span className="text-[10.5px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              Touch & Spin
            </span>
          </div>
          <p className="text-xs text-slate-300 font-sans">
            Real planetary positions calculated from your birth moment. Click or tap any planet to inspect its plain-English meaning.
          </p>
        </div>

        {/* Planet Jump Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {Object.keys(PLANET_CONFIGS).map((pName) => {
            const isSelected = selectedPlanetName === pName;
            const cfg = PLANET_CONFIGS[pName];
            return (
              <button
                key={pName}
                onClick={() => handleSelect(pName)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/25 scale-105'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                <span>{cfg.symbol}</span>
                <span>{pName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 3D Canvas & Insight Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* 3D WebGL Canvas (7 cols) */}
        <div className="lg:col-span-7 h-[300px] sm:h-[360px] relative rounded-2xl bg-[#03060C] border border-white/10 overflow-hidden shadow-inner">
          <Canvas
            camera={{ position: [0, 11, 8.5], fov: 46 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <ambientLight intensity={0.9} />
            <pointLight position={[0, 0, 0]} intensity={3.5} color="#FFFBEB" />
            <pointLight position={[10, 15, 10]} intensity={1.5} color="#93C5FD" />
            <pointLight position={[-10, -10, -10]} intensity={0.8} color="#C084FC" />

            <Float speed={1.0} rotationIntensity={0.15} floatIntensity={0.2}>
              <group position={[0, 0, 0]}>
                {/* Concentric Golden Orbit Guides */}
                <OrbitTracks />

                {/* Outer 12-Zodiac Glyph Ring */}
                <ZodiacGlyphRing />

                {/* Central Luminous Solar Anchor */}
                <mesh>
                  <sphereGeometry args={[0.5, 32, 32]} />
                  <meshStandardMaterial
                    color="#FDE047"
                    emissive="#F59E0B"
                    emissiveIntensity={1.2}
                    roughness={0.1}
                  />
                </mesh>

                {/* 8 Orbiting Planetary Meshes (Includes Ascendant + 7 Planets) */}
                {planets.slice(0, 8).map((p) => {
                  const cfg = PLANET_CONFIGS[p.name] || PLANET_CONFIGS['Sun'];
                  return (
                    <LuxuryPlanetNode
                      key={p.name}
                      planet={p}
                      config={cfg}
                      isSelected={selectedPlanetName === p.name}
                      onSelect={handleSelect}
                    />
                  );
                })}
              </group>
            </Float>

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2.1}
              minPolarAngle={Math.PI / 8}
            />
          </Canvas>

          {/* Floating Interaction Hint */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-[11px] font-mono text-slate-300 pointer-events-none">
            <RotateCw className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>Drag to rotate 360° • Click any node to inspect</span>
          </div>
        </div>

        {/* Right: Plain-English Meaning Card (5 cols) */}
        <div className="lg:col-span-5 space-y-3.5">
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-amber-400/40 space-y-4 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg font-black shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${activeConfig.color}, ${activeConfig.emissive})`,
                    color: '#090D16'
                  }}
                >
                  {activeConfig.symbol}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white font-sans">
                    {activeConfig.title}
                  </h4>
                  <span className="text-xs font-mono text-amber-300 font-bold">
                    {activePlanet.sign} • {activePlanet.degree}
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-amber-400/15 text-amber-300 border border-amber-400/30">
                House {activePlanet.house || 1}
              </span>
            </div>

            {/* Plain English Translation Block */}
            <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-cyan-400" /> What this means in simple words:
              </span>
              <p className="text-xs sm:text-sm text-slate-100 font-sans leading-relaxed">
                {activeConfig.simpleMeaning}
              </p>
            </div>

            {/* Primary Impact Area */}
            <div className="flex items-center justify-between text-xs font-mono pt-1">
              <span className="text-slate-400">Primary Life Impact:</span>
              <span className="font-bold text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                {activeConfig.lifeArea}
              </span>
            </div>
          </div>

          {/* Quick Helpful Astrological Guide Note */}
          <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs font-sans text-slate-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="leading-snug">
              Every planet governs a distinct dimension of your life. Spin the 3D model and tap each planet above to see your complete natal profile.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Interactive3DCosmicWheel;
