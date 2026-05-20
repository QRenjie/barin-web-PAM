import type { ProjectAsset } from '@interfaces/ProjectAsset';
import type { ProjectRow } from '@schemas/ProjectSchema';

export function projectRowToAsset(row: ProjectRow): ProjectAsset {
  return {
    id: row.id,
    name: row.name,
    repoUrl: row.repo_url ?? undefined,
    testUrl: row.test_url ?? undefined,
    prodUrl: row.prod_url ?? undefined,
    author: row.author,
    otherInfo: row.other_info,
    description: row.description,
    tags: row.tags ?? []
  };
}
