export type AspectType = 'conjunction' | 'sextile' | 'square' | 'trine' | 'opposition' | 'semi-sextile' | 'quincunx';

export interface Aspect {
  planet1: string;
  planet2: string;
  type: AspectType;
  orb: number;
  isApplying: boolean;
}

export function calculateWesternAspects(p1Long: number, p2Long: number): AspectType | null {
  const diff = Math.abs(p1Long - p2Long);
  const dist = Math.min(diff, 360 - diff);
  
  if (dist <= 10) return 'conjunction';
  if (Math.abs(dist - 60) <= 6) return 'sextile';
  if (Math.abs(dist - 90) <= 8) return 'square';
  if (Math.abs(dist - 120) <= 8) return 'trine';
  if (Math.abs(dist - 180) <= 10) return 'opposition';
  if (Math.abs(dist - 30) <= 2) return 'semi-sextile';
  if (Math.abs(dist - 150) <= 2) return 'quincunx';
  
  return null;
}

export function calculateVedicDrishti(p1Sign: number, p2Sign: number, planet: string): boolean {
  const dist = (p2Sign - p1Sign + 12) % 12; // 0-indexed distance in signs
  const aspectHouse = dist + 1; // 1-indexed house distance
  
  if (planet === 'Jupiter' || planet === 'Rahu' || planet === 'Ketu') {
    if ([5, 7, 9].includes(aspectHouse)) return true;
  } else if (planet === 'Mars') {
    if ([4, 7, 8].includes(aspectHouse)) return true;
  } else if (planet === 'Saturn') {
    if ([3, 7, 10].includes(aspectHouse)) return true;
  } else {
    if (aspectHouse === 7) return true;
  }
  
  return false;
}
