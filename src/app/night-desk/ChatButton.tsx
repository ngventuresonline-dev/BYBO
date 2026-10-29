'use client';

import { useEffect, useState } from 'react';

// The PROXe widget lives in a cross-origin iframe and takes no "open" command
// from the page, so this points people at its bubble instead of opening it.
// No widget on the page (blocked, still loading) → WhatsApp, so the button
// always leads somewhere.
export function ChatButton({ fallback, className }: { fallback: string; className?: string }) {
  const [hint, setHint] = useState(false);

  useEffect(() => {
    if (!hint) return;
    const t = window.setTimeout(() => setHint(false), 7000);
    // The embed widens its iframe when the chat opens; drop the hint then.
    const poll = window.setInterval(() => {
      const f = document.getElementById('wc-chat-widget');
      if (f && f.getBoundingClientRect().width > 200) setHint(false);
    }, 200);
    return () => { window.clearTimeout(t); window.clearInterval(poll); };
  }, [hint]);

  return (
    <>
      <a
        className={className}
        href={fallback}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          if (!document.getElementById('wc-chat-widget')) return;
          e.preventDefault();
          setHint(true);
        }}
      >
        Map my Night Desk with our AI desk
      </a>
      {hint && (
        <div className="nd-hint" role="status">
          <span className="nd-hint-ring" aria-hidden="true" />
          <p>Tap the chat bubble and say <b>&ldquo;Night Desk&rdquo;</b>. Our AI desk replies in seconds and maps your flow with you.</p>
        </div>
      )}
    </>
  );
}
