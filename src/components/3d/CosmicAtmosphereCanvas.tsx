import React, { useRef, useMemo, useEffect, useState, memo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ErrorBoundary } from 'react-error-boundary';
import { calculatePlanetaryPositions, type PlanetPosition } from '../../lib/astroCalculations';
import type { UserProfile } from '../../types';

// Pre-allocated static vectors to prevent Garbage Collector pauses
const STATIC_TARGET_POS = new THREE.Vector3(0, 0, 42);
const STATIC_HEAD = new THREE.Vector3();
const STATIC_TAIL = new THREE.Vector3();

// Generate a procedural circular star glow texture once
let cachedStarTexture: any = null;
function getCircularStarTexture(): any {
  if (cachedStarTexture) return cachedStarTexture;
  if (typeof document === 'undefined') return null;

  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.25, 'rgba(224, 242, 254, 0.9)');
  gradient.addColorStop(0.55, 'rgba(56, 189, 248, 0.35)');
  gradient.addColorStop(0.85, 'rgba(14, 116, 144, 0.08)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  cachedStarTexture = new THREE.CanvasTexture(canvas);
  cachedStarTexture.needsUpdate = true;
  return cachedStarTexture;
}

// Tradition-specific spectral palettes
function getTraditionPalette(system?: string): { colors: any[]; primaryHex: string; accentHex: string } {
  const s = (system || 'vedic').toLowerCase();

  if (s.includes('islamic')) {
    return {
      colors: [
        new THREE.Color('#2DD4BF'), // Celestial Teal
        new THREE.Color('#FBBF24'), // Sacred Gold
        new THREE.Color('#38BDF8'), // Azure Sky
        new THREE.Color('#FFFFFF'), // Pure Light
        new THREE.Color('#A7F3D0'), // Emerald Tint
        new THREE.Color('#FDE68A'), // Solar Dawn
      ],
      primaryHex: '#0D9488',
      accentHex: '#F59E0B'
    };
  }

  if (s.includes('chinese') || s.includes('bazi')) {
    return {
      colors: [
        new THREE.Color('#34D399'), // Jade Element (Wood)
        new THREE.Color('#F87171'), // Vermilion Bird (Fire)
        new THREE.Color('#FBBF24'), // Imperial Earth (Earth)
        new THREE.Color('#E2E8F0'), // Silver Metal
        new THREE.Color('#38BDF8'), // Deep Water
        new THREE.Color('#FFFFFF'), // Light
      ],
      primaryHex: '#10B981',
      accentHex: '#E11D48'
    };
  }

  if (s.includes('western') || s.includes('hellenistic')) {
    return {
      colors: [
        new THREE.Color('#38BDF8'), // Sapphire Ptolemaic
        new THREE.Color('#818CF8'), // Royal Indigo
        new THREE.Color('#FBBF24'), // Heliocentric Gold
        new THREE.Color('#FFFFFF'), // Pure Starlight
        new THREE.Color('#C084FC'), // Mystic Violet
        new THREE.Color('#93C5FD'), // Cyan
      ],
      primaryHex: '#0284C7',
      accentHex: '#F59E0B'
    };
  }

  // Vedic Sidereal (Default) & KP/Jaimini
  return {
    colors: [
      new THREE.Color('#F59E0B'), // Saffron Solar Fire
      new THREE.Color('#38BDF8'), // Soma Chandra Blue
      new THREE.Color('#818CF8'), // Brahma Deep Indigo
      new THREE.Color('#FFFFFF'), // Pure Satva White
      new THREE.Color('#FCD34D'), // Brihaspati Golden Ray
      new THREE.Color('#EC4899'), // Shukra Venusian Rose
    ],
    primaryHex: '#D97706',
    accentHex: '#38BDF8'
  };
}

