import React from 'react';

interface ContentSkeletonProps {
  type?: 'home' | 'forecast' | 'charts' | 'cards' | 'generic';
}

export default function ContentSkeleton({ type = 'home' }: ContentSkeletonProps) {
  if (type === 'home') {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-pulse text-left py-4">
        {/* Header Skeleton */}
        <div className="h-10 w-48 bg-white/5 rounded-2xl"></div>
        
        {/* Big Highlight Card Skeleton */}
        <div className="h-44 w-full bg-[#0F172A] rounded-3xl border border-white/5 p-6 space-y-3">
          <div className="h-4 w-28 bg-white/10 rounded"></div>
          <div className="h-8 w-3/4 bg-white/15 rounded-xl"></div>
          <div className="h-4 w-1/2 bg-white/5 rounded"></div>
        </div>

        {/* 4 Cards Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-[#0F172A] rounded-2xl border border-white/5 p-4 space-y-2">
              <div className="h-4 w-16 bg-white/10 rounded"></div>
              <div className="h-6 w-20 bg-white/15 rounded"></div>
            </div>
          ))}
        </div>

        {/* Next Important Period Skeleton */}
        <div className="h-32 w-full bg-[#0B1220] rounded-3xl border border-white/5 p-6 space-y-2">
          <div className="h-4 w-32 bg-white/10 rounded"></div>
          <div className="h-6 w-1/3 bg-white/15 rounded"></div>
        </div>
      </div>
    );
  }

  if (type === 'forecast') {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-pulse text-left py-4">
        <div className="h-10 w-40 bg-white/5 rounded-2xl"></div>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 w-24 bg-white/10 rounded-xl"></div>
          ))}
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-[#0F172A] rounded-2xl border border-white/5 p-4 space-y-2">
              <div className="h-5 w-48 bg-white/15 rounded"></div>
              <div className="h-4 w-32 bg-white/10 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4 animate-pulse py-4">
      <div className="h-8 w-48 bg-white/10 rounded-xl"></div>
      <div className="h-64 bg-[#0F172A] rounded-3xl border border-white/5"></div>
    </div>
  );
}
