import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface AstroSceneCameraProps {
  enableParallax?: boolean;
}

export const AstroSceneCamera: React.FC<AstroSceneCameraProps> = ({
  enableParallax = true,
}) => {
  const { camera, pointer } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 8, 38));

  useFrame((_, delta) => {
    if (enableParallax) {
      targetPos.current.x = THREE.MathUtils.lerp(targetPos.current.x, pointer.x * 4.5, delta * 1.5);
      targetPos.current.y = THREE.MathUtils.lerp(targetPos.current.y, 8 + pointer.y * 3.0, delta * 1.5);
    } else {
      targetPos.current.x = THREE.MathUtils.lerp(targetPos.current.x, 0, delta * 2.0);
      targetPos.current.y = THREE.MathUtils.lerp(targetPos.current.y, 8, delta * 2.0);
    }

    camera.position.x = targetPos.current.x;
    camera.position.y = targetPos.current.y;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

export default AstroSceneCamera;
