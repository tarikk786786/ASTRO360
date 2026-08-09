import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Compass, Clock, MapPin, RefreshCw, ShieldCheck, Sun, Moon, Volume2, Globe, CheckCircle2 } from 'lucide-react';

interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
}

interface HijriDate {
  day: string;
  month: { en: string; ar: string };
  year: string;
  weekday: { en: string; ar: string };
}

const CALCULATION_METHODS = [
  { id: 2, name: 'ISNA (North America)' },
  { id: 3, name: 'Muslim World League (MWL)' },
  { id: 4, name: 'Umm Al-Qura (Makkah)' },
  { id: 1, name: 'Egyptian General Authority' },
  { id: 5, name: 'Univ. of Islamic Sciences Karachi' },
  { id: 12, name: 'UOIF (France)' }
];

export default function AlAzanPrayerSuite() {
  const [timings, setTimings] = useState<PrayerTimings | null>(null);
  const [hijriDate, setHijriDate] = useState<HijriDate | null>(null);
  const [method, setMethod] = useState<number>(2);
  const [locationName, setLocationName] = useState<string>('Mecca, Saudi Arabia (Default)');
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({ lat: 21.4225, lng: 39.8262 });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [countdown, setCountdown] = useState<string>('00:00:00');
  const [nextPrayer, setNextPrayer] = useState<string>('Asr');

  const MUSLIM_API_KEY = import.meta.env.VITE_MUSLIM_API_KEY || 'IeQtuzn8OpWYX9aXQ0HCrBNE9I3KHJbbx2Ns2dGufFqt4jMi';
  const UMMAH_API_KEY = import.meta.env.VITE_UMMAH_API_KEY || 'umh_0b8d1fc3c742321a9f46ae5667ed238d8e5800f5';

  const fetchPrayerTimes = async (lat: number, lng: number, methodId: number) => {
    setIsLoading(true);
    try {
      // Primary High-Precision UmmahAPI Fetch
      const ummahRes = await fetch(`https://ummahapi.com/api/prayer-times?lat=${lat}&lng=${lng}&apikey=${UMMAH_API_KEY}`, {
        headers: { 'X-API-Key': UMMAH_API_KEY }
      });
      if (ummahRes.ok) {
        const ummahData = await ummahRes.json();
        if (ummahData.data || ummahData.timings) {
          const t = ummahData.data?.timings || ummahData.timings || ummahData;
          setTimings({
            Fajr: t.fajr || t.Fajr,
            Sunrise: t.sunrise || t.Sunrise,
            Dhuhr: t.dhuhr || t.Dhuhr,
            Asr: t.asr || t.Asr,
            Sunset: t.sunset || t.Sunset || t.maghrib || t.Maghrib,
            Maghrib: t.maghrib || t.Maghrib,
            Isha: t.isha || t.Isha,
            Imsak: t.imsak || t.Imsak || t.fajr || t.Fajr,
            Midnight: t.midnight || '00:00',
            Firstthird: '22:00',
            Lastthird: '02:00'
          });
          setIsLoading(false);
          return;
        }
      }

      // Secondary Aladhan API Fetch
      const res = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=${methodId}`);
      if (res.ok) {
        const data = await res.json();
        setTimings(data.data.timings);
        setHijriDate(data.data.date.hijri);
      } else {
        // Tertiary MuslimSalat API Fetch
        const fallbackRes = await fetch(`https://muslimsalat.com/${lat},${lng}/daily.json?key=${MUSLIM_API_KEY}`);
        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json();
          if (fallbackData.items && fallbackData.items[0]) {
            const item = fallbackData.items[0];
            setTimings({
              Fajr: item.fajr,
              Sunrise: item.shurooq,
              Dhuhr: item.dhuhr,
              Asr: item.asr,
              Sunset: item.maghrib,
              Maghrib: item.maghrib,
              Isha: item.isha,
              Imsak: item.fajr,
              Midnight: '00:00',
              Firstthird: '22:00',
              Lastthird: '02:00'
            });
          }
        }
      }
    } catch (e) {
      console.error('Prayer API fetch error', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrayerTimes(coords.lat, coords.lng, method);
  }, [coords, method]);

  const useBrowserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCoords({ lat, lng });
        setLocationName(`Your Location (${lat.toFixed(2)}°, ${lng.toFixed(2)}°)`);
      });
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl space-y-6">
      {/* HEADER & AL-AZAN BADGE */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4 text-emerald-400" />
            Official Meypod Al-Azan & Aladhan Engine
          </div>
          <h3 className="text-2xl font-bold font-display text-white">Live Prayer Times & Qibla Suite</h3>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={useBrowserLocation}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5" /> Auto GPS Location
          </button>

          <select
            value={method}
            onChange={(e) => setMethod(Number(e.target.value))}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-emerald-500"
          >
            {CALCULATION_METHODS.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* LOCATION & HIJRI DATE STATUS BAR */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Active Location</span>
            <span className="text-xs font-bold font-mono text-emerald-300">{locationName}</span>
          </div>
        </div>

        {hijriDate && (
          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Hijri Date</span>
            <span className="text-sm font-bold font-serif text-emerald-200">
              {hijriDate.day} {hijriDate.month.en} {hijriDate.year} AH ({hijriDate.weekday.en})
            </span>
          </div>
        )}
      </div>

      {/* PRAYER CARDS GRID */}
      {isLoading ? (
        <div className="h-48 flex items-center justify-center text-slate-400 text-xs font-mono">
          <RefreshCw className="w-6 h-6 animate-spin text-emerald-400 mr-2" /> Syncing Live Prayer Telemetry...
        </div>
      ) : timings ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {[
            { name: 'Fajr', time: timings.Fajr, icon: <Sun className="w-4 h-4 text-amber-400" /> },
            { name: 'Sunrise', time: timings.Sunrise, icon: <Sun className="w-4 h-4 text-orange-400" /> },
            { name: 'Dhuhr', time: timings.Dhuhr, icon: <Sun className="w-4 h-4 text-yellow-300" /> },
            { name: 'Asr', time: timings.Asr, icon: <Sun className="w-4 h-4 text-emerald-400" /> },
            { name: 'Maghrib', time: timings.Maghrib, icon: <Moon className="w-4 h-4 text-purple-300" /> },
            { name: 'Isha', time: timings.Isha, icon: <Moon className="w-4 h-4 text-indigo-400" /> },
            { name: 'Imsak', time: timings.Imsak, icon: <Clock className="w-4 h-4 text-cyan-400" /> }
          ].map((p, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 text-center space-y-1.5 transition-all"
            >
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-200">
                {p.icon}
                <span>{p.name}</span>
              </div>
              <p className="text-base font-mono font-bold text-emerald-300">{p.time}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
