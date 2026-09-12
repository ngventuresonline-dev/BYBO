import {
  AlarmClock, Banknote, BarChart3, Bell, Blocks, BookOpen, Boxes, Building2, CalendarCheck,
  ClipboardCheck, Clock, Coins, Compass, Cpu, Database, FileCheck2, FileSearch, FileText, Filter,
  Gauge, GitBranch, Globe, Handshake, Headphones, KeyRound, Languages, LayoutGrid, LineChart,
  ListChecks, Lock, type LucideIcon, Mail, MapPin, MessageCircle, Monitor, Package, Palette,
  PenLine, Phone, PieChart, Plug, Receipt, RefreshCw, Route, Scale, ScrollText, Search, Send,
  Settings, ShieldCheck, ShoppingBag, Smartphone, Sparkles, Split, Stamp, Table2, Target,
  Timer, TrendingUp, Truck, UserCheck, UserRound, Users, Workflow, Wrench,
} from 'lucide-react';

/**
 * Picks an icon from the words of an item, so a page's icons describe its own content
 * instead of repeating the same handful everywhere. First match wins; `fallback` cycles
 * through neutral shapes when nothing matches.
 */
const RULES: [RegExp, LucideIcon][] = [
  [/invoice|purchase order|billing|payable|receipt/i, Receipt],
  [/payment|cost per|budget|spend|price|fee|money/i, Coins],
  [/bank|credit|lending|loan/i, Banknote],
  [/document|file|paperwork|pdf|scan|contract/i, FileText],
  [/extract|read the|field|ocr|capture the/i, FileSearch],
  [/check|validate|verif|match|reconcil|accuracy/i, FileCheck2],
  [/approval|approve|sign-off|sign off|gate/i, Stamp],
  [/review|reviewer|human|person|judgement/i, UserCheck],
  [/owner|ownership|accountab|named/i, UserRound],
  [/team|staff|people|colleague|workforce|training/i, Users],
  [/enquir|question|conversation|message|chat|reply/i, MessageCircle],
  [/email|inbox/i, Mail],
  [/whatsapp|phone|call/i, Phone],
  [/support|service desk|helpdesk/i, Headphones],
  [/booking|appointment|schedule|calendar|visit/i, CalendarCheck],
  [/follow.?up|reminder|notif|alert/i, Bell],
  [/route|routing|handoff|hand-off|escalat/i, Split],
  [/workflow|process|pipeline|path/i, Workflow],
  [/step|sequence|journey|stage/i, Route],
  [/integrat|connect|api|tool|plug/i, Plug],
  [/database|record|data source|master data|erp/i, Database],
  [/crm|sales|pipeline|lead/i, TrendingUp],
  [/spreadsheet|table|column|csv/i, Table2],
  [/report|dashboard|metric|number|figure/i, BarChart3],
  [/measure|baseline|benchmark|kpi/i, LineChart],
  [/share|split|proportion|breakdown/i, PieChart],
  [/time|hour|turnaround|speed|faster|delay/i, Clock],
  [/deadline|sla|response time/i, AlarmClock],
  [/throughput|volume|capacity|rate/i, Gauge],
  [/log|audit|trace|history|evidence/i, ScrollText],
  [/permission|access|credential|key|secret/i, KeyRound],
  [/security|protect|safeguard|risk|govern|control/i, ShieldCheck],
  [/privacy|personal data|consent|confidential/i, Lock],
  [/policy|sop|procedure|rule|standard/i, ClipboardCheck],
  [/knowledge|handbook|manual|guide|documentation/i, BookOpen],
  [/search|find|retriev|look up/i, Search],
  [/filter|exception|edge case|triage/i, Filter],
  [/model|ai|prompt|evaluation|llm/i, Cpu],
  [/platform|product|software|workspace|portal/i, Monitor],
  [/module|component|building block|foundation/i, Blocks],
  [/version|change|release|update|iterate/i, GitBranch],
  [/retry|repeat|recurring|refresh|maintain/i, RefreshCw],
  [/inventory|stock|order|shipment|parcel/i, Package],
  [/logistics|delivery|transport|fleet/i, Truck],
  [/store|shop|commerce|checkout|cart/i, ShoppingBag],
  [/website|page|site|landing/i, Globe],
  [/mobile|phone screen|responsive/i, Smartphone],
  [/design|brand|visual|copy|photograph/i, Palette],
  [/write|draft|content|wording/i, PenLine],
  [/send|deliver|publish|launch/i, Send],
  [/location|branch|outlet|region|india/i, MapPin],
  [/company|business|organisation|enterprise/i, Building2],
  [/legal|complian|regulat|law/i, Scale],
  [/partner|vendor|supplier|agency/i, Handshake],
  [/language|multilingual|translate/i, Languages],
  [/goal|target|outcome|objective/i, Target],
  [/plan|strategy|roadmap|direction|decide/i, Compass],
  [/setting|configur|admin/i, Settings],
  [/build|develop|engineer|implement/i, Wrench],
  [/list|checklist|task|item/i, ListChecks],
  [/quality|improve|better|reliab/i, Sparkles],
  [/grid|catalogue|collection|set of/i, LayoutGrid],
  [/timer|wait|queue|backlog/i, Timer],
  [/group|cluster|bundle/i, Boxes],
];

const FALLBACK: LucideIcon[] = [Sparkles, Blocks, ListChecks, Target, LayoutGrid, Compass];

export function iconFor(text: string, index = 0): LucideIcon {
  for (const [pattern, icon] of RULES) if (pattern.test(text)) return icon;
  return FALLBACK[index % FALLBACK.length];
}

/** Same as iconFor, but avoids repeating an icon already used on the page. */
export function uniqueIconPicker() {
  const used = new Set<LucideIcon>();
  return (text: string, index = 0): LucideIcon => {
    const first = iconFor(text, index);
    if (!used.has(first)) { used.add(first); return first; }
    for (const [pattern, icon] of RULES) if (pattern.test(text) && !used.has(icon)) { used.add(icon); return icon; }
    for (const icon of FALLBACK) if (!used.has(icon)) { used.add(icon); return icon; }
    return first;
  };
}
