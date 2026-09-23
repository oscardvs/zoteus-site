'use client';

import { useEffect } from 'react';

/**
 * Opens a collapsed <details> when the URL fragment names it or its section, so a link to
 * /pricing#before-you-pay lands on the requirements already expanded instead of on a
 * closed summary. Runs on load and on every in-page hash change.
 */
export function OpenDetailsOnHash({ hash, detailsId }: { hash: string; detailsId: string }) {
  useEffect(() => {
    const sync = () => {
      if (window.location.hash !== hash) return;
      const el = document.getElementById(detailsId);
      if (el instanceof HTMLDetailsElement) el.open = true;
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, [hash, detailsId]);
  return null;
}
