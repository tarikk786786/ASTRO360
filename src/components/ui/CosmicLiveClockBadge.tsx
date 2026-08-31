import React, { useState, useEffect, memo } from 'react';

export const CosmicLiveClockBadge = memo(function CosmicLiveClockBadge() {
  const [timeStr, setTimeStr] = useState<string>('');
  const [timeZoneAbbr, setTimeZoneAbbr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setDateStr(now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' }));
      try {
        const parts = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' }).formatToParts(now);
        const tz = parts.find(p => p.type === 'timeZoneName')?.value || '';
        setTimeZoneAbbr(tz);
      } catch {
        setTimeZoneAbbr('LOCAL');
      }
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span>
      {dateStr || 'Today'} • <span className="text-[#06B6D4] font-semibold">{timeStr || '12:00:00 PM'}</span> <span className="text-white font-bold">{timeZoneAbbr}</span>
    </span>
  );
});

export default CosmicLiveClockBadge;
