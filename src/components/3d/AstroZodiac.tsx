import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AstroZodiacProps {
  radius?: number;
  enableGlow?: boolean;
}

export const AstroZodiac: React.FC<AstroZodiacProps> = ({
  radius = 22,
  enableGlow = true,
}) => {
  const groupRef = useRef<any>(null);
  const ringGeomRef = useRef<any>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.002;
    }
  });

  return (
    <group ref={groupRef} rotation={[Math.PI * 0.15, 0, 0]}>
      {/* Primary Ecliptic Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry ref={ringGeomRef} args={[radius - 0.06, radius + 0.06, 128]} />
        <meshBasicMaterial
          color="#F59E0B"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Outer Fine Guide Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius + 1.5, radius + 1.54, 96]} />
        <meshBasicMaterial
          color="#38BDF8"
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

export default AstroZodiac;
