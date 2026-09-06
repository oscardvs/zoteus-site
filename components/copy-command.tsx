'use client';

import { useEffect, useRef, useState } from 'react';
import { installCmd } from '@/lib/shared';

/** A command line with a copy control. Announces "Copied" to screen readers. */
export function CopyCommand({
  command = installCmd,
  className = '',
}: {
  command?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(command).then(
          () => {
            setCopied(true);
            window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => setCopied(false), 1800);
          },
          () => {},
        );
      }}
      aria-label={`Copy ${command} to the clipboard`}
      title="Copy to clipboard"
      data-copied={copied ? 'true' : 'false'}
      className={`z-copy ${className}`}
    >
      <span aria-hidden className="z-copy-prompt">$</span>
      <span className="z-copy-cmd">{command}</span>
      <span className="z-copy-icon" aria-hidden>
        {copied ? (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15V5a2 2 0 0 1 2-2h10" />
          </svg>
        )}
      </span>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? 'Copied' : ''}
      </span>
    </button>
  );
}
