import React, { useRef, useState, useMemo, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Globe, MapPin, Sparkles, Compass, ArrowRight, RotateCw, CheckCircle2, Award } from 'lucide-react';
import type { UserProfile } from '../../types';

export interface WorldCityPin {
  name: string;
  country: string;
  lat: number;
  lng: number;
  dominantPlanet: string;
  planetSymbol: string;
  lineType: 'Midheaven (Career)' | 'Ascendant (Self)' | 'Descendant (Love)' | 'IC (Home & Roots)';
  color: string;
  category: 'Career & Authority' | 'Love & Marriage' | 'Wealth & Business' | 'Peace & Healing';
  powerScore: number;
  recommendation: string;
}

export const WORLD_CITIES: WorldCityPin[] = [
  {
    name: 'New York',
    country: 'United States',
    lat: 40.7128,
    lng: -74.006,
    dominantPlanet: 'Sun',
    planetSymbol: '☉',
    lineType: 'Midheaven (Career)',
    color: '#F59E0B',
    category: 'Career & Authority',
    powerScore: 96,
    recommendation: 'Sun Midheaven zenith line activates public authority, executive visibility, media recognition, and leadership milestones.'
  },
  {
    name: 'London',
    country: 'United Kingdom',
    lat: 51.5074,
    lng: -0.1278,
    dominantPlanet: 'Mercury',
    planetSymbol: '☿',
    lineType: 'Midheaven (Career)',
    color: '#06B6D4',
    category: 'Wealth & Business',
    powerScore: 92,
    recommendation: 'Mercury MC line sharpens legal negotiation, financial trade, intellectual publishing, and multi-national enterprise.'
  },
  {
    name: 'Dubai',
    country: 'United Arab Emirates',
    lat: 25.2048,
    lng: 55.2708,
    dominantPlanet: 'Jupiter',
    planetSymbol: '♃',
    lineType: 'Midheaven (Career)',
    color: '#10B981',
    category: 'Wealth & Business',
    powerScore: 98,
    recommendation: 'Jupiter Zenith ray expands capital liquidity, institutional scale, major commercial contracts, and tax-efficient wealth accumulation.'
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    lat: 35.6762,
    lng: 139.6503,
    dominantPlanet: 'Venus',
    planetSymbol: '♀',
    lineType: 'Ascendant (Self)',
    color: '#EC4899',
    category: 'Love & Marriage',
    powerScore: 94,
    recommendation: 'Venus Ascendant line enhances personal magnetism, aesthetic creativity, cultural harmony, and soulmate connections.'
  },
  {
    name: 'Paris',
    country: 'France',
    lat: 48.8566,
    lng: 2.3522,
    dominantPlanet: 'Venus',
    planetSymbol: '♀',
    lineType: 'Descendant (Love)',
    color: '#F43F5E',
    category: 'Love & Marriage',
    powerScore: 91,
    recommendation: 'Venus Descendant meridian deepens romantic alliances, artistic collaborations, and gracious social diplomacy.'
  },
  {
    name: 'Zurich',
    country: 'Switzerland',
    lat: 47.3769,
    lng: 8.5417,
    dominantPlanet: 'Saturn',
    planetSymbol: '♄',
    lineType: 'Midheaven (Career)',
    color: '#8B5CF6',
    category: 'Wealth & Business',
    powerScore: 89,
    recommendation: 'Saturn Midheaven line provides unshakeable institutional discipline, wealth preservation, and multi-decade commercial foundations.'
  },
  {
    name: 'Singapore',
    country: 'Singapore',
    lat: 1.3521,
    lng: 103.8198,
    dominantPlanet: 'Jupiter',
    planetSymbol: '♃',
    lineType: 'Ascendant (Self)',
    color: '#FBBF24',
    category: 'Wealth & Business',
    powerScore: 95,
    recommendation: 'Jupiter Ascendant line grants effortless good fortune, executive charisma, robust health, and high status in the Asia-Pacific corridor.'
  },
  {
    name: 'San Francisco',
    country: 'United States',
    lat: 37.7749,
    lng: -122.4194,
    dominantPlanet: 'Uranus / Mercury',
    planetSymbol: '♅',
    lineType: 'Midheaven (Career)',
    color: '#38BDF8',
    category: 'Career & Authority',
    powerScore: 93,
    recommendation: 'Uranus-Mercury meridian sparks breakthrough technological invention, venture capital funding, and disruptive innovation.'
  },
  {
    name: 'Mumbai',
    country: 'India',
    lat: 19.076,
    lng: 72.8777,
    dominantPlanet: 'Moon',
    planetSymbol: '☽',
    lineType: 'IC (Home & Roots)',
    color: '#93C5FD',
    category: 'Peace & Healing',
    powerScore: 90,
    recommendation: 'Moon IC line anchors deep ancestral belonging, inner contentment, intuitive emotional clarity, and real estate prosperity.'
  },
  {
    name: 'Sydney',
    country: 'Australia',
    lat: -33.8688,
    lng: 151.2093,
    dominantPlanet: 'Sun',
    planetSymbol: '☉',
    lineType: 'Ascendant (Self)',
    color: '#F59E0B',
    category: 'Career & Authority',
    powerScore: 88,
    recommendation: 'Sun Ascendant line elevates physical vitality, outdoor energy, entrepreneurial courage, and public self-expression.'
  },
  {
    name: 'Bali',
    country: 'Indonesia',
    lat: -8.3405,
    lng: 115.092,
    dominantPlanet: 'Neptune / Ketu',
    planetSymbol: '♆',
    lineType: 'IC (Home & Roots)',
    color: '#A7F3D0',
    category: 'Peace & Healing',
    powerScore: 96,
    recommendation: 'Spiritual vortex axis fostering deep somatic meditation, chakra alignment, creative writing, and nervous system restoration.'
  },
  {
    name: 'Cairo',
    country: 'Egypt',
    lat: 30.0444,
    lng: 31.2357,
    dominantPlanet: 'Mars',
    planetSymbol: '♂',
    lineType: 'Midheaven (Career)',
    color: '#EF4444',
    category: 'Career & Authority',
    powerScore: 87,
    recommendation: 'Mars Midheaven line injects ferocious ambition, athletic stamina, and rapid conquest of competitive obstacles.'
  }
];

