'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string>) => void };
  }
}

/**
 * Fires the Umami `checkout-complete` event once when /thanks loads. Polar appends
 * `checkout_id` to the success URL; it is sent as event data when present.
 *
 * The tracker script loads afterInteractive, so it may not exist yet on first render. This
 * polls briefly for it and gives up quietly after about ten seconds (blocked, DNT, or
 * analytics switched off), never throwing.
 */
export function TrackCheckoutComplete() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    const checkoutId = new URLSearchParams(window.location.search).get('checkout_id');
    const data = checkoutId ? { checkout_id: checkoutId } : undefined;

    let tries = 0;
    const attempt = () => {
      if (fired.current) return true;
      const umami = window.umami;
      if (umami && typeof umami.track === 'function') {
        fired.current = true;
        try {
          umami.track('checkout-complete', data);
        } catch {
          /* analytics must never break the page */
        }
        return true;
      }
      return false;
    };

    if (attempt()) return;
    const timer = window.setInterval(() => {
      tries += 1;
      if (attempt() || tries >= 20) window.clearInterval(timer);
    }, 500);
    return () => window.clearInterval(timer);
  }, []);

  return null;
}
