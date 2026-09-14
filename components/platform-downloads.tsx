import { repoUrl } from '@/lib/shared';

export function PlatformDownloads() {
  return (
    <div className="not-prose my-5 flex flex-wrap gap-3" aria-label="Claude Desktop extension downloads">
      {['macos', 'windows', 'linux'].map((platform) => (
        <a key={platform} className="z-btn z-btn-secondary" href={`${repoUrl}/releases/latest/download/zoteus-${platform}.mcpb`}>
          Download for {platform === 'macos' ? 'macOS' : platform === 'windows' ? 'Windows' : 'Linux'}
        </a>
      ))}
    </div>
  );
}
