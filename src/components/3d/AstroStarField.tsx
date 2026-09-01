import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SPECTRAL_PALETTE = [
  new THREE.Color('#93C5FD'), // Class O/B (Blue-Cyan)
  new THREE.Color('#FFFFFF'), // Class A (Pure White)
  new THREE.Color('#FEF08A'), // Class F/G (Solar Gold)
  new THREE.Color('#FDE047'), // Class G (Amber)
  new THREE.Color('#FCA5A5'), // Class K/M (Deep Red Giant)
  new THREE.Color('#38BDF8'), // Stellar Cyan
];

interface AstroStarFieldProps {
  count?: number;
  radius?: number;
  speed?: number;
}

export const AstroStarField: React.FC<AstroStarFieldProps> = ({
  count = 1800,
  radius = 90,
  speed = 0.004,
}) => {
  const pointsRef = useRef<any>(null);
  const geomRef = useRef<any>(null);
  const matRef = useRef<any>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = 20 + Math.random() * radius;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = r * Math.cos(phi) - 10;

      const spectral = SPECTRAL_PALETTE[Math.floor(Math.random() * SPECTRAL_PALETTE.length)];
      col[i3] = spectral.r;
      col[i3 + 1] = spectral.g;
      col[i3 + 2] = spectral.b;
    }

    return [pos, col];
  }, [count, radius]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * speed;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.008;
    }
  });

  // Memory disposal on unmount
  useEffect(() => {
    return () => {
      geomRef.current?.dispose?.();
      matRef.current?.dispose?.();
    };
  }, []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        size={0.42}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default AstroStarField;
