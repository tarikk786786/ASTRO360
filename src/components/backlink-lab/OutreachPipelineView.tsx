import React from 'react';
import { 
  Mail, CheckCircle2, Clock, MessageSquare, Send, 
  ExternalLink, Edit, ArrowRight, User 
} from 'lucide-react';
import { OutreachRecord, OutreachStatus } from '../../lib/backlink-lab/types';

interface OutreachPipelineViewProps {
  records: OutreachRecord[];
  onOpenDraft: (record: OutreachRecord) => void;
  onUpdateStatus: (record: OutreachRecord, newStatus: OutreachStatus) => void;
}

const PIPELINE_STAGES: Array<{ id: OutreachStatus; label: string; color: string }> = [
  { id: 'DRAFT_READY', label: 'Draft Ready', color: 'border-white/[0.08] text-cyan-400 bg-cyan-500/10' },
  { id: 'CONTACTED', label: 'Contacted / Sent', color: 'border-blue-500/30 text-blue-400 bg-blue-500/10' },
  { id: 'REPLIED', label: 'In Discussion', color: 'border-purple-500/30 text-purple-400 bg-purple-500/10' },
  { id: 'ACCEPTED', label: 'Accepted', color: 'border-white/[0.08] text-amber-400 bg-amber-500/10' },
  { id: 'LIVE', label: 'Live & Earned', color: 'border-white/[0.08] text-emerald-400 bg-emerald-500/10' }
];

export default function OutreachPipelineView({
  records,
  onOpenDraft,
  onUpdateStatus
}: OutreachPipelineViewProps) {
  return (
    <div className="space-y-6 font-sans text-left">
      {/* Funnel Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 font-mono text-xs">
        {PIPELINE_STAGES.map(stage => {
          const count = records.filter(r => r.status === stage.id).length;
          return (
            <div
              key={stage.id}
              className={`p-3 rounded-2xl border ${stage.color} space-y-1`}
            >
              <span className="text-[10px] uppercase font-bold block">{stage.label}</span>
              <span className="text-xl font-bold">{count}</span>
            </div>
          );
        })}
      </div>

      {/* Outreach Records List */}
      <div className="space-y-3 font-mono text-xs">
        {records.length === 0 ? (
          <div className="p-12 rounded-3xl bg-white/[0.02] border border-white/[0.06] text-center space-y-2 text-slate-400">
            <p>No active outreach records found. Select an opportunity to generate a personalized draft.</p>
          </div>
        ) : (
          records.map(record => (
            <div
              key={record.id}
              className="p-4 sm:p-5 rounded-2xl bg-[#0E172A] border border-white/10 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-white text-sm">{record.organization}</span>
                    <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                      Editor: {record.contactName || 'Editorial Team'}
                    </span>
                  </div>
                  <a
                    href={record.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1 mt-0.5 truncate max-w-sm sm:max-w-lg"
                  >
                    <span>{record.sourceUrl}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={record.status}
                    onChange={(e) => onUpdateStatus(record, e.target.value as OutreachStatus)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-cyan-300 font-bold focus:outline-none focus:border-cyan-400 text-xs"
                  >
                    <option value="DRAFT_READY">Draft Ready</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="REPLIED">Replied</option>
                    <option value="ACCEPTED">Accepted</option>
                    <option value="LIVE">Live & Earned</option>
                    <option value="REJECTED">Rejected</option>
                  </select>

                  <button
                    onClick={() => onOpenDraft(record)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 cursor-pointer"
                    title="View & Edit Pitch Draft"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Subject & Snippet */}
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold block">Subject: {record.draftSubject}</span>
                <p className="text-slate-300 text-[11px] line-clamp-2 leading-relaxed">
                  {record.draftBody}
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>Target Asset: {record.targetUrl}</span>
                <span>{record.lastContactedAt ? `Last Contact: ${new Date(record.lastContactedAt).toLocaleDateString()}` : 'Not contacted yet'}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
