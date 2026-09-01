import React, { useState, useEffect, useRef, Suspense, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import { ErrorBoundary } from 'react-error-boundary';
import { detectQualityTier, type QualityConfig } from './AstroQualityController';
import AstroWebGLFallback from './AstroWebGLFallback';
import AstroStarField from './AstroStarField';
import AstroZodiac from './AstroZodiac';
import AstroMoon from './AstroMoon';
import AstroPlanets from './AstroPlanets';
import AstroOrbits from './AstroOrbits';
import AstroSceneCamera from './AstroSceneCamera';
import { calculatePlanetaryPositions, type PlanetPosition } from '../../lib/astroCalculations';
import type { UserProfile } from '../../types';

export interface AstroSceneProps {
  userProfile?: UserProfile;
  className?: string;
  enableOrbits?: boolean;
  onSelectPlanet?: (planet: PlanetPosition) => void;
  selectedPlanetName?: string;
}

export const AstroScene: React.FC<AstroSceneProps> = memo(({
  userProfile,
  className = '',
  enableOrbits = true,
  onSelectPlanet,
  selectedPlanetName,
}) => {
  const [quality, setQuality] = useState<QualityConfig>(() => detectQualityTier());
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate authentic planetary coordinates from ASTROCORE
  const planets = React.useMemo(() => {
    try {
      return calculatePlanetaryPositions(
        userProfile?.dob || '1998-06-15',
        userProfile?.time || '12:00'
      );
    } catch {
      return [];
    }
  }, [userProfile?.dob, userProfile?.time]);

  // Dynamic device quality tier detection
  useEffect(() => {
    const handleResize = () => setQuality(detectQualityTier());
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // IntersectionObserver to pause rendering when off-screen
  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Document visibility listener to pause rendering when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false);
      } else if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(inView);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // If tier is STATIC or reduced motion is preferred, render pure 2D fallback
  if (quality.tier === 'STATIC') {
    return <AstroWebGLFallback className={className} />;
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-0 select-none overflow-hidden ${className}`}
    >
      <ErrorBoundary fallback={<AstroWebGLFallback />}>
        {isVisible ? (
          <Canvas
            camera={{ position: [0, 8, 38], fov: 45, near: 0.1, far: 1000 }}
            dpr={quality.dpr}
            gl={{
              antialias: quality.tier !== 'LOW',
              alpha: true,
              powerPreference: 'high-performance',
            }}
            frameloop={quality.frameloop}
          >
            <Suspense fallback={null}>
              {/* Lighting */}
              <ambientLight intensity={0.35} />
              <pointLight position={[0, 0, 0]} intensity={1.8} color="#FEF08A" />

              {/* Inertial Camera Rig */}
              <AstroSceneCamera enableParallax={quality.enableParallax} />

              {/* Layer 1 & 2: Deep Multi-Spectral Starfield */}
              <AstroStarField count={quality.starCount} radius={95} speed={0.003} />

              {/* Layer 3: 12-Sign Celestial Zodiac Coordinate Ring */}
              <AstroZodiac radius={24} enableGlow={quality.enableZodiacGlow} />

              {/* Layer 4: Real Planetary Orbits */}
              {enableOrbits && quality.enableOrbits && (
                <AstroOrbits radii={[10, 16, 24, 30, 36]} />
              )}

              {/* Layer 5: ASTROCORE Planets positioned at actual NASA JPL ecliptic degrees */}
              {planets.length > 0 && (
                <AstroPlanets
                  planets={planets}
                  radius={24}
                  onSelectPlanet={onSelectPlanet}
                  selectedPlanetName={selectedPlanetName}
                />
              )}

              {/* Central Lunar Anchor */}
              <AstroMoon position={[0, 0, 0]} scale={1.8} />
            </Suspense>
          </Canvas>
        ) : (
          <AstroWebGLFallback />
        )}
      </ErrorBoundary>
    </div>
  );
});

AstroScene.displayName = 'AstroScene';
export default AstroScene;
