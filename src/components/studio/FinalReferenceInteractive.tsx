'use client';
import { tabWorkflows } from './TabWorkflows';
import { CONTACT } from '@/lib/site';
import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, FileText, Search, Users, Settings, Shield, Database, BarChart3, MessageSquare, Circle } from 'lucide-react';
import { finalServices, type FinalServiceKey } from './FinalReferenceData';
import { services } from '@/lib/redesign';
import { trackLead } from '@/lib/analytics';

export function FinalWorkflow({serviceKey}:{serviceKey:FinalServiceKey}){const base=finalServices[serviceKey];const [tab,setTab]=useState(0);const [step,setStep]=useState(0);const workflow=tabWorkflows[serviceKey][tab];const d={...base,steps:workflow.steps,workflow:workflow.title,gate:workflow.gate};const icons=[FileText,Search,Shield,BarChart3,Users];return <section className="rp-section rp-light fr-workflow" id="workflow"><div className="container"><h2>Where it fits</h2><div className="rp-use-tabs" role="group" aria-label={`Choose a ${d.name} example`}>{d.tabs.map((label,i)=>{const Icon=[MessageSquare,Search,BarChart3,Users][i];return <button key={label} aria-pressed={tab===i} onClick={()=>{setTab(i);setStep(0)}}><Icon size={24}/>{label}</button>})}</div><div className={`fr-workflow-layout ${d.art==='decision'?'fr-vertical':''}`}><div><h2>{d.workflow}</h2><ol className={d.art==='decision'?'rp-steps':'xr-horizontal-steps'}>{d.steps.map((s,i)=>{const Icon=icons[i];return <li key={s}><button aria-pressed={step===i} onClick={()=>setStep(i)}><span>{d.art==='customer'?<Icon size={23}/>:i+1}</span>{s}</button></li>})}</ol></div><div className={`fr-workflow-demo ${d.art==='decision'?'fr-monitor':''}`}><aside><strong>BYBO</strong><span>Overview</span><span>Sources</span><span>Checks</span><span>Analysis</span><span>Reports</span></aside><div><p>Illustrative workflow</p><small className="fr-example-context">{workflow.example}</small><p className="tab-workflow-detail" aria-live="polite">{workflow.details[step]}</p>{d.steps.map((s,i)=>{const Icon=icons[i];return <button key={s} onClick={()=>setStep(i)} aria-pressed={step===i}><Icon size={17}/><span>{s}</span><small>{i<step?'Illustrated':i===step?'Selected':'To explore'}</small></button>})}</div></div></div><p className="rp-review-note"><Shield size={21}/>{d.gate}</p></div></section>}

export function ReviewExample(){const [state,setState]=useState('Awaiting review');const [editing,setEditing]=useState(false);const [summary,setSummary]=useState('New supplier added');return <div className="fr-review-card"><div className="fr-review-heading"><strong>Review required</strong><small>{state}</small></div><div className="fr-review-record"><FileText/><div><strong>Supplier request</strong><small>PR-0042 · Illustrative example</small></div></div><dl><div><dt>Requester</dt><dd>Operations</dd></div><div><dt>Summary</dt><dd>{editing?<input aria-label="Request summary" value={summary} onChange={e=>setSummary(e.target.value)} maxLength={140}/>:summary}</dd></div><div><dt>Supporting files</dt><dd><details><summary>3 sample items</summary><p>Supplier profile, request note and approval checklist.</p></details></dd></div></dl><div className="fr-review-actions"><button onClick={()=>{setState('Approved in example');setEditing(false)}}>Approve</button><button onClick={()=>{setEditing(v=>!v);setState(editing?'Updated for review':'Editing')}}>{editing?'Save':'Edit'}</button><button onClick={()=>{setState('Escalated to owner');setEditing(false)}}>Escalate</button></div><p className="fr-review-status" role="status">{state!=='Awaiting review'?state:''}</p></div>}

