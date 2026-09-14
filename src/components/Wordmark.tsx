/**
 * The BYBO lockup: the monogram plus the wordmark, drawn inline so it inherits
 * colour and never flashes a missing file. The geometry matches the SVGs under
 * /brand exactly — both come from the same numbers, so the favicon, the header
 * and anything a printer is sent are the same shape.
 *
 * `tone` picks the accent bowl: "brand" for the violet, "mono" to take the
 * surrounding colour throughout.
 */
export function Wordmark({ tone = 'brand', mark = true }: { tone?: 'brand' | 'mono'; mark?: boolean }) {
  const accent = tone === 'brand' ? 'var(--wm-accent, #b794ff)' : 'currentColor';
  return (
    <span className={`wm ${mark ? '' : 'wm--word'}`} aria-hidden>
      {mark && (
        <svg className="wm-mark" viewBox="0 0 132 152" fill="none" focusable="false">
          <rect x="4" y="4" width="26" height="144" rx="8" fill="currentColor" />
          <path d="M44 4H84a34 34 0 0 1 0 68H44Z" fill="currentColor" />
          <path d="M44 80H90a34 34 0 0 1 0 68H44Z" fill={accent} />
        </svg>
      )}
      <svg className="wm-word" viewBox="0 0 362 100" fill="none" focusable="false">
        <g stroke="currentColor" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round">
          <path d="M5 0V100M5 5H30A22.5 22.5 0 0 1 30 50H5M5 50H32A22.5 22.5 0 0 1 32 95H5" />
          <path d="M5 0L35 50L65 0M35 50V100" transform="translate(84 0)" />
          <path d="M5 0V100M5 5H30A22.5 22.5 0 0 1 30 50H5M5 50H32A22.5 22.5 0 0 1 32 95H5" transform="translate(178 0)" />
          <path d="M95 50A45 45 0 1 1 5 50A45 45 0 1 1 95 50" transform="translate(262 0)" />
        </g>
      </svg>
    </span>
  );
}
