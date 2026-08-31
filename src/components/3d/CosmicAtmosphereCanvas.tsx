import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { ErrorBoundary } from 'react-error-boundary';

// High-precision particle constellation field
function DynamicConstellationField() {
  const pointsRef = useRef<any>(null);
  const linesRef = useRef<any>(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const count = isMobile ? 120 : 250;

  const [positions, linePositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const lineCoords: number[] = [];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 80;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 40 - 10;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }

    // Connect close neighbors with constellation lines
    const maxDist = 12;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
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
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.012;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.02;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y += delta * 0.012;
      linesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.02;
    }
  });

  return (
    <group>
      {/* Constellation Star Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.4}
          color="#38BDF8"
          transparent
          opacity={0.65}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Constellation Geometric Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#38BDF8"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

// Gentle Ambient Nebula Glow Mesh
function AmbientNebulaGlow() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.z = Math.sin(t) * 0.05;
      meshRef.current.scale.setScalar(1 + Math.sin(t * 0.5) * 0.03);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -25]}>
      <planeGeometry args={[120, 80]} />
      <meshBasicMaterial
        color="#0c1833"
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function CosmicAtmosphereCanvas() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Multi-tier CSS Atmospheric Radial Gradients */}
      <div className="absolute inset-0 bg-[#050811]" />
      <div className="absolute -top-40 left-1/4 w-[650px] h-[650px] rounded-full bg-cyan-950/20 blur-[140px] pointer-events-none animate-pulse duration-[12000ms]" />
      <div className="absolute top-1/3 -right-32 w-[550px] h-[550px] rounded-full bg-indigo-950/25 blur-[150px] pointer-events-none animate-pulse duration-[16000ms]" />
      <div className="absolute -bottom-40 left-1/3 w-[700px] h-[700px] rounded-full bg-purple-950/20 blur-[160px] pointer-events-none animate-pulse duration-[20000ms]" />

      {/* 3D WebGL Constellation and Star Mesh */}
      <ErrorBoundary fallback={<div />}>
        <Canvas
          camera={{ position: [0, 0, 35], fov: 50, near: 0.1, far: 1000 }}
          gl={{ antialias: false, alpha: true, powerPreference: 'default' }}
          dpr={[1, 1.25]}
        >
          <ambientLight intensity={0.3} />
          <AmbientNebulaGlow />
          <DynamicConstellationField />
          <Stars radius={120} depth={40} count={1200} factor={2.5} saturation={0} fade speed={0.4} />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
