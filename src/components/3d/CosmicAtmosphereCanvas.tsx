import React, { memo, useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { UserProfile } from '../../types';

// Pre-allocated static vectors to eliminate per-frame garbage collector heap allocations
const STATIC_TARGET_POS = new THREE.Vector2(0, 0);
const STATIC_HEAD = new THREE.Vector3();
const STATIC_TAIL = new THREE.Vector3();

// Soft circular radial star texture
function getCircularStarTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
    gradient.addColorStop(0.2, 'rgba(235, 245, 255, 0.8)');
    gradient.addColorStop(0.5, 'rgba(180, 210, 255, 0.25)');
    gradient.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

// Tradition-adaptive atmospheric color palette
function getTraditionPalette(traditionId?: string) {
  const sys = (traditionId || 'vedic').toLowerCase();

  if (sys.includes('islamic')) {
    return {
      colors: [new THREE.Color('#38BDF8'), new THREE.Color('#2DD4BF'), new THREE.Color('#FCD34D'), new THREE.Color('#F8FAFC')],
      accentHex: '#2DD4BF',
      aurora1: 'rgba(13, 148, 136, 0.06)',
      aurora2: 'rgba(2, 132, 199, 0.05)'
    };
  }
  if (sys.includes('chinese') || sys.includes('bazi')) {
    return {
      colors: [new THREE.Color('#FB7185'), new THREE.Color('#F59E0B'), new THREE.Color('#34D399'), new THREE.Color('#F8FAFC')],
      accentHex: '#FB7185',
      aurora1: 'rgba(225, 29, 72, 0.05)',
      aurora2: 'rgba(217, 119, 6, 0.05)'
    };
  }
  if (sys.includes('western') || sys.includes('hellenistic')) {
    return {
      colors: [new THREE.Color('#818CF8'), new THREE.Color('#38BDF8'), new THREE.Color('#C084FC'), new THREE.Color('#F8FAFC')],
      accentHex: '#818CF8',
      aurora1: 'rgba(79, 70, 229, 0.06)',
      aurora2: 'rgba(147, 51, 234, 0.05)'
    };
  }

  // Default: Vedic Saffron & Deep Space Indigo
  return {
    colors: [new THREE.Color('#FBBF24'), new THREE.Color('#60A5FA'), new THREE.Color('#F43F5E'), new THREE.Color('#F8FAFC')],
    accentHex: '#FBBF24',
    aurora1: 'rgba(217, 119, 6, 0.06)',
    aurora2: 'rgba(37, 99, 235, 0.05)'
  };
}

// Gentle Interactive Inertial Camera Rig
function InteractiveCameraRig() {
  const { camera, pointer } = useThree();

  useFrame((_, delta) => {
    STATIC_TARGET_POS.x = THREE.MathUtils.lerp(STATIC_TARGET_POS.x, pointer.x * 1.5, delta * 0.8);
    STATIC_TARGET_POS.y = THREE.MathUtils.lerp(STATIC_TARGET_POS.y, pointer.y * 1.0, delta * 0.8);
    camera.position.x = STATIC_TARGET_POS.x;
    camera.position.y = STATIC_TARGET_POS.y;
    camera.lookAt(0, 0, -20);
  });

  return null;
}

// Deep Multi-Spectral Scintillating Starfield (Mobile Optimized Count)
function DeepCosmicStarfield({ 
  starTexture, 
  palette 
}: { 
  starTexture: any; 
  palette: { colors: any[] } 
}) {
  const pointsRef = useRef<any>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const starCount = isMobile ? 450 : 2200;

  const [positions, colors, scales] = useMemo(() => {
    const pos = new Float32Array(starCount * 3);
    const col = new Float32Array(starCount * 3);
    const sca = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      const radius = 30 + Math.random() * 140;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi) - 25;

      const chosenColor = palette.colors[Math.floor(Math.random() * palette.colors.length)];
      col[i3] = chosenColor.r;
      col[i3 + 1] = chosenColor.g;
      col[i3 + 2] = chosenColor.b;

      sca[i] = 0.2 + Math.random() * 0.45;
    }

    return [pos, col, sca];
  }, [starCount, palette]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.003;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.015) * 0.008;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={starCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={starCount} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.30 : 0.40}
        map={starTexture}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Subtle Celestial Ecliptic & Meridian Rings (Calm Background Geometry)
