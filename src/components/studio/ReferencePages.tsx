import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, AlertCircle, FileText, SlidersHorizontal, UserRound, GitBranch, IndianRupee, ChartNoAxesColumnIncreasing, Settings, CalendarDays, Folder, Users, Clock, RefreshCw, Coins } from 'lucide-react';
import { Button } from './Shared';
import { DocumentDemo } from './DocumentDemo';
import './reference-pages.css';

const documentHref = '/apply?system=document-multimodal-intelligence';

export function ReferenceHero({ page, title, body, art, label, href, cta, secondary }: { page: string; title: string; body: string; art: string; label?: string; href: string; cta: string; secondary?: boolean }) {
  return <section className="rp-hero">
    <Image src={`/images/${art}.webp`} alt="" fill priority sizes="100vw" className="rp-hero-image" />
    <div className="container">
      <nav className="rp-crumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">›</span><span>{page}</span></nav>
      <div className="rp-hero-copy">{label && <p className="eyebrow">{label}</p>}<h1>{title}</h1><p className="lede">{body}</p><div className="actions"><Button href={href}>{cta}</Button>{secondary && <Link href="#workflow" className="rp-secondary">See how it works</Link>}</div></div>
    </div>
  </section>;
}

const patterns = [
  { id: 'enquiries', title: 'Enquiry desk', body: 'Keep a promising enquiry from becoming a missed opportunity.', path: 'Capture → Qualify → Respond → Record → Follow up', gate: 'Sensitive replies wait for your team.', service: 'Customer & Workforce AI', slug: 'customer-workforce-ai' },
  { id: 'documents', title: 'Document desk', body: 'Get documents through without repeated typing.', path: 'Receive → Read → Check → Review → Post', gate: 'Unusual records go to a reviewer.', service: 'Business Operations', slug: 'document-multimodal-intelligence' },
  { id: 'operations', title: 'Back-office path', body: 'Stop the same request bouncing between teams.', path: 'Capture → Route → Act → Approve → Close', gate: 'Commitments need approval.', service: 'Agentic Operations', slug: 'agentic-operations' },
  { id: 'knowledge', title: 'Internal answers', body: 'Find the answer without waiting for one person.', path: 'Ask → Retrieve → Check → Cite → Answer', gate: 'Missing evidence stays visible.', service: 'Enterprise Knowledge', slug: 'enterprise-knowledge-systems' },
  { id: 'reports', title: 'Numbers pack', body: 'Give the team a shared basis for decisions.', path: 'Collect → Reconcile → Refresh → Explain → Review', gate: 'People own the decision.', service: 'Decision Intelligence', slug: 'decision-intelligence' },
  { id: 'specific', title: 'A path for your work', body: 'Bring the process that does not fit a category.', path: 'We map it with your team before deciding what to build.', gate: '', service: 'Custom AI Platforms', slug: 'custom-ai-platforms' },
];

export function ReferenceSolutions({ children }: { children?: React.ReactNode }) {
  return <div className="reference-page rp-solutions">
    <ReferenceHero page="Solutions" title="Start with the work you want off your plate." body="Explore practical starting points. We shape each system around your rules, records and team." art="solutions-hero" href="/apply" cta="Discuss your workflow" />
    <section className="rp-light rp-patterns"><div className="container"><h2>Which problem sounds familiar?</h2><div className="rp-pattern-list">{patterns.map((p, i) => <article className="rp-pattern" key={p.id} id={p.id}>
      <span className="rp-number">0{i + 1}</span><div role="img" aria-label={p.title} className={`rp-object rp-object-${i}`} />
      <div className="rp-pattern-copy"><h3>{p.title}</h3><p>{p.body}</p><p className="rp-path">{p.path}</p>{p.gate && <p className="rp-gate"><AlertCircle size={16} />{p.gate}</p>}</div>
      <Link className="rp-pattern-link" href={`/systems/${p.slug}`}>{p.service}<ArrowRight size={20} /></Link>
    </article>)}</div><p className="rp-website-line" id="websites">Building your brand’s digital home? <Link href="/systems/website-design-development">Explore Website Design & Development <ArrowRight size={17} /></Link></p></div></section>
    <section className="rp-lands"><div className="container"><h2>What lands with your team</h2><div className="rp-three">{[{Icon: FileText, text:'A working system'}, {Icon:SlidersHorizontal,text:'Clear operating rules'}, {Icon:UserRound,text:'A named owner'}].map(({Icon,text}) => <div key={text}><Icon size={53} strokeWidth={1.3}/><h3>{text}</h3></div>)}</div></div></section>
    <section className="rp-underneath rp-light"><div className="rp-book-scene"><Image src="/images/reference-closing.webp" alt="Books and a violet glass sphere" fill sizes="50vw" /></div><div><h2>Want to understand<br />what sits underneath?</h2><Button href="/systems">Explore all seven systems</Button></div></section>
    {children}<section className="rp-final"><div className="container"><h2>Tell us what keeps<br />coming back.</h2><Button href="/apply">Talk to BYBO</Button></div></section>
  </div>;
}

const deliverables = [
  {Icon:GitBranch,title:'Workflow map',body:'See the real handoffs and waiting points.'},
  {Icon:IndianRupee,title:'Cost baseline',body:'Understand the work in time and rupees.'},
  {Icon:ChartNoAxesColumnIncreasing,title:'Opportunity ranking',body:'Compare value, readiness and risk.'},
  {Icon:FileText,title:'Readiness review',body:'Surface access, data and process gaps.'},
  {Icon:Settings,title:'Build recommendation',body:'Decide what to automate or leave alone.'},
  {Icon:CalendarDays,title:'90-day roadmap',body:'Agree the sequence, ownership and measures.'},
];

