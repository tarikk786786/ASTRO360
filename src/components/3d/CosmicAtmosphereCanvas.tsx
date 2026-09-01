import React, { memo, useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { calculatePlanetaryPositions, type PlanetPosition } from '../../lib/astroCalculations';
import type { UserProfile } from '../../types';

// Pre-allocated static vectors to eliminate garbage collector freezes
const STATIC_TARGET_POS = new THREE.Vector2(0, 0);
const STATIC_HEAD = new THREE.Vector3();
const STATIC_TAIL = new THREE.Vector3();

// Soft radial star & glow texture generator
function createSoftGlowTexture(): any {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
    gradient.addColorStop(0.15, 'rgba(245, 250, 255, 0.85)');
    gradient.addColorStop(0.4, 'rgba(180, 220, 255, 0.35)');
    gradient.addColorStop(0.7, 'rgba(100, 160, 255, 0.08)');
    gradient.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

// Tradition-based thematic color harmony
function getTraditionSpectrum(traditionId?: string) {
  const sys = (traditionId || 'vedic').toLowerCase();

  if (sys.includes('islamic')) {
    return {
      core: new THREE.Color('#2DD4BF'),
      accent: new THREE.Color('#38BDF8'),
      warm: new THREE.Color('#FCD34D'),
      nebula1: '#0D9488',
      nebula2: '#0284C7',
      ringColor: '#2DD4BF',
    };
  }
  if (sys.includes('chinese') || sys.includes('bazi')) {
    return {
      core: new THREE.Color('#FB7185'),
      accent: new THREE.Color('#F59E0B'),
      warm: new THREE.Color('#34D399'),
      nebula1: '#E11D48',
      nebula2: '#D97706',
      ringColor: '#FB7185',
    };
  }
  if (sys.includes('western') || sys.includes('hellenistic')) {
    return {
      core: new THREE.Color('#818CF8'),
      accent: new THREE.Color('#38BDF8'),
      warm: new THREE.Color('#C084FC'),
      nebula1: '#4F46E5',
      nebula2: '#9333EA',
      ringColor: '#818CF8',
    };
  }

  // Vedic Jyotish (Saffron Gold & Cosmic Indigo)
  return {
    core: new THREE.Color('#F59E0B'),
    accent: new THREE.Color('#60A5FA'),
    warm: new THREE.Color('#F43F5E'),
    nebula1: '#D97706',
    nebula2: '#2563EB',
    ringColor: '#F59E0B',
  };
}

// Interactive Smooth Parallax Camera Rig
function SmoothParallaxCamera() {
  const { camera, pointer } = useThree();

  useFrame((_, delta) => {
    STATIC_TARGET_POS.x = THREE.MathUtils.lerp(STATIC_TARGET_POS.x, pointer.x * 2.5, delta * 1.2);
    STATIC_TARGET_POS.y = THREE.MathUtils.lerp(STATIC_TARGET_POS.y, pointer.y * 1.5, delta * 1.2);
    camera.position.x = STATIC_TARGET_POS.x;
    camera.position.y = STATIC_TARGET_POS.y;
    camera.lookAt(0, 0, -25);
  });

  return null;
}

// Tier-1: Deep Field Multi-Spectral Stars (Dense, Sub-pixel, Twinkling)
function DeepSpaceStars({ 
  texture, 
  spectrum 
}: { 
  texture: any; 
  spectrum: ReturnType<typeof getTraditionSpectrum>;
}) {
  const pointsRef = useRef<any>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const count = isMobile ? 650 : 2600;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#FFFFFF'),
      new THREE.Color('#F8FAFC'),
      new THREE.Color('#E2E8F0'),
      spectrum.core,
      spectrum.accent,
      spectrum.warm
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 35 + Math.random() * 160;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi) - 30;

      const chosen = palette[Math.floor(Math.random() * palette.length)];
      col[i3] = chosen.r;
      col[i3 + 1] = chosen.g;
      col[i3 + 2] = chosen.b;
    }

    return [pos, col];
  }, [count, spectrum]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.0025;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.35 : 0.45}
        map={texture}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Tier-2: Realistic 3D Planetary Celestial Spheres at Natal Longitudes
