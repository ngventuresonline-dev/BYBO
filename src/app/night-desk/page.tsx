import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { ChatButton } from './ChatButton';
import './night-desk.css';

export const metadata = pageMetadata({
  title: 'The Night Desk: a lead response system',
  description: 'The exact flow from our LEADS reel: reply to every enquiry in seconds, ask three questions, book a slot and hand a warm lead to your team with the full chat.',
  path: '/night-desk',
});

const FLOW = [
  ['Message lands', 'DM, WhatsApp, form or ad, any hour'],
  ['AI replies', 'In seconds, in your brand voice'],
  ['Asks 3 questions', 'Need, time, budget'],
  ['Slot booked', 'A real time from your calendar'],
  ['Hands to your team', 'Summary and the full chat'],
];

const STACK = [
  ['Channels', 'Where enquiries arrive', 'Instagram DMs, WhatsApp Business, website form, Meta lead ads'],
  ['Unified inbox', 'Every message in one place, one thread per person', 'A WhatsApp Business API provider, ManyChat for Instagram, or a custom inbox'],
  ['AI agent', 'Replies, asks the 3 questions, offers slots, follows the handover rules', 'An LLM with the prompt below, connected through the inbox'],
  ['Calendar', 'Real free slots and the booking itself', 'Google Calendar, Calendly, Zoho Bookings or your own system'],
  ['Lead record', 'One row per lead: name, need, time, budget, score, status, chat link', 'Google Sheets to start, then a CRM'],
  ['Alerts', 'Tells the right person a hot lead is ready', 'A WhatsApp or Slack message, plus a morning digest'],
];

const SCRIPTS = [
  ['First reply', 'Hi [name]! Thanks for messaging [Business]. Yes, we can help with that. What are you looking for?'],
  ['Question 1: need', 'Got it. Is this for [option A], [option B], or something else?'],
  ['Question 2: time', 'Perfect. When suits you best, mornings, afternoons or evenings?'],
  ['Question 3: budget', 'And roughly what budget are you working with: [range 1], [range 2] or [range 3]?'],
  ['Slot offer', 'I have tomorrow at 10 am or 4 pm. Which works better?'],
  ['Confirmation', "Done! You're booked for [day], [time] at [place or link]. [Salesperson] will meet you and has the full chat."],
  ['Reminder', 'Hi [name], quick reminder: [time] today with [salesperson]. Reply here if you need to move it.'],
  ['Handover', "I'm passing this to [name] now, they'll reply here shortly."],
];

const SCORES = [
  ['Hot', 'Clear need you offer, wants a slot within 3 days, budget fits', 'Book now. Alert the salesperson instantly.'],
  ['Warm', 'Clear need, but later timing or budget unsure', 'Offer a slot anyway. Morning digest. Follow-ups start.'],
  ['Cold', 'Browsing, price-checking only, or not a fit', 'Answer politely, share a useful link. No sales call.'],
  ['Human now', 'Any handover trigger below', 'AI stops. Owner alerted with the chat.'],
];

const FOLLOWUPS = [
  ['2 hours later', 'No reply to a question', 'Hi [name], still keen on [need]? I can hold [slot] for you.'],
  ['Next day', 'Still no reply', 'Quick one: want me to send a couple of times for this week?'],
  ['Day 4', 'Still no reply', "No worries if now's not the time. Reply anytime and we'll pick it up. Then stop."],
  ['15 min after a missed slot', 'No-show', 'Hi [name], we missed you today. Want to pick a new time?'],
];

const SETUP = [
  ['Day 1', "Pick your busiest channel. Count last month's enquiries and how many got no reply within an hour."],
  ['Day 2', 'Write your business facts: services, hours, location, booking rules, and what price guidance the AI may share.'],
  ['Day 3', 'Connect the channel to one inbox. Create the lead sheet: date, name, phone, source, need, time, budget, score, slot, status, chat link.'],
  ['Day 4', 'Connect the calendar with real availability. Set slot length and buffer.'],
  ['Day 5', 'Load the prompt and scripts. Fill every [bracket].'],
  ['Day 6', 'Test 20 chats yourself: easy bookings, hagglers, angry customers, other languages, "are you a bot?". Fix anything off.'],
  ['Day 7', 'Go live after hours only. Review every chat each morning for a week, then switch on 24/7.'],
];

