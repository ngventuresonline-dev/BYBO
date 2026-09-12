'use client';

import { useEffect, useState } from 'react';

type Item = { id: string; label: string };

/** Sticky contents list that highlights the section being read. */
export function GuideContents({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const visible = new Set<string>();
    const order = items.map(i => i.id);
    const observer = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        const first = order.find(id => visible.has(id));
        if (first) setActive(first);
      },
      { rootMargin: '-110px 0px -55% 0px' },
    );
    for (const id of order) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="ga-contents" aria-label="Contents">
      <p>Contents</p>
      <ol>
        {items.map(i => (
          <li key={i.id}>
            <a href={`#${i.id}`} aria-current={active === i.id ? 'location' : undefined}>{i.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
