import React, { useState } from 'react';
import { 
  ShieldCheck, AlertTriangle, CheckCircle2, RefreshCw, 
  ExternalLink, Clock, Bell, XCircle, Search 
} from 'lucide-react';
import { LinkVerificationResult } from '../../lib/backlink-lab/types';
import { verifyBacklinkOnPage } from '../../lib/backlink-lab/verificationCrawler';

interface VerificationMonitorViewProps {
  verifications: LinkVerificationResult[];
  onAddVerification: (result: LinkVerificationResult) => void;
}

export default function VerificationMonitorView({
  verifications,
  onAddVerification
}: VerificationMonitorViewProps) {
  const [sourceUrlInput, setSourceUrlInput] = useState('');
  const [targetUrlInput, setTargetUrlInput] = useState('/free-tools/birth-chart');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyNew = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceUrlInput.trim()) return;

    setIsVerifying(true);
    try {
      const result = await verifyBacklinkOnPage(sourceUrlInput, targetUrlInput);
      onAddVerification(result);
      setSourceUrlInput('');
    } catch {}
    finally {
      setIsVerifying(false);
    }
  };

  const liveCount = verifications.filter(v => v.status === 'LIVE').length;
  const nofollowCount = verifications.filter(v => v.status === 'NOFOLLOW_ADDED').length;
  const removedCount = verifications.filter(v => v.status === 'REMOVED' || v.status === 'PAGE_404').length;

  return (
    <div className="space-y-6 font-sans text-left">
      {/* Overview stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
          <span className="text-[10px] text-emerald-300 uppercase font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> Verified Live (Dofollow)
          </span>
          <span className="text-2xl font-bold text-white">{liveCount}</span>
        </div>

        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
          <span className="text-[10px] text-amber-300 uppercase font-bold flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" /> rel="nofollow" / UGC
          </span>
          <span className="text-2xl font-bold text-white">{nofollowCount}</span>
        </div>

        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-1">
          <span className="text-[10px] text-rose-300 uppercase font-bold flex items-center gap-1.5">
            <XCircle className="w-3.5 h-3.5" /> Removed / 404
          </span>
          <span className="text-2xl font-bold text-white">{removedCount}</span>
        </div>
      </div>

      {/* Manual verification form */}
      <form onSubmit={handleVerifyNew} className="p-4 sm:p-5 rounded-2xl bg-[#0E172A] border border-white/10 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between">
          <span className="font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" /> Verify Any External Backlink
          </span>
          <span className="text-[10px] text-slate-400">Protected by SSRF Firewalls</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="url"
            value={sourceUrlInput}
            onChange={(e) => setSourceUrlInput(e.target.value)}
            placeholder="https://external-website.com/article..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-xs"
            required
          />
          <div className="flex gap-2">
            <input
              type="text"
              value={targetUrlInput}
              onChange={(e) => setTargetUrlInput(e.target.value)}
              placeholder="/free-tools/birth-chart"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-xs"
              required
            />
            <button
              type="submit"
              disabled={isVerifying}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shrink-0 cursor-pointer shadow-md flex items-center gap-1.5"
            >
              {isVerifying ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
              <span>Verify</span>
            </button>
          </div>
        </div>
      </form>

      {/* Verified links list */}
      <div className="space-y-3 font-mono text-xs">
        <h4 className="font-bold text-white text-sm">Monitored Backlinks</h4>
        {verifications.map(item => {
          const statusBadge =
            item.status === 'LIVE'
              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
              : item.status === 'NOFOLLOW_ADDED'
              ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
              : 'bg-rose-500/10 text-rose-300 border-rose-500/30';

          return (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-[#0E172A] border border-white/10 space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-white hover:text-cyan-400 flex items-center gap-1.5 truncate max-w-sm sm:max-w-md"
                >
                  <span>{item.sourceUrl}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                </a>

                <span className={`px-2.5 py-0.5 rounded border text-[10px] font-bold ${statusBadge}`}>
                  {item.status} ({item.isNofollow ? 'Nofollow' : 'Dofollow'})
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400 text-[11px]">
                <div>Target Found: <span className="text-cyan-300">{item.targetUrlFound || item.targetUrl}</span></div>
                <div>Anchor Text: <span className="text-white font-bold">"{item.anchorText || 'N/A'}"</span></div>
              </div>

              {item.changeNote && (
                <p className="text-slate-400 text-[10px] bg-black/40 p-2 rounded-lg border border-white/5">
                  Audit Note: {item.changeNote} (Last Checked: {new Date(item.lastSeen).toLocaleDateString()})
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
