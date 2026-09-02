/**
 * ASTRO360 High-Precision Calendar (.ics) & Google Calendar Exporter
 * 
 * Enables 1-click synchronization of planetary transits, retrogrades,
 * eclipses, and electional Muhurta windows directly into:
 * - Apple Calendar (macOS / iOS)
 * - Google Calendar (Web / Android)
 * - Microsoft Outlook & Thunderbird
 */

export interface CalendarEventPayload {
  title: string;
  description: string;
  startDate: Date | string;
  endDate?: Date | string;
  location?: string;
  category?: string;
  url?: string;
}

/**
 * Format Date to iCalendar UTC standard (YYYYMMDDTHHmmssZ)
 */
function formatIcsDate(dateInput: Date | string): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) {
    const fallback = new Date();
    return fallback.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  }
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

/**
 * Generate iCalendar (.ics) string for a single or multiple events
 */
export function generateIcsContent(events: CalendarEventPayload[]): string {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ASTRO360//Precision Ephemeris Engine//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:ASTRO360 Planetary Transits',
    'X-WR-TIMEZONE:UTC',
  ];

  events.forEach((evt, idx) => {
    const start = typeof evt.startDate === 'string' ? new Date(evt.startDate) : evt.startDate;
    const end = evt.endDate 
      ? (typeof evt.endDate === 'string' ? new Date(evt.endDate) : evt.endDate)
      : new Date(start.getTime() + 2 * 60 * 60 * 1000); // 2 hours default

    const uid = `ASTRO360-${Date.now()}-${idx}@astro.tarikislam.in`;
    const dtstamp = formatIcsDate(new Date());
    const dtstart = formatIcsDate(start);
    const dtend = formatIcsDate(end);

    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${uid}`);
    lines.push(`DTSTAMP:${dtstamp}`);
    lines.push(`DTSTART:${dtstart}`);
    lines.push(`DTEND:${dtend}`);
    lines.push(`SUMMARY:${escapeIcsText(evt.title)}`);
    lines.push(`DESCRIPTION:${escapeIcsText(evt.description + '\n\nCalculated by ASTRO360 NASA JPL DE440 Sub-Arcsecond Ephemeris Engine (https://astro.tarikislam.in/)')}`);
    lines.push(`LOCATION:${escapeIcsText(evt.location || 'Universal Meridian (Celestial Sphere)')}`);
    if (evt.category) {
      lines.push(`CATEGORIES:${escapeIcsText(evt.category)}`);
    }
    lines.push('STATUS:CONFIRMED');
    lines.push('TRANSP:TRANSPARENT');
    lines.push('END:VEVENT');
  });

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

function escapeIcsText(text: string): string {
  return (text || '')
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/**
 * Downloads .ics calendar file to the user\'s device
 */
export function downloadIcsFile(events: CalendarEventPayload[], filename = 'ASTRO360_Planetary_Transits.ics'): void {
  try {
    const icsString = generateIcsContent(events);
    const blob = new Blob([icsString], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  } catch (err) {
    console.error('Failed to export .ics calendar file:', err);
  }
}

/**
 * Creates a direct 1-tap Google Calendar web template URL
 */
export function getGoogleCalendarUrl(event: CalendarEventPayload): string {
  const start = typeof event.startDate === 'string' ? new Date(event.startDate) : event.startDate;
  const end = event.endDate 
    ? (typeof event.endDate === 'string' ? new Date(event.endDate) : event.endDate)
    : new Date(start.getTime() + 2 * 60 * 60 * 1000);

  const startUtc = formatIcsDate(start);
  const endUtc = formatIcsDate(end);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${startUtc}/${endUtc}`,
    details: `${event.description}\n\nNASA JPL DE440 Sub-Arcsecond Planetary Ephemeris (https://astro.tarikislam.in/)`,
    location: event.location || 'Universal Meridian',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
