import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, CheckCircle2, AlertCircle, RefreshCw, Send, ShieldCheck, Clock, Settings, Zap, Moon, Play, XCircle, RotateCcw } from 'lucide-react';
import { emailService, EmailJob } from '../lib/email/emailService';
import { MockEmailProvider, GmailProvider, SmtpEmailProvider } from '../lib/email/emailProvider';
import { calculateNextBedtimeWarning, generateBedtimeIdempotencyKey } from '../lib/email/bedtimeReminder';
import type { UserProfile } from '../types';
import { toast } from 'sonner';

interface GmailAutomationDashboardProps {
  userProfile?: UserProfile;
}

export default function GmailAutomationDashboard({ userProfile }: GmailAutomationDashboardProps) {
  const [providerType, setProviderType] = useState<'mock' | 'gmail' | 'smtp'>('smtp');
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [senderEmail, setSenderEmail] = useState<string>(userProfile?.email || 'apnix7@gmail.com');
  
  // Google OAuth Config State
  const [clientId, setClientId] = useState<string>(import.meta.env.VITE_GOOGLE_CLIENT_ID || '407408718192.apps.googleusercontent.com');
  const [clientSecret, setClientSecret] = useState<string>(import.meta.env.VITE_GOOGLE_CLIENT_SECRET || '');
  const [refreshToken, setRefreshToken] = useState<string>(import.meta.env.VITE_GOOGLE_REFRESH_TOKEN || '');
  const [showConfig, setShowConfig] = useState<boolean>(false);

  // Bedtime Settings
  const [bedtime, setBedtime] = useState<string>('23:00');
  const [warningMinutes, setWarningMinutes] = useState<number>(30);
  const [userTimezone, setUserTimezone] = useState<string>('Asia/Kolkata');
  const [bedtimeEnabled, setBedtimeEnabled] = useState<boolean>(true);

  // Queue State
  const [jobs, setJobs] = useState<EmailJob[]>([]);
  const [stats, setStats] = useState(emailService.getStats());
  const [isProcessingQueue, setIsProcessingQueue] = useState<boolean>(false);

  // Refresh Queue State
  const refreshState = () => {
    setJobs(emailService.getJobs());
    setStats(emailService.getStats());
  };

  useEffect(() => {
    refreshState();
  }, []);

  const handleProviderSwitch = (type: 'mock' | 'gmail' | 'smtp') => {
    setProviderType(type);
    if (type === 'mock') {
      emailService.setProvider(new MockEmailProvider());
      setIsConnected(true);
      toast.success('Switched to Development Mock Provider');
    } else if (type === 'smtp') {
      emailService.setProvider(new SmtpEmailProvider({ senderEmail }));
      setIsConnected(true);
      toast.success('Connected to Live SMTP Gmail Relay Server!');
    } else {
      if (!clientId || !clientSecret || !refreshToken) {
        toast.error('Please configure Google OAuth Client ID, Secret, and Refresh Token first.');
        setShowConfig(true);
        return;
      }
      emailService.setProvider(new GmailProvider({ clientId, clientSecret, refreshToken, senderEmail }));
      setIsConnected(true);
      toast.success('Connected to Official Google Gmail API!');
    }
    refreshState();
  };

  const handleSendTestEmail = async () => {
    const job = emailService.queueEmail({
      recipient: senderEmail,
      template: 'SYSTEM_NOTIFICATION',
      payload: {
        name: userProfile?.name || 'Tarik Islam',
        title: 'Gmail API Connection Test Success',
        body: 'Your self-hosted Gmail automation backend has been successfully configured and verified.',
      },
    });

    toast.info(`Email job queued (ID: ${job.id}). Processing queue...`);
    setIsProcessingQueue(true);
    const result = await emailService.processQueue();
    setIsProcessingQueue(false);
    refreshState();

    if (result.sent > 0) {
      toast.success(`✉️ Test Email sent successfully to ${senderEmail}!`);
    } else {
      toast.error('Failed to send test email. Check error logs below.');
    }
  };

  const handleScheduleBedtimeWarning = () => {
    const now = new Date();
    const targetDate = calculateNextBedtimeWarning(
      {
        userId: userProfile?.email || 'tarik',
        bedtime,
        timezone: userTimezone,
        warningMinutes,
        emailEnabled: bedtimeEnabled,
        daysEnabled: [0, 1, 2, 3, 4, 5, 6],
      },
      now
    );

    const idempotencyKey = generateBedtimeIdempotencyKey(userProfile?.email || 'tarik', targetDate);

    const job = emailService.queueEmail({
      recipient: senderEmail,
      template: 'BEDTIME_WARNING',
      payload: {
        name: userProfile?.name || 'Tarik Islam',
        bedtime,
        remaining_minutes: warningMinutes,
        date: targetDate.toLocaleDateString(),
      },
      idempotencyKey,
      scheduledAt: targetDate,
    });

    refreshState();
    toast.success(`🌙 Bedtime Warning scheduled for ${targetDate.toLocaleTimeString()} (Key: ${idempotencyKey})`);
  };

  const handleProcessQueueNow = async () => {
    setIsProcessingQueue(true);
    const res = await emailService.processQueue();
    setIsProcessingQueue(false);
    refreshState();
    toast.success(`Queue processed: ${res.sent} sent, ${res.failed} failed out of ${res.processed} due jobs.`);
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl space-y-8 text-left text-xs font-mono">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            <Mail className="w-4 h-4 text-amber-400" />
            Self-Hosted Gmail Automation & Notification Backend
          </div>
          <h3 className="text-2xl font-bold font-display text-white">Gmail API & Bedtime Scheduler Dashboard</h3>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono flex items-center gap-1.5 border ${
            isConnected 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
              : 'bg-red-500/10 border-red-500/30 text-red-300'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
            {providerType === 'gmail' ? 'CONNECTED (GMAIL API)' : 'ACTIVE (MOCK DEV PROVIDER)'}
          </span>
        </div>
      </div>

      {/* TOP METRICS & STATS BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase block font-bold">Total Jobs</span>
          <span className="text-lg font-bold text-white">{stats.total}</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/30">
          <span className="text-[10px] text-amber-400 uppercase block font-bold">Pending / Scheduled</span>
          <span className="text-lg font-bold text-amber-300">{stats.pending}</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-500/30">
          <span className="text-[10px] text-emerald-400 uppercase block font-bold">Sent Successfully</span>
          <span className="text-lg font-bold text-emerald-300">{stats.sent}</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-red-500/30">
          <span className="text-[10px] text-red-400 uppercase block font-bold">Failed / Retrying</span>
          <span className="text-lg font-bold text-red-300">{stats.failed + stats.retrying}</span>
        </div>
      </div>

      {/* PROVIDER SELECTOR & OAUTH SETTINGS */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-slate-200 font-bold">
            <Settings className="w-4 h-4 text-amber-400" />
            <span>Email Provider Configuration</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleProviderSwitch('mock')}
              className={`px-3 py-1.5 rounded-xl border font-bold transition-all cursor-pointer ${
                providerType === 'mock'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              Mock Provider (Local Dev)
            </button>
            <button
              onClick={() => handleProviderSwitch('gmail')}
              className={`px-3 py-1.5 rounded-xl border font-bold transition-all cursor-pointer ${
                providerType === 'gmail'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              Gmail API (Google OAuth 2.0)
            </button>
          </div>
        </div>

        {/* GMAIL OAUTH CONFIG FORM */}
        {showConfig && (
          <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/30 space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase">Google Cloud Console OAuth 2.0 Credentials</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="GOOGLE_CLIENT_ID"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
              />
              <input
                type="password"
                placeholder="GOOGLE_CLIENT_SECRET"
                value={clientSecret}
                onChange={(e) => setClientSecret(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
              />
              <input
                type="password"
                placeholder="GOOGLE_REFRESH_TOKEN"
                value={refreshToken}
                onChange={(e) => setRefreshToken(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <button
              onClick={() => handleProviderSwitch('gmail')}
              className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all cursor-pointer"
            >
              Save Credentials & Connect Gmail
            </button>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="space-y-0.5">
            <span className="text-slate-400 block text-[11px]">Authorized Sender Account:</span>
            <span className="text-white font-bold">{senderEmail}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSendTestEmail}
              disabled={isProcessingQueue}
              className="px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold flex items-center gap-2 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" /> Send Test Email
            </button>
            <button
              onClick={handleProcessQueueNow}
              disabled={isProcessingQueue}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              {isProcessingQueue ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
              <span>Process Queue Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* BEDTIME REMINDER MODULE */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-white font-bold">
            <Moon className="w-4 h-4 text-purple-400" />
            <span>Bedtime Warning System</span>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={bedtimeEnabled}
              onChange={(e) => setBedtimeEnabled(e.target.checked)}
              className="accent-amber-400"
            />
            <span className="text-slate-300">Enabled</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-slate-400 block">Target Bedtime (24h)</label>
            <input
              type="time"
              value={bedtime}
              onChange={(e) => setBedtime(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 block">Warning Minutes Offset</label>
            <select
              value={warningMinutes}
              onChange={(e) => setWarningMinutes(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
            >
              <option value={15}>15 Minutes Before</option>
              <option value={30}>30 Minutes Before</option>
              <option value={45}>45 Minutes Before</option>
              <option value={60}>60 Minutes Before</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 block">User IANA Timezone</label>
            <select
              value={userTimezone}
              onChange={(e) => setUserTimezone(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST +5:30)</option>
              <option value="Asia/Riyadh">Asia/Riyadh (AST +3:00)</option>
              <option value="Europe/London">Europe/London (GMT/BST)</option>
              <option value="America/New_York">America/New_York (EST/EDT)</option>
              <option value="Asia/Tokyo">Asia/Tokyo (JST +9:00)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleScheduleBedtimeWarning}
          className="w-full py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 font-bold transition-all cursor-pointer"
        >
          🌙 Schedule Next Bedtime Warning Job
        </button>
      </div>

      {/* LIVE EMAIL QUEUE TABLE */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
          <span>Live Email Job Queue ({jobs.length})</span>
          <span className="text-[10px] text-slate-500 font-mono">Exponential Backoff Retries Active</span>
        </h4>

        {jobs.length === 0 ? (
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center text-slate-500">
            No email jobs in queue yet. Click "Send Test Email" or "Schedule Next Bedtime Warning Job" above.
          </div>
        ) : (
          <div className="p-2 rounded-2xl bg-slate-950 border border-slate-800 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] text-slate-400">
                  <th className="p-2">JOB ID</th>
                  <th className="p-2">TEMPLATE</th>
                  <th className="p-2">RECIPIENT</th>
                  <th className="p-2">SCHEDULED AT</th>
                  <th className="p-2">ATTEMPTS</th>
                  <th className="p-2">STATUS</th>
                  <th className="p-2 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="border-b border-slate-800/50 hover:bg-slate-900/50 text-slate-300">
                    <td className="p-2 font-mono text-[10px] text-amber-300">{job.id.slice(0, 12)}...</td>
                    <td className="p-2 font-bold text-slate-200">{job.template}</td>
                    <td className="p-2 text-slate-400">{job.recipient}</td>
                    <td className="p-2 text-slate-400">{new Date(job.scheduledAt).toLocaleTimeString()}</td>
                    <td className="p-2 text-slate-400">{job.attempts} / {job.maxAttempts}</td>
                    <td className="p-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        job.status === 'SENT' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        job.status === 'PENDING' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        job.status === 'RETRYING' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                        'bg-red-500/20 text-red-300 border border-red-500/30'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="p-2 text-right">
                      {job.status === 'FAILED' && (
                        <button
                          onClick={() => { emailService.retryJob(job.id); refreshState(); }}
                          className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 text-[10px] font-bold cursor-pointer"
                        >
                          Retry
                        </button>
                      )}
                      {(job.status === 'PENDING' || job.status === 'RETRYING') && (
                        <button
                          onClick={() => { emailService.cancelJob(job.id); refreshState(); }}
                          className="px-2 py-1 rounded bg-red-500/20 text-red-300 hover:bg-red-500/30 text-[10px] font-bold cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
