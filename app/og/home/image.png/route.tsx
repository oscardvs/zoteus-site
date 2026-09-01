import { ImageResponse } from 'next/og';
import { generate as DefaultImage } from 'fumadocs-ui/og';
import { appName } from '@/lib/shared';

export const dynamic = 'force-static';
export const revalidate = false;

export function GET() {
  return new ImageResponse(
    (
      <DefaultImage
        title="An MCP server for your Zotero library"
        description="Open-source. Search, cite, add, and write back to your Zotero library from Claude and other MCP clients. Runs on your machine."
        site={appName}
      />
    ),
    { width: 1200, height: 630 },
  );
}
