/**
 * Calling window in Asia/Kolkata. Monday–Saturday, never Sunday.
 * Start and end are inclusive (10:00 and 19:30 are inside).
 */

const IST = 'Asia/Kolkata';
const OFFSET_MIN = 330;

export type IstParts = {
  weekday: 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
};

export function istParts(now: Date): IstParts {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: IST,
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });
  const map: Record<string, string> = {};
  for (const part of fmt.formatToParts(now)) {
    if (part.type !== 'literal') map[part.type] = part.value;
  }
  let hour = Number(map.hour);
  if (hour === 24) hour = 0;
  return {
    weekday: map.weekday as IstParts['weekday'],
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    hour,
    minute: Number(map.minute),
  };
}

export function istDate(now: Date): string {
  const p = istParts(now);
  const month = String(p.month).padStart(2, '0');
  const day = String(p.day).padStart(2, '0');
  return `${p.year}-${month}-${day}`;
}

export function parseHHMM(value: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour > 23 || minute > 59) return null;
  return hour * 60 + minute;
}

/** Invalid or inverted windows fall back to 10:00–19:30 rather than opening the day. */
export function callingWindow(start = '10:00', end = '19:30'): { start: number; end: number } {
  const open = parseHHMM(start);
  const close = parseHHMM(end);
  if (open == null || close == null || close <= open) return { start: 10 * 60, end: 19 * 60 + 30 };
  return { start: open, end: close };
}

export function isCallingDay(weekday: string): boolean {
  return weekday !== 'Sun';
}

export function isWithinCallingHours(now: Date, start = '10:00', end = '19:30'): boolean {
  const parts = istParts(now);
  if (!isCallingDay(parts.weekday)) return false;
  const window = callingWindow(start, end);
  const minute = parts.hour * 60 + parts.minute;
  return minute >= window.start && minute <= window.end;
}

function wallToUtc(year: number, month: number, day: number, minutes: number): Date {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  return new Date(Date.UTC(year, month - 1, day, hour, minute) - OFFSET_MIN * 60_000);
}

function addCalendarDays(year: number, month: number, day: number, days: number) {
  const next = new Date(Date.UTC(year, month - 1, day + days));
  return { year: next.getUTCFullYear(), month: next.getUTCMonth() + 1, day: next.getUTCDate() };
}

/** Next moment the window opens, including later today if we are still before it. */
export function nextWindowStart(now: Date, start = '10:00', end = '19:30'): Date {
  const parts = istParts(now);
  const window = callingWindow(start, end);
  const minute = parts.hour * 60 + parts.minute;
  if (isCallingDay(parts.weekday) && minute < window.start) {
    return wallToUtc(parts.year, parts.month, parts.day, window.start);
  }
  let cursor = { year: parts.year, month: parts.month, day: parts.day };
  for (let i = 0; i < 8; i++) {
    cursor = addCalendarDays(cursor.year, cursor.month, cursor.day, 1);
    const noon = wallToUtc(cursor.year, cursor.month, cursor.day, 12 * 60);
    if (isCallingDay(istParts(noon).weekday)) return wallToUtc(cursor.year, cursor.month, cursor.day, window.start);
  }
  return wallToUtc(parts.year, parts.month, parts.day, window.start);
}

/** The following calling day's open. A miss is never retried later the same day. */
export function nextRetryStart(now: Date, start = '10:00', end = '19:30'): Date {
  const parts = istParts(now);
  const window = callingWindow(start, end);
  const justAfterClose = new Date(wallToUtc(parts.year, parts.month, parts.day, window.end).getTime() + 60_000);
  return nextWindowStart(justAfterClose, start, end);
}
