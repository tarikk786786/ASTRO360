import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ErrorBoundary } from 'react-error-boundary';

// Stellar Spectral Class Colors (Astronomical Color Palette)
const STELLAR_COLORS = [
  new THREE.Color('#93C5FD'), // Class O/B: Piercing Cyan/Blue
  new THREE.Color('#FFFFFF'), // Class A: Pure Brilliant White
  new THREE.Color('#FEF08A'), // Class F/G: Solar Warm Gold
  new THREE.Color('#FDE047'), // Class G: Amber Star
  new THREE.Color('#FCA5A5'), // Class K/M: Deep Rose/Red Giant
  new THREE.Color('#38BDF8'), // Celestial Ice
];

// Interactive Inertial Camera Rig
function InteractiveCameraRig() {
  const { camera, pointer } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 40));

  useFrame((state, delta) => {
    // Smooth 3D mouse parallax displacement
    targetPos.current.x = THREE.MathUtils.lerp(targetPos.current.x, pointer.x * 6, delta * 2.5);
    targetPos.current.y = THREE.MathUtils.lerp(targetPos.current.y, pointer.y * 4, delta * 2.5);
    camera.position.x = targetPos.current.x;
    camera.position.y = targetPos.current.y;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Multi-Spectral Scintillating Deep Starfield
function ScintillatingStarfield() {
  const pointsRef = useRef<any>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const starCount = isMobile ? 1400 : 3200;

  const [positions, colors, baseOpacities, twinkleSpeeds, twinklePhases] = useMemo(() => {
    const pos = new Float32Array(starCount * 3);
    const col = new Float32Array(starCount * 3);
    const opacities = new Float32Array(starCount);
    const speeds = new Float32Array(starCount);
    const phases = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      // Spherical distribution with deep Z-depth
      const radius = 30 + Math.random() * 120;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi) - 20;

      // Pick astronomical stellar spectral color
      const chosenColor = STELLAR_COLORS[Math.floor(Math.random() * STELLAR_COLORS.length)];
      col[i3] = chosenColor.r;
      col[i3 + 1] = chosenColor.g;
      col[i3 + 2] = chosenColor.b;

      opacities[i] = 0.25 + Math.random() * 0.75;
      speeds[i] = 0.5 + Math.random() * 2.5;
      phases[i] = Math.random() * Math.PI * 2;
    }

    return [pos, col, opacities, speeds, phases];
  }, [starCount]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Gentle cosmic axial rotation
      pointsRef.current.rotation.y += delta * 0.008;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.04) * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={starCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={starCount} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.35 : 0.45}
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

// 3D Geometric Constellation Nodes & Vector Interconnects
function InteractiveConstellationNetwork() {
  const pointsRef = useRef<any>(null);
  const linesRef = useRef<any>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const nodeCount = isMobile ? 60 : 130;

  const [positions, linePositions] = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    const lineCoords: number[] = [];

    for (let i = 0; i < nodeCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 75;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 45;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 35 - 5;
    }

    const maxDist = isMobile ? 12 : 14;
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

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime * 0.015;
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t;
      pointsRef.current.rotation.z = Math.sin(t * 0.5) * 0.05;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = t;
      linesRef.current.rotation.z = Math.sin(t * 0.5) * 0.05;
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
          color="#38BDF8"
          transparent
          opacity={0.85}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Interconnecting Constellation Geometric Vector Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={linePositions.length / 3} array={linePositions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#38BDF8"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

// Periodic Shooting Star / Meteor Streak
function ShootingStarStreak() {
  const lineRef = useRef<any>(null);
  const isStreaking = useRef(false);
  const streakProgress = useRef(0);
  const startPoint = useRef(new THREE.Vector3());
  const endPoint = useRef(new THREE.Vector3());
  const nextStreakTime = useRef(4 + Math.random() * 6);

  const lineGeo = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const pos = new Float32Array(6); // 2 vertices: head and tail
    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geom;
  }, []);

  useFrame((state, delta) => {
    if (!lineRef.current) return;
    const time = state.clock.elapsedTime;

    if (!isStreaking.current && time > nextStreakTime.current) {
      // Trigger new shooting star
      isStreaking.current = true;
      streakProgress.current = 0;

      const sx = (Math.random() - 0.5) * 60;
      const sy = 15 + Math.random() * 20;
      const sz = -10 + (Math.random() - 0.5) * 20;

      startPoint.current.set(sx, sy, sz);
      endPoint.current.set(sx + (Math.random() - 0.3) * 35, sy - 25 - Math.random() * 15, sz);
      nextStreakTime.current = time + 8 + Math.random() * 10;
    }

    if (isStreaking.current) {
      streakProgress.current += delta * 1.8;
      const t = streakProgress.current;

      if (t >= 1) {
        isStreaking.current = false;
        lineRef.current.visible = false;
      } else {
        lineRef.current.visible = true;
        const currentHead = startPoint.current.clone().lerp(endPoint.current, Math.min(1, t));
        const currentTail = startPoint.current.clone().lerp(endPoint.current, Math.max(0, t - 0.25));

        const positions = lineRef.current.geometry.attributes.position.array;
        positions[0] = currentHead.x;
        positions[1] = currentHead.y;
        positions[2] = currentHead.z;
        positions[3] = currentTail.x;
        positions[4] = currentTail.y;
        positions[5] = currentTail.z;
        lineRef.current.geometry.attributes.position.needsUpdate = true;

        // Fade opacity during life
        const opacity = Math.sin(t * Math.PI) * 0.7;
        lineRef.current.material.opacity = opacity;
      }
    }
  });

  return (
    <lineSegments ref={lineRef} geometry={lineGeo} visible={false}>
      <lineBasicMaterial color="#E0F2FE" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
    </lineSegments>
  );
}

// Faint Ecliptic Coordinate Axis Ring tilted at 23.44°
function EclipticCoordinateRing() {
  const ringRef = useRef<any>(null);

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.005;
    }
  });

  return (
    <group rotation={[THREE.MathUtils.degToRad(23.44), 0, 0]} position={[0, -2, -15]}>
      <mesh ref={ringRef}>
        <ringGeometry args={[32, 32.12, 128]} />
        <meshBasicMaterial
          color="#38BDF8"
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function CosmicAtmosphereCanvas() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Multi-Layer Deep Space Radial Atmospheric Gradients */}
      <div className="absolute inset-0 bg-[#050811]" />
      
      {/* Breathing Volumetric Auroras */}
      <div className="absolute -top-32 left-1/4 w-[700px] h-[700px] rounded-full bg-cyan-950/20 blur-[150px] pointer-events-none aurora-ambient-glow" />
      <div className="absolute top-1/3 -right-24 w-[600px] h-[600px] rounded-full bg-indigo-950/25 blur-[160px] pointer-events-none aurora-ambient-glow [animation-delay:4s]" />
      <div className="absolute -bottom-36 left-1/3 w-[750px] h-[750px] rounded-full bg-purple-950/15 blur-[180px] pointer-events-none aurora-ambient-glow [animation-delay:8s]" />

      {/* 3D WebGL Multi-Layer Celestial Canvas */}
      <ErrorBoundary fallback={<div />}>
        <Canvas
          camera={{ position: [0, 0, 40], fov: 45, near: 0.1, far: 1000 }}
          gl={{ antialias: false, alpha: true, powerPreference: 'default' }}
          dpr={[1, 1.25]}
        >
          <InteractiveCameraRig />
          <ScintillatingStarfield />
          <InteractiveConstellationNetwork />
          <ShootingStarStreak />
          <EclipticCoordinateRing />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
