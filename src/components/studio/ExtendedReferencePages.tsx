import Image from 'next/image';
import Link from 'next/link';
import { ChartNoAxesColumnIncreasing, UserRound, FileText, Shield, Database, Users, Clock, CircleHelp, CheckCircle2, TriangleAlert, MousePointer2, Activity } from 'lucide-react';
import { ReferenceHero } from './ReferencePages';
import { Button } from './Shared';
import { ReferenceWorkflow } from './ReferenceWorkflows';
import { ReferenceIndustryList } from './ReferenceIndustries';
import { referenceServices, type ReferenceServiceKey } from './reference-service-data';
import './extended-reference.css';

const faqs={
  'agentic-operations':[
    ['What stops a workflow going too far?','Permitted actions, spending limits and stop conditions are agreed before the system runs.'],
    ['Can it work with our existing tools?','We map your tools and the access they support before scoping the connections. Actions stay within the permissions you agree.'],
    ['How do we decide what to automate?','Start with a recurring workflow, a current baseline and representative cases. The Blueprint helps identify a useful first boundary.'],
  ],
  'custom-ai-platforms':[
    ['What happens after the build?','We can operate the platform, review its performance and adapt it as the business changes.'],
    ['Can we integrate with our existing systems?','Yes, where the systems provide suitable interfaces and agreed access. We assess these connections before committing to the build.'],
    ['Who will use the platform?','The people your workflow serves. We design roles, permissions and the experience around their tasks.'],
    ['How long does it take?','The schedule depends on the workflow, integrations and release criteria. We scope a useful first version and agree the delivery plan with you.'],
  ],
};

