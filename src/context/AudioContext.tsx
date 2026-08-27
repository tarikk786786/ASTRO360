/**
 * ASTRO360 — Global Audio & Speech Context
 * Orchestrates unified playback across Astrology Narrations, Meditative Tracks,
 * Traditional Mantras, and Islamic Duas/Qur'an with persistent mini/full players.
 */

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { type ContentDomain, type VoiceProfileId, type AudioTone } from '../lib/audio/voiceRegistry';
import { TTSService, generateSubtitleCues, type SubtitleCue } from '../lib/audio/ttsService';
import { AudioAnalytics } from '../lib/audio/audioAnalytics';
import { isRtlLanguage } from '../lib/audio/languageRegistry';

export interface AudioTrack {
  id: string;
  title: string;
  subtitle?: string;
  domain: ContentDomain;
  language: string;
  voiceProfileId?: VoiceProfileId;
  tone?: AudioTone;
  text?: string;
  audioUrl?: string;
  isSynthetic: boolean;
  provenance?: string;
  subtitles?: SubtitleCue[];
  isRtl?: boolean;
  targetCount?: number;
  currentCount?: number;
  traditionSource?: string;
  disclaimer?: string;
}

export type PlaybackState = 'idle' | 'loading' | 'playing' | 'paused' | 'completed';

interface AudioContextType {
  activeTrack: AudioTrack | null;
  playbackState: PlaybackState;
  currentTime: number;
  duration: number;
  progress: number;
  speed: number;
  isLooping: boolean;
  volume: number;
  isMuted: boolean;
  isFullPlayerOpen: boolean;
  activeSubtitle: string;
  
