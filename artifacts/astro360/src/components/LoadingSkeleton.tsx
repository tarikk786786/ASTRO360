import React from 'react';

interface LoadingSkeletonProps {
  className?: string;
  count?: number;
}

export function SkeletonBox({ className = 'h-12 w-full' }: { className?: string }) {
  return (
    <div className={`rounded-xl bg-[#1E293B]/60 animate-pulse border border-white/5 relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
    </div>
  );
}

export function SkeletonGrid({ count = 6, className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' }: LoadingSkeletonProps) {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-5 rounded-2xl bg-[#111827] border border-white/10 space-y-3">
          <SkeletonBox className="h-4 w-1/3" />
          <SkeletonBox className="h-10 w-full" />
          <div className="flex gap-2">
            <SkeletonBox className="h-6 w-1/2" />
            <SkeletonBox className="h-6 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function LoadingSkeleton({ className = 'space-y-4' }: { className?: string }) {
  return (
    <div className={`p-6 rounded-3xl bg-[#111827] border border-white/10 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <SkeletonBox className="w-10 h-10 rounded-full shrink-0" />
        <div className="space-y-2 w-full">
          <SkeletonBox className="h-4 w-1/4" />
          <SkeletonBox className="h-3 w-1/2" />
        </div>
      </div>
      <SkeletonGrid count={3} className="grid grid-cols-1 sm:grid-cols-3 gap-4" />
    </div>
  );
}
