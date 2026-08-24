import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useUniverseStore } from '../../stores/universeStore';

export default function SolarSystemLayer() {
  const groupRef = useRef<THREE.Group>(null);
  const timeScale = useUniverseStore(state => state.timeScale);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotate entire system slowly
      groupRef.current.rotation.y += delta * 0.05 * timeScale;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Sun */}
      <Sphere args={[2.5, 64, 64]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#fff0b3" />
      </Sphere>
      
      {/* Earth Stylized */}
      <group position={[12, 0, 0]}>
        <Sphere args={[0.6, 32, 32]}>
          <meshStandardMaterial color="#2d5eb3" emissive="#1a3d82" emissiveIntensity={0.5} roughness={0.7} metalness={0.2} />
        </Sphere>
      </group>

      {/* Mars Stylized */}
      <group position={[17, 0, 0]}>
        <Sphere args={[0.4, 32, 32]}>
          <meshStandardMaterial color="#c25021" emissive="#822808" emissiveIntensity={0.5} roughness={0.8} metalness={0.1} />
        </Sphere>
      </group>
      
      {/* Venus Stylized */}
      <group position={[8, 0, 0]}>
        <Sphere args={[0.55, 32, 32]}>
          <meshStandardMaterial color="#e0c282" emissive="#917336" emissiveIntensity={0.4} roughness={0.4} />
        </Sphere>
      </group>

      {/* Orbital Rings */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <ringGeometry args={[7.95, 8.05, 64]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
        </mesh>
        <mesh>
          <ringGeometry args={[11.95, 12.05, 64]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
        </mesh>
        <mesh>
          <ringGeometry args={[16.95, 17.05, 64]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
        </mesh>
      </group>
    </group>
  );
}