// Interactive Smooth Inertial Camera Rig (Zero Allocation)
function InteractiveCameraRig() {
  const { camera, pointer } = useThree();

  useFrame((_, delta) => {
    STATIC_TARGET_POS.x = THREE.MathUtils.lerp(STATIC_TARGET_POS.x, pointer.x * 4.0, delta * 1.5);
    STATIC_TARGET_POS.y = THREE.MathUtils.lerp(STATIC_TARGET_POS.y, pointer.y * 2.5, delta * 1.5);
    camera.position.x = STATIC_TARGET_POS.x;
    camera.position.y = STATIC_TARGET_POS.y;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Deep Multi-Spectral Scintillating Starfield
function ScintillatingStarfield({ 
  starTexture, 
  palette 
}: { 
  starTexture: any; 
  palette: { colors: any[] } 
}) {
  const pointsRef = useRef<any>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const starCount = isMobile ? 800 : 2200;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(starCount * 3);
    const col = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      const radius = 22 + Math.random() * 115;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi) - 16;

      const chosenColor = palette.colors[Math.floor(Math.random() * palette.colors.length)];
      col[i3] = chosenColor.r;
      col[i3 + 1] = chosenColor.g;
      col[i3 + 2] = chosenColor.b;
    }

    return [pos, col];
  }, [starCount, palette]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.004;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={starCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={starCount} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.35 : 0.48}
        map={starTexture}
        vertexColors
        transparent
        opacity={0.80}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// 3D Geometric Constellation Filaments & Ecliptic Meridian
function InteractiveConstellationNetwork({ 
  starTexture,
  accentColor
}: { 
  starTexture: any;
  accentColor: string;
}) {
  const pointsRef = useRef<any>(null);
  const linesRef = useRef<any>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const nodeCount = isMobile ? 35 : 75;

  const [positions, linePositions] = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    const lineCoords: number[] = [];

    for (let i = 0; i < nodeCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 65;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 42;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 6;
    }

    const maxDist = isMobile ? 10 : 13;
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDist) {
          lineCoords.push(
            pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
            pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
          );
        }
      }
    }

    return [pos, new Float32Array(lineCoords)];
  }, [nodeCount, isMobile]);

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.008;
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t;
      pointsRef.current.rotation.z = Math.sin(t * 0.5) * 0.025;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = t;
      linesRef.current.rotation.z = Math.sin(t * 0.5) * 0.025;
    }
  });

  return (
    <group>
      {/* Constellation Star Hubs */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={nodeCount} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.6}
          map={starTexture}
          color={accentColor}
          transparent
          opacity={0.85}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Interconnecting Constellation Geometric Filaments */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={linePositions.length / 3} array={linePositions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial
          color={accentColor}
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

// Zero-Allocation Single Shooting Star
function EfficientShootingStar() {
  const lineRef = useRef<any>(null);
  const streak = useRef({ active: false, progress: 0, start: new THREE.Vector3(), end: new THREE.Vector3(), nextTime: 4 });

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
    return g;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (!streak.current.active && t > streak.current.nextTime) {
      streak.current.active = true;
      streak.current.progress = 0;
      const sx = (Math.random() - 0.5) * 50;
      const sy = 14 + Math.random() * 16;
      const sz = -8 + (Math.random() - 0.5) * 12;
      streak.current.start.set(sx, sy, sz);
      streak.current.end.set(sx + (Math.random() - 0.3) * 28, sy - 24 - Math.random() * 10, sz);
      streak.current.nextTime = t + 6 + Math.random() * 8;
    }

    if (streak.current.active && lineRef.current) {
      streak.current.progress += delta * 1.6;
      const p = streak.current.progress;
      if (p >= 1) {
        streak.current.active = false;
        lineRef.current.visible = false;
      } else {
        lineRef.current.visible = true;
        STATIC_HEAD.lerpVectors(streak.current.start, streak.current.end, Math.min(1, p));
        STATIC_TAIL.lerpVectors(streak.current.start, streak.current.end, Math.max(0, p - 0.25));

        const arr = lineRef.current.geometry.attributes.position.array;
        arr[0] = STATIC_HEAD.x; arr[1] = STATIC_HEAD.y; arr[2] = STATIC_HEAD.z;
        arr[3] = STATIC_TAIL.x; arr[4] = STATIC_TAIL.y; arr[5] = STATIC_TAIL.z;
        lineRef.current.geometry.attributes.position.needsUpdate = true;
        lineRef.current.material.opacity = Math.sin(p * Math.PI) * 0.7;
      }
    }
  });

  return (
    <lineSegments ref={lineRef} geometry={geom} visible={false}>
      <lineBasicMaterial color="#E0F2FE" transparent opacity={0.7} blending={THREE.AdditiveBlending} />
    </lineSegments>
  );
}

