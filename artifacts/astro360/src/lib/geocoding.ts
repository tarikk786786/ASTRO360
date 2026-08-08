// ASTRO360 OMNI / COSMOS Free Architecture Location & Timezone Engine
// Uses OpenStreetMap Nominatim (Free, no API key required) + Open-Meteo Timezone API

export interface GeocodingResult {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  displayName?: string;
}

const POPULAR_CITIES: GeocodingResult[] = [
  { city: 'Mecca', country: 'Saudi Arabia', latitude: 21.3891, longitude: 39.8579, timezone: 'Asia/Riyadh' },
  { city: 'Medina', country: 'Saudi Arabia', latitude: 24.5247, longitude: 39.5692, timezone: 'Asia/Riyadh' },
  { city: 'Riyadh', country: 'Saudi Arabia', latitude: 24.7136, longitude: 46.6753, timezone: 'Asia/Riyadh' },
  { city: 'Jeddah', country: 'Saudi Arabia', latitude: 21.5433, longitude: 39.1728, timezone: 'Asia/Riyadh' },
  { city: 'Dubai', country: 'United Arab Emirates', latitude: 25.2048, longitude: 55.2708, timezone: 'Asia/Dubai' },
  { city: 'Abu Dhabi', country: 'United Arab Emirates', latitude: 24.4539, longitude: 54.3773, timezone: 'Asia/Dubai' },
  { city: 'New York', country: 'United States', latitude: 40.7128, longitude: -74.0060, timezone: 'America/New_York' },
  { city: 'London', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278, timezone: 'Europe/London' },
  { city: 'Tokyo', country: 'Japan', latitude: 35.6762, longitude: 139.6503, timezone: 'Asia/Tokyo' },
  { city: 'Paris', country: 'France', latitude: 48.8566, longitude: 2.3522, timezone: 'Europe/Paris' },
  { city: 'Cairo', country: 'Egypt', latitude: 30.0444, longitude: 31.2357, timezone: 'Africa/Cairo' },
  { city: 'Istanbul', country: 'Turkey', latitude: 41.0082, longitude: 28.9784, timezone: 'Europe/Istanbul' },
  { city: 'New Delhi', country: 'India', latitude: 28.6139, longitude: 77.2090, timezone: 'Asia/Kolkata' },
  { city: 'Mumbai', country: 'India', latitude: 19.0760, longitude: 72.8777, timezone: 'Asia/Kolkata' },
  { city: 'Varanasi', country: 'India', latitude: 25.3176, longitude: 82.9739, timezone: 'Asia/Kolkata' },
  { city: 'Singapore', country: 'Singapore', latitude: 1.3521, longitude: 103.8198, timezone: 'Asia/Singapore' },
  { city: 'Sydney', country: 'Australia', latitude: -33.8688, longitude: 151.2093, timezone: 'Australia/Sydney' },
];

/**
 * Synchronous local city lookup fallback
 */
export function lookupCityCoordinates(query: string): GeocodingResult {
  const normalized = query.trim().toLowerCase();
  const match = POPULAR_CITIES.find(
    c => c.city.toLowerCase().includes(normalized) || normalized.includes(c.city.toLowerCase())
  );

  if (match) return match;

  return {
    city: query || 'Mecca',
    country: 'Saudi Arabia',
    latitude: 21.3891,
    longitude: 39.8579,
    timezone: 'Asia/Riyadh'
  };
}

/**
 * Free Live Geocoding via OpenStreetMap Nominatim API
 * No API key required
 */
export async function geocodeCityNominatim(query: string): Promise<GeocodingResult[]> {
  if (!query || query.trim().length < 2) return POPULAR_CITIES.slice(0, 6);

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`;
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'ASTRO360-Free-Astrology-App/1.0'
      }
    });

    if (!res.ok) throw new Error('Nominatim request failed');

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return searchCities(query);
    }

    return data.map((item: any) => ({
      city: item.address?.city || item.address?.town || item.address?.village || item.name || query,
      country: item.address?.country || 'Global',
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
      timezone: 'UTC',
      displayName: item.display_name
    }));
  } catch (err) {
    console.warn('Nominatim live lookup failed, falling back to local database:', err);
    return searchCities(query);
  }
}

/**
 * Synchronous search over local database
 */
export function searchCities(query: string): GeocodingResult[] {
  if (!query || query.trim().length < 2) return POPULAR_CITIES.slice(0, 6);
  const normalized = query.trim().toLowerCase();
  return POPULAR_CITIES.filter(
    c => c.city.toLowerCase().includes(normalized) || c.country.toLowerCase().includes(normalized)
  );
}
