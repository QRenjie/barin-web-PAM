import type { ProjectAsset } from '@interfaces/ProjectAsset';
import type { ProjectUpsertInput } from '@schemas/ProjectSchema';

export interface ProjectsRepositoryInterface {
  listAll(): Promise<ProjectAsset[]>;
  create(input: ProjectUpsertInput): Promise<ProjectAsset>;
  update(id: number, input: ProjectUpsertInput): Promise<ProjectAsset>;
  delete(id: number): Promise<void>;
}
