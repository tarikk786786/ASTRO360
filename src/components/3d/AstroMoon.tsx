import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AstroMoonProps {
  position?: [number, number, number];
  scale?: number;
  phaseAngle?: number; // 0 to 360 deg
}

export const AstroMoon: React.FC<AstroMoonProps> = ({
  position = [0, 0, 0],
  scale = 1.6,
  phaseAngle = 45,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.015;
    }
  });

  return (
    <group position={position}>
      {/* Central Lunar Sphere */}
      <mesh ref={meshRef} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#E2E8F0"
          roughness={0.85}
          metalness={0.1}
          emissive="#38BDF8"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* Subtle Lunar Atmospheric Corona Glow */}
      <mesh ref={glowRef} scale={scale * 1.25}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial
          color="#38BDF8"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

export default AstroMoon;
