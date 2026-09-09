'use client';

import { tabWorkflows } from './TabWorkflows';
import { useState } from 'react';
import { FileText, ClipboardCheck, Truck, Folder, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

const examples = [
  { label:'Invoices', Icon:FileText, title:'INVOICE', type:'Invoice', field:'Total amount', value:'₹24,800', reference:'INV-1042', gate:'A mismatch pauses the file. The reviewer sees the evidence and decides what happens next.' },
  { label:'Purchase orders', Icon:ClipboardCheck, title:'PURCHASE ORDER', type:'Purchase order', field:'Order value', value:'₹72,000', reference:'PO-2086', gate:'An order outside the agreed limits waits for the authorised buyer to review.' },
  { label:'Delivery records', Icon:Truck, title:'DELIVERY RECORD', type:'Delivery record', field:'Items received', value:'48 units', reference:'DEL-3018', gate:'A missing signature or quantity difference is sent to your delivery reviewer.' },
  { label:'Customer files', Icon:Folder, title:'CUSTOMER FILE', type:'Customer file', field:'Required records', value:'3 of 4 received', reference:'CUS-4052', gate:'Missing or unclear customer information waits for your team to confirm.' },
];
const statuses = ['Received','Reading…','Checking rules…','Needs review','Ready after approval'];

export function DocumentDemo() {
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(1);
  const example = examples[active];
  const workflow = tabWorkflows['document-multimodal-intelligence'][active];
  const steps = workflow.steps;
  return <section className="rp-light rp-section rp-demo" id="workflow"><div className="container">
    <h2>Where it fits</h2>
    <div className="rp-use-tabs" role="group" aria-label="Choose a document example">{examples.map(({label,Icon},i)=><button key={label} type="button" aria-pressed={i===active} onClick={()=>{setActive(i);setStep(1);}}><Icon size={26} strokeWidth={1.5}/><span>{label}</span><ArrowRight size={16}/></button>)}</div>
    <h2>{workflow.title}</h2><p className="tab-workflow-detail" aria-live="polite">{workflow.example} — {workflow.details[step]}</p>
    <div className="rp-demo-grid"><ol className="rp-steps">{steps.map((label,i)=><li key={label}><button type="button" aria-pressed={step===i} onClick={()=>setStep(i)}><span>{i+1}</span>{label}</button></li>)}</ol>
    <div><div className="rp-workbench"><header><strong>Illustrative workflow</strong><span aria-hidden="true">•••</span></header><div className="rp-workbench-body">
      <div className="rp-stage-list" aria-hidden="true">{steps.map((label,i)=><div key={label} className={step===i?'active':''}><Folder size={15}/>{label}{i<step&&<CheckCircle2 size={12}/>}</div>)}</div>
      <div className="rp-example-file"><strong>{example.title}</strong><small>{example.reference} · Sample</small><div className="rp-file-rule"/><div className="rp-file-table"><span>{active===3?'Required record':'Description'}</span><span>{active===3?'File':'Qty'}</span><span>{active===3?'Status':active===2?'Received':'Amount'}</span>{(active===3?['Contact details','Account information','Supporting document']:active===2?['Shipment item A','Shipment item B','Shipment item C']:['Service / item A','Service / item B','Service / item C']).map((label,i)=><div key={label}><span>{label}</span><span>{i+1}</span><span>—</span></div>)}</div><div className="rp-file-rule"/><small>Illustrative document</small></div>
      <dl className="rp-extracted" aria-live="polite"><div><dt>Document type</dt><dd>{example.type}</dd></div><div><dt>Reference</dt><dd>{example.reference}</dd></div><div><dt>{example.field}</dt><dd>{step===0?'Waiting to read':example.value}</dd></div><div><dt>Status</dt><dd className={step===3?'rp-review-status':'rp-status'}>{statuses[step]}</dd></div></dl>
    </div></div><p className="rp-review-note"><AlertCircle size={25}/><span>{workflow.gate}</span></p></div></div>
  </div></section>;
}
