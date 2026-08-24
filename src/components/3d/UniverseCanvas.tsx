import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, SMAA } from '@react-three/postprocessing';
import { useUniverseStore } from '../../stores/universeStore';
import CameraRig from './CameraRig';
import SolarSystemLayer from './SolarSystemLayer';
import AstrologyOverlayLayer from './AstrologyOverlayLayer';
import GalaxyLayer from './GalaxyLayer';

export default function UniverseCanvas() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1]">
      <Canvas
        camera={{ position: [0, 20, 50], fov: 45, near: 0.1, far: 10000 }}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#02040a']} />
        
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.1} />
          <pointLight position={[0, 0, 0]} intensity={2} color="#fffbd1" />

          {/* Core Scene Layers */}
          <CameraRig />
          <SolarSystemLayer />
          <AstrologyOverlayLayer />

          {/* Procedural Galaxy / Background Stars */}
          <GalaxyLayer />
          <Stars radius={300} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />

          {/* Postprocessing */}
          <EffectComposer multisampling={0}>
            <SMAA />
            <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.2} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
