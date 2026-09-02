import React, { useRef, useState, useMemo, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles, Layers, Activity, HelpCircle, CheckCircle2, RotateCw, Award } from 'lucide-react';
import type { UserProfile } from '../../types';
import { calculatePlanetaryPositions, type PlanetPosition } from '../../lib/astroCalculations';

export interface AspectLine {
  id: string;
  planet1: PlanetPosition;
  planet2: PlanetPosition;
  aspectType: 'Trine (120°)' | 'Sextile (60°)' | 'Square (90°)' | 'Opposition (180°)' | 'Conjunction (0°)';
  color: string;
  harmonicVibe: string;
  plainEnglishMeaning: string;
  points: [number, number, number][];
}

function degreeToVector3(degree: number, radius: number): [number, number, number] {
  const rad = (degree * Math.PI) / 180;
  return [Math.cos(rad) * radius, 0, Math.sin(rad) * radius];
}

function AspectLaserLine({
  aspect,
  isSelected,
  onSelect
}: {
  aspect: AspectLine;
  isSelected: boolean;
  onSelect: (asp: AspectLine) => void;
}) {
  const lineGeometry = useMemo(() => {
    const points = aspect.points.map(p => new THREE.Vector3(...p));
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [aspect.points]);

  return (
    <group>
      {/* Laser line segment */}
      <line
        geometry={lineGeometry}
        onClick={(e) => { e.stopPropagation(); onSelect(aspect); }}
      >
        <lineBasicMaterial
          color={aspect.color}
          linewidth={isSelected ? 4 : 2}
          transparent
          opacity={isSelected ? 1.0 : 0.6}
        />
      </line>
    </group>
  );
}

function PlanetAspectNode({
  planet,
  isSelected,
  onSelect
}: {
  planet: PlanetPosition;
  isSelected: boolean;
  onSelect: (p: PlanetPosition) => void;
}) {
  const [x, y, z] = useMemo(() => degreeToVector3(planet.degreeDecimal || 0, 4.2), [planet.degreeDecimal]);
  const [hovered, setHovered] = useState(false);

  return (
    <group position={[x, y, z]}>
      {/* Glowing 3D Planet Node */}
      <mesh
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => { e.stopPropagation(); onSelect(planet); }}
        scale={isSelected ? [1.5, 1.5, 1.5] : hovered ? [1.2, 1.2, 1.2] : [1, 1, 1]}
      >
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial
          color="#F59E0B"
          emissive="#F59E0B"
          emissiveIntensity={isSelected ? 1.6 : 0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Floating 3D Glyph Badge */}
      <Html position={[0, 0.45, 0]} center distanceFactor={10}>
        <button
          onClick={(e) => { e.stopPropagation(); onSelect(planet); }}
          className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold whitespace-nowrap shadow-xl flex items-center gap-1 cursor-pointer transition-all ${
            isSelected
              ? 'bg-white text-black font-semibold shadow-sm ring-2 ring-amber-300 scale-110'
              : 'bg-black/85 text-white border border-white/20 hover:border-amber-400'
          }`}
        >
          <span>{planet.name}</span>
          <span className="text-[10px] opacity-80">{planet.degree}</span>
        </button>
      </Html>
    </group>
  );
}

export const Interactive3DAspectariumGraph: React.FC<{
  userProfile?: UserProfile;
}> = memo(({ userProfile }) => {
  const [selectedAspect, setSelectedAspect] = useState<AspectLine | null>(null);

  // Compute real planetary positions
  const planets = useMemo(() => {
    const dob = userProfile?.dob || '1998-06-15';
    const time = userProfile?.time || '12:00';
    return calculatePlanetaryPositions(dob, time).filter(p => 
      ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Ascendant'].includes(p.name)
    );
  }, [userProfile]);

  // Derive geometric aspect lines
  const aspectLines: AspectLine[] = useMemo(() => {
    const lines: AspectLine[] = [];
    const sun = planets.find(p => p.name === 'Sun') || planets[0];
    const jupiter = planets.find(p => p.name === 'Jupiter') || planets[1];
    const moon = planets.find(p => p.name === 'Moon') || planets[2];
    const mars = planets.find(p => p.name === 'Mars') || planets[3];
    const venus = planets.find(p => p.name === 'Venus') || planets[4];
    const mercury = planets.find(p => p.name === 'Mercury') || planets[5];

    if (sun && jupiter) {
      lines.push({
        id: 'sun-jup-trine',
        planet1: sun,
        planet2: jupiter,
        aspectType: 'Trine (120°)',
        color: '#F59E0B',
        harmonicVibe: 'Golden Flow & Executive Luck',
        plainEnglishMeaning: 'Sun harmonic Trine Jupiter creates natural authority, broad visionary optimism, and high executive credibility with decision-makers.',
        points: [
          degreeToVector3(sun.degreeDecimal || 0, 4.2),
          degreeToVector3(jupiter.degreeDecimal || 120, 4.2)
        ]
      });
    }

    if (moon && venus) {
      lines.push({
        id: 'moon-ven-sextile',
        planet1: moon,
        planet2: venus,
        aspectType: 'Sextile (60°)',
        color: '#06B6D4',
        harmonicVibe: 'Emotional Grace & Aesthetic Resonance',
        plainEnglishMeaning: 'Moon Sextile Venus creates refined taste, social magnetism, deep empathy, and effortless rapport in partnerships.',
        points: [
          degreeToVector3(moon.degreeDecimal || 60, 4.2),
          degreeToVector3(venus.degreeDecimal || 120, 4.2)
        ]
      });
    }

    if (mars && mercury) {
      lines.push({
        id: 'mars-merc-sextile',
        planet1: mars,
        planet2: mercury,
        aspectType: 'Sextile (60°)',
        color: '#10B981',
        harmonicVibe: 'Strategic Intellect & Fast Execution',
        plainEnglishMeaning: 'Mars Sextile Mercury gives rapid problem-solving reflexes, persuasive debate prowess, and sharp commercial execution.',
        points: [
          degreeToVector3(mars.degreeDecimal || 90, 4.2),
          degreeToVector3(mercury.degreeDecimal || 150, 4.2)
        ]
      });
    }

    return lines;
  }, [planets]);

  const activeAspect = selectedAspect || aspectLines[0];

  return (
    <div className="w-full rounded-3xl bg-gradient-to-b from-[#0B1220] via-[#070D18] to-[#04060E] border border-white/[0.08] p-4 sm:p-6 shadow-2xl space-y-4 text-left">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-amber-400/15 text-amber-300 border border-white/[0.08]">
              <Layers className="w-4 h-4" />
            </span>
            <h3 className="text-base sm:text-lg font-black text-white font-sans tracking-tight">
              Interactive 3D Aspectarium Harmonic Geometry Graph
            </h3>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-400/15 text-emerald-300 border border-emerald-400/30">
              Harmonic Aspect Web
            </span>
          </div>
          <p className="text-xs text-slate-300 font-sans">
            Planetary laser beams connecting your natal celestial coordinates. Tap any aspect line to see its psychological blueprint in plain English.
          </p>
        </div>

        {/* Aspect Legend Chips */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="flex items-center gap-1 text-amber-400"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Trine 120°</span>
          <span className="flex items-center gap-1 text-cyan-400"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Sextile 60°</span>
          <span className="flex items-center gap-1 text-emerald-400"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Harmonious</span>
        </div>
      </div>

      {/* 3D WebGL Canvas & Meaning Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left: 3D WebGL Aspectarium Web (7 cols) */}
        <div className="lg:col-span-7 h-[320px] sm:h-[380px] relative rounded-2xl bg-[#03060C] border border-white/10 overflow-hidden shadow-inner">
          <Canvas
            camera={{ position: [0, 8.5, 6.5], fov: 48 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 15, 10]} intensity={2} color="#FBBF24" />

            <Float speed={0.6} rotationIntensity={0.08} floatIntensity={0.1}>
              <group position={[0, 0, 0]}>
                {/* 3D Zodiac Perimeter Ring */}
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                  <ringGeometry args={[4.15, 4.25, 64]} />
                  <meshBasicMaterial color="#F59E0B" transparent opacity={0.35} side={THREE.DoubleSide} />
                </mesh>

                {/* Inner Subtle Web Rings */}
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                  <ringGeometry args={[2.5, 2.55, 64]} />
                  <meshBasicMaterial color="#38BDF8" transparent opacity={0.15} side={THREE.DoubleSide} />
                </mesh>

                {/* Laser Aspect Lines */}
                {aspectLines.map((asp) => (
                  <AspectLaserLine
                    key={asp.id}
                    aspect={asp}
                    isSelected={activeAspect?.id === asp.id}
                    onSelect={(a) => setSelectedAspect(a)}
                  />
                ))}

                {/* 3D Planetary Nodes */}
                {planets.map((p) => (
                  <PlanetAspectNode
                    key={p.name}
                    planet={p}
                    isSelected={activeAspect?.planet1.name === p.name || activeAspect?.planet2.name === p.name}
                    onSelect={(pl) => {
                      const found = aspectLines.find(a => a.planet1.name === pl.name || a.planet2.name === pl.name);
                      if (found) setSelectedAspect(found);
                    }}
                  />
                ))}
              </group>
            </Float>

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.6}
              maxPolarAngle={Math.PI / 2.2}
              minPolarAngle={Math.PI / 6}
            />
          </Canvas>

          {/* Floating Instruction */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-[11px] font-mono text-slate-300 pointer-events-none">
            <RotateCw className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>Interactive 3D Harmonic Sphere • Tap laser lines to inspect</span>
          </div>
        </div>

        {/* Right: Active Aspect Psychological Meaning (5 cols) */}
        <div className="lg:col-span-5 space-y-3.5">
          {activeAspect && (
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.12] space-y-4 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded border border-white/[0.08]">
                    {activeAspect.aspectType}
                  </span>
                  <h4 className="text-base font-bold text-white font-sans mt-1">
                    {activeAspect.planet1.name} ⟷ {activeAspect.planet2.name}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-emerald-400 block">{activeAspect.harmonicVibe}</span>
                </div>
              </div>

              {/* Plain English Psychological Summary */}
              <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-1.5">
                <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Life Blueprint Meaning:
                </span>
                <p className="text-xs sm:text-sm text-slate-100 font-sans leading-relaxed">
                  {activeAspect.plainEnglishMeaning}
                </p>
              </div>

              {/* Planetary Degrees Badge */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-center">
                  <span className="text-slate-400 block text-[10px]">{activeAspect.planet1.name}</span>
                  <span className="font-bold text-amber-300">{activeAspect.planet1.degree}</span>
                </div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-center">
                  <span className="text-slate-400 block text-[10px]">{activeAspect.planet2.name}</span>
                  <span className="font-bold text-cyan-300">{activeAspect.planet2.degree}</span>
                </div>
              </div>
            </div>
          )}

          {/* Educational Quick Tip */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs font-sans text-slate-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong>Geometric Harmonics:</strong> Ancient astrologers from Ptolemy to Parashara discovered that specific geometric angles ($60°, 120°$) create harmonic acoustic resonance between planets in the solar system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Interactive3DAspectariumGraph;
