import { API_PROJECTS } from '@config/apiRoutes';
import type { ProjectUpsertInput } from '@schemas/ProjectSchema';
import type { AppApiResult } from '@interfaces/AppApiInterface';
import { isAppApiSuccessInterface } from '@interfaces/AppApiInterface';
import type { ProjectAsset } from '@interfaces/ProjectAsset';

async function parseEnvelope<T>(res: Response): Promise<T> {
  const json = (await res.json()) as AppApiResult<T>;
  if (!res.ok || !isAppApiSuccessInterface<T>(json)) {
    const message =
      !isAppApiSuccessInterface(json) && 'message' in json
        ? json.message
        : res.statusText;
    throw new Error(message || 'Request failed');
  }
  return json.data as T;
}

export async function createProject(
  input: ProjectUpsertInput
): Promise<ProjectAsset> {
  const res = await fetch(API_PROJECTS, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
    credentials: 'include'
  });
  return parseEnvelope<ProjectAsset>(res);
}

export async function updateProject(
  id: number,
  input: ProjectUpsertInput
): Promise<ProjectAsset> {
  const res = await fetch(`${API_PROJECTS}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
    credentials: 'include'
  });
  return parseEnvelope<ProjectAsset>(res);
}

export async function deleteProject(id: number): Promise<void> {
  const res = await fetch(`${API_PROJECTS}/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });
  await parseEnvelope<{ ok: boolean }>(res);
}
