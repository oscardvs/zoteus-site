/**
 * Where Zoteus sits: MCP clients on one side, Zotero and the scholarly
 * services on the other, Zoteus in between with the tool families it exposes.
 * Real HTML, so it reflows from 320px up and stays readable in both themes;
 * the connectors are the only SVG.
 */

const FAMILIES: [string, string[]][] = [
  ['Search', ['zotero_search_items', 'zotero_semantic_search', 'zotero_index']],
  ['Read PDFs', ['zotero_get_fulltext', 'zotero_attachment']],
  ['Cite', ['zotero_bibliography', 'zotero_format_bibliography', 'zotero_styles']],
  ['Add and edit', ['zotero_import', 'zotero_create_items', 'zotero_update_item', 'zotero_trash_items']],
  ['Annotate and attach', ['zotero_annotate', 'zotero_attach_file']],
  ['Organize', ['zotero_manage_collections', 'zotero_manage_tags', 'zotero_saved_searches']],
  ['Literature', ['zotero_scholar']],
  ['Sync and groups', ['zotero_sync', 'zotero_groups', 'zotero_export']],
];

function Edge({ children }: { children: React.ReactNode }) {
  return (
    <div className="z-edge" aria-hidden>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4v16M8 8l4-4 4 4M8 16l4 4 4-4" />
      </svg>
      <span>{children}</span>
    </div>
  );
}

function Node({ title, sub, children, core = false }: { title: string; sub: string; children?: React.ReactNode; core?: boolean }) {
  return (
    <div className={`z-panel z-node ${core ? 'z-panel-strong' : ''}`}>
      <p className="z-node-title text-fd-foreground">{title}</p>
      <p className="z-node-sub">{sub}</p>
      {children}
    </div>
  );
}

export function SystemDiagram() {
  return (
    <figure className="z-diagram" aria-label="Where Zoteus sits between your MCP client and Zotero">
      <div className="z-stack">
        <Node
          title="Your MCP client"
          sub="Claude Desktop, Claude Code, Cursor, VS Code, Zed, Codex, Gemini CLI"
        />
        <Node title="claude.ai" sub="Custom connector, on the hosted plans" />
      </div>

      <Edge>
        MCP
        <br />
        stdio, or HTTP with OAuth
      </Edge>

      <Node title="Zoteus" sub="MCP server in TypeScript. Runs on your machine. 30 tools, namespaced zotero_*" core>
        <ul>
          {FAMILIES.map(([family, tools]) => (
            <li key={family}>
              <b>{family}</b>
              <br />
              {tools.join(' · ')}
            </li>
          ))}
        </ul>
      </Node>

      <Edge>
        local API
        <br />
        127.0.0.1:23119
        <br />
        Web API v3, your key
      </Edge>

      <div className="z-stack">
        <Node
          title="Zotero desktop app"
          sub="Reads and personal-library writes, with no cloud key, while the app is running."
        />
        <Node
          title="zotero.org Web API"
          sub="Sync, group libraries, and the fallback when the app is closed."
        />
        <Node
          title="OpenAlex and Crossref"
          sub="References, citing works and related works, for zotero_scholar."
        />
      </div>
    </figure>
  );
}