// Convert Lat/Lng to 3D Cartesian coordinates on sphere of radius R
function latLngToVector3(lat: number, lng: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return [x, y, z];
}

function CityPin3D({
  city,
  isSelected,
  onSelect,
}: {
  city: WorldCityPin;
  isSelected: boolean;
  onSelect: (c: WorldCityPin) => void;
}) {
  const [x, y, z] = useMemo(() => latLngToVector3(city.lat, city.lng, 3.03), [city.lat, city.lng]);
  const [hovered, setHovered] = useState(false);

  return (
    <group position={[x, y, z]}>
      {/* 3D Surface Pin Point */}
      <mesh
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => { e.stopPropagation(); onSelect(city); }}
        scale={isSelected ? [1.6, 1.6, 1.6] : hovered ? [1.3, 1.3, 1.3] : [1, 1, 1]}
      >
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial
          color={city.color}
          emissive={city.color}
          emissiveIntensity={isSelected ? 1.5 : 0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Floating 3D City Tag */}
      {(isSelected || hovered) && (
        <Html position={[0, 0.25, 0]} center distanceFactor={11}>
          <button
            onClick={(e) => { e.stopPropagation(); onSelect(city); }}
            className={`px-2.5 py-1 rounded-full text-[10.5px] font-mono font-bold whitespace-nowrap shadow-xl flex items-center gap-1 cursor-pointer transition-transform ${
              isSelected
                ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300 scale-110'
                : 'bg-black/90 text-white border border-white/30'
            }`}
          >
            <span>{city.planetSymbol}</span>
            <span>{city.name}</span>
            <span className="text-[9px] opacity-80">({city.powerScore}%)</span>
          </button>
        </Html>
      )}
    </group>
  );
}

