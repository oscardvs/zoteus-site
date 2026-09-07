'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const SOURCES = [
  { src: '/demo/claude-ai.webm', type: 'video/webm' },
  { src: '/demo/claude-ai.mp4', type: 'video/mp4' },
];

const CAPTION_ALT =
  'Claude in the browser answers a question about the Zotero library through Zoteus: it lists the seven JEPA papers, quotes the I-JEPA passage with its page, and gives APA references.';

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 3H3v6M15 21h6v-6M21 9V3h-6M3 15v6h6" />
    </svg>
  );
}

/**
 * The hero recording: claude.ai in the browser with the hosted Zoteus connector,
 * asked about the maintainer's own Zotero library, captured on 6 September 2026.
 * Nothing staged; four minutes cut to half a minute (the tool calls run as a
 * time-lapse). The raw takes are kept with the marketing assets (zoteus-gtm/demo).
 *
 * Plays muted, inline, on a loop. Beside the headline it renders at roughly half
 * its native width, where the answer reads as shape rather than prose, so the
 * caption row opens the same recording full size in a dialog. Under
 * prefers-reduced-motion it stays on the poster frame (the question and the first
 * half of the answer) and the controls are there for anyone who wants to play it.
 */
export function DemoVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

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

  /* The dialog's own close event: the close button, Esc and the backdrop all
     land here. Bound natively, since `close` does not bubble. */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      setOpen(false);
      const video = ref.current;
      if (video && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        video.play().catch(() => {});
      }
    };
    dialog.addEventListener('close', onClose);
    return () => dialog.removeEventListener('close', onClose);
  }, []);

  const openFull = useCallback(() => {
    setOpen(true);
    dialogRef.current?.showModal();
    ref.current?.pause();
  }, []);

  return (
    <>
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
          width={900}
          height={768}
          aria-label={CAPTION_ALT}
        >
          {SOURCES.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
        <figcaption className="z-chat-cap z-video-cap">
          <span>
            Recorded 6 September 2026 against the maintainer&apos;s own library. Nothing staged.
          </span>
          <button type="button" className="z-video-expand" onClick={openFull}>
            <ExpandIcon />
            Full size
          </button>
        </figcaption>
      </figure>

      <dialog
        ref={dialogRef}
        className="z-lightbox"
        onClick={(e) => {
          /* the backdrop is the dialog itself; a click on the panel stops here */
          if (e.target === dialogRef.current) dialogRef.current.close();
        }}
        aria-label="The Zoteus recording, full size"
      >
        <div className="z-lightbox-inner z-panel">
          <div className="z-chat-bar">
            <span className="z-label normal-case tracking-normal">claude.ai</span>
            <button type="button" className="z-lightbox-close" onClick={() => dialogRef.current?.close()}>
              Close
            </button>
          </div>
          {/* Mounted only while open, so the page loads one video, not two. */}
          {open && (
            <video
              className="z-video-el"
              autoPlay
              muted
              loop
              playsInline
              controls
              poster="/demo/claude-ai-poster.jpg"
              width={900}
              height={768}
              aria-label={CAPTION_ALT}
            >
              {SOURCES.map((s) => (
                <source key={s.src} src={s.src} type={s.type} />
              ))}
            </video>
          )}
        </div>
      </dialog>
    </>
  );
}
