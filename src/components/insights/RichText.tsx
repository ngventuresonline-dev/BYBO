import Link from 'next/link';
import { Fragment } from 'react';
import { isLiveHref } from '@/lib/insights';

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/**
 * Plain text with [label](href) links. Internal links use the router; external ones open in a new tab. */
export function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const [whole, label, href] = m;
    const at = m.index ?? 0;
    if (at > last) parts.push(text.slice(last, at));
    parts.push(
      !href.startsWith('/') ? <a key={at} className="ga-link" href={href} target="_blank" rel="noopener noreferrer">{label}</a>
      : isLiveHref(href) ? <Link key={at} className="ga-link" href={href}>{label}</Link>
      : label,
    );
    last = at + whole.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts.map((p, i) => <Fragment key={i}>{p}</Fragment>)}</>;
}
