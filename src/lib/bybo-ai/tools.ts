import { findSlot } from './slots';
import { sendBooking } from './booking';
import { esc, sendMail, shell, toTeam, transcriptHtml, transcriptText, type Turn } from './mail';

/**
 * What B can do in the middle of a conversation. Each tool is checked here,
 * not trusted from the model: emails only go to an address the visitor typed,
 * slots must be real, and every visitor email copies the team.
 */

export type Brief = {
  title: string;
  business: string;
  problem: string;
  goals: string[];
  solution: string;
  steps: { step: string; detail: string }[];
  deliverables: string[];
  next_step: string;
};

export type ToolContext = { turns: Turn[]; page: string; ip: string };
export type ToolOutcome = { result: string; brief?: Brief; action?: string; booked?: string };

export const TOOLS = [
  {
    name: 'create_brief',
    description: 'Create a tailored one-page brief (mini proposal) for this visitor\'s business and show it in the chat. If you include their email (one they typed), it is also emailed to them, with a copy to the team.',
    input_schema: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'e.g. "A Night Desk for Smile Dental"' },
        business: { type: 'string', description: 'Who they are, in one line' },
        problem: { type: 'string', description: 'The problem and what it costs them, in their words and numbers' },
        goals: { type: 'array', items: { type: 'string' }, description: '2 to 4 goals' },
        solution: { type: 'string', description: 'The system BYBO would build, 2 sentences' },
        steps: { type: 'array', items: { type: 'object', properties: { step: { type: 'string' }, detail: { type: 'string' } }, required: ['step', 'detail'] }, description: '3 to 5 steps of how it works' },
        deliverables: { type: 'array', items: { type: 'string' }, description: '3 to 5 things they get' },
        next_step: { type: 'string', description: 'The call to action, e.g. a 30-minute call to map it' },
        name: { type: 'string' },
        email: { type: 'string', description: 'Only an email the visitor typed in this conversation' },
      },
      required: ['title', 'business', 'problem', 'goals', 'solution', 'steps', 'deliverables', 'next_step'],
    },
  },
  {
    name: 'send_summary',
    description: 'Email the visitor a crisp summary of the conversation and agreed next steps, with a copy to the team.',
    input_schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string', description: 'Only an email the visitor typed in this conversation' },
        summary: { type: 'string', description: '3 to 5 sentences: their situation, what we discussed, what BYBO would build' },
        next_steps: { type: 'array', items: { type: 'string' } },
      },
      required: ['name', 'email', 'summary', 'next_steps'],
    },
  },
  {
    name: 'alert_team',
    description: 'Alert the BYBO team about a warm or hot lead right now, so a person follows up fast. Use as soon as there is clear need and intent, or contact details, or they ask for a person.',
    input_schema: {
      type: 'object',
      properties: {
        temperature: { type: 'string', enum: ['hot', 'warm'] },
        name: { type: 'string' }, email: { type: 'string' }, phone: { type: 'string' }, company: { type: 'string' },
        need: { type: 'string', description: 'What they want, one line' },
        summary: { type: 'string', description: 'Who they are, the pain, urgency, budget signals, decision-maker' },
        recommended: { type: 'string', description: 'What B recommends the team pitch' },
      },
      required: ['temperature', 'need', 'summary'],
    },
  },
  {
    name: 'book_call',
    description: 'Book a 30-minute discovery call with the BYBO team. Only with the visitor\'s name, a valid email, a phone number and a slot id from AVAILABLE SLOTS.',
    input_schema: {
      type: 'object',
      properties: {
        slot: { type: 'string', description: 'Exact slot id (UTC ISO) from AVAILABLE SLOTS' },
        name: { type: 'string' }, email: { type: 'string' }, phone: { type: 'string' },
        company: { type: 'string', description: 'Business name, if given' },
        need: { type: 'string', description: 'One line: what they want help with' },
        summary: { type: 'string', description: 'Two lines for the team: who they are, the problem, urgency' },
      },
      required: ['slot', 'name', 'email', 'phone', 'need', 'summary'],
    },
  },
];

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const str = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);
const list = (v: unknown, n: number, max: number) => (Array.isArray(v) ? v : []).map((x) => str(x, max)).filter(Boolean).slice(0, n);

