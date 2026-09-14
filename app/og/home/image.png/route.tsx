import { ImageResponse } from 'next/og';
import { generate as DefaultImage } from 'fumadocs-ui/og';
import { appName } from '@/lib/shared';

export const dynamic = 'force-static';
export const revalidate = false;

export function GET() {
  return new ImageResponse(
    (
      <DefaultImage
        title="Find the evidence you saved in Zotero"
        description="Ask Claude or ChatGPT about your papers and notes. Verify passages, compare sources and cite. Free local install or hosted access."
        site={appName}
      />
    ),
    { width: 1200, height: 630 },
  );
}
