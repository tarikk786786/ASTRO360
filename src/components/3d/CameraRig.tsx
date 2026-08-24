import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useUniverseStore } from '../../stores/universeStore';

export default function CameraRig() {
  const { camera } = useThree();
  const target = useUniverseStore(state => state.target);
  const targetPosition = useRef(new THREE.Vector3(0, 40, 60));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    switch (target) {
      case 'galaxy':
        targetPosition.current.set(0, 100, 200);
        targetLookAt.current.set(0, 0, 0);
        break;
      case 'solarsystem':
        targetPosition.current.set(0, 40, 60);
        targetLookAt.current.set(0, 0, 0);
        break;
      case 'zodiac':
        targetPosition.current.set(0, 60, 0);
        targetLookAt.current.set(0, 0, 0);
        break;
      case 'planet':
        // Dummy planet focus
        targetPosition.current.set(10, 5, 10);
        targetLookAt.current.set(10, 0, 0);
        break;
    }
  }, [target]);

  useFrame((state, delta) => {
    // Smoothly interpolate camera position
    camera.position.lerp(targetPosition.current, delta * 2);
    
    // Smoothly interpolate lookAt target
    currentLookAt.current.lerp(targetLookAt.current, delta * 2);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
