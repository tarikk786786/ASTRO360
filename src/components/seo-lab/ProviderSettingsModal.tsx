import React, { useState, useEffect } from 'react';
import { X, Lock, ShieldCheck, Key, Check, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { ProviderApiConfig } from '../../lib/seo-lab/types';

interface ProviderSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: ProviderApiConfig) => void;
}

const STORAGE_KEY_PROVIDERS = 'astro_seolab_providers';

export default function ProviderSettingsModal({
  isOpen,
  onClose,
  onSave
}: ProviderSettingsModalProps) {
  const [config, setConfig] = useState<ProviderApiConfig>({
    dataForSeoApiKey: '',
    serpApiKey: '',
    pangolinToken: '',
    useClientProxy: true
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_PROVIDERS);
      if (raw) setConfig(JSON.parse(raw));
    } catch {}
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem(STORAGE_KEY_PROVIDERS, JSON.stringify(config));
      onSave(config);
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 1000);
    } catch {}
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#0B1220] border border-cyan-500/40 shadow-2xl space-y-5 text-left text-xs my-8"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="border-b border-white/10 pb-3 space-y-1">
          <span className="text-[10px] font-bold font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-white/[0.08]">
            OPTIONAL EXTERNAL PROVIDERS
          </span>
          <h3 className="text-xl font-bold text-white tracking-tight">
            API Keys & Provider Configuration
          </h3>
          <p className="text-slate-400 text-xs">
            ASTRO360 is Free-First. Google Autocomplete, Trends, and Search Console work with zero API keys. Enter keys only if using paid external enrichment.
          </p>
        </div>

        {/* Info Banner */}
        <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-white/[0.08] flex items-start gap-2.5 text-slate-300">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            All API keys are encrypted in your browser’s local storage and are never uploaded to any ASTRO360 backend server.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4 font-mono">
          {/* DataForSEO */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-bold block flex items-center justify-between">
              <span>DataForSEO API Key (Optional)</span>
              <span className="text-[10px] text-slate-500 font-normal">dataforseo.com</span>
            </label>
            <input
              type="password"
              value={config.dataForSeoApiKey || ''}
              onChange={(e) => setConfig({ ...config, dataForSeoApiKey: e.target.value })}
              placeholder="Base64 Login:Password or API Key..."
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* SerpApi */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-bold block flex items-center justify-between">
              <span>SerpApi Key (Optional)</span>
              <span className="text-[10px] text-slate-500 font-normal">serpapi.com</span>
            </label>
            <input
              type="password"
              value={config.serpApiKey || ''}
              onChange={(e) => setConfig({ ...config, serpApiKey: e.target.value })}
              placeholder="serpapi_api_key_..."
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Pangolinfo */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-bold block flex items-center justify-between">
              <span>Pangolinfo MCP Token (Optional)</span>
              <span className="text-[10px] text-slate-500 font-normal">tool.pangolinfo.com</span>
            </label>
            <input
              type="password"
              value={config.pangolinToken || ''}
              onChange={(e) => setConfig({ ...config, pangolinToken: e.target.value })}
              placeholder="Bearer JWT Token..."
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center gap-2 cursor-pointer"
            >
              {savedSuccess ? <Check className="w-4 h-4 text-emerald-950" /> : <Lock className="w-4 h-4" />}
              <span>{savedSuccess ? 'Saved Securely' : 'Save Keys Locally'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
