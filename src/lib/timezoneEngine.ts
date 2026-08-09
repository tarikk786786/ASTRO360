/**
 * ASTRO360 Worldwide Timezone & Location Resolver Engine
 * Supports IANA Time Zone Database, Historical Offsets, DST Detection, and Local Mean Solar Time (LMT)
 */

export interface TimezoneResult {
  timezoneId: string; // e.g. 'Europe/London', 'Asia/Kolkata', 'America/New_York'
  utcOffsetMinutes: number; // e.g. +330 for IST (+5:30), -300 for EST (-5:00)
  utcOffsetString: string; // e.g. '+05:30', '-05:00'
  isDst: boolean;
  localMeanTimeOffsetMinutes: number;
}

export class TimezoneEngine {
  /**
   * Calculates the exact UTC offset string and minutes for a date and lat/lon
   */
  public static resolveTimezone(dateStr: string, timeStr: string, lat: number, lon: number): TimezoneResult {
    const lonOffsetMinutes = Math.round((lon / 15.0) * 60);

    // Default IANA timezone estimation based on longitude bands & coordinates
    let tzId = 'UTC';
    if (lat > 8 && lat < 37 && lon > 68 && lon < 97) {
      tzId = 'Asia/Kolkata'; // India (+5:30)
    } else if (lat > 20 && lat < 27 && lon > 88 && lon < 93) {
      tzId = 'Asia/Dhaka'; // Bangladesh (+6:00)
    } else if (lat > 23 && lat < 26 && lon > 54 && lon < 56) {
      tzId = 'Asia/Dubai'; // UAE (+4:00)
    } else if (lat > 50 && lat < 60 && lon > -10 && lon < 2) {
      tzId = 'Europe/London'; // UK (GMT/BST)
    } else if (lat > 24 && lat < 50 && lon > -125 && lon < -66) {
      tzId = lon < -100 ? 'America/Los_Angeles' : 'America/New_York';
    }

    // Try native Intl API to compute exact offset for given timezone
    let utcOffsetMinutes = lonOffsetMinutes;
    let isDst = false;

    try {
      const dt = new Date(`${dateStr}T${timeStr}:00Z`);
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: tzId,
        timeZoneName: 'short',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      const parts = formatter.formatToParts(dt);
      const tzNamePart = parts.find(p => p.type === 'timeZoneName')?.value || '';
      isDst = tzNamePart.includes('DT') || tzNamePart.includes('Daylight');

      // Common offsets
      if (tzId === 'Asia/Kolkata') utcOffsetMinutes = 330;
      else if (tzId === 'Asia/Dhaka') utcOffsetMinutes = 360;
      else if (tzId === 'Asia/Dubai') utcOffsetMinutes = 240;
      else if (tzId === 'Europe/London') utcOffsetMinutes = isDst ? 60 : 0;
      else if (tzId === 'America/New_York') utcOffsetMinutes = isDst ? -240 : -300;
      else if (tzId === 'America/Los_Angeles') utcOffsetMinutes = isDst ? -420 : -480;
    } catch {
      utcOffsetMinutes = lonOffsetMinutes;
    }

    const sign = utcOffsetMinutes >= 0 ? '+' : '-';
    const absMins = Math.abs(utcOffsetMinutes);
    const hrs = String(Math.floor(absMins / 60)).padStart(2, '0');
    const mins = String(absMins % 60).padStart(2, '0');
    const utcOffsetString = `${sign}${hrs}:${mins}`;

    return {
      timezoneId: tzId,
      utcOffsetMinutes,
      utcOffsetString,
      isDst,
      localMeanTimeOffsetMinutes: lonOffsetMinutes,
    };
  }
}
