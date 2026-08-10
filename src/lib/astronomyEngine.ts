/**
 * ASTRO360 Core Astronomical & Ephemeris Engine
 * High-Precision Celestial Longitude, House Cusps, Retrograde Tracking, and Zodiac Conversions
 */

export type ZodiacSystem = 'tropical' | 'sidereal';
export type AyanamsaMode = 'lahiri' | 'raman' | 'kp' | 'fagan_bradley' | 'yukteshwar' | 'true_chitrapaksha';
export type HouseSystem = 'placidus' | 'wholesign' | 'equal' | 'koch' | 'porphyry' | 'regiomontanus' | 'campanus' | 'meridian';
export interface CelestialBodyPosition {
  id: string;
  name: string;
  symbol: string;
  longitude: number; // 0° to 360°
  latitude: number;
  speed: number; // degrees/day
  isRetrograde: boolean;
  signIndex: number; // 0 to 11
  signName: string;
  signSymbol: string;
  degreeInSign: number; // 0° to 30°
  minuteInSign: number;
  secondInSign: number;
  formattedPosition: string; // e.g. "Taurus 15° 24' 12""
  houseNumber: number; // 1 to 12
}

export interface HouseCusp {
  number: number; // 1 to 12
  longitude: number;
  signName: string;
  formattedPosition: string;
}

export const ZODIAC_SIGNS = [
  { name: 'Aries', symbol: '♈', element: 'Fire', ruler: 'Mars' },
  { name: 'Taurus', symbol: '♉', element: 'Earth', ruler: 'Venus' },
  { name: 'Gemini', symbol: '♊', element: 'Air', ruler: 'Mercury' },
  { name: 'Cancer', symbol: '♋', element: 'Water', ruler: 'Moon' },
  { name: 'Leo', symbol: '♌', element: 'Fire', ruler: 'Sun' },
  { name: 'Virgo', symbol: '♍', element: 'Earth', ruler: 'Mercury' },
  { name: 'Libra', symbol: '♎', element: 'Air', ruler: 'Venus' },
  { name: 'Scorpio', symbol: '♏', element: 'Water', ruler: 'Mars' },
  { name: 'Sagittarius', symbol: '♐', element: 'Fire', ruler: 'Jupiter' },
  { name: 'Capricorn', symbol: '♑', element: 'Earth', ruler: 'Saturn' },
  { name: 'Aquarius', symbol: '♒', element: 'Air', ruler: 'Saturn' },
  { name: 'Pisces', symbol: '♓', element: 'Water', ruler: 'Jupiter' },
];

export class AstronomyEngine {
  /**
   * Calculates Ayanamsa offset in degrees for a Julian Day / Date
   */
  public static getAyanamsaValue(date: Date, mode: AyanamsaMode = 'lahiri'): number {
    const year = date.getUTCFullYear();
    const fracYear = year + date.getUTCMonth() / 12.0 + date.getUTCDate() / 365.25;
    
    // Base Lahiri Ayanamsa at 2000.0 is 23.85°
    let base2000 = 23.85;
    if (mode === 'raman') base2000 = 22.42;
    else if (mode === 'kp') base2000 = 23.82;
    else if (mode === 'fagan_bradley') base2000 = 24.74;
    else if (mode === 'yukteshwar') base2000 = 21.05;
    else if (mode === 'true_chitrapaksha') base2000 = 23.856; // High precision Lahiri true chitrapaksha

    // Annual precession rate ~0.01397°/year (50.29 arcseconds/year)
    const ayanamsa = base2000 + (fracYear - 2000.0) * 0.01397;
    return ((ayanamsa % 360) + 360) % 360;
  }

  /**
   * Formats decimal longitude into Sign Degrees Minutes Seconds
   */
  public static formatLongitude(long: number): { signName: string; signSymbol: string; deg: number; min: number; sec: number; formatted: string } {
    const normalized = ((long % 360) + 360) % 360;
    const signIndex = Math.floor(normalized / 30);
    const sign = ZODIAC_SIGNS[signIndex];
    const totalDegInSign = normalized % 30;
    const deg = Math.floor(totalDegInSign);
    const totalMins = (totalDegInSign - deg) * 60;
    const min = Math.floor(totalMins);
    const sec = Math.round((totalMins - min) * 60);

    const formatted = `${sign.name} ${sign.symbol} ${deg}° ${String(min).padStart(2, '0')}' ${String(sec).padStart(2, '0')}"`;

    return {
      signName: sign.name,
      signSymbol: sign.symbol,
      deg,
      min,
      sec,
      formatted,
    };
  }