function PlanetaryMeridianLines() {
  return (
    <group>
      {/* Golden Sun & Jupiter Meridian Rings */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <ringGeometry args={[3.04, 3.05, 96]} />
        <meshBasicMaterial color="#F59E0B" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 6, 0, -Math.PI / 3]}>
        <ringGeometry args={[3.04, 3.05, 96]} />
        <meshBasicMaterial color="#10B981" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
        <ringGeometry args={[3.04, 3.05, 96]} />
        <meshBasicMaterial color="#EC4899" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export const Interactive3DAstroCartographyGlobe: React.FC<{
  userProfile?: UserProfile;
  onSelectCity?: (city: WorldCityPin) => void;
}> = memo(({ userProfile, onSelectCity }) => {
  const [selectedCity, setSelectedCity] = useState<WorldCityPin>(WORLD_CITIES[0]);

  const handleSelect = (city: WorldCityPin) => {
    setSelectedCity(city);
    if (onSelectCity) onSelectCity(city);
  };

  return (
    <div className="w-full rounded-3xl bg-gradient-to-b from-[#0B1322] via-[#070D18] to-[#04060E] border border-cyan-500/30 p-4 sm:p-6 shadow-2xl space-y-4 text-left">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
              <Globe className="w-4 h-4" />
            </span>
            <h3 className="text-base sm:text-lg font-black text-white font-sans tracking-tight">
              Interactive 3D AstroCartography Global Radar
            </h3>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30">
              Spin Earth Globe
            </span>
          </div>
          <p className="text-xs text-slate-300 font-sans">
            Discover where your planets cross worldwide cities. Drag to rotate the globe, click any glowing city pin to see your relocation power rating.
          </p>
        </div>

        {/* Quick City Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {WORLD_CITIES.slice(0, 6).map((c) => {
            const isSelected = selectedCity.name === c.name;
            return (
              <button
                key={c.name}
                onClick={() => handleSelect(c)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/25 scale-105'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D WebGL Globe & Detailed City Intel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left: 3D WebGL Earth Globe (7 cols) */}
        <div className="lg:col-span-7 h-[320px] sm:h-[380px] relative rounded-2xl bg-[#03060C] border border-white/10 overflow-hidden shadow-inner">
          <Canvas
            camera={{ position: [0, 2, 7.5], fov: 45 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={2.5} color="#E0F2FE" />
            <pointLight position={[-10, -10, -10]} intensity={1.2} color="#FBBF24" />

            <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.15}>
              <group position={[0, 0, 0]}>
                {/* 3D Earth Globe Sphere */}
                <mesh>
                  <sphereGeometry args={[3.0, 64, 64]} />
                  <meshStandardMaterial
                    color="#0F1F3D"
                    emissive="#081426"
                    roughness={0.4}
                    metalness={0.3}
                  />
                </mesh>

                {/* Atmospheric Rim Glow */}
                <mesh scale={[1.05, 1.05, 1.05]}>
                  <sphereGeometry args={[3.0, 32, 32]} />
                  <meshBasicMaterial
                    color="#38BDF8"
                    transparent
                    opacity={0.12}
                    blending={THREE.AdditiveBlending}
                    side={THREE.BackSide}
                  />
                </mesh>

                {/* Great Circle Planetary Lines */}
                <PlanetaryMeridianLines />

                {/* 3D City Pins */}
                {WORLD_CITIES.map((c) => (
                  <CityPin3D
                    key={c.name}
                    city={c}
                    isSelected={selectedCity.name === c.name}
                    onSelect={handleSelect}
                  />
                ))}
              </group>
            </Float>

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 1.6}
              minPolarAngle={Math.PI / 4}
            />
          </Canvas>

          {/* Floating Hint */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-[11px] font-mono text-slate-300 pointer-events-none">
            <RotateCw className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>Spin globe in 3D • Tap any glowing pin to inspect</span>
          </div>
        </div>

        {/* Right: Selected Relocation City Intelligence Card (5 cols) */}
        <div className="lg:col-span-5 space-y-3.5">
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-cyan-400/40 space-y-4 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg font-black shadow-lg"
                  style={{ background: selectedCity.color, color: '#090D16' }}
                >
                  {selectedCity.planetSymbol}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white font-sans flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-400" /> {selectedCity.name}, {selectedCity.country}
                  </h4>
                  <span className="text-xs font-mono text-cyan-300">
                    {selectedCity.dominantPlanet} • {selectedCity.lineType}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-mono font-black text-emerald-400 block">{selectedCity.powerScore}%</span>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Power Level</span>
              </div>
            </div>

            {/* Recommendation Narrative */}
            <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-1.5">
              <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Relocation Impact & Energy:
              </span>
              <p className="text-xs sm:text-sm text-slate-100 font-sans leading-relaxed">
                {selectedCity.recommendation}
              </p>
            </div>

            {/* Best For Life Area Badge */}
            <div className="flex items-center justify-between text-xs font-mono pt-1">
              <span className="text-slate-400">Best Life Domain:</span>
              <span className="font-bold text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                {selectedCity.category}
              </span>
            </div>
          </div>

          {/* Non-Tech Explanation Tip */}
          <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs font-sans text-slate-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong>How this works:</strong> As the Earth rotates, planets align with your zenith over specific geographical lines. Moving, traveling, or remote-working in these zones activates those specific planetary gifts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Interactive3DAstroCartographyGlobe;
