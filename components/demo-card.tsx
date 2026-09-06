/**
 * A worked exchange between a researcher and Claude with Zoteus connected.
 * The tool names and arguments are the real Zoteus tools as an MCP client
 * sees them; the item keys are illustrative and the caption says so.
 */
export function DemoCard() {
  return (
    <figure className="z-panel overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-fd-border px-4 py-2.5">
        <span className="z-label normal-case tracking-normal">Claude Desktop</span>
        <span className="z-label normal-case tracking-normal">Zoteus over stdio</span>
      </div>

      <div className="z-transcript space-y-4 p-4 sm:p-5">
        <div className="z-turn">
          <span className="z-who">You</span>
          <p className="text-fd-foreground">
            Find papers in my library arguing against open-plan offices and draft a paragraph citing them.
          </p>
        </div>

        <div className="z-turn">
          <span className="z-who">Tool</span>
          <p className="z-call">
            <b>zotero_semantic_search</b>
            <span>q: &quot;open-plan offices, drawbacks&quot;</span>
            <span>limit: 5</span>
            <span aria-hidden>&rarr;</span>
            <span>5 items</span>
          </p>
        </div>

        <div className="z-turn">
          <span className="z-who">Tool</span>
          <p className="z-call">
            <b>zotero_get_fulltext</b>
            <span>key: 7MRJ2KQA</span>
            <span>query: &quot;face-to-face interaction&quot;</span>
            <span aria-hidden>&rarr;</span>
            <span>passage, p. 4</span>
          </p>
        </div>

        <div className="z-turn">
          <span className="z-who">Tool</span>
          <p className="z-call">
            <b>zotero_bibliography</b>
            <span>item_keys: [7MRJ2KQA, HVGQ3W2D]</span>
            <span>style: apa</span>
            <span aria-hidden>&rarr;</span>
            <span>2 references</span>
          </p>
        </div>

        <div className="z-turn">
          <span className="z-who">Claude</span>
          <div className="space-y-3 text-fd-muted-foreground">
            <p>
              Several studies in your collection challenge the open-plan model. Bernstein and Turban
              (2018) found face-to-face interaction{' '}
              <strong className="font-medium text-fd-foreground">dropped by about 70%</strong> after the
              switch (p.&nbsp;4); Kim and de Dear (2013) link it to lower satisfaction with privacy and
              acoustics.
            </p>
            <cite>
              Bernstein, E. S., &amp; Turban, S. (2018). The impact of the &lsquo;open&rsquo; workspace
              on human collaboration. <i>Philosophical Transactions of the Royal Society B</i>, 373(1753).
            </cite>
            <cite>
              Kim, J., &amp; de Dear, R. (2013). Workspace satisfaction: The privacy-communication
              trade-off in open-plan offices. <i>Journal of Environmental Psychology</i>, 36, 18&ndash;26.
            </cite>
          </div>
        </div>
      </div>

      <figcaption className="border-t border-fd-border px-4 py-2.5 text-[0.78rem] leading-snug text-fd-muted-foreground">
        An example exchange. The tool calls are Zoteus tools as the client sees them; the item keys are
        illustrative.
      </figcaption>
    </figure>
  );
}
