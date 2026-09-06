'use client';

import { useEffect, useRef } from 'react';

/**
 * The hero recording: claude.ai in the browser with the hosted Zoteus connector,
 * asked about the maintainer's own Zotero library, captured on 6 September 2026.
 * Nothing staged; four minutes cut to half a minute (the tool calls run as a
 * time-lapse). The raw takes are kept with the marketing assets (zoteus-gtm/demo).
 *
 * Plays muted, inline, on a loop. Under prefers-reduced-motion it stays on the
 * poster frame and the controls are there for anyone who wants to play it.
 */
export function DemoVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      if (mq.matches) {
        video.pause();
        video.removeAttribute('autoplay');
        video.controls = true;
      } else {
        video.play().catch(() => {
          /* autoplay refused: the poster stays, which is fine */
        });
      }
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  return (
    <figure className="z-video z-panel">
      <div className="z-chat-bar">
        <span className="z-label normal-case tracking-normal">claude.ai</span>
        <span className="z-label normal-case tracking-normal">Zoteus, hosted connector</span>
      </div>
      <video
        ref={ref}
        className="z-video-el"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/demo/claude-ai-poster.jpg"
        width={1040}
        height={790}
        aria-label="Claude in the browser answers a question about the Zotero library through Zoteus: it lists the seven JEPA papers, quotes the I-JEPA passage with its page, and gives APA references."
      >
        <source src="/demo/claude-ai.webm" type="video/webm" />
        <source src="/demo/claude-ai.mp4" type="video/mp4" />
      </video>
      <figcaption className="z-chat-cap">
        Recorded 6 September 2026 in claude.ai with the hosted connector, against the maintainer&apos;s
        own library. Nothing staged; the two-minute wait for the tool calls runs as a time-lapse.
      </figcaption>
    </figure>
  );
}
