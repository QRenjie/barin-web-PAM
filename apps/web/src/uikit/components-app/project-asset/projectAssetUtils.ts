import type { ProjectAsset } from '@interfaces/ProjectAsset';

/** host + path，无 maxLen 时不按字符截断，由容器 CSS 控制省略 */
export function formatShortUrl(
  url: string | undefined,
  maxLen?: number
): string {
  if (!url) return '';
  try {
    const urlObj = new URL(url);
    const short =
      urlObj.hostname +
      (urlObj.pathname !== '/' ? urlObj.pathname : '') +
      (urlObj.search || '');
    if (maxLen != null && short.length > maxLen) {
      return `${short.substring(0, maxLen)}…`;
    }
    return short;
  } catch {
    const raw = url.replace(/^https?:\/\//, '');
    if (maxLen != null && raw.length > maxLen) {
      return `${raw.substring(0, maxLen)}…`;
    }
    return raw;
  }
}

export function filterProjects(
  projects: ProjectAsset[],
  term: string
): ProjectAsset[] {
  if (!term.trim()) return [...projects];
  const lowerTerm = term.trim().toLowerCase();
  return projects.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerTerm) ||
      p.author.toLowerCase().includes(lowerTerm) ||
      p.description.toLowerCase().includes(lowerTerm) ||
      p.otherInfo.toLowerCase().includes(lowerTerm) ||
      (p.tags?.some((t) => t.toLowerCase().includes(lowerTerm)) ?? false) ||
      (p.repoUrl?.toLowerCase().includes(lowerTerm) ?? false) ||
      (p.environments?.some(
        (e) =>
          e.name.toLowerCase().includes(lowerTerm) ||
          e.url.toLowerCase().includes(lowerTerm)
      ) ??
        false)
  );
}