// Real Personalized Planetary Celestial Meridian Nodes
function PersonalizedPlanetaryRing({ userProfile }: { userProfile?: UserProfile }) {
  const groupRef = useRef<any>(null);

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

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.002;
    }
  });

  if (!planets.length) return null;

  return (
    <group ref={groupRef} rotation={[Math.PI * 0.18, 0, 0]}>
      {/* Ecliptic Orbit Path */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[26 - 0.05, 26 + 0.05, 96]} />
        <meshBasicMaterial color="#F59E0B" transparent opacity={0.16} side={THREE.DoubleSide} />
      </mesh>

      {/* Planetary Spheres at exact natal longitudes */}
      {planets.slice(0, 7).map((p) => {
        const rad = ((p.degreeDecimal - 90) * Math.PI) / 180;
        const x = 26 * Math.cos(rad);
        const z = 26 * Math.sin(rad);

        return (
          <mesh key={p.name} position={[x, 0, z]}>
            <sphereGeometry args={[0.55, 12, 12]} />
            <meshStandardMaterial
              color="#FDE68A"
              emissive="#F59E0B"
              emissiveIntensity={0.4}
              roughness={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export interface CosmicAtmosphereCanvasProps {
  userProfile?: UserProfile;
}

export const CosmicAtmosphereCanvas: React.FC<CosmicAtmosphereCanvasProps> = memo(({ userProfile }) => {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const starTexture = useMemo(() => getCircularStarTexture(), []);
  const palette = useMemo(() => getTraditionPalette(userProfile?.preferredSystem), [userProfile?.preferredSystem]);

  // Pause rendering when tab is hidden to conserve 100% GPU/battery
  useEffect(() => {
    const handleVisibility = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  return (
    <div ref={containerRef} aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Multi-Layer Deep Space Radial Atmospheric Gradients */}
      <div className="absolute inset-0 bg-[#050811]" />
      
      {/* Dynamic Breathing Volumetric Auroras Synchronized to Tradition */}
      <div 
        className="absolute -top-32 left-1/4 w-[750px] h-[750px] rounded-full blur-[150px] pointer-events-none aurora-ambient-glow transition-all duration-1000"
        style={{ background: `radial-gradient(circle, ${palette.primaryHex}20 0%, transparent 70%)` }}
      />
      <div 
        className="absolute top-1/3 -right-24 w-[650px] h-[650px] rounded-full blur-[160px] pointer-events-none aurora-ambient-glow [animation-delay:4s] transition-all duration-1000"
        style={{ background: `radial-gradient(circle, ${palette.accentHex}18 0%, transparent 70%)` }}
      />
      <div 
        className="absolute -bottom-36 left-1/3 w-[800px] h-[800px] rounded-full blur-[180px] pointer-events-none aurora-ambient-glow [animation-delay:8s]"
        style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)' }}
      />

      {/* 3D WebGL Multi-Layer Celestial Canvas */}
      <ErrorBoundary fallback={<div />}>
        {isVisible && (
          <Canvas
            camera={{ position: [0, 0, 42], fov: 45, near: 0.1, far: 1000 }}
            gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
            dpr={[1, 1.2]}
          >
            {/* Ambient Lighting */}
            <ambientLight intensity={0.4} />
            <pointLight position={[0, 0, 0]} intensity={1.5} color="#FEF08A" />

            {/* 3D Interactive Layers */}
            <InteractiveCameraRig />
            <ScintillatingStarfield starTexture={starTexture} palette={palette} />
            <InteractiveConstellationNetwork starTexture={starTexture} accentColor={palette.accentHex} />
            <PersonalizedPlanetaryRing userProfile={userProfile} />
            <EfficientShootingStar />
          </Canvas>
        )}
      </ErrorBoundary>
    </div>
  );
});

CosmicAtmosphereCanvas.displayName = 'CosmicAtmosphereCanvas';
export default CosmicAtmosphereCanvas;
