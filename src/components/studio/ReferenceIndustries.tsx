'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, AlertTriangle } from 'lucide-react';

const groups=['Operations-led','High-consideration','Consumer brands'];
const rows=[
  {name:'Manufacturing & exporters',body:'Move enquiries from specification to quote.',measure:'Quote turnaround',slug:'document-multimodal-intelligence',gate:''},
  {name:'Logistics & 3PL',body:'Match delivery documents and route exceptions.',measure:'Review time',slug:'agentic-operations',gate:''},
  {name:'Professional services',body:'Find precedents and prepare review-ready drafts.',measure:'Time spent on preparation',slug:'enterprise-knowledge-systems',gate:''},
  {name:'Real estate & developers',body:'Connect enquiries, availability and visit coordination.',measure:'Enquiry-to-visit progression',slug:'customer-workforce-ai',gate:''},
  {name:'Healthcare & clinics',body:'Coordinate bookings and administrative documents.',measure:'Slot utilisation',slug:'customer-workforce-ai',gate:'Clinical decisions stay with clinicians.'},
  {name:'Education & lending',body:'Route applications and check required documents.',measure:'File turnaround',slug:'document-multimodal-intelligence',gate:'Consequential decisions require review.'},
  {name:'D2C & e-commerce',body:'Connect support, orders and return workflows.',measure:'Resolution time',slug:'customer-workforce-ai',gate:''},
  {name:'Restaurants & hospitality',body:'Coordinate bookings, suppliers and outlet reporting.',measure:'Operational preparation time',slug:'decision-intelligence',gate:''},
  {name:'Multi-location retail',body:'Bring store requests and reporting together.',measure:'Outlet consistency',slug:'decision-intelligence',gate:''},
];

export function ReferenceIndustryList(){
  const [active,setActive]=useState('All industries');
  return <section className="rp-light rp-section xr-industries-list" id="industries"><div className="container"><div className="xr-filter-heading"><h2>Find your context</h2><div role="group" aria-label="Filter industries">{['All industries',...groups].map(group=><button key={group} aria-pressed={active===group} onClick={()=>setActive(group)}>{group}</button>)}</div></div><div aria-live="polite">{groups.filter(group=>active==='All industries'||active===group).map(group=><div className="xr-industry-group" key={group}><h3>{group}</h3>{rows.map((row,i)=>Math.floor(i/3)===groups.indexOf(group)?<article key={row.name}><div aria-hidden="true" className={`xr-industry-object xr-industry-object-${i}`}/><h4>{row.name}</h4><div><p>{row.body}</p>{row.gate&&<p className="xr-industry-gate"><AlertTriangle size={15}/>{row.gate}</p>}</div><p className="xr-industry-measure">{row.measure}</p><Link href={`/apply?industry=${encodeURIComponent(row.name)}&system=${row.slug}`} aria-label={`Discuss ${row.name}`}><ArrowRight size={19}/></Link></article>:null)}</div>)}</div></div></section>;
}
