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
      groupRef.current.rotation.z -= delta * 0.01;
    }
  });

  if (!showOverlay) return null;

  return (
    <group ref={groupRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]}>
      {/* Subtle Ecliptic Ring */}
      <Ring args={[38, 38.15, 64]} material-color="#38bdf8" material-transparent material-opacity={0.08} />
      
      {/* Zodiac Sectors & Text */}
      {ZODIAC_SIGNS.map((sign, i) => {
        const angle = (i * Math.PI) / 6;
        const x = Math.cos(angle) * 40;
        const y = Math.sin(angle) * 40;
        
        return (
          <group key={sign}>
            <Text
              position={[x, y, 0]}
              rotation={[0, 0, angle - Math.PI / 2]}
              fontSize={1.2}
              color="#64748b"
              anchorX="center"
              anchorY="middle"
              fillOpacity={0.12}
            >
              {sign}
            </Text>
          </group>
        );
      })}
    </group>
  );
}
