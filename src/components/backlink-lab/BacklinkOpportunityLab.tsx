import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, Globe, Search, Sparkles, Database, 
  Layers, Building2, Bell, Download, Filter, 
  RefreshCw, Key, HelpCircle, CheckCircle2, ArrowRight,
  TrendingUp, Wrench, FileText, Lock, Mail, Code
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BacklinkOpportunity, 
  CompetitorBacklinkGap, 
  UnlinkedBrandMention, 
  LinkableAsset, 
  DigitalPRStory, 
  OutreachRecord, 
  LinkVerificationResult, 
  ToxicAuditResult, 
  BrokenBacklinkItem,
  OutreachStatus
} from '../../lib/backlink-lab/types';
import { getInitialBacklinkLabState, saveOutreachRecords } from '../../lib/backlink-lab/backlinkLabCore';
import { generatePersonalizedOutreach } from '../../lib/backlink-lab/outreachEngine';

import OpportunityCard from './OpportunityCard';
import ProspectDiscoveryView from './ProspectDiscoveryView';
import OutreachPipelineView from './OutreachPipelineView';
import VerificationMonitorView from './VerificationMonitorView';
import LinkAssetsAndPRView from './LinkAssetsAndPRView';
import ToxicAuditView from './ToxicAuditView';
import OutreachDraftModal from './OutreachDraftModal';
import EmbedWidgetModal from './EmbedWidgetModal';
import BacklinkReportModal from './BacklinkReportModal';

interface BacklinkOpportunityLabProps {
  onNavigate?: (tab: string) => void;
}

