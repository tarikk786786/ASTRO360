import React from 'react';
import { motion } from 'motion/react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'card' | 'circle' | 'chart';
  lines?: number;
}

function SkeletonLine({ className = '' }: { className?: string }) {
  return (
    <div className={`h-3 rounded-full bg-slate-800 relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-700/50 to-transparent animate-shimmer" />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/5 space-y-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-800" />
        <div className="flex-1 space-y-2">
          <SkeletonLine className="w-1/3" />
          <SkeletonLine className="w-1/2" />
        </div>
      </div>
      <SkeletonLine className="w-full" />
      <SkeletonLine className="w-4/5" />
      <SkeletonLine className="w-2/3" />
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/5 space-y-4 animate-pulse">
      <SkeletonLine className="w-1/4" />
      <div className="h-48 rounded-xl bg-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-700/50 to-transparent animate-shimmer" />
      </div>
      <div className="flex gap-2">
        <SkeletonLine className="w-16" />
        <SkeletonLine className="w-16" />
        <SkeletonLine className="w-16" />
      </div>
    </div>
  );
}

export function ScreenSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6 min-h-screen"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <SkeletonLine className="w-48 h-5" />
          <SkeletonLine className="w-32" />
        </div>
        <div className="w-24 h-9 rounded-xl bg-slate-800 animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
      <SkeletonChart />
    </motion.div>
  );
}

export default function SkeletonLoader({ variant = 'card', lines = 3, className = '' }: SkeletonProps) {
  if (variant === 'circle') {
    return <div className={`w-12 h-12 rounded-full bg-slate-800 animate-pulse ${className}`} />;
  }
  if (variant === 'chart') return <SkeletonChart />;
  if (variant === 'card') return <SkeletonCard />;
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonLine key={i} className={i === lines - 1 ? 'w-2/3' : 'w-full'} />
      ))}
    </div>
  );
}
