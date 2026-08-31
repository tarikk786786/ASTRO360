import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { ErrorBoundary } from 'react-error-boundary';
import CameraRig from './CameraRig';
import SolarSystemLayer from './SolarSystemLayer';
import AstrologyOverlayLayer from './AstrologyOverlayLayer';
import GalaxyLayer from './GalaxyLayer';

export default function UniverseCanvas() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
      <ErrorBoundary fallback={<div />}>
        <Canvas
          camera={{ position: [0, 20, 50], fov: 45, near: 0.1, far: 10000 }}
          gl={{ antialias: false, alpha: true, powerPreference: 'default' }}
          dpr={[1, 1.25]}
        >
          <Suspense fallback={null}>
            {/* Lighting */}
            <ambientLight intensity={0.2} />
            <pointLight position={[0, 0, 0]} intensity={2.0} color="#fffbd1" />

            {/* Core Scene Layers */}
            <CameraRig />
            <SolarSystemLayer />
            <AstrologyOverlayLayer />

            {/* Procedural Galaxy / Background Stars */}
            <GalaxyLayer />
            <Stars radius={300} depth={50} count={2500} factor={3} saturation={0} fade speed={0.3} />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
