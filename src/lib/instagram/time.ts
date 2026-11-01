/** India Standard Time has no daylight saving. UTC+5:30 all year. */

const IST_OFFSET_MS = 330 * 60 * 1000;

export function istLocalToUtc(local: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(local.trim());
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const hour = Number(match[4]);
  const minute = Number(match[5]);
  if (month < 1 || month > 12 || day < 1 || day > 31 || hour > 23 || minute > 59) return null;
  const date = new Date(Date.UTC(year, month - 1, day, hour, minute) - IST_OFFSET_MS);
  const map: Record<string, string> = {};
  for (const part of new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)) {
    if (part.type !== 'literal') map[part.type] = part.value;
  }
  let gotHour = Number(map.hour);
  if (gotHour === 24) gotHour = 0;
  if (Number(map.year) !== year || Number(map.month) !== month || Number(map.day) !== day || gotHour !== hour || Number(map.minute) !== minute) {
    return null;
  }
  return date;
}

export function formatIst(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZoneName: 'short',
  }).format(date);
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