  // Actions
  playTrack: (track: AudioTrack) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  togglePlay: () => void;
  seek: (timeSeconds: number) => void;
  skipForward: (seconds?: number) => void;
  skipBackward: (seconds?: number) => void;
  setSpeed: (speed: number) => void;
  toggleLoop: () => void;
  incrementCount: () => void;
  resetCount: () => void;
  openFullPlayer: () => void;
  closeFullPlayer: () => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTrack, setActiveTrack] = useState<AudioTrack | null>(null);
  const [playbackState, setPlaybackState] = useState<PlaybackState>('idle');
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [speed, setSpeedState] = useState<number>(1.0);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullPlayerOpen, setIsFullPlayerOpen] = useState<boolean>(false);
  const [activeSubtitle, setActiveSubtitle] = useState<string>('');

  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const ttsStopHandleRef = useRef<(() => void) | null>(null);

  // Initialize HTML5 Audio Element for media audio streams
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const audio = new Audio();
      audio.preload = 'metadata';

      audio.onplay = () => setPlaybackState('playing');
      audio.onpause = () => {
        if (playbackState === 'playing') setPlaybackState('paused');
      };
      audio.onended = () => {
        if (isLooping) {
          audio.currentTime = 0;
          audio.play();
        } else {
          setPlaybackState('completed');
          AudioAnalytics.track({
            eventType: 'complete',
            contentDomain: activeTrack?.domain || 'ASTROLOGY',
            language: activeTrack?.language || 'en',
            durationSeconds: duration,
          });
        }
      };

      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
      };

      audio.onloadedmetadata = () => {
        setDuration(audio.duration || 60);
      };

      audioElementRef.current = audio;
    }

    return () => {
      if (audioElementRef.current) {
        audioElementRef.current.pause();
        audioElementRef.current.src = '';
      }
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      TTSService.stop();
    };
  }, []);

  // Update synchronized subtitle when time changes
  useEffect(() => {
    if (!activeTrack?.subtitles || activeTrack.subtitles.length === 0) {
      setActiveSubtitle(activeTrack?.text || '');
      return;
    }

    const currentCue = activeTrack.subtitles.find(
      cue => currentTime >= cue.startTimeSec && currentTime <= cue.endTimeSec
    );

    if (currentCue) {
      setActiveSubtitle(currentCue.text);
    } else if (currentTime === 0 && activeTrack.subtitles[0]) {
      setActiveSubtitle(activeTrack.subtitles[0].text);
    }
  }, [currentTime, activeTrack]);

  // Main Play Action
  const playTrack = useCallback((track: AudioTrack) => {
    // Stop any existing playback or speech
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.src = '';
    }
    if (ttsStopHandleRef.current) {
      ttsStopHandleRef.current();
      ttsStopHandleRef.current = null;
    }
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
    }

    const isRtl = isRtlLanguage(track.language);
    const enrichedTrack: AudioTrack = {
      ...track,
      isRtl,
      currentCount: track.currentCount || 1,
      targetCount: track.targetCount || 1,
      subtitles: track.text ? generateSubtitleCues(track.text, speed) : track.subtitles,
    };

    setActiveTrack(enrichedTrack);
    setCurrentTime(0);
    setPlaybackState('loading');

    AudioAnalytics.track({
      eventType: 'play',
      contentDomain: track.domain,
      language: track.language,
      voiceProfileId: track.voiceProfileId,
    });

    if (track.audioUrl) {
      // 1. Media Audio Stream (authentic human recitation / solfeggio ambient)
      if (audioElementRef.current) {
        audioElementRef.current.src = track.audioUrl;
        audioElementRef.current.playbackRate = speed;
        audioElementRef.current.volume = isMuted ? 0 : volume;
        audioElementRef.current.play()
          .then(() => setPlaybackState('playing'))
          .catch((err) => {
            console.error('Failed to play audio stream', err);
            setPlaybackState('idle');
          });
      }
    } else if (track.text) {
      // 2. Synthesized Narration (TTS)
      setPlaybackState('playing');
      const speechRes = TTSService.speak({
        text: track.text,
        language: track.language,
        voiceProfileId: track.voiceProfileId,
        tone: track.tone,
        speed,
        onStart: () => setPlaybackState('playing'),
        onEnd: () => {
          setPlaybackState('completed');
          AudioAnalytics.track({
            eventType: 'complete',
            contentDomain: track.domain,
            language: track.language,
          });
        },
        onError: () => setPlaybackState('idle'),
      });

      setDuration(speechRes.durationEstimateSec);
      ttsStopHandleRef.current = speechRes.stop;

      // Simulate smooth progress update for TTS
      const startTime = Date.now();
      progressTimerRef.current = setInterval(() => {
        const elapsedSec = (Date.now() - startTime) / 1000 * speed;
        setCurrentTime(Math.min(elapsedSec, speechRes.durationEstimateSec));
        if (elapsedSec >= speechRes.durationEstimateSec) {
          if (progressTimerRef.current) clearInterval(progressTimerRef.current);
        }
      }, 250);
    }
  }, [speed, volume, isMuted]);

  const pause = useCallback(() => {
    if (audioElementRef.current && activeTrack?.audioUrl) {
      audioElementRef.current.pause();
    }
    if (activeTrack?.text) {
      TTSService.stop();
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    }
    setPlaybackState('paused');
    AudioAnalytics.track({
      eventType: 'pause',
      contentDomain: activeTrack?.domain || 'ASTROLOGY',
      language: activeTrack?.language || 'en',
    });
  }, [activeTrack]);

  const resume = useCallback(() => {
    if (!activeTrack) return;
    if (activeTrack.audioUrl && audioElementRef.current) {
      audioElementRef.current.play();
      setPlaybackState('playing');
    } else if (activeTrack.text) {
      // Re-trigger speech from current context
      playTrack(activeTrack);
    }
  }, [activeTrack, playTrack]);

  const stop = useCallback(() => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.src = '';
    }
    if (ttsStopHandleRef.current) {
      ttsStopHandleRef.current();
      ttsStopHandleRef.current = null;
    }
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    TTSService.stop();
    setPlaybackState('idle');
    setCurrentTime(0);
  }, []);

  const togglePlay = useCallback(() => {
    if (playbackState === 'playing') {
      pause();
    } else if (playbackState === 'paused') {
      resume();
    } else if (activeTrack) {
      playTrack(activeTrack);
    }
  }, [playbackState, activeTrack, pause, resume, playTrack]);

  const seek = useCallback((timeSeconds: number) => {
    const target = Math.max(0, Math.min(timeSeconds, duration || 100));
    setCurrentTime(target);
    if (audioElementRef.current && activeTrack?.audioUrl) {
      audioElementRef.current.currentTime = target;
    }
    AudioAnalytics.track({
      eventType: 'seek',
      contentDomain: activeTrack?.domain || 'ASTROLOGY',
      language: activeTrack?.language || 'en',
    });
  }, [duration, activeTrack]);

  const skipForward = useCallback((seconds: number = 10) => {
    seek(currentTime + seconds);
  }, [currentTime, seek]);

  const skipBackward = useCallback((seconds: number = 10) => {
    seek(currentTime - seconds);
  }, [currentTime, seek]);

  const setSpeed = useCallback((newSpeed: number) => {
    setSpeedState(newSpeed);
    if (audioElementRef.current) {
      audioElementRef.current.playbackRate = newSpeed;
    }
    AudioAnalytics.track({
      eventType: 'speed_change',
      contentDomain: activeTrack?.domain || 'ASTROLOGY',
      language: activeTrack?.language || 'en',
    });
  }, [activeTrack]);

  const toggleLoop = useCallback(() => {
    setIsLooping(prev => !prev);
  }, []);

  const incrementCount = useCallback(() => {
    if (!activeTrack) return;
    const nextCount = (activeTrack.currentCount || 0) + 1;
    setActiveTrack(prev => prev ? { ...prev, currentCount: nextCount } : null);
    AudioAnalytics.track({
      eventType: 'count_increment',
      contentDomain: activeTrack.domain,
      language: activeTrack.language,
    });
  }, [activeTrack]);

  const resetCount = useCallback(() => {
    if (!activeTrack) return;
    setActiveTrack(prev => prev ? { ...prev, currentCount: 1 } : null);
  }, [activeTrack]);

  const setVolume = useCallback((vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setVolumeState(clamped);
    if (audioElementRef.current) {
      audioElementRef.current.volume = clamped;
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev;
      if (audioElementRef.current) {
        audioElementRef.current.volume = next ? 0 : volume;
      }
      return next;
    });
  }, [volume]);

  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <AudioContext.Provider
      value={{
        activeTrack,
        playbackState,
        currentTime,
        duration,
        progress,
        speed,
        isLooping,
        volume,
        isMuted,
        isFullPlayerOpen,
        activeSubtitle,
        playTrack,
        pause,
        resume,
        stop,
        togglePlay,
        seek,
        skipForward,
        skipBackward,
        setSpeed,
        toggleLoop,
        incrementCount,
        resetCount,
        openFullPlayer: () => setIsFullPlayerOpen(true),
        closeFullPlayer: () => setIsFullPlayerOpen(false),
        setVolume,
        toggleMute,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export function useAudio(): AudioContextType {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
