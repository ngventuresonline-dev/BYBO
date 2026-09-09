'use client';

import { tabWorkflows } from './TabWorkflows';
import { useState } from 'react';
import { ArrowRight, Search, FileText, Folder, Users, Settings, Box, RefreshCw, Check, AlertTriangle, Circle, BookOpen } from 'lucide-react';
import { referenceServices, type ReferenceServiceKey } from './reference-service-data';

const knowledge = [
  {question:'What is our expense approval policy?',source:'Expense Policy · Section 3',answer:'In this sample policy, expenses above ₹5,000 need a manager’s approval before reimbursement.',quote:'Expenses exceeding ₹5,000 must be approved by the employee’s manager before reimbursement.'},
  {question:'How do we handle a supplier change?',source:'Supplier SOP · Section 2',answer:'In this sample procedure, the process owner checks the updated supplier details before changing the record.',quote:'The process owner must verify updated supplier information before the master record is changed.'},
  {question:'Who approved the project scope?',source:'Project Decisions · Record 04',answer:'This sample project record assigns scope approval to the project owner.',quote:'The project owner signs off on the scope and records any agreed changes.'},
  {question:'Where are the current product specifications?',source:'Product Handbook · Version 2',answer:'This sample handbook keeps the current specifications in the approved product record.',quote:'Use the approved product record for current specifications. Archived versions are retained for reference only.'},
];

export function ReferenceWorkflow({serviceKey}:{serviceKey:ReferenceServiceKey}) {
  const base=referenceServices[serviceKey];
  const isKnowledge=serviceKey==='enterprise-knowledge-systems';
  const isAgent=serviceKey==='agentic-operations';
  const [tab,setTab]=useState(0);
  const workflow=tabWorkflows[serviceKey][tab];
  const data={...base,steps:workflow.steps,workflowTitle:workflow.title,gate:workflow.gate};
  const [step,setStep]=useState(0);
  const [question,setQuestion]=useState(knowledge[0].question);
  const [asked,setAsked]=useState(false);
  const [approved,setApproved]=useState(false);
  const [checked,setChecked]=useState<string[]>([]);
  const current=knowledge[tab];
  const supported=question.trim().toLowerCase()===current.question.toLowerCase();
  function chooseTab(i:number){setTab(i);setStep(0);setQuestion(knowledge[i].question);setAsked(false);setApproved(false);setChecked([]);}
  const icons=isKnowledge?[FileText,Settings,Folder,BookOpen]:isAgent?[Users,Box,FileText,RefreshCw]:[Users,Users,Box,Settings];
  return <section className={`rp-light rp-section xr-workflow xr-${data.art}`} id="workflow"><div className="container">
    <h2>Where it fits</h2><div className="rp-use-tabs" role="group" aria-label={`Choose a ${data.name} example`}>{data.tabs.map((label,i)=>{const Icon=icons[i];return <button key={label} aria-pressed={tab===i} onClick={()=>chooseTab(i)}><Icon size={25}/><span>{label}</span></button>;})}</div>
    <div className={`xr-demo-layout ${isAgent?'xr-agent-layout':''}`}><div><h2>{data.workflowTitle}</h2><ol className={isAgent?'xr-horizontal-steps':'rp-steps'}>{data.steps.map((label,i)=><li key={label}><button type="button" aria-pressed={step===i} onClick={()=>setStep(i)}><span>{isAgent?(i===4?<Check size={22}/>:i===0?<FileText size={22}/>:i===3?<Users size={22}/>:<Settings size={22}/>):i+1}</span>{label}</button></li>)}</ol></div>
    <div className="xr-example"><p className="xr-example-label">Illustrative workflow</p><p className="tab-workflow-detail" aria-live="polite">{workflow.details[step]}</p>
      {isKnowledge?<><form className="xr-search" onSubmit={e=>{e.preventDefault();setAsked(true);setStep(supported?3:4);}}><Search size={18}/><input aria-label="Ask a sample knowledge question" value={question} onChange={e=>{setQuestion(e.target.value);setAsked(false);}} required maxLength={250}/><button type="submit">Ask</button></form><div className="xr-knowledge-body"><div className="xr-knowledge-stages">{data.steps.slice(1).map((s,i)=><div key={s}><Circle size={15}/><span>{s}<small>{asked?(supported?(i<3?'Complete':'No gaps in this example'):'Insufficient evidence'):(i===0?'Ready to inspect sources':'Pending')}</small></span></div>)}</div><div className="xr-source"><FileText size={31}/><h3>{current.source.split(' · ')[0]}</h3><div className="xr-source-lines"/><p>Sample source</p></div></div>{asked&&<div className="xr-answer" aria-live="polite">{supported?<><p>{current.answer}</p><details><summary>View source: {current.source}</summary><blockquote>{current.quote}</blockquote></details></>:<p>This example has no source for that question. Try “{current.question}” to see a source-supported response.</p>}</div>}</>
      :isAgent?<><p className="xr-sample-context">Example: {workflow.example}</p><div className="xr-agent-progress">{data.steps.map((s,i)=><div key={s} className={step===i?'active':''}><span>{i<step?<Check size={15}/>:<Circle size={15}/>}</span><p>{s}</p><small>{i===4&&step===4&&!approved?'Awaiting approval':i===4&&approved?'Recorded in example':i<step?'Illustrated':i===step?'Selected step':'Not started'}</small></div>)}</div>{step>=3&&<div className="xr-demo-approval" aria-live="polite">{approved?<p>Example approved: {workflow.steps[4].toLowerCase()}.</p>:<><p>{workflow.gate}</p><button type="button" onClick={()=>{setApproved(true);setStep(4);}}>Approve example <Check size={16}/></button></>}</div>}</>
      :<div className="xr-platform"><aside><strong>BYBO</strong>{['Workflow','Data','Users','Settings'].map(x=><span key={x}>{x}</span>)}</aside><div className="xr-platform-task"><h3><span>{step+1}</span>{data.steps[step]}</h3>{[workflow.details[step]].map((task,i)=>{const id=`${tab}-${step}-${i}`;return <label key={task}><input type="checkbox" checked={checked.includes(id)} onChange={e=>setChecked(prev=>e.target.checked?[...prev,id]:prev.filter(x=>x!==id))}/>{task}</label>;})}<button type="button" onClick={()=>setStep(s=>(s+1)%5)}>{step===4?'Restart example':'Next'}<ArrowRight size={14}/></button></div></div>}
    </div></div><p className="rp-review-note"><AlertTriangle size={23}/>{data.gate}</p>
  </div></section>;
}
