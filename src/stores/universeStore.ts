import { create } from 'zustand';

export type CameraTarget = 'galaxy' | 'solarsystem' | 'planet' | 'zodiac';

interface UniverseState {
  target: CameraTarget;
  selectedPlanet: string | null;
  selectedZodiac: string | null;
  showAstrologyOverlay: boolean;
  timeScale: number;
  setTarget: (target: CameraTarget) => void;
  setSelectedPlanet: (planet: string | null) => void;
  setSelectedZodiac: (zodiac: string | null) => void;
  setShowAstrologyOverlay: (show: boolean) => void;
  setTimeScale: (scale: number) => void;
}

export const useUniverseStore = create<UniverseState>((set) => ({
  target: 'solarsystem',
  selectedPlanet: null,
  selectedZodiac: null,
  showAstrologyOverlay: true,
  timeScale: 1,
  setTarget: (target) => set({ target }),
  setSelectedPlanet: (selectedPlanet) => set({ selectedPlanet, target: selectedPlanet ? 'planet' : 'solarsystem' }),
  setSelectedZodiac: (selectedZodiac) => set({ selectedZodiac, target: selectedZodiac ? 'zodiac' : 'solarsystem' }),
  setShowAstrologyOverlay: (showAstrologyOverlay) => set({ showAstrologyOverlay }),
  setTimeScale: (timeScale) => set({ timeScale }),
}));