function SubtleCelestialSphere({ accentColor }: { accentColor: string }) {
  const groupRef = useRef<any>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.0015;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -30]}>
      {/* Primary Ecliptic Ring */}
      <mesh rotation={[Math.PI * 0.25, 0, 0]}>
        <ringGeometry args={[42 - 0.04, 42 + 0.04, 64]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={0.05}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// Delicate Shooting Star
function EfficientShootingStar({ delay = 0, speed = 1.4 }: { delay?: number; speed?: number }) {
  const lineRef = useRef<any>(null);
  const streak = useRef({ 
    active: false, 
    progress: 0, 
    start: new THREE.Vector3(), 
    end: new THREE.Vector3(), 
    nextTime: 3 + delay 
  });

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
      const sx = (Math.random() - 0.5) * 60;
      const sy = 16 + Math.random() * 18;
      const sz = -18 + (Math.random() - 0.5) * 15;
      streak.current.start.set(sx, sy, sz);
      streak.current.end.set(sx + (Math.random() - 0.35) * 32, sy - 28 - Math.random() * 12, sz);
      streak.current.nextTime = t + 8 + Math.random() * 10;
    }

    if (streak.current.active && lineRef.current) {
      streak.current.progress += delta * speed;
      const p = streak.current.progress;
      if (p >= 1) {
        streak.current.active = false;
        lineRef.current.visible = false;
      } else {
        lineRef.current.visible = true;
        STATIC_HEAD.lerpVectors(streak.current.start, streak.current.end, Math.min(1, p));
        STATIC_TAIL.lerpVectors(streak.current.start, streak.current.end, Math.max(0, p - 0.22));

        const arr = lineRef.current.geometry.attributes.position.array;
        arr[0] = STATIC_HEAD.x; arr[1] = STATIC_HEAD.y; arr[2] = STATIC_HEAD.z;
        arr[3] = STATIC_TAIL.x; arr[4] = STATIC_TAIL.y; arr[5] = STATIC_TAIL.z;
        lineRef.current.geometry.attributes.position.needsUpdate = true;
        lineRef.current.material.opacity = Math.sin(p * Math.PI) * 0.45;
      }
    }
  });

  return (
    <lineSegments ref={lineRef} geometry={geom} visible={false}>
      <lineBasicMaterial color="#E0F2FE" transparent opacity={0.45} blending={THREE.AdditiveBlending} />
    </lineSegments>
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
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Conserve 100% GPU/battery when tab is in background
  useEffect(() => {
    const handleVisibility = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  return (
    <div ref={containerRef} aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Deep Space Foundation Base */}
      <div className="absolute inset-0 bg-[#040711]" />
      
      {/* Ultra-Soft Atmospheric Radial Glows */}
      <div 
        className="absolute -top-1/4 left-1/4 w-[75vw] h-[75vw] rounded-full blur-[120px] transition-colors duration-1000 opacity-60 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${palette.aurora1} 0%, transparent 70%)` }}
      />
      <div 
        className="absolute -bottom-1/4 right-1/4 w-[70vw] h-[70vw] rounded-full blur-[120px] transition-colors duration-1000 opacity-50 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${palette.aurora2} 0%, transparent 70%)` }}
      />

      {/* 3D WebGL Cosmic Sky */}
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 15], fov: 55, near: 0.1, far: 300 }}
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
          <InteractiveCameraRig />
          <DeepCosmicStarfield starTexture={starTexture} palette={palette} />
          <SubtleCelestialSphere accentColor={palette.accentHex} />
          <EfficientShootingStar delay={0} speed={1.3} />
        </Canvas>
      )}

      {/* Subtle Vignette for High-Contrast Foreground Reading */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#040711]/70 via-transparent to-[#040711]/50 pointer-events-none" />
    </div>
  );
});

export default CosmicAtmosphereCanvas;
