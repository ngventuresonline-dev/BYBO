'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { CrmLead } from '@/lib/crm/db';
import { Icon, type IconName } from './icons';
import { display, initials, SOURCE_LABEL, STAGE_LABEL } from './shared';

export type PaletteCommand = { id: string; label: string; icon: IconName; hint?: string; run: () => void };
type Item = { key: string; group: 'Leads' | 'Go to' | 'Actions'; label: string; sub?: string; icon?: IconName; lead?: CrmLead; score: number; run: () => void };

/** Subsequence match: every query letter in order, rewarding runs and word starts. 0 means no match. */
export function fuzzy(q: string, text: string) {
  if (!q) return 1;
  const t = text.toLowerCase();
  const direct = t.indexOf(q);
  if (direct >= 0) return 100 - Math.min(direct, 50) + (direct === 0 || /\W/.test(t[direct - 1] ?? '') ? 20 : 0);
  let score = 0, ti = 0, run = 0, first = -1;
  for (const ch of q) {
    const at = t.indexOf(ch, ti);
    // Letters scattered far apart are noise, not a match.
    if (at < 0 || (first >= 0 && at - first > q.length * 3)) return 0;
    if (first < 0) first = at;
    run = at === ti ? run + 1 : 0;
    score += 1 + run * 2 + (at === 0 || /\W/.test(t[at - 1] ?? '') ? 3 : 0);
    ti = at + 1;
  }
  return score;
}

export function CommandPalette({ leads, sections, commands, onOpenLead, onClose }: {
  leads: CrmLead[]; sections: PaletteCommand[]; commands: PaletteCommand[]; onOpenLead: (id: string) => void; onClose: () => void;
}) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const list = useRef<HTMLDivElement>(null);

  const items = useMemo(() => {
    const query = q.trim().toLowerCase();
    const leadItems: Item[] = leads.map((l) => ({
      key: `l-${l.id}`, group: 'Leads' as const, label: display(l), lead: l,
      sub: [l.company && l.name ? l.company : '', STAGE_LABEL[l.stage], SOURCE_LABEL[l.source], l.email ?? l.phone ?? ''].filter(Boolean).join(' · '),
      score: Math.max(fuzzy(query, display(l)) * 1.2, fuzzy(query, [l.company, l.email, l.phone, l.need].filter(Boolean).join(' '))),
      run: () => onOpenLead(l.id),
    })).filter((x) => x.score > 0).sort((a, b) => b.score - a.score || Date.parse(b.lead!.last_activity_at) - Date.parse(a.lead!.last_activity_at)).slice(0, query ? 8 : 5);
    const cmd = (group: Item['group']) => (c: PaletteCommand): Item => ({ key: `${group}-${c.id}`, group, label: c.label, sub: c.hint, icon: c.icon, score: fuzzy(query, c.label), run: c.run });
    const best = (xs: Item[]) => (query ? xs.filter((x) => x.score > 0).sort((a, b) => b.score - a.score) : xs);
    // Groups keep their order (actions, leads, then sections) so results never jump around.
    return [...best(commands.map(cmd('Actions'))), ...leadItems, ...best(sections.map(cmd('Go to')))];
  }, [q, leads, sections, commands, onOpenLead]);

  const pick = Math.min(active, Math.max(0, items.length - 1));
  useEffect(() => { list.current?.querySelector<HTMLElement>(`[data-i="${pick}"]`)?.scrollIntoView({ block: 'nearest' }); }, [pick]);

  const run = (it?: Item) => { if (!it) return; onClose(); it.run(); };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((pick + 1) % Math.max(1, items.length)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((pick - 1 + items.length) % Math.max(1, items.length)); }
    else if (e.key === 'Enter') { e.preventDefault(); run(items[pick]); }
    else if (e.key === 'Escape') { e.preventDefault(); onClose(); }
  };

  let last = '';
  return (
    <div className="crm-overlay is-palette" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="crm-palette" role="dialog" aria-modal="true" aria-label="Command palette" onKeyDown={onKey}>
        <div className="crm-palette-input">
          <Icon name="search" size={18} />
          <input autoFocus value={q} onChange={(e) => { setQ(e.target.value); setActive(0); }} placeholder="Search leads, jump to a page, or run a command…"
            role="combobox" aria-expanded="true" aria-controls="crm-palette-list" aria-activedescendant={items[pick] ? `crm-pi-${pick}` : undefined} />
          <kbd>Esc</kbd>
        </div>
        <div className="crm-palette-list" id="crm-palette-list" role="listbox" ref={list}>
          {items.map((it, i) => {
            const head = it.group !== last ? it.group : null;
            last = it.group;
            return (
              <div key={it.key}>
                {head ? <p className="crm-palette-group">{head}</p> : null}
                <button id={`crm-pi-${i}`} data-i={i} role="option" aria-selected={i === pick} className={`crm-palette-item ${i === pick ? 'is-on' : ''}`}
                  onMouseMove={() => { if (i !== pick) setActive(i); }} onClick={() => run(it)}>
                  {it.lead ? <span className={`crm-avatar t-${it.lead.temperature ?? 'none'}`}>{initials(it.lead)}</span> : <span className="crm-palette-ico"><Icon name={it.icon ?? 'open'} size={16} /></span>}
                  <span className="crm-due-text"><b>{it.label}</b>{it.sub ? <small>{it.sub}</small> : null}</span>
                  {i === pick ? <kbd>↵</kbd> : null}
                </button>
              </div>
            );
          })}
          {!items.length ? <p className="crm-palette-none">No matches for “{q}”.</p> : null}
        </div>
        <footer className="crm-palette-foot"><span><kbd>↑</kbd><kbd>↓</kbd> move</span><span><kbd>↵</kbd> open</span><span><kbd>Ctrl</kbd><kbd>K</kbd> toggle</span></footer>
      </div>
    </div>
  );
}
