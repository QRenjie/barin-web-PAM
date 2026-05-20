import type { ProjectAsset } from '@interfaces/ProjectAsset';

export interface ProjectsRepositoryInterface {
  listAll(): Promise<ProjectAsset[]>;
}
