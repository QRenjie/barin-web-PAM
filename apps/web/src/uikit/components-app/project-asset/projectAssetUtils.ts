import type { ProjectAsset } from '@interfaces/ProjectAsset';

export function formatShortUrl(url: string | undefined, maxLen = 35): string {
  if (!url) return '';
  try {
    const urlObj = new URL(url);
    let short =
      urlObj.hostname +
      (urlObj.pathname !== '/' ? urlObj.pathname : '');
    if (short.length > maxLen) {
      short = `${short.substring(0, maxLen)}…`;
    }
    return short;
  } catch {
    const raw = url.replace(/^https?:\/\//, '');
    return raw.length > maxLen ? `${raw.substring(0, maxLen)}…` : raw;
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
      (p.prodUrl?.toLowerCase().includes(lowerTerm) ?? false) ||
      (p.testUrl?.toLowerCase().includes(lowerTerm) ?? false)
  );
}
