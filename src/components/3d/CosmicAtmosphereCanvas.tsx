import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ErrorBoundary } from 'react-error-boundary';
import { calculatePlanetaryPositions, type PlanetPosition } from '../../lib/astroCalculations';
import type { UserProfile } from '../../types';

// Generate a procedural silky-smooth circular star glow texture
function getCircularStarTexture(): any {
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

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Tradition-specific spectral palettes
function getTraditionPalette(system?: string): { colors: any[]; primaryHex: string; accentHex: string } {
  const s = (system || 'vedic').toLowerCase();

  if (s.includes('islamic')) {
    return {
      colors: [
        new THREE.Color('#2DD4BF'), // Celestial Teal (Mamluk / Ilm al-Falak)
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

// Interactive Smooth Inertial Camera Rig
function InteractiveCameraRig() {
  const { camera, pointer } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 42));

  useFrame((_, delta) => {
    targetPos.current.x = THREE.MathUtils.lerp(targetPos.current.x, pointer.x * 4.5, delta * 1.8);
    targetPos.current.y = THREE.MathUtils.lerp(targetPos.current.y, pointer.y * 3.0, delta * 1.8);
    camera.position.x = targetPos.current.x;
    camera.position.y = targetPos.current.y;
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
  const starCount = isMobile ? 1200 : 2800;

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
      pointsRef.current.rotation.y += delta * 0.005;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.025) * 0.012;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={starCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={starCount} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.38 : 0.52}
        map={starTexture}
        vertexColors
        transparent
        opacity={0.82}
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
  const nodeCount = isMobile ? 45 : 90;

  const [positions, linePositions] = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    const lineCoords: number[] = [];

    for (let i = 0; i < nodeCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 68;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 44;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 32 - 6;
    }

    const maxDist = isMobile ? 11 : 13.5;
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
    const t = state.clock.elapsedTime * 0.01;
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t;
      pointsRef.current.rotation.z = Math.sin(t * 0.5) * 0.03;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = t;
      linesRef.current.rotation.z = Math.sin(t * 0.5) * 0.03;
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
          size={0.65}
          map={starTexture}
          color={accentColor}
          transparent
          opacity={0.88}
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
          opacity={0.07}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

// Multi-Lane Asynchronous Meteor Shower Streams
function ShootingStarStreaks() {
  const lineRef1 = useRef<any>(null);
  const lineRef2 = useRef<any>(null);
  const streak1 = useRef({ active: false, progress: 0, start: new THREE.Vector3(), end: new THREE.Vector3(), nextTime: 3 });
  const streak2 = useRef({ active: false, progress: 0, start: new THREE.Vector3(), end: new THREE.Vector3(), nextTime: 7 });

  const geom1 = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
    return g;
  }, []);

  const geom2 = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
    return g;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Stream 1
    if (!streak1.current.active && t > streak1.current.nextTime) {
      streak1.current.active = true;
      streak1.current.progress = 0;
      const sx = (Math.random() - 0.5) * 50;
      const sy = 14 + Math.random() * 16;
      const sz = -8 + (Math.random() - 0.5) * 12;
      streak1.current.start.set(sx, sy, sz);
      streak1.current.end.set(sx + (Math.random() - 0.3) * 28, sy - 24 - Math.random() * 10, sz);
      streak1.current.nextTime = t + 7 + Math.random() * 8;
    }

    if (streak1.current.active && lineRef1.current) {
      streak1.current.progress += delta * 1.7;
      const p = streak1.current.progress;
      if (p >= 1) {
        streak1.current.active = false;
        lineRef1.current.visible = false;
      } else {
        lineRef1.current.visible = true;
        const head = streak1.current.start.clone().lerp(streak1.current.end, Math.min(1, p));
        const tail = streak1.current.start.clone().lerp(streak1.current.end, Math.max(0, p - 0.28));
        const arr = lineRef1.current.geometry.attributes.position.array;
        arr[0] = head.x; arr[1] = head.y; arr[2] = head.z;
        arr[3] = tail.x; arr[4] = tail.y; arr[5] = tail.z;
        lineRef1.current.geometry.attributes.position.needsUpdate = true;
        lineRef1.current.material.opacity = Math.sin(p * Math.PI) * 0.7;
      }
    }

    // Stream 2
    if (!streak2.current.active && t > streak2.current.nextTime) {
      streak2.current.active = true;
      streak2.current.progress = 0;
      const sx = 20 + Math.random() * 30;
      const sy = 16 + Math.random() * 12;
      const sz = -12 + (Math.random() - 0.5) * 10;
      streak2.current.start.set(sx, sy, sz);
      streak2.current.end.set(sx - 35, sy - 22, sz);
      streak2.current.nextTime = t + 10 + Math.random() * 10;
    }

    if (streak2.current.active && lineRef2.current) {
      streak2.current.progress += delta * 1.5;
      const p = streak2.current.progress;
      if (p >= 1) {
        streak2.current.active = false;
        lineRef2.current.visible = false;
      } else {
        lineRef2.current.visible = true;
        const head = streak2.current.start.clone().lerp(streak2.current.end, Math.min(1, p));
        const tail = streak2.current.start.clone().lerp(streak2.current.end, Math.max(0, p - 0.25));
        const arr = lineRef2.current.geometry.attributes.position.array;
        arr[0] = head.x; arr[1] = head.y; arr[2] = head.z;
        arr[3] = tail.x; arr[4] = tail.y; arr[5] = tail.z;
        lineRef2.current.geometry.attributes.position.needsUpdate = true;
        lineRef2.current.material.opacity = Math.sin(p * Math.PI) * 0.65;
      }
    }
  });

  return (
    <group>
      <lineSegments ref={lineRef1} geometry={geom1} visible={false}>
        <lineBasicMaterial color="#E0F2FE" transparent opacity={0.7} blending={THREE.AdditiveBlending} />
      </lineSegments>
      <lineSegments ref={lineRef2} geometry={geom2} visible={false}>
        <lineBasicMaterial color="#FEF08A" transparent opacity={0.65} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
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
      groupRef.current.rotation.y += delta * 0.003;
    }
  });

  if (!planets.length) return null;

  return (
    <group ref={groupRef} rotation={[Math.PI * 0.18, 0, 0]}>
      {/* Ecliptic Orbit Path */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[26 - 0.05, 26 + 0.05, 128]} />
        <meshBasicMaterial color="#F59E0B" transparent opacity={0.16} side={THREE.DoubleSide} />
      </mesh>

      {/* Planetary Spheres at exact natal longitudes */}
      {planets.slice(0, 7).map((p) => {
        const rad = ((p.degreeDecimal - 90) * Math.PI) / 180;
        const x = 26 * Math.cos(rad);
        const z = 26 * Math.sin(rad);

        return (
          <mesh key={p.name} position={[x, 0, z]}>
            <sphereGeometry args={[0.55, 16, 16]} />
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

export default function CosmicAtmosphereCanvas({ userProfile }: CosmicAtmosphereCanvasProps) {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const starTexture = useMemo(() => getCircularStarTexture(), []);
  const palette = useMemo(() => getTraditionPalette(userProfile?.preferredSystem), [userProfile?.preferredSystem]);

  // Pause rendering when tab is hidden to conserve GPU/battery
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
            gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
            dpr={[1, 1.25]}
          >
            {/* Ambient Lighting */}
            <ambientLight intensity={0.4} />
            <pointLight position={[0, 0, 0]} intensity={1.5} color="#FEF08A" />

            {/* 3D Interactive Layers */}
            <InteractiveCameraRig />
            <ScintillatingStarfield starTexture={starTexture} palette={palette} />
            <InteractiveConstellationNetwork starTexture={starTexture} accentColor={palette.accentHex} />
            <PersonalizedPlanetaryRing userProfile={userProfile} />
            <ShootingStarStreaks />
          </Canvas>
        )}
      </ErrorBoundary>
    </div>
  );
}
