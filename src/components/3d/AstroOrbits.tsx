import React from 'react';
import * as THREE from 'three';

interface AstroOrbitsProps {
  radii?: number[];
}

export const AstroOrbits: React.FC<AstroOrbitsProps> = ({
  radii = [10, 16, 22, 28, 34],
}) => {
  return (
    <group rotation={[Math.PI * 0.15, 0, 0]}>
      {radii.map((r, idx) => (
        <mesh key={idx} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r - 0.04, r + 0.04, 96]} />
          <meshBasicMaterial
            color="#38BDF8"
            transparent
            opacity={0.07 + idx * 0.02}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
};

export default AstroOrbits;
