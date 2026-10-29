'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { CONTACT } from '@/lib/site';
import './bybo-ai.css';

/**
 * BYBO AI on every page. The agent itself runs in /api/bybo-ai; this is the
 * launcher and the conversation. Any element can open it with a starting
 * message: window.dispatchEvent(new CustomEvent('bybo-ai:open', { detail: { prompt } })).
 */

type Turn = { role: 'user' | 'assistant'; text: string };
type Slot = { id: string; label: string };
/** Guided mode: when the model is unreachable, BYBO AI still qualifies and books. */
type Guide = { step: 'business' | 'name' | 'email' | 'phone' | 'slot' | 'done'; need: string; company?: string; name?: string; email?: string; phone?: string; slots?: Slot[] };

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** The launcher's B: the logo's letterform in the brand gradient. */
function GlowB() {
  return (
    <svg className="bai-glow-b" width="20" height="20" viewBox="-8 4 144 144" aria-hidden="true">
      <defs>
        <linearGradient id="bai-grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset=".6" stopColor="#f1eaff" /><stop offset="1" stopColor="#ffd2bd" /></linearGradient>
      </defs>
      <rect x="4" y="4" width="26" height="144" rx="8" fill="url(#bai-grad)" />
      <path d="M44 4H84a34 34 0 0 1 0 68H44Z" fill="url(#bai-grad)" />
      <path d="M44 80H90a34 34 0 0 1 0 68H44Z" fill="url(#bai-grad)" />
    </svg>
  );
}

/** The B from the BYBO logo. */
function Mark({ size = 36 }: { size?: number }) {
  return (
    <svg className="bai-b" width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="16" fill="#111116" />
      <g transform="translate(9.25 7.5) scale(0.112)"><rect x="4" y="4" width="26" height="144" rx="8" fill="#f5f4f0" /><path d="M44 4H84a34 34 0 0 1 0 68H44Z" fill="#f5f4f0" /><path d="M44 80H90a34 34 0 0 1 0 68H44Z" fill="#b794ff" /></g>
    </svg>
  );
}

const GREETING = "Hi, I'm BYBO AI. We build AI systems, websites, apps and films around how your business works. What would you like to improve?";
const STARTERS = ['Answer my leads 24/7', 'Automate a workflow', 'Build a website', 'Book a call'];
const KEY = 'bybo-ai:v1';

