import type { ProjectAsset, ProjectEnvironment } from '@interfaces/ProjectAsset';
import type { ProjectRow, ProjectUpsertInput } from '@schemas/ProjectSchema';
import { projectEnvironmentSchema } from '@schemas/ProjectSchema';

function emptyToNull(value?: string): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function parseEnvironments(raw: unknown): ProjectEnvironment[] {
  if (!Array.isArray(raw)) return [];
  const parsed: ProjectEnvironment[] = [];
  for (const item of raw) {
    const result = projectEnvironmentSchema.safeParse(item);
    if (result.success) {
      parsed.push(result.data);
    }
  }
  return parsed;
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
    environments: input.environments ?? [],
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
    environments: parseEnvironments(row.environments),
    author: row.author,
    otherInfo: row.other_info,
    description: row.description,
    tags: row.tags ?? [],
    sortOrder: row.sort_order
  };
}