export default function BacklinkOpportunityLab({ onNavigate }: BacklinkOpportunityLabProps) {
  // State from core orchestrator
  const [labState, setLabState] = useState(() => getInitialBacklinkLabState());

  // Active Tab
  const [activeTab, setActiveTab] = useState<'prospects' | 'outreach' | 'verify' | 'assets_pr' | 'toxic_audit'>('prospects');

  // Modals state
  const [activeDraftRecord, setActiveDraftRecord] = useState<OutreachRecord | null>(null);
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Outreach draft launcher from opportunity card
  const handleDraftOutreach = (item: BacklinkOpportunity) => {
    const existing = labState.outreachRecords.find(r => r.prospectId === item.id);
    if (existing) {
      setActiveDraftRecord(existing);
    } else {
      const generated = generatePersonalizedOutreach(item);
      setActiveDraftRecord(generated);
    }
  };

  // Save/update outreach record
  const handleSaveOutreach = (updated: OutreachRecord) => {
    setLabState(prev => {
      const exists = prev.outreachRecords.some(r => r.id === updated.id);
      const newRecords = exists
        ? prev.outreachRecords.map(r => r.id === updated.id ? updated : r)
        : [updated, ...prev.outreachRecords];
      saveOutreachRecords(newRecords);
      return { ...prev, outreachRecords: newRecords };
    });
  };

  // Toggle Save opportunity
  const handleToggleSave = (item: BacklinkOpportunity) => {
    setLabState(prev => ({
      ...prev,
      opportunities: prev.opportunities.map(opp => 
        opp.id === item.id ? { ...opp, isSaved: !opp.isSaved } : opp
      )
    }));
  };

  // Add a verification result
  const handleAddVerification = (result: LinkVerificationResult) => {
    setLabState(prev => ({
      ...prev,
      verifications: [result, ...prev.verifications]
    }));
  };

  const highPriorityCount = labState.opportunities.filter(o => o.opportunityScore.tier === 'HIGH').length;
  const verifiedLiveCount = labState.verifications.filter(v => v.status === 'LIVE').length;

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-left font-sans pb-20">
      
      {/* ─── 1. TOP HEADER BANNER ────────────────────────────────────────── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0B1220] via-[#0E172A] to-[#070B14] border border-cyan-500/30 shadow-2xl space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 font-mono text-xs font-bold uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Ethical Backlink Opportunity Lab
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              High-Trust Prospecting, Digital PR & Link Verification
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-mono">
              Earn legitimate, contextual, editorial backlinks through genuinely valuable calculation tools, classical Sanskrit datasets, and transparent embed widgets.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap font-mono text-xs">
            <button
              onClick={() => setIsEmbedModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer font-bold"
            >
              <Code className="w-3.5 h-3.5 text-cyan-400" />
              <span>Embed Widget</span>
            </button>

            <button
              onClick={() => setIsReportModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer font-bold"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export Dossier</span>
            </button>
          </div>
        </div>

        {/* Real Data Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs">
          <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-0.5">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Qualified Prospects</span>
            <span className="text-xl font-bold text-white">{labState.opportunities.length}</span>
          </div>
          <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-0.5">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">High Opportunities</span>
            <span className="text-xl font-bold text-cyan-400">{highPriorityCount}</span>
          </div>
          <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-0.5">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Active Outreach</span>
            <span className="text-xl font-bold text-purple-400">{labState.outreachRecords.length}</span>
          </div>
          <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-0.5">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Verified Live Links</span>
            <span className="text-xl font-bold text-emerald-400">{verifiedLiveCount}</span>
          </div>
        </div>
      </div>

      {/* ─── 2. NAVIGATION TABS ──────────────────────────────────────────── */}
      <div className="flex items-center gap-1.5 border-b border-white/10 pb-2 overflow-x-auto font-mono text-xs">
        <button
          onClick={() => setActiveTab('prospects')}
          className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'prospects'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>Prospect Discovery & Gaps ({labState.opportunities.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('outreach')}
          className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'outreach'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Outreach CRM ({labState.outreachRecords.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('verify')}
          className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'verify'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verification & Monitor ({labState.verifications.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('assets_pr')}
          className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'assets_pr'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Linkable Assets & PR ({labState.linkableAssets.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('toxic_audit')}
          className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'toxic_audit'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Toxic & Anchor Audit</span>
        </button>
      </div>

      {/* ─── 3. TAB VIEWS ────────────────────────────────────────────────── */}
      {activeTab === 'prospects' && (
        <ProspectDiscoveryView
          opportunities={labState.opportunities}
          competitorGaps={labState.competitorGaps}
          unlinkedMentions={labState.unlinkedMentions}
          onDraftOutreach={handleDraftOutreach}
          onVerify={(item) => setActiveTab('verify')}
          onToggleSave={handleToggleSave}
          onNavigateToTarget={(url) => onNavigate?.(url.replace(/^\//, ''))}
        />
      )}

      {activeTab === 'outreach' && (
        <OutreachPipelineView
          records={labState.outreachRecords}
          onOpenDraft={(rec) => setActiveDraftRecord(rec)}
          onUpdateStatus={(rec, newStatus) => {
            handleSaveOutreach({ ...rec, status: newStatus });
          }}
        />
      )}

      {activeTab === 'verify' && (
        <VerificationMonitorView
          verifications={labState.verifications}
          onAddVerification={handleAddVerification}
        />
      )}

      {activeTab === 'assets_pr' && (
        <LinkAssetsAndPRView
          assets={labState.linkableAssets}
          prStories={labState.prStories}
          onNavigateToTarget={(url) => onNavigate?.(url.replace(/^\//, ''))}
        />
      )}

      {activeTab === 'toxic_audit' && (
        <ToxicAuditView
          toxicAudits={labState.toxicAudits}
        />
      )}

      {/* ─── 4. MODALS ───────────────────────────────────────────────────── */}
      <OutreachDraftModal
        record={activeDraftRecord}
        onClose={() => setActiveDraftRecord(null)}
        onSaveRecord={handleSaveOutreach}
      />

      <EmbedWidgetModal
        isOpen={isEmbedModalOpen}
        onClose={() => setIsEmbedModalOpen(false)}
      />

      <BacklinkReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        opportunities={labState.opportunities}
        gaps={labState.competitorGaps}
        outreach={labState.outreachRecords}
        verifications={labState.verifications}
      />

    </div>
  );
}