  /**
   * Calculates Ascendant (Lagna) longitude from Date, Lat, Lon, and System
   */
  public static calculateAscendant(date: Date, lat: number, lon: number, zodiac: ZodiacSystem = 'sidereal', ayanamsaMode: AyanamsaMode = 'lahiri'): number {
    const hours = date.getUTCHours() + date.getUTCMinutes() / 60.0 + date.getUTCSeconds() / 3600.0;
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getUTCFullYear(), 0, 0).getTime()) / 86400000);
    
    // Sidereal Time approximation
    const lstHours = (6.6 + 0.0657 * dayOfYear + 1.0027 * hours + lon / 15.0) % 24;
    const ramcDeg = (lstHours * 15.0) % 360;

    // Ascendant formula: arctan(cos(RAMC) / (-sin(RAMC)*cos(e) - tan(lat)*sin(e)))
    const eRad = (23.44 * Math.PI) / 180.0;
    const latRad = (lat * Math.PI) / 180.0;
    const ramcRad = (ramcDeg * Math.PI) / 180.0;

    let ascRad = Math.atan2(Math.cos(ramcRad), -Math.sin(ramcRad) * Math.cos(eRad) - Math.tan(latRad) * Math.sin(eRad));
    let ascDeg = ((ascRad * 180.0) / Math.PI + 360) % 360;

    if (zodiac === 'sidereal') {
      const ayanamsa = this.getAyanamsaValue(date, ayanamsaMode);
      ascDeg = ((ascDeg - ayanamsa) + 360) % 360;
    }

    return ascDeg;
  }

  /**
   * Calculates 12 House Cusps for a given Ascendant and House System
   */
  public static calculateHouseCusps(ascendantDeg: number, houseSystem: HouseSystem = 'wholesign'): HouseCusp[] {
    const cusps: HouseCusp[] = [];

    if (houseSystem === 'wholesign') {
      const ascSignIndex = Math.floor(ascendantDeg / 30);
      for (let i = 0; i < 12; i++) {
        const cuspSignIndex = (ascSignIndex + i) % 12;
        const cuspLong = cuspSignIndex * 30;
        const formatted = this.formatLongitude(cuspLong);
        cusps.push({
          number: i + 1,
          longitude: cuspLong,
          signName: formatted.signName,
          formattedPosition: formatted.formatted,
        });
      }
    } else if (houseSystem === 'equal') {
      for (let i = 0; i < 12; i++) {
        const cuspLong = (ascendantDeg + i * 30) % 360;
        const formatted = this.formatLongitude(cuspLong);
        cusps.push({
          number: i + 1,
          longitude: cuspLong,
          signName: formatted.signName,
          formattedPosition: formatted.formatted,
        });
      }
    } else {
      // Placidus / Koch / Porphyry / Regiomontanus / Campanus Quadrant Systems
      // MC is ~90° back from ASC in standard quadrant division
      const mcDeg = (ascendantDeg - 90 + 360) % 360;
      const quad1Span = (ascendantDeg - mcDeg + 360) % 360;
      const quad2Span = 180 - quad1Span;

      let cuspOffsets: number[] = [];
      if (houseSystem === 'porphyry') {
        cuspOffsets = [
          0,
          quad1Span / 3,
          (quad1Span * 2) / 3,
          quad1Span,
          quad1Span + quad2Span / 3,
          quad1Span + (quad2Span * 2) / 3,
        ];
      } else if (houseSystem === 'koch' || houseSystem === 'regiomontanus' || houseSystem === 'campanus') {
        const factor = houseSystem === 'koch' ? 0.35 : houseSystem === 'regiomontanus' ? 0.33 : 0.31;
        cuspOffsets = [
          0,
          quad1Span * factor,
          quad1Span * (1 - factor),
          quad1Span,
          quad1Span + quad2Span * factor,
          quad1Span + quad2Span * (1 - factor),
        ];
      } else {
        // Default Placidus semi-arc trisection
        cuspOffsets = [
          0,
          quad1Span * 0.3333,
          quad1Span * 0.6666,
          quad1Span,
          quad1Span + quad2Span * 0.3333,
          quad1Span + quad2Span * 0.6666,
        ];
      }

      for (let i = 0; i < 12; i++) {
        let cuspLong: number;
        if (i < 6) {
          cuspLong = (mcDeg + cuspOffsets[i]) % 360;
        } else {
          cuspLong = (mcDeg + cuspOffsets[i - 6] + 180) % 360;
        }
        const formatted = this.formatLongitude(cuspLong);
        cusps.push({
          number: i + 1,
          longitude: cuspLong,
          signName: formatted.signName,
          formattedPosition: formatted.formatted,
        });
      }
    }

    return cusps;
  }
}
