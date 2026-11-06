import { CONTACT } from '@/lib/site';

/**
 * Post-call WhatsApp messages for the lead desk, in two sets: one signed off
 * with BYBO's links only, one that also carries Bcon Club's. A link left empty
 * here is simply left out of every message, so nothing half-filled goes out.
 */

type Link = { label: string; url: string };

export const BYBO_LINKS: Link[] = [
  { label: 'Website', url: 'https://bybo.in' },
  { label: 'Instagram', url: 'https://instagram.com/byboindia' },
  { label: 'WhatsApp', url: `https://wa.me/${CONTACT.whatsapp}` },
];

/** BCON Club, BYBO's partner. */
export const BCON_LINKS: Link[] = [
  { label: 'Website', url: 'https://bconclub.com' },
  { label: 'Instagram', url: 'https://www.instagram.com/bconclub' },
  { label: 'LinkedIn', url: 'https://in.linkedin.com/company/bconclub' },
  { label: 'YouTube', url: 'https://www.youtube.com/@bconclub' },
  { label: 'Facebook', url: 'https://www.facebook.com/bconclub' },
];

export type PostCallSet = 'bybo' | 'bcon';
export const bconReady = () => BCON_LINKS.some((l) => l.url);

const block = (title: string, links: Link[]) => {
  const live = links.filter((l) => l.url);
  return live.length ? `${title}\n${live.map((l) => `• ${l.label}: ${l.url}`).join('\n')}` : '';
};

function signOff(set: PostCallSet) {
  return [
    block('BYBO', BYBO_LINKS),
    set === 'bcon' ? block('BCON Club, our partner', BCON_LINKS) : '',
  ].filter(Boolean).join('\n\n');
}

export function postCallTemplates(first: string, set: PostCallSet, demoUrl?: string | null) {
  const end = signOff(set);
  const msg = (...lines: string[]) => [...lines, end].filter(Boolean).join('\n\n');
  return [
    { id: 'thanks', label: 'Thanks for the call', text: msg(`Hi ${first}, thank you for your time on the call today. It was great understanding what you’re building.`, 'We’ll send a written Blueprint with the scope, timeline and fixed price shortly. Reply here if anything should be added.') },
    { id: 'recap', label: 'Recap & next step', text: msg(`Hi ${first}, quick recap from our call:`, '1. What you need: \n2. What we’ll build first: \n3. Next step: ', 'Shall we lock the next step this week?') },
    { id: 'demo', label: 'Demo link', text: msg(`Hi ${first}, as promised, here is a sample built for your business${demoUrl ? `: ${demoUrl}` : '.'}`, 'Have a look on your phone and tell me what you’d change. Happy to walk you through it on a 20-minute call.') },
    { id: 'pay', label: 'Payment to start', text: msg(`Hi ${first}, great to have you on board. You can pay securely here to get started: https://bybo.in/pay`, 'A receipt is emailed the moment it goes through, and we begin right after.') },
    { id: 'missed', label: 'Missed your call', text: msg(`Hi ${first}, this is BYBO. I tried calling you just now but couldn’t get through.`, 'When is a good time to speak? A quick reply with a time works.') },
    { id: 'resched', label: 'Reschedule', text: msg(`Hi ${first}, no worries if today didn’t work out. Would tomorrow or later this week suit you better for a quick call?`) },
    { id: 'nudge', label: 'Gentle nudge', text: msg(`Hi ${first}, just checking in after our call. If now isn’t the right time, no problem at all.`, 'Whenever you’re ready, we’re one message away.') },
  ];
}
