import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Globe, Zap, ExternalLink, RefreshCw, CheckCircle2, ShieldCheck, Telescope } from 'lucide-react';
import { fetchApod } from '../lib/apiProxy';

interface NasaApodData {
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  date: string;
  copyright?: string;
  media_type: string;
}

export default function NasaLiveTelemetry() {
  const [apodData, setApodData] = useState<NasaApodData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // No API key here by design — /api/proxy holds NASA_API_KEY server-side.
  const fetchNasaApod = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [data] = await fetchApod(1);
      if (!data) throw new Error('NASA returned no imagery');
      setApodData(data as NasaApodData);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch NASA telemetry');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNasaApod();
  }, []);

  return (
    <div className="space-y-6">
      {/* NASA API Key Authorization Badge Banner */}
      <div className="glass-card rounded-2xl p-4 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                NASA Open API Authorized
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                Official Key Verified
              </span>
            </div>
            <p className="text-xs text-slate-300 font-mono mt-0.5">
              Account: <span className="text-amber-400 font-semibold">princetarikislam@gmail.com</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchNasaApod}
            disabled={isLoading}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            Sync NASA Telemetry
          </button>
        </div>
      </div>

      {/* NASA Astronomy Picture of the Day (APOD) Card */}
      <div className="glass-card rounded-3xl p-6 border border-slate-800/80 shadow-2xl space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 text-sm font-mono font-bold text-amber-400 uppercase tracking-widest">
            <Telescope className="w-5 h-5 text-amber-400" />
            NASA Deep Space Picture of the Day (APOD)
          </div>
          {apodData && (
            <span className="text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800">
              📅 {apodData.date}
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="h-64 flex flex-col items-center justify-center gap-3 text-slate-400">
            <RefreshCw className="w-8 h-8 animate-spin text-amber-400" />
            <span className="text-xs font-mono">Connecting to NASA Deep Space Telemetry...</span>
          </div>
        ) : error ? (
          <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono text-center">
            {error}
          </div>
        ) : apodData ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-slate-800 group shadow-2xl">
              {apodData.media_type === 'image' ? (
                <img
                  src={apodData.url}
                  alt={apodData.title}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <iframe
                  src={apodData.url}
                  title={apodData.title}
                  className="w-full h-72 rounded-2xl"
                />
              )}
              {apodData.hdurl && (
                <a
                  href={apodData.hdurl}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-mono text-amber-400 hover:text-white flex items-center gap-1.5 transition-all shadow-lg"
                >
                  HD Full Resolution <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <div className="lg:col-span-6 space-y-4 text-left">
              <h3 className="text-xl font-bold font-display text-white">{apodData.title}</h3>
              {apodData.copyright && (
                <p className="text-xs font-mono text-emerald-400">
                  © NASA Photography Credit: {apodData.copyright}
                </p>
              )}
              <p className="text-xs leading-relaxed text-slate-300 max-h-48 overflow-y-auto custom-scrollbar pr-2 bg-slate-900/50 p-3.5 rounded-2xl border border-slate-800/60">
                {apodData.explanation}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