export function ExtendedReferenceService({serviceKey,children}:{serviceKey:ReferenceServiceKey;children?:React.ReactNode}){
  const data=referenceServices[serviceKey];
  const isKnowledge=serviceKey==='enterprise-knowledge-systems';
  const href=`/apply?system=${serviceKey}`;
  const icons=isKnowledge?[Clock,FileText,ChartNoAxesColumnIncreasing,CircleHelp]:serviceKey==='agentic-operations'?[Clock,MousePointer2,ChartNoAxesColumnIncreasing,TriangleAlert]:[FileText,Shield,Clock,Activity];
  return <div className={`reference-page xr-service xr-service-${data.art}`}>
    <ReferenceHero page={`Systems › ${data.name}`} label={data.name} title={data.title} body={data.body} art={`${data.art}-hero`} href={href} cta="Discuss this system" secondary/>
    <ReferenceWorkflow serviceKey={serviceKey}/>
    <section className="rp-section rp-outcomes"><div className="container"><h2>What changes for your team</h2><div className="rp-three">{data.outcomes.map((title,i)=><div key={title}><div role="img" aria-label={title} className={`xr-outcome-art xr-outcome-${i}`} style={{backgroundImage:`url('/images/${data.art}-outcomes.webp')`}}/><h3>{title}</h3></div>)}</div></div></section>
    <section className="rp-light rp-section rp-measures"><div className="container"><h2>Measure it against your current process.</h2><div className="rp-four">{data.measures.map((title,i)=>{const Icon=icons[i];return <div key={title}><span className="rp-icon"><Icon size={30} strokeWidth={1.5}/></span><h3>{title}</h3></div>;})}</div><p>Baseline first. Review after launch.</p></div></section>
    {!isKnowledge&&<section className="rp-section xr-faq"><div className="container"><h2>A question<br/>worth asking.</h2><div>{faqs[serviceKey].map(([q,a],i)=><details key={q} open={i===0}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></div></section>}
    {children}<section className={`rp-final xr-service-final ${data.art==='platform'?'xr-purple-final':''}`}><div className="container"><div><h2>{data.closing}</h2><div className="actions"><Button href={href}>Talk to BYBO</Button><Link href="/blueprint" className="rp-secondary">Explore the Blueprint <span aria-hidden="true">→</span></Link></div></div>{data.art!=='platform'&&<div role="img" aria-label={isKnowledge?'Knowledge organised for your team':'A clear operating plan'} className="xr-final-art" style={{backgroundImage:`url('/images/${data.art}-outcomes.webp')`}}/>}</div></section>
  </div>;
}

const methodStages=[
  ['Diagnose','Map the work, establish the baseline and decide what deserves a build.','A scoped Blueprint'],
  ['Build & launch','Connect your tools, test representative cases and train the people who will use it.','A working system with agreed acceptance checks'],
  ['Operate','Monitor quality, resolve failures and keep running costs visible.','Ongoing ownership and review'],
  ['Expand','Use what we learn to choose the next useful workflow.','A considered next step'],
];
export function ReferenceMethod(){
  return <div className="reference-page xr-method"><ReferenceHero page="How we work" title="From a recurring problem to a working system." body="A clear sequence, agreed decisions and ownership that continues after launch." art="method-hero" href="/blueprint" cta="Find your starting point"/>
    <section className="rp-light rp-section"><div className="container"><h2>Know what happens next.</h2><ol className="xr-method-stages">{methodStages.map(([title,body,output],i)=><li key={title}><span className="xr-stage-number">0{i+1}</span><h3>{title}</h3><p>{body}</p><div><span className="eyebrow">Deliverable</span><p>{output}</p></div></li>)}</ol></div></section>
    <section className="rp-section"><div className="container"><h2>Included in the way we work.</h2><div className="xr-included-grid">{[{Icon:ChartNoAxesColumnIncreasing,text:'Baseline measures'},{Icon:UserRound,text:'Named owners'},{Icon:FileText,text:'Approval rules'},{Icon:Shield,text:'Failure handling'},{Icon:Database,text:'Cost visibility'},{Icon:Users,text:'Team training'}].map(({Icon,text})=><div key={text}><Icon size={44} strokeWidth={1.4}/><p>{text}</p></div>)}</div></div></section>
    <section className="rp-light xr-roles"><div className="container"><div><h2>We bring the build.<br/>You bring the business.</h2><p className="xr-role-copy">BYBO brings design, integration, testing and operation. Your team brings process knowledge, access and the people who approve decisions.</p></div><Image src="/images/method-roles.webp" alt="BYBO and your team: complementary responsibilities" width={1000} height={667} sizes="(max-width:760px) 100vw, 55vw"/></div></section>
    <section className="rp-light rp-section xr-method-question"><div className="container"><div><p className="eyebrow">Frequently asked questions</p><h2>Already know what<br/>needs building?</h2></div><details><summary>We can discuss a defined implementation scope when the workflow and success measures are clear.<span aria-hidden="true">+</span></summary><p>Bring the workflow, representative examples, required integrations and your acceptance criteria. We will agree the scope, responsibilities and delivery plan together.</p></details></div></section>
    <section className="rp-final xr-method-final"><div className="container"><h2>Start with the work<br/>in front of you.</h2><div className="actions"><Button href="/apply">Talk to BYBO</Button><Button href="/blueprint" secondary>Explore the Blueprint</Button></div></div><Image src="/images/blueprint-investment.webp" alt="A plan for a more capable business" width={1900} height={760} sizes="100vw"/></section>
  </div>;
}

export function ReferenceIndustries(){
  return <div className="reference-page xr-industries"><ReferenceHero page="Industries" title="Different businesses. Familiar bottlenecks." body="Choose your industry to see where connected workflows can help." art="industries-hero" href="/apply" cta="Discuss your business"/>
    <ReferenceIndustryList/>
    <section className="xr-industry-pattern"><Image src="/images/blueprint-investment.webp" alt="A considered plan for your business" fill sizes="100vw"/><div className="container"><h2>The pattern repeats.<br/>Your rules make it specific.</h2></div></section>
    <section className="xr-industry-close rp-light"><Image src="/images/reference-closing.webp" alt="Books and a violet glass sphere" fill sizes="100vw"/><div className="container"><h2>Show us where your<br/>business loses time.</h2><Button href="/apply">Talk to BYBO</Button></div></section>
  </div>;
}

export function ReferenceAbout(){
  return <div className="reference-page xr-about"><ReferenceHero page="About" title="Built for the work after the demo." body="BYBO designs, builds and operates AI systems around the daily reality of a business." art="about-hero" href="/apply" cta="Meet us through your workflow"/>
    <section className="rp-light xr-tuesday"><div><h2>The system has<br/>to work on an<br/><em>ordinary Tuesday.</em></h2><p>Incomplete records. Changed processes.<br/>A supplier using a new format. We design for those moments and stay involved as the work evolves.</p></div><Image src="/images/about-tuesday.webp" alt="Files labelled Incomplete records, Changed processes, New format and Still works" width={1000} height={667} sizes="(max-width:760px) 100vw, 50vw"/></section>
    <section className="rp-section xr-principles"><div className="container"><p className="eyebrow">Our principles</p><ol>{['Understand before building.','Give every system an owner.','Make important decisions visible.','Measure what actually changes.'].map((text,i)=><li key={text}><span>0{i+1}</span><h2>{text}</h2></li>)}</ol></div></section>
    <section className="rp-light rp-section xr-identity"><div className="container"><p className="eyebrow">Who we are</p><h2>Rooted in Bengaluru.<br/>Built around your business.</h2><div className="rp-three">{[['N&G Ventures','BYBO is its enterprise AI practice.'],['Bcon Club','Our business-community partner.'],['Bengaluru','Our operating base.']].map(([title,body])=><div key={title}><h3>{title}</h3><p>{body}</p></div>)}</div><div className="xr-continuity"><div><p className="eyebrow">Continuity</p><h2>One relationship,<br/>from scope to operation.</h2><p>We agree the work, the operating responsibilities and the review process before delivery begins.</p><Link href="/how-we-work" className="text-link">See how we work →</Link></div><Image src="/images/blueprint-investment.webp" alt="A BYBO operating plan" width={800} height={600} sizes="(max-width:760px) 100vw, 40vw"/></div></div></section>
    <section className="xr-about-final"><Image src="/images/reference-build.webp" alt="Violet glass tools for connected work" width={850} height={600}/><div><h2>Talk about the work,<br/>not the buzzwords.</h2><Button href="/apply">Talk to BYBO</Button></div></section>
  </div>;
}