export function ByboAI() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Restored from this tab's session; only rendered once the panel opens, so
  // the server's empty first paint still matches.
  const [saved] = useState<{ turns?: Turn[]; booked?: string } | null>(() => {
    if (typeof window === 'undefined') return null;
    try { return JSON.parse(sessionStorage.getItem(KEY) || 'null'); } catch { return null; }
  });
  const [turns, setTurns] = useState<Turn[]>(() => (Array.isArray(saved?.turns) ? saved.turns : []));
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [booked, setBooked] = useState<string | null>(() => saved?.booked ?? null);
  const [guide, setGuide] = useState<Guide | null>(null);
  const list = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try { sessionStorage.setItem(KEY, JSON.stringify({ turns, booked })); } catch {}
    list.current?.scrollTo({ top: list.current.scrollHeight, behavior: 'smooth' });
  }, [turns, booked, busy]);

  const say = (next: Turn[], text: string) => setTurns([...next, { role: 'assistant', text }]);

  const book = useCallback(async (g: Guide, slot: Slot, next: Turn[]) => {
    setBusy(true);
    try {
      const res = await fetch('/api/bybo-ai/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...g, slot: slot.id, page: window.location.pathname, transcript: next }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setGuide({ ...g, step: 'done' });
        setBooked(data.booked);
        say(next, `Done, ${g.name?.split(' ')[0]}. You're booked for ${data.booked}. A confirmation with the calendar invite is on its way to ${g.email}, and the team will call you on ${g.phone}.`);
      } else if (data.reason === 'slot_taken') {
        say(next, 'That time just went. Pick another one below.');
      } else {
        say(next, `I couldn't save that just now. Tap a time again, or WhatsApp ${CONTACT.phone} and we'll book it for you.`);
      }
    } catch {
      say(next, 'Connection dropped. Tap the time again.');
    } finally {
      setBusy(false);
    }
  }, []);

  const guided = useCallback(async (g: Guide, t: string, next: Turn[]) => {
    if (g.step === 'business') { setGuide({ ...g, company: t, step: 'name' }); return say(next, 'Thanks. What should we call you?'); }
    if (g.step === 'name') { setGuide({ ...g, name: t, step: 'email' }); return say(next, `Nice to meet you, ${t.split(' ')[0]}. What's your email? We'll send the confirmation there.`); }
    if (g.step === 'email') {
      if (!EMAIL.test(t)) return say(next, "That email doesn't look right. Could you type it again?");
      setGuide({ ...g, email: t, step: 'phone' }); return say(next, 'And your phone number, WhatsApp if possible?');
    }
    if (g.step === 'phone') {
      if (t.replace(/\D/g, '').length < 8) return say(next, 'Could you share the full number, with country code if outside India?');
      const res = await fetch('/api/bybo-ai/book').then((r) => r.json()).catch(() => null);
      const slots: Slot[] = (res?.slots ?? []).slice(0, 6);
      setGuide({ ...g, phone: t, step: 'slot', slots });
      return say(next, slots.length ? 'Pick a time for a free 30-minute call with the team (IST):' : `No open times this week. Email ${CONTACT.email} and we'll fit you in.`);
    }
    if (g.step === 'slot') return say(next, 'Tap one of the times below to book it.');
    return say(next, `You're all set. Anything else, reply to the confirmation email or WhatsApp ${CONTACT.phone}.`);
  }, []);

  // The model is unreachable: carry on as a guided booking, never a dead end.
  const startGuide = useCallback((next: Turn[], t: string) => {
    setGuide({ step: 'business', need: next.filter((m) => m.role === 'user').map((m) => m.text).join(' · ').slice(0, 300) || t });
    say(next, "Happy to help with that. Let's get you a free 30-minute call with the team so they can map it with you. What's your business called, and what does it do?");
  }, []);

  const send = useCallback(async (text: string) => {
    const t = text.trim();
    if (!t || busy) return;
    const next = [...turns, { role: 'user' as const, text: t }];
    setTurns(next);
    setDraft('');
    if (guide) return void guided(guide, t, next);
    setBusy(true);
    try {
      const res = await fetch('/api/bybo-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, page: window.location.pathname }),
      });
      const data = await res.json().catch(() => ({}));
      if (data.reason === 'rate_limited') {
        say(next, "You're sending messages quickly. Give it a minute and try again.");
      } else if (!res.ok || !data.ok) {
        startGuide(next, t);
      } else {
        setTurns([...next, { role: 'assistant', text: data.reply }]);
        if (data.booked) setBooked(data.booked);
      }
    } catch {
      startGuide(next, t);
    } finally {
      setBusy(false);
      input.current?.focus();
    }
  }, [busy, turns, guide, guided, startGuide]);


  useEffect(() => {
    const onOpen = (e: Event) => {
      setOpen(true);
      const prompt = (e as CustomEvent<{ prompt?: string }>).detail?.prompt;
      if (prompt) void send(prompt);
      else window.setTimeout(() => input.current?.focus(), 50);
    };
    window.addEventListener('bybo-ai:open', onOpen);
    return () => window.removeEventListener('bybo-ai:open', onOpen);
  }, [send]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (pathname?.startsWith('/og')) return null;

  return (
    <div className={open ? 'bai is-open' : 'bai'}>
      {open && (
        <section className="bai-panel" role="dialog" aria-label="BYBO AI">
          <header className="bai-head">
            <Mark />
            <span className="bai-title"><b>BYBO AI</b><small>{busy ? 'Thinking…' : 'Replies in seconds · books calls'}</small></span>
            <button type="button" className="bai-x" onClick={() => setOpen(false)} aria-label="Close BYBO AI">×</button>
          </header>
          <div className="bai-list" ref={list} aria-live="polite">
            <p className="bai-msg is-ai">{GREETING}</p>
            {turns.map((m, i) => <p key={i} className={m.role === 'user' ? 'bai-msg is-me' : 'bai-msg is-ai'}>{m.text}</p>)}
            {busy && <p className="bai-msg is-ai bai-typing" aria-label="BYBO AI is typing"><i /><i /><i /></p>}
            {booked && <p className="bai-booked">Call booked · {booked}. Check your email for the invite.</p>}
            {!turns.length && (
              <div className="bai-starters">
                {STARTERS.map((s) => <button key={s} type="button" onClick={() => void send(s)}>{s}</button>)}
              </div>
            )}
            {guide?.step === 'slot' && !booked && (
              <div className="bai-starters">
                {guide.slots?.map((sl) => <button key={sl.id} type="button" disabled={busy} onClick={() => { const next = [...turns, { role: 'user' as const, text: sl.label }]; setTurns(next); void book(guide, sl, next); }}>{sl.label}</button>)}
              </div>
            )}
          </div>
          <form className="bai-form" onSubmit={(e) => { e.preventDefault(); void send(draft); }}>
            <textarea
              ref={input}
              rows={1}
              value={draft}
              maxLength={1500}
              placeholder="Type your message…"
              aria-label="Message BYBO AI"
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); void send(draft); } }}
            />
            <button type="submit" disabled={busy || !draft.trim()} aria-label="Send">↑</button>
          </form>
          <p className="bai-foot">AI assistant · a person follows up on every booking</p>
        </section>
      )}
      <button type="button" className="bai-launch" onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close BYBO AI' : 'Open BYBO AI'} aria-expanded={open}>
        {open ? <span aria-hidden="true">×</span> : <GlowB />}
      </button>
    </div>
  );
}
