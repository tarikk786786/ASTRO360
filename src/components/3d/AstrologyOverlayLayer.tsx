import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Ring, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useUniverseStore } from '../../stores/universeStore';

const ZODIAC_SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

export default function AstrologyOverlayLayer() {
  const showOverlay = useUniverseStore(state => state.showAstrologyOverlay);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Zodiac wheel slowly rotates in the background
      groupRef.current.rotation.z -= delta * 0.02;
    }
  });

  if (!showOverlay) return null;

  return (
    <group ref={groupRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      {/* Main Ecliptic Ring */}
      <Ring args={[28, 28.2, 64]} material-color="#d4af37" material-transparent material-opacity={0.3} />
      
      {/* Zodiac Sectors & Text */}
      {ZODIAC_SIGNS.map((sign, i) => {
        const angle = (i * Math.PI) / 6;
        const x = Math.cos(angle) * 30;
        const y = Math.sin(angle) * 30;
        
        return (
          <group key={sign}>
            <Text
              position={[x, y, 0]}
              rotation={[0, 0, angle - Math.PI / 2]}
              fontSize={1.5}
              color="#d4af37"
              anchorX="center"
              anchorY="middle"
            >
              {sign}
            </Text>
            {/* Separator lines */}
            <mesh position={[Math.cos(angle - Math.PI/12) * 29, Math.sin(angle - Math.PI/12) * 29, 0]} rotation={[0, 0, angle - Math.PI/12]}>
              <planeGeometry args={[2, 0.1]} />
              <meshBasicMaterial color="#d4af37" transparent opacity={0.2} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
