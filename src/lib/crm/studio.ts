import type { Capture } from './db';

/** A BYBO Studio report (sign-up, call booked, payment) as a CRM capture, or null when it is not valid. */
const s = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);
const ist = (iso: string) => new Date(iso).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }) + ' IST';

export function toCapture(b: Record<string, unknown>): Capture | null {
  const email = s(b.email, 200).toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return null;
  const name = s(b.name, 120) || undefined;
  if (b.kind === 'signup') {
    const studio = s(b.studio, 40) || 'BYBO Studio';
    return {
      source: 'studio', email, name, need: `${studio} sign-up`, services: [studio], temperature: 'warm', page: 'studio.bybo.in',
      created_at: s(b.at, 40) || undefined,
      event: { kind: 'studio_signup', title: `Signed up on ${studio}`, body: `Email confirmed: ${s(b.how, 80) || 'yes'}` },
    };
  }
  if (b.kind === 'picked') {
    const studio = s(b.studio, 40) || 'BYBO Studio';
    const phone = s(b.phone, 30);
    return {
      source: 'studio', email, name, phone: phone || null, services: [studio], temperature: 'warm', page: 'studio.bybo.in',
      event: { kind: 'studio_picked', title: `Picked ${studio}${phone ? `, left ${phone}` : ''}`, body: s(b.setup, 200) || undefined },
    };
  }
  if (b.kind === 'call') {
    const when = s(b.when, 40);
    if (!Date.parse(when)) return null;
    const topic = s(b.topic, 80) || 'Custom build';
    const note = s(b.note, 1000);
    return {
      source: 'studio', email, name, phone: s(b.phone, 30) || null, need: topic, services: [topic], temperature: 'hot', stage: 'call_booked', page: 'studio.bybo.in/plans',
      ...(note ? { summary: note } : {}),
      event: { kind: 'booking', title: `Booked a call: ${topic}, ${ist(when)}`, body: note || undefined, meta: { start: when } },
    };
  }
  if (b.kind === 'payment') {
    const what = s(b.what, 120) || 'BYBO Studio';
    const amount = Number(b.amount);
    return {
      source: 'studio', email, name, need: what, services: [what], temperature: 'hot', stage: 'won', page: 'studio.bybo.in',
      ...(Number.isFinite(amount) && amount > 0 ? { value: amount } : {}),
      event: { kind: 'payment', title: `Paid ₹${Number.isFinite(amount) ? amount.toLocaleString('en-IN') : '?'}: ${what}`, meta: { ref: s(b.ref, 120) } },
    };
  }
  return null;
}
