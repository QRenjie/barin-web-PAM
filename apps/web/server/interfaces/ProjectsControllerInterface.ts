import type { ProjectAsset } from '@interfaces/ProjectAsset';

export interface ProjectsControllerInterface {
  list(): Promise<ProjectAsset[]>;
}
