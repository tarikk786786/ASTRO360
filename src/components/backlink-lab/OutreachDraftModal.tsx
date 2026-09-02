import React, { useState } from 'react';
import { X, Copy, Check, Send, Sparkles, User, Mail, ShieldAlert, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { OutreachRecord, OutreachStatus } from '../../lib/backlink-lab/types';

interface OutreachDraftModalProps {
  record: OutreachRecord | null;
  onClose: () => void;
  onSaveRecord: (updated: OutreachRecord) => void;
}

export default function OutreachDraftModal({
  record,
  onClose,
  onSaveRecord
}: OutreachDraftModalProps) {
  if (!record) return null;

  const [subject, setSubject] = useState(record.draftSubject);
  const [body, setBody] = useState(record.draftBody);
  const [contactName, setContactName] = useState(record.contactName || '');
  const [contactEmail, setContactEmail] = useState(record.contactEmail || '');
  const [status, setStatus] = useState<OutreachStatus>(record.status);
  const [notes, setNotes] = useState(record.notes || '');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const fullText = `Subject: ${subject}\n\n${body}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    const updated: OutreachRecord = {
      ...record,
      draftSubject: subject,
      draftBody: body,
      contactName,
      contactEmail,
      status,
      notes,
      lastContactedAt: status === 'CONTACTED' ? new Date().toISOString() : record.lastContactedAt
    };
    onSaveRecord(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-[#0B1220] border border-cyan-500/40 shadow-2xl space-y-5 text-left text-xs my-8"
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
            PERSONALIZED OUTREACH DRAFT
          </span>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Outreach to {record.organization}
          </h3>
          <p className="text-slate-400 text-xs font-mono">
            Source: <a href={record.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">{record.sourceUrl}</a>
          </p>
        </div>

        {/* Value-First Guardrail Banner */}
        <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-white/[0.08] space-y-1 text-slate-300">
          <span className="text-[10px] font-bold font-mono text-cyan-300 uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Value-First Editorial Guidelines
          </span>
          <p className="text-[11px] leading-relaxed text-slate-300">
            {record.personalizedReason} Never mass-spam or fabricate claims.
          </p>
        </div>

        {/* Contact Info Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase font-bold">Contact Name / Editor</label>
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="e.g. Sarah Jenkins"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase font-bold">Contact Email / Form</label>
            <input
              type="text"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="editor@domain.com"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase font-bold">Pipeline Stage</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as OutreachStatus)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-cyan-300 font-bold focus:outline-none focus:border-cyan-400 text-xs"
            >
              <option value="PROSPECT">Prospect</option>
              <option value="QUALIFIED">Qualified</option>
              <option value="CONTACT_IDENTIFIED">Contact Identified</option>
              <option value="DRAFT_READY">Draft Ready</option>
              <option value="CONTACTED">Contacted</option>
              <option value="REPLIED">Replied</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="LIVE">Live & Earned</option>
              <option value="REJECTED">Rejected / Lost</option>
            </select>
          </div>
        </div>

        {/* Email Draft Area */}
        <div className="space-y-3 font-mono">
          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase font-bold">Subject Line</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white font-bold focus:outline-none focus:border-cyan-400 text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase font-bold">Pitch Body</label>
            <textarea
              rows={8}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-slate-950 border border-white/10 text-slate-200 focus:outline-none focus:border-cyan-400 text-xs font-mono leading-relaxed"
            />
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs flex items-center gap-1.5 cursor-pointer font-mono"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Subject & Body'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white text-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