/** An address B may write to: valid, and typed by the visitor themselves. */
function typedEmail(v: unknown, turns: Turn[]) {
  const email = str(v, 200).toLowerCase();
  if (!EMAIL.test(email)) return null;
  return turns.some((m) => m.role === 'user' && m.text.toLowerCase().includes(email)) ? email : null;
}

/** Visitor emails per conversation source, so the tools can't be used to spam. */
const sent = new Map<string, number[]>();
function allowSend(ip: string) {
  const now = Date.now();
  const hits = (sent.get(ip) ?? []).filter((t) => now - t < 60 * 60_000);
  if (hits.length >= 6) return false;
  hits.push(now);
  sent.set(ip, hits);
  return true;
}

const booked = new Set<string>();

function briefHtml(b: Brief, first: string) {
  const li = (xs: string[]) => xs.map((x) => `<li style="margin:0 0 6px">${esc(x)}</li>`).join('');
  return shell(`${first ? `<p>Hi ${esc(first)},</p><p>As promised, here's your brief.</p>` : ''}
<div style="border-radius:16px;border:1px solid #e7e2f3;overflow:hidden">
<div style="padding:22px 24px;background:#17141f;color:#fff"><p style="margin:0;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#b794ff">BYBO brief</p><h2 style="margin:6px 0 4px;font-size:22px">${esc(b.title)}</h2><p style="margin:0;color:#ffffffb0;font-size:14px">${esc(b.business)}</p></div>
<div style="padding:20px 24px">
<h3 style="font-size:15px;margin:0 0 6px">The problem</h3><p style="margin:0 0 16px">${esc(b.problem)}</p>
<h3 style="font-size:15px;margin:0 0 6px">Goals</h3><ul style="margin:0 0 16px;padding-left:18px">${li(b.goals)}</ul>
<h3 style="font-size:15px;margin:0 0 6px">What we'd build</h3><p style="margin:0 0 12px">${esc(b.solution)}</p>
<ol style="margin:0 0 16px;padding-left:18px">${b.steps.map((s) => `<li style="margin:0 0 6px"><b>${esc(s.step)}</b>: ${esc(s.detail)}</li>`).join('')}</ol>
<h3 style="font-size:15px;margin:0 0 6px">What you get</h3><ul style="margin:0 0 16px;padding-left:18px">${li(b.deliverables)}</ul>
<p style="margin:0;padding:14px 16px;border-radius:12px;background:#f1ecff"><b>Next step:</b> ${esc(b.next_step)}</p>
</div></div>
<p style="font-size:13px;color:#6b6578">Price and timing are set in a written Blueprint before any paid work. Reply to this email to pick a time.</p>`);
}

export async function runTool(name: string, input: Record<string, unknown>, ctx: ToolContext): Promise<ToolOutcome> {
  if (name === 'create_brief') {
    const brief: Brief = {
      title: str(input.title, 120), business: str(input.business, 200), problem: str(input.problem, 600),
      goals: list(input.goals, 4, 200), solution: str(input.solution, 600),
      steps: (Array.isArray(input.steps) ? input.steps : []).slice(0, 5).map((s: Record<string, unknown>) => ({ step: str(s?.step, 60), detail: str(s?.detail, 200) })).filter((s) => s.step),
      deliverables: list(input.deliverables, 5, 200), next_step: str(input.next_step, 240),
    };
    if (!brief.title || !brief.solution) return { result: 'The brief needs a title and a solution.' };
    const email = typedEmail(input.email, ctx.turns);
    if (!email) return { brief, result: 'Brief shown in the chat. To email it, ask for their email.' };
    if (!allowSend(ctx.ip)) return { brief, result: 'Brief shown. Email limit reached for now; the team will follow up.' };
    const first = str(input.name, 120).split(' ')[0];
    const ok = await sendMail({ to: [email], reply_to: 'support@bybo.in', subject: `Your BYBO brief: ${brief.title}`, html: briefHtml(brief, first) });
    if (ok) await toTeam({ reply_to: email, subject: `Brief sent to ${email}: ${brief.title}`, html: briefHtml(brief, '') + shell(`<h3>Conversation</h3>${transcriptHtml(ctx.turns, str(input.name, 120))}`) });
    return ok ? { brief, action: `Brief emailed to ${email}`, result: `Brief shown and emailed to ${email}. Now close for the call.` } : { brief, result: 'Brief shown; email failed. Offer to resend.' };
  }

  if (name === 'send_summary') {
    const email = typedEmail(input.email, ctx.turns);
    if (!email) return { result: 'Ask for their email first; only send to an address they typed.' };
    if (!allowSend(ctx.ip)) return { result: 'Email limit reached for now.' };
    const nm = str(input.name, 120), summary = str(input.summary, 1200), steps = list(input.next_steps, 5, 200);
    const html = shell(`<p>Hi ${esc(nm.split(' ')[0] || 'there')},</p><p>${esc(summary)}</p><h3 style="font-size:15px">Next steps</h3><ol>${steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol><p>Reply to this email any time.</p>`);
    const ok = await sendMail({ to: [email], reply_to: 'support@bybo.in', subject: 'Your BYBO conversation, summarised', html, text: `${summary}\n\nNext steps:\n${steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}` });
    if (ok) await toTeam({ reply_to: email, subject: `Summary sent to ${nm || email}`, html: html + shell(`<h3>Conversation</h3>${transcriptHtml(ctx.turns, nm)}`) });
    return ok ? { action: `Summary emailed to ${email}`, result: `Summary emailed to ${email}.` } : { result: 'Summary email failed.' };
  }

  if (name === 'alert_team') {
    const t = str(input.temperature, 10) === 'hot' ? 'HOT' : 'WARM';
    const nm = str(input.name, 120);
    const rows: [string, string][] = [['Name', nm], ['Email', str(input.email, 200)], ['Phone', str(input.phone, 30)], ['Company', str(input.company, 160)], ['Needs', str(input.need, 300)], ['Page', ctx.page]].filter(([, v]) => v) as [string, string][];
    const html = shell(`<p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:${t === 'HOT' ? '#d9480f' : '#6d3df5'};margin:0">${t} lead from B</p><h2 style="margin:6px 0 12px">${esc(nm || str(input.need, 120))}</h2>
<table style="font-size:14px">${rows.map(([k, v]) => `<tr><td style="padding:3px 14px 3px 0;color:#6b6578">${k}</td><td><b>${esc(v)}</b></td></tr>`).join('')}</table>
<p><b>Summary:</b> ${esc(str(input.summary, 1200))}</p>${input.recommended ? `<p><b>B recommends:</b> ${esc(str(input.recommended, 600))}</p>` : ''}
<h3 style="font-size:15px">Conversation</h3>${transcriptHtml(ctx.turns, nm)}`);
    const email = str(input.email, 200);
    const ok = await toTeam({ ...(EMAIL.test(email) ? { reply_to: email } : {}), subject: `${t} lead: ${nm || 'website visitor'} · ${str(input.need, 80)}`, html, text: transcriptText(ctx.turns, nm) });
    return { result: ok ? 'Team alerted; a person will follow up. Keep going and close for the call.' : 'Alert failed; carry on.' };
  }

  if (name === 'book_call') {
    const slot = findSlot(str(input.slot, 40));
    const email = str(input.email, 200), phone = str(input.phone, 30), nm = str(input.name, 120);
    if (!slot) return { result: 'That slot is no longer available. Offer other slots from AVAILABLE SLOTS.' };
    if (!nm || !EMAIL.test(email)) return { result: 'Missing a name or a valid email. Ask for it, then book again.' };
    if (phone.replace(/\D/g, '').length < 8) return { result: 'Missing a valid phone number. Ask for it, then book again.' };
    const id = `${email.toLowerCase()}|${slot.id}`;
    if (booked.has(id)) return { booked: slot.label, result: `Already booked for ${slot.label}.` };
    const ok = await sendBooking({ slot: slot.id, name: nm, email, phone, company: str(input.company, 160), need: str(input.need, 300), summary: str(input.summary, 600), page: ctx.page, transcript: ctx.turns });
    if (!ok) return { result: 'Booking could not be saved right now. Apologise, alert_team, and offer WhatsApp +91 63643 54899.' };
    booked.add(id);
    return { booked: slot.label, action: `Call booked · ${slot.label}`, result: `Booked for ${slot.label}. Confirmation with a calendar invite sent to ${email}.` };
  }

  return { result: 'Unknown tool.' };
}
