import React, { memo, useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { UserProfile } from '../../types';
import AnimatedStarfield from '../landing/AnimatedStarfield';

// Pre-allocated static vectors to eliminate GC freezes
const STATIC_TARGET_POS = new THREE.Vector2(0, 0);
const STATIC_HEAD = new THREE.Vector3();
const STATIC_TAIL = new THREE.Vector3();

// Soft radial star & glow texture generator
function createSoftGlowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
    gradient.addColorStop(0.2, 'rgba(240, 248, 255, 0.95)');
    gradient.addColorStop(0.5, 'rgba(180, 220, 255, 0.4)');
    gradient.addColorStop(0.8, 'rgba(100, 160, 255, 0.1)');
    gradient.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

// Tradition-based thematic color spectrums
function getTraditionSpectrum(traditionId?: string) {
  const sys = (traditionId || 'vedic').toLowerCase();

  if (sys.includes('islamic')) {
    return {
      core: new THREE.Color('#2DD4BF'),
      accent: new THREE.Color('#38BDF8'),
      warm: new THREE.Color('#FCD34D'),
      nebula1: '#0D9488',
      nebula2: '#0284C7',
    };
  }
  if (sys.includes('chinese') || sys.includes('bazi')) {
    return {
      core: new THREE.Color('#FB7185'),
      accent: new THREE.Color('#F59E0B'),
      warm: new THREE.Color('#34D399'),
      nebula1: '#E11D48',
      nebula2: '#D97706',
    };
  }
  if (sys.includes('western') || sys.includes('hellenistic')) {
    return {
      core: new THREE.Color('#818CF8'),
      accent: new THREE.Color('#38BDF8'),
      warm: new THREE.Color('#C084FC'),
      nebula1: '#4F46E5',
      nebula2: '#9333EA',
    };
  }

  // Vedic Jyotish (Saffron Gold & Cosmic Indigo)
  return {
    core: new THREE.Color('#F59E0B'),
    accent: new THREE.Color('#60A5FA'),
    warm: new THREE.Color('#F43F5E'),
    nebula1: '#D97706',
    nebula2: '#2563EB',
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

// Layer 1: Dense Deep Space Multi-Spectral Starfield
function DeepSpaceStars({ 
  texture, 
  spectrum 
}: { 
  texture: THREE.CanvasTexture; 
  spectrum: ReturnType<typeof getTraditionSpectrum>;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const count = isMobile ? 1200 : 4000;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#FFFFFF'),
      new THREE.Color('#F8FAFC'),
      new THREE.Color('#E0F2FE'),
      new THREE.Color('#FEF08A'),
      spectrum.core,
      spectrum.accent,
      spectrum.warm
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 20 + Math.random() * 200;
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
      pointsRef.current.rotation.y += delta * 0.0022;
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
        size={isMobile ? 0.75 : 0.95}
        map={texture}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Layer 2: Subtle Sacred Geometry Constellation Lines
function ConstellationWeb({ spectrum }: { spectrum: ReturnType<typeof getTraditionSpectrum> }) {
  const lineRef = useRef<THREE.LineSegments>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const geometry = useMemo(() => {
    const nodesCount = isMobile ? 16 : 32;
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < nodesCount; i++) {
      const theta = (i / nodesCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.35;
      const radius = 22 + Math.random() * 28;
      const z = -25 - Math.random() * 20;
      nodes.push(new THREE.Vector3(
        radius * Math.cos(theta),
        radius * Math.sin(theta) * 0.6 + (Math.random() - 0.5) * 8,
        z
      ));
    }

    const linePositions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < 18) {
          linePositions.push(nodes[i].x, nodes[i].y, nodes[i].z);
          linePositions.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
    return g;
  }, [isMobile]);

  useFrame((_, delta) => {
    if (lineRef.current) {
      lineRef.current.rotation.z += delta * 0.001;
      lineRef.current.rotation.y += delta * 0.0006;
    }
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial
        color={spectrum.accent}
        transparent
        opacity={0.08}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

// Layer 3: Natural Random Shooting Meteors
function ShootingMeteors() {
  const lineRef = useRef<THREE.LineSegments>(null);
  const meteor = useRef({
    active: false,
    progress: 0,
    start: new THREE.Vector3(),
    end: new THREE.Vector3(),
    nextTime: 2.5,
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
      const sx = (Math.random() - 0.5) * 70;
      const sy = 20 + Math.random() * 18;
      const sz = -20 + (Math.random() - 0.5) * 15;
      meteor.current.start.set(sx, sy, sz);
      meteor.current.end.set(sx + (Math.random() - 0.3) * 35, sy - 28 - Math.random() * 12, sz);
      meteor.current.nextTime = t + 4 + Math.random() * 6;
    }

    if (meteor.current.active && lineRef.current) {
      meteor.current.progress += delta * 1.8;
      const p = meteor.current.progress;

      if (p >= 1) {
        meteor.current.active = false;
        lineRef.current.visible = false;
      } else {
        lineRef.current.visible = true;
        STATIC_HEAD.lerpVectors(meteor.current.start, meteor.current.end, Math.min(1, p));
        STATIC_TAIL.lerpVectors(meteor.current.start, meteor.current.end, Math.max(0, p - 0.25));

        const arr = lineRef.current.geometry.attributes.position.array as Float32Array;
        arr[0] = STATIC_HEAD.x; arr[1] = STATIC_HEAD.y; arr[2] = STATIC_HEAD.z;
        arr[3] = STATIC_TAIL.x; arr[4] = STATIC_TAIL.y; arr[5] = STATIC_TAIL.z;
        lineRef.current.geometry.attributes.position.needsUpdate = true;
        (lineRef.current.material as THREE.LineBasicMaterial).opacity = Math.sin(p * Math.PI) * 0.8;
      }
    }
  });

  return (
    <lineSegments ref={lineRef} geometry={geom} visible={false}>
      <lineBasicMaterial color="#FFFFFF" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
    </lineSegments>
  );
}

export interface CosmicAtmosphereCanvasProps {
  userProfile?: UserProfile;
}

export const CosmicAtmosphereCanvas: React.FC<CosmicAtmosphereCanvasProps> = memo(({ userProfile }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasWebGL, setHasWebGL] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const starTexture = useMemo(() => createSoftGlowTexture(), []);
  const spectrum = useMemo(() => getTraditionSpectrum(userProfile?.preferredSystem), [userProfile?.preferredSystem]);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Conserve GPU when tab is inactive
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
      {/* Deep Space Dark Foundation */}
      <div className="absolute inset-0 bg-[#090A0C]" />

      {/* Volumetric Radial Aurora Glows */}
      <div 
        className="absolute -top-[15%] left-[20%] w-[70vw] h-[70vw] rounded-full blur-[140px] transition-colors duration-1000 opacity-25 pointer-events-none animate-pulse"
        style={{ background: `radial-gradient(circle, ${spectrum.nebula1} 0%, transparent 70%)`, animationDuration: '8s' }}
      />
      <div 
        className="absolute -bottom-[20%] right-[15%] w-[65vw] h-[65vw] rounded-full blur-[140px] transition-colors duration-1000 opacity-20 pointer-events-none animate-pulse"
        style={{ background: `radial-gradient(circle, ${spectrum.nebula2} 0%, transparent 70%)`, animationDuration: '10s' }}
      />

      {/* 3D WebGL Observatory Canvas or 2D Starfield Fallback */}
      {isVisible && hasWebGL ? (
        <Canvas
          camera={{ position: [0, 0, 16], fov: 50, near: 0.1, far: 300 }}
          dpr={isMobile ? [1, 1.2] : [1, 1.5]}
          gl={{
            antialias: false,
            powerPreference: 'high-performance',
            alpha: true,
            stencil: false,
            depth: false,
          }}
          onCreated={({ gl }) => {
            if (!gl) setHasWebGL(false);
          }}
          className="w-full h-full"
        >
          <SmoothParallaxCamera />
          <DeepSpaceStars texture={starTexture} spectrum={spectrum} />
          <ConstellationWeb spectrum={spectrum} />
          <ShootingMeteors />
        </Canvas>
      ) : (
        <AnimatedStarfield />
      )}

      {/* Soft Vignette Mask for High Contrast Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C]/90 via-transparent to-[#090A0C]/60 pointer-events-none" />
    </div>
  );
});

export default CosmicAtmosphereCanvas;
