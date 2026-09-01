import React, { useRef } from 'react';
import * as THREE from 'three';
import type { PlanetPosition } from '../../lib/astroCalculations';

interface AstroPlanetsProps {
  planets: PlanetPosition[];
  radius?: number;
  onSelectPlanet?: (planet: PlanetPosition) => void;
  selectedPlanetName?: string;
}

const PLANET_COLORS: Record<string, string> = {
  Sun: '#F59E0B',
  Moon: '#E2E8F0',
  Mars: '#EF4444',
  Mercury: '#10B981',
  Jupiter: '#FBBF24',
  Venus: '#EC4899',
  Saturn: '#8B5CF6',
  Rahu: '#6366F1',
  Ketu: '#94A3B8',
};

export const AstroPlanets: React.FC<AstroPlanetsProps> = ({
  planets,
  radius = 22,
  onSelectPlanet,
  selectedPlanetName,
}) => {
  return (
    <group rotation={[Math.PI * 0.15, 0, 0]}>
      {planets.map((planet) => {
        const rad = ((planet.degreeDecimal - 90) * Math.PI) / 180;
        const x = radius * Math.cos(rad);
        const z = radius * Math.sin(rad);
        const color = PLANET_COLORS[planet.name] || '#38BDF8';
        const isSelected = selectedPlanetName === planet.name;

        return (
          <group 
            key={planet.name} 
            position={[x, 0, z]}
            onClick={() => onSelectPlanet?.(planet)}
          >
            {/* Planet Node Body */}
            <mesh scale={isSelected ? 1.4 : 1.0}>
              <sphereGeometry args={[0.65, 16, 16]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.35}
                roughness={0.4}
              />
            </mesh>

            {/* Selection Halo */}
            {isSelected && (
              <mesh scale={2.2}>
                <sphereGeometry args={[0.65, 16, 16]} />
                <meshBasicMaterial
                  color="#F59E0B"
                  transparent
                  opacity={0.3}
                  wireframe
                />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
};

export default AstroPlanets;
