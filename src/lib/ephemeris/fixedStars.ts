export interface FixedStar {
  name: string;
  longitude: number;
  latitude: number;
  magnitude: number;
}

export function getFixedStarPosition(starName: string, year: number): FixedStar | null {
  // Simple precession calculation for fixed stars
  const baseYear = 2000;
  const precessionRate = 50.29 / 3600; // degrees per year
  const yearDiff = year - baseYear;
  const precession = yearDiff * precessionRate;
  
  return {
    name: starName,
    longitude: precession, // Simplified
    latitude: 0,
    magnitude: 1
  };
}
