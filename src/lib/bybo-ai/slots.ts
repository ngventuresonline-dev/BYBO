/**
 * Call slots BYBO AI may offer. Times are India Standard Time; a slot is
 * identified by its UTC ISO start so the client, the model and the booking
 * all agree on one instant.
 *
 * Weekdays only, a few fixed hours, nothing sooner than three hours out.
 */

const IST_OFFSET_MIN = 330;
const HOURS = [11, 12, 15, 16, 17];
const DAYS_AHEAD = 7;
const LEAD_TIME_MS = 3 * 60 * 60_000;
export const SLOT_MINUTES = 30;

export type Slot = { id: string; label: string };

const dayFmt = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'short', day: 'numeric', month: 'short' });
const timeFmt = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit', hour12: true });

export function slotLabel(d: Date) {
  return `${dayFmt.format(d)}, ${timeFmt.format(d).toLowerCase()} IST`;
}

export function upcomingSlots(now = new Date()): Slot[] {
  const slots: Slot[] = [];
  // Midnight today in IST, expressed in UTC.
  const istNow = new Date(now.getTime() + IST_OFFSET_MIN * 60_000);
  const base = Date.UTC(istNow.getUTCFullYear(), istNow.getUTCMonth(), istNow.getUTCDate()) - IST_OFFSET_MIN * 60_000;
  for (let day = 0; day <= DAYS_AHEAD; day++) {
    const midnight = base + day * 86_400_000;
    const weekday = new Date(midnight + IST_OFFSET_MIN * 60_000).getUTCDay();
    if (weekday === 0 || weekday === 6) continue;
    for (const h of HOURS) {
      const start = new Date(midnight + h * 3_600_000);
      if (start.getTime() - now.getTime() < LEAD_TIME_MS) continue;
      slots.push({ id: start.toISOString(), label: slotLabel(start) });
    }
  }
  return slots.slice(0, 18);
}

export function findSlot(id: string, now = new Date()) {
  return upcomingSlots(now).find((s) => s.id === id) ?? null;
}
