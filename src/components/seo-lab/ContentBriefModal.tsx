import React, { useState } from 'react';
import { 
  X, Copy, Check, FileText, Download, Sparkles, 
  ExternalLink, Layers, BookOpen, Wrench, ShieldCheck 
} from 'lucide-react';
import { motion } from 'motion/react';
import { ContentBrief } from '../../lib/seo-lab/types';

interface ContentBriefModalProps {
  brief: ContentBrief | null;
  onClose: () => void;
}

export default function ContentBriefModal({
  brief,
  onClose
}: ContentBriefModalProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!brief) return null;

  const handleCopy = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleDownloadMarkdown = () => {
    let md = `# Content Brief: ${brief.h1Title}\n\n`;
    md += `**Target Keyword**: \`${brief.keyword}\`  \n`;
    md += `**Search Intent**: \`${brief.primaryIntent}\`  \n`;
    md += `**Target Cluster**: ${brief.targetCluster}  \n`;
    md += `**Recommended URL**: \`${brief.targetUrl}\` (${brief.targetType})  \n\n`;
    md += `## Meta Specification\n\n`;
    md += `- **H1**: ${brief.h1Title}\n`;
    md += `- **Meta Description**: ${brief.metaDescription}\n\n`;
    md += `## Seeker Problem\n\n${brief.userSearchProblem}\n\n`;
    md += `## Content Outline\n\n`;
    for (const section of brief.outline) {
      md += `### ${section.heading}\n`;
      if (section.scriptureCitation) md += `*Classical Source: ${section.scriptureCitation}*\n`;
      for (const bp of section.bulletPoints) {
        md += `- ${bp}\n`;
      }
      md += `\n`;
    }
    md += `## AEO / GEO FAQ Direct Answers (40-Word Standards)\n\n`;
    for (const faq of brief.faqList) {
      md += `**Q: ${faq.question}**  \n`;
      md += `> ${faq.directAnswer}\n\n`;
    }
    md += `## Internal Linking Strategy\n\n`;
    for (const link of brief.internalLinkTargets) {
      md += `- Anchor: \`${link.anchorText}\` → Target: \`${link.targetUrl}\` (${link.reason})\n`;
    }
    md += `\n## Primary Tool CTA\n\n`;
    md += `- **${brief.primaryToolCTA.toolName}**: [${brief.primaryToolCTA.ctaCopy}](${brief.primaryToolCTA.toolUrl})\n`;

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `content-brief-${brief.keyword.replace(/\s+/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl bg-[#0B1220] border border-cyan-500/40 shadow-2xl text-left text-xs my-8 overflow-hidden"
      >
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between gap-3 shrink-0 bg-[#0E172A]">
          <div className="space-y-1 truncate">
            <span className="text-[10px] font-bold font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-white/[0.08]">
              EVIDENCE-GROUNDED CONTENT BRIEF
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight truncate">
              {brief.h1Title}
            </h3>
            <p className="text-[11px] font-mono text-slate-400 truncate">
              Target: <span className="text-cyan-300">{brief.targetUrl}</span> • {brief.targetCluster}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleDownloadMarkdown}
              className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-white/[0.08] text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
              title="Download Markdown Brief"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export .md</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-xl bg-white/[0.04] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 custom-scrollbar">
          
          {/* Metadata Card */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">SEO H1 & Meta Tags</span>
              <button
                onClick={() => handleCopy(`H1: ${brief.h1Title}\nMeta: ${brief.metaDescription}`, 'meta')}
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-[11px] cursor-pointer"
              >
                {copiedSection === 'meta' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>Copy Meta</span>
              </button>
            </div>
            <div className="space-y-1.5 font-sans">
              <div>
                <span className="text-[10px] font-mono text-slate-500 block uppercase">H1 Tag</span>
                <p className="text-white font-bold text-sm">{brief.h1Title}</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-500 block uppercase">Meta Description (155 Chars)</span>
                <p className="text-slate-300 text-xs leading-relaxed">{brief.metaDescription}</p>
              </div>
            </div>
          </div>

          {/* User Search Problem */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1.5 font-sans">
            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
              🎯 Seeker Problem & Search Intent
            </span>
            <p className="text-slate-200 text-xs leading-relaxed">
              {brief.userSearchProblem}
            </p>
          </div>

          {/* Editorial Structure Outline */}
          <div className="space-y-3 font-sans">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> Content Outline & Classical Citations
              </span>
              <button
                onClick={() => handleCopy(JSON.stringify(brief.outline, null, 2), 'outline')}
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-[11px] font-mono cursor-pointer"
              >
                {copiedSection === 'outline' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>Copy Outline</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {brief.outline.map((sec, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-black/30 border border-white/[0.06] space-y-1.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h4 className="text-white font-bold text-xs">{sec.heading}</h4>
                    {sec.scriptureCitation && (
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-white/[0.08]">
                        📜 {sec.scriptureCitation}
                      </span>
                    )}
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-300">
                    {sec.bulletPoints.map((bp, bidx) => (
                      <li key={bidx} className="leading-snug">{bp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* AEO / GEO 40-Word FAQ Direct Answers */}
          <div className="space-y-3 font-sans">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> AEO / GEO Direct Answers (Google AI & Perplexity Targets)
            </span>
            <div className="space-y-2">
              {brief.faqList.map((faq, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-emerald-500/[0.03] border border-emerald-500/20 space-y-1">
                  <span className="text-white font-bold text-xs block">Q: {faq.question}</span>
                  <p className="text-slate-300 text-xs leading-relaxed italic">
                    "{faq.directAnswer}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Internal Linking & Tool CTA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
              <span className="text-slate-400 font-bold block uppercase text-[10px]">Internal Link Graph</span>
              <ul className="space-y-1 text-[11px]">
                {brief.internalLinkTargets.map((link, idx) => (
                  <li key={idx} className="text-slate-300 truncate">
                    • <span className="text-cyan-400 font-bold">"{link.anchorText}"</span> → {link.targetUrl}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 space-y-2">
              <span className="text-purple-300 font-bold block uppercase text-[10px]">Interactive Tool CTA</span>
              <p className="text-white font-bold text-xs">{brief.primaryToolCTA.toolName}</p>
              <p className="text-slate-300 text-[11px] font-sans">{brief.primaryToolCTA.ctaCopy}</p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#0E172A] flex items-center justify-between shrink-0 font-mono text-xs">
          <span className="text-slate-400 flex items-center gap-1 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Free-First & Scripture-Grounded
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-all cursor-pointer"
          >
            Close Brief
          </button>
        </div>
      </motion.div>
    </div>
  );
}
