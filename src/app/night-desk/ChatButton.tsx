'use client';

// Opens BYBO AI with the conversation already started on the Night Desk.
export function ChatButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent('bybo-ai:open', { detail: { prompt: 'I want the Night Desk lead response system for my business.' } }))}
    >
      Map my Night Desk with BYBO AI
    </button>
  );
}