export function ReferenceBlueprint() {
  return <div className="reference-page rp-blueprint">
    <ReferenceHero page="Blueprint" label="The AI Opportunity Blueprint" title="Know what is worth building." body="A focused paid diagnostic that turns recurring work into a practical decision and a delivery plan." art="blueprint-hero" href="/apply?interest=blueprint" cta="Discuss a Blueprint" />
    <section className="rp-light rp-section"><div className="container"><p className="eyebrow">Our offer</p><h2>Choose the depth<br />your business needs.</h2><div className="rp-offers">
      <Link className="rp-offer" href="/apply?interest=blueprint&scope=workflow"><Image src="/images/reference-blueprint.webp" alt="A focused plan in a notebook" width={600} height={550}/><div><h3>One workflow</h3><p>72-hour fast track</p><ArrowRight aria-label="Discuss one workflow" /></div></Link>
      <Link className="rp-offer" href="/apply?interest=blueprint&scope=function"><Image src="/images/reference-build.webp" alt="Tools, logic and data brought together" width={600} height={550}/><div><h3>A full function</h3><p>3–10 working days</p><ArrowRight aria-label="Discuss a full function" /></div></Link>
    </div><p className="rp-fine">Scope and fee agreed before we begin.</p></div></section>
    <section className="rp-section" id="deliverables"><div className="container"><p className="eyebrow">Deliverables</p><h2>A plan your team can act on.</h2><div className="rp-deliverables">{deliverables.map(({Icon,title,body})=><article key={title}><span className="rp-icon"><Icon size={35} strokeWidth={1.5}/></span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div></div></section>
    <section className="rp-investment"><Image src="/images/blueprint-investment.webp" alt="BYBO plan bound in a black notebook" fill sizes="100vw"/><div className="container"><div><p className="eyebrow">The investment</p><h2>Pay for the thinking.<br />Keep the plan.</h2><p className="lede">The fee is quoted after scoping and credited against implementation if we proceed. You can use the plan without committing to a build.</p></div></div></section>
    <section className="rp-light rp-section rp-bring"><div className="container"><p className="eyebrow">Getting started</p><h2>Bring the work as it is.</h2><div className="rp-three">{[{Icon:FileText,text:'A recurring process'},{Icon:Folder,text:'A few representative examples'},{Icon:Users,text:'Someone who knows the exceptions'}].map(({Icon,text})=><div key={text}><span className="rp-icon"><Icon size={34} strokeWidth={1.5}/></span><p>{text}</p></div>)}</div></div></section>
    <section className="rp-final"><div className="container"><h2>Start with a clear decision.</h2><Button href="/apply?interest=blueprint">Talk to BYBO</Button></div></section>
  </div>;
}

const questions = [
  ['Do the documents need to be perfect?', 'Bring representative files, including the awkward ones. We use them to establish the rules and limits.'],
  ['What types of documents can you handle?', 'Invoices, purchase orders, delivery records and customer files are practical starting points. We test your actual layouts, file types and scans before agreeing the scope.'],
  ['How do you set up the rules?', 'We map the required fields, matching records and approval limits with your process owner. Your team reviews the checks before the system goes live.'],
  ['Who reviews the exceptions?', 'A person you nominate. The reviewer sees the original file, the mismatch and the proposed next step before deciding what happens next.'],
];

export function ReferenceDocuments({ children }: { children?: React.ReactNode }) {
  return <div className="reference-page rp-documents">
    <ReferenceHero page="Business Operations › Document Multimodal Intelligence" label="Business operations" title="Let documents move. Let people decide." body="We turn incoming documents into checked records, with clear review steps for the exceptions." art="document-hero" href={documentHref} cta="Discuss this system" secondary />
    <DocumentDemo />
    <section className="rp-section rp-outcomes"><div className="container"><h2>What changes for your team</h2><div className="rp-three">{['Less repeated entry','Fewer avoidable corrections','A traceable document trail'].map((text,i)=><div key={text}><div className={`rp-outcome-art rp-outcome-${i}`} role="img" aria-label={text}/><h3>{text}</h3></div>)}</div></div></section>
    <section className="rp-light rp-section rp-measures"><div className="container"><h2>Measure it against your current process.</h2><div className="rp-four">{[{Icon:Clock,text:'Processing time'},{Icon:FileText,text:'Review rate'},{Icon:RefreshCw,text:'Rework'},{Icon:Coins,text:'Cost per document'}].map(({Icon,text})=><div key={text}><span className="rp-icon"><Icon size={31} strokeWidth={1.5}/></span><h3>{text}</h3></div>)}</div><p>Baseline first. Review after launch.</p></div></section>
    <section className="rp-light rp-section rp-questions"><div className="container"><h2>A question worth asking.</h2>{questions.map(([q,a],i)=><details key={q} open={i===0}><summary>{q}<span aria-hidden="true">⌄</span></summary><p>{a}</p></details>)}</div></section>
    {children}<section className="rp-final rp-document-final"><div className="container"><div><h2>Bring us the document<br />your team keeps retyping.</h2><div className="actions"><Button href={documentHref}>Talk to BYBO</Button><Link href="/blueprint" className="rp-secondary">Explore the Blueprint</Link></div></div><Image src="/images/reference-before.webp" alt="Paperwork ready for a simpler process" width={600} height={500}/></div></section>
  </div>;
}
