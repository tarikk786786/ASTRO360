import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Bell, Clock, Mail, ShieldCheck, Zap, Sparkles, Check, Send, AlertCircle 
} from 'lucide-react';
import type { 
  UserProfile, NotificationSettings, NotificationFrequency, NotificationTopics 
} from '../types';
import { emailService } from '../lib/email/emailService';
import { SmtpEmailProvider } from '../lib/email/emailProvider';

interface NotificationManagerProps {
  userProfile: UserProfile;
  onUpdateProfile: (updatedProfile: UserProfile) => void;
}

const DEFAULT_SETTINGS: NotificationSettings = {
  enabled: true,
  frequency: 'daily',
  channel: 'email',
  customTime: '08:00',
  email: '',
  topics: {
    difficultWarningAlerts: true,
    dailyHoroscope: true,
    transitAlerts: true,
    lunarPhases: true,
    powerHours: false,
    numerologyDay: true,
    decisionHelper: true,
  },
};

export default function NotificationManager({ userProfile, onUpdateProfile }: NotificationManagerProps) {
  const [settings, setSettings] = useState<NotificationSettings>(() => ({
    ...DEFAULT_SETTINGS,
    ...(userProfile.notifications || {}),
    email: userProfile.notifications?.email || '',
    channel: 'email',
  }));

  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [testStatus, setTestStatus] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSendingTest, setIsSendingTest] = useState(false);

  const toggleEnabled = () => {
    setSettings(prev => ({ ...prev, enabled: !prev.enabled }));
  };

  const setFrequency = (freq: NotificationFrequency) => {
    setSettings(prev => ({ ...prev, frequency: freq }));
  };

  const toggleTopic = (topicKey: keyof NotificationTopics) => {
    setSettings(prev => ({
      ...prev,
      topics: {
        ...prev.topics,
        [topicKey]: !prev.topics[topicKey],
      },
    }));
  };

  const handleSave = () => {
    if (settings.enabled && !settings.email) {
      setSaveStatus('⚠️ Please enter an email address to receive notifications.');
      return;
    }

    const updatedUser = {
      ...userProfile,
      notifications: settings,
    };
    onUpdateProfile(updatedUser);
    setSaveStatus('✅ Email notification preferences saved successfully!');
    setTimeout(() => setSaveStatus(null), 3500);
  };

  const handleTestDispatch = async () => {
    const recipient = settings.email || userProfile.email || 'apnix7@gmail.com';
    if (!recipient) {
      setTestStatus('⚠️ Please enter your email address first.');
      return;
    }

    setIsSendingTest(true);
    setTestStatus('📨 Sending email notification...');
    setPreviewUrl(null);

    try {
      emailService.setProvider(new SmtpEmailProvider({ senderEmail: recipient }));

      const job = emailService.queueEmail({
        recipient,
        template: 'ASTROLOGY_REPORT',
        payload: {
          name: userProfile.name || 'Seeker',
          reportType: 'Personalized Daily Horoscope & Cosmic Briefing',
          insights: 'Sun transiting 5th House of Innovation. Excellent energy for strategic focus & executive decisions.',
        },
      });

      const res = await emailService.processQueue();
      if (res.sent > 0 || job.status === 'SENT') {
        setTestStatus(`✅ Notification email successfully sent to ${recipient}!`);
        if (job.error && job.error.includes('Preview Link:')) {
          const match = job.error.match(/https:\/\/[^\s]+/);
          if (match) {
            setPreviewUrl(match[0]);
          }
        }
      } else if (job.status === 'FAILED') {
        setTestStatus(`❌ Delivery Error: ${job.error || 'Email dispatch failed.'}`);
      } else {
        setTestStatus(`ℹ️ Email job queued for delivery to ${recipient}.`);
      }
    } catch (err: any) {
      setTestStatus(`❌ Dispatch Exception: ${err?.message || 'Failed to send email.'}`);
    } finally {
      setIsSendingTest(false);
    }
  };


  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 mb-1">
            <Mail className="w-5 h-5" />
            <span className="text-xs font-semibold tracking-wider uppercase">Direct Email Updates</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-white">
            Cosmic <span className="gradient-text">Email Notifications</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Receive personalized horoscopes, decision guidance, and transit alerts directly in your inbox.
          </p>
        </div>

        <button
          onClick={toggleEnabled}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all ${
            settings.enabled
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-500/10'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${settings.enabled ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
          {settings.enabled ? 'Email Updates Active' : 'Email Updates Paused'}
        </button>
      </div>

      {/* Zero-Config Recipient Email Input */}
      <div className="glass-card p-6 rounded-2xl space-y-3">
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-semibold text-white">Recipient Email Address</h2>
        </div>
        <p className="text-xs text-slate-400">Paste or type any email address where you want to receive cosmic updates:</p>

        <div className="relative">
          <input
            type="email"
            placeholder="apnix7@gmail.com"
            value={settings.email || ''}
            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-400 placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Frequency Selector */}
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-semibold text-white">Email Frequency & Timing</h2>
        </div>
        <p className="text-xs text-slate-400">Choose how often you want emails delivered:</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { id: 'hourly', label: 'Hourly Digest', desc: 'Real-time transit updates' },
            { id: 'daily', label: 'Everyday (Daily)', desc: 'Daily briefing email' },
            { id: 'weekly', label: 'Weekly Summary', desc: '7-day cosmic forecast' },
          ].map((freq) => (
            <button
              key={freq.id}
              onClick={() => setFrequency(freq.id as NotificationFrequency)}
              className={`p-4 rounded-xl border text-left transition-all ${
                settings.frequency === freq.id
                  ? 'bg-purple-500/20 border-purple-500/40 text-white ring-1 ring-purple-500/30'
                  : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              <p className="font-semibold text-sm text-white">{freq.label}</p>
              <p className="text-[11px] text-slate-400 mt-1">{freq.desc}</p>
            </button>
          ))}
        </div>

        {settings.frequency === 'daily' && (
          <div className="flex items-center gap-4 pt-2">
            <label className="text-xs font-medium text-slate-300">Preferred Delivery Time:</label>
            <input
              type="time"
              value={settings.customTime}
              onChange={(e) => setSettings({ ...settings, customTime: e.target.value })}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-purple-400"
            />
          </div>
        )}
      </div>

      {/* Decision Topics */}
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <div className="flex items-center gap-3">
          <Sparkles className="text-amber-400 w-5 h-5" />
          <h2 className="text-lg font-semibold text-white">Customised Update Topics</h2>
        </div>
        <p className="text-xs text-slate-400">Select what content to include in your emails:</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { key: 'difficultWarningAlerts', title: '🚨 Emergency Difficult Warning Alerts (Mandatory Mail)', desc: 'Immediate email warning if planetary friction or difficult transits occur by chance' },
            { key: 'dailyHoroscope', title: 'Daily Horoscope Briefing', desc: 'Sun/Moon sign daily forecast' },
            { key: 'decisionHelper', title: 'Cosmic Decision Helper', desc: 'Favorable timing for decisions' },
            { key: 'powerHours', title: 'Power Hour Alerts', desc: 'Hourly planetary hour windows' },
            { key: 'transitAlerts', title: 'Major Planetary Transits', desc: 'Ingresses & retrogrades' },
            { key: 'lunarPhases', title: 'Lunar Phase Changes', desc: 'New/Full moon intentions' },
            { key: 'numerologyDay', title: 'Daily Universal Number', desc: 'Pythagorean daily vibration' },
          ].map((topic) => {
            const isChecked = settings.topics[topic.key as keyof NotificationTopics] ?? true;
            return (
              <button
                key={topic.key}
                onClick={() => toggleTopic(topic.key as keyof NotificationTopics)}
                className={`p-3.5 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                  isChecked
                    ? topic.key === 'difficultWarningAlerts'
                      ? 'bg-rose-950/40 border-rose-500/50 text-white ring-1 ring-rose-500/30'
                      : 'bg-amber-500/10 border-amber-500/30 text-white'
                    : 'bg-white/5 border-white/5 text-slate-500 hover:bg-white/10'
                }`}
              >
                <div>
                  <p className={`font-medium text-sm ${topic.key === 'difficultWarningAlerts' ? 'text-rose-300 font-bold' : 'text-white'}`}>
                    {topic.title}
                  </p>
                  <p className="text-xs text-slate-400">{topic.desc}</p>
                </div>
                <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                  isChecked 
                    ? topic.key === 'difficultWarningAlerts'
                      ? 'bg-rose-500 border-rose-400 text-white'
                      : 'bg-amber-500 border-amber-400 text-black' 
                    : 'border-slate-600'
                }`}>
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Save & Test Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
        <button
          onClick={handleTestDispatch}
          disabled={isSendingTest}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm flex items-center justify-center gap-2 transition-all border border-white/10 disabled:opacity-50"
        >
          <Send className="w-4 h-4 text-purple-400" />
          {isSendingTest ? 'Sending Test Email...' : 'Send Test Email'}
        </button>

        <button
          onClick={handleSave}
          className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-cosmic-500 to-purple-600 hover:from-cosmic-600 hover:to-purple-700 text-white font-semibold text-sm shadow-lg shadow-cosmic-500/25 transition-all"
        >
          Save Email Preferences
        </button>
      </div>

      {saveStatus && (
        <p className="text-center text-xs font-medium text-amber-300 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
          {saveStatus}
        </p>
      )}

      {testStatus && (
        <div className="text-center space-y-3">
          <p className="text-xs font-medium text-purple-300 bg-purple-500/10 p-3 rounded-xl border border-purple-500/20">
            {testStatus}
          </p>
          {previewUrl && (
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all border border-emerald-400/30"
            >
              <Mail className="w-4 h-4" />
              ✉️ Click Here to Open & Read Sent Email Message ↗
            </a>
          )}
        </div>
      )}
    </div>
  );
}
