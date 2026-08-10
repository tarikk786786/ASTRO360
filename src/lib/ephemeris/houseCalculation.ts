export type HouseSystem = 'placidus' | 'koch' | 'equal' | 'wholesign' | 'porphyry' | 'regiomontanus' | 'campanus' | 'meridian';

export interface HouseCusp {
  houseNumber: number;
  longitude: number;
}

export function calculateHouses(ascendantDeg: number, mcDeg: number, system: HouseSystem): HouseCusp[] {
  const cusps: HouseCusp[] = [];
  for (let i = 1; i <= 12; i++) {
    cusps.push({ houseNumber: i, longitude: (ascendantDeg + (i - 1) * 30) % 360 });
  }
  return cusps;
}
