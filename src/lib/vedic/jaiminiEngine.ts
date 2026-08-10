// src/lib/vedic/jaiminiEngine.ts
export interface JaiminiKarakas {
  atmakaraka: string;
  amatyakaraka: string;
  bhratrikaraka: string;
  matrikaraka: string;
  pitrikaraka: string;
  putrakaraka: string;
  gnatikaraka: string;
  darakaraka: string;
}

export function calculateCharaKarakas(planetDegrees: Record<string, number>, system: 7 | 8 = 8): JaiminiKarakas {
  // Sort planets by degrees in their respective signs (0-30)
  const planets = Object.entries(planetDegrees)
    .map(([name, degree]) => ({ name, degree: degree % 30 }))
    .sort((a, b) => b.degree - a.degree);

  return {
    atmakaraka: planets[0]?.name || '',
    amatyakaraka: planets[1]?.name || '',
    bhratrikaraka: planets[2]?.name || '',
    matrikaraka: planets[3]?.name || '',
    pitrikaraka: system === 8 ? (planets[4]?.name || '') : '',
    putrakaraka: system === 8 ? (planets[5]?.name || '') : (planets[4]?.name || ''),
    gnatikaraka: system === 8 ? (planets[6]?.name || '') : (planets[5]?.name || ''),
    darakaraka: system === 8 ? (planets[7]?.name || '') : (planets[6]?.name || ''),
  };
}
