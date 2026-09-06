import type { CSSProperties } from 'react';

/**
 * The hero exchange, framed as the chat it was. Run on 6 September 2026 through
 * Claude Code with Zoteus as its only MCP server, against the maintainer's own
 * Zotero library; the raw transcript is kept with the marketing assets
 * (zoteus-gtm/demo). Abridged from ten tool calls to the three that produced
 * the answer, and every quoted string is verbatim from the transcript.
 *
 * The turns reveal in sequence once, CSS only; prefers-reduced-motion shows the
 * finished state straight away.
 */
const reveal = (i: number): CSSProperties => ({ ['--i' as string]: i });

export function DemoCard() {
  return (
    <figure className="z-chat z-panel">
      <div className="z-chat-bar">
        <span className="z-label normal-case tracking-normal">Claude Code</span>
        <span className="z-label normal-case tracking-normal">Zoteus over stdio</span>
      </div>

      <div className="z-chat-body">
        <div className="z-msg z-msg-user" data-reveal style={reveal(0)}>
          <span className="z-msg-who">You</span>
          <p>
            What does my Zotero library have on joint-embedding predictive architectures? Quote the
            passage where I-JEPA explains the core idea, with the page, and give me APA references
            for the three most relevant papers.
          </p>
        </div>

        <ul className="z-tools" aria-label="Tool calls">
          <li data-reveal style={reveal(1)}>
            <b>zotero_search_items</b>
            <span>q: &quot;JEPA&quot;</span>
            <span className="z-tool-out">7 items</span>
          </li>
          <li data-reveal style={reveal(2)}>
            <b>zotero_get_fulltext</b>
            <span>item_key: G4RQFPIQ</span>
            <span className="z-tool-out">passage, p. 1</span>
          </li>
          <li data-reveal style={reveal(3)}>
            <b>zotero_get_item</b>
            <span>include: bib, style: apa</span>
            <span className="z-tool-out">1 reference</span>
          </li>
        </ul>

        <div className="z-msg z-msg-claude" data-reveal style={reveal(4)}>
          <span className="z-msg-who">Claude</span>
          <div>
            <p>
              Your library holds seven JEPA items, all preprints or reports from the Meta/LeCun line of
              work.
            </p>
            <blockquote>
              &ldquo;We introduce the Image-based Joint-Embedding Predictive Architecture (I-JEPA), a
              non-generative approach for self-supervised learning from images. The idea behind I-JEPA
              is simple: from a single context block, predict the representations of various target
              blocks in the same image.&rdquo;
            </blockquote>
            <p className="z-msg-src">
              Assran et al., 2023, p.&nbsp;1. The page number is exact, taken from the PDF itself.
            </p>
            <cite>
              Assran, M., Duval, Q., Misra, I., Bojanowski, P., Vincent, P., Rabbat, M., LeCun, Y., &amp;
              Ballas, N. (2023). <i>Self-Supervised Learning from Images with a Joint-Embedding Predictive
              Architecture</i>. http://arxiv.org/abs/2301.08243v3
            </cite>
          </div>
        </div>
      </div>

      <figcaption className="z-chat-cap">
        A real exchange, 6 September 2026, against the maintainer&apos;s own library. Abridged from ten
        tool calls to the three that produced the answer; the text is verbatim.
      </figcaption>
    </figure>
  );
}
