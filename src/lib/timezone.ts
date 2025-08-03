export interface TimezoneInfo {
  value: string;
  label: string;
  group: string;
  offset: string;
}

export const MAJOR_TIMEZONES: TimezoneInfo[] = [
  // North America
  { value: 'America/New_York', label: 'New York (EST/EDT)', group: 'North America', offset: 'UTC-5/-4' },
  { value: 'America/Chicago', label: 'Chicago (CST/CDT)', group: 'North America', offset: 'UTC-6/-5' },
  { value: 'America/Denver', label: 'Denver (MST/MDT)', group: 'North America', offset: 'UTC-7/-6' },
  { value: 'America/Los_Angeles', label: 'Los Angeles (PST/PDT)', group: 'North America', offset: 'UTC-8/-7' },
  { value: 'America/Toronto', label: 'Toronto (EST/EDT)', group: 'North America', offset: 'UTC-5/-4' },
  { value: 'America/Vancouver', label: 'Vancouver (PST/PDT)', group: 'North America', offset: 'UTC-8/-7' },
  
  // Europe
  { value: 'Europe/London', label: 'London (GMT/BST)', group: 'Europe', offset: 'UTC+0/+1' },
  { value: 'Europe/Paris', label: 'Paris (CET/CEST)', group: 'Europe', offset: 'UTC+1/+2' },
  { value: 'Europe/Berlin', label: 'Berlin (CET/CEST)', group: 'Europe', offset: 'UTC+1/+2' },
  { value: 'Europe/Rome', label: 'Rome (CET/CEST)', group: 'Europe', offset: 'UTC+1/+2' },
  { value: 'Europe/Madrid', label: 'Madrid (CET/CEST)', group: 'Europe', offset: 'UTC+1/+2' },
  { value: 'Europe/Amsterdam', label: 'Amsterdam (CET/CEST)', group: 'Europe', offset: 'UTC+1/+2' },
  { value: 'Europe/Stockholm', label: 'Stockholm (CET/CEST)', group: 'Europe', offset: 'UTC+1/+2' },
  { value: 'Europe/Moscow', label: 'Moscow (MSK)', group: 'Europe', offset: 'UTC+3' },
  
  // Asia Pacific
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)', group: 'Asia Pacific', offset: 'UTC+9' },
  { value: 'Asia/Shanghai', label: 'Shanghai (CST)', group: 'Asia Pacific', offset: 'UTC+8' },
  { value: 'Asia/Hong_Kong', label: 'Hong Kong (HKT)', group: 'Asia Pacific', offset: 'UTC+8' },
  { value: 'Asia/Singapore', label: 'Singapore (SGT)', group: 'Asia Pacific', offset: 'UTC+8' },
  { value: 'Asia/Seoul', label: 'Seoul (KST)', group: 'Asia Pacific', offset: 'UTC+9' },
  { value: 'Asia/Bangkok', label: 'Bangkok (ICT)', group: 'Asia Pacific', offset: 'UTC+7' },
  { value: 'Asia/Dubai', label: 'Dubai (GST)', group: 'Asia Pacific', offset: 'UTC+4' },
  { value: 'Asia/Mumbai', label: 'Mumbai (IST)', group: 'Asia Pacific', offset: 'UTC+5:30' },
  { value: 'Australia/Sydney', label: 'Sydney (AEST/AEDT)', group: 'Asia Pacific', offset: 'UTC+10/+11' },
  { value: 'Australia/Melbourne', label: 'Melbourne (AEST/AEDT)', group: 'Asia Pacific', offset: 'UTC+10/+11' },
  
  // South America
  { value: 'America/Sao_Paulo', label: 'São Paulo (BRT)', group: 'South America', offset: 'UTC-3' },
  { value: 'America/Argentina/Buenos_Aires', label: 'Buenos Aires (ART)', group: 'South America', offset: 'UTC-3' },
  
  // Africa
  { value: 'Africa/Cairo', label: 'Cairo (EET)', group: 'Africa', offset: 'UTC+2' },
  { value: 'Africa/Johannesburg', label: 'Johannesburg (SAST)', group: 'Africa', offset: 'UTC+2' },
  
  // UTC
  { value: 'UTC', label: 'UTC (Coordinated Universal Time)', group: 'UTC', offset: 'UTC+0' },
];

export function getCurrentTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function formatTime(date: Date, timezone: string): string {
  return date.toLocaleTimeString('en-US', {
    timeZone: timezone,
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

export function getTimezoneInfo(timezone: string): TimezoneInfo | undefined {
  return MAJOR_TIMEZONES.find(tz => tz.value === timezone);
}

export function getFormattedTimezoneLabel(timezone: string): string {
  const info = getTimezoneInfo(timezone);
  if (info) {
    return info.label;
  }
  
  // Fallback for user's detected timezone if not in our list
  try {
    const now = new Date();
    const offset = -now.getTimezoneOffset() / 60;
    const offsetString = offset >= 0 ? `UTC+${offset}` : `UTC${offset}`;
    return `${timezone.split('/').pop()?.replace('_', ' ')} (${offsetString})`;
  } catch {
    return timezone;
  }
}