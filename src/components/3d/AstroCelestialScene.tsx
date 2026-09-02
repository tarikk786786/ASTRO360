import React, { memo } from 'react';
import { AstroScene, type AstroSceneProps } from './AstroScene';

export interface AstroCelestialSceneProps extends AstroSceneProps {
  mode?: 'LANDING' | 'HOME' | 'FORECAST' | 'CHART' | 'STUDIO';
}

/**
 * AstroCelestialScene — Unified progressive 3D Celestial Scene
 * Consumes ASTROCORE state with automatic device tiering & WebGL fallback.
 */
export const AstroCelestialScene: React.FC<AstroCelestialSceneProps> = memo(({
  mode = 'HOME',
  className = '',
  enableOrbits = true,
  ...props
}) => {
  // Apply mode-specific subtle opacity & scale
  const modeClass = mode === 'LANDING'
    ? 'opacity-80'
    : mode === 'CHART'
    ? 'opacity-20'
    : mode === 'STUDIO'
    ? 'opacity-100'
    : 'opacity-40';

  return (
    <div className={`pointer-events-none transition-opacity duration-1000 ${modeClass} ${className}`}>
      <AstroScene enableOrbits={enableOrbits} {...props} />
    </div>
  );
});

export default AstroCelestialScene;