export function ReferenceEnquiry({initialSystem='',initialIndustry='',initialInterest='',initialMessage=''}:{initialSystem?:string;initialIndustry?:string;initialInterest?:string;initialMessage?:string}){
  const [picked,setPicked]=useState<string[]>(initialSystem?[initialSystem]:[]);
  const [state,setState]=useState<'idle'|'sending'|'sent'|'error'>('idle');
  const [fallback,setFallback]=useState('');
  const toggle=(slug:string)=>setPicked(p=>p.includes(slug)?p.filter(s=>s!==slug):[...p,slug]);

  async function send(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    const form=e.currentTarget;
    const data=new FormData(form);
    setState('sending');setFallback('');
    try{
      const res=await fetch('/api/enquiry',{method:'POST',body:data});
      const out=await res.json().catch(()=>({ok:false}));
      if(out.ok){setState('sent');trackLead({content_name:'enquiry_submitted'});form.reset();setPicked([]);return}
      // The inbox is not wired up yet, so hand the enquiry to the visitor's own
      // email client rather than losing it.
      const body=[`Name: ${data.get('name')}`,`Work email: ${data.get('email')}`,`Company: ${data.get('company')||'Not provided'}`,`Phone: ${data.get('phone')||'Not provided'}`,`Interested in: ${picked.map(s=>services.find(x=>x.slug===s)?.name).filter(Boolean).join(', ')||'Not sure yet'}`,'',String(data.get('message'))].join('\n');
      setFallback(`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Enquiry from ${data.get('name')}`)}&body=${encodeURIComponent(body)}`);
      setState('error');
    }catch{setState('error')}
  }

  if(state==='sent')return <div className="fr-enquiry"><div className="fr-sent" role="status"><Check size={30}/><h2>Thank you — that is with us.</h2><p>We read every enquiry ourselves and reply within one working day, usually sooner. If it is urgent, WhatsApp is faster: <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer">{CONTACT.phone}</a>.</p><button className="text-link" onClick={()=>setState('idle')}>Send another</button></div></div>;

  return <div className="fr-enquiry">
    <h2>Start the conversation</h2>
    <form onSubmit={send}>
      <label>Your name<input name="name" autoComplete="name" required maxLength={120}/></label>
      <label>Work email<input name="email" type="email" autoComplete="email" required maxLength={200}/></label>
      <label>Company<input name="company" autoComplete="organization" maxLength={160}/></label>
      <label>Phone (optional)<input name="phone" type="tel" autoComplete="tel" maxLength={30}/></label>

      <fieldset className="fr-picks">
        <legend>What are you interested in? <span>Pick as many as apply</span></legend>
        <div>{services.map(s=><label key={s.slug} className={picked.includes(s.slug)?'is-on':undefined}><input type="checkbox" name="services" value={s.name} checked={picked.includes(s.slug)} onChange={()=>toggle(s.slug)}/><span>{s.name}</span></label>)}
        <label className={picked.includes('unsure')?'is-on':undefined}><input type="checkbox" name="services" value="Not sure — help me choose" checked={picked.includes('unsure')} onChange={()=>toggle('unsure')}/><span>Not sure yet</span></label></div>
      </fieldset>

      <label>What happens today, and what would you like to change?<textarea name="message" rows={5} required minLength={10} maxLength={2000} defaultValue={initialMessage}/></label>

      <details className="fr-extra-context"><summary>Additional context (optional)</summary>
        <label>Industry<input name="industry" defaultValue={initialIndustry} maxLength={120}/></label>
        <label>Your role<input name="role" maxLength={100}/></label>
        <label>Current website<input name="website" maxLength={200}/></label>
      </details>

      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden className="fr-trap"/>
      <input type="hidden" name="interest" value={initialInterest}/>

      <button className="button" type="submit" disabled={state==='sending'}>{state==='sending'?'Sending…':'Send enquiry'} <ArrowRight size={17}/></button>
      <p className="fr-form-note">We reply within one working day. No newsletter, no sales sequence.</p>

      {state==='error'&&<p className="fr-form-error" role="alert">That did not send. {fallback?<>Please <a href={fallback}>open it in your email app</a> instead, or write to <a href={CONTACT.emailHref}>{CONTACT.email}</a>.</>:<>Please try again, or write to <a href={CONTACT.emailHref}>{CONTACT.email}</a>.</>}</p>}
    </form>
  </div>
}