const METRICS = [
  ['First reply time', 'Median seconds from enquiry to first reply'],
  ['Reply coverage', 'Share of enquiries answered, nights and Sundays included'],
  ['Qualified rate', 'Share of leads that answered all 3 questions'],
  ['Booking rate', 'Share of qualified leads that booked a slot'],
  ['Show rate', 'Share of booked slots that turned up'],
  ['Handover rate', 'Share of chats passed to a person, and why'],
];

const BRIEF = `/apply?interest=${encodeURIComponent('AI systems')}&message=${encodeURIComponent('I want the Night Desk lead response system for my business. Our leads come from: ')}`;

function Cta({ compact }: { compact?: boolean }) {
  return (
    <section className={compact ? 'nd-cta is-compact' : 'nd-cta'}>
      <p className="nd-cta-kick">Done for you</p>
      <h2>{compact ? 'Rather have it built for you?' : 'Want your Night Desk built and running?'}</h2>
      <p>We connect your channels, train the agent on your business, wire your calendar and CRM, and keep a person in the loop from day one. Tell us where your leads come from and we&apos;ll map your flow with you. The first conversation is free.</p>
      <div className="nd-cta-row">
        <ChatButton className="nd-btn" />
        <Link className="nd-btn is-ghost" href={BRIEF}>Send a 2-minute brief</Link>
      </div>
    </section>
  );
}

const PROMPT = `You are the Night Desk for [Business name], a [type of business] in [city].
You reply to new enquiries on Instagram, WhatsApp and the website when the team is offline or busy.

YOUR GOAL
Reply fast, find out what the person needs, book them into a real slot, and hand them to [salesperson name] with a clean summary.

HOW YOU WRITE
- Short messages, 1 to 3 lines. Warm, plain, human. No jargon.
- Reply in the language the person used (English, Hindi, Hinglish, [others]).
- Use their first name once you know it.
- One question per message. Never send a list of questions.
- Never pretend to be a person. If asked, say you're [Business name]'s assistant and a team member will take over.

THE FLOW
1. Greet them and answer what they asked, if the answer is in BUSINESS FACTS.
2. Ask the 3 questions, one at a time:
   a. What do you need? (service or product)
   b. When suits you? (day and time)
   c. What budget range are you working with? Offer: [range 1], [range 2], [range 3].
3. Offer two real slots from the calendar tool. Never invent a slot.
4. When they pick one, book it and confirm: day, time, place or link, and who they'll meet.
5. Tell them [salesperson name] will see the full chat and follow up.
6. Save the lead: name, phone, need, preferred time, budget range, score, booked slot, 2-line summary.

BUSINESS FACTS (the only facts you may state)
- Services: [list]
- Hours and location: [details]
- Price guidance you may share: [only what the owner approves, or "pricing is shared on the call"]
- Booking rules: [slot length, notice needed, cancellation rule]

NEVER
- Quote a price, discount or delivery date that is not in BUSINESS FACTS.
- Promise results, guarantees or anything about refunds.
- Collect card numbers, bank details, passwords or ID documents.
- Give medical, legal or financial advice.
- Argue. If someone is upset, apologise once and hand over.

HAND OVER TO A PERSON IMMEDIATELY WHEN
- They ask for a human, a call, or the owner.
- They want to negotiate price, ask for a custom quote, or mention a large order.
- They complain, are angry, or mention a past bad experience.
- The question isn't covered by BUSINESS FACTS.
- You are unsure. When unsure, hand over.
When handing over, say: "I'm passing this to [name] now, they'll reply here shortly." Then alert the team.`;

const HANDOVER = `NEW LEAD · HOT · booked
Name: Priya S. · +91 98xxx xxxxx · came from: Instagram ad
Needs: hair spa for two
When: tomorrow, 10:00 am (booked)
Budget: mid range
Summary: First-time client, asked about parking. Prefers WhatsApp.
Full chat: [link]`;

