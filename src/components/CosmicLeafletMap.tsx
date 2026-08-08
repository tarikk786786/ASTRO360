import React, { useState } from 'react';
import { MapPin, Globe, Compass, Navigation, Sparkles, Search, CheckCircle } from 'lucide-react';
import { geocodeCityNominatim, GeocodingResult } from '../lib/geocoding';
import { toast } from 'sonner';

interface CosmicLeafletMapProps {
  initialLat?: number;
  initialLng?: number;
  initialCity?: string;
  onLocationSelect?: (location: GeocodingResult) => void;
}

export default function CosmicLeafletMap({
  initialLat = 21.3891,
  initialLng = 39.8579,
  initialCity = 'Mecca, Saudi Arabia',
  onLocationSelect,
}: CosmicLeafletMapProps) {
  const [query, setQuery] = useState(initialCity);
  const [selectedLocation, setSelectedLocation] = useState<GeocodingResult>({
    city: initialCity.split(',')[0] || 'Mecca',
    country: initialCity.split(',')[1]?.trim() || 'Saudi Arabia',
    latitude: initialLat,
    longitude: initialLng,
    timezone: 'Asia/Riyadh',
  });
  const [searchResults, setSearchResults] = useState<GeocodingResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const results = await geocodeCityNominatim(query);
      setSearchResults(results);
      if (results.length > 0) {
        handleSelect(results[0]);
      } else {
        toast.error('City not found in OpenStreetMap database');
      }
    } catch (err) {
      toast.error('Geocoding search failed');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelect = (loc: GeocodingResult) => {
    setSelectedLocation(loc);
    setQuery(loc.displayName || `${loc.city}, ${loc.country}`);
    if (onLocationSelect) {
      onLocationSelect(loc);
    }
    toast.success(`Coordinates set to ${loc.latitude.toFixed(4)}°, ${loc.longitude.toFixed(4)}°`);
  };

  // Convert lat/lng to approximate CSS percentage position on OpenStreetMap static viewer
  const mapX = Math.min(Math.max(((selectedLocation.longitude + 180) / 360) * 100, 5), 95);
  const mapY = Math.min(Math.max(((90 - selectedLocation.latitude) / 180) * 100, 5), 95);

  return (
    <div className="glass-card rounded-3xl p-6 border border-[#2563EB]/30 shadow-2xl space-y-6 text-left">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            <Globe className="w-4 h-4 text-cyan-400" />
            OpenStreetMap & Nominatim Free Location Engine
          </div>
          <h3 className="text-xl font-bold font-display text-white">Interactive Astrological Location Map</h3>
        </div>

        <span className="px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold flex items-center gap-1.5">
          <Navigation className="w-3.5 h-3.5 text-cyan-400" /> 100% Free API Stack
        </span>
      </div>

      {/* SEARCH BAR FOR NOMINATIM LOOKUP */}
      <form onSubmit={handleSearch} className="space-y-3">
        <label className="text-xs font-mono text-slate-400 flex items-center justify-between">
          <span>Search birthplace or city globally (OpenStreetMap Nominatim):</span>
          <span className="text-[10px] text-cyan-400 font-bold">No API key required</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Mecca, Tokyo, London, Varanasi, Cairo..."
            className="flex-1 px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-cyan-500 placeholder:text-slate-600"
          />
          <button
            type="submit"
            disabled={isSearching}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-lg cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>{isSearching ? 'Searching...' : 'Lookup City'}</span>
          </button>
        </div>

        {/* SEARCH SUGGESTIONS */}
        {searchResults.length > 0 && (
          <div className="p-2 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 max-h-40 overflow-y-auto">
            {searchResults.map((res, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(res)}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-900 text-xs font-mono text-slate-300 hover:text-white flex items-center justify-between transition-colors cursor-pointer"
              >
                <span className="truncate">{res.displayName || `${res.city}, ${res.country}`}</span>
                <span className="text-[10px] text-cyan-400 shrink-0 font-bold">
                  {res.latitude.toFixed(2)}°, {res.longitude.toFixed(2)}°
                </span>
              </button>
            ))}
          </div>
        )}
      </form>

      {/* INTERACTIVE OPENSTREETMAP GLOBE CANVAS VISUALIZER */}
      <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#0B1220] shadow-inner group">
        {/* OpenStreetMap Map Imagery Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity grayscale group-hover:grayscale-0 transition-all duration-700"
          style={{
            backgroundImage: `url('https://tile.openstreetmap.org/3/4/2.png')`,
            backgroundSize: 'cover'
          }}
        />

        {/* Latitude / Longitude Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#06B6D4_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

        {/* PIN POINT VISUALIZER */}
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 z-20 flex flex-col items-center"
          style={{ left: `${mapX}%`, top: `${mapY}%` }}
        >
          <div className="p-2 rounded-full bg-cyan-500/30 border border-cyan-400 animate-ping absolute inset-0" />
          <div className="p-2.5 rounded-full bg-cyan-600 text-white shadow-xl relative z-10">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div className="mt-2 px-3 py-1 rounded-xl bg-slate-950/90 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono font-bold whitespace-nowrap shadow-2xl backdrop-blur-md">
            📍 {selectedLocation.city} ({selectedLocation.latitude.toFixed(2)}°, {selectedLocation.longitude.toFixed(2)}°)
          </div>
        </div>

        {/* BOTTOM METRICS BAR */}
        <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/90 border border-slate-800/80 backdrop-blur-md flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-slate-300 z-10">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>OpenStreetMap Coordinates Synced</span>
          </div>

          <div className="flex items-center gap-4 text-cyan-300">
            <span>LAT: <strong>{selectedLocation.latitude.toFixed(4)}°</strong></span>
            <span>LNG: <strong>{selectedLocation.longitude.toFixed(4)}°</strong></span>
            <span>TZ: <strong>{selectedLocation.timezone}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
