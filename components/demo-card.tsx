/**
 * A real exchange between a researcher and Claude with Zoteus connected, run on
 * 6 September 2026 through Claude Code with Zoteus as its only MCP server, against
 * the maintainer's own Zotero library. The raw transcript is kept with the marketing
 * assets (zoteus-gtm/demo). Abridged from ten tool calls to the three that produced
 * the answer; every quoted string is verbatim from the transcript.
 */
export function DemoCard() {
  return (
    <figure className="z-panel overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-fd-border px-4 py-2.5">
        <span className="z-label normal-case tracking-normal">Claude Code</span>
        <span className="z-label normal-case tracking-normal">Zoteus over stdio</span>
      </div>

      <div className="z-transcript space-y-4 p-4 sm:p-5">
        <div className="z-turn">
          <span className="z-who">You</span>
          <p className="text-fd-foreground">
            What does my Zotero library have on joint-embedding predictive architectures? Quote the
            passage where I-JEPA explains the core idea, with the page, and give me APA references
            for the three most relevant papers.
          </p>
        </div>

        <div className="z-turn">
          <span className="z-who">Tool</span>
          <p className="z-call">
            <b>zotero_search_items</b>
            <span>q: &quot;JEPA&quot;</span>
            <span>qmode: everything</span>
            <span aria-hidden>&rarr;</span>
            <span>7 items</span>
          </p>
        </div>

        <div className="z-turn">
          <span className="z-who">Tool</span>
          <p className="z-call">
            <b>zotero_get_fulltext</b>
            <span>item_key: G4RQFPIQ</span>
            <span>query: &quot;the idea behind I-JEPA is to predict&hellip;&quot;</span>
            <span aria-hidden>&rarr;</span>
            <span>passage, p. 1 (exact)</span>
          </p>
        </div>

        <div className="z-turn">
          <span className="z-who">Tool</span>
          <p className="z-call">
            <b>zotero_get_item</b>
            <span>item_key: G4RQFPIQ</span>
            <span>include: bib</span>
            <span>style: apa</span>
            <span aria-hidden>&rarr;</span>
            <span>1 reference</span>
          </p>
        </div>

        <div className="z-turn">
          <span className="z-who">Claude</span>
          <div className="space-y-3 text-fd-muted-foreground">
            <p>
              Your library holds seven JEPA items, all preprints or reports from the Meta/LeCun line of
              work. The I-JEPA core idea, from the abstract (Assran et al., 2023, p.&nbsp;1):
            </p>
            <p className="border-l-2 border-[color:var(--accent-text)] pl-3 italic text-fd-foreground">
              &ldquo;We introduce the Image-based Joint-Embedding Predictive Architecture (I-JEPA), a
              non-generative approach for self-supervised learning from images. The idea behind I-JEPA
              is simple: from a single context block, predict the representations of various target
              blocks in the same image.&rdquo;
            </p>
            <p>The page number is exact, taken from the PDF itself.</p>
            <cite>
              Assran, M., Duval, Q., Misra, I., Bojanowski, P., Vincent, P., Rabbat, M., LeCun, Y., &amp;
              Ballas, N. (2023). <i>Self-Supervised Learning from Images with a Joint-Embedding Predictive
              Architecture</i>. http://arxiv.org/abs/2301.08243v3
            </cite>
            <cite>
              LeCun, Y. (2022). <i>A Path Towards Autonomous Machine Intelligence</i> [Position paper].
              OpenReview. https://openreview.net/forum?id=BZ5a1r-kVsf
            </cite>
          </div>
        </div>
      </div>

      <figcaption className="border-t border-fd-border px-4 py-2.5 text-[0.78rem] leading-snug text-fd-muted-foreground">
        A real exchange, run on 6 September 2026 against the maintainer&apos;s own library, abridged from
        ten tool calls to the three that produced the answer. The text is verbatim.
      </figcaption>
    </figure>
  );
}
