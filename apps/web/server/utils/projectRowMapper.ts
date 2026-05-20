import type { ProjectAsset } from '@interfaces/ProjectAsset';
import type { ProjectRow, ProjectUpsertInput } from '@schemas/ProjectSchema';

function emptyToNull(value?: string): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function projectUpsertToRow(
  input: ProjectUpsertInput,
  sortOrder?: number
): Record<string, unknown> {
  const row: Record<string, unknown> = {
    name: input.name,
    author: input.author,
    description: input.description ?? '',
    other_info: input.otherInfo ?? '',
    repo_url: emptyToNull(input.repoUrl),
    test_url: emptyToNull(input.testUrl),
    prod_url: emptyToNull(input.prodUrl),
    tags: input.tags ?? []
  };
  if (sortOrder != null) {
    row.sort_order = sortOrder;
  }
  return row;
}

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
    tags: row.tags ?? [],
    sortOrder: row.sort_order
  };
}