export default function NightDesk() {
  return (
    <main className="nd">
      <header className="nd-hero">
        <p className="nd-kick">Free system · from our LEADS reel</p>
        <h1>The Night Desk <em>flow.</em></h1>
        <p className="nd-lede">Answer every enquiry in seconds, even at 11 pm. Ask three questions, book a slot, and hand your team a warm lead with the full chat in the morning.</p>
        <nav className="nd-jump" aria-label="On this page">
          <a href="#flow">The flow</a><a href="#stack">Stack</a><a href="#prompt">AI prompt</a><a href="#scripts">Scripts</a><a href="#scoring">Scoring</a><a href="#handover">Handover rules</a><a href="#setup">7-day setup</a>
        </nav>
      </header>

      <section id="flow" className="nd-sec">
        <h2>The flow</h2>
        <p className="nd-p">One chat, five stages. Whoever answers first usually gets the deal, so the reply never clocks out, and a person always takes over before money or promises change hands.</p>
        <ol className="nd-flow">
          {FLOW.map(([t, d], i) => (
            <li key={t} className={i === FLOW.length - 1 ? 'is-end' : undefined}><b>{i + 1}</b><span><strong>{t}</strong>{d}</span></li>
          ))}
        </ol>
        <div className="nd-side">
          <p><strong>No reply?</strong> Three gentle follow-ups, then stop.</p>
          <p><strong>Handover trigger?</strong> The AI stops and a person takes over straight away.</p>
        </div>
      </section>

      <Cta compact />

      <section id="stack" className="nd-sec">
        <h2>Components and stack</h2>
        <p className="nd-p">Six parts. Any tool that does the job works; these are common choices, not requirements.</p>
        <div className="nd-table-wrap">
          <table className="nd-table">
            <thead><tr><th>Part</th><th>Job</th><th>Common tools</th></tr></thead>
            <tbody>{STACK.map(([a, b, c]) => <tr key={a}><td><strong>{a}</strong></td><td>{b}</td><td>{c}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="nd-note">Start simple: one channel, Google Sheets and Google Calendar. Add channels once the first runs clean for two weeks.</p>
      </section>

      <section id="prompt" className="nd-sec">
        <h2>The AI agent prompt</h2>
        <p className="nd-p">Copy this into your AI agent. Replace everything in [brackets] with your business details before going live.</p>
        <pre className="nd-code"><code>{PROMPT}</code></pre>
      </section>

      <section id="scripts" className="nd-sec">
        <h2>Message scripts</h2>
        <p className="nd-p">One message each. Adapt the words to your brand voice; keep one question per message.</p>
        <div className="nd-scripts">
          {SCRIPTS.map(([k, v]) => <div key={k}><span>{k}</span><p>{v}</p></div>)}
        </div>
        <p className="nd-p" style={{ marginTop: 28 }}>The note your salesperson receives:</p>
        <pre className="nd-code is-small"><code>{HANDOVER}</code></pre>
      </section>

      <section id="scoring" className="nd-sec">
        <h2>Lead scoring and routing</h2>
        <p className="nd-p">Every lead is scored from the three answers, so your team calls the hottest first.</p>
        <div className="nd-table-wrap">
          <table className="nd-table">
            <thead><tr><th>Score</th><th>Rule</th><th>What happens</th></tr></thead>
            <tbody>{SCORES.map(([a, b, c]) => <tr key={a}><td><strong>{a}</strong></td><td>{b}</td><td>{c}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="nd-note">Route by service, branch or deal size with a simple rule in the lead sheet. The agent only fills the fields.</p>
      </section>

      <section id="handover" className="nd-sec">
        <h2>When the AI stops and a person takes over</h2>
        <p className="nd-p">The rule for when to stay quiet matters more than how smart the AI is. Hand over the moment any of these happen:</p>
        <ul className="nd-list">
          <li>They ask for a person, a call or the owner.</li>
          <li>Money moves: negotiation, discounts, custom quotes, large orders, payment issues.</li>
          <li>Emotion: a complaint, anger, a bad past experience, an urgent problem.</li>
          <li>The question isn&apos;t in the approved business facts.</li>
          <li>Anything medical, legal, financial or safety-related.</li>
          <li>The agent is unsure.</li>
        </ul>
        <h3 className="nd-h3">Follow-ups</h3>
        <div className="nd-table-wrap">
          <table className="nd-table">
            <thead><tr><th>When</th><th>If</th><th>Message</th></tr></thead>
            <tbody>{FOLLOWUPS.map(([a, b, c]) => <tr key={a}><td><strong>{a}</strong></td><td>{b}</td><td>{c}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="nd-note">On WhatsApp, messages after 24 hours of silence need an approved template. Stop the moment someone says no.</p>
      </section>

      <section id="setup" className="nd-sec">
        <h2>Set it up in 7 days</h2>
        <ol className="nd-days">{SETUP.map(([d, t]) => <li key={d}><b>{d}</b><span>{t}</span></li>)}</ol>
        <h3 className="nd-h3">Track every week</h3>
        <div className="nd-metrics">{METRICS.map(([a, b]) => <div key={a}><strong>{a}</strong><span>{b}</span></div>)}</div>
      </section>

      <Cta />
    </main>
  );
}
