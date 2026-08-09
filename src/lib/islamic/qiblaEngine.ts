/**
 * ASTRO360 Qibla Bearing & Compass Direction Engine
 * Great Circle Distance & True North Spherical Trigonometry to Mecca (Kaaba: 21.4225° N, 39.8262° E)
 */

export interface QiblaResult {
  bearingDegrees: number; // 0° to 360° from True North
  compassCardinal: string; // e.g. "ENE", "SSW", "NW"
  distanceKm: number;
  meccaCoordinates: { lat: number; lon: number };
}

export class QiblaEngine {
  /**
   * Calculates Qibla direction bearing and distance from user coordinates
   */
  public static calculateQibla(userLat: number, userLon: number): QiblaResult {
    const kaabaLat = 21.4225;
    const kaabaLon = 39.8262;

    const lat1Rad = (userLat * Math.PI) / 180.0;
    const lat2Rad = (kaabaLat * Math.PI) / 180.0;
    const deltaLonRad = ((kaabaLon - userLon) * Math.PI) / 180.0;

    // Great Circle Bearing Formula
    const y = Math.sin(deltaLonRad);
    const x = Math.cos(lat1Rad) * Math.tan(lat2Rad) - Math.sin(lat1Rad) * Math.cos(deltaLonRad);

    let bearingRad = Math.atan2(y, x);
    let bearingDeg = ((bearingRad * 180.0) / Math.PI + 360) % 360;

    // Great Circle Distance (Haversine Formula)
    const R = 6371; // Earth radius in km
    const dLatRad = lat2Rad - lat1Rad;
    const a = Math.sin(dLatRad / 2) * Math.sin(dLatRad / 2) +
              Math.cos(lat1Rad) * Math.cos(lat2Rad) *
              Math.sin(deltaLonRad / 2) * Math.sin(deltaLonRad / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = Math.round(R * c);

    // Compass Cardinal directions
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const cardinalIndex = Math.round(bearingDeg / 22.5) % 16;
    const compassCardinal = directions[cardinalIndex];

    return {
      bearingDegrees: parseFloat(bearingDeg.toFixed(2)),
      compassCardinal,
      distanceKm,
      meccaCoordinates: { lat: kaabaLat, lon: kaabaLon },
    };
  }
}
