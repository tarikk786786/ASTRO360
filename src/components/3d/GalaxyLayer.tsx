import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function GalaxyLayer() {
  const pointsRef = useRef<any>(null);
  
  // Procedural subtle cosmic star field
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const particleCount = isMobile ? 3000 : 7000;
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    
    const colorCore = new THREE.Color('#38bdf8'); // Soft celestial cyan
    const colorOuter = new THREE.Color('#1e293b'); // Deep slate
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      const radius = Math.random() * 200 + 20;
      const spinAngle = radius * 0.03;
      const branchAngle = ((i % 3) / 3) * Math.PI * 2;
      
      const randomX = (Math.random() - 0.5) * 15;
      const randomY = (Math.random() - 0.5) * 8;
      const randomZ = (Math.random() - 0.5) * 15;
      
      pos[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      pos[i3 + 1] = randomY;
      pos[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
      
      const mixedColor = colorCore.clone().lerp(colorOuter, radius / 220);
      col[i3] = mixedColor.r;
      col[i3 + 1] = mixedColor.g;
      col[i3 + 2] = mixedColor.b;
    }
    return [pos, col];
  }, [particleCount]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute 
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.12}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors={true}
        blending={THREE.AdditiveBlending}
        transparent={true}
        opacity={0.2}
      />
    </points>
  );
}
