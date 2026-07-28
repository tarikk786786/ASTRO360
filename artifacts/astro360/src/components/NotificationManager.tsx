import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, Clock, Mail, Sparkles, Check, Send, AlertCircle, CheckCircle2, Loader2, X
} from 'lucide-react';
import type {
  UserProfile, NotificationSettings, NotificationFrequency, NotificationTopics
} from '../types';

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

type StatusState = { type: 'success' | 'error' | 'info'; message: string } | null;

export default function NotificationManager({ userProfile, onUpdateProfile }: NotificationManagerProps) {
  const [settings, setSettings] = useState<NotificationSettings>(() => ({
    ...DEFAULT_SETTINGS,
    ...(userProfile.notifications || {}),
    email: userProfile.notifications?.email || '',
    channel: 'email',
  }));

  const [saveStatus, setSaveStatus] = useState<StatusState>(null);
  const [testStatus, setTestStatus] = useState<StatusState>(null);
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSettings({ ...settings, email: val });
    if (val && !validateEmail(val)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const toggleEnabled = () => setSettings(prev => ({ ...prev, enabled: !prev.enabled }));

  const setFrequency = (freq: NotificationFrequency) =>
    setSettings(prev => ({ ...prev, frequency: freq }));

  const toggleTopic = (topicKey: keyof NotificationTopics) =>
    setSettings(prev => ({
      ...prev,
      topics: { ...prev.topics, [topicKey]: !prev.topics[topicKey] },
    }));

  const handleSave = () => {
    if (settings.enabled && !settings.email) {
      setSaveStatus({ type: 'error', message: 'Please enter an email address to receive notifications.' });
      return;
    }
    if (settings.enabled && settings.email && !validateEmail(settings.email)) {
      setSaveStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }
    onUpdateProfile({ ...userProfile, notifications: settings });
    setSaveStatus({ type: 'success', message: 'Email notification preferences saved successfully!' });
    setTimeout(() => setSaveStatus(null), 4000);
  };

  const handleTestDispatch = async () => {
    if (!settings.email) {
      setTestStatus({ type: 'error', message: 'Please enter your email address first.' });
      return;
    }
    if (!validateEmail(settings.email)) {
      setTestStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setIsSendingTest(true);
    setTestStatus(null);

    try {
      const response = await fetch('/api/notifications/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings, userProfile }),
      });

      const data = await response.json() as { success?: boolean; message?: string; error?: string };

      if (response.ok && data.success) {
        setTestStatus({
          type: 'success',
          message: `✨ Cosmic email dispatched to ${settings.email}! Check your inbox.`,
        });
      } else {
        setTestStatus({
          type: 'error',
          message: data.error || 'Failed to send email. Please try again.',
        });
      }
    } catch {
      setTestStatus({
        type: 'error',
        message: 'Network error — could not reach the server. Please try again.',
      });
    } finally {
      setIsSendingTest(false);
    }
  };

  const FREQUENCIES = [
    { id: 'hourly', label: 'Hourly Digest', desc: 'Real-time transit updates', icon: '⚡' },
    { id: 'daily',  label: 'Daily Briefing', desc: 'Morning cosmic overview',  icon: '🌅' },
    { id: 'weekly', label: 'Weekly Summary', desc: '7-day cosmic forecast',     icon: '🗓️' },
  ];

  const TOPICS = [
    { key: 'difficultWarningAlerts', title: '🚨 Emergency Warning Alerts', desc: 'Immediate alert for difficult planetary transits', urgent: true },
    { key: 'dailyHoroscope',         title: '🌟 Daily Horoscope Briefing', desc: 'Sun & Moon sign daily forecast',                urgent: false },
    { key: 'decisionHelper',         title: '🎯 Cosmic Decision Helper',   desc: 'Favorable timing for important decisions',      urgent: false },
    { key: 'powerHours',             title: '⚡ Power Hour Alerts',         desc: 'Hourly planetary windows & peak energy',        urgent: false },
    { key: 'transitAlerts',          title: '🪐 Major Planetary Transits',  desc: 'Ingresses, retrogrades & conjunctions',         urgent: false },
    { key: 'lunarPhases',            title: '🌙 Lunar Phase Changes',       desc: 'New & Full moon intentions',                    urgent: false },
    { key: 'numerologyDay',          title: '🔢 Daily Universal Number',    desc: 'Pythagorean daily vibration & energy',          urgent: false },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-7">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 mb-1">
            <Mail className="w-4 h-4" />
            <span className="text-xs font-semibold tracking-widest uppercase">Direct Email Updates</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-white">
            Cosmic <span className="gradient-text">Email Notifications</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-md">
            Receive personalized horoscopes, planetary warnings, and astrological guidance directly in your inbox — powered by Gemini AI.
          </p>
        </div>

        <button
          onClick={toggleEnabled}
          className={`shrink-0 px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all ${
            settings.enabled
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-500/10'
              : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${settings.enabled ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
          {settings.enabled ? 'Notifications Active' : 'Notifications Paused'}
        </button>
      </div>

      {/* Email Input */}
      <div className="glass-card p-5 rounded-2xl space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <Mail className="w-4 h-4 text-indigo-400" />
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Delivery Email Address</h2>
        </div>
        <div className="relative">
          <input
            type="email"
            placeholder="your.email@example.com"
            value={settings.email || ''}
            onChange={handleEmailChange}
            className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none placeholder:text-slate-500 transition-colors ${
              emailError
                ? 'border-rose-500/60 focus:border-rose-400'
                : settings.email && validateEmail(settings.email)
                  ? 'border-emerald-500/50 focus:border-emerald-400'
                  : 'border-white/15 focus:border-indigo-400'
            }`}
          />
          {settings.email && !emailError && (
            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
          )}
          {emailError && (
            <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-400" />
          )}
        </div>
        {emailError && <p className="text-xs text-rose-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{emailError}</p>}
      </div>

      {/* Frequency */}
      <div className="glass-card p-5 rounded-2xl space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Clock className="w-4 h-4 text-purple-400" />
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Email Frequency & Timing</h2>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {FREQUENCIES.map((freq) => (
            <button
              key={freq.id}
              onClick={() => setFrequency(freq.id as NotificationFrequency)}
              className={`p-4 rounded-xl border text-left transition-all ${
                settings.frequency === freq.id
                  ? 'bg-purple-500/20 border-purple-500/50 ring-1 ring-purple-500/30'
                  : 'bg-white/5 border-white/8 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div className="text-xl mb-1">{freq.icon}</div>
              <p className="font-semibold text-sm text-white">{freq.label}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{freq.desc}</p>
            </button>
          ))}
        </div>
        {settings.frequency === 'daily' && (
          <div className="flex items-center gap-3 pt-1">
            <label className="text-xs font-medium text-slate-300 whitespace-nowrap">Preferred time:</label>
            <input
              type="time"
              value={settings.customTime}
              onChange={(e) => setSettings({ ...settings, customTime: e.target.value })}
              className="bg-white/8 border border-white/15 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-purple-400"
            />
          </div>
        )}
      </div>

      {/* Topics */}
      <div className="glass-card p-5 rounded-2xl space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Notification Topics</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {TOPICS.map((topic) => {
            const isChecked = settings.topics[topic.key as keyof NotificationTopics] ?? true;
            return (
              <button
                key={topic.key}
                onClick={() => toggleTopic(topic.key as keyof NotificationTopics)}
                className={`p-3.5 rounded-xl border flex items-center justify-between text-left gap-3 transition-all ${
                  isChecked
                    ? topic.urgent
                      ? 'bg-rose-950/40 border-rose-500/50 ring-1 ring-rose-500/20'
                      : 'bg-amber-500/8 border-amber-500/30'
                    : 'bg-white/4 border-white/8 opacity-60 hover:opacity-80 hover:bg-white/8'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-[13px] leading-tight ${topic.urgent ? 'text-rose-300' : 'text-white'}`}>
                    {topic.title}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{topic.desc}</p>
                </div>
                <div className={`shrink-0 w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                  isChecked
                    ? topic.urgent
                      ? 'bg-rose-500 border-rose-400'
                      : 'bg-amber-500 border-amber-400'
                    : 'border-slate-600 bg-transparent'
                }`}>
                  {isChecked && <Check className="w-3 h-3 text-white stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 border-t border-white/10">
        <button
          onClick={handleTestDispatch}
          disabled={isSendingTest || !settings.email || !!emailError}
          className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-white/8 hover:bg-white/12 text-white font-medium text-sm flex items-center justify-center gap-2 transition-all border border-white/12 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isSendingTest
            ? <><Loader2 className="w-4 h-4 animate-spin text-indigo-400" /> Sending…</>
            : <><Send className="w-4 h-4 text-indigo-400" /> Send Test Email</>
          }
        </button>

        <button
          onClick={handleSave}
          className="flex-1 sm:flex-none px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all"
        >
          <Bell className="w-4 h-4" />
          Save Preferences
        </button>
      </div>

      {/* Status toasts */}
      <AnimatePresence>
        {testStatus && (
          <motion.div
            key="test-status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`flex items-start gap-3 p-4 rounded-xl border text-sm ${
              testStatus.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}
          >
            {testStatus.type === 'success'
              ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
            <span className="flex-1">{testStatus.message}</span>
            <button onClick={() => setTestStatus(null)} className="shrink-0 opacity-60 hover:opacity-100">
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
        {saveStatus && (
          <motion.div
            key="save-status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`flex items-start gap-3 p-4 rounded-xl border text-sm ${
              saveStatus.type === 'success'
                ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}
          >
            {saveStatus.type === 'success'
              ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
            <span className="flex-1">{saveStatus.message}</span>
            <button onClick={() => setSaveStatus(null)} className="shrink-0 opacity-60 hover:opacity-100">
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