function CelestialPlanetaryOrbits({ 
  userProfile,
  spectrum
}: { 
  userProfile?: UserProfile;
  spectrum: ReturnType<typeof getTraditionSpectrum>;
}) {
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
      groupRef.current.rotation.y += delta * 0.0018;
    }
  });

  const PLANET_COLORS: Record<string, { base: string; glow: string; size: number }> = {
    'Sun': { base: '#FDE047', glow: '#F59E0B', size: 0.38 },
    'Moon': { base: '#E2E8F0', glow: '#94A3B8', size: 0.28 },
    'Mars': { base: '#F87171', glow: '#DC2626', size: 0.25 },
    'Mercury': { base: '#34D399', glow: '#059669', size: 0.22 },
    'Jupiter': { base: '#FBBF24', glow: '#D97706', size: 0.36 },
    'Venus': { base: '#F472B6', glow: '#DB2777', size: 0.30 },
    'Saturn': { base: '#A78BFA', glow: '#7C3AED', size: 0.34 },
  };

  const orbitRadius = 45;

  return (
    <group ref={groupRef} position={[0, -2, -35]} rotation={[Math.PI * 0.18, 0, Math.PI * 0.05]}>
      {/* Delicate Golden Ecliptic Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[orbitRadius - 0.03, orbitRadius + 0.03, 128]} />
        <meshBasicMaterial
          color={spectrum.ringColor}
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Realistic 3D Glowing Planetary Spheres */}
      {planets.slice(0, 7).map((p) => {
        const rad = ((p.degreeDecimal - 90) * Math.PI) / 180;
        const x = orbitRadius * Math.cos(rad);
        const z = orbitRadius * Math.sin(rad);
        const info = PLANET_COLORS[p.name] || { base: '#FCD34D', glow: '#F59E0B', size: 0.26 };

        return (
          <group key={p.name} position={[x, 0, z]}>
            {/* Core Sphere */}
            <mesh>
              <sphereGeometry args={[info.size, 16, 16]} />
              <meshBasicMaterial color={info.base} />
            </mesh>

            {/* Soft Outer Atmospheric Halo */}
            <mesh scale={[2.2, 2.2, 2.2]}>
              <sphereGeometry args={[info.size, 16, 16]} />
              <meshBasicMaterial
                color={info.glow}
                transparent
                opacity={0.18}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// Tier-3: Delicate Natural Meteor Shooters
function ShootingMeteor() {
  const lineRef = useRef<any>(null);
  const meteor = useRef({
    active: false,
    progress: 0,
    start: new THREE.Vector3(),
    end: new THREE.Vector3(),
    nextTime: 4,
  });

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
    return g;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (!meteor.current.active && t > meteor.current.nextTime) {
      meteor.current.active = true;
      meteor.current.progress = 0;
      const sx = (Math.random() - 0.5) * 55;
      const sy = 16 + Math.random() * 14;
      const sz = -22 + (Math.random() - 0.5) * 12;
      meteor.current.start.set(sx, sy, sz);
      meteor.current.end.set(sx + (Math.random() - 0.3) * 26, sy - 22 - Math.random() * 8, sz);
      meteor.current.nextTime = t + 7 + Math.random() * 9;
    }

    if (meteor.current.active && lineRef.current) {
      meteor.current.progress += delta * 1.5;
      const p = meteor.current.progress;

      if (p >= 1) {
        meteor.current.active = false;
        lineRef.current.visible = false;
      } else {
        lineRef.current.visible = true;
        STATIC_HEAD.lerpVectors(meteor.current.start, meteor.current.end, Math.min(1, p));
        STATIC_TAIL.lerpVectors(meteor.current.start, meteor.current.end, Math.max(0, p - 0.2));

        const arr = lineRef.current.geometry.attributes.position.array;
        arr[0] = STATIC_HEAD.x; arr[1] = STATIC_HEAD.y; arr[2] = STATIC_HEAD.z;
        arr[3] = STATIC_TAIL.x; arr[4] = STATIC_TAIL.y; arr[5] = STATIC_TAIL.z;
        lineRef.current.geometry.attributes.position.needsUpdate = true;
        lineRef.current.material.opacity = Math.sin(p * Math.PI) * 0.5;
      }
    }
  });

  return (
    <lineSegments ref={lineRef} geometry={geom} visible={false}>
      <lineBasicMaterial color="#E0F2FE" transparent opacity={0.5} blending={THREE.AdditiveBlending} />
    </lineSegments>
  );
}

export interface CosmicAtmosphereCanvasProps {
  userProfile?: UserProfile;
}

export const CosmicAtmosphereCanvas: React.FC<CosmicAtmosphereCanvasProps> = memo(({ userProfile }) => {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const starTexture = useMemo(() => createSoftGlowTexture(), []);
  const spectrum = useMemo(() => getTraditionSpectrum(userProfile?.preferredSystem), [userProfile?.preferredSystem]);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Conserve 100% GPU when browser tab is inactive
  useEffect(() => {
    const handleVisibility = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  return (
    <div 
      ref={containerRef} 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Deep Space Indigo-Black Velvet Foundation */}
      <div className="absolute inset-0 bg-[#04060E]" />

      {/* Volumetric Radial Aurora Hues */}
      <div 
        className="absolute -top-[15%] left-[20%] w-[65vw] h-[65vw] rounded-full blur-[140px] transition-colors duration-1000 opacity-40 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${spectrum.nebula1} 0%, transparent 70%)` }}
      />
      <div 
        className="absolute -bottom-[20%] right-[15%] w-[60vw] h-[60vw] rounded-full blur-[140px] transition-colors duration-1000 opacity-35 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${spectrum.nebula2} 0%, transparent 70%)` }}
      />

      {/* 3D WebGL Observatory Canvas */}
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 16], fov: 52, near: 0.1, far: 300 }}
          dpr={isMobile ? [1, 1.1] : [1, 1.5]}
          gl={{
            antialias: !isMobile,
            powerPreference: 'high-performance',
            alpha: true,
            stencil: false,
            depth: false,
          }}
          className="w-full h-full"
        >
          <SmoothParallaxCamera />
          <DeepSpaceStars texture={starTexture} spectrum={spectrum} />
          <CelestialPlanetaryOrbits userProfile={userProfile} spectrum={spectrum} />
          <ShootingMeteor />
        </Canvas>
      )}

      {/* Soft Vignette Mask for High Contrast Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#04060E]/80 via-transparent to-[#04060E]/60 pointer-events-none" />
    </div>
  );
});

export default CosmicAtmosphereCanvas;
